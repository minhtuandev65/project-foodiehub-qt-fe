import { DeleteFilled, DeleteOutlined, EditFilled, EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Table, Tag, Typography } from 'antd'
import { t } from 'i18next';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStaff } from '../../../redux/reducer/modules/ManagerReducer';
import dayjs from 'dayjs';

function ListUser() {
    const { dataStaff } = useSelector((state) => state.manager)
    const { restaurantId } = useParams()
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
                return <Typography.Text>{record?.gender == 1 ? t('male'):  t('female')}</Typography.Text>
            }
        },
        {
            title: t('action'),
            key: 'action',
            render: (text, record) => {
                return <Space size="middle">
                    <Button type="text" size="small" icon={<EditFilled style={{ color: 'green' }} />} onClick={() => { 

                    }}></Button>
                    <Button type="dashed" size="small" icon={<DeleteFilled style={{ color: 'red' }} />}></Button>
                </Space>
            }
        },
    ];
    return (
        <Row className='mt-0 me-0 mt-5'>
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
        </Row>
    )
}

export default ListUser