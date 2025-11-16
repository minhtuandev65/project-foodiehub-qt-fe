import React, { useState } from 'react';
import { Button, Col, Layout, Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';
import styled from 'styled-components';

function HomeNotAuth() {
    const [hoveredCard, setHoveredCard] = useState(null);

    const features = [
        {
            id: 1,
            title: 'Tìm kiếm nhanh chóng',
            image: '/images/silde1.png',
            icon: '/images/location.png',
            items: [
                { icon: '/images/star.png', text: 'Tìm kiếm nhà hàng mà bạn yêu thích' },
                { icon: '/images/like6.png', text: 'Các nhà hàng được đánh giá tốt' },
                { icon: '/images/moto.png', text: 'Thuận tiện di chuyển và tiết kiệm thời gian' }
            ],
            reverse: false
        },
        {
            id: 2,
            title: 'Gọi món mau lẹ',
            image: '/images/img2.png',
            icon: '/images/screen.png',
            items: [
                { icon: '/images/bookApp10.png', text: 'Gọi món ngay trên ứng dụng' },
                { icon: '/images/note.png', text: 'Thông tin rõ ràng' },
                { icon: '/images/time.png', text: 'Hạn chế chờ đợi' }
            ],
            reverse: true
        },
        {
            id: 3,
            title: 'Thanh toán thuận tiện',
            image: '/images/slide3.png',
            icon: '/images/bagcoin.png',
            items: [
                { icon: '/images/payApp.png', text: 'Thanh toán trực tiếp trên ứng dụng' },
                { icon: '/images/payqr.png', text: 'Thanh toán qua QR nhà hàng' },
                { icon: '/images/paycash.png', text: 'Thanh toán tiền mặt trực tiếp' }
            ],
            reverse: false
        }
    ];

    return (
        <Layout className='w-100 bg-white'>
            <Content style={{ padding: '80px 30px' }}>
                {features.map((feature, index) => (
                    <Fade key={feature.id} triggerOnce>
                        <FeatureSection>
                            <Row gutter={[60, 60]} align="middle" style={{ marginBottom: index < features.length - 1 ? '120px' : '0' }}>
                                {feature.reverse ? (
                                    <>
                                        <Col xs={24} lg={12}>
                                            <Zoom triggerOnce>
                                                <ImageWrapper
                                                    onMouseEnter={() => setHoveredCard(feature.id)}
                                                    onMouseLeave={() => setHoveredCard(null)}
                                                    isHovered={hoveredCard === feature.id}
                                                >
                                                    <img src={feature.image} alt={feature.title} style={{ width: '100%' }} />
                                                </ImageWrapper>
                                            </Zoom>
                                        </Col>
                                        <Col xs={24} lg={12}>
                                            <Slide direction="right" triggerOnce>
                                                <ContentWrapper>
                                                    <Typography.Title level={1} style={{ marginBottom: '30px', color: '#1a1a1a' }}>
                                                        {feature.title}
                                                    </Typography.Title>
                                                    <FeatureList>
                                                        {feature.items.map((item, idx) => (
                                                            <FeatureItem key={idx}>
                                                                <IconWrapper>
                                                                    <img src={item.icon} width={24} alt="" />
                                                                </IconWrapper>
                                                                <Typography.Text style={{ fontSize: '16px', color: '#4a4a4a' }}>
                                                                    {item.text}
                                                                </Typography.Text>
                                                            </FeatureItem>
                                                        ))}
                                                    </FeatureList>
                                                    <ButtonWrapper>
                                                        <img src={feature.icon} width={50} alt="" style={{ marginRight: '20px' }} />
                                                        <ButtonCustom>Xem chi tiết</ButtonCustom>
                                                    </ButtonWrapper>
                                                </ContentWrapper>
                                            </Slide>
                                        </Col>
                                    </>
                                ) : (
                                    <>
                                        <Col xs={24} lg={12}>
                                            <Slide direction="left" triggerOnce>
                                                <ContentWrapper>
                                                    <Typography.Title level={1} style={{ marginBottom: '30px', color: '#1a1a1a' }}>
                                                        {feature.title}
                                                    </Typography.Title>
                                                    <FeatureList>
                                                        {feature.items.map((item, idx) => (
                                                            <FeatureItem key={idx}>
                                                                <IconWrapper>
                                                                    <img src={item.icon} width={24} alt="" />
                                                                </IconWrapper>
                                                                <Typography.Text style={{ fontSize: '16px', color: '#4a4a4a' }}>
                                                                    {item.text}
                                                                </Typography.Text>
                                                            </FeatureItem>
                                                        ))}
                                                    </FeatureList>
                                                    <ButtonWrapper>
                                                        <img src={feature.icon} width={50} alt="" style={{ marginRight: '20px' }} />
                                                        <ButtonCustom>Xem chi tiết</ButtonCustom>
                                                    </ButtonWrapper>
                                                </ContentWrapper>
                                            </Slide>
                                        </Col>
                                        <Col xs={24} lg={12}>
                                            <Zoom triggerOnce>
                                                <ImageWrapper
                                                    onMouseEnter={() => setHoveredCard(feature.id)}
                                                    onMouseLeave={() => setHoveredCard(null)}
                                                    isHovered={hoveredCard === feature.id}
                                                >
                                                    <img src={feature.image} alt={feature.title} style={{ width: '100%' }} />
                                                </ImageWrapper>
                                            </Zoom>
                                        </Col>
                                    </>
                                )}
                            </Row>
                        </FeatureSection>
                    </Fade>
                ))}
            </Content>
        </Layout>
    );
}

export default HomeNotAuth;

const FeatureSection = styled.div`
    width: 100%;
`;

const ContentWrapper = styled.div`
    padding: 20px;
`;

const FeatureList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
`;

const FeatureItem = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #f0f0f0;
    transition: all 0.3s ease;
    
    &:hover {
        border-color: rgba(234, 88, 12, 0.3);
        transform: translateX(5px);
        box-shadow: 0 4px 12px rgba(234, 88, 12, 0.1);
    }
`;

const IconWrapper = styled.div`
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(234, 88, 12, 0.1);
    border-radius: 10px;
    transition: all 0.3s ease;
    
    ${FeatureItem}:hover & {
        background: rgba(234, 88, 12, 0.15);
        transform: scale(1.1);
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 20px;
`;

const ImageWrapper = styled.div`
    transition: all 0.4s ease;
    transform: ${props => props.isHovered ? 'scale(1.03)' : 'scale(1)'};
    
    img {
        transition: all 0.4s ease;
        filter: ${props => props.isHovered ? 'brightness(1.05)' : 'brightness(1)'};
    }
`;

const ButtonCustom = styled(Button)`
    padding: 20px 30px;
    height: auto;
    border-radius: 20px;
    background: linear-gradient(90deg, rgba(234, 88, 12, 1), rgba(234, 88, 12, 0.7));
    color: #fff;
    border: none;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
        background: #fff !important;
        color: rgba(234, 88, 12, 1) !important;
        border: 1px solid rgba(234, 88, 12, 1) !important;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(234, 88, 12, 0.2);
    }
`;