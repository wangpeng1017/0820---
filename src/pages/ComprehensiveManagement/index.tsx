import React, { useState } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Modal, Form, Input, Select, Progress, Alert, Timeline, DatePicker, Upload, Divider, Tree } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  FileTextOutlined,
  FolderOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
  DownloadOutlined,
  SearchOutlined,
  FilterOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  HomeOutlined,
  LaptopOutlined,
  CarOutlined,
  ToolOutlined,
  BookOutlined,
  TrophyOutlined,
  StarOutlined,
  WarningOutlined,
  SyncOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input
const { TreeNode } = Tree

// 科研成果接口
interface ResearchAchievement {
  id: string
  title: string
  type: 'paper' | 'patent' | 'standard' | 'report' | 'award'
  author: string
  coAuthors: string[]
  completionDate: string
  status: 'draft' | 'submitted' | 'published' | 'archived'
  category: string
  keywords: string[]
  abstract: string
  attachments: string[]
  citations?: number
  impactFactor?: number
  archiveLocation?: string
  archiveDate?: string
}

// 固定资产接口
interface FixedAsset {
  id: string
  name: string
  category: 'equipment' | 'furniture' | 'vehicle' | 'building' | 'software'
  model: string
  serialNumber: string
  purchaseDate: string
  purchasePrice: number
  currentValue: number
  depreciation: number
  location: string
  responsible: string
  status: 'normal' | 'maintenance' | 'repair' | 'scrapped' | 'idle'
  maintenanceRecords: MaintenanceRecord[]
  warrantyExpiry?: string
  supplier: string
  notes?: string
}

// 维护记录接口
interface MaintenanceRecord {
  id: string
  date: string
  type: 'routine' | 'repair' | 'upgrade' | 'inspection'
  description: string
  cost: number
  operator: string
  nextMaintenanceDate?: string
}

// 安全工作接口
interface SecurityWork {
  id: string
  title: string
  type: 'inspection' | 'training' | 'incident' | 'drill' | 'audit'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  description: string
  responsible: string
  participants: string[]
  plannedDate: string
  actualDate?: string
  status: 'planned' | 'ongoing' | 'completed' | 'overdue'
  findings?: string
  actions?: string
  followUp?: string
  attachments: string[]
}

// 档案管理接口
interface Archive {
  id: string
  title: string
  category: 'research' | 'project' | 'personnel' | 'financial' | 'legal' | 'quality'
  documentType: string
  createDate: string
  archiveDate: string
  retentionPeriod: number // 年
  location: string
  responsible: string
  status: 'active' | 'archived' | 'destroyed'
  accessLevel: 'public' | 'internal' | 'confidential' | 'secret'
  keywords: string[]
  summary: string
  relatedDocuments: string[]
  digitalCopy: boolean
}

// 行政事务接口
interface AdministrativeTask {
  id: string
  title: string
  type: 'meeting' | 'travel' | 'procurement' | 'approval' | 'notification' | 'other'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  description: string
  initiator: string
  assignee: string
  dueDate: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  progress: number
  attachments: string[]
  comments: string[]
  approvalFlow?: ApprovalStep[]
}

// 审批流程接口
interface ApprovalStep {
  id: string
  stepName: string
  approver: string
  status: 'pending' | 'approved' | 'rejected'
  approvalDate?: string
  comments?: string
}

const ComprehensiveManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('achievements')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [archiveModalVisible, setArchiveModalVisible] = useState(false)
  const [assetModalVisible, setAssetModalVisible] = useState(false)

  // 模拟科研成果数据
  const achievements: ResearchAchievement[] = [
    {
      id: 'RA001',
      title: '基于机器学习的卷烟配方优化算法研究',
      type: 'paper',
      author: '张研究',
      coAuthors: ['李算法', '王数据', '赵模型'],
      completionDate: '2024-03-15',
      status: 'published',
      category: '人工智能',
      keywords: ['机器学习', '配方优化', '算法', '卷烟'],
      abstract: '本研究提出了一种基于机器学习的卷烟配方优化算法，通过分析历史配方数据和质量指标，建立了预测模型，实现了配方的智能优化。实验结果表明，该算法能够有效提升产品质量并降低成本。',
      attachments: ['paper_v1.2.pdf', 'data_analysis.xlsx'],
      citations: 15,
      impactFactor: 2.8,
      archiveLocation: '科研档案室-A区-001',
      archiveDate: '2024-03-20'
    },
    {
      id: 'RA002',
      title: '环保型卷烟纸制备工艺发明专利',
      type: 'patent',
      author: '孙材料',
      coAuthors: ['钱工艺', '周环保'],
      completionDate: '2024-02-28',
      status: 'submitted',
      category: '材料科学',
      keywords: ['环保', '卷烟纸', '制备工艺', '专利'],
      abstract: '本发明涉及一种环保型卷烟纸的制备工艺，采用可降解纤维材料，通过特殊的处理工艺，制备出具有良好透气性和燃烧性能的环保卷烟纸。',
      attachments: ['patent_application.pdf', 'technical_drawings.dwg'],
      archiveLocation: '知识产权部-专利库-P2024-001'
    },
    {
      id: 'RA003',
      title: '烟草行业质量管理体系标准',
      type: 'standard',
      author: '吴标准',
      coAuthors: ['郑质量', '冯体系'],
      completionDate: '2024-01-20',
      status: 'published',
      category: '质量管理',
      keywords: ['质量管理', '体系标准', '烟草行业'],
      abstract: '制定了适用于烟草行业的质量管理体系标准，规范了从原料采购到产品销售的全流程质量控制要求。',
      attachments: ['standard_document.pdf', 'implementation_guide.pdf'],
      archiveLocation: '标准化部-行业标准-YC2024-001',
      archiveDate: '2024-01-25'
    },
    {
      id: 'RA004',
      title: '2023年度技术创新报告',
      type: 'report',
      author: '陈报告',
      coAuthors: ['刘创新', '马技术'],
      completionDate: '2024-01-10',
      status: 'archived',
      category: '技术创新',
      keywords: ['技术创新', '年度报告', '总结'],
      abstract: '总结了2023年度的技术创新成果，包括新产品开发、工艺改进、设备升级等方面的进展和成效。',
      attachments: ['annual_report_2023.pdf', 'innovation_statistics.xlsx'],
      archiveLocation: '技术部-年度报告-2023',
      archiveDate: '2024-01-15'
    },
    {
      id: 'RA005',
      title: '全国烟草科技进步一等奖',
      type: 'award',
      author: '朱获奖',
      coAuthors: ['徐团队', '杨项目'],
      completionDate: '2023-12-15',
      status: 'archived',
      category: '科技奖励',
      keywords: ['科技进步奖', '一等奖', '全国'],
      abstract: '因在烟草智能制造技术方面的突出贡献，获得全国烟草科技进步一等奖。',
      attachments: ['award_certificate.pdf', 'achievement_summary.pdf'],
      archiveLocation: '荣誉档案室-奖项-2023-001',
      archiveDate: '2023-12-20'
    }
  ]

  // 模拟固定资产数据
  const fixedAssets: FixedAsset[] = [
    {
      id: 'FA001',
      name: 'GC-MS气相色谱质谱联用仪',
      category: 'equipment',
      model: 'Agilent 7890B-5977B',
      serialNumber: 'AG2023001',
      purchaseDate: '2023-06-15',
      purchasePrice: 850000,
      currentValue: 765000,
      depreciation: 85000,
      location: '分析检测中心-201室',
      responsible: '王分析',
      status: 'normal',
      warrantyExpiry: '2026-06-15',
      supplier: '安捷伦科技有限公司',
      maintenanceRecords: [
        {
          id: 'MR001',
          date: '2024-03-01',
          type: 'routine',
          description: '定期保养维护，更换进样针',
          cost: 2500,
          operator: '李维护',
          nextMaintenanceDate: '2024-06-01'
        }
      ],
      notes: '高精度分析设备，需要专人操作'
    },
    {
      id: 'FA002',
      name: '中试生产线设备',
      category: 'equipment',
      model: 'Custom-2023',
      serialNumber: 'CS2023002',
      purchaseDate: '2023-03-20',
      purchasePrice: 2800000,
      currentValue: 2520000,
      depreciation: 280000,
      location: '中试车间-A区',
      responsible: '赵工艺',
      status: 'normal',
      warrantyExpiry: '2025-03-20',
      supplier: '烟机工程有限公司',
      maintenanceRecords: [
        {
          id: 'MR002',
          date: '2024-02-15',
          type: 'repair',
          description: '更换传送带，调整切丝刀片',
          cost: 15000,
          operator: '孙维修',
          nextMaintenanceDate: '2024-05-15'
        }
      ]
    },
    {
      id: 'FA003',
      name: '办公桌椅套装',
      category: 'furniture',
      model: 'OF-2023-A',
      serialNumber: 'OF2023003',
      purchaseDate: '2023-08-10',
      purchasePrice: 25000,
      currentValue: 20000,
      depreciation: 5000,
      location: '研发大楼-3楼',
      responsible: '钱行政',
      status: 'normal',
      supplier: '办公家具有限公司',
      maintenanceRecords: []
    },
    {
      id: 'FA004',
      name: '公务用车',
      category: 'vehicle',
      model: '帕萨特2023款',
      serialNumber: 'VW2023004',
      purchaseDate: '2023-05-12',
      purchasePrice: 220000,
      currentValue: 176000,
      depreciation: 44000,
      location: '地下停车场-B区',
      responsible: '周司机',
      status: 'normal',
      supplier: '大众汽车销售公司',
      maintenanceRecords: [
        {
          id: 'MR003',
          date: '2024-03-10',
          type: 'routine',
          description: '定期保养，更换机油机滤',
          cost: 800,
          operator: '4S店',
          nextMaintenanceDate: '2024-09-10'
        }
      ]
    },
    {
      id: 'FA005',
      name: 'ERP管理系统软件',
      category: 'software',
      model: 'SAP ERP 6.0',
      serialNumber: 'SAP2023005',
      purchaseDate: '2023-04-01',
      purchasePrice: 500000,
      currentValue: 400000,
      depreciation: 100000,
      location: '信息中心-服务器机房',
      responsible: '吴IT',
      status: 'normal',
      supplier: 'SAP中国有限公司',
      maintenanceRecords: [
        {
          id: 'MR004',
          date: '2024-01-15',
          type: 'upgrade',
          description: '系统版本升级，安全补丁更新',
          cost: 50000,
          operator: 'SAP技术支持',
          nextMaintenanceDate: '2024-07-15'
        }
      ]
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">综合管理</h1>
        <p className="page-description">
          科研成果归档、固定资产管理、安全工作管理、档案管理、行政事务管理
        </p>
      </div>

      {/* 统计概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="科研成果"
              value={achievements.length}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="固定资产"
              value={fixedAssets.length}
              prefix={<LaptopOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="资产总值"
              value={fixedAssets.reduce((sum, asset) => sum + asset.currentValue, 0)}
              prefix="¥"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="待办事务"
              value={12}
              prefix={<BellOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="科研成果" key="achievements" icon={<TrophyOutlined />}>
          <Card 
            title="科研成果归档管理" 
            extra={
              <Space>
                <Button 
                  icon={<SyncOutlined />}
                >
                  自动归档
                </Button>
                <Button 
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setModalType('create')
                    setSelectedRecord(null)
                    setModalVisible(true)
                  }}
                >
                  新增成果
                </Button>
              </Space>
            }
          >
            <Space style={{ marginBottom: 16 }}>
              <Select
                placeholder="成果类型"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="paper">论文</Option>
                <Option value="patent">专利</Option>
                <Option value="standard">标准</Option>
                <Option value="report">报告</Option>
                <Option value="award">奖项</Option>
              </Select>
              <Select
                placeholder="状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="draft">草稿</Option>
                <Option value="submitted">已提交</Option>
                <Option value="published">已发表</Option>
                <Option value="archived">已归档</Option>
              </Select>
              <Select
                placeholder="分类"
                style={{ width: 150 }}
                allowClear
              >
                <Option value="人工智能">人工智能</Option>
                <Option value="材料科学">材料科学</Option>
                <Option value="质量管理">质量管理</Option>
                <Option value="技术创新">技术创新</Option>
                <Option value="科技奖励">科技奖励</Option>
              </Select>
              <Input 
                placeholder="搜索标题或作者" 
                prefix={<SearchOutlined />}
                style={{ width: 200 }}
              />
            </Space>

            <Table
              columns={[
                {
                  title: '成果标题',
                  dataIndex: 'title',
                  key: 'title',
                  render: (text: string) => <a>{text}</a>
                },
                {
                  title: '类型',
                  dataIndex: 'type',
                  key: 'type',
                  render: (type: string) => {
                    const typeConfigs = {
                      paper: { color: 'blue', text: '论文' },
                      patent: { color: 'green', text: '专利' },
                      standard: { color: 'orange', text: '标准' },
                      report: { color: 'purple', text: '报告' },
                      award: { color: 'gold', text: '奖项' }
                    }
                    const config = typeConfigs[type as keyof typeof typeConfigs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '主要作者',
                  dataIndex: 'author',
                  key: 'author'
                },
                {
                  title: '完成日期',
                  dataIndex: 'completionDate',
                  key: 'completionDate'
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => {
                    const statusConfigs = {
                      draft: { color: 'default', text: '草稿' },
                      submitted: { color: 'blue', text: '已提交' },
                      published: { color: 'green', text: '已发表' },
                      archived: { color: 'cyan', text: '已归档' }
                    }
                    const config = statusConfigs[status as keyof typeof statusConfigs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '分类',
                  dataIndex: 'category',
                  key: 'category',
                  render: (category: string) => <Tag>{category}</Tag>
                },
                {
                  title: '影响因子',
                  dataIndex: 'impactFactor',
                  key: 'impactFactor',
                  render: (factor: number) => factor ? factor.toFixed(1) : '-'
                },
                {
                  title: '引用次数',
                  dataIndex: 'citations',
                  key: 'citations',
                  render: (citations: number) => citations || '-'
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (record: ResearchAchievement) => (
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
                        disabled={record.status === 'archived'}
                      >
                        编辑
                      </Button>
                      <Button 
                        type="link" 
                        icon={<FolderOutlined />} 
                        size="small"
                        onClick={() => {
                          setSelectedRecord(record)
                          setArchiveModalVisible(true)
                        }}
                      >
                        归档
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={achievements}
              rowKey="id"
              pagination={{
                total: achievements.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="固定资产" key="assets" icon={<LaptopOutlined />}>
          <Card
            title="固定资产全生命周期管理"
            extra={
              <Space>
                <Button
                  icon={<WarningOutlined />}
                >
                  维护提醒
                </Button>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setSelectedRecord(null)
                    setAssetModalVisible(true)
                  }}
                >
                  新增资产
                </Button>
              </Space>
            }
          >
            <Space style={{ marginBottom: 16 }}>
              <Select
                placeholder="资产类别"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="equipment">设备</Option>
                <Option value="furniture">家具</Option>
                <Option value="vehicle">车辆</Option>
                <Option value="building">建筑</Option>
                <Option value="software">软件</Option>
              </Select>
              <Select
                placeholder="资产状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="normal">正常</Option>
                <Option value="maintenance">维护中</Option>
                <Option value="repair">维修中</Option>
                <Option value="scrapped">已报废</Option>
                <Option value="idle">闲置</Option>
              </Select>
              <Input
                placeholder="搜索资产名称或编号"
                prefix={<SearchOutlined />}
                style={{ width: 200 }}
              />
            </Space>

            <Table
              columns={[
                {
                  title: '资产名称',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => <a>{text}</a>
                },
                {
                  title: '类别',
                  dataIndex: 'category',
                  key: 'category',
                  render: (category: string) => {
                    const categoryConfigs = {
                      equipment: { color: 'blue', text: '设备', icon: <ToolOutlined /> },
                      furniture: { color: 'green', text: '家具', icon: <HomeOutlined /> },
                      vehicle: { color: 'orange', text: '车辆', icon: <CarOutlined /> },
                      building: { color: 'purple', text: '建筑', icon: <HomeOutlined /> },
                      software: { color: 'cyan', text: '软件', icon: <LaptopOutlined /> }
                    }
                    const config = categoryConfigs[category as keyof typeof categoryConfigs]
                    return <Tag color={config.color} icon={config.icon}>{config.text}</Tag>
                  }
                },
                {
                  title: '型号',
                  dataIndex: 'model',
                  key: 'model'
                },
                {
                  title: '序列号',
                  dataIndex: 'serialNumber',
                  key: 'serialNumber',
                  render: (serial: string) => <Tag color="blue">{serial}</Tag>
                },
                {
                  title: '购买价格',
                  dataIndex: 'purchasePrice',
                  key: 'purchasePrice',
                  render: (price: number) => `¥${price.toLocaleString()}`
                },
                {
                  title: '当前价值',
                  dataIndex: 'currentValue',
                  key: 'currentValue',
                  render: (value: number) => `¥${value.toLocaleString()}`
                },
                {
                  title: '折旧率',
                  key: 'depreciationRate',
                  render: (record: FixedAsset) => {
                    const rate = (record.depreciation / record.purchasePrice) * 100
                    return `${rate.toFixed(1)}%`
                  }
                },
                {
                  title: '存放位置',
                  dataIndex: 'location',
                  key: 'location'
                },
                {
                  title: '责任人',
                  dataIndex: 'responsible',
                  key: 'responsible'
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => {
                    const statusConfigs = {
                      normal: { color: 'green', text: '正常' },
                      maintenance: { color: 'blue', text: '维护中' },
                      repair: { color: 'orange', text: '维修中' },
                      scrapped: { color: 'red', text: '已报废' },
                      idle: { color: 'default', text: '闲置' }
                    }
                    const config = statusConfigs[status as keyof typeof statusConfigs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (record: FixedAsset) => (
                    <Space size="middle">
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => {
                          setSelectedRecord(record)
                          setAssetModalVisible(true)
                        }}
                      >
                        查看
                      </Button>
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        size="small"
                        disabled={record.status === 'scrapped'}
                      >
                        编辑
                      </Button>
                      <Button
                        type="link"
                        icon={<SettingOutlined />}
                        size="small"
                      >
                        维护
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={fixedAssets}
              rowKey="id"
              pagination={{
                total: fixedAssets.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="安全工作" key="security" icon={<SafetyCertificateOutlined />}>
          <Card title="内部安全工作闭环管理">
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={8}>
                <Card size="small" title="安全检查计划">
                  <Timeline size="small">
                    <Timeline.Item color="green">
                      <div style={{ fontWeight: 'bold' }}>消防安全检查</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>2024-04-01 - 已完成</div>
                      <div style={{ fontSize: '12px' }}>检查结果: 合格</div>
                    </Timeline.Item>
                    <Timeline.Item color="blue">
                      <div style={{ fontWeight: 'bold' }}>实验室安全培训</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>2024-04-05 - 进行中</div>
                      <div style={{ fontSize: '12px' }}>参与人员: 25人</div>
                    </Timeline.Item>
                    <Timeline.Item color="orange">
                      <div style={{ fontWeight: 'bold' }}>应急演练</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>2024-04-10 - 计划中</div>
                      <div style={{ fontSize: '12px' }}>类型: 火灾疏散演练</div>
                    </Timeline.Item>
                    <Timeline.Item color="gray">
                      <div style={{ fontWeight: 'bold' }}>安全审计</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>2024-04-15 - 待安排</div>
                    </Timeline.Item>
                  </Timeline>
                </Card>
              </Col>

              <Col xs={24} lg={8}>
                <Card size="small" title="安全指标统计">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <div style={{ marginBottom: 8 }}>安全检查完成率</div>
                      <Progress percent={85} size="small" status="active" />
                    </div>
                    <div>
                      <div style={{ marginBottom: 8 }}>培训参与率</div>
                      <Progress percent={92} size="small" strokeColor="#52c41a" />
                    </div>
                    <div>
                      <div style={{ marginBottom: 8 }}>隐患整改率</div>
                      <Progress percent={78} size="small" strokeColor="#faad14" />
                    </div>
                    <div>
                      <div style={{ marginBottom: 8 }}>应急响应时间</div>
                      <Progress percent={95} size="small" strokeColor="#722ed1" />
                    </div>

                    <Alert
                      message="安全状态良好"
                      description="本月无重大安全事故，安全管理体系运行正常"
                      type="success"
                      size="small"
                    />
                  </Space>
                </Card>
              </Col>

              <Col xs={24} lg={8}>
                <Card size="small" title="待处理事项">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Alert
                      message="实验室通风系统检修"
                      description="需要在本周内完成检修工作"
                      type="warning"
                      size="small"
                      showIcon
                    />
                    <Alert
                      message="安全标识更新"
                      description="部分安全标识需要更换"
                      type="info"
                      size="small"
                      showIcon
                    />
                    <Alert
                      message="消防器材检查"
                      description="消防器材定期检查即将到期"
                      type="warning"
                      size="small"
                      showIcon
                    />

                    <Button type="primary" size="small" block>
                      查看全部待办
                    </Button>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>

        <TabPane tab="档案管理" key="archives" icon={<BookOutlined />}>
          <Card title="科研档案智能归档与提醒">
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={6}>
                <Card size="small" title="档案分类">
                  <Tree
                    showIcon
                    defaultExpandAll
                    defaultSelectedKeys={['research']}
                  >
                    <TreeNode icon={<FolderOutlined />} title="科研档案" key="research">
                      <TreeNode icon={<FileTextOutlined />} title="项目档案" key="project" />
                      <TreeNode icon={<FileTextOutlined />} title="技术档案" key="technical" />
                      <TreeNode icon={<FileTextOutlined />} title="专利档案" key="patent" />
                    </TreeNode>
                    <TreeNode icon={<FolderOutlined />} title="人事档案" key="personnel">
                      <TreeNode icon={<FileTextOutlined />} title="员工档案" key="employee" />
                      <TreeNode icon={<FileTextOutlined />} title="培训档案" key="training" />
                    </TreeNode>
                    <TreeNode icon={<FolderOutlined />} title="财务档案" key="financial">
                      <TreeNode icon={<FileTextOutlined />} title="会计档案" key="accounting" />
                      <TreeNode icon={<FileTextOutlined />} title="审计档案" key="audit" />
                    </TreeNode>
                    <TreeNode icon={<FolderOutlined />} title="质量档案" key="quality">
                      <TreeNode icon={<FileTextOutlined />} title="检测档案" key="testing" />
                      <TreeNode icon={<FileTextOutlined />} title="认证档案" key="certification" />
                    </TreeNode>
                  </Tree>
                </Card>
              </Col>

              <Col xs={24} lg={18}>
                <Card size="small" title="档案列表">
                  <Space style={{ marginBottom: 16 }}>
                    <Select placeholder="档案类别" style={{ width: 120 }}>
                      <Option value="research">科研档案</Option>
                      <Option value="project">项目档案</Option>
                      <Option value="personnel">人事档案</Option>
                      <Option value="financial">财务档案</Option>
                      <Option value="quality">质量档案</Option>
                    </Select>
                    <Select placeholder="密级" style={{ width: 100 }}>
                      <Option value="public">公开</Option>
                      <Option value="internal">内部</Option>
                      <Option value="confidential">机密</Option>
                      <Option value="secret">秘密</Option>
                    </Select>
                    <Input placeholder="搜索档案标题" prefix={<SearchOutlined />} style={{ width: 200 }} />
                  </Space>

                  <Table
                    size="small"
                    columns={[
                      { title: '档案标题', dataIndex: 'title', key: 'title' },
                      { title: '类别', dataIndex: 'category', key: 'category', render: (cat: string) => <Tag>{cat}</Tag> },
                      { title: '文档类型', dataIndex: 'documentType', key: 'documentType' },
                      { title: '创建日期', dataIndex: 'createDate', key: 'createDate' },
                      { title: '归档日期', dataIndex: 'archiveDate', key: 'archiveDate' },
                      { title: '保存期限', dataIndex: 'retentionPeriod', key: 'retentionPeriod', render: (period: number) => `${period}年` },
                      { title: '密级', dataIndex: 'accessLevel', key: 'accessLevel', render: (level: string) => {
                        const levelConfigs = {
                          public: { color: 'green', text: '公开' },
                          internal: { color: 'blue', text: '内部' },
                          confidential: { color: 'orange', text: '机密' },
                          secret: { color: 'red', text: '秘密' }
                        }
                        const config = levelConfigs[level as keyof typeof levelConfigs]
                        return <Tag color={config.color}>{config.text}</Tag>
                      }},
                      { title: '责任人', dataIndex: 'responsible', key: 'responsible' },
                      { title: '操作', key: 'action', render: () => (
                        <Space>
                          <Button type="link" size="small">查看</Button>
                          <Button type="link" size="small">下载</Button>
                        </Space>
                      )}
                    ]}
                    dataSource={[
                      { title: '2023年度技术创新项目总结', category: '科研档案', documentType: '项目报告', createDate: '2024-01-10', archiveDate: '2024-01-15', retentionPeriod: 10, accessLevel: 'internal', responsible: '陈报告' },
                      { title: '环保型卷烟纸专利申请文件', category: '科研档案', documentType: '专利文件', createDate: '2024-02-28', archiveDate: '2024-03-05', retentionPeriod: 20, accessLevel: 'confidential', responsible: '孙材料' },
                      { title: '质量管理体系认证档案', category: '质量档案', documentType: '认证文件', createDate: '2024-01-20', archiveDate: '2024-01-25', retentionPeriod: 15, accessLevel: 'internal', responsible: '吴标准' }
                    ]}
                    pagination={false}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>

        <TabPane tab="行政事务" key="administrative" icon={<SettingOutlined />}>
          <Card title="行政事务线上化管理">
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={8}>
                <Card size="small" title="待办事务">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ padding: 8, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                      <div style={{ fontWeight: 'bold', marginBottom: 4 }}>会议室预订审批</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>申请人: 张项目 | 截止: 今天 17:00</div>
                      <div style={{ marginTop: 8 }}>
                        <Button type="primary" size="small" style={{ marginRight: 8 }}>批准</Button>
                        <Button size="small">拒绝</Button>
                      </div>
                    </div>

                    <div style={{ padding: 8, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                      <div style={{ fontWeight: 'bold', marginBottom: 4 }}>差旅费报销申请</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>申请人: 李出差 | 金额: ¥2,500</div>
                      <div style={{ marginTop: 8 }}>
                        <Button type="primary" size="small" style={{ marginRight: 8 }}>批准</Button>
                        <Button size="small">拒绝</Button>
                      </div>
                    </div>

                    <div style={{ padding: 8, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                      <div style={{ fontWeight: 'bold', marginBottom: 4 }}>设备采购申请</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>申请人: 王设备 | 金额: ¥50,000</div>
                      <div style={{ marginTop: 8 }}>
                        <Button type="primary" size="small" style={{ marginRight: 8 }}>批准</Button>
                        <Button size="small">拒绝</Button>
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>

              <Col xs={24} lg={8}>
                <Card size="small" title="流程统计">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span>会议管理</span>
                        <span>15件</span>
                      </div>
                      <Progress percent={80} size="small" />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span>差旅管理</span>
                        <span>8件</span>
                      </div>
                      <Progress percent={60} size="small" strokeColor="#faad14" />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span>采购申请</span>
                        <span>12件</span>
                      </div>
                      <Progress percent={90} size="small" strokeColor="#52c41a" />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span>审批流程</span>
                        <span>25件</span>
                      </div>
                      <Progress percent={75} size="small" strokeColor="#722ed1" />
                    </div>
                  </Space>
                </Card>
              </Col>

              <Col xs={24} lg={8}>
                <Card size="small" title="快速操作">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Button type="primary" icon={<PlusOutlined />} block>
                      发起会议申请
                    </Button>
                    <Button icon={<PlusOutlined />} block>
                      提交差旅申请
                    </Button>
                    <Button icon={<PlusOutlined />} block>
                      设备采购申请
                    </Button>
                    <Button icon={<PlusOutlined />} block>
                      费用报销申请
                    </Button>
                    <Button icon={<FileTextOutlined />} block>
                      查看审批流程
                    </Button>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>
      </Tabs>

      {/* 科研成果详情模态框 */}
      <Modal
        title={
          modalType === 'create' ? '新增科研成果' :
          modalType === 'edit' ? '编辑科研成果' : '科研成果详情'
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
          <Form.Item label="成果标题">
            <Input
              placeholder="请输入成果标题"
              defaultValue={selectedRecord?.title}
              disabled={modalType === 'view'}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="成果类型">
                <Select
                  placeholder="请选择成果类型"
                  defaultValue={selectedRecord?.type}
                  disabled={modalType === 'view'}
                >
                  <Option value="paper">论文</Option>
                  <Option value="patent">专利</Option>
                  <Option value="standard">标准</Option>
                  <Option value="report">报告</Option>
                  <Option value="award">奖项</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="分类">
                <Input
                  placeholder="请输入分类"
                  defaultValue={selectedRecord?.category}
                  disabled={modalType === 'view'}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="主要作者">
                <Input
                  placeholder="请输入主要作者"
                  defaultValue={selectedRecord?.author}
                  disabled={modalType === 'view'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="完成日期">
                <DatePicker
                  style={{ width: '100%' }}
                  disabled={modalType === 'view'}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="合作作者">
            <Select
              mode="tags"
              placeholder="请输入合作作者"
              defaultValue={selectedRecord?.coAuthors}
              disabled={modalType === 'view'}
            />
          </Form.Item>

          <Form.Item label="关键词">
            <Select
              mode="tags"
              placeholder="请输入关键词"
              defaultValue={selectedRecord?.keywords}
              disabled={modalType === 'view'}
            />
          </Form.Item>

          <Form.Item label="摘要">
            <TextArea
              rows={4}
              placeholder="请输入摘要"
              defaultValue={selectedRecord?.abstract}
              disabled={modalType === 'view'}
            />
          </Form.Item>

          {modalType !== 'view' && (
            <Form.Item label="附件">
              <Upload>
                <Button icon={<UploadOutlined />}>上传附件</Button>
              </Upload>
            </Form.Item>
          )}

          {selectedRecord && modalType === 'view' && (
            <>
              <Divider>详细信息</Divider>
              <Row gutter={16}>
                <Col span={12}>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontWeight: 'bold' }}>影响因子: </span>
                    <span>{selectedRecord.impactFactor || '-'}</span>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontWeight: 'bold' }}>引用次数: </span>
                    <span>{selectedRecord.citations || '-'}</span>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontWeight: 'bold' }}>归档位置: </span>
                    <span>{selectedRecord.archiveLocation || '未归档'}</span>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontWeight: 'bold' }}>归档日期: </span>
                    <span>{selectedRecord.archiveDate || '未归档'}</span>
                  </div>
                </Col>
              </Row>

              {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
                <>
                  <div style={{ fontWeight: 'bold', marginBottom: 8 }}>附件列表:</div>
                  {selectedRecord.attachments.map((file: string, index: number) => (
                    <div key={index} style={{ marginBottom: 4 }}>
                      <FileTextOutlined style={{ marginRight: 8 }} />
                      <a>{file}</a>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </Form>
      </Modal>

      {/* 归档模态框 */}
      <Modal
        title="科研成果归档"
        open={archiveModalVisible}
        onCancel={() => setArchiveModalVisible(false)}
        width={600}
        footer={[
          <Button key="cancel" onClick={() => setArchiveModalVisible(false)}>
            取消
          </Button>,
          <Button key="archive" type="primary">
            确认归档
          </Button>
        ]}
      >
        {selectedRecord && (
          <Form layout="vertical">
            <Alert
              message={`归档成果: ${selectedRecord.title}`}
              description={`作者: ${selectedRecord.author} | 类型: ${selectedRecord.type}`}
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />

            <Form.Item label="归档位置">
              <Input placeholder="请输入归档位置" />
            </Form.Item>

            <Form.Item label="归档日期">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="保存期限">
              <Select placeholder="请选择保存期限">
                <Option value="5">5年</Option>
                <Option value="10">10年</Option>
                <Option value="15">15年</Option>
                <Option value="20">20年</Option>
                <Option value="permanent">永久</Option>
              </Select>
            </Form.Item>

            <Form.Item label="访问权限">
              <Select placeholder="请选择访问权限">
                <Option value="public">公开</Option>
                <Option value="internal">内部</Option>
                <Option value="confidential">机密</Option>
                <Option value="secret">秘密</Option>
              </Select>
            </Form.Item>

            <Form.Item label="归档说明">
              <TextArea rows={3} placeholder="请输入归档说明" />
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* 固定资产详情模态框 */}
      <Modal
        title="固定资产详情"
        open={assetModalVisible}
        onCancel={() => setAssetModalVisible(false)}
        width={900}
        footer={[
          <Button key="close" onClick={() => setAssetModalVisible(false)}>
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
                <Form.Item label="资产名称">
                  <Input value={selectedRecord.name} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="资产类别">
                  <Input value={selectedRecord.category} disabled />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="型号">
                  <Input value={selectedRecord.model} disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="序列号">
                  <Input value={selectedRecord.serialNumber} disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="供应商">
                  <Input value={selectedRecord.supplier} disabled />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="购买日期">
                  <Input value={selectedRecord.purchaseDate} disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="购买价格">
                  <Input value={`¥${selectedRecord.purchasePrice?.toLocaleString()}`} disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="当前价值">
                  <Input value={`¥${selectedRecord.currentValue?.toLocaleString()}`} disabled />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="存放位置">
                  <Input value={selectedRecord.location} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="责任人">
                  <Input value={selectedRecord.responsible} disabled />
                </Form.Item>
              </Col>
            </Row>

            {selectedRecord.warrantyExpiry && (
              <Form.Item label="保修到期日">
                <Input value={selectedRecord.warrantyExpiry} disabled />
              </Form.Item>
            )}

            <Form.Item label="备注">
              <TextArea value={selectedRecord.notes || '无'} disabled rows={2} />
            </Form.Item>

            {selectedRecord.maintenanceRecords && selectedRecord.maintenanceRecords.length > 0 && (
              <>
                <Divider>维护记录</Divider>
                <Table
                  size="small"
                  columns={[
                    { title: '维护日期', dataIndex: 'date', key: 'date' },
                    { title: '维护类型', dataIndex: 'type', key: 'type', render: (type: string) => {
                      const typeConfigs = {
                        routine: { color: 'blue', text: '例行保养' },
                        repair: { color: 'orange', text: '维修' },
                        upgrade: { color: 'green', text: '升级' },
                        inspection: { color: 'purple', text: '检查' }
                      }
                      const config = typeConfigs[type as keyof typeof typeConfigs]
                      return <Tag color={config.color}>{config.text}</Tag>
                    }},
                    { title: '维护内容', dataIndex: 'description', key: 'description' },
                    { title: '费用', dataIndex: 'cost', key: 'cost', render: (cost: number) => `¥${cost.toLocaleString()}` },
                    { title: '操作人', dataIndex: 'operator', key: 'operator' },
                    { title: '下次维护', dataIndex: 'nextMaintenanceDate', key: 'nextMaintenanceDate' }
                  ]}
                  dataSource={selectedRecord.maintenanceRecords}
                  pagination={false}
                />
              </>
            )}
          </Form>
        )}
      </Modal>
    </div>
  )
}

export default ComprehensiveManagement
