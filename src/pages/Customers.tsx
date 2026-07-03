import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Input, Select, Tag, Space, Card, Typography, Button } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { customers } from '../mock/customers';
import type { Customer } from '../types';

const { Title } = Typography;
const { Option } = Select;

const Customers = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [industryFilter, setIndustryFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const filteredCustomers = customers.filter((c) => {
    const matchSearch =
      !searchText ||
      c.name.includes(searchText) ||
      c.company?.includes(searchText) ||
      c.email?.includes(searchText) ||
      c.phone?.includes(searchText);
    const matchIndustry = !industryFilter || c.industry === industryFilter;
    const matchStatus = !statusFilter || c.status === statusFilter;
    return matchSearch && matchIndustry && matchStatus;
  });

  const industries = [...new Set(customers.map((c) => c.industry).filter(Boolean))];

  const statusColorMap: Record<string, string> = {
    '活跃': 'green',
    '潜在': 'blue',
    '流失风险': 'orange',
    '已流失': 'red',
  };

  const columns = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Customer) => (
        <a onClick={() => navigate(`/customers/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: '公司',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
    },
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusColorMap[status] || 'default'}>{status}</Tag>
      ),
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <Space wrap>
          {tags.slice(0, 2).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {tags.length > 2 && <Tag>+{tags.length - 2}</Tag>}
        </Space>
      ),
    },
    {
      title: '来源',
      dataIndex: 'sourceChannel',
      key: 'sourceChannel',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: Customer, b: Customer) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>客户管理</Title>
        <Button type="primary" icon={<PlusOutlined />}>新增客户</Button>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <Space wrap>
          <Input
            placeholder="搜索客户名称、公司、邮箱、电话"
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
          <Select
            placeholder="行业筛选"
            style={{ width: 150 }}
            allowClear
            value={industryFilter || undefined}
            onChange={(v) => setIndustryFilter(v || '')}
          >
            {industries.map((ind) => (
              <Option key={ind} value={ind}>{ind}</Option>
            ))}
          </Select>
          <Select
            placeholder="状态筛选"
            style={{ width: 120 }}
            allowClear
            value={statusFilter || undefined}
            onChange={(v) => setStatusFilter(v || '')}
          >
            <Option value="活跃">活跃</Option>
            <Option value="潜在">潜在</Option>
            <Option value="流失风险">流失风险</Option>
            <Option value="已流失">已流失</Option>
          </Select>
        </Space>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredCustomers}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `共 ${total} 条` }}
        />
      </Card>
    </div>
  );
};

export default Customers;
