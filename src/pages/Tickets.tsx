import { useState } from 'react';
import { Table, Tag, Card, Typography, Badge, Modal, Descriptions, Space, Select, Button, Statistic } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { tickets } from '../mock/tickets';
import type { Ticket } from '../types';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const Tickets = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const filteredTickets = tickets.filter((t) => {
    const matchPriority = !priorityFilter || t.priority === priorityFilter;
    const matchStatus = !statusFilter || t.status === statusFilter;
    return matchPriority && matchStatus;
  });

  const priorityColorMap: Record<string, string> = {
    '紧急': 'red',
    '高': 'orange',
    '中': 'blue',
    '低': 'default',
  };

  const statusBadgeMap: Record<string, 'default' | 'processing' | 'warning' | 'success' | 'error'> = {
    '待处理': 'default',
    '处理中': 'processing',
    '等待客户回复': 'warning',
    '已解决': 'success',
    '已关闭': 'default',
  };

  const columns = [
    {
      title: '工单号',
      dataIndex: 'ticketNumber',
      key: 'ticketNumber',
      render: (text: string, record: Ticket) => (
        <a onClick={() => setSelectedTicket(record)}>{text}</a>
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Ticket) => (
        <a onClick={() => setSelectedTicket(record)}>{text}</a>
      ),
    },
    {
      title: '客户',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag color={priorityColorMap[priority]}>{priority}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={statusBadgeMap[status]} text={status} />
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (cat: string) => cat ? <Tag>{cat}</Tag> : '-',
    },
    {
      title: '渠道',
      dataIndex: 'channel',
      key: 'channel',
    },
    {
      title: '负责人',
      dataIndex: 'assignedToName',
      key: 'assignedToName',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: Ticket, b: Ticket) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      defaultSortOrder: 'descend' as const,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>工单管理</Title>
        <Button type="primary" icon={<PlusOutlined />}>创建工单</Button>
      </div>

      {/* 统计卡片 */}
      <Space style={{ marginBottom: 16 }} size="middle" wrap>
        <Card size="small" style={{ minWidth: 120 }}>
          <Statistic title="待处理" value={tickets.filter(t => t.status === '待处理').length} valueStyle={{ color: '#999' }} />
        </Card>
        <Card size="small" style={{ minWidth: 120 }}>
          <Statistic title="处理中" value={tickets.filter(t => t.status === '处理中').length} valueStyle={{ color: '#1890ff' }} />
        </Card>
        <Card size="small" style={{ minWidth: 120 }}>
          <Statistic title="紧急工单" value={tickets.filter(t => t.priority === '紧急').length} valueStyle={{ color: '#f5222d' }} />
        </Card>
        <Card size="small" style={{ minWidth: 120 }}>
          <Statistic title="已解决" value={tickets.filter(t => t.status === '已解决' || t.status === '已关闭').length} valueStyle={{ color: '#52c41a' }} />
        </Card>
      </Space>

      {/* 筛选器 */}
      <Card style={{ marginBottom: 16 }}>
        <Space wrap>
          <Select
            placeholder="优先级筛选"
            style={{ width: 120 }}
            allowClear
            value={priorityFilter || undefined}
            onChange={(v) => setPriorityFilter(v || '')}
          >
            <Option value="紧急">紧急</Option>
            <Option value="高">高</Option>
            <Option value="中">中</Option>
            <Option value="低">低</Option>
          </Select>
          <Select
            placeholder="状态筛选"
            style={{ width: 150 }}
            allowClear
            value={statusFilter || undefined}
            onChange={(v) => setStatusFilter(v || '')}
          >
            <Option value="待处理">待处理</Option>
            <Option value="处理中">处理中</Option>
            <Option value="等待客户回复">等待客户回复</Option>
            <Option value="已解决">已解决</Option>
            <Option value="已关闭">已关闭</Option>
          </Select>
        </Space>
      </Card>

      {/* 工单表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredTickets}
          rowKey="id"
          pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条工单` }}
        />
      </Card>

      {/* 工单详情弹窗 */}
      <Modal
        title={selectedTicket ? `工单详情 - ${selectedTicket.ticketNumber}` : ''}
        open={!!selectedTicket}
        onCancel={() => setSelectedTicket(null)}
        footer={null}
        width={700}
      >
        {selectedTicket && (
          <div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="工单号">{selectedTicket.ticketNumber}</Descriptions.Item>
              <Descriptions.Item label="客户">{selectedTicket.customerName}</Descriptions.Item>
              <Descriptions.Item label="优先级">
                <Tag color={priorityColorMap[selectedTicket.priority]}>{selectedTicket.priority}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                <Badge status={statusBadgeMap[selectedTicket.status]} text={selectedTicket.status} />
              </Descriptions.Item>
              <Descriptions.Item label="分类">{selectedTicket.category || '-'}</Descriptions.Item>
              <Descriptions.Item label="渠道">{selectedTicket.channel}</Descriptions.Item>
              <Descriptions.Item label="负责人">{selectedTicket.assignedToName || '未分配'}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{selectedTicket.createdAt}</Descriptions.Item>
              {selectedTicket.resolvedAt && (
                <Descriptions.Item label="解决时间" span={2}>{selectedTicket.resolvedAt}</Descriptions.Item>
              )}
            </Descriptions>
            <Card size="small" style={{ marginTop: 16 }} title="问题描述">
              <Paragraph>{selectedTicket.description}</Paragraph>
            </Card>
            {selectedTicket.status === '处理中' && (
              <Card size="small" style={{ marginTop: 16, background: '#f0f5ff', borderColor: '#adc6ff' }} title="AI建议处理方案">
                <Space direction="vertical" size="small">
                  <Text>1. 检查系统日志中是否有相关报错记录</Text>
                  <Text>2. 验证该功能在测试环境是否可复现</Text>
                  <Text>3. 联系技术团队确认是否为已知问题</Text>
                </Space>
              </Card>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Tickets;
