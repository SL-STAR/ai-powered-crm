import { useParams, useNavigate } from 'react-router-dom';
import {
  Card, Col, Row, Typography, Tag, Timeline, Table, Descriptions, Badge,
  Progress, Space, Button, Alert,
} from 'antd';
import {
  ArrowLeftOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined,
  BankOutlined, TagOutlined, RobotOutlined, BulbOutlined,
} from '@ant-design/icons';
import { customers, getInteractions, getAIRecommendations } from '../mock/customers';
import { opportunities } from '../mock/sales';
import { tickets } from '../mock/tickets';
import type { Interaction, Opportunity, Ticket } from '../types';

const { Title, Text } = Typography;

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const customer = customers.find((c) => c.id === id);
  if (!customer) {
    return <Alert message="客户不存在" type="error" />;
  }

  const interactionList = getInteractions(customer.id);
  const customerOpportunities = opportunities.filter((o) => o.customerId === customer.id);
  const customerTickets = tickets.filter((t) => t.customerId === customer.id);
  const recommendations = getAIRecommendations(customer.id);

  const statusColorMap: Record<string, string> = {
    '活跃': 'green',
    '潜在': 'blue',
    '流失风险': 'orange',
    '已流失': 'red',
  };

  const interactionIconMap: Record<string, string> = {
    call: '📞',
    email: '📧',
    meeting: '🤝',
    note: '📝',
  };

  const interactionTypeMap: Record<string, string> = {
    call: '电话',
    email: '邮件',
    meeting: '会议',
    note: '备注',
  };

  const opportunityColumns = [
    { title: '商机名称', dataIndex: 'name', key: 'name' },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (v: number) => `¥${v.toLocaleString()}`,
    },
    {
      title: '阶段',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: string) => {
        const colorMap: Record<string, string> = {
          '发现': 'default', '验证': 'processing', '方案': 'blue',
          '谈判': 'orange', '赢单': 'success', '丢单': 'error',
        };
        return <Tag color={colorMap[stage]}>{stage}</Tag>;
      },
    },
    {
      title: '赢率',
      dataIndex: 'winProbability',
      key: 'winProbability',
      render: (v: number) => <Progress percent={v} size="small" style={{ width: 80 }} />,
    },
    { title: '预计关闭', dataIndex: 'expectedCloseDate', key: 'expectedCloseDate' },
  ];

  const ticketColumns = [
    { title: '工单号', dataIndex: 'ticketNumber', key: 'ticketNumber' },
    { title: '标题', dataIndex: 'title', key: 'title' },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (p: string) => {
        const colorMap: Record<string, string> = { '紧急': 'red', '高': 'orange', '中': 'blue', '低': 'default' };
        return <Tag color={colorMap[p]}>{p}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => {
        const statusMap: Record<string, string> = {
          '待处理': 'default', '处理中': 'processing', '等待客户回复': 'warning',
          '已解决': 'success', '已关闭': 'default',
        };
        return <Badge status={statusMap[s] as any} text={s} />;
      },
    },
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return '#52c41a';
    if (confidence >= 70) return '#1890ff';
    return '#faad14';
  };

  return (
    <div>
      <Button
        icon={<ArrowLeftOutlined />}
        style={{ marginBottom: 16 }}
        onClick={() => navigate('/customers')}
      >
        返回客户列表
      </Button>

      <Row gutter={[16, 16]}>
        {/* 基本信息卡片 */}
        <Col xs={24} lg={16}>
          <Card title={<Space><span>客户详情</span><Tag color={statusColorMap[customer.status]}>{customer.status}</Tag></Space>}>
            <Descriptions column={{ xs: 1, sm: 2, md: 3 }}>
              <Descriptions.Item label={<><BankOutlined /> 公司</>}>{customer.company || '-'}</Descriptions.Item>
              <Descriptions.Item label={<><PhoneOutlined /> 电话</>}>{customer.phone || '-'}</Descriptions.Item>
              <Descriptions.Item label={<><MailOutlined /> 邮箱</>}>{customer.email || '-'}</Descriptions.Item>
              <Descriptions.Item label="行业">{customer.industry || '-'}</Descriptions.Item>
              <Descriptions.Item label={<><EnvironmentOutlined /> 地区</>}>{customer.region || '-'}</Descriptions.Item>
              <Descriptions.Item label="企业规模">{customer.size || '-'}</Descriptions.Item>
              <Descriptions.Item label="来源渠道">{customer.sourceChannel || '-'}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{customer.createdAt}</Descriptions.Item>
              <Descriptions.Item label="最近更新">{customer.updatedAt}</Descriptions.Item>
            </Descriptions>
            <div style={{ marginTop: 12 }}>
              <TagOutlined style={{ marginRight: 8 }} />
              {customer.tags.map((tag) => (
                <Tag key={tag} color="blue">{tag}</Tag>
              ))}
            </div>
          </Card>
        </Col>

        {/* AI推荐面板 */}
        <Col xs={24} lg={8}>
          <Card
            title={<Space><RobotOutlined style={{ color: '#722ed1' }} /><span>AI智能推荐</span></Space>}
            style={{ height: '100%' }}
          >
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              {recommendations.map((rec) => (
                <Card key={rec.id} size="small" style={{ background: '#fafafa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <Tag color="purple">{rec.actionType}</Tag>
                    <Text style={{ color: getConfidenceColor(rec.confidence), fontWeight: 'bold' }}>
                      {rec.confidence}%
                    </Text>
                  </div>
                  <Text style={{ fontSize: 13 }}>{rec.description}</Text>
                  <div style={{ marginTop: 4 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      <BulbOutlined /> {rec.reason}
                    </Text>
                  </div>
                </Card>
              ))}
            </Space>
          </Card>
        </Col>

        {/* 交互历史时间线 */}
        <Col xs={24} lg={12}>
          <Card title="交互历史">
            <Timeline
              items={interactionList.map((item: Interaction) => ({
                children: (
                  <div>
                    <div style={{ marginBottom: 4 }}>
                      <Text strong>
                        {interactionIconMap[item.type]} {interactionTypeMap[item.type]}
                      </Text>
                      <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                        {item.timestamp} · {item.userName}
                      </Text>
                    </div>
                    <Text style={{ fontSize: 13 }}>{item.summary}</Text>
                  </div>
                ),
              }))}
            />
          </Card>
        </Col>

        {/* 关联商机 */}
        <Col xs={24} lg={12}>
          <Card title={`关联商机 (${customerOpportunities.length})`}>
            {customerOpportunities.length > 0 ? (
              <Table
                columns={opportunityColumns}
                dataSource={customerOpportunities}
                rowKey="id"
                pagination={false}
                size="small"
              />
            ) : (
              <Text type="secondary">暂无关联商机</Text>
            )}
          </Card>
        </Col>

        {/* 关联工单 */}
        <Col xs={24}>
          <Card title={`关联工单 (${customerTickets.length})`}>
            {customerTickets.length > 0 ? (
              <Table
                columns={ticketColumns}
                dataSource={customerTickets}
                rowKey="id"
                pagination={false}
                size="small"
              />
            ) : (
              <Text type="secondary">暂无关联工单</Text>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerDetail;
