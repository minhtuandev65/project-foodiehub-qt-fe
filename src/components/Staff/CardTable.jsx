import React, { useEffect, useState } from "react";
import { FileTextOutlined } from "@ant-design/icons";
import {
	Button,
	Card,
	Col,
	Form,
	Modal,
	Row,
	Typography,
	DatePicker,
	Tag,
	Divider,
	Space,
} from "antd";
import Meta from "antd/es/card/Meta";
import { useForm } from "antd/es/form/Form";
import {
	bookingTable,
	getBookingTable,
} from "../../redux/reducer/modules/StaffReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const { Title, Text } = Typography;

function CardTable({ item }) {
	const { restaurantId } = useParams();
	const [open, setOpen] = useState(false);
	const [form] = useForm();
	const dispatch = useDispatch();
	const { listBookTable } = useSelector((state) => state.staff);

	// Lấy bookings khi modal mở hoặc item/restaurant thay đổi
	useEffect(() => {
		if (!open) return;
		if (!restaurantId || !item?._id) return;
		const data = { restaurantId, tableId: item._id };
		dispatch(getBookingTable(data));
	}, [open, restaurantId, item?._id, dispatch]);
	console.log("listBookTable", listBookTable);

	const handleBook = async ({ restaurantId, tableId }) => {
		try {
			const values = await form.validateFields();

			// bookingTime là moment
			const date = values.bookingTime
				? values.bookingTime.format("YYYY-MM-DD")
				: null;
			const startTime = values.bookingTime
				? values.bookingTime.format("HH:mm")
				: null;

			const payload = { tableId, date, startTime, restaurantId };

			dispatch(bookingTable(payload));

			setOpen(false);
			form.resetFields();
		} catch (err) {
			console.log("Validate thất bại:", err);
		}
	};

	const renderStatusTag = (status) => {
		if (!status) return null;
		const s = Number(status);
		if (s === 1) return <Tag color="green">Đã đặt</Tag>;
		if (s === 2) return <Tag color="red">Chưa đặt</Tag>;
		return <Tag>{status}</Tag>;
	};

	// Chuẩn hóa mảng bookings từ cấu trúc server
	const bookings = listBookTable?.bookTableList || [];
	console.log(bookings);
	const total = listBookTable?.data?.total ?? bookings.length;

	return (
		<>
			<Card
				className="w-100"
				style={{ cursor: "pointer" }}
				cover={
					<div style={{ height: 250 }}>
						<img
							src={item?.imageURL}
							style={{
								objectFit: "cover",
								height: "100%",
								width: "100%",
								borderRadius: "8px 8px 0 0",
							}}
							alt={item?.name}
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
						<Row className="w-100" gutter={[10, 10]}>
							<Col span={24}>
								<Text ellipsis={{ rows: 2 }}>
									<FileTextOutlined
										className="me-2"
										style={{ color: "var(--color-primary)" }}
									/>
									{item?.description}
								</Text>
							</Col>
							<Col span={24} className="d-flex">
								<Text>
									Loại bàn: {item?.categories == 1 ? "Thường" : "VIP"}
								</Text>
							</Col>
							<Col span={24} className="d-flex justify-content-center">
								<Button
									onClick={() => {
										setOpen(true);
										// không gọi dispatch trực tiếp ở đây — useEffect sẽ làm khi open = true
									}}
									style={{ background: "var(--color-primary)", color: "#fff" }}
								>
									Đặt bàn
								</Button>
							</Col>
						</Row>
					}
				/>
			</Card>

			<Modal
				centered
				open={open}
				onCancel={() => {
					setOpen(false);
				}}
				title={`Thông tin đặt bàn ${item?.name}`}
				footer={
					<Button
						style={{ background: "var(--color-primary)", color: "#fff" }}
						onClick={() => {
							handleBook({ restaurantId, tableId: item?._id });
						}}
					>
						Đặt
					</Button>
				}
				width={700}
			>
				<Row gutter={16}>
					<Col xs={24} md={12}>
						<Form form={form} layout="vertical" className="w-100">
							<Form.Item
								name="bookingTime"
								label="Thời gian đặt"
								rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
							>
								<DatePicker
									format={"DD/MM/YYYY HH:mm"}
									showTime={{ format: "HH:mm" }}
									className="w-100"
								/>
							</Form.Item>
							{/* thêm các trường khác nếu cần */}
						</Form>
					</Col>

					<Col xs={24} md={12}>
						<Title level={5} style={{ marginBottom: 8 }}>
							Khung giờ đã được đặt
						</Title>
						<Divider style={{ margin: "8px 0 12px" }} />
						{total === 0 ? (
							<Text type="secondary">Chưa có khung giờ nào được đặt.</Text>
						) : (
							<Space
								direction="vertical"
								style={{ width: "100%" }}
								size="middle"
							>
								{bookings.map((booking, index) => (
									<div
										key={`${booking.date ?? "n"}-${booking.startTime ?? index}`}
										style={{
											border: "1px solid #f0f0f0",
											padding: 12,
											borderRadius: 8,
											background: "#fff",
										}}
									>
										<Row align="middle" justify="space-between">
											<Col>
												<Text strong>
													{dayjs(booking.date).format("DD/MM/YYYY")}
												</Text>
												<div>
													<Text>
														{booking.startTime}{" "}
														{booking.endTime ? `- ${booking.endTime}` : ""}
													</Text>
												</div>
											</Col>
											<Col>{renderStatusTag(booking.status)}</Col>
										</Row>
									</div>
								))}
							</Space>
						)}
					</Col>
				</Row>
			</Modal>
		</>
	);
}

export default CardTable;
