import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress } from 'antd'
import {
  ExperimentOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  FileTextOutlined,
  ToolOutlined,
  BarChartOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'sample': 'sample',
  'task': 'task',
  'instrument': 'instrument',
  'analysis': 'analysis',
}

const PATH_TAB_MAP: Record<string, string> = {
  'sample': 'sample',
  'task': 'task',
  'instrument': 'instrument',
  'analysis': 'analysis',
}

const LIMS: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'sample'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())

  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/lims/${path}`)
  }

  // 样品管理数据
  const sampleData = [
    { key: '1', code: 'SMP001', name: '中支卷烟样品A', type: '成品', receiveTime: '2024-03-20 09:30', status: '检测中' },
    { key: '2', code: 'SMP002', name: '烟叶原料批次B', type: '原料', receiveTime: '2024-03-20 10:15', status: '待检测' },
    { key: '3', code: 'SMP003', name: '香精样品C', type: '辅料', receiveTime: '2024-03-20 11:00', status: '已完成' },
    { key: '4', code: 'SMP004', name: '卷烟纸样品D', type: '包材', receiveTime: '2024-03-20 13:45', status: '检测中' },
    { key: '5', code: 'SMP005', name: '成品卷烟E', type: '成品', receiveTime: '2024-03-20 14:20', status: '已完成' },
    { key: '6', code: 'SMP006', name: '辅材样品F', type: '辅料', receiveTime: '2024-03-19 09:00', status: '已完成' },
    { key: '7', code: 'SMP007', name: '烟叶样品G', type: '原料', receiveTime: '2024-03-19 10:30', status: '已完成' },
    { key: '8', code: 'SMP008', name: '香料样品H', type: '辅料', receiveTime: '2024-03-19 11:15', status: '检测中' },
    { key: '9', code: 'SMP009', name: '包装材料I', type: '包材', receiveTime: '2024-03-19 14:00', status: '已完成' },
    { key: '10', code: 'SMP010', name: '成品卷烟J', type: '成品', receiveTime: '2024-03-19 15:30', status: '已完成' },
    { key: '11', code: 'SMP011', name: '烟叶样品K', type: '原料', receiveTime: '2024-03-18 09:45', status: '已完成' },
    { key: '12', code: 'SMP012', name: '香精样品L', type: '辅料', receiveTime: '2024-03-18 10:20', status: '已完成' },
    { key: '13', code: 'SMP013', name: '辅材样品M', type: '辅料', receiveTime: '2024-03-18 13:00', status: '已完成' },
    { key: '14', code: 'SMP014', name: '成品卷烟N', type: '成品', receiveTime: '2024-03-18 14:45', status: '已完成' },
    { key: '15', code: 'SMP015', name: '烟叶样品O', type: '原料', receiveTime: '2024-03-18 16:00', status: '已完成' }
  ]

  // 检测任务数据
  const taskData = [
    { key: '1', code: 'TSK001', project: '焦油含量检测', sampleCount: 5, progress: 85, status: '进行中', estimatedTime: '2024-03-21 18:00' },
    { key: '2', code: 'TSK002', project: '水分含量检测', sampleCount: 8, progress: 100, status: '已完成', estimatedTime: '2024-03-20 17:00' },
    { key: '3', code: 'TSK003', project: '香气强度评价', sampleCount: 3, progress: 60, status: '进行中', estimatedTime: '2024-03-22 16:00' },
    { key: '4', code: 'TSK004', project: '透气度检测', sampleCount: 6, progress: 100, status: '已完成', estimatedTime: '2024-03-20 15:00' },
    { key: '5', code: 'TSK005', project: '烟碱含量检测', sampleCount: 10, progress: 40, status: '进行中', estimatedTime: '2024-03-23 10:00' },
    { key: '6', code: 'TSK006', project: '物理性能检测', sampleCount: 4, progress: 100, status: '已完成', estimatedTime: '2024-03-19 18:00' },
    { key: '7', code: 'TSK007', project: '总糖含量检测', sampleCount: 7, progress: 100, status: '已完成', estimatedTime: '2024-03-19 16:00' },
    { key: '8', code: 'TSK008', project: '纯度检测', sampleCount: 2, progress: 100, status: '已完成', estimatedTime: '2024-03-19 14:00' },
    { key: '9', code: 'TSK009', project: '密封性检测', sampleCount: 5, progress: 100, status: '已完成', estimatedTime: '2024-03-18 17:00' },
    { key: '10', code: 'TSK010', project: 'CO含量检测', sampleCount: 9, progress: 100, status: '已完成', estimatedTime: '2024-03-18 15:00' },
    { key: '11', code: 'TSK011', project: '氯含量检测', sampleCount: 6, progress: 100, status: '已完成', estimatedTime: '2024-03-17 18:00' },
    { key: '12', code: 'TSK012', project: '稳定性检测', sampleCount: 3, progress: 100, status: '已完成', estimatedTime: '2024-03-17 16:00' },
    { key: '13', code: 'TSK013', project: '拉力检测', sampleCount: 8, progress: 100, status: '已完成', estimatedTime: '2024-03-16 17:00' },
    { key: '14', code: 'TSK014', project: '感官评价', sampleCount: 12, progress: 100, status: '已完成', estimatedTime: '2024-03-16 15:00' },
    { key: '15', code: 'TSK015', project: '钾含量检测', sampleCount: 5, progress: 100, status: '已完成', estimatedTime: '2024-03-15 18:00' }
  ]

  // 仪器管理数据
  const instrumentData = [
    { key: '1', code: 'INS001', name: '气相色谱仪', model: 'GC-2030', useStatus: '使用中', nextCalibration: '2024-04-15' },
    { key: '2', code: 'INS002', name: '液相色谱仪', model: 'LC-2040C', useStatus: '空闲', nextCalibration: '2024-04-20' },
    { key: '3', code: 'INS003', name: '质谱仪', model: 'LCMS-8050', useStatus: '使用中', nextCalibration: '2024-04-10' },
    { key: '4', code: 'INS004', name: '原子吸收光谱仪', model: 'AA-7000', useStatus: '空闲', nextCalibration: '2024-04-25' },
    { key: '5', code: 'INS005', name: '紫外分光光度计', model: 'UV-2600', useStatus: '使用中', nextCalibration: '2024-04-18' },
    { key: '6', code: 'INS006', name: '红外光谱仪', model: 'IRTracer-100', useStatus: '空闲', nextCalibration: '2024-04-22' },
    { key: '7', code: 'INS007', name: '电子天平', model: 'AUW220D', useStatus: '使用中', nextCalibration: '2024-04-12' },
    { key: '8', code: 'INS008', name: '水分测定仪', model: 'MOC-120H', useStatus: '空闲', nextCalibration: '2024-04-28' },
    { key: '9', code: 'INS009', name: '透气度测定仪', model: 'ATP-2000', useStatus: '使用中', nextCalibration: '2024-04-16' },
    { key: '10', code: 'INS010', name: '拉力试验机', model: 'UTM-5000', useStatus: '空闲', nextCalibration: '2024-04-30' },
    { key: '11', code: 'INS011', name: '烟气分析仪', model: 'SM450', useStatus: '维护中', nextCalibration: '2024-04-08' },
    { key: '12', code: 'INS012', name: 'pH计', model: 'PHS-3C', useStatus: '空闲', nextCalibration: '2024-05-05' },
    { key: '13', code: 'INS013', name: '恒温恒湿箱', model: 'TH-150', useStatus: '使用中', nextCalibration: '2024-04-14' },
    { key: '14', code: 'INS014', name: '超声波清洗器', model: 'KQ-500DE', useStatus: '空闲', nextCalibration: '2024-05-10' },
    { key: '15', code: 'INS015', name: '离心机', model: 'TGL-16M', useStatus: '空闲', nextCalibration: '2024-05-15' }
  ]

  // 数据分析数据
  const analysisData = [
    { key: '1', code: 'ANL001', type: '趋势分析', source: '焦油检测数据', result: '平均值10.8mg/支，波动±0.5', analyst: '张三', analysisDate: '2024-03-20' },
    { key: '2', code: 'ANL002', type: '对比分析', source: '烟叶质量数据', result: '批次A优于批次B 8%', analyst: '李四', analysisDate: '2024-03-19' },
    { key: '3', code: 'ANL003', type: '相关性分析', source: '香精用量与评分', result: '正相关系数0.85', analyst: '王五', analysisDate: '2024-03-18' },
    { key: '4', code: 'ANL004', type: '质量控制分析', source: '月度检测数据', result: '合格率98.5%，稳定', analyst: '赵六', analysisDate: '2024-03-17' },
    { key: '5', code: 'ANL005', type: '异常检测', source: '水分含量数据', result: '发现3个异常值', analyst: '张三', analysisDate: '2024-03-16' },
    { key: '6', code: 'ANL006', type: '工艺优化分析', source: '工艺参数数据', result: '建议温度提高2℃', analyst: '李四', analysisDate: '2024-03-15' },
    { key: '7', code: 'ANL007', type: '成本效益分析', source: '原料采购数据', result: '供应商A性价比最优', analyst: '王五', analysisDate: '2024-03-14' },
    { key: '8', code: 'ANL008', type: '季节性分析', source: '全年质量数据', result: '春季水分偏高3%', analyst: '赵六', analysisDate: '2024-03-13' },
    { key: '9', code: 'ANL009', type: '批次对比', source: '5个批次数据', result: '批次C质量最稳定', analyst: '张三', analysisDate: '2024-03-12' },
    { key: '10', code: 'ANL010', type: '设备性能分析', source: '仪器检测数据', result: '精度符合要求', analyst: '李四', analysisDate: '2024-03-11' },
    { key: '11', code: 'ANL011', type: '预测分析', source: '历史趋势数据', result: '下月合格率预计98%', analyst: '王五', analysisDate: '2024-03-10' },
    { key: '12', code: 'ANL012', type: '风险评估', source: '质量风险数据', result: '低风险，可控', analyst: '赵六', analysisDate: '2024-03-09' },
    { key: '13', code: 'ANL013', type: '改进效果评估', source: '改进前后数据', result: '质量提升5%', analyst: '张三', analysisDate: '2024-03-08' },
    { key: '14', code: 'ANL014', type: '客户反馈分析', source: '投诉数据', result: '投诉率下降40%', analyst: '李四', analysisDate: '2024-03-07' },
    { key: '15', code: 'ANL015', type: '综合评价', source: '全部检测数据', result: '整体质量优秀', analyst: '王五', analysisDate: '2024-03-06' }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">LIMS实验室信息管理</h1>
        <p className="page-description">
          样品管理、检测任务、仪器管理、数据分析
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {/* 样品管理 Tab */}
        <TabPane tab="样品管理" key="sample" icon={<ExperimentOutlined />}>
          <Card
            title="样品信息"
            extra={<Button type="primary" icon={<PlusOutlined />}>新增样品</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="样品总数" value={156} suffix="个" />
              </Col>
              <Col span={6}>
                <Statistic title="待检测" value={12} suffix="个" valueStyle={{ color: '#fa8c16' }} />
              </Col>
              <Col span={6}>
                <Statistic title="检测中" value={8} suffix="个" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="已完成" value={136} suffix="个" valueStyle={{ color: '#52c41a' }} />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '样品编号', dataIndex: 'code', key: 'code', width: 120 },
                { title: '样品名称', dataIndex: 'name', key: 'name' },
                { title: '样品类型', dataIndex: 'type', key: 'type', width: 100 },
                { title: '接收时间', dataIndex: 'receiveTime', key: 'receiveTime', width: 160 },
                {
                  title: '样品状态',
                  dataIndex: 'status',
                  key: 'status',
                  width: 100,
                  render: (s: string) => {
                    const colors: Record<string, string> = {
                      '待检测': 'warning',
                      '检测中': 'processing',
                      '已完成': 'success'
                    }
                    return <Tag color={colors[s] || 'default'}>{s}</Tag>
                  }
                },
                {
                  title: '操作',
                  key: 'action',
                  width: 180,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={sampleData}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        {/* 检测任务 Tab */}
        <TabPane tab="检测任务" key="task" icon={<CheckCircleOutlined />}>
          <Card
            title="检测任务列表"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建任务</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="任务总数" value={85} suffix="个" />
              </Col>
              <Col span={6}>
                <Statistic title="进行中" value={3} suffix="个" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="已完成" value={82} suffix="个" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="平均完成率" value={96.5} suffix="%" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '任务编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '检测项目', dataIndex: 'project', key: 'project' },
                { title: '样品数量', dataIndex: 'sampleCount', key: 'sampleCount', width: 100 },
                {
                  title: '任务进度',
                  dataIndex: 'progress',
                  key: 'progress',
                  width: 150,
                  render: (p: number) => (
                    <Progress percent={p} size="small" status={p === 100 ? 'success' : 'active'} />
                  )
                },
                {
                  title: '任务状态',
                  dataIndex: 'status',
                  key: 'status',
                  width: 100,
                  render: (s: string) => (
                    <Tag color={s === '已完成' ? 'success' : 'processing'}>{s}</Tag>
                  )
                },
                { title: '预计完成时间', dataIndex: 'estimatedTime', key: 'estimatedTime', width: 160 },
                {
                  title: '操作',
                  key: 'action',
                  width: 150,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<FileTextOutlined />}>报告</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={taskData}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        {/* 仪器管理 Tab */}
        <TabPane tab="仪器管理" key="instrument" icon={<ToolOutlined />}>
          <Card
            title="仪器设备"
            extra={<Button type="primary" icon={<PlusOutlined />}>新增仪器</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="仪器总数" value={15} suffix="台" />
              </Col>
              <Col span={6}>
                <Statistic title="使用中" value={6} suffix="台" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="空闲" value={8} suffix="台" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="维护中" value={1} suffix="台" valueStyle={{ color: '#fa8c16' }} />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '仪器编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '仪器名称', dataIndex: 'name', key: 'name' },
                { title: '仪器型号', dataIndex: 'model', key: 'model', width: 120 },
                {
                  title: '使用状态',
                  dataIndex: 'useStatus',
                  key: 'useStatus',
                  width: 100,
                  render: (s: string) => {
                    const colors: Record<string, string> = {
                      '使用中': 'processing',
                      '空闲': 'success',
                      '维护中': 'warning'
                    }
                    return <Tag color={colors[s] || 'default'}>{s}</Tag>
                  }
                },
                { title: '下次校准日期', dataIndex: 'nextCalibration', key: 'nextCalibration', width: 130 },
                {
                  title: '操作',
                  key: 'action',
                  width: 180,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={instrumentData}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        {/* 数据分析 Tab */}
        <TabPane tab="数据分析" key="analysis" icon={<BarChartOutlined />}>
          <Card
            title="数据分析报告"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建分析</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="分析报告" value={45} suffix="份" />
              </Col>
              <Col span={6}>
                <Statistic title="本月新增" value={15} suffix="份" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="趋势分析" value={12} suffix="份" />
              </Col>
              <Col span={6}>
                <Statistic title="对比分析" value={8} suffix="份" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '分析编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '分析类型', dataIndex: 'type', key: 'type', width: 120 },
                { title: '数据来源', dataIndex: 'source', key: 'source' },
                { title: '分析结果', dataIndex: 'result', key: 'result' },
                { title: '分析人', dataIndex: 'analyst', key: 'analyst', width: 100 },
                { title: '分析日期', dataIndex: 'analysisDate', key: 'analysisDate', width: 120 },
                {
                  title: '操作',
                  key: 'action',
                  width: 150,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<BarChartOutlined />}>图表</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={analysisData}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default LIMS
