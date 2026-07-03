import { Card, Col, Row, Statistic, List, Tag, Typography } from 'antd';
import {
  DollarOutlined,
  TeamOutlined,
  WarningOutlined,
  FundOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { kpiData, salesFunnelData, recentActivities, monthlyRevenueData } from '../mock/dashboard';

const { Title } = Typography;

const Dashboard = () => {
  const kpiCards = [
    {
      title: '总收入',
      value: kpiData.totalRevenue.value,
      prefix: '¥',
      trend: kpiData.totalRevenue.trend,
      icon: <DollarOutlined />,
      color: '#3f8600',
    },
    {
      title: '活跃客户数',
      value: kpiData.activeCustomers.value,
      trend: kpiData.activeCustomers.trend,
      icon: <TeamOutlined />,
      color: '#1890ff',
    },
    {
      title: '待处理工单',
      value: kpiData.pendingTickets.value,
      trend: kpiData.pendingTickets.trend,
      icon: <WarningOutlined />,
      color: '#cf1322',
    },
    {
      title: '销售管线总值',
      value: kpiData.pipelineValue.value,
      prefix: '¥',
      trend: kpiData.pipelineValue.trend,
      icon: <FundOutlined />,
      color: '#722ed1',
    },
  ];

  const formatCurrency = (value: number) => {
    if (value >= 10000) {
      return `${(value / 10000).toFixed(0)}万`;
    }
    return value.toLocaleString();
  };

  const getActivityTag = (type: string) => {
    const map: Record<string, { color: string; label: string }> = {
      deal: { color: 'blue', label: '商机' },
      customer: { color: 'green', label: '客户' },
      ticket: { color: 'orange', label: '工单' },
      lead: { color: 'purple', label: '线索' },
    };
    const item = map[type] || { color: 'default', label: type };
    return <Tag color={item.color}>{item.label}</Tag>;
  };

  return (
    <div>
      <Title level={4} style={{ marginBottom: 24 }}>仪表盘</Title>

      {/* KPI Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {kpiCards.map((kpi, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card hoverable>
              <Statistic
                title={kpi.title}
                value={kpi.value}
                prefix={kpi.prefix}
                formatter={(value) => formatCurrency(value as number)}
                valueStyle={{ color: kpi.color }}
              />
              <div style={{ marginTop: 8 }}>
                {kpi.trend > 0 ? (
                  <span style={{ color: '#3f8600' }}>
                    <ArrowUpOutlined /> {kpi.trend}%
                  </span>
                ) : (
                  <span style={{ color: '#cf1322' }}>
                    <ArrowDownOutlined /> {Math.abs(kpi.trend)}%
                  </span>
                )}
                <span style={{ color: '#999', marginLeft: 8 }}>较上月</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* Sales Funnel Chart */}
        <Col xs={24} lg={14}>
          <Card title="销售漏斗" style={{ marginBottom: 16 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesFunnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
                <YAxis type="category" dataKey="stage" width={60} />
                <Tooltip
                  formatter={(value: number) => [`¥${value.toLocaleString()}`, '金额']}
                />
                <Bar dataKey="amount" fill="#1890ff" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Monthly Revenue Trend */}
          <Card title="月度收入趋势">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
                <Tooltip formatter={(value: number) => [`¥${value.toLocaleString()}`, '收入']} />
                <Line type="monotone" dataKey="revenue" stroke="#722ed1" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col xs={24} lg={10}>
          <Card title="最近活动" style={{ height: '100%' }}>
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <div>
                        {getActivityTag(item.type)}
                        <span style={{ fontSize: 13 }}>{item.description}</span>
                      </div>
                    }
                    description={
                      <span style={{ fontSize: 12, color: '#999' }}>
                        {item.user} · {item.time}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
