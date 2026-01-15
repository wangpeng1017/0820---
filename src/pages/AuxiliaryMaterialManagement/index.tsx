import React, { useState } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Modal, Form, Input, Select, Progress, Alert, Timeline, Divider, Upload, QRCode } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  FileTextOutlined,
  QrcodeOutlined,
  BarcodeScannerOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
  DownloadOutlined,
  PrinterOutlined,
  SearchOutlined,
  FilterOutlined,
  HistoryOutlined,
  TagsOutlined,
  DatabaseOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input

// 辅材类型枚举
enum AuxiliaryMaterialType {
  CIGARETTE_PAPER = 'cigarette_paper',
  TIPPING_PAPER = 'tipping_paper',
  FILTER_ROD = 'filter_rod',
  TRADEMARK_PAPER = 'trademark_paper',
  INNER_LINER = 'inner_liner',
  ALUMINUM_FOIL = 'aluminum_foil',
  CELLOPHANE = 'cellophane',
  TEAR_TAPE = 'tear_tape',
  HOLOGRAM = 'hologram',
  BARCODE_LABEL = 'barcode_label'
}

// 辅材主数据接口
interface AuxiliaryMaterial {
  id: string
  name: string
  type: AuxiliaryMaterialType
  specification: string
  standard: 'GB' | 'YC' | 'QB' | 'Enterprise'
  standardNumber: string
  standardVersion: string
  supplier: string
  physicalProperties: Record<string, any>
  chemicalProperties: Record<string, any>
  qualityRequirements: Record<string, any>
  status: 'active' | 'inactive' | 'obsolete'
  createTime: string
  updateTime: string
  creator: string
  updater: string
}

// 标识性材料接口
interface IdentificationMaterial {
  id: string
  name: string
  type: 'trademark' | 'barcode' | 'qrcode' | 'hologram' | 'security_label'
  productLine: string
  specification: string
  designFile: string
  printingRequirements: string
  colorRequirements: string
  materialRequirements: string
  supplier: string
  status: 'designing' | 'approved' | 'printing' | 'in_stock' | 'discontinued'
  createTime: string
  approver?: string
  approveTime?: string
}

// 辅材流程追溯接口
interface MaterialTraceability {
  id: string
  materialId: string
  materialName: string
  batchNumber: string
  processStage: 'application' | 'approval' | 'design' | 'printing' | 'inspection' | 'storage' | 'distribution' | 'usage' | 'disposal'
  operator: string
  operateTime: string
  description: string
  attachments: string[]
  nextStage?: string
  status: 'pending' | 'processing' | 'completed' | 'rejected'
}

const AuxiliaryMaterialManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('materials')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [traceModalVisible, setTraceModalVisible] = useState(false)
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false)


  const [form] = Form.useForm()

  // 模拟辅材主数据
  const [materialList, setMaterialList] = useState<AuxiliaryMaterial[]>([
    {
      id: 'AM001',
      name: '超薄透气卷烟纸',
      type: AuxiliaryMaterialType.CIGARETTE_PAPER,
      specification: '12.5g/m²，透气度26CU',
      standard: 'YC',
      standardNumber: 'YC/T 207-2014',
      standardVersion: '2014版',
      supplier: '法国博洛雷集团',
      physicalProperties: {
        weight: '12.5g/m²',
        permeability: '26CU',
        thickness: '12μm',
        opacity: '15%',
        tensile_strength: '120N·m/g'
      },
      chemicalProperties: {
        ash_content: '8.5%',
        moisture: '6.5%',
        ph_value: '7.2',
        heavy_metals: '<10ppm'
      },
      qualityRequirements: {
        appearance: '无破损、污渍',
        color: '自然白色',
        burning_rate: '4-6mm/min',
        ash_quality: '灰白色，不散落'
      },
      status: 'active',
      createTime: '2024-01-15 09:30:00',
      updateTime: '2024-03-20 14:15:00',
      creator: '张材料',
      updater: '李材料'
    },
    {
      id: 'AM002',
      name: '金色接装纸',
      type: AuxiliaryMaterialType.TIPPING_PAPER,
      specification: '64g/m²，金色印刷',
      standard: 'YC',
      standardNumber: 'YC/T 207-2014',
      standardVersion: '2014版',
      supplier: '奥地利SWM集团',
      physicalProperties: {
        weight: '64g/m²',
        thickness: '58μm',
        tensile_strength: '180N·m/g',
        printability: '优秀'
      },
      chemicalProperties: {
        moisture: '7.0%',
        ph_value: '7.5',
        ink_adhesion: '优良'
      },
      qualityRequirements: {
        color_consistency: '±2ΔE',
        printing_quality: '无重影、漏印',
        adhesive_strength: '≥2.5N/15mm'
      },
      status: 'active',
      createTime: '2024-02-10 11:20:00',
      updateTime: '2024-03-25 16:30:00',
      creator: '王材料',
      updater: '赵材料'
    },
    {
      id: 'AM003',
      name: '醋纤滤棒',
      type: AuxiliaryMaterialType.FILTER_ROD,
      specification: '20mm长度，7.8mm直径',
      standard: 'YC',
      standardNumber: 'YC/T 212-2014',
      standardVersion: '2014版',
      supplier: '伊斯曼化学公司',
      physicalProperties: {
        length: '20mm',
        diameter: '7.8mm',
        pressure_drop: '1050Pa',
        hardness: '85±5',
        weight: '120±10mg'
      },
      chemicalProperties: {
        acetate_content: '≥99%',
        plasticizer_content: '8-10%',
        moisture: '≤6%'
      },
      qualityRequirements: {
        appearance: '表面光滑，无缺陷',
        filtration_efficiency: '35±3%',
        tar_retention: '≥30%'
      },
      status: 'active',
      createTime: '2024-01-20 14:45:00',
      updateTime: '2024-03-18 10:20:00',
      creator: '孙材料',
      updater: '钱材料'
    },
    {
      id: 'AM004',
      name: '商标纸',
      type: AuxiliaryMaterialType.TRADEMARK_PAPER,
      specification: '250g/m²，四色印刷',
      standard: 'Enterprise',
      standardNumber: 'Q/AH001-2023',
      standardVersion: '2023版',
      supplier: '上海印刷集团',
      physicalProperties: {
        weight: '250g/m²',
        thickness: '280μm',
        stiffness: '≥8mN·m',
        smoothness: '≤150ml/min'
      },
      chemicalProperties: {
        moisture: '7.5%',
        ph_value: '7.0',
        ink_absorption: '良好'
      },
      qualityRequirements: {
        printing_precision: '±0.1mm',
        color_difference: '≤2ΔE',
        surface_quality: '无划痕、污点'
      },
      status: 'active',
      createTime: '2024-02-25 08:15:00',
      updateTime: '2024-03-30 13:40:00',
      creator: '周材料',
      updater: '吴材料'
    },
    {
      id: 'AM005',
      name: '内衬纸',
      type: AuxiliaryMaterialType.INNER_LINER,
      specification: '17g/m²，食品级',
      standard: 'GB',
      standardNumber: 'GB/T 22906-2008',
      standardVersion: '2008版',
      supplier: '芬兰斯道拉恩索',
      physicalProperties: {
        weight: '17g/m²',
        thickness: '20μm',
        air_permeability: '≤10ml/min',
        wet_strength: '≥0.8kN/m'
      },
      chemicalProperties: {
        moisture: '6.0%',
        ash_content: '≤15%',
        heavy_metals: '符合食品级要求'
      },
      qualityRequirements: {
        barrier_property: '优良',
        heat_sealability: '良好',
        odor: '无异味'
      },
      status: 'active',
      createTime: '2024-03-01 10:30:00',
      updateTime: '2024-03-28 15:20:00',
      creator: '郑材料',
      updater: '冯材料'
    },
    {
      id: 'AM006',
      name: '铝箔纸',
      type: AuxiliaryMaterialType.ALUMINUM_FOIL,
      specification: '12μm厚度，复合结构',
      standard: 'YC',
      standardNumber: 'YC/T 207-2014',
      standardVersion: '2014版',
      supplier: '中国铝业集团',
      physicalProperties: {
        thickness: '12μm',
        tensile_strength: '≥98N/mm²',
        elongation: '≥2%',
        pinhole_count: '≤5个/m²'
      },
      chemicalProperties: {
        aluminum_purity: '≥99.5%',
        surface_treatment: '食品级涂层',
        corrosion_resistance: '优良'
      },
      qualityRequirements: {
        barrier_property: '水蒸气透过率≤0.05g/m²·24h',
        heat_sealability: '良好',
        appearance: '表面光亮，无划伤'
      },
      status: 'active',
      createTime: '2024-02-15 13:25:00',
      updateTime: '2024-03-22 11:10:00',
      creator: '陈材料',
      updater: '刘材料'
    },
    {
      id: 'AM007',
      name: '玻璃纸',
      type: AuxiliaryMaterialType.CELLOPHANE,
      specification: '20μm厚度，透明',
      standard: 'QB',
      standardNumber: 'QB/T 1125-2014',
      standardVersion: '2014版',
      supplier: '日本三菱化学',
      physicalProperties: {
        thickness: '20μm',
        transparency: '≥92%',
        tensile_strength: '≥120N/mm²',
        tear_strength: '≥8N'
      },
      chemicalProperties: {
        moisture: '≤12%',
        volatile_matter: '≤1%',
        ash_content: '≤0.5%'
      },
      qualityRequirements: {
        optical_property: '高透明度',
        barrier_property: '良好',
        heat_sealability: '适中'
      },
      status: 'active',
      createTime: '2024-03-05 09:40:00',
      updateTime: '2024-03-26 14:55:00',
      creator: '杨材料',
      updater: '徐材料'
    },
    {
      id: 'AM008',
      name: '拉线',
      type: AuxiliaryMaterialType.TEAR_TAPE,
      specification: '1.5mm宽度，红色',
      standard: 'Enterprise',
      standardNumber: 'Q/AH002-2023',
      standardVersion: '2023版',
      supplier: '德国tesa集团',
      physicalProperties: {
        width: '1.5mm',
        thickness: '50μm',
        tensile_strength: '≥150N/mm²',
        elongation: '≥100%'
      },
      chemicalProperties: {
        adhesive_type: '丙烯酸酯',
        peel_strength: '≥8N/25mm',
        temperature_resistance: '-40°C~+80°C'
      },
      qualityRequirements: {
        color_fastness: '≥7级',
        aging_resistance: '良好',
        easy_tear: '撕拉力适中'
      },
      status: 'active',
      createTime: '2024-03-10 11:15:00',
      updateTime: '2024-03-29 16:45:00',
      creator: '朱材料',
      updater: '马材料'
    }
  ])

  // CRUD 处理函数
  const handleCreateMaterial = () => {
    form.validateFields().then(values => {
      const newMaterial: AuxiliaryMaterial = {
        id: `AM${(materialList.length + 1).toString().padStart(3, '0')}`,
        ...values,
        createTime: new Date().toLocaleString(),
        updateTime: new Date().toLocaleString(),
        creator: '当前用户',
        updater: '当前用户',
        physicalProperties: {},
        chemicalProperties: {},
        qualityRequirements: {}
      }
      setMaterialList([...materialList, newMaterial])
      setModalVisible(false)
      form.resetFields()
    })
  }

  const handleUpdateMaterial = () => {
    form.validateFields().then(values => {
      const updatedList = materialList.map(item =>
        item.id === selectedRecord.id
          ? { ...item, ...values, updateTime: new Date().toLocaleString() }
          : item
      )
      setMaterialList(updatedList)
      setModalVisible(false)
      form.resetFields()
    })
  }

  const handleDeleteMaterial = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个辅材吗？',
      onOk: () => {
        setMaterialList(materialList.filter(item => item.id !== id))
      }
    })
  }

  const openModal = (type: 'create' | 'edit' | 'view', record?: any) => {
    setModalType(type)
    setSelectedRecord(record || null)
    if (record && type !== 'create') {
      form.setFieldsValue(record)
    } else {
      form.resetFields()
    }
    setModalVisible(true)
  }

  // 模拟标识性材料数据
  const identificationMaterials: IdentificationMaterial[] = [
    {
      id: 'IM001',
      name: '焦甜香系列商标',
      type: 'trademark',
      productLine: '焦甜香系列',
      specification: '85mm×55mm，四色印刷+烫金',
      designFile: 'trademark_design_v2.3.ai',
      printingRequirements: '四色胶印+烫金工艺',
      colorRequirements: 'Pantone 877C金色，CMYK四色',
      materialRequirements: '250g/m²铜版纸',
      supplier: '上海印刷集团',
      status: 'approved',
      createTime: '2024-03-15 10:30:00',
      approver: '李总监',
      approveTime: '2024-03-20 14:20:00'
    },
    {
      id: 'IM002',
      name: '产品条码标签',
      type: 'barcode',
      productLine: '全系列产品',
      specification: '30mm×15mm，一维码+二维码',
      designFile: 'barcode_template_v1.2.pdf',
      printingRequirements: '热转印打印',
      colorRequirements: '黑色条码，白色底色',
      materialRequirements: '不干胶标签纸',
      supplier: '北京标签公司',
      status: 'in_stock',
      createTime: '2024-03-18 09:15:00',
      approver: '王经理',
      approveTime: '2024-03-19 11:30:00'
    },
    {
      id: 'IM003',
      name: '防伪全息标签',
      type: 'hologram',
      productLine: '高端系列',
      specification: '20mm×20mm，彩虹全息',
      designFile: 'hologram_design_v1.5.cdr',
      printingRequirements: '激光全息压印',
      colorRequirements: '彩虹色全息效果',
      materialRequirements: '全息防伪材料',
      supplier: '深圳防伪科技',
      status: 'printing',
      createTime: '2024-03-22 14:45:00',
      approver: '赵总监',
      approveTime: '2024-03-25 16:10:00'
    },
    {
      id: 'IM004',
      name: '追溯二维码',
      type: 'qrcode',
      productLine: '全系列产品',
      specification: '15mm×15mm，数据矩阵码',
      designFile: 'qrcode_spec_v2.1.doc',
      printingRequirements: '激光打标',
      colorRequirements: '黑色码，透明底',
      materialRequirements: '激光打标膜',
      supplier: '广州激光设备',
      status: 'approved',
      createTime: '2024-03-25 11:20:00',
      approver: '孙经理',
      approveTime: '2024-03-28 09:45:00'
    },
    {
      id: 'IM005',
      name: '安全认证标签',
      type: 'security_label',
      productLine: '出口产品',
      specification: '25mm×12mm，安全认证标识',
      designFile: 'security_label_v1.0.eps',
      printingRequirements: '丝网印刷+UV固化',
      colorRequirements: '蓝色+白色',
      materialRequirements: '防撕毁标签材料',
      supplier: '香港安全标签',
      status: 'designing',
      createTime: '2024-03-28 15:30:00'
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">材料管理 (烟用辅材)</h1>
        <p className="page-description">
          烟用辅材主数据标准化管理、标识性材料数据库、全流程追溯管理
        </p>
      </div>

      {/* 统计概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="辅材种类"
              value={materialList.length}
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="在用材料"
              value={materialList.filter(m => m.status === 'active').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="标识材料"
              value={identificationMaterials.length}
              prefix={<TagsOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="追溯记录"
              value={156}
              prefix={<HistoryOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="辅材主数据" key="materials" icon={<DatabaseOutlined />}>
          <Card
            title="辅材主数据管理"
            extra={
              <Space>
                <Button
                  icon={<UploadOutlined />}
                >
                  批量导入
                </Button>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    openModal('create')
                  }}
                >
                  新建辅材
                </Button>
              </Space>
            }
          >
            <Space style={{ marginBottom: 16 }}>
              <Select
                placeholder="材料类型"
                style={{ width: 150 }}
                allowClear
              >
                <Option value="cigarette_paper">卷烟纸</Option>
                <Option value="tipping_paper">接装纸</Option>
                <Option value="filter_rod">滤棒</Option>
                <Option value="trademark_paper">商标纸</Option>
                <Option value="inner_liner">内衬纸</Option>
                <Option value="aluminum_foil">铝箔纸</Option>
                <Option value="cellophane">玻璃纸</Option>
                <Option value="tear_tape">拉线</Option>
                <Option value="hologram">全息标签</Option>
                <Option value="barcode_label">条码标签</Option>
              </Select>
              <Select
                placeholder="执行标准"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="GB">国标</Option>
                <Option value="YC">行标</Option>
                <Option value="QB">轻工标准</Option>
                <Option value="Enterprise">企标</Option>
              </Select>
              <Select
                placeholder="状态"
                style={{ width: 100 }}
                allowClear
              >
                <Option value="active">在用</Option>
                <Option value="inactive">停用</Option>
                <Option value="obsolete">淘汰</Option>
              </Select>
            </Space>

            <Table
              columns={[
                {
                  title: '材料名称',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => <a>{text}</a>
                },
                {
                  title: '材料类型',
                  dataIndex: 'type',
                  key: 'type',
                  render: (type: AuxiliaryMaterialType) => {
                    const typeNames = {
                      cigarette_paper: '卷烟纸',
                      tipping_paper: '接装纸',
                      filter_rod: '滤棒',
                      trademark_paper: '商标纸',
                      inner_liner: '内衬纸',
                      aluminum_foil: '铝箔纸',
                      cellophane: '玻璃纸',
                      tear_tape: '拉线',
                      hologram: '全息标签',
                      barcode_label: '条码标签'
                    }
                    return <Tag color="blue">{typeNames[type]}</Tag>
                  }
                },
                {
                  title: '规格',
                  dataIndex: 'specification',
                  key: 'specification'
                },
                {
                  title: '执行标准',
                  key: 'standard',
                  render: (record: AuxiliaryMaterial) => (
                    <div>
                      <Tag color="green">{record.standard}</Tag>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {record.standardNumber}
                      </div>
                    </div>
                  )
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
                      active: { color: 'green', text: '在用' },
                      inactive: { color: 'orange', text: '停用' },
                      obsolete: { color: 'red', text: '淘汰' }
                    }
                    const config = configs[status as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '更新时间',
                  dataIndex: 'updateTime',
                  key: 'updateTime'
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (record: AuxiliaryMaterial) => (
                    <Space size="middle">
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => {
                          openModal('view', record)
                        }}
                      >
                        查看
                      </Button>
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => {
                          openModal('edit', record)
                        }}
                      >
                        编辑
                      </Button>
                      <Button
                        type="link"
                        icon={<HistoryOutlined />}
                        size="small"
                        onClick={() => {
                          setSelectedRecord(record)
                          setTraceModalVisible(true)
                        }}
                      >
                        追溯
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={materialList}
              rowKey="id"
              pagination={{
                total: materialList.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="标识性材料" key="identification" icon={<TagsOutlined />}>
          <Card
            title="标识性材料数据库"
            extra={
              <Space>
                <Button
                  icon={<QrcodeOutlined />}
                  onClick={() => setQrCodeModalVisible(true)}
                >
                  生成二维码
                </Button>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setModalType('create')
                    setSelectedRecord(null)
                    setModalVisible(true)
                  }}
                >
                  新建标识
                </Button>
              </Space>
            }
          >
            <Space style={{ marginBottom: 16 }}>
              <Select
                placeholder="标识类型"
                style={{ width: 150 }}
                allowClear
              >
                <Option value="trademark">商标</Option>
                <Option value="barcode">条码</Option>
                <Option value="qrcode">二维码</Option>
                <Option value="hologram">全息标签</Option>
                <Option value="security_label">安全标签</Option>
              </Select>
              <Select
                placeholder="产品线"
                style={{ width: 150 }}
                allowClear
              >
                <Option value="焦甜香系列">焦甜香系列</Option>
                <Option value="高端系列">高端系列</Option>
                <Option value="环保系列">环保系列</Option>
                <Option value="全系列产品">全系列产品</Option>
              </Select>
              <Select
                placeholder="状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="designing">设计中</Option>
                <Option value="approved">已批准</Option>
                <Option value="printing">印刷中</Option>
                <Option value="in_stock">库存中</Option>
                <Option value="discontinued">已停用</Option>
              </Select>
            </Space>

            <Table
              columns={[
                {
                  title: '标识名称',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => <a>{text}</a>
                },
                {
                  title: '标识类型',
                  dataIndex: 'type',
                  key: 'type',
                  render: (type: string) => {
                    const typeConfigs = {
                      trademark: { color: 'gold', text: '商标' },
                      barcode: { color: 'blue', text: '条码' },
                      qrcode: { color: 'green', text: '二维码' },
                      hologram: { color: 'purple', text: '全息标签' },
                      security_label: { color: 'red', text: '安全标签' }
                    }
                    const config = typeConfigs[type as keyof typeof typeConfigs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '产品线',
                  dataIndex: 'productLine',
                  key: 'productLine',
                  render: (line: string) => <Tag>{line}</Tag>
                },
                {
                  title: '规格',
                  dataIndex: 'specification',
                  key: 'specification'
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
                    const statusConfigs = {
                      designing: { color: 'blue', text: '设计中' },
                      approved: { color: 'green', text: '已批准' },
                      printing: { color: 'orange', text: '印刷中' },
                      in_stock: { color: 'cyan', text: '库存中' },
                      discontinued: { color: 'red', text: '已停用' }
                    }
                    const config = statusConfigs[status as keyof typeof statusConfigs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '批准人',
                  dataIndex: 'approver',
                  key: 'approver',
                  render: (approver: string) => approver || '-'
                },
                {
                  title: '创建时间',
                  dataIndex: 'createTime',
                  key: 'createTime'
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (record: IdentificationMaterial) => (
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
                        disabled={record.status === 'discontinued'}
                      >
                        编辑
                      </Button>
                      <Button
                        type="link"
                        icon={<PrinterOutlined />}
                        size="small"
                      >
                        打印
                      </Button>
                      <Button
                        type="link"
                        icon={<DownloadOutlined />}
                        size="small"
                      >
                        下载
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={identificationMaterials}
              rowKey="id"
              pagination={{
                total: identificationMaterials.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="流程追溯" key="traceability" icon={<HistoryOutlined />}>
          <Card title="辅材全流程追溯">
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={8}>
                <Card size="small" title="追溯查询">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Input
                      placeholder="输入材料名称或批次号"
                      prefix={<SearchOutlined />}
                    />
                    <Select placeholder="流程阶段" style={{ width: '100%' }}>
                      <Option value="application">申请备案</Option>
                      <Option value="approval">审批通过</Option>
                      <Option value="design">设计确认</Option>
                      <Option value="printing">印刷对接</Option>
                      <Option value="inspection">质量检验</Option>
                      <Option value="storage">入库存储</Option>
                      <Option value="distribution">领用分发</Option>
                      <Option value="usage">使用消耗</Option>
                      <Option value="disposal">作废注销</Option>
                    </Select>
                    <Button type="primary" icon={<SearchOutlined />} block>
                      查询追溯
                    </Button>
                  </Space>
                </Card>
              </Col>

              <Col xs={24} lg={16}>
                <Card size="small" title="追溯时间线">
                  <Timeline>
                    <Timeline.Item color="green">
                      <div style={{ fontWeight: 'bold' }}>申请备案</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>2024-03-15 09:30 - 张材料</div>
                      <div style={{ fontSize: '12px' }}>提交焦甜香系列商标设计申请</div>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      <div style={{ fontWeight: 'bold' }}>审批通过</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>2024-03-16 14:20 - 李总监</div>
                      <div style={{ fontSize: '12px' }}>商标设计方案审批通过</div>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      <div style={{ fontWeight: 'bold' }}>设计确认</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>2024-03-18 10:15 - 王设计</div>
                      <div style={{ fontSize: '12px' }}>最终设计稿确认，生成印刷文件</div>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      <div style={{ fontWeight: 'bold' }}>印刷对接</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>2024-03-20 11:30 - 赵采购</div>
                      <div style={{ fontSize: '12px' }}>与上海印刷集团确认印刷工艺</div>
                    </Timeline.Item>
                    <Timeline.Item color="blue">
                      <div style={{ fontWeight: 'bold' }}>质量检验</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>2024-03-25 15:45 - 孙质检</div>
                      <div style={{ fontSize: '12px' }}>首批样品质量检验中...</div>
                    </Timeline.Item>
                    <Timeline.Item color="gray">
                      <div style={{ fontWeight: 'bold' }}>入库存储</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>待执行</div>
                    </Timeline.Item>
                  </Timeline>
                </Card>
              </Col>
            </Row>

            <Card title="批次追溯记录" style={{ marginTop: 16 }}>
              <Table
                size="small"
                columns={[
                  { title: '批次号', dataIndex: 'batchNumber', key: 'batchNumber' },
                  { title: '材料名称', dataIndex: 'materialName', key: 'materialName' },
                  {
                    title: '当前阶段', dataIndex: 'processStage', key: 'processStage', render: (stage: string) => {
                      const stageNames = {
                        application: '申请备案',
                        approval: '审批通过',
                        design: '设计确认',
                        printing: '印刷对接',
                        inspection: '质量检验',
                        storage: '入库存储',
                        distribution: '领用分发',
                        usage: '使用消耗',
                        disposal: '作废注销'
                      }
                      return <Tag color="blue">{stageNames[stage as keyof typeof stageNames]}</Tag>
                    }
                  },
                  { title: '操作人', dataIndex: 'operator', key: 'operator' },
                  { title: '操作时间', dataIndex: 'operateTime', key: 'operateTime' },
                  {
                    title: '状态', dataIndex: 'status', key: 'status', render: (status: string) => {
                      const statusConfigs = {
                        pending: { color: 'orange', text: '待处理' },
                        processing: { color: 'blue', text: '处理中' },
                        completed: { color: 'green', text: '已完成' },
                        rejected: { color: 'red', text: '已拒绝' }
                      }
                      const config = statusConfigs[status as keyof typeof statusConfigs]
                      return <Tag color={config.color}>{config.text}</Tag>
                    }
                  },
                  { title: '操作', key: 'action', render: () => <Button type="link" size="small">查看详情</Button> }
                ]}
                dataSource={[
                  { batchNumber: 'TM202403001', materialName: '焦甜香系列商标', processStage: 'inspection', operator: '孙质检', operateTime: '2024-03-25 15:45', status: 'processing' },
                  { batchNumber: 'BC202403002', materialName: '产品条码标签', processStage: 'storage', operator: '钱仓管', operateTime: '2024-03-24 09:20', status: 'completed' },
                  { batchNumber: 'HG202403003', materialName: '防伪全息标签', processStage: 'printing', operator: '周采购', operateTime: '2024-03-23 14:30', status: 'processing' }
                ]}
                pagination={false}
              />
            </Card>
          </Card>
        </TabPane>
      </Tabs>

      {/* 二维码生成模态框 */}
      <Modal
        title="生成材料二维码"
        open={qrCodeModalVisible}
        onCancel={() => setQrCodeModalVisible(false)}
        width={600}
        footer={[
          <Button key="cancel" onClick={() => setQrCodeModalVisible(false)}>
            关闭
          </Button>,
          <Button key="download" type="primary" icon={<DownloadOutlined />}>
            下载二维码
          </Button>
        ]}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form layout="vertical">
              <Form.Item label="材料信息">
                <Select placeholder="选择材料">
                  <Option value="AM001">超薄透气卷烟纸</Option>
                  <Option value="AM002">金色接装纸</Option>
                  <Option value="AM003">醋纤滤棒</Option>
                </Select>
              </Form.Item>
              <Form.Item label="批次号">
                <Input placeholder="输入批次号" />
              </Form.Item>
              <Form.Item label="生产日期">
                <Input type="date" />
              </Form.Item>
              <Form.Item label="有效期">
                <Input type="date" />
              </Form.Item>
              <Form.Item label="附加信息">
                <TextArea rows={3} placeholder="输入附加信息..." />
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: 16 }}>
                <QRCode value="https://example.com/material/AM001/batch/B202403001" size={200} />
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                扫描二维码查看材料详细信息
              </div>
            </div>
          </Col>
        </Row>
      </Modal>

      {/* 材料详情模态框 */}
      <Modal
        title={
          modalType === 'create' ? '新建辅材' :
            modalType === 'edit' ? '编辑辅材' : '辅材详情'
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={900}
        footer={modalType === 'view' ? [
          <Button key="close" onClick={() => setModalVisible(false)}>
            关闭
          </Button>
        ] : [
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={modalType === 'create' ? handleCreateMaterial : handleUpdateMaterial}>
            {modalType === 'create' ? '创建' : '保存'}
          </Button>
        ]}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="材料名称" name="name" rules={[{ required: true, message: '请输入材料名称' }]}>
                <Input
                  placeholder="请输入材料名称"
                  disabled={modalType === 'view'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="材料类型" name="type" rules={[{ required: true, message: '请选择材料类型' }]}>
                <Select
                  placeholder="请选择材料类型"
                  disabled={modalType === 'view'}
                >
                  <Option value="cigarette_paper">卷烟纸</Option>
                  <Option value="tipping_paper">接装纸</Option>
                  <Option value="filter_rod">滤棒</Option>
                  <Option value="trademark_paper">商标纸</Option>
                  <Option value="inner_liner">内衬纸</Option>
                  <Option value="aluminum_foil">铝箔纸</Option>
                  <Option value="cellophane">玻璃纸</Option>
                  <Option value="tear_tape">拉线</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="规格说明" name="specification">
                <TextArea
                  rows={2}
                  placeholder="请输入规格说明"
                  disabled={modalType === 'view'}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="执行标准" name="standard">
                <Select
                  placeholder="请选择标准类型"
                  disabled={modalType === 'view'}
                >
                  <Option value="GB">国标</Option>
                  <Option value="YC">行标</Option>
                  <Option value="QB">轻工标准</Option>
                  <Option value="Enterprise">企标</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="标准号" name="standardNumber">
                <Input
                  placeholder="请输入标准号"
                  disabled={modalType === 'view'}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="标准版本" name="standardVersion">
                <Input
                  placeholder="请输入标准版本"
                  disabled={modalType === 'view'}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="供应商" name="supplier">
                <Input
                  placeholder="请输入供应商"
                  disabled={modalType === 'view'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="状态" name="status">
                <Select
                  placeholder="请选择状态"
                  disabled={modalType === 'view'}
                >
                  <Option value="active">在用</Option>
                  <Option value="inactive">停用</Option>
                  <Option value="obsolete">淘汰</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {selectedRecord && modalType === 'view' && (
            <>
              <Divider>详细属性</Divider>
              <Row gutter={16}>
                <Col span={8}>
                  <Card size="small" title="物理性能">
                    {Object.entries(selectedRecord.physicalProperties || {}).map(([key, value]) => (
                      <div key={key} style={{ marginBottom: 4 }}>
                        <span style={{ fontWeight: 'bold' }}>{key}: </span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size="small" title="化学性能">
                    {Object.entries(selectedRecord.chemicalProperties || {}).map(([key, value]) => (
                      <div key={key} style={{ marginBottom: 4 }}>
                        <span style={{ fontWeight: 'bold' }}>{key}: </span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size="small" title="质量要求">
                    {Object.entries(selectedRecord.qualityRequirements || {}).map(([key, value]) => (
                      <div key={key} style={{ marginBottom: 4 }}>
                        <span style={{ fontWeight: 'bold' }}>{key}: </span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Form>
      </Modal>

      {/* 追溯详情模态框 */}
      <Modal
        title="材料追溯详情"
        open={traceModalVisible}
        onCancel={() => setTraceModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setTraceModalVisible(false)}>
            关闭
          </Button>,
          <Button key="export" type="primary" icon={<DownloadOutlined />}>
            导出追溯报告
          </Button>
        ]}
      >
        {selectedRecord && (
          <div>
            <Alert
              message={`材料追溯: ${selectedRecord.name}`}
              description={`材料编号: ${selectedRecord.id} | 供应商: ${selectedRecord.supplier}`}
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />

            <Timeline>
              <Timeline.Item color="green">
                <div style={{ fontWeight: 'bold' }}>材料创建</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{selectedRecord.createTime} - {selectedRecord.creator}</div>
                <div style={{ fontSize: '12px' }}>创建材料主数据记录</div>
              </Timeline.Item>
              <Timeline.Item color="green">
                <div style={{ fontWeight: 'bold' }}>标准审核</div>
                <div style={{ fontSize: '12px', color: '#666' }}>2024-03-16 10:30 - 技术部</div>
                <div style={{ fontSize: '12px' }}>技术标准审核通过</div>
              </Timeline.Item>
              <Timeline.Item color="green">
                <div style={{ fontWeight: 'bold' }}>供应商认证</div>
                <div style={{ fontSize: '12px', color: '#666' }}>2024-03-18 14:20 - 采购部</div>
                <div style={{ fontSize: '12px' }}>供应商资质认证完成</div>
              </Timeline.Item>
              <Timeline.Item color="green">
                <div style={{ fontWeight: 'bold' }}>质量检验</div>
                <div style={{ fontSize: '12px', color: '#666' }}>2024-03-20 09:15 - 质量部</div>
                <div style={{ fontSize: '12px' }}>首批样品质量检验合格</div>
              </Timeline.Item>
              <Timeline.Item color="blue">
                <div style={{ fontWeight: 'bold' }}>批量采购</div>
                <div style={{ fontSize: '12px', color: '#666' }}>2024-03-25 11:30 - 采购部</div>
                <div style={{ fontSize: '12px' }}>正式批量采购中...</div>
              </Timeline.Item>
            </Timeline>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default AuxiliaryMaterialManagement
