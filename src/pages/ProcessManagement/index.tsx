import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress } from 'antd'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  EditOutlined,
  EyeOutlined,
  FileTextOutlined,
  HistoryOutlined,
  NodeIndexOutlined,
  PlusOutlined,
  SyncOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'standard': 'standard',
  'first-batch': 'first-batch',
  'mapping': 'mapping',
  'version': 'version',
}

const PATH_TAB_MAP: Record<string, string> = {
  'standard': 'standard',
  'first-batch': 'first-batch',
  'mapping': 'mapping',
  'version': 'version',
}

// ==================== Tab 1: 工艺标准协同与下发 ====================
const standardData = [
  { key: '1', code: 'GY-STD-001', name: '黄山(硬红)制丝工艺标准', productLine: '制丝线A', type: '制丝工艺', version: 'V3.2', status: '已下发', issueDate: '2024-03-01', factory: '合肥卷烟厂' },
  { key: '2', code: 'GY-STD-002', name: '皖烟(硬红)卷接包工艺标准', productLine: '卷包线B', type: '卷接包工艺', version: 'V2.8', status: '审核中', issueDate: '2024-03-05', factory: '蚌埠卷烟厂' },
  { key: '3', code: 'GY-STD-003', name: '黄山(软蓝)烘丝工艺参数', productLine: '制丝线C', type: '烘丝工艺', version: 'V4.1', status: '已下发', issueDate: '2024-03-08', factory: '芜湖卷烟厂' },
  { key: '4', code: 'GY-STD-004', name: '皖烟(软金)加料工艺标准', productLine: '加料线A', type: '加料工艺', version: 'V2.5', status: '待审核', issueDate: '2024-03-10', factory: '合肥卷烟厂' },
  { key: '5', code: 'GY-STD-005', name: '黄山(硬金)切丝工艺参数', productLine: '切丝线B', type: '切丝工艺', version: 'V3.0', status: '已下发', issueDate: '2024-03-12', factory: '滁州卷烟厂' },
  { key: '6', code: 'GY-STD-006', name: '皖烟(中支)卷烟工艺标准', productLine: '卷烟线C', type: '卷烟工艺', version: 'V1.8', status: '审核中', issueDate: '2024-03-15', factory: '阜阳卷烟厂' },
  { key: '7', code: 'GY-STD-007', name: '黄山(细支)接装工艺参数', productLine: '接装线A', type: '接装工艺', version: 'V2.2', status: '已下发', issueDate: '2024-03-18', factory: '合肥卷烟厂' },
  { key: '8', code: 'GY-STD-008', name: '皖烟(爆珠)包装工艺标准', productLine: '包装线B', type: '包装工艺', version: 'V3.5', status: '待审核', issueDate: '2024-03-20', factory: '蚌埠卷烟厂' },
  { key: '9', code: 'GY-STD-009', name: '黄山(天都)膨胀烟丝工艺', productLine: '膨丝线A', type: '膨胀工艺', version: 'V2.0', status: '已下发', issueDate: '2024-03-22', factory: '芜湖卷烟厂' },
  { key: '10', code: 'GY-STD-010', name: '皖烟(徽商)梗丝制备工艺', productLine: '梗丝线B', type: '梗丝工艺', version: 'V1.5', status: '审核中', issueDate: '2024-03-25', factory: '滁州卷烟厂' },
  { key: '11', code: 'GY-STD-011', name: '黄山(迎客松)回潮工艺参数', productLine: '回潮线C', type: '回潮工艺', version: 'V2.8', status: '已下发', issueDate: '2024-03-28', factory: '合肥卷烟厂' },
  { key: '12', code: 'GY-STD-012', name: '皖烟(黄金叶)储丝工艺标准', productLine: '储丝线A', type: '储丝工艺', version: 'V3.2', status: '待审核', issueDate: '2024-04-01', factory: '阜阳卷烟厂' },
  { key: '13', code: 'GY-STD-013', name: '黄山(新概念)加香工艺参数', productLine: '加香线B', type: '加香工艺', version: 'V4.0', status: '已下发', issueDate: '2024-04-05', factory: '蚌埠卷烟厂' },
  { key: '14', code: 'GY-STD-014', name: '皖烟(国宾)滤嘴成型工艺', productLine: '滤棒线C', type: '滤嘴工艺', version: 'V2.3', status: '审核中', issueDate: '2024-04-08', factory: '芜湖卷烟厂' },
  { key: '15', code: 'GY-STD-015', name: '黄山(1993)综合制丝工艺', productLine: '制丝线D', type: '综合工艺', version: 'V5.0', status: '已下发', issueDate: '2024-04-10', factory: '合肥卷烟厂' },
]

