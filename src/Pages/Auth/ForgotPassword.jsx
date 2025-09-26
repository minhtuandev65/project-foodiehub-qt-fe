// ForgotPasswordPage.jsx
import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
  Result
} from 'antd';
import {
  MailOutlined,
  CrownOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import '../../assets/css/login.css';
import axios from 'axios';
import showMessage from '../../Helper/showMessage';
import {API_BASE_URL} from '../../settings/config'
import {Link} from 'react-router-dom'
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/v1/api/auth/forgotPassword`,
        {
          email: values.email,
        }
      );
      
      showMessage(response?.data?.message || 'Email khôi phục mật khẩu đã được gửi!', 'success');
      setSentEmail(values.email);
      setEmailSent(true);
      
    } catch (error) {
      console.error(error?.response?.data?.message);
      showMessage(error?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleBackToLogin = () => {
    setEmailSent(false);
    form.resetFields();
  };

  const handleResendEmail = async () => {
    if (sentEmail) {
      setLoading(true);
      try {
        const response = await axios.post(`${API_BASE_URL}/v1/api/auth/forgot-password`,
          {
            email: sentEmail,
          }
        );
        showMessage('Email đã được gửi lại!', 'success');
      } catch (error) {
        showMessage('Có lỗi xảy ra khi gửi lại email!', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-page">
      {/* Background decoration */}
      <div className="bg-decoration">
        <div className="decoration-item utensils-1">🍴</div>
        <div className="decoration-item chef-hat">👨‍🍳</div>
        <div className="decoration-item utensils-2">🥄</div>
      </div>

      {/* Forgot Password Card */}
      <div className="login-container">
        <div className="login-card">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo-icon">
              <CrownOutlined style={{ fontSize: 32, color: 'white' }} />
            </div>
            <Title level={1} className="logo-title">
              FoodieHub
            </Title>
            <Text className="logo-subtitle">
              {emailSent ? 'Email đã được gửi' : 'Khôi phục mật khẩu'}
            </Text>
          </div>

          {!emailSent ? (
            <>
              {/* Forgot Password Form */}
              <Form
                form={form}
                name="forgotPassword"
                size="large"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                className="login-form"
              >
                <div style={{ marginBottom: 24, textAlign: 'center' }}>
                  <Text type="secondary">
                    Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn liên kết để khôi phục mật khẩu.
                  </Text>
                </div>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Email là bắt buộc!' },
                    { type: 'email', message: 'Email không hợp lệ!' }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="input-icon" />}
                    placeholder="example@email.com"
                    className="custom-input"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="submit-button"
                    block
                  >
                    Gửi email khôi phục
                  </Button>
                </Form.Item>
              </Form>

              {/* Back to Login */}
              <div className="signup-section">
                <Link to="/login" className="signup-link">
                  <ArrowLeftOutlined style={{ marginRight: 8 }} />
                  Quay lại đăng nhập
                </Link>
              </div>
            </>
          ) : (
            // Success Message
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <Result
                status="success"
                title="Email đã được gửi!"
                subTitle={
                  <div>
                    <p>Chúng tôi đã gửi liên kết khôi phục mật khẩu đến:</p>
                    <Text strong style={{ color: '#1890ff' }}>{sentEmail}</Text>
                    <p style={{ marginTop: 16, color: '#666' }}>
                      Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để đặt lại mật khẩu.
                    </p>
                  </div>
                }
                extra={[
                  <Button 
                    type="primary" 
                    key="back"
                    onClick={handleBackToLogin}
                  >
                    Quay lại đăng nhập
                  </Button>,
                  <Button 
                    key="resend"
                    loading={loading}
                    onClick={handleResendEmail}
                  >
                    Gửi lại email
                  </Button>
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;