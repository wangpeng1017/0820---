import React, { useState } from 'react'
import { Card, Table, Button, Input, Select, Space, Tag, Modal, Form, DatePicker, Tabs, Row, Col, Statistic, Progress, Upload } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  SettingOutlined,
  UploadOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined
} from '@ant-design/icons'

const { Search } = Input
const { Option } = Select
const { TabPane } = Tabs
const { RangePicker } = DatePicker

interface Sample {
  id: string
  sampleNo: string
  sampleName: string
  sampleType: string
  source: string
  submitter: string
  submitTime: string
  status: string
  priority: string
  testItems: string[]
  assignedTo: string
  expectedDate: string
  actualDate?: string
  notes?: string
}

interface TestTask {
  id: string
  taskNo: string
  sampleId: string
  sampleNo: string
  testItem: string
  method: string
  instrument: string
  operator: string
  status: string
  startTime: string
  endTime?: string
  result?: string
  unit?: string
  standard?: string
  conclusion?: string
}

interface Instrument {
  id: string
  name: string
  model: string
  manufacturer: string
  serialNo: string
  location: string
  status: string
  calibrationDate: string
  nextCalibration: string
  maintenanceDate: string
  operator: string
  utilization: number
}

interface Document {
  id: string
  title: string
  type: string
  version: string
  status: string
  author: string
  createTime: string
  updateTime: string
  approver?: string
  approveTime?: string
  description: string
  fileSize: string
}

