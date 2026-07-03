// 客户相关类型
export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  industry?: string;
  region?: string;
  sourceChannel?: string;
  tags: string[];
  size?: '小型' | '中型' | '大型' | '集团';
  createdAt: string;
  updatedAt: string;
  status: '活跃' | '潜在' | '流失风险' | '已流失';
}

export interface Interaction {
  id: string;
  customerId: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  summary: string;
  timestamp: string;
  userId: string;
  userName: string;
}

// 销售相关类型
export type LeadStatus = '新建' | '已联系' | '已验证' | '已转化' | '已丢失';

export interface Lead {
  id: string;
  contactName: string;
  email?: string;
  phone?: string;
  company?: string;
  sourceChannel: string;
  status: LeadStatus;
  assignedTo?: string;
  assignedToName?: string;
  isStale: boolean;
  lastActivityAt: string;
  createdAt: string;
  score?: number;
}

export type OpportunityStage = '发现' | '验证' | '方案' | '谈判' | '赢单' | '丢单';

export interface Opportunity {
  id: string;
  name: string;
  amount: number;
  expectedCloseDate: string;
  ownerId: string;
  ownerName: string;
  customerId: string;
  customerName: string;
  stage: OpportunityStage;
  isOverdue: boolean;
  winProbability?: number;
  createdAt: string;
  updatedAt: string;
}

// 工单相关类型
export type TicketPriority = '紧急' | '高' | '中' | '低';
export type TicketStatus = '待处理' | '处理中' | '等待客户回复' | '已解决' | '已关闭';
export type TicketChannel = '电话' | '邮件' | '网页表单' | '在线聊天';

export interface Ticket {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  channel: TicketChannel;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo?: string;
  assignedToName?: string;
  category?: string;
  createdAt: string;
  resolvedAt?: string;
}

// AI相关类型
export interface AIRecommendation {
  id: string;
  actionType: '致电' | '发送邮件' | '安排会议' | '发送资料' | '创建跟进任务';
  description: string;
  confidence: number;
  reason: string;
}

export interface ChatMessage {
  id: string;
  role: 'customer' | 'bot' | 'agent';
  content: string;
  confidence?: number;
  timestamp: string;
}

// 仪表盘相关类型
export interface KPIData {
  title: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  trend?: number;
  icon: string;
  color: string;
}

export interface ActivityItem {
  id: string;
  type: 'deal' | 'customer' | 'ticket' | 'lead';
  description: string;
  time: string;
  user: string;
}
