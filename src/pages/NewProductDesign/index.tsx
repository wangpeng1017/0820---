import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress } from 'antd'
import {
  EditOutlined,
  ExperimentOutlined,
  EyeOutlined,
  FireOutlined,
  PlusOutlined,
  SafetyOutlined,
  SettingOutlined,
  ThunderboltOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'heat-not-burn': 'heat-not-burn',
  'electronic': 'electronic',
  'hnb-material': 'hnb-material',
  'hnb-testing': 'hnb-testing',
}

const PATH_TAB_MAP: Record<string, string> = {
  'heat-not-burn': 'heat-not-burn',
  'electronic': 'electronic',
  'hnb-material': 'hnb-material',
  'hnb-testing': 'hnb-testing',
}

// ==================== Tab 1: 加热不燃烧产品设计 ====================
const heatNotBurnData = [
  { key: '1', designCode: 'HNB-001', productName: '黄山HNB-经典款', heatingType: '中心加热', heatTemp: '280-320°C', stickLength: '45mm', stickDiameter: '7.0mm', tobaccoWeight: '320mg', progress: 100, status: '已定型', designer: '张工' },
  { key: '2', designCode: 'HNB-002', productName: '皖烟HNB-清雅款', heatingType: '环绕加热', heatTemp: '260-300°C', stickLength: '44mm', stickDiameter: '6.8mm', tobaccoWeight: '300mg', progress: 85, status: '试制中', designer: '李工' },
  { key: '3', designCode: 'HNB-003', productName: '黄山HNB-浓香款', heatingType: '中心加热', heatTemp: '300-340°C', stickLength: '46mm', stickDiameter: '7.2mm', tobaccoWeight: '350mg', progress: 100, status: '已定型', designer: '王工' },
  { key: '4', designCode: 'HNB-004', productName: '皖烟HNB-薄荷款', heatingType: '感应加热', heatTemp: '250-290°C', stickLength: '43mm', stickDiameter: '6.5mm', tobaccoWeight: '280mg', progress: 60, status: '研发中', designer: '赵工' },
  { key: '5', designCode: 'HNB-005', productName: '黄山HNB-尊享款', heatingType: '中心加热', heatTemp: '290-330°C', stickLength: '48mm', stickDiameter: '7.5mm', tobaccoWeight: '380mg', progress: 100, status: '已定型', designer: '张工' },
  { key: '6', designCode: 'HNB-006', productName: '皖烟HNB-果香款', heatingType: '环绕加热', heatTemp: '240-280°C', stickLength: '42mm', stickDiameter: '6.3mm', tobaccoWeight: '260mg', progress: 70, status: '试制中', designer: '陈工' },
  { key: '7', designCode: 'HNB-007', productName: '黄山HNB-原味款', heatingType: '中心加热', heatTemp: '270-310°C', stickLength: '45mm', stickDiameter: '7.0mm', tobaccoWeight: '330mg', progress: 100, status: '已定型', designer: '李工' },
  { key: '8', designCode: 'HNB-008', productName: '皖烟HNB-商务款', heatingType: '感应加热', heatTemp: '280-320°C', stickLength: '44mm', stickDiameter: '6.8mm', tobaccoWeight: '310mg', progress: 45, status: '研发中', designer: '王工' },
  { key: '9', designCode: 'HNB-009', productName: '黄山HNB-女士款', heatingType: '环绕加热', heatTemp: '230-270°C', stickLength: '40mm', stickDiameter: '6.0mm', tobaccoWeight: '240mg', progress: 90, status: '试制中', designer: '赵工' },
  { key: '10', designCode: 'HNB-010', productName: '皖烟HNB-迷你款', heatingType: '中心加热', heatTemp: '260-300°C', stickLength: '38mm', stickDiameter: '5.8mm', tobaccoWeight: '220mg', progress: 55, status: '研发中', designer: '张工' },
  { key: '11', designCode: 'HNB-011', productName: '黄山HNB-双爆珠', heatingType: '感应加热', heatTemp: '250-290°C', stickLength: '46mm', stickDiameter: '7.0mm', tobaccoWeight: '320mg', progress: 40, status: '研发中', designer: '陈工' },
  { key: '12', designCode: 'HNB-012', productName: '皖烟HNB-低温款', heatingType: '低温加热', heatTemp: '200-240°C', stickLength: '44mm', stickDiameter: '6.8mm', tobaccoWeight: '300mg', progress: 75, status: '试制中', designer: '李工' },
  { key: '13', designCode: 'HNB-013', productName: '黄山HNB-智能款', heatingType: '智能调温', heatTemp: '可调节', stickLength: '45mm', stickDiameter: '7.0mm', tobaccoWeight: '330mg', progress: 30, status: '研发中', designer: '王工' },
  { key: '14', designCode: 'HNB-014', productName: '皖烟HNB-入门款', heatingType: '中心加热', heatTemp: '270-310°C', stickLength: '44mm', stickDiameter: '6.8mm', tobaccoWeight: '300mg', progress: 100, status: '已定型', designer: '赵工' },
  { key: '15', designCode: 'HNB-015', productName: '黄山HNB-旗舰款', heatingType: '复合加热', heatTemp: '可调节', stickLength: '50mm', stickDiameter: '7.8mm', tobaccoWeight: '400mg', progress: 25, status: '研发中', designer: '张工' },
]

