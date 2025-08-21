// Google Gemini API 服务

// 报告生成请求接口
export interface ReportGenerationRequest {
  reportType: string
  analysisScope: string[]
  projectContext?: string
  requirements?: string
  additionalInfo?: string
}

// 报告生成响应接口
export interface ReportGenerationResponse {
  success: boolean
  report?: {
    title: string
    summary: string
    sections: ReportSection[]
    recommendations: string[]
    conclusion: string
  }
  error?: string
}

// 报告章节接口
export interface ReportSection {
  title: string
  content: string
  subsections?: {
    title: string
    content: string
  }[]
}

// 通过代理服务器调用Google Gemini API生成报告
export async function generateIntelligentReport(request: ReportGenerationRequest): Promise<ReportGenerationResponse> {
  try {
    const response = await fetch('http://localhost:3002/api/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (result.success) {
      return result
    } else {
      throw new Error(result.error || 'Report generation failed')
    }
  } catch (error) {
    console.error('Error generating intelligent report:', error)

    // 提供更友好的错误信息
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('ECONNREFUSED')) {
        throw new Error('🔌 代理服务器连接失败\n\n请确保：\n1. 代理服务器已启动（端口3002）\n2. 运行命令：cd server && npm install && npm start\n3. 检查控制台是否有错误信息')
      } else if (error.message.includes('HTTP error')) {
        throw new Error(`🌐 API调用失败：${error.message}\n\n可能的原因：\n1. Google Gemini API密钥配置错误\n2. 网络连接问题\n3. API服务暂时不可用\n\n请检查.env文件中的API密钥配置`)
      } else if (error.message.includes('Report generation failed')) {
        throw new Error('📊 报告生成失败\n\n可能的原因：\n1. 输入信息不够详细\n2. API请求超时\n3. 内容不符合生成要求\n\n请尝试：\n1. 提供更详细的需求描述\n2. 稍后重试')
      }
    }

    throw new Error(`🚫 未知错误：${error}\n\n请联系技术支持或稍后重试`)
  }
}

// 预定义的报告模板
export const REPORT_TEMPLATES = {
  market_analysis: {
    name: '市场分析报告',
    description: '深度分析市场环境、竞争格局和发展趋势',
    sections: ['市场概况', '竞争分析', '消费者洞察', '趋势预测', '机会识别']
  },
  design_strategy: {
    name: '设计策略报告',
    description: '制定产品设计策略和创新方向',
    sections: ['设计目标', '用户需求', '设计原则', '创新方向', '实施计划']
  },
  product_planning: {
    name: '产品策划报告',
    description: '全面的产品策划和开发建议',
    sections: ['产品定位', '功能规划', '技术路线', '市场策略', '风险评估']
  },
  innovation_research: {
    name: '创新研究报告',
    description: '探索创新机会和技术发展方向',
    sections: ['技术趋势', '创新机会', '研发建议', '投资分析', '实施路径']
  },
  comprehensive: {
    name: '综合策划报告',
    description: '涵盖市场、设计、产品等多维度的综合分析',
    sections: ['执行摘要', '市场分析', '设计策略', '产品规划', '实施建议', '风险管控']
  }
}

// 分析维度选项
export const ANALYSIS_DIMENSIONS = {
  market: { name: '市场环境', description: '分析市场规模、增长趋势和竞争格局' },
  consumer: { name: '消费者行为', description: '研究目标用户需求和消费习惯' },
  technology: { name: '技术趋势', description: '探索相关技术发展和应用前景' },
  design: { name: '设计创新', description: '分析设计趋势和创新机会' },
  brand: { name: '品牌策略', description: '制定品牌定位和传播策略' },
  cost: { name: '成本分析', description: '评估成本结构和优化方案' },
  risk: { name: '风险评估', description: '识别潜在风险和应对措施' },
  sustainability: { name: '可持续性', description: '分析环保要求和可持续发展' }
}
