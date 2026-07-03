import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, Building2, Mail, Phone, MapPin, Calendar,
  TrendingUp, FileText, Clock, MessageSquare
} from 'lucide-react'
import { customers, interactions } from '../mock/customers'
import { opportunities } from '../mock/sales'
import { tickets } from '../mock/tickets'

const statusColors: Record<string, string> = {
  '活跃': 'bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-light',
  '潜在': 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light',
  '流失风险': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  '已流失': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const interactionTypeIcons: Record<string, string> = {
  '电话': '📞',
  '邮件': '📧',
  '会议': '🤝',
  '拜访': '🏢',
  '微信': '💬',
}

type TabType = 'interactions' | 'opportunities' | 'tickets'

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<TabType>('interactions')
  const customer = customers.find(c => c.id === id)

  if (!customer) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400">客户不存在</p>
      </div>
    )
  }

  const customerInteractions = interactions.filter(i => i.customerId === customer.id)
  const customerOpportunities = opportunities.filter(o => o.customer === customer.company)
  const customerTickets = tickets.filter(t => t.customer === customer.company)

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/customers"
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-button transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-primary dark:text-primary-light font-semibold text-lg">{customer.name[0]}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{customer.name}</h1>
              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[customer.status]}`}>
                {customer.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{customer.company} · {customer.industry}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">客户价值</p>
            <p className="text-xl font-bold text-primary dark:text-primary-light">¥{customer.value.toLocaleString()}</p>
          </div>
        </div>

        {/* Quick info */}
        <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Mail size={14} className="text-gray-400 dark:text-gray-500" />
            <span>{customer.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Phone size={14} className="text-gray-400 dark:text-gray-500" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin size={14} className="text-gray-400 dark:text-gray-500" />
            <span className="truncate">{customer.address}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar size={14} className="text-gray-400 dark:text-gray-500" />
            <span>创建于 {customer.createdAt}</span>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-button p-1 w-fit">
        <button
          onClick={() => setActiveTab('interactions')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-button text-sm font-medium transition-colors ${
            activeTab === 'interactions' ? 'bg-surface dark:bg-surface-dark text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <MessageSquare size={16} />
          <span>交互历史</span>
        </button>
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-button text-sm font-medium transition-colors ${
            activeTab === 'opportunities' ? 'bg-surface dark:bg-surface-dark text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <TrendingUp size={16} />
          <span>关联商机</span>
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-button text-sm font-medium transition-colors ${
            activeTab === 'tickets' ? 'bg-surface dark:bg-surface-dark text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <FileText size={16} />
          <span>服务工单</span>
        </button>
      </div>

      {/* Interaction Timeline */}
      {activeTab === 'interactions' && (
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-6">
          {customerInteractions.length > 0 ? (
            <div className="relative">
              <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-border-light dark:bg-border-dark"></div>
              <div className="space-y-5">
                {customerInteractions.map((interaction) => (
                  <div key={interaction.id} className="relative flex items-start space-x-4 pl-1">
                    <div className="relative z-10 w-7 h-7 flex items-center justify-center bg-surface dark:bg-surface-dark border-2 border-primary/40 dark:border-primary-light/40 rounded-full text-xs flex-shrink-0">
                      {interactionTypeIcons[interaction.type]}
                    </div>
                    <div className="flex-1 bg-background dark:bg-background-dark rounded-card p-4 border border-border-light dark:border-border-dark">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded-full">
                          {interaction.type}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">{interaction.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{interaction.content}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">{interaction.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">暂无交互记录</p>
          )}
        </div>
      )}

      {/* Opportunities */}
      {activeTab === 'opportunities' && (
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-6">
          {customerOpportunities.length > 0 ? (
            <div className="space-y-3">
              {customerOpportunities.map((opp) => (
                <div key={opp.id} className="flex items-center justify-between p-4 bg-background dark:bg-background-dark rounded-card border border-border-light dark:border-border-dark">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{opp.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">阶段: {opp.stage} · 预计关闭: {opp.expectedClose}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">¥{opp.value.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">概率 {opp.probability}%</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">暂无关联商机</p>
          )}
        </div>
      )}

      {/* Tickets */}
      {activeTab === 'tickets' && (
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-6">
          {customerTickets.length > 0 ? (
            <div className="space-y-3">
              {customerTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-4 bg-background dark:bg-background-dark rounded-card border border-border-light dark:border-border-dark">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      ticket.priority === '紧急' ? 'bg-red-500' :
                      ticket.priority === '高' ? 'bg-orange-500' :
                      ticket.priority === '中' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{ticket.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        <Clock size={12} />
                        <span>{ticket.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    ticket.status === '待处理' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    ticket.status === '处理中' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light' :
                    ticket.status === '已解决' ? 'bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-light' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">暂无服务工单</p>
          )}
        </div>
      )}
    </div>
  )
}
