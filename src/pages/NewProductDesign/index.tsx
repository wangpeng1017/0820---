import React, { useState } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Modal, Form, Input, Select, Progress, Alert, Slider, Divider, Steps, Timeline, InputNumber } from 'antd'
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

// Mock Data
const formulaList = [
  { id: 'NP001', name: '清凉薄荷电子烟液', type: 'e_cigarette', version: 'V1.2', status: 'testing', creator: '张工', updateTime: '2024-03-20', score: 8.5 },
  { id: 'NP002', name: '原味加热不燃烧烟弹', type: 'HNB', version: 'V2.0', status: 'approved', creator: '李工', updateTime: '2024-03-18', score: 9.0 },
  { id: 'NP003', name: '柠檬冰爆珠', type: 'capsule', version: 'V1.0', status: 'draft', creator: '王工', updateTime: '2024-03-22', score: 7.8 }
]

const NewProductDesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState('formula')
  const [modalVisible, setModalVisible] = useState(false)
  const [currentFormula, setCurrentFormula] = useState<any>(null)

  const columns = [
    { title: '配方编号', dataIndex: 'id', key: 'id' },
    { title: '配方名称', dataIndex: 'name', key: 'name' },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const types: Record<string, string> = { e_cigarette: '电子烟', HNB: '加热不燃烧', capsule: '爆珠' }
        return <Tag color="blue">{types[type] || type}</Tag>
      }
    },
    { title: '版本', dataIndex: 'version', key: 'version' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = { approved: 'success', testing: 'processing', draft: 'default' }
        const texts: Record<string, string> = { approved: '已批准', testing: '测试中', draft: '草稿' }
        return <Tag color={colors[status]}>{texts[status]}</Tag>
      }
    },
    { title: '创建人', dataIndex: 'creator', key: 'creator' },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
    {
      title: '评分',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => <span style={{ color: '#faad14' }}>{score} <StarOutlined /></span>
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => { setCurrentFormula(record); setModalVisible(true) }}>查看</Button>
          <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      )
    }
  ]

  return (
    <div style={{ padding: '24px' }}>
      <div className="page-header">
        <h1 className="page-title">新型烟草数字化设计</h1>
        <p className="page-description">电子烟、加热不燃烧等新型烟草产品的配方设计与仿真</p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic title="活跃项目" value={12} prefix={<RocketOutlined />} valueStyle={{ color: '#1890ff' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="本月新品" value={5} prefix={<FireOutlined />} valueStyle={{ color: '#cf1322' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="研发效率提升" value={35} suffix="%" prefix={<LineChartOutlined />} valueStyle={{ color: '#3f8600' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="仿真准确度" value={92.5} suffix="%" prefix={<CheckCircleOutlined />} valueStyle={{ color: '#722ed1' }} />
            </Card>
          </Col>
        </Row>
      </div>

      <Tabs defaultActiveKey="formula" onChange={setActiveTab}>
        <TabPane tab="配方设计" key="formula" icon={<ExperimentOutlined />}>
          <Card>
            <Space style={{ marginBottom: 16 }}>
              <Input.Search placeholder="搜索配方" style={{ width: 300 }} allowClear />
              <Button type="primary" icon={<PlusOutlined />}>新建配方</Button>
              <Button icon={<CloudOutlined />}>云端模型库</Button>
            </Space>
            <Table columns={columns} dataSource={formulaList} rowKey="id" />
          </Card>
        </TabPane>
        <TabPane tab="配方优化" key="optimization" icon={<BulbOutlined />}>
          <Row gutter={16}>
            <Col span={12}>
              <Card title="参数优化配置" size="small">
                <Form layout="vertical">
                  <Form.Item label="PG/VG比"><Slider range defaultValue={[30, 70]} /></Form.Item>
                  <Form.Item label="尼古丁含量"><Slider defaultValue={3} max={20} /></Form.Item>
                  <Form.Item label="雾化温度"><Slider defaultValue={220} max={300} /></Form.Item>
                  <Button type="primary" block>开始模拟优化</Button>
                </Form>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="优化结果预测" size="small">
                <Progress percent={85} status="active" />
                <p style={{ marginTop: 16 }}>预计口感评分提升: 12%</p>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="感官评价" key="evaluation" icon={<HeartOutlined />}>
          <Card>
            <Alert message="暂无评价任务" type="info" showIcon />
          </Card>
        </TabPane>
      </Tabs>

      <Modal title="配方详情" open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        {currentFormula && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="配方名称">{currentFormula.name}</Descriptions.Item>
            <Descriptions.Item label="类型">{currentFormula.type}</Descriptions.Item>
            <Descriptions.Item label="版本">{currentFormula.version}</Descriptions.Item>
            <Descriptions.Item label="状态">{currentFormula.status}</Descriptions.Item>
            <Descriptions.Item label="评分">{currentFormula.score}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}

export default NewProductDesign
