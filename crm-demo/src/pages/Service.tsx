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
  '紧急': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  '高': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  '中': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  '低': 'bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-light',
}

const statusColors: Record<string, string> = {
  '待处理': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  '处理中': 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light',
  '已解决': 'bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-light',
  '已关闭': 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
}

function getSLAStatus(deadline: string): { text: string; color: string; urgent: boolean } {
  const now = new Date('2024-01-20T12:00:00')
  const sla = new Date(deadline)
  const diff = sla.getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (diff < 0) {
    return { text: '已超时', color: 'text-red-600 dark:text-red-400', urgent: true }
  } else if (hours < 2) {
    return { text: `剩余 ${hours}时${minutes}分`, color: 'text-orange-600 dark:text-orange-400', urgent: true }
  } else if (hours < 24) {
    return { text: `剩余 ${hours}小时`, color: 'text-yellow-600 dark:text-yellow-400', urgent: false }
  } else {
    const days = Math.floor(hours / 24)
    return { text: `剩余 ${days}天`, color: 'text-accent dark:text-accent-light', urgent: false }
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
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">服务中心</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-card flex items-center justify-center">
              <Clock size={20} className="text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{openTickets.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">待处理工单</p>
            </div>
          </div>
        </div>
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-card flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{urgentTickets.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">紧急/高优先级</p>
            </div>
          </div>
        </div>
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 dark:bg-accent/20 rounded-card flex items-center justify-center">
              <CheckCircle size={20} className="text-accent dark:text-accent-light" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{tickets.filter(t => t.status === '已解决' || t.status === '已关闭').length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">已解决</p>
            </div>
          </div>
        </div>
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-card flex items-center justify-center">
              <BookOpen size={20} className="text-primary dark:text-primary-light" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{knowledgeArticles.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">知识库文章</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-button p-1 w-fit">
        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-button text-sm font-medium transition-colors ${
            activeTab === 'tickets' ? 'bg-surface dark:bg-surface-dark text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <Clock size={16} />
          <span>工单列表</span>
        </button>
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-button text-sm font-medium transition-colors ${
            activeTab === 'knowledge' ? 'bg-surface dark:bg-surface-dark text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <BookOpen size={16} />
          <span>知识库</span>
        </button>
      </div>

      {/* Tickets Tab */}
      {activeTab === 'tickets' && (
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light dark:border-border-dark">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">优先级</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">工单信息</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">客户</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">状态</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">负责人</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">SLA</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => {
                  const sla = getSLAStatus(ticket.slaDeadline)
                  return (
                    <tr key={ticket.id} className="border-b border-border-light/50 dark:border-border-dark/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${priorityColors[ticket.priority]}`}></div>
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${priorityBadgeColors[ticket.priority]}`}>
                            {ticket.priority}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{ticket.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ticket.category} · {ticket.createdAt}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{ticket.customer}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{ticket.assignee}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          {sla.urgent && <AlertTriangle size={14} className="text-red-500 dark:text-red-400" />}
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
            <div key={article.id} className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-5 hover:shadow-md dark:hover:border-gray-600 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded-full">
                  {article.category}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{article.updatedAt}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">{article.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{article.summary}</p>
              <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
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
