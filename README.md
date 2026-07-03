# AI赋能CRM系统

一个基于AI增强的客户关系管理系统，涵盖客户管理、销售管理、营销自动化、客户服务和智能分析等核心能力。

## 项目结构

```
├── .kiro/specs/          # 规格文档（需求、设计、任务）
│   └── ai-powered-crm/
│       ├── requirements.md   # 需求文档（15个核心需求）
│       ├── design.md         # 技术设计文档
│       └── tasks.md          # 实现任务列表
├── crm-demo/             # 前端UI演示项目（React + TailwindCSS）
├── src/                  # 主项目源码
├── public/               # 静态资源
└── package.json          # 项目配置
```

## 功能模块

| 模块 | 说明 |
|------|------|
| 客户管理 | 客户信息CRUD、360度视图、交互历史、重复检测 |
| 销售管理 | 线索全生命周期、商机看板、销售漏斗、绩效统计 |
| 营销引擎 | 营销活动管理、受众细分、自动化工作流 |
| 服务中心 | 工单管理、SLA监控、知识库 |
| 数据分析 | KPI仪表盘、自定义报表、数据导出 |
| AI智能推荐 | 下一步行动建议、最佳联系时间、每日优先任务 |
| AI预测分析 | 赢单概率、客户流失风险、收入预测 |
| AI自动化 | 线索分类、邮件草稿、重复检测、数据提取 |
| AI智能客服 | 聊天机器人、自动转人工、对话摘要 |
| AI数据洞察 | 异常检测、交叉销售、自然语言查询 |

## 技术栈

- **后端**: Node.js + TypeScript + NestJS
- **AI服务**: Python + FastAPI
- **前端**: React + TypeScript
- **数据库**: PostgreSQL + Elasticsearch + Redis
- **消息队列**: RabbitMQ

## 快速体验Demo

```bash
cd crm-demo
npm install
npm run dev
```

浏览器访问 `http://localhost:5173` 查看前端演示。

## 开发指南

详细的需求、设计和任务文档位于 `.kiro/specs/ai-powered-crm/` 目录：

- `requirements.md` — 15个核心需求，含详细验收标准
- `design.md` — 系统架构、数据模型、API接口、正确性属性
- `tasks.md` — 60+实现任务，按依赖关系组织

## License

Private
