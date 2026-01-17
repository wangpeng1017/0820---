import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic } from 'antd'
import {
  AlertOutlined,
  BarChartOutlined,
  CalculatorOutlined,
  EditOutlined,
  EyeOutlined,
  FileTextOutlined,
  HistoryOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'history': 'history',
  'standard': 'standard',
  'resource': 'resource',
  'balance': 'balance',
  'warning': 'warning',
}

const PATH_TAB_MAP: Record<string, string> = {
  'history': 'history',
  'standard': 'standard',
  'resource': 'resource',
  'balance': 'balance',
  'warning': 'warning',
}

const FormulaManagement: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // 从 URL 获取当前子路径
  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'history'
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
    navigate(`/formula-management/${path}`)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">叶组配方管理</h1>
        <p className="page-description">
          配方历史数据库、配方标准管理、配方资源运行分析
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        
        <TabPane tab="配方历史数据库" key="history" icon={<HistoryOutlined />}>
          <Card title="配方历史数据库">
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
        <TabPane tab="叶组配方标准管理" key="standard" icon={<FileTextOutlined />}>
          <Card title="叶组配方标准管理">
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
        <TabPane tab="配方资源运行分析" key="resource" icon={<BarChartOutlined />}>
          <Card title="配方资源运行分析">
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
        <TabPane tab="配方维护及平衡测算" key="balance" icon={<CalculatorOutlined />}>
          <Card title="配方维护及平衡测算">
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
        <TabPane tab="关键原料库存预警" key="warning" icon={<AlertOutlined />}>
          <Card title="关键原料库存预警">
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

export default FormulaManagement
