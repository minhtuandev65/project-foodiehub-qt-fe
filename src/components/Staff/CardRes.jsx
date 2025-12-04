import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Button, Card, Col, Rate, Row, Typography } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { Link } from 'react-router-dom'
import StaffPaths from '../../Paths/StaffPaths'
import { useDispatch } from 'react-redux'
import { likeRestaurant } from '../../redux/reducer/modules/StaffReducer'

function CardRes({ item }) {
    const dispatch = useDispatch()
    const handleLike = (id) => {
        dispatch(likeRestaurant(id))
    }
    return (
        <Link to={StaffPaths.RES_DETAIL.replace(':restaurantId', item?._id)}>
            <Card
                className='w-100'
                style={{ cursor: ['pointer'] }}
                cover={
                    <div style={{ height: 250 }}>
                        <img
                            src={item?.logoURL}
                            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                        />
                    </div>
                }

            >
                <Meta
                    title={<Typography.Title level={5} className='m-0'>{item?.name}</Typography.Title>}
                    description={
                        <Row className='w-100'>
                            <Col span={24}>
                                <Typography.Text >
                                    <img src='/images/location1.png' alt="" />
                                    {item?.address}
                                </Typography.Text>
                            </Col>
                            <Col span={24} className='d-flex justify-content-end'>
                                <Rate allowHalf defaultValue={2.5} />
                            </Col>
                            <Col span={24} className='d-flex justify-content-start'>
                                {
                                    item?.favorite ? <HeartFilled onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        handleLike(item?._id)
                                    }} style={{ fontSize: 24, color: 'red' }} />
                                        : <HeartOutlined onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()
                                            handleLike(item?._id)
                                        }} style={{ fontSize: 24 }} />
                                }
                            </Col>
                        </Row>
                    }
                />
            </Card>
        </Link>
    )
}

export default CardRes