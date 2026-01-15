import React, { useState } from 'react'
import { Card, Tabs, Button, Table, Tag, Row, Col, Statistic, Input, Select, Space, Modal, Form, DatePicker, InputNumber, Progress } from 'antd'
import {
  DatabaseOutlined,
  EnvironmentOutlined,
  BarChartOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Search } = Input
const { Option } = Select

// 基地管理接口
interface TobaccoBase {
  id: string
  name: string
  location: string
  area: number
  varieties: string[]
  manager: string
  contact: string
  establishDate: string
  soilType: string
  climate: string
  expectedYield: number
  actualYield?: number
  qualityGrade: string
  status: 'active' | 'inactive' | 'maintenance'
  certifications: string[]
  lastInspection: string
  notes?: string
}

// 采购计划接口
interface PurchasePlan {
  id: string
  planNo: string
  materialName: string
  materialType: string
  quantity: number
  unit: string
  budgetAmount: number
  supplier: string
  planDate: string
  deliveryDate: string
  status: 'draft' | 'approved' | 'executing' | 'completed' | 'cancelled'
  priority: 'high' | 'medium' | 'low'
  manager: string
  approver?: string
  approveDate?: string
  actualAmount?: number
  actualQuantity?: number
  qualityRequirement: string
  notes?: string
}

// 仓储醇化接口
interface StorageAging {
  id: string
  warehouseNo: string
  materialName: string
  materialType: string
  batchNo: string
  inboundDate: string
  quantity: number
  unit: string
  agingPeriod: number
  currentStatus: 'aging' | 'completed' | 'testing' | 'released'
  temperature: number
  humidity: number
  qualityChange: string
  inspector: string
  lastCheckDate: string
  expectedReleaseDate: string
  actualReleaseDate?: string
  qualityScore: number
  notes?: string
}

const MaterialManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('materials')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add')
  const [selectedRecord, setSelectedRecord] = useState<any>(null)

  // 原料 CRUD 状态
  const [materialModalVisible, setMaterialModalVisible] = useState(false)
  const [materialModalType, setMaterialModalType] = useState<'add' | 'edit' | 'view'>('add')
  const [currentMaterial, setCurrentMaterial] = useState<any>(null)
  const [materialForm] = Form.useForm()

  // 模拟原料数据
  const [materialList, setMaterialList] = useState([
    {
      id: 'M001',
      name: '云南上部烟叶',
      type: '主料',
      origin: '云南省',
      grade: 'A级',
      stock: 1250,
      unit: 'kg',
      supplier: '云南烟草公司',
      status: 'normal',
      expiryDate: '2024-12-31'
    },
    {
      id: 'M002',
      name: '河南中部烟叶',
      type: '辅料',
      origin: '河南省',
      grade: 'B级',
      stock: 850,
      unit: 'kg',
      supplier: '河南烟草公司',
      status: 'warning',
      expiryDate: '2024-10-15'
    },
    {
      id: 'M003',
      name: '进口烟叶',
      type: '调节料',
      origin: '巴西',
      grade: 'A级',
      stock: 320,
      unit: 'kg',
      supplier: '国际贸易公司',
      status: 'low',
      expiryDate: '2024-08-20'
    },
    {
      id: 'M004',
      name: '四川下部烟叶',
      type: '主料',
      origin: '四川省',
      grade: 'A级',
      stock: 980,
      unit: 'kg',
      supplier: '四川烟草公司',
      status: 'normal',
      expiryDate: '2024-11-30'
    },
    {
      id: 'M005',
      name: '福建烟叶',
      type: '辅料',
      origin: '福建省',
      grade: 'B级',
      stock: 650,
      unit: 'kg',
      supplier: '福建烟草公司',
      status: 'normal',
      expiryDate: '2024-09-25'
    },
    {
      id: 'M006',
      name: '津巴布韦烟叶',
      type: '调节料',
      origin: '津巴布韦',
      grade: 'A级',
      stock: 420,
      unit: 'kg',
      supplier: '非洲贸易公司',
      status: 'warning',
      expiryDate: '2024-07-15'
    },
    {
      id: 'M007',
      name: '湖南烟叶',
      type: '主料',
      origin: '湖南省',
      grade: 'A级',
      stock: 1150,
      unit: 'kg',
      supplier: '湖南烟草公司',
      status: 'normal',
      expiryDate: '2025-01-20'
    },
    {
      id: 'M008',
      name: '贵州烟叶',
      type: '辅料',
      origin: '贵州省',
      grade: 'B级',
      stock: 780,
      unit: 'kg',
      supplier: '贵州烟草公司',
      status: 'normal',
      expiryDate: '2024-10-30'
    },
    {
      id: 'M009',
      name: '美国弗吉尼亚烟叶',
      type: '调节料',
      origin: '美国',
      grade: 'S级',
      stock: 280,
      unit: 'kg',
      supplier: '美国烟草进出口',
      status: 'low',
      expiryDate: '2024-06-30'
    },
    {
      id: 'M010',
      name: '土耳其东方烟',
      type: '香料烟',
      origin: '土耳其',
      grade: 'A级',
      stock: 180,
      unit: 'kg',
      supplier: '土耳其贸易公司',
      status: 'low',
      expiryDate: '2024-08-15'
    }
  ])

  // 原料 CRUD 处理函数
  const handleCreateMaterial = (values: any) => {
    const newMaterial = {
      id: `M${(materialList.length + 1).toString().padStart(3, '0')}`,
      ...values,
      stock: parseFloat(values.stock),
      expiryDate: values.expiryDate?.format('YYYY-MM-DD') || '',
      status: 'normal'
    }
    setMaterialList([...materialList, newMaterial])
    setMaterialModalVisible(false)
    materialForm.resetFields()
  }

  const handleUpdateMaterial = (values: any) => {
    const updatedMaterialList = materialList.map(item =>
      item.id === currentMaterial.id
        ? { ...item, ...values, stock: parseFloat(values.stock), expiryDate: values.expiryDate?.format('YYYY-MM-DD') || item.expiryDate }
        : item
    )
    setMaterialList(updatedMaterialList)
    setMaterialModalVisible(false)
    setCurrentMaterial(null)
    materialForm.resetFields()
  }

  const handleDeleteMaterial = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个原料吗？',
      onOk: () => {
        setMaterialList(materialList.filter(item => item.id !== id))
      }
    })
  }

  const openMaterialModal = (type: 'add' | 'edit' | 'view', record?: any) => {
    setMaterialModalType(type)
    setCurrentMaterial(record || null)
    if (record) {
      // 需要处理日期 moment 对象，这里简化处理，假设 Form 会处理字符串或需要转换
      // 实际项目中可能需要 moment(record.expiryDate)
      materialForm.setFieldsValue(record)
    } else {
      materialForm.resetFields()
    }
    setMaterialModalVisible(true)
  }

  // 基地管理数据
  const tobaccoBases: TobaccoBase[] = [
    {
      id: 'TB001',
      name: '云南红河基地',
      location: '云南省红河州',
      area: 2500,
      varieties: ['云烟87', '云烟97', 'K326'],
      manager: '张基地',
      contact: '13888888888',
      establishDate: '2018-03-15',
      soilType: '红壤土',
      climate: '亚热带季风气候',
      expectedYield: 3500,
      actualYield: 3420,
      qualityGrade: 'A级',
      status: 'active',
      certifications: ['有机认证', 'GAP认证'],
      lastInspection: '2024-03-20',
      notes: '土壤肥沃，气候适宜，产量稳定'
    },
    {
      id: 'TB002',
      name: '四川凉山基地',
      location: '四川省凉山州',
      area: 1800,
      varieties: ['云烟85', 'NC89'],
      manager: '李基地',
      contact: '13999999999',
      establishDate: '2019-05-20',
      soilType: '黄壤土',
      climate: '高原季风气候',
      expectedYield: 2800,
      actualYield: 2750,
      qualityGrade: 'A级',
      status: 'active',
      certifications: ['GAP认证'],
      lastInspection: '2024-03-18',
      notes: '高海拔种植，品质优良'
    },
    {
      id: 'TB003',
      name: '河南许昌基地',
      location: '河南省许昌市',
      area: 3200,
      varieties: ['中烟100', 'NC102'],
      manager: '王基地',
      contact: '13777777777',
      establishDate: '2017-08-10',
      soilType: '潮土',
      climate: '温带大陆性气候',
      expectedYield: 4200,
      actualYield: 4150,
      qualityGrade: 'B级',
      status: 'active',
      certifications: ['GAP认证', '绿色食品认证'],
      lastInspection: '2024-03-22',
      notes: '规模较大，机械化程度高'
    },
    {
      id: 'TB004',
      name: '贵州毕节基地',
      location: '贵州省毕节市',
      area: 2100,
      varieties: ['毕纳1号', '云烟87'],
      manager: '赵基地',
      contact: '13666666666',
      establishDate: '2020-04-12',
      soilType: '黄壤土',
      climate: '亚热带湿润气候',
      expectedYield: 3100,
      actualYield: 2980,
      qualityGrade: 'A级',
      status: 'active',
      certifications: ['有机认证'],
      lastInspection: '2024-03-15',
      notes: '新建基地，发展潜力大'
    },
    {
      id: 'TB005',
      name: '湖南郴州基地',
      location: '湖南省郴州市',
      area: 1600,
      varieties: ['湘烟3号', 'K326'],
      manager: '孙基地',
      contact: '13555555555',
      establishDate: '2016-11-25',
      soilType: '红壤土',
      climate: '亚热带季风气候',
      expectedYield: 2400,
      actualYield: 2350,
      qualityGrade: 'B级',
      status: 'maintenance',
      certifications: ['GAP认证'],
      lastInspection: '2024-03-10',
      notes: '正在进行设施升级改造'
    },
    {
      id: 'TB006',
      name: '福建三明基地',
      location: '福建省三明市',
      area: 1200,
      varieties: ['福烟1号', '云烟97'],
      manager: '钱基地',
      contact: '13444444444',
      establishDate: '2021-02-18',
      soilType: '红壤土',
      climate: '亚热带海洋性气候',
      expectedYield: 1800,
      actualYield: 1750,
      qualityGrade: 'A级',
      status: 'active',
      certifications: ['有机认证', 'GAP认证'],
      lastInspection: '2024-03-25',
      notes: '沿海基地，品质独特'
    },
    {
      id: 'TB007',
      name: '山东潍坊基地',
      location: '山东省潍坊市',
      area: 2800,
      varieties: ['鲁烟1号', 'NC89'],
      manager: '周基地',
      contact: '13333333333',
      establishDate: '2018-09-30',
      soilType: '潮土',
      climate: '温带季风气候',
      expectedYield: 3600,
      actualYield: 3520,
      qualityGrade: 'B级',
      status: 'active',
      certifications: ['GAP认证'],
      lastInspection: '2024-03-12',
      notes: '北方重要基地，产量稳定'
    },
    {
      id: 'TB008',
      name: '广西玉林基地',
      location: '广西玉林市',
      area: 1500,
      varieties: ['桂烟1号', 'K326'],
      manager: '吴基地',
      contact: '13222222222',
      establishDate: '2019-12-08',
      soilType: '红壤土',
      climate: '亚热带季风气候',
      expectedYield: 2200,
      actualYield: 2180,
      qualityGrade: 'A级',
      status: 'active',
      certifications: ['GAP认证'],
      lastInspection: '2024-03-28',
      notes: '南方基地，全年可种植'
    },
    {
      id: 'TB009',
      name: '陕西宝鸡基地',
      location: '陕西省宝鸡市',
      area: 1900,
      varieties: ['秦烟95', 'NC102'],
      manager: '郑基地',
      contact: '13111111111',
      establishDate: '2017-06-15',
      soilType: '黄绵土',
      climate: '温带大陆性气候',
      expectedYield: 2700,
      actualYield: 2650,
      qualityGrade: 'B级',
      status: 'active',
      certifications: ['GAP认证'],
      lastInspection: '2024-03-08',
      notes: '西北地区主要基地'
    },
    {
      id: 'TB010',
      name: '江西赣州基地',
      location: '江西省赣州市',
      area: 2200,
      varieties: ['赣烟1号', '云烟87'],
      manager: '冯基地',
      contact: '13000000000',
      establishDate: '2020-07-22',
      soilType: '红壤土',
      climate: '亚热带湿润气候',
      expectedYield: 3000,
      actualYield: 2920,
      qualityGrade: 'A级',
      status: 'inactive',
      certifications: ['有机认证'],
      lastInspection: '2024-02-28',
      notes: '暂停生产，进行土壤改良'
    }
  ]

  // 采购计划数据
  const purchasePlans: PurchasePlan[] = [
    {
      id: 'PP001',
      planNo: 'PC2024030001',
      materialName: '云南上部烟叶',
      materialType: '主料',
      quantity: 5000,
      unit: 'kg',
      budgetAmount: 850000,
      supplier: '云南烟草公司',
      planDate: '2024-04-15',
      deliveryDate: '2024-05-20',
      status: 'approved',
      priority: 'high',
      manager: '张采购',
      approver: '李总监',
      approveDate: '2024-03-20',
      qualityRequirement: 'A级，含水率11-13%',
      notes: '春季采购计划，优先保证质量'
    },
    {
      id: 'PP002',
      planNo: 'PC2024030002',
      materialName: '河南中部烟叶',
      materialType: '辅料',
      quantity: 3000,
      unit: 'kg',
      budgetAmount: 420000,
      supplier: '河南烟草公司',
      planDate: '2024-04-20',
      deliveryDate: '2024-05-25',
      status: 'executing',
      priority: 'medium',
      manager: '王采购',
      approver: '李总监',
      approveDate: '2024-03-18',
      actualAmount: 415000,
      actualQuantity: 2950,
      qualityRequirement: 'B级，杂质含量≤1%',
      notes: '正在执行中，已完成部分交付'
    },
    {
      id: 'PP003',
      planNo: 'PC2024030003',
      materialName: '进口烟叶',
      materialType: '调节料',
      quantity: 1500,
      unit: 'kg',
      budgetAmount: 750000,
      supplier: '国际贸易公司',
      planDate: '2024-05-01',
      deliveryDate: '2024-06-15',
      status: 'draft',
      priority: 'medium',
      manager: '赵采购',
      qualityRequirement: 'A级，进口检疫合格',
      notes: '进口原料，需要提前办理相关手续'
    },
    {
      id: 'PP004',
      planNo: 'PC2024030004',
      materialName: '四川烟叶',
      materialType: '主料',
      quantity: 4000,
      unit: 'kg',
      budgetAmount: 680000,
      supplier: '四川烟草公司',
      planDate: '2024-04-25',
      deliveryDate: '2024-05-30',
      status: 'completed',
      priority: 'high',
      manager: '孙采购',
      approver: '李总监',
      approveDate: '2024-03-15',
      actualAmount: 675000,
      actualQuantity: 4000,
      qualityRequirement: 'A级，高海拔种植',
      notes: '已完成采购，质量符合要求'
    },
    {
      id: 'PP005',
      planNo: 'PC2024030005',
      materialName: '贵州烟叶',
      materialType: '辅料',
      quantity: 2500,
      unit: 'kg',
      budgetAmount: 375000,
      supplier: '贵州烟草公司',
      planDate: '2024-05-10',
      deliveryDate: '2024-06-10',
      status: 'approved',
      priority: 'medium',
      manager: '钱采购',
      approver: '李总监',
      approveDate: '2024-03-25',
      qualityRequirement: 'B级，有机认证',
      notes: '有机原料采购，价格较高'
    },
    {
      id: 'PP006',
      planNo: 'PC2024030006',
      materialName: '湖南烟叶',
      materialType: '主料',
      quantity: 3500,
      unit: 'kg',
      budgetAmount: 525000,
      supplier: '湖南烟草公司',
      planDate: '2024-05-15',
      deliveryDate: '2024-06-20',
      status: 'cancelled',
      priority: 'low',
      manager: '周采购',
      qualityRequirement: 'B级，传统工艺',
      notes: '因供应商产能不足，计划取消'
    },
    {
      id: 'PP007',
      planNo: 'PC2024030007',
      materialName: '福建烟叶',
      materialType: '调节料',
      quantity: 1200,
      unit: 'kg',
      budgetAmount: 240000,
      supplier: '福建烟草公司',
      planDate: '2024-05-20',
      deliveryDate: '2024-06-25',
      status: 'executing',
      priority: 'medium',
      manager: '吴采购',
      approver: '李总监',
      approveDate: '2024-03-22',
      qualityRequirement: 'A级，沿海特色',
      notes: '特色原料，用于高端产品'
    },
    {
      id: 'PP008',
      planNo: 'PC2024030008',
      materialName: '山东烟叶',
      materialType: '辅料',
      quantity: 2800,
      unit: 'kg',
      budgetAmount: 420000,
      supplier: '山东烟草公司',
      planDate: '2024-06-01',
      deliveryDate: '2024-07-05',
      status: 'draft',
      priority: 'medium',
      manager: '郑采购',
      qualityRequirement: 'B级，北方特色',
      notes: '北方原料补充计划'
    },
    {
      id: 'PP009',
      planNo: 'PC2024030009',
      materialName: '广西烟叶',
      materialType: '主料',
      quantity: 2000,
      unit: 'kg',
      budgetAmount: 320000,
      supplier: '广西烟草公司',
      planDate: '2024-06-10',
      deliveryDate: '2024-07-15',
      status: 'approved',
      priority: 'high',
      manager: '冯采购',
      approver: '李总监',
      approveDate: '2024-03-28',
      qualityRequirement: 'A级，南方特色',
      notes: '南方基地优质原料'
    },
    {
      id: 'PP010',
      planNo: 'PC2024030010',
      materialName: '陕西烟叶',
      materialType: '调节料',
      quantity: 1800,
      unit: 'kg',
      budgetAmount: 270000,
      supplier: '陕西烟草公司',
      planDate: '2024-06-15',
      deliveryDate: '2024-07-20',
      status: 'draft',
      priority: 'low',
      manager: '韩采购',
      qualityRequirement: 'B级，西北特色',
      notes: '西北地区原料补充'
    }
  ]

  // 仓储醇化数据
  const storageAging: StorageAging[] = [
    {
      id: 'SA001',
      warehouseNo: 'WH001',
      materialName: '云南上部烟叶',
      materialType: '主料',
      batchNo: 'B2024030001',
      inboundDate: '2024-01-15',
      quantity: 5000,
      unit: 'kg',
      agingPeriod: 180,
      currentStatus: 'aging',
      temperature: 22,
      humidity: 65,
      qualityChange: '香气逐渐醇化，口感趋于柔和',
      inspector: '张醇化',
      lastCheckDate: '2024-03-20',
      expectedReleaseDate: '2024-07-15',
      qualityScore: 85,
      notes: '醇化进展良好，预计按期完成'
    },
    {
      id: 'SA002',
      warehouseNo: 'WH002',
      materialName: '河南中部烟叶',
      materialType: '辅料',
      batchNo: 'B2024030002',
      inboundDate: '2023-12-20',
      quantity: 3000,
      unit: 'kg',
      agingPeriod: 120,
      currentStatus: 'completed',
      temperature: 21,
      humidity: 63,
      qualityChange: '醇化完成，品质提升明显',
      inspector: '李醇化',
      lastCheckDate: '2024-03-18',
      expectedReleaseDate: '2024-04-20',
      actualReleaseDate: '2024-04-18',
      qualityScore: 92,
      notes: '醇化效果优良，已完成出库'
    },
    {
      id: 'SA003',
      warehouseNo: 'WH003',
      materialName: '四川烟叶',
      materialType: '主料',
      batchNo: 'B2024030003',
      inboundDate: '2024-02-10',
      quantity: 4000,
      unit: 'kg',
      agingPeriod: 150,
      currentStatus: 'aging',
      temperature: 23,
      humidity: 67,
      qualityChange: '高海拔烟叶醇化缓慢，品质稳定',
      inspector: '王醇化',
      lastCheckDate: '2024-03-22',
      expectedReleaseDate: '2024-07-10',
      qualityScore: 88,
      notes: '高海拔原料，醇化周期较长'
    },
    {
      id: 'SA004',
      warehouseNo: 'WH001',
      materialName: '贵州烟叶',
      materialType: '辅料',
      batchNo: 'B2024030004',
      inboundDate: '2024-01-25',
      quantity: 2500,
      unit: 'kg',
      agingPeriod: 160,
      currentStatus: 'testing',
      temperature: 22,
      humidity: 64,
      qualityChange: '有机烟叶醇化良好，无异味',
      inspector: '赵醇化',
      lastCheckDate: '2024-03-25',
      expectedReleaseDate: '2024-07-05',
      qualityScore: 90,
      notes: '有机认证原料，质量检测中'
    },
    {
      id: 'SA005',
      warehouseNo: 'WH004',
      materialName: '湖南烟叶',
      materialType: '主料',
      batchNo: 'B2024030005',
      inboundDate: '2023-11-30',
      quantity: 3500,
      unit: 'kg',
      agingPeriod: 140,
      currentStatus: 'released',
      temperature: 21,
      humidity: 62,
      qualityChange: '醇化完成，香气浓郁',
      inspector: '孙醇化',
      lastCheckDate: '2024-03-15',
      expectedReleaseDate: '2024-03-20',
      actualReleaseDate: '2024-03-20',
      qualityScore: 94,
      notes: '醇化效果极佳，已投入生产'
    },
    {
      id: 'SA006',
      warehouseNo: 'WH002',
      materialName: '福建烟叶',
      materialType: '调节料',
      batchNo: 'B2024030006',
      inboundDate: '2024-02-28',
      quantity: 1200,
      unit: 'kg',
      agingPeriod: 100,
      currentStatus: 'aging',
      temperature: 24,
      humidity: 68,
      qualityChange: '沿海特色逐渐显现',
      inspector: '钱醇化',
      lastCheckDate: '2024-03-28',
      expectedReleaseDate: '2024-06-08',
      qualityScore: 86,
      notes: '沿海特色原料，醇化周期较短'
    },
    {
      id: 'SA007',
      warehouseNo: 'WH003',
      materialName: '山东烟叶',
      materialType: '辅料',
      batchNo: 'B2024030007',
      inboundDate: '2024-01-08',
      quantity: 2800,
      unit: 'kg',
      agingPeriod: 170,
      currentStatus: 'aging',
      temperature: 20,
      humidity: 61,
      qualityChange: '北方烟叶醇化稳定',
      inspector: '周醇化',
      lastCheckDate: '2024-03-12',
      expectedReleaseDate: '2024-06-26',
      qualityScore: 83,
      notes: '北方原料，适应性强'
    },
    {
      id: 'SA008',
      warehouseNo: 'WH005',
      materialName: '广西烟叶',
      materialType: '主料',
      batchNo: 'B2024030008',
      inboundDate: '2024-03-01',
      quantity: 2000,
      unit: 'kg',
      agingPeriod: 130,
      currentStatus: 'aging',
      temperature: 25,
      humidity: 70,
      qualityChange: '南方烟叶醇化快速',
      inspector: '吴醇化',
      lastCheckDate: '2024-03-30',
      expectedReleaseDate: '2024-07-09',
      qualityScore: 87,
      notes: '南方高温高湿，醇化加速'
    },
    {
      id: 'SA009',
      warehouseNo: 'WH004',
      materialName: '陕西烟叶',
      materialType: '调节料',
      batchNo: 'B2024030009',
      inboundDate: '2023-12-15',
      quantity: 1800,
      unit: 'kg',
      agingPeriod: 120,
      currentStatus: 'completed',
      temperature: 19,
      humidity: 58,
      qualityChange: '西北干燥气候醇化完成',
      inspector: '郑醇化',
      lastCheckDate: '2024-03-10',
      expectedReleaseDate: '2024-04-15',
      actualReleaseDate: '2024-04-12',
      qualityScore: 89,
      notes: '西北特色，干燥醇化效果好'
    },
    {
      id: 'SA010',
      warehouseNo: 'WH001',
      materialName: '江西烟叶',
      materialType: '主料',
      batchNo: 'B2024030010',
      inboundDate: '2024-02-20',
      quantity: 2200,
      unit: 'kg',
      agingPeriod: 145,
      currentStatus: 'testing',
      temperature: 22,
      humidity: 66,
      qualityChange: '江南烟叶醇化中等',
      inspector: '冯醇化',
      lastCheckDate: '2024-03-26',
      expectedReleaseDate: '2024-07-14',
      qualityScore: 85,
      notes: '江南地区原料，品质稳定'
    }
  ]

  const columns = [
    {
      title: '原料编号',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '原料名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="blue">{type}</Tag>
    },
    {
      title: '产地',
      dataIndex: 'origin',
      key: 'origin'
    },
    {
      title: '等级',
      dataIndex: 'grade',
      key: 'grade',
      render: (grade: string) => <Tag color="green">{grade}</Tag>
    },
    {
      title: '库存',
      key: 'stock',
      render: (record: any) => `${record.stock} ${record.unit}`
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const configs = {
          normal: { color: 'green', text: '正常' },
          warning: { color: 'orange', text: '预警' },
          low: { color: 'red', text: '库存不足' }
        }
        const config = configs[status as keyof typeof configs]
        return <Tag color={config.color}>{config.text}</Tag>
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => openMaterialModal('view', record)}>
            查看
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => openMaterialModal('edit', record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDeleteMaterial(record.id)}>
            删除
          </Button>
        </Space>
      )
    }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">原料管理</h1>
        <p className="page-description">
          管理烟叶基地、原料库存、采购计划和仓储醇化
        </p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="原料总数"
              value={materialList.length}
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="库存预警"
              value={materialList.filter(m => m.status === 'warning' || m.status === 'low').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="正常库存"
              value={materialList.filter(m => m.status === 'normal').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="库存管理" key="materials" icon={<DatabaseOutlined />}>
          <Card
            title="原料库存列表"
            extra={
              <Button type="primary" icon={<PlusOutlined />} onClick={() => openMaterialModal('add')}>
                新增原料
              </Button>
            }
          >
            <Table
              columns={columns}
              dataSource={materialList}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
          <Modal
            title={materialModalType === 'add' ? '新增原料' : (materialModalType === 'edit' ? '编辑原料' : '原料详情')}
            open={materialModalVisible}
            onCancel={() => setMaterialModalVisible(false)}
            onOk={() => {
              if (materialModalType !== 'view') {
                materialForm.submit()
              } else {
                setMaterialModalVisible(false)
              }
            }}
            width={700}
          >
            <Form
              form={materialForm}
              layout="vertical"
              onFinish={materialModalType === 'add' ? handleCreateMaterial : handleUpdateMaterial}
              disabled={materialModalType === 'view'}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="name" label="原料名称" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="type" label="类型" rules={[{ required: true }]}>
                    <Select>
                      <Option value="主料">主料</Option>
                      <Option value="辅料">辅料</Option>
                      <Option value="调节料">调节料</Option>
                      <Option value="香料烟">香料烟</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="origin" label="产地" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="grade" label="等级" rules={[{ required: true }]}>
                    <Select>
                      <Option value="High">S级</Option>
                      <Option value="A级">A级</Option>
                      <Option value="B级">B级</Option>
                      <Option value="C级">C级</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="stock" label="库存数量" rules={[{ required: true }]}>
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="unit" label="单位" rules={[{ required: true }]}>
                    <Select>
                      <Option value="kg">kg</Option>
                      <Option value="吨">吨</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="supplier" label="供应商">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="expiryDate" label="有效期">
                    {/* 简化处理，实际可以使用 DatePicker */}
                    <Input placeholder="YYYY-MM-DD" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        </TabPane>

        <TabPane tab="基地管理" key="bases" icon={<HomeOutlined />}>
          <Card
            title="烟叶基地管理"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setModalType('add')
                  setSelectedRecord(null)
                  setModalVisible(true)
                }}
              >
                新增基地
              </Button>
            }
          >
            <Space style={{ marginBottom: 16 }}>
              <Search
                placeholder="搜索基地名称或位置"
                allowClear
                style={{ width: 300 }}
              />
              <Select
                placeholder="选择状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="active">活跃</Option>
                <Option value="inactive">停用</Option>
                <Option value="maintenance">维护中</Option>
              </Select>
              <Select
                placeholder="质量等级"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="A级">A级</Option>
                <Option value="B级">B级</Option>
                <Option value="C级">C级</Option>
              </Select>
            </Space>

            <Table
              columns={[
                {
                  title: '基地名称',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => <a>{text}</a>
                },
                {
                  title: '位置',
                  dataIndex: 'location',
                  key: 'location'
                },
                {
                  title: '面积(亩)',
                  dataIndex: 'area',
                  key: 'area',
                  render: (area: number) => area.toLocaleString()
                },
                {
                  title: '种植品种',
                  dataIndex: 'varieties',
                  key: 'varieties',
                  render: (varieties: string[]) => (
                    <Space wrap>
                      {varieties.map(variety => (
                        <Tag key={variety} color="green">{variety}</Tag>
                      ))}
                    </Space>
                  )
                },
                {
                  title: '质量等级',
                  dataIndex: 'qualityGrade',
                  key: 'qualityGrade',
                  render: (grade: string) => (
                    <Tag color={grade === 'A级' ? 'red' : grade === 'B级' ? 'orange' : 'blue'}>
                      {grade}
                    </Tag>
                  )
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => {
                    const colors = { active: 'green', inactive: 'red', maintenance: 'orange' }
                    const names = { active: '活跃', inactive: '停用', maintenance: '维护中' }
                    return <Tag color={colors[status as keyof typeof colors]}>{names[status as keyof typeof names]}</Tag>
                  }
                },
                {
                  title: '预估产量(kg)',
                  dataIndex: 'expectedYield',
                  key: 'expectedYield',
                  render: (yieldValue: number) => yieldValue.toLocaleString()
                },
                {
                  title: '负责人',
                  dataIndex: 'manager',
                  key: 'manager'
                },
                {
                  title: '最后检查',
                  dataIndex: 'lastInspection',
                  key: 'lastInspection'
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (record: TobaccoBase) => (
                    <Space size="middle">
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => {
                          setSelectedRecord(record)
                          setModalType('view')
                          setModalVisible(true)
                        }}
                      >
                        查看
                      </Button>
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => {
                          setSelectedRecord(record)
                          setModalType('edit')
                          setModalVisible(true)
                        }}
                      >
                        编辑
                      </Button>
                      <Button
                        type="link"
                        icon={<EnvironmentOutlined />}
                        size="small"
                      >
                        地图
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={tobaccoBases}
              rowKey="id"
              pagination={{
                total: tobaccoBases.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="采购计划" key="procurement" icon={<ShoppingCartOutlined />}>
          <Card
            title="采购计划管理"
            extra={
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setModalType('add')
                    setSelectedRecord(null)
                    setModalVisible(true)
                  }}
                >
                  新建计划
                </Button>
                <Button icon={<BarChartOutlined />}>
                  智能建议
                </Button>
              </Space>
            }
          >
            <Space style={{ marginBottom: 16 }}>
              <Search
                placeholder="搜索计划编号或原料名称"
                allowClear
                style={{ width: 300 }}
              />
              <Select
                placeholder="选择状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="draft">草稿</Option>
                <Option value="approved">已批准</Option>
                <Option value="executing">执行中</Option>
                <Option value="completed">已完成</Option>
                <Option value="cancelled">已取消</Option>
              </Select>
              <Select
                placeholder="优先级"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="high">高</Option>
                <Option value="medium">中</Option>
                <Option value="low">低</Option>
              </Select>
            </Space>

            <Table
              columns={[
                {
                  title: '计划编号',
                  dataIndex: 'planNo',
                  key: 'planNo',
                  render: (text: string) => <a>{text}</a>
                },
                {
                  title: '原料名称',
                  dataIndex: 'materialName',
                  key: 'materialName'
                },
                {
                  title: '类型',
                  dataIndex: 'materialType',
                  key: 'materialType',
                  render: (type: string) => <Tag color="blue">{type}</Tag>
                },
                {
                  title: '计划数量',
                  key: 'quantity',
                  render: (record: PurchasePlan) => `${record.quantity.toLocaleString()} ${record.unit}`
                },
                {
                  title: '预算金额',
                  dataIndex: 'budgetAmount',
                  key: 'budgetAmount',
                  render: (amount: number) => `¥${amount.toLocaleString()}`
                },
                {
                  title: '供应商',
                  dataIndex: 'supplier',
                  key: 'supplier'
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => {
                    const configs = {
                      draft: { color: 'orange', text: '草稿' },
                      approved: { color: 'blue', text: '已批准' },
                      executing: { color: 'green', text: '执行中' },
                      completed: { color: 'green', text: '已完成' },
                      cancelled: { color: 'red', text: '已取消' }
                    }
                    const config = configs[status as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '优先级',
                  dataIndex: 'priority',
                  key: 'priority',
                  render: (priority: string) => {
                    const colors = { high: 'red', medium: 'orange', low: 'green' }
                    const names = { high: '高', medium: '中', low: '低' }
                    return <Tag color={colors[priority as keyof typeof colors]}>{names[priority as keyof typeof names]}</Tag>
                  }
                },
                {
                  title: '计划日期',
                  dataIndex: 'planDate',
                  key: 'planDate'
                },
                {
                  title: '负责人',
                  dataIndex: 'manager',
                  key: 'manager'
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (record: PurchasePlan) => (
                    <Space size="middle">
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => {
                          setSelectedRecord(record)
                          setModalType('view')
                          setModalVisible(true)
                        }}
                      >
                        查看
                      </Button>
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => {
                          setSelectedRecord(record)
                          setModalType('edit')
                          setModalVisible(true)
                        }}
                        disabled={record.status === 'completed' || record.status === 'cancelled'}
                      >
                        编辑
                      </Button>
                      <Button
                        type="link"
                        icon={<CalendarOutlined />}
                        size="small"
                        disabled={record.status !== 'approved'}
                      >
                        执行
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={purchasePlans}
              rowKey="id"
              pagination={{
                total: purchasePlans.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="仓储醇化" key="storage" icon={<InboxOutlined />}>
          <Card
            title="仓储醇化管理"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setModalType('add')
                  setSelectedRecord(null)
                  setModalVisible(true)
                }}
              >
                新增入库
              </Button>
            }
          >
            <Space style={{ marginBottom: 16 }}>
              <Search
                placeholder="搜索仓库编号或原料名称"
                allowClear
                style={{ width: 300 }}
              />
              <Select
                placeholder="醇化状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="aging">醇化中</Option>
                <Option value="completed">已完成</Option>
                <Option value="testing">检测中</Option>
                <Option value="released">已出库</Option>
              </Select>
              <Select
                placeholder="仓库编号"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="WH001">WH001</Option>
                <Option value="WH002">WH002</Option>
                <Option value="WH003">WH003</Option>
                <Option value="WH004">WH004</Option>
                <Option value="WH005">WH005</Option>
              </Select>
            </Space>

            <Table
              columns={[
                {
                  title: '仓库编号',
                  dataIndex: 'warehouseNo',
                  key: 'warehouseNo',
                  render: (text: string) => <a>{text}</a>
                },
                {
                  title: '原料名称',
                  dataIndex: 'materialName',
                  key: 'materialName'
                },
                {
                  title: '批次号',
                  dataIndex: 'batchNo',
                  key: 'batchNo'
                },
                {
                  title: '数量',
                  key: 'quantity',
                  render: (record: StorageAging) => `${record.quantity.toLocaleString()} ${record.unit}`
                },
                {
                  title: '醇化状态',
                  dataIndex: 'currentStatus',
                  key: 'currentStatus',
                  render: (status: string) => {
                    const configs = {
                      aging: { color: 'blue', text: '醇化中' },
                      completed: { color: 'green', text: '已完成' },
                      testing: { color: 'orange', text: '检测中' },
                      released: { color: 'purple', text: '已出库' }
                    }
                    const config = configs[status as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '醇化进度',
                  key: 'progress',
                  render: (record: StorageAging) => {
                    const startDate = new Date(record.inboundDate)
                    const now = new Date()
                    const totalDays = record.agingPeriod
                    const passedDays = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
                    const progress = Math.min(Math.round((passedDays / totalDays) * 100), 100)
                    return <Progress percent={progress} size="small" />
                  }
                },
                {
                  title: '环境条件',
                  key: 'environment',
                  render: (record: StorageAging) => (
                    <div>
                      <div>温度: {record.temperature}°C</div>
                      <div>湿度: {record.humidity}%</div>
                    </div>
                  )
                },
                {
                  title: '质量评分',
                  dataIndex: 'qualityScore',
                  key: 'qualityScore',
                  render: (score: number) => (
                    <span style={{ color: score >= 90 ? '#52c41a' : score >= 80 ? '#faad14' : '#f5222d' }}>
                      {score}分
                    </span>
                  )
                },
                {
                  title: '检查员',
                  dataIndex: 'inspector',
                  key: 'inspector'
                },
                {
                  title: '预计出库',
                  dataIndex: 'expectedReleaseDate',
                  key: 'expectedReleaseDate'
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (record: StorageAging) => (
                    <Space size="middle">
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => {
                          setSelectedRecord(record)
                          setModalType('view')
                          setModalVisible(true)
                        }}
                      >
                        查看
                      </Button>
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => {
                          setSelectedRecord(record)
                          setModalType('edit')
                          setModalVisible(true)
                        }}
                        disabled={record.currentStatus === 'released'}
                      >
                        编辑
                      </Button>
                      <Button
                        type="link"
                        icon={<BarChartOutlined />}
                        size="small"
                      >
                        监控
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={storageAging}
              rowKey="id"
              pagination={{
                total: storageAging.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* 通用模态框 */}
      <Modal
        title={
          modalType === 'add' ? '新增记录' :
            modalType === 'edit' ? '编辑记录' : '记录详情'
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={800}
        footer={modalType === 'view' ? [
          <Button key="close" onClick={() => setModalVisible(false)}>
            关闭
          </Button>
        ] : [
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary">
            {modalType === 'add' ? '创建' : '保存'}
          </Button>
        ]}
      >
        <Form layout="vertical">
          {activeTab === 'bases' && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="基地名称">
                    <Input
                      placeholder="请输入基地名称"
                      defaultValue={selectedRecord?.name}
                      disabled={modalType === 'view'}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="基地位置">
                    <Input
                      placeholder="请输入基地位置"
                      defaultValue={selectedRecord?.location}
                      disabled={modalType === 'view'}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="面积(亩)">
                    <InputNumber
                      min={0}
                      placeholder="请输入面积"
                      defaultValue={selectedRecord?.area}
                      disabled={modalType === 'view'}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="质量等级">
                    <Select
                      placeholder="请选择质量等级"
                      defaultValue={selectedRecord?.qualityGrade}
                      disabled={modalType === 'view'}
                    >
                      <Option value="A级">A级</Option>
                      <Option value="B级">B级</Option>
                      <Option value="C级">C级</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="负责人">
                    <Input
                      placeholder="请输入负责人"
                      defaultValue={selectedRecord?.manager}
                      disabled={modalType === 'view'}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="联系电话">
                    <Input
                      placeholder="请输入联系电话"
                      defaultValue={selectedRecord?.contact}
                      disabled={modalType === 'view'}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          {activeTab === 'procurement' && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="原料名称">
                    <Input
                      placeholder="请输入原料名称"
                      defaultValue={selectedRecord?.materialName}
                      disabled={modalType === 'view'}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="原料类型">
                    <Select
                      placeholder="请选择原料类型"
                      defaultValue={selectedRecord?.materialType}
                      disabled={modalType === 'view'}
                    >
                      <Option value="主料">主料</Option>
                      <Option value="辅料">辅料</Option>
                      <Option value="调节料">调节料</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="计划数量">
                    <InputNumber
                      min={0}
                      placeholder="请输入计划数量"
                      defaultValue={selectedRecord?.quantity}
                      disabled={modalType === 'view'}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="预算金额">
                    <InputNumber
                      min={0}
                      placeholder="请输入预算金额"
                      defaultValue={selectedRecord?.budgetAmount}
                      disabled={modalType === 'view'}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="供应商">
                    <Input
                      placeholder="请输入供应商"
                      defaultValue={selectedRecord?.supplier}
                      disabled={modalType === 'view'}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="优先级">
                    <Select
                      placeholder="请选择优先级"
                      defaultValue={selectedRecord?.priority}
                      disabled={modalType === 'view'}
                    >
                      <Option value="high">高</Option>
                      <Option value="medium">中</Option>
                      <Option value="low">低</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          {activeTab === 'storage' && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="仓库编号">
                    <Select
                      placeholder="请选择仓库"
                      defaultValue={selectedRecord?.warehouseNo}
                      disabled={modalType === 'view'}
                    >
                      <Option value="WH001">WH001</Option>
                      <Option value="WH002">WH002</Option>
                      <Option value="WH003">WH003</Option>
                      <Option value="WH004">WH004</Option>
                      <Option value="WH005">WH005</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="原料名称">
                    <Input
                      placeholder="请输入原料名称"
                      defaultValue={selectedRecord?.materialName}
                      disabled={modalType === 'view'}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="批次号">
                    <Input
                      placeholder="请输入批次号"
                      defaultValue={selectedRecord?.batchNo}
                      disabled={modalType === 'view'}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="醇化周期(天)">
                    <InputNumber
                      min={0}
                      placeholder="请输入醇化周期"
                      defaultValue={selectedRecord?.agingPeriod}
                      disabled={modalType === 'view'}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="温度(°C)">
                    <InputNumber
                      min={0}
                      max={50}
                      placeholder="请输入温度"
                      defaultValue={selectedRecord?.temperature}
                      disabled={modalType === 'view'}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="湿度(%)">
                    <InputNumber
                      min={0}
                      max={100}
                      placeholder="请输入湿度"
                      defaultValue={selectedRecord?.humidity}
                      disabled={modalType === 'view'}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          <Form.Item label="备注">
            <Input.TextArea
              rows={3}
              placeholder="请输入备注信息"
              defaultValue={selectedRecord?.notes}
              disabled={modalType === 'view'}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default MaterialManagement
