import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProfile } from '../redux/reducer/modules/StaffReducer'

function StaffLayout() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfile())
    }, [])
    
    return (
        <Layout style={{
            height: '100vh'
        }}>
            <Header />
            <Content>
                <Outlet />
            </Content>
        </Layout>
    )
}

export default StaffLayout