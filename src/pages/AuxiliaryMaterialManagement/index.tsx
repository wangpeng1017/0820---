import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress } from 'antd'
import {
  BarChartOutlined,
  DatabaseOutlined,
  EditOutlined,
  EyeOutlined,
  NodeIndexOutlined,
  PlusOutlined,
  TagOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'master': 'master',
  'identity': 'identity',
  'trace': 'trace',
  'statistics': 'statistics',
}

const PATH_TAB_MAP: Record<string, string> = {
  'master': 'master',
  'identity': 'identity',
  'trace': 'trace',
  'statistics': 'statistics',
}

// ==================== Tab 1: 辅材主数据标准化 ====================
const masterData = [
  { key: '1', code: 'FC-001', name: '白卡纸卷烟纸', category: '卷烟纸', specification: '27mm×3000m', supplier: '华泰纸业', permeability: '45CU', weight: '25g/m²', status: '已认证', createTime: '2024-01-15' },
  { key: '2', code: 'FC-002', name: '醋酸纤维滤嘴棒', category: '滤嘴棒', specification: '7.8×120mm', supplier: '南通滤嘴', hardness: '85%', drawResist: '1200Pa', status: '已认证', createTime: '2024-01-18' },
  { key: '3', code: 'FC-003', name: '镀铝接装纸', category: '接装纸', specification: '64mm×5000m', supplier: '常德金鹏', thickness: '0.035mm', tensile: '≥35N', status: '认证中', createTime: '2024-01-20' },
  { key: '4', code: 'FC-004', name: 'PVA烟用胶', category: '烟用胶', specification: '25kg/桶', supplier: '汉高化工', viscosity: '2500mPa·s', solidContent: '18%', status: '已认证', createTime: '2024-01-25' },
  { key: '5', code: 'FC-005', name: '复合滤嘴棒', category: '滤嘴棒', specification: '7.8×120mm', supplier: '云南滤嘴', segment: '三段式', efficiency: '65%', status: '已认证', createTime: '2024-02-01' },
  { key: '6', code: 'FC-006', name: '透气卷烟纸', category: '卷烟纸', specification: '27mm×3000m', supplier: '仙鹤纸业', permeability: '80CU', weight: '23g/m²', status: '认证中', createTime: '2024-02-05' },
  { key: '7', code: 'FC-007', name: '爆珠滤嘴棒', category: '滤嘴棒', specification: '7.8×120mm', supplier: '杭州爆珠', capsuleSize: '3.2mm', burstForce: '≥1.5N', status: '已认证', createTime: '2024-02-10' },
  { key: '8', code: 'FC-008', name: '水松纸', category: '接装纸', specification: '54mm×5000m', supplier: '劲嘉彩印', printColor: '4色', ashContent: '≤15%', status: '已认证', createTime: '2024-02-15' },
  { key: '9', code: 'FC-009', name: 'EVA热熔胶', category: '烟用胶', specification: '20kg/袋', supplier: '波士胶', meltPoint: '75°C', openTime: '5-8s', status: '认证中', createTime: '2024-02-20' },
  { key: '10', code: 'FC-010', name: '活性炭滤嘴棒', category: '滤嘴棒', specification: '7.8×120mm', supplier: '昆明滤材', carbonContent: '45mg', adsorption: '≥30%', status: '已认证', createTime: '2024-02-25' },
  { key: '11', code: 'FC-011', name: '麻浆卷烟纸', category: '卷烟纸', specification: '27mm×3000m', supplier: '民丰特纸', permeability: '35CU', weight: '28g/m²', status: '已认证', createTime: '2024-03-01' },
  { key: '12', code: 'FC-012', name: '中空滤嘴棒', category: '滤嘴棒', specification: '7.8×120mm', supplier: '杭州滤嘴', hollowRate: '20%', ventilation: '40%', status: '认证中', createTime: '2024-03-05' },
  { key: '13', code: 'FC-013', name: '全息接装纸', category: '接装纸', specification: '64mm×5000m', supplier: '深圳彩印', laserType: '猫眼', antiCounterfeit: 'A级', status: '已认证', createTime: '2024-03-10' },
  { key: '14', code: 'FC-014', name: '冷胶', category: '烟用胶', specification: '25kg/桶', supplier: '杭华化工', viscosity: '1800mPa·s', solidContent: '35%', status: '已认证', createTime: '2024-03-15' },
  { key: '15', code: 'FC-015', name: '细支滤嘴棒', category: '滤嘴棒', specification: '5.4×120mm', supplier: '南通滤嘴', hardness: '88%', drawResist: '1500Pa', status: '认证中', createTime: '2024-03-20' },
]

