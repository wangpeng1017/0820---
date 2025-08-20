import React from 'react'
import { Row, Col, Card, Statistic, Progress, Timeline, Table, Tag, Space, Button } from 'antd'
import {
  ProjectOutlined,
  ExperimentOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ArrowUpOutlined,
  EyeOutlined
} from '@ant-design/icons'
import { PROJECT_STATUS_COLORS, PROJECT_STATUS_NAMES } from '../../constants'
import type { Project } from '../../types'

const Dashboard: React.FC = () => {
  // 模拟数据
  const stats = {
    totalProjects: 24,
    activeProjects: 8,
    completedProjects: 16,
    totalFormulas: 156,
    pendingTests: 12,
    completedTests: 89
  }

  const recentProjects: Project[] = [
    {
      id: '1',
      name: '新型低焦油卷烟产品开发',
      description: '开发焦油量≤8mg的新型卷烟产品',
      status: 'design',
      progress: 65,
      startDate: '2024-01-15',
      manager: '张产品',
      team: ['李配方', '王实验', '赵工艺'],
      priority: 'high',
      category: '产品开发'
    },
    {
      id: '2',
      name: '香精配方优化项目',
      description: '优化现有香精配方，提升产品香韵',
      status: 'testing',
      progress: 80,
      startDate: '2024-02-01',
      manager: '李配方',
      team: ['王调香', '张检测'],
      priority: 'medium',
      category: '配方优化'
    },
    {
      id: '3',
      name: '新型滤棒材料研发',
      description: '研发环保型滤棒材料',
      status: 'planning',
      progress: 25,
      startDate: '2024-03-01',
      manager: '赵工艺',
      team: ['李材料', '王环保'],
      priority: 'medium',
      category: '材料研发'
    }
  ]

  const timelineData = [
    {
      color: 'green',
      children: (
        <div>
          <p><strong>新型低焦油卷烟产品</strong> - 配方设计完成</p>
          <p style={{ color: '#666', fontSize: 12 }}>2小时前</p>
        </div>
      )
    },
    {
      color: 'blue',
      children: (
        <div>
          <p><strong>香精配方优化项目</strong> - 感官评吸测试开始</p>
          <p style={{ color: '#666', fontSize: 12 }}>4小时前</p>
        </div>
      )
    },
    {
      color: 'orange',
      children: (
        <div>
          <p><strong>质量检测报告</strong> - 批次QC-2024-0315已完成</p>
          <p style={{ color: '#666', fontSize: 12 }}>6小时前</p>
        </div>
      )
    },
    {
      color: 'red',
      children: (
        <div>
          <p><strong>原料库存预警</strong> - 云南上部烟叶库存不足</p>
          <p style={{ color: '#666', fontSize: 12 }}>8小时前</p>
        </div>
      )
    }
  ]

  const projectColumns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={PROJECT_STATUS_COLORS[status as keyof typeof PROJECT_STATUS_COLORS]}>
          {PROJECT_STATUS_NAMES[status as keyof typeof PROJECT_STATUS_NAMES]}
        </Tag>
      )
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      )
    },
    {
      title: '负责人',
      dataIndex: 'manager',
      key: 'manager'
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        const colors = { high: 'red', medium: 'orange', low: 'green' }
        const names = { high: '高', medium: '中', low: '低' }
        return (
          <Tag color={colors[priority as keyof typeof colors]}>
            {names[priority as keyof typeof names]}
          </Tag>
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} size="small">
            查看
          </Button>
        </Space>
      )
    }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">数字化研发设计看板</h1>
        <p className="page-description">
          实时监控研发项目状态、任务分配和进度跟踪，提供全局视图和数据洞察
        </p>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总项目数"
              value={stats.totalProjects}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="进行中项目"
              value={stats.activeProjects}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
              suffix={
                <span style={{ fontSize: 12, color: '#52c41a' }}>
                  <ArrowUpOutlined /> 12%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已完成项目"
              value={stats.completedProjects}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="配方总数"
              value={stats.totalFormulas}
              prefix={<ExperimentOutlined />}
              valueStyle={{ color: '#722ed1' }}
              suffix={
                <span style={{ fontSize: 12, color: '#52c41a' }}>
                  <ArrowUpOutlined /> 8%
                </span>
              }
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* 项目列表 */}
        <Col xs={24} lg={16}>
          <Card title="在研项目" extra={<Button type="link">查看全部</Button>}>
            <Table
              columns={projectColumns}
              dataSource={recentProjects}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>

        {/* 动态时间线 */}
        <Col xs={24} lg={8}>
          <Card title="最新动态" extra={<Button type="link">查看更多</Button>}>
            <Timeline items={timelineData} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
