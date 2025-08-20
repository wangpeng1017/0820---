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
      ingredients: [
        { id: '1', name: '福建烟叶', type: '主料', ratio: 40, unit: '%', supplier: '福建烟草', grade: 'A级' },
        { id: '2', name: '贵州烟叶', type: '辅料', ratio: 30, unit: '%', supplier: '贵州烟草', grade: 'B级' },
        { id: '3', name: '进口香料烟', type: '调节料', ratio: 20, unit: '%', supplier: '国际贸易', grade: 'A级' },
        { id: '4', name: '天然香精', type: '香料', ratio: 10, unit: '%', supplier: '香精公司', grade: 'A级' }
      ],
      cost: 10.8,
      properties: {
        tar: 6.5,
        nicotine: 0.6,
        co: 7.8,
        moisture: 13.0
      }
    },
    {
      id: 'F003',
      name: '浓香型配方V1.8',
      version: 'V1.8',
      category: 'tobacco',
      status: 'approved',
      creator: '赵配方',
      createTime: '2024-03-05 14:20:00',
      updateTime: '2024-03-25 11:30:00',
      description: '浓郁香型配方，适合成熟消费者',
      ingredients: [
        { id: '1', name: '四川烟叶', type: '主料', ratio: 45, unit: '%', supplier: '四川烟草', grade: 'A级' },
        { id: '2', name: '湖南烟叶', type: '主料', ratio: 25, unit: '%', supplier: '湖南烟草', grade: 'A级' },
        { id: '3', name: '陈化烟叶', type: '调节料', ratio: 20, unit: '%', supplier: '陈化仓库', grade: 'S级' },
        { id: '4', name: '特制香精', type: '香料', ratio: 10, unit: '%', supplier: '专业香精', grade: 'A级' }
      ],
      cost: 15.2,
      properties: {
        tar: 10.2,
        nicotine: 1.1,
        co: 11.5,
        moisture: 12.0
      }
    },
    {
      id: 'F004',
      name: '中式混合配方V2.5',
      version: 'V2.5',
      category: 'tobacco',
      status: 'testing',
      creator: '孙配方',
      createTime: '2024-03-12 16:45:00',
      updateTime: '2024-03-28 09:15:00',
      description: '中式传统混合配方，平衡口感',
      ingredients: [
        { id: '1', name: '河南烟叶', type: '主料', ratio: 30, unit: '%', supplier: '河南烟草', grade: 'A级' },
        { id: '2', name: '山东烟叶', type: '主料', ratio: 25, unit: '%', supplier: '山东烟草', grade: 'B级' },
        { id: '3', name: '东北烟叶', type: '辅料', ratio: 25, unit: '%', supplier: '东北烟草', grade: 'B级' },
        { id: '4', name: '调味香精', type: '香料', ratio: 20, unit: '%', supplier: '调味公司', grade: 'A级' }
      ],
      cost: 11.8,
      properties: {
        tar: 9.0,
        nicotine: 0.9,
        co: 10.1,
        moisture: 12.8
      }
    },
    {
      id: 'F005',
      name: '低焦油健康配方V1.2',
      version: 'V1.2',
      category: 'tobacco',
      status: 'draft',
      creator: '钱配方',
      createTime: '2024-03-20 11:30:00',
      updateTime: '2024-03-30 15:20:00',
      description: '超低焦油健康型配方，符合健康趋势',
      ingredients: [
        { id: '1', name: '特选低焦烟叶', type: '主料', ratio: 50, unit: '%', supplier: '特选供应商', grade: 'S级' },
        { id: '2', name: '有机烟叶', type: '主料', ratio: 30, unit: '%', supplier: '有机农场', grade: 'A级' },
        { id: '3', name: '天然植物纤维', type: '辅料', ratio: 15, unit: '%', supplier: '植物公司', grade: 'A级' },
        { id: '4', name: '天然香料', type: '香料', ratio: 5, unit: '%', supplier: '天然香料', grade: 'S级' }
      ],
      cost: 18.5,
      properties: {
        tar: 4.5,
        nicotine: 0.4,
        co: 5.8,
        moisture: 13.5
      }
    },
    {
      id: 'F006',
      name: '国际混合配方V3.0',
      version: 'V3.0',
      category: 'tobacco',
      status: 'approved',
      creator: '周配方',
      createTime: '2024-02-28 13:15:00',
      updateTime: '2024-03-22 10:45:00',
      description: '国际化混合配方，适合出口产品',
      ingredients: [
        { id: '1', name: '弗吉尼亚烟叶', type: '主料', ratio: 40, unit: '%', supplier: '美国供应商', grade: 'A级' },
        { id: '2', name: '白肋烟', type: '主料', ratio: 30, unit: '%', supplier: '巴西供应商', grade: 'A级' },
        { id: '3', name: '东方烟', type: '调节料', ratio: 20, unit: '%', supplier: '土耳其供应商', grade: 'A级' },
        { id: '4', name: '国际香精', type: '香料', ratio: 10, unit: '%', supplier: '国际香精', grade: 'A级' }
      ],
      cost: 22.3,
      properties: {
        tar: 11.5,
        nicotine: 1.3,
        co: 12.8,
        moisture: 11.5
      }
    },
    {
      id: 'F007',
      name: '薄荷清凉配方V1.6',
      version: 'V1.6',
      category: 'tobacco',
      status: 'testing',
      creator: '吴配方',
      createTime: '2024-03-08 09:30:00',
      updateTime: '2024-03-26 14:50:00',
      description: '薄荷清凉型配方，夏季热销产品',
      ingredients: [
        { id: '1', name: '清香型烟叶', type: '主料', ratio: 45, unit: '%', supplier: '清香供应商', grade: 'A级' },
        { id: '2', name: '薄荷烟叶', type: '主料', ratio: 25, unit: '%', supplier: '薄荷农场', grade: 'A级' },
        { id: '3', name: '薄荷精油', type: '香料', ratio: 20, unit: '%', supplier: '薄荷公司', grade: 'S级' },
        { id: '4', name: '清凉剂', type: '添加剂', ratio: 10, unit: '%', supplier: '添加剂公司', grade: 'A级' }
      ],
      cost: 14.7,
      properties: {
        tar: 7.8,
        nicotine: 0.7,
        co: 8.9,
        moisture: 12.3
      }
    },
    {
      id: 'F008',
      name: '女士专用配方V2.2',
      version: 'V2.2',
      category: 'tobacco',
      status: 'approved',
      creator: '郑配方',
      createTime: '2024-02-15 15:40:00',
      updateTime: '2024-03-18 12:25:00',
      description: '专为女性消费者设计的轻柔配方',
      ingredients: [
        { id: '1', name: '精选细支烟叶', type: '主料', ratio: 50, unit: '%', supplier: '精选供应商', grade: 'S级' },
        { id: '2', name: '花香烟叶', type: '主料', ratio: 25, unit: '%', supplier: '花香农场', grade: 'A级' },
        { id: '3', name: '果香精油', type: '香料', ratio: 15, unit: '%', supplier: '果香公司', grade: 'A级' },
        { id: '4', name: '柔和剂', type: '添加剂', ratio: 10, unit: '%', supplier: '柔和公司', grade: 'A级' }
      ],
      cost: 16.9,
      properties: {
        tar: 5.5,
        nicotine: 0.5,
        co: 6.8,
        moisture: 13.2
      }
    },
    {
      id: 'F009',
      name: '经典复古配方V4.1',
      version: 'V4.1',
      category: 'tobacco',
      status: 'archived',
      creator: '冯配方',
      createTime: '2024-01-20 10:15:00',
      updateTime: '2024-03-12 16:30:00',
      description: '经典复古配方，传承传统工艺',
      ingredients: [
        { id: '1', name: '传统烟叶', type: '主料', ratio: 60, unit: '%', supplier: '传统供应商', grade: 'A级' },
        { id: '2', name: '陈年烟叶', type: '调节料', ratio: 25, unit: '%', supplier: '陈年仓库', grade: 'S级' },
        { id: '3', name: '传统香料', type: '香料', ratio: 15, unit: '%', supplier: '传统香料', grade: 'A级' }
      ],
      cost: 19.8,
      properties: {
        tar: 12.8,
        nicotine: 1.5,
        co: 14.2,
        moisture: 11.8
      }
    },
    {
      id: 'F010',
      name: '创新科技配方V1.0',
      version: 'V1.0',
      category: 'tobacco',
      status: 'draft',
      creator: '韩配方',
      createTime: '2024-03-25 14:20:00',
      updateTime: '2024-03-30 11:45:00',
      description: '采用最新科技的创新配方',
      ingredients: [
        { id: '1', name: '科技改良烟叶', type: '主料', ratio: 40, unit: '%', supplier: '科技公司', grade: 'S级' },
        { id: '2', name: '纳米材料', type: '添加剂', ratio: 30, unit: '%', supplier: '纳米公司', grade: 'S级' },
        { id: '3', name: '生物香料', type: '香料', ratio: 20, unit: '%', supplier: '生物公司', grade: 'A级' },
        { id: '4', name: '功能性添加剂', type: '添加剂', ratio: 10, unit: '%', supplier: '功能公司', grade: 'A级' }
      ],
      cost: 28.5,
      properties: {
        tar: 3.2,
        nicotine: 0.3,
        co: 4.1,
        moisture: 14.0
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
