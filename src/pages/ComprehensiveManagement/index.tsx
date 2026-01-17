import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress } from 'antd'
import {
  ProjectOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  FileTextOutlined,
  BookOutlined,
  TeamOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'project': 'project',
  'knowledge': 'knowledge',
  'collaboration': 'collaboration',
}

const PATH_TAB_MAP: Record<string, string> = {
  'project': 'project',
  'knowledge': 'knowledge',
  'collaboration': 'collaboration',
}

const ComprehensiveManagement: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'project'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())

  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/comprehensive-management/${path}`)
  }

  // 项目管理数据
  const projectData = [
    { key: '1', code: 'PRJ001', name: '新品卷烟研发项目', stage: '试验阶段', responsible: '张三', progress: 75 },
    { key: '2', code: 'PRJ002', name: '香精配方优化项目', stage: '实施阶段', responsible: '李��', progress: 60 },
    { key: '3', code: 'PRJ003', name: '质量管理体系升级', stage: '验收阶段', responsible: '王五', progress: 95 },
    { key: '4', code: 'PRJ004', name: '生产线自动化改造', stage: '规划阶段', responsible: '赵六', progress: 30 },
    { key: '5', code: 'PRJ005', name: '烟叶原料溯源系统', stage: '实施阶段', responsible: '张三', progress: 55 },
    { key: '6', code: 'PRJ006', name: '包装材料创新研究', stage: '试验阶段', responsible: '李四', progress: 70 },
    { key: '7', code: 'PRJ007', name: '智能仓储管理系统', stage: '实施阶段', responsible: '王五', progress: 80 },
    { key: '8', code: 'PRJ008', name: '产品感官评价标准化', stage: '验收阶段', responsible: '赵六', progress: 90 },
    { key: '9', code: 'PRJ009', name: '环保工艺改进项目', stage: '试验阶段', responsible: '张三', progress: 65 },
    { key: '10', code: 'PRJ010', name: '供应链优化项目', stage: '实施阶段', responsible: '李四', progress: 50 },
    { key: '11', code: 'PRJ011', name: '数字化转型项目', stage: '规划阶段', responsible: '王五', progress: 25 },
    { key: '12', code: 'PRJ012', name: '品牌推广策略研究', stage: '实施阶段', responsible: '赵六', progress: 45 },
    { key: '13', code: 'PRJ013', name: '成本控制优化项目', stage: '试验阶段', responsible: '张三', progress: 68 },
    { key: '14', code: 'PRJ014', name: '员工技能提升计划', stage: '实施阶段', responsible: '李四', progress: 72 },
    { key: '15', code: 'PRJ015', name: '客户满意度提升项目', stage: '验收阶段', responsible: '王五', progress: 88 }
  ]

  // 知识管理数据
  const knowledgeData = [
    { key: '1', code: 'DOC001', title: '卷烟生产工艺标准操作规程', type: '技术文档', uploader: '张三', uploadTime: '2024-03-20 10:30' },
    { key: '2', code: 'DOC002', title: '香精香料使用指南', type: '操作手册', uploader: '李四', uploadTime: '2024-03-19 14:20' },
    { key: '3', code: 'DOC003', title: '质量检测方法汇编', type: '技术文档', uploader: '王五', uploadTime: '2024-03-18 09:15' },
    { key: '4', code: 'DOC004', title: '设备维护保养手册', type: '操作手册', uploader: '赵六', uploadTime: '2024-03-17 16:40' },
    { key: '5', code: 'DOC005', title: '烟叶分级标准', type: '标准规范', uploader: '张三', uploadTime: '2024-03-16 11:00' },
    { key: '6', code: 'DOC006', title: '新产品研发流程', type: '流程文档', uploader: '李四', uploadTime: '2024-03-15 13:25' },
    { key: '7', code: 'DOC007', title: '安全生产管理制度', type: '管理制度', uploader: '王五', uploadTime: '2024-03-14 10:50' },
    { key: '8', code: 'DOC008', title: '感官评价培训教材', type: '培训资料', uploader: '赵六', uploadTime: '2024-03-13 15:30' },
    { key: '9', code: 'DOC009', title: '包装设计规范', type: '标准规范', uploader: '张三', uploadTime: '2024-03-12 09:45' },
    { key: '10', code: 'DOC010', title: '原料采购管理办法', type: '管理制度', uploader: '李四', uploadTime: '2024-03-11 14:15' },
    { key: '11', code: 'DOC011', title: '实验室管理规范', type: '技术文档', uploader: '王五', uploadTime: '2024-03-10 11:20' },
    { key: '12', code: 'DOC012', title: '客户投诉处理流程', type: '流程文档', uploader: '赵六', uploadTime: '2024-03-09 16:00' },
    { key: '13', code: 'DOC013', title: '环保法规汇编', type: '法规文件', uploader: '张三', uploadTime: '2024-03-08 10:10' },
    { key: '14', code: 'DOC014', title: '成本核算方法', type: '技术文档', uploader: '李四', uploadTime: '2024-03-07 13:40' },
    { key: '15', code: 'DOC015', title: '行业最佳实践案例集', type: '案例分析', uploader: '王五', uploadTime: '2024-03-06 15:55' }
  ]

  // 协同工作数据
  const collaborationData = [
    { key: '1', code: 'TASK001', name: '新品配方评审会议', participants: '张三、李四、王五', status: '进行中', deadline: '2024-03-22' },
    { key: '2', code: 'TASK002', name: '质量问题分析讨论', participants: '李四、赵六', status: '已完成', deadline: '2024-03-20' },
    { key: '3', code: 'TASK003', name: '生产计划协调', participants: '张三、王五、赵六', status: '待开始', deadline: '2024-03-25' },
    { key: '4', code: 'TASK004', name: '设备采购方案评审', participants: '李四、王五', status: '进行中', deadline: '2024-03-23' },
    { key: '5', code: 'TASK005', name: '原料供应商考察', participants: '张三、赵六', status: '已完成', deadline: '2024-03-19' },
    { key: '6', code: 'TASK006', name: '工艺改进方案讨论', participants: '王五、李四、张三', status: '进行中', deadline: '2024-03-24' },
    { key: '7', code: 'TASK007', name: '年度质量目标制定', participants: '全体成员', status: '已完成', deadline: '2024-03-18' },
    { key: '8', code: 'TASK008', name: '新员工培训计划', participants: '李四、王五', status: '待开始', deadline: '2024-03-26' },
    { key: '9', code: 'TASK009', name: '客户需求调研', participants: '张三、赵六', status: '进行中', deadline: '2024-03-23' },
    { key: '10', code: 'TASK010', name: '成本优化方案研讨', participants: '李四、王五、赵六', status: '已完成', deadline: '2024-03-17' },
    { key: '11', code: 'TASK011', name: '安全隐患排查', participants: '张三、李四', status: '进行中', deadline: '2024-03-22' },
    { key: '12', code: 'TASK012', name: '技术标准修订', participants: '王五、赵六', status: '待开始', deadline: '2024-03-27' },
    { key: '13', code: 'TASK013', name: '市场竞品分析', participants: '张三、李四、王五', status: '已完成', deadline: '2024-03-16' },
    { key: '14', code: 'TASK014', name: '环保设施验收', participants: '赵六、张三', status: '进行中', deadline: '2024-03-24' },
    { key: '15', code: 'TASK015', name: '季度总结会议', participants: '全体成员', status: '待开始', deadline: '2024-03-28' }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">综合管理</h1>
        <p className="page-description">
          项目管理、知识管理、协同工作
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {/* 项目管理 Tab */}
        <TabPane tab="项目管理" key="project" icon={<ProjectOutlined />}>
          <Card
            title="项目列表"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建项目</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="项目总数" value={15} suffix="个" />
              </Col>
              <Col span={6}>
                <Statistic title="进行中" value={8} suffix="个" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="已完成" value={5} suffix="个" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="平均进度" value={65.3} suffix="%" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '项目编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '项目名称', dataIndex: 'name', key: 'name' },
                {
                  title: '项目阶段',
                  dataIndex: 'stage',
                  key: 'stage',
                  width: 120,
                  render: (s: string) => {
                    const colors: Record<string, string> = {
                      '规划阶段': 'default',
                      '试验阶段': 'processing',
                      '实施阶段': 'processing',
                      '验收阶段': 'success'
                    }
                    return <Tag color={colors[s] || 'default'}>{s}</Tag>
                  }
                },
                { title: '负责人', dataIndex: 'responsible', key: 'responsible', width: 100 },
                {
                  title: '完成进度',
                  dataIndex: 'progress',
                  key: 'progress',
                  width: 150,
                  render: (p: number) => (
                    <Progress percent={p} size="small" status={p >= 90 ? 'success' : 'active'} />
                  )
                },
                {
                  title: '操作',
                  key: 'action',
                  width: 180,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={projectData}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        {/* 知识管理 Tab */}
        <TabPane tab="知识管理" key="knowledge" icon={<BookOutlined />}>
          <Card
            title="知识库"
            extra={<Button type="primary" icon={<PlusOutlined />}>上传文档</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="文档总数" value={328} suffix="份" />
              </Col>
              <Col span={6}>
                <Statistic title="本月新增" value={15} suffix="份" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="技术文档" value={156} suffix="份" />
              </Col>
              <Col span={6}>
                <Statistic title="下载次数" value={1245} suffix="次" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '文档编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '文档标题', dataIndex: 'title', key: 'title' },
                {
                  title: '文档类型',
                  dataIndex: 'type',
                  key: 'type',
                  width: 120,
                  render: (t: string) => {
                    const colors: Record<string, string> = {
                      '技术文档': 'blue',
                      '操作手册': 'green',
                      '标准规范': 'purple',
                      '流程文档': 'orange',
                      '管理制度': 'red',
                      '培训资料': 'cyan',
                      '法规文件': 'magenta',
                      '案例分析': 'geekblue'
                    }
                    return <Tag color={colors[t] || 'default'}>{t}</Tag>
                  }
                },
                { title: '上传人', dataIndex: 'uploader', key: 'uploader', width: 100 },
                { title: '上传时间', dataIndex: 'uploadTime', key: 'uploadTime', width: 160 },
                {
                  title: '操作',
                  key: 'action',
                  width: 180,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<FileTextOutlined />}>下载</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={knowledgeData}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        {/* 协同工作 Tab */}
        <TabPane tab="协同工作" key="collaboration" icon={<TeamOutlined />}>
          <Card
            title="协同任务"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建任务</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="任务总数" value={45} suffix="个" />
              </Col>
              <Col span={6}>
                <Statistic title="进行中" value={6} suffix="个" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="已完成" value={35} suffix="个" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="待开始" value={4} suffix="个" valueStyle={{ color: '#fa8c16' }} />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '任务编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '任务名称', dataIndex: 'name', key: 'name' },
                { title: '参与人员', dataIndex: 'participants', key: 'participants' },
                {
                  title: '任务状态',
                  dataIndex: 'status',
                  key: 'status',
                  width: 100,
                  render: (s: string) => {
                    const colors: Record<string, string> = {
                      '待开始': 'default',
                      '进行中': 'processing',
                      '已完成': 'success'
                    }
                    return <Tag color={colors[s] || 'default'}>{s}</Tag>
                  }
                },
                { title: '截止日期', dataIndex: 'deadline', key: 'deadline', width: 120 },
                {
                  title: '操作',
                  key: 'action',
                  width: 180,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={collaborationData}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ComprehensiveManagement
