import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, InputNumber, message, Modal, Select, Upload } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import { t } from 'i18next'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTable } from '../../redux/reducer/modules/ManagerReducer'
import { useParams } from 'react-router-dom'

function CreateTable({ itemEdit, open, setOpen }) {
    const [form] = useForm()
    const [logoFile, setLogoFile] = useState([])
    const { restaurantId } = useParams()
    const dispatch = useDispatch()
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

    const handleSubmit = async () => {
        await form.validateFields()
        const formData = new FormData();
        const values = {
            restaurantId,
            name: form.getFieldValue('name'),
            imageURL: logoFile[0]?.originFileObj,
            categories: form.getFieldValue('categories'),
            description: form.getFieldValue('description'),
            capacity: form.getFieldValue('capacity'),
        }

        Object.keys(values).forEach((key) => {
            if (key !== "imageURL") {
                if (Array.isArray(values[key])) {
                    values[key].forEach((item) => {
                        formData.append(`${key}[]`, item)
                    })
                } else {
                    formData.append(key, values[key])
                }
            }
        })
         if (logoFile[0]?.originFileObj) {
                formData.append("imageURL", logoFile[0].originFileObj);
            }
        dispatch(createTable({restaurantId, values: formData}))
        console.log(form.getFieldsValue())
        console.log(logoFile)
    }

    const handleLogoUpload = (file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const fileObj = {
                uid: Date.now().toString(),
                name: file.name,
                status: 'done',
                url: e.target.result,
                originFileObj: file
            }
            setLogoFile([fileObj])
        }
        reader.readAsDataURL(file)
        return false // Prevent default upload behavior
    }
    return (
        <Modal onOk={() => { handleSubmit() }} onCancel={() => { setOpen(false) }} open={open} title={"Thêm bàn"}>
            <Form form={form} layout='vertical'>
                <Form.Item label={t('table_name')} name={'name'}>
                    <Input />
                </Form.Item>
                <Form.Item label={t('table_category')} name={'categories'}>
                    <Select options={[
                        {
                            value: 1,
                            label: "Thường",
                        },
                        {
                            value: 2,
                            label: "VIP",
                        },
                    ]} />
                </Form.Item>
                <Form.Item label={t('table_desc')} name={'description'}>
                    <TextArea />
                </Form.Item>
                <Form.Item label={t('table_capacity')} name={'capacity'}>
                    <InputNumber defaultValue={1} />
                </Form.Item>
                <Form.Item label={t('table_image')}>
                    <Upload
                        disabled={itemEdit ? true : false}
                        {...uploadProps}
                        listType="picture-card"
                        fileList={logoFile}
                        beforeUpload={handleLogoUpload}
                        onRemove={() => setLogoFile([])}
                    >
                        {logoFile.length === 0 && (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Tải lên Logo</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateTable