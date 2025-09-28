import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Table, Typography } from 'antd'
import React, { useState } from 'react'
import ModalAddRes from '../../../components/Manager/ListRestaurant/ModalAddRes';
import { API_BASE_URL } from '../../../settings/config';
import axios from 'axios';

function ListRestaurant() {
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false)
  const [loadingCreate, setLoadingCreate] = useState(false)
  const columns = [
    {
      title: 'Tên nhà hàng',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'position',
      key: 'position',
      sorter: (a, b) => a.position.localeCompare(b.position),
    },
    {
      title: 'Ngày tạo',
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

  const handleCancel = () => {
    setOpen(false)
  }

  const handleSubmit = async (value) => {
    setLoadingCreate(true)
    try {
      const res = await axios.post(`${API_BASE_URL}/v1/api/clients/manager/restaurant/createNewRestaurant`, value)
      console.log(res?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingCreate(false)
    }
  }

  return (
    <Row className='mt-0 me-0 mt-5'>
      <Col span={24}>
        <Card className="table-card">
          <Row>
            <Col span={24} className='d-flex justify-content-between'>
              <Typography.Title level={4}>Danh sách nhà hàng</Typography.Title>
              <Button onClick={() => { setOpen(true) }} loading={loadingCreate} icon={<PlusCircleOutlined />}>Thêm nhà hàng</Button>
            </Col>
            <Col span={24} >
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
            </Col>
          </Row>
        </Card>
      </Col>
      <ModalAddRes open={open} onCancel={handleCancel} onSubmit={handleSubmit} />
    </Row>
  )
}

export default ListRestaurant