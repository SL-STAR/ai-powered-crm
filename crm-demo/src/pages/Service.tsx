import { useState } from 'react'
import { Clock, AlertTriangle, CheckCircle, BookOpen, ThumbsUp, Eye } from 'lucide-react'
import { tickets, knowledgeArticles } from '../mock/tickets'

const priorityColors: Record<string, string> = {
  '紧急': 'bg-red-500',
  '高': 'bg-orange-500',
  '中': 'bg-yellow-500',
  '低': 'bg-green-500',
}

const priorityBadgeColors: Record<string, string> = {
  '紧急': 'bg-red-100 text-red-700',
  '高': 'bg-orange-100 text-orange-700',
  '中': 'bg-yellow-100 text-yellow-700',
  '低': 'bg-green-100 text-green-700',
}

const statusColors: Record<string, string> = {
  '待处理': 'bg-yellow-100 text-yellow-700',
  '处理中': 'bg-blue-100 text-blue-700',
  '已解决': 'bg-green-100 text-green-700',
  '已关闭': 'bg-gray-100 text-gray-700',
}

function getSLAStatus(deadline: string): { text: string; color: string; urgent: boolean } {
  const now = new Date('2024-01-20T12:00:00')
  const sla = new Date(deadline)
  const diff = sla.getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (diff < 0) {
    return { text: '已超时', color: 'text-red-600', urgent: true }
  } else if (hours < 2) {
    return { text: `剩余 ${hours}时${minutes}分`, color: 'text-orange-600', urgent: true }
  } else if (hours < 24) {
    return { text: `剩余 ${hours}小时`, color: 'text-yellow-600', urgent: false }
  } else {
    const days = Math.floor(hours / 24)
    return { text: `剩余 ${days}天`, color: 'text-green-600', urgent: false }
  }
}

type TabType = 'tickets' | 'knowledge'

export default function Service() {
  const [activeTab, setActiveTab] = useState<TabType>('tickets')

  const openTickets = tickets.filter(t => t.status === '待处理' || t.status === '处理中')
  const urgentTickets = tickets.filter(t => t.priority === '紧急' || t.priority === '高')

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">服务中心</h1>
        <p className="text-sm text-gray-500 mt-1">管理工单和知识库</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{openTickets.length}</p>
              <p className="text-xs text-gray-500">待处理工单</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{urgentTickets.length}</p>
              <p className="text-xs text-gray-500">紧急/高优先级</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{tickets.filter(t => t.status === '已解决' || t.status === '已关闭').length}</p>
              <p className="text-xs text-gray-500">已解决</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{knowledgeArticles.length}</p>
              <p className="text-xs text-gray-500">知识库文章</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'tickets' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Clock size={16} />
          <span>工单列表</span>
        </button>
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'knowledge' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BookOpen size={16} />
          <span>知识库</span>
        </button>
      </div>

      {/* Tickets Tab */}
      {activeTab === 'tickets' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">优先级</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">工单信息</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">客户</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">状态</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">负责人</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tickets.map((ticket) => {
                  const sla = getSLAStatus(ticket.slaDeadline)
                  return (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${priorityColors[ticket.priority]}`}></div>
                          <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${priorityBadgeColors[ticket.priority]}`}>
                            {ticket.priority}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{ticket.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{ticket.category} · {ticket.createdAt}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{ticket.customer}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{ticket.assignee}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          {sla.urgent && <AlertTriangle size={14} className="text-red-500" />}
                          <span className={`text-xs font-medium ${sla.color}`}>{sla.text}</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Knowledge Base Tab */}
      {activeTab === 'knowledge' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {knowledgeArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                  {article.category}
                </span>
                <span className="text-xs text-gray-400">{article.updatedAt}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{article.title}</h3>
              <p className="text-xs text-gray-500 mb-4 line-clamp-2">{article.summary}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>作者: {article.author}</span>
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <Eye size={12} />
                    <span>{article.views}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <ThumbsUp size={12} />
                    <span>{article.helpful}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
