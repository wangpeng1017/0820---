import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress } from 'antd'
import {
  BulbOutlined,
  CheckCircleOutlined,
  EditOutlined,
  ExperimentOutlined,
  EyeOutlined,
  FileTextOutlined,
  PlusOutlined,
  SafetyOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'recommend': 'recommend',
  'paper': 'paper',
  'filter': 'filter',
  'tipping': 'tipping',
  'combination': 'combination',
}

const PATH_TAB_MAP: Record<string, string> = {
  'recommend': 'recommend',
  'paper': 'paper',
  'filter': 'filter',
  'tipping': 'tipping',
  'combination': 'combination',
}

// ==================== Tab 1: 辅���组合智能推荐 ====================
const recommendData = [
  { key: '1', recCode: 'REC-001', productName: '黄山(硬红)', targetStyle: '醇和型', paperRec: '白卡纸27mm/45CU', filterRec: '醋纤7.8mm/85%', tippingRec: '镀铝64mm', matchScore: 96.5, status: '已采纳', createTime: '2024-03-01' },
  { key: '2', recCode: 'REC-002', productName: '皖烟(软金)', targetStyle: '浓香型', paperRec: '麻浆纸27mm/35CU', filterRec: '复合7.8mm/三段', tippingRec: '全息64mm', matchScore: 94.2, status: '评估中', createTime: '2024-03-05' },
  { key: '3', recCode: 'REC-003', productName: '黄山(细支)', targetStyle: '清雅型', paperRec: '透气纸24mm/80CU', filterRec: '细支5.4mm/88%', tippingRec: '水松54mm', matchScore: 97.8, status: '已采纳', createTime: '2024-03-08' },
  { key: '4', recCode: 'REC-004', productName: '皖烟(中支)', targetStyle: '均衡型', paperRec: '白卡纸25mm/50CU', filterRec: '中空7.8mm/20%', tippingRec: '镀铝60mm', matchScore: 92.1, status: '待评估', createTime: '2024-03-10' },
  { key: '5', recCode: 'REC-005', productName: '黄山(天都)', targetStyle: '高端醇香', paperRec: '进口纸27mm/42CU', filterRec: '活性炭7.8mm/45mg', tippingRec: '全息64mm', matchScore: 98.5, status: '已采纳', createTime: '2024-03-12' },
  { key: '6', recCode: 'REC-006', productName: '皖烟(爆珠)', targetStyle: '创新口感', paperRec: '透气纸27mm/75CU', filterRec: '爆珠7.8mm/3.2mm', tippingRec: '特种64mm', matchScore: 95.6, status: '评估中', createTime: '2024-03-15' },
  { key: '7', recCode: 'REC-007', productName: '黄山(迎客松)', targetStyle: '经典醇厚', paperRec: '麻浆纸27mm/38CU', filterRec: '复合7.8mm/双段', tippingRec: '水松58mm', matchScore: 93.8, status: '已采纳', createTime: '2024-03-18' },
  { key: '8', recCode: 'REC-008', productName: '皖烟(徽商)', targetStyle: '商务型', paperRec: '白卡纸27mm/48CU', filterRec: '醋纤7.8mm/82%', tippingRec: '镀铝64mm', matchScore: 91.5, status: '待评估', createTime: '2024-03-20' },
  { key: '9', recCode: 'REC-009', productName: '黄山(1993)', targetStyle: '怀旧经典', paperRec: '特种纸27mm/40CU', filterRec: '活性炭7.8mm/40mg', tippingRec: '全息64mm', matchScore: 97.2, status: '已采纳', createTime: '2024-03-22' },
  { key: '10', recCode: 'REC-010', productName: '皖烟(国宾)', targetStyle: '礼品型', paperRec: '进口纸27mm/45CU', filterRec: '复合7.8mm/三段', tippingRec: '激光64mm', matchScore: 96.8, status: '评估中', createTime: '2024-03-25' },
  { key: '11', recCode: 'REC-011', productName: '黄山(软蓝)', targetStyle: '淡雅型', paperRec: '透气纸27mm/85CU', filterRec: '中空7.8mm/25%', tippingRec: '水松54mm', matchScore: 94.5, status: '已采纳', createTime: '2024-03-28' },
  { key: '12', recCode: 'REC-012', productName: '皖烟(黄金叶)', targetStyle: '经济型', paperRec: '白卡纸27mm/50CU', filterRec: '醋纤7.8mm/80%', tippingRec: '镀铝60mm', matchScore: 89.2, status: '待评估', createTime: '2024-04-01' },
  { key: '13', recCode: 'REC-013', productName: '黄山(新概念)', targetStyle: '创新型', paperRec: '纳米纸27mm/55CU', filterRec: '智能7.8mm/感温', tippingRec: '光变64mm', matchScore: 98.2, status: '评估中', createTime: '2024-04-05' },
  { key: '14', recCode: 'REC-014', productName: '皖烟(硬红)', targetStyle: '大众型', paperRec: '白卡纸27mm/45CU', filterRec: '醋纤7.8mm/83%', tippingRec: '镀铝64mm', matchScore: 90.8, status: '已采纳', createTime: '2024-04-08' },
  { key: '15', recCode: 'REC-015', productName: '黄山(硬金)', targetStyle: '中高端', paperRec: '麻浆纸27mm/42CU', filterRec: '复合7.8mm/双段', tippingRec: '全息64mm', matchScore: 95.1, status: '已采纳', createTime: '2024-04-10' },
]

