import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress } from 'antd'
import {
  BarChartOutlined,
  EditOutlined,
  ExperimentOutlined,
  EyeOutlined,
  FileTextOutlined,
  NodeIndexOutlined,
  PlusOutlined,
  SafetyOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'standard': 'standard',
  'inspection': 'inspection',
  'analysis': 'analysis',
  'trace': 'trace',
}

const PATH_TAB_MAP: Record<string, string> = {
  'standard': 'standard',
  'inspection': 'inspection',
  'analysis': 'analysis',
  'trace': 'trace',
}

const QualityManagement: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'standard'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())

  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/quality-management/${path}`)
  }

  // 质量标准数据
  const standardData = [
    { key: '1', code: 'QS001', name: 'GB/T 5606.1-2005 卷烟 第1部分', scope: '卷烟产品', publishDate: '2024-01-15', status: '执行中' },
    { key: '2', code: 'QS002', name: 'YC/T 207-2014 烟用香精', scope: '香精香料', publishDate: '2024-01-20', status: '执行中' },
    { key: '3', code: 'QS003', name: 'GB 5606.2-2005 卷烟 第2部分', scope: '卷烟检测', publishDate: '2024-02-01', status: '执行中' },
    { key: '4', code: 'QS004', name: 'YC/T 31-1996 烟草及烟草制品 水分', scope: '水分检测', publishDate: '2024-02-10', status: '执行中' },
    { key: '5', code: 'QS005', name: 'YC/T 146-2010 烟草及烟草制品 焦油', scope: '焦油检测', publishDate: '2024-02-15', status: '执行中' },
    { key: '6', code: 'QS006', name: 'GB/T 19609-2004 卷烟包装', scope: '包装材料', publishDate: '2024-02-20', status: '执行中' },
    { key: '7', code: 'QS007', name: 'YC/T 253-2008 烟用接装纸', scope: '接装纸', publishDate: '2024-02-25', status: '执行中' },
    { key: '8', code: 'QS008', name: 'YC/T 254-2008 烟用卷烟纸', scope: '卷烟纸', publishDate: '2024-03-01', status: '执行中' },
    { key: '9', code: 'QS009', name: 'GB/T 22838.1-2009 卷烟和滤棒物理性能', scope: '物理性能', publishDate: '2024-03-05', status: '执行中' },
    { key: '10', code: 'QS010', name: 'YC/T 142-2010 烟草及烟草制品 总植物碱', scope: '烟碱检测', publishDate: '2024-03-10', status: '执行中' },
    { key: '11', code: 'QS011', name: 'YC/T 161-2002 烟草及烟草制品 氯', scope: '氯含量检测', publishDate: '2024-03-12', status: '修订中' },
    { key: '12', code: 'QS012', name: 'YC/T 244-2008 烟草及烟草制品 钾', scope: '钾含量检测', publishDate: '2024-03-14', status: '执行中' },
    { key: '13', code: 'QS013', name: 'GB/T 23355-2009 卷烟 主流烟气总粒相物', scope: '烟气检测', publishDate: '2024-03-16', status: '执行中' },
    { key: '14', code: 'QS014', name: 'YC/T 377-2010 卷烟 主流烟气中挥发性有机化合物', scope: 'VOC检测', publishDate: '2024-03-18', status: '执行中' },
    { key: '15', code: 'QS015', name: 'GB/T 23356-2009 卷烟 主流烟气中一氧化碳', scope: 'CO检测', publishDate: '2024-03-20', status: '执行中' }
  ]

  // 检测管理数据
  const inspectionData = [
    { key: '1', code: 'INS001', sampleName: '中支卷烟样品A', project: '焦油含量检测', result: '10.2 mg/支', resultStatus: '合格', inspector: '张三', testDate: '2024-03-20' },
    { key: '2', code: 'INS002', sampleName: '烟叶原料批次B', project: '水分含量检测', result: '12.5%', resultStatus: '合格', inspector: '李四', testDate: '2024-03-19' },
    { key: '3', code: 'INS003', sampleName: '香精样品C', project: '香气强度评价', result: '8.5分', resultStatus: '优秀', inspector: '王五', testDate: '2024-03-18' },
    { key: '4', code: 'INS004', sampleName: '卷烟纸样品D', project: '透气度检测', result: '45 CU', resultStatus: '合格', inspector: '赵六', testDate: '2024-03-17' },
    { key: '5', code: 'INS005', sampleName: '成品卷烟E', project: '烟碱含量检测', result: '1.1 mg/支', resultStatus: '合格', inspector: '张三', testDate: '2024-03-16' },
    { key: '6', code: 'INS006', sampleName: '辅材样品F', project: '物理性能检测', result: '符合标准', resultStatus: '合格', inspector: '李四', testDate: '2024-03-15' },
    { key: '7', code: 'INS007', sampleName: '烟叶样品G', project: '总糖含量检测', result: '18.2%', resultStatus: '合格', inspector: '王五', testDate: '2024-03-14' },
    { key: '8', code: 'INS008', sampleName: '香料样品H', project: '纯度检测', result: '99.5%', resultStatus: '优秀', inspector: '赵六', testDate: '2024-03-13' },
    { key: '9', code: 'INS009', sampleName: '包装材料I', project: '密封性检测', result: '无泄漏', resultStatus: '合格', inspector: '张三', testDate: '2024-03-12' },
    { key: '10', code: 'INS010', sampleName: '成品卷烟J', project: 'CO含量检测', result: '12.5 mg/支', resultStatus: '合格', inspector: '李四', testDate: '2024-03-11' },
    { key: '11', code: 'INS011', sampleName: '烟叶样品K', project: '氯含量检测', result: '0.35%', resultStatus: '合格', inspector: '王五', testDate: '2024-03-10' },
    { key: '12', code: 'INS012', sampleName: '香精样品L', project: '稳定性检测', result: '稳定', resultStatus: '合格', inspector: '赵六', testDate: '2024-03-09' },
    { key: '13', code: 'INS013', sampleName: '辅材样品M', project: '拉力检测', result: '45 N', resultStatus: '合格', inspector: '张三', testDate: '2024-03-08' },
    { key: '14', code: 'INS014', sampleName: '成品卷烟N', project: '感官评价', result: '85分', resultStatus: '优秀', inspector: '李四', testDate: '2024-03-07' },
    { key: '15', code: 'INS015', sampleName: '烟叶样品O', project: '钾含量检测', result: '2.8%', resultStatus: '合格', inspector: '王五', testDate: '2024-03-06' }
  ]

  // 质量分析数据
  const analysisData = [
    { key: '1', code: 'ANL001', target: '2024年Q1产品质量', indicator: '合格率', conclusion: '合格率98.5%，超出目标', trend: '上升', analysisDate: '2024-03-20' },
    { key: '2', code: 'ANL002', target: '焦油含量趋势', indicator: '平均焦油量', conclusion: '平均10.8mg/支，稳定', trend: '稳定', analysisDate: '2024-03-18' },
    { key: '3', code: 'ANL003', target: '烟叶质量对比', indicator: '等级分布', conclusion: '一级烟叶占比65%', trend: '上升', analysisDate: '2024-03-16' },
    { key: '4', code: 'ANL004', target: '香精使用效果', indicator: '香气评分', conclusion: '平均8.2分，优秀', trend: '上升', analysisDate: '2024-03-14' },
    { key: '5', code: 'ANL005', target: '包装材料性能', indicator: '密封性', conclusion: '合格率100%', trend: '稳定', analysisDate: '2024-03-12' },
    { key: '6', code: 'ANL006', target: '工艺参数影响', indicator: '质量波动', conclusion: '波动范围±2%，可控', trend: '稳定', analysisDate: '2024-03-10' },
    { key: '7', code: 'ANL007', target: '原料供应商对比', indicator: '质量稳定性', conclusion: '供应商A最稳定', trend: '上升', analysisDate: '2024-03-08' },
    { key: '8', code: 'ANL008', target: '季节性质量变化', indicator: '水分含量', conclusion: '春季水分偏高', trend: '波动', analysisDate: '2024-03-06' },
    { key: '9', code: 'ANL009', target: '新产品质量评估', indicator: '综合评分', conclusion: '达到预期标准', trend: '上升', analysisDate: '2024-03-04' },
    { key: '10', code: 'ANL010', target: '检测设备精度', indicator: '测量误差', conclusion: '误差<1%，精确', trend: '稳定', analysisDate: '2024-03-02' },
    { key: '11', code: 'ANL011', target: '批次间质量差异', indicator: '变异系数', conclusion: 'CV<5%，一致性好', trend: '稳定', analysisDate: '2024-02-28' },
    { key: '12', code: 'ANL012', target: '储存条件影响', indicator: '质量保持率', conclusion: '6个月保持率95%', trend: '稳定', analysisDate: '2024-02-26' },
    { key: '13', code: 'ANL013', target: '工艺改进效果', indicator: '质量提升', conclusion: '提升3个百分点', trend: '上升', analysisDate: '2024-02-24' },
    { key: '14', code: 'ANL014', target: '客户投诉分析', indicator: '投诉率', conclusion: '投诉率0.2%，优秀', trend: '下降', analysisDate: '2024-02-22' },
    { key: '15', code: 'ANL015', target: '年度质量趋势', indicator: '整体质量水平', conclusion: '持续改善，稳中有升', trend: '上升', analysisDate: '2024-02-20' }
  ]

  // 质量追溯数据
  const traceData = [
    { key: '1', code: 'TRC001', batch: 'BT20240320001', node: '原料采购', responsible: '张三', traceTime: '2024-03-20 10:30', status: '已追溯' },
    { key: '2', code: 'TRC002', batch: 'BT20240320001', node: '原料检验', responsible: '李四', traceTime: '2024-03-20 14:20', status: '已追溯' },
    { key: '3', code: 'TRC003', batch: 'BT20240320001', node: '配方调配', responsible: '王五', traceTime: '2024-03-21 09:15', status: '已追溯' },
    { key: '4', code: 'TRC004', batch: 'BT20240320001', node: '工艺加工', responsible: '赵六', traceTime: '2024-03-21 15:40', status: '已追溯' },
    { key: '5', code: 'TRC005', batch: 'BT20240320001', node: '质量检测', responsible: '张三', traceTime: '2024-03-22 10:00', status: '已追溯' },
    { key: '6', code: 'TRC006', batch: 'BT20240319002', node: '原料入库', responsible: '李四', traceTime: '2024-03-19 11:20', status: '已追溯' },
    { key: '7', code: 'TRC007', batch: 'BT20240319002', node: '醇化处理', responsible: '王五', traceTime: '2024-03-19 16:30', status: '已追溯' },
    { key: '8', code: 'TRC008', batch: 'BT20240319002', node: '配方设计', responsible: '赵六', traceTime: '2024-03-20 09:45', status: '已追溯' },
    { key: '9', code: 'TRC009', batch: 'BT20240318003', node: '香精添加', responsible: '张三', traceTime: '2024-03-18 13:15', status: '已追溯' },
    { key: '10', code: 'TRC010', batch: 'BT20240318003', node: '卷制成型', responsible: '李四', traceTime: '2024-03-18 16:50', status: '已追溯' },
    { key: '11', code: 'TRC011', batch: 'BT20240318003', node: '包装入库', responsible: '王五', traceTime: '2024-03-19 10:20', status: '已追溯' },
    { key: '12', code: 'TRC012', batch: 'BT20240317004', node: '出厂检验', responsible: '赵六', traceTime: '2024-03-17 14:30', status: '已追溯' },
    { key: '13', code: 'TRC013', batch: 'BT20240317004', node: '物流配送', responsible: '张三', traceTime: '2024-03-17 17:00', status: '已追溯' },
    { key: '14', code: 'TRC014', batch: 'BT20240316005', node: '市场反馈', responsible: '李四', traceTime: '2024-03-16 11:40', status: '已追溯' },
    { key: '15', code: 'TRC015', batch: 'BT20240316005', node: '质量复核', responsible: '王五', traceTime: '2024-03-16 15:20', status: '已追溯' }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">质量管理</h1>
        <p className="page-description">
          质量标准管理、检测管理、质量分析、质量追溯
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {/* 质量标准 Tab */}
        <TabPane tab="质量标准管理" key="standard" icon={<FileTextOutlined />}>
          <Card
            title="质量标准库"
            extra={<Button type="primary" icon={<PlusOutlined />}>新增标准</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="标准总数" value={15} suffix="项" />
              </Col>
              <Col span={6}>
                <Statistic title="执行中" value={14} suffix="项" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="修订中" value={1} suffix="项" valueStyle={{ color: '#fa8c16' }} />
              </Col>
              <Col span={6}>
                <Statistic title="覆盖率" value={100} suffix="%" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '标准编号', dataIndex: 'code', key: 'code', width: 150 },
                { title: '标准名称', dataIndex: 'name', key: 'name' },
                { title: '适用范围', dataIndex: 'scope', key: 'scope', width: 120 },
                { title: '发布日期', dataIndex: 'publishDate', key: 'publishDate', width: 120 },
                {
                  title: '执行状态',
                  dataIndex: 'status',
                  key: 'status',
                  width: 100,
                  render: (s: string) => (
                    <Tag color={s === '执行中' ? 'green' : 'orange'}>{s}</Tag>
                  )
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
              dataSource={standardData}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        {/* 检测管理 Tab */}
        <TabPane tab="检测管理" key="inspection" icon={<ExperimentOutlined />}>
          <Card
            title="检测记录"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建检测</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="本月检测" value={156} suffix="次" />
              </Col>
              <Col span={6}>
                <Statistic title="合格数" value={154} suffix="次" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="合格率" value={98.7} suffix="%" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="优秀率" value={15.4} suffix="%" valueStyle={{ color: '#1890ff' }} />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '检测编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '样品名称', dataIndex: 'sampleName', key: 'sampleName' },
                { title: '检测项目', dataIndex: 'project', key: 'project', width: 150 },
                { title: '检测结果', dataIndex: 'result', key: 'result', width: 120 },
                {
                  title: '结果判定',
                  dataIndex: 'resultStatus',
                  key: 'resultStatus',
                  width: 100,
                  render: (s: string) => {
                    const colors: Record<string, string> = {
                      '合格': 'success',
                      '优秀': 'processing',
                      '不合格': 'error'
                    }
                    return <Tag color={colors[s] || 'default'}>{s}</Tag>
                  }
                },
                { title: '检测人', dataIndex: 'inspector', key: 'inspector', width: 100 },
                { title: '检测日期', dataIndex: 'testDate', key: 'testDate', width: 120 },
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
              dataSource={inspectionData}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        {/* 质量分析 Tab */}
        <TabPane tab="质量分析" key="analysis" icon={<BarChartOutlined />}>
          <Card
            title="质量分析报告"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建分析</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="分析报告" value={15} suffix="份" />
              </Col>
              <Col span={6}>
                <Statistic title="质量上升" value={8} suffix="项" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="质量稳定" value={6} suffix="项" valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={6}>
                <Statistic title="需改进" value={1} suffix="项" valueStyle={{ color: '#fa8c16' }} />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '分析编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '分析对象', dataIndex: 'target', key: 'target' },
                { title: '分析指标', dataIndex: 'indicator', key: 'indicator', width: 120 },
                { title: '分析结论', dataIndex: 'conclusion', key: 'conclusion' },
                {
                  title: '趋势',
                  dataIndex: 'trend',
                  key: 'trend',
                  width: 100,
                  render: (t: string) => {
                    const colors: Record<string, string> = {
                      '上升': 'success',
                      '稳定': 'processing',
                      '下降': 'warning',
                      '波动': 'default'
                    }
                    return <Tag color={colors[t]}>{t}</Tag>
                  }
                },
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

        {/* 质量追溯 Tab */}
        <TabPane tab="质量追溯" key="trace" icon={<NodeIndexOutlined />}>
          <Card
            title="质量追溯记录"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建追溯</Button>}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic title="追溯批次" value={8} suffix="个" />
              </Col>
              <Col span={6}>
                <Statistic title="追溯节点" value={15} suffix="个" />
              </Col>
              <Col span={6}>
                <Statistic title="追溯完整率" value={100} suffix="%" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={6}>
                <Statistic title="平均响应时间" value={2.5} suffix="小时" />
              </Col>
            </Row>
            <Table
              columns={[
                { title: '追溯编号', dataIndex: 'code', key: 'code', width: 100 },
                { title: '产品批次', dataIndex: 'batch', key: 'batch', width: 150 },
                { title: '追溯节点', dataIndex: 'node', key: 'node', width: 120 },
                { title: '责任人', dataIndex: 'responsible', key: 'responsible', width: 100 },
                { title: '追溯时间', dataIndex: 'traceTime', key: 'traceTime', width: 160 },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  width: 100,
                  render: (s: string) => (
                    <Tag color="success">{s}</Tag>
                  )
                },
                {
                  title: '操作',
                  key: 'action',
                  width: 150,
                  render: () => (
                    <Space>
                      <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                      <Button type="link" size="small" icon={<NodeIndexOutlined />}>追溯链</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={traceData}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default QualityManagement