// ==================== Tab 2: 标识性材料数据库 ====================
const identityData = [
  { key: '1', identityCode: 'ID-001', materialName: '激光全息防伪接装纸', identityType: '光学防伪', features: '动态图案、微缩文字', applyProduct: '黄山(硬红)', securityLevel: 'A级', validPeriod: '2024-2026', supplier: '深圳彩印' },
  { key: '2', identityCode: 'ID-002', materialName: '荧光纤维卷烟纸', identityType: '材料防伪', features: '紫外荧光、专用纤维', applyProduct: '皖烟(软金)', securityLevel: 'B级', validPeriod: '2024-2025', supplier: '仙鹤纸业' },
  { key: '3', identityCode: 'ID-003', materialName: '二维码追溯滤嘴', identityType: '数字防伪', features: '唯一编码、扫码溯源', applyProduct: '黄山(细支)', securityLevel: 'A级', validPeriod: '2024-2027', supplier: '南通滤嘴' },
  { key: '4', identityCode: 'ID-004', materialName: '温变油墨接装纸', identityType: '材料防伪', features: '温度变色、手触显示', applyProduct: '皖烟(中支)', securityLevel: 'B级', validPeriod: '2024-2025', supplier: '常德金鹏' },
  { key: '5', identityCode: 'ID-005', materialName: 'RFID芯片烟包', identityType: '电子防伪', features: '射频识别、批量查验', applyProduct: '黄山(天都)', securityLevel: 'A级', validPeriod: '2024-2028', supplier: '劲嘉彩印' },
  { key: '6', identityCode: 'ID-006', materialName: '微纹理防伪纸', identityType: '光学防伪', features: '光栅纹理、倾斜可见', applyProduct: '皖烟(徽商)', securityLevel: 'B级', validPeriod: '2024-2026', supplier: '华泰纸业' },
  { key: '7', identityCode: 'ID-007', materialName: '数字水印卷烟纸', identityType: '数字防伪', features: '隐形水印、专用检测', applyProduct: '黄山(迎客松)', securityLevel: 'A级', validPeriod: '2024-2027', supplier: '民丰特纸' },
  { key: '8', identityCode: 'ID-008', materialName: '磁性油墨印刷', identityType: '材料防伪', features: '磁性颗粒、仪器检测', applyProduct: '皖烟(国宾)', securityLevel: 'B级', validPeriod: '2024-2025', supplier: '深圳彩印' },
  { key: '9', identityCode: 'ID-009', materialName: '光变膜接装纸', identityType: '光学防伪', features: '角度变色、金属光泽', applyProduct: '黄山(1993)', securityLevel: 'A级', validPeriod: '2024-2028', supplier: '常德金鹏' },
  { key: '10', identityCode: 'ID-010', materialName: '纳米防伪标签', identityType: '材料防伪', features: '纳米材料、不可复制', applyProduct: '皖烟(爆珠)', securityLevel: 'A级', validPeriod: '2024-2027', supplier: '上海纳米' },
  { key: '11', identityCode: 'ID-011', materialName: '区块链溯源码', identityType: '数字防伪', features: '链上存证、全程追溯', applyProduct: '黄山(软蓝)', securityLevel: 'A级', validPeriod: '2024-2030', supplier: '蚂蚁链' },
  { key: '12', identityCode: 'ID-012', materialName: '声纹防伪滤嘴', identityType: '电子防伪', features: '声波检测、频谱分析', applyProduct: '皖烟(黄金叶)', securityLevel: 'B级', validPeriod: '2024-2026', supplier: '杭州滤嘴' },
  { key: '13', identityCode: 'ID-013', materialName: '偏振光防伪膜', identityType: '光学防伪', features: '偏振可见、专用眼镜', applyProduct: '黄山(新概念)', securityLevel: 'A级', validPeriod: '2024-2028', supplier: '深圳光学' },
  { key: '14', identityCode: 'ID-014', materialName: 'DNA标记油墨', identityType: '材料防伪', features: 'DNA编码、分子鉴定', applyProduct: '皖烟(硬红)', securityLevel: 'A级', validPeriod: '2024-2030', supplier: '英诺伟霆' },
  { key: '15', identityCode: 'ID-015', materialName: '智能感温滤嘴', identityType: '电子防伪', features: '温度传感、品吸记录', applyProduct: '黄山(硬金)', securityLevel: 'B级', validPeriod: '2024-2026', supplier: '智能材料' },
]

// ==================== Tab 3: 辅材全流程追溯 ====================
const traceData = [
  { key: '1', traceCode: 'TR-2024-001', materialCode: 'FC-001', materialName: '白卡纸卷烟纸', batchNo: 'HT-240301-A', fromSource: '华泰纸业仓库', currentLocation: '制丝车间', traceStatus: '在用', updateTime: '2024-03-15 08:30', operator: '张三' },
  { key: '2', traceCode: 'TR-2024-002', materialCode: 'FC-002', materialName: '醋酸纤维滤嘴棒', batchNo: 'NT-240305-B', fromSource: '南通滤嘴工厂', currentLocation: '卷包车间', traceStatus: '在用', updateTime: '2024-03-16 09:15', operator: '李四' },
  { key: '3', traceCode: 'TR-2024-003', materialCode: 'FC-003', materialName: '镀铝接装纸', batchNo: 'CD-240308-C', fromSource: '常德金鹏仓库', currentLocation: '原料库', traceStatus: '待检', updateTime: '2024-03-17 10:00', operator: '王五' },
  { key: '4', traceCode: 'TR-2024-004', materialCode: 'FC-004', materialName: 'PVA烟用胶', batchNo: 'HG-240310-D', fromSource: '汉高化工工厂', currentLocation: '卷接车间', traceStatus: '在用', updateTime: '2024-03-18 11:30', operator: '赵六' },
  { key: '5', traceCode: 'TR-2024-005', materialCode: 'FC-005', materialName: '复合滤嘴棒', batchNo: 'YN-240312-E', fromSource: '云南滤嘴公司', currentLocation: '滤棒库', traceStatus: '已检', updateTime: '2024-03-19 14:00', operator: '钱七' },
  { key: '6', traceCode: 'TR-2024-006', materialCode: 'FC-006', materialName: '透气卷烟纸', batchNo: 'XH-240315-F', fromSource: '仙鹤纸业仓库', currentLocation: '成品库', traceStatus: '已出', updateTime: '2024-03-20 15:30', operator: '孙八' },
  { key: '7', traceCode: 'TR-2024-007', materialCode: 'FC-007', materialName: '爆珠滤嘴棒', batchNo: 'HZ-240318-G', fromSource: '杭州爆珠工厂', currentLocation: '特种滤棒库', traceStatus: '在用', updateTime: '2024-03-21 08:45', operator: '周九' },
  { key: '8', traceCode: 'TR-2024-008', materialCode: 'FC-008', materialName: '水松纸', batchNo: 'JJ-240320-H', fromSource: '劲嘉彩印公司', currentLocation: '印刷车间', traceStatus: '在用', updateTime: '2024-03-22 09:20', operator: '吴十' },
  { key: '9', traceCode: 'TR-2024-009', materialCode: 'FC-009', materialName: 'EVA热熔胶', batchNo: 'BS-240322-I', fromSource: '波士胶仓库', currentLocation: '胶料库', traceStatus: '待检', updateTime: '2024-03-23 10:50', operator: '郑一' },
  { key: '10', traceCode: 'TR-2024-010', materialCode: 'FC-010', materialName: '活性炭滤嘴棒', batchNo: 'KM-240325-J', fromSource: '昆明滤材工厂', currentLocation: '卷包车间', traceStatus: '在用', updateTime: '2024-03-24 11:15', operator: '王二' },
  { key: '11', traceCode: 'TR-2024-011', materialCode: 'FC-011', materialName: '麻浆卷烟纸', batchNo: 'MF-240328-K', fromSource: '民丰特纸仓库', currentLocation: '原料库', traceStatus: '已检', updateTime: '2024-03-25 13:30', operator: '李三' },
  { key: '12', traceCode: 'TR-2024-012', materialCode: 'FC-012', materialName: '中空滤嘴棒', batchNo: 'HZ-240401-L', fromSource: '杭州滤嘴公司', currentLocation: '滤棒库', traceStatus: '待检', updateTime: '2024-03-26 14:45', operator: '张四' },
  { key: '13', traceCode: 'TR-2024-013', materialCode: 'FC-013', materialName: '全息接装纸', batchNo: 'SZ-240405-M', fromSource: '深圳彩印工厂', currentLocation: '接装车间', traceStatus: '在用', updateTime: '2024-03-27 15:20', operator: '刘五' },
  { key: '14', traceCode: 'TR-2024-014', materialCode: 'FC-014', materialName: '冷胶', batchNo: 'HH-240408-N', fromSource: '杭华化工公司', currentLocation: '胶料库', traceStatus: '已检', updateTime: '2024-03-28 16:00', operator: '陈六' },
  { key: '15', traceCode: 'TR-2024-015', materialCode: 'FC-015', materialName: '细支滤嘴棒', batchNo: 'NT-240410-O', fromSource: '南通滤嘴工厂', currentLocation: '细支线', traceStatus: '在用', updateTime: '2024-03-29 08:00', operator: '杨七' },
]

