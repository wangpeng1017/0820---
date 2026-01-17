import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic } from 'antd'
import {
  DatabaseOutlined,
  EditOutlined,
  EyeOutlined,
  FileTextOutlined,
  InboxOutlined,
  LockOutlined,
  PlusOutlined,
  SafetyOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'database': 'database',
  'formula': 'formula',
  'workorder': 'workorder',
  'quality': 'quality',
  'inventory': 'inventory',
  'supplier': 'supplier',
}

const PATH_TAB_MAP: Record<string, string> = {
  'database': 'database',
  'formula': 'formula',
  'workorder': 'workorder',
  'quality': 'quality',
  'inventory': 'inventory',
  'supplier': 'supplier',
}

const FlavorManagement: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // 从 URL 获取当前子路径
  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'database'
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
    navigate(`/flavor-management/${path}`)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">香精香料管理</h1>
        <p className="page-description">
          香精香料数据库、配方加密与版本控制、电子化调配工单
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        
        <TabPane tab="香精香料数据库" key="database" icon={<DatabaseOutlined />}>
          <Card title="香精香料数据库">
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
        <TabPane tab="配方加密与版本控制" key="formula" icon={<LockOutlined />}>
          <Card title="配方加密与版本控制">
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
        <TabPane tab="电子化调配工单" key="workorder" icon={<FileTextOutlined />}>
          <Card title="电子化调配工单">
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
        <TabPane tab="香精质量管理" key="quality" icon={<SafetyOutlined />}>
          <Card title="香精质量管理">
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
        <TabPane tab="香原料库存管理" key="inventory" icon={<InboxOutlined />}>
          <Card title="香原料库存管理">
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
        <TabPane tab="供应商评价与预警" key="supplier" icon={<TeamOutlined />}>
          <Card title="供应商评价与预警">
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

export default FlavorManagement
