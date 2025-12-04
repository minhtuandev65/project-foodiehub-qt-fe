import React, { useEffect, useState } from 'react';
import { Button, Col, Layout, Pagination, Row, Segmented, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getListRestaurant } from '../../../redux/reducer/modules/StaffReducer';
import CardRes from '../../../components/Staff/CardRes';
import { t } from 'i18next';
import { HeartFilled, StarFilled, StarOutlined } from '@ant-design/icons';

function HomeNotAuth() {
  const { restaurants } = useSelector((state) => state.staff)
  const [filter, setFilter] = useState({ page: 1, limit: 12, status: 0 })
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListRestaurant(filter))
  }, [filter?.limit, filter?.page, filter?.status])

  console.log(restaurants?.restaurantList)

  return (
    <Layout className='w-100 bg-white'>
      <Content style={{ padding: '80px 30px' }}>
        <Typography.Title level={2} className='text-center'>
          {t('restaurant_list')}
        </Typography.Title>
        <Row className='mb-3'>
          <Col span={24}>
            <Segmented
            
              options={[
                { value: 0, label: <Typography.Text style={{fontSize:16}}>Tất cả</Typography.Text> },
                { value: 1, icon: <HeartFilled style={{color:'red'}} />, label: <Typography.Text style={{fontSize:16}}>Yêu thích</Typography.Text> },
              ]}
              onChange={value => {
                setFilter({...filter, status: value})
              }}
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          {
            restaurants?.restaurantList?.map((item, index) => {
              return <Col span={6} key={index}>
                <CardRes item={item} />
              </Col>
            })
          }
          <Col span={24} className='d-flex justify-content-end'>
            <Pagination defaultCurrent={1} total={restaurants?.total} pageSize={filter?.limit}  showSizeChanger onShowSizeChange={(page, limit) => {
              setFilter({
                ...filter, limit
              })
            }}
              onChange={(page) => {
                setFilter({
                  ...filter, page
                })
              }} />
          </Col>
        </Row>
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