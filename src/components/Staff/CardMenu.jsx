// src/components/Staff/CardMenu.jsx
import React, { useEffect, useState } from "react";
import { FileTextOutlined } from "@ant-design/icons";
import {
	Button,
	Card,
	Row,
	Col,
	Typography,
	Tag,
	Tooltip,
	InputNumber,
} from "antd";
import Meta from "antd/es/card/Meta";

const { Title, Text } = Typography;

export default function CardMenu({ item, cartQty, onAdd }) {
	const [qtyLocal, setQtyLocal] = useState(1);

	useEffect(() => {
		const stock = Number(item?.quantity ?? 0);
		setQtyLocal(stock > 0 ? 1 : 0);
	}, [item?.quantity]);

	useEffect(() => {
		if (cartQty != null) setQtyLocal(Number(cartQty) > 0 ? Number(cartQty) : 1);
	}, [cartQty]);

	// --- SỬA: truyền rõ ràng menuId, item, qty về parent ---
	const handleAdd = () => {
		const qty = Number(qtyLocal) || 1;
		const menuId = item?._id; // <-- chắc chắn lấy menu _id ở đây
		if (typeof onAdd === "function") onAdd(menuId, item, qty);
		else console.warn("CardMenu: missing onAdd callback");
	};

	const priceText =
		typeof item?.price === "number"
			? item.price.toLocaleString("vi-VN") + " đ"
			: "-";
	const isAvailable = Boolean(
		item?.isAvailable ?? Number(item?.quantity ?? 0) > 0
	);
	const categoryLabel = (() => {
		const c = String(item?.categories ?? "").toLowerCase();
		if (!c) return null;
		if (["dish", "món", "mon"].includes(c)) return "Món ăn";
		if (["drink", "thức uống", "beverage"].includes(c)) return "Đồ uống";
		return c.charAt(0).toUpperCase() + c.slice(1);
	})();

	return (
		<Card
			hoverable
			style={{ height: "100%" }}
			cover={
				<div
					style={{
						height: 160,
						overflow: "hidden",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<img
						src={item?.imageURL}
						alt={item?.name}
						style={{ objectFit: "cover", width: "100%", height: "100%" }}
					/>
				</div>
			}
		>
			<Meta
				title={
					<Title level={5} className="m-0">
						{item?.name}
					</Title>
				}
				description={
					<Row gutter={[8, 8]}>
						<Col span={24}>
							<Text type="secondary">
								<FileTextOutlined className="me-2" />
								{item?.description}
							</Text>
						</Col>
						<Col span={24}>
							<Text strong style={{ fontSize: 14 }}>
								{priceText}
							</Text>
							<Text style={{ marginLeft: 8 }} type="secondary">
								Còn: {item?.quantity ?? 0}
							</Text>
							<span style={{ marginLeft: 8 }}>
								{isAvailable ? (
									<Tag color="success">Còn món</Tag>
								) : (
									<Tag color="red">Hết món</Tag>
								)}
							</span>
						</Col>
						<Col span={24} style={{ marginTop: 8, textAlign: "center" }}>
							<InputNumber
								min={1}
								max={Number(item?.quantity ?? 0)}
								value={qtyLocal}
								onChange={(v) => setQtyLocal(v)}
								disabled={!isAvailable}
								style={{ width: 100 }}
							/>
							<Tooltip title={isAvailable ? "Thêm vào giỏ" : "Món đã hết"}>
								<Button
									onClick={handleAdd}
									disabled={!isAvailable}
									style={{
										marginLeft: 8,
										background: "var(--color-primary)",
										color: "#fff",
									}}
								>
									Thêm
								</Button>
							</Tooltip>
						</Col>
					</Row>
				}
			/>
		</Card>
	);
}
