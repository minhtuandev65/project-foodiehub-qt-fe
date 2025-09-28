import { AppstoreOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd'
import React, { useState } from 'react'
import ManagerPaths from '../../Paths/ManagerPaths';
import { useNavigate } from 'react-router-dom';

function MenuManager() {
    const items = [
        { key: `/${ManagerPaths.GENERAL}`, label: 'Thống kê' },
        { key: `/${ManagerPaths.LIST_CV}`, label: 'Danh sách nộp cv' },
        { key: `/${ManagerPaths.LIST_USER}`, label: 'Nhân viên' },
        { key: `/${ManagerPaths.LIST_RES}`, label: 'Nhà hàng' },
    ]
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const navigate = useNavigate()
    const onClick = e => {
        navigate(`${e?.key}`)
    };
    console.log(window.location.pathname)
    return (
        <div style={{ width: 256, position: 'fixed', top: "30%", zIndex: 5 }}>
            <Button type="primary" onClick={toggleCollapsed} style={{ borderRadius: '0 15px 15px 0' }} >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu style={{ display: collapsed ? 'none' : 'block', borderRadius: '0 10px 10px 10px', position: 'fixed', top: '32%', left: 48, width: '200px' }}
                defaultSelectedKeys={[window.location.pathname]}
                // defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
                onClick={onClick}
            />
        </div>
    )
}

export default MenuManager