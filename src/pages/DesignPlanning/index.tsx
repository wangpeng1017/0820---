import React, { useState } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress, Modal, Form, Input, Select, Steps, Timeline, Divider, Alert } from 'antd'
import {
  FileTextOutlined,
  BarChartOutlined,
  BulbOutlined,
  RocketOutlined,
  SearchOutlined,
  UserOutlined,
  ShoppingOutlined,
  CompareOutlined,
  SettingOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DownloadOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select
const { Step } = Steps
const { TextArea } = Input

// 市场分析报告接口
interface MarketAnalysisReport {
  id: string
  name: string
  type: 'policy' | 'market' | 'consumer' | 'competitor' | 'comprehensive'
  status: 'generating' | 'completed' | 'failed'
  creator: string
  createTime: string
  updateTime: string
  analysisScope: string[]
  keyFindings: string[]
  recommendations: string[]
  dataSource: string[]
  confidence: number
  reportContent: string
}

// 设计目标接口
interface DesignTarget {
  id: string
  projectId: string
  category: 'formula' | 'flavor' | 'material' | 'process' | 'packaging' | 'cost' | 'quality'
  name: string
  description: string
  targetValue: string
  currentValue?: string
  unit: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in_progress' | 'achieved' | 'failed'
  assignee: string
  deadline: string
  dependencies: string[]
  kpis: KPI[]
}

// KPI接口
interface KPI {
  id: string
  name: string
  targetValue: number
  currentValue: number
  unit: string
  weight: number
}

// 策划方案接口
interface PlanningScheme {
  id: string
  name: string
  projectType: 'new_product' | 'optimization' | 'research'
  marketAnalysisId: string
  designTargets: DesignTarget[]
  status: 'draft' | 'reviewing' | 'approved' | 'rejected'
  creator: string
  createTime: string
  approver?: string
  approveTime?: string
  totalScore: number
  feasibilityScore: number
  innovationScore: number
  marketScore: number
}

const DesignPlanning: React.FC = () => {
  const [activeTab, setActiveTab] = useState('analysis')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [generateModalVisible, setGenerateModalVisible] = useState(false)
  const [targetModalVisible, setTargetModalVisible] = useState(false)

  // 模拟市场分析报告数据
  const marketReports: MarketAnalysisReport[] = [
    {
      id: 'MAR001',
      name: '2024年焦甜香型卷烟市场分析报告',
      type: 'comprehensive',
      status: 'completed',
      creator: '市场分析师',
      createTime: '2024-03-15 10:30:00',
      updateTime: '2024-03-20 14:20:00',
      analysisScope: ['政策环境', '市场规模', '消费趋势', '竞品分析'],
      keyFindings: [
        '焦甜香型产品市场需求增长15%',
        '年轻消费群体偏好度提升',
        '高端产品市场空间较大',
        '环保包装成为新趋势'
      ],
      recommendations: [
        '重点开发年轻化产品',
        '提升产品包装设计',
        '加强品牌营销推广',
        '优化成本控制策略'
      ],
      dataSource: ['行业报告', '消费者调研', '竞品监测', '政策文件'],
      confidence: 92,
      reportContent: '详细的市场分析报告内容...'
    },
    {
      id: 'MAR002',
      name: '消费者偏好变化趋势分析',
      type: 'consumer',
      status: 'completed',
      creator: '消费研究员',
      createTime: '2024-03-18 09:15:00',
      updateTime: '2024-03-25 16:45:00',
      analysisScope: ['消费行为', '偏好变化', '购买决策'],
      keyFindings: [
        '健康意识显著提升',
        '个性化需求增强',
        '价格敏感度下降',
        '品牌忠诚度提高'
      ],
      recommendations: [
        '开发低焦油产品',
        '推出个性化定制',
        '提升产品品质',
        '加强品牌建设'
      ],
      dataSource: ['问卷调研', '焦点小组', '行为观察'],
      confidence: 88,
      reportContent: '消费者偏好分析详细内容...'
    },
    {
      id: 'MAR003',
      name: '竞品策略对比分析',
      type: 'competitor',
      status: 'completed',
      creator: '竞品分析师',
      createTime: '2024-03-20 14:30:00',
      updateTime: '2024-03-28 11:20:00',
      analysisScope: ['产品策略', '价格策略', '渠道策略', '营销策略'],
      keyFindings: [
        '主要竞品加大创新投入',
        '价格竞争趋于理性',
        '渠道下沉成为趋势',
        '数字化营销占比提升'
      ],
      recommendations: [
        '加快产品创新步伐',
        '优化价格策略',
        '拓展下沉市场',
        '强化数字化营销'
      ],
      dataSource: ['公开信息', '市场监测', '渠道调研'],
      confidence: 85,
      reportContent: '竞品分析详细报告...'
    },
    {
      id: 'MAR004',
      name: '政策环境影响评估',
      type: 'policy',
      status: 'generating',
      creator: '政策研究员',
      createTime: '2024-03-25 13:45:00',
      updateTime: '2024-03-28 10:30:00',
      analysisScope: ['法规政策', '税收政策', '环保政策'],
      keyFindings: [],
      recommendations: [],
      dataSource: ['政府文件', '行业通知', '专家解读'],
      confidence: 0,
      reportContent: ''
    },
    {
      id: 'MAR005',
      name: '市场规模预测分析',
      type: 'market',
      status: 'completed',
      creator: '市场预测师',
      createTime: '2024-03-22 16:20:00',
      updateTime: '2024-03-30 09:15:00',
      analysisScope: ['市场容量', '增长趋势', '细分市场'],
      keyFindings: [
        '整体市场稳中有升',
        '高端市场增长迅速',
        '区域差异明显',
        '新兴渠道快速发展'
      ],
      recommendations: [
        '聚焦高端市场',
        '差异化区域策略',
        '布局新兴渠道',
        '提升产品附加值'
      ],
      dataSource: ['统计数据', '行业报告', '渠道数据'],
      confidence: 90,
      reportContent: '市场规模预测详细分析...'
    }
  ]

  // 模拟设计目标数据
  const designTargets: DesignTarget[] = [
    {
      id: 'DT001',
      projectId: 'DP001',
      category: 'formula',
      name: '焦甜香型配方开发',
      description: '开发具有独特焦甜香风格的叶组配方',
      targetValue: '焦甜香特征明显，感官评分≥85分',
      currentValue: '82分',
      unit: '分',
      priority: 'high',
      status: 'in_progress',
      assignee: '李配方',
      deadline: '2024-05-15',
      dependencies: ['市场调研完成'],
      kpis: [
        { id: 'KPI001', name: '感官评分', targetValue: 85, currentValue: 82, unit: '分', weight: 40 },
        { id: 'KPI002', name: '焦油量', targetValue: 8, currentValue: 8.2, unit: 'mg', weight: 30 },
        { id: 'KPI003', name: '成本控制', targetValue: 12, currentValue: 12.5, unit: '元/包', weight: 30 }
      ]
    },
    {
      id: 'DT002',
      projectId: 'DP001',
      category: 'flavor',
      name: '香精香料配方设计',
      description: '设计与叶组配方匹配的香精香料方案',
      targetValue: '香气协调性≥90分',
      currentValue: '88分',
      unit: '分',
      priority: 'high',
      status: 'in_progress',
      assignee: '王香精',
      deadline: '2024-06-01',
      dependencies: ['叶组配方确定'],
      kpis: [
        { id: 'KPI004', name: '香气协调性', targetValue: 90, currentValue: 88, unit: '分', weight: 50 },
        { id: 'KPI005', name: '留香时间', targetValue: 45, currentValue: 42, unit: '秒', weight: 30 },
        { id: 'KPI006', name: '成本控制', targetValue: 2, currentValue: 2.1, unit: '元/包', weight: 20 }
      ]
    },
    {
      id: 'DT003',
      projectId: 'DP001',
      category: 'packaging',
      name: '包装设计创新',
      description: '设计符合年轻消费者喜好的包装方案',
      targetValue: '设计满意度≥88分',
      currentValue: '85分',
      unit: '分',
      priority: 'medium',
      status: 'pending',
      assignee: '孙包装',
      deadline: '2024-07-01',
      dependencies: ['产品定位确定'],
      kpis: [
        { id: 'KPI007', name: '设计满意度', targetValue: 88, currentValue: 85, unit: '分', weight: 40 },
        { id: 'KPI008', name: '环保指标', targetValue: 95, currentValue: 90, unit: '分', weight: 35 },
        { id: 'KPI009', name: '成本控制', targetValue: 1.5, currentValue: 1.6, unit: '元/包', weight: 25 }
      ]
    },
    {
      id: 'DT004',
      projectId: 'DP001',
      category: 'process',
      name: '工艺参数优化',
      description: '优化制丝和卷接工艺参数',
      targetValue: '工艺稳定性≥95%',
      currentValue: '92%',
      unit: '%',
      priority: 'medium',
      status: 'pending',
      assignee: '赵工艺',
      deadline: '2024-06-15',
      dependencies: ['配方方案确定'],
      kpis: [
        { id: 'KPI010', name: '工艺稳定性', targetValue: 95, currentValue: 92, unit: '%', weight: 50 },
        { id: 'KPI011', name: '生产效率', targetValue: 98, currentValue: 95, unit: '%', weight: 30 },
        { id: 'KPI012', name: '质量一致性', targetValue: 96, currentValue: 94, unit: '%', weight: 20 }
      ]
    },
    {
      id: 'DT005',
      projectId: 'DP001',
      category: 'cost',
      name: '成本控制目标',
      description: '控制产品总成本在目标范围内',
      targetValue: '≤15元/包',
      currentValue: '15.8元/包',
      unit: '元/包',
      priority: 'high',
      status: 'in_progress',
      assignee: '财务部',
      deadline: '2024-08-30',
      dependencies: ['各环节成本确定'],
      kpis: [
        { id: 'KPI013', name: '原料成本', targetValue: 8, currentValue: 8.5, unit: '元/包', weight: 40 },
        { id: 'KPI014', name: '加工成本', targetValue: 4, currentValue: 4.2, unit: '元/包', weight: 30 },
        { id: 'KPI015', name: '包装成本', targetValue: 3, currentValue: 3.1, unit: '元/包', weight: 30 }
      ]
    },
    {
      id: 'DT006',
      projectId: 'DP001',
      category: 'quality',
      name: '质量标准制定',
      description: '制定产品质量控制标准',
      targetValue: '合格率≥99.5%',
      currentValue: '99.2%',
      unit: '%',
      priority: 'high',
      status: 'in_progress',
      assignee: '质量部',
      deadline: '2024-07-15',
      dependencies: ['产品规格确定'],
      kpis: [
        { id: 'KPI016', name: '产品合格率', targetValue: 99.5, currentValue: 99.2, unit: '%', weight: 50 },
        { id: 'KPI017', name: '客户满意度', targetValue: 90, currentValue: 88, unit: '分', weight: 30 },
        { id: 'KPI018', name: '投诉率', targetValue: 0.1, currentValue: 0.15, unit: '%', weight: 20 }
      ]
    }
  ]

  // 模拟策划方案数据
  const planningSchemes: PlanningScheme[] = [
    {
      id: 'PS001',
      name: '焦甜香系列产品策划方案',
      projectType: 'new_product',
      marketAnalysisId: 'MAR001',
      designTargets: designTargets.filter(dt => dt.projectId === 'DP001'),
      status: 'approved',
      creator: '张策划',
      createTime: '2024-03-20 10:30:00',
      approver: '李总监',
      approveTime: '2024-03-25 14:20:00',
      totalScore: 92,
      feasibilityScore: 90,
      innovationScore: 88,
      marketScore: 95
    },
    {
      id: 'PS002',
      name: '经典品牌优化策划方案',
      projectType: 'optimization',
      marketAnalysisId: 'MAR002',
      designTargets: [],
      status: 'reviewing',
      creator: '刘策划',
      createTime: '2024-03-22 15:45:00',
      totalScore: 85,
      feasibilityScore: 88,
      innovationScore: 80,
      marketScore: 87
    },
    {
      id: 'PS003',
      name: '低焦油健康型产品策划',
      projectType: 'research',
      marketAnalysisId: 'MAR003',
      designTargets: [],
      status: 'draft',
      creator: '周策划',
      createTime: '2024-03-25 09:20:00',
      totalScore: 78,
      feasibilityScore: 75,
      innovationScore: 85,
      marketScore: 75
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">设计策划数字化</h1>
        <p className="page-description">
          市场分析报告智能生成，设计目标智能分解，策划方案管理
        </p>
      </div>

      {/* 统计概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="分析报告"
              value={marketReports.length}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="策划方案"
              value={planningSchemes.length}
              prefix={<BulbOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="设计目标"
              value={designTargets.length}
              prefix={<RocketOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="完成率"
              value={Math.round((designTargets.filter(dt => dt.status === 'achieved').length / designTargets.length) * 100)}
              suffix="%"
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="市场分析" key="analysis" icon={<BarChartOutlined />}>
          <Card 
            title="市场分析报告" 
            extra={
              <Space>
                <Button 
                  type="primary" 
                  icon={<ThunderboltOutlined />}
                  onClick={() => setGenerateModalVisible(true)}
                >
                  智能生成报告
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
                style={{ width: 150 }}
                allowClear
              >
                <Option value="policy">政策分析</Option>
                <Option value="market">市场分析</Option>
                <Option value="consumer">消费者分析</Option>
                <Option value="competitor">竞品分析</Option>
                <Option value="comprehensive">综合分析</Option>
              </Select>
              <Select
                placeholder="状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="generating">生成中</Option>
                <Option value="completed">已完成</Option>
                <Option value="failed">失败</Option>
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
                  title: '类型',
                  dataIndex: 'type',
                  key: 'type',
                  render: (type: string) => {
                    const configs = {
                      policy: { color: 'blue', text: '政策分析' },
                      market: { color: 'green', text: '市场分析' },
                      consumer: { color: 'orange', text: '消费者分析' },
                      competitor: { color: 'purple', text: '竞品分析' },
                      comprehensive: { color: 'red', text: '综合分析' }
                    }
                    const config = configs[type as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => {
                    const configs = {
                      generating: { color: 'blue', text: '生成中', icon: <ClockCircleOutlined /> },
                      completed: { color: 'green', text: '已完成', icon: <CheckCircleOutlined /> },
                      failed: { color: 'red', text: '失败', icon: <ExclamationCircleOutlined /> }
                    }
                    const config = configs[status as keyof typeof configs]
                    return <Tag color={config.color} icon={config.icon}>{config.text}</Tag>
                  }
                },
                {
                  title: '可信度',
                  dataIndex: 'confidence',
                  key: 'confidence',
                  render: (confidence: number) => (
                    confidence > 0 ? (
                      <Progress 
                        percent={confidence} 
                        size="small" 
                        status={confidence >= 90 ? 'success' : confidence >= 70 ? 'active' : 'exception'}
                      />
                    ) : '-'
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
                  title: '操作',
                  key: 'action',
                  render: (record: MarketAnalysisReport) => (
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
                        disabled={record.status === 'generating'}
                        onClick={() => {
                          setSelectedRecord(record)
                          setModalType('edit')
                          setModalVisible(true)
                        }}
                      >
                        编辑
                      </Button>
                      <Button 
                        type="link" 
                        icon={<DownloadOutlined />} 
                        size="small"
                        disabled={record.status !== 'completed'}
                      >
                        下载
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={marketReports}
              rowKey="id"
              pagination={{
                total: marketReports.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="设计目标" key="targets" icon={<RocketOutlined />}>
          <Card
            title="设计目标管理"
            extra={
              <Space>
                <Button
                  type="primary"
                  icon={<ThunderboltOutlined />}
                  onClick={() => setTargetModalVisible(true)}
                >
                  智能分解目标
                </Button>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setModalType('create')
                    setSelectedRecord(null)
                    setModalVisible(true)
                  }}
                >
                  新增目标
                </Button>
              </Space>
            }
          >
            <Space style={{ marginBottom: 16 }}>
              <Select
                placeholder="目标类别"
                style={{ width: 150 }}
                allowClear
              >
                <Option value="formula">配方设计</Option>
                <Option value="flavor">香精香料</Option>
                <Option value="material">材料设计</Option>
                <Option value="process">工艺设计</Option>
                <Option value="packaging">包装设计</Option>
                <Option value="cost">成本控制</Option>
                <Option value="quality">质量标准</Option>
              </Select>
              <Select
                placeholder="优先级"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="high">高</Option>
                <Option value="medium">中</Option>
                <Option value="low">低</Option>
              </Select>
              <Select
                placeholder="状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="pending">待开始</Option>
                <Option value="in_progress">进行中</Option>
                <Option value="achieved">已达成</Option>
                <Option value="failed">未达成</Option>
              </Select>
            </Space>

            <Table
              columns={[
                {
                  title: '目标名称',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => <a>{text}</a>
                },
                {
                  title: '类别',
                  dataIndex: 'category',
                  key: 'category',
                  render: (category: string) => {
                    const configs = {
                      formula: { color: 'blue', text: '配方设计' },
                      flavor: { color: 'green', text: '香精香料' },
                      material: { color: 'orange', text: '材料设计' },
                      process: { color: 'purple', text: '工艺设计' },
                      packaging: { color: 'cyan', text: '包装设计' },
                      cost: { color: 'red', text: '成本控制' },
                      quality: { color: 'gold', text: '质量标准' }
                    }
                    const config = configs[category as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '目标值',
                  dataIndex: 'targetValue',
                  key: 'targetValue'
                },
                {
                  title: '当前值',
                  dataIndex: 'currentValue',
                  key: 'currentValue',
                  render: (value: string) => value || '-'
                },
                {
                  title: '优先级',
                  dataIndex: 'priority',
                  key: 'priority',
                  render: (priority: string) => {
                    const colors = { high: 'red', medium: 'orange', low: 'green' }
                    const names = { high: '高', medium: '中', low: '低' }
                    return <Tag color={colors[priority as keyof typeof colors]}>{names[priority as keyof typeof names]}</Tag>
                  }
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => {
                    const configs = {
                      pending: { color: 'default', text: '待开始' },
                      in_progress: { color: 'blue', text: '进行中' },
                      achieved: { color: 'green', text: '已达成' },
                      failed: { color: 'red', text: '未达成' }
                    }
                    const config = configs[status as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '负责人',
                  dataIndex: 'assignee',
                  key: 'assignee'
                },
                {
                  title: '截止日期',
                  dataIndex: 'deadline',
                  key: 'deadline'
                },
                {
                  title: 'KPI完成度',
                  key: 'kpiProgress',
                  render: (record: DesignTarget) => {
                    const totalWeight = record.kpis.reduce((sum, kpi) => sum + kpi.weight, 0)
                    const weightedProgress = record.kpis.reduce((sum, kpi) => {
                      const progress = Math.min((kpi.currentValue / kpi.targetValue) * 100, 100)
                      return sum + (progress * kpi.weight / totalWeight)
                    }, 0)
                    return <Progress percent={Math.round(weightedProgress)} size="small" />
                  }
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (record: DesignTarget) => (
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
                      >
                        编辑
                      </Button>
                      <Button
                        type="link"
                        icon={<BarChartOutlined />}
                        size="small"
                      >
                        跟踪
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={designTargets}
              rowKey="id"
              pagination={{
                total: designTargets.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="策划方案" key="schemes" icon={<BulbOutlined />}>
          <Card
            title="策划方案管理"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setModalType('create')
                  setSelectedRecord(null)
                  setModalVisible(true)
                }}
              >
                新建方案
              </Button>
            }
          >
            <Space style={{ marginBottom: 16 }}>
              <Select
                placeholder="项目类型"
                style={{ width: 150 }}
                allowClear
              >
                <Option value="new_product">新产品</Option>
                <Option value="optimization">优化改进</Option>
                <Option value="research">研究开发</Option>
              </Select>
              <Select
                placeholder="方案状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="draft">草稿</Option>
                <Option value="reviewing">评审中</Option>
                <Option value="approved">已批准</Option>
                <Option value="rejected">已拒绝</Option>
              </Select>
            </Space>

            <Table
              columns={[
                {
                  title: '方案名称',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => <a>{text}</a>
                },
                {
                  title: '项目类型',
                  dataIndex: 'projectType',
                  key: 'projectType',
                  render: (type: string) => {
                    const configs = {
                      new_product: { color: 'blue', text: '新产品' },
                      optimization: { color: 'green', text: '优化改进' },
                      research: { color: 'purple', text: '研究开发' }
                    }
                    const config = configs[type as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => {
                    const configs = {
                      draft: { color: 'default', text: '草稿' },
                      reviewing: { color: 'blue', text: '评审中' },
                      approved: { color: 'green', text: '已批准' },
                      rejected: { color: 'red', text: '已拒绝' }
                    }
                    const config = configs[status as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '综合评分',
                  dataIndex: 'totalScore',
                  key: 'totalScore',
                  render: (score: number) => (
                    <span style={{ color: score >= 90 ? '#52c41a' : score >= 80 ? '#faad14' : '#f5222d' }}>
                      {score}分
                    </span>
                  )
                },
                {
                  title: '可行性',
                  dataIndex: 'feasibilityScore',
                  key: 'feasibilityScore',
                  render: (score: number) => <Progress percent={score} size="small" />
                },
                {
                  title: '创新性',
                  dataIndex: 'innovationScore',
                  key: 'innovationScore',
                  render: (score: number) => <Progress percent={score} size="small" strokeColor="#722ed1" />
                },
                {
                  title: '市场性',
                  dataIndex: 'marketScore',
                  key: 'marketScore',
                  render: (score: number) => <Progress percent={score} size="small" strokeColor="#13c2c2" />
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
                  title: '操作',
                  key: 'action',
                  render: (record: PlanningScheme) => (
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
                        disabled={record.status === 'approved'}
                        onClick={() => {
                          setSelectedRecord(record)
                          setModalType('edit')
                          setModalVisible(true)
                        }}
                      >
                        编辑
                      </Button>
                      <Button
                        type="link"
                        icon={<CheckCircleOutlined />}
                        size="small"
                        disabled={record.status !== 'reviewing'}
                      >
                        审批
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={planningSchemes}
              rowKey="id"
              pagination={{
                total: planningSchemes.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* 智能生成报告模态框 */}
      <Modal
        title="智能生成市场分析报告"
        open={generateModalVisible}
        onCancel={() => setGenerateModalVisible(false)}
        width={600}
        footer={[
          <Button key="cancel" onClick={() => setGenerateModalVisible(false)}>
            取消
          </Button>,
          <Button key="generate" type="primary" icon={<ThunderboltOutlined />}>
            开始生成
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="报告类型">
            <Select placeholder="请选择报告类型">
              <Option value="policy">政策环境分析</Option>
              <Option value="market">市场规模分析</Option>
              <Option value="consumer">消费者行为分析</Option>
              <Option value="competitor">竞品策略分析</Option>
              <Option value="comprehensive">综合市场分析</Option>
            </Select>
          </Form.Item>
          <Form.Item label="分析维度">
            <Select mode="multiple" placeholder="请选择分析维度">
              <Option value="policy">政策法规</Option>
              <Option value="market_size">市场规模</Option>
              <Option value="growth_trend">增长趋势</Option>
              <Option value="consumer_behavior">消费行为</Option>
              <Option value="competitor_analysis">竞品分析</Option>
              <Option value="price_analysis">价格分析</Option>
              <Option value="channel_analysis">渠道分析</Option>
              <Option value="brand_analysis">品牌分析</Option>
            </Select>
          </Form.Item>
          <Form.Item label="数据源">
            <Select mode="multiple" placeholder="请选择数据源">
              <Option value="industry_report">行业报告</Option>
              <Option value="government_data">政府数据</Option>
              <Option value="survey_data">调研数据</Option>
              <Option value="competitor_data">竞品数据</Option>
              <Option value="internal_data">内部数据</Option>
              <Option value="third_party">第三方数据</Option>
            </Select>
          </Form.Item>
          <Form.Item label="分析深度">
            <Select placeholder="请选择分析深度">
              <Option value="basic">基础分析</Option>
              <Option value="detailed">详细分析</Option>
              <Option value="comprehensive">全面分析</Option>
            </Select>
          </Form.Item>
          <Form.Item label="特殊要求">
            <TextArea rows={3} placeholder="请输入特殊分析要求或关注点..." />
          </Form.Item>
        </Form>

        <Alert
          message="AI生成提示"
          description="系统将基于您选择的维度和数据源，利用大语言模型和数据分析算法生成专业的市场分析报告。预计生成时间：3-5分钟。"
          type="info"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Modal>

      {/* 智能分解目标模态框 */}
      <Modal
        title="智能分解设计目标"
        open={targetModalVisible}
        onCancel={() => setTargetModalVisible(false)}
        width={700}
        footer={[
          <Button key="cancel" onClick={() => setTargetModalVisible(false)}>
            取消
          </Button>,
          <Button key="decompose" type="primary" icon={<ThunderboltOutlined />}>
            开始分解
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="项目名称">
            <Select placeholder="请选择项目">
              <Option value="DP001">焦甜香系列产品设计</Option>
              <Option value="DP002">经典品牌口感优化</Option>
              <Option value="DP003">低焦油健康型产品研发</Option>
            </Select>
          </Form.Item>
          <Form.Item label="总体目标">
            <TextArea rows={3} placeholder="请输入项目的总体目标描述..." />
          </Form.Item>
          <Form.Item label="分解维度">
            <Select mode="multiple" placeholder="请选择目标分解维度">
              <Option value="formula">叶组配方</Option>
              <Option value="flavor">香精香料</Option>
              <Option value="material">辅助材料</Option>
              <Option value="process">加工工艺</Option>
              <Option value="packaging">包装设计</Option>
              <Option value="cost">成本控制</Option>
              <Option value="quality">质量标准</Option>
              <Option value="market">市场定位</Option>
            </Select>
          </Form.Item>
          <Form.Item label="优先级权重">
            <div>
              <div style={{ marginBottom: 8 }}>质量目标权重: <Progress percent={40} size="small" /></div>
              <div style={{ marginBottom: 8 }}>成本目标权重: <Progress percent={30} size="small" strokeColor="#faad14" /></div>
              <div style={{ marginBottom: 8 }}>时间目标权重: <Progress percent={20} size="small" strokeColor="#722ed1" /></div>
              <div>创新目标权重: <Progress percent={10} size="small" strokeColor="#13c2c2" /></div>
            </div>
          </Form.Item>
          <Form.Item label="约束条件">
            <TextArea rows={2} placeholder="请输入项目约束条件（如预算限制、时间要求等）..." />
          </Form.Item>
        </Form>

        <Alert
          message="智能分解说明"
          description="系统将基于项目总体目标，结合行业最佳实践和历史数据，智能分解为各环节的具体设计目标和KPI指标。"
          type="info"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Modal>
    </div>
  )
}

export default DesignPlanning
