import React from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic } from 'antd'
import { 
  DatabaseOutlined, 
  EnvironmentOutlined, 
  BarChartOutlined,
  WarningOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs

const MaterialManagement: React.FC = () => {
  // 模拟原料数据
  const materials = [
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
      title: '供应商',
      dataIndex: 'supplier',
      key: 'supplier'
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
              value={materials.length}
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="库存预警"
              value={materials.filter(m => m.status === 'warning' || m.status === 'low').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="正常库存"
              value={materials.filter(m => m.status === 'normal').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="inventory">
        <TabPane tab="库存管理" key="inventory" icon={<DatabaseOutlined />}>
          <Card>
            <Table
              columns={columns}
              dataSource={materials}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="基地管理" key="base" icon={<EnvironmentOutlined />}>
          <Card title="烟叶基地单元化管理">
            <p>GIS地图展示和基地档案管理功能开发中...</p>
            <Button type="primary" disabled>
              查看基地地图
            </Button>
          </Card>
        </TabPane>

        <TabPane tab="采购计划" key="procurement" icon={<BarChartOutlined />}>
          <Card title="智能采购计划">
            <p>基于库存和生产计划的智能采购建议功能开发中...</p>
            <Button type="primary" disabled>
              生成采购计划
            </Button>
          </Card>
        </TabPane>

        <TabPane tab="仓储醇化" key="storage">
          <Card title="仓储醇化关联研究">
            <p>仓储环境监控和品质关联分析功能开发中...</p>
            <Button type="primary" disabled>
              查看环境数据
            </Button>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default MaterialManagement
