// RegisterPage.jsx
import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
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
  GoogleCircleFilled,
  MailOutlined,
  ContactsOutlined
} from '@ant-design/icons';
import '../../assets/css/register.css';
import axios from 'axios';
import showMessage from '../../Helper/showMessage';
import { API_BASE_URL } from '../../settings/config';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const RegisterPage = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Auto generate fullName when firstName or lastName changes
  const handleNameChange = () => {
    const firstName = form.getFieldValue('firstName') || '';
    const lastName = form.getFieldValue('lastName') || '';
    const fullName = `${firstName} ${lastName}`.trim();
    form.setFieldsValue({ fullName });
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/v1/api/auth/register`, {
        firstName: values.firstName,
        lastName: values.lastName,
        fullName: values.fullName,
        email: values.email,
        username: values.username,
        password: values.password,
      });
      showMessage(response?.data?.message, 'success');
    } catch (error) {
      console.error(error?.response?.data?.message);
      showMessage(error?.response?.data?.message || t('register_failed'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="register-page">
      {/* Background decoration */}
      <div className="bg-decoration">
        <div className="decoration-item utensils-1">🍴</div>
        <div className="decoration-item chef-hat">👨‍🍳</div>
        <div className="decoration-item utensils-2">🥄</div>
      </div>

      {/* Register Card */}
      <div className="register-container">
        <div className="register-card">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo-icon">
              <CrownOutlined style={{ fontSize: 32, color: 'white' }} />
            </div>
            <Title level={1} className="logo-title">
              FoodieHub
            </Title>
            <Text className="logo-subtitle">
              {t('create_account')}
            </Text>
          </div>

          {/* Register Form */}
          <Form
            form={form}
            name="register"
            size="large"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            className="register-form"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label={t('first_name')}
                  rules={[
                    { required: true, message: t('first_name_required') },
                    { min: 2, message: t('first_name_min') },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="input-icon" />}
                    placeholder="Nguyễn"
                    className="custom-input"
                    onChange={handleNameChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  label={t('last_name')}
                  rules={[
                    { required: true, message: t('last_name_required') },
                    { min: 2, message: t('last_name_min') },
                  ]}
                >
                  <Input
                    prefix={<ContactsOutlined className="input-icon" />}
                    placeholder="Văn A"
                    className="custom-input"
                    onChange={handleNameChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="fullName"
              label={t('full_name')}
              rules={[{ required: true, message: t('full_name_required') }]}
            >
              <Input
                prefix={<UserOutlined className="input-icon" />}
                placeholder="Nguyễn Văn A"
                className="custom-input"
                readOnly
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={t('email')}
              rules={[
                { required: true, message: t('email_required') },
                { type: 'email', message: t('email_invalid') },
              ]}
            >
              <Input
                prefix={<MailOutlined className="input-icon" />}
                placeholder="example@email.com"
                className="custom-input"
              />
            </Form.Item>

            <Form.Item
              name="username"
              label={t('username')}
              rules={[
                { required: true, message: t('username_required') },
                { min: 3, message: t('username_min') },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: t('username_pattern'),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="input-icon" />}
                placeholder="username123"
                className="custom-input"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={t('password')}
              rules={[
                { required: true, message: t('password_required') },
                { min: 6, message: t('password_min') },
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

            <Form.Item
              name="confirmPassword"
              label={t('confirm_password')}
              dependencies={['password']}
              rules={[
                { required: true, message: t('confirm_password_required') },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t('confirm_password_mismatch'))
                    );
                  },
                }),
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
              <Form.Item
                name="agree"
                valuePropName="checked"
                noStyle
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error(t('agree_required'))),
                  },
                ]}
              >
                <Checkbox className="agree-checkbox">
                  {t('agree_terms')}{' '}
                  <Link className="terms-link">{t('terms_of_use')}</Link>{' '}
                  {t('and')}{' '}
                  <Link className="privacy-link">{t('privacy_policy')}</Link>
                </Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="submit-button"
                block
              >
                {t('register')}
              </Button>
            </Form.Item>
          </Form>

          {/* Login Link */}
          <div className="login-section">
            <Text>
              {t('already_account')}{' '}
              <Link to="/login" className="login-link">
                {t('login_now')}
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
