import React, { useState } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Modal, Form, Input, Select, InputNumber, Alert, Progress, Slider, Divider } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExperimentOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  BulbOutlined,
  BarChartOutlined,
  FileTextOutlined,
  SearchOutlined,
  CompareOutlined,
  RocketOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select

// 辅材组合接口
interface AuxiliaryMaterialCombination {
  id: string
  name: string
  cigarettePaper: CigarettePaper
  tippingPaper: TippingPaper
  filter: Filter
  status: 'draft' | 'testing' | 'approved' | 'rejected'
  creator: string
  createTime: string
  testResults?: TestResult[]
  simulationScore: number
  costPerUnit: number
  targetProduct: string
}

// 卷烟纸接口
interface CigarettePaper {
  id: string
  name: string
  weight: number // g/m²
  permeability: number // CU
  thickness: number // μm
  opacity: number // %
  ashContent: number // %
  supplier: string
  cost: number // 元/万张
}

// 接装纸接口
interface TippingPaper {
  id: string
  name: string
  weight: number // g/m²
  thickness: number // μm
  printability: string
  adhesiveType: string
  color: string
  supplier: string
  cost: number // 元/万张
}

// 滤棒接口
interface Filter {
  id: string
  name: string
  length: number // mm
  diameter: number // mm
  pressure: number // Pa
  efficiency: number // %
  material: string
  supplier: string
  cost: number // 元/万支
}

// 测试结果接口
interface TestResult {
  id: string
  testType: 'physical' | 'chemical' | 'sensory' | 'simulation'
  testDate: string
  results: Record<string, any>
  score: number
  passed: boolean
}

const AuxiliaryMaterialDesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState('combinations')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [recommendModalVisible, setRecommendModalVisible] = useState(false)

  // 模拟卷烟纸数据
  const cigarettePapers: CigarettePaper[] = [
    {
      id: 'CP001',
      name: '超薄透气卷烟纸',
      weight: 12.5,
      permeability: 26,
      thickness: 12,
      opacity: 15,
      ashContent: 8.5,
      supplier: '法国博洛雷',
      cost: 850
    },
    {
      id: 'CP002',
      name: '标准卷烟纸',
      weight: 14.0,
      permeability: 20,
      thickness: 15,
      opacity: 18,
      ashContent: 10.0,
      supplier: '奥地利SWM',
      cost: 720
    },
    {
      id: 'CP003',
      name: '低透气卷烟纸',
      weight: 15.5,
      permeability: 12,
      thickness: 18,
      opacity: 22,
      ashContent: 11.5,
      supplier: '英国Glatz',
      cost: 680
    },
    {
      id: 'CP004',
      name: '环保卷烟纸',
      weight: 13.0,
      permeability: 24,
      thickness: 14,
      opacity: 16,
      ashContent: 7.8,
      supplier: '芬兰Ahlstrom',
      cost: 920
    },
    {
      id: 'CP005',
      name: '高透气卷烟纸',
      weight: 11.8,
      permeability: 35,
      thickness: 11,
      opacity: 12,
      ashContent: 6.5,
      supplier: '德国Delfortgroup',
      cost: 980
    }
  ]

  // 模拟接装纸数据
  const tippingPapers: TippingPaper[] = [
    {
      id: 'TP001',
      name: '白色接装纸',
      weight: 64,
      thickness: 58,
      printability: '优秀',
      adhesiveType: 'EVA热熔胶',
      color: '纯白',
      supplier: '法国博洛雷',
      cost: 1200
    },
    {
      id: 'TP002',
      name: '金色接装纸',
      weight: 68,
      thickness: 62,
      printability: '良好',
      adhesiveType: 'PUR热熔胶',
      color: '金色',
      supplier: '奥地利SWM',
      cost: 1350
    },
    {
      id: 'TP003',
      name: '银色接装纸',
      weight: 66,
      thickness: 60,
      printability: '优秀',
      adhesiveType: 'EVA热熔胶',
      color: '银色',
      supplier: '英国Glatz',
      cost: 1280
    },
    {
      id: 'TP004',
      name: '彩色印刷接装纸',
      weight: 70,
      thickness: 65,
      printability: '优秀',
      adhesiveType: 'PUR热熔胶',
      color: '多色',
      supplier: '德国Delfortgroup',
      cost: 1450
    },
    {
      id: 'TP005',
      name: '环保接装纸',
      weight: 62,
      thickness: 56,
      printability: '良好',
      adhesiveType: '水性胶',
      color: '本色',
      supplier: '芬兰Ahlstrom',
      cost: 1180
    }
  ]

  // 模拟滤棒数据
  const filters: Filter[] = [
    {
      id: 'F001',
      name: '标准醋纤滤棒',
      length: 20,
      diameter: 7.8,
      pressure: 1050,
      efficiency: 35,
      material: '醋酸纤维',
      supplier: '伊斯曼化学',
      cost: 180
    },
    {
      id: 'F002',
      name: '高效滤棒',
      length: 20,
      diameter: 7.8,
      pressure: 1200,
      efficiency: 45,
      material: '醋酸纤维+活性炭',
      supplier: '塞拉尼斯',
      cost: 220
    },
    {
      id: 'F003',
      name: '低阻滤棒',
      length: 20,
      diameter: 7.8,
      pressure: 850,
      efficiency: 28,
      material: '醋酸纤维',
      supplier: '三菱化学',
      cost: 165
    },
    {
      id: 'F004',
      name: '复合滤棒',
      length: 20,
      diameter: 7.8,
      pressure: 1100,
      efficiency: 42,
      material: '醋酸纤维+颗粒炭',
      supplier: '罗地亚',
      cost: 250
    },
    {
      id: 'F005',
      name: '生物降解滤棒',
      length: 20,
      diameter: 7.8,
      pressure: 980,
      efficiency: 32,
      material: 'PLA纤维',
      supplier: 'NatureWorks',
      cost: 280
    }
  ]

  // 模拟辅材组合数据
  const combinations: AuxiliaryMaterialCombination[] = [
    {
      id: 'AMC001',
      name: '焦甜香型标准组合',
      cigarettePaper: cigarettePapers[0],
      tippingPaper: tippingPapers[0],
      filter: filters[0],
      status: 'approved',
      creator: '张设计',
      createTime: '2024-03-25 10:30:00',
      simulationScore: 92,
      costPerUnit: 0.125,
      targetProduct: '焦甜香系列'
    },
    {
      id: 'AMC002',
      name: '高端产品组合',
      cigarettePaper: cigarettePapers[4],
      tippingPaper: tippingPapers[3],
      filter: filters[3],
      status: 'testing',
      creator: '李设计',
      createTime: '2024-03-28 14:20:00',
      simulationScore: 88,
      costPerUnit: 0.185,
      targetProduct: '高端系列'
    },
    {
      id: 'AMC003',
      name: '环保型组合',
      cigarettePaper: cigarettePapers[3],
      tippingPaper: tippingPapers[4],
      filter: filters[4],
      status: 'draft',
      creator: '王设计',
      createTime: '2024-03-30 09:15:00',
      simulationScore: 85,
      costPerUnit: 0.165,
      targetProduct: '环保系列'
    },
    {
      id: 'AMC004',
      name: '成本优化组合',
      cigarettePaper: cigarettePapers[2],
      tippingPaper: tippingPapers[0],
      filter: filters[2],
      status: 'approved',
      creator: '赵设计',
      createTime: '2024-03-26 16:45:00',
      simulationScore: 78,
      costPerUnit: 0.095,
      targetProduct: '经济系列'
    },
    {
      id: 'AMC005',
      name: '低焦油健康组合',
      cigarettePaper: cigarettePapers[0],
      tippingPaper: tippingPapers[1],
      filter: filters[1],
      status: 'testing',
      creator: '孙设计',
      createTime: '2024-03-29 11:30:00',
      simulationScore: 90,
      costPerUnit: 0.145,
      targetProduct: '健康系列'
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">三纸一棒数字化设计</h1>
        <p className="page-description">
          卷烟纸+接装纸+滤棒组合方案推荐和仿真验证
        </p>
      </div>

      {/* 统计概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="组合方案"
              value={combinations.length}
              prefix={<SettingOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="已批准方案"
              value={combinations.filter(c => c.status === 'approved').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="平均成本"
              value={combinations.reduce((sum, c) => sum + c.costPerUnit, 0) / combinations.length}
              precision={3}
              prefix="¥"
              suffix="/支"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="平均评分"
              value={Math.round(combinations.reduce((sum, c) => sum + c.simulationScore, 0) / combinations.length)}
              suffix="分"
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="组合方案" key="combinations" icon={<SettingOutlined />}>
          <Card 
            title="辅材组合管理" 
            extra={
              <Space>
                <Button 
                  type="primary" 
                  icon={<ThunderboltOutlined />}
                  onClick={() => setRecommendModalVisible(true)}
                >
                  智能推荐
                </Button>
                <Button 
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setModalType('create')
                    setSelectedRecord(null)
                    setModalVisible(true)
                  }}
                >
                  新建组合
                </Button>
              </Space>
            }
          >
            <Space style={{ marginBottom: 16 }}>
              <Select
                placeholder="目标产品"
                style={{ width: 150 }}
                allowClear
              >
                <Option value="焦甜香系列">焦甜香系列</Option>
                <Option value="高端系列">高端系列</Option>
                <Option value="环保系列">环保系列</Option>
                <Option value="经济系列">经济系列</Option>
                <Option value="健康系列">健康系列</Option>
              </Select>
              <Select
                placeholder="状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="draft">草稿</Option>
                <Option value="testing">测试中</Option>
                <Option value="approved">已批准</Option>
                <Option value="rejected">已拒绝</Option>
              </Select>
            </Space>

            <Table
              columns={[
                {
                  title: '组合名称',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => <a>{text}</a>
                },
                {
                  title: '目标产品',
                  dataIndex: 'targetProduct',
                  key: 'targetProduct',
                  render: (product: string) => <Tag color="blue">{product}</Tag>
                },
                {
                  title: '卷烟纸',
                  key: 'cigarettePaper',
                  render: (record: AuxiliaryMaterialCombination) => (
                    <div>
                      <div>{record.cigarettePaper.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {record.cigarettePaper.weight}g/m² | {record.cigarettePaper.permeability}CU
                      </div>
                    </div>
                  )
                },
                {
                  title: '接装纸',
                  key: 'tippingPaper',
                  render: (record: AuxiliaryMaterialCombination) => (
                    <div>
                      <div>{record.tippingPaper.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {record.tippingPaper.weight}g/m² | {record.tippingPaper.color}
                      </div>
                    </div>
                  )
                },
                {
                  title: '滤棒',
                  key: 'filter',
                  render: (record: AuxiliaryMaterialCombination) => (
                    <div>
                      <div>{record.filter.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {record.filter.pressure}Pa | {record.filter.efficiency}%
                      </div>
                    </div>
                  )
                },
                {
                  title: '仿真评分',
                  dataIndex: 'simulationScore',
                  key: 'simulationScore',
                  render: (score: number) => (
                    <div>
                      <Progress 
                        percent={score} 
                        size="small" 
                        status={score >= 90 ? 'success' : score >= 80 ? 'active' : 'exception'}
                      />
                      <span style={{ color: score >= 90 ? '#52c41a' : score >= 80 ? '#faad14' : '#f5222d' }}>
                        {score}分
                      </span>
                    </div>
                  )
                },
                {
                  title: '单支成本',
                  dataIndex: 'costPerUnit',
                  key: 'costPerUnit',
                  render: (cost: number) => `¥${cost.toFixed(3)}`
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => {
                    const configs = {
                      draft: { color: 'default', text: '草稿' },
                      testing: { color: 'blue', text: '测试中' },
                      approved: { color: 'green', text: '已批准' },
                      rejected: { color: 'red', text: '已拒绝' }
                    }
                    const config = configs[status as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '创建人',
                  dataIndex: 'creator',
                  key: 'creator'
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (record: AuxiliaryMaterialCombination) => (
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
                        disabled={record.status === 'approved'}
                      >
                        编辑
                      </Button>
                      <Button 
                        type="link" 
                        icon={<ExperimentOutlined />} 
                        size="small"
                      >
                        仿真
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={combinations}
              rowKey="id"
              pagination={{
                total: combinations.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="仿真验证" key="simulation" icon={<ExperimentOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <Card title="仿真参数设置" size="small">
                <Form layout="vertical">
                  <Form.Item label="仿真类型">
                    <Select defaultValue="comprehensive" placeholder="选择仿真类型">
                      <Option value="comprehensive">综合仿真</Option>
                      <Option value="physical">物理性能</Option>
                      <Option value="chemical">化学性能</Option>
                      <Option value="sensory">感官评价</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="环境条件">
                    <Row gutter={8}>
                      <Col span={12}>
                        <Input placeholder="温度(°C)" addonBefore="温度" />
                      </Col>
                      <Col span={12}>
                        <Input placeholder="湿度(%)" addonBefore="湿度" />
                      </Col>
                    </Row>
                  </Form.Item>

                  <Form.Item label="测试参数">
                    <Select mode="multiple" placeholder="选择测试参数">
                      <Option value="tar">焦油量</Option>
                      <Option value="nicotine">烟碱量</Option>
                      <Option value="co">一氧化碳</Option>
                      <Option value="pressure">抽吸阻力</Option>
                      <Option value="firmness">硬度</Option>
                      <Option value="appearance">外观质量</Option>
                    </Select>
                  </Form.Item>

                  <Button type="primary" icon={<RocketOutlined />} block>
                    开始仿真验证
                  </Button>
                </Form>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="仿真进度" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ marginBottom: 8 }}>物理性能仿真</div>
                    <Progress percent={100} size="small" status="success" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>化学性能仿真</div>
                    <Progress percent={85} size="small" status="active" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>感官评价仿真</div>
                    <Progress percent={60} size="small" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>综合评价</div>
                    <Progress percent={30} size="small" />
                  </div>

                  <Alert
                    message="仿真进行中"
                    description="预计剩余时间: 3分钟"
                    type="info"
                    size="small"
                  />
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="仿真结果" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>焦油量预测</span>
                      <span style={{ color: '#52c41a' }}>8.2mg</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>目标: 8.0±0.5mg</div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>烟碱量预测</span>
                      <span style={{ color: '#52c41a' }}>0.8mg</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>目标: 0.8±0.1mg</div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>抽吸阻力</span>
                      <span style={{ color: '#faad14' }}>1080Pa</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>目标: 1050±50Pa</div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>综合评分</span>
                      <span style={{ color: '#1890ff', fontWeight: 'bold' }}>92分</span>
                    </div>
                  </div>

                  <Alert
                    message="仿真通过"
                    description="各项指标基本符合目标要求"
                    type="success"
                    size="small"
                  />
                </Space>
              </Card>
            </Col>
          </Row>

          <Card title="仿真历史记录" style={{ marginTop: 16 }}>
            <Table
              size="small"
              columns={[
                { title: '组合名称', dataIndex: 'combinationName', key: 'combinationName' },
                { title: '仿真类型', dataIndex: 'simulationType', key: 'simulationType', render: (type: string) => <Tag>{type}</Tag> },
                { title: '仿真时间', dataIndex: 'simulationTime', key: 'simulationTime' },
                { title: '焦油量(mg)', dataIndex: 'tar', key: 'tar' },
                { title: '烟碱量(mg)', dataIndex: 'nicotine', key: 'nicotine' },
                { title: '抽吸阻力(Pa)', dataIndex: 'pressure', key: 'pressure' },
                { title: '综合评分', dataIndex: 'totalScore', key: 'totalScore', render: (score: number) => <span style={{ color: score >= 90 ? '#52c41a' : '#faad14' }}>{score}分</span> },
                { title: '状态', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={status === 'passed' ? 'green' : 'orange'}>{status === 'passed' ? '通过' : '待优化'}</Tag> },
                { title: '操作', key: 'action', render: () => <Button type="link" size="small">查看详情</Button> }
              ]}
              dataSource={[
                { combinationName: '焦甜香型标准组合', simulationType: '综合仿真', simulationTime: '2024-03-30 14:30', tar: 8.2, nicotine: 0.8, pressure: 1080, totalScore: 92, status: 'passed' },
                { combinationName: '高端产品组合', simulationType: '物理性能', simulationTime: '2024-03-29 10:15', tar: 7.8, nicotine: 0.7, pressure: 1120, totalScore: 88, status: 'passed' },
                { combinationName: '环保型组合', simulationType: '化学性能', simulationTime: '2024-03-28 16:45', tar: 8.5, nicotine: 0.9, pressure: 1050, totalScore: 85, status: 'optimization' }
              ]}
              pagination={false}
            />
          </Card>
        </TabPane>

        <TabPane tab="材料库" key="materials" icon={<FileTextOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <Card title="卷烟纸库" size="small">
                <Table
                  size="small"
                  columns={[
                    { title: '名称', dataIndex: 'name', key: 'name' },
                    { title: '重量', dataIndex: 'weight', key: 'weight', render: (weight: number) => `${weight}g/m²` },
                    { title: '透气度', dataIndex: 'permeability', key: 'permeability', render: (perm: number) => `${perm}CU` },
                    { title: '成本', dataIndex: 'cost', key: 'cost', render: (cost: number) => `¥${cost}` }
                  ]}
                  dataSource={cigarettePapers}
                  pagination={false}
                  rowKey="id"
                />
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="接装纸库" size="small">
                <Table
                  size="small"
                  columns={[
                    { title: '名称', dataIndex: 'name', key: 'name' },
                    { title: '重量', dataIndex: 'weight', key: 'weight', render: (weight: number) => `${weight}g/m²` },
                    { title: '颜色', dataIndex: 'color', key: 'color', render: (color: string) => <Tag>{color}</Tag> },
                    { title: '成本', dataIndex: 'cost', key: 'cost', render: (cost: number) => `¥${cost}` }
                  ]}
                  dataSource={tippingPapers}
                  pagination={false}
                  rowKey="id"
                />
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="滤棒库" size="small">
                <Table
                  size="small"
                  columns={[
                    { title: '名称', dataIndex: 'name', key: 'name' },
                    { title: '阻力', dataIndex: 'pressure', key: 'pressure', render: (pressure: number) => `${pressure}Pa` },
                    { title: '效率', dataIndex: 'efficiency', key: 'efficiency', render: (eff: number) => `${eff}%` },
                    { title: '成本', dataIndex: 'cost', key: 'cost', render: (cost: number) => `¥${cost}` }
                  ]}
                  dataSource={filters}
                  pagination={false}
                  rowKey="id"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* 智能推荐模态框 */}
      <Modal
        title="智能推荐辅材组合"
        open={recommendModalVisible}
        onCancel={() => setRecommendModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setRecommendModalVisible(false)}>
            取消
          </Button>,
          <Button key="recommend" type="primary" icon={<ThunderboltOutlined />}>
            开始推荐
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="目标产品">
                <Select placeholder="请选择目标产品">
                  <Option value="焦甜香系列">焦甜香系列</Option>
                  <Option value="高端系列">高端系列</Option>
                  <Option value="环保系列">环保系列</Option>
                  <Option value="经济系列">经济系列</Option>
                  <Option value="健康系列">健康系列</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="优化目标">
                <Select placeholder="请选择优化目标">
                  <Option value="performance">性能优先</Option>
                  <Option value="cost">成本优先</Option>
                  <Option value="balance">平衡优化</Option>
                  <Option value="innovation">创新优先</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="性能要求">
            <Row gutter={16}>
              <Col span={12}>
                <div>焦油量目标 (mg)</div>
                <Slider range defaultValue={[7.5, 8.5]} min={5} max={15} step={0.1} />
              </Col>
              <Col span={12}>
                <div>抽吸阻力目标 (Pa)</div>
                <Slider range defaultValue={[1000, 1100]} min={800} max={1500} step={10} />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <div>滤嘴效率 (%)</div>
                <Slider range defaultValue={[30, 40]} min={20} max={60} step={1} />
              </Col>
              <Col span={12}>
                <div>成本控制 (元/支)</div>
                <Slider range defaultValue={[0.1, 0.15]} min={0.05} max={0.3} step={0.01} />
              </Col>
            </Row>
          </Form.Item>

          <Form.Item label="约束条件">
            <Select mode="multiple" placeholder="选择约束条件">
              <Option value="supplier_limit">供应商限制</Option>
              <Option value="cost_limit">成本限制</Option>
              <Option value="quality_standard">质量标准</Option>
              <Option value="environmental">环保要求</Option>
              <Option value="production_capacity">产能限制</Option>
            </Select>
          </Form.Item>

          <Form.Item label="推荐算法">
            <Select defaultValue="genetic" placeholder="选择推荐算法">
              <Option value="genetic">遗传算法</Option>
              <Option value="particle_swarm">粒子群算法</Option>
              <Option value="simulated_annealing">模拟退火</Option>
              <Option value="machine_learning">机器学习</Option>
            </Select>
          </Form.Item>
        </Form>

        <Alert
          message="智能推荐说明"
          description="系统将基于您的要求，结合历史数据和仿真模型，推荐最优的三纸一棒组合方案。"
          type="info"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Modal>

      {/* 组合详情模态框 */}
      <Modal
        title={
          modalType === 'create' ? '新建辅材组合' :
          modalType === 'edit' ? '编辑辅材组合' : '组合详情'
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
              <Form.Item label="组合名称">
                <Input
                  placeholder="请输入组合名称"
                  defaultValue={selectedRecord?.name}
                  disabled={modalType === 'view'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="目标产品">
                <Select
                  placeholder="请选择目标产品"
                  defaultValue={selectedRecord?.targetProduct}
                  disabled={modalType === 'view'}
                >
                  <Option value="焦甜香系列">焦甜香系列</Option>
                  <Option value="高端系列">高端系列</Option>
                  <Option value="环保系列">环保系列</Option>
                  <Option value="经济系列">经济系列</Option>
                  <Option value="健康系列">健康系列</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="卷烟纸">
                <Select
                  placeholder="请选择卷烟纸"
                  defaultValue={selectedRecord?.cigarettePaper?.id}
                  disabled={modalType === 'view'}
                >
                  {cigarettePapers.map(paper => (
                    <Option key={paper.id} value={paper.id}>
                      {paper.name} ({paper.weight}g/m², {paper.permeability}CU)
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="接装纸">
                <Select
                  placeholder="请选择接装纸"
                  defaultValue={selectedRecord?.tippingPaper?.id}
                  disabled={modalType === 'view'}
                >
                  {tippingPapers.map(paper => (
                    <Option key={paper.id} value={paper.id}>
                      {paper.name} ({paper.color})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="滤棒">
                <Select
                  placeholder="请选择滤棒"
                  defaultValue={selectedRecord?.filter?.id}
                  disabled={modalType === 'view'}
                >
                  {filters.map(filter => (
                    <Option key={filter.id} value={filter.id}>
                      {filter.name} ({filter.pressure}Pa, {filter.efficiency}%)
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {selectedRecord && modalType === 'view' && (
            <>
              <Divider>组合详情</Divider>
              <Row gutter={16}>
                <Col span={8}>
                  <Card size="small" title="卷烟纸详情">
                    <div>重量: {selectedRecord.cigarettePaper.weight}g/m²</div>
                    <div>透气度: {selectedRecord.cigarettePaper.permeability}CU</div>
                    <div>厚度: {selectedRecord.cigarettePaper.thickness}μm</div>
                    <div>不透明度: {selectedRecord.cigarettePaper.opacity}%</div>
                    <div>灰分: {selectedRecord.cigarettePaper.ashContent}%</div>
                    <div>供应商: {selectedRecord.cigarettePaper.supplier}</div>
                    <div>成本: ¥{selectedRecord.cigarettePaper.cost}/万张</div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size="small" title="接装纸详情">
                    <div>重量: {selectedRecord.tippingPaper.weight}g/m²</div>
                    <div>厚度: {selectedRecord.tippingPaper.thickness}μm</div>
                    <div>印刷性: {selectedRecord.tippingPaper.printability}</div>
                    <div>胶型: {selectedRecord.tippingPaper.adhesiveType}</div>
                    <div>颜色: {selectedRecord.tippingPaper.color}</div>
                    <div>供应商: {selectedRecord.tippingPaper.supplier}</div>
                    <div>成本: ¥{selectedRecord.tippingPaper.cost}/万张</div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size="small" title="滤棒详情">
                    <div>长度: {selectedRecord.filter.length}mm</div>
                    <div>直径: {selectedRecord.filter.diameter}mm</div>
                    <div>阻力: {selectedRecord.filter.pressure}Pa</div>
                    <div>效率: {selectedRecord.filter.efficiency}%</div>
                    <div>材质: {selectedRecord.filter.material}</div>
                    <div>供应商: {selectedRecord.filter.supplier}</div>
                    <div>成本: ¥{selectedRecord.filter.cost}/万支</div>
                  </Card>
                </Col>
              </Row>

              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Card size="small" title="性能预测">
                    <div style={{ marginBottom: 8 }}>
                      <span>仿真评分: </span>
                      <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{selectedRecord.simulationScore}分</span>
                    </div>
                    <Progress percent={selectedRecord.simulationScore} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small" title="成本分析">
                    <div style={{ marginBottom: 8 }}>
                      <span>单支成本: </span>
                      <span style={{ color: '#52c41a', fontWeight: 'bold' }}>¥{selectedRecord.costPerUnit.toFixed(3)}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      卷烟纸: ¥{(selectedRecord.cigarettePaper.cost / 10000 * 0.6).toFixed(3)} |
                      接装纸: ¥{(selectedRecord.tippingPaper.cost / 10000 * 0.3).toFixed(3)} |
                      滤棒: ¥{(selectedRecord.filter.cost / 10000).toFixed(3)}
                    </div>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Form>
      </Modal>
    </div>
  )
}

export default AuxiliaryMaterialDesign
