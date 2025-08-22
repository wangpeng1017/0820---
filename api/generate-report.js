const fetch = require('node-fetch')

// Google Gemini API配置
const GEMINI_CONFIG = {
  apiKey: process.env.GOOGLE_GEMINI_API_KEY || '',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
}

// 报告模板定义
const REPORT_TEMPLATES = {
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

// 分析维度定义
const ANALYSIS_DIMENSIONS = {
  market: { name: '市场环境', description: '分析市场规模、增长趋势和竞争格局' },
  consumer: { name: '消费者行为', description: '研究目标用户需求和消费习惯' },
  technology: { name: '技术趋势', description: '探索相关技术发展和应用前景' },
  design: { name: '设计创新', description: '分析设计趋势和创新机会' },
  brand: { name: '品牌策略', description: '制定品牌定位和传播策略' },
  cost: { name: '成本分析', description: '评估成本结构和优化方案' },
  risk: { name: '风险评估', description: '识别潜在风险和应对措施' },
  sustainability: { name: '可持续性', description: '分析环保要求和可持续发展' }
}

// 构建报告生成提示词
function buildReportPrompt(reportType, analysisScope, projectContext, requirements, additionalInfo) {
  const template = REPORT_TEMPLATES[reportType]
  if (!template) {
    throw new Error(`未知的报告类型: ${reportType}`)
  }

  const scopeDescriptions = analysisScope.map(scope => {
    const dimension = ANALYSIS_DIMENSIONS[scope]
    return dimension ? `${dimension.name}: ${dimension.description}` : scope
  }).join('\n')

  const prompt = `
请生成一份专业的${template.name}，要求如下：

## 报告基本信息
- 报告类型：${template.name}
- 报告描述：${template.description}
- 分析维度：
${scopeDescriptions}

## 项目背景
${projectContext || '无特定项目背景'}

## 具体需求
${requirements || '无特定需求'}

## 补充信息
${additionalInfo || '无补充信息'}

## 输出要求
请按照以下JSON格式输出报告内容：

{
  "title": "报告标题",
  "summary": "执行摘要（200-300字）",
  "sections": [
    {
      "title": "章节标题",
      "content": "章节内容（详细分析，500-800字）",
      "subsections": [
        {
          "title": "子章节标题",
          "content": "子章节内容（200-400字）"
        }
      ]
    }
  ],
  "recommendations": [
    "建议1",
    "建议2",
    "建议3"
  ],
  "conclusion": "结论总结（200-300字）"
}

## 内容要求
1. 内容要专业、详细、有深度
2. 数据分析要有逻辑性
3. 建议要具体可执行
4. 语言要简洁明了
5. 结构要清晰完整

请确保输出的是有效的JSON格式，不要包含任何其他文本。
`

  return prompt
}

// Google Gemini API调用
async function callGeminiAPI(prompt) {
  const url = `${GEMINI_CONFIG.baseUrl}?key=${GEMINI_CONFIG.apiKey}`
  
  const payload = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
    }
  }
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
    }
    
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Google Gemini API调用失败:', error)
    throw error
  }
}

// 解析Gemini API响应并提取报告内容
function parseGeminiResponse(response) {
  try {
    if (!response.candidates || response.candidates.length === 0) {
      throw new Error('API响应中没有生成内容')
    }

    const candidate = response.candidates[0]
    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      throw new Error('API响应格式错误')
    }

    const text = candidate.content.parts[0].text
    
    // 尝试解析JSON
    let reportData
    try {
      // 清理可能的markdown代码块标记
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      reportData = JSON.parse(cleanText)
    } catch (parseError) {
      console.error('JSON解析失败，原始文本:', text)
      throw new Error('生成的报告格式不正确，请重试')
    }

    // 验证报告数据结构
    if (!reportData.title || !reportData.summary || !reportData.sections || !reportData.recommendations || !reportData.conclusion) {
      throw new Error('生成的报告缺少必要字段')
    }

    return reportData
  } catch (error) {
    console.error('解析Gemini响应失败:', error)
    throw error
  }
}

// Vercel serverless函数处理器
export default async function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  
  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  try {
    // 解析JSON body（Vercel serverless函数需要手动解析）
    let body
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    } catch (parseError) {
      console.error('JSON解析错误:', parseError)
      return res.status(400).json({ error: 'Invalid JSON' })
    }

    const { reportType, analysisScope, projectContext, requirements, additionalInfo } = body

    // 验证必需参数
    if (!reportType) {
      return res.status(400).json({ error: '缺少reportType参数' })
    }

    if (!analysisScope || !Array.isArray(analysisScope) || analysisScope.length === 0) {
      return res.status(400).json({ error: '缺少analysisScope参数或格式错误' })
    }

    // 验证API密钥
    if (!GEMINI_CONFIG.apiKey) {
      return res.status(500).json({ 
        error: 'Google Gemini API密钥未配置，请检查环境变量GOOGLE_GEMINI_API_KEY' 
      })
    }

    // 构建提示词
    const prompt = buildReportPrompt(reportType, analysisScope, projectContext, requirements, additionalInfo)
    
    // 调用Gemini API
    const geminiResponse = await callGeminiAPI(prompt)
    
    // 解析响应
    const reportData = parseGeminiResponse(geminiResponse)
    
    // 返回成功响应
    res.json({
      success: true,
      report: reportData
    })
    
  } catch (error) {
    console.error('报告生成失败:', error)
    res.status(500).json({
      success: false,
      error: error.message || '报告生成失败，请稍后重试'
    })
  }
}
