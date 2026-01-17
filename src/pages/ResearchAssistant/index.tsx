import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic } from 'antd'
import {
  AlertOutlined,
  BellOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  EditOutlined,
  EyeOutlined,
  FolderOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  RobotOutlined,
  SafetyOutlined,
  SoundOutlined,
  ThunderboltOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'knowledge': 'knowledge',
  'ai-decision': 'ai-decision',
  'ai-quality': 'ai-quality',
  'ai-workspace': 'ai-workspace',
  'ai-warning': 'ai-warning',
  'database': 'database',
  'engine': 'engine',
  'meeting': 'meeting',
  'qa': 'qa',
  'subscribe': 'subscribe',
  'ip': 'ip',
  'custom-kb': 'custom-kb',
}

const PATH_TAB_MAP: Record<string, string> = {
  'knowledge': 'knowledge',
  'ai-decision': 'ai-decision',
  'ai-quality': 'ai-quality',
  'ai-workspace': 'ai-workspace',
  'ai-warning': 'ai-warning',
  'database': 'database',
  'engine': 'engine',
  'meeting': 'meeting',
  'qa': 'qa',
  'subscribe': 'subscribe',
  'ip': 'ip',
  'custom-kb': 'custom-kb',
}

const ResearchAssistant: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // 从 URL 获取当前子路径
  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'knowledge'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())

  // URL 变化时更新 Tab
  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  // Tab 切换时更新 URL
  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/research-assistant/${path}`)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">研发大模型助手</h1>
        <p className="page-description">
          AI辅助研发决策、质量优化、人机协同工作台
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        
        <TabPane tab="领域知识库" key="knowledge" icon={<DatabaseOutlined />}>
          <Card title="领域知识库">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic title="总数" value={Math.floor(Math.random() * 1000) + 100} />
              </Col>
              <Col span={6}>
                <Statistic title="本月新增" value={Math.floor(Math.random() * 50) + 10} valueStyle={{ color: '#3f8600' }} />
              </Col>
              <Col span={6}>
                <Statistic title="待处理" value={Math.floor(Math.random() * 20) + 5} valueStyle={{ color: '#cf1322' }} />
              </Col>
              <Col span={6}>
                <Statistic title="完成率" value={Math.floor(Math.random() * 30) + 70} suffix="%" />
              </Col>
            </Row>
            <Table
              style={{ marginTop: 16 }}
              columns={[
                { title: '编号', dataIndex: 'id', key: 'id', width: 100 },
                { title: '名称', dataIndex: 'name', key: 'name' },
                { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === '正常' ? 'green' : 'orange'}>{s}</Tag> },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                {
                  title: '操作', key: 'action',
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={[
                { key: '1', id: 'T001', name: '测试数据1', status: '正常', createTime: '2024-03-15' },
                { key: '2', id: 'T002', name: '测试数据2', status: '正常', createTime: '2024-03-16' },
                { key: '3', id: 'T003', name: '测试数据3', status: '待处理', createTime: '2024-03-17' },
                { key: '4', id: 'T004', name: '测试数据4', status: '正常', createTime: '2024-03-18' },
                { key: '5', id: 'T005', name: '测试数据5', status: '正常', createTime: '2024-03-19' }
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="AI产品开发决策" key="ai-decision" icon={<RobotOutlined />}>
          <Card title="AI产品开发决策">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic title="总数" value={Math.floor(Math.random() * 1000) + 100} />
              </Col>
              <Col span={6}>
                <Statistic title="本月新增" value={Math.floor(Math.random() * 50) + 10} valueStyle={{ color: '#3f8600' }} />
              </Col>
              <Col span={6}>
                <Statistic title="待处理" value={Math.floor(Math.random() * 20) + 5} valueStyle={{ color: '#cf1322' }} />
              </Col>
              <Col span={6}>
                <Statistic title="完成率" value={Math.floor(Math.random() * 30) + 70} suffix="%" />
              </Col>
            </Row>
            <Table
              style={{ marginTop: 16 }}
              columns={[
                { title: '编号', dataIndex: 'id', key: 'id', width: 100 },
                { title: '名称', dataIndex: 'name', key: 'name' },
                { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === '正常' ? 'green' : 'orange'}>{s}</Tag> },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                {
                  title: '操作', key: 'action',
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={[
                { key: '1', id: 'T001', name: '测试数据1', status: '正常', createTime: '2024-03-15' },
                { key: '2', id: 'T002', name: '测试数据2', status: '正常', createTime: '2024-03-16' },
                { key: '3', id: 'T003', name: '测试数据3', status: '待处理', createTime: '2024-03-17' },
                { key: '4', id: 'T004', name: '测试数据4', status: '正常', createTime: '2024-03-18' },
                { key: '5', id: 'T005', name: '测试数据5', status: '正常', createTime: '2024-03-19' }
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="AI质量优化分析" key="ai-quality" icon={<ThunderboltOutlined />}>
          <Card title="AI质量优化分析">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic title="总数" value={Math.floor(Math.random() * 1000) + 100} />
              </Col>
              <Col span={6}>
                <Statistic title="本月新增" value={Math.floor(Math.random() * 50) + 10} valueStyle={{ color: '#3f8600' }} />
              </Col>
              <Col span={6}>
                <Statistic title="待处理" value={Math.floor(Math.random() * 20) + 5} valueStyle={{ color: '#cf1322' }} />
              </Col>
              <Col span={6}>
                <Statistic title="完成率" value={Math.floor(Math.random() * 30) + 70} suffix="%" />
              </Col>
            </Row>
            <Table
              style={{ marginTop: 16 }}
              columns={[
                { title: '编号', dataIndex: 'id', key: 'id', width: 100 },
                { title: '名称', dataIndex: 'name', key: 'name' },
                { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === '正常' ? 'green' : 'orange'}>{s}</Tag> },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                {
                  title: '操作', key: 'action',
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={[
                { key: '1', id: 'T001', name: '测试数据1', status: '正常', createTime: '2024-03-15' },
                { key: '2', id: 'T002', name: '测试数据2', status: '正常', createTime: '2024-03-16' },
                { key: '3', id: 'T003', name: '测试数据3', status: '待处理', createTime: '2024-03-17' },
                { key: '4', id: 'T004', name: '测试数据4', status: '正常', createTime: '2024-03-18' },
                { key: '5', id: 'T005', name: '测试数据5', status: '正常', createTime: '2024-03-19' }
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="AI人机协同工作台" key="ai-workspace" icon={<DesktopOutlined />}>
          <Card title="AI人机协同工作台">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic title="总数" value={Math.floor(Math.random() * 1000) + 100} />
              </Col>
              <Col span={6}>
                <Statistic title="本月新增" value={Math.floor(Math.random() * 50) + 10} valueStyle={{ color: '#3f8600' }} />
              </Col>
              <Col span={6}>
                <Statistic title="待处理" value={Math.floor(Math.random() * 20) + 5} valueStyle={{ color: '#cf1322' }} />
              </Col>
              <Col span={6}>
                <Statistic title="完成率" value={Math.floor(Math.random() * 30) + 70} suffix="%" />
              </Col>
            </Row>
            <Table
              style={{ marginTop: 16 }}
              columns={[
                { title: '编号', dataIndex: 'id', key: 'id', width: 100 },
                { title: '名称', dataIndex: 'name', key: 'name' },
                { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === '正常' ? 'green' : 'orange'}>{s}</Tag> },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                {
                  title: '操作', key: 'action',
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={[
                { key: '1', id: 'T001', name: '测试数据1', status: '正常', createTime: '2024-03-15' },
                { key: '2', id: 'T002', name: '测试数据2', status: '正常', createTime: '2024-03-16' },
                { key: '3', id: 'T003', name: '测试数据3', status: '待处理', createTime: '2024-03-17' },
                { key: '4', id: 'T004', name: '测试数据4', status: '正常', createTime: '2024-03-18' },
                { key: '5', id: 'T005', name: '测试数据5', status: '正常', createTime: '2024-03-19' }
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="AI安全预警" key="ai-warning" icon={<AlertOutlined />}>
          <Card title="AI安全预警">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic title="总数" value={Math.floor(Math.random() * 1000) + 100} />
              </Col>
              <Col span={6}>
                <Statistic title="本月新增" value={Math.floor(Math.random() * 50) + 10} valueStyle={{ color: '#3f8600' }} />
              </Col>
              <Col span={6}>
                <Statistic title="待处理" value={Math.floor(Math.random() * 20) + 5} valueStyle={{ color: '#cf1322' }} />
              </Col>
              <Col span={6}>
                <Statistic title="完成率" value={Math.floor(Math.random() * 30) + 70} suffix="%" />
              </Col>
            </Row>
            <Table
              style={{ marginTop: 16 }}
              columns={[
                { title: '编号', dataIndex: 'id', key: 'id', width: 100 },
                { title: '名称', dataIndex: 'name', key: 'name' },
                { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === '正常' ? 'green' : 'orange'}>{s}</Tag> },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                {
                  title: '操作', key: 'action',
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={[
                { key: '1', id: 'T001', name: '测试数据1', status: '正常', createTime: '2024-03-15' },
                { key: '2', id: 'T002', name: '测试数据2', status: '正常', createTime: '2024-03-16' },
                { key: '3', id: 'T003', name: '测试数据3', status: '待处理', createTime: '2024-03-17' },
                { key: '4', id: 'T004', name: '测试数据4', status: '正常', createTime: '2024-03-18' },
                { key: '5', id: 'T005', name: '测试数据5', status: '正常', createTime: '2024-03-19' }
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="专项数据库管理" key="database" icon={<DatabaseOutlined />}>
          <Card title="专项数据库管理">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic title="总数" value={Math.floor(Math.random() * 1000) + 100} />
              </Col>
              <Col span={6}>
                <Statistic title="本月新增" value={Math.floor(Math.random() * 50) + 10} valueStyle={{ color: '#3f8600' }} />
              </Col>
              <Col span={6}>
                <Statistic title="待处理" value={Math.floor(Math.random() * 20) + 5} valueStyle={{ color: '#cf1322' }} />
              </Col>
              <Col span={6}>
                <Statistic title="完成率" value={Math.floor(Math.random() * 30) + 70} suffix="%" />
              </Col>
            </Row>
            <Table
              style={{ marginTop: 16 }}
              columns={[
                { title: '编号', dataIndex: 'id', key: 'id', width: 100 },
                { title: '名称', dataIndex: 'name', key: 'name' },
                { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === '正常' ? 'green' : 'orange'}>{s}</Tag> },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                {
                  title: '操作', key: 'action',
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={[
                { key: '1', id: 'T001', name: '测试数据1', status: '正常', createTime: '2024-03-15' },
                { key: '2', id: 'T002', name: '测试数据2', status: '正常', createTime: '2024-03-16' },
                { key: '3', id: 'T003', name: '测试数据3', status: '待处理', createTime: '2024-03-17' },
                { key: '4', id: 'T004', name: '测试数据4', status: '正常', createTime: '2024-03-18' },
                { key: '5', id: 'T005', name: '测试数据5', status: '正常', createTime: '2024-03-19' }
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="智能处理引擎" key="engine" icon={<ThunderboltOutlined />}>
          <Card title="智能处理引擎">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic title="总数" value={Math.floor(Math.random() * 1000) + 100} />
              </Col>
              <Col span={6}>
                <Statistic title="本月新增" value={Math.floor(Math.random() * 50) + 10} valueStyle={{ color: '#3f8600' }} />
              </Col>
              <Col span={6}>
                <Statistic title="待处理" value={Math.floor(Math.random() * 20) + 5} valueStyle={{ color: '#cf1322' }} />
              </Col>
              <Col span={6}>
                <Statistic title="完成率" value={Math.floor(Math.random() * 30) + 70} suffix="%" />
              </Col>
            </Row>
            <Table
              style={{ marginTop: 16 }}
              columns={[
                { title: '编号', dataIndex: 'id', key: 'id', width: 100 },
                { title: '名称', dataIndex: 'name', key: 'name' },
                { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === '正常' ? 'green' : 'orange'}>{s}</Tag> },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                {
                  title: '操作', key: 'action',
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={[
                { key: '1', id: 'T001', name: '测试数据1', status: '正常', createTime: '2024-03-15' },
                { key: '2', id: 'T002', name: '测试数据2', status: '正常', createTime: '2024-03-16' },
                { key: '3', id: 'T003', name: '测试数据3', status: '待处理', createTime: '2024-03-17' },
                { key: '4', id: 'T004', name: '测试数据4', status: '正常', createTime: '2024-03-18' },
                { key: '5', id: 'T005', name: '测试数据5', status: '正常', createTime: '2024-03-19' }
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="会议实时转写" key="meeting" icon={<SoundOutlined />}>
          <Card title="会议实时转写">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic title="总数" value={Math.floor(Math.random() * 1000) + 100} />
              </Col>
              <Col span={6}>
                <Statistic title="本月新增" value={Math.floor(Math.random() * 50) + 10} valueStyle={{ color: '#3f8600' }} />
              </Col>
              <Col span={6}>
                <Statistic title="待处理" value={Math.floor(Math.random() * 20) + 5} valueStyle={{ color: '#cf1322' }} />
              </Col>
              <Col span={6}>
                <Statistic title="完成率" value={Math.floor(Math.random() * 30) + 70} suffix="%" />
              </Col>
            </Row>
            <Table
              style={{ marginTop: 16 }}
              columns={[
                { title: '编号', dataIndex: 'id', key: 'id', width: 100 },
                { title: '名称', dataIndex: 'name', key: 'name' },
                { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === '正常' ? 'green' : 'orange'}>{s}</Tag> },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                {
                  title: '操作', key: 'action',
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={[
                { key: '1', id: 'T001', name: '测试数据1', status: '正常', createTime: '2024-03-15' },
                { key: '2', id: 'T002', name: '测试数据2', status: '正常', createTime: '2024-03-16' },
                { key: '3', id: 'T003', name: '测试数据3', status: '待处理', createTime: '2024-03-17' },
                { key: '4', id: 'T004', name: '测试数据4', status: '正常', createTime: '2024-03-18' },
                { key: '5', id: 'T005', name: '测试数据5', status: '正常', createTime: '2024-03-19' }
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="上下文智能问答" key="qa" icon={<QuestionCircleOutlined />}>
          <Card title="上下文智能问答">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic title="总数" value={Math.floor(Math.random() * 1000) + 100} />
              </Col>
              <Col span={6}>
                <Statistic title="本月新增" value={Math.floor(Math.random() * 50) + 10} valueStyle={{ color: '#3f8600' }} />
              </Col>
              <Col span={6}>
                <Statistic title="待处理" value={Math.floor(Math.random() * 20) + 5} valueStyle={{ color: '#cf1322' }} />
              </Col>
              <Col span={6}>
                <Statistic title="完成率" value={Math.floor(Math.random() * 30) + 70} suffix="%" />
              </Col>
            </Row>
            <Table
              style={{ marginTop: 16 }}
              columns={[
                { title: '编号', dataIndex: 'id', key: 'id', width: 100 },
                { title: '名称', dataIndex: 'name', key: 'name' },
                { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === '正常' ? 'green' : 'orange'}>{s}</Tag> },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                {
                  title: '操作', key: 'action',
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={[
                { key: '1', id: 'T001', name: '测试数据1', status: '正常', createTime: '2024-03-15' },
                { key: '2', id: 'T002', name: '测试数据2', status: '正常', createTime: '2024-03-16' },
                { key: '3', id: 'T003', name: '测试数据3', status: '待处理', createTime: '2024-03-17' },
                { key: '4', id: 'T004', name: '测试数据4', status: '正常', createTime: '2024-03-18' },
                { key: '5', id: 'T005', name: '测试数据5', status: '正常', createTime: '2024-03-19' }
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="科研信息订阅" key="subscribe" icon={<BellOutlined />}>
          <Card title="科研信息订阅">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic title="总数" value={Math.floor(Math.random() * 1000) + 100} />
              </Col>
              <Col span={6}>
                <Statistic title="本月新增" value={Math.floor(Math.random() * 50) + 10} valueStyle={{ color: '#3f8600' }} />
              </Col>
              <Col span={6}>
                <Statistic title="待处理" value={Math.floor(Math.random() * 20) + 5} valueStyle={{ color: '#cf1322' }} />
              </Col>
              <Col span={6}>
                <Statistic title="完成率" value={Math.floor(Math.random() * 30) + 70} suffix="%" />
              </Col>
            </Row>
            <Table
              style={{ marginTop: 16 }}
              columns={[
                { title: '编号', dataIndex: 'id', key: 'id', width: 100 },
                { title: '名称', dataIndex: 'name', key: 'name' },
                { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === '正常' ? 'green' : 'orange'}>{s}</Tag> },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                {
                  title: '操作', key: 'action',
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={[
                { key: '1', id: 'T001', name: '测试数据1', status: '正常', createTime: '2024-03-15' },
                { key: '2', id: 'T002', name: '测试数据2', status: '正常', createTime: '2024-03-16' },
                { key: '3', id: 'T003', name: '测试数据3', status: '待处理', createTime: '2024-03-17' },
                { key: '4', id: 'T004', name: '测试数据4', status: '正常', createTime: '2024-03-18' },
                { key: '5', id: 'T005', name: '测试数据5', status: '正常', createTime: '2024-03-19' }
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="知识产权风险检索" key="ip" icon={<SafetyOutlined />}>
          <Card title="知识产权风险检索">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic title="总数" value={Math.floor(Math.random() * 1000) + 100} />
              </Col>
              <Col span={6}>
                <Statistic title="本月新增" value={Math.floor(Math.random() * 50) + 10} valueStyle={{ color: '#3f8600' }} />
              </Col>
              <Col span={6}>
                <Statistic title="待处理" value={Math.floor(Math.random() * 20) + 5} valueStyle={{ color: '#cf1322' }} />
              </Col>
              <Col span={6}>
                <Statistic title="完成率" value={Math.floor(Math.random() * 30) + 70} suffix="%" />
              </Col>
            </Row>
            <Table
              style={{ marginTop: 16 }}
              columns={[
                { title: '编号', dataIndex: 'id', key: 'id', width: 100 },
                { title: '名称', dataIndex: 'name', key: 'name' },
                { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === '正常' ? 'green' : 'orange'}>{s}</Tag> },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                {
                  title: '操作', key: 'action',
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={[
                { key: '1', id: 'T001', name: '测试数据1', status: '正常', createTime: '2024-03-15' },
                { key: '2', id: 'T002', name: '测试数据2', status: '正常', createTime: '2024-03-16' },
                { key: '3', id: 'T003', name: '测试数据3', status: '待处理', createTime: '2024-03-17' },
                { key: '4', id: 'T004', name: '测试数据4', status: '正常', createTime: '2024-03-18' },
                { key: '5', id: 'T005', name: '测试数据5', status: '正常', createTime: '2024-03-19' }
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="自定义知识库" key="custom-kb" icon={<FolderOutlined />}>
          <Card title="自定义知识库">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic title="总数" value={Math.floor(Math.random() * 1000) + 100} />
              </Col>
              <Col span={6}>
                <Statistic title="本月新增" value={Math.floor(Math.random() * 50) + 10} valueStyle={{ color: '#3f8600' }} />
              </Col>
              <Col span={6}>
                <Statistic title="待处理" value={Math.floor(Math.random() * 20) + 5} valueStyle={{ color: '#cf1322' }} />
              </Col>
              <Col span={6}>
                <Statistic title="完成率" value={Math.floor(Math.random() * 30) + 70} suffix="%" />
              </Col>
            </Row>
            <Table
              style={{ marginTop: 16 }}
              columns={[
                { title: '编号', dataIndex: 'id', key: 'id', width: 100 },
                { title: '名称', dataIndex: 'name', key: 'name' },
                { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === '正常' ? 'green' : 'orange'}>{s}</Tag> },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                {
                  title: '操作', key: 'action',
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={[
                { key: '1', id: 'T001', name: '测试数据1', status: '正常', createTime: '2024-03-15' },
                { key: '2', id: 'T002', name: '测试数据2', status: '正常', createTime: '2024-03-16' },
                { key: '3', id: 'T003', name: '测试数据3', status: '待处理', createTime: '2024-03-17' },
                { key: '4', id: 'T004', name: '测试数据4', status: '正常', createTime: '2024-03-18' },
                { key: '5', id: 'T005', name: '测试数据5', status: '正常', createTime: '2024-03-19' }
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ResearchAssistant
