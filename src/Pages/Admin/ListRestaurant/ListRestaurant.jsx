import { CheckOutlined, CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Table, Typography, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import ModalAddRes from '../../../components/Manager/ListRestaurant/ModalAddRes';
import ModalEditRes from '../../../components/Manager/ListRestaurant/ModalEditRes';
import { useDispatch, useSelector } from 'react-redux';
import { handelGetRestaurant, handleAcceptRestaurant } from '../../../redux/reducer/modules/AdminReducer';

function ListRestaurant() {
  const { loadingAccept, listRes } = useSelector((state) => state.admin)
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const dispatch = useDispatch()
  const [itemAccept, setItemAccept] = useState(false)
  const columns = [
    {
      title: 'Tên nhà hàng',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Logo',
      dataIndex: 'logoURL',
      key: 'position',
      render: (text, record) => {
        return <img style={{ width: 50, height: 'auto' }} src={record?.logoURL} alt="" />
      }
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'position',
      sorter: (a, b) => a.position.localeCompare(b.position),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 'ACCEPT' ? 'green' : status === 'PENDING' ? 'orange' : 'red';
        let text = status === 'ACCEPT' ? 'Đã duyệt' : status === 'PENDING' ? 'Chờ duyệt' : 'Từ chối';
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
      render: (text, record) => {
        return <Space size="middle">
          <Button loading={loadingAccept && record?._id == itemAccept} type="text" size="small" icon={<CheckOutlined style={{ color: 'green' }} />} onClick={async () => {
            handleAccept(record?._id)
             setItemAccept(record?._id)
          }}>Duyệt</Button>
          <Button type="dashed" size="small" icon={<CloseOutlined style={{ color: 'red' }} />}>Từ chối</Button>
        </Space>
      }
    },
  ];

  const handleCancel = () => {
    setOpen(false)
  }
  const handleCancelEdit = () => {
    setOpenEdit(false)
  }


  const handleAccept = async (id) => {
    const result = await dispatch(handleAcceptRestaurant(id))
   
    if (result?.payload?.data?.status == 'success') {
      dispatch(handelGetRestaurant())
    }
  }



  useEffect(() => {
    dispatch(handelGetRestaurant())
  }, [])

  return (
    <Row className='mt-0 me-0 mt-5'>
      <Col span={24}>
        <Card className="table-card">
          <Row>
            <Col span={24} className='d-flex justify-content-between'>
              <Typography.Title level={4}>Danh sách nhà hàng</Typography.Title>
              <Button onClick={() => { setOpen(true) }} icon={<PlusCircleOutlined />}>Thêm nhà hàng</Button>
            </Col>
            <Col span={24} >
              <Table
                columns={columns}
                dataSource={listRes}
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
      <ModalAddRes open={open} onCancel={handleCancel} />
      <ModalEditRes open={openEdit} onCancel={handleCancelEdit} />
    </Row>
  )
}

export default ListRestaurant