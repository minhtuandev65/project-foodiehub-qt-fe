import { AppstoreOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminPaths from '../../Paths/AdminPaths';
import { t } from 'i18next';

function MenuAdmin() {
    const items = [
        { key: `/${AdminPaths.GENERAL}`, label: 'Thống kê' },
        { key: `/${AdminPaths.LIST_USER}`, label: t("listUser") },
    ]
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const navigate = useNavigate()
    const onClick = e => {
        navigate(`${e?.key}`)
    };
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

export default MenuAdmin