// ==================== Tab 2: 首批生产数据跟踪 ====================
const firstBatchData = [
  { key: '1', batchNo: 'FB-2024-001', productName: '黄山(硬红)', batchSize: '50万支', startTime: '2024-03-01 08:00', endTime: '2024-03-01 16:30', progress: 100, status: '已完成', qualityScore: 98.5, operator: '张三' },
  { key: '2', batchNo: 'FB-2024-002', productName: '皖烟(软金)', batchSize: '30万支', startTime: '2024-03-02 08:00', endTime: '2024-03-02 14:00', progress: 100, status: '已完成', qualityScore: 97.2, operator: '李四' },
  { key: '3', batchNo: 'FB-2024-003', productName: '黄山(细支)', batchSize: '40万支', startTime: '2024-03-05 08:00', endTime: '-', progress: 75, status: '生产中', qualityScore: 96.8, operator: '王五' },
  { key: '4', batchNo: 'FB-2024-004', productName: '皖烟(中支)', batchSize: '25万支', startTime: '2024-03-08 08:00', endTime: '-', progress: 60, status: '生产中', qualityScore: 95.5, operator: '赵六' },
  { key: '5', batchNo: 'FB-2024-005', productName: '黄山(天都)', batchSize: '35万支', startTime: '2024-03-10 08:00', endTime: '2024-03-10 17:00', progress: 100, status: '已完成', qualityScore: 99.1, operator: '钱七' },
  { key: '6', batchNo: 'FB-2024-006', productName: '皖烟(徽商)', batchSize: '45万支', startTime: '2024-03-12 08:00', endTime: '-', progress: 45, status: '生产中', qualityScore: 94.8, operator: '孙八' },
  { key: '7', batchNo: 'FB-2024-007', productName: '黄山(1993)', batchSize: '20万支', startTime: '2024-03-15 08:00', endTime: '2024-03-15 12:00', progress: 100, status: '已完成', qualityScore: 98.8, operator: '周九' },
  { key: '8', batchNo: 'FB-2024-008', productName: '皖烟(国宾)', batchSize: '55万支', startTime: '2024-03-18 08:00', endTime: '-', progress: 30, status: '生产中', qualityScore: 96.2, operator: '吴十' },
  { key: '9', batchNo: 'FB-2024-009', productName: '黄山(迎客松)', batchSize: '60万支', startTime: '2024-03-20 08:00', endTime: '2024-03-20 18:30', progress: 100, status: '已完成', qualityScore: 97.9, operator: '郑一' },
  { key: '10', batchNo: 'FB-2024-010', productName: '皖烟(爆珠)', batchSize: '15万支', startTime: '2024-03-22 08:00', endTime: '-', progress: 85, status: '生产中', qualityScore: 95.0, operator: '王二' },
  { key: '11', batchNo: 'FB-2024-011', productName: '黄山(软蓝)', batchSize: '38万支', startTime: '2024-03-25 08:00', endTime: '2024-03-25 15:30', progress: 100, status: '已完成', qualityScore: 98.2, operator: '李三' },
  { key: '12', batchNo: 'FB-2024-012', productName: '皖烟(黄金叶)', batchSize: '42万支', startTime: '2024-03-28 08:00', endTime: '-', progress: 55, status: '生产中', qualityScore: 96.5, operator: '张四' },
  { key: '13', batchNo: 'FB-2024-013', productName: '黄山(硬金)', batchSize: '28万支', startTime: '2024-04-01 08:00', endTime: '2024-04-01 13:00', progress: 100, status: '已完成', qualityScore: 99.0, operator: '刘五' },
  { key: '14', batchNo: 'FB-2024-014', productName: '皖烟(硬红)', batchSize: '48万支', startTime: '2024-04-05 08:00', endTime: '-', progress: 20, status: '生产中', qualityScore: 94.5, operator: '陈六' },
  { key: '15', batchNo: 'FB-2024-015', productName: '黄山(新概念)', batchSize: '32万支', startTime: '2024-04-08 08:00', endTime: '-', progress: 10, status: '待生产', qualityScore: 0, operator: '杨七' },
]

