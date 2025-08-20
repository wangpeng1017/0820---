// 用户相关类型
export interface User {
  id: string
  username: string
  name: string
  role: string
  department: string
  avatar?: string
  permissions: string[]
}

// 项目相关类型
export interface Project {
  id: string
  name: string
  description: string
  status: 'planning' | 'design' | 'testing' | 'production' | 'completed'
  progress: number
  startDate: string
  endDate?: string
  manager: string
  team: string[]
  priority: 'low' | 'medium' | 'high'
  category: string
}

// 配方相关类型
export interface Formula {
  id: string
  name: string
  version: string
  category: 'tobacco' | 'flavor' | 'material'
  status: 'draft' | 'testing' | 'approved' | 'archived'
  creator: string
  createTime: string
  updateTime: string
  description: string
  ingredients: Ingredient[]
  cost: number
  properties: Record<string, any>
}

export interface Ingredient {
  id: string
  name: string
  type: string
  ratio: number
  unit: string
  supplier?: string
  grade?: string
  notes?: string
}

// 质量管理相关类型
export interface QualityTest {
  id: string
  sampleId: string
  testType: string
  testDate: string
  tester: string
  status: 'pending' | 'testing' | 'completed' | 'failed'
  results: TestResult[]
  conclusion: string
  notes?: string
}

export interface TestResult {
  parameter: string
  value: number | string
  unit: string
  standard: string
  result: 'pass' | 'fail' | 'warning'
}

// 市场洞察相关类型
export interface MarketInsight {
  id: string
  title: string
  type: 'consumer_research' | 'market_analysis' | 'competitor_analysis'
  date: string
  analyst: string
  summary: string
  data: Record<string, any>
  recommendations: string[]
}

export interface ConsumerProfile {
  id: string
  segment: string
  demographics: {
    age: string
    gender: string
    income: string
    location: string
  }
  preferences: {
    flavor: string[]
    price: string
    packaging: string[]
  }
  behavior: {
    frequency: string
    occasions: string[]
    channels: string[]
  }
}

// 实验管理相关类型
export interface Experiment {
  id: string
  title: string
  type: 'product_test' | 'material_test' | 'process_test'
  status: 'planned' | 'running' | 'completed' | 'cancelled'
  startDate: string
  endDate?: string
  researcher: string
  objective: string
  methodology: string
  results?: ExperimentResult[]
  conclusion?: string
}

export interface ExperimentResult {
  parameter: string
  value: number | string
  unit: string
  notes?: string
}

// 通用响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message: string
  code: number
}

// 分页类型
export interface PaginationParams {
  page: number
  pageSize: number
  total?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    current: number
    pageSize: number
    total: number
  }
}

// 搜索和过滤类型
export interface SearchParams {
  keyword?: string
  filters?: Record<string, any>
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// 文件上传类型
export interface FileUpload {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadTime: string
  uploader: string
}

// 通知类型
export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  time: string
  read: boolean
  action?: {
    text: string
    url: string
  }
}
