import React, { useState } from 'react'
import { Card, Tabs, Button, Upload, Progress, Table, Tag, Space, Row, Col, Statistic, Modal, Form, Input, Select, Radio, Checkbox, Rate, Divider } from 'antd'
import {
  UploadOutlined,
  SoundOutlined,
  BarChartOutlined,
  FileTextOutlined,
  UserOutlined,
  ShoppingOutlined,
  TrophyOutlined,
  FormOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  SendOutlined,
  DownloadOutlined,
  CopyOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input

// 问卷相关接口定义
interface QuestionOption {
  id: string
  text: string
  value: string
}

interface Question {
  id: string
  type: 'single' | 'multiple' | 'scale' | 'text'
  title: string
  description?: string
  required: boolean
  options?: QuestionOption[]
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: string[]
}

interface SurveyTemplate {
  id: string
  name: string
  category: string
  description: string
  targetAudience: string
  estimatedTime: number
  questions: Question[]
  creator: string
  createTime: string
  updateTime: string
  status: 'draft' | 'active' | 'archived'
  responseCount: number
}

interface SurveyResponse {
  id: string
  surveyId: string
  respondentId: string
  responses: Record<string, any>
  submitTime: string
  duration: number
  source: string
}

interface SurveyAnalysis {
  surveyId: string
  totalResponses: number
  completionRate: number
  averageDuration: number
  questionAnalysis: Array<{
    questionId: string
    questionTitle: string
    responseCount: number
    results: any
  }>
}

const MarketInsight: React.FC = () => {
  const [activeTab, setActiveTab] = useState('voice-analysis')
  const [surveyModalVisible, setSurveyModalVisible] = useState(false)
  const [surveyModalType, setSurveyModalType] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyTemplate | null>(null)
  const [compareModalVisible, setCompareModalVisible] = useState(false)
  const [analysisModalVisible, setAnalysisModalVisible] = useState(false)

  // 模拟语音识别数据
  const voiceAnalysisData = {
    duration: '45:32',
    accuracy: 96,
    keyWords: ['低焦油', '口感顺滑', '价格适中', '包装精美', '年轻消费者'],
    insights: [
      { type: '品类', content: '低焦油卷烟', confidence: 95 },
      { type: '价位', content: '中高端（15-25元）', confidence: 88 },
      { type: '目标人群', content: '25-35岁白领', confidence: 92 },
      { type: '痛点', content: '现有产品焦油含量偏高', confidence: 90 }
    ]
  }

  // 模拟消费群体数据
  const consumerProfiles = [
    {
      id: '1',
      segment: '都市白领',
      age: '25-35岁',
      gender: '男性为主(65%)',
      income: '8K-15K',
      preferences: ['低焦油', '口感醇和', '包装时尚'],
      score: 92
    },
    {
      id: '2',
      segment: '商务人士',
      age: '35-45岁',
      gender: '男性为主(78%)',
      income: '15K-30K',
      preferences: ['品质稳定', '品牌知名度', '商务场合适用'],
      score: 88
    },
    {
      id: '3',
      segment: '年轻潮流',
      age: '20-28岁',
      gender: '性别均衡',
      income: '5K-10K',
      preferences: ['创新口味', '个性包装', '社交属性'],
      score: 85
    },
    {
      id: '4',
      segment: '成熟消费者',
      age: '45-55岁',
      gender: '男性为主(82%)',
      income: '20K-40K',
      preferences: ['传统口味', '品牌历史', '稳定品质'],
      score: 90
    },
    {
      id: '5',
      segment: '女性消费者',
      age: '25-40岁',
      gender: '女性(100%)',
      income: '6K-18K',
      preferences: ['轻柔口感', '精美包装', '健康理念'],
      score: 78
    },
    {
      id: '6',
      segment: '高端消费者',
      age: '40-60岁',
      gender: '男性为主(75%)',
      income: '30K+',
      preferences: ['奢华品质', '限量版本', '收藏价值'],
      score: 95
    },
    {
      id: '7',
      segment: '学生群体',
      age: '18-25岁',
      gender: '男性为主(60%)',
      income: '2K-6K',
      preferences: ['价格实惠', '口味清淡', '便携包装'],
      score: 72
    },
    {
      id: '8',
      segment: '工薪阶层',
      age: '30-50岁',
      gender: '男性为主(70%)',
      income: '5K-12K',
      preferences: ['性价比高', '口感适中', '经济实用'],
      score: 86
    },
    {
      id: '9',
      segment: '退休人群',
      age: '55-70岁',
      gender: '男性为主(85%)',
      income: '3K-8K',
      preferences: ['传统品牌', '温和口感', '健康考虑'],
      score: 80
    },
    {
      id: '10',
      segment: '新兴中产',
      age: '28-38岁',
      gender: '性别均衡',
      income: '12K-25K',
      preferences: ['品质生活', '品牌调性', '社交需求'],
      score: 89
    }
  ]

  const consumerColumns = [
    {
      title: '消费群体',
      dataIndex: 'segment',
      key: 'segment'
    },
    {
      title: '年龄段',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '收入水平',
      dataIndex: 'income',
      key: 'income'
    },
    {
      title: '偏好特征',
      dataIndex: 'preferences',
      key: 'preferences',
      render: (preferences: string[]) => (
        <Space wrap>
          {preferences.map(pref => (
            <Tag key={pref} color="blue">{pref}</Tag>
          ))}
        </Space>
      )
    },
    {
      title: '匹配度',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => (
        <Progress percent={score} size="small" />
      )
    }
  ]

  // 问卷模板数据
  const surveyTemplates: SurveyTemplate[] = [
    {
      id: 'ST001',
      name: '消费者偏好调研问卷',
      category: '消费者研究',
      description: '了解消费者对卷烟产品的偏好和购买行为',
      targetAudience: '18-65岁吸烟人群',
      estimatedTime: 8,
      questions: [
        {
          id: 'Q001',
          type: 'single',
          title: '您的年龄段是？',
          required: true,
          options: [
            { id: 'O001', text: '18-25岁', value: '18-25' },
            { id: 'O002', text: '26-35岁', value: '26-35' },
            { id: 'O003', text: '36-45岁', value: '36-45' },
            { id: 'O004', text: '46-55岁', value: '46-55' },
            { id: 'O005', text: '56-65岁', value: '56-65' }
          ]
        },
        {
          id: 'Q002',
          type: 'multiple',
          title: '您在选择卷烟时最关注哪些因素？（可多选）',
          required: true,
          options: [
            { id: 'O006', text: '口感', value: 'taste' },
            { id: 'O007', text: '价格', value: 'price' },
            { id: 'O008', text: '品牌', value: 'brand' },
            { id: 'O009', text: '包装', value: 'package' },
            { id: 'O010', text: '焦油含量', value: 'tar' }
          ]
        },
        {
          id: 'Q003',
          type: 'scale',
          title: '您对当前使用的卷烟产品满意度如何？',
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: ['非常不满意', '不满意', '一般', '满意', '非常满意']
        }
      ],
      creator: '市场部',
      createTime: '2024-03-15 10:30:00',
      updateTime: '2024-03-20 14:20:00',
      status: 'active',
      responseCount: 1256
    },
    {
      id: 'ST002',
      name: '品牌认知度调查',
      category: '品牌研究',
      description: '评估品牌在目标市场中的认知度和形象',
      targetAudience: '目标消费群体',
      estimatedTime: 6,
      questions: [
        {
          id: 'Q004',
          type: 'single',
          title: '您是否听说过我们的品牌？',
          required: true,
          options: [
            { id: 'O011', text: '是', value: 'yes' },
            { id: 'O012', text: '否', value: 'no' }
          ]
        },
        {
          id: 'Q005',
          type: 'scale',
          title: '您对我们品牌的整体印象如何？',
          required: true,
          scaleMin: 1,
          scaleMax: 10,
          scaleLabels: ['非常差', '非常好']
        }
      ],
      creator: '品牌部',
      createTime: '2024-03-18 09:15:00',
      updateTime: '2024-03-25 16:45:00',
      status: 'active',
      responseCount: 892
    },
    {
      id: 'ST003',
      name: '产品满意度评估',
      category: '产品研究',
      description: '收集用户对产品各方面的满意度反馈',
      targetAudience: '现有用户',
      estimatedTime: 10,
      questions: [
        {
          id: 'Q006',
          type: 'scale',
          title: '您对产品口感的满意度？',
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: ['很差', '差', '一般', '好', '很好']
        },
        {
          id: 'Q007',
          type: 'text',
          title: '您对产品有什么改进建议？',
          required: false
        }
      ],
      creator: '产品部',
      createTime: '2024-03-20 14:30:00',
      updateTime: '2024-03-28 11:20:00',
      status: 'active',
      responseCount: 567
    },
    {
      id: 'ST004',
      name: '新产品概念测试',
      category: '产品研究',
      description: '测试新产品概念在市场中的接受度',
      targetAudience: '潜在消费者',
      estimatedTime: 12,
      questions: [
        {
          id: 'Q008',
          type: 'single',
          title: '您对这个新产品概念的第一印象是？',
          required: true,
          options: [
            { id: 'O013', text: '非常感兴趣', value: 'very_interested' },
            { id: 'O014', text: '有些感兴趣', value: 'somewhat_interested' },
            { id: 'O015', text: '不太感兴趣', value: 'not_interested' },
            { id: 'O016', text: '完全不感兴趣', value: 'not_at_all' }
          ]
        }
      ],
      creator: '研发部',
      createTime: '2024-03-22 16:20:00',
      updateTime: '2024-03-30 09:15:00',
      status: 'draft',
      responseCount: 0
    },
    {
      id: 'ST005',
      name: '价格敏感度分析',
      category: '定价研究',
      description: '分析消费者对不同价格点的接受度',
      targetAudience: '目标消费群体',
      estimatedTime: 7,
      questions: [
        {
          id: 'Q009',
          type: 'single',
          title: '您认为合理的价格区间是？',
          required: true,
          options: [
            { id: 'O017', text: '10-15元', value: '10-15' },
            { id: 'O018', text: '16-20元', value: '16-20' },
            { id: 'O019', text: '21-25元', value: '21-25' },
            { id: 'O020', text: '26-30元', value: '26-30' }
          ]
        }
      ],
      creator: '市场部',
      createTime: '2024-03-25 13:45:00',
      updateTime: '2024-03-28 10:30:00',
      status: 'active',
      responseCount: 734
    },
    {
      id: 'ST006',
      name: '渠道偏好调研',
      category: '渠道研究',
      description: '了解消费者的购买渠道偏好',
      targetAudience: '所有消费者',
      estimatedTime: 5,
      questions: [
        {
          id: 'Q010',
          type: 'multiple',
          title: '您通常在哪里购买卷烟？（可多选）',
          required: true,
          options: [
            { id: 'O021', text: '便利店', value: 'convenience' },
            { id: 'O022', text: '超市', value: 'supermarket' },
            { id: 'O023', text: '专卖店', value: 'specialty' },
            { id: 'O024', text: '在线平台', value: 'online' }
          ]
        }
      ],
      creator: '销售部',
      createTime: '2024-03-28 09:20:00',
      updateTime: '2024-03-30 14:50:00',
      status: 'active',
      responseCount: 445
    },
    {
      id: 'ST007',
      name: '广告效果评估',
      category: '营销研究',
      description: '评估广告活动的效果和影响',
      targetAudience: '目标受众',
      estimatedTime: 9,
      questions: [
        {
          id: 'Q011',
          type: 'single',
          title: '您是否看过我们最近的广告？',
          required: true,
          options: [
            { id: 'O025', text: '是', value: 'yes' },
            { id: 'O026', text: '否', value: 'no' }
          ]
        },
        {
          id: 'Q012',
          type: 'scale',
          title: '广告对您的购买意愿有多大影响？',
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: ['无影响', '影响很大']
        }
      ],
      creator: '营销部',
      createTime: '2024-03-12 11:30:00',
      updateTime: '2024-03-26 15:45:00',
      status: 'active',
      responseCount: 623
    },
    {
      id: 'ST008',
      name: '竞品对比分析',
      category: '竞争研究',
      description: '了解消费者对竞品的认知和偏好',
      targetAudience: '市场用户',
      estimatedTime: 11,
      questions: [
        {
          id: 'Q013',
          type: 'multiple',
          title: '您还使用过哪些品牌的产品？',
          required: true,
          options: [
            { id: 'O027', text: '品牌A', value: 'brand_a' },
            { id: 'O028', text: '品牌B', value: 'brand_b' },
            { id: 'O029', text: '品牌C', value: 'brand_c' }
          ]
        }
      ],
      creator: '战略部',
      createTime: '2024-03-10 15:20:00',
      updateTime: '2024-03-24 12:30:00',
      status: 'active',
      responseCount: 389
    },
    {
      id: 'ST009',
      name: '用户体验调研',
      category: '体验研究',
      description: '深入了解用户的使用体验和感受',
      targetAudience: '活跃用户',
      estimatedTime: 15,
      questions: [
        {
          id: 'Q014',
          type: 'text',
          title: '请描述您使用产品时的整体感受',
          required: true
        },
        {
          id: 'Q015',
          type: 'scale',
          title: '您向朋友推荐我们产品的可能性有多大？',
          required: true,
          scaleMin: 0,
          scaleMax: 10,
          scaleLabels: ['完全不可能', '非常可能']
        }
      ],
      creator: '用户研究',
      createTime: '2024-03-08 08:45:00',
      updateTime: '2024-03-22 17:20:00',
      status: 'active',
      responseCount: 234
    },
    {
      id: 'ST010',
      name: '季节性需求调研',
      category: '需求研究',
      description: '分析不同季节的消费需求变化',
      targetAudience: '全体消费者',
      estimatedTime: 6,
      questions: [
        {
          id: 'Q016',
          type: 'single',
          title: '您在哪个季节的消费量最大？',
          required: true,
          options: [
            { id: 'O030', text: '春季', value: 'spring' },
            { id: 'O031', text: '夏季', value: 'summer' },
            { id: 'O032', text: '秋季', value: 'autumn' },
            { id: 'O033', text: '冬季', value: 'winter' }
          ]
        }
      ],
      creator: '市场部',
      createTime: '2024-03-05 14:15:00',
      updateTime: '2024-03-20 09:30:00',
      status: 'archived',
      responseCount: 1123
    }
  ]

  // 将静态数据转换为 State
  const [surveys, setSurveys] = useState<SurveyTemplate[]>(surveyTemplates)
  const [form] = Form.useForm()

  // CRUD 操作处理函数
  const handleCreateSurvey = (values: any) => {
    const newSurvey: SurveyTemplate = {
      id: `ST${(surveys.length + 1).toString().padStart(3, '0')}`,
      name: values.name,
      category: values.category,
      description: values.description,
      targetAudience: values.targetAudience,
      estimatedTime: values.estimatedTime,
      questions: [], // 简化处理，初始为空
      creator: '当前用户',
      createTime: new Date().toLocaleString(),
      updateTime: new Date().toLocaleString(),
      status: 'draft',
      responseCount: 0
    }
    setSurveys([newSurvey, ...surveys])
    setSurveyModalVisible(false)
    form.resetFields()
    Modal.success({ title: '创建成功', content: '新问卷已创建，状态为草稿。' })
  }

  const handleUpdateSurvey = (values: any) => {
    if (!selectedSurvey) return
    const updatedSurveys = surveys.map(s =>
      s.id === selectedSurvey.id
        ? { ...s, ...values, updateTime: new Date().toLocaleString() }
        : s
    )
    setSurveys(updatedSurveys)
    setSurveyModalVisible(false)
    setSelectedSurvey(null)
    form.resetFields()
    Modal.success({ title: '更新成功', content: '问卷信息已更新。' })
  }

  const handleDeleteSurvey = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '删除后无法恢复，确定要删除这个问卷吗？',
      onOk: () => {
        setSurveys(surveys.filter(s => s.id !== id))
        Modal.success({ title: '删除成功', content: '问卷已删除。' })
      }
    })
  }

  const openCreateModal = () => {
    setSurveyModalType('create')
    setSelectedSurvey(null)
    form.resetFields()
    setSurveyModalVisible(true)
  }

  const openEditModal = (record: SurveyTemplate) => {
    setSurveyModalType('edit')
    setSelectedSurvey(record)
    form.setFieldsValue(record)
    setSurveyModalVisible(true)
  }

  // 渲染问卷管理 Tab 内容
  const renderSurveyManagement = () => (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
            新建问卷
          </Button>
          <Button icon={<DownloadOutlined />}>导出数据</Button>
        </Space>
        <Input.Search placeholder="搜索问卷名称" style={{ width: 200 }} />
      </div>

      <Table
        columns={[
          {
            title: '问卷编号',
            dataIndex: 'id',
            key: 'id',
            width: 100
          },
          {
            title: '问卷名称',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>
          },
          {
            title: '分类',
            dataIndex: 'category',
            key: 'category',
            width: 120,
            render: (text) => <Tag color="blue">{text}</Tag>
          },
          {
            title: '目标人群',
            dataIndex: 'targetAudience',
            key: 'targetAudience',
            ellipsis: true
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status) => {
              const colors = {
                active: 'green',
                draft: 'orange',
                archived: 'default'
              }
              const labels = {
                active: '进行中',
                draft: '草稿',
                archived: '已归档'
              }
              return <Tag color={colors[status as keyof typeof colors]}>{labels[status as keyof typeof labels]}</Tag>
            }
          },
          {
            title: '回收量',
            dataIndex: 'responseCount',
            key: 'responseCount',
            width: 100,
            sorter: (a, b) => a.responseCount - b.responseCount
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 180,
            sorter: (a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime()
          },
          {
            title: '操作',
            key: 'action',
            width: 250,
            render: (_, record) => (
              <Space size="middle">
                <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => setAnalysisModalVisible(true)}>
                  分析
                </Button>
                <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEditModal(record)}>
                  编辑
                </Button>
                <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDeleteSurvey(record.id)}>
                  删除
                </Button>
              </Space>
            )
          }
        ]}
        dataSource={surveys}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      {/* 创建/编辑问卷模态框 */}
      <Modal
        title={surveyModalType === 'create' ? '新建问卷' : '编辑问卷'}
        visible={surveyModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setSurveyModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={surveyModalType === 'create' ? handleCreateSurvey : handleUpdateSurvey}
        >
          <Form.Item
            name="name"
            label="问卷名称"
            rules={[{ required: true, message: '请输入问卷名称' }]}
          >
            <Input placeholder="请输入问卷名称" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="分类"
                rules={[{ required: true, message: '请选择分类' }]}
              >
                <Select placeholder="请选择分类">
                  <Option value="消费者研究">消费者研究</Option>
                  <Option value="品牌研究">品牌研究</Option>
                  <Option value="产品研究">产品研究</Option>
                  <Option value="定价研究">定价研究</Option>
                  <Option value="渠道研究">渠道研究</Option>
                  <Option value="营销研究">营销研究</Option>
                  <Option value="竞争研究">竞争研究</Option>
                  <Option value="体验研究">体验研究</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="状态"
                initialValue="draft"
              >
                <Select>
                  <Option value="draft">草稿</Option>
                  <Option value="active">进行中</Option>
                  <Option value="archived">已归档</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="targetAudience"
            label="目标人群"
            rules={[{ required: true, message: '请输入目标人群' }]}
          >
            <Input placeholder="例如：18-35岁吸烟人群" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="estimatedTime"
                label="预计耗时(分钟)"
                initialValue={5}
                rules={[{ required: true, message: '请输入预计耗时' }]}
              >
                <Input type="number" min={1} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="问卷说明"
          >
            <TextArea rows={4} placeholder="请输入问卷说明" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 分析模态框 (简单占位) */}
      <Modal
        title="问卷分析报告"
        visible={analysisModalVisible}
        onCancel={() => setAnalysisModalVisible(false)}
        footer={null}
        width={800}
      >
        <Alert message="分析报告展示区域（图表已集成在概览页）" type="info" showIcon />
        <div style={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', marginTop: 16 }}>
          <BarChartOutlined style={{ fontSize: 64, color: '#ccc' }} />
        </div>
      </Modal>
    </div>
  )

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">市场洞察</h1>
        <p className="page-description">
          通过AI技术分析消费者需求，生成市场洞察报告和消费群体画像
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="语音识别分析" key="voice-analysis" icon={<SoundOutlined />}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="语音文件上传">
                <Upload.Dragger
                  name="audio"
                  multiple={false}
                  accept="audio/*"
                  beforeUpload={() => false}
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">点击或拖拽音频文件到此区域上传</p>
                  <p className="ant-upload-hint">
                    支持MP3、WAV、M4A格式，文件大小不超过100MB，时长不超过60分钟
                  </p>
                </Upload.Dragger>

                <div style={{ marginTop: 16 }}>
                  <Button type="primary" icon={<SoundOutlined />} block>
                    开始语音识别分析
                  </Button>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="识别结果">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <strong>识别时长：</strong>{voiceAnalysisData.duration}
                  </div>
                  <div>
                    <strong>识别准确率：</strong>
                    <Progress
                      percent={voiceAnalysisData.accuracy}
                      size="small"
                      style={{ width: 200, marginLeft: 8 }}
                    />
                  </div>
                  <div>
                    <strong>关键词提取：</strong>
                    <div style={{ marginTop: 8 }}>
                      {voiceAnalysisData.keyWords.map(word => (
                        <Tag key={word} color="blue">{word}</Tag>
                      ))}
                    </div>
                  </div>
                </Space>
              </Card>

              <Card title="洞察分析" style={{ marginTop: 16 }}>
                <Table
                  dataSource={voiceAnalysisData.insights}
                  columns={[
                    { title: '维度', dataIndex: 'type', key: 'type' },
                    { title: '分析内容', dataIndex: 'content', key: 'content' },
                    {
                      title: '置信度',
                      dataIndex: 'confidence',
                      key: 'confidence',
                      render: (val: number) => <Progress percent={val} size="small" />
                    }
                  ]}
                  pagination={false}
                  rowKey="type"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="消费群体分析" key="consumer-profile" icon={<UserOutlined />}>
          <Card
            title="消费群体画像列表"
            extra={<Button type="primary" icon={<PlusOutlined />}>新建画像</Button>}
          >
            <Table
              columns={consumerColumns}
              dataSource={consumerProfiles}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
          <Row gutter={[16, 16]}>

            <Col xs={24} sm={6}>
              <Card>
                <Statistic
                  title="总回收量"
                  value={surveyTemplates.reduce((sum, s) => sum + s.responseCount, 0)}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card>
                <Statistic
                  title="平均完成时间"
                  value={Math.round(surveyTemplates.reduce((sum, s) => sum + s.estimatedTime, 0) / surveyTemplates.length)}
                  suffix="分钟"
                  prefix={<BarChartOutlined />}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      <Card
        title="问卷模板管理"
        extra={
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setSurveyModalType('create')
                setSelectedSurvey(null)
                setSurveyModalVisible(true)
              }}
            >
              创建问卷
            </Button>
            <Button icon={<BarChartOutlined />}>
              智能生成
            </Button>
          </Space>
        }
      >
        <Space style={{ marginBottom: 16 }}>
          <Input.Search
            placeholder="搜索问卷名称或描述"
            allowClear
            style={{ width: 300 }}
          />
          <Select
            placeholder="选择类别"
            style={{ width: 150 }}
            allowClear
          >
            <Option value="消费者研究">消费者研究</Option>
            <Option value="品牌研究">品牌研究</Option>
            <Option value="产品研究">产品研究</Option>
            <Option value="定价研究">定价研究</Option>
            <Option value="渠道研究">渠道研究</Option>
            <Option value="营销研究">营销研究</Option>
            <Option value="竞争研究">竞争研究</Option>
            <Option value="体验研究">体验研究</Option>
            <Option value="需求研究">需求研究</Option>
          </Select>
          <Select
            placeholder="状态"
            style={{ width: 120 }}
            allowClear
          >
            <Option value="draft">草稿</Option>
            <Option value="active">活跃</Option>
            <Option value="archived">已归档</Option>
          </Select>
        </Space>

        <Table
          columns={[
            {
              title: '问卷名称',
              dataIndex: 'name',
              key: 'name',
              render: (text: string) => <a>{text}</a>
            },
            {
              title: '类别',
              dataIndex: 'category',
              key: 'category',
              render: (category: string) => <Tag color="blue">{category}</Tag>
            },
            {
              title: '目标受众',
              dataIndex: 'targetAudience',
              key: 'targetAudience'
            },
            {
              title: '预估时间',
              dataIndex: 'estimatedTime',
              key: 'estimatedTime',
              render: (time: number) => `${time}分钟`
            },
            {
              title: '状态',
              dataIndex: 'status',
              key: 'status',
              render: (status: string) => {
                const colors = { draft: 'orange', active: 'green', archived: 'gray' }
                const names = { draft: '草稿', active: '活跃', archived: '已归档' }
                return <Tag color={colors[status as keyof typeof colors]}>{names[status as keyof typeof names]}</Tag>
              }
            },
            {
              title: '回收量',
              dataIndex: 'responseCount',
              key: 'responseCount',
              render: (count: number) => count.toLocaleString()
            },
            {
              title: '创建人',
              dataIndex: 'creator',
              key: 'creator'
            },
            {
              title: '更新时间',
              dataIndex: 'updateTime',
              key: 'updateTime'
            },
            {
              title: '操作',
              key: 'action',
              render: (record: SurveyTemplate) => (
                <Space size="middle">
                  <Button
                    type="link"
                    icon={<EyeOutlined />}
                    size="small"
                    onClick={() => {
                      setSelectedSurvey(record)
                      setSurveyModalType('view')
                      setSurveyModalVisible(true)
                    }}
                  >
                    查看
                  </Button>
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    size="small"
                    onClick={() => {
                      setSelectedSurvey(record)
                      setSurveyModalType('edit')
                      setSurveyModalVisible(true)
                    }}
                  >
                    编辑
                  </Button>
                  <Button
                    type="link"
                    icon={<SendOutlined />}
                    size="small"
                    disabled={record.status !== 'active'}
                  >
                    发布
                  </Button>
                  <Button
                    type="link"
                    icon={<BarChartOutlined />}
                    size="small"
                    onClick={() => {
                      setSelectedSurvey(record)
                      setAnalysisModalVisible(true)
                    }}
                    disabled={record.responseCount === 0}
                  >
                    分析
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
          dataSource={surveyTemplates}
          rowKey="id"
          pagination={{
            total: surveyTemplates.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
          }}
        />
      </Card>


      {/* 问卷创建/编辑模态框 */}
      < Modal
        title={
          surveyModalType === 'create' ? '创建问卷' :
            surveyModalType === 'edit' ? '编辑问卷' : '问卷详情'
        }
        open={surveyModalVisible}
        onCancel={() => setSurveyModalVisible(false)}
        width={800}
        footer={surveyModalType === 'view' ? [
          <Button key="close" onClick={() => setSurveyModalVisible(false)}>
            关闭
          </Button>
        ] : [
          <Button key="cancel" onClick={() => setSurveyModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary">
            {surveyModalType === 'create' ? '创建' : '保存'}
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="问卷名称">
                <Input
                  placeholder="请输入问卷名称"
                  defaultValue={selectedSurvey?.name}
                  disabled={surveyModalType === 'view'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="问卷类别">
                <Select
                  placeholder="请选择问卷类别"
                  defaultValue={selectedSurvey?.category}
                  disabled={surveyModalType === 'view'}
                >
                  <Option value="消费者研究">消费者研究</Option>
                  <Option value="品牌研究">品牌研究</Option>
                  <Option value="产品研究">产品研究</Option>
                  <Option value="定价研究">定价研究</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="目标受众">
                <Input
                  placeholder="请输入目标受众"
                  defaultValue={selectedSurvey?.targetAudience}
                  disabled={surveyModalType === 'view'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="预估时间(分钟)">
                <Input
                  type="number"
                  placeholder="请输入预估时间"
                  defaultValue={selectedSurvey?.estimatedTime}
                  disabled={surveyModalType === 'view'}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="问卷描述">
            <TextArea
              rows={3}
              placeholder="请输入问卷描述"
              defaultValue={selectedSurvey?.description}
              disabled={surveyModalType === 'view'}
            />
          </Form.Item>

          {surveyModalType !== 'view' && (
            <Form.Item label="题目设计">
              <Card size="small" style={{ background: '#fafafa' }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button type="dashed" icon={<PlusOutlined />} block>
                    添加单选题
                  </Button>
                  <Button type="dashed" icon={<PlusOutlined />} block>
                    添加多选题
                  </Button>
                  <Button type="dashed" icon={<PlusOutlined />} block>
                    添加量表题
                  </Button>
                  <Button type="dashed" icon={<PlusOutlined />} block>
                    添加开放题
                  </Button>
                </Space>
              </Card>
            </Form.Item>
          )}

          {selectedSurvey && selectedSurvey.questions.length > 0 && (
            <Form.Item label="问卷预览">
              <Card size="small">
                {selectedSurvey.questions.map((question, index) => (
                  <div key={question.id} style={{ marginBottom: 16 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: 8 }}>
                      {index + 1}. {question.title}
                      {question.required && <span style={{ color: 'red' }}> *</span>}
                    </div>
                    {question.type === 'single' && question.options && (
                      <Radio.Group disabled>
                        <Space direction="vertical">
                          {question.options.map(option => (
                            <Radio key={option.id} value={option.value}>
                              {option.text}
                            </Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    )}
                    {question.type === 'multiple' && question.options && (
                      <Checkbox.Group disabled>
                        <Space direction="vertical">
                          {question.options.map(option => (
                            <Checkbox key={option.id} value={option.value}>
                              {option.text}
                            </Checkbox>
                          ))}
                        </Space>
                      </Checkbox.Group>
                    )}
                    {question.type === 'scale' && (
                      <div>
                        <Rate disabled count={question.scaleMax} />
                        {question.scaleLabels && (
                          <div style={{ marginTop: 4, fontSize: 12, color: '#666' }}>
                            {question.scaleLabels[0]} - {question.scaleLabels[question.scaleLabels.length - 1]}
                          </div>
                        )}
                      </div>
                    )}
                    {question.type === 'text' && (
                      <TextArea rows={3} disabled placeholder="请输入您的回答..." />
                    )}
                    {index < selectedSurvey.questions.length - 1 && <Divider />}
                  </div>
                ))}
              </Card>
            </Form.Item>
          )}
        </Form>
      </Modal >

      {/* 问卷分析模态框 */}
      < Modal
        title="问卷分析结果"
        open={analysisModalVisible}
        onCancel={() => setAnalysisModalVisible(false)}
        width={1000}
        footer={
          [
            <Button key="export" icon={<DownloadOutlined />}>
              导出报告
            </Button>,
            <Button key="close" onClick={() => setAnalysisModalVisible(false)}>
              关闭
            </Button>
          ]}
      >
        {selectedSurvey && (
          <div>
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={6}>
                <Statistic title="总回收量" value={selectedSurvey.responseCount} />
              </Col>
              <Col span={6}>
                <Statistic title="完成率" value={85.6} suffix="%" />
              </Col>
              <Col span={6}>
                <Statistic title="平均用时" value={selectedSurvey.estimatedTime - 1} suffix="分钟" />
              </Col>
              <Col span={6}>
                <Statistic title="满意度" value={4.2} suffix="/5.0" />
              </Col>
            </Row>

            <Card title="题目分析" size="small">
              <p>详细的题目分析结果将在此显示...</p>
              <div style={{ height: 200, background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#999' }}>图表分析区域</span>
              </div>
            </Card>
          </div>
        )}
      </Modal >
    </div >
  )
}

export default MarketInsight
