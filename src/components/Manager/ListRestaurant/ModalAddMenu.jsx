import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, InputNumber, message, Modal, Select, Upload } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addMenu, editMenu } from '../../../redux/reducer/modules/ManagerReducer'
import showMessage from '../../../Helper/showMessage'

function ModalAddMenu({ itemEdit, open, setOpen }) {
    const { restaurantId } = useParams()
    const [form] = useForm()
    const [imgMenu, setImgMenu] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        if (itemEdit) {
            form.setFieldsValue({
                name: itemEdit?.name,
                categories: itemEdit?.categories,
                description: itemEdit?.description,
                quantity: Number(itemEdit?.quantity),
                price: itemEdit?.price
            })

            if (itemEdit?.imageURL) {
                setImgMenu([
                    {
                        uid: '-1',
                        name: 'menu-image.png',
                        status: 'done',
                        url: itemEdit.imageURL
                    }
                ])
            }
        }
    }, [itemEdit])
    const uploadProps = {
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/')
            if (!isImage) {
                message.error('Chỉ được tải lên file hình ảnh!')
                return false
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                message.error('Hình ảnh phải nhỏ hơn 2MB!')
                return false
            }
            return true
        },
        maxCount: 1,
        onRemove: () => true
    }

    const handleBusinessCertImageUpload = (file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const fileObj = {
                uid: Date.now().toString(),
                name: file.name,
                status: 'done',
                url: e.target.result,
                originFileObj: file
            }
            setImgMenu([fileObj])
        }
        reader.readAsDataURL(file)
        return false
    }

    const handleSubmit = async (values) => {
        try {
            await form.validateFields();
            const formData = new FormData();

            Object.keys(values).forEach((key) => {
                if (key !== "imageURL") {
                    if (Array.isArray(values[key])) {
                        values[key].forEach((item) => {
                            formData.append(`${key}[]`, item);
                        });
                    } else {
                        formData.append(key, values[key]);
                    }
                }
            });

            if (imgMenu[0]?.originFileObj) {
                formData.append("imageURL", imgMenu[0].originFileObj);
            }
            if(imgMenu?.length==0){
                showMessage('Chưa thêm ảnh của món','error')
            }
            if(itemEdit){
                dispatch(editMenu({ menuId:itemEdit?._id, data: formData }))
            }
            else{
                dispatch(addMenu({ restaurantId, data: formData }))
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal title="Thêm món mới" centered open={open} onCancel={()=>{setOpen(false)}} onOk={() => { form.submit() }}>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item rules={[
                    { required: true, message: 'Vui lòng nhập tên nhà món!' },
                ]} name='name' label="Tên món">
                    <Input placeholder='Nhập tên món ăn'></Input>
                </Form.Item>
                <Form.Item rules={[
                    { required: true, message: 'Vui lòng nhập loại!' },
                ]} name='categories' label="Loại">
                    <Select placeholder='Chọn loại'>
                        <Option value={'dish'}>
                            Món chính
                        </Option>
                        <Option value={'dessert'}>
                            Tráng miệng
                        </Option>
                        <Option value={'drink'}>
                            Nước
                        </Option>
                    </Select>
                </Form.Item>
                <Form.Item rules={[
                    { required: true, message: 'Vui lòng nhập mô tả!' },
                ]} name='description' label="Mô tả">
                    <TextArea placeholder='Nhập mô tả' ></TextArea>
                </Form.Item>
                <Form.Item rules={[
                    { required: true, message: 'Vui lòng nhập số lượng!' },
                ]} name='quantity' label="Số lượng">
                    <InputNumber className='w-100' placeholder='Nhập số lượng' min={0}></InputNumber>
                </Form.Item>
                <Form.Item rules={[
                    { required: true, message: 'Vui lòng nhập giá!' },
                ]} name='price' label="Giá">
                    <InputNumber className='w-100' placeholder='Nhập giá' min={0}></InputNumber>
                </Form.Item>
                <Form.Item rules={[
                    { required: true, message: 'Vui lòng chọn hình ảnh món!' },
                ]}
                    label="Hình ảnh món"
                    name="imageURL"
                >
                    <Upload
                        // disabled={itemEdit ? true : false}
                        {...uploadProps}
                        listType="picture-card"
                        fileList={imgMenu}
                        beforeUpload={handleBusinessCertImageUpload}
                        onRemove={() => setImgMenu([])}
                    >
                        {imgMenu?.length === 0 && (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Tải lên hình ảnh</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalAddMenu