import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress } from 'antd'
import {
  AuditOutlined,
  BgColorsOutlined,
  CheckCircleOutlined,
  EditOutlined,
  EyeOutlined,
  FileImageOutlined,
  PictureOutlined,
  PlusOutlined,
  SafetyOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'creative': 'creative',
  'compliance': 'compliance',
  'artwork': 'artwork',
  'printing': 'printing',
}

const PATH_TAB_MAP: Record<string, string> = {
  'creative': 'creative',
  'compliance': 'compliance',
  'artwork': 'artwork',
  'printing': 'printing',
}

// ==================== Tab 1: 包装创意设计 ====================
const creativeData = [
  { key: '1', designCode: 'PKG-001', productName: '黄山(硬红)', designTheme: '徽派文化', colorScheme: '中国红+金', designer: '张设计', progress: 100, status: '已定稿', createTime: '2024-03-01' },
  { key: '2', designCode: 'PKG-002', productName: '皖烟(软金)', designTheme: '商务经典', colorScheme: '金色+深蓝', designer: '李设计', progress: 85, status: '修改中', createTime: '2024-03-05' },
  { key: '3', designCode: 'PKG-003', productName: '黄山(细支)', designTheme: '时尚简约', colorScheme: '银白+浅蓝', designer: '王设计', progress: 100, status: '已定稿', createTime: '2024-03-08' },
  { key: '4', designCode: 'PKG-004', productName: '皖烟(中支)', designTheme: '现代都市', colorScheme: '灰+橙', designer: '赵设计', progress: 60, status: '设计中', createTime: '2024-03-10' },
  { key: '5', designCode: 'PKG-005', productName: '黄山(天都)', designTheme: '山水意境', colorScheme: '墨绿+金', designer: '张设计', progress: 100, status: '已定稿', createTime: '2024-03-12' },
  { key: '6', designCode: 'PKG-006', productName: '皖烟(爆珠)', designTheme: '活力青春', colorScheme: '蓝绿渐变', designer: '陈设计', progress: 70, status: '设计中', createTime: '2024-03-15' },
  { key: '7', designCode: 'PKG-007', productName: '黄山(迎客松)', designTheme: '迎客松图腾', colorScheme: '松绿+金', designer: '李设计', progress: 100, status: '已定稿', createTime: '2024-03-18' },
  { key: '8', designCode: 'PKG-008', productName: '皖烟(徽商)', designTheme: '徽商文化', colorScheme: '古铜+深红', designer: '王设计', progress: 45, status: '待审核', createTime: '2024-03-20' },
  { key: '9', designCode: 'PKG-009', productName: '黄山(1993)', designTheme: '怀旧经典', colorScheme: '复古红+金', designer: '张设计', progress: 100, status: '已定稿', createTime: '2024-03-22' },
  { key: '10', designCode: 'PKG-010', productName: '皖烟(国宾)', designTheme: '国礼风范', colorScheme: '中国红+金龙', designer: '赵设计', progress: 90, status: '修改中', createTime: '2024-03-25' },
  { key: '11', designCode: 'PKG-011', productName: '黄山(软蓝)', designTheme: '清新淡雅', colorScheme: '天蓝+银', designer: '陈设计', progress: 100, status: '已定稿', createTime: '2024-03-28' },
  { key: '12', designCode: 'PKG-012', productName: '皖烟(黄金叶)', designTheme: '金秋丰收', colorScheme: '金黄+棕', designer: '李设计', progress: 35, status: '设计中', createTime: '2024-04-01' },
  { key: '13', designCode: 'PKG-013', productName: '黄山(新概念)', designTheme: '科技未来', colorScheme: '渐变蓝紫', designer: '王设计', progress: 55, status: '设计中', createTime: '2024-04-05' },
  { key: '14', designCode: 'PKG-014', productName: '皖烟(硬红)', designTheme: '传统经典', colorScheme: '大红+金边', designer: '张设计', progress: 100, status: '已定稿', createTime: '2024-04-08' },
  { key: '15', designCode: 'PKG-015', productName: '黄山(硬金)', designTheme: '尊贵典雅', colorScheme: '香槟金+深棕', designer: '赵设计', progress: 100, status: '已定稿', createTime: '2024-04-10' },
]

