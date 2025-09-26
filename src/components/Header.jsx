import { Avatar, Button, Col, Dropdown, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import '../assets/css/header.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { SearchOutlined, BellOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import StaffPaths from '../Paths/StaffPaths';
import axios from 'axios';
import { API_BASE_URL } from '../settings/config';

function Header() {
    const profileData = useSelector((state) => state.staff.user);

    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY === 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${API_BASE_URL}/v1/api/auth/logout`)
            if (res?.data?.loggedOut) {
                localStorage.removeItem('token')
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const menu = [
        {
            key: 'logout',
            label: <Typography.Text onClick={handleLogout}><LogoutOutlined /> Đăng xuất</Typography.Text>
        },
        !window.location.pathname.includes('profile') && {
            key: 'profile',
            label: <Typography.Text onClick={() => { navigate(StaffPaths.PROFILE) }}><UserOutlined />Hồ sở của bạn</Typography.Text>
        }
    ]
    const navigate = useNavigate()
    return (
        <Row id='header' className={!isAtTop ? 'header-scroll': ''}>
    <Col span={24}>
        <Row className='w-100'>
            <Col span={6}>
                <img src="/images/logo.png" alt="" onClick={()=>{navigate('/home')}} style={{cursor:'pointer'}} />
            </Col>
            <Col span={18}>
                {
                    profileData?.email ? <div className='d-flex justify-content-end align-items-center h-100'>
                        <Button type='text' icon={<SearchOutlined style={{ fontSize: 25 }} />}></Button>
                        <Button type='text' className='mx-4' icon={<BellOutlined style={{ fontSize: 25 }} />}></Button>
                        {/* <Avatar size={40} src={<img src={profileData?.avatar} alt="avatar" />} /> */}
                        <Dropdown
                            className="dropdown-user"
                            menu={{ items: menu }}
                            trigger={["click"]}
                        >
                            <img width={40}
                                style={{ borderRadius: '50%', cursor: 'pointer' }}
                                src={profileData.avatar}
                                onClick={(e) => e.preventDefault()}
                                className="avatar"
                                alt=""
                            />
                        </Dropdown>
                    </div> :
                        <div className='d-flex justify-content-end align-items-end h-100'>
                            <Button className='me-3 button-header button-login' onClick={() => {
                                navigate('/login')
                            }}>
                                Đăng nhập
                            </Button>
                            <Button className='button-header button-register' onClick={() => {
                                navigate('/register')
                            }}>
                                Đăng ký
                            </Button>
                        </div>
                }
            </Col>
        </Row>
    </Col>
        </Row >
    )
}

export default Header
