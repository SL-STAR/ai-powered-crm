import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Plus, Eye, Edit, Building2, Mail, Phone } from 'lucide-react'
import { customers } from '../mock/customers'

const statusColors: Record<string, string> = {
  '活跃': 'bg-green-100 text-green-700',
  '潜在': 'bg-blue-100 text-blue-700',
  '流失风险': 'bg-orange-100 text-orange-700',
  '已流失': 'bg-red-100 text-red-700',
}

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('全部')
  const [showForm, setShowForm] = useState(false)

  const filteredCustomers = customers.filter(c => {
    const matchSearch = c.name.includes(searchTerm) || c.company.includes(searchTerm) || c.industry.includes(searchTerm)
    const matchStatus = statusFilter === '全部' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">客户管理</h1>
          <p className="text-sm text-gray-500 mt-1">管理和跟踪所有客户信息</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus size={18} />
          <span>新建客户</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索客户名称、公司、行业..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="全部">全部状态</option>
              <option value="活跃">活跃</option>
              <option value="潜在">潜在</option>
              <option value="流失风险">流失风险</option>
              <option value="已流失">已流失</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">客户信息</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">行业</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">状态</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">客户价值</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">最近联系</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-700 font-medium text-sm">{customer.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Building2 size={12} />
                          <span>{customer.company}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.industry}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[customer.status]}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ¥{customer.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{customer.lastContact}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/customers/${customer.id}`}
                        className="p-1.5 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                        title="查看详情"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        className="p-1.5 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                        title="编辑"
                      >
                        <Edit size={16} />
                      </button>
                      <a
                        href={`mailto:${customer.email}`}
                        className="p-1.5 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                        title="发邮件"
                      >
                        <Mail size={16} />
                      </a>
                      <a
                        href={`tel:${customer.phone}`}
                        className="p-1.5 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                        title="拨打电话"
                      >
                        <Phone size={16} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500">共 {filteredCustomers.length} 条记录</p>
        </div>
      </div>

      {/* New Customer Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">新建客户</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">客户姓名</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="请输入姓名" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">公司名称</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="请输入公司名" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">行业</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>信息技术</option>
                    <option>金融服务</option>
                    <option>制造业</option>
                    <option>医疗健康</option>
                    <option>教育培训</option>
                    <option>电子商务</option>
                    <option>其他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">客户状态</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>潜在</option>
                    <option>活跃</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="请输入邮箱" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
                <input type="tel" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="请输入电话" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="请输入地址" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
                <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" rows={3} placeholder="请输入备注信息"></textarea>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-white bg-primary-500 rounded-lg hover:bg-primary-600"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