// ==================== Tab 2: 合规性审查 ====================
const complianceData = [
  { key: '1', reviewCode: 'REV-001', designCode: 'PKG-001', productName: '黄山(硬红)', warningText: '吸烟有害健康', warningArea: '≥35%', healthTip: '戒烟可降低风险', reviewer: '审核员A', result: '通过', reviewTime: '2024-03-02' },
  { key: '2', reviewCode: 'REV-002', designCode: 'PKG-002', productName: '皖烟(软金)', warningText: '吸烟有害健康', warningArea: '32%', healthTip: '戒烟可降低风险', reviewer: '审核员B', result: '需修改', reviewTime: '2024-03-06' },
  { key: '3', reviewCode: 'REV-003', designCode: 'PKG-003', productName: '黄山(细支)', warningText: '吸烟有害健康', warningArea: '≥35%', healthTip: '尽早戒烟有益健康', reviewer: '审核员A', result: '通过', reviewTime: '2024-03-09' },
  { key: '4', reviewCode: 'REV-004', designCode: 'PKG-004', productName: '皖烟(中支)', warningText: '吸烟有害健康', warningArea: '30%', healthTip: '戒烟可降低风险', reviewer: '审核员C', result: '待审核', reviewTime: '2024-03-11' },
  { key: '5', reviewCode: 'REV-005', designCode: 'PKG-005', productName: '黄山(天都)', warningText: '吸烟有害健康', warningArea: '≥35%', healthTip: '请勿向未成年人售烟', reviewer: '审核员A', result: '通过', reviewTime: '2024-03-13' },
  { key: '6', reviewCode: 'REV-006', designCode: 'PKG-006', productName: '皖烟(爆珠)', warningText: '吸烟有害健康', warningArea: '33%', healthTip: '戒烟可降低风险', reviewer: '审核员B', result: '需修改', reviewTime: '2024-03-16' },
  { key: '7', reviewCode: 'REV-007', designCode: 'PKG-007', productName: '黄山(迎客松)', warningText: '吸烟有害健康', warningArea: '≥35%', healthTip: '尽早戒烟有益健康', reviewer: '审核员A', result: '通过', reviewTime: '2024-03-19' },
  { key: '8', reviewCode: 'REV-008', designCode: 'PKG-008', productName: '皖烟(徽商)', warningText: '吸烟有害健康', warningArea: '28%', healthTip: '戒烟可降低风险', reviewer: '审核员C', result: '待审核', reviewTime: '2024-03-21' },
  { key: '9', reviewCode: 'REV-009', designCode: 'PKG-009', productName: '黄山(1993)', warningText: '吸烟有害健康', warningArea: '≥35%', healthTip: '请勿向未成年人售烟', reviewer: '审核员A', result: '通过', reviewTime: '2024-03-23' },
  { key: '10', reviewCode: 'REV-010', designCode: 'PKG-010', productName: '皖烟(国宾)', warningText: '吸烟有害健康', warningArea: '34%', healthTip: '尽早戒烟有益健康', reviewer: '审核员B', result: '需修改', reviewTime: '2024-03-26' },
  { key: '11', reviewCode: 'REV-011', designCode: 'PKG-011', productName: '黄山(软蓝)', warningText: '吸烟有害健康', warningArea: '≥35%', healthTip: '戒烟可降低风险', reviewer: '审核员A', result: '通过', reviewTime: '2024-03-29' },
  { key: '12', reviewCode: 'REV-012', designCode: 'PKG-012', productName: '皖烟(黄金叶)', warningText: '吸烟有害健康', warningArea: '25%', healthTip: '请勿向未成年人售烟', reviewer: '审核员C', result: '待审核', reviewTime: '2024-04-02' },
  { key: '13', reviewCode: 'REV-013', designCode: 'PKG-013', productName: '黄山(新概念)', warningText: '吸烟有害健康', warningArea: '31%', healthTip: '尽早戒烟有益健康', reviewer: '审核员B', result: '需修改', reviewTime: '2024-04-06' },
  { key: '14', reviewCode: 'REV-014', designCode: 'PKG-014', productName: '皖烟(硬红)', warningText: '吸烟有害健康', warningArea: '≥35%', healthTip: '戒烟可降低风险', reviewer: '审核员A', result: '通过', reviewTime: '2024-04-09' },
  { key: '15', reviewCode: 'REV-015', designCode: 'PKG-015', productName: '黄山(硬金)', warningText: '吸烟有害健康', warningArea: '≥35%', healthTip: '请勿向未成年人售烟', reviewer: '审核员A', result: '通过', reviewTime: '2024-04-11' },
]

