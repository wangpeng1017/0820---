import React, { useState } from 'react'
import {
  Card,
  Tabs,
  Row,
  Col,
  Statistic,
  Button,
  Space,
  Form,
  Input,
  Select,
  Checkbox,
  Radio,
  Table,
  Tag,
  Rate,
  Modal,
  Steps,
  Progress,
  Alert,
  Divider,
  InputNumber,

  List,
  Avatar,
  Typography,
  Slider,
  Switch,
  Upload,
  message
} from 'antd'
import {
  BulbOutlined,
  ExperimentOutlined,
  DatabaseOutlined,
  StarOutlined,
  SearchOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  FileTextOutlined,
  SettingOutlined,
  RobotOutlined,
  HeartOutlined,
  TrophyOutlined,
  InboxOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input
const { Step } = Steps
const { Title, Text, Paragraph } = Typography

// 智能选香相关接口
interface ScentSelectionTarget {
  mode: 'multiple-choice' | 'fuzzy-question'
  conditions: {
    functions: string[]
    logic: 'AND' | 'OR'
  }
  description?: string
}

interface RecommendedMaterial {
  id: string
  name: string
  matchRate: number
  description: string
  keyFeatures: string[]
  supplier: string
  price: number
  stock: number
}

// 智能仿香相关接口
interface ImitationTarget {
  description: string
  characteristics: string[]
  referenceFormula?: string
}

interface RecommendedFormula {
  id: string
  name: string
  source: 'classic-database' | 'ai-generated'
  similarity: number
  description: string
  ingredients: Array<{
    name: string
    ratio: number
    unit: string
  }>
}

// 智能调香相关接口
interface CreationFormula {
  id: string
  name: string
  version: string
  ingredients: Array<{
    name: string
    ratio: number
    unit: string
    isNew?: boolean
    isModified?: boolean
  }>
  adjustmentRequirements: string[]
  adjustmentNote?: string
}

// 香原料数据库接口 - 完全符合PRD文档要求
interface NaturalMaterial {
  id: string
  // 基础信息
  chineseName: string
  englishName: string
  alias?: string
  femaNumber?: string
  // 编码信息
  supplier: string
  supplierCode: string
  // 商业信息
  price: number
  purity: number
  // 理化信息
  appearance: string
  refractiveIndex?: number
  // 安全信息
  flashPoint?: string
  shelfLife: string
  // 图谱信息
  spectrumLink?: string
  // 功能信息
  aromaDescription: string
  function: string
  recommendedDosage: number
  mainFunction: string
  functionCategory: string[]
}

// 合成香原料接口 - 结构同天然香原料
interface SyntheticMaterial extends NaturalMaterial {
  synthesisMethod?: string
  casNumber?: string
}

// 香精产品接口 - 符合PRD文档要求
interface FragranceProduct {
  id: string
  // 产品信息
  productName: string
  productCode: string
  productType: string
  // 配方信息
  formulaLink?: string
  version: string
  designer: string
  designDate: string
  // 应用信息
  applicationScope: string
  recommendedDosage: string
  // 理化信息
  appearance: string
  relativeDensity: number
  // 功能信息
  aromaDescription: string
  function: string
}

// 功能香基板块接口 - 符合PRD文档要求
interface FunctionalBase {
  id: string
  // 基础信息
  name: string
  model: string
  // 设计信息
  formulaLink?: string
  version: string
  designer: string
  designDate: string
  // 理化信息
  appearance: string
  relativeDensity: number
  // 功能信息
  aromaDescription: string
  function: string
  // 应用信息
  recommendedDosage: string
  applicationScope: string
}

// 技术评价接口
interface TechnicalEvaluation {
  materialId: string
  materialName: string
  solvent: string
  dilution: number
  aromaScores: {
    fresh: number
    fruity: number
    woody: number
    floral: number
    herbal: number
    bean: number
    cocoa: number
    roasted: number
    sweet: number
  }
  aromaIntensity: number
  aromaCompliance: number
  sensoryIntensity: number
  coordination: number
  sensoryCompliance: number
  functionalScores: {
    aromaQuality: number
    aromaQuantity: number
    otherOdor: number
    aromaRichness: number
    smokeConcentration: number
    smokeCohesion: number
    smokeSweetness: number
    throatIrritation: number
    aftertasteCleanness: number
    aftertasteSweetness: number
    sweetTaste: number
    bitterTaste: number
  }
  functionCategory: string
  qualityRating: 'A' | 'B' | 'C' | 'D'
  recommendedDosage: number
}

const FlavorManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('intelligent-selection')

  // 智能选香状态
  const [selectionStep, setSelectionStep] = useState(0)
  const [selectionMode, setSelectionMode] = useState<'multiple-choice' | 'fuzzy-question'>('multiple-choice')
  const [selectionTarget, setSelectionTarget] = useState<ScentSelectionTarget>({
    mode: 'multiple-choice',
    conditions: {
      functions: [],
      logic: 'AND'
    }
  })
  const [recommendedMaterials, setRecommendedMaterials] = useState<RecommendedMaterial[]>([])
  const [selectedSamples, setSelectedSamples] = useState<string[]>([])

  // 智能仿香状态
  const [imitationTarget, setImitationTarget] = useState<ImitationTarget>({
    description: '',
    characteristics: []
  })
  const [recommendedFormulas, setRecommendedFormulas] = useState<RecommendedFormula[]>([])
  const [selectedFormula, setSelectedFormula] = useState<RecommendedFormula | null>(null)
  const [formulaFeedback, setFormulaFeedback] = useState({
    fruitRichness: 3,
    sweetness: 3,
    compliance: 3,
    adjustmentNote: ''
  })

  // 智能调香状态
  const [creationFormula, setCreationFormula] = useState<CreationFormula>({
    id: 'CF001',
    name: '我的果香配方 V1',
    version: 'V1',
    ingredients: [
      { name: '乙酸苄酯', ratio: 10, unit: '%' },
      { name: '香兰素', ratio: 5, unit: '%' },
      { name: '突厥酮', ratio: 2, unit: '%' },
      { name: '溶剂 (PG)', ratio: 83, unit: '%' }
    ],
    adjustmentRequirements: []
  })
  const [optimizedFormula, setOptimizedFormula] = useState<CreationFormula | null>(null)

  // 模态框状态
  const [evaluationModalVisible, setEvaluationModalVisible] = useState(false)
  const [materialDetailModalVisible, setMaterialDetailModalVisible] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<RecommendedMaterial | null>(null)
  // Demo数据 - 基于PRD文档的示例数据

  // 智能选香推荐结果数据 - 完全符合PRD文档示例
  const mockRecommendedMaterials: RecommendedMaterial[] = [
    {
      id: 'RM001',
      name: '枫糖浸膏',
      matchRate: 92,
      description: '焦糖、枫糖、果甜香气，能有效掩盖杂气，增加甜润感。',
      keyFeatures: ['增甜', '掩杂', '果甜香'],
      supplier: 'Givaudan',
      price: 285.5,
      stock: 150
    },
    {
      id: 'RM002',
      name: '香荚兰酊',
      matchRate: 88,
      description: '典型的香草、奶香、膏香气息，甜感丰富，能柔和刺激、协调香气。',
      keyFeatures: ['增甜', '协调香气', '奶香'],
      supplier: 'Firmenich',
      price: 320.0,
      stock: 85
    },
    {
      id: 'RM003',
      name: '乙酸香叶酯',
      matchRate: 85,
      description: '柔和的玫瑰和果香香气，能提供清甜感。',
      keyFeatures: ['清甜', '果香', '玫瑰香'],
      supplier: 'IFF',
      price: 195.8,
      stock: 220
    }
  ]

  // 智能仿香推荐配方数据 - 完全符合PRD文档示例
  const mockRecommendedFormulas: RecommendedFormula[] = [
    {
      id: 'JF-Classic-005',
      name: '经典烤烟型增香配方',
      source: 'classic-database',
      similarity: 85,
      description: '经典烤烟型增香配方，以天然浸膏为主体，突出烟草本香。',
      ingredients: [
        { name: '烟草浸膏', ratio: 40, unit: '%' },
        { name: '香兰素', ratio: 15, unit: '%' },
        { name: '乙基麦芽酚', ratio: 10, unit: '%' },
        { name: '苯甲醛', ratio: 8, unit: '%' },
        { name: '溶剂 (PG)', ratio: 27, unit: '%' }
      ]
    },
    {
      id: 'AI-Gen-20250822-01',
      name: 'AI生成果香蜜甜配方',
      source: 'ai-generated',
      similarity: 0,
      description: 'AI生成的全新配方，使用多种酯类和酮类原料来模拟果香和蜜甜，并加入少量调节剂改善烟气状态。',
      ingredients: [
        { name: '乙酸苄酯', ratio: 25, unit: '%' },
        { name: '丁酸乙酯', ratio: 15, unit: '%' },
        { name: '蜂蜜浸膏', ratio: 12, unit: '%' },
        { name: '苹果酯', ratio: 10, unit: '%' },
        { name: '香兰素', ratio: 8, unit: '%' },
        { name: '溶剂 (PG)', ratio: 30, unit: '%' }
      ]
    }
  ]

  // 天然香原料数据库示例数据 - 完全符合PRD文档示例
  const mockNaturalMaterials: NaturalMaterial[] = [
    {
      id: 'NM001',
      // 基础信息
      chineseName: '秘鲁香脂',
      englishName: 'Peru balsam',
      alias: '',
      femaNumber: '2116',
      // 编码信息
      supplier: 'Givaudan',
      supplierCode: '84521',
      // 商业信息
      price: 450.0,
      purity: 99,
      // 理化信息
      appearance: '深棕色粘稠液体',
      refractiveIndex: 1.56,
      // 安全信息
      flashPoint: '>100°C',
      shelfLife: '24个月',
      // 图谱信息
      spectrumLink: '链接到指纹图谱',
      // 功能信息
      aromaDescription: '膏香、树脂香，略带香荚兰和肉桂气息',
      function: '定香、增加厚实感和膏甜感',
      recommendedDosage: 50,
      mainFunction: '增浓',
      functionCategory: ['提高充盈感', '增加厚实度', '增加骨架感']
    },
    {
      id: 'NM002',
      // 基础信息
      chineseName: '可可提取物',
      englishName: 'Cocoa extract',
      alias: '',
      femaNumber: '2330',
      // 编码信息
      supplier: 'Firmenich',
      supplierCode: 'FC2330',
      // 商业信息
      price: 380.5,
      purity: 95,
      // 理化信息
      appearance: '深褐色液体',
      refractiveIndex: 1.48,
      // 安全信息
      flashPoint: '85°C',
      shelfLife: '18个月',
      // 图谱信息
      spectrumLink: '链接到指纹图谱',
      // 功能信息
      aromaDescription: '浓郁的可可香、巧克力香，带有轻微的烘焙香',
      function: '增加可可香韵，提供甜感和厚重感',
      recommendedDosage: 80,
      mainFunction: '增香',
      functionCategory: ['增加豆香', '增加甜感', '增加厚重感']
    }
  ]

  // 功能香基板块数据库示例数据 - 完全符合PRD文档示例
  const mockFunctionalBases: FunctionalBase[] = [
    {
      id: 'FB001',
      // 基础信息
      name: '清甜果香模块',
      model: 'FB-FRUIT-01B',
      // 设计信息
      formulaLink: '链接',
      version: 'V2.1',
      designer: '张三',
      designDate: '2025-06-18',
      // 理化信息
      appearance: '无色至淡黄色液体',
      relativeDensity: 0.985,
      // 功能信息
      aromaDescription: '清新、甜润的复合水果香气，头香透发。',
      function: '提供头香的果香特征，提升甜感和细腻度。',
      // 应用信息
      recommendedDosage: '0.1 - 0.5%',
      applicationScope: '适用于各类烤烟型产品，用于提升果香特征。'
    }
  ]

  // 合成香原料数据库示例数据 - 完全符合PRD文档示例
  const mockSyntheticMaterials: SyntheticMaterial[] = [
    {
      id: 'SM001',
      // 基础信息
      chineseName: '香兰素',
      englishName: 'Vanillin',
      alias: '4-羟基-3-甲氧基苯甲醛',
      femaNumber: '3107',
      // 编码信息
      supplier: 'Borregaard',
      supplierCode: 'VAN-99',
      // 商业信息
      price: 85.0,
      purity: 99.5,
      // 理化信息
      appearance: '白色至微黄色结晶粉末',
      refractiveIndex: 1.555,
      // 安全信息
      flashPoint: '147°C',
      shelfLife: '36个月',
      // 图谱信息
      spectrumLink: '链接到指纹图谱',
      // 功能信息
      aromaDescription: '典型的香草、奶香、甜香气息，温和持久',
      function: '增加甜感和奶香特征，改善香气协调性',
      recommendedDosage: 200,
      mainFunction: '增甜',
      functionCategory: ['增加甜感', '改善协调性', '增加奶香'],
      // 合成香原料特有信息
      synthesisMethod: '愈创木酚氧化法',
      casNumber: '121-33-5'
    }
  ]

  // 香精产品数据库示例数据 - 完全符合PRD文档示例
  const mockFragranceProducts: FragranceProduct[] = [
    {
      id: 'FP001',
      // 产品信息
      productName: '经典烤烟型增香香精',
      productCode: 'FP-CLASSIC-001',
      productType: '烤烟型香精',
      // 配方信息
      formulaLink: '链接到配方单',
      version: 'V3.2',
      designer: '李调香师',
      designDate: '2025-03-15',
      // 应用信息
      applicationScope: '适用于中高档烤烟型卷烟产品',
      recommendedDosage: '0.8 - 1.2%',
      // 理化信息
      appearance: '淡黄色至棕黄色液体',
      relativeDensity: 1.025,
      // 功能信息
      aromaDescription: '浓郁的烤烟本香，带有轻微的果甜和膏香气息',
      function: '增强烤烟本香特征，提升产品档次感和舒适性'
    }
  ]

  // 处理智能选香的函数
  const handleSelectionSearch = () => {
    // 模拟AI推荐过程
    message.loading('AI正在分析您的需求...', 2)
    setTimeout(() => {
      setRecommendedMaterials(mockRecommendedMaterials)
      setSelectionStep(1)
      message.success('推荐完成！找到3个匹配的香原料')
    }, 2000)
  }

  const handleMaterialEvaluation = (materialId: string, rating: number) => {
    message.success(`已提交对 ${materialId} 的评价：${rating}星`)
  }

  const handleSampleSelection = (materialId: string) => {
    const newSelected = selectedSamples.includes(materialId)
      ? selectedSamples.filter(id => id !== materialId)
      : [...selectedSamples, materialId]
    setSelectedSamples(newSelected)
  }

  // 处理智能仿香的函数
  const handleImitationSearch = () => {
    message.loading('AI正在分析目标特征...', 2)
    setTimeout(() => {
      setRecommendedFormulas(mockRecommendedFormulas)
      message.success('推荐完成！找到2个匹配的配方')
    }, 2000)
  }

  const handleFormulaFeedback = () => {
    message.loading('AI正在根据反馈优化配方...', 2)
    setTimeout(() => {
      message.success('配方优化完成！请查看新的推荐结果')
    }, 2000)
  }

  // 处理智能调香的函数
  const handleCreationOptimization = () => {
    message.loading('AI正在优化配方...', 2)
    setTimeout(() => {
      const optimized: CreationFormula = {
        ...creationFormula,
        name: '我的果香配方 V2 (AI优化版)',
        version: 'V2',
        ingredients: [
          { name: '乙酸苄酯', ratio: 10, unit: '%' },
          { name: '香兰素', ratio: 4.5, unit: '%', isModified: true },
          { name: '突厥酮', ratio: 2, unit: '%' },
          { name: '二氢大马酮', ratio: 0.5, unit: '%', isNew: true },
          { name: '溶剂 (PG)', ratio: 83, unit: '%' }
        ],
        adjustmentNote: '为提高烟气成团性，适当降低了香兰素的比例以减少发散感，并新增了微量二氢大马酮来增加烟气的凝聚感和丰富度。'
      }
      setOptimizedFormula(optimized)
      message.success('配方优化完成！')
    }, 2000)
  }

  // 渲染智能选香模块
  const renderIntelligentSelection = () => (
    <div style={{ padding: '24px' }}>
      <Title level={3}>
        <BulbOutlined style={{ color: '#1890ff', marginRight: 8 }} />
        智能选香场景
      </Title>
      <Paragraph type="secondary">
        通过AI分析您的需求，智能推荐最适合的香原料
      </Paragraph>

      <Steps current={selectionStep} style={{ marginBottom: 32 }}>
        <Step title="目标确定" description="设定选香目标和条件" />
        <Step title="系统推荐" description="AI分析并推荐香原料" />
        <Step title="技术评价" description="对推荐结果进行评价" />
        <Step title="样品确定" description="确定最终样品" />
      </Steps>

      {selectionStep === 0 && (
        <Card title="第一步：目标确定" style={{ marginBottom: 24 }}>
          <Row gutter={24}>
            <Col span={12}>
              <Form layout="vertical">
                <Form.Item label="选择模式">
                  <Radio.Group
                    value={selectionMode}
                    onChange={(e) => setSelectionMode(e.target.value)}
                  >
                    <Radio value="multiple-choice">选择题模式</Radio>
                    <Radio value="fuzzy-question">模糊问题模式</Radio>
                  </Radio.Group>
                </Form.Item>

                {selectionMode === 'multiple-choice' && (
                  <>
                    <Form.Item label="功能需求">
                      <div style={{ border: '1px solid #d9d9d9', padding: '16px', borderRadius: '6px' }}>
                        <Title level={5}>特征香</Title>
                        <Checkbox.Group
                          value={selectionTarget.conditions.functions}
                          onChange={(values) => setSelectionTarget({
                            ...selectionTarget,
                            conditions: { ...selectionTarget.conditions, functions: values as string[] }
                          })}
                        >
                          <Row>
                            <Col span={24}><Checkbox value="特征香">特征香</Checkbox></Col>
                          </Row>
                        </Checkbox.Group>

                        <Title level={5} style={{ marginTop: 16 }}>增香</Title>
                        <Checkbox.Group
                          value={selectionTarget.conditions.functions}
                          onChange={(values) => setSelectionTarget({
                            ...selectionTarget,
                            conditions: { ...selectionTarget.conditions, functions: values as string[] }
                          })}
                        >
                          <Row>
                            <Col span={24}><Checkbox value="增香">增香</Checkbox></Col>
                          </Row>
                        </Checkbox.Group>

                        <Title level={5} style={{ marginTop: 16 }}>增浓</Title>
                        <Checkbox.Group
                          value={selectionTarget.conditions.functions}
                          onChange={(values) => setSelectionTarget({
                            ...selectionTarget,
                            conditions: { ...selectionTarget.conditions, functions: values as string[] }
                          })}
                        >
                          <Row>
                            <Col span={24}><Checkbox value="增浓">增浓</Checkbox></Col>
                          </Row>
                        </Checkbox.Group>

                        <Title level={5} style={{ marginTop: 16 }}>增甜</Title>
                        <Checkbox.Group
                          value={selectionTarget.conditions.functions}
                          onChange={(values) => setSelectionTarget({
                            ...selectionTarget,
                            conditions: { ...selectionTarget.conditions, functions: values as string[] }
                          })}
                        >
                          <Row>
                            <Col span={24}><Checkbox value="增甜">增甜</Checkbox></Col>
                          </Row>
                          <Row style={{ marginLeft: 24, marginTop: 8 }}>
                            <Col span={12}><Checkbox value="增加烟草成熟甜香">增加烟草成熟甜香</Checkbox></Col>
                            <Col span={12}><Checkbox value="增加清甜、果甜">增加清甜、果甜</Checkbox></Col>
                          </Row>
                        </Checkbox.Group>

                        <Title level={5} style={{ marginTop: 16 }}>掩杂</Title>
                        <Checkbox.Group
                          value={selectionTarget.conditions.functions}
                          onChange={(values) => setSelectionTarget({
                            ...selectionTarget,
                            conditions: { ...selectionTarget.conditions, functions: values as string[] }
                          })}
                        >
                          <Row>
                            <Col span={24}><Checkbox value="掩杂">掩杂</Checkbox></Col>
                          </Row>
                          <Row style={{ marginLeft: 24, marginTop: 8 }}>
                            <Col span={12}><Checkbox value="掩盖生青、枯焦">掩盖生青、枯焦</Checkbox></Col>
                            <Col span={12}><Checkbox value="掩杂土腥">掩杂土腥</Checkbox></Col>
                          </Row>
                        </Checkbox.Group>
                      </div>
                    </Form.Item>

                    <Form.Item label="逻辑关系">
                      <Radio.Group
                        value={selectionTarget.conditions.logic}
                        onChange={(e) => setSelectionTarget({
                          ...selectionTarget,
                          conditions: { ...selectionTarget.conditions, logic: e.target.value }
                        })}
                      >
                        <Radio value="AND">AND（同时满足）</Radio>
                        <Radio value="OR">OR（满足其一）</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </>
                )}

                {selectionMode === 'fuzzy-question' && (
                  <Form.Item label="描述您的需求">
                    <TextArea
                      rows={4}
                      placeholder="请详细描述您希望香原料具备的特性，例如：我需要一种能够增加甜感并掩盖杂气的香原料，最好具有果香特征..."
                      value={selectionTarget.description}
                      onChange={(e) => setSelectionTarget({
                        ...selectionTarget,
                        description: e.target.value
                      })}
                    />
                  </Form.Item>
                )}

                <Form.Item>
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={handleSelectionSearch}
                    disabled={selectionMode === 'multiple-choice' && selectionTarget.conditions.functions.length === 0}
                  >
                    开始AI推荐
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col span={12}>
              <Alert
                message="智能选香说明"
                description={
                  <div>
                    <p><strong>选择题模式：</strong>通过勾选具体功能需求，系统精确匹配香原料</p>
                    <p><strong>模糊问题模式：</strong>通过自然语言描述需求，AI智能理解并推荐</p>
                    <p><strong>推荐算法：</strong>基于香原料功能数据库和机器学习模型</p>
                  </div>
                }
                type="info"
                showIcon
              />
            </Col>
          </Row>
        </Card>
      )}
      {selectionStep === 1 && (
        <Card title="第二步：系统推荐" style={{ marginBottom: 24 }}>
          <Alert
            message="AI推荐完成"
            description={`基于您的需求"${selectionTarget.conditions.functions.join(' + ')}"，找到了 ${recommendedMaterials.length} 个匹配的香原料`}
            type="success"
            showIcon
            style={{ marginBottom: 16 }}
          />

          <List
            dataSource={recommendedMaterials}
            renderItem={(material) => (
              <List.Item
                actions={[
                  <Button
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={() => {
                      setSelectedMaterial(material)
                      setMaterialDetailModalVisible(true)
                    }}
                  >
                    详情
                  </Button>,
                  <Button
                    type="link"
                    icon={<StarOutlined />}
                    onClick={() => setEvaluationModalVisible(true)}
                  >
                    评价
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{ backgroundColor: '#1890ff' }}
                      size="large"
                    >
                      {material.matchRate}%
                    </Avatar>
                  }
                  title={
                    <div>
                      <Text strong>{material.name}</Text>
                      <Tag color="blue" style={{ marginLeft: 8 }}>
                        匹配度 {material.matchRate}%
                      </Tag>
                    </div>
                  }
                  description={
                    <div>
                      <Paragraph ellipsis={{ rows: 2 }}>{material.description}</Paragraph>
                      <Space wrap>
                        {material.keyFeatures.map(feature => (
                          <Tag key={feature} color="green">{feature}</Tag>
                        ))}
                      </Space>
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary">供应商：{material.supplier}</Text>
                        <Divider type="vertical" />
                        <Text type="secondary">价格：¥{material.price}/kg</Text>
                        <Divider type="vertical" />
                        <Text type="secondary">库存：{material.stock}kg</Text>
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Button
              type="primary"
              onClick={() => setSelectionStep(2)}
              disabled={recommendedMaterials.length === 0}
            >
              进入技术评价
            </Button>
          </div>
        </Card>
      )}
      {selectionStep === 2 && (
        <Card title="第三步：技术评价" style={{ marginBottom: 24 }}>
          <Alert
            message="请对推荐的香原料进行技术评价"
            description="您的评价将帮助AI系统不断优化推荐算法"
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />

          <List
            dataSource={recommendedMaterials}
            renderItem={(material) => (
              <List.Item>
                <Card
                  style={{ width: '100%' }}
                  title={material.name}
                  extra={
                    <Tag color="blue">匹配度 {material.matchRate}%</Tag>
                  }
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Text strong>推荐理由：</Text>
                      <Paragraph>{material.description}</Paragraph>
                    </Col>
                    <Col span={12}>
                      <Text strong>请评价推荐质量：</Text>
                      <div style={{ marginTop: 8 }}>
                        <Rate
                          onChange={(value) => handleMaterialEvaluation(material.id, value)}
                          style={{ fontSize: 20 }}
                        />
                      </div>
                      <div style={{ marginTop: 16 }}>
                        <Checkbox
                          checked={selectedSamples.includes(material.id)}
                          onChange={() => handleSampleSelection(material.id)}
                        >
                          选择此原料作为样品
                        </Checkbox>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
          />

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Space>
              <Button onClick={() => setSelectionStep(1)}>
                返回推荐结果
              </Button>
              <Button
                type="primary"
                onClick={() => setSelectionStep(3)}
                disabled={selectedSamples.length === 0}
              >
                确定样品选择
              </Button>
            </Space>
          </div>
        </Card>
      )}
      {selectionStep === 3 && (
        <Card title="第四步：样品确定" style={{ marginBottom: 24 }}>
          <Alert
            message="样品选择完成"
            description={`您已选择 ${selectedSamples.length} 个香原料作为样品`}
            type="success"
            showIcon
            style={{ marginBottom: 16 }}
          />

          <Title level={4}>已选择的样品：</Title>
          <List
            dataSource={recommendedMaterials.filter(m => selectedSamples.includes(m.id))}
            renderItem={(material) => (
              <List.Item>
                <Card style={{ width: '100%' }}>
                  <Row gutter={16}>
                    <Col span={6}>
                      <Statistic title="香原料名称" value={material.name} />
                    </Col>
                    <Col span={6}>
                      <Statistic title="匹配度" value={material.matchRate} suffix="%" />
                    </Col>
                    <Col span={6}>
                      <Statistic title="价格" value={material.price} prefix="¥" suffix="/kg" />
                    </Col>
                    <Col span={6}>
                      <Statistic title="库存" value={material.stock} suffix="kg" />
                    </Col>
                  </Row>
                  <Divider />
                  <Paragraph>{material.description}</Paragraph>
                  <Space wrap>
                    {material.keyFeatures.map(feature => (
                      <Tag key={feature} color="green">{feature}</Tag>
                    ))}
                  </Space>
                </Card>
              </List.Item>
            )}
          />

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Space>
              <Button onClick={() => setSelectionStep(2)}>
                返回技术评价
              </Button>
              <Button type="primary" onClick={() => {
                message.success('样品确定完成！已生成采购清单')
                setSelectionStep(0)
                setSelectedSamples([])
                setRecommendedMaterials([])
              }}>
                确定并生成采购清单
              </Button>
            </Space>
          </div>
        </Card>
      )}
    </div>
  )

  // 渲染智能仿香模块
  const renderIntelligentImitation = () => (
    <div style={{ padding: '24px' }}>
      <Title level={3}>
        <ExperimentOutlined style={{ color: '#52c41a', marginRight: 8 }} />
        智能仿香场景
      </Title>
      <Paragraph type="secondary">
        通过AI分析目标香精特征，智能推荐配方或生成全新配方
      </Paragraph>

      <Row gutter={24}>
        <Col span={12}>
          <Card title="目标确定" style={{ marginBottom: 24 }}>
            <Form layout="vertical">
              <Form.Item label="目标香精描述">
                <TextArea
                  rows={4}
                  placeholder="请详细描述您要仿制的香精特征，例如：具有浓郁的果香和蜜甜感，烟气柔和，有一定的厚重感..."
                  value={imitationTarget.description}
                  onChange={(e) => setImitationTarget({
                    ...imitationTarget,
                    description: e.target.value
                  })}
                />
              </Form.Item>

              <Form.Item label="关键特征标签">
                <Checkbox.Group
                  value={imitationTarget.characteristics}
                  onChange={(values) => setImitationTarget({
                    ...imitationTarget,
                    characteristics: values as string[]
                  })}
                >
                  <Row>
                    <Col span={8}><Checkbox value="果香">果香</Checkbox></Col>
                    <Col span={8}><Checkbox value="花香">花香</Checkbox></Col>
                    <Col span={8}><Checkbox value="木香">木香</Checkbox></Col>
                    <Col span={8}><Checkbox value="甜香">甜香</Checkbox></Col>
                    <Col span={8}><Checkbox value="清香">清香</Checkbox></Col>
                    <Col span={8}><Checkbox value="浓香">浓香</Checkbox></Col>
                    <Col span={8}><Checkbox value="蜜甜">蜜甜</Checkbox></Col>
                    <Col span={8}><Checkbox value="膏香">膏香</Checkbox></Col>
                    <Col span={8}><Checkbox value="烘焙香">烘焙香</Checkbox></Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item label="参考配方（可选）">
                <Input
                  placeholder="如有参考配方编号，请输入"
                  value={imitationTarget.referenceFormula}
                  onChange={(e) => setImitationTarget({
                    ...imitationTarget,
                    referenceFormula: e.target.value
                  })}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleImitationSearch}
                  disabled={!imitationTarget.description.trim()}
                  block
                >
                  开始AI配方推荐
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Alert
            message="智能仿香说明"
            description={
              <div>
                <p><strong>数据库筛选：</strong>从经典配方库中筛选相似配方</p>
                <p><strong>AI自主设计：</strong>基于目标特征生成全新配方</p>
                <p><strong>循环优化：</strong>根据评价反馈不断优化配方</p>
              </div>
            }
            type="info"
            showIcon
          />
        </Col>
      </Row>
      {recommendedFormulas.length > 0 && (
        <Card title="配方推荐结果" style={{ marginTop: 24 }}>
          <List
            dataSource={recommendedFormulas}
            renderItem={(formula) => (
              <List.Item
                actions={[
                  <Button
                    type={selectedFormula?.id === formula.id ? 'primary' : 'default'}
                    onClick={() => setSelectedFormula(formula)}
                  >
                    {selectedFormula?.id === formula.id ? '已选择' : '选择此配方'}
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: formula.source === 'classic-database' ? '#1890ff' : '#52c41a'
                      }}
                      size="large"
                      icon={formula.source === 'classic-database' ? <DatabaseOutlined /> : <RobotOutlined />}
                    />
                  }
                  title={
                    <div>
                      <Text strong>{formula.name}</Text>
                      <Tag
                        color={formula.source === 'classic-database' ? 'blue' : 'green'}
                        style={{ marginLeft: 8 }}
                      >
                        {formula.source === 'classic-database' ? '经典配方库' : 'AI生成'}
                      </Tag>
                      {formula.similarity > 0 && (
                        <Tag color="orange" style={{ marginLeft: 4 }}>
                          相似度 {formula.similarity}%
                        </Tag>
                      )}
                    </div>
                  }
                  description={
                    <div>
                      <Paragraph ellipsis={{ rows: 2 }}>{formula.description}</Paragraph>
                      <Title level={5}>配方组成：</Title>
                      <Row gutter={[8, 8]}>
                        {formula.ingredients.map((ingredient, index) => (
                          <Col key={index}>
                            <Tag>
                              {ingredient.name} {ingredient.ratio}{ingredient.unit}
                            </Tag>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      )}
      {selectedFormula && (
        <Card title="配方调整与循环优化" style={{ marginTop: 24 }}>
          <Row gutter={24}>
            <Col span={12}>
              <Title level={4}>当前选择的配方：{selectedFormula.name}</Title>
              <Table
                dataSource={selectedFormula.ingredients.map((ingredient, index) => ({
                  key: index,
                  ...ingredient
                }))}
                columns={[
                  { title: '原料名称', dataIndex: 'name', key: 'name' },
                  { title: '比例', dataIndex: 'ratio', key: 'ratio' },
                  { title: '单位', dataIndex: 'unit', key: 'unit' }
                ]}
                pagination={false}
                size="small"
              />
            </Col>
            <Col span={12}>
              <Title level={4}>评价反馈</Title>
              <Form layout="vertical">
                <Form.Item label="果香丰富度">
                  <Slider
                    min={1}
                    max={5}
                    value={formulaFeedback.fruitRichness}
                    onChange={(value) => setFormulaFeedback({
                      ...formulaFeedback,
                      fruitRichness: value
                    })}
                    marks={{
                      1: '很差',
                      2: '较差',
                      3: '一般',
                      4: '较好',
                      5: '很好'
                    }}
                  />
                </Form.Item>
                <Form.Item label="甜感强度">
                  <Slider
                    min={1}
                    max={5}
                    value={formulaFeedback.sweetness}
                    onChange={(value) => setFormulaFeedback({
                      ...formulaFeedback,
                      sweetness: value
                    })}
                    marks={{
                      1: '很弱',
                      2: '较弱',
                      3: '适中',
                      4: '较强',
                      5: '很强'
                    }}
                  />
                </Form.Item>
                <Form.Item label="目标符合度">
                  <Slider
                    min={1}
                    max={5}
                    value={formulaFeedback.compliance}
                    onChange={(value) => setFormulaFeedback({
                      ...formulaFeedback,
                      compliance: value
                    })}
                    marks={{
                      1: '很低',
                      2: '较低',
                      3: '一般',
                      4: '较高',
                      5: '很高'
                    }}
                  />
                </Form.Item>
                <Form.Item label="调整建议">
                  <TextArea
                    rows={3}
                    placeholder="请描述需要调整的方向，例如：需要增强果香，减少甜感..."
                    value={formulaFeedback.adjustmentNote}
                    onChange={(e) => setFormulaFeedback({
                      ...formulaFeedback,
                      adjustmentNote: e.target.value
                    })}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    icon={<SyncOutlined />}
                    onClick={handleFormulaFeedback}
                    block
                  >
                    提交反馈并优化配方
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  )
  // 渲染智能调香模块
  const renderIntelligentCreation = () => (
    <div style={{ padding: '24px' }}>
      <Title level={3}>
        <ThunderboltOutlined style={{ color: '#722ed1', marginRight: 8 }} />
        智能调香场景
      </Title>
      <Paragraph type="secondary">
        基于现有配方，通过AI智能调整优化，生成新的配方版本
      </Paragraph>

      <Row gutter={24}>
        <Col span={12}>
          <Card title="目标设定" style={{ marginBottom: 24 }}>
            <Title level={4}>当前配方：{creationFormula.name}</Title>
            <Table
              dataSource={creationFormula.ingredients.map((ingredient, index) => ({
                key: index,
                ...ingredient
              }))}
              columns={[
                { title: '原料名称', dataIndex: 'name', key: 'name' },
                {
                  title: '比例',
                  dataIndex: 'ratio',
                  key: 'ratio',
                  render: (value, record) => (
                    <InputNumber
                      value={value}
                      min={0}
                      max={100}
                      step={0.1}
                      suffix={record.unit}
                      onChange={(newValue) => {
                        const newIngredients = [...creationFormula.ingredients]
                        const index = newIngredients.findIndex(ing => ing.name === record.name)
                        if (index !== -1) {
                          newIngredients[index].ratio = newValue || 0
                          setCreationFormula({
                            ...creationFormula,
                            ingredients: newIngredients
                          })
                        }
                      }}
                    />
                  )
                }
              ]}
              pagination={false}
              size="small"
            />

            <Divider />

            <Form layout="vertical">
              <Form.Item label="调整要求（标签选择）">
                <div style={{ border: '1px solid #d9d9d9', padding: '16px', borderRadius: '6px' }}>
                  <Title level={5}>提升香气质感</Title>
                  <Checkbox.Group
                    value={creationFormula.adjustmentRequirements}
                    onChange={(values) => setCreationFormula({
                      ...creationFormula,
                      adjustmentRequirements: values as string[]
                    })}
                  >
                    <Row>
                      <Col span={24}><Checkbox value="提升香气质感">提升香气质感</Checkbox></Col>
                    </Row>
                  </Checkbox.Group>

                  <Title level={5} style={{ marginTop: 16 }}>改善余味</Title>
                  <Checkbox.Group
                    value={creationFormula.adjustmentRequirements}
                    onChange={(values) => setCreationFormula({
                      ...creationFormula,
                      adjustmentRequirements: values as string[]
                    })}
                  >
                    <Row>
                      <Col span={24}><Checkbox value="改善余味">改善余味</Checkbox></Col>
                    </Row>
                  </Checkbox.Group>

                  <Title level={5} style={{ marginTop: 16 }}>调节烟气</Title>
                  <Checkbox.Group
                    value={creationFormula.adjustmentRequirements}
                    onChange={(values) => setCreationFormula({
                      ...creationFormula,
                      adjustmentRequirements: values as string[]
                    })}
                  >
                    <Row>
                      <Col span={24}><Checkbox value="调节烟气">调节烟气</Checkbox></Col>
                    </Row>
                    <Row style={{ marginLeft: 24, marginTop: 8 }}>
                      <Col span={8}><Checkbox value="提高烟气流畅感">提高烟气流畅感</Checkbox></Col>
                      <Col span={8}><Checkbox value="提高烟气成团性">提高烟气成团性</Checkbox></Col>
                      <Col span={8}><Checkbox value="提高飘逸感">提高飘逸感</Checkbox></Col>
                    </Row>
                  </Checkbox.Group>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  icon={<RobotOutlined />}
                  onClick={handleCreationOptimization}
                  disabled={creationFormula.adjustmentRequirements.length === 0}
                  block
                >
                  开始AI智能优化
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Alert
            message="智能调香说明"
            description={
              <div>
                <p><strong>目标设定：</strong>输入初始配方和调整要求</p>
                <p><strong>AI优化：</strong>基于机器学习模型自动调整配方</p>
                <p><strong>配方输出：</strong>生成优化后的新配方版本</p>
              </div>
            }
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />

          {optimizedFormula && (
            <Card title="AI优化结果" style={{ marginTop: 24 }}>
              <Title level={4}>{optimizedFormula.name}</Title>
              <Alert
                message="优化说明"
                description={optimizedFormula.adjustmentNote}
                type="success"
                showIcon
                style={{ marginBottom: 16 }}
              />

              <Table
                dataSource={optimizedFormula.ingredients.map((ingredient, index) => ({
                  key: index,
                  ...ingredient
                }))}
                columns={[
                  {
                    title: '原料名称',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text, record) => (
                      <span>
                        {text}
                        {record.isNew && <Tag color="green" style={{ marginLeft: 4 }}>新增</Tag>}
                        {record.isModified && <Tag color="orange" style={{ marginLeft: 4 }}>调整</Tag>}
                      </span>
                    )
                  },
                  { title: '比例', dataIndex: 'ratio', key: 'ratio' },
                  { title: '单位', dataIndex: 'unit', key: 'unit' }
                ]}
                pagination={false}
                size="small"
              />

              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Space>
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => {
                      message.success('配方已保存到配方库')
                    }}
                  >
                    保存配方
                  </Button>
                  <Button
                    icon={<FileTextOutlined />}
                    onClick={() => {
                      message.success('配方报告已生成')
                    }}
                  >
                    生成报告
                  </Button>
                </Space>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  )
  // 渲染数据库管理模块
  const renderDatabaseManagement = () => (
    <div style={{ padding: '24px' }}>
      <Title level={3}>
        <DatabaseOutlined style={{ color: '#fa8c16', marginRight: 8 }} />
        香精香料数据库管理
      </Title>
      <Paragraph type="secondary">
        管理天然香原料、合成香原料、功能香基板块和香精产品数据库
      </Paragraph>

      <Tabs defaultActiveKey="natural-materials">
        <TabPane tab="天然香原料库" key="natural-materials">
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Input.Search
                  placeholder="搜索天然香原料"
                  style={{ width: 300 }}
                  onSearch={(value) => message.info(`搜索: ${value}`)}
                />
                <Button type="primary" icon={<PlusOutlined />}>
                  添加新原料
                </Button>
              </Space>
            </div>

            <Table
              dataSource={mockNaturalMaterials}
              columns={[
                { title: '中文名称', dataIndex: 'chineseName', key: 'chineseName', width: 120 },
                { title: '英文名称', dataIndex: 'englishName', key: 'englishName', width: 150 },
                { title: 'FEMA号', dataIndex: 'femaNumber', key: 'femaNumber', width: 80 },
                { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 100 },
                { title: '厂家型号', dataIndex: 'supplierCode', key: 'supplierCode', width: 100 },
                {
                  title: '价格',
                  dataIndex: 'price',
                  key: 'price',
                  width: 100,
                  render: (price) => `¥${price}/kg`
                },
                {
                  title: '纯度',
                  dataIndex: 'purity',
                  key: 'purity',
                  width: 80,
                  render: (purity) => `${purity}%`
                },
                { title: '外观形态', dataIndex: 'appearance', key: 'appearance', width: 120 },
                { title: '闭杯闪点', dataIndex: 'flashPoint', key: 'flashPoint', width: 100 },
                { title: '保质期', dataIndex: 'shelfLife', key: 'shelfLife', width: 80 },
                { title: '主要功能', dataIndex: 'mainFunction', key: 'mainFunction', width: 100 },
                {
                  title: '推荐用量',
                  dataIndex: 'recommendedDosage',
                  key: 'recommendedDosage',
                  width: 100,
                  render: (dosage) => `${dosage} ppm`
                },
                {
                  title: '操作',
                  key: 'action',
                  width: 120,
                  fixed: 'right',
                  render: (_, record) => (
                    <Space>
                      <Button type="link" icon={<EyeOutlined />} size="small">
                        详情
                      </Button>
                      <Button type="link" icon={<EditOutlined />} size="small">
                        编辑
                      </Button>
                    </Space>
                  )
                }
              ]}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1500 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="合成香原料库" key="synthetic-materials">
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Input.Search
                  placeholder="搜索合成香原料"
                  style={{ width: 300 }}
                  onSearch={(value) => message.info(`搜索: ${value}`)}
                />
                <Button type="primary" icon={<PlusOutlined />}>
                  添加新原料
                </Button>
              </Space>
            </div>

            <Table
              dataSource={mockSyntheticMaterials}
              columns={[
                { title: '中文名称', dataIndex: 'chineseName', key: 'chineseName', width: 120 },
                { title: '英文名称', dataIndex: 'englishName', key: 'englishName', width: 150 },
                { title: 'CAS号', dataIndex: 'casNumber', key: 'casNumber', width: 100 },
                { title: 'FEMA号', dataIndex: 'femaNumber', key: 'femaNumber', width: 80 },
                { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 100 },
                { title: '厂家型号', dataIndex: 'supplierCode', key: 'supplierCode', width: 100 },
                {
                  title: '价格',
                  dataIndex: 'price',
                  key: 'price',
                  width: 100,
                  render: (price) => `¥${price}/kg`
                },
                {
                  title: '纯度',
                  dataIndex: 'purity',
                  key: 'purity',
                  width: 80,
                  render: (purity) => `${purity}%`
                },
                { title: '外观形态', dataIndex: 'appearance', key: 'appearance', width: 150 },
                { title: '合成方法', dataIndex: 'synthesisMethod', key: 'synthesisMethod', width: 120 },
                { title: '主要功能', dataIndex: 'mainFunction', key: 'mainFunction', width: 100 },
                {
                  title: '推荐用量',
                  dataIndex: 'recommendedDosage',
                  key: 'recommendedDosage',
                  width: 100,
                  render: (dosage) => `${dosage} ppm`
                },
                {
                  title: '操作',
                  key: 'action',
                  width: 120,
                  fixed: 'right',
                  render: (_, record) => (
                    <Space>
                      <Button type="link" icon={<EyeOutlined />} size="small">
                        详情
                      </Button>
                      <Button type="link" icon={<EditOutlined />} size="small">
                        编辑
                      </Button>
                    </Space>
                  )
                }
              ]}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1600 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="功能香基板块库" key="functional-base">
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Input.Search
                  placeholder="搜索功能香基板块"
                  style={{ width: 300 }}
                  onSearch={(value) => message.info(`搜索: ${value}`)}
                />
                <Button type="primary" icon={<PlusOutlined />}>
                  添加新板块
                </Button>
              </Space>
            </div>

            <Table
              dataSource={mockFunctionalBases}
              columns={[
                { title: '名称', dataIndex: 'name', key: 'name', width: 150 },
                { title: '型号', dataIndex: 'model', key: 'model', width: 120 },
                { title: '版本号', dataIndex: 'version', key: 'version', width: 80 },
                { title: '设计者', dataIndex: 'designer', key: 'designer', width: 100 },
                { title: '设计日期', dataIndex: 'designDate', key: 'designDate', width: 120 },
                { title: '外观形态', dataIndex: 'appearance', key: 'appearance', width: 150 },
                {
                  title: '相对密度',
                  dataIndex: 'relativeDensity',
                  key: 'relativeDensity',
                  width: 100
                },
                { title: '推荐用量', dataIndex: 'recommendedDosage', key: 'recommendedDosage', width: 120 },
                {
                  title: '操作',
                  key: 'action',
                  width: 120,
                  fixed: 'right',
                  render: (_, record) => (
                    <Space>
                      <Button type="link" icon={<EyeOutlined />} size="small">
                        详情
                      </Button>
                      <Button type="link" icon={<EditOutlined />} size="small">
                        编辑
                      </Button>
                    </Space>
                  )
                }
              ]}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="香精产品库" key="fragrance-products">
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Input.Search
                  placeholder="搜索香精产品"
                  style={{ width: 300 }}
                  onSearch={(value) => message.info(`搜索: ${value}`)}
                />
                <Button type="primary" icon={<PlusOutlined />}>
                  添加新产品
                </Button>
              </Space>
            </div>

            <Table
              dataSource={mockFragranceProducts}
              columns={[
                { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 180 },
                { title: '产品编号', dataIndex: 'productCode', key: 'productCode', width: 120 },
                { title: '产品类型', dataIndex: 'productType', key: 'productType', width: 120 },
                { title: '版本号', dataIndex: 'version', key: 'version', width: 80 },
                { title: '设计者', dataIndex: 'designer', key: 'designer', width: 100 },
                { title: '设计日期', dataIndex: 'designDate', key: 'designDate', width: 120 },
                { title: '外观形态', dataIndex: 'appearance', key: 'appearance', width: 150 },
                {
                  title: '相对密度',
                  dataIndex: 'relativeDensity',
                  key: 'relativeDensity',
                  width: 100
                },
                { title: '推荐用量', dataIndex: 'recommendedDosage', key: 'recommendedDosage', width: 120 },
                { title: '应用范围', dataIndex: 'applicationScope', key: 'applicationScope', width: 200 },
                {
                  title: '操作',
                  key: 'action',
                  width: 120,
                  fixed: 'right',
                  render: (_, record) => (
                    <Space>
                      <Button type="link" icon={<EyeOutlined />} size="small">
                        详情
                      </Button>
                      <Button type="link" icon={<EditOutlined />} size="small">
                        编辑
                      </Button>
                    </Space>
                  )
                }
              ]}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1400 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
  // 渲染技术评价体系模块
  const renderTechnicalEvaluation = () => (
    <div style={{ padding: '24px' }}>
      <Title level={3}>
        <StarOutlined style={{ color: '#eb2f96', marginRight: 8 }} />
        技术评价体系
      </Title>
      <Paragraph type="secondary">
        对香原料和配方进行全面的技术评价，包括嗅香评价、感官评价和功能评价
      </Paragraph>

      <Tabs defaultActiveKey="group-evaluation">
        <TabPane tab="集体评价" key="group-evaluation">
          <Card title="集体评价任务">
            <Row gutter={24}>
              <Col span={8}>
                <Card size="small" title="待评价原料">
                  <List
                    dataSource={mockNaturalMaterials}
                    renderItem={(material) => (
                      <List.Item
                        actions={[
                          <Button type="link" size="small">
                            开始评价
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          title={material.chineseName}
                          description={`供应商：${material.supplier}`}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>

              <Col span={16}>
                <Card title="评价表单" size="small">
                  <Form layout="vertical">
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="评价原料">
                          <Select placeholder="选择要评价的原料" style={{ width: '100%' }}>
                            {mockNaturalMaterials.map(material => (
                              <Option key={material.id} value={material.id}>
                                {material.chineseName}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="溶剂">
                          <Select defaultValue="PG" style={{ width: '100%' }}>
                            <Option value="PG">丙二醇 (PG)</Option>
                            <Option value="ethanol">乙醇</Option>
                            <Option value="water">水</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="稀释倍数">
                          <InputNumber min={1} max={1000} defaultValue={100} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Divider orientation="left">嗅香评价（0-9分）</Divider>
                    <Row gutter={[16, 16]}>
                      {['清香', '果香', '木香', '花香', '草香', '豆香', '可可香', '烘焙香', '甜香'].map(dimension => (
                        <Col span={8} key={dimension}>
                          <Form.Item label={dimension}>
                            <InputNumber min={0} max={9} defaultValue={3} style={{ width: '100%' }} />
                          </Form.Item>
                        </Col>
                      ))}
                    </Row>
                    <Row gutter={16} style={{ marginTop: 16 }}>
                      <Col span={8}>
                        <Form.Item label="嗅香香气强度 (0-9分)">
                          <InputNumber min={0} max={9} defaultValue={5} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="嗅香香气符合度 (0-9分)">
                          <InputNumber min={0} max={9} defaultValue={5} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Divider orientation="left">感官评价（0-9分）</Divider>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="感官香气强度">
                          <InputNumber min={0} max={9} defaultValue={5} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="协调性">
                          <InputNumber min={0} max={9} defaultValue={5} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="感官香气符合度">
                          <InputNumber min={0} max={9} defaultValue={5} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Divider orientation="left">功能评价（-5到+5分）</Divider>
                    <Row gutter={[16, 8]}>
                      {[
                        '香气品质', '香气量感', '杂气', '香气丰富度',
                        '烟气浓度', '烟气成团性', '烟气甜润感', '咽喉刺激性',
                        '余味干净度', '余味甜润感', '甜味', '苦味'
                      ].map(item => (
                        <Col span={6} key={item}>
                          <Form.Item label={item}>
                            <InputNumber min={-5} max={5} defaultValue={0} style={{ width: '100%' }} />
                          </Form.Item>
                        </Col>
                      ))}
                    </Row>

                    <Divider orientation="left">品质评价和推荐用量</Divider>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="功能分类">
                          <Select placeholder="选择功能分类" style={{ width: '100%' }}>
                            <Option value="特征香">特征香</Option>
                            <Option value="增香">增香</Option>
                            <Option value="增浓">增浓</Option>
                            <Option value="增甜">增甜</Option>
                            <Option value="掩杂">掩杂</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="品质评价">
                          <Select placeholder="选择品质等级" style={{ width: '100%' }}>
                            <Option value="A">A级</Option>
                            <Option value="B">B级</Option>
                            <Option value="C">C级</Option>
                            <Option value="D">D级</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="推荐用量 (ppm)">
                          <InputNumber min={0} max={10000} defaultValue={100} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item>
                      <Space>
                        <Button type="primary" icon={<CheckCircleOutlined />}>
                          提交评价
                        </Button>
                        <Button>重置</Button>
                      </Space>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>

        <TabPane tab="个人评价" key="personal-evaluation">
          <Card>
            <Alert
              message="个人评价"
              description="个人独立进行的技术评价，评价结果仅对个人可见"
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Text type="secondary">个人评价界面（结构同集体评价）</Text>
            </div>
          </Card>
        </TabPane>

        <TabPane tab="卷烟产品评价" key="cigarette-evaluation">
          <Card title="卷烟产品技术评价">
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="产品名称">
                    <Input placeholder="例如：经典1902" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="焦油量 (mg)">
                    <InputNumber min={0} max={20} defaultValue={10} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="烟气烟碱量 (mg)">
                    <InputNumber min={0} max={5} step={0.1} defaultValue={1.0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">国标技术评价</Divider>
              <Row gutter={16}>
                <Col span={4}>
                  <Form.Item label="光泽 (0-5)">
                    <InputNumber min={0} max={5} step={0.1} defaultValue={4.0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="香气 (0-32)">
                    <InputNumber min={0} max={32} step={0.1} defaultValue={28.0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="谐调 (0-6)">
                    <InputNumber min={0} max={6} step={0.1} defaultValue={5.0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="杂气 (0-12)">
                    <InputNumber min={-12} max={0} step={0.1} defaultValue={-2.0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="刺激性 (0-20)">
                    <InputNumber min={-20} max={0} step={0.1} defaultValue={-3.0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="余味 (0-25)">
                    <InputNumber min={0} max={25} step={0.1} defaultValue={20.0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">中式卷烟风格感官技术评价</Divider>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item label="烤烟烟香(嗅香) (0-10)">
                    <InputNumber min={0} max={10} defaultValue={2} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="烤烟烟香(评吸) (0-10)">
                    <InputNumber min={0} max={10} defaultValue={8} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="果香(评吸) (0-10)">
                    <InputNumber min={0} max={10} defaultValue={5} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="膏香(评吸) (0-10)">
                    <InputNumber min={0} max={10} defaultValue={4} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">卷烟感官舒适性技术评价 (0-10)</Divider>
              <Row gutter={[16, 8]}>
                {[
                  '口腔刺激-刺', '口腔余味-残留', '口腔味觉特征-甜',
                  '喉部刺激', '喉部干燥', '鼻腔刺激',
                  '烟气感受-细腻', '烟气感受-柔和', '烟气感受-圆润'
                ].map(item => (
                  <Col span={8} key={item}>
                    <Form.Item label={item}>
                      <InputNumber min={0} max={10} defaultValue={5} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                ))}
              </Row>

              <Form.Item>
                <Space>
                  <Button type="primary" icon={<CheckCircleOutlined />}>
                    提交评价
                  </Button>
                  <Button>重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
  // 渲染模态框组件
  const renderModals = () => (
    <>
      {/* 香原料详情模态框 */}
      <Modal
        title="香原料详情"
        open={materialDetailModalVisible}
        onCancel={() => setMaterialDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedMaterial && (
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <Title level={4}>{selectedMaterial.name}</Title>
                <Paragraph>{selectedMaterial.description}</Paragraph>
                <Space wrap>
                  {selectedMaterial.keyFeatures.map(feature => (
                    <Tag key={feature} color="blue">{feature}</Tag>
                  ))}
                </Space>
              </Col>
              <Col span={12}>
                <Statistic title="匹配度" value={selectedMaterial.matchRate} suffix="%" />
                <Statistic title="价格" value={selectedMaterial.price} prefix="¥" suffix="/kg" />
                <Statistic title="库存" value={selectedMaterial.stock} suffix="kg" />
                <Statistic title="供应商" value={selectedMaterial.supplier} />
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      {/* 技术评价模态框 */}
      <Modal
        title="技术评价"
        open={evaluationModalVisible}
        onCancel={() => setEvaluationModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="推荐质量评分">
            <Rate allowHalf defaultValue={4} style={{ fontSize: 24 }} />
          </Form.Item>
          <Form.Item label="评价备注">
            <TextArea rows={4} placeholder="请输入您的评价意见..." />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" onClick={() => {
                message.success('评价提交成功')
                setEvaluationModalVisible(false)
              }}>
                提交评价
              </Button>
              <Button onClick={() => setEvaluationModalVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
  // 主界面渲染
  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      {/* 页面标题和统计卡片 */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <ExperimentOutlined style={{ color: '#1890ff', marginRight: 12 }} />
          香精香料数字化设计平台
        </Title>
        <Paragraph type="secondary" style={{ fontSize: 16 }}>
          基于AI技术的智能选香、仿香、调香一体化解决方案
        </Paragraph>

        {/* 统计卡片 */}
        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="配方总数"
                value={156}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="原料库存"
                value={2340}
                suffix="kg"
                prefix={<InboxOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="评价任务"
                value={28}
                prefix={<StarOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="AI推荐成功率"
                value={92.5}
                suffix="%"
                prefix={<TrophyOutlined />}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* 主要功能标签页 */}
      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          size="large"
          tabBarStyle={{ marginBottom: 24 }}
        >
          <TabPane
            tab={
              <span>
                <BulbOutlined />
                智能选香
              </span>
            }
            key="intelligent-selection"
          >
            {renderIntelligentSelection()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <ExperimentOutlined />
                智能仿香
              </span>
            }
            key="intelligent-imitation"
          >
            {renderIntelligentImitation()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <ThunderboltOutlined />
                智能调香
              </span>
            }
            key="intelligent-creation"
          >
            {renderIntelligentCreation()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <DatabaseOutlined />
                数据库管理
              </span>
            }
            key="database-management"
          >
            {renderDatabaseManagement()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <StarOutlined />
                技术评价
              </span>
            }
            key="technical-evaluation"
          >
            {renderTechnicalEvaluation()}
          </TabPane>
        </Tabs>
      </Card>

      {/* 模态框 */}
      {renderModals()}
    </div>
  )
}

export default FlavorManagement

