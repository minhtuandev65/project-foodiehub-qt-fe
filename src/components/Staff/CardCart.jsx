import React from "react";
import { Typography, InputNumber, Button, Space, Tooltip } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function CardCart({ item, onUpdateQty, onRemove }) {
	const menuId = item.menuId ?? item.cartItemId ?? item._id ?? item.name;
	const qty = Number(item.quantity ?? 1);
	const unitPrice = Number(item.unitPrice ?? item.price ?? 0);
	const total = Number(item?.totalPriceItem || 0);
	const maxAvailable =
		item.available != null ? Number(item.available) : undefined;

	const decrease = () => {
		const next = qty - 1;
		if (next >= 1) onUpdateQty?.(next, -1);
		else onRemove?.(menuId);
	};

	const increase = () => {
		const next = qty + 1;
		if (maxAvailable != null && next > maxAvailable) return;
		onUpdateQty?.(next, 1);
	};

	// const onChangeInput = (val) => {
	// 	const v = Number(val) || 0;
	// 	if (v <= 0) onRemove?.(menuId);
	// 	else {
	// 		if (maxAvailable != null && v > maxAvailable) onUpdateQty?.(maxAvailable);
	// 		else onUpdateQty?.(v);
	// 	}
	// };

	return (
		<div
			style={{
				display: "flex",
				gap: 12,
				alignItems: "center",
				marginBottom: 12,
				borderBottom: "1px dashed #f0f0f0",
				paddingBottom: 12,
			}}
		>
			<img
				src={item.imageURL}
				alt={item.name}
				style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 6 }}
			/>
			<div style={{ flex: 1 }}>
				<Text strong>{item.name}</Text>
				<div
					style={{
						marginTop: 8,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						gap: 12,
					}}
				>
					<div>
						<div style={{ fontSize: 12, color: "#888" }}>
							{unitPrice.toLocaleString("vi-VN")} đ{" "}
							<span style={{ marginLeft: 6 }}>(/1)</span>
						</div>
						<div style={{ fontWeight: 700 }}>
							{total.toLocaleString("vi-VN")} đ
						</div>
					</div>

					<Space>
						<Tooltip title="Giảm">
							<Button
								icon={<MinusOutlined />}
								size="small"
								onClick={decrease}
							/>
						</Tooltip>
						<InputNumber
							min={1}
							value={qty}
							// onChange={onChangeInput}
							readOnly
							size="small"
							style={{ width: 80 }}
							max={maxAvailable}
						/>
						<Tooltip title="Tăng">
							<Button icon={<PlusOutlined />} size="small" onClick={increase} />
						</Tooltip>
						<Button
							type="text"
							danger
							icon={<DeleteOutlined />}
							onClick={() => onRemove?.(menuId)}
						/>
					</Space>
				</div>
			</div>
		</div>
	);
}