// ==================== Tab 3: 印刷工艺设计 ====================
const artworkData = [
  { key: '1', artCode: 'ART-001', productName: '黄山(硬红)', printMethod: '凹印+烫金', colorCount: 8, specialProcess: '烫金、压凸', paperType: '白卡纸350g', coating: '亮光膜', status: '已确认', createTime: '2024-03-03' },
  { key: '2', artCode: 'ART-002', productName: '皖烟(软金)', printMethod: '胶印+丝印', colorCount: 6, specialProcess: '丝印UV、烫银', paperType: '金卡纸300g', coating: '哑光膜', status: '制作中', createTime: '2024-03-07' },
  { key: '3', artCode: 'ART-003', productName: '黄山(细支)', printMethod: '凹印', colorCount: 5, specialProcess: '局部UV', paperType: '白卡纸280g', coating: '亮光膜', status: '已确认', createTime: '2024-03-10' },
  { key: '4', artCode: 'ART-004', productName: '皖烟(中支)', printMethod: '胶印', colorCount: 4, specialProcess: '烫银', paperType: '白卡纸300g', coating: '触感膜', status: '设计中', createTime: '2024-03-12' },
  { key: '5', artCode: 'ART-005', productName: '黄山(天都)', printMethod: '凹印+烫金', colorCount: 10, specialProcess: '多次烫金、压纹', paperType: '特种纸400g', coating: '珠光膜', status: '已确认', createTime: '2024-03-14' },
  { key: '6', artCode: 'ART-006', productName: '皖烟(爆珠)', printMethod: '胶印+UV', colorCount: 7, specialProcess: '全息烫印', paperType: '白卡纸320g', coating: '亮光膜', status: '制作中', createTime: '2024-03-17' },
  { key: '7', artCode: 'ART-007', productName: '黄山(迎客松)', printMethod: '凹印', colorCount: 6, specialProcess: '烫金、击凸', paperType: '白卡纸350g', coating: '亮光膜', status: '已确认', createTime: '2024-03-20' },
  { key: '8', artCode: 'ART-008', productName: '皖烟(徽商)', printMethod: '凹印+丝印', colorCount: 8, specialProcess: '古铜烫印', paperType: '特种纸380g', coating: '哑光膜', status: '待确认', createTime: '2024-03-22' },
  { key: '9', artCode: 'ART-009', productName: '黄山(1993)', printMethod: '凹印+烫金', colorCount: 7, specialProcess: '仿古做旧', paperType: '牛皮纸400g', coating: '无膜', status: '已确认', createTime: '2024-03-24' },
  { key: '10', artCode: 'ART-010', productName: '皖烟(国宾)', printMethod: '凹印+多烫', colorCount: 12, specialProcess: '3D烫金、浮雕', paperType: '特种纸450g', coating: '珠光膜', status: '制作中', createTime: '2024-03-27' },
  { key: '11', artCode: 'ART-011', productName: '黄山(软蓝)', printMethod: '胶印', colorCount: 4, specialProcess: '局部UV', paperType: '白卡纸280g', coating: '亮光膜', status: '已确认', createTime: '2024-03-30' },
  { key: '12', artCode: 'ART-012', productName: '皖烟(黄金叶)', printMethod: '胶印', colorCount: 5, specialProcess: '烫金', paperType: '白卡纸300g', coating: '亮光膜', status: '设计中', createTime: '2024-04-03' },
  { key: '13', artCode: 'ART-013', productName: '黄山(新概念)', printMethod: '数码+特印', colorCount: 6, specialProcess: '变色油墨、温变', paperType: '智能纸350g', coating: '特殊膜', status: '研发中', createTime: '2024-04-07' },
  { key: '14', artCode: 'ART-014', productName: '皖烟(硬红)', printMethod: '凹印', colorCount: 5, specialProcess: '烫金', paperType: '白卡纸350g', coating: '亮光膜', status: '已确认', createTime: '2024-04-10' },
  { key: '15', artCode: 'ART-015', productName: '黄山(硬金)', printMethod: '凹印+烫金', colorCount: 9, specialProcess: '多层烫金', paperType: '金卡纸380g', coating: '哑光膜', status: '已确认', createTime: '2024-04-12' },
]

