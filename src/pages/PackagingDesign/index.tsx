import React, { useState } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Modal, Form, Input, Select, Upload, Alert, Progress, Divider, ColorPicker, Slider, message, Spin, Timeline } from 'antd'
import { generateImageFromText, generateImageFromImage, fileToBase64, downloadBase64Image } from '../../services/volcengineApi'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  PictureOutlined,
  BgColorsOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ThunderboltOutlined,
  UploadOutlined,
  DownloadOutlined,
  CopyOutlined,
  BulbOutlined,
  FileImageOutlined,
  SafetyCertificateOutlined,
  EnvironmentOutlined,
  DollarOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input

// 包装设计接口
interface PackagingDesign {
  id: string
  name: string
  type: 'soft_pack' | 'hard_pack' | 'gift_box' | 'carton'
  status: 'draft' | 'designing' | 'reviewing' | 'approved' | 'rejected'
  designer: string
  createTime: string
  updateTime: string
  targetProduct: string
  designElements: DesignElement[]
  colorScheme: ColorScheme
  materials: PackagingMaterial[]
  complianceCheck: ComplianceResult
  cost: number
  sustainability: SustainabilityScore
}

// 设计元素接口
interface DesignElement {
  id: string
  type: 'logo' | 'text' | 'image' | 'pattern' | 'barcode'
  content: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  style: Record<string, any>
}

// 色彩方案接口
interface ColorScheme {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  theme: string
}

// 包装材料接口
interface PackagingMaterial {
  id: string
  name: string
  type: string
  thickness: number
  weight: number
  cost: number
  sustainability: number
  supplier: string
}

// 合规性检查结果接口
interface ComplianceResult {
  overall: boolean
  checks: Array<{
    item: string
    passed: boolean
    description: string
    regulation: string
  }>
  score: number
}

// 可持续性评分接口
interface SustainabilityScore {
  overall: number
  recyclability: number
  biodegradability: number
  carbonFootprint: number
  materialSource: number
}

const PackagingDesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState('designs')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [aiDesignModalVisible, setAiDesignModalVisible] = useState(false)
  const [complianceModalVisible, setComplianceModalVisible] = useState(false)

  // 火山引擎API相关状态
  const [textToImageLoading, setTextToImageLoading] = useState(false)
  const [imageToImageLoading, setImageToImageLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string>('')
  const [textPrompt, setTextPrompt] = useState('')
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [imagePrompt, setImagePrompt] = useState('')

  // 处理文生图功能
  const handleTextToImage = async () => {
    if (!textPrompt.trim()) {
      message.error('请输入文本描述')
      return
    }

    setTextToImageLoading(true)
    try {
      const base64Image = await generateImageFromText({
        prompt: textPrompt,
        width: 512,
        height: 512,
        scale: 7.5,
        ddim_steps: 25,
        style_term: 'packaging design, product design, commercial design'
      })

      setGeneratedImage(base64Image)
      message.success('图像生成成功！')
    } catch (error) {
      console.error('文生图失败:', error)
      message.error('图像生成失败，请稍后重试')
    } finally {
      setTextToImageLoading(false)
    }
  }

  // 处理图生图功能
  const handleImageToImage = async () => {
    if (!uploadedImage) {
      message.error('请先上传参考图像')
      return
    }

    if (!imagePrompt.trim()) {
      message.error('请输入转换描述')
      return
    }

    setImageToImageLoading(true)
    try {
      const base64Input = await fileToBase64(uploadedImage)
      const base64Image = await generateImageFromImage({
        prompt: imagePrompt,
        image: base64Input,
        width: 512,
        height: 512,
        scale: 7.5,
        ddim_steps: 25,
        strength: 0.8,
        style_term: 'packaging design, product design, commercial design'
      })

      setGeneratedImage(base64Image)
      message.success('图像转换成功！')
    } catch (error) {
      console.error('图生图失败:', error)
      message.error('图像转换失败，请稍后重试')
    } finally {
      setImageToImageLoading(false)
    }
  }

  // 下载生成的图像
  const handleDownloadImage = () => {
    if (generatedImage) {
      downloadBase64Image(generatedImage, `packaging-design-${Date.now()}.png`)
      message.success('图像下载成功！')
    }
  }

  // 模拟包装设计数据
  const packagingDesigns: PackagingDesign[] = [
    {
      id: 'PD001',
      name: '焦甜香系列软包设计',
      type: 'soft_pack',
      status: 'approved',
      designer: '张包装',
      createTime: '2024-03-25 10:30:00',
      updateTime: '2024-03-28 14:20:00',
      targetProduct: '焦甜香系列',
      designElements: [],
      colorScheme: {
        primary: '#D4AF37',
        secondary: '#8B4513',
        accent: '#FF6B35',
        background: '#FFF8DC',
        text: '#2F4F4F',
        theme: '温暖焦糖'
      },
      materials: [],
      complianceCheck: {
        overall: true,
        checks: [],
        score: 95
      },
      cost: 0.45,
      sustainability: {
        overall: 88,
        recyclability: 90,
        biodegradability: 85,
        carbonFootprint: 88,
        materialSource: 90
      }
    },
    {
      id: 'PD002',
      name: '高端系列硬盒设计',
      type: 'hard_pack',
      status: 'reviewing',
      designer: '李包装',
      createTime: '2024-03-28 09:15:00',
      updateTime: '2024-03-30 11:30:00',
      targetProduct: '高端系列',
      designElements: [],
      colorScheme: {
        primary: '#1C1C1C',
        secondary: '#C0C0C0',
        accent: '#FFD700',
        background: '#F5F5F5',
        text: '#000000',
        theme: '经典黑金'
      },
      materials: [],
      complianceCheck: {
        overall: true,
        checks: [],
        score: 92
      },
      cost: 0.68,
      sustainability: {
        overall: 82,
        recyclability: 85,
        biodegradability: 78,
        carbonFootprint: 82,
        materialSource: 85
      }
    },
    {
      id: 'PD003',
      name: '环保系列生态包装',
      type: 'soft_pack',
      status: 'designing',
      designer: '王包装',
      createTime: '2024-03-30 14:45:00',
      updateTime: '2024-03-30 16:20:00',
      targetProduct: '环保系列',
      designElements: [],
      colorScheme: {
        primary: '#228B22',
        secondary: '#90EE90',
        accent: '#32CD32',
        background: '#F0FFF0',
        text: '#006400',
        theme: '自然绿色'
      },
      materials: [],
      complianceCheck: {
        overall: false,
        checks: [],
        score: 78
      },
      cost: 0.52,
      sustainability: {
        overall: 95,
        recyclability: 98,
        biodegradability: 95,
        carbonFootprint: 92,
        materialSource: 95
      }
    },
    {
      id: 'PD004',
      name: '年轻时尚系列包装',
      type: 'soft_pack',
      status: 'draft',
      designer: '赵包装',
      createTime: '2024-03-29 16:30:00',
      updateTime: '2024-03-29 17:45:00',
      targetProduct: '时尚系列',
      designElements: [],
      colorScheme: {
        primary: '#FF1493',
        secondary: '#00CED1',
        accent: '#FFD700',
        background: '#F8F8FF',
        text: '#4B0082',
        theme: '活力彩虹'
      },
      materials: [],
      complianceCheck: {
        overall: true,
        checks: [],
        score: 85
      },
      cost: 0.38,
      sustainability: {
        overall: 75,
        recyclability: 80,
        biodegradability: 70,
        carbonFootprint: 75,
        materialSource: 75
      }
    },
    {
      id: 'PD005',
      name: '限量版礼盒包装',
      type: 'gift_box',
      status: 'approved',
      designer: '孙包装',
      createTime: '2024-03-26 11:20:00',
      updateTime: '2024-03-29 09:30:00',
      targetProduct: '限量版',
      designElements: [],
      colorScheme: {
        primary: '#8B0000',
        secondary: '#FFD700',
        accent: '#DC143C',
        background: '#FFF8DC',
        text: '#000000',
        theme: '尊贵红金'
      },
      materials: [],
      complianceCheck: {
        overall: true,
        checks: [],
        score: 98
      },
      cost: 1.25,
      sustainability: {
        overall: 70,
        recyclability: 75,
        biodegradability: 65,
        carbonFootprint: 70,
        materialSource: 75
      }
    },
    {
      id: 'PD006',
      name: '经济型简约包装',
      type: 'soft_pack',
      status: 'approved',
      designer: '钱包装',
      createTime: '2024-03-27 13:15:00',
      updateTime: '2024-03-28 10:45:00',
      targetProduct: '经济系列',
      designElements: [],
      colorScheme: {
        primary: '#4682B4',
        secondary: '#B0C4DE',
        accent: '#1E90FF',
        background: '#F0F8FF',
        text: '#191970',
        theme: '简约蓝调'
      },
      materials: [],
      complianceCheck: {
        overall: true,
        checks: [],
        score: 88
      },
      cost: 0.28,
      sustainability: {
        overall: 85,
        recyclability: 88,
        biodegradability: 82,
        carbonFootprint: 85,
        materialSource: 85
      }
    },
    {
      id: 'PD007',
      name: '传统文化系列包装',
      type: 'hard_pack',
      status: 'reviewing',
      designer: '周包装',
      createTime: '2024-03-28 15:40:00',
      updateTime: '2024-03-30 12:15:00',
      targetProduct: '文化系列',
      designElements: [],
      colorScheme: {
        primary: '#B8860B',
        secondary: '#CD853F',
        accent: '#DAA520',
        background: '#FDF5E6',
        text: '#8B4513',
        theme: '古典金棕'
      },
      materials: [],
      complianceCheck: {
        overall: true,
        checks: [],
        score: 90
      },
      cost: 0.58,
      sustainability: {
        overall: 80,
        recyclability: 82,
        biodegradability: 78,
        carbonFootprint: 80,
        materialSource: 82
      }
    },
    {
      id: 'PD008',
      name: '女性专属系列包装',
      type: 'soft_pack',
      status: 'designing',
      designer: '吴包装',
      createTime: '2024-03-30 08:25:00',
      updateTime: '2024-03-30 15:50:00',
      targetProduct: '女性系列',
      designElements: [],
      colorScheme: {
        primary: '#FF69B4',
        secondary: '#DDA0DD',
        accent: '#FF1493',
        background: '#FFF0F5',
        text: '#8B008B',
        theme: '优雅粉紫'
      },
      materials: [],
      complianceCheck: {
        overall: false,
        checks: [],
        score: 72
      },
      cost: 0.42,
      sustainability: {
        overall: 78,
        recyclability: 80,
        biodegradability: 75,
        carbonFootprint: 78,
        materialSource: 80
      }
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">包装材料数字化设计</h1>
        <p className="page-description">
          包装创意辅助系统，动态配色，文生图，合规性自动化审查
        </p>
      </div>

      {/* 统计概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="设计方案"
              value={packagingDesigns.length}
              prefix={<PictureOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="已批准方案"
              value={packagingDesigns.filter(d => d.status === 'approved').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="平均成本"
              value={packagingDesigns.reduce((sum, d) => sum + d.cost, 0) / packagingDesigns.length}
              precision={2}
              prefix="¥"
              suffix="/包"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="环保评分"
              value={Math.round(packagingDesigns.reduce((sum, d) => sum + d.sustainability.overall, 0) / packagingDesigns.length)}
              suffix="分"
              prefix={<EnvironmentOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="设计方案" key="designs" icon={<PictureOutlined />}>
          <Card 
            title="包装设计管理" 
            extra={
              <Space>
                <Button 
                  type="primary" 
                  icon={<ThunderboltOutlined />}
                  onClick={() => setAiDesignModalVisible(true)}
                >
                  AI创意设计
                </Button>
                <Button 
                  icon={<SafetyCertificateOutlined />}
                  onClick={() => setComplianceModalVisible(true)}
                >
                  合规检查
                </Button>
                <Button 
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setModalType('create')
                    setSelectedRecord(null)
                    setModalVisible(true)
                  }}
                >
                  新建设计
                </Button>
              </Space>
            }
          >
            <Space style={{ marginBottom: 16 }}>
              <Select
                placeholder="包装类型"
                style={{ width: 150 }}
                allowClear
              >
                <Option value="soft_pack">软包</Option>
                <Option value="hard_pack">硬盒</Option>
                <Option value="gift_box">礼盒</Option>
                <Option value="carton">条盒</Option>
              </Select>
              <Select
                placeholder="设计状态"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="draft">草稿</Option>
                <Option value="designing">设计中</Option>
                <Option value="reviewing">评审中</Option>
                <Option value="approved">已批准</Option>
                <Option value="rejected">已拒绝</Option>
              </Select>
              <Select
                placeholder="目标产品"
                style={{ width: 150 }}
                allowClear
              >
                <Option value="焦甜香系列">焦甜香系列</Option>
                <Option value="高端系列">高端系列</Option>
                <Option value="环保系列">环保系列</Option>
                <Option value="时尚系列">时尚系列</Option>
              </Select>
            </Space>

            <Table
              columns={[
                {
                  title: '设计名称',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => <a>{text}</a>
                },
                {
                  title: '包装类型',
                  dataIndex: 'type',
                  key: 'type',
                  render: (type: string) => {
                    const configs = {
                      soft_pack: { color: 'blue', text: '软包' },
                      hard_pack: { color: 'green', text: '硬盒' },
                      gift_box: { color: 'gold', text: '礼盒' },
                      carton: { color: 'purple', text: '条盒' }
                    }
                    const config = configs[type as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '目标产品',
                  dataIndex: 'targetProduct',
                  key: 'targetProduct',
                  render: (product: string) => <Tag>{product}</Tag>
                },
                {
                  title: '色彩主题',
                  key: 'colorScheme',
                  render: (record: PackagingDesign) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div 
                        style={{ 
                          width: 16, 
                          height: 16, 
                          backgroundColor: record.colorScheme.primary, 
                          marginRight: 8,
                          border: '1px solid #d9d9d9'
                        }} 
                      />
                      <span>{record.colorScheme.theme}</span>
                    </div>
                  )
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => {
                    const configs = {
                      draft: { color: 'default', text: '草稿' },
                      designing: { color: 'blue', text: '设计中' },
                      reviewing: { color: 'orange', text: '评审中' },
                      approved: { color: 'green', text: '已批准' },
                      rejected: { color: 'red', text: '已拒绝' }
                    }
                    const config = configs[status as keyof typeof configs]
                    return <Tag color={config.color}>{config.text}</Tag>
                  }
                },
                {
                  title: '合规评分',
                  key: 'complianceScore',
                  render: (record: PackagingDesign) => (
                    <div>
                      <Progress 
                        percent={record.complianceCheck.score} 
                        size="small" 
                        status={record.complianceCheck.overall ? 'success' : 'exception'}
                      />
                      <span style={{ color: record.complianceCheck.overall ? '#52c41a' : '#f5222d' }}>
                        {record.complianceCheck.score}分
                      </span>
                    </div>
                  )
                },
                {
                  title: '环保评分',
                  key: 'sustainabilityScore',
                  render: (record: PackagingDesign) => (
                    <Progress 
                      percent={record.sustainability.overall} 
                      size="small" 
                      strokeColor="#52c41a"
                    />
                  )
                },
                {
                  title: '成本',
                  dataIndex: 'cost',
                  key: 'cost',
                  render: (cost: number) => `¥${cost.toFixed(2)}/包`
                },
                {
                  title: '设计师',
                  dataIndex: 'designer',
                  key: 'designer'
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (record: PackagingDesign) => (
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
                        disabled={record.status === 'approved'}
                      >
                        编辑
                      </Button>
                      <Button 
                        type="link" 
                        icon={<CopyOutlined />} 
                        size="small"
                      >
                        复制
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={packagingDesigns}
              rowKey="id"
              pagination={{
                total: packagingDesigns.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="创意设计" key="creative" icon={<BulbOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="AI创意助手" extra={<Tag color="purple">AI驱动</Tag>}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert
                    message="AI包装创意系统"
                    description="基于品牌定位和目标群体，智能生成包装创意方案"
                    type="info"
                    showIcon
                  />

                  <Form layout="vertical">
                    <Form.Item label="品牌定位">
                      <Select placeholder="请选择品牌定位">
                        <Option value="luxury">高端奢华</Option>
                        <Option value="young">年轻时尚</Option>
                        <Option value="traditional">传统经典</Option>
                        <Option value="eco">环保健康</Option>
                        <Option value="minimalist">简约现代</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="目标群体">
                      <Select mode="multiple" placeholder="选择目标消费群体">
                        <Option value="young_male">年轻男性</Option>
                        <Option value="young_female">年轻女性</Option>
                        <Option value="middle_age">中年群体</Option>
                        <Option value="business">商务人士</Option>
                        <Option value="artist">艺术群体</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="设计风格">
                      <Select placeholder="请选择设计风格">
                        <Option value="modern">现代简约</Option>
                        <Option value="vintage">复古怀旧</Option>
                        <Option value="artistic">艺术创意</Option>
                        <Option value="natural">自然生态</Option>
                        <Option value="geometric">几何抽象</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="色彩偏好">
                      <Select mode="multiple" placeholder="选择色彩偏好">
                        <Option value="warm">暖色调</Option>
                        <Option value="cool">冷色调</Option>
                        <Option value="neutral">中性色</Option>
                        <Option value="bright">明亮色</Option>
                        <Option value="dark">深色系</Option>
                      </Select>
                    </Form.Item>

                    <Button type="primary" icon={<BulbOutlined />} block>
                      生成创意方案
                    </Button>
                  </Form>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="动态配色系统" extra={<Tag color="orange">实时预览</Tag>}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ marginBottom: 8 }}>主色调</div>
                    <ColorPicker defaultValue="#D4AF37" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>辅助色</div>
                    <ColorPicker defaultValue="#8B4513" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>强调色</div>
                    <ColorPicker defaultValue="#FF6B35" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>背景色</div>
                    <ColorPicker defaultValue="#FFF8DC" />
                  </div>

                  <Divider>色彩和谐度</Divider>
                  <div>
                    <div style={{ marginBottom: 8 }}>对比度</div>
                    <Progress percent={85} size="small" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>饱和度平衡</div>
                    <Progress percent={92} size="small" strokeColor="#faad14" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>视觉舒适度</div>
                    <Progress percent={88} size="small" strokeColor="#722ed1" />
                  </div>

                  <Button type="primary" block>
                    应用配色方案
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>

          <Card title="文生图设计" style={{ marginTop: 16 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={8}>
                <Card size="small" title="文本描述">
                  <Input.TextArea
                    rows={4}
                    value={textPrompt}
                    onChange={(e) => setTextPrompt(e.target.value)}
                    placeholder="请描述您想要的包装设计，例如：一个现代简约风格的软包设计，采用金色和黑色搭配，体现高端品质感..."
                  />
                  <Space style={{ marginTop: 16, width: '100%' }} direction="vertical">
                    <Select placeholder="艺术风格" style={{ width: '100%' }}>
                      <Option value="realistic">写实风格</Option>
                      <Option value="abstract">抽象艺术</Option>
                      <Option value="minimalist">极简主义</Option>
                      <Option value="vintage">复古风格</Option>
                    </Select>
                    <Button
                      type="primary"
                      icon={<FileImageOutlined />}
                      loading={textToImageLoading}
                      onClick={handleTextToImage}
                      block
                    >
                      {textToImageLoading ? '生成中...' : '生成设计图'}
                    </Button>
                  </Space>
                </Card>
              </Col>

              <Col xs={24} lg={16}>
                <Card size="small" title="生成结果">
                  <Spin spinning={textToImageLoading}>
                    <div style={{
                      height: 400,
                      background: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px dashed #d9d9d9',
                      borderRadius: 8,
                      overflow: 'hidden'
                    }}>
                      {generatedImage ? (
                        <img
                          src={`data:image/png;base64,${generatedImage}`}
                          alt="Generated packaging design"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      ) : (
                        <div style={{ textAlign: 'center', color: '#999' }}>
                          <FileImageOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                          <div>AI生成的包装设计图将在此显示</div>
                        </div>
                      )}
                    </div>
                  </Spin>
                  <Space style={{ marginTop: 16 }}>
                    <Button
                      icon={<DownloadOutlined />}
                      onClick={handleDownloadImage}
                      disabled={!generatedImage}
                    >
                      下载图片
                    </Button>
                    <Button icon={<EditOutlined />} disabled={!generatedImage}>
                      编辑优化
                    </Button>
                    <Button
                      icon={<CopyOutlined />}
                      onClick={handleTextToImage}
                      loading={textToImageLoading}
                      disabled={!textPrompt.trim()}
                    >
                      生成变体
                    </Button>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Card>

          <Card title="图生图设计" style={{ marginTop: 16 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={8}>
                <Card size="small" title="参考图像">
                  <Upload
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={(file) => {
                      setUploadedImage(file)
                      return false
                    }}
                  >
                    <div style={{
                      height: 200,
                      border: '2px dashed #d9d9d9',
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      background: uploadedImage ? 'transparent' : '#fafafa'
                    }}>
                      {uploadedImage ? (
                        <img
                          src={URL.createObjectURL(uploadedImage)}
                          alt="Uploaded reference"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      ) : (
                        <div style={{ textAlign: 'center', color: '#999' }}>
                          <PlusOutlined style={{ fontSize: 32, marginBottom: 8 }} />
                          <div>点击上传参考图像</div>
                        </div>
                      )}
                    </div>
                  </Upload>

                  <Input.TextArea
                    rows={3}
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="请描述您希望如何转换这张图像，例如：将这个设计改为金色主题，增加现代感..."
                    style={{ marginTop: 16 }}
                  />

                  <Button
                    type="primary"
                    icon={<FileImageOutlined />}
                    loading={imageToImageLoading}
                    onClick={handleImageToImage}
                    disabled={!uploadedImage || !imagePrompt.trim()}
                    block
                    style={{ marginTop: 16 }}
                  >
                    {imageToImageLoading ? '转换中...' : '开始转换'}
                  </Button>
                </Card>
              </Col>

              <Col xs={24} lg={16}>
                <Card size="small" title="转换结果">
                  <Spin spinning={imageToImageLoading}>
                    <div style={{
                      height: 400,
                      background: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px dashed #d9d9d9',
                      borderRadius: 8,
                      overflow: 'hidden'
                    }}>
                      {generatedImage ? (
                        <img
                          src={`data:image/png;base64,${generatedImage}`}
                          alt="Generated packaging design"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      ) : (
                        <div style={{ textAlign: 'center', color: '#999' }}>
                          <FileImageOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                          <div>AI转换的包装设计图将在此显示</div>
                        </div>
                      )}
                    </div>
                  </Spin>
                  <Space style={{ marginTop: 16 }}>
                    <Button
                      icon={<DownloadOutlined />}
                      onClick={handleDownloadImage}
                      disabled={!generatedImage}
                    >
                      下载图片
                    </Button>
                    <Button icon={<EditOutlined />} disabled={!generatedImage}>
                      编辑优化
                    </Button>
                    <Button
                      icon={<CopyOutlined />}
                      onClick={handleImageToImage}
                      loading={imageToImageLoading}
                      disabled={!uploadedImage || !imagePrompt.trim()}
                    >
                      生成变体
                    </Button>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>

        <TabPane tab="合规审查" key="compliance" icon={<SafetyCertificateOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <Card title="自动化审查" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ marginBottom: 8 }}>法规符合性检查</div>
                    <Progress percent={95} size="small" status="success" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>健康警示要求</div>
                    <Progress percent={100} size="small" status="success" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>标识标注规范</div>
                    <Progress percent={88} size="small" status="active" />
                  </div>
                  <div>
                    <div style={{ marginBottom: 8 }}>色彩使用限制</div>
                    <Progress percent={92} size="small" status="success" />
                  </div>

                  <Alert
                    message="审查通过"
                    description="设计方案符合相关法规要求"
                    type="success"
                    size="small"
                  />

                  <Button type="primary" block>
                    生成合规报告
                  </Button>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="问题检测" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert
                    message="警示信息位置"
                    description="健康警示信息需占包装正面面积的30%以上"
                    type="warning"
                    size="small"
                    showIcon
                  />
                  <Alert
                    message="字体大小"
                    description="产品名称字体大小符合规范要求"
                    type="success"
                    size="small"
                    showIcon
                  />
                  <Alert
                    message="色彩对比度"
                    description="文字与背景对比度需要进一步提升"
                    type="info"
                    size="small"
                    showIcon
                  />
                  <Alert
                    message="必要标识"
                    description="所有必要的法定标识均已包含"
                    type="success"
                    size="small"
                    showIcon
                  />
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="优化建议" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>1. 警示信息优化</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      建议调整警示信息位置至包装正面右下角，确保面积占比达标
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>2. 色彩调整</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      建议将文字颜色调深，提升与背景的对比度至4.5:1以上
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>3. 字体规范</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      产品名称建议使用标准字体，避免过于艺术化的字体设计
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>4. 标识完整性</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      确认所有法定标识清晰可见，位置符合规范要求
                    </div>
                  </div>

                  <Button type="primary" block>
                    一键优化
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>

          <Card title="合规检查历史" style={{ marginTop: 16 }}>
            <Table
              size="small"
              columns={[
                { title: '设计名称', dataIndex: 'designName', key: 'designName' },
                { title: '检查时间', dataIndex: 'checkTime', key: 'checkTime' },
                { title: '检查项目', dataIndex: 'checkItems', key: 'checkItems' },
                { title: '通过项', dataIndex: 'passedItems', key: 'passedItems' },
                { title: '问题项', dataIndex: 'failedItems', key: 'failedItems' },
                { title: '合规评分', dataIndex: 'complianceScore', key: 'complianceScore', render: (score: number) => <Progress percent={score} size="small" /> },
                { title: '状态', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={status === 'passed' ? 'green' : 'orange'}>{status === 'passed' ? '通过' : '待优化'}</Tag> },
                { title: '操作', key: 'action', render: () => <Button type="link" size="small">查看详情</Button> }
              ]}
              dataSource={[
                { designName: '焦甜香系列软包设计', checkTime: '2024-03-30 14:30', checkItems: 12, passedItems: 11, failedItems: 1, complianceScore: 95, status: 'passed' },
                { designName: '高端系列硬盒设计', checkTime: '2024-03-29 10:15', checkItems: 15, passedItems: 14, failedItems: 1, complianceScore: 92, status: 'passed' },
                { designName: '环保系列生态包装', checkTime: '2024-03-28 16:45', checkItems: 10, passedItems: 8, failedItems: 2, complianceScore: 78, status: 'optimization' }
              ]}
              pagination={false}
            />
          </Card>
        </TabPane>

        <TabPane tab="可持续性" key="sustainability" icon={<EnvironmentOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="环保评估" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>可回收性</span>
                      <span>90%</span>
                    </div>
                    <Progress percent={90} size="small" strokeColor="#52c41a" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>生物降解性</span>
                      <span>85%</span>
                    </div>
                    <Progress percent={85} size="small" strokeColor="#73d13d" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>碳足迹</span>
                      <span>88%</span>
                    </div>
                    <Progress percent={88} size="small" strokeColor="#95de64" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>材料来源</span>
                      <span>90%</span>
                    </div>
                    <Progress percent={90} size="small" strokeColor="#b7eb8f" />
                  </div>

                  <Alert
                    message="环保等级: A级"
                    description="包装设计符合绿色环保标准"
                    type="success"
                    size="small"
                  />
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="材料优化建议" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#52c41a' }}>✓ 推荐材料</div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                      • 可降解PLA薄膜<br/>
                      • 再生纸板<br/>
                      • 水性环保油墨<br/>
                      • 植物基胶粘剂
                    </div>
                  </div>

                  <div>
                    <div style={{ fontWeight: 'bold', color: '#faad14' }}>⚠ 需要改进</div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                      • 减少塑料薄膜使用<br/>
                      • 选择FSC认证纸张<br/>
                      • 避免重金属油墨<br/>
                      • 简化包装结构
                    </div>
                  </div>

                  <div>
                    <div style={{ fontWeight: 'bold', color: '#f5222d' }}>✗ 避免使用</div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                      • PVC材料<br/>
                      • 含铅油墨<br/>
                      • 不可回收复合材料<br/>
                      • 过度包装设计
                    </div>
                  </div>

                  <Button type="primary" block>
                    应用环保优化
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* AI创意设计模态框 */}
      <Modal
        title="AI创意设计助手"
        open={aiDesignModalVisible}
        onCancel={() => setAiDesignModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setAiDesignModalVisible(false)}>
            取消
          </Button>,
          <Button key="generate" type="primary" icon={<ThunderboltOutlined />}>
            开始生成
          </Button>
        ]}
      >
        <Alert
          message="AI创意设计功能"
          description="基于深度学习和创意算法，为您生成独特的包装设计方案"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />

        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="产品定位">
                <Select placeholder="请选择产品定位">
                  <Option value="premium">高端奢华</Option>
                  <Option value="mainstream">主流市场</Option>
                  <Option value="budget">经济实惠</Option>
                  <Option value="niche">小众精品</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="包装类型">
                <Select placeholder="请选择包装类型">
                  <Option value="soft_pack">软包</Option>
                  <Option value="hard_pack">硬盒</Option>
                  <Option value="gift_box">礼盒</Option>
                  <Option value="carton">条盒</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="设计要求">
            <TextArea
              rows={3}
              placeholder="请详细描述您的设计要求，包括风格、色彩、元素等..."
            />
          </Form.Item>

          <Form.Item label="参考风格">
            <Select mode="multiple" placeholder="选择参考设计风格">
              <Option value="modern">现代简约</Option>
              <Option value="classic">经典传统</Option>
              <Option value="artistic">艺术创意</Option>
              <Option value="natural">自然生态</Option>
              <Option value="tech">科技未来</Option>
              <Option value="luxury">奢华精致</Option>
            </Select>
          </Form.Item>

          <Form.Item label="创意程度">
            <Slider
              marks={{
                0: '保守',
                50: '平衡',
                100: '激进'
              }}
              defaultValue={50}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default PackagingDesign
