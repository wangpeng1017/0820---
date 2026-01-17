import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress } from 'antd'
import {
  AlertOutlined,
  BarChartOutlined,
  CalculatorOutlined,
  EditOutlined,
  EyeOutlined,
  FileTextOutlined,
  HistoryOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'history': 'history',
  'standard': 'standard',
  'resource': 'resource',
  'balance': 'balance',
  'warning': 'warning',
}

const PATH_TAB_MAP: Record<string, string> = {
  'history': 'history',
  'standard': 'standard',
  'resource': 'resource',
  'balance': 'balance',
  'warning': 'warning',
}

const FormulaManagement: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'history'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())

  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/formula-management/${path}`)
  }

  // 配方历史数据库
  const historyData = [
    { key: '1', code: 'PF001', name: '黄山（软）经典配方', version: 'V3.2', brand: '黄山', type: '中支', createDate: '2020-03-15', updateDate: '2024-01-10', creator: '张建国', status: '生产中' },
    { key: '2', code: 'PF002', name: '黄山（硬）标准配方', version: 'V2.8', brand: '黄山', type: '常规', createDate: '2019-06-20', updateDate: '2023-12-05', creator: '李明华', status: '生产中' },
    { key: '3', code: 'PF003', name: '黄山（细支）特醇配方', version: 'V1.5', brand: '黄山', type: '细支', createDate: '2022-01-08', updateDate: '2024-02-15', creator: '王志强', status: '生产中' },
    { key: '4', code: 'PF004', name: '皖烟（经典）配方', version: 'V4.0', brand: '皖烟', type: '常规', createDate: '2018-09-10', updateDate: '2023-11-20', creator: '陈伟明', status: '生产中' },
    { key: '5', code: 'PF005', name: '皖烟（蓝）升级配方', version: 'V2.3', brand: '皖烟', type: '中支', createDate: '2021-04-15', updateDate: '2024-01-25', creator: '刘德华', status: '试产中' },
    { key: '6', code: 'PF006', name: '黄山（迎客松）配方', version: 'V5.1', brand: '黄山', type: '特醇', createDate: '2017-11-20', updateDate: '2024-02-01', creator: '赵国庆', status: '生产中' },
    { key: '7', code: 'PF007', name: '黄山（新概念）配方', version: 'V1.2', brand: '黄山', type: '创新', createDate: '2023-06-10', updateDate: '2024-02-20', creator: '周建军', status: '研发中' },
    { key: '8', code: 'PF008', name: '皖烟（红）经典配方', version: 'V3.5', brand: '皖烟', type: '常规', createDate: '2019-02-28', updateDate: '2023-10-15', creator: '吴晓明', status: '生产中' },
    { key: '9', code: 'PF009', name: '黄山（徽商）配方', version: 'V2.0', brand: '黄山', type: '高端', createDate: '2021-08-05', updateDate: '2024-01-05', creator: '黄志远', status: '生产中' },
    { key: '10', code: 'PF010', name: '黄山（小红方印）配方', version: 'V4.2', brand: '黄山', type: '精品', createDate: '2016-12-15', updateDate: '2023-12-20', creator: '林志伟', status: '生产中' },
    { key: '11', code: 'PF011', name: '皖烟（中支）新配方', version: 'V1.0', brand: '皖烟', type: '中支', createDate: '2024-01-10', updateDate: '2024-02-28', creator: '杨建华', status: '研发中' },
    { key: '12', code: 'PF012', name: '黄山（1993）复刻配方', version: 'V1.8', brand: '黄山', type: '复古', createDate: '2022-09-01', updateDate: '2024-01-15', creator: '郑明辉', status: '试产中' },
    { key: '13', code: 'PF013', name: '皖烟（细支）清香配方', version: 'V1.3', brand: '皖烟', type: '细支', createDate: '2023-03-20', updateDate: '2024-02-10', creator: '孙晓东', status: '试产中' },
    { key: '14', code: 'PF014', name: '黄山（红方印）老配方', version: 'V6.0', brand: '黄山', type: '经典', createDate: '2015-05-10', updateDate: '2023-08-01', creator: '钱学森', status: '已停产' },
    { key: '15', code: 'PF015', name: '黄山（大红方印）配方', version: 'V3.8', brand: '黄山', type: '高端', createDate: '2018-07-25', updateDate: '2024-02-05', creator: '朱国强', status: '生产中' }
  ]

  // 叶组配方标准管理
  const standardData = [
    { key: '1', code: 'BZ001', name: '中支卷烟叶组配方标准', type: '产品标准', scope: '中支产品', version: 'V2.0', publishDate: '2024-01-15', effectDate: '2024-02-01', status: '执行中' },
    { key: '2', code: 'BZ002', name: '细支卷烟叶组配方标准', type: '产品标准', scope: '细支产品', version: 'V1.5', publishDate: '2023-12-10', effectDate: '2024-01-01', status: '执行中' },
    { key: '3', code: 'BZ003', name: '常规卷烟叶组配方标准', type: '产品标准', scope: '常规产品', version: 'V3.2', publishDate: '2023-10-20', effectDate: '2023-11-01', status: '执行中' },
    { key: '4', code: 'BZ004', name: '烟叶原料质量分级标准', type: '原料标准', scope: '烟叶采购', version: 'V4.0', publishDate: '2023-08-15', effectDate: '2023-09-01', status: '执行中' },
    { key: '5', code: 'BZ005', name: '进口烟叶使用标准', type: '原料标准', scope: '进口原料', version: 'V2.5', publishDate: '2023-11-05', effectDate: '2023-12-01', status: '执行中' },
    { key: '6', code: 'BZ006', name: '香精香料使用规范', type: '辅料标准', scope: '香精配方', version: 'V3.0', publishDate: '2024-01-20', effectDate: '2024-02-15', status: '执行中' },
    { key: '7', code: 'BZ007', name: '配方设计审批流程标准', type: '流程标准', scope: '配方管理', version: 'V2.0', publishDate: '2023-09-10', effectDate: '2023-10-01', status: '执行中' },
    { key: '8', code: 'BZ008', name: '配方变更控制标准', type: '流程标准', scope: '配方变更', version: 'V1.8', publishDate: '2023-07-25', effectDate: '2023-08-15', status: '执行中' },
    { key: '9', code: 'BZ009', name: '焦油含量控制标准', type: '质量标准', scope: '产品质量', version: 'V5.0', publishDate: '2024-02-01', effectDate: '2024-03-01', status: '待执行' },
    { key: '10', code: 'BZ010', name: '烟碱含量控制标准', type: '质量标准', scope: '产品质量', version: 'V4.5', publishDate: '2023-12-20', effectDate: '2024-01-15', status: '执行中' },
    { key: '11', code: 'BZ011', name: '感官质量评价标准', type: '质量标准', scope: '感官评价', version: 'V3.0', publishDate: '2023-11-15', effectDate: '2023-12-01', status: '执行中' },
    { key: '12', code: 'BZ012', name: '叶组模块化设计规范', type: '设计标准', scope: '配方设计', version: 'V2.2', publishDate: '2024-01-08', effectDate: '2024-02-01', status: '执行中' },
    { key: '13', code: 'BZ013', name: '新产品配方开发标准', type: '设计标准', scope: '新品开发', version: 'V1.5', publishDate: '2023-10-30', effectDate: '2023-11-15', status: '执行中' },
    { key: '14', code: 'BZ014', name: '配方成本核算标准', type: '管理标准', scope: '成本管理', version: 'V2.8', publishDate: '2023-09-25', effectDate: '2023-10-15', status: '执行中' },
    { key: '15', code: 'BZ015', name: '配方数据安全标准', type: '管理标准', scope: '数据安全', version: 'V1.0', publishDate: '2024-02-10', effectDate: '2024-03-01', status: '待执行' }
  ]

  // 配方资源运行分析
  const resourceData = [
    { key: '1', code: 'FX001', formulaName: '黄山（软）经典配方', productionVolume: '12500', unit: '万支/月', materialCost: '850', utilizationRate: 95, qualityScore: 92, trend: '稳定', period: '2024年1月' },
    { key: '2', code: 'FX002', formulaName: '黄山（硬）标准配方', productionVolume: '18000', unit: '万支/月', materialCost: '720', utilizationRate: 98, qualityScore: 90, trend: '上升', period: '2024年1月' },
    { key: '3', code: 'FX003', formulaName: '黄山（细支）特醇配方', productionVolume: '8500', unit: '万支/月', materialCost: '980', utilizationRate: 88, qualityScore: 94, trend: '上升', period: '2024年1月' },
    { key: '4', code: 'FX004', formulaName: '皖烟（经典）配方', productionVolume: '15000', unit: '万支/月', materialCost: '680', utilizationRate: 96, qualityScore: 88, trend: '稳定', period: '2024年1月' },
    { key: '5', code: 'FX005', formulaName: '黄山（迎客松）配方', productionVolume: '6800', unit: '万支/月', materialCost: '1250', utilizationRate: 92, qualityScore: 96, trend: '稳定', period: '2024年1月' },
    { key: '6', code: 'FX006', formulaName: '皖烟（红）经典配方', productionVolume: '10500', unit: '万支/月', materialCost: '650', utilizationRate: 94, qualityScore: 87, trend: '下降', period: '2024年1月' },
    { key: '7', code: 'FX007', formulaName: '黄山（徽商）配方', productionVolume: '4200', unit: '万支/月', materialCost: '1580', utilizationRate: 85, qualityScore: 95, trend: '上升', period: '2024年1月' },
    { key: '8', code: 'FX008', formulaName: '黄山（小红方印）配方', productionVolume: '7500', unit: '万支/月', materialCost: '1120', utilizationRate: 90, qualityScore: 93, trend: '稳定', period: '2024年1月' },
    { key: '9', code: 'FX009', formulaName: '黄山（大红方印）配方', productionVolume: '3500', unit: '万支/月', materialCost: '1850', utilizationRate: 82, qualityScore: 97, trend: '稳定', period: '2024年1月' },
    { key: '10', code: 'FX010', formulaName: '皖烟（蓝）升级配方', productionVolume: '2800', unit: '万支/月', materialCost: '920', utilizationRate: 78, qualityScore: 91, trend: '上升', period: '2024年1月' },
    { key: '11', code: 'FX011', formulaName: '黄山（1993）复刻配方', productionVolume: '1500', unit: '万支/月', materialCost: '1380', utilizationRate: 72, qualityScore: 89, trend: '上升', period: '2024年1月' },
    { key: '12', code: 'FX012', formulaName: '皖烟（细支）清香配方', productionVolume: '1200', unit: '万支/月', materialCost: '1050', utilizationRate: 68, qualityScore: 88, trend: '上升', period: '2024年1月' },
    { key: '13', code: 'FX013', formulaName: '黄山（新概念）配方', productionVolume: '500', unit: '万支/月', materialCost: '1680', utilizationRate: 55, qualityScore: 85, trend: '波动', period: '2024年1月' },
    { key: '14', code: 'FX014', formulaName: '皖烟（中支）新配方', productionVolume: '300', unit: '万支/月', materialCost: '980', utilizationRate: 45, qualityScore: 82, trend: '波动', period: '2024年1月' },
    { key: '15', code: 'FX015', formulaName: '全品牌综合分析', productionVolume: '93800', unit: '万支/月', materialCost: '平均985', utilizationRate: 85, qualityScore: 91, trend: '稳定', period: '2024年1月' }
  ]

  // 配方维护及平衡测算
  const balanceData = [
    { key: '1', code: 'PH001', formulaName: '黄山（软）经典配方', mainMaterial: '云南红大45%、K326 30%', auxiliaryMaterial: '贵州云烟15%、进口10%', targetCost: '850', actualCost: '862', deviation: '+1.4%', balance: '需调整' },
    { key: '2', code: 'PH002', formulaName: '黄山（硬）标准配方', mainMaterial: 'K326 50%、云烟87 25%', auxiliaryMaterial: '河南NC89 15%、其他10%', targetCost: '720', actualCost: '715', deviation: '-0.7%', balance: '平衡' },
    { key: '3', code: 'PH003', formulaName: '黄山（细支）特醇配方', mainMaterial: '云南曲靖K326 55%', auxiliaryMaterial: '翠碧一号25%、进口20%', targetCost: '980', actualCost: '995', deviation: '+1.5%', balance: '需调整' },
    { key: '4', code: 'PH004', formulaName: '皖烟（经典）配方', mainMaterial: '皖南云烟85 40%、NC89 30%', auxiliaryMaterial: '山东NC82 20%、其他10%', targetCost: '680', actualCost: '678', deviation: '-0.3%', balance: '平衡' },
    { key: '5', code: 'PH005', formulaName: '黄山（迎客松）配方', mainMaterial: '云南红大60%', auxiliaryMaterial: '津巴布韦25%、巴西15%', targetCost: '1250', actualCost: '1280', deviation: '+2.4%', balance: '需调整' },
    { key: '6', code: 'PH006', formulaName: '皖烟（红）经典配方', mainMaterial: 'NC89 45%、云烟87 25%', auxiliaryMaterial: '皖南云烟20%、其他10%', targetCost: '650', actualCost: '642', deviation: '-1.2%', balance: '平衡' },
    { key: '7', code: 'PH007', formulaName: '黄山（徽商）配方', mainMaterial: '云南曲靖K326特级 65%', auxiliaryMaterial: '津巴布韦20%、巴西15%', targetCost: '1580', actualCost: '1620', deviation: '+2.5%', balance: '需调整' },
    { key: '8', code: 'PH008', formulaName: '黄山（小红方印）配方', mainMaterial: '云南红大50%、翠碧一号25%', auxiliaryMaterial: '进口混合25%', targetCost: '1120', actualCost: '1135', deviation: '+1.3%', balance: '基本平衡' },
    { key: '9', code: 'PH009', formulaName: '黄山（大红方印）配方', mainMaterial: '云南曲靖特级70%', auxiliaryMaterial: '津巴布韦30%', targetCost: '1850', actualCost: '1890', deviation: '+2.2%', balance: '需调整' },
    { key: '10', code: 'PH010', formulaName: '皖烟（蓝）升级配方', mainMaterial: 'K326 40%、云烟85 30%', auxiliaryMaterial: '皖南云烟20%、其他10%', targetCost: '920', actualCost: '925', deviation: '+0.5%', balance: '平衡' },
    { key: '11', code: 'PH011', formulaName: '黄山（1993）复刻配方', mainMaterial: '云南红大复配55%', auxiliaryMaterial: '贵州遵义25%、传统配方20%', targetCost: '1380', actualCost: '1395', deviation: '+1.1%', balance: '基本平衡' },
    { key: '12', code: 'PH012', formulaName: '皖烟（细支）清香配方', mainMaterial: '翠碧一号45%、云烟87 30%', auxiliaryMaterial: '皖南云烟15%、进口10%', targetCost: '1050', actualCost: '1048', deviation: '-0.2%', balance: '平衡' },
    { key: '13', code: 'PH013', formulaName: '黄山（新概念）配方', mainMaterial: '创新叶组模块60%', auxiliaryMaterial: '特色原料40%', targetCost: '1680', actualCost: '1750', deviation: '+4.2%', balance: '需优化' },
    { key: '14', code: 'PH014', formulaName: '皖烟（中支）新配方', mainMaterial: '皖南云烟50%、K326 25%', auxiliaryMaterial: '其他配料25%', targetCost: '980', actualCost: '990', deviation: '+1.0%', balance: '基本平衡' },
    { key: '15', code: 'PH015', formulaName: '全品牌成本汇总', mainMaterial: '国产原料平均占比75%', auxiliaryMaterial: '进口原料平均占比25%', targetCost: '985', actualCost: '1002', deviation: '+1.7%', balance: '整体平衡' }
  ]

  // 关键原料库存预警
  const warningData = [
    { key: '1', code: 'YL001', materialName: '云南红大烟叶（特级）', formulaUsage: '8款配方', monthlyUsage: '3500', currentStock: '2800', safeStock: '4000', shortage: '1200', warningLevel: '一级预警', suggestion: '紧急采购' },
    { key: '2', code: 'YL002', materialName: 'K326烟叶（一级）', formulaUsage: '12款配方', monthlyUsage: '5200', currentStock: '4500', safeStock: '6000', shortage: '1500', warningLevel: '一级预警', suggestion: '紧急采购' },
    { key: '3', code: 'YL003', materialName: '云烟87（一级）', formulaUsage: '6款配方', monthlyUsage: '2800', currentStock: '3200', safeStock: '3500', shortage: '300', warningLevel: '二级预警', suggestion: '关注库存' },
    { key: '4', code: 'YL004', materialName: '翠碧一号（特级）', formulaUsage: '5款配方', monthlyUsage: '2000', currentStock: '2500', safeStock: '2500', shortage: '-', warningLevel: '正常', suggestion: '库存充足' },
    { key: '5', code: 'YL005', materialName: '津巴布韦进口烟叶', formulaUsage: '4款配方', monthlyUsage: '1200', currentStock: '800', safeStock: '1500', shortage: '700', warningLevel: '一级预警', suggestion: '紧急采购' },
    { key: '6', code: 'YL006', materialName: '巴西进口烟叶', formulaUsage: '3款配方', monthlyUsage: '900', currentStock: '1100', safeStock: '1200', shortage: '100', warningLevel: '二级预警', suggestion: '关注库存' },
    { key: '7', code: 'YL007', materialName: '皖南云烟85', formulaUsage: '4款配方', monthlyUsage: '1800', currentStock: '2200', safeStock: '2000', shortage: '-', warningLevel: '正常', suggestion: '库存充足' },
    { key: '8', code: 'YL008', materialName: 'NC89烟叶', formulaUsage: '5款配方', monthlyUsage: '1500', currentStock: '1800', safeStock: '1800', shortage: '-', warningLevel: '正常', suggestion: '库存充足' },
    { key: '9', code: 'YL009', materialName: '贵州遵义云烟', formulaUsage: '3款配方', monthlyUsage: '1200', currentStock: '1000', safeStock: '1500', shortage: '500', warningLevel: '二级预警', suggestion: '尽快采购' },
    { key: '10', code: 'YL010', materialName: '云南曲靖K326（特级）', formulaUsage: '6款配方', monthlyUsage: '2500', currentStock: '1800', safeStock: '3000', shortage: '1200', warningLevel: '一级预警', suggestion: '紧急采购' },
    { key: '11', code: 'YL011', materialName: '山东NC82', formulaUsage: '2款配方', monthlyUsage: '600', currentStock: '800', safeStock: '750', shortage: '-', warningLevel: '正常', suggestion: '库存充足' },
    { key: '12', code: 'YL012', materialName: '四川凉山红大', formulaUsage: '3款配方', monthlyUsage: '1100', currentStock: '900', safeStock: '1400', shortage: '500', warningLevel: '二级预警', suggestion: '尽快采购' },
    { key: '13', code: 'YL013', materialName: '湖南郴州云烟', formulaUsage: '2款配方', monthlyUsage: '800', currentStock: '1000', safeStock: '1000', shortage: '-', warningLevel: '正常', suggestion: '库存充足' },
    { key: '14', code: 'YL014', materialName: '江西赣南烟叶', formulaUsage: '2款配方', monthlyUsage: '700', currentStock: '650', safeStock: '900', shortage: '250', warningLevel: '二级预警', suggestion: '关注库存' },
    { key: '15', code: 'YL015', materialName: '福建龙岩翠碧', formulaUsage: '3款配方', monthlyUsage: '950', currentStock: '1200', safeStock: '1100', shortage: '-', warningLevel: '正常', suggestion: '库存充足' }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">叶组配方管理</h1>
        <p className="page-description">
          配方历史数据库、配方标准管理、配方资源运行分析
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {/* 配方历史数据库 Tab */}
        <TabPane tab="配方历史数据库" key="history" icon={<HistoryOutlined />}>
          <Card
            title="配方历史数据库"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建配方</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="配方总数" value={15} suffix="个" />
              </Col>
              <Col span={6}>
                <Statistic title="生产中" value={10} suffix="个" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="试产/研发" value={4} suffix="个" valueStyle={{ color: '#fa8c16' }} />
              </Col>
              <Col span={6}>
                <Statistic title="品牌覆盖" value={2} suffix="个" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '配方编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '配方名称', dataIndex: 'name', key: 'name' },
                { title: '版本', dataIndex: 'version', key: 'version', width: 70 },
                { title: '品牌', dataIndex: 'brand', key: 'brand', width: 80 },
                { title: '类型', dataIndex: 'type', key: 'type', width: 80 },
                { title: '创建日期', dataIndex: 'createDate', key: 'createDate', width: 110 },
                { title: '更新日期', dataIndex: 'updateDate', key: 'updateDate', width: 110 },
                { title: '创建人', dataIndex: 'creator', key: 'creator', width: 90 },
                { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: (s: string) => {
                  const colors: Record<string, string> = { '生产中': 'success', '试产中': 'warning', '研发中': 'processing', '已停产': 'default' }
                  return <Tag color={colors[s]}>{s}</Tag>
                }},
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                  </Space>
                )}
              ]}
              dataSource={historyData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>

        {/* 叶组配方标准管理 Tab */}
        <TabPane tab="叶组配方标准管理" key="standard" icon={<FileTextOutlined />}>
          <Card
            title="叶组配方标准管理"
            extra={<Button type="primary" icon={<PlusOutlined />}>新增标准</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="标准总数" value={15} suffix="项" />
              </Col>
              <Col span={6}>
                <Statistic title="执行中" value={13} suffix="项" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="待执行" value={2} suffix="项" valueStyle={{ color: '#fa8c16' }} />
              </Col>
              <Col span={6}>
                <Statistic title="标准类型" value={6} suffix="类" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '标准编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '标准名称', dataIndex: 'name', key: 'name' },
                { title: '标准类型', dataIndex: 'type', key: 'type', width: 100 },
                { title: '适用范围', dataIndex: 'scope', key: 'scope', width: 100 },
                { title: '版本', dataIndex: 'version', key: 'version', width: 70 },
                { title: '发布日期', dataIndex: 'publishDate', key: 'publishDate', width: 110 },
                { title: '生效日期', dataIndex: 'effectDate', key: 'effectDate', width: 110 },
                { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: (s: string) => (
                  <Tag color={s === '执行中' ? 'success' : 'warning'}>{s}</Tag>
                )},
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                  </Space>
                )}
              ]}
              dataSource={standardData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1150 }}
            />
          </Card>
        </TabPane>

        {/* 配方资源运行分析 Tab */}
        <TabPane tab="配方资源运行分析" key="resource" icon={<BarChartOutlined />}>
          <Card
            title="配方资源运行分析"
            extra={<Button type="primary" icon={<PlusOutlined />}>生成报告</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="月产量" value={93800} suffix="万支" />
              </Col>
              <Col span={6}>
                <Statistic title="平均利用率" value={85} suffix="%" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="平均质量分" value={91} suffix="分" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="平均成本" value={985} suffix="元/万支" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '分析编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '配方名称', dataIndex: 'formulaName', key: 'formulaName' },
                { title: '月产量', dataIndex: 'productionVolume', key: 'productionVolume', width: 100 },
                { title: '单位', dataIndex: 'unit', key: 'unit', width: 90 },
                { title: '原料成本(元)', dataIndex: 'materialCost', key: 'materialCost', width: 100 },
                { title: '利用率', dataIndex: 'utilizationRate', key: 'utilizationRate', width: 120, render: (r: number) => (
                  <Progress percent={r} size="small" status={r >= 80 ? 'success' : r >= 60 ? 'normal' : 'exception'} />
                )},
                { title: '质量评分', dataIndex: 'qualityScore', key: 'qualityScore', width: 90, render: (s: number) => (
                  <Tag color={s >= 90 ? 'success' : s >= 85 ? 'processing' : 'warning'}>{s}分</Tag>
                )},
                { title: '趋势', dataIndex: 'trend', key: 'trend', width: 80, render: (t: string) => {
                  const colors: Record<string, string> = { '上升': 'green', '稳定': 'blue', '下降': 'red', '波动': 'orange' }
                  return <Tag color={colors[t]}>{t}</Tag>
                }},
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<BarChartOutlined />}>图表</Button>
                  </Space>
                )}
              ]}
              dataSource={resourceData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>

        {/* 配方维护及平衡测算 Tab */}
        <TabPane tab="配方维护及平衡测算" key="balance" icon={<CalculatorOutlined />}>
          <Card
            title="配方维护及平衡测算"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建测算</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="测算配方" value={15} suffix="个" />
              </Col>
              <Col span={6}>
                <Statistic title="成本平衡" value={8} suffix="个" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="需调整" value={5} suffix="个" valueStyle={{ color: '#ff4d4f' }} />
              </Col>
              <Col span={6}>
                <Statistic title="平均偏差" value={1.7} suffix="%" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '测算编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '配方名称', dataIndex: 'formulaName', key: 'formulaName', width: 180 },
                { title: '主料配比', dataIndex: 'mainMaterial', key: 'mainMaterial' },
                { title: '辅料配比', dataIndex: 'auxiliaryMaterial', key: 'auxiliaryMaterial' },
                { title: '目标成本', dataIndex: 'targetCost', key: 'targetCost', width: 90 },
                { title: '实际成本', dataIndex: 'actualCost', key: 'actualCost', width: 90 },
                { title: '偏差', dataIndex: 'deviation', key: 'deviation', width: 80, render: (d: string) => (
                  <span style={{ color: d.startsWith('+') && parseFloat(d) > 2 ? '#ff4d4f' : d.startsWith('-') ? '#52c41a' : '#1890ff' }}>{d}</span>
                )},
                { title: '平衡状态', dataIndex: 'balance', key: 'balance', width: 100, render: (b: string) => {
                  const colors: Record<string, string> = { '平衡': 'success', '基本平衡': 'processing', '需调整': 'warning', '需优化': 'error', '整体平衡': 'success' }
                  return <Tag color={colors[b]}>{b}</Tag>
                }},
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<CalculatorOutlined />}>重算</Button>
                  </Space>
                )}
              ]}
              dataSource={balanceData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1400 }}
            />
          </Card>
        </TabPane>

        {/* 关键原料库存预警 Tab */}
        <TabPane tab="关键原料库存预警" key="warning" icon={<AlertOutlined />}>
          <Card
            title="关键原料库存预警"
            extra={<Button type="primary" icon={<PlusOutlined />}>设置预警</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="监控原料" value={15} suffix="种" />
              </Col>
              <Col span={6}>
                <Statistic title="一级预警" value={4} suffix="种" valueStyle={{ color: '#ff4d4f' }} />
              </Col>
              <Col span={6}>
                <Statistic title="二级预警" value={5} suffix="种" valueStyle={{ color: '#fa8c16' }} />
              </Col>
              <Col span={6}>
                <Statistic title="库存正常" value={6} suffix="种" valueStyle={{ color: '#52c41a' }} />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '预警编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '原料名称', dataIndex: 'materialName', key: 'materialName' },
                { title: '配方使用', dataIndex: 'formulaUsage', key: 'formulaUsage', width: 100 },
                { title: '月用量(担)', dataIndex: 'monthlyUsage', key: 'monthlyUsage', width: 100 },
                { title: '当前库存', dataIndex: 'currentStock', key: 'currentStock', width: 90 },
                { title: '安全库存', dataIndex: 'safeStock', key: 'safeStock', width: 90 },
                { title: '缺口', dataIndex: 'shortage', key: 'shortage', width: 80, render: (s: string) => (
                  <span style={{ color: s !== '-' ? '#ff4d4f' : '#52c41a' }}>{s}</span>
                )},
                { title: '预警级别', dataIndex: 'warningLevel', key: 'warningLevel', width: 100, render: (w: string) => {
                  const colors: Record<string, string> = { '一级预警': 'error', '二级预警': 'warning', '正常': 'success' }
                  return <Tag color={colors[w]}>{w}</Tag>
                }},
                { title: '建议', dataIndex: 'suggestion', key: 'suggestion', width: 100 },
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<AlertOutlined />}>采购</Button>
                  </Space>
                )}
              ]}
              dataSource={warningData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1300 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default FormulaManagement
