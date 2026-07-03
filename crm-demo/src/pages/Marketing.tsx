import { Megaphone, Mail, Users, BarChart3, Calendar, TrendingUp } from 'lucide-react'

const campaigns = [
  {
    id: 1,
    name: '新年大促邮件营销',
    type: '邮件营销',
    status: '进行中',
    reach: 2450,
    openRate: 32.5,
    clickRate: 8.2,
    startDate: '2024-01-15',
    endDate: '2024-02-15'
  },
  {
    id: 2,
    name: '产品发布线上发布会',
    type: '线上活动',
    status: '已完成',
    reach: 890,
    openRate: 68.0,
    clickRate: 15.3,
    startDate: '2024-01-10',
    endDate: '2024-01-10'
  },
  {
    id: 3,
    name: '行业白皮书推广',
    type: '内容营销',
    status: '进行中',
    reach: 1200,
    openRate: 45.2,
    clickRate: 12.8,
    startDate: '2024-01-08',
    endDate: '2024-02-28'
  },
  {
    id: 4,
    name: 'Q1客户回馈计划',
    type: '客户关怀',
    status: '计划中',
    reach: 0,
    openRate: 0,
    clickRate: 0,
    startDate: '2024-02-01',
    endDate: '2024-03-31'
  },
]

const statusColors: Record<string, string> = {
  '进行中': 'bg-green-100 text-green-700',
  '已完成': 'bg-gray-100 text-gray-700',
  '计划中': 'bg-blue-100 text-blue-700',
}

export default function Marketing() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">营销中心</h1>
        <p className="text-sm text-gray-500 mt-1">管理营销活动和追踪效果</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Megaphone size={20} className="text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-xs text-gray-500">营销活动</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4,540</p>
              <p className="text-xs text-gray-500">触达人数</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Mail size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">38.6%</p>
              <p className="text-xs text-gray-500">平均打开率</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">11.4%</p>
              <p className="text-xs text-gray-500">平均点击率</p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">营销活动列表</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">活动名称</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">类型</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">状态</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">触达</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">打开率</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">点击率</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{campaign.type}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[campaign.status]}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{campaign.reach.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${campaign.openRate}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-600">{campaign.openRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${campaign.clickRate * 3}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-600">{campaign.clickRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Calendar size={12} />
                      <span>{campaign.startDate}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