// ==================== Tab 2: 卷烟纸设计参数 ====================
const paperData = [
  { key: '1', designCode: 'CP-001', paperType: '白卡纸', width: '27mm', length: '3000m', permeability: '45CU', weight: '25g/m²', burnRate: '4.5mm/s', ashColor: '白灰', targetProduct: '黄山(硬红)', status: '已定型' },
  { key: '2', designCode: 'CP-002', paperType: '麻浆纸', width: '27mm', length: '3000m', permeability: '35CU', weight: '28g/m²', burnRate: '4.2mm/s', ashColor: '灰白', targetProduct: '皖烟(软金)', status: '试制中' },
  { key: '3', designCode: 'CP-003', paperType: '透气纸', width: '24mm', length: '3000m', permeability: '80CU', weight: '23g/m²', burnRate: '5.0mm/s', ashColor: '白灰', targetProduct: '黄山(细支)', status: '已定型' },
  { key: '4', designCode: 'CP-004', paperType: '进口纸', width: '27mm', length: '2500m', permeability: '42CU', weight: '26g/m²', burnRate: '4.3mm/s', ashColor: '纯白', targetProduct: '黄山(天都)', status: '已定型' },
  { key: '5', designCode: 'CP-005', paperType: '特种纸', width: '27mm', length: '3000m', permeability: '40CU', weight: '27g/m²', burnRate: '4.0mm/s', ashColor: '灰白', targetProduct: '黄山(1993)', status: '试制中' },
  { key: '6', designCode: 'CP-006', paperType: '纳米纸', width: '27mm', length: '2000m', permeability: '55CU', weight: '24g/m²', burnRate: '4.8mm/s', ashColor: '白灰', targetProduct: '黄山(新概念)', status: '研发中' },
  { key: '7', designCode: 'CP-007', paperType: '白卡纸', width: '25mm', length: '3000m', permeability: '50CU', weight: '25g/m²', burnRate: '4.5mm/s', ashColor: '白灰', targetProduct: '皖烟(中支)', status: '已定型' },
  { key: '8', designCode: 'CP-008', paperType: '透气纸', width: '27mm', length: '3000m', permeability: '75CU', weight: '22g/m²', burnRate: '5.2mm/s', ashColor: '白灰', targetProduct: '皖烟(爆珠)', status: '试制中' },
  { key: '9', designCode: 'CP-009', paperType: '麻浆纸', width: '27mm', length: '3000m', permeability: '38CU', weight: '28g/m²', burnRate: '4.1mm/s', ashColor: '灰白', targetProduct: '黄山(迎客松)', status: '已定型' },
  { key: '10', designCode: 'CP-010', paperType: '白卡纸', width: '27mm', length: '3000m', permeability: '48CU', weight: '25g/m²', burnRate: '4.4mm/s', ashColor: '白灰', targetProduct: '皖烟(徽商)', status: '已定型' },
  { key: '11', designCode: 'CP-011', paperType: '透气纸', width: '27mm', length: '3000m', permeability: '85CU', weight: '21g/m²', burnRate: '5.5mm/s', ashColor: '白灰', targetProduct: '黄山(软蓝)', status: '已定型' },
  { key: '12', designCode: 'CP-012', paperType: '进口纸', width: '27mm', length: '2500m', permeability: '45CU', weight: '26g/m²', burnRate: '4.3mm/s', ashColor: '纯白', targetProduct: '皖烟(国宾)', status: '试制中' },
  { key: '13', designCode: 'CP-013', paperType: '白卡纸', width: '27mm', length: '3000m', permeability: '50CU', weight: '25g/m²', burnRate: '4.5mm/s', ashColor: '白灰', targetProduct: '皖烟(黄金叶)', status: '已定型' },
  { key: '14', designCode: 'CP-014', paperType: '白卡纸', width: '27mm', length: '3000m', permeability: '45CU', weight: '25g/m²', burnRate: '4.5mm/s', ashColor: '白灰', targetProduct: '皖烟(硬红)', status: '已定型' },
  { key: '15', designCode: 'CP-015', paperType: '麻浆纸', width: '27mm', length: '3000m', permeability: '42CU', weight: '27g/m²', burnRate: '4.2mm/s', ashColor: '灰白', targetProduct: '黄山(硬金)', status: '已定型' },
]

