import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic } from 'antd'
import {
  BarChartOutlined,
  EditOutlined,
  ExperimentOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'design': 'design',
  'execution': 'execution',
  'analysis': 'analysis',
}

const PATH_TAB_MAP: Record<string, string> = {
  'design': 'design',
  'execution': 'execution',
  'analysis': 'analysis',
}

const OnlineExperiment: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // 从 URL 获取当前子路径
  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'design'
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
    navigate(`/online-experiment/${path}`)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">在线试验管理</h1>
        <p className="page-description">
          试验设计、试验执行、结果分析
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        
        <TabPane tab="试验设计" key="design" icon={<ExperimentOutlined />}>
          <Card title="试验设计">
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
                { key: '1', id: 'T001', name: '测试数据1', status: '正常', createTime: '2024-03-02' },
                { key: '2', id: 'T002', name: '测试数据2', status: '正常', createTime: '2024-03-03' },
                { key: '3', id: 'T003', name: '测试数据3', status: '待处理', createTime: '2024-03-04' },
                { key: '4', id: 'T004', name: '测试数据4', status: '正常', createTime: '2024-03-05' },
                { key: '5', id: 'T005', name: '测试数据5', status: '正常', createTime: '2024-03-06' },
                { key: '6', id: 'T006', name: '测试数据6', status: '待处理', createTime: '2024-03-07' },
                { key: '7', id: 'T007', name: '测试数据7', status: '正常', createTime: '2024-03-08' },
                { key: '8', id: 'T008', name: '测试数据8', status: '正常', createTime: '2024-03-09' },
                { key: '9', id: 'T009', name: '测试数据9', status: '待处理', createTime: '2024-03-10' },
                { key: '10', id: 'T010', name: '测试数据10', status: '正常', createTime: '2024-03-11' },
                { key: '11', id: 'T011', name: '测试数据11', status: '正常', createTime: '2024-03-12' },
                { key: '12', id: 'T012', name: '测试数据12', status: '待处理', createTime: '2024-03-13' },
                { key: '13', id: 'T013', name: '测试数据13', status: '正常', createTime: '2024-03-14' },
                { key: '14', id: 'T014', name: '测试数据14', status: '正常', createTime: '2024-03-15' },
                { key: '15', id: 'T015', name: '测试数据15', status: '待处理', createTime: '2024-03-16' }
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="试验执行" key="execution" icon={<PlayCircleOutlined />}>
          <Card title="试验执行">
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
                { key: '1', id: 'T001', name: '测试数据1', status: '正常', createTime: '2024-03-02' },
                { key: '2', id: 'T002', name: '测试数据2', status: '正常', createTime: '2024-03-03' },
                { key: '3', id: 'T003', name: '测试数据3', status: '待处理', createTime: '2024-03-04' },
                { key: '4', id: 'T004', name: '测试数据4', status: '正常', createTime: '2024-03-05' },
                { key: '5', id: 'T005', name: '测试数据5', status: '正常', createTime: '2024-03-06' },
                { key: '6', id: 'T006', name: '测试数据6', status: '待处理', createTime: '2024-03-07' },
                { key: '7', id: 'T007', name: '测试数据7', status: '正常', createTime: '2024-03-08' },
                { key: '8', id: 'T008', name: '测试数据8', status: '正常', createTime: '2024-03-09' },
                { key: '9', id: 'T009', name: '测试数据9', status: '待处理', createTime: '2024-03-10' },
                { key: '10', id: 'T010', name: '测试数据10', status: '正常', createTime: '2024-03-11' },
                { key: '11', id: 'T011', name: '测试数据11', status: '正常', createTime: '2024-03-12' },
                { key: '12', id: 'T012', name: '测试数据12', status: '待处理', createTime: '2024-03-13' },
                { key: '13', id: 'T013', name: '测试数据13', status: '正常', createTime: '2024-03-14' },
                { key: '14', id: 'T014', name: '测试数据14', status: '正常', createTime: '2024-03-15' },
                { key: '15', id: 'T015', name: '测试数据15', status: '待处理', createTime: '2024-03-16' }
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="结果分析" key="analysis" icon={<BarChartOutlined />}>
          <Card title="结果分析">
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
                { key: '1', id: 'T001', name: '测试数据1', status: '正常', createTime: '2024-03-02' },
                { key: '2', id: 'T002', name: '测试数据2', status: '正常', createTime: '2024-03-03' },
                { key: '3', id: 'T003', name: '测试数据3', status: '待处理', createTime: '2024-03-04' },
                { key: '4', id: 'T004', name: '测试数据4', status: '正常', createTime: '2024-03-05' },
                { key: '5', id: 'T005', name: '测试数据5', status: '正常', createTime: '2024-03-06' },
                { key: '6', id: 'T006', name: '测试数据6', status: '待处理', createTime: '2024-03-07' },
                { key: '7', id: 'T007', name: '测试数据7', status: '正常', createTime: '2024-03-08' },
                { key: '8', id: 'T008', name: '测试数据8', status: '正常', createTime: '2024-03-09' },
                { key: '9', id: 'T009', name: '测试数据9', status: '待处理', createTime: '2024-03-10' },
                { key: '10', id: 'T010', name: '测试数据10', status: '正常', createTime: '2024-03-11' },
                { key: '11', id: 'T011', name: '测试数据11', status: '正常', createTime: '2024-03-12' },
                { key: '12', id: 'T012', name: '测试数据12', status: '待处理', createTime: '2024-03-13' },
                { key: '13', id: 'T013', name: '测试数据13', status: '正常', createTime: '2024-03-14' },
                { key: '14', id: 'T014', name: '测试数据14', status: '正常', createTime: '2024-03-15' },
                { key: '15', id: 'T015', name: '测试数据15', status: '待处理', createTime: '2024-03-16' }
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default OnlineExperiment
