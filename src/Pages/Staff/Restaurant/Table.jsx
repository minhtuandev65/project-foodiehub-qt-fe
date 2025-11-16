import { Col, Layout, Row, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/effect-fade'
import 'swiper/css/pagination';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getListTableRestaurant } from '../../../redux/reducer/modules/StaffReducer';
import CardTable from '../../../components/Staff/CardTable';

function Table() {
    const { restaurantId } = useParams()
    const { listTableRestaurant } = useSelector((state) => state.staff)
    console.log(listTableRestaurant)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getListTableRestaurant(restaurantId))
    }, [])
    return (
        <Layout className='w-100 bg-white'>
            <Content style={{ padding: '80px' }}>
                <Row gutter={[24,24]}>
                    <Col span={24}>
                        <Typography.Title level={2} className='text-center'>
                            Danh sách bàn của nhà hàng {listTableRestaurant?.restaurantName}
                        </Typography.Title>
                    </Col>
                    {
                        listTableRestaurant?.data?.map((item) => {
                            return <Col span={6}>
                                <CardTable item={item} />
                            </Col>
                        })
                    }
                </Row>
            </Content>
        </Layout>
    )
}

export default Table