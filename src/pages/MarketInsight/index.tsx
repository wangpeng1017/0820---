import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Upload, Progress, Table, Tag, Space, Row, Col, Statistic, Modal, Form, Input, Select, Radio, Checkbox, Rate, Divider } from 'antd'
import {
  UploadOutlined,
  SoundOutlined,
  BarChartOutlined,
  FileTextOutlined,
  UserOutlined,
  ShoppingOutlined,
  TrophyOutlined,
  FormOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  SendOutlined,
  DownloadOutlined,
  CopyOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'sales': 'sales',
  'competitor': 'competitor',
  'brand': 'brand',
  'voice': 'voice-analysis',
  'profile': 'consumer-profile',
  'questionnaire': 'questionnaire',
  'report': 'report'
}

const PATH_TAB_MAP: Record<string, string> = {
  'sales': 'sales',
  'competitor': 'competitor',
  'brand': 'brand',
  'voice-analysis': 'voice',
  'consumer-profile': 'profile',
  'questionnaire': 'questionnaire',
  'report': 'report'
}

// 问卷相关接口定义
interface QuestionOption {
  id: string
  text: string
  value: string
}

interface Question {
  id: string
  type: 'single' | 'multiple' | 'scale' | 'text'
  title: string
  description?: string
  required: boolean
  options?: QuestionOption[]
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: string[]
}

interface SurveyTemplate {
  id: string
  name: string
  category: string
  description: string
  targetAudience: string
  estimatedTime: number
  questions: Question[]
  creator: string
  createTime: string
  updateTime: string
  status: 'draft' | 'active' | 'archived'
  responseCount: number
}

