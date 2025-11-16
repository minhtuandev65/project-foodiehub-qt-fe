import { FileTextOutlined, HeartOutlined } from '@ant-design/icons'
import { Button, Card, Col, Descriptions, Rate, Row, Typography } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'

function CardTable({ item }) {
    return ( 
            <Card
                className='w-100'
                style={{ cursor: 'pointer' }}
                cover={
                    <div style={{ height: 250 }}>
                        <img
                            src={item?.imageURL}
                            style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius:'8px 8px 0 0' }}
                        />
                    </div>
                }

            >
                <Meta
                    title={<Typography.Title level={5} className='m-0'>{item?.name}</Typography.Title>}
                    description={
                        <Row className='w-100' gutter={[10,10]}>
                            <Col span={24}>
                                <Typography.Text  ellipsis={{ rows: 2 }} >
                                    <FileTextOutlined className='me-2' style={{color:'var(--color-primary)'}} />
                                    {item?.description}
                                </Typography.Text>
                            </Col>
                            <Col span={24} className='d-flex'>
                                <Typography.Text>
                                    Loại bàn: {item?.categories==1 ? 'Thường' : 'VIP'}
                                </Typography.Text>
                            </Col>
                            <Col span={24} className='d-flex justify-content-center'>
                                <Button style={{background:item?.status==1 ? 'gray': 'var(--color-primary)', color:'#fff'}}>{item?.status==1 ? 'Đã được đặt': 'Đặt bàn'}</Button>
                            </Col>
                        </Row>
                    }
                />
            </Card>
    )
}

export default CardTable