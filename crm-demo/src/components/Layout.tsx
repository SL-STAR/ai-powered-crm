import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Users,
  TrendingUp,
  Megaphone,
  HeadphonesIcon,
  BarChart3,
  Bot,
  Bell,
  Search,
  Menu,
  User,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const navItems = [
  { path: '/customers', label: '客户管理', icon: Users },
  { path: '/sales', label: '销售管理', icon: TrendingUp },
  { path: '/marketing', label: '营销中心', icon: Megaphone },
  { path: '/service', label: '服务中心', icon: HeadphonesIcon },
  { path: '/analytics', label: '数据分析', icon: BarChart3 },
  { path: '/ai-assistant', label: 'AI助手', icon: Bot },
]

const pageTitles: Record<string, string> = {
  '/customers': '客户管理',
  '/sales': '销售管理',
  '/marketing': '营销中心',
  '/service': '服务中心',
  '/analytics': '数据分析',
  '/ai-assistant': 'AI 智能助手',
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('crm-dark-mode')
    return stored === 'true'
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('crm-dark-mode', String(darkMode))
  }, [darkMode])

  const currentTitle = Object.entries(pageTitles).find(([path]) =>
    location.pathname.startsWith(path)
  )?.[1] || '智能CRM'

  return (
    <div className="flex h-screen bg-background dark:bg-background-dark">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-surface dark:bg-surface-dark border-r border-border-light dark:border-border-dark transition-all duration-200 ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center h-12 px-4 border-b border-border-light dark:border-border-dark">
          <div className="w-8 h-8 bg-primary rounded-card flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">CRM</span>
          </div>
          {!collapsed && (
            <span className="ml-3 text-base font-semibold text-gray-800 dark:text-gray-100 whitespace-nowrap">
              智能CRM
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path === '/customers' && location.pathname.startsWith('/customers'))
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={`flex items-center px-3 py-2.5 rounded-button text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Icon size={20} className={`flex-shrink-0 ${isActive ? 'text-primary dark:text-primary-light' : ''}`} />
                {!collapsed && <span className="ml-3 whitespace-nowrap">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-2 py-3 border-t border-border-light dark:border-border-dark space-y-1">
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? '切换浅色模式' : '切换深色模式'}
            className="flex items-center w-full px-3 py-2.5 rounded-button text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            {darkMode ? <Sun size={20} className="flex-shrink-0" /> : <Moon size={20} className="flex-shrink-0" />}
            {!collapsed && <span className="ml-3 whitespace-nowrap">{darkMode ? '浅色模式' : '深色模式'}</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? '展开侧栏' : '收起侧栏'}
            className="flex items-center w-full px-3 py-2.5 rounded-button text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            {collapsed ? <PanelLeftOpen size={20} className="flex-shrink-0" /> : <PanelLeftClose size={20} className="flex-shrink-0" />}
            {!collapsed && <span className="ml-3 whitespace-nowrap">收起侧栏</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${collapsed ? 'ml-16' : 'ml-60'}`}>
        {/* Top header - 48px */}
        <header className="h-12 bg-surface dark:bg-surface-dark border-b border-border-light dark:border-border-dark flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base font-semibold text-gray-800 dark:text-gray-100">{currentTitle}</h1>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-button transition-colors">
              <Search size={18} />
            </button>
            <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-button transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-button px-2 py-1 transition-colors">
              <div className="w-7 h-7 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                <User size={14} className="text-primary dark:text-primary-light" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">张管理</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
