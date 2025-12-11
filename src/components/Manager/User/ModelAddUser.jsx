import { Form, Input, Modal, Button, Upload, TimePicker, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addStaffRestaurant } from '../../../redux/reducer/modules/ManagerReducer'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
const { Option } = Select

function ModelAddUser({ open, onCancel }) {
    const [form] = useForm()
    const { loadingAddStaff } = useSelector((state) => state.manager)
    const {restaurantId}= useParams()
    const dispatch = useDispatch()


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
            const data= {
                ...values,
                workStartTime: dayjs(values?.workStartTime).format('HH:mm'),
                workEndTime: dayjs(values?.workEndTime).format('HH:mm'),
                restaurantId
            }
            const result = await dispatch(addStaffRestaurant(data))
            if(result?.payload?.data?.status=='success'){
                onCancel()
            }
            // const formData = new FormData();

            // Format thời gian và append
            // if (values.wordStartTime) {
            //     formData.append("wordStartTime", values.wordStartTime.format("HH:mm"));
            // }
            // if (values.wordEndTime) {
            //     formData.append("wordEndTime", values.wordEndTime.format("HH:mm"));
            // }

            // Append các field khác (text input, select...)
            // Object.keys(values).forEach((key) => {
            //     if (key !== "wordStartTime" && key !== "wordEndTime") {
            //         if (key !== "logoURL" && key !== "businessCertificateImage" && key !== "businessCertificateFile") {
            //             if (Array.isArray(values[key])) {
            //                 values[key].forEach((item) => {
            //                     formData.append(`${key}[]`, item)
            //                 })
            //             } else {
            //                 formData.append(key, values[key])
            //             }
            //         }
            //     }
            // })
            // await dispatch(handleCreateNewRestaurant(formData))
            // onCancel()

        } catch (error) {
            console.log(error)
        }
    };


    // Xử lý đóng modal
    const handleCancel = () => {
        form.resetFields()
        // Reset các state chứa file
        onCancel()
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
                    loading={loadingAddStaff}
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
                        name="workStartTime"
                        style={{ flex: 1 }}
                        rules={[
                            { required: true, message: 'Vui lòng chọn giờ vào làm!' }
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
                        name="workEndTime"
                        style={{ flex: 1 }}
                        rules={[
                            { required: true, message: 'Vui lòng chọn giờ nghỉ làm!' }
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
                    name="workDays"
                    rules={[
                        { required: true, message: 'Vui lòng chọn ngày làm!' }
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