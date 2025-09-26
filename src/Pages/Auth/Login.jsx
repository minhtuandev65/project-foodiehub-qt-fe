// LoginPage.jsx
import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  message,
  Divider,
  Space,
  Typography,
  Row,
  Col
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
  FacebookOutlined,
  CrownOutlined,
  FacebookFilled,
  GoogleCircleFilled
} from '@ant-design/icons';
import '../../assets/css/login.css';
import axios from 'axios';
import showMessage from '../../Helper/showMessage';
import { API_BASE_URL } from '../../settings/config'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const LoginPage = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      const response = await axios.post(`${API_BASE_URL}/v1/api/auth/login`,
        {
          email: values.email,
          password: values.password,
        }
      );
      localStorage.setItem('token', response?.data?.data?.accessToken)
      showMessage(response?.data?.message, 'success')
      navigate('/home')

    } catch (error) {
      console.error(error?.response?.data?.message)
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleSocialLogin = (provider) => {
    message.info(`Đăng nhập bằng ${provider} (Demo)`);
  };

  return (
    <div className="login-page">
      {/* Background decoration */}
      <div className="bg-decoration">
        <div className="decoration-item utensils-1">🍴</div>
        <div className="decoration-item chef-hat">👨‍🍳</div>
        <div className="decoration-item utensils-2">🥄</div>
      </div>

      {/* Login Card */}
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
              {t("discovery")}
            </Text>
          </div>

          {/* Login Form */}
          <Form
            form={form}
            name="login"
            size="large"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            className="login-form"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Email là bắt buộc!' },
                // { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input
                prefix={<UserOutlined className="input-icon" />}
                placeholder="example@email.com"
                className="custom-input"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={t('password')}
              rules={[
                { required: true, message: 'Mật khẩu là bắt buộc!' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="input-icon" />}
                placeholder="••••••••"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="custom-input"
              />
            </Form.Item>

            <Form.Item className="form-options">
              <div className="options-wrapper">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="remember-checkbox">
                    {t('remember_login')}
                  </Checkbox>
                </Form.Item>
                <Link to='/forgot-password' className="forgot-link">
                  {t('forget_password')}
                </Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="submit-button"
                block
              >
                {t('login')}
              </Button>
            </Form.Item>
          </Form>

          {/* Social Login */}
          <div className="social-section">
            <Divider className="social-divider">
              <Text type="secondary" className='primary_color_text'>{t('or_login_by')}</Text>
            </Divider>

            <Row className='w-100' justify='center' gutter={[18]}>
              <Col span={11} className='d-flex justify-content-center'>
                <Button
                  icon={<GoogleCircleFilled className='mr-3' style={{ fontSize: 18 }} />}
                  onClick={() => handleSocialLogin('Google')}
                  className="social-button google-button"
                >
                  Google
                </Button>
              </Col>
              <Col span={11} className='d-flex justify-content-center'>
                <Button
                  icon={<FacebookFilled className='mr-3' style={{ fontSize: 18 }} />}
                  onClick={() => handleSocialLogin('Facebook')}
                  className="social-button facebook-button"
                >
                  Facebook
                </Button>
              </Col>
            </Row>
          </div>

          {/* Sign Up Link */}
          <div className="signup-section">
            <Text>
              {t('not_account')} ? {' '}
              <Link to='/register' className="signup-link">
                {t('register_now')}
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;