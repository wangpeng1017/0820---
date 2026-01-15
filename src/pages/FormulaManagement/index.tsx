import React, { useState } from 'react'
import { Card, Table, Button, Input, Select, Space, Tag, Modal, Form, Tabs, Row, Col, Divider, Statistic, Progress, Descriptions, Alert, Timeline, Upload, message } from 'antd'
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
  FileTextOutlined,
  RobotOutlined,
  InboxOutlined,
  LoadingOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { Typography } from 'antd'

const { Text } = Typography
const { Search } = Input
const { Option } = Select
const { TabPane } = Tabs

// Mock Data
const mockFormulasData = [
  {
    id: 'F001',
    name: '云南香型配方V3.2',
    version: 'V3.2',
    category: 'tobacco',
    status: 'approved',
    creator: '张配方',
    createTime: '2024-03-20 10:00:00',
    updateTime: '2024-03-25 15:30:00',
    description: '以云南烟叶为主体的香型配方，口感醇和',
    ingredients: [
      { id: '1', name: '云南烟叶', type: '主料', ratio: 50, unit: '%', supplier: '云南中烟', grade: 'A级' },
      { id: '2', name: '贵州烟叶', type: '辅料', ratio: 30, unit: '%', supplier: '贵州中烟', grade: 'A级' },
      { id: '3', name: '河南烟叶', type: '调节料', ratio: 20, unit: '%', supplier: '河南中烟', grade: 'B级' }
    ],
    cost: 35.5,
    properties: {
      tar: 8.5,
      nicotine: 0.8,
      co: 9.2,
      moisture: 12.5
    }
  },
  {
    id: 'F002',
    name: '清香型实验配方V1.0',
    version: 'V1.0',
    category: 'tobacco',
    status: 'testing',
    creator: '李研发',
    createTime: '2024-03-22 09:30:00',
    updateTime: '2024-03-22 09:30:00',
    description: '探索清香型风格的实验性配方',
    ingredients: [
      { id: '1', name: '福建烟叶', type: '主料', ratio: 60, unit: '%', supplier: '福建中烟', grade: 'A级' },
      { id: '2', name: '云南烟叶', type: '辅料', ratio: 40, unit: '%', supplier: '云南中烟', grade: 'B级' }
    ],
    cost: 32.0,
    properties: {
      tar: 8.0,
      nicotine: 0.7,
      co: 8.5,
      moisture: 13.0
    }
  },
  {
    id: 'F003',
    name: '高档礼盒配方V2.1',
    version: 'V2.1',
    category: 'tobacco',
    status: 'draft',
    creator: '王专家',
    createTime: '2024-03-24 11:00:00',
    updateTime: '2024-03-26 16:20:00',
    description: '专为高档礼盒产品设计的配方',
    ingredients: [
      { id: '1', name: '津巴布韦烟叶', type: '主料', ratio: 40, unit: '%', supplier: '进口', grade: 'Top' },
      { id: '2', name: '巴西烟叶', type: '辅料', ratio: 30, unit: '%', supplier: '进口', grade: 'Top' },
      { id: '3', name: '云南烟叶', type: '调节料', ratio: 30, unit: '%', supplier: '云南中烟', grade: 'A级' }
    ],
    cost: 58.8,
    properties: {
      tar: 8.2,
      nicotine: 0.75,
      co: 8.8,
      moisture: 12.8
    }
  }
]

const FormulaManagement: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [compareModalVisible, setCompareModalVisible] = useState(false)
  const [smartInputModalVisible, setSmartInputModalVisible] = useState(false)
  const [formulaList, setFormulaList] = useState(mockFormulasData)
  const [form] = Form.useForm()

  const columns = [
    {
      title: '配方编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '配方名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      render: (text: string) => <Tag color="blue">{text}</Tag>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default'
        let text = status
        if (status === 'approved') { color = 'success'; text = '已批准' }
        if (status === 'testing') { color = 'processing'; text = '测试中' }
        if (status === 'draft') { color = 'warning'; text = '草稿' }
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => setModalVisible(true)}>查看</Button>
          <Button type="link" icon={<EditOutlined />} size="small">编辑</Button>
          <Button type="link" danger icon={<DeleteOutlined />} size="small">删除</Button>
        </Space>
      )
    }
  ]

  return (
    <div style={{ padding: '24px' }}>
      <div className="page-header">
        <h1 className="page-title">叶组配方管理</h1>
        <p className="page-description">管理叶组配方的创建、编辑、版本控制和历史追溯</p>
      </div>

      <Tabs defaultActiveKey="management">
        <TabPane tab="配方管理" key="management" icon={<FileTextOutlined />}>
          <Card>
            <Space style={{ marginBottom: 16 }}>
              <Search placeholder="搜索配方名称或编号" style={{ width: 300 }} allowClear />
              <Select placeholder="状态" style={{ width: 120 }} allowClear>
                <Option value="draft">草稿</Option>
                <Option value="testing">测试中</Option>
                <Option value="approved">已批准</Option>
              </Select>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>新建配方</Button>
              <Button icon={<SwapOutlined />} onClick={() => setCompareModalVisible(true)}>版本比对</Button>
              <Button icon={<RobotOutlined />} onClick={() => setSmartInputModalVisible(true)}>智能录入</Button>
            </Space>
            <Table columns={columns} dataSource={formulaList} rowKey="id" />
          </Card>
        </TabPane>
        <TabPane tab="智能设计" key="ai-design" icon={<BulbOutlined />}>
          <Card title="配方智能设计" extra={<Tag color="blue">AI驱动</Tag>}>
            <Alert message="AI配方设计助手" description="基于遗传算法和大语言模型，120秒内生成配方候选方案" type="info" showIcon style={{ marginBottom: 16 }} />
            <Button type="primary" icon={<ThunderboltOutlined />}>开始智能设计</Button>
          </Card>
        </TabPane>
        <TabPane tab="配方验证" key="validation" icon={<ExperimentOutlined />}>
          <Card title="验证结果" size="small">
            <Alert message="验证通过" description="配方设计基本符合预期目标" type="success" showIcon />
          </Card>
        </TabPane>
      </Tabs>

      <Modal title="配方详情" open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width={800}>
        <Descriptions title="基本信息" bordered>
          <Descriptions.Item label="配方名称">云南香型配方V3.2</Descriptions.Item>
          <Descriptions.Item label="版本">V3.2</Descriptions.Item>
          <Descriptions.Item label="状态">已批准</Descriptions.Item>
          <Descriptions.Item label="创建时间">2024-03-20</Descriptions.Item>
          <Descriptions.Item label="描述" span={2}>以云南烟叶为主体的香型配方</Descriptions.Item>
        </Descriptions>
      </Modal>

      <Modal title="配方版本比对" open={compareModalVisible} onCancel={() => setCompareModalVisible(false)} width={1000} footer={null}>
        <p>选择两个配方进行比对...</p>
      </Modal>

      <Modal title="智能录入" open={smartInputModalVisible} onCancel={() => setSmartInputModalVisible(false)} footer={null}>
        <p>支持文字录入和图片识别...</p>
      </Modal>
    </div>
  )
}

export default FormulaManagement
