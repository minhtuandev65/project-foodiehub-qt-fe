// ProfilePage.jsx
import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Upload,
    Avatar,
    Select,
    Card,
    Row,
    Col,
    Typography,
    Descriptions,
    Space,
    Divider,
    Image,
} from 'antd';
import {
    UserOutlined,
    MailOutlined,
    EditOutlined,
    SaveOutlined,
    CloseOutlined,
    CameraOutlined,
    ManOutlined,
    WomanOutlined,
    CrownOutlined,
    CalendarOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import '../../assets/css/profile.css';
import axios from 'axios';
import showMessage from '../../Helper/showMessage';
import { API_BASE_URL } from '../../settings/config'
import { useTranslation } from "react-i18next";
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;
const { Option } = Select;

const Profile = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const profileData = useSelector((state) => state.staff.user);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([])


    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.put(`${API_BASE_URL}/v1/api/user/profile`, {
                ...values
            });

            showMessage('Cập nhật profile thành công!', 'success');
            setEditing(false);

        } catch (error) {
            console.error(error?.response?.data?.message);
            showMessage(error?.response?.data?.message || 'Có lỗi xảy ra!', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarUpload = async (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Handle successful upload
            const newAvatarUrl = info.file.response?.url;
            if (newAvatarUrl) {
                showMessage('Cập nhật avatar thành công!', 'success');
            }
            setLoading(false);
        }
        if (info.file.status === 'error') {
            showMessage('Upload avatar thất bại!', 'error');
            setLoading(false);
        }
    };

    const formatDate = (timestamp) => {
        if (typeof timestamp === 'number') {
            return dayjs(timestamp).format('DD/MM/YYYY HH:mm');
        }
        return dayjs(timestamp).format('DD/MM/YYYY HH:mm');
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };



    return (
        <div className="login-page">
            {/* Background decoration */}
            <div className="bg-decoration">
                <div className="decoration-item utensils-1">🍴</div>
                <div className="decoration-item chef-hat">👨‍🍳</div>
                <div className="decoration-item utensils-2">🥄</div>
            </div>

            <div className="login-container" style={{ maxWidth: 800 }}>
                <Card className="login-card">
                    {/* Header Section */}
                    <div className="logo-section" style={{ marginBottom: 30 }}>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <Image
                                // wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: visible => setPreviewOpen(visible),
                                    afterOpenChange: visible => !visible && setPreviewImage(''),
                                }}
                                style={{ border: '4px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', width:80, height:80, borderRadius:'50%' }}
                                rootClassName='profile-avatar'
                                src={profileData?.avatar}
                            />
                            {editing && (
                                <Upload
                                    name="avatar"
                                    showUploadList={false}
                                    fileList={fileList}
                                    onChange={handleAvatarUpload}
                                    style={{
                                        position: 'absolute',
                                        bottom: -5,
                                        right: -5,
                                    }}
                                >
                                    <Button
                                        shape="circle"
                                        icon={<CameraOutlined />}
                                        size="small"
                                        style={{ backgroundColor: '#1890ff', color: 'white' }}
                                    />
                                </Upload>
                            )}

                        </div>
                        <Title level={2} style={{ margin: '16px 0 8px', color: 'white' }}>
                            {profileData.fullName}
                        </Title>
                    </div>

                    {!editing ? (
                        // View Mode
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <Title level={4} style={{ margin: 0 }}>Thông tin cá nhân</Title>
                                <Button
                                    type="primary"
                                    icon={<EditOutlined />}
                                    onClick={() => setEditing(true)}
                                >
                                    Chỉnh sửa
                                </Button>
                            </div>

                            <Descriptions bordered column={1} size="middle">
                                <Descriptions.Item label="Email">
                                    <Space>
                                        <MailOutlined />
                                        {profileData.email}
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item label="Tên đăng nhập">
                                    <Space>
                                        <UserOutlined />
                                        {profileData.username}
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item label="Họ">
                                    {profileData.firstName}
                                </Descriptions.Item>
                                <Descriptions.Item label="Tên">
                                    {profileData.lastName}
                                </Descriptions.Item>
                                <Descriptions.Item label="Giới tính">
                                    <Space>
                                        {profileData.gender === 'MALE' ? <ManOutlined style={{ color: '#1890ff' }} /> : <WomanOutlined style={{ color: '#f759ab' }} />}
                                        {profileData.gender === 'MALE' ? 'Nam' : 'Nữ'}
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item label="Ngày tạo">
                                    <Space>
                                        <CalendarOutlined />
                                        {formatDate(profileData.createdAt)}
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item label="Cập nhật lần cuối">
                                    <Space>
                                        <ClockCircleOutlined />
                                        {formatDate(profileData.updatedAt)}
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item label="Hoạt động lần cuối">
                                    <Space>
                                        <ClockCircleOutlined />
                                        {formatDate(profileData.latestActiveAt)}
                                    </Space>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                    ) : (
                        // Edit Mode
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <Title level={4} style={{ margin: 0 }}>Chỉnh sửa thông tin</Title>
                                <Space>
                                    <Button
                                        icon={<CloseOutlined />}
                                        onClick={() => {
                                            setEditing(false);
                                            form.setFieldsValue({
                                                email: profileData.email,
                                                username: profileData.username,
                                                firstName: profileData.firstName,
                                                lastName: profileData.lastName,
                                                gender: profileData.gender,
                                            });
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                </Space>
                            </div>

                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                initialValues={{
                                    email: profileData.email,
                                    username: profileData.username,
                                    firstName: profileData.firstName,
                                    lastName: profileData.lastName,
                                    gender: profileData.gender,
                                }}
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="firstName"
                                            label="Họ"
                                            rules={[{ required: true, message: 'Họ là bắt buộc!' }]}
                                        >
                                            <Input placeholder="Nhập họ" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="lastName"
                                            label="Tên"
                                            rules={[{ required: true, message: 'Tên là bắt buộc!' }]}
                                        >
                                            <Input placeholder="Nhập tên" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item
                                    name="username"
                                    label="Tên đăng nhập"
                                    rules={[{ required: true, message: 'Tên đăng nhập là bắt buộc!' }]}
                                >
                                    <Input
                                        prefix={<UserOutlined />}
                                        placeholder="Nhập tên đăng nhập"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Email là bắt buộc!' },
                                        { type: 'email', message: 'Email không hợp lệ!' }
                                    ]}
                                >
                                    <Input
                                        prefix={<MailOutlined />}
                                        placeholder="Nhập email"
                                        disabled
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="gender"
                                    label="Giới tính"
                                    rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                                >
                                    <Select placeholder="Chọn giới tính">
                                        <Option value="MALE">
                                            <Space>
                                                <ManOutlined style={{ color: '#1890ff' }} />
                                                Nam
                                            </Space>
                                        </Option>
                                        <Option value="FEMALE">
                                            <Space>
                                                <WomanOutlined style={{ color: '#f759ab' }} />
                                                Nữ
                                            </Space>
                                        </Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        icon={<SaveOutlined />}
                                        block
                                        size="large"
                                    >
                                        Lưu thay đổi
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Profile;