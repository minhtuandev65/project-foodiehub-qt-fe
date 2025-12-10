import Icon, {
	CloseOutlined,
	DeleteFilled,
	EditFilled,
	FormOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Table, Typography, Tag } from "antd";
import React, { useEffect, useState } from "react";
import ModalAddRes from "../../../components/Manager/ListRestaurant/ModalAddRes";
import ModalEditRes from "../../../components/Manager/ListRestaurant/ModalEditRes";
import { useDispatch, useSelector } from "react-redux";
import { handleSeeDetailRes } from "../../../redux/reducer/modules/ManagerReducer";
import { Link, useNavigate } from "react-router-dom";
import ManagerPaths from "../../../Paths/ManagerPaths";
import { t } from "i18next";
import {
	getUserBookTableList,
	userCancelBookTable,
} from "../../../redux/reducer/modules/StaffReducer";
import addFood from "../../../assets/svg/addFood";
import StaffPaths from "../../../Paths/StaffPaths";
import dayjs from "dayjs";

function BookingHistory() {
	const { listUserBookTable } = useSelector((state) => state.staff);
	const [open, setOpen] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getUserBookTableList());
	}, []);

	const handleCancelBook = async ({ restaurantId, tableId }) => {
		try {
			dispatch(userCancelBookTable({ restaurantId, tableId }));

			setOpen(false);
		} catch (err) {
			console.log("Validate thất bại:", err);
		}
	};
	const columns = [
		{
			title: t("table_name"),
			dataIndex: "tableName",
			key: "tableName",
			sorter: (a, b) => a.tableName.localeCompare(b.tableName),
			render: (text, record) => {
				return (
					<Typography.Text
						style={{ cursor: "pointer" }}
						onClick={() => {
							// navigate(`/${ManagerPaths.RES_DETAIL.replace(':restaurantId', record?._id)}`)
						}}
					>
						{record?.tableName}
					</Typography.Text>
				);
			},
		},
		{
			title: t("restaurantName"),
			dataIndex: "restaurantName",
			key: "restaurantName",
			render: (text, record) => {
				return <Typography.Text>{record?.restaurantName}</Typography.Text>;
			},
		},
		{
			title: t("table_category"),
			key: "categories",
			render: (categories) => {
				let color = categories == 1 ? "green" : "orange";
				let text = categories == 1 ? t("normal") : "VIP";
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: 'Ngày đặt',
			key: "date",
			render: (date, record) => {
				console.log(record)
				return <Typography.Text>{dayjs(record?.date).format("DD/MM/YYYY")}</Typography.Text>;
			},
		},
		{
			title: 'Giờ đặt',
			key: "date",
			render: (date, record) => {
				return <Typography.Text>{record?.startTime}</Typography.Text>;
			},
			width:200
		},
		{
			title: 'Giờ kết thúc dự kiến',
			key: "date",
			render: (date, record) => {
				return <Typography.Text>{record?.endTime}</Typography.Text>;
			},
			width:200
		},
		{
			title: t("statusOrder"),
			dataIndex: "statusCartItem",
			key: "statusCartItem",
			render: (statusCartItem) => {
				let color =
					statusCartItem === 1
						? "green"
						: statusCartItem === 2
						? "orange"
						: "red";
				let text =
					statusCartItem === 1
						? "Đã lên món"
						: statusCartItem === 2
						? "Đang xử lý"
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
						{record?.status == 1 && (
							<Button
								type="text"
								size="small"
								icon={<FormOutlined style={{ color: "gr" }} />}
								onClick={() => {
									handleCancelBook({
										restaurantId: record?.restaurantId,
										tableId: record?.tableId,
									});
								}}
							>
								{t("cancel")}
							</Button>
						)}
						{record?.statusCartItem == 3 && (
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
										`${StaffPaths.RES_MENU.replace(
											":restaurantId",
											record?.restaurantId
										)}`
									);
								}}
							>
								{"Xem món"}
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

	const handleDetail = async (id) => {
		dispatch(handleSeeDetailRes(id));
		setOpenEdit(true);
	};
	const bookTableList = listUserBookTable?.bookTableList || [];
	return (
		<Row className="mt-0 me-0 mt-5" style={{ padding: "72px 20px 0 20px" }}>
			<Col span={24}>
				<Card className="table-card">
					<Row>
						<Col span={24} className="d-flex justify-content-between">
							<Typography.Title level={4}>
								{t("historyBookTable")}
							</Typography.Title>
						</Col>
						<Col span={24}>
							<Table
								columns={columns}
								dataSource={bookTableList}
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

export default BookingHistory;
