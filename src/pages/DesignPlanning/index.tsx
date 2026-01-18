import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress } from 'antd'
import {
  AimOutlined,
  EditOutlined,
  EyeOutlined,
  FileTextOutlined,
  PlusOutlined,
  DownloadOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'market-report': 'market-report',
  'target': 'target',
}

const PATH_TAB_MAP: Record<string, string> = {
  'market-report': 'market-report',
  'target': 'target',
}

const DesignPlanning: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'market-report'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())

  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/design-planning/${path}`)
  }

  // 市场分析报告生成数据
  const marketReportData = [
    { key: '1', code: 'MR001', reportName: '2024年Q1卷烟市场趋势分析', region: '华东地区', category: '中支卷烟', createDate: '2024-03-01', creator: '张建国', status: '已完成', pages: 58, downloads: 125 },
    { key: '2', code: 'MR002', reportName: '细支卷烟消费者偏好研究', region: '全国', category: '细支卷烟', createDate: '2024-03-02', creator: '李明华', status: '生成中', pages: 0, downloads: 0 },
    { key: '3', code: 'MR003', reportName: '高端卷烟市场竞争格局分析', region: '华东地区', category: '高端产品', createDate: '2024-03-03', creator: '王志强', status: '已完成', pages: 72, downloads: 98 },
    { key: '4', code: 'MR004', reportName: '年轻消费群体购买行为分析', region: '全国', category: '市场调研', createDate: '2024-03-04', creator: '陈伟明', status: '已完成', pages: 45, downloads: 156 },
    { key: '5', code: 'MR005', reportName: '黄山品牌市场占有率分析', region: '安徽省', category: '品牌研究', createDate: '2024-03-05', creator: '刘德华', status: '待生成', pages: 0, downloads: 0 },
    { key: '6', code: 'MR006', reportName: '电商渠道卷烟销售数据分析', region: '全国', category: '渠道分析', createDate: '2024-03-06', creator: '赵国庆', status: '生成中', pages: 0, downloads: 0 },
    { key: '7', code: 'MR007', reportName: '竞品价格策略对比分析', region: '华东地区', category: '竞品分析', createDate: '2024-03-07', creator: '周建军', status: '已完成', pages: 38, downloads: 87 },
    { key: '8', code: 'MR008', reportName: '新型烟草制品市场影响评估', region: '全国', category: '市场趋势', createDate: '2024-03-08', creator: '吴晓明', status: '已完成', pages: 65, downloads: 142 },
    { key: '9', code: 'MR009', reportName: '节假日销售高峰期分析', region: '华东地区', category: '销售分析', createDate: '2024-03-09', creator: '黄志远', status: '待生成', pages: 0, downloads: 0 },
    { key: '10', code: 'MR010', reportName: '包装设计对购买决策的影响', region: '全国', category: '设计研究', createDate: '2024-03-10', creator: '林志伟', status: '已完成', pages: 52, downloads: 118 },
    { key: '11', code: 'MR011', reportName: '低焦油卷烟市场需求预测', region: '全国', category: '需求预测', createDate: '2024-03-11', creator: '杨建华', status: '生成中', pages: 0, downloads: 0 },
    { key: '12', code: 'MR012', reportName: '区域市场差异化策略研究', region: '华东地区', category: '策略研究', createDate: '2024-03-12', creator: '郑明辉', status: '已完成', pages: 48, downloads: 92 },
    { key: '13', code: 'MR013', reportName: '消费者品牌忠诚度调研报告', region: '安徽省', category: '品牌研究', createDate: '2024-03-13', creator: '孙晓东', status: '已完成', pages: 55, downloads: 134 },
    { key: '14', code: 'MR014', reportName: '产品线优化建议报告', region: '全国', category: '产品策略', createDate: '2024-03-14', creator: '钱学森', status: '待生成', pages: 0, downloads: 0 },
    { key: '15', code: 'MR015', reportName: '2024年市场机会点识别报告', region: '全国', category: '战略规划', createDate: '2024-03-15', creator: '朱国强', status: '已完成', pages: 68, downloads: 176 }
  ]

  // 设计目标智能分解数据
  const targetData = [
    { key: '1', code: 'TG001', projectName: '黄山（软）升级改造项目', mainGoal: '提升产品竞争力', subGoals: 5, progress: 85, priority: 'P0', owner: '张建国', deadline: '2024-06-30', status: '进行中' },
    { key: '2', code: 'TG002', projectName: '细支卷烟新品开发', mainGoal: '开拓细支市场', subGoals: 8, progress: 60, priority: 'P0', owner: '李明华', deadline: '2024-09-30', status: '进行中' },
    { key: '3', code: 'TG003', projectName: '包装创新设计项目', mainGoal: '提升品牌形象', subGoals: 6, progress: 100, priority: 'P1', owner: '王志强', deadline: '2024-03-31', status: '已完成' },
    { key: '4', code: 'TG004', projectName: '香精配方优化', mainGoal: '改善产品香气', subGoals: 4, progress: 75, priority: 'P1', owner: '陈伟明', deadline: '2024-05-31', status: '进行中' },
    { key: '5', code: 'TG005', projectName: '低焦减害技术研发', mainGoal: '降低有害成分', subGoals: 7, progress: 45, priority: 'P0', owner: '刘德华', deadline: '2024-12-31', status: '进行中' },
    { key: '6', code: 'TG006', projectName: '中支产品线扩充', mainGoal: '丰富产品矩阵', subGoals: 5, progress: 30, priority: 'P1', owner: '赵国庆', deadline: '2024-08-31', status: '进行中' },
    { key: '7', code: 'TG007', projectName: '工艺流程优化', mainGoal: '提高生产效率', subGoals: 6, progress: 90, priority: 'P2', owner: '周建军', deadline: '2024-04-30', status: '进行中' },
    { key: '8', code: 'TG008', projectName: '质量管理体系升级', mainGoal: '提升产品质量', subGoals: 8, progress: 100, priority: 'P1', owner: '吴晓明', deadline: '2024-02-28', status: '已完成' },
    { key: '9', code: 'TG009', projectName: '原料采购优化', mainGoal: '降低采购成本', subGoals: 4, progress: 55, priority: 'P2', owner: '黄志远', deadline: '2024-07-31', status: '进行中' },
    { key: '10', code: 'TG010', projectName: '新型辅料应用研究', mainGoal: '提升产品性能', subGoals: 5, progress: 40, priority: 'P1', owner: '林志伟', deadline: '2024-10-31', status: '进行中' },
    { key: '11', code: 'TG011', projectName: '感官评价体系建设', mainGoal: '标准化评价流程', subGoals: 6, progress: 70, priority: 'P2', owner: '杨建华', deadline: '2024-06-30', status: '进行中' },
    { key: '12', code: 'TG012', projectName: '数字化研发平台建设', mainGoal: '提升研发效率', subGoals: 10, progress: 25, priority: 'P0', owner: '郑明辉', deadline: '2024-12-31', status: '进行中' },
    { key: '13', code: 'TG013', projectName: '高端产品研发', mainGoal: '进军高端市场', subGoals: 7, progress: 50, priority: 'P0', owner: '孙晓东', deadline: '2024-11-30', status: '进行中' },
    { key: '14', code: 'TG014', projectName: '环保材料应用', mainGoal: '实现绿色生产', subGoals: 5, progress: 35, priority: 'P2', owner: '钱学森', deadline: '2024-09-30', status: '进行中' },
    { key: '15', code: 'TG015', projectName: '品牌年轻化战略', mainGoal: '吸引年轻消费者', subGoals: 6, progress: 15, priority: 'P1', owner: '朱国强', deadline: '2024-12-31', status: '规划中' }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">设计策划数字化</h1>
        <p className="page-description">
          市场分析报告生成、设计目标智能分解
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {/* 市场分析报告生成 Tab */}
        <TabPane tab="市场分析报告生成" key="market-report" icon={<FileTextOutlined />}>
          <Card
            title="市场分析报告生成"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建报告</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="报告总数" value={15} suffix="份" />
              </Col>
              <Col span={6}>
                <Statistic title="已完成" value={9} suffix="份" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="生成中" value={3} suffix="份" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="总下载量" value={1283} suffix="次" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '报告编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '报告名称', dataIndex: 'reportName', key: 'reportName' },
                { title: '区域', dataIndex: 'region', key: 'region', width: 100 },
                { title: '类别', dataIndex: 'category', key: 'category', width: 100 },
                { title: '创建日期', dataIndex: 'createDate', key: 'createDate', width: 110 },
                { title: '创建人', dataIndex: 'creator', key: 'creator', width: 90 },
                { title: '页数', dataIndex: 'pages', key: 'pages', width: 70, render: (p: number) => (
                  <span>{p > 0 ? `${p}页` : '-'}</span>
                )},
                { title: '下载量', dataIndex: 'downloads', key: 'downloads', width: 80 },
                { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: (s: string) => {
                  const colors: Record<string, string> = { '已完成': 'success', '生成中': 'processing', '待生成': 'default' }
                  return <Tag color={colors[s]}>{s}</Tag>
                }},
                { title: '操作', key: 'action', width: 180, render: (_, record: any) => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    {record.status === '已完成' && (
                      <Button type="link" size="small" icon={<DownloadOutlined />}>下载</Button>
                    )}
                  </Space>
                )}
              ]}
              dataSource={marketReportData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1250 }}
            />
          </Card>
        </TabPane>

        {/* 设计目标智能分解 Tab */}
        <TabPane tab="设计目标智能分解" key="target" icon={<AimOutlined />}>
          <Card
            title="设计目标智能分解"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建目标</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="项目总数" value={15} suffix="个" />
              </Col>
              <Col span={6}>
                <Statistic title="进行中" value={12} suffix="个" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="已完成" value={2} suffix="个" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="平均进度" value={58} suffix="%" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '目标编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '项目名称', dataIndex: 'projectName', key: 'projectName' },
                { title: '主目标', dataIndex: 'mainGoal', key: 'mainGoal', width: 130 },
                { title: '子目标数', dataIndex: 'subGoals', key: 'subGoals', width: 90, render: (n: number) => `${n}个` },
                { title: '完成进度', dataIndex: 'progress', key: 'progress', width: 130, render: (p: number) => (
                  <Progress percent={p} size="small" status={p === 100 ? 'success' : p >= 60 ? 'active' : 'normal'} />
                )},
                { title: '优先级', dataIndex: 'priority', key: 'priority', width: 80, render: (p: string) => {
                  const colors: Record<string, string> = { 'P0': 'error', 'P1': 'warning', 'P2': 'default' }
                  return <Tag color={colors[p]}>{p}</Tag>
                }},
                { title: '负责人', dataIndex: 'owner', key: 'owner', width: 90 },
                { title: '截止日期', dataIndex: 'deadline', key: 'deadline', width: 110 },
                { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: (s: string) => {
                  const colors: Record<string, string> = { '已完成': 'success', '进行中': 'processing', '规划中': 'default' }
                  return <Tag color={colors[s]}>{s}</Tag>
                }},
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                  </Space>
                )}
              ]}
              dataSource={targetData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1350 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default DesignPlanning
