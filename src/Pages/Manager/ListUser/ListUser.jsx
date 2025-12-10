import { DeleteFilled, DeleteOutlined, EditFilled, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Modal, Row, Space, Table, Tag, Typography } from 'antd'
import { t } from 'i18next';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStaff } from '../../../redux/reducer/modules/ManagerReducer';
import dayjs from 'dayjs';
import { PlusCircle } from 'lucide-react';
import ModelAddUser from '../../../components/Manager/User/ModelAddUser';
import ModelEditUser from '../../../components/Manager/User/ModelEditUser';

function ListUser() {
    const { dataStaff } = useSelector((state) => state.manager)
    const { restaurantId } = useParams()
    const [openEdit, setOpenEdit]= useState(false)
    const [open, setOpen]= useState(false)
    const [user, setUser]= useState()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getStaff(restaurantId))
    }, [])
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
                return dayjs(record?.updatedAt || record?.createdAt).format('DD/MM/YYYY')
            }
        },
        {
            title: t('hourWork'),
            dataIndex: 'hourWork',
            key: 'hourWork',
            render: (text, record, index) => {
                return `${record?.workStartTime} - ${record?.workEndTime}`
            }
        },
        {
            title: t('dayWord'),
            dataIndex: 'dayWord',
            key: 'dayWord',
            render: (text, record, index) => {
                return record?.workDays?.map((item) => {
                    return <Tag key={'green'} color={'green'} variant={'filled'}>
                        T{item}
                    </Tag>
                })
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
                    <Button type="text" size="small" icon={<EditFilled style={{ color: 'green' }} />} onClick={() => {
                        setOpenEdit(true)
                        setUser(record)
                    }}></Button>
                    <Button type="dashed" size="small" icon={<DeleteFilled style={{ color: 'red' }} />} onClick={()=>{
                        
                    }}></Button>
                </Space>
            }
        },
    ];
    return (
        <Row className='mt-0 me-0 mt-5' gutter={[12,12]}>
            <Col span={24}  className='d-flex justify-content-end'>
            <Button onClick={() => { setOpen(true) }} icon={<PlusCircleOutlined />}>{t('addNew')}</Button>
            </Col>
            <Col span={24}>
                <Card title={`${t('listStaff')}`} className="table-card">
                    <Table
                        columns={columns}
                        dataSource={dataStaff?.staffList}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} ${t('of')} ${total}`,
                        }}
                        scroll={{ x: 1000 }}
                    />
                </Card>
            </Col>
           <ModelAddUser open={open} onCancel={()=>{setOpen(false)}}/>
            <ModelEditUser open={openEdit} onCancel={()=>{setOpenEdit(false)}} itemEdit={user}/>
        </Row>
    )
}

export default ListUser