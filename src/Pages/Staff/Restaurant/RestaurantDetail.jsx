import React, { useEffect, useState } from 'react';
import { Card, Button, Rate, Input, Avatar, Space, Typography, Tag, Divider, Layout, Row, Col, Popconfirm, Skeleton, Popover } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined, HeartOutlined, HeartFilled, SendOutlined, CommentOutlined, LoadingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { t } from 'i18next';
import StaffPaths from '../../../Paths/StaffPaths';
import ManagerPaths from '../../../Paths/ManagerPaths';
import { createComment, deleteComment, getComments, getRestaurantDetail, ratingRestaurant } from '../../../redux/reducer/modules/StaffReducer';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Cookies from 'js-cookie';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export default function RestaurantDetail() {
    const [isFavorite, setIsFavorite] = useState(false);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0)
    const dispatch = useDispatch()
    const { restaurantDetail, dataComment, loadingCreateComment, loadingGetComment, loadingRating } = useSelector((state) => state.staff)
    // console.log(loadingCreateComment)
    const profileData = useSelector((state) => state.staff.user);
    const navigate = useNavigate()
    const { restaurantId } = useParams()
    useEffect(() => {
        dispatch(getRestaurantDetail(restaurantId))
        dispatch(getComments(restaurantId))
    }, [])

    const handleComment = async () => {
        await dispatch(createComment({ restaurantId, comment }))
        setComment('')
    }

    const handleDeleteComment = async (id) => {
        await dispatch(deleteComment(id))
    }

    const handleRating = async () => {
        await dispatch(ratingRestaurant({ restaurantId, rating }))
    }

    return (
        <Layout className='w-100 bg-white'>
            <Content style={{ padding: '80px 30px' }}>
                <div style={{ margin: '0 auto' }}>
                    <div
                        style={{ borderRadius: 12, overflow: 'hidden' }}
                        bodyStyle={{ padding: 0 }}
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {/* Left - Image Section */}
                            <div style={{ flex: '1 1 400px', minWidth: 300 }}>
                                <img
                                    src={restaurantDetail?.logoURL}
                                    alt="Restaurant buffet"
                                    style={{ width: '100%', height: 500, objectFit: 'cover', borderRadius: 12 }}
                                />
                            </div>

                            {/* Right - Info Section */}
                            <div style={{ flex: '1 1 400px', padding: '24px', minWidth: 300 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Title level={2} style={{ margin: 0, marginBottom: 16 }}>
                                        {restaurantDetail?.name}
                                    </Title>
                                    <Button
                                        type="text"
                                        icon={isFavorite ? <HeartFilled style={{ color: '#ff4d4f', fontSize: 24 }} /> : <HeartOutlined style={{ fontSize: 24 }} />}
                                        onClick={() => setIsFavorite(!isFavorite)}
                                    />
                                </div>

                                <Space direction="vertical" size={12} style={{ width: '100%' }}>
                                    <Space style={{ cursor: 'pointer' }} title={t('seeMap')} onClick={() => {
                                        navigate(`${StaffPaths.RES_MAP}?lat=${restaurantDetail?.lat}&lng=${restaurantDetail?.lng}`)
                                    }}>
                                        <EnvironmentOutlined style={{ color: '#ff4d4f' }} />
                                        <Text style={{ fontSize: 13 }}>
                                            {restaurantDetail?.address}
                                        </Text>
                                    </Space>

                                    <Space>
                                        <ClockCircleOutlined style={{ color: '#52c41a' }} />
                                        <Text style={{ fontSize: 13 }}>{t('timeOpen')}: {restaurantDetail?.openTime} - {restaurantDetail?.closeTime}</Text>
                                    </Space>

                                    <Space>
                                        <Button
                                            type="primary"
                                            size="large"
                                            onClick={() => {
                                                navigate(`${StaffPaths.RES_TABLE.replace(':restaurantId', restaurantDetail?._id)}`)
                                            }}
                                            style={{
                                                backgroundColor: '#ff6b35',
                                                borderColor: '#ff6b35',
                                                borderRadius: 20,
                                                paddingLeft: 32,
                                                paddingRight: 32
                                            }}
                                        >
                                            <img src='/images/bookTable.png' />
                                            {t('table')}
                                        </Button>
                                        <Button
                                            type="primary"
                                            size="large"
                                            onClick={() => {
                                                navigate(`${StaffPaths.RES_MENU.replace(':restaurantId', restaurantDetail?._id)}`)
                                            }}
                                            style={{
                                                backgroundColor: '#F6A572',
                                                borderColor: '#F6A572',
                                                borderRadius: 20,
                                                paddingLeft: 32,
                                                paddingRight: 32
                                            }}
                                        >
                                            <img src='/images/menu.png' style={{ width: '80%', height: '80%' }} />
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
                            <Row>
                                <Col span={12}>
                                    <Title level={4} style={{ marginBottom: 16 }}>
                                        <CommentOutlined /> {t('comment')}
                                    </Title>

                                    <div style={{ marginBottom: 24 }} className='w-100'>
                                        <Input.Group style={{ position: 'relative' }} className='d-flex align-items-center justify-content-center'>
                                            <Input
                                                onPressEnter={handleComment}
                                                placeholder={t('enter_comment')}
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                autoSize={{ minRows: 2, maxRows: 4 }}
                                                style={{
                                                    borderRadius: '20px',
                                                    minHeight: '0 !important',
                                                    height: 40,
                                                    paddingRight: 40
                                                }}
                                            />
                                            {
                                                loadingCreateComment ? <LoadingOutlined style={{
                                                    fontSize: 20,
                                                    position: 'absolute',
                                                    right: 10,
                                                    zIndex: 2,
                                                    cursor: 'pointer'
                                                }} />
                                                    : <SendOutlined onClick={async () => {
                                                        if (comment.trim()) {
                                                            await handleComment()
                                                        }
                                                    }} style={{
                                                        fontSize: 20,
                                                        position: 'absolute',
                                                        right: 10,
                                                        zIndex: 2,
                                                        cursor: 'pointer'
                                                    }} />
                                            }



                                        </Input.Group>
                                    </div>
                                    <SpaceCustom direction="vertical" size={16} style={{ width: '100%', height: 500, overflowY: 'auto' }}>
                                        {
                                            loadingGetComment ? Array.from({ length: 3 }, (_, index) => {
                                                return <Skeleton key={index}
                                                    avatar
                                                    active
                                                    paragraph={{
                                                        rows: 2,
                                                    }}
                                                />
                                            })
                                                : dataComment?.commentList?.map(review => (
                                                    <CardCustom
                                                        key={review.id}
                                                        style={{ borderRadius: 12, padding: 15 }}
                                                    >
                                                        <Space align="start">
                                                            <Avatar size={40} src={review.avatar} />
                                                            <div>
                                                                <Text strong style={{ display: 'block' }}>{review.fullName}</Text>
                                                                <Text type="secondary" style={{ fontSize: 12 }}>{dayjs(review?.updatedAt).format('HH:mm DD/MM/YYYY') || review?.createdAt}</Text>
                                                                <Paragraph style={{ margin: '8px 0 0 0' }}>
                                                                    {review.comment}
                                                                </Paragraph>
                                                                {
                                                                    (review?.userId == profileData?._id || profileData?.role == 1) && <Popconfirm title={t('confirmDelete')} okText={t('agree')} cancelText={t('cancel')} onConfirm={() => { handleDeleteComment(review?._id) }}>
                                                                        <ButtonDelete type='text' icon={<DeleteOutlined style={{ color: 'red' }} />}>{t('delete')}</ButtonDelete>
                                                                    </Popconfirm>
                                                                }
                                                            </div>
                                                        </Space>
                                                    </CardCustom>
                                                ))}

                                    </SpaceCustom>
                                </Col>
                                <Col span={12} className='d-flex justify-content-center'>
                                    <Row justify={'center'} gutter={[24, 24]} style={{ width: 400, height: 'fit-content' }}>
                                        <Col >
                                            <div className='d-flex justify-content-center align-items-end mt-1'>
                                                <RatingText className='mb-0' style={{ lineHeight: 1, fontSize: '50px !important' }}>{restaurantDetail?.ratingAverage}</RatingText>
                                                <Typography.Title level={5} style={{ color: '#4f4f4f' }} className='mb-0'>/5</Typography.Title>
                                            </div>
                                        </Col>
                                        <Col >
                                            <div className='d-flex flex-column justify-content-end h-100'>
                                                <Rate style={{ fontSize: 20 }} allowHalf value={restaurantDetail?.ratingAverage} disabled />
                                                <Typography.Title level={5} style={{ color: '#4f4f4f' }} className='m-0'>{restaurantDetail?.reviewCount} {t('countRating').toLowerCase()}</Typography.Title>
                                            </div>
                                        </Col>
                                        <Col span={24} className='d-flex justify-content-center '>
                                            <div className='d-flex flex-column align-items-center '>
                                                <Typography.Title level={5} style={{ color: '#4f4f4f' }} className='m-0'>{t('youThinkRestaurant')} ?</Typography.Title>
                                                {
                                                    Cookies.get('access_token') && <>
                                                        <div className='d-flex align-items-center'>
                                                            <Rate style={{ fontSize: 50 }} value={restaurantDetail?.rating} disabled />
                                                        </div>
                                                        {
                                                            !restaurantDetail?.rating && <Popover trigger={'click'} content={
                                                                <Row>
                                                                    <Col span={24} className='d-flex justify-content-center'>
                                                                        <Rate style={{ fontSize: 50 }} onChange={(value) => {
                                                                            setRating(value)
                                                                        }} />
                                                                    </Col>
                                                                    <Col span={24} loading={loadingRating} onClick={handleRating} className='d-flex justify-content-center mt-3'>
                                                                        <Button>{t('send')}</Button>
                                                                    </Col>
                                                                </Row>
                                                            }>
                                                                <Button className='mt-3' style={{ width: 'fit-content' }} >{t('rating')}</Button>
                                                            </Popover>
                                                        }
                                                    </>
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>

    );
}

const CardCustom = styled(Card)`
    .ant-card-body {
        padding:10px !important;
    }
    
`
const ButtonDelete = styled(Button)`
    padding: 2px ;
    height:auto;
    font-size: 12px;
    color: #4f4f4f
`

const SpaceCustom = styled(Space)`
  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 8px;
  }
`;


const RateWrapper = styled.div`
  position: relative;
  display: inline-block;
  font-size: 50px;

  .ant-rate {
    color: #f0f0f0; /* màu sao nền */
  }
`;

const RatingText = styled(Typography.Title)`
    font-size: 50px !important;
`