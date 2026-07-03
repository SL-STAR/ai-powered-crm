import { ActivityItem } from '../types';

export const kpiData = {
  totalRevenue: { value: 4280000, trend: 12.5 },
  activeCustomers: { value: 156, trend: 8.3 },
  pendingTickets: { value: 23, trend: -5.2 },
  pipelineValue: { value: 8230000, trend: 15.7 },
};

export const salesFunnelData = [
  { stage: '发现', count: 4, amount: 2925000 },
  { stage: '验证', count: 3, amount: 1360000 },
  { stage: '方案', count: 3, amount: 2400000 },
  { stage: '谈判', count: 2, amount: 1030000 },
  { stage: '赢单', count: 1, amount: 420000 },
  { stage: '丢单', count: 1, amount: 680000 },
];

export const recentActivities: ActivityItem[] = [
  {
    id: 'a001',
    type: 'deal',
    description: '商机「星辰科技CRM系统采购」推进到谈判阶段',
    time: '10分钟前',
    user: '张销售',
  },
  {
    id: 'a002',
    type: 'customer',
    description: '新客户「邓梦瑶 - 生命科学实验室」已录入系统',
    time: '30分钟前',
    user: '张销售',
  },
  {
    id: 'a003',
    type: 'ticket',
    description: '工单 TK-2024031501 优先级提升为「高」',
    time: '1小时前',
    user: '赵客服',
  },
  {
    id: 'a004',
    type: 'deal',
    description: '商机「云数据分析平台」标记为赢单，金额 ¥420,000',
    time: '2小时前',
    user: '李经理',
  },
  {
    id: 'a005',
    type: 'lead',
    description: '线索「杨思琪 - 潮流品牌」已分配给王顾问',
    time: '3小时前',
    user: '系统',
  },
  {
    id: 'a006',
    type: 'customer',
    description: '客户「孙晓燕」流失风险评分上升至 78 分',
    time: '4小时前',
    user: 'AI引擎',
  },
  {
    id: 'a007',
    type: 'ticket',
    description: '工单 TK-2024031301 已解决，客户满意度 4.5/5',
    time: '5小时前',
    user: '钱客服',
  },
  {
    id: 'a008',
    type: 'deal',
    description: '商机「龙腾制造MES集成项目」已标记为逾期',
    time: '6小时前',
    user: '系统',
  },
];

export const monthlyRevenueData = [
  { month: '2023-10', revenue: 3200000 },
  { month: '2023-11', revenue: 3500000 },
  { month: '2023-12', revenue: 3800000 },
  { month: '2024-01', revenue: 3600000 },
  { month: '2024-02', revenue: 4000000 },
  { month: '2024-03', revenue: 4280000 },
];
