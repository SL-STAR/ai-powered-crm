// Route configuration - routes are defined in App.tsx using react-router-dom
export const routes = [
  { path: '/dashboard', label: '仪表盘' },
  { path: '/customers', label: '客户管理' },
  { path: '/customers/:id', label: '客户详情' },
  { path: '/sales', label: '销售管理' },
  { path: '/tickets', label: '工单管理' },
];
