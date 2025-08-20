import React, { useState } from 'react'
import { Card, Table, Button, Input, Select, Space, Tag, Modal, Form, InputNumber, Tabs, Row, Col, Statistic } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExperimentOutlined,
  ShoppingOutlined,
  AlertOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'

const { Search } = Input
const { Option } = Select
const { TabPane } = Tabs

interface FlavorFormula {
  id: string
  name: string
  code: string
  type: string
  status: string
  creator: string
  createTime: string
  updateTime: string
  description: string
  ingredients: Array<{
    id: string
    name: string
    ratio: number
    unit: string
    supplier: string
  }>
  cost: number
  batchSize: number
}

interface FlavorMaterial {
  id: string
  name: string
  code: string
  type: string
  stock: number
  unit: string
  supplier: string
  status: string
  expiryDate: string
  price: number
}

interface Supplier {
  id: string
  name: string
  contact: string
  phone: string
  email: string
  rating: number
  status: string
  materials: string[]
}

const FlavorManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('formulas')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add')

  // 香精配方数据
  const flavorFormulas: FlavorFormula[] = [
    {
      id: 'FF001',
      name: '经典烟草香精',
      code: 'FLV-001',
      type: '烟草型',
      status: 'approved',
      creator: '王调香',
      createTime: '2024-03-15 09:30:00',
      updateTime: '2024-03-20 14:20:00',
      description: '经典烟草香韵，适用于中式卷烟',
      ingredients: [
        { id: '1', name: '烟草浸膏', ratio: 35, unit: '%', supplier: '香料公司A' },
        { id: '2', name: '香草醛', ratio: 15, unit: '%', supplier: '香料公司B' },
        { id: '3', name: '乙基麦芽酚', ratio: 10, unit: '%', supplier: '香料公司A' }
      ],
      cost: 85.5,
      batchSize: 100
    },
    {
      id: 'FF002',
      name: '果香型香精',
      code: 'FLV-002',
      type: '果香型',
      status: 'testing',
      creator: '李调香',
      createTime: '2024-03-18 10:15:00',
      updateTime: '2024-03-22 16:45:00',
      description: '清新果香，适合年轻消费群体',
      ingredients: [
        { id: '1', name: '苹果酯', ratio: 25, unit: '%', supplier: '香料公司C' },
        { id: '2', name: '柠檬醛', ratio: 20, unit: '%', supplier: '香料公司B' }
      ],
      cost: 92.3,
      batchSize: 50
    },
    {
      id: 'FF003',
      name: '花香型香精',
      code: 'FLV-003',
      type: '花香型',
      status: 'draft',
      creator: '张调香',
      createTime: '2024-03-20 14:30:00',
      updateTime: '2024-03-25 11:20:00',
      description: '淡雅花香，高端产品专用',
      ingredients: [
        { id: '1', name: '玫瑰精油', ratio: 30, unit: '%', supplier: '香料公司D' },
        { id: '2', name: '茉莉酮', ratio: 25, unit: '%', supplier: '香料公司C' }
      ],
      cost: 156.8,
      batchSize: 25
    },
    {
      id: 'FF004',
      name: '薄荷香精',
      code: 'FLV-004',
      type: '薄荷型',
      status: 'approved',
      creator: '赵调香',
      createTime: '2024-03-12 08:45:00',
      updateTime: '2024-03-18 13:30:00',
      description: '清凉薄荷香，夏季产品首选',
      ingredients: [
        { id: '1', name: '薄荷脑', ratio: 40, unit: '%', supplier: '香料公司E' },
        { id: '2', name: '薄荷油', ratio: 30, unit: '%', supplier: '香料公司E' }
      ],
      cost: 78.9,
      batchSize: 75
    },
    {
      id: 'FF005',
      name: '木香型香精',
      code: 'FLV-005',
      type: '木香型',
      status: 'testing',
      creator: '孙调香',
      createTime: '2024-03-22 16:20:00',
      updateTime: '2024-03-26 09:15:00',
      description: '深沉木香，成熟男性偏好',
      ingredients: [
        { id: '1', name: '檀香醇', ratio: 35, unit: '%', supplier: '香料公司F' },
        { id: '2', name: '雪松醇', ratio: 25, unit: '%', supplier: '香料公司F' }
      ],
      cost: 134.7,
      batchSize: 40
    },
    {
      id: 'FF006',
      name: '甜香型香精',
      code: 'FLV-006',
      type: '甜香型',
      status: 'approved',
      creator: '钱调香',
      createTime: '2024-03-10 11:30:00',
      updateTime: '2024-03-15 15:45:00',
      description: '温和甜香，女性消费者喜爱',
      ingredients: [
        { id: '1', name: '香草醛', ratio: 30, unit: '%', supplier: '香料公司B' },
        { id: '2', name: '乙基香草醛', ratio: 20, unit: '%', supplier: '香料公司B' }
      ],
      cost: 89.6,
      batchSize: 60
    },
    {
      id: 'FF007',
      name: '复合香精',
      code: 'FLV-007',
      type: '复合型',
      status: 'draft',
      creator: '周调香',
      createTime: '2024-03-25 13:45:00',
      updateTime: '2024-03-28 10:30:00',
      description: '多层次复合香韵，高端定制',
      ingredients: [
        { id: '1', name: '烟草浸膏', ratio: 20, unit: '%', supplier: '香料公司A' },
        { id: '2', name: '果香酯类', ratio: 15, unit: '%', supplier: '香料公司C' },
        { id: '3', name: '花香醇类', ratio: 15, unit: '%', supplier: '香料公司D' }
      ],
      cost: 198.5,
      batchSize: 30
    },
    {
      id: 'FF008',
      name: '清香型香精',
      code: 'FLV-008',
      type: '清香型',
      status: 'testing',
      creator: '吴调香',
      createTime: '2024-03-28 09:20:00',
      updateTime: '2024-03-30 14:50:00',
      description: '清淡香韵，适合低焦油产品',
      ingredients: [
        { id: '1', name: '柠檬烯', ratio: 25, unit: '%', supplier: '香料公司G' },
        { id: '2', name: '薄荷醇', ratio: 20, unit: '%', supplier: '香料公司E' }
      ],
      cost: 76.4,
      batchSize: 80
    }
  ]

  // 香原料数据
  const flavorMaterials: FlavorMaterial[] = [
    {
      id: 'FM001',
      name: '烟草浸膏',
      code: 'MAT-001',
      type: '天然香料',
      stock: 250,
      unit: 'kg',
      supplier: '香料公司A',
      status: 'normal',
      expiryDate: '2024-12-31',
      price: 180.5
    },
    {
      id: 'FM002',
      name: '香草醛',
      code: 'MAT-002',
      type: '合成香料',
      stock: 180,
      unit: 'kg',
      supplier: '香料公司B',
      status: 'normal',
      expiryDate: '2025-06-30',
      price: 95.8
    },
    {
      id: 'FM003',
      name: '薄荷脑',
      code: 'MAT-003',
      type: '天然香料',
      stock: 85,
      unit: 'kg',
      supplier: '香料公司E',
      status: 'warning',
      expiryDate: '2024-09-15',
      price: 156.2
    },
    {
      id: 'FM004',
      name: '玫瑰精油',
      code: 'MAT-004',
      type: '天然香料',
      stock: 45,
      unit: 'kg',
      supplier: '香料公司D',
      status: 'low',
      expiryDate: '2024-08-20',
      price: 890.3
    },
    {
      id: 'FM005',
      name: '柠檬醛',
      code: 'MAT-005',
      type: '合成香料',
      stock: 120,
      unit: 'kg',
      supplier: '香料公司B',
      status: 'normal',
      expiryDate: '2025-03-15',
      price: 78.9
    },
    {
      id: 'FM006',
      name: '檀香醇',
      code: 'MAT-006',
      type: '天然香料',
      stock: 65,
      unit: 'kg',
      supplier: '香料公司F',
      status: 'warning',
      expiryDate: '2024-11-30',
      price: 245.7
    },
    {
      id: 'FM007',
      name: '乙基麦芽酚',
      code: 'MAT-007',
      type: '合成香料',
      stock: 95,
      unit: 'kg',
      supplier: '香料公司A',
      status: 'normal',
      expiryDate: '2025-01-20',
      price: 125.4
    },
    {
      id: 'FM008',
      name: '茉莉酮',
      code: 'MAT-008',
      type: '合成香料',
      stock: 55,
      unit: 'kg',
      supplier: '香料公司C',
      status: 'warning',
      expiryDate: '2024-10-10',
      price: 198.6
    }
  ]

  // 供应商数据
  const suppliers: Supplier[] = [
    {
      id: 'SUP001',
      name: '香料公司A',
      contact: '张经理',
      phone: '021-12345678',
      email: 'zhang@fragrance-a.com',
      rating: 4.8,
      status: 'active',
      materials: ['烟草浸膏', '乙基麦芽酚', '香草醛']
    },
    {
      id: 'SUP002',
      name: '香料公司B',
      contact: '李经理',
      phone: '010-87654321',
      email: 'li@fragrance-b.com',
      rating: 4.6,
      status: 'active',
      materials: ['香草醛', '柠檬醛', '乙基香草醛']
    },
    {
      id: 'SUP003',
      name: '香料公司C',
      contact: '王经理',
      phone: '0755-11223344',
      email: 'wang@fragrance-c.com',
      rating: 4.5,
      status: 'active',
      materials: ['苹果酯', '茉莉酮', '果香酯类']
    },
    {
      id: 'SUP004',
      name: '香料公司D',
      contact: '赵经理',
      phone: '0571-99887766',
      email: 'zhao@fragrance-d.com',
      rating: 4.9,
      status: 'active',
      materials: ['玫瑰精油', '花香醇类', '茉莉精油']
    },
    {
      id: 'SUP005',
      name: '香料公司E',
      contact: '孙经理',
      phone: '028-55443322',
      email: 'sun@fragrance-e.com',
      rating: 4.7,
      status: 'active',
      materials: ['薄荷脑', '薄荷油', '薄荷醇']
    },
    {
      id: 'SUP006',
      name: '香料公司F',
      contact: '钱经理',
      phone: '0532-77889900',
      email: 'qian@fragrance-f.com',
      rating: 4.4,
      status: 'active',
      materials: ['檀香醇', '雪松醇', '木香精油']
    },
    {
      id: 'SUP007',
      name: '香料公司G',
      contact: '周经理',
      phone: '0592-33445566',
      email: 'zhou@fragrance-g.com',
      rating: 4.3,
      status: 'active',
      materials: ['柠檬烯', '橙花醇', '柑橘精油']
    },
    {
      id: 'SUP008',
      name: '香料公司H',
      contact: '吴经理',
      phone: '0731-66778899',
      email: 'wu@fragrance-h.com',
      rating: 4.2,
      status: 'inactive',
      materials: ['龙涎香', '麝香酮', '动物香料']
    }
  ]

  const formulaColumns = [
    {
      title: '配方编号',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <a>{text}</a>
    },
    {
      title: '配方名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="blue">{type}</Tag>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = { draft: 'orange', testing: 'blue', approved: 'green' }
        const names = { draft: '草稿', testing: '测试中', approved: '已批准' }
        return <Tag color={colors[status as keyof typeof colors]}>{names[status as keyof typeof names]}</Tag>
      }
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator'
    },
    {
      title: '成本(元/kg)',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost: number) => `¥${cost.toFixed(2)}`
    },
    {
      title: '批次大小',
      dataIndex: 'batchSize',
      key: 'batchSize',
      render: (size: number) => `${size}kg`
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

  const materialColumns = [
    {
      title: '原料编号',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '原料名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="green">{type}</Tag>
    },
    {
      title: '库存',
      key: 'stock',
      render: (record: FlavorMaterial) => `${record.stock} ${record.unit}`
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const configs = {
          normal: { color: 'green', text: '正常' },
          warning: { color: 'orange', text: '预警' },
          low: { color: 'red', text: '库存不足' }
        }
        const config = configs[status as keyof typeof configs]
        return <Tag color={config.color}>{config.text}</Tag>
      }
    },
    {
      title: '供应商',
      dataIndex: 'supplier',
      key: 'supplier'
    },
    {
      title: '单价(元/kg)',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price.toFixed(2)}`
    },
    {
      title: '到期日期',
      dataIndex: 'expiryDate',
      key: 'expiryDate'
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

  const supplierColumns = [
    {
      title: '供应商名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact'
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '评分',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <span style={{ color: rating >= 4.5 ? '#52c41a' : rating >= 4.0 ? '#faad14' : '#f5222d' }}>
          {rating.toFixed(1)} ⭐
        </span>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '活跃' : '停用'}
        </Tag>
      )
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

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">香精管理</h1>
        <p className="page-description">
          管理香精配方、调配工单、原料库存和供应商评价
        </p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="香精配方总数"
              value={flavorFormulas.length}
              prefix={<ExperimentOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="原料种类"
              value={flavorMaterials.length}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="库存预警"
              value={flavorMaterials.filter(m => m.status === 'warning' || m.status === 'low').length}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="活跃供应商"
              value={suppliers.filter(s => s.status === 'active').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="香精配方" key="formulas" icon={<ExperimentOutlined />}>
          <Card>
            <Space style={{ marginBottom: 16 }}>
              <Search
                placeholder="搜索配方名称或编号"
                allowClear
                style={{ width: 300 }}
              />
              <Select
                placeholder="选择类型"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="烟草型">烟草型</Option>
                <Option value="果香型">果香型</Option>
                <Option value="花香型">花香型</Option>
                <Option value="薄荷型">薄荷型</Option>
                <Option value="木香型">木香型</Option>
                <Option value="甜香型">甜香型</Option>
                <Option value="复合型">复合型</Option>
                <Option value="清香型">清香型</Option>
              </Select>
              <Select
                placeholder="选择状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="draft">草稿</Option>
                <Option value="testing">测试中</Option>
                <Option value="approved">已批准</Option>
              </Select>
              <Button type="primary" icon={<PlusOutlined />}>
                新建配方
              </Button>
            </Space>

            <Table
              columns={formulaColumns}
              dataSource={flavorFormulas}
              rowKey="id"
              pagination={{
                total: flavorFormulas.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="香原料库存" key="materials" icon={<ShoppingOutlined />}>
          <Card>
            <Space style={{ marginBottom: 16 }}>
              <Search
                placeholder="搜索原料名称或编号"
                allowClear
                style={{ width: 300 }}
              />
              <Select
                placeholder="选择类型"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="天然香料">天然香料</Option>
                <Option value="合成香料">合成香料</Option>
              </Select>
              <Select
                placeholder="库存状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="normal">正常</Option>
                <Option value="warning">预警</Option>
                <Option value="low">库存不足</Option>
              </Select>
              <Button type="primary" icon={<PlusOutlined />}>
                新增原料
              </Button>
            </Space>

            <Table
              columns={materialColumns}
              dataSource={flavorMaterials}
              rowKey="id"
              pagination={{
                total: flavorMaterials.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="供应商管理" key="suppliers" icon={<CheckCircleOutlined />}>
          <Card>
            <Space style={{ marginBottom: 16 }}>
              <Search
                placeholder="搜索供应商名称"
                allowClear
                style={{ width: 300 }}
              />
              <Select
                placeholder="选择状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="active">活跃</Option>
                <Option value="inactive">停用</Option>
              </Select>
              <Button type="primary" icon={<PlusOutlined />}>
                新增供应商
              </Button>
            </Space>

            <Table
              columns={supplierColumns}
              dataSource={suppliers}
              rowKey="id"
              pagination={{
                total: suppliers.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* 模态框 */}
      <Modal
        title={modalType === 'add' ? '新建配方' : modalType === 'edit' ? '编辑配方' : '配方详情'}
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
              <Form.Item label="配方名称">
                <Input placeholder="请输入配方名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="配方类型">
                <Select placeholder="请选择配方类型">
                  <Option value="烟草型">烟草型</Option>
                  <Option value="果香型">果香型</Option>
                  <Option value="花香型">花香型</Option>
                  <Option value="薄荷型">薄荷型</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="批次大小(kg)">
                <InputNumber min={1} placeholder="请输入批次大小" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="预估成本(元/kg)">
                <InputNumber min={0} step={0.01} placeholder="请输入预估成本" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="配方描述">
            <Input.TextArea rows={3} placeholder="请输入配方描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default FlavorManagement
