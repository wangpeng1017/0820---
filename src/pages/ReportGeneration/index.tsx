import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress } from 'antd'
import {
  EditOutlined,
  EyeOutlined,
  FileTextOutlined,
  PlusOutlined,
  DownloadOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'auto': 'auto',
}

const PATH_TAB_MAP: Record<string, string> = {
  'auto': 'auto',
}

const ReportGeneration: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'auto'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())

  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/report-generation/${path}`)
  }

  // 研发报告一键生成数据
  const reportData = [
    { key: '1', code: 'RPT001', reportName: '黄山（软）新品研发总结报告', type: '新品研发', project: '黄山软包升级项目', creator: '张建国', createDate: '2024-03-01', status: '已生成', progress: 100, pages: 45 },
    { key: '2', code: 'RPT002', reportName: '皖烟蜜甜香配方优化报告', type: '配方优化', project: '皖烟香型改进', creator: '李明华', createDate: '2024-03-02', status: '生成中', progress: 75, pages: 0 },
    { key: '3', code: 'RPT003', reportName: '2024年Q1市场调研分析报告', type: '市场分析', project: '市场洞察项目', creator: '王志强', createDate: '2024-03-03', status: '已生成', progress: 100, pages: 68 },
    { key: '4', code: 'RPT004', reportName: '细支卷烟工艺改进技术报告', type: '工艺改进', project: '细支产品优化', creator: '陈伟明', createDate: '2024-03-04', status: '已生成', progress: 100, pages: 52 },
    { key: '5', code: 'RPT005', reportName: '香精香料质量检测月度报告', type: '质量检测', project: '质量管理体系', creator: '刘德华', createDate: '2024-03-05', status: '生成中', progress: 60, pages: 0 },
    { key: '6', code: 'RPT006', reportName: '黄山迎客松配方稳定性研究报告', type: '稳定性研究', project: '高端产品研发', creator: '赵国庆', createDate: '2024-03-06', status: '已生成', progress: 100, pages: 38 },
    { key: '7', code: 'RPT007', reportName: '烟叶原料采购分析报告', type: '原料分析', project: '原料管理优化', creator: '周建军', createDate: '2024-03-07', status: '待生成', progress: 0, pages: 0 },
    { key: '8', code: 'RPT008', reportName: '在线试验数据统计分析报告', type: '试验分析', project: '试验管理系统', creator: '吴晓明', createDate: '2024-03-08', status: '生成中', progress: 45, pages: 0 },
    { key: '9', code: 'RPT009', reportName: '包装设计创新方案评审报告', type: '设计评审', project: '包装创新项目', creator: '黄志远', createDate: '2024-03-09', status: '已生成', progress: 100, pages: 28 },
    { key: '10', code: 'RPT010', reportName: '辅料应用效果对比分析报告', type: '辅料分析', project: '辅料优化项目', creator: '林志伟', createDate: '2024-03-10', status: '已生成', progress: 100, pages: 42 },
    { key: '11', code: 'RPT011', reportName: '新产品感官评价综合报告', type: '感官评价', project: '新品评价体系', creator: '杨建华', createDate: '2024-03-11', status: '待生成', progress: 0, pages: 0 },
    { key: '12', code: 'RPT012', reportName: 'LIMS系统运行年度总结报告', type: '系统总结', project: 'LIMS系统建设', creator: '郑明辉', createDate: '2024-03-12', status: '生成中', progress: 30, pages: 0 },
    { key: '13', code: 'RPT013', reportName: '竞品分析与市场定位报告', type: '竞品分析', project: '市场战略规划', creator: '孙晓东', createDate: '2024-03-13', status: '已生成', progress: 100, pages: 55 },
    { key: '14', code: 'RPT014', reportName: '工艺参数优化实验总结报告', type: '工艺优化', project: '工艺改进项目', creator: '钱学森', createDate: '2024-03-14', status: '已生成', progress: 100, pages: 48 },
    { key: '15', code: 'RPT015', reportName: '研发项目进度汇总报告', type: '项目汇总', project: '综合管理', creator: '朱国强', createDate: '2024-03-15', status: '待生成', progress: 0, pages: 0 }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">定型与输出数字化</h1>
        <p className="page-description">
          研发报告一键生成
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="研发报告一键生成" key="auto" icon={<FileTextOutlined />}>
          <Card
            title="研发报告一键生成"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建报告</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="报告总数" value={15} suffix="份" />
              </Col>
              <Col span={6}>
                <Statistic title="已生成" value={8} suffix="份" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="生成中" value={4} suffix="份" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="总页数" value={376} suffix="页" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '报告编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '报告名称', dataIndex: 'reportName', key: 'reportName' },
                { title: '报告类型', dataIndex: 'type', key: 'type', width: 100 },
                { title: '关联项目', dataIndex: 'project', key: 'project', width: 130 },
                { title: '创建人', dataIndex: 'creator', key: 'creator', width: 90 },
                { title: '创建日期', dataIndex: 'createDate', key: 'createDate', width: 110 },
                { title: '生成进度', dataIndex: 'progress', key: 'progress', width: 130, render: (p: number) => (
                  <Progress percent={p} size="small" status={p === 100 ? 'success' : p === 0 ? 'exception' : 'active'} />
                )},
                { title: '页数', dataIndex: 'pages', key: 'pages', width: 70, render: (p: number) => (
                  <span>{p > 0 ? `${p}页` : '-'}</span>
                )},
                { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: (s: string) => {
                  const colors: Record<string, string> = { '已生成': 'success', '生成中': 'processing', '待生成': 'default' }
                  return <Tag color={colors[s]}>{s}</Tag>
                }},
                { title: '操作', key: 'action', width: 180, render: (_, record: any) => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>预览</Button>
                    {record.status === '已生成' && (
                      <Button type="link" size="small" icon={<DownloadOutlined />}>下载</Button>
                    )}
                    {record.status === '待生成' && (
                      <Button type="link" size="small" icon={<CheckCircleOutlined />}>生成</Button>
                    )}
                  </Space>
                )}
              ]}
              dataSource={reportData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1350 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ReportGeneration
