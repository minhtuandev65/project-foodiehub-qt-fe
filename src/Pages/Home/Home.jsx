import { Col, Row } from 'antd'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/effect-fade'
import 'swiper/css/pagination';
import '../../assets/css/homepage.css'
import Cookies from 'js-cookie';
import HomeAuth from './HomeAuth/HomeAuth';
import HomeNotAuth from './HomeNotAuth/HomeNotAuth';

function Home() {
    return (
        <Row id='home-page'>
            <Col span={24} className='px-0' style={{height:'100vh'}}>
                <Swiper className='w-100' style={{height:'100vh'}}
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
                    <SwiperSlide className='w-100 h-100' >
                        <img className='w-100 h-100' src='/images/banner.png'  alt="" />
                    </SwiperSlide>
                    <SwiperSlide className='w-100 h-100'>
                       <img className='w-100 h-100' src='/images/banner.png'  alt="" />
                    </SwiperSlide>
                    <SwiperSlide className='w-100 h-100'>
                        <img className='w-100 h-100' src='/images/banner.png'  alt="" />
                    </SwiperSlide>
                </Swiper>
            </Col>
            <Col span={24}>
                    {
                        Cookies.get('access_token') ? <HomeAuth/> : <HomeNotAuth/>
                    }
            </Col>
        </Row>
    )
}

export default Home