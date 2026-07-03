import { ChatMessage } from '../types';

export const chatHistory: ChatMessage[] = [
  {
    id: 'msg001',
    role: 'customer',
    content: '你好，我想了解一下你们CRM系统的报表功能',
    timestamp: '2024-03-15 10:00',
  },
  {
    id: 'msg002',
    role: 'bot',
    content: '您好！很高兴为您介绍我们的报表功能。我们的CRM系统提供以下报表能力：\n\n1. **预置仪表盘** - 包含销售业绩、营销效果、服务质量和客户健康度四个维度\n2. **自定义报表** - 支持拖拽式字段选择，最多10个筛选条件\n3. **数据导出** - 支持CSV、Excel和PDF格式\n4. **定时报表** - 支持每日、每周、每月自动发送\n\n请问您最关心哪方面的报表功能呢？',
    confidence: 95,
    timestamp: '2024-03-15 10:00',
  },
  {
    id: 'msg003',
    role: 'customer',
    content: '我主要想看销售漏斗数据，能不能自定义时间范围？',
    timestamp: '2024-03-15 10:01',
  },
  {
    id: 'msg004',
    role: 'bot',
    content: '当然可以！销售漏斗报表支持灵活的时间范围筛选：\n\n- 可以选择**预设时间段**：本周、本月、本季度、本年度\n- 也可以**自定义日期范围**，精确到具体日期\n\n销售漏斗会展示每个阶段（发现→验证→方案→谈判→赢单/丢单）的商机数量和金额合计。此外，还支持按销售人员、团队或客户行业进行分组查看。\n\n需要我为您演示一下如何操作吗？',
    confidence: 92,
    timestamp: '2024-03-15 10:01',
  },
  {
    id: 'msg005',
    role: 'customer',
    content: '好的，另外你们支持数据下钻吗？比如从总数据看到每个销售的明细',
    timestamp: '2024-03-15 10:02',
  },
  {
    id: 'msg006',
    role: 'bot',
    content: '支持的！我们的报表系统提供**最多3层数据下钻**功能：\n\n**第1层** → 总体汇总指标（如总管线价值 ¥8,230,000）\n**第2层** → 按维度分组（如按销售人员、按阶段、按行业）\n**第3层** → 具体记录详情（如单个商机的完整信息）\n\n操作方式：在任何汇总数据上点击即可下钻到下一层级，面包屑导航帮助您随时返回上层。\n\n还有其他想了解的吗？',
    confidence: 88,
    timestamp: '2024-03-15 10:02',
  },
];

export const chatSummary = {
  coreIssue: '客户咨询CRM系统报表功能，重点关注销售漏斗和数据下钻能力',
  attemptedSolutions: ['介绍了报表功能概览', '说明了时间筛选能力', '解释了3层数据下钻机制'],
  currentStatus: '客户对报表功能表示满意，可能进入深度试用阶段',
};

export const defaultMessages: ChatMessage[] = [
  {
    id: 'default-001',
    role: 'bot',
    content: '您好！我是AI智能客服助手，有什么可以帮您的吗？\n\n我可以帮您：\n- 查询产品功能信息\n- 解答使用问题\n- 处理账户相关事务\n- 转接人工客服',
    confidence: 99,
    timestamp: new Date().toISOString(),
  },
];
