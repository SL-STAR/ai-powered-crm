import { useState } from 'react'
import { Target, Kanban, Filter as FilterIcon, TrendingDown } from 'lucide-react'
import { leads, opportunities } from '../mock/sales'

const leadStatusColors: Record<string, string> = {
  '新建': 'bg-gray-100 text-gray-700',
  '已联系': 'bg-blue-100 text-blue-700',
  '已验证': 'bg-purple-100 text-purple-700',
  '已转化': 'bg-green-100 text-green-700',
  '已丢失': 'bg-red-100 text-red-700',
}

const stageColors: Record<string, string> = {
  '发现': 'border-gray-300 bg-gray-50',
  '验证': 'border-blue-300 bg-blue-50',
  '方案': 'border-purple-300 bg-purple-50',
  '谈判': 'border-yellow-300 bg-yellow-50',
  '赢单': 'border-green-300 bg-green-50',
  '丢单': 'border-red-300 bg-red-50',
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">销售管理</h1>
        <p className="text-sm text-gray-500 mt-1">管理线索、商机和销售管线</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'leads' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Target size={16} />
          <span>线索列表</span>
        </button>
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'pipeline' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Kanban size={16} />
          <span>商机看板</span>
        </button>
        <button
          onClick={() => setActiveTab('funnel')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'funnel' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <TrendingDown size={16} />
          <span>销售漏斗</span>
        </button>
      </div>

      {/* Leads Tab */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">线索列表</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FilterIcon size={16} />
              <span>共 {leads.length} 条线索</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">线索信息</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">来源</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">状态</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">评分</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">负责人</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">创建时间</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.company}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.source}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${leadStatusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              lead.score >= 80 ? 'bg-green-500' :
                              lead.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${lead.score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{lead.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.assignee}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{lead.createdAt}</td>
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
              <div className={`rounded-xl border-2 ${stageColors[stage]} overflow-hidden`}>
                <div className={`${stageHeaderColors[stage]} px-4 py-2 flex items-center justify-between`}>
                  <span className="text-sm font-semibold text-white">{stage}</span>
                  <span className="text-xs text-white bg-white bg-opacity-30 px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>
                <div className="p-3 space-y-3 min-h-[200px]">
                  {items.map((opp) => (
                    <div key={opp.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                      <p className="text-sm font-medium text-gray-900 mb-1">{opp.name}</p>
                      <p className="text-xs text-gray-500 mb-2">{opp.customer}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-primary-600">¥{(opp.value / 10000).toFixed(0)}万</span>
                        <span className="text-xs text-gray-400">{opp.probability}%</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-400">{opp.assignee}</span>
                        <span className="text-xs text-gray-400">{opp.expectedClose}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 bg-white border-t border-gray-100">
                  <p className="text-xs text-gray-500">
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">销售漏斗</h2>
          <div className="max-w-2xl mx-auto space-y-2">
            {funnelData.map((item, index) => {
              const widthPercent = 40 + (60 * (maxCount - index) / maxCount)
              return (
                <div key={item.stage} className="flex items-center justify-center">
                  <div
                    className="relative group cursor-pointer transition-all hover:opacity-90"
                    style={{ width: `${widthPercent}%` }}
                  >
                    <div className={`py-4 rounded-lg text-center text-white font-medium ${
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
                <p className="text-xs text-gray-500">{item.stage}</p>
                <p className="text-lg font-bold text-gray-900">{item.count}</p>
                {index < funnelData.length - 1 && (
                  <p className="text-xs text-gray-400 mt-1">
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
