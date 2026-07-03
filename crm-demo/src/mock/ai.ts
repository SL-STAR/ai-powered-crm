export interface AIRecommendation {
  id: string
  type: '跟进' | '升级' | '挽留' | '交叉销售' | '优化'
  title: string
  description: string
  confidence: number
  relatedCustomer: string
  priority: '高' | '中' | '低'
  action: string
}

export interface ChurnRisk {
  id: string
  customer: string
  company: string
  riskScore: number
  reasons: string[]
  lastActivity: string
  suggestedAction: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export const aiRecommendations: AIRecommendation[] = [
  {
    id: 'R001',
    type: '跟进',
    title: '立即联系北京科技续约',
    description: '合同将在30天内到期，客户满意度高，续约概率85%。建议尽快安排续约沟通。',
    confidence: 0.85,
    relatedCustomer: '北京科技有限公司',
    priority: '高',
    action: '安排续约会议'
  },
  {
    id: 'R002',
    type: '挽留',
    title: '关注杭州电商流失风险',
    description: '客户最近30天活跃度下降60%，上次联系后无回复。建议发送关怀邮件并安排回访。',
    confidence: 0.78,
    relatedCustomer: '杭州电商平台',
    priority: '高',
    action: '发送关怀邮件'
  },
  {
    id: 'R003',
    type: '交叉销售',
    title: '向上海金融推荐数据分析模块',
    description: '基于客户使用行为分析，该客户对数据分析功能有强烈需求，推荐升级高级分析模块。',
    confidence: 0.72,
    relatedCustomer: '上海金融集团',
    priority: '中',
    action: '发送产品介绍'
  },
  {
    id: 'R004',
    type: '升级',
    title: '深圳创新二期项目推动',
    description: '客户一期项目满意度高（NPS 9分），二期需求已明确，建议加速推进签约。',
    confidence: 0.88,
    relatedCustomer: '深圳创新科技',
    priority: '高',
    action: '准备二期方案'
  },
  {
    id: 'R005',
    type: '优化',
    title: '优化天津能源服务响应',
    description: '该客户最近3个工单平均响应时间超过SLA标准，建议调配更多支持资源。',
    confidence: 0.65,
    relatedCustomer: '天津能源集团',
    priority: '中',
    action: '调整服务资源'
  },
  {
    id: 'R006',
    type: '跟进',
    title: '推进西安航空战略合作',
    description: '作为战略级客户，当前合作深度可进一步拓展。建议安排高层会面讨论年度合作计划。',
    confidence: 0.70,
    relatedCustomer: '西安航空科技',
    priority: '中',
    action: '安排高层拜访'
  }
]

export const churnRisks: ChurnRisk[] = [
  {
    id: 'CR001',
    customer: '陈静',
    company: '杭州电商平台',
    riskScore: 82,
    reasons: ['登录频率下降70%', '最近工单未跟进', '联系人变更未更新'],
    lastActivity: '2023-12-05',
    suggestedAction: '安排客户成功经理紧急回访'
  },
  {
    id: 'CR002',
    customer: '郑丽',
    company: '重庆地产开发',
    riskScore: 68,
    reasons: ['合同即将到期', '近期无续签意向表达', '竞对接触迹象'],
    lastActivity: '2023-11-28',
    suggestedAction: '提供续约优惠方案'
  },
  {
    id: 'CR003',
    customer: '王强',
    company: '广州制造集团',
    riskScore: 45,
    reasons: ['评估期过长', '决策人变更', '预算可能缩减'],
    lastActivity: '2024-01-10',
    suggestedAction: '重新确认需求和决策链'
  },
  {
    id: 'CR004',
    customer: '孙磊',
    company: '南京教育集团',
    riskScore: 35,
    reasons: ['竞品方案对比中', '价格敏感度高'],
    lastActivity: '2024-01-08',
    suggestedAction: '提供差异化价值说明'
  }
]

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'M001',
    role: 'assistant',
    content: '您好！我是AI智能助手，可以帮助您分析客户数据、提供销售建议、解答产品问题。请问有什么可以帮到您？',
    timestamp: '2024-01-20 09:00'
  }
]

export const chatResponses: Record<string, string> = {
  '客户': '根据分析，您当前有156个活跃客户。其中2个客户存在流失风险，建议优先关注杭州电商平台和重庆地产开发。需要我为您生成详细的客户健康报告吗？',
  '销售': '本月销售管线总值为¥6,770,000，较上月增长22.1%。当前有2个商机处于谈判阶段，总价值¥1,530,000，建议重点推进。需要查看详细的商机分析吗？',
  '工单': '目前有4个待处理工单，其中2个为紧急优先级。建议优先处理"系统登录异常"和"数据同步延迟"两个工单，它们的SLA即将到期。',
  '报告': '我可以为您生成以下报告：\n1. 客户健康度报告\n2. 销售漏斗分析报告\n3. 服务质量月报\n4. AI洞察周报\n\n请告诉我您需要哪个报告？',
  '预测': '基于历史数据和当前趋势，我预测下个月收入约为¥9,200,000（+6.4%）。主要增长动力来自天津能源和北京科技的合同续签。',
  'default': '感谢您的提问。我正在分析相关数据，请稍等。基于当前CRM数据，我建议您关注以下几点：\n1. 跟进即将到期的合同\n2. 关注流失风险客户\n3. 推进谈判阶段的商机\n\n需要我详细说明哪个方面吗？'
}
