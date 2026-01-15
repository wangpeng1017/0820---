import React, { useState } from 'react'
import { Card, Table, Button, Input, Select, Space, Tag, Modal, Tabs, Row, Col, Statistic, Progress, Descriptions, Alert } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  FileTextOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Search } = Input

// Mock Data
const testList = [
  { id: 'QT001', sampleName: '成品烟支-A批次', type: 'finished', date: '2024-03-20', tester: '王质检', result: 'passed', description: '各项指标符合标准' },
  { id: 'QT002', sampleName: '进口烟叶-B批次', type: 'material', date: '2024-03-19', tester: '李质检', result: 'warning', description: '水分含量偏高' },
  { id: 'QT003', sampleName: '香精样品-C', type: 'flavor', date: '2024-03-18', tester: '张质检', result: 'failed', description: '重金属超标' }
]

const QualityManagement: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [currentTest, setCurrentTest] = useState<any>(null)

  const columns = [
    { title: '检测单号', dataIndex: 'id', key: 'id' },
    { title: '样品名称', dataIndex: 'sampleName', key: 'sampleName' },
    { title: '检测类型', dataIndex: 'type', key: 'type' },
    { title: '检测日期', dataIndex: 'date', key: 'date' },
    { title: '检测员', dataIndex: 'tester', key: 'tester' },
    {
      title: '结论',
      dataIndex: 'result',
      key: 'result',
      render: (result: string) => {
        return result === 'passed' ? <Tag color="success">合格</Tag> : <Tag color="error">不合格</Tag>
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => { setCurrentTest(record); setModalVisible(true) }}>报告</Button>
          <Button type="link" size="small" icon={<EditOutlined />}>录入</Button>
        </Space>
      )
    }
  ]

  return (
    <div style={{ padding: '24px' }}>
      <div className="page-header">
        <h1 className="page-title">质量管理中心</h1>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Row gutter={16}>
          <Col span={6}><Card><Statistic title="今日检测批次" value={24} prefix={<FileTextOutlined />} /></Card></Col>
          <Col span={6}><Card><Statistic title="一次合格率" value={99.2} suffix="%" prefix={<CheckCircleOutlined />} /></Card></Col>
        </Row>
      </div>

      <Card title="质量检测列表">
        <Space style={{ marginBottom: 16 }}>
          <Search placeholder="单号/样品名称" style={{ width: 200 }} allowClear />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>新建检测</Button>
        </Space>
        <Table columns={columns} dataSource={testList} rowKey="id" />
      </Card>

      <Modal title="检测报告详情" open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        {currentTest && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="单号">{currentTest.id}</Descriptions.Item>
            <Descriptions.Item label="样品">{currentTest.sampleName}</Descriptions.Item>
            <Descriptions.Item label="结论">{currentTest.result}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}

export default QualityManagement
