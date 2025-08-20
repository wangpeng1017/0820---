import React, { useState } from 'react'
import { Card, Tabs, Button, Upload, Progress, Table, Tag, Space, Row, Col, Statistic } from 'antd'
import { 
  UploadOutlined, 
  SoundOutlined, 
  BarChartOutlined,
  FileTextOutlined,
  UserOutlined,
  ShoppingOutlined,
  TrophyOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs

const MarketInsight: React.FC = () => {
  const [activeTab, setActiveTab] = useState('voice-analysis')

  // 模拟语音识别数据
  const voiceAnalysisData = {
    duration: '45:32',
    accuracy: 96,
    keyWords: ['低焦油', '口感顺滑', '价格适中', '包装精美', '年轻消费者'],
    insights: [
      { type: '品类', content: '低焦油卷烟', confidence: 95 },
      { type: '价位', content: '中高端（15-25元）', confidence: 88 },
      { type: '目标人群', content: '25-35岁白领', confidence: 92 },
      { type: '痛点', content: '现有产品焦油含量偏高', confidence: 90 }
    ]
  }

  // 模拟消费群体数据
  const consumerProfiles = [
    {
      id: '1',
      segment: '都市白领',
      age: '25-35岁',
      gender: '男性为主(65%)',
      income: '8K-15K',
      preferences: ['低焦油', '口感醇和', '包装时尚'],
      score: 92
    },
    {
      id: '2',
      segment: '商务人士',
      age: '35-45岁',
      gender: '男性为主(78%)',
      income: '15K-30K',
      preferences: ['品质稳定', '品牌知名度', '商务场合适用'],
      score: 88
    },
    {
      id: '3',
      segment: '年轻潮流',
      age: '20-28岁',
      gender: '性别均衡',
      income: '5K-10K',
      preferences: ['创新口味', '个性包装', '社交属性'],
      score: 85
    }
  ]

  const consumerColumns = [
    {
      title: '消费群体',
      dataIndex: 'segment',
      key: 'segment'
    },
    {
      title: '年龄段',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '收入水平',
      dataIndex: 'income',
      key: 'income'
    },
    {
      title: '偏好特征',
      dataIndex: 'preferences',
      key: 'preferences',
      render: (preferences: string[]) => (
        <Space wrap>
          {preferences.map(pref => (
            <Tag key={pref} color="blue">{pref}</Tag>
          ))}
        </Space>
      )
    },
    {
      title: '匹配度',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => (
        <Progress percent={score} size="small" />
      )
    }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">市场洞察</h1>
        <p className="page-description">
          通过AI技术分析消费者需求，生成市场洞察报告和消费群体画像
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="语音识别分析" key="voice-analysis" icon={<SoundOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="语音文件上传">
                <Upload.Dragger
                  name="audio"
                  multiple={false}
                  accept="audio/*"
                  beforeUpload={() => false}
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">点击或拖拽音频文件到此区域上传</p>
                  <p className="ant-upload-hint">
                    支持MP3、WAV、M4A格式，文件大小不超过100MB，时长不超过60分钟
                  </p>
                </Upload.Dragger>
                
                <div style={{ marginTop: 16 }}>
                  <Button type="primary" icon={<SoundOutlined />} block>
                    开始语音识别分析
                  </Button>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="识别结果">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <strong>识别时长：</strong>{voiceAnalysisData.duration}
                  </div>
                  <div>
                    <strong>识别准确率：</strong>
                    <Progress 
                      percent={voiceAnalysisData.accuracy} 
                      size="small" 
                      style={{ width: 200, marginLeft: 8 }}
                    />
                  </div>
                  <div>
                    <strong>关键词：</strong>
                    <div style={{ marginTop: 8 }}>
                      <Space wrap>
                        {voiceAnalysisData.keyWords.map(word => (
                          <Tag key={word} color="geekblue">{word}</Tag>
                        ))}
                      </Space>
                    </div>
                  </div>
                </Space>
              </Card>

              <Card title="需求要素提取" style={{ marginTop: 16 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  {voiceAnalysisData.insights.map((insight, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: index < voiceAnalysisData.insights.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }}>
                      <div>
                        <Tag color="orange">{insight.type}</Tag>
                        <span>{insight.content}</span>
                      </div>
                      <div>
                        <span style={{ color: '#52c41a' }}>置信度: {insight.confidence}%</span>
                      </div>
                    </div>
                  ))}
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="消费群体分析" key="consumer-analysis" icon={<UserOutlined />}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="目标群体数量"
                  value={3}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="平均匹配度"
                  value={88.3}
                  suffix="%"
                  prefix={<TrophyOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="市场潜力"
                  value={156}
                  suffix="万人"
                  prefix={<ShoppingOutlined />}
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Col>
          </Row>

          <Card title="智能推荐消费群体画像" extra={
            <Button type="primary" icon={<BarChartOutlined />}>
              重新分析
            </Button>
          }>
            <Table
              columns={consumerColumns}
              dataSource={consumerProfiles}
              pagination={false}
              rowKey="id"
            />
          </Card>
        </TabPane>

        <TabPane tab="调研问卷生成" key="survey-generation" icon={<FileTextOutlined />}>
          <Card title="智能问卷生成器">
            <p>基于消费群体画像，自动生成结构化调研问卷...</p>
            <Button type="primary" disabled>
              功能开发中
            </Button>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default MarketInsight
