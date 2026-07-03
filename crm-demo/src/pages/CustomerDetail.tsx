import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, Building2, Mail, Phone, MapPin, Calendar,
  TrendingUp, FileText, Clock, MessageSquare
} from 'lucide-react'
import { customers, interactions } from '../mock/customers'
import { opportunities } from '../mock/sales'
import { tickets } from '../mock/tickets'

const statusColors: Record<string, string> = {
  '活跃': 'bg-green-100 text-green-700',
  '潜在': 'bg-blue-100 text-blue-700',
  '流失风险': 'bg-orange-100 text-orange-700',
  '已流失': 'bg-red-100 text-red-700',
}

const interactionTypeIcons: Record<string, string> = {
  '电话': '📞',
  '邮件': '📧',
  '会议': '🤝',
  '拜访': '🏢',
  '微信': '💬',
}

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>()
  const customer = customers.find(c => c.id === id)

  if (!customer) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">客户不存在</p>
      </div>
    )
  }

  const customerInteractions = interactions.filter(i => i.customerId === customer.id)
  const customerOpportunities = opportunities.filter(o => o.customer === customer.company)
  const customerTickets = tickets.filter(t => t.customer === customer.company)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/customers"
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
          <p className="text-sm text-gray-500">{customer.company}</p>
        </div>
        <span className={`ml-4 inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusColors[customer.status]}`}>
          {customer.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Building2 size={16} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">公司</p>
                <p className="text-sm text-gray-900">{customer.company}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={16} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">邮箱</p>
                <p className="text-sm text-gray-900">{customer.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={16} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">电话</p>
                <p className="text-sm text-gray-900">{customer.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={16} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">地址</p>
                <p className="text-sm text-gray-900">{customer.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar size={16} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">创建日期</p>
                <p className="text-sm text-gray-900">{customer.createdAt}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-1">客户价值</p>
              <p className="text-xl font-bold text-primary-600">¥{customer.value.toLocaleString()}</p>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-1">备注</p>
              <p className="text-sm text-gray-700">{customer.notes}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Interaction Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare size={18} className="text-primary-500" />
              <h2 className="text-lg font-semibold text-gray-900">交互历史</h2>
            </div>
            {customerInteractions.length > 0 ? (
              <div className="relative">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200"></div>
                <div className="space-y-4">
                  {customerInteractions.map((interaction) => (
                    <div key={interaction.id} className="relative flex items-start space-x-4 pl-2">
                      <div className="relative z-10 w-6 h-6 flex items-center justify-center bg-white border-2 border-primary-300 rounded-full text-xs">
                        {interactionTypeIcons[interaction.type]}
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                            {interaction.type}
                          </span>
                          <span className="text-xs text-gray-400">{interaction.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{interaction.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{interaction.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">暂无交互记录</p>
            )}
          </div>

          {/* Related Opportunities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp size={18} className="text-success-500" />
              <h2 className="text-lg font-semibold text-gray-900">关联商机</h2>
            </div>
            {customerOpportunities.length > 0 ? (
              <div className="space-y-3">
                {customerOpportunities.map((opp) => (
                  <div key={opp.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{opp.name}</p>
                      <p className="text-xs text-gray-500">阶段: {opp.stage} · 预计关闭: {opp.expectedClose}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">¥{opp.value.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">概率 {opp.probability}%</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">暂无关联商机</p>
            )}
          </div>

          {/* Related Tickets */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText size={18} className="text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900">服务工单</h2>
            </div>
            {customerTickets.length > 0 ? (
              <div className="space-y-3">
                {customerTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        ticket.priority === '紧急' ? 'bg-red-500' :
                        ticket.priority === '高' ? 'bg-orange-500' :
                        ticket.priority === '中' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{ticket.title}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock size={12} />
                          <span>{ticket.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      ticket.status === '待处理' ? 'bg-yellow-100 text-yellow-700' :
                      ticket.status === '处理中' ? 'bg-blue-100 text-blue-700' :
                      ticket.status === '已解决' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">暂无服务工单</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