// ==================== Tab 3: 滤嘴棒设计参数 ====================
const filterData = [
  { key: '1', designCode: 'FL-001', filterType: '醋纤滤嘴', diameter: '7.8mm', length: '120mm', hardness: '85%', drawResist: '1200Pa', efficiency: '38%', targetProduct: '黄山(硬红)', status: '已定型' },
  { key: '2', designCode: 'FL-002', filterType: '复合滤嘴', diameter: '7.8mm', length: '120mm', segment: '三段式', drawResist: '1350Pa', efficiency: '45%', targetProduct: '皖烟(软金)', status: '试制中' },
  { key: '3', designCode: 'FL-003', filterType: '细支滤嘴', diameter: '5.4mm', length: '120mm', hardness: '88%', drawResist: '1500Pa', efficiency: '42%', targetProduct: '黄山(细支)', status: '已定型' },
  { key: '4', designCode: 'FL-004', filterType: '活性炭滤嘴', diameter: '7.8mm', length: '120mm', carbonContent: '45mg', drawResist: '1400Pa', efficiency: '52%', targetProduct: '黄山(天都)', status: '已定型' },
  { key: '5', designCode: 'FL-005', filterType: '爆珠滤嘴', diameter: '7.8mm', length: '120mm', capsuleSize: '3.2mm', burstForce: '1.5N', efficiency: '40%', targetProduct: '皖烟(爆珠)', status: '试制中' },
  { key: '6', designCode: 'FL-006', filterType: '中空滤嘴', diameter: '7.8mm', length: '120mm', hollowRate: '20%', drawResist: '1100Pa', efficiency: '35%', targetProduct: '皖烟(中支)', status: '已定型' },
  { key: '7', designCode: 'FL-007', filterType: '复合滤嘴', diameter: '7.8mm', length: '120mm', segment: '双段式', drawResist: '1300Pa', efficiency: '43%', targetProduct: '黄山(迎客松)', status: '已定型' },
  { key: '8', designCode: 'FL-008', filterType: '醋纤滤嘴', diameter: '7.8mm', length: '120mm', hardness: '82%', drawResist: '1180Pa', efficiency: '36%', targetProduct: '皖烟(徽商)', status: '已定型' },
  { key: '9', designCode: 'FL-009', filterType: '活性炭滤嘴', diameter: '7.8mm', length: '120mm', carbonContent: '40mg', drawResist: '1380Pa', efficiency: '50%', targetProduct: '黄山(1993)', status: '已定型' },
  { key: '10', designCode: 'FL-010', filterType: '复合滤嘴', diameter: '7.8mm', length: '120mm', segment: '三段式', drawResist: '1400Pa', efficiency: '48%', targetProduct: '皖烟(国宾)', status: '试制中' },
  { key: '11', designCode: 'FL-011', filterType: '中空滤嘴', diameter: '7.8mm', length: '120mm', hollowRate: '25%', drawResist: '1050Pa', efficiency: '33%', targetProduct: '黄山(软蓝)', status: '已定型' },
  { key: '12', designCode: 'FL-012', filterType: '醋纤滤嘴', diameter: '7.8mm', length: '120mm', hardness: '80%', drawResist: '1150Pa', efficiency: '35%', targetProduct: '皖烟(黄金叶)', status: '已定型' },
  { key: '13', designCode: 'FL-013', filterType: '智能滤嘴', diameter: '7.8mm', length: '120mm', sensorType: '感温', drawResist: '1250Pa', efficiency: '40%', targetProduct: '黄山(新概念)', status: '研发中' },
  { key: '14', designCode: 'FL-014', filterType: '醋纤滤嘴', diameter: '7.8mm', length: '120mm', hardness: '83%', drawResist: '1200Pa', efficiency: '37%', targetProduct: '皖烟(硬红)', status: '已定型' },
  { key: '15', designCode: 'FL-015', filterType: '复合滤嘴', diameter: '7.8mm', length: '120mm', segment: '双段式', drawResist: '1280Pa', efficiency: '42%', targetProduct: '黄山(硬金)', status: '已定型' },
]

