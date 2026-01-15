import React, { useState } from 'react'
import { Card, Table, Button, Input, Select, Space, Tag, Modal, Form, Tabs, Row, Col, Divider, Statistic, Progress, Descriptions, Alert, List, Avatar, Empty } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  BulbOutlined,
  ExperimentOutlined,
  SearchOutlined,
  ThunderboltOutlined,
  FileTextOutlined,
  RobotOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  FilterOutlined,
  SaveOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Search } = Input
const { Option } = Select

// Mock Data
const flavorList = [
  { id: 'FL001', name: '云南烟草香精', code: 'YNE-2024-001', type: 'extract', status: 'approved', creator: '赵博', updateTime: '2024-03-21', description: '高纯度烟草提取物' },
  { id: 'FL002', name: '清凉薄荷脑', code: 'MEN-2024-005', type: 'synthetic', status: 'testing', creator: '钱工', updateTime: '2024-03-20', description: '食品级合成薄荷脑' },
  { id: 'FL003', name: '甜橙油', code: 'ORA-2024-012', type: 'natural', status: 'draft', creator: '孙工', updateTime: '2024-03-22', description: '天然冷压甜橙油' }
]

const FlavorManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState('list')
  const [modalVisible, setModalVisible] = useState(false)
  const [currentFlavor, setCurrentFlavor] = useState<any>(null)

  const columns = [
    { title: '香料编码', dataIndex: 'code', key: 'code' },
    { title: '香料名称', dataIndex: 'name', key: 'name' },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const types: Record<string, string> = { extract: '提取物', synthetic: '合成香料', natural: '天然香精' }
        return <Tag>{types[type] || type}</Tag>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = { approved: 'success', testing: 'processing', draft: 'default' }
        const texts: Record<string, string> = { approved: '已入库', testing: '检测中', draft: '研发中' }
        return <Tag color={colors[status]}>{texts[status]}</Tag>
      }
    },
    { title: '负责人', dataIndex: 'creator', key: 'creator' },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => { setCurrentFlavor(record); setModalVisible(true) }}>详情</Button>
          <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      )
    }
  ]

  return (
    <div style={{ padding: '24px' }}>
      <div className="page-header">
        <h1 className="page-title">香精香料管理</h1>
        <p className="page-description">香精香料的研发、筛选、评价与数字化管理</p>
      </div>

      <Tabs defaultActiveKey="products">
        <TabPane tab="香料产品库" key="products" icon={<AppstoreOutlined />}>
          <Card>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
              <Space>
                <Search placeholder="搜索香料名称/编码" style={{ width: 300 }} allowClear />
                <Select placeholder="香料类型" style={{ width: 120 }} allowClear>
                  <Option value="extract">提取物</Option>
                  <Option value="natural">天然香精</Option>
                  <Option value="synthetic">合成香料</Option>
                </Select>
                <Button type="primary" icon={<FilterOutlined />}>筛选</Button>
              </Space>
              <Space>
                <Button icon={<PlusOutlined />} type="primary" onClick={() => setModalVisible(true)}>新增香料</Button>
                <Button icon={<ExperimentOutlined />}>配方应用</Button>
              </Space>
            </div>

            <Alert message="本月新增香料品种 5 个，待检测 2 个" type="info" showIcon style={{ marginBottom: 16 }} closable />

            <Table columns={columns} dataSource={flavorList} rowKey="id" />
          </Card>
        </TabPane>

        <TabPane tab="智能风味设计" key="ai-flavor" icon={<BulbOutlined />}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="风味目标设定" size="small">
                <Form layout="vertical">
                  <Form.Item label="目标风格"><Select defaultValue="sweet"><Option value="sweet">甜润</Option><Option value="fresh">清爽</Option></Select></Form.Item>
                  <Form.Item label="香气强度"><Divider /><Progress percent={70} /></Form.Item>
                  <Form.Item label="持续性"><Divider /><Progress percent={85} /></Form.Item>
                  <Button type="primary" block icon={<RobotOutlined />}>生成配方建议</Button>
                </Form>
              </Card>
            </Col>
            <Col span={16}>
              <Card title="AI 推荐配方" size="small">
                <List
                  grid={{ gutter: 16, column: 2 }}
                  dataSource={[
                    { title: '方案 A', desc: '突出果香，甜度适中', score: 92 },
                    { title: '方案 B', desc: '清新薄荷，凉感强', score: 88 }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <Card title={item.title} extra={<Tag color="green">{item.score}分</Tag>}>
                        {item.desc}
                        <div style={{ marginTop: 8 }}><Button size="small">采用此方案</Button></div>
                      </Card>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      <Modal title="香料详情" open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        {currentFlavor && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="名称">{currentFlavor.name}</Descriptions.Item>
            <Descriptions.Item label="编码">{currentFlavor.code}</Descriptions.Item>
            <Descriptions.Item label="类型">{currentFlavor.type === 'extract' ? '提取物' : '其他'}</Descriptions.Item>
            <Descriptions.Item label="描述">{currentFlavor.description}</Descriptions.Item>
            <Descriptions.Item label="状态">{currentFlavor.status}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}

export default FlavorManagement
