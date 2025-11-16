import { FileTextOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Modal, Rate, Row, Typography, DatePicker } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useForm } from 'antd/es/form/Form';
import React, { useState } from 'react'
const { RangePicker } = DatePicker;

function CardTable({ item }) {
    const [open, setOpen] = useState(false)
    const [form]= useForm()
    const handleBook=async()=>{
       await form.validateFields()
        console.log(form.getFieldsValue())
    }
    return (
        <>
            <Card
                className='w-100'
                style={{ cursor: 'pointer' }}
                cover={
                    <div style={{ height: 250 }}>
                        <img
                            src={item?.imageURL}
                            style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: '8px 8px 0 0' }}
                        />
                    </div>
                }

            >
                <Meta
                    title={<Typography.Title level={5} className='m-0'>{item?.name}</Typography.Title>}
                    description={
                        <Row className='w-100' gutter={[10, 10]}>
                            <Col span={24}>
                                <Typography.Text ellipsis={{ rows: 2 }} >
                                    <FileTextOutlined className='me-2' style={{ color: 'var(--color-primary)' }} />
                                    {item?.description}
                                </Typography.Text>
                            </Col>
                            <Col span={24} className='d-flex'>
                                <Typography.Text>
                                    Loại bàn: {item?.categories == 1 ? 'Thường' : 'VIP'}
                                </Typography.Text>
                            </Col>
                            <Col span={24} className='d-flex justify-content-center'>
                                <Button onClick={() => { setOpen(true) }} style={{ background: 'var(--color-primary)', color: '#fff' }}>Đặt bàn</Button>
                            </Col>
                        </Row>
                    }
                />
            </Card>
            <Modal centered open={open} onCancel={() => { setOpen(false) }} title={`Thông tin đặt bàn ${item?.name}`} footer={
                <Button style={{ background: 'var(--color-primary)', color: '#fff' }} onClick={()=>{
                    handleBook()
                }}>Đặt</Button>
            }>
                <Row>
                    <Col span={24}>
                        <Form form={form} layout='vertical' className='w-100'>
                            <Form.Item  name="bookingTime" label='Thời gian đặt' required>
                                <DatePicker format={'DD/MM/YYYY HH:mm'} showTime className='w-100'/>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={24}>
                        <Typography.Title level={5}>Khung giờ đã được đặt</Typography.Title>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default CardTable