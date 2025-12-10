import {
	DeleteFilled,
	EditFilled,
	PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Table, Typography, Tag } from "antd";
import React, { useEffect, useState } from "react";
import ModalAddRes from "../../../components/Manager/ListRestaurant/ModalAddRes";
import ModalEditRes from "../../../components/Manager/ListRestaurant/ModalEditRes";
import { useDispatch, useSelector } from "react-redux";
import {
	handelGetRestaurant,
	handleSeeDetailRes,
} from "../../../redux/reducer/modules/ManagerReducer";
import { Link, useNavigate } from "react-router-dom";
import ManagerPaths from "../../../Paths/ManagerPaths";
import { t } from "i18next";

function ListRestaurant() {
  const { listRes } = useSelector((state) => state.manager)
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const columns = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render:(text, record)=>{
        return <Typography.Text style={{cursor:'pointer'}} onClick={()=>{
          navigate(`/${ManagerPaths.RES_DETAIL.replace(':restaurantId', record?._id)}`)
        }} >{record?.name}</Typography.Text>
      }
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
      title: t('address'),
      dataIndex: 'address',
      key: 'position',
      sorter: (a, b) => a.position.localeCompare(b.position),
    },
    {
      title: t('createAt'),
      dataIndex: 'createdAt',
      key: 'submitDate',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status ==1 ? 'green' : status ==2 ? 'orange' : 'red';
        let text = status ==1 ? t('approved') : status ==2 ? t('pending') :  t('reject');
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: t('action'),
      key: 'action',
      render: (text, record) => {
        return <Space size="middle">
          <Button type="text" size="small" icon={<EditFilled style={{ color: 'green' }} />} onClick={() => { handleDetail (record?._id) }}></Button>
          <Button type="dashed" size="small" icon={<DeleteFilled style={{ color: 'red' }} />}></Button>
        </Space>
      }
    },
  ];

	const handleCancel = () => {
		setOpen(false);
	};
	const handleCancelEdit = () => {
		setOpenEdit(false);
	};

	const handleDetail = async (id) => {
		dispatch(handleSeeDetailRes(id));
		setOpenEdit(true);
	};

	useEffect(() => {
		dispatch(handelGetRestaurant());
	}, []);

  useEffect(() => {
    dispatch(handelGetRestaurant())
  }, [])

  return (
    <Row className='mt-0 me-0 mt-5'>
      <Col span={24}>
        <Card className="table-card">
          <Row>
            <Col span={24} className='d-flex justify-content-between'>
              <Typography.Title level={4}>{t('listRestaurant')}</Typography.Title>
              <Button onClick={() => { setOpen(true) }} icon={<PlusCircleOutlined />}>{t('addNew')}</Button>
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
                    `${range[0]}-${range[1]}`,
                }}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <ModalAddRes open={open} onCancel={handleCancel} />
      <ModalEditRes open={openEdit} onCancel={handleCancelEdit}/>
    </Row>
  )
}

export default ListRestaurant;