const LIMS: React.FC = () => {
  const [activeTab, setActiveTab] = useState('samples')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add')

  const [currentSample, setCurrentSample] = useState<Sample | null>(null)
  const [form] = Form.useForm()

  // 样品数据
  const [sampleList, setSampleList] = useState<Sample[]>([
    {
      id: 'S001',
      sampleNo: 'SP2024032001',
      sampleName: '红塔山成品样品',
      sampleType: '成品',
      source: '生产线A',
      submitter: '张质检',
      submitTime: '2024-03-20 09:30:00',
      status: 'completed',
      priority: 'normal',
      testItems: ['焦油量', '烟碱量', '一氧化碳', '含水率'],
      assignedTo: '李检测',
      expectedDate: '2024-03-22',
      actualDate: '2024-03-21',
      notes: '常规质量检测'
    },
    {
      id: 'S002',
      sampleNo: 'SP2024032002',
      sampleName: '玉溪原料样品',
      sampleType: '原料',
      source: '仓库B',
      submitter: '王质检',
      submitTime: '2024-03-21 14:15:00',
      status: 'testing',
      priority: 'high',
      testItems: ['水分', '杂质', '色泽', '香气'],
      assignedTo: '赵检测',
      expectedDate: '2024-03-23',
      notes: '新批次原料检测'
    },
    {
      id: 'S003',
      sampleNo: 'SP2024032003',
      sampleName: '中华半成品样品',
      sampleType: '半成品',
      source: '制丝车间',
      submitter: '刘质检',
      submitTime: '2024-03-22 10:45:00',
      status: 'pending',
      priority: 'normal',
      testItems: ['填充值', '含水率', '碎丝率'],
      assignedTo: '孙检测',
      expectedDate: '2024-03-24',
      notes: '工艺调整后检测'
    },
    {
      id: 'S004',
      sampleNo: 'SP2024032004',
      sampleName: '云烟包装材料',
      sampleType: '包材',
      source: '包装车间',
      submitter: '陈质检',
      submitTime: '2024-03-19 16:20:00',
      status: 'completed',
      priority: 'low',
      testItems: ['透气度', '拉伸强度', '厚度'],
      assignedTo: '周检测',
      expectedDate: '2024-03-21',
      actualDate: '2024-03-20',
      notes: '新供应商材料验证'
    },
    {
      id: 'S005',
      sampleNo: 'SP2024032005',
      sampleName: '黄鹤楼香精样品',
      sampleType: '香精',
      source: '调香室',
      submitter: '杨质检',
      submitTime: '2024-03-23 11:30:00',
      status: 'testing',
      priority: 'high',
      testItems: ['香气强度', '留香时间', '稳定性'],
      assignedTo: '吴检测',
      expectedDate: '2024-03-25',
      notes: '新配方香精评估'
    },
    {
      id: 'S006',
      sampleNo: 'SP2024032006',
      sampleName: '芙蓉王滤棒样品',
      sampleType: '滤棒',
      source: '滤棒车间',
      submitter: '马质检',
      submitTime: '2024-03-18 13:45:00',
      status: 'completed',
      priority: 'normal',
      testItems: ['压降', '硬度', '圆周'],
      assignedTo: '钱检测',
      expectedDate: '2024-03-20',
      actualDate: '2024-03-19',
      notes: '批量生产前验证'
    },
    {
      id: 'S007',
      sampleNo: 'SP2024032007',
      sampleName: '利群环境样品',
      sampleType: '环境',
      source: '生产车间',
      submitter: '朱质检',
      submitTime: '2024-03-24 08:15:00',
      status: 'pending',
      priority: 'normal',
      testItems: ['温度', '湿度', '洁净度', '微生物'],
      assignedTo: '徐检测',
      expectedDate: '2024-03-26',
      notes: '月度环境监测'
    },
    {
      id: 'S008',
      sampleNo: 'SP2024032008',
      sampleName: '苏烟废料样品',
      sampleType: '废料',
      source: '回收站',
      submitter: '胡质检',
      submitTime: '2024-03-25 15:30:00',
      status: 'rejected',
      priority: 'low',
      testItems: ['有害物质', '可回收性'],
      assignedTo: '林检测',
      expectedDate: '2024-03-27',
      notes: '环保合规检测，样品不合格'
    }
  ])

  const handleCreateSample = () => {
    form.validateFields().then(values => {
      const newSample: Sample = {
        id: `S${(sampleList.length + 1).toString().padStart(3, '0')}`,
        sampleNo: `SP${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`,
        submitTime: new Date().toLocaleString(),
        status: 'pending',
        ...values,
        testItems: values.testItems || [],
      }
      setSampleList([...sampleList, newSample])
      setModalVisible(false)
      form.resetFields()
    })
  }

  const handleUpdateSample = () => {
    form.validateFields().then(values => {
      const updatedList = sampleList.map(item =>
        item.id === currentSample?.id
          ? { ...item, ...values }
          : item
      )
      setSampleList(updatedList)
      setModalVisible(false)
      setCurrentSample(null)
      form.resetFields()
    })
  }

  const handleDeleteSample = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个样品吗？',
      onOk: () => {
        setSampleList(sampleList.filter(item => item.id !== id))
      }
    })
  }

  const openSampleModal = (type: 'add' | 'edit' | 'view', record?: Sample) => {
    setModalType(type)
    setCurrentSample(record || null)
    if (record && type !== 'add') {
      form.setFieldsValue(record)
    } else {
      form.resetFields()
    }
    setModalVisible(true)
  }


  // 检测任务数据
  const testTasks: TestTask[] = [
    {
      id: 'TT001',
      taskNo: 'TSK2024032001',
      sampleId: 'S001',
      sampleNo: 'SP2024032001',
      testItem: '焦油量',
      method: 'GB/T 19609-2004',
      instrument: '焦油测定仪-01',
      operator: '李检测',
      status: 'completed',
      startTime: '2024-03-20 10:00:00',
      endTime: '2024-03-20 12:30:00',
      result: '8.2',
      unit: 'mg',
      standard: '≤8.5mg',
      conclusion: '合格'
    },
    {
      id: 'TT002',
      taskNo: 'TSK2024032002',
      sampleId: 'S001',
      sampleNo: 'SP2024032001',
      testItem: '烟碱量',
      method: 'GB/T 23355-2009',
      instrument: '烟碱测定仪-01',
      operator: '李检测',
      status: 'completed',
      startTime: '2024-03-20 14:00:00',
      endTime: '2024-03-20 16:15:00',
      result: '0.78',
      unit: 'mg',
      standard: '0.6-1.0mg',
      conclusion: '合格'
    },
    {
      id: 'TT003',
      taskNo: 'TSK2024032003',
      sampleId: 'S002',
      sampleNo: 'SP2024032002',
      testItem: '水分',
      method: 'GB/T 16447-1996',
      instrument: '水分测定仪-02',
      operator: '赵检测',
      status: 'in_progress',
      startTime: '2024-03-21 15:00:00'
    },
    {
      id: 'TT004',
      taskNo: 'TSK2024032004',
      sampleId: 'S004',
      sampleNo: 'SP2024032004',
      testItem: '透气度',
      method: 'GB/T 12914-2008',
      instrument: '透气度测试仪-01',
      operator: '周检测',
      status: 'completed',
      startTime: '2024-03-19 17:00:00',
      endTime: '2024-03-19 18:30:00',
      result: '25',
      unit: 'CU',
      standard: '20-30CU',
      conclusion: '合格'
    },
    {
      id: 'TT005',
      taskNo: 'TSK2024032005',
      sampleId: 'S005',
      sampleNo: 'SP2024032005',
      testItem: '香气强度',
      method: '感官评价标准',
      instrument: '感官评价室',
      operator: '吴检测',
      status: 'in_progress',
      startTime: '2024-03-23 12:00:00'
    },
    {
      id: 'TT006',
      taskNo: 'TSK2024032006',
      sampleId: 'S006',
      sampleNo: 'SP2024032006',
      testItem: '压降',
      method: 'GB/T 16450-2004',
      instrument: '压降测试仪-01',
      operator: '钱检测',
      status: 'completed',
      startTime: '2024-03-18 14:30:00',
      endTime: '2024-03-18 16:00:00',
      result: '1050',
      unit: 'Pa',
      standard: '950-1150Pa',
      conclusion: '合格'
    },
    {
      id: 'TT007',
      taskNo: 'TSK2024032007',
      sampleId: 'S003',
      sampleNo: 'SP2024032003',
      testItem: '填充值',
      method: 'YC/T 152-2001',
      instrument: '填充值测定仪-01',
      operator: '孙检测',
      status: 'pending',
      startTime: '2024-03-24 09:00:00'
    },
    {
      id: 'TT008',
      taskNo: 'TSK2024032008',
      sampleId: 'S007',
      sampleNo: 'SP2024032007',
      testItem: '微生物',
      method: 'GB 4789.2-2016',
      instrument: '微生物培养箱-01',
      operator: '徐检测',
      status: 'pending',
      startTime: '2024-03-26 08:30:00'
    }
  ]

  // 仪器设备数据
  const instruments: Instrument[] = [
    {
      id: 'INS001',
      name: '焦油测定仪-01',
      model: 'TAR-2000',
      manufacturer: '北京分析仪器公司',
      serialNo: 'TAR20240001',
      location: '理化检测室A',
      status: 'normal',
      calibrationDate: '2024-01-15',
      nextCalibration: '2024-07-15',
      maintenanceDate: '2024-03-10',
      operator: '李检测',
      utilization: 85
    },
    {
      id: 'INS002',
      name: '烟碱测定仪-01',
      model: 'NIC-3000',
      manufacturer: '上海精密仪器厂',
      serialNo: 'NIC20240002',
      location: '理化检测室A',
      status: 'normal',
      calibrationDate: '2024-02-20',
      nextCalibration: '2024-08-20',
      maintenanceDate: '2024-03-15',
      operator: '李检测',
      utilization: 78
    },
    {
      id: 'INS003',
      name: '水分测定仪-02',
      model: 'MOI-1500',
      manufacturer: '德国分析设备公司',
      serialNo: 'MOI20240003',
      location: '理化检测室B',
      status: 'maintenance',
      calibrationDate: '2024-01-10',
      nextCalibration: '2024-07-10',
      maintenanceDate: '2024-03-20',
      operator: '赵检测',
      utilization: 65
    },
    {
      id: 'INS004',
      name: '透气度测试仪-01',
      model: 'PER-800',
      manufacturer: '英国测试仪器公司',
      serialNo: 'PER20240004',
      location: '物理检测室',
      status: 'normal',
      calibrationDate: '2024-03-01',
      nextCalibration: '2024-09-01',
      maintenanceDate: '2024-03-18',
      operator: '周检测',
      utilization: 72
    },
    {
      id: 'INS005',
      name: '压降测试仪-01',
      model: 'PRE-600',
      manufacturer: '日本精密仪器株式会社',
      serialNo: 'PRE20240005',
      location: '物理检测室',
      status: 'normal',
      calibrationDate: '2024-02-15',
      nextCalibration: '2024-08-15',
      maintenanceDate: '2024-03-12',
      operator: '钱检测',
      utilization: 88
    },
    {
      id: 'INS006',
      name: '填充值测定仪-01',
      model: 'FIL-400',
      manufacturer: '意大利测量设备公司',
      serialNo: 'FIL20240006',
      location: '物理检测室',
      status: 'calibration',
      calibrationDate: '2023-12-20',
      nextCalibration: '2024-06-20',
      maintenanceDate: '2024-03-05',
      operator: '孙检测',
      utilization: 45
    },
    {
      id: 'INS007',
      name: '微生物培养箱-01',
      model: 'BIO-2500',
      manufacturer: '美国生物设备公司',
      serialNo: 'BIO20240007',
      location: '微生物检测室',
      status: 'normal',
      calibrationDate: '2024-01-25',
      nextCalibration: '2024-07-25',
      maintenanceDate: '2024-03-22',
      operator: '徐检测',
      utilization: 92
    },
    {
      id: 'INS008',
      name: '感官评价室',
      model: 'SEN-ROOM-01',
      manufacturer: '专业感官设备公司',
      serialNo: 'SEN20240008',
      location: '感官评价中心',
      status: 'normal',
      calibrationDate: '2024-02-10',
      nextCalibration: '2024-08-10',
      maintenanceDate: '2024-03-25',
      operator: '吴检测',
      utilization: 68
    }
  ]

  // 体系文件数据
  const documents: Document[] = [
    {
      id: 'DOC001',
      title: '实验室质量管理体系文件',
      type: '管理文件',
      version: 'V3.2',
      status: 'effective',
      author: '质量部',
      createTime: '2024-01-15 10:00:00',
      updateTime: '2024-03-10 14:30:00',
      approver: '实验室主任',
      approveTime: '2024-03-12 09:00:00',
      description: '实验室质量管理体系的总体要求和实施细则',
      fileSize: '2.5MB'
    },
    {
      id: 'DOC002',
      title: '检测方法标准汇编',
      type: '技术文件',
      version: 'V2.8',
      status: 'effective',
      author: '技术部',
      createTime: '2024-02-20 09:15:00',
      updateTime: '2024-03-15 16:45:00',
      approver: '技术负责人',
      approveTime: '2024-03-18 10:30:00',
      description: '包含所有检测项目的标准方法和操作程序',
      fileSize: '8.7MB'
    },
    {
      id: 'DOC003',
      title: '仪器设备操作规程',
      type: '操作文件',
      version: 'V1.9',
      status: 'effective',
      author: '设备部',
      createTime: '2024-01-08 14:20:00',
      updateTime: '2024-03-05 11:15:00',
      approver: '设备负责人',
      approveTime: '2024-03-08 15:00:00',
      description: '各类检测仪器的操作规程和维护要求',
      fileSize: '5.3MB'
    },
    {
      id: 'DOC004',
      title: '样品管理程序',
      type: '程序文件',
      version: 'V2.1',
      status: 'effective',
      author: '样品管理员',
      createTime: '2024-02-05 08:30:00',
      updateTime: '2024-03-20 13:45:00',
      approver: '质量负责人',
      approveTime: '2024-03-22 09:30:00',
      description: '样品接收、处理、存储和处置的管理程序',
      fileSize: '1.8MB'
    },
    {
      id: 'DOC005',
      title: '数据完整性管理规定',
      type: '管理文件',
      version: 'V1.5',
      status: 'draft',
      author: 'IT部',
      createTime: '2024-03-18 16:00:00',
      updateTime: '2024-03-25 10:20:00',
      description: '实验室数据完整性的管理要求和技术措施',
      fileSize: '3.2MB'
    },
    {
      id: 'DOC006',
      title: '内部审核程序',
      type: '程序文件',
      version: 'V2.3',
      status: 'effective',
      author: '审核组',
      createTime: '2024-01-12 11:45:00',
      updateTime: '2024-03-08 14:15:00',
      approver: '管理者代表',
      approveTime: '2024-03-10 16:20:00',
      description: '实验室内部审核的程序和要求',
      fileSize: '2.1MB'
    },
    {
      id: 'DOC007',
      title: '人员培训管理制度',
      type: '制度文件',
      version: 'V1.7',
      status: 'effective',
      author: '人事部',
      createTime: '2024-02-28 09:00:00',
      updateTime: '2024-03-22 15:30:00',
      approver: '人力资源总监',
      approveTime: '2024-03-25 11:00:00',
      description: '实验室人员培训的管理制度和实施细则',
      fileSize: '4.6MB'
    },
    {
      id: 'DOC008',
      title: '应急响应预案',
      type: '应急文件',
      version: 'V1.3',
      status: 'review',
      author: '安全部',
      createTime: '2024-03-01 13:20:00',
      updateTime: '2024-03-28 09:45:00',
      description: '实验室突发事件的应急响应预案',
      fileSize: '1.9MB'
    }
  ]

  const sampleColumns = [
    {
      title: '样品编号',
      dataIndex: 'sampleNo',
      key: 'sampleNo',
      render: (text: string) => <a>{text}</a>
    },
    {
      title: '样品名称',
      dataIndex: 'sampleName',
      key: 'sampleName'
    },
    {
      title: '类型',
      dataIndex: 'sampleType',
      key: 'sampleType',
      render: (type: string) => <Tag color="blue">{type}</Tag>
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const configs = {
          pending: { color: 'orange', text: '待检测' },
          testing: { color: 'blue', text: '检测中' },
          completed: { color: 'green', text: '已完成' },
          rejected: { color: 'red', text: '已拒绝' }
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
        const colors = { high: 'red', normal: 'blue', low: 'green' }
        const names = { high: '高', normal: '正常', low: '低' }
        return <Tag color={colors[priority as keyof typeof colors]}>{names[priority as keyof typeof names]}</Tag>
      }
    },
    {
      title: '提交人',
      dataIndex: 'submitter',
      key: 'submitter'
    },
    {
      title: '分配给',
      dataIndex: 'assignedTo',
      key: 'assignedTo'
    },
    {
      title: '预期完成',
      dataIndex: 'expectedDate',
      key: 'expectedDate'
    },
    {
      title: '操作',
      key: 'action',
      render: (record: Sample) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => openSampleModal('view', record)}>
            查看
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => openSampleModal('edit', record)}>
            编辑
          </Button>
          <Button type="link" icon={<DeleteOutlined />} size="small" danger onClick={() => handleDeleteSample(record.id)}>
            删除
          </Button>
          <Button type="link" icon={<FileTextOutlined />} size="small">
            报告
          </Button>
        </Space>
      )
    }
  ]

  const taskColumns = [
    {
      title: '任务编号',
      dataIndex: 'taskNo',
      key: 'taskNo',
      render: (text: string) => <a>{text}</a>
    },
    {
      title: '样品编号',
      dataIndex: 'sampleNo',
      key: 'sampleNo'
    },
    {
      title: '检测项目',
      dataIndex: 'testItem',
      key: 'testItem'
    },
    {
      title: '检测方法',
      dataIndex: 'method',
      key: 'method',
      ellipsis: true
    },
    {
      title: '仪器设备',
      dataIndex: 'instrument',
      key: 'instrument'
    },
    {
      title: '操作员',
      dataIndex: 'operator',
      key: 'operator'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const configs = {
          pending: { color: 'orange', text: '待开始' },
          in_progress: { color: 'blue', text: '进行中' },
          completed: { color: 'green', text: '已完成' }
        }
        const config = configs[status as keyof typeof configs]
        return <Tag color={config.color}>{config.text}</Tag>
      }
    },
    {
      title: '结果',
      key: 'result',
      render: (record: TestTask) => (
        record.result ? `${record.result} ${record.unit}` : '-'
      )
    },
    {
      title: '结论',
      dataIndex: 'conclusion',
      key: 'conclusion',
      render: (conclusion?: string) => (
        conclusion ? (
          <Tag color={conclusion === '合格' ? 'green' : 'red'}>
            {conclusion}
          </Tag>
        ) : '-'
      )
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} size="small">
            查看
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small">
            编辑
          </Button>
        </Space>
      )
    }
  ]

  const instrumentColumns = [
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model'
    },
    {
      title: '制造商',
      dataIndex: 'manufacturer',
      key: 'manufacturer'
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const configs = {
          normal: { color: 'green', text: '正常' },
          maintenance: { color: 'orange', text: '维护中' },
          calibration: { color: 'blue', text: '校准中' },
          fault: { color: 'red', text: '故障' }
        }
        const config = configs[status as keyof typeof configs]
        return <Tag color={config.color}>{config.text}</Tag>
      }
    },
    {
      title: '使用率',
      dataIndex: 'utilization',
      key: 'utilization',
      render: (utilization: number) => (
        <Progress
          percent={utilization}
          size="small"
          status={utilization > 90 ? 'exception' : utilization > 70 ? 'active' : 'normal'}
        />
      )
    },
    {
      title: '下次校准',
      dataIndex: 'nextCalibration',
      key: 'nextCalibration'
    },
    {
      title: '操作员',
      dataIndex: 'operator',
      key: 'operator'
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} size="small">
            查看
          </Button>
          <Button type="link" icon={<SettingOutlined />} size="small">
            维护
          </Button>
        </Space>
      )
    }
  ]

  const documentColumns = [
    {
      title: '文件标题',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <a>{text}</a>
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="purple">{type}</Tag>
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      render: (version: string) => <Tag color="blue">{version}</Tag>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const configs = {
          draft: { color: 'orange', text: '草稿' },
          review: { color: 'blue', text: '审核中' },
          effective: { color: 'green', text: '生效' },
          obsolete: { color: 'red', text: '作废' }
        }
        const config = configs[status as keyof typeof configs]
        return <Tag color={config.color}>{config.text}</Tag>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: '批准人',
      dataIndex: 'approver',
      key: 'approver',
      render: (approver?: string) => approver || '-'
    },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
      key: 'fileSize'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} size="small">
            查看
          </Button>
          <Button type="link" icon={<DownloadOutlined />} size="small">
            下载
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small">
            编辑
          </Button>
        </Space>
      )
    }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">实验管理 (LIMS)</h1>
        <p className="page-description">
          实验室信息管理系统，包含检测业务流程、仪器数据采集和体系文件管理
        </p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="待检测样品"
              value={sampleList.filter(s => s.status === 'pending').length}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="检测中样品"
              value={sampleList.filter(s => s.status === 'testing').length}
              prefix={<ExperimentOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="设备故障"
              value={instruments.filter(i => i.status === 'fault' || i.status === 'maintenance').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="生效文件"
              value={documents.filter(d => d.status === 'effective').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="样品管理" key="samples" icon={<ExperimentOutlined />}>
          <Card>
            <Space style={{ marginBottom: 16 }}>
              <Search
                placeholder="搜索样品编号或名称"
                allowClear
                style={{ width: 300 }}
              />
              <Select
                placeholder="样品类型"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="成品">成品</Option>
                <Option value="原料">原料</Option>
                <Option value="半成品">半成品</Option>
                <Option value="包材">包材</Option>
                <Option value="香精">香精</Option>
                <Option value="滤棒">滤棒</Option>
                <Option value="环境">环境</Option>
                <Option value="废料">废料</Option>
              </Select>
              <Select
                placeholder="状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="pending">待检测</Option>
                <Option value="testing">检测中</Option>
                <Option value="completed">已完成</Option>
                <Option value="rejected">已拒绝</Option>
              </Select>
              <RangePicker placeholder={['开始日期', '结束日期']} />
              <Button type="primary" icon={<PlusOutlined />} onClick={() => openSampleModal('add')}>
                新增样品
              </Button>
            </Space>

            <Table
              columns={sampleColumns}
              dataSource={sampleList}
              rowKey="id"
              pagination={{
                total: sampleList.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="检测任务" key="tasks" icon={<FileTextOutlined />}>
          <Card>
            <Space style={{ marginBottom: 16 }}>
              <Search
                placeholder="搜索任务编号或检测项目"
                allowClear
                style={{ width: 300 }}
              />
              <Select
                placeholder="状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="pending">待开始</Option>
                <Option value="in_progress">进行中</Option>
                <Option value="completed">已完成</Option>
              </Select>
              <Select
                placeholder="操作员"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="李检测">李检测</Option>
                <Option value="赵检测">赵检测</Option>
                <Option value="周检测">周检测</Option>
                <Option value="孙检测">孙检测</Option>
              </Select>
              <Button type="primary" icon={<PlusOutlined />}>
                新建任务
              </Button>
            </Space>

            <Table
              columns={taskColumns}
              dataSource={testTasks}
              rowKey="id"
              pagination={{
                total: testTasks.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="仪器设备" key="instruments" icon={<SettingOutlined />}>
          <Card>
            <Space style={{ marginBottom: 16 }}>
              <Search
                placeholder="搜索设备名称或型号"
                allowClear
                style={{ width: 300 }}
              />
              <Select
                placeholder="状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="normal">正常</Option>
                <Option value="maintenance">维护中</Option>
                <Option value="calibration">校准中</Option>
                <Option value="fault">故障</Option>
              </Select>
              <Select
                placeholder="位置"
                style={{ width: 150 }}
                allowClear
              >
                <Option value="理化检测室A">理化检测室A</Option>
                <Option value="理化检测室B">理化检测室B</Option>
                <Option value="物理检测室">物理检测室</Option>
                <Option value="微生物检测室">微生物检测室</Option>
                <Option value="感官评价中心">感官评价中心</Option>
              </Select>
              <Button type="primary" icon={<PlusOutlined />}>
                新增设备
              </Button>
            </Space>

            <Table
              columns={instrumentColumns}
              dataSource={instruments}
              rowKey="id"
              pagination={{
                total: instruments.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="体系文件" key="documents" icon={<FileTextOutlined />}>
          <Card>
            <Space style={{ marginBottom: 16 }}>
              <Search
                placeholder="搜索文件标题"
                allowClear
                style={{ width: 300 }}
              />
              <Select
                placeholder="文件类型"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="管理文件">管理文件</Option>
                <Option value="技术文件">技术文件</Option>
                <Option value="操作文件">操作文件</Option>
                <Option value="程序文件">程序文件</Option>
                <Option value="制度文件">制度文件</Option>
                <Option value="应急文件">应急文件</Option>
              </Select>
              <Select
                placeholder="状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="draft">草稿</Option>
                <Option value="review">审核中</Option>
                <Option value="effective">生效</Option>
                <Option value="obsolete">作废</Option>
              </Select>
              <Upload>
                <Button icon={<UploadOutlined />}>
                  上传文件
                </Button>
              </Upload>
            </Space>

            <Table
              columns={documentColumns}
              dataSource={documents}
              rowKey="id"
              pagination={{
                total: documents.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* 模态框 */}
      <Modal
        title={modalType === 'add' ? '新增样品' : modalType === 'edit' ? '编辑样品' : '样品详情'}
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
          <Button key="submit" type="primary" onClick={modalType === 'add' ? handleCreateSample : handleUpdateSample}>
            {modalType === 'add' ? '创建' : '保存'}
          </Button>
        ]}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="样品名称" name="sampleName" rules={[{ required: true, message: '请输入样品名称' }]}>
                <Input placeholder="请输入样品名称" disabled={modalType === 'view'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="样品类型" name="sampleType" rules={[{ required: true, message: '请选择样品类型' }]}>
                <Select placeholder="请选择样品类型" disabled={modalType === 'view'}>
                  <Option value="成品">成品</Option>
                  <Option value="原料">原料</Option>
                  <Option value="半成品">半成品</Option>
                  <Option value="包材">包材</Option>
                  <Option value="香精">香精</Option>
                  <Option value="滤棒">滤棒</Option>
                  <Option value="环境">环境</Option>
                  <Option value="废料">废料</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="样品来源" name="source">
                <Input placeholder="请输入样品来源" disabled={modalType === 'view'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="优先级" name="priority">
                <Select placeholder="请选择优先级" disabled={modalType === 'view'}>
                  <Option value="high">高</Option>
                  <Option value="normal">正常</Option>
                  <Option value="low">低</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="提交人" name="submitter">
                <Input placeholder="请输入提交人" disabled={modalType === 'view'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="分配给" name="assignedTo">
                <Select placeholder="请选择检测员" disabled={modalType === 'view'}>
                  <Option value="李检测">李检测</Option>
                  <Option value="赵检测">赵检测</Option>
                  <Option value="孙检测">孙检测</Option>
                  <Option value="周检测">周检测</Option>
                  <Option value="吴检测">吴检测</Option>
                  <Option value="钱检测">钱检测</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="预期完成时间" name="expectedDate">
                <Input placeholder="YYYY-MM-DD" disabled={modalType === 'view'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="状态" name="status">
                <Select placeholder="请选择状态" disabled={modalType === 'view'}>
                  <Option value="pending">待检测</Option>
                  <Option value="testing">检测中</Option>
                  <Option value="completed">已完成</Option>
                  <Option value="rejected">已拒绝</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="检测项目" name="testItems">
            <Select mode="multiple" placeholder="请选择检测项目" disabled={modalType === 'view'}>
              <Option value="焦油量">焦油量</Option>
              <Option value="烟碱量">烟碱量</Option>
              <Option value="一氧化碳">一氧化碳</Option>
              <Option value="含水率">含水率</Option>
              <Option value="水分">水分</Option>
              <Option value="杂质">杂质</Option>
              <Option value="色泽">色泽</Option>
              <Option value="香气">香气</Option>
            </Select>
          </Form.Item>

          <Form.Item label="备注" name="notes">
            <Input.TextArea rows={3} placeholder="请输入备注" disabled={modalType === 'view'} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default LIMS
