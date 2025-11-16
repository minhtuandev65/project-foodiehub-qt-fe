import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProfile } from '../redux/reducer/modules/StaffReducer'
import MenuAdmin from '../components/Manager/MenuAdmin'

function AdminLayout() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfile())
    }, [])

    return (
        <Layout style={{
            height: '100vh'
        }}>
            <Header />
            <MenuAdmin />
            <Content style={{ padding: '72px 20px 0 20px' }}>
                <Outlet />
            </Content>
        </Layout>
    )
}

export default AdminLayout