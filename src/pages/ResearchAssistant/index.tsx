import React, { useState } from 'react'
import { Card, Input, Button, List, Avatar, Space, Tabs, Upload, Tag, Row, Col, Typography } from 'antd'
import { 
  SendOutlined, 
  RobotOutlined, 
  UserOutlined,
  FileTextOutlined,
  UploadOutlined,
  BulbOutlined,
  SearchOutlined,
  BookOutlined,
  MessageOutlined
} from '@ant-design/icons'

const { TextArea } = Input
const { TabPane } = Tabs
const { Title, Paragraph } = Typography

const ResearchAssistant: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'assistant',
      content: '您好！我是您的科研助手，可以帮您解答技术问题、分析文献、生成实验方案等。请问有什么可以帮助您的吗？',
      timestamp: '2024-03-20 09:00:00'
    }
  ])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleString()
    }

    setMessages([...messages, newMessage])
    setInputValue('')

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date().toLocaleString()
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const generateAIResponse = (question: string): string => {
    if (question.includes('配方') || question.includes('叶组')) {
      return '关于配方设计，我建议您考虑以下几个方面：\n\n1. **原料选择**：根据目标风格选择合适的烟叶产区和等级\n2. **配比优化**：使用遗传算法进行配比寻优\n3. **成本控制**：在满足质量要求的前提下控制成本\n4. **感官评价**：定期进行感官评吸验证\n\n您具体想了解哪个方面呢？'
    } else if (question.includes('质量') || question.includes('检测')) {
      return '质量管理是产品开发的关键环节。建议您：\n\n1. **建立标准**：制定详细的质量标准和检测流程\n2. **过程控制**：在生产过程中实时监控关键参数\n3. **数据分析**：利用统计分析方法识别质量趋势\n4. **持续改进**：基于检测结果不断优化工艺\n\n需要我帮您分析具体的质量问题吗？'
    } else if (question.includes('工艺') || question.includes('参数')) {
      return '工艺参数优化需要综合考虑多个因素：\n\n1. **参数范围**：确定各工艺参数的可调范围\n2. **响应面分析**：使用DOE方法优化参数组合\n3. **质量映射**：建立工艺参数与产品质量的关联模型\n4. **稳定性验证**：验证优化后参数的稳定性\n\n您想优化哪个工艺环节的参数？'
    } else {
      return '感谢您的问题。基于我的知识库，我为您提供以下建议：\n\n这是一个很有价值的研究方向。建议您：\n1. 查阅相关的最新文献\n2. 分析现有技术的优缺点\n3. 设计对比实验验证假设\n4. 考虑实际应用的可行性\n\n如果您需要更具体的建议，请提供更多背景信息。'
    }
  }

  const knowledgeBase = [
    {
      title: '烟草配方设计指南',
      description: '详细介绍烟草配方设计的原理、方法和最佳实践',
      tags: ['配方设计', '烟草工艺'],
      updateTime: '2024-03-15'
    },
    {
      title: '质量控制标准手册',
      description: '包含各类产品的质量标准和检测方法',
      tags: ['质量控制', '检测标准'],
      updateTime: '2024-03-10'
    },
    {
      title: '工艺参数优化案例',
      description: '收录了多个成功的工艺参数优化案例',
      tags: ['工艺优化', '案例分析'],
      updateTime: '2024-03-08'
    }
  ]

  const recentDocuments = [
    {
      title: '新型低焦油产品开发报告',
      type: 'PDF',
      size: '2.3MB',
      updateTime: '2024-03-20'
    },
    {
      title: '香精配方优化实验记录',
      type: 'DOCX',
      size: '1.8MB',
      updateTime: '2024-03-19'
    },
    {
      title: '质量检测数据分析',
      type: 'XLSX',
      size: '856KB',
      updateTime: '2024-03-18'
    }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">科研助手</h1>
        <p className="page-description">
          AI驱动的智能科研助手，提供技术问答、文献分析、实验方案生成等服务
        </p>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="智能问答" extra={<RobotOutlined />}>
            <div style={{ height: 400, overflowY: 'auto', marginBottom: 16, padding: '0 8px' }}>
              <List
                dataSource={messages}
                renderItem={(message: any) => (
                  <List.Item style={{ border: 'none', padding: '8px 0' }}>
                    <List.Item.Meta
                      avatar={
                        <Avatar 
                          icon={message.type === 'user' ? <UserOutlined /> : <RobotOutlined />}
                          style={{ 
                            backgroundColor: message.type === 'user' ? '#1890ff' : '#52c41a' 
                          }}
                        />
                      }
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{message.type === 'user' ? '您' : 'AI助手'}</span>
                          <span style={{ fontSize: 12, color: '#999' }}>{message.timestamp}</span>
                        </div>
                      }
                      description={
                        <div style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>
                          {message.content}
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
            
            <Space.Compact style={{ width: '100%' }}>
              <TextArea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="请输入您的问题..."
                autoSize={{ minRows: 2, maxRows: 4 }}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button 
                type="primary" 
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                style={{ height: 'auto' }}
              >
                发送
              </Button>
            </Space.Compact>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Tabs defaultActiveKey="knowledge">
            <TabPane tab="知识库" key="knowledge" icon={<BookOutlined />}>
              <List
                dataSource={knowledgeBase}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={<a>{item.title}</a>}
                      description={
                        <div>
                          <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 8 }}>
                            {item.description}
                          </Paragraph>
                          <Space wrap>
                            {item.tags.map(tag => (
                              <Tag key={tag} size="small">{tag}</Tag>
                            ))}
                          </Space>
                          <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                            更新时间: {item.updateTime}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </TabPane>

            <TabPane tab="文档管理" key="documents" icon={<FileTextOutlined />}>
              <Upload.Dragger
                name="files"
                multiple
                beforeUpload={() => false}
                style={{ marginBottom: 16 }}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">上传文档到知识库</p>
                <p className="ant-upload-hint">
                  支持PDF、Word、Excel等格式
                </p>
              </Upload.Dragger>

              <Title level={5}>最近文档</Title>
              <List
                dataSource={recentDocuments}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<FileTextOutlined />}
                      title={<a>{item.title}</a>}
                      description={
                        <div>
                          <Space>
                            <Tag>{item.type}</Tag>
                            <span>{item.size}</span>
                          </Space>
                          <div style={{ fontSize: 12, color: '#999' }}>
                            {item.updateTime}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </TabPane>

            <TabPane tab="快捷功能" key="shortcuts" icon={<BulbOutlined />}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button block icon={<SearchOutlined />}>
                  文献检索
                </Button>
                <Button block icon={<FileTextOutlined />}>
                  实验方案生成
                </Button>
                <Button block icon={<MessageOutlined />}>
                  会议纪要整理
                </Button>
                <Button block icon={<BulbOutlined />}>
                  创新建议
                </Button>
              </Space>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  )
}

export default ResearchAssistant
