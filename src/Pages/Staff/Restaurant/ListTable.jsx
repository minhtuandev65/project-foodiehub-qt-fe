import Icon, { CloseOutlined, DeleteFilled, EditFilled, FormOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Table, Typography, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import ModalAddRes from '../../../components/Manager/ListRestaurant/ModalAddRes';
import ModalEditRes from '../../../components/Manager/ListRestaurant/ModalEditRes';
import { API_BASE_URL } from '../../../settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { handelGetRestaurant, handleSeeDetailRes } from '../../../redux/reducer/modules/ManagerReducer';
import { Link, useNavigate } from 'react-router-dom';
import ManagerPaths from '../../../Paths/ManagerPaths';
import { t } from 'i18next';
import { getMyRestaurant } from '../../../redux/reducer/modules/StaffReducer';
import addFood from '../../../assets/svg/addFood';
import StaffPaths from '../../../Paths/StaffPaths';

function ListRestaurant() {
  const { listTableMyRes } = useSelector((state) => state.staff)
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getMyRestaurant())
  }, [])
  const columns = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => {
        return <Typography.Text style={{ cursor: 'pointer' }} onClick={() => {
          // navigate(`/${ManagerPaths.RES_DETAIL.replace(':restaurantId', record?._id)}`)
        }} >{record?.name}</Typography.Text>
      }
    },
    {
      title: t('table_image'),
      dataIndex: 'imageURL',
      key: 'position',
      render: (text, record) => {
        return <img style={{ width: 50, height: 'auto' }} src={record?.imageURL} alt="" />
      }
    },
    {
      title: t('table_category'),
      key: 'table_category',
      render: (table_category) => {
        let color = table_category == 1 ? 'green' : 'orange';
        let text = table_category == 1 ? t('normal') : 'VIP';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 1 ? 'green' : 'red';
        let text = status === 1 ? t('empty') : t('booked');
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: t('action'),
      key: 'action',
      render: (text, record) => {
        return <Space size="middle">
          {
            record?.status == 2
            && <Button type="text" size="small" icon={<Icon className='d-flex align-items-center' component={addFood} />} onClick={() => {
              navigate(`${StaffPaths.STAFF_ORDER.replace(":tableId", record?._id).replace(':restaurantId', record?.restaurantId)}`)
            }}>{t('order')}
            </Button>}
          {
            record?.status == 1 ?
              <Button type="text" size="small" icon={<FormOutlined style={{ color: 'gr' }} />} onClick={() => {
               
              }}>{t('book_table')}
              </Button> :
              <Button type="text" size="small" icon={<CloseOutlined style={{ color: 'red' }} />} onClick={() => {
                
              }}>{t('cancel')}
              </Button>

          }
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

  const handleDetail = async (id) => {
    dispatch(handleSeeDetailRes(id))
    setOpenEdit(true)
  }

  return (
    <Row className='mt-0 me-0 mt-5' style={{ padding: '72px 20px 0 20px' }}>
      <Col span={24}>
        <Card className="table-card">
          <Row>
            <Col span={24} className='d-flex justify-content-between'>
              <Typography.Title level={4}>{t('listTable')}</Typography.Title>
            </Col>
            <Col span={24} >
              <Table
                columns={columns}
                dataSource={listTableMyRes.data}
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