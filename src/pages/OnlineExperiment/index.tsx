import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress, Steps } from 'antd'
import {
  BarChartOutlined,
  EditOutlined,
  ExperimentOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs
const { Step } = Steps

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

  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'design'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())

  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/online-experiment/${path}`)
  }

  // 试验设计数据
  const designData = [
    { key: '1', id: 'EXP001', name: '低焦油配方优化试验', type: '配方试验', designer: '张三', status: '设计中', createTime: '2024-03-15' },
    { key: '2', id: 'EXP002', name: '香精添加量对比试验', type: '香精试验', designer: '李四', status: '待审核', createTime: '2024-03-14' },
    { key: '3', id: 'EXP003', name: '工艺参数优化试验', type: '工艺试验', designer: '王五', status: '已批准', createTime: '2024-03-13' },
    { key: '4', id: 'EXP004', name: '辅材组合效果试验', type: '辅材试验', designer: '赵六', status: '设计中', createTime: '2024-03-12' },
    { key: '5', id: 'EXP005', name: '烟叶醇化时间试验', type: '原料试验', designer: '张三', status: '已批准', createTime: '2024-03-11' },
    { key: '6', id: 'EXP006', name: '包装材料透气性试验', type: '包装试验', designer: '李四', status: '设计中', createTime: '2024-03-10' },
    { key: '7', id: 'EXP007', name: '温湿度控制试验', type: '环境试验', designer: '王五', status: '待审核', createTime: '2024-03-09' },
    { key: '8', id: 'EXP008', name: '新型香料评价试验', type: '香精试验', designer: '赵六', status: '已批准', createTime: '2024-03-08' },
    { key: '9', id: 'EXP009', name: '配方稳定性验证试验', type: '配方试验', designer: '张三', status: '设计中', createTime: '2024-03-07' },
    { key: '10', id: 'EXP010', name: '感官评价方法对比试验', type: '评价试验', designer: '李四', status: '待审核', createTime: '2024-03-06' },
    { key: '11', id: 'EXP011', name: '烟气成分分析试验', type: '检测试验', designer: '王五', status: '已批准', createTime: '2024-03-05' },
    { key: '12', id: 'EXP012', name: '加工工艺改进试验', type: '工艺试验', designer: '赵六', status: '设计中', createTime: '2024-03-04' },
    { key: '13', id: 'EXP013', name: '原料配比优化试验', type: '原料试验', designer: '张三', status: '待审核', createTime: '2024-03-03' },
    { key: '14', id: 'EXP014', name: '储存条件影响试验', type: '环境试验', designer: '李四', status: '已批准', createTime: '2024-03-02' },
    { key: '15', id: 'EXP015', name: '新产品概念验证试验', type: '综合试验', designer: '王五', status: '设计中', createTime: '2024-03-01' }
  ]

  // 试验执行数据
  const executionData = [
    { key: '1', id: 'EXP003', name: '工艺参数优化试验', progress: 85, executor: '张三', startTime: '2024-03-13', status: '执行中' },
    { key: '2', id: 'EXP005', name: '烟叶醇化时间试验', progress: 60, executor: '李四', startTime: '2024-03-11', status: '执行中' },
    { key: '3', id: 'EXP008', name: '新型香料评价试验', progress: 100, executor: '王五', startTime: '2024-03-08', status: '已完成' },
    { key: '4', id: 'EXP011', name: '烟气成分分析试验', progress: 45, executor: '赵六', startTime: '2024-03-05', status: '执行中' },
    { key: '5', id: 'EXP014', name: '储存条件影响试验', progress: 30, executor: '张三', startTime: '2024-03-02', status: '执行中' },
    { key: '6', id: 'EXP016', name: '口感优化试验', progress: 100, executor: '李四', startTime: '2024-02-28', status: '已完成' },
    { key: '7', id: 'EXP017', name: '香气稳定性试验', progress: 75, executor: '王五', startTime: '2024-02-25', status: '执行中' },
    { key: '8', id: 'EXP018', name: '包装密封性试验', progress: 100, executor: '赵六', startTime: '2024-02-22', status: '已完成' },
    { key: '9', id: 'EXP019', name: '温度影响试验', progress: 55, executor: '张三', startTime: '2024-02-20', status: '执行中' },
    { key: '10', id: 'EXP020', name: '湿度控制试验', progress: 40, executor: '李四', startTime: '2024-02-18', status: '执行中' },
    { key: '11', id: 'EXP021', name: '配方重复性验证', progress: 100, executor: '王五', startTime: '2024-02-15', status: '已完成' },
    { key: '12', id: 'EXP022', name: '原料替代试验', progress: 65, executor: '赵六', startTime: '2024-02-12', status: '执行中' },
    { key: '13', id: 'EXP023', name: '工艺稳定性试验', progress: 90, executor: '张三', startTime: '2024-02-10', status: '执行中' },
    { key: '14', id: 'EXP024', name: '感官评价试验', progress: 100, executor: '李四', startTime: '2024-02-08', status: '已完成' },
    { key: '15', id: 'EXP025', name: '质量对比试验', progress: 50, executor: '王五', startTime: '2024-02-05', status: '执行中' }
  ]

  // 结果分析数据
  const analysisData = [
    { key: '1', id: 'EXP008', name: '新型香料评价试验', conclusion: '香料A效果最佳', score: 92, analyst: '王五', completeTime: '2024-03-14' },
    { key: '2', id: 'EXP016', name: '口感优化试验', conclusion: '配方B口感最优', score: 88, analyst: '李四', completeTime: '2024-03-10' },
    { key: '3', id: 'EXP018', name: '包装密封性试验', conclusion: '材料C密封性最好', score: 95, analyst: '赵六', completeTime: '2024-03-08' },
    { key: '4', id: 'EXP021', name: '配方重复性验证', conclusion: '重复性良好', score: 90, analyst: '王五', completeTime: '2024-03-05' },
    { key: '5', id: 'EXP024', name: '感官评价试验', conclusion: '样品1综合评分最高', score: 87, analyst: '李四', completeTime: '2024-03-02' },
    { key: '6', id: 'EXP026', name: '香气持久性试验', conclusion: '配方D香气最持久', score: 91, analyst: '张三', completeTime: '2024-02-28' },
    { key: '7', id: 'EXP027', name: '烟气指标测试', conclusion: '符合国家标准', score: 93, analyst: '王五', completeTime: '2024-02-25' },
    { key: '8', id: 'EXP028', name: '工艺参数验证', conclusion: '参数组合3最优', score: 89, analyst: '赵六', completeTime: '2024-02-22' },
    { key: '9', id: 'EXP029', name: '原料配比试验', conclusion: '配比方案2效果最好', score: 86, analyst: '李四', completeTime: '2024-02-20' },
    { key: '10', id: 'EXP030', name: '储存稳定性试验', conclusion: '6个月内稳定', score: 94, analyst: '张三', completeTime: '2024-02-18' },
    { key: '11', id: 'EXP031', name: '温湿度影响试验', conclusion: '最佳条件：25℃/60%RH', score: 92, analyst: '王五', completeTime: '2024-02-15' },
    { key: '12', id: 'EXP032', name: '辅材组合试验', conclusion: '组合方案A最优', score: 88, analyst: '赵六', completeTime: '2024-02-12' },
    { key: '13', id: 'EXP033', name: '加工工艺对比', conclusion: '工艺2质量更稳定', score: 90, analyst: '李四', completeTime: '2024-02-10' },
    { key: '14', id: 'EXP034', name: '包装材料评价', conclusion: '材料B性价比最高', score: 85, analyst: '张三', completeTime: '2024-02-08' },
    { key: '15', id: 'EXP035', name: '新产品验证试验', conclusion: '达到预期目标', score: 91, analyst: '王五', completeTime: '2024-02-05' }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">在线试验管理</h1>
        <p className="page-description">
          试验设计、试验执行、结果分析
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {/* 试验设计 Tab */}
        <TabPane tab="试验设计" key="design" icon={<ExperimentOutlined />}>
          <Card
            title="试验设计方案"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建试验</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="设计中" value={5} suffix="个" />
              </Col>
              <Col span={6}>
                <Statistic title="待审核" value={4} suffix="个" valueStyle={{ color: '#fa8c16' }} />
              </Col>
              <Col span={6}>
                <Statistic title="已批准" value={6} suffix="个" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="本月新增" value={8} suffix="个" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '试验编号', dataIndex: 'id', key: 'id', width: 100 },
                { title: '试验名称', dataIndex: 'name', key: 'name' },
                { title: '试验类型', dataIndex: 'type', key: 'type', width: 120, render: (text) => <Tag color="blue">{text}</Tag> },
                { title: '设计人', dataIndex: 'designer', key: 'designer', width: 100 },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  width: 100,
                  render: (s: string) => {
                    const colors: Record<string, string> = {
                      '设计中': 'processing',
                      '待审核': 'warning',
                      '已批准': 'success'
                    }
                    return <Tag color={colors[s]}>{s}</Tag>
                  }
                },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 120 },
                {
                  title: '操作',
                  key: 'action',
                  width: 180,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                      <Button type="link" size="small" icon={<CheckCircleOutlined />}>审核</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={designData}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        {/* 试验执行 Tab */}
        <TabPane tab="试验执行" key="execution" icon={<PlayCircleOutlined />}>
          <Card
            title="试验执行进度"
            extra={<Button type="primary" icon={<PlayCircleOutlined />}>开始试验</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="执行中" value={10} suffix="个" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="已完成" value={5} suffix="个" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="平均进度" value={68} suffix="%" />
              </Col>
              <Col span={6}>
                <Statistic title="本周完成" value={3} suffix="个" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '试验编号', dataIndex: 'id', key: 'id', width: 100 },
                { title: '试验名称', dataIndex: 'name', key: 'name' },
                {
                  title: '执行进度',
                  dataIndex: 'progress',
                  key: 'progress',
                  width: 200,
                  render: (progress: number) => (
                    <Progress
                      percent={progress}
                      size="small"
                      status={progress === 100 ? 'success' : 'active'}
                    />
                  )
                },
                { title: '执行人', dataIndex: 'executor', key: 'executor', width: 100 },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  width: 100,
                  render: (s: string) => (
                    <Tag color={s === '已完成' ? 'success' : 'processing'}>{s}</Tag>
                  )
                },
                { title: '开始时间', dataIndex: 'startTime', key: 'startTime', width: 120 },
                {
                  title: '操作',
                  key: 'action',
                  width: 180,
                  render: (_, record: any) => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      {record.status === '执行中' && (
                        <Button type="link" size="small" icon={<EditOutlined />}>记录数据</Button>
                      )}
                      {record.status === '已完成' && (
                        <Button type="link" size="small" icon={<FileTextOutlined />}>生成报告</Button>
                      )}
                    </Space>
                  )
                }
              ]}
              dataSource={executionData}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        {/* 结果分析 Tab */}
        <TabPane tab="结果分析" key="analysis" icon={<BarChartOutlined />}>
          <Card
            title="试验结果分析"
            extra={<Button type="primary" icon={<FileTextOutlined />}>导出报告</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="已分析" value={15} suffix="个" />
              </Col>
              <Col span={6}>
                <Statistic title="平均得分" value={90} suffix="分" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="优秀率" value={73} suffix="%" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="本月完成" value={8} suffix="个" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '试验编号', dataIndex: 'id', key: 'id', width: 100 },
                { title: '试验名称', dataIndex: 'name', key: 'name' },
                { title: '分析结论', dataIndex: 'conclusion', key: 'conclusion' },
                {
                  title: '综合评分',
                  dataIndex: 'score',
                  key: 'score',
                  width: 120,
                  render: (score: number) => (
                    <span style={{
                      color: score >= 90 ? '#52c41a' : score >= 80 ? '#1890ff' : '#fa8c16',
                      fontWeight: 600
                    }}>
                      {score}分
                    </span>
                  )
                },
                { title: '分析人', dataIndex: 'analyst', key: 'analyst', width: 100 },
                { title: '完成时间', dataIndex: 'completeTime', key: 'completeTime', width: 120 },
                {
                  title: '操作',
                  key: 'action',
                  width: 180,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看报告</Button>
                      <Button type="link" size="small" icon={<BarChartOutlined />}>查看图表</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={analysisData}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default OnlineExperiment