// ==================== Tab 2: 电子烟产品设计 ====================
const electronicData = [
  { key: '1', designCode: 'EC-001', productName: '黄山EC-经典款', deviceType: '换弹式', batteryCapacity: '350mAh', podCapacity: '2ml', nicotineContent: '3%', flavorType: '烟草味', progress: 100, status: '已定型', designer: '刘工' },
  { key: '2', designCode: 'EC-002', productName: '皖烟EC-果味款', deviceType: '一次性', batteryCapacity: '550mAh', podCapacity: '3ml', nicotineContent: '5%', flavorType: '水果味', progress: 85, status: '试制中', designer: '周工' },
  { key: '3', designCode: 'EC-003', productName: '黄山EC-薄荷款', deviceType: '换弹式', batteryCapacity: '400mAh', podCapacity: '2.5ml', nicotineContent: '3%', flavorType: '薄荷味', progress: 100, status: '已定型', designer: '吴工' },
  { key: '4', designCode: 'EC-004', productName: '皖烟EC-咖啡款', deviceType: '注油式', batteryCapacity: '650mAh', podCapacity: '4ml', nicotineContent: '2%', flavorType: '咖啡味', progress: 60, status: '研发中', designer: '郑工' },
  { key: '5', designCode: 'EC-005', productName: '黄山EC-尊享款', deviceType: '换弹式', batteryCapacity: '500mAh', podCapacity: '3ml', nicotineContent: '5%', flavorType: '烟草味', progress: 100, status: '已定型', designer: '刘工' },
  { key: '6', designCode: 'EC-006', productName: '皖烟EC-柠檬款', deviceType: '一次性', batteryCapacity: '400mAh', podCapacity: '2ml', nicotineContent: '3%', flavorType: '柠檬味', progress: 70, status: '试制中', designer: '周工' },
  { key: '7', designCode: 'EC-007', productName: '黄山EC-绿茶款', deviceType: '换弹式', batteryCapacity: '380mAh', podCapacity: '2ml', nicotineContent: '2%', flavorType: '绿茶味', progress: 90, status: '试制中', designer: '吴工' },
  { key: '8', designCode: 'EC-008', productName: '皖烟EC-商务款', deviceType: '注油式', batteryCapacity: '800mAh', podCapacity: '5ml', nicotineContent: '3%', flavorType: '烟草味', progress: 45, status: '研发中', designer: '郑工' },
  { key: '9', designCode: 'EC-009', productName: '黄山EC-女士款', deviceType: '一次性', batteryCapacity: '300mAh', podCapacity: '1.5ml', nicotineContent: '2%', flavorType: '玫瑰味', progress: 100, status: '已定型', designer: '刘工' },
  { key: '10', designCode: 'EC-010', productName: '皖烟EC-冰爽款', deviceType: '换弹式', batteryCapacity: '420mAh', podCapacity: '2.5ml', nicotineContent: '5%', flavorType: '冰爽味', progress: 55, status: '研发中', designer: '周工' },
  { key: '11', designCode: 'EC-011', productName: '黄山EC-双模款', deviceType: '双模式', batteryCapacity: '600mAh', podCapacity: '3ml', nicotineContent: '3%', flavorType: '混合味', progress: 40, status: '研发中', designer: '吴工' },
  { key: '12', designCode: 'EC-012', productName: '皖烟EC-低烟款', deviceType: '换弹式', batteryCapacity: '350mAh', podCapacity: '2ml', nicotineContent: '1%', flavorType: '淡烟味', progress: 75, status: '试制中', designer: '郑工' },
  { key: '13', designCode: 'EC-013', productName: '黄山EC-智能款', deviceType: '智能式', batteryCapacity: '700mAh', podCapacity: '4ml', nicotineContent: '可调', flavorType: '可选', progress: 30, status: '研发中', designer: '刘工' },
  { key: '14', designCode: 'EC-014', productName: '皖烟EC-入门款', deviceType: '一次性', batteryCapacity: '280mAh', podCapacity: '1.2ml', nicotineContent: '3%', flavorType: '烟草味', progress: 100, status: '已定型', designer: '周工' },
  { key: '15', designCode: 'EC-015', productName: '黄山EC-旗舰款', deviceType: '注油式', batteryCapacity: '1000mAh', podCapacity: '6ml', nicotineContent: '可调', flavorType: '多选', progress: 20, status: '研发中', designer: '吴工' },
]

