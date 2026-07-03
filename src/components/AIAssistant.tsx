import { useState, useRef, useEffect } from 'react';
import { Card, Input, Button, Typography, Tag, Space, Badge } from 'antd';
import {
  RobotOutlined,
  SendOutlined,
  CloseOutlined,
  MessageOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { chatHistory, chatSummary, defaultMessages } from '../mock/chat';
import type { ChatMessage } from '../types';

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

const AIAssistant = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(defaultMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const responses: Record<string, string> = {
        '报表': '我们的报表系统提供丰富的数据可视化能力：\n\n• **预置仪表盘** - 销售业绩、营销效果等4个维度\n• **自定义报表** - 拖拽式创建，支持10个筛选条件\n• **定时发送** - 每日/每周/每月自动邮件发送\n\n需要我详细介绍哪个功能呢？',
        '价格': '关于定价方案，我们提供三个版本：\n\n• **标准版** - 适合小团队，基础CRM功能\n• **专业版** - AI增强功能，适合中型企业\n• **企业版** - 全功能，支持私有化部署\n\n建议您预约演示，我们的顾问会为您推荐最适合的方案。需要我帮您安排吗？',
        '功能': '我们的AI智能CRM系统核心功能包括：\n\n1. **客户360度视图** - 全面了解客户\n2. **智能销售管理** - AI驱动的商机推荐\n3. **营销自动化** - 工作流引擎\n4. **智能客服** - AI客服+人工协同\n5. **数据分析** - 实时仪表盘和报表\n\n每个模块都融入了AI能力，有什么具体想了解的吗？',
      };

      let botContent = '感谢您的问题！让我为您查找相关信息...\n\n根据我们的知识库，';
      for (const [keyword, response] of Object.entries(responses)) {
        if (userMessage.includes(keyword)) {
          botContent = response;
          break;
        }
      }
      if (botContent.startsWith('感谢')) {
        botContent += '这个问题我需要进一步了解您的具体需求。您方便告诉我：\n1. 您的团队规模？\n2. 主要使用场景？\n3. 是否有特殊集成需求？\n\n或者我可以为您转接人工客服提供更专业的解答。';
      }

      const newMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'bot',
        content: botContent,
        confidence: Math.floor(Math.random() * 15) + 82,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'customer',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    simulateBotResponse(inputValue);
    setInputValue('');
  };

  const loadHistory = () => {
    setMessages(chatHistory);
    setShowSummary(false);
  };

  return (
    <>
      {/* 浮动气泡 */}
      {!visible && (
        <div
          onClick={() => setVisible(true)}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #722ed1, #1890ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(114, 46, 209, 0.4)',
            zIndex: 1000,
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Badge count={1} size="small">
            <MessageOutlined style={{ fontSize: 24, color: '#fff' }} />
          </Badge>
        </div>
      )}

      {/* 聊天面板 */}
      {visible && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 400,
            height: 560,
            zIndex: 1000,
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            background: '#fff',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #722ed1, #1890ff)',
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Space>
              <RobotOutlined style={{ fontSize: 20, color: '#fff' }} />
              <Text strong style={{ color: '#fff', fontSize: 15 }}>AI智能助手</Text>
              <Badge status="success" />
            </Space>
            <Space>
              <Button
                type="text"
                size="small"
                icon={<FileTextOutlined style={{ color: '#fff' }} />}
                onClick={() => setShowSummary(!showSummary)}
                title="对话摘要"
              />
              <Button
                type="text"
                size="small"
                onClick={loadHistory}
                style={{ color: '#fff', fontSize: 12 }}
              >
                历史
              </Button>
              <Button
                type="text"
                size="small"
                icon={<CloseOutlined style={{ color: '#fff' }} />}
                onClick={() => setVisible(false)}
              />
            </Space>
          </div>

          {/* Summary Panel */}
          {showSummary && (
            <div style={{ padding: 12, background: '#f6f0ff', borderBottom: '1px solid #d9d9d9' }}>
              <Text strong style={{ fontSize: 12, color: '#722ed1' }}>📋 对话摘要</Text>
              <div style={{ marginTop: 4 }}>
                <Text style={{ fontSize: 12 }}>
                  <strong>核心问题：</strong>{chatSummary.coreIssue}
                </Text>
              </div>
              <div style={{ marginTop: 2 }}>
                <Text style={{ fontSize: 12 }}>
                  <strong>已解决：</strong>{chatSummary.attemptedSolutions.join('、')}
                </Text>
              </div>
              <div style={{ marginTop: 2 }}>
                <Text style={{ fontSize: 12 }}>
                  <strong>当前状态：</strong>{chatSummary.currentStatus}
                </Text>
              </div>
            </div>
          )}

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.role === 'customer' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '8px 12px',
                    borderRadius: msg.role === 'customer' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: msg.role === 'customer' ? '#1890ff' : '#f5f5f5',
                    color: msg.role === 'customer' ? '#fff' : '#333',
                  }}
                >
                  <Paragraph
                    style={{
                      margin: 0,
                      fontSize: 13,
                      color: msg.role === 'customer' ? '#fff' : '#333',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {msg.content}
                  </Paragraph>
                </div>
                {msg.role === 'bot' && msg.confidence && (
                  <Tag color="purple" style={{ marginTop: 2, fontSize: 10 }}>
                    置信度: {msg.confidence}%
                  </Tag>
                )}
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ padding: '8px 12px', background: '#f5f5f5', borderRadius: 12 }}>
                  <Text type="secondary" style={{ fontSize: 13 }}>AI正在输入...</Text>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '8px 12px', borderTop: '1px solid #f0f0f0', background: '#fafafa' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <TextArea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="输入您的问题..."
                autoSize={{ minRows: 1, maxRows: 3 }}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                style={{ flex: 1 }}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSend}
                disabled={!inputValue.trim()}
                style={{ alignSelf: 'flex-end' }}
              />
            </div>
            <Text type="secondary" style={{ fontSize: 11, marginTop: 4, display: 'block' }}>
              按 Enter 发送，Shift+Enter 换行
            </Text>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
