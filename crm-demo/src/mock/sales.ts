export interface Lead {
  id: string
  name: string
  company: string
  source: string
  status: '新建' | '已联系' | '已验证' | '已转化' | '已丢失'
  score: number
  assignee: string
  createdAt: string
  email: string
  phone: string
}

export interface Opportunity {
  id: string
  name: string
  customer: string
  stage: '发现' | '验证' | '方案' | '谈判' | '赢单' | '丢单'
  value: number
  probability: number
  expectedClose: string
  assignee: string
  createdAt: string
}

export const leads: Lead[] = [
  {
    id: 'L001',
    name: '马超',
    company: '深圳智能硬件公司',
    source: '官网注册',
    status: '新建',
    score: 65,
    assignee: '销售代表-赵婷',
    createdAt: '2024-01-20',
    email: 'machao@szhw.com',
    phone: '138-1001-1001'
  },
  {
    id: 'L002',
    name: '许文',
    company: '北京云计算科技',
    source: '展会获取',
    status: '已联系',
    score: 78,
    assignee: '销售经理-李明',
    createdAt: '2024-01-15',
    email: 'xuwen@bjcloud.com',
    phone: '139-1002-1002'
  },
  {
    id: 'L003',
    name: '何雪',
    company: '上海数据科技',
    source: '客户推荐',
    status: '已验证',
    score: 88,
    assignee: '销售总监-张强',
    createdAt: '2024-01-08',
    email: 'hexue@shdata.com',
    phone: '136-1003-1003'
  },
  {
    id: 'L004',
    name: '钱进',
    company: '广州零售集团',
    source: '线上广告',
    status: '已转化',
    score: 92,
    assignee: '销售经理-李明',
    createdAt: '2023-12-20',
    email: 'qianjin@gzretail.com',
    phone: '137-1004-1004'
  },
  {
    id: 'L005',
    name: '宋佳',
    company: '杭州文化传媒',
    source: '官网注册',
    status: '已丢失',
    score: 45,
    assignee: '销售代表-赵婷',
    createdAt: '2023-12-10',
    email: 'songjia@hzmedia.com',
    phone: '135-1005-1005'
  },
  {
    id: 'L006',
    name: '徐明',
    company: '成都游戏科技',
    source: '社交媒体',
    status: '新建',
    score: 55,
    assignee: '销售代表-赵婷',
    createdAt: '2024-01-19',
    email: 'xuming@cdgame.com',
    phone: '138-1006-1006'
  },
  {
    id: 'L007',
    name: '田甜',
    company: '武汉生物医药',
    source: '展会获取',
    status: '已联系',
    score: 72,
    assignee: '销售经理-李明',
    createdAt: '2024-01-12',
    email: 'tiantian@whbio.com',
    phone: '139-1007-1007'
  },
  {
    id: 'L008',
    name: '罗杰',
    company: '南京汽车零部件',
    source: '客户推荐',
    status: '已验证',
    score: 82,
    assignee: '销售总监-张强',
    createdAt: '2024-01-05',
    email: 'luojie@njauto.com',
    phone: '136-1008-1008'
  }
]

export const opportunities: Opportunity[] = [
  {
    id: 'O001',
    name: '北京科技ERP升级项目',
    customer: '北京科技有限公司',
    stage: '谈判',
    value: 580000,
    probability: 75,
    expectedClose: '2024-02-28',
    assignee: '销售经理-李明',
    createdAt: '2023-10-15'
  },
  {
    id: 'O002',
    name: '上海金融风控系统',
    customer: '上海金融集团',
    stage: '方案',
    value: 1200000,
    probability: 60,
    expectedClose: '2024-03-15',
    assignee: '销售总监-张强',
    createdAt: '2023-11-20'
  },
  {
    id: 'O003',
    name: '广州制造MES系统',
    customer: '广州制造集团',
    stage: '验证',
    value: 450000,
    probability: 40,
    expectedClose: '2024-04-30',
    assignee: '销售代表-赵婷',
    createdAt: '2023-12-05'
  },
  {
    id: 'O004',
    name: '深圳创新数据平台',
    customer: '深圳创新科技',
    stage: '赢单',
    value: 890000,
    probability: 100,
    expectedClose: '2024-01-10',
    assignee: '销售经理-李明',
    createdAt: '2023-08-20'
  },
  {
    id: 'O005',
    name: '杭州电商推荐引擎',
    customer: '杭州电商平台',
    stage: '丢单',
    value: 320000,
    probability: 0,
    expectedClose: '2024-01-05',
    assignee: '销售代表-赵婷',
    createdAt: '2023-09-10'
  },
  {
    id: 'O006',
    name: '成都医疗HIS系统',
    customer: '成都医疗科技',
    stage: '方案',
    value: 670000,
    probability: 55,
    expectedClose: '2024-03-30',
    assignee: '销售经理-李明',
    createdAt: '2023-11-15'
  },
  {
    id: 'O007',
    name: '天津能源监控平台',
    customer: '天津能源集团',
    stage: '谈判',
    value: 950000,
    probability: 80,
    expectedClose: '2024-02-15',
    assignee: '销售总监-张强',
    createdAt: '2023-09-25'
  },
  {
    id: 'O008',
    name: '西安航空管理系统',
    customer: '西安航空科技',
    stage: '发现',
    value: 1500000,
    probability: 20,
    expectedClose: '2024-06-30',
    assignee: '销售总监-张强',
    createdAt: '2024-01-10'
  },
  {
    id: 'O009',
    name: '南京教育在线平台',
    customer: '南京教育集团',
    stage: '验证',
    value: 280000,
    probability: 35,
    expectedClose: '2024-05-15',
    assignee: '销售代表-赵婷',
    createdAt: '2023-12-20'
  },
  {
    id: 'O010',
    name: '重庆地产CRM项目',
    customer: '重庆地产开发',
    stage: '发现',
    value: 520000,
    probability: 25,
    expectedClose: '2024-05-30',
    assignee: '销售经理-李明',
    createdAt: '2024-01-05'
  },
  {
    id: 'O011',
    name: '厦门旅游预订系统',
    customer: '厦门旅游集团',
    stage: '发现',
    value: 200000,
    probability: 15,
    expectedClose: '2024-07-30',
    assignee: '销售代表-赵婷',
    createdAt: '2024-01-15'
  },
  {
    id: 'O012',
    name: '广州零售数字化项目',
    customer: '广州零售集团',
    stage: '赢单',
    value: 380000,
    probability: 100,
    expectedClose: '2024-01-20',
    assignee: '销售经理-李明',
    createdAt: '2023-07-15'
  }
]
