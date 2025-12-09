import Icon, {
	CloseOutlined,
	FormOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Table, Typography, Tag } from "antd";
import React, { useEffect, useState } from "react";
import ModalAddRes from "../../../components/Manager/ListRestaurant/ModalAddRes";
import ModalEditRes from "../../../components/Manager/ListRestaurant/ModalEditRes";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import ManagerPaths from "../../../Paths/ManagerPaths";
import { t } from "i18next";
import {
	getMyRestaurant,
	staffBookTable,
	staffCancelBookTable,
	staffCheckDoneOrder,
} from "../../../redux/reducer/modules/StaffReducer";
import addFood from "../../../assets/svg/addFood";
import StaffPaths from "../../../Paths/StaffPaths";
import dayjs from "dayjs";
import {CheckIcon } from "lucide-react";

function ListRestaurant() {
	const { listTableMyRes } = useSelector((state) => state.staff);
	const [open, setOpen] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getMyRestaurant());
	}, []);

	const handleBook = async ({ restaurantId, tableId }) => {
		try {
			dispatch(staffBookTable({ restaurantId, tableId }));

			setOpen(false);
		} catch (err) {
			console.log("Validate thất bại:", err);
		}
	};
	const handleCancelBook = async ({ restaurantId, tableId }) => {
		try {
			dispatch(staffCancelBookTable({ restaurantId, tableId }));

			setOpen(false);
		} catch (err) {
			console.log("Validate thất bại:", err);
		}
	};
	const handleCheckDoneOrder = async (cartId) => {
		try {
			dispatch(staffCheckDoneOrder(cartId));
			setOpen(false);
		} catch (error) {
			console.log("Validate thất bại:", error);
		}
	};
	const columns = [
		{
			title: t("name"),
			dataIndex: "name",
			key: "name",
			sorter: (a, b) => a.name.localeCompare(b.name),
			render: (text, record) => {
				return (
					<Typography.Text
						style={{ cursor: "pointer" }}
						onClick={() => {
							navigate(
								`/${ManagerPaths.RES_DETAIL.replace(
									":restaurantId",
									record?._id
								)}`
							);
						}}
					>
						{record?.name}
					</Typography.Text>
				);
			},
		},
		{
			title: t("table_image"),
			dataIndex: "imageURL",
			key: "position",
			render: (text, record) => {
				return (
					<img
						style={{ width: 50, height: "auto" }}
						src={record?.imageURL}
						alt=""
					/>
				);
			},
		},
		{
			title: t("table_category"),
			dataIndex: "categories",
			key: "categories",
			render: (categories) => {
				let color = categories == 1 ? "green" : "orange";
				let text = categories == 1 ? t("normal") : "VIP";
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: "Ngày đặt bàn",
			dataIndex: "date",
			key: "submitDate",
			render: (text) => {
				if (!text) return "";
				const dt = dayjs(text);
				return dt.isValid() ? dt.format("DD-MM-YYYY") : text;
			},
		},
		{
			title: "Thời gian đặt bàn",
			dataIndex: "time",
			key: "time",
			render: (_, record) => {
				return (
					<Typography.Text>
						{record?.time.startTime} - {record?.time.endTime}
					</Typography.Text>
				);
			},
		},
		{
			title: "Hình thức đặt bàn",
			dataIndex: "bookOffline",
			key: "bookOffline",
			render: (bookOffline) => {
				let color =
					bookOffline === false
						? "green"
						: bookOffline === true
						? "red"
						: "orange";
				let text =
					bookOffline === false
						? "Trực tuyến"
						: bookOffline === true
						? "Tại chỗ"
						: "Chưa đặt";
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: t("status"),
			dataIndex: "isBooked",
			key: "isBooked",
			render: (isBooked) => {
				let color = isBooked === false ? "green" : "red";
				let text = isBooked === false ? t("empty") : t("booked");
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: "Trạng thái món ăn",
			dataIndex: "status",
			key: "status",
			render: (status) => {
				let color = status === 1 ? "green" : status === 2 ? "orange" : "red";
				let text =
					status === 1
						? "Đã lên món"
						: status === 2
						? "Đã gọi món"
						: "Chưa gọi món";
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: t("action"),
			key: "action",
			render: (text, record) => {
				return (
					<Space size="middle">
						{record?.isBooked == true && (
							<Button
								type="text"
								size="small"
								icon={
									<Icon
										className="d-flex align-items-center"
										component={addFood}
									/>
								}
								onClick={() => {
									navigate(
										`${StaffPaths.STAFF_ORDER.replace(
											":bookTableId",
											record?.bookTableId
										).replace(":restaurantId", record?.restaurantId)}`
									);
								}}
							>
								{t("order")}
							</Button>
						)}
						{record?.isBooked == false ? (
							<Button
								type="text"
								size="small"
								icon={<FormOutlined style={{ color: "gr" }} />}
								onClick={() => {
									handleBook({
										restaurantId: record?.restaurantId,
										tableId: record?._id,
									});
								}}
							>
								{t("book_table")}
							</Button>
						) : (
							<Button
								type="text"
								size="small"
								icon={<CloseOutlined style={{ color: "red" }} />}
								onClick={() => {
									handleCancelBook({
										restaurantId: record?.restaurantId,
										tableId: record?._id,
									});
								}}
							>
								{t("cancel")}
							</Button>
						)}
					</Space>
				);
			},
		},
		{
			title: "Cập nhật trạng thái món",
			key: "status",
			render: (record) => {
				console.log(record);
				return (
					<Space size="middle">
						{record?.isBooked == true && (
							<Button
								type="text"
								size="small"
								icon={<CheckIcon style={{ color: "green" }} />}
								onClick={() => {
									handleCheckDoneOrder(record?.cartId);
								}}
							>
								{"Lên món"}
							</Button>
						)}
					</Space>
				);
			},
		},
	];

	const handleCancel = () => {
		setOpen(false);
	};
	const handleCancelEdit = () => {
		setOpenEdit(false);
	};



	return (
		<Row className="mt-0 me-0 mt-5" style={{ padding: "72px 20px 0 20px" }}>
			<Col span={24}>
				<Card className="table-card">
					<Row>
						<Col span={24} className="d-flex justify-content-between">
							<Typography.Title level={4}>{t("listTable")}</Typography.Title>
						</Col>
						<Col span={24}>
							<Table
								columns={columns}
								dataSource={listTableMyRes.data}
								pagination={{
									pageSize: 10,
									showSizeChanger: true,
									showQuickJumper: true,
									showTotal: (total, range) =>
										`${range[0]}-${range[1]} của ${total} CV`,
								}}
								scroll={{ x: 1000 }}
							/>
						</Col>
					</Row>
				</Card>
			</Col>
			<ModalAddRes open={open} onCancel={handleCancel} />
			<ModalEditRes open={openEdit} onCancel={handleCancelEdit} />
		</Row>
	);
}

export default ListRestaurant;