// ==================== Tab 4: 材料应用统计分析 ====================
const statisticsData = [
  { key: '1', statId: 'STAT-001', category: '卷烟纸', totalUsage: 15800, unit: '卷', monthUsage: 1250, avgCost: 285.5, topSupplier: '华泰纸业', supplyRate: 98.5, qualityRate: 99.2, trend: '上升' },
  { key: '2', statId: 'STAT-002', category: '滤嘴棒', totalUsage: 28500, unit: '万支', monthUsage: 2380, avgCost: 0.025, topSupplier: '南通滤嘴', supplyRate: 99.1, qualityRate: 99.5, trend: '稳定' },
  { key: '3', statId: 'STAT-003', category: '接装纸', totalUsage: 12300, unit: '卷', monthUsage: 980, avgCost: 425.0, topSupplier: '常德金鹏', supplyRate: 97.8, qualityRate: 98.8, trend: '上升' },
  { key: '4', statId: 'STAT-004', category: '烟用胶', totalUsage: 8500, unit: '桶', monthUsage: 720, avgCost: 185.0, topSupplier: '汉高化工', supplyRate: 99.5, qualityRate: 99.8, trend: '稳定' },
  { key: '5', statId: 'STAT-005', category: '爆珠滤嘴', totalUsage: 5200, unit: '万支', monthUsage: 450, avgCost: 0.085, topSupplier: '杭州爆珠', supplyRate: 96.5, qualityRate: 97.5, trend: '上升' },
  { key: '6', statId: 'STAT-006', category: '活性炭滤嘴', totalUsage: 6800, unit: '万支', monthUsage: 580, avgCost: 0.045, topSupplier: '昆明滤材', supplyRate: 98.2, qualityRate: 98.9, trend: '稳定' },
  { key: '7', statId: 'STAT-007', category: '水松纸', totalUsage: 9500, unit: '卷', monthUsage: 820, avgCost: 365.0, topSupplier: '劲嘉彩印', supplyRate: 99.0, qualityRate: 99.3, trend: '下降' },
  { key: '8', statId: 'STAT-008', category: '热熔胶', totalUsage: 4200, unit: '袋', monthUsage: 350, avgCost: 125.0, topSupplier: '波士胶', supplyRate: 97.5, qualityRate: 98.5, trend: '稳定' },
  { key: '9', statId: 'STAT-009', category: '复合滤嘴', totalUsage: 7800, unit: '万支', monthUsage: 650, avgCost: 0.035, topSupplier: '云南滤嘴', supplyRate: 98.8, qualityRate: 99.1, trend: '上升' },
  { key: '10', statId: 'STAT-010', category: '全息接装纸', totalUsage: 3500, unit: '卷', monthUsage: 280, avgCost: 580.0, topSupplier: '深圳彩印', supplyRate: 95.5, qualityRate: 97.8, trend: '上升' },
  { key: '11', statId: 'STAT-011', category: '中空滤嘴', totalUsage: 4500, unit: '万支', monthUsage: 380, avgCost: 0.032, topSupplier: '杭州滤嘴', supplyRate: 97.2, qualityRate: 98.2, trend: '稳定' },
  { key: '12', statId: 'STAT-012', category: '细支滤嘴', totalUsage: 8200, unit: '万支', monthUsage: 720, avgCost: 0.028, topSupplier: '南通滤嘴', supplyRate: 99.0, qualityRate: 99.4, trend: '上升' },
  { key: '13', statId: 'STAT-013', category: '防伪材料', totalUsage: 2800, unit: '批', monthUsage: 230, avgCost: 850.0, topSupplier: '深圳光学', supplyRate: 94.5, qualityRate: 96.8, trend: '上升' },
  { key: '14', statId: 'STAT-014', category: '冷胶', totalUsage: 5500, unit: '桶', monthUsage: 460, avgCost: 165.0, topSupplier: '杭华化工', supplyRate: 98.5, qualityRate: 99.0, trend: '稳定' },
  { key: '15', statId: 'STAT-015', category: '麻浆卷烟纸', totalUsage: 6200, unit: '卷', monthUsage: 520, avgCost: 320.0, topSupplier: '民丰特纸', supplyRate: 97.8, qualityRate: 98.6, trend: '稳定' },
]

