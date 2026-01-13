import React, { useState } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Modal, Form, Input, Select, Progress, Alert, Slider, Divider, Steps, Timeline, InputNumber, Checkbox, Radio } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExperimentOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
  FireOutlined,
  ThunderboltOutlined,
  LineChartOutlined,
  FileTextOutlined,
  SettingOutlined,
  PlayCircleOutlined,
  SaveOutlined,
  DownloadOutlined,
  UploadOutlined,
  RadarChartOutlined,
  HeartOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input
const { Step } = Steps

// 雪茄类型
enum CigarType {
  CUBAN = 'cuban',
  DOMINICAN = 'dominican',
  NICARAGUAN = 'nicaraguan',
  HONDURAN = 'honduran',
  BRAZILIAN = 'brazilian',
  INDONESIAN = 'indonesian',
  CHINESE = 'chinese'
}

// 雪茄尺寸
interface CigarSize {
  id: string
  name: string
  length: number  // 英寸
  ringGauge: number  // 环径（64英寸的1/64）
  category: 'small' | 'medium' | 'large' | 'extra_large'
  smokingTime: string  // 吸食时间
}

// 雪茄配方
interface CigarFormula {
  id: string
  name: string
  type: CigarType
  size: CigarSize
  wrapper: string  // 包皮叶
  binder: string  // 绑叶
  filler: string[]  // 芯叶（可多种）
  strength: 'mild' | 'medium' | 'full'  // 浓度
  flavor: string[]  // 风味特征
  status: 'designing' | 'testing' | 'approved' | 'production'
  creator: string
  createTime: string
  updateTime: string
  description: string
}

// 发酵工艺参数
interface FermentationProcess {
  id: string
  stage: string  // 发酵阶段
  temperature: number  // 温度
  humidity: number  // 湿度
  duration: number  // 持续时间（天）
  ph: number  // pH值
  colorChange: string  // 颜色变化
  aroma: string  // 香气
}

const CigarDesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState('design')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedFormula, setSelectedFormula] = useState<CigarFormula | null>(null)

  // 雪茄尺寸数据
  const cigarSizes: CigarSize[] = [
    { id: 'CS001', name: 'Corona', length: 5.5, ringGauge: 42, category: 'medium', smokingTime: '30-40分钟' },
    { id: 'CS002', name: 'Robusto', length: 5, ringGauge: 50, category: 'medium', smokingTime: '25-35分钟' },
    { id: 'CS003', name: 'Toro', length: 6, ringGauge: 50, category: 'large', smokingTime: '40-50分钟' },
    { id: 'CS004', name: 'Churchill', length: 7, ringGauge: 48, category: 'large', smokingTime: '50-70分钟' },
    { id: 'CS005', name: 'Double Corona', length: 7.5, ringGauge: 50, category: 'extra_large', smokingTime: '60-80分钟' },
    { id: 'CS006', name: 'Panatela', length: 5, ringGauge: 34, category: 'small', smokingTime: '20-30分钟' },
    { id: 'CS007', name: 'Lonsdale', length: 6.5, ringGauge: 42, category: 'large', smokingTime: '35-45分钟' },
    { id: 'CS008', name: 'Perfecto', length: 4.5, ringGauge: 52, category: 'medium', smokingTime: '25-35分钟' },
    { id: 'CS009', name: 'Torpedo', length: 6, ringGauge: 52, category: 'large', smokingTime: '45-60分钟' },
    { id: 'CS010', name: 'Belicoso', length: 5.5, ringGauge: 50, category: 'medium', smokingTime: '35-45分钟' }
  ]

  // 雪茄配方数据
  const cigarFormulas: CigarFormula[] = [
    {
      id: 'CF001',
      name: '古巴经典皇冠',
      type: CigarType.CUBAN,
      size: cigarSizes[0],  // Corona
      wrapper: '古巴Connecticut Shade叶',
      binder: '古巴Volado叶',
      filler: ['古巴Ligero叶', '古巴Seco叶', '古巴Volado叶'],
      strength: 'medium',
      flavor: ['雪松', '坚果', '咖啡', '皮革'],
      status: 'production',
      creator: '王雪茄师',
      createTime: '2024-01-15 10:30:00',
      updateTime: '2024-03-20 14:20:00',
      description: '经典古巴风味，平衡的口感和香气'
    },
    {
      id: 'CF002',
      name: '多米尼加罗布斯图',
      type: CigarType.DOMINICAN,
      size: cigarSizes[1],  // Robusto
      wrapper: '多米尼加Connecticut叶',
      binder: '多米尼加Olor叶',
      filler: ['多米尼加 Piloto Cubano叶', '多米尼加Olor叶'],
      strength: 'mild',
      flavor: ['香草', '奶油', '蜂蜜', '白胡椒'],
      status: 'production',
      creator: '李雪茄师',
      createTime: '2024-02-10 11:20:00',
      updateTime: '2024-03-18 16:30:00',
      description: '温和的多米尼加风格，适合新手'
    },
    {
      id: 'CF003',
      name: '尼加拉瓜教堂',
      type: CigarType.NICARAGUAN,
      size: cigarSizes[3],  // Churchill
      wrapper: '尼加拉瓜Cubano叶',
      binder: '尼加拉瓜Jalapa叶',
      filler: ['尼加拉瓜 Estelí Ligero叶', '尼加拉瓜 Jalapa叶', '尼加拉瓜 Condega叶'],
      strength: 'full',
      flavor: ['黑巧克力', '黑胡椒', '泥土', '烟熏'],
      status: 'testing',
      creator: '张雪茄师',
      createTime: '2024-02-20 09:15:00',
      updateTime: '2024-03-22 13:40:00',
      description: '浓烈的尼加拉瓜风味，资深雪茄客首选'
    },
    {
      id: 'CF004',
      name: '巴西特制鱼雷',
      type: CigarType.BRAZILIAN,
      size: cigarSizes[8],  // Torpedo
      wrapper: '巴西Mata Fina叶',
      binder: '巴西Bahia叶',
      filler: ['巴西Mata Fina叶', '巴西Mata Norte叶'],
      strength: 'medium',
      flavor: ['可可', '干果', '香料', '木质'],
      status: 'approved',
      creator: '赵雪茄师',
      createTime: '2024-03-05 14:45:00',
      updateTime: '2024-03-25 10:20:00',
      description: '独特的巴西风味，甜味浓郁'
    },
    {
      id: 'CF005',
      name: '中国醇香罗布斯图',
      type: CigarType.CHINESE,
      size: cigarSizes[1],  // Robusto
      wrapper: '中国云贵烟叶',
      binder: '中国福建烟叶',
      filler: ['中国云南烟叶', '中国贵州烟叶', '中国河南烟叶'],
      strength: 'medium',
      flavor: ['枣香', '桂花', '茶香', '陈皮'],
      status: 'designing',
      creator: '孙雪茄师',
      createTime: '2024-03-15 08:30:00',
      updateTime: '2024-03-26 15:10:00',
      description: '中国特色雪茄，融合传统茶香'
    }
  ]

  // 发酵工艺数据
  const fermentationProcesses: FermentationProcess[] = [
    {
      id: 'FP001',
      stage: '第一阶段-堆积发酵',
      temperature: 35,
      humidity: 75,
      duration: 15,
      ph: 5.2,
      colorChange: '绿色→浅黄色',
      aroma: '青草味'
    },
    {
      id: 'FP002',
      stage: '第二阶段-转化发酵',
      temperature: 40,
      humidity: 70,
      duration: 20,
      ph: 5.5,
      colorChange: '浅黄色→金黄色',
      aroma: '果香'
    },
    {
      id: 'FP003',
      stage: '第三阶段-成熟发酵',
      temperature: 38,
      humidity: 65,
      duration: 25,
      ph: 5.8,
      colorChange: '金黄色→红棕色',
      aroma: '醇香'
    },
    {
      id: 'FP004',
      stage: '第四阶段-陈化发酵',
      temperature: 32,
      humidity: 60,
      duration: 180,
      ph: 6.0,
      colorChange: '红棕色→深棕色',
      aroma: '陈香'
    }
  ]

  // 雪茄特征分析
  const cigarProfiles = [
    { name: '浓度分布', data: [
      { label: '温和', value: 20, color: '#52c41a' },
      { label: '中等', value: 45, color: '#faad14' },
      { label: '浓烈', value: 35, color: '#f5222d' }
    ]},
    { name: '风味类型', data: [
      { label: '木质香', value: 25, color: '#8c8c8c' },
      { label: '坚果香', value: 20, color: '#d4b106' },
      { label: '香料', value: 15, color: '#fa8c16' },
      { label: '甜味', value: 18, color: '#52c41a' },
      { label: '果香', value: 12, color: '#eb2f96' },
      { label: '泥土香', value: 10, color: '#597ef7' }
    ]},
    { name: '尺寸偏好', data: [
      { label: 'Robusto', value: 35, color: '#1890ff' },
      { label: 'Corona', value: 25, color: '#52c41a' },
      { label: 'Churchill', value: 20, color: '#faad14' },
      { label: 'Toro', value: 12, color: '#eb2f96' },
      { label: '其他', value: 8, color: '#8c8c8c' }
    ]}
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">雪茄烟数字化设计</h1>
        <p className="page-description">
          雪茄配方设计、工艺参数优化、品质仿真验证
        </p>
      </div>

      {/* 统计概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="配方数量"
              value={cigarFormulas.length}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="生产中"
              value={cigarFormulas.filter(f => f.status === 'production').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="测试中"
              value={cigarFormulas.filter(f => f.status === 'testing').length}
              prefix={<ExperimentOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="设计尺寸"
              value={cigarSizes.length}
              prefix={<StarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        {/* 配方设计 */}
        <TabPane tab="配方设计" key="design" icon={<FileTextOutlined />}>
          <Card
            title="雪茄配方管理"
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
              <Select placeholder="雪茄类型" style={{ width: 150 }} allowClear>
                <Option value="cuban">古巴型</Option>
                <Option value="dominican">多米尼加型</Option>
                <Option value="nicaraguan">尼加拉瓜型</Option>
                <Option value="honduran">洪都拉斯型</Option>
                <Option value="brazilian">巴西型</Option>
                <Option value="chinese">中国型</Option>
              </Select>
              <Select placeholder="浓度" style={{ width: 120 }} allowClear>
                <Option value="mild">温和</Option>
                <Option value="medium">中等</Option>
                <Option value="full">浓烈</Option>
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
                  title: '类型',
                  dataIndex: 'type',
                  key: 'type',
                  render: (type: CigarType) => {
                    const typeNames = {
                      cuban: '古巴型',
                      dominican: '多米尼加型',
                      nicaraguan: '尼加拉瓜型',
                      honduran: '洪都拉斯型',
                      brazilian: '巴西型',
                      indonesian: '印度尼西亚型',
                      chinese: '中国型'
                    }
                    return <Tag color="blue">{typeNames[type]}</Tag>
                  }
                },
                {
                  title: '尺寸',
                  key: 'size',
                  render: (record: CigarFormula) => (
                    <div>
                      <div>{record.size.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {record.size.length}" × {record.size.ringGauge}
                      </div>
                    </div>
                  )
                },
                {
                  title: '浓度',
                  dataIndex: 'strength',
                  key: 'strength',
                  render: (strength: string) => {
                    const configs = {
                      mild: { color: 'green', text: '温和' },
                      medium: { color: 'orange', text: '中等' },
                      full: { color: 'red', text: '浓烈' }
                    }
                    const config = configs[strength as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '风味特征',
                  dataIndex: 'flavor',
                  key: 'flavor',
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
                  render: (record: CigarFormula) => (
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
              dataSource={cigarFormulas}
              rowKey="id"
              pagination={{
                total: cigarFormulas.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        {/* 工艺设计 */}
        <TabPane tab="工艺设计" key="process" icon={<SettingOutlined />}>
          <Row gutter={[16, 16]}>
            {/* 发酵工艺 */}
            <Col xs={24} lg={12}>
              <Card title="发酵工艺参数" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert
                    message="发酵工艺优化"
                    description="调整温度、湿度和时间，优化烟叶发酵效果"
                    type="info"
                    size="small"
                    showIcon
                  />

                  {fermentationProcesses.map((process, index) => (
                    <Card
                      key={process.id}
                      size="small"
                      title={process.stage}
                      style={{ marginTop: 8 }}
                    >
                      <Row gutter={16}>
                        <Col span={8}>
                          <div style={{ marginBottom: 8 }}>
                            <div style={{ fontSize: '12px', color: '#666' }}>温度</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1890ff' }}>
                              {process.temperature}°C
                            </div>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div style={{ marginBottom: 8 }}>
                            <div style={{ fontSize: '12px', color: '#666' }}>湿度</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#52c41a' }}>
                              {process.humidity}%
                            </div>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div style={{ marginBottom: 8 }}>
                            <div style={{ fontSize: '12px', color: '#666' }}>时长</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#faad14' }}>
                              {process.duration}天
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Divider style={{ margin: '8px 0' }} />
                      <Row gutter={16}>
                        <Col span={8}>
                          <div style={{ fontSize: '12px' }}>
                            <span>pH值: </span>
                            <span style={{ fontWeight: 'bold' }}>{process.ph}</span>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div style={{ fontSize: '12px' }}>
                            <span>颜色: </span>
                            <span style={{ fontWeight: 'bold' }}>{process.colorChange}</span>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div style={{ fontSize: '12px' }}>
                            <span>香气: </span>
                            <span style={{ fontWeight: 'bold' }}>{process.aroma}</span>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  ))}

                  <Button type="primary" icon={<SaveOutlined />} block style={{ marginTop: 16 }}>
                    保存工艺参数
                  </Button>
                </Space>
              </Card>
            </Col>

            {/* 卷制工艺 */}
            <Col xs={24} lg={12}>
              <Card title="卷制工艺参数" size="small">
                <Form layout="vertical" size="small">
                  <Form.Item label="卷制密度 (g/cm³)">
                    <Slider
                      min={0.2}
                      max={0.5}
                      step={0.01}
                      defaultValue={0.32}
                      marks={{ 0.2: '0.2', 0.32: '0.32', 0.5: '0.5' }}
                    />
                  </Form.Item>

                  <Form.Item label="卷制紧度 (%)">
                    <Slider
                      min={60}
                      max={95}
                      step={1}
                      defaultValue={80}
                      marks={{ 60: '60', 80: '80', 95: '95' }}
                    />
                  </Form.Item>

                  <Form.Item label="燃烧速度 (mm/min)">
                    <Slider
                      min={3}
                      max={10}
                      step={0.5}
                      defaultValue={5.5}
                      marks={{ 3: '3', 5.5: '5.5', 10: '10' }}
                    />
                  </Form.Item>

                  <Form.Item label="抽吸阻力 (Pa)">
                    <Slider
                      min={500}
                      max={1500}
                      step={50}
                      defaultValue={1000}
                      marks={{ 500: '500', 1000: '1000', 1500: '1500' }}
                    />
                  </Form.Item>

                  <Divider />

                  <Form.Item label="外观质量标准">
                    <Checkbox.Group style={{ width: '100%' }}>
                      <Row>
                        <Col span={12}>
                          <Checkbox value="wrapper_color">包皮颜色均匀</Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="wrapper_oil">包皮油光适中</Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="vein_visible">叶脉清晰可见</Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="cap_shape">帽型规整</Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="body_straight">烟身笔直</Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="band_alignment"> band位置准确</Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>

          {/* 陈化工艺 */}
          <Card title="陈化工艺参数" style={{ marginTop: 16 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={8}>
                <Card size="small" title="陈化环境">
                  <Form layout="vertical" size="small">
                    <Form.Item label="温度 (°C)">
                      <Slider
                        min={18}
                        max={24}
                        defaultValue={20}
                        marks={{ 18: '18', 20: '20', 24: '24' }}
                      />
                    </Form.Item>
                    <Form.Item label="湿度 (%)">
                      <Slider
                        min={55}
                        max={75}
                        defaultValue={65}
                        marks={{ 55: '55', 65: '65', 75: '75' }}
                      />
                    </Form.Item>
                    <Form.Item label="陈化时间 (月)">
                      <Radio.Group defaultValue="12">
                        <Radio value={6}>6个月</Radio>
                        <Radio value={12}>12个月</Radio>
                        <Radio value={24}>24个月</Radio>
                        <Radio value={36}>36个月</Radio>
                        <Radio value={48}>48个月以上</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>

              <Col xs={24} lg={8}>
                <Card size="small" title="陈化效果预测">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>风味变化</div>
                      <div style={{ marginBottom: 4 }}>
                        <span>辛辣感: </span>
                        <span style={{ color: '#52c41a' }}>-65%</span>
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <span>醇厚度: </span>
                        <span style={{ color: '#52c41a' }}>+80%</span>
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <span>复杂度: </span>
                        <span style={{ color: '#52c41a' }}>+70%</span>
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <span>甜度: </span>
                        <span style={{ color: '#52c41a' }}>+45%</span>
                      </div>
                    </div>

                    <Divider style={{ margin: '8px 0' }} />

                    <div>
                      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>品质提升</div>
                      <div style={{ marginBottom: 8 }}>
                        <span>整体评分: </span>
                        <Progress percent={85} size="small" />
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <span>口感协调性: </span>
                        <Progress percent={88} size="small" strokeColor="#faad14" />
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <span>燃烧性能: </span>
                        <Progress percent={82} size="small" strokeColor="#722ed1" />
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>

              <Col xs={24} lg={8}>
                <Card size="small" title="品质监控">
                  <Timeline>
                    <Timeline.Item color="green">
                      <div style={{ fontWeight: 'bold' }}>3个月</div>
                      <div style={{ fontSize: '12px' }}>青草味消退</div>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      <div style={{ fontWeight: 'bold' }}>6个月</div>
                      <div style={{ fontSize: '12px' }}>基础风味形成</div>
                    </Timeline.Item>
                    <Timeline.Item color="blue">
                      <div style={{ fontWeight: 'bold' }}>12个月</div>
                      <div style={{ fontSize: '12px' }}>风味平衡融合</div>
                    </Timeline.Item>
                    <Timeline.Item color="gray">
                      <div style={{ fontWeight: 'bold' }}>24个月</div>
                      <div style={{ fontSize: '12px' }}>达到最佳状态</div>
                    </Timeline.Item>
                  </Timeline>
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>

        {/* 品质仿真 */}
        <TabPane tab="品质仿真" key="simulation" icon={<ExperimentOutlined />}>
          <Row gutter={[16, 16]}>
            {/* 配方优化 */}
            <Col xs={24} lg={12}>
              <Card title="配方优化仿真" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert
                    message="AI配方优化"
                    description="基于遗传算法优化烟叶组合比例"
                    type="info"
                    size="small"
                    showIcon
                  />

                  <Form layout="vertical" size="small">
                    <Form.Item label="包皮叶比例 (%)">
                      <Slider
                        min={10}
                        max={20}
                        step={1}
                        defaultValue={15}
                        marks={{ 10: '10', 15: '15', 20: '20' }}
                      />
                    </Form.Item>
                    <Form.Item label="绑叶比例 (%)">
                      <Slider
                        min={5}
                        max={15}
                        step={1}
                        defaultValue={10}
                        marks={{ 5: '5', 10: '10', 15: '15' }}
                      />
                    </Form.Item>
                    <Form.Item label="芯叶Ligero比例 (%)">
                      <Slider
                        min={15}
                        max={35}
                        step={1}
                        defaultValue={25}
                        marks={{ 15: '15', 25: '25', 35: '35' }}
                      />
                    </Form.Item>
                    <Form.Item label="芯叶Seco比例 (%)">
                      <Slider
                        min={20}
                        max={40}
                        step={1}
                        defaultValue={30}
                        marks={{ 20: '20', 30: '30', 40: '40' }}
                      />
                    </Form.Item>
                    <Form.Item label="芯叶Volado比例 (%)">
                      <Slider
                        min={15}
                        max={30}
                        step={1}
                        defaultValue={20}
                        marks={{ 15: '15', 20: '20', 30: '30' }}
                      />
                    </Form.Item>
                  </Form>

                  <Button type="primary" icon={<PlayCircleOutlined />} block>
                    开始优化仿真
                  </Button>
                </Space>
              </Card>
            </Col>

            {/* 感官预测 */}
            <Col xs={24} lg={12}>
              <Card title="感官品质预测" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 12 }}>香气特征预测</div>
                    <div style={{ marginBottom: 8 }}>
                      <span>前调（点燃初期）: </span>
                      <Progress
                        percent={75}
                        size="small"
                        format={() => '雪松 + 胡椒'}
                      />
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <span>中调（燃烧中期）: </span>
                      <Progress
                        percent={82}
                        size="small"
                        strokeColor="#faad14"
                        format={() => '坚果 + 咖啡'}
                      />
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <span>后调（燃烧后期）: </span>
                      <Progress
                        percent={78}
                        size="small"
                        strokeColor="#722ed1"
                        format={() => '皮革 + 泥土'}
                      />
                    </div>
                  </div>

                  <Divider style={{ margin: '12px 0' }} />

                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 12 }}>口感特征预测</div>
                    <Row gutter={8}>
                      <Col span={12}>
                        <div style={{ marginBottom: 8 }}>
                          <span style={{ fontSize: '12px' }}>浓郁度</span>
                          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f5222d' }}>
                            8.5/10
                          </div>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{ marginBottom: 8 }}>
                          <span style={{ fontSize: '12px' }}>平衡性</span>
                          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#52c41a' }}>
                            9.0/10
                          </div>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{ marginBottom: 8 }}>
                          <span style={{ fontSize: '12px' }}>复杂度</span>
                          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#faad14' }}>
                            8.8/10
                          </div>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{ marginBottom: 8 }}>
                          <span style={{ fontSize: '12px' }}>持久度</span>
                          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#722ed1' }}>
                            8.2/10
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <Alert
                    message="仿真完成"
                    description="预测该配方将达到优秀品质评分"
                    type="success"
                    size="small"
                    showIcon
                  />
                </Space>
              </Card>
            </Col>
          </Row>

          {/* 市场分析 */}
          <Card title="市场趋势分析" style={{ marginTop: 16 }}>
            <Row gutter={[16, 16]}>
              {cigarProfiles.map((profile, index) => (
                <Col xs={24} lg={8} key={index}>
                  <Card size="small" title={profile.name}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      {profile.data.map((item, i) => (
                        <div key={i}>
                          <div style={{ marginBottom: 4 }}>
                            <span>{item.label}: </span>
                            <span style={{ fontWeight: 'bold', color: item.color }}>
                              {item.value}%
                            </span>
                          </div>
                          <Progress
                            percent={item.value}
                            size="small"
                            strokeColor={item.color}
                            showInfo={false}
                          />
                        </div>
                      ))}
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </TabPane>

        {/* 标准管理 */}
        <TabPane tab="标准管理" key="standards" icon={<LineChartOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="尺寸标准" size="small">
                <Table
                  size="small"
                  dataSource={cigarSizes}
                  rowKey="id"
                  pagination={false}
                  columns={[
                    { title: '名称', dataIndex: 'name', key: 'name' },
                    {
                      title: '长度(英寸)',
                      dataIndex: 'length',
                      key: 'length',
                      render: (val: number) => `${val}"`
                    },
                    { title: '环径', dataIndex: 'ringGauge', key: 'ringGauge' },
                    {
                      title: '分类',
                      dataIndex: 'category',
                      key: 'category',
                      render: (cat: string) => {
                        const map = {
                          small: { text: '小型', color: 'green' },
                          medium: { text: '中型', color: 'blue' },
                          large: { text: '大型', color: 'orange' },
                          extra_large: { text: '特大型', color: 'red' }
                        }
                        const cfg = map[cat as keyof typeof map]
                        return <Tag color={cfg.color}>{cfg.text}</Tag>
                      }
                    },
                    { title: '吸食时间', dataIndex: 'smokingTime', key: 'smokingTime' }
                  ]}
                />
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="质量标准" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 8 }}>外观标准</div>
                    <div style={{ fontSize: '12px' }}>
                      • 包皮颜色均匀，无斑点<br/>
                      • 叶脉分布均匀，清晰可见<br/>
                      • 帽型规整，收口紧密<br/>
                      • 烟身笔直，无弯曲<br/>
                      • band位置准确，无歪斜
                    </div>
                  </div>

                  <Divider style={{ margin: '8px 0' }} />

                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 8 }}>物理标准</div>
                    <div style={{ fontSize: '12px' }}>
                      • 密度：0.30-0.35 g/cm³<br/>
                      • 紧度：75-85%<br/>
                      • 燃烧速度：4-7 mm/min<br/>
                      • 抽吸阻力：800-1200 Pa
                    </div>
                  </div>

                  <Divider style={{ margin: '8px 0' }} />

                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 8 }}>感官标准</div>
                    <div style={{ fontSize: '12px' }}>
                      • 香气浓郁，层次分明<br/>
                      • 口感醇厚，刺激适中<br/>
                      • 燃烧均匀，不熄火<br/>
                      • 灰色洁白，不散落
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* 配方详情模态框 */}
      <Modal
        title={
          modalType === 'create' ? '新建雪茄配方' :
          modalType === 'edit' ? '编辑雪茄配方' : '雪茄配方详情'
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
              <Form.Item label="雪茄类型">
                <Select placeholder="请选择雪茄类型">
                  <Option value="cuban">古巴型</Option>
                  <Option value="dominican">多米尼加型</Option>
                  <Option value="nicaraguan">尼加拉瓜型</Option>
                  <Option value="chinese">中国型</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="尺寸">
                <Select placeholder="请选择尺寸">
                  {cigarSizes.map(size => (
                    <Option key={size.id} value={size.id}>
                      {size.name} ({size.length}" × {size.ringGauge})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="浓度">
                <Select placeholder="请选择浓度">
                  <Option value="mild">温和</Option>
                  <Option value="medium">中等</Option>
                  <Option value="full">浓烈</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="状态">
                <Select placeholder="请选择状态">
                  <Option value="designing">设计中</Option>
                  <Option value="testing">测试中</Option>
                  <Option value="approved">已批准</Option>
                  <Option value="production">生产中</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="包皮叶">
                <Input placeholder="请输入包皮叶类型和产地" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="绑叶">
                <Input placeholder="请输入绑叶类型和产地" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="芯叶（可多种，用逗号分隔）">
                <Input placeholder="请输入芯叶类型和产地，如：古巴Ligero叶, 古巴Seco叶" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="风味特征（可多选）">
            <Checkbox.Group>
              <Row>
                <Col span={6}><Checkbox value="雪松">雪松</Checkbox></Col>
                <Col span={6}><Checkbox value="坚果">坚果</Checkbox></Col>
                <Col span={6}><Checkbox value="咖啡">咖啡</Checkbox></Col>
                <Col span={6}><Checkbox value="巧克力">巧克力</Checkbox></Col>
                <Col span={6}><Checkbox value="皮革">皮革</Checkbox></Col>
                <Col span={6}><Checkbox value="泥土">泥土</Checkbox></Col>
                <Col span={6}><Checkbox value="胡椒">胡椒</Checkbox></Col>
                <Col span={6}><Checkbox value="香草">香草</Checkbox></Col>
                <Col span={6}><Checkbox value="奶油">奶油</Checkbox></Col>
                <Col span={6}><Checkbox value="蜂蜜">蜂蜜</Checkbox></Col>
                <Col span={6}><Checkbox value="水果">水果</Checkbox></Col>
                <Col span={6}><Checkbox value="香料">香料</Checkbox></Col>
                <Col span={6}><Checkbox value="枣香">枣香</Checkbox></Col>
                <Col span={6}><Checkbox value="茶香">茶香</Checkbox></Col>
                <Col span={6}><Checkbox value="陈皮">陈皮</Checkbox></Col>
                <Col span={6}><Checkbox value="桂花">桂花</Checkbox></Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="配方描述">
            <TextArea rows={3} placeholder="请输入配方描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CigarDesign
