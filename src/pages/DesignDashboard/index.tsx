import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress } from 'antd'
import {
  DashboardOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'overview': 'overview',
}

const PATH_TAB_MAP: Record<string, string> = {
  'overview': 'overview',
}

const DesignDashboard: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'overview'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())

  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/design-dashboard/${path}`)
  }

  // 设计任务全局视图数据
  const taskData = [
    { key: '1', code: 'TASK001', taskName: '黄山（软）包装设计', type: '包装设计', project: '黄山软包升级', assignee: '张建国', priority: 'P0', startDate: '2024-02-01', deadline: '2024-03-31', progress: 95, status: '即将完成' },
    { key: '2', code: 'TASK002', taskName: '细支卷烟新品设计', type: '新品设计', project: '细支产品线', assignee: '李明华', priority: 'P0', startDate: '2024-01-15', deadline: '2024-06-30', progress: 65, status: '进行中' },
    { key: '3', code: 'TASK003', taskName: '中支产品辅料选型', type: '辅料设计', project: '中支产品优化', assignee: '王志强', priority: 'P1', startDate: '2024-02-10', deadline: '2024-05-31', progress: 80, status: '进行中' },
    { key: '4', code: 'TASK004', taskName: '高端产品卷烟纸设计', type: '卷烟设计', project: '高端产品研发', assignee: '陈伟明', priority: 'P0', startDate: '2024-01-20', deadline: '2024-07-31', progress: 55, status: '进行中' },
    { key: '5', code: 'TASK005', taskName: '环保包装材料研究', type: '包装设计', project: '绿色生产项目', assignee: '刘德华', priority: 'P2', startDate: '2024-02-15', deadline: '2024-09-30', progress: 40, status: '进行中' },
    { key: '6', code: 'TASK006', taskName: '品牌视觉升级设计', type: '包装设计', project: '品牌年轻化', assignee: '赵国庆', priority: 'P1', startDate: '2024-03-01', deadline: '2024-08-31', progress: 30, status: '进行中' },
    { key: '7', code: 'TASK007', taskName: '新型滤嘴材料评估', type: '辅料设计', project: '低焦减害技术', assignee: '周建军', priority: 'P1', startDate: '2024-02-20', deadline: '2024-06-30', progress: 70, status: '进行中' },
    { key: '8', code: 'TASK008', taskName: '限量版包装设计', type: '包装设计', project: '节日营销活动', assignee: '吴晓明', priority: 'P2', startDate: '2024-03-05', deadline: '2024-04-30', progress: 85, status: '即将完成' },
    { key: '9', code: 'TASK009', taskName: '细支卷烟纸优化', type: '卷烟设计', project: '细支产品线', assignee: '黄志远', priority: 'P1', startDate: '2024-02-25', deadline: '2024-05-31', progress: 60, status: '进行中' },
    { key: '10', code: 'TASK010', taskName: '香精添加方案设计', type: '辅料设计', project: '香型改进项目', assignee: '林志伟', priority: 'P1', startDate: '2024-03-10', deadline: '2024-07-31', progress: 45, status: '进行中' },
    { key: '11', code: 'TASK011', taskName: '复古系列包装设计', type: '包装设计', project: '1993复刻项目', assignee: '杨建华', priority: 'P2', startDate: '2024-03-15', deadline: '2024-09-30', progress: 25, status: '进行中' },
    { key: '12', code: 'TASK012', taskName: '低温卷烟纸研发', type: '卷烟设计', project: '新型烟草制品', assignee: '郑明辉', priority: 'P0', startDate: '2024-01-25', deadline: '2024-08-31', progress: 50, status: '进行中' },
    { key: '13', code: 'TASK013', taskName: '礼盒包装结构设计', type: '包装设计', project: '高端礼品系列', assignee: '孙晓东', priority: 'P1', startDate: '2024-03-20', deadline: '2024-06-30', progress: 35, status: '进行中' },
    { key: '14', code: 'TASK014', taskName: '可降解滤嘴开发', type: '辅料设计', project: '环保材料应用', assignee: '钱学森', priority: 'P2', startDate: '2024-03-25', deadline: '2024-10-31', progress: 20, status: '规划中' },
    { key: '15', code: 'TASK015', taskName: '智能包装技术研究', type: '新品设计', project: '数字化创新', assignee: '朱国强', priority: 'P2', startDate: '2024-03-30', deadline: '2024-12-31', progress: 10, status: '规划中' }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">数字化研发设计看板</h1>
        <p className="page-description">
          设计任务全局视图
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="设计任务全局视图" key="overview" icon={<DashboardOutlined />}>
          <Card
            title="设计任务全局视图"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建任务</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="任务总数" value={15} suffix="个" />
              </Col>
              <Col span={6}>
                <Statistic title="进行中" value={11} suffix="个" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="即将完成" value={2} suffix="个" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="平均进度" value={52} suffix="%" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '任务编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '任务名称', dataIndex: 'taskName', key: 'taskName' },
                { title: '任务类型', dataIndex: 'type', key: 'type', width: 100 },
                { title: '关联项目', dataIndex: 'project', key: 'project', width: 130 },
                { title: '负责人', dataIndex: 'assignee', key: 'assignee', width: 90 },
                { title: '优先级', dataIndex: 'priority', key: 'priority', width: 80, render: (p: string) => {
                  const colors: Record<string, string> = { 'P0': 'error', 'P1': 'warning', 'P2': 'default' }
                  return <Tag color={colors[p]}>{p}</Tag>
                }},
                { title: '开始日期', dataIndex: 'startDate', key: 'startDate', width: 110 },
                { title: '截止日期', dataIndex: 'deadline', key: 'deadline', width: 110 },
                { title: '完成进度', dataIndex: 'progress', key: 'progress', width: 130, render: (p: number) => (
                  <Progress percent={p} size="small" status={p >= 90 ? 'success' : p >= 60 ? 'active' : 'normal'} />
                )},
                { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: (s: string) => {
                  const colors: Record<string, string> = { '即将完成': 'success', '进行中': 'processing', '规划中': 'default' }
                  const icons: Record<string, any> = { '即将完成': <CheckCircleOutlined />, '进行中': <ClockCircleOutlined />, '规划中': null }
                  return <Tag color={colors[s]} icon={icons[s]}>{s}</Tag>
                }},
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                  </Space>
                )}
              ]}
              dataSource={taskData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1400 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default DesignDashboard
