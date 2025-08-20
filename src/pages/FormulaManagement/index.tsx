import React, { useState } from 'react'
import { Card, Table, Button, Input, Select, Space, Tag, Modal, Form, Tabs, Row, Col, Divider, Statistic, Progress, Descriptions, Alert, Timeline } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  SwapOutlined,
  HistoryOutlined,
  DownloadOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  BulbOutlined,
  ExperimentOutlined,
  ThunderboltOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import type { Formula } from '../../types'

const { Search } = Input
const { Option } = Select
const { TabPane } = Tabs

// 版本比对接口
interface ComparisonResult {
  field: string
  fieldName: string
  formula1Value: any
  formula2Value: any
  isDifferent: boolean
  changeType?: 'added' | 'removed' | 'modified'
}

interface FormulaComparison {
  formula1: Formula
  formula2: Formula
  basicInfo: ComparisonResult[]
  ingredients: {
    added: any[]
    removed: any[]
    modified: any[]
    unchanged: any[]
  }
  cost: ComparisonResult
  properties: ComparisonResult[]
  summary: {
    totalChanges: number
    costDifference: number
    costDifferencePercent: number
    majorChanges: string[]
  }
}

const FormulaManagement: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [compareModalVisible, setCompareModalVisible] = useState(false)
  const [selectedFormula1, setSelectedFormula1] = useState<Formula | null>(null)
  const [selectedFormula2, setSelectedFormula2] = useState<Formula | null>(null)
  const [comparisonResult, setComparisonResult] = useState<FormulaComparison | null>(null)

  // 模拟配方数据
  const formulas: Formula[] = [
    {
      id: 'F001',
      name: '云南香型配方V3.2',
      version: 'V3.2',
      category: 'tobacco',
      status: 'approved',
      creator: '李配方',
      createTime: '2024-03-15 10:30:00',
      updateTime: '2024-03-20 14:20:00',
      description: '以云南烟叶为主体的香型配方，口感醇和',
      ingredients: [
        { id: '1', name: '云南上部烟叶', type: '主料', ratio: 35, unit: '%', supplier: '云南烟草', grade: 'A级' },
        { id: '2', name: '云南中部烟叶', type: '主料', ratio: 25, unit: '%', supplier: '云南烟草', grade: 'A级' },
        { id: '3', name: '河南烟叶', type: '辅料', ratio: 20, unit: '%', supplier: '河南烟草', grade: 'B级' },
        { id: '4', name: '进口烟叶', type: '调节料', ratio: 15, unit: '%', supplier: '国际贸易', grade: 'A级' },
        { id: '5', name: '其他辅料', type: '辅料', ratio: 5, unit: '%', supplier: '本地供应商', grade: 'C级' }
      ],
      cost: 12.5,
      properties: {
        tar: 8.5,
        nicotine: 0.8,
        co: 9.2,
        moisture: 12.5
      }
    },
    {
      id: 'F002',
      name: '清香型配方V2.1',
      version: 'V2.1',
      category: 'tobacco',
      status: 'testing',
      creator: '王配方',
      createTime: '2024-03-10 09:15:00',
      updateTime: '2024-03-18 16:45:00',
      description: '清香淡雅型配方，适合年轻消费者',
      ingredients: [
        { id: '1', name: '福建烟叶', type: '主料', ratio: 40, unit: '%', supplier: '福建烟草', grade: 'A级' },
        { id: '2', name: '贵州烟叶', type: '辅料', ratio: 30, unit: '%', supplier: '贵州烟草', grade: 'B级' },
        { id: '3', name: '进口香料烟', type: '调节料', ratio: 20, unit: '%', supplier: '国际贸易', grade: 'A级' },
        { id: '4', name: '天然香精', type: '香料', ratio: 10, unit: '%', supplier: '香精公司', grade: 'A级' }
      ],
      cost: 10.8,
      properties: {
        tar: 6.5,
        nicotine: 0.6,
        co: 7.8,
        moisture: 13.0
      }
    },
    {
      id: 'F003',
      name: '浓香型配方V1.8',
      version: 'V1.8',
      category: 'tobacco',
      status: 'approved',
      creator: '赵配方',
      createTime: '2024-03-05 14:20:00',
      updateTime: '2024-03-25 11:30:00',
      description: '浓郁香型配方，适合成熟消费者',
      ingredients: [
        { id: '1', name: '四川烟叶', type: '主料', ratio: 45, unit: '%', supplier: '四川烟草', grade: 'A级' },
        { id: '2', name: '湖南烟叶', type: '主料', ratio: 25, unit: '%', supplier: '湖南烟草', grade: 'A级' },
        { id: '3', name: '陈化烟叶', type: '调节料', ratio: 20, unit: '%', supplier: '陈化仓库', grade: 'S级' },
        { id: '4', name: '特制香精', type: '香料', ratio: 10, unit: '%', supplier: '专业香精', grade: 'A级' }
      ],
      cost: 15.2,
      properties: {
        tar: 10.2,
        nicotine: 1.1,
        co: 11.5,
        moisture: 12.0
      }
    },
    {
      id: 'F004',
      name: '中式混合配方V2.5',
      version: 'V2.5',
      category: 'tobacco',
      status: 'testing',
      creator: '孙配方',
      createTime: '2024-03-12 16:45:00',
      updateTime: '2024-03-28 09:15:00',
      description: '中式传统混合配方，平衡口感',
      ingredients: [
        { id: '1', name: '河南烟叶', type: '主料', ratio: 30, unit: '%', supplier: '河南烟草', grade: 'A级' },
        { id: '2', name: '山东烟叶', type: '主料', ratio: 25, unit: '%', supplier: '山东烟草', grade: 'B级' },
        { id: '3', name: '东北烟叶', type: '辅料', ratio: 25, unit: '%', supplier: '东北烟草', grade: 'B级' },
        { id: '4', name: '调味香精', type: '香料', ratio: 20, unit: '%', supplier: '调味公司', grade: 'A级' }
      ],
      cost: 11.8,
      properties: {
        tar: 9.0,
        nicotine: 0.9,
        co: 10.1,
        moisture: 12.8
      }
    },
    {
      id: 'F005',
      name: '低焦油健康配方V1.2',
      version: 'V1.2',
      category: 'tobacco',
      status: 'draft',
      creator: '钱配方',
      createTime: '2024-03-20 11:30:00',
      updateTime: '2024-03-30 15:20:00',
      description: '超低焦油健康型配方，符合健康趋势',
      ingredients: [
        { id: '1', name: '特选低焦烟叶', type: '主料', ratio: 50, unit: '%', supplier: '特选供应商', grade: 'S级' },
        { id: '2', name: '有机烟叶', type: '主料', ratio: 30, unit: '%', supplier: '有机农场', grade: 'A级' },
        { id: '3', name: '天然植物纤维', type: '辅料', ratio: 15, unit: '%', supplier: '植物公司', grade: 'A级' },
        { id: '4', name: '天然香料', type: '香料', ratio: 5, unit: '%', supplier: '天然香料', grade: 'S级' }
      ],
      cost: 18.5,
      properties: {
        tar: 4.5,
        nicotine: 0.4,
        co: 5.8,
        moisture: 13.5
      }
    },
    {
      id: 'F006',
      name: '国际混合配方V3.0',
      version: 'V3.0',
      category: 'tobacco',
      status: 'approved',
      creator: '周配方',
      createTime: '2024-02-28 13:15:00',
      updateTime: '2024-03-22 10:45:00',
      description: '国际化混合配方，适合出口产品',
      ingredients: [
        { id: '1', name: '弗吉尼亚烟叶', type: '主料', ratio: 40, unit: '%', supplier: '美国供应商', grade: 'A级' },
        { id: '2', name: '白肋烟', type: '主料', ratio: 30, unit: '%', supplier: '巴西供应商', grade: 'A级' },
        { id: '3', name: '东方烟', type: '调节料', ratio: 20, unit: '%', supplier: '土耳其供应商', grade: 'A级' },
        { id: '4', name: '国际香精', type: '香料', ratio: 10, unit: '%', supplier: '国际香精', grade: 'A级' }
      ],
      cost: 22.3,
      properties: {
        tar: 11.5,
        nicotine: 1.3,
        co: 12.8,
        moisture: 11.5
      }
    },
    {
      id: 'F007',
      name: '薄荷清凉配方V1.6',
      version: 'V1.6',
      category: 'tobacco',
      status: 'testing',
      creator: '吴配方',
      createTime: '2024-03-08 09:30:00',
      updateTime: '2024-03-26 14:50:00',
      description: '薄荷清凉型配方，夏季热销产品',
      ingredients: [
        { id: '1', name: '清香型烟叶', type: '主料', ratio: 45, unit: '%', supplier: '清香供应商', grade: 'A级' },
        { id: '2', name: '薄荷烟叶', type: '主料', ratio: 25, unit: '%', supplier: '薄荷农场', grade: 'A级' },
        { id: '3', name: '薄荷精油', type: '香料', ratio: 20, unit: '%', supplier: '薄荷公司', grade: 'S级' },
        { id: '4', name: '清凉剂', type: '添加剂', ratio: 10, unit: '%', supplier: '添加剂公司', grade: 'A级' }
      ],
      cost: 14.7,
      properties: {
        tar: 7.8,
        nicotine: 0.7,
        co: 8.9,
        moisture: 12.3
      }
    },
    {
      id: 'F008',
      name: '女士专用配方V2.2',
      version: 'V2.2',
      category: 'tobacco',
      status: 'approved',
      creator: '郑配方',
      createTime: '2024-02-15 15:40:00',
      updateTime: '2024-03-18 12:25:00',
      description: '专为女性消费者设计的轻柔配方',
      ingredients: [
        { id: '1', name: '精选细支烟叶', type: '主料', ratio: 50, unit: '%', supplier: '精选供应商', grade: 'S级' },
        { id: '2', name: '花香烟叶', type: '主料', ratio: 25, unit: '%', supplier: '花香农场', grade: 'A级' },
        { id: '3', name: '果香精油', type: '香料', ratio: 15, unit: '%', supplier: '果香公司', grade: 'A级' },
        { id: '4', name: '柔和剂', type: '添加剂', ratio: 10, unit: '%', supplier: '柔和公司', grade: 'A级' }
      ],
      cost: 16.9,
      properties: {
        tar: 5.5,
        nicotine: 0.5,
        co: 6.8,
        moisture: 13.2
      }
    },
    {
      id: 'F009',
      name: '经典复古配方V4.1',
      version: 'V4.1',
      category: 'tobacco',
      status: 'archived',
      creator: '冯配方',
      createTime: '2024-01-20 10:15:00',
      updateTime: '2024-03-12 16:30:00',
      description: '经典复古配方，传承传统工艺',
      ingredients: [
        { id: '1', name: '传统烟叶', type: '主料', ratio: 60, unit: '%', supplier: '传统供应商', grade: 'A级' },
        { id: '2', name: '陈年烟叶', type: '调节料', ratio: 25, unit: '%', supplier: '陈年仓库', grade: 'S级' },
        { id: '3', name: '传统香料', type: '香料', ratio: 15, unit: '%', supplier: '传统香料', grade: 'A级' }
      ],
      cost: 19.8,
      properties: {
        tar: 12.8,
        nicotine: 1.5,
        co: 14.2,
        moisture: 11.8
      }
    },
    {
      id: 'F010',
      name: '创新科技配方V1.0',
      version: 'V1.0',
      category: 'tobacco',
      status: 'draft',
      creator: '韩配方',
      createTime: '2024-03-25 14:20:00',
      updateTime: '2024-03-30 11:45:00',
      description: '采用最新科技的创新配方',
      ingredients: [
        { id: '1', name: '科技改良烟叶', type: '主料', ratio: 40, unit: '%', supplier: '科技公司', grade: 'S级' },
        { id: '2', name: '纳米材料', type: '添加剂', ratio: 30, unit: '%', supplier: '纳米公司', grade: 'S级' },
        { id: '3', name: '生物香料', type: '香料', ratio: 20, unit: '%', supplier: '生物公司', grade: 'A级' },
        { id: '4', name: '功能性添加剂', type: '添加剂', ratio: 10, unit: '%', supplier: '功能公司', grade: 'A级' }
      ],
      cost: 28.5,
      properties: {
        tar: 3.2,
        nicotine: 0.3,
        co: 4.1,
        moisture: 14.0
      }
    }
  ]

  // 版本比对函数
  const compareFormulas = (formula1: Formula, formula2: Formula): FormulaComparison => {
    // 基本信息比对
    const basicInfo: ComparisonResult[] = [
      {
        field: 'name',
        fieldName: '配方名称',
        formula1Value: formula1.name,
        formula2Value: formula2.name,
        isDifferent: formula1.name !== formula2.name
      },
      {
        field: 'version',
        fieldName: '版本号',
        formula1Value: formula1.version,
        formula2Value: formula2.version,
        isDifferent: formula1.version !== formula2.version
      },
      {
        field: 'creator',
        fieldName: '创建人',
        formula1Value: formula1.creator,
        formula2Value: formula2.creator,
        isDifferent: formula1.creator !== formula2.creator
      },
      {
        field: 'description',
        fieldName: '描述',
        formula1Value: formula1.description,
        formula2Value: formula2.description,
        isDifferent: formula1.description !== formula2.description
      }
    ]

    // 成分比对
    const ingredients1Map = new Map(formula1.ingredients.map(ing => [ing.name, ing]))
    const ingredients2Map = new Map(formula2.ingredients.map(ing => [ing.name, ing]))

    const added = formula2.ingredients.filter(ing => !ingredients1Map.has(ing.name))
    const removed = formula1.ingredients.filter(ing => !ingredients2Map.has(ing.name))
    const modified: any[] = []
    const unchanged: any[] = []

    formula1.ingredients.forEach(ing1 => {
      const ing2 = ingredients2Map.get(ing1.name)
      if (ing2) {
        if (ing1.ratio !== ing2.ratio || ing1.type !== ing2.type || ing1.grade !== ing2.grade) {
          modified.push({ original: ing1, modified: ing2 })
        } else {
          unchanged.push(ing1)
        }
      }
    })

    // 成本比对
    const costDifference = formula2.cost - formula1.cost
    const costDifferencePercent = ((costDifference / formula1.cost) * 100)

    const cost: ComparisonResult = {
      field: 'cost',
      fieldName: '成本',
      formula1Value: formula1.cost,
      formula2Value: formula2.cost,
      isDifferent: formula1.cost !== formula2.cost
    }

    // 性能指标比对
    const properties: ComparisonResult[] = [
      {
        field: 'tar',
        fieldName: '焦油量',
        formula1Value: formula1.properties.tar,
        formula2Value: formula2.properties.tar,
        isDifferent: formula1.properties.tar !== formula2.properties.tar
      },
      {
        field: 'nicotine',
        fieldName: '烟碱量',
        formula1Value: formula1.properties.nicotine,
        formula2Value: formula2.properties.nicotine,
        isDifferent: formula1.properties.nicotine !== formula2.properties.nicotine
      },
      {
        field: 'co',
        fieldName: '一氧化碳',
        formula1Value: formula1.properties.co,
        formula2Value: formula2.properties.co,
        isDifferent: formula1.properties.co !== formula2.properties.co
      },
      {
        field: 'moisture',
        fieldName: '含水率',
        formula1Value: formula1.properties.moisture,
        formula2Value: formula2.properties.moisture,
        isDifferent: formula1.properties.moisture !== formula2.properties.moisture
      }
    ]

    // 汇总信息
    const totalChanges = basicInfo.filter(item => item.isDifferent).length +
                        added.length + removed.length + modified.length +
                        (cost.isDifferent ? 1 : 0) +
                        properties.filter(item => item.isDifferent).length

    const majorChanges: string[] = []
    if (added.length > 0) majorChanges.push(`新增${added.length}个成分`)
    if (removed.length > 0) majorChanges.push(`移除${removed.length}个成分`)
    if (modified.length > 0) majorChanges.push(`修改${modified.length}个成分`)
    if (Math.abs(costDifferencePercent) > 10) majorChanges.push(`成本变化${costDifferencePercent > 0 ? '+' : ''}${costDifferencePercent.toFixed(1)}%`)

    return {
      formula1,
      formula2,
      basicInfo,
      ingredients: { added, removed, modified, unchanged },
      cost,
      properties,
      summary: {
        totalChanges,
        costDifference,
        costDifferencePercent,
        majorChanges
      }
    }
  }

  // 执行比对
  const handleCompare = () => {
    if (selectedFormula1 && selectedFormula2) {
      const result = compareFormulas(selectedFormula1, selectedFormula2)
      setComparisonResult(result)
    }
  }

  const columns = [
    {
      title: '配方编号',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <a>{text}</a>
    },
    {
      title: '配方名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      render: (version: string) => <Tag color="blue">{version}</Tag>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = { draft: 'orange', testing: 'blue', approved: 'green', archived: 'gray' }
        const names = { draft: '草稿', testing: '测试中', approved: '已批准', archived: '已归档' }
        return <Tag color={colors[status as keyof typeof colors]}>{names[status as keyof typeof names]}</Tag>
      }
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator'
    },
    {
      title: '成本(元/包)',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost: number) => `¥${cost.toFixed(2)}`
    },
    {
      title: '焦油量(mg)',
      key: 'tar',
      render: (record: Formula) => record.properties.tar
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
          <Button type="link" icon={<HistoryOutlined />} size="small">
            版本
          </Button>
        </Space>
      )
    }
  ]

  const ingredientColumns = [
    {
      title: '原料名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag>{type}</Tag>
    },
    {
      title: '配比',
      dataIndex: 'ratio',
      key: 'ratio',
      render: (ratio: number, record: any) => `${ratio}${record.unit}`
    },
    {
      title: '供应商',
      dataIndex: 'supplier',
      key: 'supplier'
    },
    {
      title: '等级',
      dataIndex: 'grade',
      key: 'grade',
      render: (grade: string) => <Tag color="green">{grade}</Tag>
    }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">叶组配方管理</h1>
        <p className="page-description">
          管理叶组配方的创建、编辑、版本控制和历史追溯
        </p>
      </div>

      <Tabs defaultActiveKey="management">
        <TabPane tab="配方管理" key="management" icon={<FileTextOutlined />}>
          <Card style={{ marginBottom: 16 }}>
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="搜索配方名称或编号"
            allowClear
            style={{ width: 300 }}
          />
          <Select
            placeholder="选择状态"
            style={{ width: 120 }}
            allowClear
          >
            <Option value="draft">草稿</Option>
            <Option value="testing">测试中</Option>
            <Option value="approved">已批准</Option>
            <Option value="archived">已归档</Option>
          </Select>
          <Button type="primary" icon={<PlusOutlined />}>
            新建配方
          </Button>
          <Button icon={<SwapOutlined />} onClick={() => setCompareModalVisible(true)}>
            版本比对
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={formulas}
          rowKey="id"
          pagination={{
            total: formulas.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
          }}
        />
      </Card>
        </TabPane>

        <TabPane tab="智能设计" key="ai-design" icon={<BulbOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="配方智能设计" extra={<Tag color="blue">AI驱动</Tag>}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert
                    message="AI配方设计助手"
                    description="基于遗传算法和大语言模型，120秒内生成配方候选方案"
                    type="info"
                    showIcon
                  />

                  <Form layout="vertical">
                    <Form.Item label="设计目标">
                      <Select placeholder="请选择设计目标">
                        <Option value="taste_sweet">焦甜香型</Option>
                        <Option value="taste_light">清香淡雅</Option>
                        <Option value="taste_rich">浓郁醇厚</Option>
                        <Option value="health_low">低焦油健康</Option>
                        <Option value="cost_control">成本优化</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="目标参数">
                      <Row gutter={8}>
                        <Col span={12}>
                          <Input placeholder="焦油量 (mg)" addonBefore="焦油" />
                        </Col>
                        <Col span={12}>
                          <Input placeholder="烟碱量 (mg)" addonBefore="烟碱" />
                        </Col>
                      </Row>
                      <Row gutter={8} style={{ marginTop: 8 }}>
                        <Col span={12}>
                          <Input placeholder="一氧化碳 (mg)" addonBefore="CO" />
                        </Col>
                        <Col span={12}>
                          <Input placeholder="成本 (元)" addonBefore="成本" />
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item label="约束条件">
                      <Select mode="multiple" placeholder="请选择约束条件">
                        <Option value="material_limit">原料限制</Option>
                        <Option value="cost_limit">成本限制</Option>
                        <Option value="quality_standard">质量标准</Option>
                        <Option value="production_capacity">产能限制</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="优化算法">
                      <Select defaultValue="genetic" placeholder="请选择算法">
                        <Option value="genetic">遗传算法</Option>
                        <Option value="particle_swarm">粒子群算法</Option>
                        <Option value="simulated_annealing">模拟退火</Option>
                        <Option value="neural_network">神经网络</Option>
                      </Select>
                    </Form.Item>

                    <Button type="primary" icon={<ThunderboltOutlined />} block>
                      开始智能设计 (预计120秒)
                    </Button>
                  </Form>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="配方模型库" extra={<Tag color="green">5个模型</Tag>}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Card size="small" title="风格质量模型" extra={<Tag color="blue">准确率: 94%</Tag>}>
                    <p>基于感官评价数据训练的风格质量预测模型</p>
                    <Progress percent={94} size="small" />
                  </Card>

                  <Card size="small" title="物理化学模型" extra={<Tag color="green">准确率: 96%</Tag>}>
                    <p>预测焦油、烟碱、一氧化碳等理化指标</p>
                    <Progress percent={96} size="small" />
                  </Card>

                  <Card size="small" title="烟气成分模型" extra={<Tag color="orange">准确率: 89%</Tag>}>
                    <p>预测烟气中各种化学成分含量</p>
                    <Progress percent={89} size="small" />
                  </Card>

                  <Card size="small" title="成本预测模型" extra={<Tag color="purple">准确率: 98%</Tag>}>
                    <p>基于原料价格和配比预测产品成本</p>
                    <Progress percent={98} size="small" />
                  </Card>

                  <Card size="small" title="库存优化模型" extra={<Tag color="cyan">准确率: 92%</Tag>}>
                    <p>考虑库存状况优化配方原料选择</p>
                    <Progress percent={92} size="small" />
                  </Card>
                </Space>
              </Card>
            </Col>
          </Row>

          <Card title="设计历史记录" style={{ marginTop: 16 }}>
            <Table
              size="small"
              columns={[
                { title: '设计时间', dataIndex: 'time', key: 'time' },
                { title: '设计目标', dataIndex: 'target', key: 'target' },
                { title: '算法', dataIndex: 'algorithm', key: 'algorithm' },
                { title: '生成方案数', dataIndex: 'schemes', key: 'schemes' },
                { title: '最优评分', dataIndex: 'score', key: 'score', render: (score: number) => <span style={{ color: score >= 90 ? '#52c41a' : '#faad14' }}>{score}分</span> },
                { title: '状态', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={status === 'success' ? 'green' : 'orange'}>{status === 'success' ? '成功' : '进行中'}</Tag> },
                { title: '操作', key: 'action', render: () => <Button type="link" size="small">查看结果</Button> }
              ]}
              dataSource={[
                { time: '2024-03-30 14:30', target: '焦甜香型', algorithm: '遗传算法', schemes: 15, score: 92, status: 'success' },
                { time: '2024-03-29 10:15', target: '成本优化', algorithm: '粒子群算法', schemes: 12, score: 88, status: 'success' },
                { time: '2024-03-28 16:45', target: '低焦油健康', algorithm: '神经网络', schemes: 18, score: 85, status: 'success' }
              ]}
              pagination={false}
            />
          </Card>
        </TabPane>

        <TabPane tab="配方验证" key="validation" icon={<ExperimentOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <Card title="仿真验证" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ marginBottom: 8 }}>物理化学仿真</div>
                    <Progress percent={95} size="small" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>感官质量仿真</div>
                    <Progress percent={88} size="small" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>成本计算仿真</div>
                    <Progress percent={92} size="small" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>工艺适应性仿真</div>
                    <Progress percent={85} size="small" />
                  </div>
                  <Button type="primary" size="small" block style={{ marginTop: 16 }}>
                    开始仿真验证
                  </Button>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="实验验证" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Timeline size="small">
                    <Timeline.Item color="green">
                      <div>小样制备</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>已完成</div>
                    </Timeline.Item>
                    <Timeline.Item color="blue">
                      <div>理化检测</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>进行中</div>
                    </Timeline.Item>
                    <Timeline.Item color="gray">
                      <div>感官评价</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>待开始</div>
                    </Timeline.Item>
                    <Timeline.Item color="gray">
                      <div>中试验证</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>待开始</div>
                    </Timeline.Item>
                  </Timeline>
                  <Button type="primary" size="small" block>
                    查看验证报告
                  </Button>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="验证结果" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>仿真准确度</span>
                      <span>92%</span>
                    </div>
                    <Progress percent={92} size="small" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>实验符合度</span>
                      <span>88%</span>
                    </div>
                    <Progress percent={88} size="small" strokeColor="#faad14" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>目标达成度</span>
                      <span>85%</span>
                    </div>
                    <Progress percent={85} size="small" strokeColor="#722ed1" />
                  </div>
                  <Alert
                    message="验证通过"
                    description="配方设计基本符合预期目标"
                    type="success"
                    size="small"
                  />
                </Space>
              </Card>
            </Col>
          </Row>

          <Card title="验证报告" style={{ marginTop: 16 }}>
            <Table
              size="small"
              columns={[
                { title: '配方编号', dataIndex: 'formulaId', key: 'formulaId' },
                { title: '验证类型', dataIndex: 'type', key: 'type', render: (type: string) => <Tag>{type}</Tag> },
                { title: '验证日期', dataIndex: 'date', key: 'date' },
                { title: '验证人员', dataIndex: 'validator', key: 'validator' },
                { title: '仿真评分', dataIndex: 'simulationScore', key: 'simulationScore' },
                { title: '实验评分', dataIndex: 'experimentScore', key: 'experimentScore' },
                { title: '综合评分', dataIndex: 'totalScore', key: 'totalScore', render: (score: number) => <span style={{ color: score >= 85 ? '#52c41a' : '#faad14' }}>{score}分</span> },
                { title: '状态', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={status === 'passed' ? 'green' : status === 'failed' ? 'red' : 'orange'}>{status === 'passed' ? '通过' : status === 'failed' ? '未通过' : '验证中'}</Tag> },
                { title: '操作', key: 'action', render: () => <Button type="link" size="small">查看详情</Button> }
              ]}
              dataSource={[
                { formulaId: 'F001-V1', type: '仿真验证', date: '2024-03-30', validator: '张验证', simulationScore: 92, experimentScore: '-', totalScore: 92, status: 'passed' },
                { formulaId: 'F001-V2', type: '实验验证', date: '2024-03-29', validator: '李验证', simulationScore: 88, experimentScore: 85, totalScore: 87, status: 'passed' },
                { formulaId: 'F002-V1', type: '综合验证', date: '2024-03-28', validator: '王验证', simulationScore: 85, experimentScore: 82, totalScore: 84, status: 'testing' }
              ]}
              pagination={false}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* 配方详情模态框 */}
      <Modal
        title="配方详情"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={800}
        footer={null}
      >
        <Tabs defaultActiveKey="basic">
          <TabPane tab="基本信息" key="basic">
            <Form layout="vertical">
              <Form.Item label="配方名称">
                <Input value="云南香型配方V3.2" disabled />
              </Form.Item>
              <Form.Item label="配方描述">
                <Input.TextArea value="以云南烟叶为主体的香型配方，口感醇和" disabled />
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="配方组成" key="ingredients">
            <Table
              columns={ingredientColumns}
              dataSource={formulas[0]?.ingredients || []}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </TabPane>
          <TabPane tab="理化指标" key="properties">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>焦油量: {formulas[0]?.properties.tar} mg</div>
              <div>烟碱量: {formulas[0]?.properties.nicotine} mg</div>
              <div>一氧化碳: {formulas[0]?.properties.co} mg</div>
              <div>含水率: {formulas[0]?.properties.moisture}%</div>
            </Space>
          </TabPane>
        </Tabs>
      </Modal>

      {/* 版本比对模态框 */}
      <Modal
        title="配方版本比对"
        open={compareModalVisible}
        onCancel={() => {
          setCompareModalVisible(false)
          setSelectedFormula1(null)
          setSelectedFormula2(null)
          setComparisonResult(null)
        }}
        width={1200}
        footer={comparisonResult ? [
          <Button key="export" icon={<DownloadOutlined />}>
            导出比对报告
          </Button>,
          <Button key="close" onClick={() => {
            setCompareModalVisible(false)
            setSelectedFormula1(null)
            setSelectedFormula2(null)
            setComparisonResult(null)
          }}>
            关闭
          </Button>
        ] : [
          <Button key="cancel" onClick={() => setCompareModalVisible(false)}>
            取消
          </Button>,
          <Button
            key="compare"
            type="primary"
            icon={<SwapOutlined />}
            onClick={handleCompare}
            disabled={!selectedFormula1 || !selectedFormula2}
          >
            开始比对
          </Button>
        ]}
      >
        {!comparisonResult ? (
          // 配方选择界面
          <div>
            <Row gutter={24}>
              <Col span={12}>
                <Card title="选择配方1" size="small">
                  <Select
                    placeholder="请选择第一个配方"
                    style={{ width: '100%', marginBottom: 16 }}
                    value={selectedFormula1?.id}
                    onChange={(value) => {
                      const formula = formulas.find(f => f.id === value)
                      setSelectedFormula1(formula || null)
                    }}
                  >
                    {formulas.map(formula => (
                      <Option key={formula.id} value={formula.id}>
                        {formula.name} ({formula.version})
                      </Option>
                    ))}
                  </Select>
                  {selectedFormula1 && (
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="配方名称">{selectedFormula1.name}</Descriptions.Item>
                      <Descriptions.Item label="版本">{selectedFormula1.version}</Descriptions.Item>
                      <Descriptions.Item label="创建人">{selectedFormula1.creator}</Descriptions.Item>
                      <Descriptions.Item label="成本">¥{selectedFormula1.cost.toFixed(2)}</Descriptions.Item>
                      <Descriptions.Item label="状态">
                        <Tag color={selectedFormula1.status === 'approved' ? 'green' : 'orange'}>
                          {selectedFormula1.status === 'approved' ? '已批准' : '其他'}
                        </Tag>
                      </Descriptions.Item>
                    </Descriptions>
                  )}
                </Card>
              </Col>
              <Col span={12}>
                <Card title="选择配方2" size="small">
                  <Select
                    placeholder="请选择第二个配方"
                    style={{ width: '100%', marginBottom: 16 }}
                    value={selectedFormula2?.id}
                    onChange={(value) => {
                      const formula = formulas.find(f => f.id === value)
                      setSelectedFormula2(formula || null)
                    }}
                  >
                    {formulas.map(formula => (
                      <Option key={formula.id} value={formula.id}>
                        {formula.name} ({formula.version})
                      </Option>
                    ))}
                  </Select>
                  {selectedFormula2 && (
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="配方名称">{selectedFormula2.name}</Descriptions.Item>
                      <Descriptions.Item label="版本">{selectedFormula2.version}</Descriptions.Item>
                      <Descriptions.Item label="创建人">{selectedFormula2.creator}</Descriptions.Item>
                      <Descriptions.Item label="成本">¥{selectedFormula2.cost.toFixed(2)}</Descriptions.Item>
                      <Descriptions.Item label="状态">
                        <Tag color={selectedFormula2.status === 'approved' ? 'green' : 'orange'}>
                          {selectedFormula2.status === 'approved' ? '已批准' : '其他'}
                        </Tag>
                      </Descriptions.Item>
                    </Descriptions>
                  )}
                </Card>
              </Col>
            </Row>

            {selectedFormula1 && selectedFormula2 && (
              <Card style={{ marginTop: 16 }} size="small">
                <div style={{ textAlign: 'center' }}>
                  <p>已选择配方：</p>
                  <Space size="large">
                    <span><strong>{selectedFormula1.name}</strong> ({selectedFormula1.version})</span>
                    <ArrowRightOutlined style={{ color: '#1890ff' }} />
                    <span><strong>{selectedFormula2.name}</strong> ({selectedFormula2.version})</span>
                  </Space>
                  <div style={{ marginTop: 16 }}>
                    <Button type="primary" icon={<SwapOutlined />} onClick={handleCompare}>
                      开始比对分析
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        ) : (
          // 比对结果界面
          <div>
            {/* 比对概览 */}
            <Card title="比对概览" size="small" style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={6}>
                  <Statistic
                    title="总变更数"
                    value={comparisonResult.summary.totalChanges}
                    prefix={<ExclamationCircleOutlined />}
                    valueStyle={{ color: comparisonResult.summary.totalChanges > 0 ? '#faad14' : '#52c41a' }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="成本变化"
                    value={comparisonResult.summary.costDifference}
                    precision={2}
                    prefix="¥"
                    valueStyle={{ color: comparisonResult.summary.costDifference > 0 ? '#f5222d' : '#52c41a' }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="成本变化率"
                    value={Math.abs(comparisonResult.summary.costDifferencePercent)}
                    precision={1}
                    suffix="%"
                    valueStyle={{ color: Math.abs(comparisonResult.summary.costDifferencePercent) > 10 ? '#f5222d' : '#52c41a' }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="主要变更"
                    value={comparisonResult.summary.majorChanges.length}
                    suffix="项"
                    prefix={<MinusCircleOutlined />}
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Col>
              </Row>
              {comparisonResult.summary.majorChanges.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <strong>主要变更：</strong>
                  <div style={{ marginTop: 8 }}>
                    {comparisonResult.summary.majorChanges.map((change, index) => (
                      <Tag key={index} color="orange" style={{ marginBottom: 4 }}>
                        {change}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            <Tabs defaultActiveKey="basic">
              <TabPane tab="基本信息对比" key="basic">
                <Table
                  size="small"
                  columns={[
                    { title: '字段', dataIndex: 'fieldName', key: 'fieldName' },
                    {
                      title: `${comparisonResult.formula1.name} (${comparisonResult.formula1.version})`,
                      dataIndex: 'formula1Value',
                      key: 'formula1Value',
                      render: (value: any) => <span>{value}</span>
                    },
                    {
                      title: `${comparisonResult.formula2.name} (${comparisonResult.formula2.version})`,
                      dataIndex: 'formula2Value',
                      key: 'formula2Value',
                      render: (value: any) => <span>{value}</span>
                    },
                    {
                      title: '状态',
                      key: 'status',
                      render: (record: ComparisonResult) => (
                        record.isDifferent ?
                        <Tag color="orange">已变更</Tag> :
                        <Tag color="green">无变化</Tag>
                      )
                    }
                  ]}
                  dataSource={comparisonResult.basicInfo}
                  pagination={false}
                  rowKey="field"
                />
              </TabPane>

              <TabPane tab="成分配比对比" key="ingredients">
                <Space direction="vertical" style={{ width: '100%' }}>
                  {comparisonResult.ingredients.added.length > 0 && (
                    <Card title="新增成分" size="small" style={{ borderColor: '#52c41a' }}>
                      <Table
                        size="small"
                        columns={[
                          { title: '原料名称', dataIndex: 'name', key: 'name' },
                          { title: '类型', dataIndex: 'type', key: 'type' },
                          { title: '配比', dataIndex: 'ratio', key: 'ratio', render: (ratio: number) => `${ratio}%` },
                          { title: '等级', dataIndex: 'grade', key: 'grade' }
                        ]}
                        dataSource={comparisonResult.ingredients.added}
                        pagination={false}
                        rowKey="id"
                      />
                    </Card>
                  )}

                  {comparisonResult.ingredients.removed.length > 0 && (
                    <Card title="移除成分" size="small" style={{ borderColor: '#f5222d' }}>
                      <Table
                        size="small"
                        columns={[
                          { title: '原料名称', dataIndex: 'name', key: 'name' },
                          { title: '类型', dataIndex: 'type', key: 'type' },
                          { title: '配比', dataIndex: 'ratio', key: 'ratio', render: (ratio: number) => `${ratio}%` },
                          { title: '等级', dataIndex: 'grade', key: 'grade' }
                        ]}
                        dataSource={comparisonResult.ingredients.removed}
                        pagination={false}
                        rowKey="id"
                      />
                    </Card>
                  )}

                  {comparisonResult.ingredients.modified.length > 0 && (
                    <Card title="修改成分" size="small" style={{ borderColor: '#faad14' }}>
                      <Table
                        size="small"
                        columns={[
                          { title: '原料名称', dataIndex: 'name', key: 'name', render: (_, record: any) => record.original.name },
                          {
                            title: '配比变化',
                            key: 'ratio',
                            render: (record: any) => (
                              <span>
                                {record.original.ratio}% → {record.modified.ratio}%
                                {record.original.ratio !== record.modified.ratio && (
                                  <Tag color={record.modified.ratio > record.original.ratio ? 'red' : 'green'} style={{ marginLeft: 8 }}>
                                    {record.modified.ratio > record.original.ratio ? '+' : ''}{(record.modified.ratio - record.original.ratio).toFixed(1)}%
                                  </Tag>
                                )}
                              </span>
                            )
                          },
                          {
                            title: '等级变化',
                            key: 'grade',
                            render: (record: any) => (
                              record.original.grade !== record.modified.grade ?
                              <span>{record.original.grade} → {record.modified.grade}</span> :
                              <span>{record.original.grade}</span>
                            )
                          }
                        ]}
                        dataSource={comparisonResult.ingredients.modified}
                        pagination={false}
                        rowKey={(record: any) => record.original.id}
                      />
                    </Card>
                  )}
                </Space>
              </TabPane>

              <TabPane tab="性能指标对比" key="properties">
                <Table
                  size="small"
                  columns={[
                    { title: '指标', dataIndex: 'fieldName', key: 'fieldName' },
                    {
                      title: `${comparisonResult.formula1.name}`,
                      dataIndex: 'formula1Value',
                      key: 'formula1Value',
                      render: (value: number, record: ComparisonResult) => (
                        <span>{value}{record.field === 'moisture' ? '%' : 'mg'}</span>
                      )
                    },
                    {
                      title: `${comparisonResult.formula2.name}`,
                      dataIndex: 'formula2Value',
                      key: 'formula2Value',
                      render: (value: number, record: ComparisonResult) => (
                        <span>{value}{record.field === 'moisture' ? '%' : 'mg'}</span>
                      )
                    },
                    {
                      title: '变化',
                      key: 'change',
                      render: (record: ComparisonResult) => {
                        if (!record.isDifferent) return <Tag color="green">无变化</Tag>
                        const diff = record.formula2Value - record.formula1Value
                        const percent = ((diff / record.formula1Value) * 100).toFixed(1)
                        return (
                          <span>
                            <Tag color={diff > 0 ? 'red' : 'green'}>
                              {diff > 0 ? '+' : ''}{diff.toFixed(1)} ({diff > 0 ? '+' : ''}{percent}%)
                            </Tag>
                          </span>
                        )
                      }
                    }
                  ]}
                  dataSource={[comparisonResult.cost, ...comparisonResult.properties]}
                  pagination={false}
                  rowKey="field"
                />
              </TabPane>
            </Tabs>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default FormulaManagement
