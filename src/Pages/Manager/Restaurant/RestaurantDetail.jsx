import React, { useEffect, useState } from 'react';
import { Card, Button, Rate, Input, Avatar, Space, Typography, Tag, Divider, Layout } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined, HeartOutlined, HeartFilled, SendOutlined, CommentOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { t } from 'i18next';
import StaffPaths from '../../../Paths/StaffPaths';
import { getRestaurantDetail } from '../../../redux/reducer/modules/ManagerReducer';
import ManagerPaths from '../../../Paths/ManagerPaths';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export default function RestaurantDetail() {
    const [isFavorite, setIsFavorite] = useState(false);
    const [comment, setComment] = useState('');
    const dispatch= useDispatch()
    const {restaurantDetail}= useSelector((state)=> state.manager)
    const navigate= useNavigate()
    const {restaurantId}= useParams()
    useEffect(()=>{
        dispatch(getRestaurantDetail(restaurantId))
    },[])

    const reviews = [
        {
            id: 1,
            name: 'Lâm Thanh Quí',
            date: '25/12/2025',
            comment: 'Quán ăn phục vụ chu đáo, tận tâm, giá hợp lý',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
        },
        {
            id: 2,
            name: 'Lâm Thanh Quí',
            date: '25/12/2025',
            comment: 'Quán ăn phục vụ chu đáo, tận tâm, giá hợp lý',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'
        },
        {
            id: 3,
            name: 'Lâm Thanh Quí',
            date: '25/12/2025',
            comment: 'Quán ăn phục vụ chu đáo, tận tâm, giá hợp lý',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3'
        }
    ];

    return (
        <Layout className='w-100 bg-white'>
            <Content style={{ padding: '80px 30px' }}>
                <div style={{  margin: '0 auto'}}>
                    <Card
                        style={{ borderRadius: 12, overflow: 'hidden' }}
                        bodyStyle={{ padding: 0 }}
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {/* Left - Image Section */}
                            <div style={{ flex: '1 1 400px', minWidth: 300 }}>
                                <img
                                    src={restaurantDetail?.logoURL}
                                    alt="Restaurant buffet"
                                    style={{ width: '100%', height: 500, objectFit: 'cover', borderRadius:12 }}
                                />
                            </div>

                            {/* Right - Info Section */}
                            <div style={{ flex: '1 1 400px', padding: '24px', minWidth: 300 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Title level={2} style={{ margin: 0, marginBottom: 16 }}>
                                        Nhà hàng bufet Godel
                                    </Title>
                                    <Button
                                        type="text"
                                        icon={isFavorite ? <HeartFilled style={{ color: '#ff4d4f', fontSize: 24 }} /> : <HeartOutlined style={{ fontSize: 24 }} />}
                                        onClick={() => setIsFavorite(!isFavorite)}
                                    />
                                </div>

                                <Space direction="vertical" size={12} style={{ width: '100%' }}>
                                    <Space>
                                        <EnvironmentOutlined style={{ color: '#ff4d4f' }} />
                                        <Text style={{ fontSize: 13 }}>
                                            {restaurantDetail?.address}
                                        </Text>
                                    </Space>

                                    <Space>
                                        <ClockCircleOutlined style={{ color: '#52c41a' }} />
                                        <Text style={{ fontSize: 13 }}>Thời gian mở cửa: {restaurantDetail?.openTime} - {restaurantDetail?.closeTime}</Text>
                                    </Space>

                                    <Space>
                                        <Button
                                            type="primary"
                                            size="large"
                                            onClick={()=>{
                                                navigate(`/${ManagerPaths.RES_TABLE.replace(':restaurantId', restaurantDetail?._id)}`)
                                            }}
                                            style={{
                                                backgroundColor: '#ff6b35',
                                                borderColor: '#ff6b35',
                                                borderRadius: 20,
                                                paddingLeft: 32,
                                                paddingRight: 32
                                            }}
                                        >
                                            <img src='/images/bookTable.png'/>
                                            {t('table')}
                                        </Button>
                                        <Button
                                            type="primary"
                                            size="large"
                                            style={{
                                                backgroundColor: '#F6A572',
                                                borderColor: '#F6A572',
                                                borderRadius: 20,
                                                paddingLeft: 32,
                                                paddingRight: 32
                                            }}
                                        >
                                            <img src='/images/menu.png' style={{width:'80%', height:'80%'}}/>
                                            {t('menu')}
                                        </Button>
                                    </Space>
                                </Space>

                                <Divider />

                                <div style={{
                                    backgroundColor: '#fff9e6',
                                    padding: 16,
                                    borderRadius: 8,
                                    marginBottom: 16
                                }}>
                                    <Space style={{ marginBottom: 8 }}>
                                    </Space>
                                    <Paragraph style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
                                        <strong>Giới thiệu:</strong> {restaurantDetail?.description}.
                                    </Paragraph>
                                </div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className='mt-5'>
                            <Title level={4} style={{ marginBottom: 16 }}>
                                <CommentOutlined/> {t('comment')}
                            </Title>

                            <div style={{ marginBottom: 24 }}>
                                <Input.Group compact>
                                    <TextArea
                                        placeholder="Nhận xét bình luận của bạn"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        autoSize={{ minRows: 2, maxRows: 4 }}
                                        style={{
                                            width: 'calc(100% - 50px)',
                                            borderRadius: '20px 0 0 20px'
                                        }}
                                    />
                                    <Button
                                        type="primary"
                                        icon={<SendOutlined />}
                                        style={{
                                            height: '100%',
                                            minHeight: 50,
                                            width: 50,
                                            borderRadius: '0 20px 20px 0',
                                            backgroundColor: '#1890ff'
                                        }}
                                        onClick={() => {
                                            if (comment.trim()) {
                                                alert('Bình luận đã được gửi!');
                                                setComment('');
                                            }
                                        }}
                                    />
                                </Input.Group>
                            </div>

                            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                {reviews.map(review => (
                                    <Card
                                        key={review.id}
                                        style={{ borderRadius: 12 }}
                                    >
                                        <Space align="start">
                                            <Avatar size={40} src={review.avatar} />
                                            <div>
                                                <Text strong style={{ display: 'block' }}>{review.name}</Text>
                                                <Text type="secondary" style={{ fontSize: 12 }}>{review.date}</Text>
                                                <Paragraph style={{ margin: '8px 0 0 0' }}>
                                                    {review.comment}
                                                </Paragraph>
                                            </div>
                                        </Space>
                                    </Card>
                                ))}
                            </Space>
                        </div>
                    </Card>
                </div>
            </Content>
        </Layout>

    );
}