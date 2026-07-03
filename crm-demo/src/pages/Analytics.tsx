import { TrendingUp, TrendingDown, DollarSign, Users, FileText, BarChart3 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { kpis, monthlyRevenue, stageDistribution } from '../mock/dashboard'

const kpiIcons = [DollarSign, Users, FileText, BarChart3]
const kpiColors = ['bg-primary-100 text-primary-600', 'bg-success-100 text-success-600', 'bg-orange-100 text-orange-600', 'bg-purple-100 text-purple-600']

export default function Analytics() {
  const formattedRevenue = monthlyRevenue.map(d => ({
    ...d,
    month: d.month.replace('2023-', '').replace('2024-', '') + '月',
    revenue: d.revenue / 10000
  }))

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">数据分析</h1>
        <p className="text-sm text-gray-500 mt-1">关键业务指标和趋势分析</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpiIcons[index]
          return (
            <div key={kpi.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${kpiColors[index]}`}>
                  <Icon size={20} />
                </div>
                <div className={`flex items-center space-x-1 text-xs font-medium ${
                  kpi.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span>{kpi.change >= 0 ? '+' : ''}{kpi.change}%</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              <p className="text-xs text-gray-500 mt-1">{kpi.label} · {kpi.changeLabel}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">月度收入趋势</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `${v}万`} />
                <Tooltip
                  formatter={(value: number) => [`¥${value}万`, '收入']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stage Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">商机阶段分布</h2>
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
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-xs text-gray-600">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-6 text-white">
          <h3 className="text-sm font-medium opacity-80 mb-1">本月赢单</h3>
          <p className="text-3xl font-bold">2 笔</p>
          <p className="text-sm opacity-80 mt-2">总价值 ¥127万</p>
        </div>
        <div className="bg-gradient-to-br from-success-500 to-success-700 rounded-xl p-6 text-white">
          <h3 className="text-sm font-medium opacity-80 mb-1">客户满意度</h3>
          <p className="text-3xl font-bold">4.6 / 5</p>
          <p className="text-sm opacity-80 mt-2">基于56份调查</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white">
          <h3 className="text-sm font-medium opacity-80 mb-1">平均成交周期</h3>
          <p className="text-3xl font-bold">45 天</p>
          <p className="text-sm opacity-80 mt-2">较上月缩短3天</p>
        </div>
      </div>
    </div>
  )
}
