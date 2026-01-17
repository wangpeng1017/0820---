import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Upload, Progress, Table, Tag, Space, Row, Col, Statistic, Modal, Form, Input, Select } from 'antd'
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
  EyeOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactECharts from 'echarts-for-react'

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

const MarketInsight: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'sales'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())
  const [surveyModalVisible, setSurveyModalVisible] = useState(false)

  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/market-insight/${path}`)
  }

  // 销售趋势图表配置
  const salesTrendOption = {
    title: {
      text: '产品销售趋势分析',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['销量', '销售额', '同比增长率'],
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: [
      {
        type: 'value',
        name: '销量(箱)',
        position: 'left',
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: '销售额(万元)',
        position: 'right',
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: '销量',
        type: 'line',
        data: [12580, 13200, 14500, 13800, 15200, 16800, 17500, 18200, 17800, 19500, 20200, 21500],
        smooth: true,
        itemStyle: { color: '#5470c6' }
      },
      {
        name: '销售额',
        type: 'line',
        yAxisIndex: 1,
        data: [2516, 2640, 2900, 2760, 3040, 3360, 3500, 3640, 3560, 3900, 4040, 4300],
        smooth: true,
        itemStyle: { color: '#91cc75' }
      },
      {
        name: '同比增长率',
        type: 'bar',
        data: [8.5, 10.2, 12.5, 9.8, 15.2, 18.5, 16.8, 14.2, 11.5, 13.8, 15.5, 17.2],
        itemStyle: { color: '#fac858' }
      }
    ]
  }

  // 竞品对比数据
  const competitorData = [
    { key: '1', name: '竞品A-中华', price: '50-60元', share: '15.2%', features: '高端定位、口感醇厚', trend: '上升' },
    { key: '2', name: '竞品B-玉溪', price: '20-30元', share: '12.8%', features: '中高端、品质稳定', trend: '稳定' },
    { key: '3', name: '竞品C-黄鹤楼', price: '15-25元', share: '10.5%', features: '中端市场、性价比高', trend: '上升' },
    { key: '4', name: '竞品D-芙蓉王', price: '25-35元', share: '9.8%', features: '中高端、品牌知名度高', trend: '稳定' },
    { key: '5', name: '竞品E-利群', price: '18-28元', share: '8.6%', features: '中端、口感柔和', trend: '下降' },
    { key: '6', name: '竞品F-南京', price: '15-20元', share: '7.2%', features: '中端、区域品牌', trend: '稳定' },
    { key: '7', name: '竞品G-红塔山', price: '10-15元', share: '6.5%', features: '中低端、市场覆盖广', trend: '下降' },
    { key: '8', name: '竞品H-双喜', price: '8-12元', share: '5.8%', features: '低端、价格优势', trend: '稳定' },
    { key: '9', name: '竞品I-黄金叶', price: '12-18元', share: '5.2%', features: '中端、区域特色', trend: '上升' },
    { key: '10', name: '竞品J-白沙', price: '10-16元', share: '4.8%', features: '中低端、性价比', trend: '稳定' },
    { key: '11', name: '竞品K-泰山', price: '15-22元', share: '4.2%', features: '中端、地方品牌', trend: '上升' },
    { key: '12', name: '竞品L-红河', price: '12-20元', share: '3.8%', features: '中端、云南特色', trend: '稳定' },
    { key: '13', name: '竞品M-长白山', price: '18-25元', share: '3.5%', features: '中端、东北市场', trend: '上升' },
    { key: '14', name: '竞品N-贵烟', price: '20-30元', share: '3.2%', features: '中高端、贵州特色', trend: '稳定' },
    { key: '15', name: '竞品O-云烟', price: '15-25元', share: '2.8%', features: '中端、云南品牌', trend: '下降' }
  ]

  // 语音识别数据
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
    { id: '5', segment: '女性消费者', age: '25-40岁', gender: '女性(100%)', income: '6K-18K', preferences: ['轻柔口感', '精美包装', '健康理念'], score: 78 },
    { id: '6', segment: '高端消费者', age: '40-60岁', gender: '男性为主(75%)', income: '30K+', preferences: ['奢华品质', '限量版本', '收藏价值'], score: 95 },
    { id: '7', segment: '学生群体', age: '18-25岁', gender: '男性为主(60%)', income: '2K-6K', preferences: ['价格实惠', '口味清淡', '便携包装'], score: 72 },
    { id: '8', segment: '工薪阶层', age: '30-50岁', gender: '男性为主(70%)', income: '5K-12K', preferences: ['性价比高', '口感适中', '经济实用'], score: 86 },
    { id: '9', segment: '退休人群', age: '55-70岁', gender: '男性为主(85%)', income: '3K-8K', preferences: ['传统品牌', '温和口感', '健康考虑'], score: 80 },
    { id: '10', segment: '新兴中产', age: '28-38岁', gender: '性别均衡', income: '12K-25K', preferences: ['品质生活', '品牌调性', '社交需求'], score: 89 },
    { id: '11', segment: '创业者', age: '30-40岁', gender: '男性为主(68%)', income: '15K-35K', preferences: ['提神醒脑', '商务社交', '品牌形象'], score: 87 },
    { id: '12', segment: '文艺青年', age: '22-32岁', gender: '性别均衡', income: '6K-12K', preferences: ['独特口味', '文化内涵', '小众品牌'], score: 83 },
    { id: '13', segment: '蓝领工人', age: '25-45岁', gender: '男性为主(88%)', income: '4K-9K', preferences: ['劲道十足', '价格实惠', '耐抽'], score: 81 },
    { id: '14', segment: '公务员群体', age: '30-50岁', gender: '男性为主(72%)', income: '8K-18K', preferences: ['稳重大气', '品牌可靠', '适合送礼'], score: 88 },
    { id: '15', segment: '自由职业者', age: '25-40岁', gender: '性别均衡', income: '8K-20K', preferences: ['个性化', '品质优先', '健康意识'], score: 84 }
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

  // 问卷模板数据（15条）
  const surveyTemplates = [
    { id: 'ST001', name: '消费者偏好调研问卷', category: '消费者研究', targetAudience: '18-65岁吸烟人群', status: 'active', responseCount: 1256, createTime: '2024-03-15' },
    { id: 'ST002', name: '品牌认知度调查', category: '品牌研究', targetAudience: '目标消费群体', status: 'active', responseCount: 892, createTime: '2024-03-18' },
    { id: 'ST003', name: '产品满意度评估', category: '产品研究', targetAudience: '现有用户', status: 'active', responseCount: 567, createTime: '2024-03-20' },
    { id: 'ST004', name: '新产品概念测试', category: '产品研究', targetAudience: '潜在消费者', status: 'draft', responseCount: 0, createTime: '2024-03-22' },
    { id: 'ST005', name: '价格敏感度分析', category: '定价研究', targetAudience: '目标消费群体', status: 'active', responseCount: 734, createTime: '2024-03-25' },
    { id: 'ST006', name: '渠道偏好调研', category: '渠道研究', targetAudience: '所有消费者', status: 'active', responseCount: 445, createTime: '2024-03-28' },
    { id: 'ST007', name: '广告效果评估', category: '营销研究', targetAudience: '目标受众', status: 'active', responseCount: 623, createTime: '2024-03-12' },
    { id: 'ST008', name: '竞品对比分析', category: '竞争研究', targetAudience: '市场用户', status: 'active', responseCount: 389, createTime: '2024-03-10' },
    { id: 'ST009', name: '用户体验调研', category: '体验研究', targetAudience: '活跃用户', status: 'active', responseCount: 234, createTime: '2024-03-08' },
    { id: 'ST010', name: '季节性需求调研', category: '需求研究', targetAudience: '全体消费者', status: 'archived', responseCount: 1123, createTime: '2024-03-05' },
    { id: 'ST011', name: '包装设计偏好调查', category: '产品研究', targetAudience: '年轻消费者', status: 'active', responseCount: 512, createTime: '2024-03-30' },
    { id: 'ST012', name: '口味偏好研究', category: '产品研究', targetAudience: '核心用户', status: 'active', responseCount: 678, createTime: '2024-04-02' },
    { id: 'ST013', name: '品牌忠诚度调查', category: '品牌研究', targetAudience: '老用户', status: 'active', responseCount: 445, createTime: '2024-04-05' },
    { id: 'ST014', name: '市场细分研究', category: '市场研究', targetAudience: '潜在市场', status: 'draft', responseCount: 0, createTime: '2024-04-08' },
    { id: 'ST015', name: '消费行为分析', category: '消费者研究', targetAudience: '全体用户', status: 'active', responseCount: 892, createTime: '2024-04-10' }
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
              <Col span={6}><Statistic title="本月销量" value={21500} suffix="箱" /></Col>
              <Col span={6}><Statistic title="同比增长" value={17.2} suffix="%" valueStyle={{ color: '#3f8600' }} /></Col>
              <Col span={6}><Statistic title="市场份额" value={8.2} suffix="%" /></Col>
              <Col span={6}><Statistic title="渠道覆盖" value={3420} suffix="家" /></Col>
            </Row>
            <div style={{ marginTop: 16 }}>
              <ReactECharts option={salesTrendOption} style={{ height: 400 }} />
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
                { title: '核心卖点', dataIndex: 'features', key: 'features' },
                {
                  title: '趋势',
                  dataIndex: 'trend',
                  key: 'trend',
                  render: (trend: string) => (
                    <Tag color={trend === '上升' ? 'green' : trend === '下降' ? 'red' : 'blue'}>{trend}</Tag>
                  )
                }
              ]}
              dataSource={competitorData}
              pagination={{ pageSize: 10 }}
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
                { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === 'active' ? 'green' : s === 'draft' ? 'orange' : 'default'}>{s === 'active' ? '活跃' : s === 'draft' ? '草稿' : '已归档'}</Tag> },
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
              pagination={{ pageSize: 10 }}
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
