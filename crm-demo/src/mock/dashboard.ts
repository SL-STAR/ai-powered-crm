export interface KPI {
  label: string
  value: string
  change: number
  changeLabel: string
}

export interface MonthlyRevenue {
  month: string
  revenue: number
}

export interface StageDistribution {
  name: string
  value: number
  color: string
}

export const kpis: KPI[] = [
  { label: '总收入', value: '¥8,650,000', change: 12.5, changeLabel: '较上月' },
  { label: '活跃客户数', value: '156', change: 8.3, changeLabel: '较上月' },
  { label: '待处理工单', value: '12', change: -15.0, changeLabel: '较上周' },
  { label: '销售管线总值', value: '¥6,770,000', change: 22.1, changeLabel: '较上月' },
]

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: '2023-07', revenue: 5200000 },
  { month: '2023-08', revenue: 5800000 },
  { month: '2023-09', revenue: 6100000 },
  { month: '2023-10', revenue: 5900000 },
  { month: '2023-11', revenue: 7200000 },
  { month: '2023-12', revenue: 7800000 },
  { month: '2024-01', revenue: 8650000 },
]

export const stageDistribution: StageDistribution[] = [
  { name: '发现', value: 3, color: '#94a3b8' },
  { name: '验证', value: 2, color: '#60a5fa' },
  { name: '方案', value: 2, color: '#a78bfa' },
  { name: '谈判', value: 2, color: '#fbbf24' },
  { name: '赢单', value: 2, color: '#34d399' },
  { name: '丢单', value: 1, color: '#f87171' },
]
