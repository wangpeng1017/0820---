import React, { useState } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Modal, Form, Input, Select, Progress, Alert, Timeline, DatePicker, InputNumber, Divider } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExperimentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  BarChartOutlined,
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  FilterOutlined,
  SyncOutlined,
  WarningOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

// 实验类型枚举
enum ExperimentType {
  PILOT_TEST = 'pilot_test',
  PROJECT_RESEARCH = 'project_research',
  MATERIAL_TESTING = 'material_testing'
}

// 实验状态枚举
enum ExperimentStatus {
  PLANNED = 'planned',
  SCHEDULED = 'scheduled',
  RUNNING = 'running',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  FAILED = 'failed'
}

// 在线实验接口
interface OnlineExperiment {
  id: string
  name: string
  type: ExperimentType
  description: string
  projectId: string
  projectName: string
  requester: string
  requestTime: string
  plannedStartTime: string
  plannedEndTime: string
  actualStartTime?: string
  actualEndTime?: string
  status: ExperimentStatus
  priority: 'low' | 'medium' | 'high' | 'urgent'
  equipment: string[]
  materials: string[]
  personnel: string[]
  progress: number
  results?: string
  notes?: string
  estimatedDuration: number // 小时
  actualDuration?: number // 小时
}

// 样品烟接口
interface SampleCigarette {
  id: string
  name: string
  batchNumber: string
  productLine: string
  quantity: number
  unit: 'pack' | 'carton' | 'piece'
  receiveDate: string
  expiryDate: string
  storageLocation: string
  status: 'available' | 'reserved' | 'in_use' | 'consumed' | 'expired'
  source: 'internal' | 'external'
  requester?: string
  purpose?: string
  usageRecords: UsageRecord[]
  qualityCheck: boolean
  notes?: string
}

// 使用记录接口
interface UsageRecord {
  id: string
  experimentId: string
  experimentName: string
  usedQuantity: number
  usedDate: string
  operator: string
  purpose: string
  remainingQuantity: number
}

