import React, { useState } from 'react'
import { Card, Table, Button, Input, Select, Space, Tag, Modal, Form, InputNumber, Tabs, Row, Col, Statistic, Progress, Alert, Slider, Divider } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  SettingOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  LineChartOutlined,
  ExperimentOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  BarChartOutlined
} from '@ant-design/icons'

const { Search } = Input
const { Option } = Select
const { TabPane } = Tabs

interface ProcessStandard {
  id: string
  name: string
  code: string
  category: string
  version: string
  status: string
  creator: string
  createTime: string
  updateTime: string
  description: string
  parameters: Array<{
    name: string
    value: string
    unit: string
    range: string
  }>
  qualityTargets: Array<{
    parameter: string
    target: string
    tolerance: string
  }>
}

interface ProductionBatch {
  id: string
  batchNo: string
  productName: string
  processStandard: string
  status: string
  startTime: string
  endTime?: string
  operator: string
  supervisor: string
  quantity: number
  unit: string
  progress: number
  qualityScore: number
  issues: number
}

interface QualityMapping {
  id: string
  processParameter: string
  qualityIndicator: string
  correlationLevel: string
  impactFactor: number
  controlRange: string
  recommendation: string
  lastUpdated: string
}

const ProcessManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('standards')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add')

  // 工艺标准数据
  const processStandards: ProcessStandard[] = [
    {
      id: 'PS001',
      name: '卷烟制丝工艺标准',
      code: 'PROC-001',
      category: '制丝工艺',
      version: 'V2.1',
      status: 'active',
      creator: '张工艺',
      createTime: '2024-03-15 09:30:00',
      updateTime: '2024-03-20 14:20:00',
      description: '标准制丝工艺流程，适用于常规卷烟产品',
      parameters: [
        { name: '切丝宽度', value: '0.8', unit: 'mm', range: '0.7-0.9' },
        { name: '烘丝温度', value: '85', unit: '℃', range: '80-90' },
        { name: '烘丝时间', value: '12', unit: 'min', range: '10-15' },
        { name: '含水率', value: '12.5', unit: '%', range: '11.5-13.5' }
      ],
      qualityTargets: [
        { parameter: '填充值', target: '3.2', tolerance: '±0.2' },
        { parameter: '含水率', target: '12.5%', tolerance: '±1%' },
        { parameter: '碎丝率', target: '<5%', tolerance: '±1%' }
      ]
    },
    {
      id: 'PS002',
      name: '卷接工艺标准',
      code: 'PROC-002',
      category: '卷接工艺',
      version: 'V1.8',
      status: 'active',
      creator: '李工艺',
      createTime: '2024-03-18 10:15:00',
      updateTime: '2024-03-22 16:45:00',
      description: '高速卷接工艺标准，确保产品质量稳定',
      parameters: [
        { name: '卷接速度', value: '8000', unit: '支/min', range: '7500-8500' },
        { name: '接装纸温度', value: '180', unit: '℃', range: '170-190' },
        { name: '胶液浓度', value: '15', unit: '%', range: '12-18' },
        { name: '圆周', value: '24.5', unit: 'mm', range: '24.3-24.7' }
      ],
      qualityTargets: [
        { parameter: '圆周', target: '24.5mm', tolerance: '±0.2mm' },
        { parameter: '硬度', target: '65%', tolerance: '±5%' },
        { parameter: '重量', target: '0.95g', tolerance: '±0.05g' }
      ]
    },
    {
      id: 'PS003',
      name: '包装工艺标准',
      code: 'PROC-003',
      category: '包装工艺',
      version: 'V1.5',
      status: 'active',
      creator: '王工艺',
      createTime: '2024-03-20 14:30:00',
      updateTime: '2024-03-25 11:20:00',
      description: '自动化包装工艺标准，提高包装效率',
      parameters: [
        { name: '包装速度', value: '450', unit: '包/min', range: '400-500' },
        { name: '封口温度', value: '160', unit: '℃', range: '150-170' },
        { name: '压力', value: '0.6', unit: 'MPa', range: '0.5-0.7' },
        { name: '薄膜张力', value: '25', unit: 'N', range: '20-30' }
      ],
      qualityTargets: [
        { parameter: '封口强度', target: '>15N', tolerance: '±2N' },
        { parameter: '外观质量', target: '合格', tolerance: '100%' },
        { parameter: '尺寸精度', target: '±0.5mm', tolerance: '±0.2mm' }
      ]
    },
    {
      id: 'PS004',
      name: '滤棒成型工艺',
      code: 'PROC-004',
      category: '滤棒工艺',
      version: 'V2.0',
      status: 'active',
      creator: '赵工艺',
      createTime: '2024-03-12 08:45:00',
      updateTime: '2024-03-18 13:30:00',
      description: '醋纤滤棒成型工艺标准',
      parameters: [
        { name: '成型速度', value: '6000', unit: '支/min', range: '5500-6500' },
        { name: '增塑剂含量', value: '8', unit: '%', range: '7-9' },
        { name: '丝束密度', value: '3.2', unit: 'g/cm³', range: '3.0-3.4' },
        { name: '切割长度', value: '20', unit: 'mm', range: '19.8-20.2' }
      ],
      qualityTargets: [
        { parameter: '圆周', target: '24.5mm', tolerance: '±0.15mm' },
        { parameter: '硬度', target: '85%', tolerance: '±3%' },
        { parameter: '压降', target: '1050Pa', tolerance: '±100Pa' }
      ]
    },
    {
      id: 'PS005',
      name: '香精添加工艺',
      code: 'PROC-005',
      category: '香精工艺',
      version: 'V1.3',
      status: 'testing',
      creator: '孙工艺',
      createTime: '2024-03-22 16:20:00',
      updateTime: '2024-03-26 09:15:00',
      description: '液体香精喷洒工艺标准',
      parameters: [
        { name: '喷洒量', value: '2.5', unit: 'ml/kg', range: '2.0-3.0' },
        { name: '喷洒温度', value: '45', unit: '℃', range: '40-50' },
        { name: '雾化压力', value: '0.3', unit: 'MPa', range: '0.25-0.35' },
        { name: '混合时间', value: '8', unit: 'min', range: '6-10' }
      ],
      qualityTargets: [
        { parameter: '分布均匀性', target: '>95%', tolerance: '±2%' },
        { parameter: '香精损失率', target: '<3%', tolerance: '±1%' },
        { parameter: '感官评分', target: '>8.0', tolerance: '±0.5' }
      ]
    },
    {
      id: 'PS006',
      name: '质量检测工艺',
      code: 'PROC-006',
      category: '检测工艺',
      version: 'V1.7',
      status: 'active',
      creator: '钱工艺',
      createTime: '2024-03-10 11:30:00',
      updateTime: '2024-03-15 15:45:00',
      description: '在线质量检测工艺标准',
      parameters: [
        { name: '检测频率', value: '1', unit: '次/小时', range: '0.5-2' },
        { name: '样品数量', value: '20', unit: '支', range: '15-25' },
        { name: '检测温度', value: '22', unit: '℃', range: '20-25' },
        { name: '相对湿度', value: '60', unit: '%', range: '55-65' }
      ],
      qualityTargets: [
        { parameter: '检测精度', target: '>99%', tolerance: '±0.5%' },
        { parameter: '响应时间', target: '<5min', tolerance: '±1min' },
        { parameter: '误检率', target: '<1%', tolerance: '±0.2%' }
      ]
    },
    {
      id: 'PS007',
      name: '环境控制工艺',
      code: 'PROC-007',
      category: '环境工艺',
      version: 'V1.2',
      status: 'active',
      creator: '周工艺',
      createTime: '2024-03-25 13:45:00',
      updateTime: '2024-03-28 10:30:00',
      description: '生产环境控制工艺标准',
      parameters: [
        { name: '温度', value: '22', unit: '℃', range: '20-25' },
        { name: '相对湿度', value: '60', unit: '%', range: '55-65' },
        { name: '洁净度', value: '10000', unit: '级', range: '≤10000' },
        { name: '风速', value: '0.5', unit: 'm/s', range: '0.3-0.7' }
      ],
      qualityTargets: [
        { parameter: '温度稳定性', target: '±1℃', tolerance: '±0.5℃' },
        { parameter: '湿度稳定性', target: '±3%', tolerance: '±1%' },
        { parameter: '空气质量', target: '优良', tolerance: '100%' }
      ]
    },
    {
      id: 'PS008',
      name: '设备维护工艺',
      code: 'PROC-008',
      category: '维护工艺',
      version: 'V2.3',
      status: 'active',
      creator: '吴工艺',
      createTime: '2024-03-28 09:20:00',
      updateTime: '2024-03-30 14:50:00',
      description: '设备预防性维护工艺标准',
      parameters: [
        { name: '维护周期', value: '7', unit: '天', range: '5-10' },
        { name: '润滑油更换', value: '30', unit: '天', range: '25-35' },
        { name: '清洁频率', value: '2', unit: '次/天', range: '1-3' },
        { name: '检查项目', value: '15', unit: '项', range: '12-18' }
      ],
      qualityTargets: [
        { parameter: '设备完好率', target: '>98%', tolerance: '±1%' },
        { parameter: '故障率', target: '<2%', tolerance: '±0.5%' },
        { parameter: '维护及时率', target: '100%', tolerance: '±2%' }
      ]
    }
  ]

  // 生产批次数据
  const productionBatches: ProductionBatch[] = [
    {
      id: 'PB001',
      batchNo: 'B2024032001',
      productName: '经典红塔山',
      processStandard: '卷烟制丝工艺标准',
      status: 'completed',
      startTime: '2024-03-20 08:00:00',
      endTime: '2024-03-20 16:30:00',
      operator: '张操作员',
      supervisor: '李主管',
      quantity: 50000,
      unit: '支',
      progress: 100,
      qualityScore: 96.5,
      issues: 0
    },
    {
      id: 'PB002',
      batchNo: 'B2024032002',
      productName: '玉溪软包',
      processStandard: '卷接工艺标准',
      status: 'in_progress',
      startTime: '2024-03-21 09:00:00',
      operator: '王操作员',
      supervisor: '赵主管',
      quantity: 45000,
      unit: '支',
      progress: 75,
      qualityScore: 94.2,
      issues: 1
    },
    {
      id: 'PB003',
      batchNo: 'B2024032003',
      productName: '中华硬盒',
      processStandard: '包装工艺标准',
      status: 'pending',
      startTime: '2024-03-22 10:00:00',
      operator: '刘操作员',
      supervisor: '孙主管',
      quantity: 60000,
      unit: '支',
      progress: 0,
      qualityScore: 0,
      issues: 0
    },
    {
      id: 'PB004',
      batchNo: 'B2024032004',
      productName: '云烟软珍',
      processStandard: '滤棒成型工艺',
      status: 'completed',
      startTime: '2024-03-19 14:00:00',
      endTime: '2024-03-19 22:00:00',
      operator: '陈操作员',
      supervisor: '周主管',
      quantity: 40000,
      unit: '支',
      progress: 100,
      qualityScore: 98.1,
      issues: 0
    },
    {
      id: 'PB005',
      batchNo: 'B2024032005',
      productName: '黄鹤楼硬盒',
      processStandard: '香精添加工艺',
      status: 'in_progress',
      startTime: '2024-03-22 15:30:00',
      operator: '杨操作员',
      supervisor: '吴主管',
      quantity: 35000,
      unit: '支',
      progress: 45,
      qualityScore: 92.8,
      issues: 2
    },
    {
      id: 'PB006',
      batchNo: 'B2024032006',
      productName: '芙蓉王软包',
      processStandard: '质量检测工艺',
      status: 'error',
      startTime: '2024-03-21 11:00:00',
      operator: '马操作员',
      supervisor: '钱主管',
      quantity: 55000,
      unit: '支',
      progress: 30,
      qualityScore: 85.6,
      issues: 5
    },
    {
      id: 'PB007',
      batchNo: 'B2024032007',
      productName: '利群软包',
      processStandard: '环境控制工艺',
      status: 'completed',
      startTime: '2024-03-18 13:00:00',
      endTime: '2024-03-18 21:30:00',
      operator: '朱操作员',
      supervisor: '徐主管',
      quantity: 48000,
      unit: '支',
      progress: 100,
      qualityScore: 97.3,
      issues: 0
    },
    {
      id: 'PB008',
      batchNo: 'B2024032008',
      productName: '苏烟硬盒',
      processStandard: '设备维护工艺',
      status: 'pending',
      startTime: '2024-03-23 08:30:00',
      operator: '胡操作员',
      supervisor: '林主管',
      quantity: 42000,
      unit: '支',
      progress: 0,
      qualityScore: 0,
      issues: 0
    }
  ]

  // 工艺质量映射数据
  const qualityMappings: QualityMapping[] = [
    {
      id: 'QM001',
      processParameter: '切丝宽度',
      qualityIndicator: '填充值',
      correlationLevel: 'high',
      impactFactor: 0.85,
      controlRange: '0.7-0.9mm',
      recommendation: '保持切丝宽度在0.8±0.1mm范围内',
      lastUpdated: '2024-03-20'
    },
    {
      id: 'QM002',
      processParameter: '烘丝温度',
      qualityIndicator: '含水率',
      correlationLevel: 'high',
      impactFactor: 0.92,
      controlRange: '80-90℃',
      recommendation: '温度每升高1℃，含水率降低0.2%',
      lastUpdated: '2024-03-21'
    },
    {
      id: 'QM003',
      processParameter: '卷接速度',
      qualityIndicator: '圆周精度',
      correlationLevel: 'medium',
      impactFactor: 0.68,
      controlRange: '7500-8500支/min',
      recommendation: '速度过快会影响圆周稳定性',
      lastUpdated: '2024-03-22'
    },
    {
      id: 'QM004',
      processParameter: '胶液浓度',
      qualityIndicator: '接装强度',
      correlationLevel: 'high',
      impactFactor: 0.89,
      controlRange: '12-18%',
      recommendation: '浓度在15%时接装强度最佳',
      lastUpdated: '2024-03-19'
    },
    {
      id: 'QM005',
      processParameter: '包装速度',
      qualityIndicator: '封口质量',
      correlationLevel: 'medium',
      impactFactor: 0.72,
      controlRange: '400-500包/min',
      recommendation: '速度超过480包/min时需加强质量监控',
      lastUpdated: '2024-03-23'
    },
    {
      id: 'QM006',
      processParameter: '增塑剂含量',
      qualityIndicator: '滤棒硬度',
      correlationLevel: 'high',
      impactFactor: 0.94,
      controlRange: '7-9%',
      recommendation: '含量每增加1%，硬度提高3-5%',
      lastUpdated: '2024-03-18'
    },
    {
      id: 'QM007',
      processParameter: '喷洒量',
      qualityIndicator: '香精分布',
      correlationLevel: 'high',
      impactFactor: 0.87,
      controlRange: '2.0-3.0ml/kg',
      recommendation: '2.5ml/kg时分布最均匀',
      lastUpdated: '2024-03-24'
    },
    {
      id: 'QM008',
      processParameter: '环境湿度',
      qualityIndicator: '产品稳定性',
      correlationLevel: 'medium',
      impactFactor: 0.76,
      controlRange: '55-65%',
      recommendation: '湿度波动超过±5%时需调整',
      lastUpdated: '2024-03-25'
    }
  ]

  const standardColumns = [
    {
      title: '工艺编号',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <a>{text}</a>
    },
    {
      title: '工艺名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="blue">{category}</Tag>
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      render: (version: string) => <Tag color="green">{version}</Tag>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = { active: 'green', testing: 'orange', inactive: 'red' }
        const names = { active: '生效', testing: '测试中', inactive: '停用' }
        return <Tag color={colors[status as keyof typeof colors]}>{names[status as keyof typeof names]}</Tag>
      }
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} size="small">
            查看
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small">
            编辑
          </Button>
          <Button type="link" icon={<DeleteOutlined />} size="small" danger>
            删除
          </Button>
        </Space>
      )
    }
  ]

  const batchColumns = [
    {
      title: '批次号',
      dataIndex: 'batchNo',
      key: 'batchNo',
      render: (text: string) => <a>{text}</a>
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName'
    },
    {
      title: '工艺标准',
      dataIndex: 'processStandard',
      key: 'processStandard'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const configs = {
          pending: { color: 'orange', text: '待开始' },
          in_progress: { color: 'blue', text: '进行中' },
          completed: { color: 'green', text: '已完成' },
          error: { color: 'red', text: '异常' }
        }
        const config = configs[status as keyof typeof configs]
        return <Tag color={config.color}>{config.text}</Tag>
      }
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      )
    },
    {
      title: '质量评分',
      dataIndex: 'qualityScore',
      key: 'qualityScore',
      render: (score: number) => (
        <span style={{ color: score >= 95 ? '#52c41a' : score >= 90 ? '#faad14' : '#f5222d' }}>
          {score > 0 ? score.toFixed(1) : '-'}
        </span>
      )
    },
    {
      title: '问题数',
      dataIndex: 'issues',
      key: 'issues',
      render: (issues: number) => (
        <span style={{ color: issues === 0 ? '#52c41a' : issues <= 2 ? '#faad14' : '#f5222d' }}>
          {issues}
        </span>
      )
    },
    {
      title: '操作员',
      dataIndex: 'operator',
      key: 'operator'
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} size="small">
            查看
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small">
            编辑
          </Button>
        </Space>
      )
    }
  ]

  const mappingColumns = [
    {
      title: '工艺参数',
      dataIndex: 'processParameter',
      key: 'processParameter'
    },
    {
      title: '质量指标',
      dataIndex: 'qualityIndicator',
      key: 'qualityIndicator'
    },
    {
      title: '关联度',
      dataIndex: 'correlationLevel',
      key: 'correlationLevel',
      render: (level: string) => {
        const colors = { high: 'red', medium: 'orange', low: 'green' }
        const names = { high: '高', medium: '中', low: '低' }
        return <Tag color={colors[level as keyof typeof colors]}>{names[level as keyof typeof names]}</Tag>
      }
    },
    {
      title: '影响因子',
      dataIndex: 'impactFactor',
      key: 'impactFactor',
      render: (factor: number) => (
        <Progress
          percent={factor * 100}
          size="small"
          format={(percent) => `${(percent! / 100).toFixed(2)}`}
        />
      )
    },
    {
      title: '控制范围',
      dataIndex: 'controlRange',
      key: 'controlRange'
    },
    {
      title: '建议',
      dataIndex: 'recommendation',
      key: 'recommendation',
      ellipsis: true
    },
    {
      title: '更新日期',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated'
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<LineChartOutlined />} size="small">
            分析
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small">
            编辑
          </Button>
        </Space>
      )
    }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">工艺管理</h1>
        <p className="page-description">
          管理工艺标准、首批生产跟踪和工艺-质量映射关系
        </p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="工艺标准数"
              value={processStandards.length}
              prefix={<SettingOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="进行中批次"
              value={productionBatches.filter(b => b.status === 'in_progress').length}
              prefix={<PlayCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="异常批次"
              value={productionBatches.filter(b => b.status === 'error').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="质量映射"
              value={qualityMappings.length}
              prefix={<LineChartOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="工艺标准" key="standards" icon={<SettingOutlined />}>
          <Card>
            <Space style={{ marginBottom: 16 }}>
              <Search
                placeholder="搜索工艺名称或编号"
                allowClear
                style={{ width: 300 }}
              />
              <Select
                placeholder="选择类别"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="制丝工艺">制丝工艺</Option>
                <Option value="卷接工艺">卷接工艺</Option>
                <Option value="包装工艺">包装工艺</Option>
                <Option value="滤棒工艺">滤棒工艺</Option>
                <Option value="香精工艺">香精工艺</Option>
                <Option value="检测工艺">检测工艺</Option>
                <Option value="环境工艺">环境工艺</Option>
                <Option value="维护工艺">维护工艺</Option>
              </Select>
              <Select
                placeholder="选择状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="active">生效</Option>
                <Option value="testing">测试中</Option>
                <Option value="inactive">停用</Option>
              </Select>
              <Button type="primary" icon={<PlusOutlined />}>
                新建工艺
              </Button>
            </Space>

            <Table
              columns={standardColumns}
              dataSource={processStandards}
              rowKey="id"
              pagination={{
                total: processStandards.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="生产跟踪" key="production" icon={<PlayCircleOutlined />}>
          <Card>
            <Space style={{ marginBottom: 16 }}>
              <Search
                placeholder="搜索批次号或产品名称"
                allowClear
                style={{ width: 300 }}
              />
              <Select
                placeholder="选择状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="pending">待开始</Option>
                <Option value="in_progress">进行中</Option>
                <Option value="completed">已完成</Option>
                <Option value="error">异常</Option>
              </Select>
              <Button type="primary" icon={<PlusOutlined />}>
                新建批次
              </Button>
            </Space>

            <Table
              columns={batchColumns}
              dataSource={productionBatches}
              rowKey="id"
              pagination={{
                total: productionBatches.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="质量映射" key="mapping" icon={<LineChartOutlined />}>
          <Card>
            <Space style={{ marginBottom: 16 }}>
              <Search
                placeholder="搜索工艺参数或质量指标"
                allowClear
                style={{ width: 300 }}
              />
              <Select
                placeholder="关联度"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="high">高</Option>
                <Option value="medium">中</Option>
                <Option value="low">低</Option>
              </Select>
              <Button type="primary" icon={<PlusOutlined />}>
                新建映射
              </Button>
            </Space>

            <Table
              columns={mappingColumns}
              dataSource={qualityMappings}
              rowKey="id"
              pagination={{
                total: qualityMappings.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="工艺仿真" key="simulation" icon={<ExperimentOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <Card title="制丝工艺仿真" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert
                    message="制丝工艺参数仿真"
                    description="基于物理模型预测工艺参数对产品质量的影响"
                    type="info"
                    size="small"
                    showIcon
                  />

                  <Form layout="vertical" size="small">
                    <Form.Item label="切丝宽度(mm)">
                      <Slider
                        range
                        min={0.5}
                        max={1.2}
                        step={0.1}
                        defaultValue={[0.7, 0.9]}
                        marks={{ 0.5: '0.5', 0.9: '0.9', 1.2: '1.2' }}
                      />
                    </Form.Item>

                    <Form.Item label="烘丝温度(°C)">
                      <Slider
                        min={60}
                        max={120}
                        defaultValue={85}
                        marks={{ 60: '60', 85: '85', 120: '120' }}
                      />
                    </Form.Item>

                    <Form.Item label="烘丝水分(%)">
                      <Slider
                        min={10}
                        max={16}
                        step={0.5}
                        defaultValue={13}
                        marks={{ 10: '10', 13: '13', 16: '16' }}
                      />
                    </Form.Item>

                    <Form.Item label="加料量(%)">
                      <Slider
                        min={8}
                        max={15}
                        step={0.5}
                        defaultValue={12}
                        marks={{ 8: '8', 12: '12', 15: '15' }}
                      />
                    </Form.Item>
                  </Form>

                  <Button type="primary" icon={<RocketOutlined />} block>
                    开始制丝仿真
                  </Button>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="卷接包工艺仿真" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert
                    message="卷接包工艺参数仿真"
                    description="优化卷接包工艺参数，提升产品质量稳定性"
                    type="info"
                    size="small"
                    showIcon
                  />

                  <Form layout="vertical" size="small">
                    <Form.Item label="卷制密度(mg/cm³)">
                      <Slider
                        min={200}
                        max={300}
                        defaultValue={250}
                        marks={{ 200: '200', 250: '250', 300: '300' }}
                      />
                    </Form.Item>

                    <Form.Item label="卷制速度(支/分)">
                      <Slider
                        min={6000}
                        max={12000}
                        step={500}
                        defaultValue={8000}
                        marks={{ 6000: '6K', 8000: '8K', 12000: '12K' }}
                      />
                    </Form.Item>

                    <Form.Item label="接装纸胶量(g/m²)">
                      <Slider
                        min={8}
                        max={15}
                        step={0.5}
                        defaultValue={12}
                        marks={{ 8: '8', 12: '12', 15: '15' }}
                      />
                    </Form.Item>

                    <Form.Item label="包装压力(N)">
                      <Slider
                        min={50}
                        max={150}
                        step={10}
                        defaultValue={100}
                        marks={{ 50: '50', 100: '100', 150: '150' }}
                      />
                    </Form.Item>
                  </Form>

                  <Button type="primary" icon={<RocketOutlined />} block>
                    开始卷接包仿真
                  </Button>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="仿真结果预测" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 8 }}>质量指标预测</div>
                    <div style={{ marginBottom: 4 }}>
                      <span>硬度: </span>
                      <span style={{ color: '#52c41a' }}>85±3</span>
                    </div>
                    <div style={{ marginBottom: 4 }}>
                      <span>圆周: </span>
                      <span style={{ color: '#52c41a' }}>24.8±0.2mm</span>
                    </div>
                    <div style={{ marginBottom: 4 }}>
                      <span>重量: </span>
                      <span style={{ color: '#faad14' }}>0.95±0.05g</span>
                    </div>
                    <div style={{ marginBottom: 4 }}>
                      <span>抽吸阻力: </span>
                      <span style={{ color: '#52c41a' }}>1050±50Pa</span>
                    </div>
                  </div>

                  <Divider style={{ margin: '12px 0' }} />

                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 8 }}>风格质量影响</div>
                    <div style={{ marginBottom: 8 }}>
                      <span>香气浓度: </span>
                      <Progress percent={88} size="small" />
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <span>口感协调性: </span>
                      <Progress percent={92} size="small" strokeColor="#faad14" />
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <span>燃烧性能: </span>
                      <Progress percent={85} size="small" strokeColor="#722ed1" />
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <span>外观质量: </span>
                      <Progress percent={90} size="small" strokeColor="#13c2c2" />
                    </div>
                  </div>

                  <Alert
                    message="仿真完成"
                    description="工艺参数优化建议已生成"
                    type="success"
                    size="small"
                  />
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* 模态框 */}
      <Modal
        title={modalType === 'add' ? '新建工艺标准' : modalType === 'edit' ? '编辑工艺标准' : '工艺标准详情'}
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
            {modalType === 'add' ? '创建' : '保存'}
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="工艺名称">
                <Input placeholder="请输入工艺名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="工艺类别">
                <Select placeholder="请选择工艺类别">
                  <Option value="制丝工艺">制丝工艺</Option>
                  <Option value="卷接工艺">卷接工艺</Option>
                  <Option value="包装工艺">包装工艺</Option>
                  <Option value="滤棒工艺">滤棒工艺</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="版本号">
                <Input placeholder="请输入版本号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="状态">
                <Select placeholder="请选择状态">
                  <Option value="active">生效</Option>
                  <Option value="testing">测试中</Option>
                  <Option value="inactive">停用</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="工艺描述">
            <Input.TextArea rows={3} placeholder="请输入工艺描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ProcessManagement
