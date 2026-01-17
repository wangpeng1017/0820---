import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress } from 'antd'
import {
  AlertOutlined,
  DatabaseOutlined,
  EditOutlined,
  ExperimentOutlined,
  EyeOutlined,
  InboxOutlined,
  PlusOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'base': 'base',
  'purchase': 'purchase',
  'storage': 'storage',
  'sample': 'sample',
  'warning': 'warning',
}

const PATH_TAB_MAP: Record<string, string> = {
  'base': 'base',
  'purchase': 'purchase',
  'storage': 'storage',
  'sample': 'sample',
  'warning': 'warning',
}

const MaterialManagement: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'base'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())

  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/material-management/${path}`)
  }

  // 烟叶基地单元化管理数据
  const baseData = [
    { key: '1', code: 'YD001', name: '云南红河基地', province: '云南', area: '12500', variety: '红大/K326', grade: '一级', manager: '张建国', status: '生产中' },
    { key: '2', code: 'YD002', name: '贵州毕节基地', province: '贵州', area: '8600', variety: 'K326', grade: '一级', manager: '李明华', status: '生产中' },
    { key: '3', code: 'YD003', name: '湖南郴州基地', province: '湖南', area: '9800', variety: '云烟87', grade: '二级', manager: '王志强', status: '生产中' },
    { key: '4', code: 'YD004', name: '福建龙岩基地', province: '福建', area: '7200', variety: '翠碧一号', grade: '一级', manager: '陈伟明', status: '生产中' },
    { key: '5', code: 'YD005', name: '四川凉山基地', province: '四川', area: '10500', variety: '红大', grade: '一级', manager: '刘德华', status: '生产中' },
    { key: '6', code: 'YD006', name: '河南许昌基地', province: '河南', area: '6800', variety: 'NC89', grade: '二级', manager: '赵国庆', status: '休整期' },
    { key: '7', code: 'YD007', name: '山东临沂基地', province: '山东', area: '5500', variety: 'NC82', grade: '三级', manager: '周建军', status: '生产中' },
    { key: '8', code: 'YD008', name: '安徽皖南基地', province: '安徽', area: '8900', variety: '云烟85', grade: '一级', manager: '吴晓明', status: '生产中' },
    { key: '9', code: 'YD009', name: '江西赣南基地', province: '江西', area: '7600', variety: 'K326/红大', grade: '二级', manager: '黄志远', status: '生产中' },
    { key: '10', code: 'YD010', name: '广东梅州基地', province: '广东', area: '4200', variety: '翠碧一号', grade: '一级', manager: '林志伟', status: '休整期' },
    { key: '11', code: 'YD011', name: '云南曲靖基地', province: '云南', area: '15000', variety: 'K326', grade: '特级', manager: '杨建华', status: '生产中' },
    { key: '12', code: 'YD012', name: '贵州遵义基地', province: '贵州', area: '9200', variety: '云烟87', grade: '一级', manager: '郑明辉', status: '生产中' },
    { key: '13', code: 'YD013', name: '湖北恩施基地', province: '湖北', area: '6100', variety: 'NC89', grade: '二级', manager: '孙晓东', status: '生产中' },
    { key: '14', code: 'YD014', name: '重庆武隆基地', province: '重庆', area: '5800', variety: '红大', grade: '二级', manager: '钱学森', status: '休整期' },
    { key: '15', code: 'YD015', name: '陕西汉中基地', province: '陕西', area: '4500', variety: 'NC82', grade: '三级', manager: '朱国强', status: '生产中' }
  ]

  // 智能采购计划数据
  const purchaseData = [
    { key: '1', code: 'CG001', materialName: '云南红大烟叶', supplier: '云南红河烟草', quantity: '5000', unit: '担', price: '18500', totalAmount: '9250万', deliveryDate: '2024-04-15', status: '待审批' },
    { key: '2', code: 'CG002', materialName: 'K326烟叶', supplier: '贵州烟草集团', quantity: '3500', unit: '担', price: '17800', totalAmount: '6230万', deliveryDate: '2024-04-20', status: '已审批' },
    { key: '3', code: 'CG003', materialName: '云烟87烟叶', supplier: '湖南中烟', quantity: '4200', unit: '担', price: '16500', totalAmount: '6930万', deliveryDate: '2024-04-25', status: '采购中' },
    { key: '4', code: 'CG004', materialName: '翠碧一号', supplier: '福建龙岩烟草', quantity: '2800', unit: '担', price: '19200', totalAmount: '5376万', deliveryDate: '2024-05-01', status: '已完成' },
    { key: '5', code: 'CG005', materialName: '进口烟叶（巴西）', supplier: '中国烟草进出口', quantity: '1500', unit: '担', price: '25000', totalAmount: '3750万', deliveryDate: '2024-05-10', status: '待审批' },
    { key: '6', code: 'CG006', materialName: '云南曲靖K326', supplier: '云南曲靖烟草', quantity: '6000', unit: '担', price: '18000', totalAmount: '10800万', deliveryDate: '2024-05-15', status: '已审批' },
    { key: '7', code: 'CG007', materialName: '贵州遵义云烟', supplier: '贵州遵义烟草', quantity: '3800', unit: '担', price: '16800', totalAmount: '6384万', deliveryDate: '2024-05-20', status: '采购中' },
    { key: '8', code: 'CG008', materialName: 'NC89烟叶', supplier: '河南许昌烟草', quantity: '2500', unit: '担', price: '15500', totalAmount: '3875万', deliveryDate: '2024-05-25', status: '已完成' },
    { key: '9', code: 'CG009', materialName: '皖南云烟85', supplier: '安徽皖南烟草', quantity: '3200', unit: '担', price: '17200', totalAmount: '5504万', deliveryDate: '2024-06-01', status: '待审批' },
    { key: '10', code: 'CG010', materialName: '进口烟叶（津巴布韦）', supplier: '中国烟草进出口', quantity: '1200', unit: '担', price: '28000', totalAmount: '3360万', deliveryDate: '2024-06-10', status: '已审批' },
    { key: '11', code: 'CG011', materialName: '江西赣南烟叶', supplier: '江西赣南烟草', quantity: '2900', unit: '担', price: '16200', totalAmount: '4698万', deliveryDate: '2024-06-15', status: '采购中' },
    { key: '12', code: 'CG012', materialName: '四川凉山红大', supplier: '四川凉山烟草', quantity: '4500', unit: '担', price: '17500', totalAmount: '7875万', deliveryDate: '2024-06-20', status: '已完成' },
    { key: '13', code: 'CG013', materialName: '湖北恩施NC89', supplier: '湖北恩施烟草', quantity: '2100', unit: '担', price: '15800', totalAmount: '3318万', deliveryDate: '2024-06-25', status: '待审批' },
    { key: '14', code: 'CG014', materialName: '山东临沂NC82', supplier: '山东临沂烟草', quantity: '1800', unit: '担', price: '14500', totalAmount: '2610万', deliveryDate: '2024-07-01', status: '已审批' },
    { key: '15', code: 'CG015', materialName: '广东梅州翠碧', supplier: '广东梅州烟草', quantity: '1500', unit: '担', price: '19500', totalAmount: '2925万', deliveryDate: '2024-07-05', status: '采购中' }
  ]

  // 仓储醇化关联研究数据
  const storageData = [
    { key: '1', code: 'CC001', batchNo: 'BT20231001', materialName: '云南红大烟叶', warehouse: '1号恒温仓', temperature: '22±2℃', humidity: '65±5%', agingDays: '180', agingProgress: 75, quality: '优秀' },
    { key: '2', code: 'CC002', batchNo: 'BT20231015', materialName: 'K326烟叶', warehouse: '2号恒温仓', temperature: '24±2℃', humidity: '62±5%', agingDays: '165', agingProgress: 68, quality: '良好' },
    { key: '3', code: 'CC003', batchNo: 'BT20231101', materialName: '云烟87烟叶', warehouse: '3号醇化仓', temperature: '20±2℃', humidity: '68±5%', agingDays: '150', agingProgress: 62, quality: '优秀' },
    { key: '4', code: 'CC004', batchNo: 'BT20231115', materialName: '翠碧一号', warehouse: '1号恒温仓', temperature: '22±2℃', humidity: '65±5%', agingDays: '135', agingProgress: 56, quality: '良好' },
    { key: '5', code: 'CC005', batchNo: 'BT20231201', materialName: '进口巴西烟叶', warehouse: '4号特藏仓', temperature: '18±2℃', humidity: '60±5%', agingDays: '120', agingProgress: 50, quality: '优秀' },
    { key: '6', code: 'CC006', batchNo: 'BT20231215', materialName: '云南曲靖K326', warehouse: '2号恒温仓', temperature: '24±2℃', humidity: '62±5%', agingDays: '105', agingProgress: 43, quality: '良好' },
    { key: '7', code: 'CC007', batchNo: 'BT20240101', materialName: '贵州遵义云烟', warehouse: '3号醇化仓', temperature: '20±2℃', humidity: '68±5%', agingDays: '90', agingProgress: 37, quality: '良好' },
    { key: '8', code: 'CC008', batchNo: 'BT20240115', materialName: 'NC89烟叶', warehouse: '5号常温仓', temperature: '25±3℃', humidity: '55±5%', agingDays: '75', agingProgress: 31, quality: '合格' },
    { key: '9', code: 'CC009', batchNo: 'BT20240201', materialName: '皖南云烟85', warehouse: '1号恒温仓', temperature: '22±2℃', humidity: '65±5%', agingDays: '60', agingProgress: 25, quality: '良好' },
    { key: '10', code: 'CC010', batchNo: 'BT20240215', materialName: '津巴布韦烟叶', warehouse: '4号特藏仓', temperature: '18±2℃', humidity: '60±5%', agingDays: '45', agingProgress: 18, quality: '优秀' },
    { key: '11', code: 'CC011', batchNo: 'BT20240301', materialName: '江西赣南烟叶', warehouse: '2号恒温仓', temperature: '24±2℃', humidity: '62±5%', agingDays: '30', agingProgress: 12, quality: '待评估' },
    { key: '12', code: 'CC012', batchNo: 'BT20240315', materialName: '四川凉山红大', warehouse: '3号醇化仓', temperature: '20±2℃', humidity: '68±5%', agingDays: '15', agingProgress: 6, quality: '待评估' },
    { key: '13', code: 'CC013', batchNo: 'BT20230801', materialName: '云南红河K326', warehouse: '1号恒温仓', temperature: '22±2℃', humidity: '65±5%', agingDays: '240', agingProgress: 100, quality: '优秀' },
    { key: '14', code: 'CC014', batchNo: 'BT20230815', materialName: '贵州毕节烟叶', warehouse: '2号恒温仓', temperature: '24±2℃', humidity: '62±5%', agingDays: '225', agingProgress: 93, quality: '优秀' },
    { key: '15', code: 'CC015', batchNo: 'BT20230901', materialName: '湖南郴州云烟', warehouse: '3号醇化仓', temperature: '20±2℃', humidity: '68±5%', agingDays: '210', agingProgress: 87, quality: '良好' }
  ]

  // 样品库智能化管理数据
  const sampleData = [
    { key: '1', code: 'YP001', sampleName: '云南红大样品A', sampleType: '烟叶样品', origin: '云南红河', batch: 'BT20240301', storageLocation: 'A区-01-001', temperature: '18℃', status: '在库' },
    { key: '2', code: 'YP002', sampleName: 'K326样品B', sampleType: '烟叶样品', origin: '贵州毕节', batch: 'BT20240302', storageLocation: 'A区-01-002', temperature: '18℃', status: '在库' },
    { key: '3', code: 'YP003', sampleName: '云烟87样品C', sampleType: '烟叶样品', origin: '湖南郴州', batch: 'BT20240303', storageLocation: 'A区-02-001', temperature: '18℃', status: '检测中' },
    { key: '4', code: 'YP004', sampleName: '翠碧一号样品D', sampleType: '烟叶样品', origin: '福建龙岩', batch: 'BT20240304', storageLocation: 'A区-02-002', temperature: '18℃', status: '在库' },
    { key: '5', code: 'YP005', sampleName: '巴西进口样品E', sampleType: '进口烟叶', origin: '巴西', batch: 'BT20240305', storageLocation: 'B区-01-001', temperature: '15℃', status: '在库' },
    { key: '6', code: 'YP006', sampleName: '香精样品F', sampleType: '香精样品', origin: '安徽合肥', batch: 'XJ20240301', storageLocation: 'C区-01-001', temperature: '10℃', status: '检测中' },
    { key: '7', code: 'YP007', sampleName: '香料样品G', sampleType: '香料样品', origin: '云南昆明', batch: 'XL20240301', storageLocation: 'C区-01-002', temperature: '10℃', status: '在库' },
    { key: '8', code: 'YP008', sampleName: '成品烟样品H', sampleType: '成品样品', origin: '生产车间', batch: 'CP20240301', storageLocation: 'D区-01-001', temperature: '20℃', status: '评吸中' },
    { key: '9', code: 'YP009', sampleName: '竞品样品I', sampleType: '竞品样品', origin: '市场采购', batch: 'JP20240301', storageLocation: 'E区-01-001', temperature: '20℃', status: '在库' },
    { key: '10', code: 'YP010', sampleName: '皖南云烟样品J', sampleType: '烟叶样品', origin: '安徽皖南', batch: 'BT20240306', storageLocation: 'A区-03-001', temperature: '18℃', status: '在库' },
    { key: '11', code: 'YP011', sampleName: '津巴布韦样品K', sampleType: '进口烟叶', origin: '津巴布韦', batch: 'BT20240307', storageLocation: 'B区-01-002', temperature: '15℃', status: '检测中' },
    { key: '12', code: 'YP012', sampleName: '四川红大样品L', sampleType: '烟叶样品', origin: '四川凉山', batch: 'BT20240308', storageLocation: 'A区-03-002', temperature: '18℃', status: '已出库' },
    { key: '13', code: 'YP013', sampleName: '新配方样品M', sampleType: '研发样品', origin: '研发中心', batch: 'YF20240301', storageLocation: 'F区-01-001', temperature: '20℃', status: '在库' },
    { key: '14', code: 'YP014', sampleName: '对照组样品N', sampleType: '对照样品', origin: '质检中心', batch: 'DZ20240301', storageLocation: 'F区-01-002', temperature: '20℃', status: '在库' },
    { key: '15', code: 'YP015', sampleName: '留样样品O', sampleType: '留样样品', origin: '生产车间', batch: 'LY20240301', storageLocation: 'G区-01-001', temperature: '18℃', status: '在库' }
  ]

  // 样品库存智能预警数据
  const warningData = [
    { key: '1', code: 'YJ001', materialName: '云南红大烟叶', currentStock: '2500', safeStock: '3000', unit: '担', shortage: '500', warningLevel: '一级预警', trend: '下降', suggestion: '建议立即采购' },
    { key: '2', code: 'YJ002', materialName: 'K326烟叶', currentStock: '1800', safeStock: '2500', unit: '担', shortage: '700', warningLevel: '一级预警', trend: '下降', suggestion: '建议立即采购' },
    { key: '3', code: 'YJ003', materialName: '云烟87烟叶', currentStock: '2800', safeStock: '3000', unit: '担', shortage: '200', warningLevel: '二级预警', trend: '稳定', suggestion: '建议关注' },
    { key: '4', code: 'YJ004', materialName: '翠碧一号', currentStock: '3200', safeStock: '2500', unit: '担', shortage: '-', warningLevel: '正常', trend: '上升', suggestion: '库存充足' },
    { key: '5', code: 'YJ005', materialName: '进口巴西烟叶', currentStock: '800', safeStock: '1200', unit: '担', shortage: '400', warningLevel: '一级预警', trend: '下降', suggestion: '建议紧急采购' },
    { key: '6', code: 'YJ006', materialName: '津巴布韦烟叶', currentStock: '600', safeStock: '1000', unit: '担', shortage: '400', warningLevel: '一级预警', trend: '下降', suggestion: '建议紧急采购' },
    { key: '7', code: 'YJ007', materialName: 'NC89烟叶', currentStock: '2200', safeStock: '2000', unit: '担', shortage: '-', warningLevel: '正常', trend: '稳定', suggestion: '库存充足' },
    { key: '8', code: 'YJ008', materialName: '皖南云烟85', currentStock: '1500', safeStock: '2000', unit: '担', shortage: '500', warningLevel: '二级预警', trend: '下降', suggestion: '建议尽快采购' },
    { key: '9', code: 'YJ009', materialName: '江西赣南烟叶', currentStock: '1900', safeStock: '1800', unit: '担', shortage: '-', warningLevel: '正常', trend: '上升', suggestion: '库存充足' },
    { key: '10', code: 'YJ010', materialName: '四川凉山红大', currentStock: '2100', safeStock: '2500', unit: '担', shortage: '400', warningLevel: '二级预警', trend: '稳定', suggestion: '建议关注' },
    { key: '11', code: 'YJ011', materialName: '贵州遵义云烟', currentStock: '2600', safeStock: '2400', unit: '担', shortage: '-', warningLevel: '正常', trend: '稳定', suggestion: '库存充足' },
    { key: '12', code: 'YJ012', materialName: '湖北恩施NC89', currentStock: '1100', safeStock: '1500', unit: '担', shortage: '400', warningLevel: '二级预警', trend: '下降', suggestion: '建议尽快采购' },
    { key: '13', code: 'YJ013', materialName: '山东临沂NC82', currentStock: '900', safeStock: '1200', unit: '担', shortage: '300', warningLevel: '二级预警', trend: '下降', suggestion: '建议关注' },
    { key: '14', code: 'YJ014', materialName: '广东梅州翠碧', currentStock: '1300', safeStock: '1000', unit: '担', shortage: '-', warningLevel: '正常', trend: '稳定', suggestion: '库存充足' },
    { key: '15', code: 'YJ015', materialName: '主要香精原料', currentStock: '350', safeStock: '500', unit: 'kg', shortage: '150', warningLevel: '一级预警', trend: '下降', suggestion: '建议紧急采购' }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">原料管理</h1>
        <p className="page-description">
          烟叶基地单元化管理、智能采购计划、仓储醇化关联研究
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {/* 烟叶基地单元化管理 Tab */}
        <TabPane tab="烟叶基地单元化管理" key="base" icon={<DatabaseOutlined />}>
          <Card
            title="烟叶基地单元化管理"
            extra={<Button type="primary" icon={<PlusOutlined />}>新增基地</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="基地总数" value={15} suffix="个" />
              </Col>
              <Col span={6}>
                <Statistic title="生产中" value={12} suffix="个" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="总面积" value={112300} suffix="亩" />
              </Col>
              <Col span={6}>
                <Statistic title="一级基地" value={8} suffix="个" valueStyle={{ color: '#1890ff' }} />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '基地编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '基地名称', dataIndex: 'name', key: 'name', width: 150 },
                { title: '省份', dataIndex: 'province', key: 'province', width: 80 },
                { title: '面积(亩)', dataIndex: 'area', key: 'area', width: 100 },
                { title: '主要品种', dataIndex: 'variety', key: 'variety', width: 120 },
                { title: '基地等级', dataIndex: 'grade', key: 'grade', width: 80, render: (g: string) => {
                  const colors: Record<string, string> = { '特级': 'gold', '一级': 'green', '二级': 'blue', '三级': 'default' }
                  return <Tag color={colors[g]}>{g}</Tag>
                }},
                { title: '负责人', dataIndex: 'manager', key: 'manager', width: 100 },
                { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: (s: string) => (
                  <Tag color={s === '生产中' ? 'success' : 'warning'}>{s}</Tag>
                )},
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                  </Space>
                )}
              ]}
              dataSource={baseData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1100 }}
            />
          </Card>
        </TabPane>

        {/* 智能采购计划 Tab */}
        <TabPane tab="智能采购计划" key="purchase" icon={<ShoppingCartOutlined />}>
          <Card
            title="智能采购计划"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建采购单</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="本月采购计划" value={15} suffix="项" />
              </Col>
              <Col span={6}>
                <Statistic title="已完成" value={4} suffix="项" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="采购中" value={5} suffix="项" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="总金额" value={82883} suffix="万" prefix="¥" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '采购编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '原料名称', dataIndex: 'materialName', key: 'materialName' },
                { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 150 },
                { title: '数量', dataIndex: 'quantity', key: 'quantity', width: 80 },
                { title: '单价(元/担)', dataIndex: 'price', key: 'price', width: 100 },
                { title: '总金额', dataIndex: 'totalAmount', key: 'totalAmount', width: 100 },
                { title: '交付日期', dataIndex: 'deliveryDate', key: 'deliveryDate', width: 120 },
                { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: (s: string) => {
                  const colors: Record<string, string> = { '待审批': 'warning', '已审批': 'processing', '采购中': 'blue', '已完成': 'success' }
                  return <Tag color={colors[s]}>{s}</Tag>
                }},
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                  </Space>
                )}
              ]}
              dataSource={purchaseData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>

        {/* 仓储醇化关联研究 Tab */}
        <TabPane tab="仓储醇化关联研究" key="storage" icon={<InboxOutlined />}>
          <Card
            title="仓储醇化关联研究"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建研究</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="在库批次" value={15} suffix="批" />
              </Col>
              <Col span={6}>
                <Statistic title="醇化完成" value={3} suffix="批" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="优秀品质" value={6} suffix="批" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="平均进度" value={52} suffix="%" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '编号', dataIndex: 'code', key: 'code', width: 80 },
                { title: '批次号', dataIndex: 'batchNo', key: 'batchNo', width: 130 },
                { title: '原料名称', dataIndex: 'materialName', key: 'materialName' },
                { title: '仓库', dataIndex: 'warehouse', key: 'warehouse', width: 100 },
                { title: '温度', dataIndex: 'temperature', key: 'temperature', width: 80 },
                { title: '湿度', dataIndex: 'humidity', key: 'humidity', width: 80 },
                { title: '醇化天数', dataIndex: 'agingDays', key: 'agingDays', width: 80 },
                { title: '醇化进度', dataIndex: 'agingProgress', key: 'agingProgress', width: 150, render: (p: number) => (
                  <Progress percent={p} size="small" status={p >= 100 ? 'success' : 'active'} />
                )},
                { title: '品质评估', dataIndex: 'quality', key: 'quality', width: 100, render: (q: string) => {
                  const colors: Record<string, string> = { '优秀': 'success', '良好': 'processing', '合格': 'default', '待评估': 'warning' }
                  return <Tag color={colors[q]}>{q}</Tag>
                }},
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                  </Space>
                )}
              ]}
              dataSource={storageData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1300 }}
            />
          </Card>
        </TabPane>

        {/* 样品库智能化管理 Tab */}
        <TabPane tab="样品库智能化管理" key="sample" icon={<ExperimentOutlined />}>
          <Card
            title="样品库智能化管理"
            extra={<Button type="primary" icon={<PlusOutlined />}>新增样品</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="样品总数" value={15} suffix="件" />
              </Col>
              <Col span={6}>
                <Statistic title="在库样品" value={12} suffix="件" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="检测中" value={3} suffix="件" valueStyle={{ color: '#fa8c16' }} />
              </Col>
              <Col span={6}>
                <Statistic title="存储区域" value={7} suffix="个" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '样品编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '样品名称', dataIndex: 'sampleName', key: 'sampleName' },
                { title: '样品类型', dataIndex: 'sampleType', key: 'sampleType', width: 100 },
                { title: '产地/来源', dataIndex: 'origin', key: 'origin', width: 100 },
                { title: '批次号', dataIndex: 'batch', key: 'batch', width: 120 },
                { title: '存储位置', dataIndex: 'storageLocation', key: 'storageLocation', width: 120 },
                { title: '存储温度', dataIndex: 'temperature', key: 'temperature', width: 80 },
                { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: (s: string) => {
                  const colors: Record<string, string> = { '在库': 'success', '检测中': 'processing', '评吸中': 'warning', '已出库': 'default' }
                  return <Tag color={colors[s]}>{s}</Tag>
                }},
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                  </Space>
                )}
              ]}
              dataSource={sampleData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>

        {/* 样品库存智能预警 Tab */}
        <TabPane tab="样品库存智能预警" key="warning" icon={<AlertOutlined />}>
          <Card
            title="样品库存智能预警"
            extra={<Button type="primary" icon={<PlusOutlined />}>设置预警</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="监控品类" value={15} suffix="种" />
              </Col>
              <Col span={6}>
                <Statistic title="一级预警" value={5} suffix="种" valueStyle={{ color: '#ff4d4f' }} />
              </Col>
              <Col span={6}>
                <Statistic title="二级预警" value={5} suffix="种" valueStyle={{ color: '#fa8c16' }} />
              </Col>
              <Col span={6}>
                <Statistic title="库存正常" value={5} suffix="种" valueStyle={{ color: '#52c41a' }} />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '预警编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '原料名称', dataIndex: 'materialName', key: 'materialName' },
                { title: '当前库存', dataIndex: 'currentStock', key: 'currentStock', width: 100 },
                { title: '安全库存', dataIndex: 'safeStock', key: 'safeStock', width: 100 },
                { title: '单位', dataIndex: 'unit', key: 'unit', width: 60 },
                { title: '缺口', dataIndex: 'shortage', key: 'shortage', width: 80, render: (s: string) => (
                  <span style={{ color: s !== '-' ? '#ff4d4f' : '#52c41a' }}>{s}</span>
                )},
                { title: '预警级别', dataIndex: 'warningLevel', key: 'warningLevel', width: 100, render: (w: string) => {
                  const colors: Record<string, string> = { '一级预警': 'error', '二级预警': 'warning', '正常': 'success' }
                  return <Tag color={colors[w]}>{w}</Tag>
                }},
                { title: '趋势', dataIndex: 'trend', key: 'trend', width: 80, render: (t: string) => {
                  const colors: Record<string, string> = { '下降': 'red', '稳定': 'blue', '上升': 'green' }
                  return <Tag color={colors[t]}>{t}</Tag>
                }},
                { title: '处理建议', dataIndex: 'suggestion', key: 'suggestion', width: 150 },
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<ShoppingCartOutlined />}>采购</Button>
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

export default MaterialManagement
