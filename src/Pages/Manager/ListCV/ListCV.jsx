import { Card, Col, Row, Table } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'

function ListCV() {
    const [filteredData, setFilteredData] = useState([]);
    const getListCV=()=>{
        try {
            // const res = await axios.get(`${APP_BASE}`)
        } catch (error) {
            
        }
    }
    const columns = [
        {
            title: 'Tên ứng viên',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Ngày nộp',
            dataIndex: 'submitDate',
            key: 'submitDate',
            sorter: (a, b) => new Date(a.submitDate) - new Date(b.submitDate),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = status === 'approved' ? 'green' : status === 'pending' ? 'orange' : 'red';
                let text = status === 'approved' ? 'Đã duyệt' : status === 'pending' ? 'Chờ duyệt' : 'Từ chối';
                return <Tag color={color}>{text}</Tag>;
            },
            filters: [
                { text: 'Đã duyệt', value: 'approved' },
                { text: 'Chờ duyệt', value: 'pending' },
                { text: 'Từ chối', value: 'rejected' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Button type="primary" size="small">Xem</Button>
                    <Button type="default" size="small">Sửa</Button>
                </Space>
            ),
        },
    ];
    return (
        <Row className='mt-0 me-0 mt-5'>
            <Col span={24}>
                <Card title="Danh sách CV" className="table-card">
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} của ${total} CV`,
                        }}
                        scroll={{ x: 1000 }}
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default ListCV