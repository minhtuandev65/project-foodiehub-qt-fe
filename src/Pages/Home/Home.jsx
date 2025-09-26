import { Col, Row } from 'antd'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/effect-fade'
import 'swiper/css/pagination';
import '../../assets/css/homepage.css'

function Home() {
    return (
        <Row id='home-page'>
            <Col span={24} className='px-0' style={{paddingLeft:'0 !important', paddingRight:'0 !important'}}>
                <Swiper style={{ width: '100%', borderRadius: 8, height:'100vh' }}
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
                    effect={'fade'}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={100}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                >
                    <SwiperSlide >
                        <img src='/images/banner.png' className='w-100' alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <img src='/images/banner.png' className='w-100' alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <img src='/images/banner.png' className='w-100' alt="" />
                    </SwiperSlide>
                </Swiper>
            </Col>
        </Row>
    )
}

export default Home