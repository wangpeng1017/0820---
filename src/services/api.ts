import axios from 'axios'
import { message } from 'antd'
import type { ApiResponse, PaginatedResponse } from '../types'

// 创建axios实例
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证token
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    const { data } = response
    
    // 如果是成功响应，直接返回数据
    if (data.success) {
      return data
    }
    
    // 如果是失败响应，显示错误信息
    message.error(data.message || '请求失败')
    return Promise.reject(new Error(data.message || '请求失败'))
  },
  (error) => {
    // 处理HTTP错误
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          message.error('未授权，请重新登录')
          // 清除本地存储的认证信息
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_user')
          // 跳转到登录页
          window.location.href = '/login'
          break
        case 403:
          message.error('权限不足')
          break
        case 404:
          message.error('请求的资源不存在')
          break
        case 500:
          message.error('服务器内部错误')
          break
        default:
          message.error(data?.message || '请求失败')
      }
    } else if (error.request) {
      message.error('网络错误，请检查网络连接')
    } else {
      message.error('请求配置错误')
    }
    
    return Promise.reject(error)
  }
)

// API方法
export const authAPI = {
  // 登录
  login: (username: string, password: string): Promise<ApiResponse> =>
    api.post('/auth/login', { username, password }),
  
  // 登出
  logout: (): Promise<ApiResponse> =>
    api.post('/auth/logout'),
  
  // 刷新token
  refreshToken: (): Promise<ApiResponse> =>
    api.post('/auth/refresh'),
  
  // 检查权限
  checkPermission: (permission: string): Promise<ApiResponse> =>
    api.post('/auth/check-permission', { permission })
}

export const projectAPI = {
  // 获取项目列表
  getList: (params?: any): Promise<PaginatedResponse<any>> =>
    api.get('/projects', { params }),
  
  // 获取项目详情
  getDetail: (id: string): Promise<ApiResponse> =>
    api.get(`/projects/${id}`),
  
  // 创建项目
  create: (data: any): Promise<ApiResponse> =>
    api.post('/projects', data),
  
  // 更新项目
  update: (id: string, data: any): Promise<ApiResponse> =>
    api.put(`/projects/${id}`, data),
  
  // 删除项目
  delete: (id: string): Promise<ApiResponse> =>
    api.delete(`/projects/${id}`)
}

export const formulaAPI = {
  // 获取配方列表
  getList: (params?: any): Promise<PaginatedResponse<any>> =>
    api.get('/formulas', { params }),
  
  // 获取配方详情
  getDetail: (id: string): Promise<ApiResponse> =>
    api.get(`/formulas/${id}`),
  
  // 创建配方
  create: (data: any): Promise<ApiResponse> =>
    api.post('/formulas', data),
  
  // 更新配方
  update: (id: string, data: any): Promise<ApiResponse> =>
    api.put(`/formulas/${id}`, data),
  
  // 删除配方
  delete: (id: string): Promise<ApiResponse> =>
    api.delete(`/formulas/${id}`),
  
  // 获取配方版本
  getVersions: (id: string): Promise<ApiResponse> =>
    api.get(`/formulas/${id}/versions`),
  
  // 配方比对
  compare: (id1: string, id2: string): Promise<ApiResponse> =>
    api.get(`/formulas/compare?id1=${id1}&id2=${id2}`)
}

export const qualityAPI = {
  // 获取质量检测列表
  getTests: (params?: any): Promise<PaginatedResponse<any>> =>
    api.get('/quality-tests', { params }),
  
  // 获取检测详情
  getTestDetail: (id: string): Promise<ApiResponse> =>
    api.get(`/quality-tests/${id}`),
  
  // 创建检测任务
  createTest: (data: any): Promise<ApiResponse> =>
    api.post('/quality-tests', data),
  
  // 更新检测结果
  updateTest: (id: string, data: any): Promise<ApiResponse> =>
    api.put(`/quality-tests/${id}`, data),
  
  // 生成质量报告
  generateReport: (id: string): Promise<ApiResponse> =>
    api.post(`/quality-tests/${id}/report`)
}

export const marketAPI = {
  // 获取市场洞察列表
  getInsights: (params?: any): Promise<PaginatedResponse<any>> =>
    api.get('/market-insights', { params }),
  
  // 语音识别分析
  analyzeVoice: (file: File): Promise<ApiResponse> => {
    const formData = new FormData()
    formData.append('audio', file)
    return api.post('/market-insights/voice-analysis', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  // 消费群体分析
  analyzeConsumer: (data: any): Promise<ApiResponse> =>
    api.post('/market-insights/consumer-analysis', data),
  
  // 生成调研问卷
  generateSurvey: (data: any): Promise<ApiResponse> =>
    api.post('/market-insights/generate-survey', data)
}

export const researchAPI = {
  // AI问答
  askQuestion: (question: string, context?: string): Promise<ApiResponse> =>
    api.post('/research-assistant/ask', { question, context }),
  
  // 上传文档到知识库
  uploadDocument: (file: File): Promise<ApiResponse> => {
    const formData = new FormData()
    formData.append('document', file)
    return api.post('/research-assistant/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  // 搜索知识库
  searchKnowledge: (query: string): Promise<ApiResponse> =>
    api.get('/research-assistant/search', { params: { query } }),
  
  // 生成实验方案
  generateExperiment: (data: any): Promise<ApiResponse> =>
    api.post('/research-assistant/generate-experiment', data)
}

export default api
