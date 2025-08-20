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
    totalProjects: 32,
    activeProjects: 12,
    completedProjects: 20,
    totalFormulas: 186,
    pendingTests: 18,
    completedTests: 124
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
    },
    {
      id: '4',
      name: '智能包装系统升级',
      description: '升级自动化包装生产线，提高效率',
      status: 'production',
      progress: 90,
      startDate: '2024-01-20',
      manager: '孙工程',
      team: ['钱自动化', '周机械', '吴电气'],
      priority: 'high',
      category: '设备升级'
    },
    {
      id: '5',
      name: '质量追溯体系建设',
      description: '建立全流程质量追溯管理体系',
      status: 'testing',
      progress: 55,
      startDate: '2024-02-15',
      manager: '马质量',
      team: ['朱检测', '徐数据', '胡系统'],
      priority: 'medium',
      category: '质量管理'
    },
    {
      id: '6',
      name: '绿色环保工艺改进',
      description: '减少生产过程中的环境影响',
      status: 'design',
      progress: 40,
      startDate: '2024-03-05',
      manager: '林环保',
      team: ['何化工', '郭环境', '田节能'],
      priority: 'medium',
      category: '环保改进'
    },
    {
      id: '7',
      name: '数字化车间建设',
      description: '打造智能化数字化生产车间',
      status: 'planning',
      progress: 15,
      startDate: '2024-03-10',
      manager: '韩数字',
      team: ['冯IT', '邓网络', '史数据'],
      priority: 'high',
      category: '数字化'
    },
    {
      id: '8',
      name: '新品牌产品研发',
      description: '面向年轻消费群体的新品牌开发',
      status: 'completed',
      progress: 100,
      startDate: '2023-12-01',
      endDate: '2024-03-15',
      manager: '曹品牌',
      team: ['雷设计', '霍市场', '邵调研'],
      priority: 'high',
      category: '品牌开发'
    },
    {
      id: '9',
      name: '供应链优化项目',
      description: '优化原料采购和供应链管理',
      status: 'testing',
      progress: 70,
      startDate: '2024-02-20',
      manager: '薛采购',
      team: ['卢供应', '顾物流', '毛仓储'],
      priority: 'medium',
      category: '供应链'
    },
    {
      id: '10',
      name: '员工技能提升计划',
      description: '全面提升员工专业技能和综合素质',
      status: 'production',
      progress: 85,
      startDate: '2024-01-10',
      manager: '左培训',
      team: ['石人事', '龙教育', '叶发展'],
      priority: 'low',
      category: '人才培养'
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
