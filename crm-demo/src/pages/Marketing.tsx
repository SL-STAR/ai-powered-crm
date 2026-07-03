import { Megaphone, Mail, Users, TrendingUp, Calendar } from 'lucide-react'

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
  '进行中': 'bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-light',
  '已完成': 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  '计划中': 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light',
}

const typeColors: Record<string, string> = {
  '邮件营销': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  '线上活动': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  '内容营销': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  '客户关怀': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
}

export default function Marketing() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">营销中心</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-card flex items-center justify-center">
              <Megaphone size={20} className="text-primary dark:text-primary-light" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">4</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">营销活动</p>
            </div>
          </div>
        </div>
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 dark:bg-accent/20 rounded-card flex items-center justify-center">
              <Users size={20} className="text-accent dark:text-accent-light" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">4,540</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">触达人数</p>
            </div>
          </div>
        </div>
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-card flex items-center justify-center">
              <Mail size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">38.6%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">平均打开率</p>
            </div>
          </div>
        </div>
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-card flex items-center justify-center">
              <TrendingUp size={20} className="text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">11.4%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">平均点击率</p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-5 hover:shadow-md dark:hover:border-gray-600 transition-all">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{campaign.name}</h3>
              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[campaign.status]}`}>
                {campaign.status}
              </span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[campaign.type]}`}>
                {campaign.type}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center space-x-1">
                <Calendar size={12} />
                <span>{campaign.startDate}</span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border-light dark:border-border-dark">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">触达</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{campaign.reach.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">打开率</p>
                <div className="flex items-center space-x-1">
                  <div className="w-10 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${campaign.openRate}%` }}></div>
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{campaign.openRate}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">点击率</p>
                <div className="flex items-center space-x-1">
                  <div className="w-10 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${campaign.clickRate * 3}%` }}></div>
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{campaign.clickRate}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
