import { TrendingUp, TrendingDown, DollarSign, Users, FileText, BarChart3 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { kpis, monthlyRevenue, stageDistribution } from '../mock/dashboard'

const kpiIcons = [DollarSign, Users, FileText, BarChart3]
const kpiColors = [
  'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light',
  'bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-light',
  'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
]

export default function Analytics() {
  const formattedRevenue = monthlyRevenue.map(d => ({
    ...d,
    month: d.month.replace('2023-', '').replace('2024-', '') + '月',
    revenue: d.revenue / 10000
  }))

  return (
    <div className="space-y-6">
      {/* Page header */}
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">数据分析</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpiIcons[index]
          return (
            <div key={kpi.label} className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-card flex items-center justify-center ${kpiColors[index]}`}>
                  <Icon size={20} />
                </div>
                <div className={`flex items-center space-x-1 text-xs font-medium ${
                  kpi.change >= 0 ? 'text-accent dark:text-accent-light' : 'text-red-600 dark:text-red-400'
                }`}>
                  {kpi.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span>{kpi.change >= 0 ? '+' : ''}{kpi.change}%</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{kpi.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{kpi.label} · {kpi.changeLabel}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">月度收入趋势</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid, #edebe9)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} stroke="#9ca3af" tickFormatter={(v) => `${v}万`} />
                <Tooltip
                  formatter={(value: number) => [`¥${value}万`, '收入']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #edebe9', backgroundColor: 'var(--tooltip-bg, #ffffff)' }}
                  labelStyle={{ color: '#6b7280' }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0078D4"
                  strokeWidth={3}
                  dot={{ fill: '#0078D4', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, fill: '#0078D4' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stage Distribution */}
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">商机阶段分布</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {stageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [`${value} 个`, name]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #edebe9' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-xs text-gray-600 dark:text-gray-400">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary rounded-card p-6 text-white">
          <h3 className="text-sm font-medium opacity-80 mb-1">本月赢单</h3>
          <p className="text-3xl font-bold">2 笔</p>
          <p className="text-sm opacity-80 mt-2">总价值 ¥127万</p>
        </div>
        <div className="bg-accent rounded-card p-6 text-white">
          <h3 className="text-sm font-medium opacity-80 mb-1">客户满意度</h3>
          <p className="text-3xl font-bold">4.6 / 5</p>
          <p className="text-sm opacity-80 mt-2">基于56份调查</p>
        </div>
        <div className="bg-purple-600 rounded-card p-6 text-white">
          <h3 className="text-sm font-medium opacity-80 mb-1">平均成交周期</h3>
          <p className="text-3xl font-bold">45 天</p>
          <p className="text-sm opacity-80 mt-2">较上月缩短3天</p>
        </div>
      </div>
    </div>
  )
}
