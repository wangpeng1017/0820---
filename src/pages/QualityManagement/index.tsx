import React, { useState } from 'react'
import { Card, Table, Button, Input, Select, Space, Tag, Modal, Row, Col, Statistic, Progress } from 'antd'
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  EyeOutlined,
  FileTextOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import type { QualityTest, TestResult } from '../../types'

const { Search } = Input
const { Option } = Select

const QualityManagement: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)

  // 模拟质量检测数据
  const qualityTests: QualityTest[] = [
    {
      id: 'QT001',
      sampleId: 'S2024031501',
      testType: '成品检验',
      testDate: '2024-03-15',
      tester: '王检测',
      status: 'completed',
      results: [
        { parameter: '焦油量', value: 8.2, unit: 'mg', standard: '≤8.5mg', result: 'pass' },
        { parameter: '烟碱量', value: 0.85, unit: 'mg', standard: '0.6-1.0mg', result: 'pass' },
        { parameter: '一氧化碳', value: 9.8, unit: 'mg', standard: '≤10mg', result: 'pass' },
        { parameter: '含水率', value: 12.8, unit: '%', standard: '11-13%', result: 'pass' },
        { parameter: '外观质量', value: '合格', unit: '', standard: '合格', result: 'pass' }
      ],
      conclusion: '该批次产品各项指标均符合标准要求，质量合格。',
      notes: '建议继续保持当前工艺参数'
    },
    {
      id: 'QT002',
      sampleId: 'S2024031502',
      testType: '原料检验',
      testDate: '2024-03-15',
      tester: '李检测',
      status: 'testing',
      results: [
        { parameter: '水分', value: 14.2, unit: '%', standard: '≤13%', result: 'warning' },
        { parameter: '杂质', value: 0.8, unit: '%', standard: '≤1%', result: 'pass' },
        { parameter: '色泽', value: '良好', unit: '', standard: '良好', result: 'pass' }
      ],
      conclusion: '水分含量略高，需要进一步干燥处理。',
      notes: '建议延长干燥时间2小时'
    }
  ]

  // 统计数据
  const stats = {
    totalTests: 156,
    passedTests: 142,
    failedTests: 8,
    pendingTests: 6,
    passRate: 91.0
  }

  const columns = [
    {
      title: '检测编号',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <a>{text}</a>
    },
    {
      title: '样品编号',
      dataIndex: 'sampleId',
      key: 'sampleId'
    },
    {
      title: '检测类型',
      dataIndex: 'testType',
      key: 'testType',
      render: (type: string) => <Tag color="blue">{type}</Tag>
    },
    {
      title: '检测日期',
      dataIndex: 'testDate',
      key: 'testDate'
    },
    {
      title: '检测员',
      dataIndex: 'tester',
      key: 'tester'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const configs = {
          pending: { color: 'orange', text: '待检测', icon: <WarningOutlined /> },
          testing: { color: 'blue', text: '检测中', icon: <SearchOutlined /> },
          completed: { color: 'green', text: '已完成', icon: <CheckCircleOutlined /> },
          failed: { color: 'red', text: '检测失败', icon: <CloseCircleOutlined /> }
        }
        const config = configs[status as keyof typeof configs]
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        )
      }
    },
    {
      title: '检测结果',
      key: 'result',
      render: (record: QualityTest) => {
        const passCount = record.results.filter(r => r.result === 'pass').length
        const totalCount = record.results.length
        const warningCount = record.results.filter(r => r.result === 'warning').length
        const failCount = record.results.filter(r => r.result === 'fail').length
        
        if (failCount > 0) {
          return <Tag color="red">不合格</Tag>
        } else if (warningCount > 0) {
          return <Tag color="orange">警告</Tag>
        } else if (passCount === totalCount) {
          return <Tag color="green">合格</Tag>
        } else {
          return <Tag color="gray">待完成</Tag>
        }
      }
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => setModalVisible(true)}>
            查看
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small">
            编辑
          </Button>
          <Button type="link" icon={<FileTextOutlined />} size="small">
            报告
          </Button>
        </Space>
      )
    }
  ]

  const resultColumns = [
    {
      title: '检测参数',
      dataIndex: 'parameter',
      key: 'parameter'
    },
    {
      title: '检测值',
      key: 'value',
      render: (record: TestResult) => `${record.value}${record.unit}`
    },
    {
      title: '标准要求',
      dataIndex: 'standard',
      key: 'standard'
    },
    {
      title: '结果',
      dataIndex: 'result',
      key: 'result',
      render: (result: string) => {
        const configs = {
          pass: { color: 'green', text: '合格' },
          warning: { color: 'orange', text: '警告' },
          fail: { color: 'red', text: '不合格' }
        }
        const config = configs[result as keyof typeof configs]
        return <Tag color={config.color}>{config.text}</Tag>
      }
    }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">质量管理</h1>
        <p className="page-description">
          管理产品质量检测、报告生成和质量预警系统
        </p>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总检测数"
              value={stats.totalTests}
              prefix={<SearchOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="合格数"
              value={stats.passedTests}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="不合格数"
              value={stats.failedTests}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="合格率"
              value={stats.passRate}
              suffix="%"
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <Progress percent={stats.passRate} size="small" showInfo={false} />
          </Card>
        </Col>
      </Row>

      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="搜索检测编号或样品编号"
            allowClear
            style={{ width: 300 }}
          />
          <Select
            placeholder="选择状态"
            style={{ width: 120 }}
            allowClear
          >
            <Option value="pending">待检测</Option>
            <Option value="testing">检测中</Option>
            <Option value="completed">已完成</Option>
            <Option value="failed">检测失败</Option>
          </Select>
          <Button type="primary" icon={<PlusOutlined />}>
            新建检测
          </Button>
          <Button icon={<FileTextOutlined />}>
            批量报告
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={qualityTests}
          rowKey="id"
          pagination={{
            total: qualityTests.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
          }}
        />
      </Card>

      {/* 检测详情模态框 */}
      <Modal
        title="检测详情"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            关闭
          </Button>,
          <Button key="report" type="primary" icon={<FileTextOutlined />}>
            生成报告
          </Button>
        ]}
      >
        {qualityTests.length > 0 && (
          <div>
            <Row gutter={16} style={{ marginBottom: 16 }}>
              <Col span={12}>
                <strong>检测编号：</strong>{qualityTests[0].id}
              </Col>
              <Col span={12}>
                <strong>样品编号：</strong>{qualityTests[0].sampleId}
              </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: 16 }}>
              <Col span={12}>
                <strong>检测类型：</strong>{qualityTests[0].testType}
              </Col>
              <Col span={12}>
                <strong>检测员：</strong>{qualityTests[0].tester}
              </Col>
            </Row>
            
            <h4>检测结果</h4>
            <Table
              columns={resultColumns}
              dataSource={qualityTests[0].results}
              pagination={false}
              size="small"
              rowKey="parameter"
              style={{ marginBottom: 16 }}
            />
            
            <h4>结论</h4>
            <p>{qualityTests[0].conclusion}</p>
            
            {qualityTests[0].notes && (
              <>
                <h4>备注</h4>
                <p>{qualityTests[0].notes}</p>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default QualityManagement