// ==================== Tab 3: HNB烟弹材料设计 ====================
const hnbMaterialData = [
  { key: '1', materialCode: 'HM-001', materialName: '再造烟叶薄片', specification: '厚度0.12mm', supplier: '云南再造', usage: '主体填充', nicotineContent: '1.2%', glycerinRatio: '15%', status: '已认证', targetProduct: 'HNB-001' },
  { key: '2', materialCode: 'HM-002', materialName: '发烟剂配方A', specification: '含量8%', supplier: '内部研发', usage: '烟雾增强', nicotineContent: '-', glycerinRatio: '60%', status: '试用中', targetProduct: 'HNB-002' },
  { key: '3', materialCode: 'HM-003', materialName: '加热用铝箔纸', specification: '厚度0.02mm', supplier: '江苏铝业', usage: '均匀加热', nicotineContent: '-', glycerinRatio: '-', status: '已认证', targetProduct: '通用' },
  { key: '4', materialCode: 'HM-004', materialName: '中空醋酸滤嘴', specification: '直径6.8mm', supplier: '南通滤嘴', usage: '过滤冷却', nicotineContent: '-', glycerinRatio: '-', status: '已认证', targetProduct: 'HNB-003' },
  { key: '5', materialCode: 'HM-005', materialName: '香味微胶囊', specification: '粒径50μm', supplier: '芬美意', usage: '缓释香气', nicotineContent: '-', glycerinRatio: '-', status: '研发中', targetProduct: 'HNB-004' },
  { key: '6', materialCode: 'HM-006', materialName: '烟草薄片B型', specification: '厚度0.10mm', supplier: '安徽烟草', usage: '主体填充', nicotineContent: '1.0%', glycerinRatio: '12%', status: '已认证', targetProduct: 'HNB-005' },
  { key: '7', materialCode: 'HM-007', materialName: '外包装铜版纸', specification: '克重250g', supplier: '金光纸业', usage: '烟弹包装', nicotineContent: '-', glycerinRatio: '-', status: '已认证', targetProduct: '通用' },
  { key: '8', materialCode: 'HM-008', materialName: '低温发烟配方', specification: '含量6%', supplier: '内部研发', usage: '低温烟雾', nicotineContent: '-', glycerinRatio: '50%', status: '试用中', targetProduct: 'HNB-012' },
  { key: '9', materialCode: 'HM-009', materialName: '复合过滤材料', specification: '三段式', supplier: '杭州滤材', usage: '增强过滤', nicotineContent: '-', glycerinRatio: '-', status: '已认证', targetProduct: 'HNB-007' },
  { key: '10', materialCode: 'HM-010', materialName: '薄荷精油微囊', specification: '含量0.5%', supplier: '奇华顿', usage: '口感调节', nicotineContent: '-', glycerinRatio: '-', status: '已认证', targetProduct: 'HNB-004' },
  { key: '11', materialCode: 'HM-011', materialName: '再造烟叶C型', specification: '厚度0.15mm', supplier: '河南再造', usage: '高温主体', nicotineContent: '1.5%', glycerinRatio: '18%', status: '试用中', targetProduct: 'HNB-003' },
  { key: '12', materialCode: 'HM-012', materialName: '热封用PP膜', specification: '厚度0.03mm', supplier: '浙江塑料', usage: '烟弹密封', nicotineContent: '-', glycerinRatio: '-', status: '已认证', targetProduct: '通用' },
  { key: '13', materialCode: 'HM-013', materialName: '智能温控芯片', specification: '微型芯片', supplier: '深圳电子', usage: '温度控制', nicotineContent: '-', glycerinRatio: '-', status: '研发中', targetProduct: 'HNB-013' },
  { key: '14', materialCode: 'HM-014', materialName: '标准发烟剂', specification: '含量7%', supplier: '内部配方', usage: '烟雾产生', nicotineContent: '-', glycerinRatio: '55%', status: '已认证', targetProduct: '通用' },
  { key: '15', materialCode: 'HM-015', materialName: '双层过滤棒', specification: '直径7.0mm', supplier: '云南滤嘴', usage: '双重过滤', nicotineContent: '-', glycerinRatio: '-', status: '试用中', targetProduct: 'HNB-005' },
]