// 状态颜色映射
const statusColorMap: Record<string, string> = {
  '已认证': 'green',
  '认证中': 'blue',
  '待认证': 'orange',
  '在用': 'processing',
  '已检': 'green',
  '待检': 'orange',
  '已出': 'default',
}

const securityLevelColorMap: Record<string, string> = {
  'A级': 'red',
  'B级': 'orange',
  'C级': 'blue',
}

const trendColorMap: Record<string, string> = {
  '上升': 'green',
  '稳定': 'blue',
  '下降': 'red',
}

const AuxiliaryMaterialManagement: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // 从 URL 获取当前子路径
  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'master'
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
    navigate(`/auxiliary-material-management/${path}`)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">材料管理(烟用辅材)</h1>
        <p className="page-description">
          辅材主数据标准化、标识性材料数据库、辅材全流程追溯
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>

        {/* Tab 1: 辅材主数据标准化 */}
        <TabPane tab="辅材主数据标准化" key="master" icon={<DatabaseOutlined />}>
          <Card title="辅材主数据标准化" extra={<Button type="primary" icon={<PlusOutlined />}>新增辅材</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="辅材品种总数" value={256} suffix="种" />
              </Col>
              <Col span={6}>
                <Statistic title="已认证" value={218} valueStyle={{ color: '#3f8600' }} suffix="种" />
              </Col>
              <Col span={6}>
                <Statistic title="供应商数量" value={45} suffix="家" />
              </Col>
              <Col span={6}>
                <Statistic title="认证率" value={85.2} suffix="%" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '辅材编码', dataIndex: 'code', key: 'code', width: 90 },
                { title: '辅材名称', dataIndex: 'name', key: 'name', width: 140 },
                { title: '类别', dataIndex: 'category', key: 'category', width: 80 },
                { title: '规格', dataIndex: 'specification', key: 'specification', width: 110 },
                { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 100 },
                { title: '关键指标1', dataIndex: 'permeability', key: 'permeability', width: 90 },
                { title: '关键指标2', dataIndex: 'weight', key: 'weight', width: 90 },
                { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 100 },
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
              dataSource={masterData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>

        {/* Tab 2: 标识性材料数据库 */}
        <TabPane tab="标识性材料数据库" key="identity" icon={<TagOutlined />}>
          <Card title="标识性材料数据库" extra={<Button type="primary" icon={<PlusOutlined />}>新增标识材料</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="标识材料总数" value={86} suffix="种" />
              </Col>
              <Col span={6}>
                <Statistic title="A级防伪" value={42} valueStyle={{ color: '#cf1322' }} suffix="种" />
              </Col>
              <Col span={6}>
                <Statistic title="应用产品数" value={35} suffix="���" />
              </Col>
              <Col span={6}>
                <Statistic title="防伪有效率" value={99.8} suffix="%" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '标识编码', dataIndex: 'identityCode', key: 'identityCode', width: 90 },
                { title: '材料名称', dataIndex: 'materialName', key: 'materialName', width: 150 },
                { title: '防伪类型', dataIndex: 'identityType', key: 'identityType', width: 90 },
                { title: '特征描述', dataIndex: 'features', key: 'features', width: 150 },
                { title: '应用产品', dataIndex: 'applyProduct', key: 'applyProduct', width: 110 },
                { title: '安全等级', dataIndex: 'securityLevel', key: 'securityLevel', width: 80, render: (s: string) => <Tag color={securityLevelColorMap[s]}>{s}</Tag> },
                { title: '有效期', dataIndex: 'validPeriod', key: 'validPeriod', width: 100 },
                { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 90 },
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
              dataSource={identityData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>

        {/* Tab 3: 辅材全流程追溯 */}
        <TabPane tab="辅材全流程追溯" key="trace" icon={<NodeIndexOutlined />}>
          <Card title="辅材全流程追溯" extra={<Button type="primary" icon={<PlusOutlined />}>新建追溯</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="追溯记录数" value={1856} suffix="条" />
              </Col>
              <Col span={6}>
                <Statistic title="在用批次" value={128} valueStyle={{ color: '#1890ff' }} suffix="批" />
              </Col>
              <Col span={6}>
                <Statistic title="追溯覆盖率" value={100} suffix="%" />
              </Col>
              <Col span={6}>
                <Statistic title="平均追溯时间" value={2.5} suffix="秒" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '追溯码', dataIndex: 'traceCode', key: 'traceCode', width: 120 },
                { title: '物料编码', dataIndex: 'materialCode', key: 'materialCode', width: 80 },
                { title: '物料名称', dataIndex: 'materialName', key: 'materialName', width: 130 },
                { title: '批次号', dataIndex: 'batchNo', key: 'batchNo', width: 130 },
                { title: '来源', dataIndex: 'fromSource', key: 'fromSource', width: 120 },
                { title: '当前位置', dataIndex: 'currentLocation', key: 'currentLocation', width: 90 },
                { title: '状态', dataIndex: 'traceStatus', key: 'traceStatus', width: 70, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
                { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', width: 140 },
                { title: '操作员', dataIndex: 'operator', key: 'operator', width: 70 },
                {
                  title: '操作', key: 'action', width: 150,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<NodeIndexOutlined />}>追溯</Button>
                      <Button type="link" size="small" icon={<EyeOutlined />}>详情</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={traceData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1300 }}
            />
          </Card>
        </TabPane>

        {/* Tab 4: 材料应用统计分析 */}
        <TabPane tab="材料应用统计分析" key="statistics" icon={<BarChartOutlined />}>
          <Card title="材料应用统计分析" extra={<Button type="primary" icon={<PlusOutlined />}>生成报表</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="辅材品类数" value={15} suffix="类" />
              </Col>
              <Col span={6}>
                <Statistic title="平均供应率" value={97.8} valueStyle={{ color: '#3f8600' }} suffix="%" />
              </Col>
              <Col span={6}>
                <Statistic title="平均质量合格率" value={98.6} valueStyle={{ color: '#3f8600' }} suffix="%" />
              </Col>
              <Col span={6}>
                <Statistic title="月度用量增长" value={5.2} suffix="%" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '统计编号', dataIndex: 'statId', key: 'statId', width: 100 },
                { title: '辅材类别', dataIndex: 'category', key: 'category', width: 100 },
                { title: '累计用量', dataIndex: 'totalUsage', key: 'totalUsage', width: 90, render: (v: number, r: any) => `${v}${r.unit}` },
                { title: '月均用量', dataIndex: 'monthUsage', key: 'monthUsage', width: 90, render: (v: number, r: any) => `${v}${r.unit}` },
                { title: '均价(元)', dataIndex: 'avgCost', key: 'avgCost', width: 90 },
                { title: '主供应商', dataIndex: 'topSupplier', key: 'topSupplier', width: 90 },
                { title: '供应率', dataIndex: 'supplyRate', key: 'supplyRate', width: 80, render: (v: number) => <span style={{ color: v >= 98 ? '#3f8600' : '#faad14' }}>{v}%</span> },
                { title: '质量合格率', dataIndex: 'qualityRate', key: 'qualityRate', width: 90, render: (v: number) => <span style={{ color: v >= 99 ? '#3f8600' : '#faad14' }}>{v}%</span> },
                { title: '趋势', dataIndex: 'trend', key: 'trend', width: 70, render: (s: string) => <Tag color={trendColorMap[s]}>{s}</Tag> },
                {
                  title: '操作', key: 'action', width: 150,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<BarChartOutlined />}>图表</Button>
                      <Button type="link" size="small" icon={<EyeOutlined />}>详情</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={statisticsData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default AuxiliaryMaterialManagement
