export interface Customer {
  id: string
  name: string
  company: string
  industry: string
  email: string
  phone: string
  status: '活跃' | '潜在' | '流失风险' | '已流失'
  value: number
  lastContact: string
  createdAt: string
  address: string
  notes: string
}

export interface Interaction {
  id: string
  customerId: string
  type: '电话' | '邮件' | '会议' | '拜访' | '微信'
  content: string
  date: string
  user: string
}

export const customers: Customer[] = [
  {
    id: 'C001',
    name: '张伟',
    company: '北京科技有限公司',
    industry: '信息技术',
    email: 'zhangwei@bjtech.com',
    phone: '138-0001-0001',
    status: '活跃',
    value: 580000,
    lastContact: '2024-01-15',
    createdAt: '2023-03-10',
    address: '北京市海淀区中关村大街1号',
    notes: '大客户，年度合同即将续签'
  },
  {
    id: 'C002',
    name: '李娜',
    company: '上海金融集团',
    industry: '金融服务',
    email: 'lina@shfinance.com',
    phone: '139-0002-0002',
    status: '活跃',
    value: 1200000,
    lastContact: '2024-01-18',
    createdAt: '2022-08-15',
    address: '上海市浦东新区陆家嘴金融中心',
    notes: 'VIP客户，对新产品有强烈兴趣'
  },
  {
    id: 'C003',
    name: '王强',
    company: '广州制造集团',
    industry: '制造业',
    email: 'wangqiang@gzmfg.com',
    phone: '136-0003-0003',
    status: '潜在',
    value: 350000,
    lastContact: '2024-01-10',
    createdAt: '2023-11-20',
    address: '广州市天河区珠江新城',
    notes: '正在评估我们的解决方案'
  },
  {
    id: 'C004',
    name: '赵敏',
    company: '深圳创新科技',
    industry: '信息技术',
    email: 'zhaomin@szinno.com',
    phone: '137-0004-0004',
    status: '活跃',
    value: 890000,
    lastContact: '2024-01-20',
    createdAt: '2022-05-08',
    address: '深圳市南山区科技园',
    notes: '正在进行二期项目'
  },
  {
    id: 'C005',
    name: '陈静',
    company: '杭州电商平台',
    industry: '电子商务',
    email: 'chenjing@hzecom.com',
    phone: '135-0005-0005',
    status: '流失风险',
    value: 420000,
    lastContact: '2023-12-05',
    createdAt: '2023-01-15',
    address: '杭州市西湖区文三路',
    notes: '最近响应率下降，需要关注'
  },
  {
    id: 'C006',
    name: '刘洋',
    company: '成都医疗科技',
    industry: '医疗健康',
    email: 'liuyang@cdmed.com',
    phone: '138-0006-0006',
    status: '活跃',
    value: 670000,
    lastContact: '2024-01-12',
    createdAt: '2023-06-22',
    address: '成都市高新区天府大道',
    notes: '有扩展合作的意向'
  },
  {
    id: 'C007',
    name: '孙磊',
    company: '南京教育集团',
    industry: '教育培训',
    email: 'sunlei@njedu.com',
    phone: '139-0007-0007',
    status: '潜在',
    value: 280000,
    lastContact: '2024-01-08',
    createdAt: '2023-12-01',
    address: '南京市鼓楼区汉中路',
    notes: '初次接触，对产品感兴趣'
  },
  {
    id: 'C008',
    name: '周芳',
    company: '武汉物流有限公司',
    industry: '物流运输',
    email: 'zhoufang@whlog.com',
    phone: '136-0008-0008',
    status: '已流失',
    value: 150000,
    lastContact: '2023-09-20',
    createdAt: '2022-11-10',
    address: '武汉市江汉区建设大道',
    notes: '已转向竞争对手'
  },
  {
    id: 'C009',
    name: '吴刚',
    company: '天津能源集团',
    industry: '能源',
    email: 'wugang@tjenergy.com',
    phone: '137-0009-0009',
    status: '活跃',
    value: 950000,
    lastContact: '2024-01-16',
    createdAt: '2022-03-05',
    address: '天津市滨海新区',
    notes: '长期合作伙伴，满意度高'
  },
  {
    id: 'C010',
    name: '郑丽',
    company: '重庆地产开发',
    industry: '房地产',
    email: 'zhengli@cqre.com',
    phone: '135-0010-0010',
    status: '流失风险',
    value: 520000,
    lastContact: '2023-11-28',
    createdAt: '2023-04-18',
    address: '重庆市渝中区解放碑',
    notes: '合同即将到期，尚未确认续签'
  },
  {
    id: 'C011',
    name: '黄磊',
    company: '西安航空科技',
    industry: '航空航天',
    email: 'huanglei@xaaero.com',
    phone: '138-0011-0011',
    status: '活跃',
    value: 1500000,
    lastContact: '2024-01-19',
    createdAt: '2021-09-12',
    address: '西安市高新区',
    notes: '战略级客户，持续深化合作'
  },
  {
    id: 'C012',
    name: '林小红',
    company: '厦门旅游集团',
    industry: '旅游服务',
    email: 'linxh@xmtravel.com',
    phone: '139-0012-0012',
    status: '潜在',
    value: 200000,
    lastContact: '2024-01-05',
    createdAt: '2024-01-02',
    address: '厦门市思明区环岛路',
    notes: '新客户，正在进行需求调研'
  }
]

export const interactions: Interaction[] = [
  { id: 'I001', customerId: 'C001', type: '电话', content: '讨论年度合同续签事宜，客户表示满意当前服务', date: '2024-01-15', user: '销售经理-李明' },
  { id: 'I002', customerId: 'C001', type: '邮件', content: '发送新产品介绍资料', date: '2024-01-10', user: '销售经理-李明' },
  { id: 'I003', customerId: 'C001', type: '会议', content: '季度业务回顾会议', date: '2023-12-20', user: '客户成功-王芳' },
  { id: 'I004', customerId: 'C002', type: '拜访', content: '现场演示新功能，客户反馈积极', date: '2024-01-18', user: '销售总监-张强' },
  { id: 'I005', customerId: 'C002', type: '微信', content: '跟进上次方案讨论结果', date: '2024-01-12', user: '销售总监-张强' },
  { id: 'I006', customerId: 'C003', type: '电话', content: '初次需求沟通，了解客户痛点', date: '2024-01-10', user: '销售代表-赵婷' },
  { id: 'I007', customerId: 'C004', type: '会议', content: '二期项目需求确认会', date: '2024-01-20', user: '项目经理-陈明' },
  { id: 'I008', customerId: 'C005', type: '电话', content: '尝试联系客户讨论续约，未接听', date: '2023-12-05', user: '客户成功-王芳' },
  { id: 'I009', customerId: 'C009', type: '拜访', content: '年度总结会议，双方对合作非常满意', date: '2024-01-16', user: '销售总监-张强' },
  { id: 'I010', customerId: 'C011', type: '会议', content: '战略合作深化讨论', date: '2024-01-19', user: '总经理-刘总' },
]