// ==================== Tab 4: 接装纸设计参数 ====================
const tippingData = [
  { key: '1', designCode: 'TP-001', tippingType: '镀铝接装纸', width: '64mm', length: '5000m', thickness: '0.035mm', tensile: '≥35N', printColor: '2色', targetProduct: '黄山(硬红)', status: '已定型' },
  { key: '2', designCode: 'TP-002', tippingType: '全息接装纸', width: '64mm', length: '4000m', thickness: '0.038mm', laserType: '猫眼', printColor: '4色', targetProduct: '皖烟(软金)', status: '试制中' },
  { key: '3', designCode: 'TP-003', tippingType: '水松纸', width: '54mm', length: '5000m', thickness: '0.032mm', tensile: '≥30N', printColor: '3色', targetProduct: '黄山(细支)', status: '已定型' },
  { key: '4', designCode: 'TP-004', tippingType: '全息接装纸', width: '64mm', length: '4000m', thickness: '0.040mm', laserType: '动态', printColor: '5色', targetProduct: '黄山(天都)', status: '已定型' },
  { key: '5', designCode: 'TP-005', tippingType: '特种接装纸', width: '64mm', length: '3500m', thickness: '0.042mm', tensile: '≥40N', printColor: '4色', targetProduct: '皖烟(爆珠)', status: '试制中' },
  { key: '6', designCode: 'TP-006', tippingType: '镀铝接装纸', width: '60mm', length: '5000m', thickness: '0.035mm', tensile: '≥35N', printColor: '2色', targetProduct: '皖烟(中支)', status: '已定型' },
  { key: '7', designCode: 'TP-007', tippingType: '水松纸', width: '58mm', length: '5000m', thickness: '0.033mm', tensile: '≥32N', printColor: '3色', targetProduct: '黄山(迎客松)', status: '已定型' },
  { key: '8', designCode: 'TP-008', tippingType: '镀铝接装纸', width: '64mm', length: '5000m', thickness: '0.035mm', tensile: '≥35N', printColor: '2色', targetProduct: '皖烟(徽商)', status: '已定型' },
  { key: '9', designCode: 'TP-009', tippingType: '全息接装纸', width: '64mm', length: '4000m', thickness: '0.038mm', laserType: '微纹', printColor: '4色', targetProduct: '黄山(1993)', status: '已定型' },
  { key: '10', designCode: 'TP-010', tippingType: '激光接装纸', width: '64mm', length: '3500m', thickness: '0.045mm', laserType: '3D', printColor: '6色', targetProduct: '皖烟(国宾)', status: '试制中' },
  { key: '11', designCode: 'TP-011', tippingType: '水松纸', width: '54mm', length: '5000m', thickness: '0.030mm', tensile: '≥28N', printColor: '2色', targetProduct: '黄山(软蓝)', status: '已定型' },
  { key: '12', designCode: 'TP-012', tippingType: '镀铝接装纸', width: '60mm', length: '5000m', thickness: '0.035mm', tensile: '≥35N', printColor: '2色', targetProduct: '皖烟(黄金叶)', status: '已定型' },
  { key: '13', designCode: 'TP-013', tippingType: '光变接装纸', width: '64mm', length: '3000m', thickness: '0.048mm', laserType: '角变', printColor: '5色', targetProduct: '黄山(新概念)', status: '研发中' },
  { key: '14', designCode: 'TP-014', tippingType: '镀铝接装纸', width: '64mm', length: '5000m', thickness: '0.035mm', tensile: '≥35N', printColor: '2色', targetProduct: '皖烟(硬红)', status: '已定型' },
  { key: '15', designCode: 'TP-015', tippingType: '全息接装纸', width: '64mm', length: '4000m', thickness: '0.038mm', laserType: '猫眼', printColor: '4色', targetProduct: '黄山(硬金)', status: '已定型' },
]