// ==================== Tab 4: HNB产品测试 ====================
const hnbTestingData = [
  { key: '1', testCode: 'HT-001', productCode: 'HNB-001', testType: '烟气成分', testItem: 'TPM/焦油/CO', testResult: '合格', testValue: '8.2/6.5/3.2mg', standard: '≤10/≤8/≤5', tester: '测试员A', testTime: '2024-03-05' },
  { key: '2', testCode: 'HT-002', productCode: 'HNB-001', testType: '感官评价', testItem: '香气/口感/刺激', testResult: '优良', testValue: '8.5/8.2/7.8', standard: '≥7.0', tester: '评吸组', testTime: '2024-03-06' },
  { key: '3', testCode: 'HT-003', productCode: 'HNB-002', testType: '烟气成分', testItem: 'TPM/焦油/CO', testResult: '需改进', testValue: '9.8/7.2/4.5mg', standard: '≤10/≤8/≤5', tester: '测试员B', testTime: '2024-03-08' },
  { key: '4', testCode: 'HT-004', productCode: 'HNB-003', testType: '加热性能', testItem: '升温速度/均匀性', testResult: '合格', testValue: '8s/±5°C', standard: '≤10s/±10°C', tester: '测试员A', testTime: '2024-03-10' },
  { key: '5', testCode: 'HT-005', productCode: 'HNB-003', testType: '感官评价', testItem: '香气/口感/刺激', testResult: '优良', testValue: '8.8/8.5/8.0', standard: '≥7.0', tester: '评吸组', testTime: '2024-03-12' },
  { key: '6', testCode: 'HT-006', productCode: 'HNB-004', testType: '烟气成分', testItem: 'TPM/焦油/CO', testResult: '测试中', testValue: '-', standard: '≤10/≤8/≤5', tester: '测试员C', testTime: '2024-03-15' },
  { key: '7', testCode: 'HT-007', productCode: 'HNB-005', testType: '耐久性测试', testItem: '抽吸次数/稳定性', testResult: '合格', testValue: '14次/稳定', standard: '≥12次', tester: '测试员A', testTime: '2024-03-18' },
  { key: '8', testCode: 'HT-008', productCode: 'HNB-005', testType: '感官评价', testItem: '香气/口感/刺激', testResult: '优秀', testValue: '9.2/8.8/8.5', standard: '≥7.0', tester: '评吸组', testTime: '2024-03-20' },
  { key: '9', testCode: 'HT-009', productCode: 'HNB-006', testType: '烟气成分', testItem: 'TPM/焦油/CO', testResult: '需改进', testValue: '11.2/8.5/4.8mg', standard: '≤10/≤8/≤5', tester: '测试员B', testTime: '2024-03-22' },
  { key: '10', testCode: 'HT-010', productCode: 'HNB-007', testType: '加热性能', testItem: '升温速度/均匀性', testResult: '合格', testValue: '7s/±4°C', standard: '≤10s/±10°C', tester: '测试员A', testTime: '2024-03-25' },
  { key: '11', testCode: 'HT-011', productCode: 'HNB-007', testType: '感官评价', testItem: '香气/口感/刺激', testResult: '良好', testValue: '8.0/7.8/7.5', standard: '≥7.0', tester: '评吸组', testTime: '2024-03-28' },
  { key: '12', testCode: 'HT-012', productCode: 'HNB-009', testType: '烟气成分', testItem: 'TPM/焦油/CO', testResult: '合格', testValue: '7.5/5.8/2.8mg', standard: '≤10/≤8/≤5', tester: '测试员C', testTime: '2024-04-01' },
  { key: '13', testCode: 'HT-013', productCode: 'HNB-012', testType: '低温测试', testItem: '低温烟气量', testResult: '测试中', testValue: '-', standard: '≥80%常规', tester: '测试员A', testTime: '2024-04-05' },
  { key: '14', testCode: 'HT-014', productCode: 'HNB-014', testType: '烟气成分', testItem: 'TPM/焦油/CO', testResult: '合格', testValue: '8.0/6.2/3.0mg', standard: '≤10/≤8/≤5', tester: '测试员B', testTime: '2024-04-08' },
  { key: '15', testCode: 'HT-015', productCode: 'HNB-014', testType: '感官评价', testItem: '香气/口感/刺激', testResult: '优良', testValue: '8.3/8.0/7.6', standard: '≥7.0', tester: '评吸组', testTime: '2024-04-10' },
]