const OnlineExperiment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('experiments')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [sampleModalVisible, setSampleModalVisible] = useState(false)
  const [usageModalVisible, setUsageModalVisible] = useState(false)

  // 模拟在线实验数据
  const experiments: OnlineExperiment[] = [
    {
      id: 'EXP001',
      name: '焦甜香系列中试验证',
      type: ExperimentType.PILOT_TEST,
      description: '焦甜香系列新配方的中试生产验证实验',
      projectId: 'PRJ001',
      projectName: '焦甜香系列产品开发',
      requester: '张项目',
      requestTime: '2024-03-20 09:30:00',
      plannedStartTime: '2024-03-25 08:00:00',
      plannedEndTime: '2024-03-27 18:00:00',
      actualStartTime: '2024-03-25 08:15:00',
      status: ExperimentStatus.RUNNING,
      priority: 'high',
      equipment: ['中试生产线1号', '质量检测设备A组'],
      materials: ['云南烟叶', '贵州烟叶', '香精香料包'],
      personnel: ['李工艺', '王质检', '赵操作'],
      progress: 65,
      estimatedDuration: 58,
      actualDuration: 38,
      notes: '目前进展顺利，质量指标符合预期'
    },
    {
      id: 'EXP002',
      name: '新型滤棒材料性能测试',
      type: ExperimentType.MATERIAL_TESTING,
      description: '测试新型生物降解滤棒材料的过滤性能和稳定性',
      projectId: 'PRJ002',
      projectName: '环保材料研究',
      requester: '孙材料',
      requestTime: '2024-03-22 14:20:00',
      plannedStartTime: '2024-03-28 09:00:00',
      plannedEndTime: '2024-03-30 17:00:00',
      status: ExperimentStatus.SCHEDULED,
      priority: 'medium',
      equipment: ['材料测试仪', '环境模拟箱'],
      materials: ['生物降解滤棒样品', '标准测试烟丝'],
      personnel: ['钱测试', '周分析'],
      progress: 0,
      estimatedDuration: 56,
      notes: '等待材料样品到货'
    },
    {
      id: 'EXP003',
      name: '包装材料阻隔性研究',
      type: ExperimentType.PROJECT_RESEARCH,
      description: '研究不同包装材料对卷烟保香性能的影响',
      projectId: 'PRJ003',
      projectName: '包装优化项目',
      requester: '吴包装',
      requestTime: '2024-03-18 11:45:00',
      plannedStartTime: '2024-03-24 10:00:00',
      plannedEndTime: '2024-03-26 16:00:00',
      actualStartTime: '2024-03-24 10:30:00',
      actualEndTime: '2024-03-26 15:45:00',
      status: ExperimentStatus.COMPLETED,
      priority: 'medium',
      equipment: ['气相色谱仪', '包装密封测试仪'],
      materials: ['不同包装材料样品', '标准卷烟样品'],
      personnel: ['郑研究', '冯分析'],
      progress: 100,
      estimatedDuration: 54,
      actualDuration: 53,
      results: '铝箔复合材料保香性能最佳，建议采用',
      notes: '实验结果已整理成报告'
    },
    {
      id: 'EXP004',
      name: '香精稳定性加速老化试验',
      type: ExperimentType.PROJECT_RESEARCH,
      description: '通过加速老化试验评估香精在不同环境条件下的稳定性',
      projectId: 'PRJ004',
      projectName: '香精稳定性研究',
      requester: '陈香精',
      requestTime: '2024-03-25 16:30:00',
      plannedStartTime: '2024-04-01 08:00:00',
      plannedEndTime: '2024-04-15 18:00:00',
      status: ExperimentStatus.PLANNED,
      priority: 'low',
      equipment: ['恒温恒湿箱', 'GC-MS设备'],
      materials: ['香精样品A-E', '对照样品'],
      personnel: ['刘香精', '马分析'],
      progress: 0,
      estimatedDuration: 336, // 14天
      notes: '需要预约恒温恒湿箱使用时间'
    },
    {
      id: 'EXP005',
      name: '卷烟燃烧特性优化实验',
      type: ExperimentType.PILOT_TEST,
      description: '优化卷烟纸透气度对燃烧特性的影响',
      projectId: 'PRJ005',
      projectName: '燃烧性能优化',
      requester: '朱工艺',
      requestTime: '2024-03-26 10:15:00',
      plannedStartTime: '2024-03-29 09:00:00',
      plannedEndTime: '2024-03-31 17:00:00',
      status: ExperimentStatus.SCHEDULED,
      priority: 'high',
      equipment: ['燃烧特性测试仪', '烟气分析仪'],
      materials: ['不同透气度卷烟纸', '标准烟丝'],
      personnel: ['徐工艺', '杨测试'],
      progress: 0,
      estimatedDuration: 56,
      notes: '高优先级实验，需要优先安排'
    },
    {
      id: 'EXP006',
      name: '新品感官评价实验',
      type: ExperimentType.PROJECT_RESEARCH,
      description: '对新开发产品进行专业感官评价和消费者测试',
      projectId: 'PRJ006',
      projectName: '新品开发项目',
      requester: '袁感官',
      requestTime: '2024-03-27 13:40:00',
      plannedStartTime: '2024-04-02 14:00:00',
      plannedEndTime: '2024-04-04 17:00:00',
      status: ExperimentStatus.PLANNED,
      priority: 'medium',
      equipment: ['感官评价室', '数据采集系统'],
      materials: ['新品样品', '对照样品'],
      personnel: ['感官评价小组', '数据分析师'],
      progress: 0,
      estimatedDuration: 51,
      notes: '需要协调感官评价员时间'
    },
    {
      id: 'EXP007',
      name: '工艺参数优化DOE实验',
      type: ExperimentType.MATERIAL_TESTING,
      description: '使用DOE方法优化制丝工艺关键参数',
      projectId: 'PRJ007',
      projectName: '工艺优化项目',
      requester: '韩工艺',
      requestTime: '2024-03-28 09:25:00',
      plannedStartTime: '2024-04-03 08:00:00',
      plannedEndTime: '2024-04-10 18:00:00',
      status: ExperimentStatus.PLANNED,
      priority: 'medium',
      equipment: ['制丝试验线', '在线检测设备'],
      materials: ['试验用烟叶', '香精香料'],
      personnel: ['DOE专家', '工艺工程师'],
      progress: 0,
      estimatedDuration: 184, // 7天多
      notes: 'DOE实验设计已完成，等待排产'
    },
    {
      id: 'EXP008',
      name: '包装密封性能测试',
      type: ExperimentType.MATERIAL_TESTING,
      description: '测试新包装方案的密封性能和保鲜效果',
      projectId: 'PRJ008',
      projectName: '包装改进项目',
      requester: '曹包装',
      requestTime: '2024-03-29 15:50:00',
      plannedStartTime: '2024-04-05 10:00:00',
      plannedEndTime: '2024-04-07 16:00:00',
      status: ExperimentStatus.PLANNED,
      priority: 'low',
      equipment: ['密封性测试仪', '气体分析仪'],
      materials: ['包装样品', '测试气体'],
      personnel: ['包装工程师', '测试技术员'],
      progress: 0,
      estimatedDuration: 54,
      notes: '等待包装样品制作完成'
    }
  ]

  // 模拟样品烟数据
  const sampleCigarettes: SampleCigarette[] = [
    {
      id: 'SC001',
      name: '焦甜香系列样品烟',
      batchNumber: 'FS202403001',
      productLine: '焦甜香系列',
      quantity: 50,
      unit: 'pack',
      receiveDate: '2024-03-20',
      expiryDate: '2024-06-20',
      storageLocation: '样品库A区-01',
      status: 'in_use',
      source: 'internal',
      requester: '张项目',
      purpose: '中试验证实验',
      usageRecords: [
        {
          id: 'UR001',
          experimentId: 'EXP001',
          experimentName: '焦甜香系列中试验证',
          usedQuantity: 15,
          usedDate: '2024-03-25',
          operator: '李工艺',
          purpose: '工艺验证',
          remainingQuantity: 35
        }
      ],
      qualityCheck: true,
      notes: '质量检验合格，可用于实验'
    },
    {
      id: 'SC002',
      name: '高端系列对照样品',
      batchNumber: 'GD202403002',
      productLine: '高端系列',
      quantity: 30,
      unit: 'pack',
      receiveDate: '2024-03-22',
      expiryDate: '2024-06-22',
      storageLocation: '样品库A区-02',
      status: 'available',
      source: 'internal',
      qualityCheck: true,
      usageRecords: []
    },
    {
      id: 'SC003',
      name: '竞品分析样品A',
      batchNumber: 'JP202403003',
      productLine: '竞品分析',
      quantity: 20,
      unit: 'pack',
      receiveDate: '2024-03-18',
      expiryDate: '2024-05-18',
      storageLocation: '样品库B区-01',
      status: 'reserved',
      source: 'external',
      requester: '吴包装',
      purpose: '包装材料对比研究',
      qualityCheck: true,
      usageRecords: [],
      notes: '外购竞品，用于对比分析'
    },
    {
      id: 'SC004',
      name: '环保材料测试样品',
      batchNumber: 'HB202403004',
      productLine: '环保系列',
      quantity: 40,
      unit: 'pack',
      receiveDate: '2024-03-25',
      expiryDate: '2024-06-25',
      storageLocation: '样品库A区-03',
      status: 'available',
      source: 'internal',
      qualityCheck: true,
      usageRecords: []
    },
    {
      id: 'SC005',
      name: '新型滤棒测试样品',
      batchNumber: 'LB202403005',
      productLine: '材料测试',
      quantity: 100,
      unit: 'piece',
      receiveDate: '2024-03-26',
      expiryDate: '2024-09-26',
      storageLocation: '样品库C区-01',
      status: 'available',
      source: 'internal',
      qualityCheck: false,
      usageRecords: [],
      notes: '待质量检验'
    },
    {
      id: 'SC006',
      name: '香精稳定性测试样品',
      batchNumber: 'XJ202403006',
      productLine: '香精研究',
      quantity: 25,
      unit: 'pack',
      receiveDate: '2024-03-28',
      expiryDate: '2024-06-28',
      storageLocation: '样品库A区-04',
      status: 'available',
      source: 'internal',
      qualityCheck: true,
      usageRecords: []
    },
    {
      id: 'SC007',
      name: '燃烧特性优化样品',
      batchNumber: 'RS202403007',
      productLine: '工艺优化',
      quantity: 35,
      unit: 'pack',
      receiveDate: '2024-03-29',
      expiryDate: '2024-06-29',
      storageLocation: '样品库A区-05',
      status: 'reserved',
      source: 'internal',
      requester: '朱工艺',
      purpose: '燃烧特性优化实验',
      qualityCheck: true,
      usageRecords: []
    },
    {
      id: 'SC008',
      name: '感官评价专用样品',
      batchNumber: 'SG202403008',
      productLine: '新品开发',
      quantity: 60,
      unit: 'pack',
      receiveDate: '2024-03-30',
      expiryDate: '2024-06-30',
      storageLocation: '样品库B区-02',
      status: 'available',
      source: 'internal',
      qualityCheck: true,
      usageRecords: [],
      notes: '专用于感官评价，请勿用于其他实验'
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">在线试验管理</h1>
        <p className="page-description">
          在线实验排产管理、样品烟闭环管理、试验资源协调
        </p>
      </div>

      {/* 统计概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="实验总数"
              value={experiments.length}
              prefix={<ExperimentOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="进行中实验"
              value={experiments.filter(e => e.status === ExperimentStatus.RUNNING).length}
              prefix={<PlayCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="样品库存"
              value={sampleCigarettes.reduce((sum, s) => sum + s.quantity, 0)}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="设备利用率"
              value={78}
              suffix="%"
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="实验排产" key="experiments" icon={<ExperimentOutlined />}>
          <Card 
            title="在线实验管理" 
            extra={
              <Space>
                <Button 
                  icon={<CalendarOutlined />}
                >
                  排产日历
                </Button>
                <Button 
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setModalType('create')
                    setSelectedRecord(null)
                    setModalVisible(true)
                  }}
                >
                  新建实验
                </Button>
              </Space>
            }
          >
            <Space style={{ marginBottom: 16 }}>
              <Select
                placeholder="实验类型"
                style={{ width: 150 }}
                allowClear
              >
                <Option value="pilot_test">产品中试</Option>
                <Option value="project_research">项目研究</Option>
                <Option value="material_testing">材料上机</Option>
              </Select>
              <Select
                placeholder="实验状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="planned">计划中</Option>
                <Option value="scheduled">已排产</Option>
                <Option value="running">进行中</Option>
                <Option value="completed">已完成</Option>
                <Option value="cancelled">已取消</Option>
              </Select>
              <Select
                placeholder="优先级"
                style={{ width: 100 }}
                allowClear
              >
                <Option value="urgent">紧急</Option>
                <Option value="high">高</Option>
                <Option value="medium">中</Option>
                <Option value="low">低</Option>
              </Select>
              <RangePicker placeholder={['开始时间', '结束时间']} />
            </Space>

            <Table
              columns={[
                {
                  title: '实验名称',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => <a>{text}</a>
                },
                {
                  title: '实验类型',
                  dataIndex: 'type',
                  key: 'type',
                  render: (type: ExperimentType) => {
                    const typeConfigs = {
                      pilot_test: { color: 'blue', text: '产品中试' },
                      project_research: { color: 'green', text: '项目研究' },
                      material_testing: { color: 'orange', text: '材料上机' }
                    }
                    const config = typeConfigs[type]
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
                  title: '申请人',
                  dataIndex: 'requester',
                  key: 'requester'
                },
                {
                  title: '计划时间',
                  key: 'plannedTime',
                  render: (record: OnlineExperiment) => (
                    <div>
                      <div>{record.plannedStartTime.split(' ')[0]}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {record.plannedStartTime.split(' ')[1]} - {record.plannedEndTime.split(' ')[1]}
                      </div>
                    </div>
                  )
                },
                {
                  title: '优先级',
                  dataIndex: 'priority',
                  key: 'priority',
                  render: (priority: string) => {
                    const priorityConfigs = {
                      urgent: { color: 'red', text: '紧急' },
                      high: { color: 'orange', text: '高' },
                      medium: { color: 'blue', text: '中' },
                      low: { color: 'green', text: '低' }
                    }
                    const config = priorityConfigs[priority as keyof typeof priorityConfigs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: ExperimentStatus) => {
                    const statusConfigs = {
                      planned: { color: 'default', text: '计划中', icon: <ClockCircleOutlined /> },
                      scheduled: { color: 'blue', text: '已排产', icon: <CalendarOutlined /> },
                      running: { color: 'green', text: '进行中', icon: <PlayCircleOutlined /> },
                      paused: { color: 'orange', text: '已暂停', icon: <PauseCircleOutlined /> },
                      completed: { color: 'cyan', text: '已完成', icon: <CheckCircleOutlined /> },
                      cancelled: { color: 'red', text: '已取消', icon: <StopOutlined /> },
                      failed: { color: 'red', text: '失败', icon: <ExclamationCircleOutlined /> }
                    }
                    const config = statusConfigs[status]
                    return <Tag color={config.color} icon={config.icon}>{config.text}</Tag>
                  }
                },
                {
                  title: '进度',
                  dataIndex: 'progress',
                  key: 'progress',
                  render: (progress: number) => (
                    <Progress 
                      percent={progress} 
                      size="small" 
                      status={progress === 100 ? 'success' : progress > 0 ? 'active' : 'normal'}
                    />
                  )
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (record: OnlineExperiment) => (
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
                        disabled={record.status === ExperimentStatus.COMPLETED}
                      >
                        编辑
                      </Button>
                      {record.status === ExperimentStatus.RUNNING && (
                        <Button 
                          type="link" 
                          icon={<PauseCircleOutlined />} 
                          size="small"
                        >
                          暂停
                        </Button>
                      )}
                      {record.status === ExperimentStatus.PAUSED && (
                        <Button 
                          type="link" 
                          icon={<PlayCircleOutlined />} 
                          size="small"
                        >
                          继续
                        </Button>
                      )}
                    </Space>
                  )
                }
              ]}
              dataSource={experiments}
              rowKey="id"
              pagination={{
                total: experiments.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="样品烟管理" key="samples" icon={<FileTextOutlined />}>
          <Card
            title="样品烟闭环管理"
            extra={
              <Space>
                <Button
                  icon={<BellOutlined />}
                >
                  库存预警
                </Button>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setSelectedRecord(null)
                    setSampleModalVisible(true)
                  }}
                >
                  新增样品
                </Button>
              </Space>
            }
          >
            <Space style={{ marginBottom: 16 }}>
              <Select
                placeholder="产品线"
                style={{ width: 150 }}
                allowClear
              >
                <Option value="焦甜香系列">焦甜香系列</Option>
                <Option value="高端系列">高端系列</Option>
                <Option value="环保系列">环保系列</Option>
                <Option value="竞品分析">竞品分析</Option>
                <Option value="材料测试">材料测试</Option>
              </Select>
              <Select
                placeholder="样品状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="available">可用</Option>
                <Option value="reserved">预留</Option>
                <Option value="in_use">使用中</Option>
                <Option value="consumed">已消耗</Option>
                <Option value="expired">已过期</Option>
              </Select>
              <Select
                placeholder="来源"
                style={{ width: 100 }}
                allowClear
              >
                <Option value="internal">内部</Option>
                <Option value="external">外部</Option>
              </Select>
              <Input
                placeholder="搜索样品名称或批次号"
                prefix={<SearchOutlined />}
                style={{ width: 200 }}
              />
            </Space>

            <Table
              columns={[
                {
                  title: '样品名称',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => <a>{text}</a>
                },
                {
                  title: '批次号',
                  dataIndex: 'batchNumber',
                  key: 'batchNumber',
                  render: (batch: string) => <Tag color="blue">{batch}</Tag>
                },
                {
                  title: '产品线',
                  dataIndex: 'productLine',
                  key: 'productLine',
                  render: (line: string) => <Tag>{line}</Tag>
                },
                {
                  title: '库存数量',
                  key: 'quantity',
                  render: (record: SampleCigarette) => (
                    <div>
                      <span style={{ fontWeight: 'bold' }}>{record.quantity}</span>
                      <span style={{ marginLeft: 4, color: '#666' }}>
                        {record.unit === 'pack' ? '包' : record.unit === 'carton' ? '条' : '支'}
                      </span>
                    </div>
                  )
                },
                {
                  title: '存储位置',
                  dataIndex: 'storageLocation',
                  key: 'storageLocation'
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => {
                    const statusConfigs = {
                      available: { color: 'green', text: '可用' },
                      reserved: { color: 'blue', text: '预留' },
                      in_use: { color: 'orange', text: '使用中' },
                      consumed: { color: 'red', text: '已消耗' },
                      expired: { color: 'red', text: '已过期' }
                    }
                    const config = statusConfigs[status as keyof typeof statusConfigs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '来源',
                  dataIndex: 'source',
                  key: 'source',
                  render: (source: string) => (
                    <Tag color={source === 'internal' ? 'green' : 'orange'}>
                      {source === 'internal' ? '内部' : '外部'}
                    </Tag>
                  )
                },
                {
                  title: '质检状态',
                  dataIndex: 'qualityCheck',
                  key: 'qualityCheck',
                  render: (checked: boolean) => (
                    <Tag color={checked ? 'green' : 'red'} icon={checked ? <CheckCircleOutlined /> : <WarningOutlined />}>
                      {checked ? '已检验' : '待检验'}
                    </Tag>
                  )
                },
                {
                  title: '到期日期',
                  dataIndex: 'expiryDate',
                  key: 'expiryDate',
                  render: (date: string) => {
                    const isExpiringSoon = new Date(date) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    return (
                      <span style={{ color: isExpiringSoon ? '#f5222d' : '#000' }}>
                        {date}
                        {isExpiringSoon && <WarningOutlined style={{ marginLeft: 4, color: '#f5222d' }} />}
                      </span>
                    )
                  }
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (record: SampleCigarette) => (
                    <Space size="middle">
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => {
                          setSelectedRecord(record)
                          setSampleModalVisible(true)
                        }}
                      >
                        查看
                      </Button>
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        size="small"
                        disabled={record.status === 'consumed' || record.status === 'expired'}
                      >
                        编辑
                      </Button>
                      <Button
                        type="link"
                        icon={<FileTextOutlined />}
                        size="small"
                        onClick={() => {
                          setSelectedRecord(record)
                          setUsageModalVisible(true)
                        }}
                      >
                        使用记录
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={sampleCigarettes}
              rowKey="id"
              pagination={{
                total: sampleCigarettes.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="资源监控" key="monitoring" icon={<BarChartOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="设备使用情况" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>中试生产线1号</span>
                      <span style={{ color: '#52c41a' }}>使用中</span>
                    </div>
                    <Progress percent={85} size="small" status="active" />
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      当前实验: 焦甜香系列中试验证 (剩余13小时)
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>质量检测设备A组</span>
                      <span style={{ color: '#52c41a' }}>使用中</span>
                    </div>
                    <Progress percent={65} size="small" status="active" />
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      当前实验: 焦甜香系列中试验证 (剩余20小时)
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>材料测试仪</span>
                      <span style={{ color: '#faad14' }}>预约中</span>
                    </div>
                    <Progress percent={0} size="small" />
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      下次使用: 2024-03-28 09:00 (新型滤棒材料性能测试)
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>环境模拟箱</span>
                      <span style={{ color: '#1890ff' }}>空闲</span>
                    </div>
                    <Progress percent={0} size="small" />
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      可立即使用
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>气相色谱仪</span>
                      <span style={{ color: '#1890ff' }}>空闲</span>
                    </div>
                    <Progress percent={0} size="small" />
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      可立即使用
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="人员安排" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 8 }}>当前在岗人员</div>
                    <div style={{ marginBottom: 4 }}>
                      <Tag color="green">李工艺</Tag>
                      <span style={{ fontSize: '12px', color: '#666' }}>- 焦甜香系列中试验证</span>
                    </div>
                    <div style={{ marginBottom: 4 }}>
                      <Tag color="green">王质检</Tag>
                      <span style={{ fontSize: '12px', color: '#666' }}>- 焦甜香系列中试验证</span>
                    </div>
                    <div style={{ marginBottom: 4 }}>
                      <Tag color="green">赵操作</Tag>
                      <span style={{ fontSize: '12px', color: '#666' }}>- 焦甜香系列中试验证</span>
                    </div>
                  </div>

                  <Divider style={{ margin: '12px 0' }} />

                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 8 }}>明日排班计划</div>
                    <div style={{ marginBottom: 4 }}>
                      <Tag color="blue">钱测试</Tag>
                      <span style={{ fontSize: '12px', color: '#666' }}>- 新型滤棒材料性能测试</span>
                    </div>
                    <div style={{ marginBottom: 4 }}>
                      <Tag color="blue">周分析</Tag>
                      <span style={{ fontSize: '12px', color: '#666' }}>- 新型滤棒材料性能测试</span>
                    </div>
                    <div style={{ marginBottom: 4 }}>
                      <Tag color="blue">徐工艺</Tag>
                      <span style={{ fontSize: '12px', color: '#666' }}>- 卷烟燃烧特性优化实验</span>
                    </div>
                    <div style={{ marginBottom: 4 }}>
                      <Tag color="blue">杨测试</Tag>
                      <span style={{ fontSize: '12px', color: '#666' }}>- 卷烟燃烧特性优化实验</span>
                    </div>
                  </div>

                  <Divider style={{ margin: '12px 0' }} />

                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 8 }}>可调配人员</div>
                    <div>
                      <Tag>郑研究</Tag>
                      <Tag>冯分析</Tag>
                      <Tag>刘香精</Tag>
                      <Tag>马分析</Tag>
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>

          <Card title="实验排产甘特图" style={{ marginTop: 16 }}>
            <div style={{
              height: 300,
              background: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #d9d9d9'
            }}>
              <div style={{ textAlign: 'center', color: '#999' }}>
                <CalendarOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                <div>实验排产甘特图</div>
                <div style={{ fontSize: '12px' }}>显示所有实验的时间安排和资源分配</div>
              </div>
            </div>
          </Card>
        </TabPane>
      </Tabs>

      {/* 实验详情模态框 */}
      <Modal
        title={
          modalType === 'create' ? '新建实验' :
          modalType === 'edit' ? '编辑实验' : '实验详情'
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={900}
        footer={modalType === 'view' ? [
          <Button key="close" onClick={() => setModalVisible(false)}>
            关闭
          </Button>
        ] : [
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary">
            {modalType === 'create' ? '创建' : '保存'}
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="实验名称">
                <Input
                  placeholder="请输入实验名称"
                  defaultValue={selectedRecord?.name}
                  disabled={modalType === 'view'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="实验类型">
                <Select
                  placeholder="请选择实验类型"
                  defaultValue={selectedRecord?.type}
                  disabled={modalType === 'view'}
                >
                  <Option value="pilot_test">产品中试</Option>
                  <Option value="project_research">项目研究</Option>
                  <Option value="material_testing">材料上机</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="实验描述">
            <TextArea
              rows={3}
              placeholder="请输入实验描述"
              defaultValue={selectedRecord?.description}
              disabled={modalType === 'view'}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="关联项目">
                <Select
                  placeholder="请选择关联项目"
                  defaultValue={selectedRecord?.projectId}
                  disabled={modalType === 'view'}
                >
                  <Option value="PRJ001">焦甜香系列产品开发</Option>
                  <Option value="PRJ002">环保材料研究</Option>
                  <Option value="PRJ003">包装优化项目</Option>
                  <Option value="PRJ004">香精稳定性研究</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="优先级">
                <Select
                  placeholder="请选择优先级"
                  defaultValue={selectedRecord?.priority}
                  disabled={modalType === 'view'}
                >
                  <Option value="urgent">紧急</Option>
                  <Option value="high">高</Option>
                  <Option value="medium">中</Option>
                  <Option value="low">低</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="计划开始时间">
                <DatePicker
                  showTime
                  style={{ width: '100%' }}
                  disabled={modalType === 'view'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="计划结束时间">
                <DatePicker
                  showTime
                  style={{ width: '100%' }}
                  disabled={modalType === 'view'}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="预计时长(小时)">
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入预计时长"
                  defaultValue={selectedRecord?.estimatedDuration}
                  disabled={modalType === 'view'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="申请人">
                <Input
                  placeholder="请输入申请人"
                  defaultValue={selectedRecord?.requester}
                  disabled={modalType === 'view'}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="所需设备">
                <Select
                  mode="multiple"
                  placeholder="请选择设备"
                  defaultValue={selectedRecord?.equipment}
                  disabled={modalType === 'view'}
                >
                  <Option value="中试生产线1号">中试生产线1号</Option>
                  <Option value="质量检测设备A组">质量检测设备A组</Option>
                  <Option value="材料测试仪">材料测试仪</Option>
                  <Option value="环境模拟箱">环境模拟箱</Option>
                  <Option value="气相色谱仪">气相色谱仪</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="所需材料">
                <Select
                  mode="multiple"
                  placeholder="请选择材料"
                  defaultValue={selectedRecord?.materials}
                  disabled={modalType === 'view'}
                >
                  <Option value="云南烟叶">云南烟叶</Option>
                  <Option value="贵州烟叶">贵州烟叶</Option>
                  <Option value="香精香料包">香精香料包</Option>
                  <Option value="生物降解滤棒样品">生物降解滤棒样品</Option>
                  <Option value="标准测试烟丝">标准测试烟丝</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="参与人员">
                <Select
                  mode="multiple"
                  placeholder="请选择人员"
                  defaultValue={selectedRecord?.personnel}
                  disabled={modalType === 'view'}
                >
                  <Option value="李工艺">李工艺</Option>
                  <Option value="王质检">王质检</Option>
                  <Option value="赵操作">赵操作</Option>
                  <Option value="钱测试">钱测试</Option>
                  <Option value="周分析">周分析</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {selectedRecord && modalType === 'view' && (
            <>
              <Divider>实验进展</Divider>
              <Row gutter={16}>
                <Col span={12}>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ marginBottom: 8 }}>实验进度</div>
                    <Progress percent={selectedRecord.progress} />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>时间进度</div>
                    <Progress
                      percent={selectedRecord.actualDuration ? Math.round((selectedRecord.actualDuration / selectedRecord.estimatedDuration) * 100) : 0}
                      strokeColor="#faad14"
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ marginBottom: 8 }}>实验状态</div>
                  <Tag color="green" icon={<PlayCircleOutlined />} style={{ marginBottom: 16 }}>
                    {selectedRecord.status === 'running' ? '进行中' : '其他状态'}
                  </Tag>

                  <div style={{ marginBottom: 8 }}>实际用时</div>
                  <div style={{ marginBottom: 16 }}>
                    {selectedRecord.actualDuration ? `${selectedRecord.actualDuration}小时` : '未开始'} / {selectedRecord.estimatedDuration}小时
                  </div>

                  {selectedRecord.results && (
                    <>
                      <div style={{ marginBottom: 8 }}>实验结果</div>
                      <div style={{ padding: 8, background: '#f5f5f5', borderRadius: 4 }}>
                        {selectedRecord.results}
                      </div>
                    </>
                  )}
                </Col>
              </Row>
            </>
          )}

          <Form.Item label="备注">
            <TextArea
              rows={2}
              placeholder="请输入备注信息"
              defaultValue={selectedRecord?.notes}
              disabled={modalType === 'view'}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 样品详情模态框 */}
      <Modal
        title="样品烟详情"
        open={sampleModalVisible}
        onCancel={() => setSampleModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setSampleModalVisible(false)}>
            关闭
          </Button>,
          <Button key="edit" type="primary">
            编辑
          </Button>
        ]}
      >
        {selectedRecord && (
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="样品名称">
                  <Input value={selectedRecord.name} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="批次号">
                  <Input value={selectedRecord.batchNumber} disabled />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="产品线">
                  <Input value={selectedRecord.productLine} disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="库存数量">
                  <Input value={`${selectedRecord.quantity} ${selectedRecord.unit === 'pack' ? '包' : selectedRecord.unit === 'carton' ? '条' : '支'}`} disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="存储位置">
                  <Input value={selectedRecord.storageLocation} disabled />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="接收日期">
                  <Input value={selectedRecord.receiveDate} disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="到期日期">
                  <Input value={selectedRecord.expiryDate} disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="来源">
                  <Input value={selectedRecord.source === 'internal' ? '内部' : '外部'} disabled />
                </Form.Item>
              </Col>
            </Row>

            {selectedRecord.requester && (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="申请人">
                    <Input value={selectedRecord.requester} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="用途">
                    <Input value={selectedRecord.purpose} disabled />
                  </Form.Item>
                </Col>
              </Row>
            )}

            <Form.Item label="备注">
              <TextArea value={selectedRecord.notes || '无'} disabled rows={2} />
            </Form.Item>

            {selectedRecord.usageRecords && selectedRecord.usageRecords.length > 0 && (
              <>
                <Divider>使用记录</Divider>
                <Table
                  size="small"
                  columns={[
                    { title: '实验名称', dataIndex: 'experimentName', key: 'experimentName' },
                    { title: '使用数量', dataIndex: 'usedQuantity', key: 'usedQuantity' },
                    { title: '使用日期', dataIndex: 'usedDate', key: 'usedDate' },
                    { title: '操作人', dataIndex: 'operator', key: 'operator' },
                    { title: '用途', dataIndex: 'purpose', key: 'purpose' }
                  ]}
                  dataSource={selectedRecord.usageRecords}
                  pagination={false}
                />
              </>
            )}
          </Form>
        )}
      </Modal>

      {/* 使用记录模态框 */}
      <Modal
        title="样品使用记录"
        open={usageModalVisible}
        onCancel={() => setUsageModalVisible(false)}
        width={700}
        footer={[
          <Button key="close" onClick={() => setUsageModalVisible(false)}>
            关闭
          </Button>,
          <Button key="add" type="primary">
            新增使用记录
          </Button>
        ]}
      >
        {selectedRecord && (
          <div>
            <Alert
              message={`样品: ${selectedRecord.name}`}
              description={`批次号: ${selectedRecord.batchNumber} | 当前库存: ${selectedRecord.quantity} ${selectedRecord.unit === 'pack' ? '包' : selectedRecord.unit === 'carton' ? '条' : '支'}`}
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />

            <Table
              size="small"
              columns={[
                { title: '实验名称', dataIndex: 'experimentName', key: 'experimentName' },
                { title: '使用数量', dataIndex: 'usedQuantity', key: 'usedQuantity' },
                { title: '使用日期', dataIndex: 'usedDate', key: 'usedDate' },
                { title: '操作人', dataIndex: 'operator', key: 'operator' },
                { title: '用途', dataIndex: 'purpose', key: 'purpose' },
                { title: '剩余数量', dataIndex: 'remainingQuantity', key: 'remainingQuantity' }
              ]}
              dataSource={selectedRecord.usageRecords || []}
              pagination={false}
            />

            {(!selectedRecord.usageRecords || selectedRecord.usageRecords.length === 0) && (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                暂无使用记录
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default OnlineExperiment
