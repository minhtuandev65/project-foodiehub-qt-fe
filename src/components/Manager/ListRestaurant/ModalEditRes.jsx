import {
	Form,
	Input,
	Modal,
	Button,
	Upload,
	TimePicker,
	Select,
	Image,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleEditRestaurant } from "../../../redux/reducer/modules/ManagerReducer";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

function ModalAddRes({ open, onCancel }) {
	const { itemDetail, loadingEdit } = useSelector((state) => state.manager);
	const [form] = useForm();
	const dispatch = useDispatch();

	useEffect(() => {
		if (itemDetail?._id) {
			form.setFieldValue("phone", itemDetail?.phone);
			form.setFieldValue("name", itemDetail?.name);
			form.setFieldValue("description", itemDetail?.description);
			form.setFieldValue("address", itemDetail?.address);
			form.setFieldValue("openDays", itemDetail?.openDays);
			form.setFieldValue("email", itemDetail?.email);

			if (itemDetail?.openTime) {
				form.setFieldValue("openTime", dayjs(itemDetail.openTime, "HH:mm"));
			}
			if (itemDetail?.closeTime) {
				form.setFieldValue("closeTime", dayjs(itemDetail.closeTime, "HH:mm"));
			}
			// form.setFieldValue('openTime', itemDetail?.openTime)
			// form.setFieldValue('closeTime', itemDetail?.closeTime)
			if (itemDetail?.logoURL) {
				setLogoFile(itemDetail?.logoURL);
			}
			if (itemDetail?.businessCertificateImageKey) {
				setBusinessCertificateImageFile(
					itemDetail?.businessCertificateImageKey
				);
			}
			if (itemDetail?.businessCertificateFileKey) {
				setBusinessCertificateDocFile(itemDetail?.businessCertificateFileKey);
			}
		}
	}, [itemDetail?._id]);

	const [logoFile, setLogoFile] = useState([]);
	const [businessCertificateImageFile, setBusinessCertificateImageFile] =
		useState([]);
	const [businessCertificateDocFile, setBusinessCertificateDocFile] = useState(
		[]
	);

	// Danh sách các ngày trong tuần
	const daysOfWeek = [
		{ label: "Thứ 2", value: 1 },
		{ label: "Thứ 3", value: 2 },
		{ label: "Thứ 4", value: 3 },
		{ label: "Thứ 5", value: 4 },
		{ label: "Thứ 6", value: 5 },
		{ label: "Thứ 7", value: 6 },
		{ label: "Chủ nhật", value: 0 },
	];
	const handleSubmit = async (values) => {
		try {
			const formData = new FormData();

			// Format thời gian và append
			if (values.openTime) {
				formData.append("openTime", values.openTime.format("HH:mm"));
			}
			if (values.closeTime) {
				formData.append("closeTime", values.closeTime.format("HH:mm"));
			}

			// Append các field khác (text input, select...)
			Object.keys(values).forEach((key) => {
				if (key !== "openTime" && key !== "closeTime") {
					if (
						key !== "logoURL" &&
						key !== "businessCertificateImage" &&
						key !== "businessCertificateFile"
					) {
						if (Array.isArray(values[key])) {
							values[key].forEach((item) => {
								formData.append(`${key}[]`, item);
							});
						} else {
							formData.append(key, values[key]);
						}
					}
				}
			});

			// Append file
			if (logoFile[0]?.originFileObj) {
				formData.append("logoURL", logoFile[0].originFileObj);
			}
			if (businessCertificateImageFile[0]?.originFileObj) {
				formData.append(
					"businessCertificateImage",
					businessCertificateImageFile[0].originFileObj
				);
			}
			if (businessCertificateDocFile[0]?.originFileObj) {
				formData.append(
					"businessCertificateFile",
					businessCertificateDocFile[0].originFileObj
				);
			}

			for (let [key, value] of formData.entries()) {
				// console.log(key, value)
			}
			await dispatch(
				handleEditRestaurant({ id: itemDetail?._id, values: formData })
			);
			onCancel();
		} catch (error) {
			console.log(error);
		}
	};

	// Xử lý đóng modal
	const handleCancel = () => {
		form.resetFields();
		// Reset các state chứa file
		setLogoFile([]);
		setBusinessCertificateImageFile([]);
		setBusinessCertificateDocFile([]);
		onCancel();
	};

	return (
		<Modal
			title="Chi tiết nhà hàng"
			open={open}
			onCancel={handleCancel}
			footer={[
				<Button key="cancel" onClick={handleCancel}>
					Hủy
				</Button>,
				<Button
					key="submit"
					type="primary"
					loading={loadingEdit}
					onClick={() => form.submit()}
				>
					Cập nhật nhà hàng
				</Button>,
			]}
			width={800}
			destroyOnClose
		>
			<Form
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				scrollToFirstError
			>
				{/* Tên nhà hàng */}
				<Form.Item
					label="Tên nhà hàng"
					name="name"
					rules={[
						{ required: true, message: "Vui lòng nhập tên nhà hàng!" },
						{ min: 2, message: "Tên nhà hàng phải có ít nhất 2 ký tự!" },
					]}
				>
					<Input placeholder="Nhập tên nhà hàng" />
				</Form.Item>

				{/* Mô tả */}
				<Form.Item
					label="Mô tả"
					name="description"
					rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
				>
					<TextArea
						rows={4}
						placeholder="Nhập mô tả về nhà hàng"
						maxLength={500}
						showCount
					/>
				</Form.Item>

				{/* Thông tin liên hệ */}
				<div style={{ display: "flex", gap: "16px" }}>
					<Form.Item
						label="Số điện thoại"
						name="phone"
						style={{ flex: 1 }}
						rules={[
							{ required: true, message: "Vui lòng nhập số điện thoại!" },
							{
								pattern: /^[0-9]{10,11}$/,
								message: "Số điện thoại không hợp lệ!",
							},
						]}
					>
						<Input placeholder="Nhập số điện thoại" />
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						style={{ flex: 1 }}
						rules={[
							{ required: true, message: "Vui lòng nhập email!" },
							{ type: "email", message: "Email không hợp lệ!" },
						]}
					>
						<Input placeholder="Nhập email" />
					</Form.Item>
				</div>

				{/* Địa chỉ */}
				<Form.Item
					label="Địa chỉ"
					name="address"
					rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
				>
					<Input placeholder="Nhập địa chỉ nhà hàng" />
				</Form.Item>

				{/* Thời gian hoạt động */}
				<div style={{ display: "flex", gap: "16px" }}>
					<Form.Item
						label="Giờ mở cửa"
						name="openTime"
						style={{ flex: 1 }}
						rules={[{ required: true, message: "Vui lòng chọn giờ mở cửa!" }]}
					>
						<TimePicker
							format="HH:mm"
							placeholder="Chọn giờ mở cửa"
							style={{ width: "100%" }}
						/>
					</Form.Item>

					<Form.Item
						label="Giờ đóng cửa"
						name="closeTime"
						style={{ flex: 1 }}
						rules={[{ required: true, message: "Vui lòng chọn giờ đóng cửa!" }]}
					>
						<TimePicker
							format="HH:mm"
							placeholder="Chọn giờ đóng cửa"
							style={{ width: "100%" }}
						/>
					</Form.Item>
				</div>

				{/* Ngày hoạt động */}
				<Form.Item
					label="Ngày hoạt động"
					name="openDays"
					rules={[{ required: true, message: "Vui lòng chọn ngày hoạt động!" }]}
				>
					<Select
						mode="multiple"
						placeholder="Chọn các ngày hoạt động"
						optionLabelProp="label"
					>
						{daysOfWeek.map((day) => (
							<Option key={day.value} value={day.value} label={day.label}>
								{day.label}
							</Option>
						))}
					</Select>
				</Form.Item>

				{/* Logo */}
				<Form.Item label="Hình ảnh nhà hàng" name="logoURL">
					{/* <Upload
                        disabled={true }
                        {...uploadProps}
                        listType="picture-card"
                        fileList={logoFile}
                        beforeUpload={handleLogoUpload}
                        onRemove={() => setLogoFile([])}
                    >
                        {logoFile.length === 0 && (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Tải lên Logo</div>
                            </div>
                        )}
                    </Upload> */}
					<Image src={logoFile} width={100} alt="" />
				</Form.Item>

				{/* Giấy chứng nhận kinh doanh (hình ảnh) */}
				<Form.Item
					label="Hình ảnh giấy chứng nhận kinh doanh"
					name="businessCertificateImage"
				>
					<Image src={businessCertificateImageFile} width={100} alt="" />
				</Form.Item>

				{/* File giấy chứng nhận kinh doanh */}
				<Form.Item
					label="File giấy chứng nhận kinh doanh"
					name="businessCertificateFile"
				>
					<a
						href={businessCertificateDocFile}
						style={{
							whiteSpace: "nowrap",
							display: "block",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
						target="_blank"
						rel="noopener noreferrer"
					>
						{businessCertificateDocFile}
					</a>
				</Form.Item>
			</Form>
		</Modal>
	);
}

export default ModalAddRes;