// ==================== Tab 4: 包装打样管理 ====================
const printingData = [
  { key: '1', sampleCode: 'SPL-001', productName: '黄山(硬红)', sampleType: '首样', printFactory: '安徽印刷厂', sampleQty: 500, colorDiff: '≤2ΔE', progress: 100, result: '合格', sampleTime: '2024-03-05' },
  { key: '2', sampleCode: 'SPL-002', productName: '皖烟(软金)', sampleType: '修改样', printFactory: '上海彩印', sampleQty: 300, colorDiff: '3.2ΔE', progress: 80, result: '待复样', sampleTime: '2024-03-10' },
  { key: '3', sampleCode: 'SPL-003', productName: '黄山(细支)', sampleType: '首样', printFactory: '深圳印刷', sampleQty: 400, colorDiff: '≤2ΔE', progress: 100, result: '合格', sampleTime: '2024-03-12' },
  { key: '4', sampleCode: 'SPL-004', productName: '皖烟(中支)', sampleType: '首样', printFactory: '安徽印刷厂', sampleQty: 350, colorDiff: '2.8ΔE', progress: 60, result: '待评审', sampleTime: '2024-03-15' },
  { key: '5', sampleCode: 'SPL-005', productName: '黄山(天都)', sampleType: '量产样', printFactory: '北京华联', sampleQty: 1000, colorDiff: '≤2ΔE', progress: 100, result: '合格', sampleTime: '2024-03-18' },
  { key: '6', sampleCode: 'SPL-006', productName: '皖烟(爆珠)', sampleType: '首样', printFactory: '上海彩印', sampleQty: 400, colorDiff: '3.5ΔE', progress: 70, result: '待复样', sampleTime: '2024-03-20' },
  { key: '7', sampleCode: 'SPL-007', productName: '黄山(迎客松)', sampleType: '首样', printFactory: '安徽印刷厂', sampleQty: 500, colorDiff: '≤2ΔE', progress: 100, result: '合格', sampleTime: '2024-03-22' },
  { key: '8', sampleCode: 'SPL-008', productName: '皖烟(徽商)', sampleType: '首样', printFactory: '深圳印刷', sampleQty: 300, colorDiff: '2.5ΔE', progress: 45, result: '待评审', sampleTime: '2024-03-25' },
  { key: '9', sampleCode: 'SPL-009', productName: '黄山(1993)', sampleType: '量产样', printFactory: '安徽印刷厂', sampleQty: 800, colorDiff: '≤2ΔE', progress: 100, result: '合格', sampleTime: '2024-03-28' },
  { key: '10', sampleCode: 'SPL-010', productName: '皖烟(国宾)', sampleType: '修改样', printFactory: '北京华联', sampleQty: 500, colorDiff: '2.9ΔE', progress: 85, result: '待复样', sampleTime: '2024-04-01' },
  { key: '11', sampleCode: 'SPL-011', productName: '黄山(软蓝)', sampleType: '首样', printFactory: '上海彩印', sampleQty: 400, colorDiff: '≤2ΔE', progress: 100, result: '合格', sampleTime: '2024-04-04' },
  { key: '12', sampleCode: 'SPL-012', productName: '皖烟(黄金叶)', sampleType: '首样', printFactory: '安徽印刷厂', sampleQty: 300, colorDiff: '3.0ΔE', progress: 35, result: '待评审', sampleTime: '2024-04-07' },
  { key: '13', sampleCode: 'SPL-013', productName: '黄山(新概念)', sampleType: '研发样', printFactory: '深圳印刷', sampleQty: 200, colorDiff: '4.0ΔE', progress: 50, result: '研发中', sampleTime: '2024-04-10' },
  { key: '14', sampleCode: 'SPL-014', productName: '皖烟(硬红)', sampleType: '量产样', printFactory: '安徽印刷厂', sampleQty: 1000, colorDiff: '≤2ΔE', progress: 100, result: '合格', sampleTime: '2024-04-12' },
  { key: '15', sampleCode: 'SPL-015', productName: '黄山(硬金)', sampleType: '首样', printFactory: '北京华联', sampleQty: 600, colorDiff: '≤2ΔE', progress: 100, result: '合格', sampleTime: '2024-04-14' },
]