// ==================== Tab 3: 工艺-质量映射分析 ====================
const mappingData = [
  { key: '1', analysisId: 'MAP-001', processParam: '烘丝温度', paramValue: '120±5°C', qualityIndex: '焦油含量', correlation: 0.85, impact: '强正相关', suggestion: '温度上升1°C，焦油增加0.2mg', createTime: '2024-03-01' },
  { key: '2', analysisId: 'MAP-002', processParam: '切丝宽度', paramValue: '0.9±0.05mm', qualityIndex: '抽吸阻力', correlation: 0.78, impact: '强正相关', suggestion: '宽度增加0.1mm，阻力增加50Pa', createTime: '2024-03-05' },
  { key: '3', analysisId: 'MAP-003', processParam: '加料比例', paramValue: '8.5±0.5%', qualityIndex: '香气质量', correlation: 0.92, impact: '强正相关', suggestion: '加料每增1%，香气评分+0.5', createTime: '2024-03-08' },
  { key: '4', analysisId: 'MAP-004', processParam: '卷烟速度', paramValue: '8000支/分', qualityIndex: '空头率', correlation: -0.65, impact: '中等负相关', suggestion: '速度过快会增加空头率', createTime: '2024-03-10' },
  { key: '5', analysisId: 'MAP-005', processParam: '含水率', paramValue: '12.5±0.5%', qualityIndex: '烟丝弹性', correlation: 0.88, impact: '强正相关', suggestion: '含水率是弹性的关键因素', createTime: '2024-03-12' },
  { key: '6', analysisId: 'MAP-006', processParam: '膨胀率', paramValue: '35±3%', qualityIndex: '填充值', correlation: 0.95, impact: '强正相关', suggestion: '膨胀率直接决定填充效果', createTime: '2024-03-15' },
  { key: '7', analysisId: 'MAP-007', processParam: '接装胶量', paramValue: '0.8±0.1g/千支', qualityIndex: '滤嘴脱落率', correlation: -0.72, impact: '强负相关', suggestion: '胶量不足易脱落', createTime: '2024-03-18' },
  { key: '8', analysisId: 'MAP-008', processParam: '回潮温度', paramValue: '65±3°C', qualityIndex: '叶片完整度', correlation: 0.68, impact: '中等正相关', suggestion: '温度适中减少碎片', createTime: '2024-03-20' },
  { key: '9', analysisId: 'MAP-009', processParam: '储丝时间', paramValue: '4-8小时', qualityIndex: '香气均匀度', correlation: 0.75, impact: '强正相关', suggestion: '充分储丝改善均匀性', createTime: '2024-03-22' },
  { key: '10', analysisId: 'MAP-010', processParam: '加香浓度', paramValue: '0.15±0.02%', qualityIndex: '口感评分', correlation: 0.89, impact: '强正相关', suggestion: '加香是口感关键', createTime: '2024-03-25' },
  { key: '11', analysisId: 'MAP-011', processParam: '压实密度', paramValue: '0.52±0.02g/cm³', qualityIndex: '燃烧均匀性', correlation: 0.82, impact: '强正相关', suggestion: '密度均匀燃烧好', createTime: '2024-03-28' },
  { key: '12', analysisId: 'MAP-012', processParam: '滤嘴长度', paramValue: '27±1mm', qualityIndex: '焦油过滤效率', correlation: 0.91, impact: '强正相关', suggestion: '长度影响过滤', createTime: '2024-04-01' },
  { key: '13', analysisId: 'MAP-013', processParam: '包装湿度', paramValue: '60±5%RH', qualityIndex: '产品保鲜度', correlation: 0.76, impact: '强正相关', suggestion: '湿度控制保鲜', createTime: '2024-04-05' },
  { key: '14', analysisId: 'MAP-014', processParam: '梗丝比例', paramValue: '15±2%', qualityIndex: '成本控制', correlation: 0.85, impact: '强正相关', suggestion: '梗丝比例影响成本', createTime: '2024-04-08' },
  { key: '15', analysisId: 'MAP-015', processParam: '综合评分', paramValue: '各参数加权', qualityIndex: '产品综合品质', correlation: 0.96, impact: '强正相关', suggestion: '多参数协同优化', createTime: '2024-04-10' },
]

// ==================== Tab 4: 工艺标准版本管理 ====================
const versionData = [
  { key: '1', versionId: 'VER-001', standardName: '黄山(硬红)制丝工艺标准', currentVersion: 'V3.2', previousVersion: 'V3.1', changeType: '参数优化', changeContent: '烘丝温度调整为120°C', effectiveDate: '2024-03-01', approver: '技术总监' },
  { key: '2', versionId: 'VER-002', standardName: '皖烟(软金)卷接包工艺标准', currentVersion: 'V2.8', previousVersion: 'V2.7', changeType: '新增内容', changeContent: '新增爆珠工艺参数', effectiveDate: '2024-03-05', approver: '工艺经理' },
  { key: '3', versionId: 'VER-003', standardName: '黄山(细支)接装工艺参数', currentVersion: 'V2.2', previousVersion: 'V2.1', changeType: '参数修订', changeContent: '接装胶量调整', effectiveDate: '2024-03-08', approver: '质量总监' },
  { key: '4', versionId: 'VER-004', standardName: '皖烟(中支)卷烟工艺标准', currentVersion: 'V1.8', previousVersion: 'V1.7', changeType: '格式调整', changeContent: '统一文档格式', effectiveDate: '2024-03-10', approver: '技术总监' },
  { key: '5', versionId: 'VER-005', standardName: '黄山(天都)膨胀烟丝工艺', currentVersion: 'V2.0', previousVersion: 'V1.9', changeType: '重大修订', changeContent: '膨胀工艺全面升级', effectiveDate: '2024-03-12', approver: '总工程师' },
  { key: '6', versionId: 'VER-006', standardName: '皖烟(徽商)梗丝制备工艺', currentVersion: 'V1.5', previousVersion: 'V1.4', changeType: '参数优化', changeContent: '梗丝比例微调', effectiveDate: '2024-03-15', approver: '工艺经理' },
  { key: '7', versionId: 'VER-007', standardName: '黄山(迎客松)回潮工艺参数', currentVersion: 'V2.8', previousVersion: 'V2.7', changeType: '参数修订', changeContent: '回潮温度调整', effectiveDate: '2024-03-18', approver: '质量总监' },
  { key: '8', versionId: 'VER-008', standardName: '皖烟(国宾)滤嘴成型工艺', currentVersion: 'V2.3', previousVersion: 'V2.2', changeType: '新增内容', changeContent: '新增复合滤嘴参数', effectiveDate: '2024-03-20', approver: '技术总监' },
  { key: '9', versionId: 'VER-009', standardName: '黄山(1993)综合制丝工艺', currentVersion: 'V5.0', previousVersion: 'V4.9', changeType: '重大修订', changeContent: '全流程工艺优化', effectiveDate: '2024-03-22', approver: '总工程师' },
  { key: '10', versionId: 'VER-010', standardName: '皖烟(爆珠)包装工艺标准', currentVersion: 'V3.5', previousVersion: 'V3.4', changeType: '参数优化', changeContent: '爆珠注入量调整', effectiveDate: '2024-03-25', approver: '工艺经理' },
  { key: '11', versionId: 'VER-011', standardName: '黄山(软蓝)烘丝工艺参数', currentVersion: 'V4.1', previousVersion: 'V4.0', changeType: '参数修订', changeContent: '烘丝时间优化', effectiveDate: '2024-03-28', approver: '质量总监' },
  { key: '12', versionId: 'VER-012', standardName: '皖烟(黄金叶)储丝工艺标准', currentVersion: 'V3.2', previousVersion: 'V3.1', changeType: '格式调整', changeContent: '工艺流程图更新', effectiveDate: '2024-04-01', approver: '技术总监' },
  { key: '13', versionId: 'VER-013', standardName: '黄山(新概念)加香工艺参数', currentVersion: 'V4.0', previousVersion: 'V3.9', changeType: '新增内容', changeContent: '新增天然香料配方', effectiveDate: '2024-04-05', approver: '总工程师' },
  { key: '14', versionId: 'VER-014', standardName: '皖烟(硬红)加料工艺标准', currentVersion: 'V2.5', previousVersion: 'V2.4', changeType: '参数优化', changeContent: '加料配比微调', effectiveDate: '2024-04-08', approver: '工艺经理' },
  { key: '15', versionId: 'VER-015', standardName: '黄山(硬金)切丝工艺参数', currentVersion: 'V3.0', previousVersion: 'V2.9', changeType: '重大修订', changeContent: '切丝精度提升', effectiveDate: '2024-04-10', approver: '质量总监' },
]