// 状态颜色映射
const statusColorMap: Record<string, string> = {
  '已定型': 'green',
  '试制中': 'blue',
  '研发中': 'purple',
  '已认证': 'green',
  '试用中': 'blue',
  '合格': 'green',
  '优良': 'green',
  '优秀': 'green',
  '良好': 'blue',
  '需改进': 'orange',
  '测试中': 'processing',
}

const NewProductDesign: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'heat-not-burn'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())

  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/new-product-design/${path}`)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">新型烟草数字化设计</h1>
        <p className="page-description">
          加热不燃烧产品设计、电子烟产品设计、HNB烟弹材料设计
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>

        {/* Tab 1: 加热不燃烧产品设计 */}
        <TabPane tab="加热不燃烧产品设计" key="heat-not-burn" icon={<FireOutlined />}>
          <Card title="加热不燃烧产品设计" extra={<Button type="primary" icon={<PlusOutlined />}>新建设计</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="HNB产品数" value={45} suffix="款" /></Col>
              <Col span={6}><Statistic title="已定型" value={18} valueStyle={{ color: '#3f8600' }} suffix="款" /></Col>
              <Col span={6}><Statistic title="研发中" value={15} valueStyle={{ color: '#722ed1' }} suffix="款" /></Col>
              <Col span={6}><Statistic title="定型率" value={40.0} suffix="%" /></Col>
            </Row>
            <Table columns={[
              { title: '设计编号', dataIndex: 'designCode', key: 'designCode', width: 90 },
              { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 140 },
              { title: '加热方式', dataIndex: 'heatingType', key: 'heatingType', width: 90 },
              { title: '加热温度', dataIndex: 'heatTemp', key: 'heatTemp', width: 100 },
              { title: '烟弹长度', dataIndex: 'stickLength', key: 'stickLength', width: 80 },
              { title: '烟弹直径', dataIndex: 'stickDiameter', key: 'stickDiameter', width: 80 },
              { title: '烟草填充量', dataIndex: 'tobaccoWeight', key: 'tobaccoWeight', width: 95 },
              { title: '进度', dataIndex: 'progress', key: 'progress', width: 120, render: (p: number) => <Progress percent={p} size="small" status={p === 100 ? 'success' : 'active'} /> },
              { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '设计师', dataIndex: 'designer', key: 'designer', width: 70 },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>查看</Button><Button type="link" size="small" icon={<EditOutlined />}>编辑</Button></Space>) }
            ]} dataSource={heatNotBurnData} pagination={{ pageSize: 10 }} scroll={{ x: 1300 }} />
          </Card>
        </TabPane>

        {/* Tab 2: 电子烟产品设计 */}
        <TabPane tab="电子烟产品设计" key="electronic" icon={<ThunderboltOutlined />}>
          <Card title="电子烟产品设计" extra={<Button type="primary" icon={<PlusOutlined />}>新建设计</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="电子烟产品数" value={38} suffix="款" /></Col>
              <Col span={6}><Statistic title="已定型" value={12} valueStyle={{ color: '#3f8600' }} suffix="款" /></Col>
              <Col span={6}><Statistic title="设备类型" value={5} suffix="种" /></Col>
              <Col span={6}><Statistic title="定型率" value={31.6} suffix="%" /></Col>
            </Row>
            <Table columns={[
              { title: '设计编号', dataIndex: 'designCode', key: 'designCode', width: 80 },
              { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 130 },
              { title: '设备类型', dataIndex: 'deviceType', key: 'deviceType', width: 80 },
              { title: '电池容量', dataIndex: 'batteryCapacity', key: 'batteryCapacity', width: 85 },
              { title: '烟弹容量', dataIndex: 'podCapacity', key: 'podCapacity', width: 85 },
              { title: '尼古丁含量', dataIndex: 'nicotineContent', key: 'nicotineContent', width: 90 },
              { title: '口味类型', dataIndex: 'flavorType', key: 'flavorType', width: 80 },
              { title: '进度', dataIndex: 'progress', key: 'progress', width: 120, render: (p: number) => <Progress percent={p} size="small" status={p === 100 ? 'success' : 'active'} /> },
              { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '设计师', dataIndex: 'designer', key: 'designer', width: 70 },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>查看</Button><Button type="link" size="small" icon={<EditOutlined />}>编辑</Button></Space>) }
            ]} dataSource={electronicData} pagination={{ pageSize: 10 }} scroll={{ x: 1250 }} />
          </Card>
        </TabPane>

        {/* Tab 3: HNB烟弹材料设计 */}
        <TabPane tab="HNB烟弹材料设计" key="hnb-material" icon={<SettingOutlined />}>
          <Card title="HNB烟弹材料设计" extra={<Button type="primary" icon={<PlusOutlined />}>新增材料</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="材料种类" value={42} suffix="种" /></Col>
              <Col span={6}><Statistic title="已认证" value={28} valueStyle={{ color: '#3f8600' }} suffix="种" /></Col>
              <Col span={6}><Statistic title="供应商数" value={18} suffix="家" /></Col>
              <Col span={6}><Statistic title="认证率" value={66.7} suffix="%" /></Col>
            </Row>
            <Table columns={[
              { title: '材料编码', dataIndex: 'materialCode', key: 'materialCode', width: 90 },
              { title: '材料名称', dataIndex: 'materialName', key: 'materialName', width: 120 },
              { title: '规格', dataIndex: 'specification', key: 'specification', width: 100 },
              { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 90 },
              { title: '用途', dataIndex: 'usage', key: 'usage', width: 80 },
              { title: '尼古丁', dataIndex: 'nicotineContent', key: 'nicotineContent', width: 75 },
              { title: '丙三醇比例', dataIndex: 'glycerinRatio', key: 'glycerinRatio', width: 90 },
              { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '目标产品', dataIndex: 'targetProduct', key: 'targetProduct', width: 90 },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>查���</Button><Button type="link" size="small" icon={<EditOutlined />}>编辑</Button></Space>) }
            ]} dataSource={hnbMaterialData} pagination={{ pageSize: 10 }} scroll={{ x: 1150 }} />
          </Card>
        </TabPane>

        {/* Tab 4: HNB产品测试 */}
        <TabPane tab="HNB产品测试" key="hnb-testing" icon={<ExperimentOutlined />}>
          <Card title="HNB产品测试" extra={<Button type="primary" icon={<PlusOutlined />}>新建测试</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="测试记录数" value={156} suffix="条" /></Col>
              <Col span={6}><Statistic title="合格/优良" value={98} valueStyle={{ color: '#3f8600' }} suffix="条" /></Col>
              <Col span={6}><Statistic title="需改进" value={25} valueStyle={{ color: '#faad14' }} suffix="条" /></Col>
              <Col span={6}><Statistic title="合格率" value={62.8} suffix="%" /></Col>
            </Row>
            <Table columns={[
              { title: '测试编号', dataIndex: 'testCode', key: 'testCode', width: 90 },
              { title: '产品编号', dataIndex: 'productCode', key: 'productCode', width: 90 },
              { title: '测试类型', dataIndex: 'testType', key: 'testType', width: 90 },
              { title: '测试项目', dataIndex: 'testItem', key: 'testItem', width: 130 },
              { title: '测试结果', dataIndex: 'testResult', key: 'testResult', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '测试值', dataIndex: 'testValue', key: 'testValue', width: 120 },
              { title: '标准值', dataIndex: 'standard', key: 'standard', width: 100 },
              { title: '测试员', dataIndex: 'tester', key: 'tester', width: 80 },
              { title: '测试时间', dataIndex: 'testTime', key: 'testTime', width: 100 },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>详情</Button><Button type="link" size="small" icon={<SafetyOutlined />}>复测</Button></Space>) }
            ]} dataSource={hnbTestingData} pagination={{ pageSize: 10 }} scroll={{ x: 1200 }} />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default NewProductDesign