// 状态颜色映射
const statusColorMap: Record<string, string> = {
  '已定稿': 'green',
  '修改中': 'blue',
  '设计中': 'orange',
  '待审核': 'purple',
  '通过': 'green',
  '需修改': 'orange',
  '已确认': 'green',
  '制作中': 'blue',
  '待确认': 'orange',
  '研发中': 'purple',
  '合格': 'green',
  '待复样': 'orange',
  '待评审': 'blue',
}

const PackagingDesign: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'creative'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())

  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/packaging-design/${path}`)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">包装材料数字化设计</h1>
        <p className="page-description">
          包装创意设计、合规性审查、印刷工艺设计、包装打样管理
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>

        {/* Tab 1: 包装创意设计 */}
        <TabPane tab="包装创意设计" key="creative" icon={<PictureOutlined />}>
          <Card title="包装创意设计" extra={<Button type="primary" icon={<PlusOutlined />}>新建设计</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="设计方案数" value={86} suffix="个" /></Col>
              <Col span={6}><Statistic title="已定稿" value={58} valueStyle={{ color: '#3f8600' }} suffix="个" /></Col>
              <Col span={6}><Statistic title="设计中" value={18} valueStyle={{ color: '#1890ff' }} suffix="个" /></Col>
              <Col span={6}><Statistic title="定稿率" value={67.4} suffix="%" /></Col>
            </Row>
            <Table columns={[
              { title: '设计编号', dataIndex: 'designCode', key: 'designCode', width: 100 },
              { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 110 },
              { title: '设计主题', dataIndex: 'designTheme', key: 'designTheme', width: 100 },
              { title: '配色方案', dataIndex: 'colorScheme', key: 'colorScheme', width: 120 },
              { title: '设计师', dataIndex: 'designer', key: 'designer', width: 80 },
              { title: '进度', dataIndex: 'progress', key: 'progress', width: 120, render: (p: number) => <Progress percent={p} size="small" status={p === 100 ? 'success' : 'active'} /> },
              { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 100 },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>预览</Button><Button type="link" size="small" icon={<EditOutlined />}>编辑</Button></Space>) }
            ]} dataSource={creativeData} pagination={{ pageSize: 10 }} scroll={{ x: 1100 }} />
          </Card>
        </TabPane>

        {/* Tab 2: 合规性审查 */}
        <TabPane tab="合规性审查" key="compliance" icon={<AuditOutlined />}>
          <Card title="合规性审查" extra={<Button type="primary" icon={<PlusOutlined />}>提交审查</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="审查记录数" value={128} suffix="条" /></Col>
              <Col span={6}><Statistic title="通过" value={95} valueStyle={{ color: '#3f8600' }} suffix="条" /></Col>
              <Col span={6}><Statistic title="需修改" value={23} valueStyle={{ color: '#faad14' }} suffix="条" /></Col>
              <Col span={6}><Statistic title="通过率" value={74.2} suffix="%" /></Col>
            </Row>
            <Table columns={[
              { title: '审查编号', dataIndex: 'reviewCode', key: 'reviewCode', width: 100 },
              { title: '设计编号', dataIndex: 'designCode', key: 'designCode', width: 90 },
              { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 110 },
              { title: '警示语', dataIndex: 'warningText', key: 'warningText', width: 110 },
              { title: '警示面积', dataIndex: 'warningArea', key: 'warningArea', width: 80 },
              { title: '健康提示', dataIndex: 'healthTip', key: 'healthTip', width: 130 },
              { title: '审核员', dataIndex: 'reviewer', key: 'reviewer', width: 80 },
              { title: '结果', dataIndex: 'result', key: 'result', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '审查时间', dataIndex: 'reviewTime', key: 'reviewTime', width: 100 },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>详情</Button><Button type="link" size="small" icon={<CheckCircleOutlined />}>复审</Button></Space>) }
            ]} dataSource={complianceData} pagination={{ pageSize: 10 }} scroll={{ x: 1200 }} />
          </Card>
        </TabPane>

        {/* Tab 3: 印刷工艺设计 */}
        <TabPane tab="印刷工艺设计" key="artwork" icon={<BgColorsOutlined />}>
          <Card title="印刷工艺设计" extra={<Button type="primary" icon={<PlusOutlined />}>新建工艺</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="工艺设计数" value={72} suffix="个" /></Col>
              <Col span={6}><Statistic title="已确认" value={52} valueStyle={{ color: '#3f8600' }} suffix="个" /></Col>
              <Col span={6}><Statistic title="印刷方式" value={5} suffix="种" /></Col>
              <Col span={6}><Statistic title="确认率" value={72.2} suffix="%" /></Col>
            </Row>
            <Table columns={[
              { title: '工艺编号', dataIndex: 'artCode', key: 'artCode', width: 90 },
              { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 110 },
              { title: '印刷方式', dataIndex: 'printMethod', key: 'printMethod', width: 100 },
              { title: '色数', dataIndex: 'colorCount', key: 'colorCount', width: 60 },
              { title: '特殊工艺', dataIndex: 'specialProcess', key: 'specialProcess', width: 120 },
              { title: '纸张', dataIndex: 'paperType', key: 'paperType', width: 100 },
              { title: '覆膜', dataIndex: 'coating', key: 'coating', width: 70 },
              { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 100 },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>查看</Button><Button type="link" size="small" icon={<EditOutlined />}>编辑</Button></Space>) }
            ]} dataSource={artworkData} pagination={{ pageSize: 10 }} scroll={{ x: 1150 }} />
          </Card>
        </TabPane>

        {/* Tab 4: 包装打样管理 */}
        <TabPane tab="包装打样管理" key="printing" icon={<FileImageOutlined />}>
          <Card title="包装打样管理" extra={<Button type="primary" icon={<PlusOutlined />}>新建打样</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="打样记录数" value={156} suffix="条" /></Col>
              <Col span={6}><Statistic title="合格" value={98} valueStyle={{ color: '#3f8600' }} suffix="条" /></Col>
              <Col span={6}><Statistic title="待复样" value={28} valueStyle={{ color: '#faad14' }} suffix="条" /></Col>
              <Col span={6}><Statistic title="合格率" value={62.8} suffix="%" /></Col>
            </Row>
            <Table columns={[
              { title: '打样编号', dataIndex: 'sampleCode', key: 'sampleCode', width: 100 },
              { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 110 },
              { title: '样品类型', dataIndex: 'sampleType', key: 'sampleType', width: 80 },
              { title: '印刷厂', dataIndex: 'printFactory', key: 'printFactory', width: 100 },
              { title: '打样数量', dataIndex: 'sampleQty', key: 'sampleQty', width: 80 },
              { title: '色差', dataIndex: 'colorDiff', key: 'colorDiff', width: 70 },
              { title: '进度', dataIndex: 'progress', key: 'progress', width: 120, render: (p: number) => <Progress percent={p} size="small" status={p === 100 ? 'success' : 'active'} /> },
              { title: '结果', dataIndex: 'result', key: 'result', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '打样时间', dataIndex: 'sampleTime', key: 'sampleTime', width: 100 },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>详情</Button><Button type="link" size="small" icon={<SafetyOutlined />}>评审</Button></Space>) }
            ]} dataSource={printingData} pagination={{ pageSize: 10 }} scroll={{ x: 1200 }} />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default PackagingDesign