const MarketInsight: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // 从 URL 获取当前子路径
  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'sales'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())
  const [surveyModalVisible, setSurveyModalVisible] = useState(false)
  const [surveyModalType, setSurveyModalType] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyTemplate | null>(null)
  const [analysisModalVisible, setAnalysisModalVisible] = useState(false)

  // URL 变化时更新 Tab
  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  // Tab 切换时更新 URL
  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/market-insight/${path}`)
  }

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

  // 消费群体数据
  const consumerProfiles = [
    { id: '1', segment: '都市白领', age: '25-35岁', gender: '男性为主(65%)', income: '8K-15K', preferences: ['低焦油', '口感醇和', '包装时尚'], score: 92 },
    { id: '2', segment: '商务人士', age: '35-45岁', gender: '男性为主(78%)', income: '15K-30K', preferences: ['品质稳定', '品牌知名度', '商务场合适用'], score: 88 },
    { id: '3', segment: '年轻潮流', age: '20-28岁', gender: '性别均衡', income: '5K-10K', preferences: ['创新口味', '个性包装', '社交属性'], score: 85 },
    { id: '4', segment: '成熟消费者', age: '45-55岁', gender: '男性为主(82%)', income: '20K-40K', preferences: ['传统口味', '品牌历史', '稳定品质'], score: 90 },
    { id: '5', segment: '女性消费者', age: '25-40岁', gender: '女性(100%)', income: '6K-18K', preferences: ['轻柔口感', '精美包装', '健康理念'], score: 78 }
  ]

  const consumerColumns = [
    { title: '消费群体', dataIndex: 'segment', key: 'segment' },
    { title: '年龄段', dataIndex: 'age', key: 'age' },
    { title: '收入水平', dataIndex: 'income', key: 'income' },
    {
      title: '偏好特征',
      dataIndex: 'preferences',
      key: 'preferences',
      render: (preferences: string[]) => (
        <Space wrap>
          {preferences.map(pref => <Tag key={pref} color="blue">{pref}</Tag>)}
        </Space>
      )
    },
    {
      title: '匹配度',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => <Progress percent={score} size="small" />
    }
  ]

  // 问卷模板数据
  const surveyTemplates: SurveyTemplate[] = [
    {
      id: 'ST001', name: '消费者偏好调研问卷', category: '消费者研究',
      description: '了解消费者对卷烟产品的偏好和购买行为', targetAudience: '18-65岁吸烟人群',
      estimatedTime: 8, questions: [], creator: '市场部',
      createTime: '2024-03-15', updateTime: '2024-03-20', status: 'active', responseCount: 1256
    },
    {
      id: 'ST002', name: '品牌认知度调查', category: '品牌研究',
      description: '评估品牌在目标市场中的认知度和形象', targetAudience: '目标消费群体',
      estimatedTime: 6, questions: [], creator: '品牌部',
      createTime: '2024-03-18', updateTime: '2024-03-25', status: 'active', responseCount: 892
    },
    {
      id: 'ST003', name: '产品满意度评估', category: '产品研究',
      description: '收集用户对产品各方面的满意度反馈', targetAudience: '现有用户',
      estimatedTime: 10, questions: [], creator: '产品部',
      createTime: '2024-03-20', updateTime: '2024-03-28', status: 'active', responseCount: 567
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

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="产品销售态势" key="sales" icon={<ShoppingOutlined />}>
          <Card title="产品销售态势分析">
            <Row gutter={[16, 16]}>
              <Col span={6}><Statistic title="本月销量" value={125800} suffix="箱" /></Col>
              <Col span={6}><Statistic title="同比增长" value={12.5} suffix="%" valueStyle={{ color: '#3f8600' }} /></Col>
              <Col span={6}><Statistic title="市场份额" value={8.2} suffix="%" /></Col>
              <Col span={6}><Statistic title="渠道覆盖" value={3420} suffix="家" /></Col>
            </Row>
            <div style={{ height: 300, background: '#fafafa', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#999' }}>销售趋势图表区域</span>
            </div>
          </Card>
        </TabPane>

        <TabPane tab="竞品分析" key="competitor" icon={<TrophyOutlined />}>
          <Card title="竞品分析管理">
            <Table
              columns={[
                { title: '竞品名称', dataIndex: 'name', key: 'name' },
                { title: '价位段', dataIndex: 'price', key: 'price' },
                { title: '市场份额', dataIndex: 'share', key: 'share' },
                { title: '核心卖点', dataIndex: 'features', key: 'features' }
              ]}
              dataSource={[
                { key: '1', name: '竞品A', price: '15-20元', share: '12%', features: '口感醇厚' },
                { key: '2', name: '竞品B', price: '20-25元', share: '8%', features: '低焦油' },
                { key: '3', name: '竞品C', price: '25-30元', share: '6%', features: '高端定位' }
              ]}
              pagination={false}
            />
          </Card>
        </TabPane>

        <TabPane tab="品牌发展" key="brand" icon={<BarChartOutlined />}>
          <Card title="品牌发展管理">
            <Row gutter={[16, 16]}>
              <Col span={8}><Statistic title="品牌知名度" value={78} suffix="%" /></Col>
              <Col span={8}><Statistic title="品牌美誉度" value={85} suffix="%" /></Col>
              <Col span={8}><Statistic title="品牌忠诚度" value={72} suffix="%" /></Col>
            </Row>
          </Card>
        </TabPane>

        <TabPane tab="语音识别分析" key="voice" icon={<SoundOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="语音文件上传">
                <Upload.Dragger name="audio" multiple={false} accept="audio/*" beforeUpload={() => false}>
                  <p className="ant-upload-drag-icon"><UploadOutlined /></p>
                  <p className="ant-upload-text">点击或拖拽音频文件到此区域上传</p>
                  <p className="ant-upload-hint">支持MP3、WAV、M4A格式</p>
                </Upload.Dragger>
                <Button type="primary" icon={<SoundOutlined />} block style={{ marginTop: 16 }}>
                  开始语音识别分析
                </Button>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="识别结果">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div><strong>识别时长：</strong>{voiceAnalysisData.duration}</div>
                  <div>
                    <strong>识别准确率：</strong>
                    <Progress percent={voiceAnalysisData.accuracy} size="small" style={{ width: 200, marginLeft: 8 }} />
                  </div>
                  <div>
                    <strong>关键词提取：</strong>
                    <div style={{ marginTop: 8 }}>
                      {voiceAnalysisData.keyWords.map(word => <Tag key={word} color="blue">{word}</Tag>)}
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="消费群体画像" key="profile" icon={<UserOutlined />}>
          <Card title="消费群体画像列表" extra={<Button type="primary" icon={<PlusOutlined />}>新建画像</Button>}>
            <Table columns={consumerColumns} dataSource={consumerProfiles} rowKey="id" pagination={{ pageSize: 10 }} />
          </Card>
        </TabPane>

        <TabPane tab="调研问卷" key="questionnaire" icon={<FormOutlined />}>
          <Card
            title="问卷模板管理"
            extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setSurveyModalVisible(true)}>创建问卷</Button>}
          >
            <Table
              columns={[
                { title: '问卷名称', dataIndex: 'name', key: 'name', render: (text: string) => <a>{text}</a> },
                { title: '类别', dataIndex: 'category', key: 'category', render: (cat: string) => <Tag color="blue">{cat}</Tag> },
                { title: '目标受众', dataIndex: 'targetAudience', key: 'targetAudience' },
                { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === 'active' ? 'green' : 'orange'}>{s === 'active' ? '活跃' : '草稿'}</Tag> },
                { title: '回收量', dataIndex: 'responseCount', key: 'responseCount' },
                {
                  title: '操作', key: 'action',
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                      <Button type="link" size="small" icon={<BarChartOutlined />}>分析</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={surveyTemplates}
              rowKey="id"
            />
          </Card>
        </TabPane>

        <TabPane tab="洞察报告" key="report" icon={<FileTextOutlined />}>
          <Card title="消费者洞察报告">
            <Table
              columns={[
                { title: '报告名称', dataIndex: 'name', key: 'name' },
                { title: '生成时间', dataIndex: 'time', key: 'time' },
                { title: '状态', dataIndex: 'status', key: 'status' }
              ]}
              dataSource={[
                { key: '1', name: '2024Q1市场洞察报告', time: '2024-03-31', status: '已完成' },
                { key: '2', name: '年轻消费群体分析报告', time: '2024-03-15', status: '已完成' }
              ]}
              pagination={false}
            />
          </Card>
        </TabPane>
      </Tabs>

      <Modal
        title="创建问卷"
        open={surveyModalVisible}
        onCancel={() => setSurveyModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="问卷名称" required><Input placeholder="请输入问卷名称" /></Form.Item>
          <Form.Item label="问卷类别" required>
            <Select placeholder="请选择">
              <Option value="消费者研究">消费者研究</Option>
              <Option value="品牌研究">品牌研究</Option>
              <Option value="产品研究">产品研究</Option>
            </Select>
          </Form.Item>
          <Form.Item label="目标受众"><Input placeholder="请输入目标受众" /></Form.Item>
          <Form.Item label="问卷描述"><TextArea rows={3} /></Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary">创建</Button>
              <Button onClick={() => setSurveyModalVisible(false)}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default MarketInsight
