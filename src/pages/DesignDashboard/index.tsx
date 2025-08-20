import React, { useState } from 'react'
import { Card, Row, Col, Statistic, Progress, Table, Tag, Button, Space, Timeline, Tabs, Select, DatePicker, Modal, Form, Input, InputNumber } from 'antd'
import {
  ProjectOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  BarChartOutlined,
  CalendarOutlined,
  UserOutlined,
  SettingOutlined,
  RocketOutlined,
  ExperimentOutlined,
  BulbOutlined,
  FileTextOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select
const { RangePicker } = DatePicker

// 设计项目接口
interface DesignProject {
  id: string
  name: string
  type: 'new_product' | 'optimization' | 'research'
  status: 'planning' | 'designing' | 'testing' | 'completed' | 'suspended'
  priority: 'high' | 'medium' | 'low'
  manager: string
  team: string[]
  startDate: string
  endDate: string
  progress: number
  budget: number
  actualCost: number
  description: string
  designPhases: DesignPhase[]
  milestones: Milestone[]
  resources: Resource[]
}

// 设计阶段接口
interface DesignPhase {
  id: string
  name: string
  type: 'planning' | 'formula' | 'flavor' | 'material' | 'process' | 'packaging' | 'testing'
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'
  assignee: string
  startDate: string
  endDate: string
  progress: number
  dependencies: string[]
  deliverables: string[]
}

// 里程碑接口
interface Milestone {
  id: string
  name: string
  date: string
  status: 'upcoming' | 'completed' | 'overdue'
  description: string
}

// 资源接口
interface Resource {
  id: string
  type: 'human' | 'equipment' | 'material' | 'budget'
  name: string
  allocated: number
  used: number
  unit: string
  status: 'available' | 'occupied' | 'shortage'
}

const DesignDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedProject, setSelectedProject] = useState<DesignProject | null>(null)

  // 模拟设计项目数据
  const designProjects: DesignProject[] = [
    {
      id: 'DP001',
      name: '新品牌"焦甜香"系列产品设计',
      type: 'new_product',
      status: 'designing',
      priority: 'high',
      manager: '张设计',
      team: ['李配方', '王香精', '赵工艺', '孙包装'],
      startDate: '2024-03-01',
      endDate: '2024-08-30',
      progress: 65,
      budget: 2500000,
      actualCost: 1625000,
      description: '面向年轻消费群体的焦甜香型卷烟产品设计',
      designPhases: [
        {
          id: 'PH001',
          name: '设计策划',
          type: 'planning',
          status: 'completed',
          assignee: '张设计',
          startDate: '2024-03-01',
          endDate: '2024-03-15',
          progress: 100,
          dependencies: [],
          deliverables: ['市场分析报告', '设计目标分解']
        },
        {
          id: 'PH002',
          name: '叶组配方设计',
          type: 'formula',
          status: 'in_progress',
          assignee: '李配方',
          startDate: '2024-03-16',
          endDate: '2024-05-15',
          progress: 80,
          dependencies: ['PH001'],
          deliverables: ['配方候选方案', '仿真验证报告']
        },
        {
          id: 'PH003',
          name: '香精香料设计',
          type: 'flavor',
          status: 'in_progress',
          assignee: '王香精',
          startDate: '2024-04-01',
          endDate: '2024-06-01',
          progress: 60,
          dependencies: ['PH002'],
          deliverables: ['香精配方', '感官评价报告']
        }
      ],
      milestones: [
        {
          id: 'MS001',
          name: '设计方案评审',
          date: '2024-05-30',
          status: 'upcoming',
          description: '完成初步设计方案的内部评审'
        },
        {
          id: 'MS002',
          name: '中试验证',
          date: '2024-07-15',
          status: 'upcoming',
          description: '进行中试生产验证'
        }
      ],
      resources: [
        {
          id: 'RS001',
          type: 'human',
          name: '设计团队',
          allocated: 4,
          used: 4,
          unit: '人',
          status: 'occupied'
        },
        {
          id: 'RS002',
          type: 'budget',
          name: '项目预算',
          allocated: 2500000,
          used: 1625000,
          unit: '元',
          status: 'available'
        }
      ]
    },
    {
      id: 'DP002',
      name: '经典品牌口感优化项目',
      type: 'optimization',
      status: 'testing',
      priority: 'medium',
      manager: '刘优化',
      team: ['陈配方', '林香精', '黄工艺'],
      startDate: '2024-02-15',
      endDate: '2024-06-30',
      progress: 85,
      budget: 1800000,
      actualCost: 1530000,
      description: '对现有经典品牌进行口感优化升级',
      designPhases: [],
      milestones: [],
      resources: []
    },
    {
      id: 'DP003',
      name: '低焦油健康型产品研发',
      type: 'research',
      status: 'planning',
      priority: 'high',
      manager: '周研发',
      team: ['吴配方', '郑材料', '冯工艺'],
      startDate: '2024-04-01',
      endDate: '2024-12-31',
      progress: 15,
      budget: 3200000,
      actualCost: 480000,
      description: '开发超低焦油健康型卷烟产品',
      designPhases: [],
      milestones: [],
      resources: []
    },
    {
      id: 'DP004',
      name: '新型烟草制品设计',
      type: 'new_product',
      status: 'designing',
      priority: 'high',
      manager: '韩创新',
      team: ['钱配方', '孙香精', '李材料', '王工艺'],
      startDate: '2024-03-20',
      endDate: '2024-10-20',
      progress: 45,
      budget: 4000000,
      actualCost: 1800000,
      description: '新型加热不燃烧烟草制品设计',
      designPhases: [],
      milestones: [],
      resources: []
    },
    {
      id: 'DP005',
      name: '包装材料环保升级',
      type: 'optimization',
      status: 'completed',
      priority: 'medium',
      manager: '马环保',
      team: ['杨包装', '徐材料'],
      startDate: '2024-01-10',
      endDate: '2024-04-10',
      progress: 100,
      budget: 1200000,
      actualCost: 1150000,
      description: '将现有包装材料升级为环保可降解材料',
      designPhases: [],
      milestones: [],
      resources: []
    },
    {
      id: 'DP006',
      name: '智能制造工艺优化',
      type: 'optimization',
      status: 'designing',
      priority: 'medium',
      manager: '田智能',
      team: ['白工艺', '何自动化', '许数据'],
      startDate: '2024-03-15',
      endDate: '2024-09-15',
      progress: 55,
      budget: 2800000,
      actualCost: 1540000,
      description: '基于AI和大数据的智能制造工艺优化',
      designPhases: [],
      milestones: [],
      resources: []
    },
    {
      id: 'DP007',
      name: '区域特色产品定制',
      type: 'new_product',
      status: 'planning',
      priority: 'low',
      manager: '范定制',
      team: ['曹配方', '邓香精'],
      startDate: '2024-05-01',
      endDate: '2024-11-30',
      progress: 8,
      budget: 1500000,
      actualCost: 120000,
      description: '针对不同区域消费习惯的定制化产品设计',
      designPhases: [],
      milestones: [],
      resources: []
    },
    {
      id: 'DP008',
      name: '成本控制优化项目',
      type: 'optimization',
      status: 'suspended',
      priority: 'low',
      manager: '史成本',
      team: ['唐配方', '宋采购'],
      startDate: '2024-02-01',
      endDate: '2024-07-31',
      progress: 25,
      budget: 800000,
      actualCost: 200000,
      description: '在保证质量前提下的成本控制优化',
      designPhases: [],
      milestones: [],
      resources: []
    }
  ]

  // 统计数据
  const stats = {
    totalProjects: designProjects.length,
    activeProjects: designProjects.filter(p => ['planning', 'designing', 'testing'].includes(p.status)).length,
    completedProjects: designProjects.filter(p => p.status === 'completed').length,
    totalBudget: designProjects.reduce((sum, p) => sum + p.budget, 0),
    usedBudget: designProjects.reduce((sum, p) => sum + p.actualCost, 0),
    teamMembers: new Set(designProjects.flatMap(p => p.team)).size,
    avgProgress: Math.round(designProjects.reduce((sum, p) => sum + p.progress, 0) / designProjects.length)
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">数字化研发设计看板</h1>
        <p className="page-description">
          设计任务全局视图，项目管理、资源分配和进度跟踪
        </p>
      </div>

      {/* 统计概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="总项目数"
              value={stats.totalProjects}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="进行中项目"
              value={stats.activeProjects}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="已完成项目"
              value={stats.completedProjects}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="团队成员"
              value={stats.teamMembers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="总预算"
              value={stats.totalBudget}
              precision={0}
              prefix="¥"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="已使用预算"
              value={stats.usedBudget}
              precision={0}
              prefix="¥"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="平均进度"
              value={stats.avgProgress}
              suffix="%"
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="项目概览" key="overview" icon={<ProjectOutlined />}>
          <Card 
            title="设计项目列表" 
            extra={
              <Space>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setModalType('create')
                    setSelectedProject(null)
                    setModalVisible(true)
                  }}
                >
                  新建项目
                </Button>
                <Button icon={<SettingOutlined />}>
                  项目配置
                </Button>
              </Space>
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
                placeholder="项目状态"
                style={{ width: 150 }}
                allowClear
              >
                <Option value="planning">策划中</Option>
                <Option value="designing">设计中</Option>
                <Option value="testing">测试中</Option>
                <Option value="completed">已完成</Option>
                <Option value="suspended">已暂停</Option>
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
              <RangePicker placeholder={['开始日期', '结束日期']} />
            </Space>

            <Table
              columns={[
                {
                  title: '项目名称',
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
                      new_product: { color: 'blue', text: '新产品', icon: <RocketOutlined /> },
                      optimization: { color: 'green', text: '优化改进', icon: <SettingOutlined /> },
                      research: { color: 'purple', text: '研究开发', icon: <ExperimentOutlined /> }
                    }
                    const config = configs[type as keyof typeof configs]
                    return <Tag color={config.color} icon={config.icon}>{config.text}</Tag>
                  }
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => {
                    const configs = {
                      planning: { color: 'orange', text: '策划中' },
                      designing: { color: 'blue', text: '设计中' },
                      testing: { color: 'purple', text: '测试中' },
                      completed: { color: 'green', text: '已完成' },
                      suspended: { color: 'red', text: '已暂停' }
                    }
                    const config = configs[status as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
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
                  title: '进度',
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
                  title: '项目经理',
                  dataIndex: 'manager',
                  key: 'manager'
                },
                {
                  title: '团队规模',
                  key: 'teamSize',
                  render: (record: DesignProject) => `${record.team.length}人`
                },
                {
                  title: '预算使用率',
                  key: 'budgetUsage',
                  render: (record: DesignProject) => {
                    const usage = (record.actualCost / record.budget) * 100
                    return (
                      <span style={{ color: usage > 90 ? '#f5222d' : usage > 70 ? '#faad14' : '#52c41a' }}>
                        {usage.toFixed(1)}%
                      </span>
                    )
                  }
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (record: DesignProject) => (
                    <Space size="middle">
                      <Button 
                        type="link" 
                        icon={<EyeOutlined />} 
                        size="small"
                        onClick={() => {
                          setSelectedProject(record)
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
                          setSelectedProject(record)
                          setModalType('edit')
                          setModalVisible(true)
                        }}
                      >
                        编辑
                      </Button>
                      <Button 
                        type="link" 
                        icon={<CalendarOutlined />} 
                        size="small"
                      >
                        排期
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={designProjects}
              rowKey="id"
              pagination={{
                total: designProjects.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="设计流程" key="workflow" icon={<BulbOutlined />}>
          <Card title="设计流程看板">
            <Row gutter={[16, 16]}>
              {designProjects.filter(p => p.status !== 'completed' && p.status !== 'suspended').map(project => (
                <Col xs={24} lg={12} key={project.id}>
                  <Card
                    size="small"
                    title={project.name}
                    extra={<Tag color={project.priority === 'high' ? 'red' : project.priority === 'medium' ? 'orange' : 'green'}>{project.priority === 'high' ? '高优先级' : project.priority === 'medium' ? '中优先级' : '低优先级'}</Tag>}
                  >
                    <Timeline size="small">
                      {project.designPhases.map(phase => (
                        <Timeline.Item
                          key={phase.id}
                          color={
                            phase.status === 'completed' ? 'green' :
                            phase.status === 'in_progress' ? 'blue' :
                            phase.status === 'blocked' ? 'red' : 'gray'
                          }
                          dot={
                            phase.status === 'completed' ? <CheckCircleOutlined /> :
                            phase.status === 'in_progress' ? <ClockCircleOutlined /> :
                            phase.status === 'blocked' ? <ExclamationCircleOutlined /> : undefined
                          }
                        >
                          <div>
                            <strong>{phase.name}</strong>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                              负责人: {phase.assignee} | 进度: {phase.progress}%
                            </div>
                            <Progress percent={phase.progress} size="small" style={{ marginTop: 4 }} />
                          </div>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </TabPane>

        <TabPane tab="资源分配" key="resources" icon={<TeamOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="人员分配">
                <Table
                  size="small"
                  columns={[
                    { title: '姓名', dataIndex: 'name', key: 'name' },
                    { title: '角色', dataIndex: 'role', key: 'role' },
                    { title: '参与项目', dataIndex: 'projects', key: 'projects' },
                    { title: '工作负荷', dataIndex: 'workload', key: 'workload', render: (load: number) => <Progress percent={load} size="small" /> }
                  ]}
                  dataSource={[
                    { name: '张设计', role: '项目经理', projects: 1, workload: 85 },
                    { name: '李配方', role: '配方师', projects: 2, workload: 95 },
                    { name: '王香精', role: '调香师', projects: 2, workload: 80 },
                    { name: '赵工艺', role: '工艺工程师', projects: 3, workload: 90 },
                    { name: '孙包装', role: '包装设计师', projects: 1, workload: 60 }
                  ]}
                  pagination={false}
                  rowKey="name"
                />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="设备使用率">
                <Table
                  size="small"
                  columns={[
                    { title: '设备名称', dataIndex: 'name', key: 'name' },
                    { title: '类型', dataIndex: 'type', key: 'type' },
                    { title: '使用率', dataIndex: 'usage', key: 'usage', render: (usage: number) => <Progress percent={usage} size="small" /> },
                    { title: '状态', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={status === 'available' ? 'green' : status === 'busy' ? 'orange' : 'red'}>{status === 'available' ? '可用' : status === 'busy' ? '忙碌' : '维护中'}</Tag> }
                  ]}
                  dataSource={[
                    { name: 'GC-MS分析仪', type: '检测设备', usage: 75, status: 'busy' },
                    { name: '中试生产线', type: '生产设备', usage: 60, status: 'available' },
                    { name: '感官评吸室', type: '评价设备', usage: 45, status: 'available' },
                    { name: '包装打样机', type: '打样设备', usage: 30, status: 'available' },
                    { name: '工艺仿真系统', type: '软件系统', usage: 85, status: 'busy' }
                  ]}
                  pagination={false}
                  rowKey="name"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="进度跟踪" key="tracking" icon={<BarChartOutlined />}>
          <Card title="项目进度跟踪">
            <Row gutter={[16, 16]}>
              {designProjects.filter(p => p.status !== 'completed').map(project => (
                <Col xs={24} lg={8} key={project.id}>
                  <Card size="small" title={project.name}>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span>整体进度</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress percent={project.progress} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span>预算使用</span>
                        <span>{((project.actualCost / project.budget) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress percent={(project.actualCost / project.budget) * 100} strokeColor="#faad14" />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        <div>项目经理: {project.manager}</div>
                        <div>团队规模: {project.team.length}人</div>
                        <div>截止日期: {project.endDate}</div>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </TabPane>
      </Tabs>

      {/* 项目详情/编辑模态框 */}
      <Modal
        title={
          modalType === 'create' ? '新建设计项目' :
          modalType === 'edit' ? '编辑设计项目' : '项目详情'
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={800}
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
              <Form.Item label="项目名称">
                <Input
                  placeholder="请输入项目名称"
                  defaultValue={selectedProject?.name}
                  disabled={modalType === 'view'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="项目类型">
                <Select
                  placeholder="请选择项目类型"
                  defaultValue={selectedProject?.type}
                  disabled={modalType === 'view'}
                >
                  <Option value="new_product">新产品</Option>
                  <Option value="optimization">优化改进</Option>
                  <Option value="research">研究开发</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="优先级">
                <Select
                  placeholder="请选择优先级"
                  defaultValue={selectedProject?.priority}
                  disabled={modalType === 'view'}
                >
                  <Option value="high">高</Option>
                  <Option value="medium">中</Option>
                  <Option value="low">低</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="项目经理">
                <Select
                  placeholder="请选择项目经理"
                  defaultValue={selectedProject?.manager}
                  disabled={modalType === 'view'}
                >
                  <Option value="张设计">张设计</Option>
                  <Option value="刘优化">刘优化</Option>
                  <Option value="周研发">周研发</Option>
                  <Option value="韩创新">韩创新</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="项目预算(元)">
                <InputNumber
                  min={0}
                  placeholder="请输入项目预算"
                  defaultValue={selectedProject?.budget}
                  disabled={modalType === 'view'}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="项目周期">
                <RangePicker
                  placeholder={['开始日期', '结束日期']}
                  disabled={modalType === 'view'}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="项目描述">
            <Input.TextArea
              rows={3}
              placeholder="请输入项目描述"
              defaultValue={selectedProject?.description}
              disabled={modalType === 'view'}
            />
          </Form.Item>

          {selectedProject && modalType === 'view' && (
            <>
              <Form.Item label="团队成员">
                <Space wrap>
                  {selectedProject.team.map(member => (
                    <Tag key={member} icon={<UserOutlined />}>{member}</Tag>
                  ))}
                </Space>
              </Form.Item>

              <Form.Item label="项目里程碑">
                <Timeline size="small">
                  {selectedProject.milestones.map(milestone => (
                    <Timeline.Item
                      key={milestone.id}
                      color={milestone.status === 'completed' ? 'green' : milestone.status === 'overdue' ? 'red' : 'blue'}
                    >
                      <div>
                        <strong>{milestone.name}</strong>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {milestone.date} - {milestone.description}
                        </div>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  )
}

export default DesignDashboard
