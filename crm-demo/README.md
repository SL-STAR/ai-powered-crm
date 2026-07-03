# 智能CRM系统 - 前端Demo

基于 React 18 + TypeScript + Vite + TailwindCSS 构建的CRM系统前端演示项目。

## 技术栈

- **React 18** - UI框架
- **TypeScript** - 类型安全
- **Vite 5** - 构建工具
- **TailwindCSS 3** - 样式框架
- **React Router 6** - 路由管理
- **Recharts** - 数据图表
- **Lucide React** - 图标库

## 功能页面

1. **客户管理** - 客户列表、360度视图、新建/编辑表单
2. **销售管理** - 线索列表、商机看板、销售漏斗
3. **营销中心** - 营销活动列表和效果追踪
4. **服务中心** - 工单管理、知识库
5. **数据分析** - KPI仪表盘、收入趋势图、商机分布图
6. **AI助手** - 智能推荐、流失预警、AI对话

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 项目结构

```
crm-demo/
├── src/
│   ├── components/    # 公共组件（布局等）
│   ├── pages/         # 页面组件
│   ├── mock/          # Mock数据
│   ├── App.tsx        # 根组件
│   ├── main.tsx       # 入口文件
│   └── index.css      # 全局样式
├── public/            # 静态资源
├── index.html         # HTML入口
├── tailwind.config.js # TailwindCSS配置
├── vite.config.ts     # Vite配置
└── tsconfig.json      # TypeScript配置
```

## 说明

本项目为纯前端Demo，使用Mock数据，无需后端服务。