// ==================== Tab 5: 辅材组合方案 ====================
const combinationData = [
  { key: '1', comboCode: 'CMB-001', productName: '黄山(硬红)', paperSpec: 'CP-001', filterSpec: 'FL-001', tippingSpec: 'TP-001', glueType: 'PVA胶', totalCost: 0.125, qualityScore: 96.5, progress: 100, status: '已投产' },
  { key: '2', comboCode: 'CMB-002', productName: '皖烟(软金)', paperSpec: 'CP-002', filterSpec: 'FL-002', tippingSpec: 'TP-002', glueType: 'PVA胶', totalCost: 0.145, qualityScore: 94.2, progress: 75, status: '试产中' },
  { key: '3', comboCode: 'CMB-003', productName: '黄山(细支)', paperSpec: 'CP-003', filterSpec: 'FL-003', tippingSpec: 'TP-003', glueType: '热熔胶', totalCost: 0.118, qualityScore: 97.8, progress: 100, status: '已投产' },
  { key: '4', comboCode: 'CMB-004', productName: '皖烟(中支)', paperSpec: 'CP-007', filterSpec: 'FL-006', tippingSpec: 'TP-006', glueType: 'PVA胶', totalCost: 0.128, qualityScore: 92.1, progress: 60, status: '评估中' },
  { key: '5', comboCode: 'CMB-005', productName: '黄山(天都)', paperSpec: 'CP-004', filterSpec: 'FL-004', tippingSpec: 'TP-004', glueType: '进口胶', totalCost: 0.185, qualityScore: 98.5, progress: 100, status: '已投产' },
  { key: '6', comboCode: 'CMB-006', productName: '皖烟(爆珠)', paperSpec: 'CP-008', filterSpec: 'FL-005', tippingSpec: 'TP-005', glueType: '特种胶', totalCost: 0.198, qualityScore: 95.6, progress: 80, status: '试产中' },
  { key: '7', comboCode: 'CMB-007', productName: '黄山(迎客松)', paperSpec: 'CP-009', filterSpec: 'FL-007', tippingSpec: 'TP-007', glueType: 'PVA胶', totalCost: 0.132, qualityScore: 93.8, progress: 100, status: '已投产' },
  { key: '8', comboCode: 'CMB-008', productName: '皖烟(徽商)', paperSpec: 'CP-010', filterSpec: 'FL-008', tippingSpec: 'TP-008', glueType: 'PVA胶', totalCost: 0.122, qualityScore: 91.5, progress: 45, status: '评估中' },
  { key: '9', comboCode: 'CMB-009', productName: '黄山(1993)', paperSpec: 'CP-005', filterSpec: 'FL-009', tippingSpec: 'TP-009', glueType: '进口胶', totalCost: 0.168, qualityScore: 97.2, progress: 100, status: '已投产' },
  { key: '10', comboCode: 'CMB-010', productName: '皖烟(国宾)', paperSpec: 'CP-012', filterSpec: 'FL-010', tippingSpec: 'TP-010', glueType: '进口胶', totalCost: 0.205, qualityScore: 96.8, progress: 70, status: '试产中' },
  { key: '11', comboCode: 'CMB-011', productName: '黄山(软蓝)', paperSpec: 'CP-011', filterSpec: 'FL-011', tippingSpec: 'TP-011', glueType: '热熔胶', totalCost: 0.115, qualityScore: 94.5, progress: 100, status: '已投产' },
  { key: '12', comboCode: 'CMB-012', productName: '皖烟(黄金叶)', paperSpec: 'CP-013', filterSpec: 'FL-012', tippingSpec: 'TP-012', glueType: 'PVA胶', totalCost: 0.108, qualityScore: 89.2, progress: 35, status: '评估中' },
  { key: '13', comboCode: 'CMB-013', productName: '黄山(新概念)', paperSpec: 'CP-006', filterSpec: 'FL-013', tippingSpec: 'TP-013', glueType: '智能胶', totalCost: 0.258, qualityScore: 98.2, progress: 50, status: '研发中' },
  { key: '14', comboCode: 'CMB-014', productName: '皖烟(硬红)', paperSpec: 'CP-014', filterSpec: 'FL-014', tippingSpec: 'TP-014', glueType: 'PVA胶', totalCost: 0.118, qualityScore: 90.8, progress: 100, status: '已投产' },
  { key: '15', comboCode: 'CMB-015', productName: '黄山(硬金)', paperSpec: 'CP-015', filterSpec: 'FL-015', tippingSpec: 'TP-015', glueType: 'PVA胶', totalCost: 0.142, qualityScore: 95.1, progress: 100, status: '已投产' },
]

// 状态颜色映射
const statusColorMap: Record<string, string> = {
  '已采纳': 'green',
  '评估中': 'blue',
  '待评估': 'orange',
  '已定型': 'green',
  '试制中': 'blue',
  '研发中': 'purple',
  '已投产': 'green',
  '试产中': 'blue',
}

const AuxiliaryMaterialDesign: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'recommend'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())

  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/auxiliary-material-design/${path}`)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">三纸一棒数字化设计</h1>
        <p className="page-description">
          辅材组合智能推荐、卷烟纸/滤嘴棒/接装纸设计参数管理
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>

        {/* Tab 1: 辅材组合智能推荐 */}
        <TabPane tab="辅材组合智能推荐" key="recommend" icon={<BulbOutlined />}>
          <Card title="辅材组合智能推荐" extra={<Button type="primary" icon={<PlusOutlined />}>新建推荐</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="推荐方案数" value={128} suffix="个" /></Col>
              <Col span={6}><Statistic title="已采纳" value={85} valueStyle={{ color: '#3f8600' }} suffix="个" /></Col>
              <Col span={6}><Statistic title="平均匹配度" value={94.5} suffix="%" /></Col>
              <Col span={6}><Statistic title="采纳率" value={66.4} suffix="%" /></Col>
            </Row>
            <Table columns={[
              { title: '推荐编号', dataIndex: 'recCode', key: 'recCode', width: 100 },
              { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 110 },
              { title: '目标风格', dataIndex: 'targetStyle', key: 'targetStyle', width: 90 },
              { title: '卷烟纸推荐', dataIndex: 'paperRec', key: 'paperRec', width: 130 },
              { title: '滤嘴棒推荐', dataIndex: 'filterRec', key: 'filterRec', width: 130 },
              { title: '接装纸推荐', dataIndex: 'tippingRec', key: 'tippingRec', width: 100 },
              { title: '匹配度', dataIndex: 'matchScore', key: 'matchScore', width: 80, render: (v: number) => <span style={{ color: v >= 95 ? '#3f8600' : '#faad14' }}>{v}%</span> },
              { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>详情</Button><Button type="link" size="small" icon={<CheckCircleOutlined />}>采纳</Button></Space>) }
            ]} dataSource={recommendData} pagination={{ pageSize: 10 }} scroll={{ x: 1200 }} />
          </Card>
        </TabPane>

        {/* Tab 2: 卷烟纸设计参数 */}
        <TabPane tab="卷烟纸设计参数" key="paper" icon={<FileTextOutlined />}>
          <Card title="卷烟纸设计参数" extra={<Button type="primary" icon={<PlusOutlined />}>新建设计</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="卷烟纸设计数" value={45} suffix="款" /></Col>
              <Col span={6}><Statistic title="已定型" value={38} valueStyle={{ color: '#3f8600' }} suffix="款" /></Col>
              <Col span={6}><Statistic title="纸型种类" value={6} suffix="种" /></Col>
              <Col span={6}><Statistic title="定型率" value={84.4} suffix="%" /></Col>
            </Row>
            <Table columns={[
              { title: '设计编号', dataIndex: 'designCode', key: 'designCode', width: 90 },
              { title: '纸型', dataIndex: 'paperType', key: 'paperType', width: 80 },
              { title: '宽度', dataIndex: 'width', key: 'width', width: 60 },
              { title: '长度', dataIndex: 'length', key: 'length', width: 70 },
              { title: '透气度', dataIndex: 'permeability', key: 'permeability', width: 70 },
              { title: '克重', dataIndex: 'weight', key: 'weight', width: 70 },
              { title: '燃烧速度', dataIndex: 'burnRate', key: 'burnRate', width: 80 },
              { title: '灰色', dataIndex: 'ashColor', key: 'ashColor', width: 60 },
              { title: '目标产品', dataIndex: 'targetProduct', key: 'targetProduct', width: 110 },
              { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>查看</Button><Button type="link" size="small" icon={<EditOutlined />}>编辑</Button></Space>) }
            ]} dataSource={paperData} pagination={{ pageSize: 10 }} scroll={{ x: 1100 }} />
          </Card>
        </TabPane>

        {/* Tab 3: 滤嘴棒设计参数 */}
        <TabPane tab="滤嘴棒设计参数" key="filter" icon={<SettingOutlined />}>
          <Card title="滤嘴棒设计参数" extra={<Button type="primary" icon={<PlusOutlined />}>新建设计</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="滤嘴棒设计数" value={52} suffix="款" /></Col>
              <Col span={6}><Statistic title="已定型" value={45} valueStyle={{ color: '#3f8600' }} suffix="款" /></Col>
              <Col span={6}><Statistic title="滤嘴类型" value={8} suffix="种" /></Col>
              <Col span={6}><Statistic title="定型率" value={86.5} suffix="%" /></Col>
            </Row>
            <Table columns={[
              { title: '设计编号', dataIndex: 'designCode', key: 'designCode', width: 90 },
              { title: '滤嘴类型', dataIndex: 'filterType', key: 'filterType', width: 100 },
              { title: '直径', dataIndex: 'diameter', key: 'diameter', width: 65 },
              { title: '长度', dataIndex: 'length', key: 'length', width: 65 },
              { title: '硬度/特性', dataIndex: 'hardness', key: 'hardness', width: 90 },
              { title: '吸阻', dataIndex: 'drawResist', key: 'drawResist', width: 80 },
              { title: '过滤效率', dataIndex: 'efficiency', key: 'efficiency', width: 80 },
              { title: '目标产品', dataIndex: 'targetProduct', key: 'targetProduct', width: 110 },
              { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>查看</Button><Button type="link" size="small" icon={<EditOutlined />}>编辑</Button></Space>) }
            ]} dataSource={filterData} pagination={{ pageSize: 10 }} scroll={{ x: 1100 }} />
          </Card>
        </TabPane>

        {/* Tab 4: 接装纸设计参数 */}
        <TabPane tab="接装纸设计参数" key="tipping" icon={<SafetyOutlined />}>
          <Card title="接装纸设计参数" extra={<Button type="primary" icon={<PlusOutlined />}>新建设计</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="接装纸设计数" value={38} suffix="款" /></Col>
              <Col span={6}><Statistic title="已定型" value={32} valueStyle={{ color: '#3f8600' }} suffix="款" /></Col>
              <Col span={6}><Statistic title="接装纸类型" value={5} suffix="种" /></Col>
              <Col span={6}><Statistic title="定型率" value={84.2} suffix="%" /></Col>
            </Row>
            <Table columns={[
              { title: '设计编号', dataIndex: 'designCode', key: 'designCode', width: 90 },
              { title: '接装纸类型', dataIndex: 'tippingType', key: 'tippingType', width: 110 },
              { title: '宽度', dataIndex: 'width', key: 'width', width: 60 },
              { title: '长度', dataIndex: 'length', key: 'length', width: 70 },
              { title: '厚度', dataIndex: 'thickness', key: 'thickness', width: 75 },
              { title: '抗张强度', dataIndex: 'tensile', key: 'tensile', width: 80 },
              { title: '印刷色数', dataIndex: 'printColor', key: 'printColor', width: 80 },
              { title: '目标产品', dataIndex: 'targetProduct', key: 'targetProduct', width: 110 },
              { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>查看</Button><Button type="link" size="small" icon={<EditOutlined />}>编辑</Button></Space>) }
            ]} dataSource={tippingData} pagination={{ pageSize: 10 }} scroll={{ x: 1100 }} />
          </Card>
        </TabPane>

        {/* Tab 5: 辅材组合方案 */}
        <TabPane tab="辅材组合方案" key="combination" icon={<ExperimentOutlined />}>
          <Card title="辅材组合方案" extra={<Button type="primary" icon={<PlusOutlined />}>新建方案</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="组合方案数" value={68} suffix="个" /></Col>
              <Col span={6}><Statistic title="已投产" value={45} valueStyle={{ color: '#3f8600' }} suffix="个" /></Col>
              <Col span={6}><Statistic title="平均成本" value={0.142} prefix="¥" suffix="/支" /></Col>
              <Col span={6}><Statistic title="投产率" value={66.2} suffix="%" /></Col>
            </Row>
            <Table columns={[
              { title: '方案编号', dataIndex: 'comboCode', key: 'comboCode', width: 100 },
              { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 110 },
              { title: '卷烟纸', dataIndex: 'paperSpec', key: 'paperSpec', width: 80 },
              { title: '滤嘴棒', dataIndex: 'filterSpec', key: 'filterSpec', width: 80 },
              { title: '接装纸', dataIndex: 'tippingSpec', key: 'tippingSpec', width: 80 },
              { title: '烟用胶', dataIndex: 'glueType', key: 'glueType', width: 80 },
              { title: '成本(元/支)', dataIndex: 'totalCost', key: 'totalCost', width: 95 },
              { title: '质量评分', dataIndex: 'qualityScore', key: 'qualityScore', width: 85, render: (v: number) => <span style={{ color: v >= 95 ? '#3f8600' : '#faad14' }}>{v}</span> },
              { title: '进度', dataIndex: 'progress', key: 'progress', width: 120, render: (p: number) => <Progress percent={p} size="small" status={p === 100 ? 'success' : 'active'} /> },
              { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>详情</Button><Button type="link" size="small" icon={<EditOutlined />}>编辑</Button></Space>) }
            ]} dataSource={combinationData} pagination={{ pageSize: 10 }} scroll={{ x: 1300 }} />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default AuxiliaryMaterialDesign
