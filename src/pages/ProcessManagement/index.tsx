import React, { useState } from 'react'
import { Card, Table, Button, Input, Select, Space, Tag, Modal, Form, Tabs, Row, Col, Divider, Statistic, Progress, Descriptions, Alert, Steps, Timeline, Switch } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ToolOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  DashboardOutlined,
  PrinterOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Search } = Input
const { Option } = Select
const { Step } = Steps

// Mock Data
const standardsList = [
  { id: 'PS001', name: '切丝工艺标准V2.0', code: 'GY-QS-202401', type: 'cut', status: 'active', creator: '李工艺', updateTime: '2024-03-15' },
  { id: 'PS002', name: '烘丝工艺标准V1.5', code: 'GY-HS-202402', type: 'dry', status: 'draft', creator: '张技术', updateTime: '2024-03-18' },
  { id: 'PS003', name: '加香工艺标准V3.0', code: 'GY-JX-202403', type: 'flavor', status: 'archived', creator: '王专家', updateTime: '2024-02-20' }
]

const ProcessManagement: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [currentStandard, setCurrentStandard] = useState<any>(null)

  const columns = [
    { title: '标准编码', dataIndex: 'code', key: 'code' },
    { title: '标准名称', dataIndex: 'name', key: 'name' },
    {
      title: '工序类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const types: Record<string, string> = { cut: '切丝', dry: '烘丝', flavor: '加香' }
        return <Tag color="blue">{types[type] || type}</Tag>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = { active: 'success', draft: 'warning', archived: 'default' }
        const texts: Record<string, string> = { active: '执行中', draft: '编制中', archived: '已作废' }
        return <Tag color={colors[status]}>{texts[status]}</Tag>
      }
    },
    { title: '制定人', dataIndex: 'creator', key: 'creator' },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => { setCurrentStandard(record); setModalVisible(true) }}>查看</Button>
          <Button type="link" size="small" icon={<EditOutlined />}>修订</Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      )
    }
  ]

  return (
    <div style={{ padding: '24px' }}>
      <div className="page-header">
        <h1 className="page-title">加工工艺管理</h1>
        <p className="page-description">工艺标准的制定、下发、监控与持续改进</p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Row gutter={16}>
          <Col span={6}><Card><Statistic title="执行标准数" value={156} prefix={<FileTextOutlined />} /></Card></Col>
          <Col span={6}><Card><Statistic title="工艺合规率" value={99.8} suffix="%" prefix={<CheckCircleOutlined />} valueStyle={{ color: '#52c41a' }} /></Card></Col>
          <Col span={6}><Card><Statistic title="异常预警" value={3} prefix={<WarningOutlined />} valueStyle={{ color: '#faad14' }} /></Card></Col>
          <Col span={6}><Card><Statistic title="设备运行率" value={98.5} suffix="%" prefix={<SettingOutlined />} /></Card></Col>
        </Row>
      </div>

      <Tabs defaultActiveKey="standards">
        <TabPane tab="工艺标准管理" key="standards" icon={<FileTextOutlined />}>
          <Card>
            <Space style={{ marginBottom: 16 }}>
              <Search placeholder="搜索标准名称/编码" style={{ width: 300 }} allowClear />
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>新建标准</Button>
              <Button icon={<PrinterOutlined />}>导出标准</Button>
            </Space>
            <Table columns={columns} dataSource={standardsList} rowKey="id" />
          </Card>
        </TabPane>

        <TabPane tab="工艺参数监控" key="monitoring" icon={<DashboardOutlined />}>
          <Card title="实时工艺参数">
            <Steps current={1} size="small" style={{ marginBottom: 24 }}>
              <Step title="润叶" description="运行中" icon={<CheckCircleOutlined />} />
              <Step title="切丝" description="参数异常" status="error" icon={<WarningOutlined />} />
              <Step title="烘丝" description="待开始" />
              <Step title="加香" description="待开始" />
            </Steps>
            <Alert message="切丝工序水分含量 (12.8%) 接近下限" type="error" showIcon />
          </Card>
        </TabPane>
      </Tabs>

      <Modal title="工艺标准详情" open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        {currentStandard && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="标准名称">{currentStandard.name}</Descriptions.Item>
            <Descriptions.Item label="标准编码">{currentStandard.code}</Descriptions.Item>
            <Descriptions.Item label="工序类型">{currentStandard.type}</Descriptions.Item>
            <Descriptions.Item label="状态">{currentStandard.status}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}

export default ProcessManagement
