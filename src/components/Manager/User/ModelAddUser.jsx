import { Form, Input, Modal, Button, Upload, TimePicker, Select, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleCreateNewRestaurant } from '../../../redux/reducer/modules/ManagerReducer'

const { TextArea } = Input
const { Option } = Select

function ModelAddUser({ open, onCancel, itemEdit }) {
    const [form] = useForm()
    const { loadingCreate } = useSelector((state) => state.manager)
    // const {}
    const dispatch = useDispatch()

    // States để lưu ảnh upload
    const [logoFile, setLogoFile] = useState([])
    const [businessCertificateImageFile, setBusinessCertificateImageFile] = useState([])
    const [businessCertificateDocFile, setBusinessCertificateDocFile] = useState([])

    // Danh sách các ngày trong tuần
    const daysOfWeek = [
        { label: 'Thứ 2', value: 1 },
        { label: 'Thứ 3', value: 2 },
        { label: 'Thứ 4', value: 3 },
        { label: 'Thứ 5', value: 4 },
        { label: 'Thứ 6', value: 5 },
        { label: 'Thứ 7', value: 6 },
        { label: 'Chủ nhật', value: 0 }
    ]
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
                    if (key !== "logoURL" && key !== "businessCertificateImage" && key !== "businessCertificateFile") {
                        if (Array.isArray(values[key])) {
                            values[key].forEach((item) => {
                                formData.append(`${key}[]`, item)
                            })
                        } else {
                            formData.append(key, values[key])
                        }
                    }
                }
            })

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
            await dispatch(handleCreateNewRestaurant(formData))
            onCancel()

        } catch (error) {
            console.log(error)
        }
    };


    // Xử lý đóng modal
    const handleCancel = () => {
        form.resetFields()
        // Reset các state chứa file
        setLogoFile([])
        setBusinessCertificateImageFile([])
        setBusinessCertificateDocFile([])
        onCancel()
    }

    // Custom upload handlers
    const handleLogoUpload = (file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const fileObj = {
                uid: Date.now().toString(),
                name: file.name,
                status: 'done',
                url: e.target.result,
                originFileObj: file
            }
            setLogoFile([fileObj])
        }
        reader.readAsDataURL(file)
        return false // Prevent default upload behavior
    }

    const handleBusinessCertImageUpload = (file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const fileObj = {
                uid: Date.now().toString(),
                name: file.name,
                status: 'done',
                url: e.target.result,
                originFileObj: file
            }
            setBusinessCertificateImageFile([fileObj])
        }
        reader.readAsDataURL(file)
        return false
    }

    const handleBusinessCertFileUpload = (file) => {
        const fileObj = {
            uid: Date.now().toString(),
            name: file.name,
            status: 'done',
            originFileObj: file
        }
        setBusinessCertificateDocFile([fileObj])
        return false
    }

    // Props cho upload
    const uploadProps = {
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/')
            if (!isImage) {
                message.error('Chỉ được tải lên file hình ảnh!')
                return false
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                message.error('Hình ảnh phải nhỏ hơn 2MB!')
                return false
            }
            return true
        },
        maxCount: 1,
        onRemove: () => true
    }

    const fileUploadProps = {
        beforeUpload: (file) => {
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                message.error('File phải nhỏ hơn 5MB!')
                return false
            }
            return true
        },
        maxCount: 1,
        onRemove: () => true
    }

    return (
        <Modal
            title="Thêm nhân viên"
            open={open}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={loadingCreate}
                    onClick={() => form.submit()}
                >
                    Thêm nhân viên
                </Button>
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
                    label="Email"
                    name="email"
                    style={{ flex: 1 }}
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                >
                    <Input placeholder="Nhập email" />
                </Form.Item>

                {/* Thời gian hoạt động */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item
                        label="Giờ vào làm"
                        name="openTime"
                        style={{ flex: 1 }}
                        rules={[
                            { required: true, message: 'Vui lòng chọn giờ mở cửa!' }
                        ]}
                    >
                        <TimePicker
                            format="HH:mm"
                            placeholder="Chọn giờ vào làm"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Giờ nghỉ làm"
                        name="closeTime"
                        style={{ flex: 1 }}
                        rules={[
                            { required: true, message: 'Vui lòng chọn giờ đóng cửa!' }
                        ]}
                    >
                        <TimePicker
                            format="HH:mm"
                            placeholder="Chọn giờ nghỉ làm"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </div>

                {/* Ngày hoạt động */}
                <Form.Item
                    label="Ngày làm"
                    name="openDays"
                    rules={[
                        { required: true, message: 'Vui lòng chọn ngày hoạt động!' }
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Chọn ngày làm"
                        optionLabelProp="label"
                    >
                        {daysOfWeek.map(day => (
                            <Option key={day.value} value={day.value} label={day.label}>
                                {day.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModelAddUser