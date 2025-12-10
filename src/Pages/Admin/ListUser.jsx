import { CalendarOutlined, ClockCircleOutlined, CloseOutlined, DeleteFilled, DeleteOutlined, EditFilled, EditOutlined, EyeOutlined, LockOutlined, MailOutlined, ManOutlined, UnlockOutlined, UserOutlined, WomanOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Form, Image, Input, Modal, Row, Space, Table, Tag, Typography } from 'antd'
import { t } from 'i18next';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getStaff, getUserDetail, lockUser, setLoadingGetUserData } from '../../redux/reducer/modules/AdminReducer';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
const { Title } = Typography

function ListUser() {
    const { dataStaff, userData, loadingGetUserData, loadingLock } = useSelector((state) => state.admin)
    const [userId, setUserId] = useState()
    const [userIdLock, setUserIdLock] = useState()
    const [open, setOpen] = useState(false)
    const [editing, setEditing] = useState(false)
    const [form] = useForm()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getStaff())
    }, [])
    useEffect(() => {
        const funcOpen = async () => {
            if (userId) {
                await dispatch(getUserDetail(userId))
                setOpen(true)
                dispatch(setLoadingGetUserData(false))
            }
        }
        funcOpen()
    }, [userId])
    const columns = [
        {
            title: t('name'),
            dataIndex: 'fullName',
            key: 'name',
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t('submitDate'),
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text, record, index) => {
                return (record?.updatedAt ? record?.updatedAt : record?.createdAt)
            }
        },
        {
            title: t('role'),
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text, record, index) => {
                return <Typography.Text>
                    {record?.role == 1 ? t('admin') : record?.role == 2 ? t('roleManager') : record?.role == 3 ? t('staff') : t('user')}
                </Typography.Text>
            }
        },
        {
            title: t('gender'),
            key: 'gender',
            render: (text, record, index) => {
                return <Typography.Text>{record?.gender == 1 ? t('male') : t('female')}</Typography.Text>
            }
        },
        {
            title: t('action'),
            key: 'action',
            render: (text, record) => {
                return <Space size="middle">
                    <Button loading={loadingGetUserData && userId == record?._id} type="text" size="small" icon={<EyeOutlined style={{ color: '#1677ff' }} />} onClick={() => {
                        setUserId(record?._id)
                    }}></Button>
                    <Button loading={loadingLock && userIdLock == record?._id} type="text" size="small" icon={record?.isActive ? <UnlockOutlined style={{ color: 'green' }} /> : <LockOutlined style={{ color: 'red' }} />} onClick={async() => {
                        await setUserIdLock(record?._id)
                        if(!record?.isActive){
                            dispatch(lockUser(record?._id))
                        }
                        else{
                             dispatch(lockUser(record?._id))
                        }
                    }}></Button>
                </Space>
            }
        },
    ];

    const formatDate = (timestamp) => {
        if (typeof timestamp === 'number') {
            return dayjs(timestamp).format('DD/MM/YYYY HH:mm');
        }
        return dayjs(timestamp).format('DD/MM/YYYY HH:mm');
    };

console.log(dataStaff)

    return (
        <Row className='mt-0 me-0 mt-5'>
            <Col span={24}>
                <Card title={`${t('listStaff')}`} className="table-card">
                    <Table
                        columns={columns}
                        dataSource={dataStaff?.userList}
                        pagination={{
                            pageSize: 10,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} ${t('of')} ${total}`,
                        }}
                        scroll={{ x: 1000 }}
                    />
                    <Modal width={800} open={open} onCancel={() => { setOpen(false) }} footer={null}>
                        <Card className="login-card">
                            {/* Header Section */}
                            <div className="logo-section" style={{ marginBottom: 30 }}>
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <Image
                                        preview={{
                                        }}
                                        style={{ border: '4px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', width: 80, height: 80, borderRadius: '50%' }}
                                        rootClassName='profile-avatar'
                                        src={userData?.avatar}
                                    />
                                </div>
                                <Title level={2} style={{ margin: '16px 0 8px', color: 'white' }}>
                                    {userData?.fullName}
                                </Title>
                            </div>

                            {(
                                // View Mode
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                    </div>

                                    <Descriptions bordered column={1} size="middle">
                                        <Descriptions.Item label="Email">
                                            <Space>
                                                <MailOutlined />
                                                {userData?.email}
                                            </Space>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Tên đăng nhập">
                                            <Space>
                                                <UserOutlined />
                                                {userData?.username}
                                            </Space>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Họ">
                                            {userData?.firstName}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Tên">
                                            {userData?.lastName}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Giới tính">
                                            <Space>
                                                {userData?.gender == '1' ? <ManOutlined style={{ color: '#1890ff' }} /> : <WomanOutlined style={{ color: '#f759ab' }} />}
                                                {userData?.gender == '1' ? 'Nam' : 'Nữ'}
                                            </Space>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Ngày tạo">
                                            <Space>
                                                <CalendarOutlined />
                                                {formatDate(userData?.createdAt)}
                                            </Space>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Cập nhật lần cuối">
                                            <Space>
                                                <ClockCircleOutlined />
                                                {formatDate(userData?.updatedAt)}
                                            </Space>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Hoạt động lần cuối">
                                            <Space>
                                                <ClockCircleOutlined />
                                                {formatDate(userData?.latestActiveAt)}
                                            </Space>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </div>
                            )}
                        </Card>
                    </Modal>
                </Card>
            </Col>
        </Row>
    )
}

export default ListUser