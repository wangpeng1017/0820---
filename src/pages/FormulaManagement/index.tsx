import React, { useState } from 'react'
import { Card, Table, Button, Input, Select, Space, Tag, Modal, Form, Tabs } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  SwapOutlined,
  HistoryOutlined
} from '@ant-design/icons'
import type { Formula } from '../../types'

const { Search } = Input
const { Option } = Select
const { TabPane } = Tabs

const FormulaManagement: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [compareModalVisible, setCompareModalVisible] = useState(false)

  // 模拟配方数据
  const formulas: Formula[] = [
    {
      id: 'F001',
      name: '云南香型配方V3.2',
      version: 'V3.2',
      category: 'tobacco',
      status: 'approved',
      creator: '李配方',
      createTime: '2024-03-15 10:30:00',
      updateTime: '2024-03-20 14:20:00',
      description: '以云南烟叶为主体的香型配方，口感醇和',
      ingredients: [
        { id: '1', name: '云南上部烟叶', type: '主料', ratio: 35, unit: '%', supplier: '云南烟草', grade: 'A级' },
        { id: '2', name: '云南中部烟叶', type: '主料', ratio: 25, unit: '%', supplier: '云南烟草', grade: 'A级' },
        { id: '3', name: '河南烟叶', type: '辅料', ratio: 20, unit: '%', supplier: '河南烟草', grade: 'B级' },
        { id: '4', name: '进口烟叶', type: '调节料', ratio: 15, unit: '%', supplier: '国际贸易', grade: 'A级' },
        { id: '5', name: '其他辅料', type: '辅料', ratio: 5, unit: '%', supplier: '本地供应商', grade: 'C级' }
      ],
      cost: 12.5,
      properties: {
        tar: 8.5,
        nicotine: 0.8,
        co: 9.2,
        moisture: 12.5
      }
    },
    {
      id: 'F002',
      name: '清香型配方V2.1',
      version: 'V2.1',
      category: 'tobacco',
      status: 'testing',
      creator: '王配方',
      createTime: '2024-03-10 09:15:00',
      updateTime: '2024-03-18 16:45:00',
      description: '清香淡雅型配方，适合年轻消费者',
      ingredients: [],
      cost: 10.8,
      properties: {
        tar: 6.5,
        nicotine: 0.6,
        co: 7.8,
        moisture: 13.0
      }
    }
  ]

  const columns = [
    {
      title: '配方编号',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <a>{text}</a>
    },
    {
      title: '配方名称',
      dataIndex: 'name',
      key: 'name'
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
        const colors = { draft: 'orange', testing: 'blue', approved: 'green', archived: 'gray' }
        const names = { draft: '草稿', testing: '测试中', approved: '已批准', archived: '已归档' }
        return <Tag color={colors[status as keyof typeof colors]}>{names[status as keyof typeof names]}</Tag>
      }
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator'
    },
    {
      title: '成本(元/包)',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost: number) => `¥${cost.toFixed(2)}`
    },
    {
      title: '焦油量(mg)',
      key: 'tar',
      render: (record: Formula) => record.properties.tar
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
          <Button type="link" icon={<EditOutlined />} size="small">
            编辑
          </Button>
          <Button type="link" icon={<HistoryOutlined />} size="small">
            版本
          </Button>
        </Space>
      )
    }
  ]

  const ingredientColumns = [
    {
      title: '原料名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag>{type}</Tag>
    },
    {
      title: '配比',
      dataIndex: 'ratio',
      key: 'ratio',
      render: (ratio: number, record: any) => `${ratio}${record.unit}`
    },
    {
      title: '供应商',
      dataIndex: 'supplier',
      key: 'supplier'
    },
    {
      title: '等级',
      dataIndex: 'grade',
      key: 'grade',
      render: (grade: string) => <Tag color="green">{grade}</Tag>
    }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">叶组配方管理</h1>
        <p className="page-description">
          管理叶组配方的创建、编辑、版本控制和历史追溯
        </p>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="搜索配方名称或编号"
            allowClear
            style={{ width: 300 }}
          />
          <Select
            placeholder="选择状态"
            style={{ width: 120 }}
            allowClear
          >
            <Option value="draft">草稿</Option>
            <Option value="testing">测试中</Option>
            <Option value="approved">已批准</Option>
            <Option value="archived">已归档</Option>
          </Select>
          <Button type="primary" icon={<PlusOutlined />}>
            新建配方
          </Button>
          <Button icon={<SwapOutlined />} onClick={() => setCompareModalVisible(true)}>
            版本比对
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={formulas}
          rowKey="id"
          pagination={{
            total: formulas.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
          }}
        />
      </Card>

      {/* 配方详情模态框 */}
      <Modal
        title="配方详情"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={800}
        footer={null}
      >
        <Tabs defaultActiveKey="basic">
          <TabPane tab="基本信息" key="basic">
            <Form layout="vertical">
              <Form.Item label="配方名称">
                <Input value="云南香型配方V3.2" disabled />
              </Form.Item>
              <Form.Item label="配方描述">
                <Input.TextArea value="以云南烟叶为主体的香型配方，口感醇和" disabled />
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="配方组成" key="ingredients">
            <Table
              columns={ingredientColumns}
              dataSource={formulas[0]?.ingredients || []}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </TabPane>
          <TabPane tab="理化指标" key="properties">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>焦油量: {formulas[0]?.properties.tar} mg</div>
              <div>烟碱量: {formulas[0]?.properties.nicotine} mg</div>
              <div>一氧化碳: {formulas[0]?.properties.co} mg</div>
              <div>含水率: {formulas[0]?.properties.moisture}%</div>
            </Space>
          </TabPane>
        </Tabs>
      </Modal>

      {/* 版本比对模态框 */}
      <Modal
        title="配方版本比对"
        open={compareModalVisible}
        onCancel={() => setCompareModalVisible(false)}
        width={1000}
        footer={null}
      >
        <p>配方版本比对功能开发中...</p>
      </Modal>
    </div>
  )
}

export default FormulaManagement
