import React, { useState } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Modal, Form, Input, Select, Progress, Alert, Timeline, Divider, Steps, Upload } from 'antd'
import {
  FileTextOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  UploadOutlined,
  RocketOutlined,
  BulbOutlined,
  BarChartOutlined,
  SafetyCertificateOutlined,
  ExperimentOutlined,
  SettingOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input
const { Step } = Steps

// 报告接口
interface Report {
  id: string
  name: string
  type: 'design_integration' | 'pilot_test' | 'product_finalization'
  status: 'generating' | 'draft' | 'reviewing' | 'approved' | 'published'
  projectId: string
  projectName: string
  creator: string
  createTime: string
  updateTime: string
  sections: ReportSection[]
  progress: number
  reviewers: string[]
  approver?: string
  publishDate?: string
  downloadCount: number
}

// 报告章节接口
interface ReportSection {
  id: string
  title: string
  type: 'text' | 'table' | 'chart' | 'image'
  content: any
  status: 'pending' | 'generating' | 'completed' | 'error'
  aiGenerated: boolean
}

// 报告模板接口
interface ReportTemplate {
  id: string
  name: string
  type: 'design_integration' | 'pilot_test' | 'product_finalization'
  description: string
  sections: string[]
  estimatedTime: number
  complexity: 'simple' | 'medium' | 'complex'
}

const ReportGeneration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reports')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [generateModalVisible, setGenerateModalVisible] = useState(false)

  // 模拟报告数据
  const reports: Report[] = [
    {
      id: 'RPT001',
      name: '焦甜香系列产品设计集成方案',
      type: 'design_integration',
      status: 'approved',
      projectId: 'DP001',
      projectName: '焦甜香系列产品设计',
      creator: '张报告',
      createTime: '2024-03-25 10:30:00',
      updateTime: '2024-03-28 14:20:00',
      sections: [],
      progress: 100,
      reviewers: ['李审核', '王审核'],
      approver: '李总监',
      publishDate: '2024-03-28',
      downloadCount: 25
    },
    {
      id: 'RPT002',
      name: '高端系列中试验证报告',
      type: 'pilot_test',
      status: 'reviewing',
      projectId: 'DP002',
      projectName: '高端系列产品设计',
      creator: '李报告',
      createTime: '2024-03-28 09:15:00',
      updateTime: '2024-03-30 11:30:00',
      sections: [],
      progress: 95,
      reviewers: ['赵审核', '孙审核'],
      downloadCount: 12
    },
    {
      id: 'RPT003',
      name: '环保系列产品定型报告',
      type: 'product_finalization',
      status: 'generating',
      projectId: 'DP003',
      projectName: '环保系列产品设计',
      creator: '王报告',
      createTime: '2024-03-30 14:45:00',
      updateTime: '2024-03-30 16:20:00',
      sections: [],
      progress: 65,
      reviewers: [],
      downloadCount: 0
    },
    {
      id: 'RPT004',
      name: '时尚系列设计集成方案',
      type: 'design_integration',
      status: 'draft',
      projectId: 'DP004',
      projectName: '时尚系列产品设计',
      creator: '赵报告',
      createTime: '2024-03-29 16:30:00',
      updateTime: '2024-03-30 09:45:00',
      sections: [],
      progress: 80,
      reviewers: [],
      downloadCount: 3
    },
    {
      id: 'RPT005',
      name: '限量版中试验证报告',
      type: 'pilot_test',
      status: 'approved',
      projectId: 'DP005',
      projectName: '限量版产品设计',
      creator: '孙报告',
      createTime: '2024-03-26 11:20:00',
      updateTime: '2024-03-29 15:30:00',
      sections: [],
      progress: 100,
      reviewers: ['钱审核', '周审核'],
      approver: '李总监',
      publishDate: '2024-03-29',
      downloadCount: 18
    },
    {
      id: 'RPT006',
      name: '经济型产品定型报告',
      type: 'product_finalization',
      status: 'published',
      projectId: 'DP006',
      projectName: '经济型产品设计',
      creator: '钱报告',
      createTime: '2024-03-27 13:15:00',
      updateTime: '2024-03-30 10:45:00',
      sections: [],
      progress: 100,
      reviewers: ['吴审核', '郑审核'],
      approver: '李总监',
      publishDate: '2024-03-30',
      downloadCount: 35
    },
    {
      id: 'RPT007',
      name: '文化系列设计集成方案',
      type: 'design_integration',
      status: 'reviewing',
      projectId: 'DP007',
      projectName: '文化系列产品设计',
      creator: '周报告',
      createTime: '2024-03-28 15:40:00',
      updateTime: '2024-03-30 12:15:00',
      sections: [],
      progress: 90,
      reviewers: ['冯审核'],
      downloadCount: 8
    },
    {
      id: 'RPT008',
      name: '女性系列中试验证报告',
      type: 'pilot_test',
      status: 'generating',
      projectId: 'DP008',
      projectName: '女性系列产品设计',
      creator: '吴报告',
      createTime: '2024-03-30 08:25:00',
      updateTime: '2024-03-30 15:50:00',
      sections: [],
      progress: 45,
      reviewers: [],
      downloadCount: 0
    }
  ]

  // 模拟报告模板数据
  const reportTemplates: ReportTemplate[] = [
    {
      id: 'TPL001',
      name: '产品设计集成方案模板',
      type: 'design_integration',
      description: '包含市场分析、设计目标、技术方案、成本分析等完整内容',
      sections: [
        '项目概述',
        '市场分析',
        '设计目标',
        '叶组配方方案',
        '香精香料方案',
        '辅材设计方案',
        '包装设计方案',
        '工艺参数设计',
        '成本分析',
        '风险评估',
        '实施计划',
        '结论与建议'
      ],
      estimatedTime: 45,
      complexity: 'complex'
    },
    {
      id: 'TPL002',
      name: '中试验证报告模板',
      type: 'pilot_test',
      description: '中试生产验证的完整报告，包含试验设计、结果分析、问题总结',
      sections: [
        '试验目的',
        '试验设计',
        '原料准备',
        '工艺执行',
        '质量检测',
        '感官评价',
        '成本核算',
        '问题分析',
        '改进建议',
        '结论'
      ],
      estimatedTime: 30,
      complexity: 'medium'
    },
    {
      id: 'TPL003',
      name: '产品定型报告模板',
      type: 'product_finalization',
      description: '产品最终定型的综合报告，包含所有验证结果和最终规格',
      sections: [
        '产品概述',
        '技术规格',
        '质量标准',
        '工艺规程',
        '成本构成',
        '市场定位',
        '竞争分析',
        '风险控制',
        '生产准备',
        '上市建议'
      ],
      estimatedTime: 35,
      complexity: 'complex'
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">定型与输出数字化</h1>
        <p className="page-description">
          研发报告一键生成，支持产品设计集成方案、中试验证报告、产品定型报告的自动生成
        </p>
      </div>

      {/* 统计概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="报告总数"
              value={reports.length}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="已发布报告"
              value={reports.filter(r => r.status === 'published' || r.status === 'approved').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="生成中报告"
              value={reports.filter(r => r.status === 'generating').length}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="总下载量"
              value={reports.reduce((sum, r) => sum + r.downloadCount, 0)}
              prefix={<DownloadOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="报告管理" key="reports" icon={<FileTextOutlined />}>
          <Card 
            title="研发报告管理" 
            extra={
              <Space>
                <Button 
                  type="primary" 
                  icon={<ThunderboltOutlined />}
                  onClick={() => setGenerateModalVisible(true)}
                >
                  AI一键生成
                </Button>
                <Button 
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setModalType('create')
                    setSelectedRecord(null)
                    setModalVisible(true)
                  }}
                >
                  新建报告
                </Button>
              </Space>
            }
          >
            <Space style={{ marginBottom: 16 }}>
              <Select
                placeholder="报告类型"
                style={{ width: 180 }}
                allowClear
              >
                <Option value="design_integration">产品设计集成方案</Option>
                <Option value="pilot_test">中试验证报告</Option>
                <Option value="product_finalization">产品定型报告</Option>
              </Select>
              <Select
                placeholder="状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="generating">生成中</Option>
                <Option value="draft">草稿</Option>
                <Option value="reviewing">评审中</Option>
                <Option value="approved">已批准</Option>
                <Option value="published">已发布</Option>
              </Select>
              <Select
                placeholder="项目"
                style={{ width: 200 }}
                allowClear
              >
                <Option value="DP001">焦甜香系列产品设计</Option>
                <Option value="DP002">高端系列产品设计</Option>
                <Option value="DP003">环保系列产品设计</Option>
              </Select>
            </Space>

            <Table
              columns={[
                {
                  title: '报告名称',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => <a>{text}</a>
                },
                {
                  title: '报告类型',
                  dataIndex: 'type',
                  key: 'type',
                  render: (type: string) => {
                    const configs = {
                      design_integration: { color: 'blue', text: '设计集成方案' },
                      pilot_test: { color: 'green', text: '中试验证报告' },
                      product_finalization: { color: 'purple', text: '产品定型报告' }
                    }
                    const config = configs[type as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '关联项目',
                  dataIndex: 'projectName',
                  key: 'projectName',
                  render: (name: string) => <Tag>{name}</Tag>
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => {
                    const configs = {
                      generating: { color: 'blue', text: '生成中', icon: <ClockCircleOutlined /> },
                      draft: { color: 'default', text: '草稿' },
                      reviewing: { color: 'orange', text: '评审中' },
                      approved: { color: 'green', text: '已批准', icon: <CheckCircleOutlined /> },
                      published: { color: 'purple', text: '已发布', icon: <CheckCircleOutlined /> }
                    }
                    const config = configs[status as keyof typeof configs]
                    return <Tag color={config.color} icon={config.icon}>{config.text}</Tag>
                  }
                },
                {
                  title: '生成进度',
                  dataIndex: 'progress',
                  key: 'progress',
                  render: (progress: number) => (
                    <Progress 
                      percent={progress} 
                      size="small" 
                      status={progress === 100 ? 'success' : progress > 80 ? 'active' : 'normal'}
                    />
                  )
                },
                {
                  title: '创建人',
                  dataIndex: 'creator',
                  key: 'creator'
                },
                {
                  title: '创建时间',
                  dataIndex: 'createTime',
                  key: 'createTime'
                },
                {
                  title: '下载量',
                  dataIndex: 'downloadCount',
                  key: 'downloadCount'
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (record: Report) => (
                    <Space size="middle">
                      <Button 
                        type="link" 
                        icon={<EyeOutlined />} 
                        size="small"
                        onClick={() => {
                          setSelectedRecord(record)
                          setModalType('view')
                          setModalVisible(true)
                        }}
                      >
                        查看
                      </Button>
                      <Button 
                        type="link" 
                        icon={<EditOutlined />} 
                        size="small"
                        onClick={() => {
                          setSelectedRecord(record)
                          setModalType('edit')
                          setModalVisible(true)
                        }}
                        disabled={record.status === 'published'}
                      >
                        编辑
                      </Button>
                      <Button 
                        type="link" 
                        icon={<DownloadOutlined />} 
                        size="small"
                        disabled={record.progress < 100}
                      >
                        下载
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={reports}
              rowKey="id"
              pagination={{
                total: reports.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="AI生成" key="ai-generation" icon={<BulbOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="智能报告生成" extra={<Tag color="purple">LLM+RAG</Tag>}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert
                    message="AI报告生成系统"
                    description="基于大语言模型和检索增强生成技术，自动生成专业研发报告"
                    type="info"
                    showIcon
                  />

                  <Steps current={2} size="small">
                    <Step title="数据收集" icon={<BarChartOutlined />} />
                    <Step title="内容生成" icon={<BulbOutlined />} />
                    <Step title="质量检查" icon={<SafetyCertificateOutlined />} />
                    <Step title="格式化" icon={<FileTextOutlined />} />
                  </Steps>

                  <div style={{ marginTop: 16 }}>
                    <div style={{ marginBottom: 8 }}>生成进度</div>
                    <Progress percent={75} status="active" />
                    <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                      正在生成"工艺参数设计"章节...
                    </div>
                  </div>

                  <Timeline size="small">
                    <Timeline.Item color="green">
                      <div>项目概述 - 已完成</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>2分钟前</div>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      <div>市场分析 - 已完成</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>5分钟前</div>
                    </Timeline.Item>
                    <Timeline.Item color="blue">
                      <div>技术方案 - 生成中</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>预计3分钟</div>
                    </Timeline.Item>
                    <Timeline.Item color="gray">
                      <div>成本分析 - 待生成</div>
                    </Timeline.Item>
                  </Timeline>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="生成配置" extra={<Tag color="orange">可定制</Tag>}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Form layout="vertical" size="small">
                    <Form.Item label="报告详细程度">
                      <Select defaultValue="detailed" placeholder="选择详细程度">
                        <Option value="brief">简要版</Option>
                        <Option value="standard">标准版</Option>
                        <Option value="detailed">详细版</Option>
                        <Option value="comprehensive">全面版</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="数据来源">
                      <Select mode="multiple" placeholder="选择数据来源" defaultValue={['project_data', 'test_results']}>
                        <Option value="project_data">项目数据</Option>
                        <Option value="test_results">测试结果</Option>
                        <Option value="market_analysis">市场分析</Option>
                        <Option value="historical_data">历史数据</Option>
                        <Option value="industry_standards">行业标准</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="语言风格">
                      <Select defaultValue="professional" placeholder="选择语言风格">
                        <Option value="professional">专业技术</Option>
                        <Option value="business">商务正式</Option>
                        <Option value="academic">学术研究</Option>
                        <Option value="concise">简洁明了</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="图表生成">
                      <Select mode="multiple" placeholder="选择图表类型" defaultValue={['charts', 'tables']}>
                        <Option value="charts">数据图表</Option>
                        <Option value="tables">数据表格</Option>
                        <Option value="flowcharts">流程图</Option>
                        <Option value="diagrams">结构图</Option>
                      </Select>
                    </Form.Item>
                  </Form>

                  <Alert
                    message="生成时间预估"
                    description="根据当前配置，预计生成时间：15-20分钟"
                    type="info"
                    size="small"
                  />
                </Space>
              </Card>
            </Col>
          </Row>

          <Card title="生成历史" style={{ marginTop: 16 }}>
            <Table
              size="small"
              columns={[
                { title: '生成时间', dataIndex: 'generateTime', key: 'generateTime' },
                { title: '报告类型', dataIndex: 'reportType', key: 'reportType', render: (type: string) => <Tag>{type}</Tag> },
                { title: '项目名称', dataIndex: 'projectName', key: 'projectName' },
                { title: '生成模式', dataIndex: 'mode', key: 'mode' },
                { title: '耗时', dataIndex: 'duration', key: 'duration' },
                { title: '质量评分', dataIndex: 'qualityScore', key: 'qualityScore', render: (score: number) => <Progress percent={score} size="small" /> },
                { title: '状态', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={status === 'success' ? 'green' : 'orange'}>{status === 'success' ? '成功' : '进行中'}</Tag> },
                { title: '操作', key: 'action', render: () => <Button type="link" size="small">查看详情</Button> }
              ]}
              dataSource={[
                { generateTime: '2024-03-30 14:30', reportType: '设计集成方案', projectName: '焦甜香系列', mode: '详细版', duration: '18分钟', qualityScore: 92, status: 'success' },
                { generateTime: '2024-03-29 10:15', reportType: '中试验证报告', projectName: '高端系列', mode: '标准版', duration: '12分钟', qualityScore: 88, status: 'success' },
                { generateTime: '2024-03-30 16:45', reportType: '产品定型报告', projectName: '环保系列', mode: '全面版', duration: '进行中', qualityScore: 0, status: 'processing' }
              ]}
              pagination={false}
            />
          </Card>
        </TabPane>

        <TabPane tab="模板管理" key="templates" icon={<SettingOutlined />}>
          <Card
            title="报告模板库"
            extra={
              <Button
                icon={<PlusOutlined />}
                onClick={() => {
                  setModalType('create')
                  setSelectedRecord(null)
                  setModalVisible(true)
                }}
              >
                新建模板
              </Button>
            }
          >
            <Row gutter={[16, 16]}>
              {reportTemplates.map(template => (
                <Col xs={24} lg={8} key={template.id}>
                  <Card
                    size="small"
                    title={template.name}
                    extra={
                      <Tag color={template.complexity === 'complex' ? 'red' : template.complexity === 'medium' ? 'orange' : 'green'}>
                        {template.complexity === 'complex' ? '复杂' : template.complexity === 'medium' ? '中等' : '简单'}
                      </Tag>
                    }
                    actions={[
                      <Button type="link" size="small" icon={<EyeOutlined />}>预览</Button>,
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>,
                      <Button type="link" size="small" icon={<RocketOutlined />}>使用</Button>
                    ]}
                  >
                    <div style={{ marginBottom: 12 }}>
                      <Tag color="blue">{template.type === 'design_integration' ? '设计集成' : template.type === 'pilot_test' ? '中试验证' : '产品定型'}</Tag>
                    </div>
                    <div style={{ marginBottom: 12, fontSize: '12px', color: '#666' }}>
                      {template.description}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ fontSize: '12px', color: '#666' }}>包含章节: {template.sections.length}个</span>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ fontSize: '12px', color: '#666' }}>预计时间: {template.estimatedTime}分钟</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      主要章节: {template.sections.slice(0, 3).join('、')}...
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </TabPane>

        <TabPane tab="质量控制" key="quality" icon={<SafetyCertificateOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <Card title="内容质量检查" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ marginBottom: 8 }}>逻辑一致性</div>
                    <Progress percent={95} size="small" status="success" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>数据准确性</div>
                    <Progress percent={92} size="small" status="success" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>语言规范性</div>
                    <Progress percent={88} size="small" status="active" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>格式标准化</div>
                    <Progress percent={96} size="small" status="success" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>完整性检查</div>
                    <Progress percent={90} size="small" status="success" />
                  </div>

                  <Alert
                    message="质量检查通过"
                    description="报告内容符合质量标准"
                    type="success"
                    size="small"
                  />
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="合规性审查" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert
                    message="技术规范符合性"
                    description="符合行业技术规范要求"
                    type="success"
                    size="small"
                    showIcon
                  />
                  <Alert
                    message="数据引用规范"
                    description="所有数据来源已标注"
                    type="success"
                    size="small"
                    showIcon
                  />
                  <Alert
                    message="保密信息检查"
                    description="未发现敏感信息泄露"
                    type="success"
                    size="small"
                    showIcon
                  />
                  <Alert
                    message="版权合规性"
                    description="图表和内容无版权问题"
                    type="success"
                    size="small"
                    showIcon
                  />
                  <Alert
                    message="格式规范性"
                    description="建议调整部分图表格式"
                    type="warning"
                    size="small"
                    showIcon
                  />
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="改进建议" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>1. 数据可视化优化</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      建议在成本分析章节增加饼图展示成本构成
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>2. 结论部分加强</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      建议在结论中增加具体的数值对比和改进效果
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>3. 风险评估完善</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      建议补充技术风险和市场风险的量化分析
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>4. 参考文献规范</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      建议按照标准格式整理参考文献列表
                    </div>
                  </div>

                  <Button type="primary" size="small" block>
                    一键优化
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* AI生成报告模态框 */}
      <Modal
        title="AI智能生成报告"
        open={generateModalVisible}
        onCancel={() => setGenerateModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setGenerateModalVisible(false)}>
            取消
          </Button>,
          <Button key="generate" type="primary" icon={<ThunderboltOutlined />}>
            开始生成
          </Button>
        ]}
      >
        <Alert
          message="AI报告生成功能"
          description="基于LLM+RAG技术，自动收集项目数据，生成专业的研发报告"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />

        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="关联项目">
                <Select placeholder="请选择项目">
                  <Option value="DP001">焦甜香系列产品设计</Option>
                  <Option value="DP002">高端系列产品设计</Option>
                  <Option value="DP003">环保系列产品设计</Option>
                  <Option value="DP004">时尚系列产品设计</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="报告类型">
                <Select placeholder="请选择报告类型">
                  <Option value="design_integration">产品设计集成方案</Option>
                  <Option value="pilot_test">中试验证报告</Option>
                  <Option value="product_finalization">产品定型报告</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="报告模板">
            <Select placeholder="请选择报告模板">
              {reportTemplates.map(template => (
                <Option key={template.id} value={template.id}>
                  {template.name} ({template.estimatedTime}分钟)
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="生成配置">
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ marginBottom: 8 }}>详细程度</div>
                <Select defaultValue="detailed" style={{ width: '100%' }}>
                  <Option value="brief">简要版</Option>
                  <Option value="standard">标准版</Option>
                  <Option value="detailed">详细版</Option>
                  <Option value="comprehensive">全面版</Option>
                </Select>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: 8 }}>语言风格</div>
                <Select defaultValue="professional" style={{ width: '100%' }}>
                  <Option value="professional">专业技术</Option>
                  <Option value="business">商务正式</Option>
                  <Option value="academic">学术研究</Option>
                  <Option value="concise">简洁明了</Option>
                </Select>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item label="特殊要求">
            <TextArea
              rows={3}
              placeholder="请输入特殊要求或重点关注的内容..."
            />
          </Form.Item>

          <Form.Item label="数据来源">
            <Select mode="multiple" placeholder="选择数据来源" defaultValue={['project_data', 'test_results']}>
              <Option value="project_data">项目设计数据</Option>
              <Option value="test_results">测试验证结果</Option>
              <Option value="market_analysis">市场分析数据</Option>
              <Option value="cost_analysis">成本分析数据</Option>
              <Option value="quality_data">质量检测数据</Option>
              <Option value="historical_data">历史项目数据</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ReportGeneration
