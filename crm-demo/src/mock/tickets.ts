export interface Ticket {
  id: string
  title: string
  customer: string
  priority: '紧急' | '高' | '中' | '低'
  status: '待处理' | '处理中' | '已解决' | '已关闭'
  category: string
  assignee: string
  createdAt: string
  slaDeadline: string
  description: string
}

export interface KnowledgeArticle {
  id: string
  title: string
  category: string
  author: string
  views: number
  helpful: number
  updatedAt: string
  summary: string
}

export const tickets: Ticket[] = [
  {
    id: 'T001',
    title: '系统登录异常，无法访问管理后台',
    customer: '北京科技有限公司',
    priority: '紧急',
    status: '处理中',
    category: '技术故障',
    assignee: '技术支持-王磊',
    createdAt: '2024-01-20 09:30',
    slaDeadline: '2024-01-20 13:30',
    description: '客户反馈今早开始无法登录系统，已排查网络问题'
  },
  {
    id: 'T002',
    title: '数据报表导出功能异常',
    customer: '上海金融集团',
    priority: '高',
    status: '待处理',
    category: '功能问题',
    assignee: '技术支持-刘佳',
    createdAt: '2024-01-20 10:15',
    slaDeadline: '2024-01-21 10:15',
    description: '导出Excel时部分数据丢失，影响月度报表制作'
  },
  {
    id: 'T003',
    title: '申请增加用户账号',
    customer: '深圳创新科技',
    priority: '中',
    status: '待处理',
    category: '账户管理',
    assignee: '客服专员-李萍',
    createdAt: '2024-01-19 14:20',
    slaDeadline: '2024-01-22 14:20',
    description: '客户新增5名员工，需要开通系统使用权限'
  },
  {
    id: 'T004',
    title: 'API接口响应超时问题',
    customer: '天津能源集团',
    priority: '高',
    status: '处理中',
    category: '技术故障',
    assignee: '技术支持-王磊',
    createdAt: '2024-01-19 16:45',
    slaDeadline: '2024-01-20 16:45',
    description: '对接系统的API在高峰期响应时间超过10秒'
  },
  {
    id: 'T005',
    title: '咨询产品升级方案',
    customer: '成都医疗科技',
    priority: '低',
    status: '已解决',
    category: '产品咨询',
    assignee: '客服专员-李萍',
    createdAt: '2024-01-18 11:00',
    slaDeadline: '2024-01-23 11:00',
    description: '客户想了解下一版本的新功能和升级计划'
  },
  {
    id: 'T006',
    title: '移动端显示异常',
    customer: '广州制造集团',
    priority: '中',
    status: '已关闭',
    category: '技术故障',
    assignee: '技术支持-刘佳',
    createdAt: '2024-01-17 09:00',
    slaDeadline: '2024-01-20 09:00',
    description: '手机端部分页面布局错乱，已修复上线'
  },
  {
    id: 'T007',
    title: '数据同步延迟问题',
    customer: '西安航空科技',
    priority: '紧急',
    status: '待处理',
    category: '技术故障',
    assignee: '技术支持-王磊',
    createdAt: '2024-01-20 11:00',
    slaDeadline: '2024-01-20 15:00',
    description: '业务数据同步延迟超过2小时，影响正常运营'
  },
  {
    id: 'T008',
    title: '权限配置需求',
    customer: '南京教育集团',
    priority: '低',
    status: '待处理',
    category: '账户管理',
    assignee: '客服专员-李萍',
    createdAt: '2024-01-19 10:30',
    slaDeadline: '2024-01-24 10:30',
    description: '需要为不同部门配置差异化的数据查看权限'
  }
]

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: 'K001',
    title: '系统登录常见问题解决方案',
    category: '技术文档',
    author: '技术支持团队',
    views: 1256,
    helpful: 89,
    updatedAt: '2024-01-15',
    summary: '涵盖密码重置、浏览器兼容性、网络配置等常见登录问题的排查步骤'
  },
  {
    id: 'K002',
    title: '数据报表功能使用指南',
    category: '用户手册',
    author: '产品团队',
    views: 892,
    helpful: 67,
    updatedAt: '2024-01-10',
    summary: '详细介绍报表创建、自定义筛选、数据导出等功能的使用方法'
  },
  {
    id: 'K003',
    title: 'API对接技术文档',
    category: '技术文档',
    author: '开发团队',
    views: 654,
    helpful: 45,
    updatedAt: '2024-01-08',
    summary: '提供完整的API接口说明、认证方式、请求示例和错误码说明'
  },
  {
    id: 'K004',
    title: '用户权限管理最佳实践',
    category: '管理指南',
    author: '客户成功团队',
    views: 478,
    helpful: 34,
    updatedAt: '2024-01-05',
    summary: '介绍角色设计、权限分配策略和安全管理建议'
  },
  {
    id: 'K005',
    title: '移动端使用指南',
    category: '用户手册',
    author: '产品团队',
    views: 723,
    helpful: 56,
    updatedAt: '2023-12-28',
    summary: '移动端功能介绍、操作指南和常见问题解答'
  },
  {
    id: 'K006',
    title: '系统升级公告与变更日志',
    category: '公告通知',
    author: '产品团队',
    views: 1034,
    helpful: 72,
    updatedAt: '2024-01-18',
    summary: '最新版本功能更新、性能优化和已知问题修复说明'
  }
]
