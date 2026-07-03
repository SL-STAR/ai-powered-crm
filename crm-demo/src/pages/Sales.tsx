import { useState } from 'react'
import { Target, Kanban, TrendingDown, Filter as FilterIcon } from 'lucide-react'
import { leads, opportunities } from '../mock/sales'

const leadStatusColors: Record<string, string> = {
  '新建': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  '已联系': 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light',
  '已验证': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  '已转化': 'bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-light',
  '已丢失': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const stageHeaderColors: Record<string, string> = {
  '发现': 'bg-gray-500',
  '验证': 'bg-blue-500',
  '方案': 'bg-purple-500',
  '谈判': 'bg-yellow-500',
  '赢单': 'bg-green-500',
  '丢单': 'bg-red-500',
}

type TabType = 'leads' | 'pipeline' | 'funnel'

export default function Sales() {
  const [activeTab, setActiveTab] = useState<TabType>('leads')

  const stages = ['发现', '验证', '方案', '谈判', '赢单', '丢单'] as const
  const opportunitiesByStage = stages.map(stage => ({
    stage,
    items: opportunities.filter(o => o.stage === stage)
  }))

  // Funnel data
  const funnelData = stages.slice(0, 5).map(stage => {
    const stageOpps = opportunities.filter(o => o.stage === stage)
    return {
      stage,
      count: stageOpps.length,
      value: stageOpps.reduce((sum, o) => sum + o.value, 0)
    }
  })

  const maxCount = Math.max(...funnelData.map(d => d.count), 1)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">销售管理</h1>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-button p-1 w-fit">
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-button text-sm font-medium transition-colors ${
            activeTab === 'leads' ? 'bg-surface dark:bg-surface-dark text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <Target size={16} />
          <span>线索列表</span>
        </button>
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-button text-sm font-medium transition-colors ${
            activeTab === 'pipeline' ? 'bg-surface dark:bg-surface-dark text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <Kanban size={16} />
          <span>商机看板</span>
        </button>
        <button
          onClick={() => setActiveTab('funnel')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-button text-sm font-medium transition-colors ${
            activeTab === 'funnel' ? 'bg-surface dark:bg-surface-dark text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <TrendingDown size={16} />
          <span>销售漏斗</span>
        </button>
      </div>

      {/* Leads Tab */}
      {activeTab === 'leads' && (
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark overflow-hidden">
          <div className="p-4 border-b border-border-light dark:border-border-dark flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">线索列表</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <FilterIcon size={14} />
              <span>共 {leads.length} 条线索</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light dark:border-border-dark">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">线索信息</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">来源</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">状态</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">评分</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">负责人</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">创建时间</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border-light/50 dark:border-border-dark/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{lead.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{lead.company}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{lead.source}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${leadStatusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              lead.score >= 80 ? 'bg-accent' :
                              lead.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${lead.score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{lead.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{lead.assignee}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{lead.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pipeline (Kanban) Tab */}
      {activeTab === 'pipeline' && (
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {opportunitiesByStage.map(({ stage, items }) => (
            <div key={stage} className="flex-shrink-0 w-72">
              <div className="rounded-card border border-border-light dark:border-border-dark bg-background dark:bg-background-dark overflow-hidden">
                <div className={`${stageHeaderColors[stage]} px-4 py-2.5 flex items-center justify-between`}>
                  <span className="text-sm font-semibold text-white">{stage}</span>
                  <span className="text-xs text-white/80 bg-white/20 px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>
                <div className="p-3 space-y-3 min-h-[200px]">
                  {items.map((opp) => (
                    <div key={opp.id} className="bg-surface dark:bg-surface-dark rounded-card p-3 border border-border-light dark:border-border-dark hover:shadow-md dark:hover:border-gray-600 transition-all cursor-pointer">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">{opp.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{opp.customer}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-primary dark:text-primary-light">¥{(opp.value / 10000).toFixed(0)}万</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">{opp.probability}%</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-400 dark:text-gray-500">{opp.assignee}</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">{opp.expectedClose}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-border-light dark:border-border-dark">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    总值: ¥{(items.reduce((s, o) => s + o.value, 0) / 10000).toFixed(0)}万
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Funnel Tab */}
      {activeTab === 'funnel' && (
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-8">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">销售漏斗</h2>
          <div className="max-w-2xl mx-auto space-y-2">
            {funnelData.map((item, index) => {
              const widthPercent = 40 + (60 * (maxCount - index) / maxCount)
              return (
                <div key={item.stage} className="flex items-center justify-center">
                  <div
                    className="relative group cursor-pointer transition-all hover:opacity-90"
                    style={{ width: `${widthPercent}%` }}
                  >
                    <div className={`py-4 rounded-card text-center text-white font-medium ${
                      index === 0 ? 'bg-gray-500' :
                      index === 1 ? 'bg-blue-500' :
                      index === 2 ? 'bg-purple-500' :
                      index === 3 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}>
                      <p className="text-sm font-semibold">{item.stage}</p>
                      <p className="text-xs opacity-90">{item.count} 个商机 · ¥{(item.value / 10000).toFixed(0)}万</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-8 grid grid-cols-5 gap-4 text-center">
            {funnelData.map((item, index) => (
              <div key={item.stage}>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.stage}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.count}</p>
                {index < funnelData.length - 1 && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    转化率: {funnelData[index + 1].count > 0 ? Math.round((funnelData[index + 1].count / Math.max(item.count, 1)) * 100) : 0}%
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
