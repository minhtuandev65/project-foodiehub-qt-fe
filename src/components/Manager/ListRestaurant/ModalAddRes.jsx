import { Form, Input, Modal, Button, Upload, TimePicker, Select, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import dayjs from 'dayjs'

const { TextArea } = Input
const { Option } = Select

function ModalAddRes({ open, onCancel, onSubmit }) {
    const [form] = useForm()
    const [loading, setLoading] = useState(false)
    
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
        { label: 'Chủ nhật', value: 0}
    ]
console.log(logoFile)
    // Xử lý submit form
    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            
            // Format thời gian
            const formattedValues = {
                ...values,
                openTime: values.openTime ? values.openTime.format('HH:mm') : null,
                closeTime: values.closeTime ? values.closeTime.format('HH:mm') : null,
                logoURL: logoFile[0]?.originFileObj || null,
                businessCertificateImage: businessCertificateImageFile[0]?.originFileObj
 || null,
                businessCertificateFile: businessCertificateDocFile[0]?.originFileObj || null
            }

            await onSubmit(formattedValues)
            form.resetFields()
            // Reset các state chứa file
            // setLogoFile([])
            // setBusinessCertificateImageFile([])
            // setBusinessCertificateDocFile([])
        } catch (error) {
            message.error('Có lỗi xảy ra, vui lòng thử lại!')
        } finally {
            setLoading(false)
        }
    }

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
            title="Thêm nhà hàng mới"
            open={open}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={() => form.submit()}
                >
                    Thêm nhà hàng
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
                    label="Tên nhà hàng"
                    name="name"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên nhà hàng!' },
                        { min: 2, message: 'Tên nhà hàng phải có ít nhất 2 ký tự!' }
                    ]}
                >
                    <Input placeholder="Nhập tên nhà hàng" />
                </Form.Item>

                {/* Mô tả */}
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mô tả!' }
                    ]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Nhập mô tả về nhà hàng"
                        maxLength={500}
                        showCount
                    />
                </Form.Item>

                {/* Thông tin liên hệ */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        style={{ flex: 1 }}
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>

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
                </div>

                {/* Địa chỉ */}
                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[
                        { required: true, message: 'Vui lòng nhập địa chỉ!' }
                    ]}
                >
                    <Input placeholder="Nhập địa chỉ nhà hàng" />
                </Form.Item>

                {/* Thời gian hoạt động */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item
                        label="Giờ mở cửa"
                        name="openTime"
                        style={{ flex: 1 }}
                        rules={[
                            { required: true, message: 'Vui lòng chọn giờ mở cửa!' }
                        ]}
                    >
                        <TimePicker
                            format="HH:mm"
                            placeholder="Chọn giờ mở cửa"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Giờ đóng cửa"
                        name="closeTime"
                        style={{ flex: 1 }}
                        rules={[
                            { required: true, message: 'Vui lòng chọn giờ đóng cửa!' }
                        ]}
                    >
                        <TimePicker
                            format="HH:mm"
                            placeholder="Chọn giờ đóng cửa"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </div>

                {/* Ngày hoạt động */}
                <Form.Item
                    label="Ngày hoạt động"
                    name="openDays"
                    rules={[
                        { required: true, message: 'Vui lòng chọn ngày hoạt động!' }
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Chọn các ngày hoạt động"
                        optionLabelProp="label"
                    >
                        {daysOfWeek.map(day => (
                            <Option key={day.value} value={day.value} label={day.label}>
                                {day.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Logo */}
                <Form.Item
                    label="Logo nhà hàng"
                    name="logoURL"
                >
                    <Upload
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
                    </Upload>
                </Form.Item>

                {/* Giấy chứng nhận kinh doanh (hình ảnh) */}
                <Form.Item
                    label="Hình ảnh giấy chứng nhận kinh doanh"
                    name="businessCertificateImage"
                >
                    <Upload
                        {...uploadProps}
                        listType="picture-card"
                        fileList={businessCertificateImageFile}
                        beforeUpload={handleBusinessCertImageUpload}
                        onRemove={() => setBusinessCertificateImageFile([])}
                    >
                        {businessCertificateImageFile.length === 0 && (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Tải lên hình ảnh</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>

                {/* File giấy chứng nhận kinh doanh */}
                <Form.Item
                    label="File giấy chứng nhận kinh doanh"
                    name="businessCertificateFile"
                >
                    <Upload
                        {...fileUploadProps}
                        fileList={businessCertificateDocFile}
                        beforeUpload={handleBusinessCertFileUpload}
                        onRemove={() => setBusinessCertificateDocFile([])}
                    >
                        <Button icon={<UploadOutlined />}>Tải lên file</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalAddRes