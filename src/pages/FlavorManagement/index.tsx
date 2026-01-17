import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress } from 'antd'
import {
  DatabaseOutlined,
  EditOutlined,
  EyeOutlined,
  FileTextOutlined,
  InboxOutlined,
  LockOutlined,
  PlusOutlined,
  SafetyOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'database': 'database',
  'formula': 'formula',
  'workorder': 'workorder',
  'quality': 'quality',
  'inventory': 'inventory',
  'supplier': 'supplier',
}

const PATH_TAB_MAP: Record<string, string> = {
  'database': 'database',
  'formula': 'formula',
  'workorder': 'workorder',
  'quality': 'quality',
  'inventory': 'inventory',
  'supplier': 'supplier',
}

const FlavorManagement: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'database'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())

  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/flavor-management/${path}`)
  }

  // 香精香料数据库
  const databaseData = [
    { key: '1', code: 'XJ001', name: '焦甜香基础香精', type: '烟用香精', category: '焦甜香型', supplier: '安徽中烟香料厂', cas: 'Mix-001', purity: '99.5%', status: '在用' },
    { key: '2', code: 'XJ002', name: '蜜甜香增强香精', type: '烟用香精', category: '甜香型', supplier: '云南香料研究所', cas: 'Mix-002', purity: '99.2%', status: '在用' },
    { key: '3', code: 'XJ003', name: '花果香调和香精', type: '烟用香精', category: '花果香型', supplier: '上海香精香料公司', cas: 'Mix-003', purity: '99.0%', status: '在用' },
    { key: '4', code: 'XJ004', name: '烟草本香香精', type: '烟用香精', category: '烟草香型', supplier: '安徽中烟香料厂', cas: 'Mix-004', purity: '99.3%', status: '在用' },
    { key: '5', code: 'XL001', name: '香兰素', type: '天然香料', category: '甜香类', supplier: '法国Solvay', cas: '121-33-5', purity: '99.8%', status: '在用' },
    { key: '6', code: 'XL002', name: '乙基麦芽酚', type: '合成香料', category: '焦糖类', supplier: '日本高砂香料', cas: '4940-11-8', purity: '99.5%', status: '在用' },
    { key: '7', code: 'XL003', name: '糠醛', type: '天然香料', category: '焦香类', supplier: '山东鲁南化工', cas: '98-01-1', purity: '99.0%', status: '在用' },
    { key: '8', code: 'XL004', name: '苯甲醇', type: '合成香料', category: '花香类', supplier: '德国BASF', cas: '100-51-6', purity: '99.7%', status: '在用' },
    { key: '9', code: 'XL005', name: '薄荷醇', type: '天然香料', category: '凉感类', supplier: '印度Symrise', cas: '2216-51-5', purity: '99.9%', status: '在用' },
    { key: '10', code: 'XL006', name: '丁香酚', type: '天然香料', category: '辛香类', supplier: '印尼香料公司', cas: '97-53-0', purity: '99.0%', status: '在用' },
    { key: '11', code: 'XJ005', name: '木香调香精', type: '烟用香精', category: '木香型', supplier: '瑞士奇华顿', cas: 'Mix-005', purity: '99.1%', status: '试用中' },
    { key: '12', code: 'XL007', name: '柠檬烯', type: '天然香料', category: '柑橘类', supplier: '美国IFF', cas: '5989-27-5', purity: '98.5%', status: '在用' },
    { key: '13', code: 'XL008', name: '乙酸异戊酯', type: '合成香料', category: '果香类', supplier: '日本长谷川', cas: '123-92-2', purity: '99.2%', status: '在用' },
    { key: '14', code: 'XJ006', name: '复合增香香精', type: '烟用香精', category: '增香型', supplier: '安徽中烟香料厂', cas: 'Mix-006', purity: '99.4%', status: '研发中' },
    { key: '15', code: 'XL009', name: '吡嗪类混合物', type: '合成香料', category: '坚果类', supplier: '德国Symrise', cas: 'Mix-Pyr', purity: '98.8%', status: '在用' }
  ]

  // 配方加密与版本控制
  const formulaData = [
    { key: '1', code: 'XPF001', name: '黄山焦甜香配方', version: 'V3.5', securityLevel: '绝密', encryptStatus: '已加密', accessControl: '核心研发组', lastUpdate: '2024-02-15', updater: '张建国', changeType: '配比优化' },
    { key: '2', code: 'XPF002', name: '皖烟蜜甜香配方', version: 'V2.8', securityLevel: '机密', encryptStatus: '已加密', accessControl: '配方研发部', lastUpdate: '2024-01-20', updater: '李明华', changeType: '新增成分' },
    { key: '3', code: 'XPF003', name: '黄山花果香配方', version: 'V2.0', securityLevel: '机密', encryptStatus: '已加密', accessControl: '配方研发部', lastUpdate: '2024-02-01', updater: '王志强', changeType: '配比调整' },
    { key: '4', code: 'XPF004', name: '迎客松特醇配方', version: 'V4.2', securityLevel: '绝密', encryptStatus: '已加密', accessControl: '核心研发组', lastUpdate: '2024-02-10', updater: '陈伟明', changeType: '工艺改进' },
    { key: '5', code: 'XPF005', name: '徽商高端配方', version: 'V3.0', securityLevel: '绝密', encryptStatus: '已加密', accessControl: '核心研发组', lastUpdate: '2024-01-25', updater: '刘德华', changeType: '配比优化' },
    { key: '6', code: 'XPF006', name: '细支清香配方', version: 'V1.8', securityLevel: '机密', encryptStatus: '已加密', accessControl: '配方研发部', lastUpdate: '2024-02-05', updater: '赵国庆', changeType: '新配方' },
    { key: '7', code: 'XPF007', name: '中支平衡配方', version: 'V2.2', securityLevel: '机密', encryptStatus: '已加密', accessControl: '配方研发部', lastUpdate: '2024-01-30', updater: '周建军', changeType: '配比调整' },
    { key: '8', code: 'XPF008', name: '大红方印配方', version: 'V5.0', securityLevel: '绝密', encryptStatus: '已加密', accessControl: '核心研发组', lastUpdate: '2024-02-18', updater: '吴晓明', changeType: '成分升级' },
    { key: '9', code: 'XPF009', name: '小红方印配方', version: 'V3.8', securityLevel: '机密', encryptStatus: '已加密', accessControl: '配方研发部', lastUpdate: '2024-01-15', updater: '黄志远', changeType: '配比优化' },
    { key: '10', code: 'XPF010', name: '1993复刻配方', version: 'V1.5', securityLevel: '机密', encryptStatus: '已加密', accessControl: '配方研发部', lastUpdate: '2024-02-12', updater: '林志伟', changeType: '历史还原' },
    { key: '11', code: 'XPF011', name: '新概念创新配方', version: 'V1.2', securityLevel: '秘密', encryptStatus: '已加密', accessControl: '创新研发组', lastUpdate: '2024-02-20', updater: '杨建华', changeType: '新配方' },
    { key: '12', code: 'XPF012', name: '低焦减害配方', version: 'V2.5', securityLevel: '机密', encryptStatus: '已加密', accessControl: '配方研发部', lastUpdate: '2024-01-28', updater: '郑明辉', changeType: '技术改进' },
    { key: '13', code: 'XPF013', name: '天然提取配方', version: 'V1.0', securityLevel: '秘密', encryptStatus: '加密中', accessControl: '创新研发组', lastUpdate: '2024-02-22', updater: '孙晓东', changeType: '新配方' },
    { key: '14', code: 'XPF014', name: '基础调香配方', version: 'V6.0', securityLevel: '内部', encryptStatus: '已加密', accessControl: '全部研发人员', lastUpdate: '2024-01-10', updater: '钱学森', changeType: '版本归档' },
    { key: '15', code: 'XPF015', name: '测试验证配方', version: 'V1.0', securityLevel: '内部', encryptStatus: '未加密', accessControl: '测试人员', lastUpdate: '2024-02-25', updater: '朱国强', changeType: '测试用途' }
  ]

  // 电子化调配工单
  const workorderData = [
    { key: '1', code: 'GD001', formulaName: '黄山焦甜香配方', batchNo: 'TP20240301', quantity: '500', unit: 'kg', createDate: '2024-03-01', planDate: '2024-03-05', operator: '张三', progress: 100, status: '已完成' },
    { key: '2', code: 'GD002', formulaName: '皖烟蜜甜香配方', batchNo: 'TP20240302', quantity: '350', unit: 'kg', createDate: '2024-03-02', planDate: '2024-03-06', operator: '李四', progress: 85, status: '调配中' },
    { key: '3', code: 'GD003', formulaName: '黄山花果香配方', batchNo: 'TP20240303', quantity: '280', unit: 'kg', createDate: '2024-03-03', planDate: '2024-03-07', operator: '王五', progress: 60, status: '调配中' },
    { key: '4', code: 'GD004', formulaName: '迎客松特醇配方', batchNo: 'TP20240304', quantity: '200', unit: 'kg', createDate: '2024-03-04', planDate: '2024-03-08', operator: '赵六', progress: 30, status: '备料中' },
    { key: '5', code: 'GD005', formulaName: '徽商高端配方', batchNo: 'TP20240305', quantity: '150', unit: 'kg', createDate: '2024-03-05', planDate: '2024-03-10', operator: '张三', progress: 0, status: '待调配' },
    { key: '6', code: 'GD006', formulaName: '细支清香配方', batchNo: 'TP20240306', quantity: '400', unit: 'kg', createDate: '2024-03-06', planDate: '2024-03-10', operator: '李四', progress: 0, status: '待调配' },
    { key: '7', code: 'GD007', formulaName: '中支平衡配方', batchNo: 'TP20240307', quantity: '320', unit: 'kg', createDate: '2024-03-07', planDate: '2024-03-11', operator: '王五', progress: 0, status: '待审批' },
    { key: '8', code: 'GD008', formulaName: '大红方印配方', batchNo: 'TP20240228', quantity: '180', unit: 'kg', createDate: '2024-02-28', planDate: '2024-03-04', operator: '赵六', progress: 100, status: '已完成' },
    { key: '9', code: 'GD009', formulaName: '小红方印配方', batchNo: 'TP20240227', quantity: '250', unit: 'kg', createDate: '2024-02-27', planDate: '2024-03-03', operator: '张三', progress: 100, status: '已完成' },
    { key: '10', code: 'GD010', formulaName: '1993复刻配方', batchNo: 'TP20240226', quantity: '120', unit: 'kg', createDate: '2024-02-26', planDate: '2024-03-02', operator: '李四', progress: 100, status: '已完成' },
    { key: '11', code: 'GD011', formulaName: '新概念创新配方', batchNo: 'TP20240308', quantity: '80', unit: 'kg', createDate: '2024-03-08', planDate: '2024-03-12', operator: '王五', progress: 0, status: '待审批' },
    { key: '12', code: 'GD012', formulaName: '低焦减害配方', batchNo: 'TP20240225', quantity: '300', unit: 'kg', createDate: '2024-02-25', planDate: '2024-03-01', operator: '赵六', progress: 100, status: '已完成' },
    { key: '13', code: 'GD013', formulaName: '黄山焦甜香配方', batchNo: 'TP20240309', quantity: '450', unit: 'kg', createDate: '2024-03-09', planDate: '2024-03-13', operator: '张三', progress: 0, status: '待调配' },
    { key: '14', code: 'GD014', formulaName: '皖烟蜜甜香配方', batchNo: 'TP20240224', quantity: '380', unit: 'kg', createDate: '2024-02-24', planDate: '2024-02-28', operator: '李四', progress: 100, status: '已完成' },
    { key: '15', code: 'GD015', formulaName: '基础调香配方', batchNo: 'TP20240310', quantity: '600', unit: 'kg', createDate: '2024-03-10', planDate: '2024-03-15', operator: '王五', progress: 15, status: '备料中' }
  ]

  // 香精质量管理
  const qualityData = [
    { key: '1', code: 'ZL001', batchNo: 'XJ20240301', productName: '焦甜香基础香精', testItem: '纯度检测', standard: '≥99.0%', result: '99.5%', conclusion: '合格', tester: '质检员A', testDate: '2024-03-01' },
    { key: '2', code: 'ZL002', batchNo: 'XJ20240302', productName: '蜜甜香增强香精', testItem: '色泽检测', standard: '淡黄至棕色', result: '淡黄色', conclusion: '合格', tester: '质检员B', testDate: '2024-03-02' },
    { key: '3', code: 'ZL003', batchNo: 'XL20240301', productName: '香兰素', testItem: '纯度检测', standard: '≥99.5%', result: '99.8%', conclusion: '优秀', tester: '质检员A', testDate: '2024-03-03' },
    { key: '4', code: 'ZL004', batchNo: 'XL20240302', productName: '乙基麦芽酚', testItem: '熔点检测', standard: '89-92℃', result: '90.5℃', conclusion: '合格', tester: '质检员C', testDate: '2024-03-04' },
    { key: '5', code: 'ZL005', batchNo: 'XJ20240303', productName: '花果香调和香精', testItem: '香气评价', standard: '评分≥85', result: '88分', conclusion: '优秀', tester: '评香师A', testDate: '2024-03-05' },
    { key: '6', code: 'ZL006', batchNo: 'XL20240303', productName: '糠醛', testItem: '水分含量', standard: '≤0.3%', result: '0.15%', conclusion: '合格', tester: '质检员B', testDate: '2024-03-06' },
    { key: '7', code: 'ZL007', batchNo: 'XJ20240304', productName: '木香调香精', testItem: '香气稳定性', standard: '6个月不变', result: '稳定', conclusion: '合格', tester: '评香师B', testDate: '2024-03-07' },
    { key: '8', code: 'ZL008', batchNo: 'XL20240304', productName: '薄荷醇', testItem: '纯度检测', standard: '≥99.5%', result: '99.9%', conclusion: '优秀', tester: '质检员A', testDate: '2024-03-08' },
    { key: '9', code: 'ZL009', batchNo: 'XJ20240305', productName: '烟草本香香精', testItem: '添加效果', standard: '评分≥80', result: '85分', conclusion: '合格', tester: '评香师A', testDate: '2024-03-09' },
    { key: '10', code: 'ZL010', batchNo: 'XL20240305', productName: '丁香酚', testItem: '折光率', standard: '1.540-1.542', result: '1.541', conclusion: '合格', tester: '质检员C', testDate: '2024-03-10' },
    { key: '11', code: 'ZL011', batchNo: 'XJ20240306', productName: '复合增香香精', testItem: '相容性测试', standard: '无沉淀', result: '澄清', conclusion: '合格', tester: '质检员B', testDate: '2024-03-11' },
    { key: '12', code: 'ZL012', batchNo: 'XL20240306', productName: '柠檬烯', testItem: '纯度检测', standard: '≥98.0%', result: '98.5%', conclusion: '合格', tester: '质检员A', testDate: '2024-03-12' },
    { key: '13', code: 'ZL013', batchNo: 'XL20240307', productName: '乙酸异戊酯', testItem: '酯含量', standard: '≥99.0%', result: '99.2%', conclusion: '合格', tester: '质检员C', testDate: '2024-03-13' },
    { key: '14', code: 'ZL014', batchNo: 'XL20240308', productName: '吡嗪类混合物', testItem: '成分分析', standard: '符合配比', result: '符合', conclusion: '合格', tester: '质检员B', testDate: '2024-03-14' },
    { key: '15', code: 'ZL015', batchNo: 'XJ20240307', productName: '焦甜香基础香精', testItem: '微生物检测', standard: '无菌', result: '无菌', conclusion: '合格', tester: '质检员A', testDate: '2024-03-15' }
  ]

  // 香原料库存管理
  const inventoryData = [
    { key: '1', code: 'KC001', materialName: '焦甜香基础香精', category: '烟用香精', unit: 'kg', currentStock: '850', safeStock: '600', maxStock: '1200', location: 'A区-香精库-01', expiryDate: '2025-03-01', status: '充足' },
    { key: '2', code: 'KC002', materialName: '蜜甜香增强香精', category: '烟用香精', unit: 'kg', currentStock: '420', safeStock: '400', maxStock: '800', location: 'A区-香精库-02', expiryDate: '2025-02-15', status: '正常' },
    { key: '3', code: 'KC003', materialName: '香兰素', category: '天然香料', unit: 'kg', currentStock: '180', safeStock: '200', maxStock: '500', location: 'B区-香料库-01', expiryDate: '2025-06-30', status: '偏低' },
    { key: '4', code: 'KC004', materialName: '乙基麦芽酚', category: '合成香料', unit: 'kg', currentStock: '320', safeStock: '250', maxStock: '600', location: 'B区-香料库-02', expiryDate: '2025-12-31', status: '充足' },
    { key: '5', code: 'KC005', materialName: '花果香调和香精', category: '烟用香精', unit: 'kg', currentStock: '280', safeStock: '300', maxStock: '600', location: 'A区-香精库-03', expiryDate: '2025-01-20', status: '偏低' },
    { key: '6', code: 'KC006', materialName: '糠醛', category: '天然香料', unit: 'kg', currentStock: '450', safeStock: '350', maxStock: '700', location: 'B区-香料库-03', expiryDate: '2025-08-15', status: '充足' },
    { key: '7', code: 'KC007', materialName: '苯甲醇', category: '合成香料', unit: 'kg', currentStock: '200', safeStock: '180', maxStock: '400', location: 'B区-香料库-04', expiryDate: '2025-10-30', status: '正常' },
    { key: '8', code: 'KC008', materialName: '薄荷醇', category: '天然香料', unit: 'kg', currentStock: '150', safeStock: '200', maxStock: '450', location: 'C区-特藏库-01', expiryDate: '2025-04-20', status: '偏低' },
    { key: '9', code: 'KC009', materialName: '丁香酚', category: '天然香料', unit: 'kg', currentStock: '380', safeStock: '300', maxStock: '600', location: 'B区-香料库-05', expiryDate: '2025-07-15', status: '充足' },
    { key: '10', code: 'KC010', materialName: '木香调香精', category: '烟用香精', unit: 'kg', currentStock: '120', safeStock: '150', maxStock: '350', location: 'A区-香精库-04', expiryDate: '2025-05-10', status: '偏低' },
    { key: '11', code: 'KC011', materialName: '柠檬烯', category: '天然香料', unit: 'kg', currentStock: '250', safeStock: '200', maxStock: '450', location: 'C区-特藏库-02', expiryDate: '2025-03-25', status: '正常' },
    { key: '12', code: 'KC012', materialName: '乙酸异戊酯', category: '合成香料', unit: 'kg', currentStock: '180', safeStock: '150', maxStock: '350', location: 'B区-香料库-06', expiryDate: '2025-09-20', status: '正常' },
    { key: '13', code: 'KC013', materialName: '复合增香香精', category: '烟用香精', unit: 'kg', currentStock: '80', safeStock: '100', maxStock: '250', location: 'A区-香精库-05', expiryDate: '2025-02-28', status: '不足' },
    { key: '14', code: 'KC014', materialName: '吡嗪类混合物', category: '合成香料', unit: 'kg', currentStock: '95', safeStock: '100', maxStock: '250', location: 'B区-香料库-07', expiryDate: '2025-11-15', status: '偏低' },
    { key: '15', code: 'KC015', materialName: '烟草本香香精', category: '烟用香精', unit: 'kg', currentStock: '350', safeStock: '280', maxStock: '550', location: 'A区-香精库-06', expiryDate: '2025-04-30', status: '充足' }
  ]

  // 供应商评价与预警
  const supplierData = [
    { key: '1', code: 'GY001', supplierName: '安徽中烟香料厂', category: '香精供应', cooperationYears: '15年', qualityScore: 95, deliveryScore: 92, priceScore: 88, totalScore: 92, level: 'A级', status: '战略合作' },
    { key: '2', code: 'GY002', supplierName: '云南香料研究所', category: '香精供应', cooperationYears: '10年', qualityScore: 93, deliveryScore: 90, priceScore: 85, totalScore: 89, level: 'A级', status: '核心供应' },
    { key: '3', code: 'GY003', supplierName: '法国Solvay', category: '天然香料', cooperationYears: '8年', qualityScore: 98, deliveryScore: 85, priceScore: 75, totalScore: 86, level: 'A级', status: '核心供应' },
    { key: '4', code: 'GY004', supplierName: '日本高砂香料', category: '合成香料', cooperationYears: '12年', qualityScore: 96, deliveryScore: 88, priceScore: 78, totalScore: 87, level: 'A级', status: '核心供应' },
    { key: '5', code: 'GY005', supplierName: '上海香精香料公司', category: '香精供应', cooperationYears: '6年', qualityScore: 88, deliveryScore: 92, priceScore: 90, totalScore: 90, level: 'B级', status: '优选供应' },
    { key: '6', code: 'GY006', supplierName: '德国BASF', category: '合成香料', cooperationYears: '10年', qualityScore: 95, deliveryScore: 82, priceScore: 72, totalScore: 83, level: 'B级', status: '优选供应' },
    { key: '7', code: 'GY007', supplierName: '山东鲁南化工', category: '天然香料', cooperationYears: '5年', qualityScore: 85, deliveryScore: 95, priceScore: 92, totalScore: 91, level: 'B级', status: '优选供应' },
    { key: '8', code: 'GY008', supplierName: '印度Symrise', category: '天然香料', cooperationYears: '7年', qualityScore: 90, deliveryScore: 80, priceScore: 88, totalScore: 86, level: 'B级', status: '优选供应' },
    { key: '9', code: 'GY009', supplierName: '瑞士奇华顿', category: '香精供应', cooperationYears: '5年', qualityScore: 97, deliveryScore: 78, priceScore: 68, totalScore: 81, level: 'B级', status: '合格供应' },
    { key: '10', code: 'GY010', supplierName: '印尼香料公司', category: '天然香料', cooperationYears: '4年', qualityScore: 82, deliveryScore: 85, priceScore: 95, totalScore: 87, level: 'B级', status: '优选供应' },
    { key: '11', code: 'GY011', supplierName: '美国IFF', category: '天然香料', cooperationYears: '6年', qualityScore: 94, deliveryScore: 75, priceScore: 70, totalScore: 80, level: 'C级', status: '合格供应' },
    { key: '12', code: 'GY012', supplierName: '日本长谷川', category: '合成香料', cooperationYears: '8年', qualityScore: 92, deliveryScore: 88, priceScore: 80, totalScore: 87, level: 'B级', status: '优选供应' },
    { key: '13', code: 'GY013', supplierName: '德国Symrise', category: '合成香料', cooperationYears: '5年', qualityScore: 91, deliveryScore: 82, priceScore: 76, totalScore: 83, level: 'B级', status: '优选供应' },
    { key: '14', code: 'GY014', supplierName: '国内新供应商A', category: '香精供应', cooperationYears: '1年', qualityScore: 78, deliveryScore: 85, priceScore: 95, totalScore: 86, level: 'C级', status: '考察中' },
    { key: '15', code: 'GY015', supplierName: '国内新供应商B', category: '天然香料', cooperationYears: '1年', qualityScore: 75, deliveryScore: 88, priceScore: 92, totalScore: 85, level: 'C级', status: '考察中' }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">香精香料管理</h1>
        <p className="page-description">
          香精香料数据库、配方加密与版本控制、电子化调配工单
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {/* 香精香料数据库 Tab */}
        <TabPane tab="香精香料数据库" key="database" icon={<DatabaseOutlined />}>
          <Card
            title="香精香料数据库"
            extra={<Button type="primary" icon={<PlusOutlined />}>新增物料</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="物料总数" value={15} suffix="种" />
              </Col>
              <Col span={6}>
                <Statistic title="烟用香精" value={6} suffix="种" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="天然香料" value={5} suffix="种" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="合成香料" value={4} suffix="种" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '物料编号', dataIndex: 'code', key: 'code', width: 90 },
                { title: '物料名称', dataIndex: 'name', key: 'name' },
                { title: '类型', dataIndex: 'type', key: 'type', width: 90 },
                { title: '香型分类', dataIndex: 'category', key: 'category', width: 90 },
                { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 130 },
                { title: 'CAS号', dataIndex: 'cas', key: 'cas', width: 100 },
                { title: '纯度', dataIndex: 'purity', key: 'purity', width: 70 },
                { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => {
                  const colors: Record<string, string> = { '在用': 'success', '试用中': 'warning', '研发中': 'processing' }
                  return <Tag color={colors[s]}>{s}</Tag>
                }},
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                  </Space>
                )}
              ]}
              dataSource={databaseData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1150 }}
            />
          </Card>
        </TabPane>

        {/* 配方加密与版本控制 Tab */}
        <TabPane tab="配方加密与版本控制" key="formula" icon={<LockOutlined />}>
          <Card
            title="配方加密与版本控制"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建配方</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="配方总数" value={15} suffix="个" />
              </Col>
              <Col span={6}>
                <Statistic title="绝密级" value={4} suffix="个" valueStyle={{ color: '#ff4d4f' }} />
              </Col>
              <Col span={6}>
                <Statistic title="机密级" value={8} suffix="个" valueStyle={{ color: '#fa8c16' }} />
              </Col>
              <Col span={6}>
                <Statistic title="已加密" value={14} suffix="个" valueStyle={{ color: '#52c41a' }} />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '配方编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '配方名称', dataIndex: 'name', key: 'name' },
                { title: '版本', dataIndex: 'version', key: 'version', width: 70 },
                { title: '密级', dataIndex: 'securityLevel', key: 'securityLevel', width: 80, render: (s: string) => {
                  const colors: Record<string, string> = { '绝密': 'error', '机密': 'warning', '秘密': 'processing', '内部': 'default' }
                  return <Tag color={colors[s]}>{s}</Tag>
                }},
                { title: '加密状态', dataIndex: 'encryptStatus', key: 'encryptStatus', width: 90, render: (s: string) => (
                  <Tag color={s === '已加密' ? 'success' : s === '加密中' ? 'processing' : 'default'}>{s}</Tag>
                )},
                { title: '访问控制', dataIndex: 'accessControl', key: 'accessControl', width: 120 },
                { title: '更新日期', dataIndex: 'lastUpdate', key: 'lastUpdate', width: 100 },
                { title: '更新人', dataIndex: 'updater', key: 'updater', width: 90 },
                { title: '变更类型', dataIndex: 'changeType', key: 'changeType', width: 90 },
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<LockOutlined />}>解密</Button>
                    <Button type="link" size="small" icon={<EyeOutlined />}>历史</Button>
                  </Space>
                )}
              ]}
              dataSource={formulaData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1250 }}
            />
          </Card>
        </TabPane>

        {/* 电子化调配工单 Tab */}
        <TabPane tab="电子化调配工单" key="workorder" icon={<FileTextOutlined />}>
          <Card
            title="电子化调配工单"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建工单</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="本月工单" value={15} suffix="个" />
              </Col>
              <Col span={6}>
                <Statistic title="已完成" value={6} suffix="个" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="进行中" value={6} suffix="个" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="调配量" value={4580} suffix="kg" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '工单编号', dataIndex: 'code', key: 'code', width: 90 },
                { title: '配方名称', dataIndex: 'formulaName', key: 'formulaName' },
                { title: '批次号', dataIndex: 'batchNo', key: 'batchNo', width: 120 },
                { title: '数量', dataIndex: 'quantity', key: 'quantity', width: 70 },
                { title: '单位', dataIndex: 'unit', key: 'unit', width: 50 },
                { title: '创建日期', dataIndex: 'createDate', key: 'createDate', width: 100 },
                { title: '计划完成', dataIndex: 'planDate', key: 'planDate', width: 100 },
                { title: '操作人', dataIndex: 'operator', key: 'operator', width: 80 },
                { title: '进度', dataIndex: 'progress', key: 'progress', width: 130, render: (p: number) => (
                  <Progress percent={p} size="small" status={p === 100 ? 'success' : 'active'} />
                )},
                { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: (s: string) => {
                  const colors: Record<string, string> = { '已完成': 'success', '调配中': 'processing', '备料中': 'warning', '待调配': 'default', '待审批': 'error' }
                  return <Tag color={colors[s]}>{s}</Tag>
                }},
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<EditOutlined />}>操作</Button>
                  </Space>
                )}
              ]}
              dataSource={workorderData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1250 }}
            />
          </Card>
        </TabPane>

        {/* 香精质量管理 Tab */}
        <TabPane tab="香精质量管理" key="quality" icon={<SafetyOutlined />}>
          <Card
            title="香精质量管理"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建检测</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="本月检测" value={15} suffix="次" />
              </Col>
              <Col span={6}>
                <Statistic title="合格率" value={100} suffix="%" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="优秀率" value={20} suffix="%" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="检测项目" value={8} suffix="类" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '检测编号', dataIndex: 'code', key: 'code', width: 90 },
                { title: '批次号', dataIndex: 'batchNo', key: 'batchNo', width: 110 },
                { title: '产品名称', dataIndex: 'productName', key: 'productName' },
                { title: '检测项目', dataIndex: 'testItem', key: 'testItem', width: 100 },
                { title: '标准要求', dataIndex: 'standard', key: 'standard', width: 100 },
                { title: '检测结果', dataIndex: 'result', key: 'result', width: 90 },
                { title: '结论', dataIndex: 'conclusion', key: 'conclusion', width: 70, render: (c: string) => (
                  <Tag color={c === '优秀' ? 'success' : c === '合格' ? 'processing' : 'error'}>{c}</Tag>
                )},
                { title: '检测人', dataIndex: 'tester', key: 'tester', width: 80 },
                { title: '检测日期', dataIndex: 'testDate', key: 'testDate', width: 100 },
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<FileTextOutlined />}>报告</Button>
                  </Space>
                )}
              ]}
              dataSource={qualityData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>

        {/* 香原料库存管理 Tab */}
        <TabPane tab="香原料库存管理" key="inventory" icon={<InboxOutlined />}>
          <Card
            title="香原料库存管理"
            extra={<Button type="primary" icon={<PlusOutlined />}>入库登记</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="物料品种" value={15} suffix="种" />
              </Col>
              <Col span={6}>
                <Statistic title="库存充足" value={6} suffix="种" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="库存偏低" value={6} suffix="种" valueStyle={{ color: '#fa8c16' }} />
              </Col>
              <Col span={6}>
                <Statistic title="库存不足" value={1} suffix="种" valueStyle={{ color: '#ff4d4f' }} />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '库存编号', dataIndex: 'code', key: 'code', width: 90 },
                { title: '物料名称', dataIndex: 'materialName', key: 'materialName' },
                { title: '分类', dataIndex: 'category', key: 'category', width: 90 },
                { title: '当前库存', dataIndex: 'currentStock', key: 'currentStock', width: 90 },
                { title: '安全库存', dataIndex: 'safeStock', key: 'safeStock', width: 90 },
                { title: '最大库存', dataIndex: 'maxStock', key: 'maxStock', width: 90 },
                { title: '存储位置', dataIndex: 'location', key: 'location', width: 130 },
                { title: '有效期', dataIndex: 'expiryDate', key: 'expiryDate', width: 100 },
                { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => {
                  const colors: Record<string, string> = { '充足': 'success', '正常': 'processing', '偏低': 'warning', '不足': 'error' }
                  return <Tag color={colors[s]}>{s}</Tag>
                }},
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<EditOutlined />}>调整</Button>
                  </Space>
                )}
              ]}
              dataSource={inventoryData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>

        {/* 供应商评价与预警 Tab */}
        <TabPane tab="供应商评价与预警" key="supplier" icon={<TeamOutlined />}>
          <Card
            title="供应商评价与预警"
            extra={<Button type="primary" icon={<PlusOutlined />}>新增供应商</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="供应商数" value={15} suffix="家" />
              </Col>
              <Col span={6}>
                <Statistic title="A级供应商" value={4} suffix="家" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="B级供应商" value={9} suffix="家" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="平均评分" value={86} suffix="分" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '供应商编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '供应商名称', dataIndex: 'supplierName', key: 'supplierName' },
                { title: '供应类别', dataIndex: 'category', key: 'category', width: 90 },
                { title: '合作年限', dataIndex: 'cooperationYears', key: 'cooperationYears', width: 80 },
                { title: '质量评分', dataIndex: 'qualityScore', key: 'qualityScore', width: 80 },
                { title: '交付评分', dataIndex: 'deliveryScore', key: 'deliveryScore', width: 80 },
                { title: '价格评分', dataIndex: 'priceScore', key: 'priceScore', width: 80 },
                { title: '综合评分', dataIndex: 'totalScore', key: 'totalScore', width: 80, render: (s: number) => (
                  <span style={{ color: s >= 90 ? '#52c41a' : s >= 80 ? '#1890ff' : '#fa8c16', fontWeight: 'bold' }}>{s}</span>
                )},
                { title: '等级', dataIndex: 'level', key: 'level', width: 70, render: (l: string) => {
                  const colors: Record<string, string> = { 'A级': 'success', 'B级': 'processing', 'C级': 'warning' }
                  return <Tag color={colors[l]}>{l}</Tag>
                }},
                { title: '合作状态', dataIndex: 'status', key: 'status', width: 90, render: (s: string) => {
                  const colors: Record<string, string> = { '战略合作': 'success', '核心供应': 'processing', '优选供应': 'blue', '合格供应': 'default', '考察中': 'warning' }
                  return <Tag color={colors[s]}>{s}</Tag>
                }},
                { title: '操作', key: 'action', width: 150, render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<EditOutlined />}>评价</Button>
                  </Space>
                )}
              ]}
              dataSource={supplierData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1300 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default FlavorManagement