// 状态颜色映射
const statusColorMap: Record<string, string> = {
  '已下发': 'green',
  '审核中': 'blue',
  '待审核': 'orange',
  '已完成': 'green',
  '生产中': 'processing',
  '待生产': 'default',
}

const changeTypeColorMap: Record<string, string> = {
  '参数优化': 'blue',
  '新增内容': 'green',
  '参数修订': 'orange',
  '格式调整': 'default',
  '重大修订': 'red',
}

const impactColorMap: Record<string, string> = {
  '强正相关': 'green',
  '中等正相关': 'blue',
  '中等负相关': 'orange',
  '强负相关': 'red',
}

const ProcessManagement: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // 从 URL 获取当前子路径
  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'standard'
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
    navigate(`/process-management/${path}`)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">工艺管理</h1>
        <p className="page-description">
          工艺标准协同与下发、首批生产数据跟踪、工艺-质量映射分析
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>

        {/* Tab 1: 工艺标准协同与下发 */}
        <TabPane tab="工艺标准协同与下发" key="standard" icon={<FileTextOutlined />}>
          <Card title="工艺标准协同与下发" extra={<Button type="primary" icon={<PlusOutlined />}>新建标准</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="工艺标准总数" value={156} suffix="份" />
              </Col>
              <Col span={6}>
                <Statistic title="已下发" value={128} valueStyle={{ color: '#3f8600' }} suffix="份" />
              </Col>
              <Col span={6}>
                <Statistic title="审核中" value={18} valueStyle={{ color: '#1890ff' }} suffix="份" />
              </Col>
              <Col span={6}>
                <Statistic title="下发率" value={82.1} suffix="%" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '标准编号', dataIndex: 'code', key: 'code', width: 120 },
                { title: '标准名称', dataIndex: 'name', key: 'name', width: 200 },
                { title: '生产线', dataIndex: 'productLine', key: 'productLine', width: 100 },
                { title: '工艺类型', dataIndex: 'type', key: 'type', width: 100 },
                { title: '版本', dataIndex: 'version', key: 'version', width: 80 },
                { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
                { title: '下发日期', dataIndex: 'issueDate', key: 'issueDate', width: 110 },
                { title: '执行工厂', dataIndex: 'factory', key: 'factory', width: 110 },
                {
                  title: '操作', key: 'action', width: 150,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={standardData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>

        {/* Tab 2: 首批生产数据跟踪 */}
        <TabPane tab="首批生产数据跟踪" key="first-batch" icon={<SyncOutlined />}>
          <Card title="首批生产数据跟踪" extra={<Button type="primary" icon={<PlusOutlined />}>新建批次</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="首批生产批次" value={45} suffix="批" />
              </Col>
              <Col span={6}>
                <Statistic title="生产中" value={8} valueStyle={{ color: '#1890ff' }} suffix="批" />
              </Col>
              <Col span={6}>
                <Statistic title="已完成" value={35} valueStyle={{ color: '#3f8600' }} suffix="批" />
              </Col>
              <Col span={6}>
                <Statistic title="平均质量评分" value={97.2} suffix="分" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '批次号', dataIndex: 'batchNo', key: 'batchNo', width: 120 },
                { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 120 },
                { title: '批量', dataIndex: 'batchSize', key: 'batchSize', width: 90 },
                { title: '开始时间', dataIndex: 'startTime', key: 'startTime', width: 140 },
                { title: '结束时间', dataIndex: 'endTime', key: 'endTime', width: 140 },
                { title: '进度', dataIndex: 'progress', key: 'progress', width: 150, render: (p: number) => <Progress percent={p} size="small" status={p === 100 ? 'success' : 'active'} /> },
                { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
                { title: '质量评分', dataIndex: 'qualityScore', key: 'qualityScore', width: 90, render: (v: number) => v > 0 ? `${v}分` : '-' },
                { title: '操作员', dataIndex: 'operator', key: 'operator', width: 80 },
                {
                  title: '操作', key: 'action', width: 150,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={firstBatchData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1300 }}
            />
          </Card>
        </TabPane>

        {/* Tab 3: 工艺-质量映射分析 */}
        <TabPane tab="工艺-质量映射分析" key="mapping" icon={<NodeIndexOutlined />}>
          <Card title="工艺-质量映射分析" extra={<Button type="primary" icon={<PlusOutlined />}>新建分析</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="映射分析数" value={128} suffix="项" />
              </Col>
              <Col span={6}>
                <Statistic title="强相关项" value={89} valueStyle={{ color: '#3f8600' }} suffix="项" />
              </Col>
              <Col span={6}>
                <Statistic title="平均相关系数" value={0.82} />
              </Col>
              <Col span={6}>
                <Statistic title="优化建议数" value={56} valueStyle={{ color: '#1890ff' }} suffix="条" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '分析编号', dataIndex: 'analysisId', key: 'analysisId', width: 100 },
                { title: '工艺参数', dataIndex: 'processParam', key: 'processParam', width: 100 },
                { title: '参数值', dataIndex: 'paramValue', key: 'paramValue', width: 120 },
                { title: '质量指标', dataIndex: 'qualityIndex', key: 'qualityIndex', width: 110 },
                { title: '相关系数', dataIndex: 'correlation', key: 'correlation', width: 90 },
                { title: '影响程度', dataIndex: 'impact', key: 'impact', width: 100, render: (s: string) => <Tag color={impactColorMap[s]}>{s}</Tag> },
                { title: '优化建议', dataIndex: 'suggestion', key: 'suggestion', ellipsis: true },
                { title: '分析日期', dataIndex: 'createTime', key: 'createTime', width: 100 },
                {
                  title: '操作', key: 'action', width: 150,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>详情</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={mappingData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>

        {/* Tab 4: 工艺标准版本管理 */}
        <TabPane tab="工艺标准版本管理" key="version" icon={<HistoryOutlined />}>
          <Card title="工艺标准版本管理" extra={<Button type="primary" icon={<PlusOutlined />}>新建版本</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="版本记录数" value={245} suffix="条" />
              </Col>
              <Col span={6}>
                <Statistic title="本月变更" value={18} valueStyle={{ color: '#1890ff' }} suffix="次" />
              </Col>
              <Col span={6}>
                <Statistic title="重大修订" value={5} valueStyle={{ color: '#cf1322' }} suffix="次" />
              </Col>
              <Col span={6}>
                <Statistic title="平均版本号" value={2.8} />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '版本ID', dataIndex: 'versionId', key: 'versionId', width: 100 },
                { title: '标准名称', dataIndex: 'standardName', key: 'standardName', width: 200 },
                { title: '当前版本', dataIndex: 'currentVersion', key: 'currentVersion', width: 90 },
                { title: '原版本', dataIndex: 'previousVersion', key: 'previousVersion', width: 90 },
                { title: '变更类型', dataIndex: 'changeType', key: 'changeType', width: 100, render: (s: string) => <Tag color={changeTypeColorMap[s]}>{s}</Tag> },
                { title: '变更内容', dataIndex: 'changeContent', key: 'changeContent', ellipsis: true },
                { title: '生效日期', dataIndex: 'effectiveDate', key: 'effectiveDate', width: 100 },
                { title: '审批人', dataIndex: 'approver', key: 'approver', width: 90 },
                {
                  title: '操作', key: 'action', width: 150,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<HistoryOutlined />}>历史</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={versionData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ProcessManagement
