import { useState } from 'react'
import {
  Bot, Lightbulb, AlertTriangle, MessageCircle,
  ArrowRight, Send, Sparkles
} from 'lucide-react'
import { aiRecommendations, churnRisks, initialChatMessages, chatResponses } from '../mock/ai'
import type { ChatMessage } from '../mock/ai'

const typeColors: Record<string, string> = {
  '跟进': 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light',
  '升级': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  '挽留': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  '交叉销售': 'bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-light',
  '优化': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
}

const priorityStyles: Record<string, string> = {
  '高': 'border-l-red-500',
  '中': 'border-l-yellow-500',
  '低': 'border-l-green-500',
}

function getRiskColor(score: number): string {
  if (score >= 70) return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
  if (score >= 50) return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
  return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
}

function getRiskBarColor(score: number): string {
  if (score >= 70) return 'bg-red-500'
  if (score >= 50) return 'bg-orange-500'
  return 'bg-yellow-500'
}

type TabType = 'recommendations' | 'churn' | 'chat'

export default function AIAssistant() {
  const [activeTab, setActiveTab] = useState<TabType>('recommendations')
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages)
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: `M${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleString('zh-CN')
    }

    setMessages(prev => [...prev, userMessage])

    const matchedKey = Object.keys(chatResponses).find(key =>
      key !== 'default' && inputValue.includes(key)
    )
    const responseContent = matchedKey ? chatResponses[matchedKey] : chatResponses['default']

    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `M${Date.now() + 1}`,
        role: 'assistant',
        content: responseContent,
        timestamp: new Date().toLocaleString('zh-CN')
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 800)

    setInputValue('')
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-card flex items-center justify-center">
          <Bot size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI 智能助手</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">基于AI的智能推荐、风险预警和对话助手</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-button p-1 w-fit">
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-button text-sm font-medium transition-colors ${
            activeTab === 'recommendations' ? 'bg-surface dark:bg-surface-dark text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <Lightbulb size={16} />
          <span>智能推荐</span>
        </button>
        <button
          onClick={() => setActiveTab('churn')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-button text-sm font-medium transition-colors ${
            activeTab === 'churn' ? 'bg-surface dark:bg-surface-dark text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <AlertTriangle size={16} />
          <span>流失预警</span>
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-button text-sm font-medium transition-colors ${
            activeTab === 'chat' ? 'bg-surface dark:bg-surface-dark text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <MessageCircle size={16} />
          <span>AI对话</span>
        </button>
      </div>

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiRecommendations.map((rec) => (
            <div
              key={rec.id}
              className={`bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark border-l-4 ${priorityStyles[rec.priority]} p-5 hover:shadow-md dark:hover:border-gray-600 transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[rec.type]}`}>
                  {rec.type}
                </span>
                <div className="flex items-center space-x-1">
                  <Sparkles size={14} className="text-yellow-500" />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    置信度: {Math.round(rec.confidence * 100)}%
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">{rec.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{rec.description}</p>
              <div className="flex items-center justify-between pt-3 border-t border-border-light dark:border-border-dark">
                <span className="text-xs text-gray-400 dark:text-gray-500">关联: {rec.relatedCustomer}</span>
                <button className="flex items-center space-x-1 text-xs font-medium text-primary dark:text-primary-light hover:underline">
                  <span>{rec.action}</span>
                  <ArrowRight size={12} />
                </button>
              </div>
              {/* Confidence bar */}
              <div className="mt-3">
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-light to-primary rounded-full"
                    style={{ width: `${rec.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Churn Risk Tab */}
      {activeTab === 'churn' && (
        <div className="space-y-4">
          {churnRisks.map((risk) => (
            <div key={risk.id} className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{risk.customer}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{risk.company}</p>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-card ${getRiskColor(risk.riskScore)}`}>
                  <AlertTriangle size={14} />
                  <span className="text-sm font-bold">{risk.riskScore}%</span>
                </div>
              </div>

              {/* Risk Score Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>风险评分</span>
                  <span>{risk.riskScore}/100</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getRiskBarColor(risk.riskScore)}`}
                    style={{ width: `${risk.riskScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Risk Reasons */}
              <div className="mb-3">
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">风险因素:</p>
                <div className="flex flex-wrap gap-2">
                  {risk.reasons.map((reason, idx) => (
                    <span key={idx} className="text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">
                      {reason}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-light dark:border-border-dark">
                <span className="text-xs text-gray-400 dark:text-gray-500">最近活动: {risk.lastActivity}</span>
                <button className="flex items-center space-x-1 text-xs font-medium text-primary dark:text-primary-light hover:underline">
                  <span>{risk.suggestedAction}</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className="bg-surface dark:bg-surface-dark rounded-card border border-border-light dark:border-border-dark flex flex-col h-[calc(100vh-280px)]">
          {/* Chat header */}
          <div className="px-6 py-3 border-b border-border-light dark:border-border-dark flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">AI助手</p>
              <p className="text-xs text-accent dark:text-accent-light">在线</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-xl rounded-tr-xl rounded-br-xl'
                } px-4 py-3`}>
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-white/60' : 'text-gray-400 dark:text-gray-500'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-6 py-4 border-t border-border-light dark:border-border-dark">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="输入问题，例如：客户情况如何？销售数据怎样？"
                className="flex-1 px-4 py-2.5 border border-border-light dark:border-border-dark rounded-button text-sm bg-background dark:bg-background-dark text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                onClick={handleSendMessage}
                className="p-2.5 bg-primary text-white rounded-button hover:bg-primary-600 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs text-gray-400 dark:text-gray-500">快捷提问:</span>
              {['客户', '销售', '工单', '预测'].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInputValue(q); }}
                  className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
