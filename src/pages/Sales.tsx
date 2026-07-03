import { useState } from 'react';
import { Tabs, Table, Tag, Card, Typography, Space, Progress, Badge, Row, Col } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { leads, opportunities } from '../mock/sales';
import type { Opportunity, OpportunityStage } from '../types';

const { Title, Text } = Typography;

const Sales = () => {
  const [activeTab, setActiveTab] = useState('leads');

  const leadStatusColorMap: Record<string, string> = {
    '新建': 'blue',
    '已联系': 'cyan',
    '已验证': 'green',
    '已转化': 'success',
    '已丢失': 'default',
  };

  const leadColumns = [
    { title: '联系人', dataIndex: 'contactName', key: 'contactName' },
    { title: '公司', dataIndex: 'company', key: 'company' },
    { title: '来源', dataIndex: 'sourceChannel', key: 'sourceChannel' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={leadStatusColorMap[status]}>{status}</Tag>,
    },
    {
      title: '评分',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => (
        <Progress
          percent={score}
          size="small"
          style={{ width: 80 }}
          strokeColor={score >= 80 ? '#52c41a' : score >= 60 ? '#1890ff' : '#faad14'}
        />
      ),
    },
    {
      title: '负责人',
      dataIndex: 'assignedToName',
      key: 'assignedToName',
    },
    {
      title: '停滞',
      dataIndex: 'isStale',
      key: 'isStale',
      render: (stale: boolean) => stale ? <Badge status="error" text="停滞" /> : <Badge status="success" text="正常" />,
    },
    { title: '最后活动', dataIndex: 'lastActivityAt', key: 'lastActivityAt' },
  ];

  // Kanban Board
  const stages: OpportunityStage[] = ['发现', '验证', '方案', '谈判', '赢单', '丢单'];
  const stageColorMap: Record<string, string> = {
    '发现': '#1890ff',
    '验证': '#13c2c2',
    '方案': '#722ed1',
    '谈判': '#fa8c16',
    '赢单': '#52c41a',
    '丢单': '#f5222d',
  };

  const getOpportunitiesByStage = (stage: OpportunityStage) =>
    opportunities.filter((o) => o.stage === stage);

  // Funnel Data
  const funnelData = stages
    .filter((s) => s !== '赢单' && s !== '丢单')
    .map((stage) => {
      const stageOpps = getOpportunitiesByStage(stage);
      return {
        stage,
        count: stageOpps.length,
        amount: stageOpps.reduce((sum, o) => sum + o.amount, 0),
      };
    });

  const funnelChartData = funnelData.map((item, index) => ({
    ...item,
    fill: ['#1890ff', '#13c2c2', '#722ed1', '#fa8c16'][index],
  }));

  const tabItems = [
    {
      key: 'leads',
      label: '线索管理',
      children: (
        <Card>
          <Table
            columns={leadColumns}
            dataSource={leads}
            rowKey="id"
            pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条线索` }}
          />
        </Card>
      ),
    },
    {
      key: 'kanban',
      label: '商机看板',
      children: (
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 12, minWidth: 1200 }}>
            {stages.map((stage) => {
              const stageOpps = getOpportunitiesByStage(stage);
              const totalAmount = stageOpps.reduce((sum, o) => sum + o.amount, 0);
              return (
                <div key={stage} style={{ flex: 1, minWidth: 180 }}>
                  <Card
                    size="small"
                    title={
                      <Space>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: stageColorMap[stage] }} />
                        <span>{stage}</span>
                        <Badge count={stageOpps.length} style={{ backgroundColor: stageColorMap[stage] }} />
                      </Space>
                    }
                    style={{ background: '#fafafa', height: '100%' }}
                    styles={{ header: { borderBottom: `2px solid ${stageColorMap[stage]}` } }}
                  >
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
                      总金额: ¥{totalAmount.toLocaleString()}
                    </Text>
                    <Space direction="vertical" style={{ width: '100%' }} size="small">
                      {stageOpps.map((opp: Opportunity) => (
                        <Card
                          key={opp.id}
                          size="small"
                          hoverable
                          style={{ borderLeft: `3px solid ${stageColorMap[stage]}` }}
                        >
                          <div style={{ marginBottom: 4 }}>
                            <Text strong style={{ fontSize: 13 }}>{opp.name}</Text>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              ¥{opp.amount.toLocaleString()}
                            </Text>
                            {opp.winProbability !== undefined && (
                              <Tag color={opp.winProbability >= 70 ? 'green' : opp.winProbability >= 40 ? 'blue' : 'orange'}>
                                {opp.winProbability}%
                              </Tag>
                            )}
                          </div>
                          <div style={{ marginTop: 4 }}>
                            <Text type="secondary" style={{ fontSize: 11 }}>
                              {opp.ownerName} · {opp.customerName}
                            </Text>
                          </div>
                          {opp.isOverdue && (
                            <Tag color="red" style={{ marginTop: 4, fontSize: 11 }}>逾期</Tag>
                          )}
                        </Card>
                      ))}
                      {stageOpps.length === 0 && (
                        <Text type="secondary" style={{ textAlign: 'center', display: 'block', padding: 16 }}>
                          暂无商机
                        </Text>
                      )}
                    </Space>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      key: 'funnel',
      label: '销售漏斗',
      children: (
        <Card>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={14}>
              <Title level={5}>漏斗阶段分布</Title>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={funnelChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
                  <Tooltip formatter={(value: number) => [`¥${value.toLocaleString()}`, '金额']} />
                  <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                    {funnelChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Col>
            <Col xs={24} lg={10}>
              <Title level={5}>阶段统计</Title>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {funnelData.map((item) => (
                  <Card key={item.stage} size="small">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Text strong>{item.stage}</Text>
                        <Text type="secondary" style={{ marginLeft: 8 }}>{item.count} 个商机</Text>
                      </div>
                      <Text strong style={{ color: '#1890ff' }}>¥{item.amount.toLocaleString()}</Text>
                    </div>
                  </Card>
                ))}
                <Card size="small" style={{ background: '#f6ffed', borderColor: '#b7eb8f' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong style={{ color: '#52c41a' }}>赢单</Text>
                    <Text strong style={{ color: '#52c41a' }}>
                      {getOpportunitiesByStage('赢单').length} 个 · ¥{getOpportunitiesByStage('赢单').reduce((s, o) => s + o.amount, 0).toLocaleString()}
                    </Text>
                  </div>
                </Card>
                <Card size="small" style={{ background: '#fff2f0', borderColor: '#ffccc7' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong style={{ color: '#f5222d' }}>丢单</Text>
                    <Text strong style={{ color: '#f5222d' }}>
                      {getOpportunitiesByStage('丢单').length} 个 · ¥{getOpportunitiesByStage('丢单').reduce((s, o) => s + o.amount, 0).toLocaleString()}
                    </Text>
                  </div>
                </Card>
              </Space>
            </Col>
          </Row>
        </Card>
      ),
    },
  ];

  return (
    <div>
      <Title level={4} style={{ marginBottom: 16 }}>销售管理</Title>
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
    </div>
  );
};

export default Sales;
