import React, { useState } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Modal, Form, Input, Select, Progress, Alert, Slider, Divider, Steps, Timeline, InputNumber, Checkbox, Radio, Rate } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExperimentOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
  ThunderboltOutlined,
  LineChartOutlined,
  FileTextOutlined,
  SettingOutlined,
  PlayCircleOutlined,
  SaveOutlined,
  DownloadOutlined,
  UploadOutlined,
  RocketOutlined,
  HeartOutlined,
  FireOutlined,
  CloudOutlined,
  BulbOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input
const { Step } = Steps

// 新型烟草类型
enum NewProductType {
  E_CIGARETTE = 'e_cigarette',  // 电子烟
  HNB = 'HNB',  // 加热不燃烧
  NICOTINE_POUCH = 'nicotine_pouch',  // 尼古丁袋
  ORAL_SPRAY = 'oral_spray',  // 口腔喷雾
  NASAL_SPRAY = 'nasal_spray'  // 鼻喷雾
}

// 配方组分
interface FormulaComponent {
  id: string
  name: string
  category: 'propylene_glycol' | 'vegetable_glycerin' | 'nicotine' | 'flavor' | 'additive'
  proportion: number  // 比例
  purity: number  // 纯度
  supplier: string
}

// 产品配方
interface ProductFormula {
  id: string
  name: string
  type: NewProductType
  components: FormulaComponent[]
  nicotineStrength: number  // 尼古丁强度 mg/ml
  flavorProfile: string[]  // 风味特征
  vaporProduction: 'low' | 'medium' | 'high'  // 烟雾量
  throatHit: 'low' | 'medium' | 'high'  // 击喉感
  status: 'designing' | 'testing' | 'approved' | 'production'
  creator: string
  createTime: string
  updateTime: string
  description: string
}

// 测试数据
interface TestResult {
  id: string
  formulaId: string
  formulaName: string
  testType: 'chemical' | 'sensory' | 'stability' | 'toxicology'
  testDate: string
  tester: string
  result: 'pass' | 'fail' | 'pending'
  score?: number
  notes: string
}

const NewProductDesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState('design')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedFormula, setSelectedFormula] = useState<ProductFormula | null>(null)

  // 产品配方数据
  const productFormulas: ProductFormula[] = [
    {
      id: 'NF001',
      name: '经典烟草电子烟油',
      type: NewProductType.E_CIGARETTE,
      components: [
        { id: 'C001', name: '丙二醇', category: 'propylene_glycol', proportion: 50, purity: 99.5, supplier: '陶氏化学' },
        { id: 'C002', name: '植物甘油', category: 'vegetable_glycerin', proportion: 40, purity: 99.8, supplier: '巴斯夫' },
        { id: 'C003', name: '尼古丁', category: 'nicotine', proportion: 5, purity: 99.9, supplier: '瑞士尼古丁' },
        { id: 'C004', name: '烟草提取物', category: 'flavor', proportion: 4, purity: 98, supplier: '奇华顿' },
        { id: 'C005', name: '甜味剂', category: 'additive', proportion: 1, purity: 99, supplier: '泰莱' }
      ],
      nicotineStrength: 18,
      flavorProfile: ['烟草', '焦糖', '香草', '坚果'],
      vaporProduction: 'high',
      throatHit: 'medium',
      status: 'production',
      creator: '王配方师',
      createTime: '2024-01-15 10:30:00',
      updateTime: '2024-03-20 14:20:00',
      description: '经典烟草风味，适合传统烟草用户转换'
    },
    {
      id: 'NF002',
      name: '薄荷冰爽HNB烟支',
      type: NewProductType.HNB,
      components: [
        { id: 'C006', name: '烟丝', category: 'flavor', proportion: 85, purity: 99, supplier: '津巴布韦烟草' },
        { id: 'C007', name: '甘油', category: 'vegetable_glycerin', proportion: 10, purity: 99.8, supplier: '巴斯夫' },
        { id: 'C008', name: '薄荷醇', category: 'flavor', proportion: 4, purity: 99.5, supplier: '奇华顿' },
        { id: 'C009', name: '香料', category: 'flavor', proportion: 1, purity: 98, supplier: '芬美意' }
      ],
      nicotineStrength: 12,
      flavorProfile: ['薄荷', '冰爽', '清凉', '草本'],
      vaporProduction: 'medium',
      throatHit: 'low',
      status: 'production',
      creator: '李配方师',
      createTime: '2024-02-10 11:20:00',
      updateTime: '2024-03-18 16:30:00',
      description: '清凉薄荷口感，加热不燃烧产品'
    },
    {
      id: 'NF003',
      name: '水果味尼古丁袋',
      type: NewProductType.NICOTINE_POUCH,
      components: [
        { id: 'C010', name: '尼古丁', category: 'nicotine', proportion: 2, purity: 99.9, supplier: '瑞士尼古丁' },
        { id: 'C011', name: '纤维素填充物', category: 'additive', proportion: 80, purity: 99, supplier: '杜邦' },
        { id: 'C012', name: '草莓香料', category: 'flavor', proportion: 8, purity: 98, supplier: '芬美意' },
        { id: 'C013', name: '甜味剂', category: 'additive', proportion: 5, purity: 99, supplier: '泰莱' },
        { id: 'C014', name: 'pH调节剂', category: 'additive', proportion: 5, purity: 99, supplier: '巴斯夫' }
      ],
      nicotineStrength: 8,
      flavorProfile: ['草莓', '甜味', '水果'],
      vaporProduction: 'low',
      throatHit: 'low',
      status: 'testing',
      creator: '张配方师',
      createTime: '2024-02-20 09:15:00',
      updateTime: '2024-03-22 13:40:00',
      description: '无烟尼古丁产品，水果口味'
    },
    {
      id: 'NF004',
      name: '口腔尼古丁喷雾',
      type: NewProductType.ORAL_SPRAY,
      components: [
        { id: 'C015', name: '尼古丁', category: 'nicotine', proportion: 1.5, purity: 99.9, supplier: '瑞士尼古丁' },
        { id: 'C016', name: '乙醇', category: 'additive', proportion: 20, purity: 99.5, supplier: '巴斯夫' },
        { id: 'C017', name: '纯净水', category: 'additive', proportion: 75, purity: 99.9, supplier: '纯净水' },
        { id: 'C018', name: '薄荷香料', category: 'flavor', proportion: 3, purity: 98, supplier: '奇华顿' },
        { id: 'C019', name: '稳定剂', category: 'additive', proportion: 0.5, purity: 99, supplier: '陶氏化学' }
      ],
      nicotineStrength: 1,
      flavorProfile: ['薄荷', '清新'],
      vaporProduction: 'low',
      throatHit: 'low',
      status: 'approved',
      creator: '赵配方师',
      createTime: '2024-03-05 14:45:00',
      updateTime: '2024-03-25 10:20:00',
      description: '快速起效的口腔喷雾产品'
    },
    {
      id: 'NF005',
      name: '低焦油HNB烟支',
      type: NewProductType.HNB,
      components: [
        { id: 'C020', name: '烟丝', category: 'flavor', proportion: 80, purity: 99, supplier: '巴西烟草' },
        { id: 'C021', name: '丙二醇', category: 'propylene_glycol', proportion: 15, purity: 99.5, supplier: '陶氏化学' },
        { id: 'C022', name: '烟草提取物', category: 'flavor', proportion: 4, purity: 98, supplier: '奇华顿' },
        { id: 'C023', name: '香料', category: 'flavor', proportion: 1, purity: 98, supplier: '芬美意' }
      ],
      nicotineStrength: 6,
      flavorProfile: ['温和烟草', '木质', '坚果'],
      vaporProduction: 'medium',
      throatHit: 'low',
      status: 'designing',
      creator: '孙配方师',
      createTime: '2024-03-15 08:30:00',
      updateTime: '2024-03-26 15:10:00',
      description: '低尼古丁含量，温和口感'
    }
  ]

  // 测试数据
  const testResults: TestResult[] = [
    {
      id: 'TR001',
      formulaId: 'NF001',
      formulaName: '经典烟草电子烟油',
      testType: 'chemical',
      testDate: '2024-03-20',
      tester: '李分析员',
      result: 'pass',
      score: 98,
      notes: '所有化学指标符合标准'
    },
    {
      id: 'TR002',
      formulaId: 'NF001',
      formulaName: '经典烟草电子烟油',
      testType: 'sensory',
      testDate: '2024-03-21',
      tester: '王评吸员',
      result: 'pass',
      score: 92,
      notes: '感官评价优秀，风味协调'
    },
    {
      id: 'TR003',
      formulaId: 'NF002',
      formulaName: '薄荷冰爽HNB烟支',
      testType: 'chemical',
      testDate: '2024-03-22',
      tester: '张分析员',
      result: 'pass',
      score: 95,
      notes: '化学成分稳定，无有害物质'
    },
    {
      id: 'TR004',
      formulaId: 'NF003',
      formulaName: '水果味尼古丁袋',
      testType: 'stability',
      testDate: '2024-03-23',
      tester: '赵质检员',
      result: 'pending',
      notes: '稳定性测试进行中，还需30天'
    },
    {
      id: 'TR005',
      formulaId: 'NF004',
      formulaName: '口腔尼古丁喷雾',
      testType: 'toxicology',
      testDate: '2024-03-24',
      tester: '刘毒理师',
      result: 'pass',
      score: 96,
      notes: '毒理学安全性评估通过'
    }
  ]

  // 市场数据
  const marketData = [
    { category: '电子烟', growth: 25, size: '500亿', trend: 'up' },
    { category: 'HNB', growth: 35, size: '300亿', trend: 'up' },
    { category: '尼古丁袋', growth: 45, size: '80亿', trend: 'up' },
    { category: '尼古丁喷雾', growth: 15, size: '20亿', trend: 'stable' }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">新型烟草数字化设计</h1>
        <p className="page-description">
          电子烟、加热不燃烧、尼古丁袋等新型烟草产品配方设计与仿真
        </p>
      </div>

      {/* 统计概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="配方数量"
              value={productFormulas.length}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="生产中"
              value={productFormulas.filter(f => f.status === 'production').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="测试中"
              value={productFormulas.filter(f => f.status === 'testing').length}
              prefix={<ExperimentOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="市场增长"
              value={35}
              prefix={<RocketOutlined />}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        {/* 配方设计 */}
        <TabPane tab="配方设计" key="design" icon={<FileTextOutlined />}>
          <Card
            title="新型烟草配方管理"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setModalType('create')
                  setSelectedFormula(null)
                  setModalVisible(true)
                }}
              >
                新建配方
              </Button>
            }
          >
            <Space style={{ marginBottom: 16 }}>
              <Select placeholder="产品类型" style={{ width: 150 }} allowClear>
                <Option value="e_cigarette">电子烟</Option>
                <Option value="HNB">加热不燃烧</Option>
                <Option value="nicotine_pouch">尼古丁袋</Option>
                <Option value="oral_spray">口腔喷雾</Option>
                <Option value="nasal_spray">鼻喷雾</Option>
              </Select>
              <Select placeholder="尼古丁强度" style={{ width: 150 }} allowClear>
                <Option value="0">无尼古丁</Option>
                <Option value="3">3 mg/ml</Option>
                <Option value="6">6 mg/ml</Option>
                <Option value="12">12 mg/ml</Option>
                <Option value="18">18 mg/ml</Option>
              </Select>
              <Select placeholder="状态" style={{ width: 120 }} allowClear>
                <Option value="designing">设计中</Option>
                <Option value="testing">测试中</Option>
                <Option value="approved">已批准</Option>
                <Option value="production">生产中</Option>
              </Select>
            </Space>

            <Table
              columns={[
                {
                  title: '配方名称',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => <a>{text}</a>
                },
                {
                  title: '产品类型',
                  dataIndex: 'type',
                  key: 'type',
                  render: (type: NewProductType) => {
                    const typeNames = {
                      e_cigarette: '电子烟',
                      HNB: '加热不燃烧',
                      nicotine_pouch: '尼古丁袋',
                      oral_spray: '口腔喷雾',
                      nasal_spray: '鼻喷雾'
                    }
                    const typeColors = {
                      e_cigarette: 'blue',
                      HNB: 'orange',
                      nicotine_pouch: 'green',
                      oral_spray: 'purple',
                      nasal_spray: 'cyan'
                    }
                    return <Tag color={typeColors[type as keyof typeof typeColors]}>{typeNames[type]}</Tag>
                  }
                },
                {
                  title: '尼古丁强度',
                  dataIndex: 'nicotineStrength',
                  key: 'nicotineStrength',
                  render: (strength: number) => (
                    <span>
                      {strength === 0 ? '无' : `${strength} mg/ml`}
                    </span>
                  )
                },
                {
                  title: '风味特征',
                  dataIndex: 'flavorProfile',
                  key: 'flavorProfile',
                  render: (flavors: string[]) => (
                    <div>
                      {flavors.slice(0, 3).map(f => (
                        <Tag key={f} color="purple" style={{ marginBottom: 4 }}>
                          {f}
                        </Tag>
                      ))}
                      {flavors.length > 3 && <Tag>+{flavors.length - 3}</Tag>}
                    </div>
                  )
                },
                {
                  title: '烟雾量',
                  dataIndex: 'vaporProduction',
                  key: 'vaporProduction',
                  render: (production: string) => {
                    const configs = {
                      low: { color: 'green', text: '低' },
                      medium: { color: 'orange', text: '中' },
                      high: { color: 'red', text: '高' }
                    }
                    const config = configs[production as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '击喉感',
                  dataIndex: 'throatHit',
                  key: 'throatHit',
                  render: (hit: string) => {
                    const configs = {
                      low: { color: 'green', text: '弱' },
                      medium: { color: 'orange', text: '中' },
                      high: { color: 'red', text: '强' }
                    }
                    const config = configs[hit as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => {
                    const configs = {
                      designing: { color: 'blue', text: '设计中' },
                      testing: { color: 'orange', text: '测试中' },
                      approved: { color: 'green', text: '已批准' },
                      production: { color: 'cyan', text: '生产中' }
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
                  render: (record: ProductFormula) => (
                    <Space size="middle">
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => {
                          setSelectedFormula(record)
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
                          setSelectedFormula(record)
                          setModalType('edit')
                          setModalVisible(true)
                        }}
                      >
                        编辑
                      </Button>
                      <Button
                        type="link"
                        icon={<PlayCircleOutlined />}
                        size="small"
                      >
                        仿真
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={productFormulas}
              rowKey="id"
              pagination={{
                total: productFormulas.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        {/* 配方优化 */}
        <TabPane tab="配方优化" key="optimization" icon={<BulbOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="PG/VG比例优化" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert
                    message="PG/VG配比优化"
                    description="调整丙二醇(PG)和植物甘油(VG)的比例，优化烟雾量和口感"
                    type="info"
                    size="small"
                    showIcon
                  />

                  <Form layout="vertical" size="small">
                    <Form.Item label="PG比例 (%)">
                      <Slider
                        min={0}
                        max={100}
                        step={5}
                        defaultValue={50}
                        marks={{ 0: '0', 50: '50', 100: '100' }}
                      />
                    </Form.Item>

                    <Form.Item label="VG比例 (%)">
                      <Slider
                        min={0}
                        max={100}
                        step={5}
                        defaultValue={50}
                        marks={{ 0: '0', 50: '50', 100: '100' }}
                      />
                    </Form.Item>

                    <Divider style={{ margin: '12px 0' }} />

                    <div>
                      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>预测效果</div>
                      <div style={{ marginBottom: 4 }}>
                        <span>烟雾量: </span>
                        <Progress percent={75} size="small" />
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <span>击喉感: </span>
                        <Progress percent={60} size="small" strokeColor="#faad14" />
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <span>风味传递: </span>
                        <Progress percent={80} size="small" strokeColor="#722ed1" />
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <span>甜度: </span>
                        <Progress percent={70} size="small" strokeColor="#52c41a" />
                      </div>
                    </div>
                  </Form>

                  <Button type="primary" icon={<PlayCircleOutlined />} block>
                    开始优化仿真
                  </Button>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="尼古丁强度优化" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert
                    message="尼古丁含量优化"
                    description="根据目标用户群体优化尼古丁含量"
                    type="info"
                    size="small"
                    showIcon
                  />

                  <Form layout="vertical" size="small">
                    <Form.Item label="目标用户">
                      <Radio.Group defaultValue="heavy_smoker">
                        <Space direction="vertical">
                          <Radio value="heavy_smoker">重度吸烟者（>20支/天）</Radio>
                          <Radio value="medium_smoker">中度吸烟者（10-20支/天）</Radio>
                          <Radio value="light_smoker">轻度吸烟者（<10支/天）</Radio>
                          <Radio value="non_smoker">非吸烟者</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item label="推荐尼古丁强度">
                      <Slider
                        min={0}
                        max={24}
                        step={3}
                        defaultValue={12}
                        marks={{
                          0: '0',
                          3: '3',
                          6: '6',
                          12: '12',
                          18: '18',
                          24: '24'
                        }}
                      />
                    </Form.Item>

                    <Divider style={{ margin: '12px 0' }} />

                    <div>
                      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>满意度预测</div>
                      <div style={{ marginBottom: 8 }}>
                        <span>尼古丁满足感: </span>
                        <Rate allowHalf defaultValue={4} disabled />
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <span>口感舒适度: </span>
                        <Rate allowHalf defaultValue={4.5} disabled />
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <span>整体满意度: </span>
                        <Rate allowHalf defaultValue={4} disabled />
                      </div>
                    </div>
                  </Form>

                  <Button type="primary" icon={<SaveOutlined />} block>
                    保存优化方案
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>

          {/* 风味优化 */}
          <Card title="风味组合优化" style={{ marginTop: 16 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={8}>
                <Card size="small" title="单香选择">
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Row>
                      <Col span={12}><Checkbox value="烟草">烟草</Checkbox></Col>
                      <Col span={12}><Checkbox value="薄荷">薄荷</Checkbox></Col>
                      <Col span={12}><Checkbox value="水果">水果</Checkbox></Col>
                      <Col span={12}><Checkbox value="甜味">甜味</Checkbox></Col>
                      <Col span={12}><Checkbox value="坚果">坚果</Checkbox></Col>
                      <Col span={12}><Checkbox value="巧克力">巧克力</Checkbox></Col>
                      <Col span={12}><Checkbox value="咖啡">咖啡</Checkbox></Col>
                      <Col span={12}><Checkbox value="香草">香草</Checkbox></Col>
                      <Col span={12}><Checkbox value="焦糖">焦糖</Checkbox></Col>
                      <Col span={12}><Checkbox value="奶油">奶油</Checkbox></Col>
                      <Col span={12}><Checkbox value="香料">香料</Checkbox></Col>
                      <Col span={12}><Checkbox value="木质">木质</Checkbox></Col>
                    </Row>
                  </Checkbox.Group>
                </Card>
              </Col>

              <Col xs={24} lg={8}>
                <Card size="small" title="比例调整">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Form.Item label="主香比例 (%)" labelCol={{ span: 12 }}>
                      <Slider min={30} max={70} defaultValue={50} />
                    </Form.Item>
                    <Form.Item label="辅香比例 (%)" labelCol={{ span: 12 }}>
                      <Slider min={20} max={50} defaultValue={30} />
                    </Form.Item>
                    <Form.Item label="修饰香比例 (%)" labelCol={{ span: 12 }}>
                      <Slider min={5} max={30} defaultValue={20} />
                    </Form.Item>
                  </Space>
                </Card>
              </Col>

              <Col xs={24} lg={8}>
                <Card size="small" title="风味预测">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>香气评分</div>
                      <div style={{ marginBottom: 4 }}>
                        <span>浓郁度: </span>
                        <Progress percent={82} size="small" />
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <span>层次感: </span>
                        <Progress percent={78} size="small" strokeColor="#faad14" />
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <span>协调性: </span>
                        <Progress percent={85} size="small" strokeColor="#722ed1" />
                      </div>
                    </div>

                    <Alert
                      message="推荐组合"
                      description="烟草(50%) + 薄荷(30%) + 甜味(20%)"
                      type="success"
                      size="small"
                    />
                  </Space>
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>

        {/* 测试验证 */}
        <TabPane tab="测试验证" key="testing" icon={<ExperimentOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="测试记录">
                <Table
                  columns={[
                    { title: '测试ID', dataIndex: 'id', key: 'id' },
                    {
                      title: '配方名称',
                      dataIndex: 'formulaName',
                      key: 'formulaName'
                    },
                    {
                      title: '测试类型',
                      dataIndex: 'testType',
                      key: 'testType',
                      render: (type: string) => {
                        const typeNames = {
                          chemical: '化学测试',
                          sensory: '感官测试',
                          stability: '稳定性测试',
                          toxicology: '毒理学测试'
                        }
                        return <Tag>{typeNames[type as keyof typeof typeNames]}</Tag>
                      }
                    },
                    { title: '测试日期', dataIndex: 'testDate', key: 'testDate' },
                    { title: '测试人', dataIndex: 'tester', key: 'tester' },
                    {
                      title: '结果',
                      dataIndex: 'result',
                      key: 'result',
                      render: (result: string) => {
                        const configs = {
                          pass: { color: 'green', text: '通过' },
                          fail: { color: 'red', text: '失败' },
                          pending: { color: 'orange', text: '待定' }
                        }
                        const config = configs[result as keyof typeof configs]
                        return <Tag color={config.color}>{config.text}</Tag>
                      }
                    },
                    {
                      title: '评分',
                      dataIndex: 'score',
                      key: 'score',
                      render: (score?: number) => score ? `${score}/100` : '-'
                    },
                    {
                      title: '操作',
                      key: 'action',
                      render: () => <Button type="link" size="small">查看详情</Button>
                    }
                  ]}
                  dataSource={testResults}
                  rowKey="id"
                  pagination={{
                    pageSize: 10,
                    showTotal: (total) => `共 ${total} 条`
                  }}
                />
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="测试统计" style={{ marginBottom: 16 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Statistic
                    title="通过率"
                    value={testResults.filter(r => r.result === 'pass').length / testResults.length * 100}
                    suffix="%"
                    valueStyle={{ color: '#52c41a' }}
                  />
                  <Statistic
                    title="平均分"
                    value={testResults.filter(r => r.score).reduce((a, b) => a + (b.score || 0), 0) / testResults.filter(r => r.score).length}
                    suffix="/100"
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Space>
              </Card>

              <Card title="测试流程">
                <Steps direction="vertical" current={2} size="small">
                  <Step title="配方设计" description="完成基础配方" />
                  <Step title="化学测试" description="成分分析" status="finish" />
                  <Step title="感官测试" description="口感评估" status="finish" />
                  <Step title="稳定性测试" description="长期稳定性" />
                  <Step title="毒理学测试" description="安全性评估" />
                  <Step title="产品发布" description="上市准备" />
                </Steps>
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* 市场分析 */}
        <TabPane tab="市场分析" key="market" icon={<LineChartOutlined />}>
          <Row gutter={[16, 16]}>
            {marketData.map((item, index) => (
              <Col xs={24} lg={6} key={index}>
                <Card>
                  <Statistic
                    title={item.category}
                    value={item.growth}
                    suffix="%"
                    prefix={<RocketOutlined />}
                    valueStyle={{
                      color: item.trend === 'up' ? '#52c41a' : '#faad14'
                    }}
                  />
                  <Divider style={{ margin: '12px 0' }} />
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    市场规模: {item.size}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    年增长: {item.growth}%
                  </div>
                  <Progress
                    percent={item.growth}
                    size="small"
                    strokeColor={item.trend === 'up' ? '#52c41a' : '#faad14'}
                    style={{ marginTop: 8 }}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          <Card title="消费者画像" style={{ marginTop: 16 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={8}>
                <Card size="small" title="年龄分布">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <span>18-25岁: </span>
                      <Progress percent={25} size="small" />
                    </div>
                    <div>
                      <span>26-35岁: </span>
                      <Progress percent={40} size="small" strokeColor="#52c41a" />
                    </div>
                    <div>
                      <span>36-45岁: </span>
                      <Progress percent={25} size="small" strokeColor="#faad14" />
                    </div>
                    <div>
                      <span>46岁以上: </span>
                      <Progress percent={10} size="small" strokeColor="#f5222d" />
                    </div>
                  </Space>
                </Card>
              </Col>

              <Col xs={24} lg={8}>
                <Card size="small" title="消费动机">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <span>减害需求: </span>
                      <Progress percent={65} size="small" />
                    </div>
                    <div>
                      <span>社交需求: </span>
                      <Progress percent={45} size="small" strokeColor="#faad14" />
                    </div>
                    <div>
                      <span>口感追求: </span>
                      <Progress percent={55} size="small" strokeColor="#722ed1" />
                    </div>
                    <div>
                      <span>便捷性: </span>
                      <Progress percent={70} size="small" strokeColor="#52c41a" />
                    </div>
                  </Space>
                </Card>
              </Col>

              <Col xs={24} lg={8}>
                <Card size="small" title="产品偏好">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <span>电子烟: </span>
                      <Progress percent={60} size="small" />
                    </div>
                    <div>
                      <span>HNB: </span>
                      <Progress percent={25} size="small" strokeColor="#faad14" />
                    </div>
                    <div>
                      <span>尼古丁袋: </span>
                      <Progress percent={10} size="small" strokeColor="#722ed1" />
                    </div>
                    <div>
                      <span>其他: </span>
                      <Progress percent={5} size="small" strokeColor="#f5222d" />
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>

        {/* 法规标准 */}
        <TabPane tab="法规标准" key="regulations" icon={<FileTextOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="主要法规" size="small">
                <Timeline>
                  <Timeline.Item color="red">
                    <div style={{ fontWeight: 'bold' }}>FDA烟草产品控制</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      美国FDA对电子烟和HNB产品的监管要求
                    </div>
                  </Timeline.Item>
                  <Timeline.Item color="orange">
                    <div style={{ fontWeight: 'bold' }}>TPD欧盟指令</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      欧盟烟草产品指令对新型烟草的要求
                    </div>
                  </Timeline.Item>
                  <Timeline.Item color="blue">
                    <div style={{ fontWeight: 'bold' }}>国标GB标准</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      中国国家标准对电子烟的规范
                    </div>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                    <div style={{ fontWeight: 'bold' }}>WHO FCTC</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      世界卫生组织烟草控制框架公约
                    </div>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="质量标准" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 8 }}>化学成分限制</div>
                    <div style={{ fontSize: '12px' }}>
                      • 尼古丁纯度 ≥99.5%<br/>
                      • PG/VG纯度 ≥99.0%<br/>
                      • 重金属 <10ppm<br/>
                      • 亚硝amines <4ppb<br/>
                      • 甲醛 <20μg/g
                    </div>
                  </div>

                  <Divider style={{ margin: '8px 0' }} />

                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 8 }}>包装标签要求</div>
                    <div style={{ fontSize: '12px' }}>
                      • 健康警示语<br/>
                      • 尼古丁含量标识<br/>
                      • 成分列表<br/>
                      • 使用说明<br/>
                      • 禁止销售给未成年人
                    </div>
                  </div>

                  <Divider style={{ margin: '8px 0' }} />

                  <Alert
                    message="合规提醒"
                    description="产品上市前需完成所有必要的注册和审批流程"
                    type="warning"
                    showIcon
                  />
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* 配方详情模态框 */}
      <Modal
        title={
          modalType === 'create' ? '新建新型烟草配方' :
          modalType === 'edit' ? '编辑新型烟草配方' : '配方详情'
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={900}
        footer={modalType === 'view' ? [
          <Button key="close" onClick={() => setModalVisible(false)}>
            关闭
          </Button>,
          <Button key="export" type="primary" icon={<DownloadOutlined />}>
            导出配方
          </Button>
        ] : [
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" icon={<SaveOutlined />}>
            {modalType === 'create' ? '创建' : '保存'}
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="配方名称">
                <Input placeholder="请输入配方名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="产品类型">
                <Select placeholder="请选择产品类型">
                  <Option value="e_cigarette">电子烟</Option>
                  <Option value="HNB">加热不燃烧</Option>
                  <Option value="nicotine_pouch">尼古丁袋</Option>
                  <Option value="oral_spray">口腔喷雾</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="尼古丁强度 (mg/ml)">
                <InputNumber min={0} max={24} step={3} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="烟雾量">
                <Select placeholder="请选择">
                  <Option value="low">低</Option>
                  <Option value="medium">中</Option>
                  <Option value="high">高</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="击喉感">
                <Select placeholder="请选择">
                  <Option value="low">弱</Option>
                  <Option value="medium">中</Option>
                  <Option value="high">强</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="风味特征（可多选）">
            <Checkbox.Group>
              <Row>
                <Col span={6}><Checkbox value="烟草">烟草</Checkbox></Col>
                <Col span={6}><Checkbox value="薄荷">薄荷</Checkbox></Col>
                <Col span={6}><Checkbox value="水果">水果</Checkbox></Col>
                <Col span={6}><Checkbox value="甜味">甜味</Checkbox></Col>
                <Col span={6}><Checkbox value="坚果">坚果</Checkbox></Col>
                <Col span={6}><Checkbox value="巧克力">巧克力</Checkbox></Col>
                <Col span={6}><Checkbox value="咖啡">咖啡</Checkbox></Col>
                <Col span={6}><Checkbox value="香草">香草</Checkbox></Col>
                <Col span={6}><Checkbox value="焦糖">焦糖</Checkbox></Col>
                <Col span={6}><Checkbox value="奶油">奶油</Checkbox></Col>
                <Col span={6}><Checkbox value="香料">香料</Checkbox></Col>
                <Col span={6}><Checkbox value="木质">木质</Checkbox></Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="配方描述">
            <TextArea rows={3} placeholder="请输入配方描述" />
          </Form.Item>

          <Divider>组分信息</Divider>

          <Form.Item label="丙二醇 (%)">
            <Slider min={0} max={100} step={5} defaultValue={50} />
          </Form.Item>

          <Form.Item label="植物甘油 (%)">
            <Slider min={0} max={100} step={5} defaultValue={40} />
          </Form.Item>

          <Form.Item label="尼古丁 (%)">
            <Slider min={0} max={20} step={0.5} defaultValue={5} />
          </Form.Item>

          <Form.Item label="香精香料 (%)">
            <Slider min={0} max={15} step={1} defaultValue={5} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default NewProductDesign
