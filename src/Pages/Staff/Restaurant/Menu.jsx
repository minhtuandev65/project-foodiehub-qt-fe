// Menu.jsx
// Parent quản lý localCart theo menuId.
// localCart item shape:
// { cartItemId, menuId, name, imageURL, quantity, unitPrice }

import React, { useEffect, useState, useCallback } from "react";
import CardMenu from "../../../components/Staff/CardMenu";
import CardCart from "../../../components/Staff/CardCart";
import { useParams } from "react-router-dom";
import {
	Col,
	Layout,
	Row,
	Typography,
	Badge,
	Button,
	Drawer,
	notification,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
	getCartItems,
	getListMenu,
	orderMenu,
	increaseQuantity,
	decreaseQuantity,
	removeCartItem,
} from "../../../redux/reducer/modules/StaffReducer";
import { useDispatch, useSelector } from "react-redux";

const { Content } = Layout;
const { Title } = Typography;

export default function Menu() {
	const { restaurantId } = useParams();
	const dispatch = useDispatch();
	const { listMenu, listCartItems } = useSelector((s) => s.staff);

	const [localCart, setLocalCart] = useState([]); // store items keyed by menuId
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [inFlight, setInFlight] = useState(new Set());

	// Normalize server cart item -> local shape, sử dụng menuId nếu server trả
	const normalizeServerCartItem = (srv) => {
		const qty = Number(srv.quantity ?? 1);
		const total = Number(srv.price ?? 0);
		const unitPrice = qty > 0 ? total / qty : total;
		return {
			cartItemId: srv._id,
			menuId: srv.menuId ?? null, // server hiện đã trả menuId
			name: srv.name,
			imageURL: srv.imageURL,
			quantity: qty,
			unitPrice,
		};
	};

	const normalizeMenuItem = (m, qty = 1) => ({
		cartItemId: null,
		menuId: m._id,
		name: m.name,
		imageURL: m.imageURL,
		quantity: qty,
		unitPrice: Number(m.price ?? 0),
	});

	// Load menu + cart khi mount
	useEffect(() => {
		if (!restaurantId) return;
		dispatch(getListMenu(restaurantId));
		(async () => {
			try {
				const res = await dispatch(getCartItems(restaurantId));
				const payload = res?.payload ?? res;
				const items = payload?.cartItemsList ?? [];
				setLocalCart(items.map(normalizeServerCartItem));
			} catch (err) {
				console.error("Lấy cart thất bại", err);
			}
		})();
	}, [restaurantId, dispatch]);

	// Nếu redux cart thay đổi thì sync lại local
	useEffect(() => {
		if (!listCartItems?.cartItemsList) return;
		setLocalCart(listCartItems.cartItemsList.map(normalizeServerCartItem));
	}, [listCartItems]);

	// helpers
	const findByMenuId = (menuId) =>
		localCart.find((c) => String(c.menuId) === String(menuId));
	const updateLocalByMenuId = (menuId, updater) =>
		setLocalCart((prev) =>
			prev.map((p) => (String(p.menuId) === String(menuId) ? updater(p) : p))
		);
	const removeLocalByMenuId = (menuId) =>
		setLocalCart((prev) =>
			prev.filter((p) => String(p.menuId) !== String(menuId))
		);

	const totalCount = localCart.reduce(
		(s, it) => s + (Number(it.quantity) || 0),
		0
	);
	const totalPrice = localCart.reduce(
		(s, it) => s + Number(it.unitPrice || 0) * Number(it.quantity || 0),
		0
	);

	// phần trong Menu.jsx (replace addToCart cũ)
	const addToCart = useCallback(
		async (menuId, menuItem, addQty = 1) => {
			// menuId: chính là item._id từ CardMenu
			const snapshot = JSON.parse(JSON.stringify(localCart));

			// 1) local optimistic: tìm theo menuId => tăng quantity; nếu chưa có tạo synthetic with menuId
			const existing = findByMenuId(menuId);
			if (existing) {
				updateLocalByMenuId(menuId, (p) => ({
					...p,
					quantity: (Number(p.quantity) || 0) + addQty,
				}));
			} else {
				// synthetic entry: cartItemId null (server sẽ trả sau khi gọi API)
				const synthetic = normalizeMenuItem(menuItem, addQty); // ensure synthetic.menuId = menuItem._id
				setLocalCart((prev) => [...prev, synthetic]);
			}

			// 2) gọi API: orderMenu({ restaurantId, menuId, quantity })
			try {
				setInFlight((s) => new Set(s).add(menuId));
				const res = await dispatch(
					orderMenu({ restaurantId, menuId, quantity: addQty })
				);
				if (res?.error) throw res.error;

				// 3) sync authoritative cart từ server (an toàn nhất): getCartItems -> normalize -> setLocalCart
				const fresh = await dispatch(getCartItems(restaurantId));
				const freshPayload = fresh?.payload ?? fresh;
				if (freshPayload?.cartItemsList) {
					setLocalCart(freshPayload.cartItemsList.map(normalizeServerCartItem));
				}
			} catch (err) {
				// rollback nếu lỗi
				setLocalCart(snapshot);
				console.error("Thêm món thất bại:", err);
				notification.error({
					message: "Thêm món thất bại",
					description: err?.message || "Vui lòng thử lại",
				});
			} finally {
				setInFlight((s) => {
					const copy = new Set(s);
					copy.delete(menuId);
					return copy;
				});
			}
		},
		[localCart, dispatch, restaurantId]
	);

	// ---------- updateQty theo menuId ----------
	const updateQty = useCallback(
		async (menuId, newQty) => {
			const snapshot = JSON.parse(JSON.stringify(localCart));
			// optimistic local
			updateLocalByMenuId(menuId, (p) => ({ ...p, quantity: Number(newQty) }));

			try {
				setInFlight((s) => new Set(s).add(menuId));
				// tìm server cart id nếu có
				const local = findByMenuId(menuId);
				if (!local) throw new Error("Item không tồn tại trong cart (FE)");

				const serverCartId = local.cartItemId;
				if (!serverCartId) {
					// chưa có trên server -> gọi orderMenu để tạo với quantity = newQty
					const res = await dispatch(
						orderMenu({ restaurantId, menuId, quantity: newQty })
					);
					if (res?.error) throw res.error;
				} else {
					// đã có serverCartId -> tính delta và gọi increase/decrease
					const prev = snapshot.find(
						(p) => String(p.menuId) === String(menuId)
					);
					const prevQty = prev ? Number(prev.quantity || 0) : 0;
					const delta = Number(newQty) - prevQty;

					if (delta > 0) {
						for (let i = 0; i < delta; i++) {
							const r = await dispatch(increaseQuantity(serverCartId));
							if (r?.error) throw r.error;
						}
					} else if (delta < 0) {
						for (let i = 0; i < Math.abs(delta); i++) {
							const r = await dispatch(decreaseQuantity(serverCartId));
							if (r?.error) throw r.error;
						}
					}
				}

				// sync authoritative
				const fresh = await dispatch(getCartItems(restaurantId));
				const freshPayload = fresh?.payload ?? fresh;
				if (freshPayload?.cartItemsList)
					setLocalCart(freshPayload.cartItemsList.map(normalizeServerCartItem));
			} catch (err) {
				setLocalCart(snapshot);
				console.error("Cập nhật số lượng thất bại", err);
				notification.error({
					message: "Cập nhật thất bại",
					description: err?.message || "Vui lòng thử lại",
				});
			} finally {
				setInFlight((s) => {
					const c = new Set(s);
					c.delete(menuId);
					return c;
				});
			}
		},
		[localCart, dispatch, restaurantId]
	);

	// ---------- remove theo menuId ----------
	const handleRemove = useCallback(
		async (menuId) => {
			const snapshot = JSON.parse(JSON.stringify(localCart));
			// local optimistic remove
			removeLocalByMenuId(menuId);

			try {
				setInFlight((s) => new Set(s).add(menuId));
				// nếu có server cart id -> gọi removeCartItem(serverCartId)
				const local = snapshot.find((p) => String(p.menuId) === String(menuId));
				const serverCartId = local?.cartItemId;
				if (serverCartId) {
					const res = await dispatch(removeCartItem(serverCartId));
					if (res?.error) throw res.error;
				}
				// sync authoritative
				const fresh = await dispatch(getCartItems(restaurantId));
				const freshPayload = fresh?.payload ?? fresh;
				if (freshPayload?.cartItemsList)
					setLocalCart(freshPayload.cartItemsList.map(normalizeServerCartItem));
			} catch (err) {
				setLocalCart(snapshot);
				console.error("Xoá món thất bại", err);
				notification.error({
					message: "Xoá thất bại",
					description: err?.message || "Vui lòng thử lại",
				});
			} finally {
				setInFlight((s) => {
					const c = new Set(s);
					c.delete(menuId);
					return c;
				});
			}
		},
		[localCart, dispatch, restaurantId]
	);

	return (
		<Layout className="w-100 bg-white">
			{!drawerOpen && (
				<div style={{ position: "fixed", right: 24, top: 100, zIndex: 1200 }}>
					<Badge count={totalCount} offset={[0, 6]}>
						<Button
							type="primary"
							shape="circle"
							size="large"
							icon={<ShoppingCartOutlined />}
							onClick={() => setDrawerOpen(true)}
						/>
					</Badge>
				</div>
			)}

			<Content style={{ padding: "40px 30px" }}>
				<Row gutter={[24, 24]}>
					<Col span={24}>
						<Title level={2} style={{ textAlign: "center" }}>
							Danh sách thực đơn
						</Title>
					</Col>

					<Col xs={24} md={16}>
						<Row gutter={[16, 16]}>
							{listMenu?.menuList?.map((m) => {
								const matched = findByMenuId(m._id);
								const qtyInCart = matched?.quantity ?? undefined;
								return (
									<Col key={m._id}>
										<CardMenu
											item={m}
											cartQty={qtyInCart}
											// lưu ý: onAdd nhận (menuId, menuItem, qty)
											onAdd={(menuId, menuItem, qty) =>
												addToCart(menuId, menuItem, qty)
											}
										/>
									</Col>
								);
							})}
						</Row>
					</Col>

					<Col xs={24} md={8}>
						<div
							style={{
								border: "1px solid #f0f0f0",
								borderRadius: 8,
								padding: 12,
								background: "#fff",
							}}
						>
							<Title level={4}>Tóm tắt giỏ hàng</Title>
							{localCart.length === 0 ? (
								<div>Chưa có món</div>
							) : (
								<>
									{localCart.map((it) => (
										<CardCart
											key={it.menuId ?? it.cartItemId ?? it.name}
											item={it}
											onRemove={(menuId) => handleRemove(menuId)}
											onUpdateQty={(q) => updateQty(it.menuId, q)}
										/>
									))}

									<div
										style={{
											marginTop: 12,
											display: "flex",
											justifyContent: "space-between",
										}}
									>
										<div>Tổng</div>
										<div style={{ fontWeight: 700 }}>
											{totalPrice.toLocaleString("vi-VN")} đ
										</div>
									</div>
								</>
							)}
						</div>
					</Col>
				</Row>

				<Drawer
					title="Giỏ hàng"
					placement="right"
					onClose={() => setDrawerOpen(false)}
					open={drawerOpen}
					width={420}
				>
					{localCart.length === 0 ? (
						<div>Chưa có món</div>
					) : (
						<>
							{localCart.map((it) => (
								<CardCart
									key={it.menuId ?? it.cartItemId ?? it.name}
									item={it}
									onRemove={(menuId) => handleRemove(menuId)}
									onUpdateQty={(q) => updateQty(it.menuId, q)}
								/>
							))}

							<div
								style={{
									marginTop: 12,
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<div>Tổng</div>
								<div style={{ fontWeight: 700 }}>
									{totalPrice.toLocaleString("vi-VN")} đ
								</div>
							</div>

							<div style={{ marginTop: 12, display: "flex", gap: 8 }}>
								<Button type="primary" block>
									Thanh toán
								</Button>
								<Button block onClick={() => setLocalCart([])}>
									Xoá hết
								</Button>
							</div>
						</>
					)}
				</Drawer>
			</Content>
		</Layout>
	);
}
