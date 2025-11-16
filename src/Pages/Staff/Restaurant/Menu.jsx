import { Col, Layout, Row, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/effect-fade'
import 'swiper/css/pagination';   

function Menu() {
    return (
        <Layout className='w-100 bg-white'>
            <Content style={{ padding: '80px 30px' }}>
                <Row>
                    <Col span={24}>
                        <Typography.Title level={2} className='text-center'>
                            Món chính
                        </Typography.Title>
                    </Col>
                    <Col span={24}>
                        <Typography.Title level={2} className='text-center'>
                            Tráng miệng
                        </Typography.Title>
                    </Col>
                    <Col span={24}>
                        <Typography.Title level={2} className='text-center'>
                            Nước uống
                        </Typography.Title>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default Menu