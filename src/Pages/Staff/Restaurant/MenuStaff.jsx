import React, { useEffect, useState, useCallback } from "react";
import CardMenu from "../../../components/Staff/CardMenu";
import CardCart from "../../../components/Staff/CardCart";
import { useParams } from "react-router-dom";
import { Col, Layout, Row, Typography, Badge, Button, Drawer } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
	getCartItemsStaff,
	getListMenu,
	increaseQuantity,
	decreaseQuantity,
	removeCartItem,
	setListCartItems,
} from "../../../redux/reducer/modules/StaffReducer";
import { useDispatch, useSelector } from "react-redux";

const { Content } = Layout;
const { Title } = Typography;

export default function MenuStaff() {
	const { restaurantId } = useParams();
	const { bookTableId } = useParams();
	const dispatch = useDispatch();
	const { listMenu, listCartItemsStaff } = useSelector((s) => s.staff);
	const [localCart, setLocalCart] = useState([]); // store items keyed by menuId
	const [drawerOpen, setDrawerOpen] = useState(false);
	console.log("listCartItems", listCartItemsStaff);
	// Normalize server cart item -> local shape, sử dụng menuId nếu server trả
	const normalizeServerCartItem = (srv) => {
		const qty = Number(srv.quantity ?? 1);
		return {
			...srv,
			cartItemId: srv._id,
			menuId: srv.menuId ?? null, // server hiện đã trả menuId
			name: srv.name,
			imageURL: srv.imageURL,
			quantity: qty,
		};
	};

	// Load menu + cart khi mount
	useEffect(() => {
		if (!restaurantId) return;
		dispatch(getListMenu(restaurantId));
		(async () => {
			try {
				const res = await dispatch(getCartItemsStaff(bookTableId));
				const payload = res?.payload?.data ?? res?.data;
				const items = payload?.cartItemsList ?? [];
				setLocalCart(items.map(normalizeServerCartItem));
			} catch (err) {
				console.error("Lấy cart thất bại", err);
			}
		})();
	}, [restaurantId, dispatch, bookTableId]);

	// Nếu redux cart thay đổi thì sync lại local
	useEffect(() => {
		if (!listCartItemsStaff?.cartItemsList) return;
		setLocalCart(listCartItemsStaff.cartItemsList.map(normalizeServerCartItem));
	}, [listCartItemsStaff]);

	// helpers
	const findByMenuId = (menuId) =>
		localCart.find((c) => String(c.menuId) === String(menuId));

	const totalCount = localCart.reduce(
		(s, it) => s + (Number(it.quantity) || 0),
		0
	);

	const updateQty = (item, choose) => {
		const dataUpdate = listCartItemsStaff?.cartItemsList?.map((itemA) => {
			if (item?.cartItemId == itemA?._id) {
				return {
					...itemA,
					quantity: itemA.quantity + choose,
				};
			}
			return itemA;
		});
		dispatch(setListCartItems(dataUpdate));
		if (choose > 0) {
			dispatch(increaseQuantity(item?.cartItemId));
		} else {
			dispatch(decreaseQuantity(item?.cartItemId));
		}
	};

	const handleRemove = async (item) => {
		const dataUpdate = listCartItemsStaff?.cartItemsList?.filter(
			(itemA) => itemA?._id != item?.cartItemId
		);
		await dispatch(setListCartItems(dataUpdate));
		dispatch(removeCartItem(item?.cartItemId));
	};
	const totalPrice = listCartItemsStaff?.totalPrice || 0;
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

			<Content style={{ padding: "80px 30px" }}>
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
										<CardMenu item={m} cartQty={qtyInCart} />
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
											onRemove={() => handleRemove(it)}
											onUpdateQty={(q, choose) => updateQty(it, choose)}
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
