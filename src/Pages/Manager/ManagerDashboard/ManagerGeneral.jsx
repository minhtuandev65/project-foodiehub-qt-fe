import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Space, Button, DatePicker, Select } from 'antd';
import { UserOutlined, CheckCircleOutlined, ClockCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import '../../../assets/css/manager/general.css';

// Đăng ký các component của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const { RangePicker } = DatePicker;
const { Option } = Select;

const ManagerGeneral = () => {
  const [cvData, setCvData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  // Dữ liệu mẫu cho CV
  useEffect(() => {
    const sampleData = [
      {
        key: '1',
        name: 'Nguyễn Văn A',
        position: 'Frontend Developer',
        email: 'nguyenvana@email.com',
        phone: '0123456789',
        status: 'approved',
        submitDate: '2024-01-15',
        experience: '2 năm'
      },
      {
        key: '2',
        name: 'Trần Thị B',
        position: 'Backend Developer',
        email: 'tranthib@email.com',
        phone: '0987654321',
        status: 'pending',
        submitDate: '2024-01-14',
        experience: '3 năm'
      },
      {
        key: '3',
        name: 'Lê Văn C',
        position: 'UI/UX Designer',
        email: 'levanc@email.com',
        phone: '0456789123',
        status: 'rejected',
        submitDate: '2024-01-13',
        experience: '1 năm'
      },
      {
        key: '4',
        name: 'Phạm Thị D',
        position: 'Project Manager',
        email: 'phamthid@email.com',
        phone: '0789123456',
        status: 'approved',
        submitDate: '2024-01-12',
        experience: '5 năm'
      },
      {
        key: '5',
        name: 'Hoàng Văn E',
        position: 'DevOps Engineer',
        email: 'hoangvane@email.com',
        phone: '0321654987',
        status: 'pending',
        submitDate: '2024-01-11',
        experience: '4 năm'
      },
      {
        key: '6',
        name: 'Võ Thị F',
        position: 'QA Tester',
        email: 'vothif@email.com',
        phone: '0654321789',
        status: 'approved',
        submitDate: '2024-01-10',
        experience: '2 năm'
      }
    ];
    setCvData(sampleData);
    setFilteredData(sampleData);
  }, []);

  // Tính toán thống kê
  const totalCv = filteredData.length;
  const approvedCv = filteredData.filter(cv => cv.status === 'approved').length;
  const pendingCv = filteredData.filter(cv => cv.status === 'pending').length;
  const rejectedCv = filteredData.filter(cv => cv.status === 'rejected').length;

  // Dữ liệu cho biểu đồ cột
  const barChartData = {
    labels: ['Tổng CV', 'Đã duyệt', 'Chờ duyệt', 'Từ chối'],
    datasets: [
      {
        label: 'Số lượng CV',
        data: [totalCv, approvedCv, pendingCv, rejectedCv],
        backgroundColor: [
          '#1890ff',
          '#52c41a',
          '#faad14',
          '#ff4d4f'
        ],
        borderColor: [
          '#1890ff',
          '#52c41a',
          '#faad14',
          '#ff4d4f'
        ],
        borderWidth: 1
      }
    ]
  };

  // Dữ liệu cho biểu đồ tròn
  const doughnutChartData = {
    labels: ['Đã duyệt', 'Chờ duyệt', 'Từ chối'],
    datasets: [
      {
        data: [approvedCv, pendingCv, rejectedCv],
        backgroundColor: [
          '#52c41a',
          '#faad14',
          '#ff4d4f'
        ],
        borderColor: [
          '#52c41a',
          '#faad14',
          '#ff4d4f'
        ],
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê CV theo trạng thái'
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Tỷ lệ CV theo trạng thái'
      }
    }
  };

  // Cột cho bảng
  

  // Xử lý lọc theo ngày
  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    filterData(dates, statusFilter);
  };

  // Xử lý lọc theo trạng thái
  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    filterData(dateRange, value);
  };

  // Hàm lọc dữ liệu
  const filterData = (dates, status) => {
    let filtered = cvData;

    if (dates && dates.length === 2) {
      const [startDate, endDate] = dates;
      filtered = filtered.filter(cv => {
        const cvDate = new Date(cv.submitDate);
        return cvDate >= startDate.toDate() && cvDate <= endDate.toDate();
      });
    }

    if (status !== 'all') {
      filtered = filtered.filter(cv => cv.status === status);
    }

    setFilteredData(filtered);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard Quản lý CV</h1>
        <div className="dashboard-filters">
          <Space>
            <RangePicker onChange={handleDateRangeChange} />
            <Select
              value={statusFilter}
              style={{ width: 150 }}
              onChange={handleStatusFilterChange}
            >
              <Option value="all">Tất cả</Option>
              <Option value="approved">Đã duyệt</Option>
              <Option value="pending">Chờ duyệt</Option>
              <Option value="rejected">Từ chối</Option>
            </Select>
          </Space>
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card total-cv">
            <Statistic
              title="Tổng số CV"
              value={totalCv}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card approved-cv">
            <Statistic
              title="CV đã duyệt"
              value={approvedCv}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card pending-cv">
            <Statistic
              title="CV chờ duyệt"
              value={pendingCv}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card rejected-cv">
            <Statistic
              title="CV từ chối"
              value={rejectedCv}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ */}
      <Row gutter={[16, 16]} className="charts-row">
        <Col xs={24} lg={12}>
          <Card title="Thống kê theo cột" className="chart-card">
            <Bar data={barChartData} options={chartOptions} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Thống kê theo tỷ lệ" className="chart-card">
            <Doughnut data={doughnutChartData} options={doughnutOptions} />
          </Card>
        </Col>
      </Row>      
    </div>
  );
};

export default ManagerGeneral;