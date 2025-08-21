const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')
const crypto = require('crypto')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const app = express()
const PORT = 3002

// 中间件
app.use(cors())
app.use(express.json({ limit: '50mb' }))

// 火山引擎API配置
const VOLCENGINE_CONFIG = {
  accessKeyId: process.env.VITE_VOLCENGINE_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.VITE_VOLCENGINE_SECRET_ACCESS_KEY || '',
  region: 'cn-north-1',
  service: 'cv',
  host: 'visual.volcengineapi.com',
  version: '2022-08-31'
}

console.log('🔑 火山引擎API配置:')
console.log('Access Key ID:', VOLCENGINE_CONFIG.accessKeyId ? VOLCENGINE_CONFIG.accessKeyId.substring(0, 10) + '...' : '未配置')
console.log('Secret Key:', VOLCENGINE_CONFIG.secretAccessKey ? VOLCENGINE_CONFIG.secretAccessKey.substring(0, 10) + '...' : '未配置')

// Google Gemini API配置
const GEMINI_CONFIG = {
  apiKey: process.env.GOOGLE_GEMINI_API_KEY || '',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
}

// 生成签名
function generateSignature(method, uri, query, headers, payload, timestamp) {
  const algorithm = 'HMAC-SHA256'
  const credentialScope = `${timestamp.substr(0, 8)}/${VOLCENGINE_CONFIG.region}/${VOLCENGINE_CONFIG.service}/request`
  
  // 创建规范请求
  const canonicalHeaders = Object.keys(headers)
    .sort()
    .map(key => `${key.toLowerCase()}:${headers[key]}`)
    .join('\n') + '\n'
  
  const signedHeaders = Object.keys(headers)
    .sort()
    .map(key => key.toLowerCase())
    .join(';')
  
  const hashedPayload = crypto.createHash('sha256').update(payload).digest('hex')
  
  const canonicalRequest = [
    method,
    uri,
    query,
    canonicalHeaders,
    signedHeaders,
    hashedPayload
  ].join('\n')
  
  // 创建待签名字符串
  const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex')
  const stringToSign = [
    algorithm,
    timestamp,
    credentialScope,
    hashedCanonicalRequest
  ].join('\n')
  
  // 计算签名
  const kDate = crypto.createHmac('sha256', VOLCENGINE_CONFIG.secretAccessKey).update(timestamp.substr(0, 8)).digest()
  const kRegion = crypto.createHmac('sha256', kDate).update(VOLCENGINE_CONFIG.region).digest()
  const kService = crypto.createHmac('sha256', kRegion).update(VOLCENGINE_CONFIG.service).digest()
  const kSigning = crypto.createHmac('sha256', kService).update('request').digest()
  const signature = crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex')
  
  return signature
}

// 创建请求头
function createHeaders(payload) {
  const timestamp = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, '')
  const date = timestamp.substr(0, 8)
  
  const headers = {
    'Content-Type': 'application/json',
    'Host': VOLCENGINE_CONFIG.host,
    'X-Date': timestamp,
    'X-Content-Sha256': crypto.createHash('sha256').update(payload).digest('hex')
  }
  
  const signature = generateSignature('POST', '/', '', headers, payload, timestamp)
  const credentialScope = `${date}/${VOLCENGINE_CONFIG.region}/${VOLCENGINE_CONFIG.service}/request`
  const authorization = `HMAC-SHA256 Credential=${VOLCENGINE_CONFIG.accessKeyId}/${credentialScope}, SignedHeaders=content-type;host;x-content-sha256;x-date, Signature=${signature}`
  
  return {
    ...headers,
    'Authorization': authorization
  }
}

// 验证API配置
function validateApiConfig() {
  if (!VOLCENGINE_CONFIG.accessKeyId || !VOLCENGINE_CONFIG.secretAccessKey) {
    throw new Error('火山引擎API密钥未配置')
  }
}

// 验证Gemini API配置
function validateGeminiConfig() {
  if (!GEMINI_CONFIG.apiKey) {
    throw new Error('Google Gemini API密钥未配置')
  }
}

// 文生图API代理
app.post('/api/text-to-image', async (req, res) => {
  try {
    validateApiConfig()

    const action = 'CVProcess'
    const payload = JSON.stringify({
      req_key: 'jimeng_high_aes_general_v21_L',
      prompt: req.body.prompt,
      return_url: true
    })
    
    const headers = createHeaders(payload)
    
    console.log('Making API request to:', `https://${VOLCENGINE_CONFIG.host}/?Action=${action}&Version=${VOLCENGINE_CONFIG.version}`)
    console.log('Request headers:', JSON.stringify(headers, null, 2))
    console.log('Request payload:', payload)

    const response = await fetch(`https://${VOLCENGINE_CONFIG.host}/?Action=${action}&Version=${VOLCENGINE_CONFIG.version}`, {
      method: 'POST',
      headers,
      body: payload
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2))

    if (!response.ok) {
      const errorText = await response.text()
      console.log('Error response body:', errorText)
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
    }
    
    const result = await response.json()

    if (result.data && result.data.image_urls && result.data.image_urls.length > 0) {
      res.json({ success: true, image: result.data.image_urls[0] })
    } else {
      res.status(400).json({ success: false, error: 'No image generated' })
    }
  } catch (error) {
    console.error('Text to image error:', error)
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    })
  }
})

// 图生图API代理
app.post('/api/image-to-image', async (req, res) => {
  try {
    validateApiConfig()

    const action = 'CVProcess'
    const payload = JSON.stringify({
      req_key: 'jimeng_img2img_high_aes_general_v21_L',
      prompt: req.body.prompt,
      image: req.body.image,
      return_url: true
    })
    
    const headers = createHeaders(payload)
    
    const response = await fetch(`https://${VOLCENGINE_CONFIG.host}/?Action=${action}&Version=${VOLCENGINE_CONFIG.version}`, {
      method: 'POST',
      headers,
      body: payload
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()

    if (result.data && result.data.image_urls && result.data.image_urls.length > 0) {
      res.json({ success: true, image: result.data.image_urls[0] })
    } else {
      res.status(400).json({ success: false, error: 'No image generated' })
    }
  } catch (error) {
    console.error('Image to image error:', error)
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    })
  }
})

// 智能报告生成API代理
app.post('/api/generate-report', async (req, res) => {
  try {
    validateGeminiConfig()

    const { reportType, analysisScope, projectContext, requirements, additionalInfo } = req.body

    // 构建提示词
    const prompt = buildReportPrompt(reportType, analysisScope, projectContext, requirements, additionalInfo)

    const requestBody = {
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

    const response = await fetch(`${GEMINI_CONFIG.baseUrl}?key=${GEMINI_CONFIG.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (result.candidates && result.candidates.length > 0) {
      const generatedText = result.candidates[0].content.parts[0].text
      const parsedReport = parseGeneratedReport(generatedText, reportType)

      res.json({
        success: true,
        report: parsedReport
      })
    } else {
      res.status(400).json({ success: false, error: 'No report generated' })
    }
  } catch (error) {
    console.error('Report generation error:', error)
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    })
  }
})

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 构建报告生成提示词
function buildReportPrompt(reportType, analysisScope, projectContext, requirements, additionalInfo) {
  const reportTypeMap = {
    market_analysis: '市场分析报告',
    design_strategy: '设计策略报告',
    product_planning: '产品策划报告',
    innovation_research: '创新研究报告',
    comprehensive: '综合策划报告'
  }

  const scopeMap = {
    market: '市场环境分析',
    consumer: '消费者行为研究',
    technology: '技术趋势分析',
    design: '设计创新研究',
    brand: '品牌策略制定',
    cost: '成本结构分析',
    risk: '风险评估分析',
    sustainability: '可持续性评估'
  }

  let prompt = `请生成一份专业的${reportTypeMap[reportType] || '策划报告'}，针对烟草行业的数字化研发设计项目。

报告要求：
- 报告类型：${reportTypeMap[reportType] || reportType}
- 分析维度：${analysisScope.map(scope => scopeMap[scope] || scope).join('、')}
${projectContext ? `- 项目背景：${projectContext}` : ''}
${requirements ? `- 具体需求：${requirements}` : ''}
${additionalInfo ? `- 补充信息：${additionalInfo}` : ''}

请按照以下结构生成报告，使用JSON格式返回：

{
  "title": "报告标题",
  "summary": "执行摘要（200-300字）",
  "sections": [
    {
      "title": "章节标题",
      "content": "章节内容（详细分析）",
      "subsections": [
        {
          "title": "子章节标题",
          "content": "子章节内容"
        }
      ]
    }
  ],
  "recommendations": [
    "具体建议1",
    "具体建议2",
    "具体建议3"
  ],
  "conclusion": "结论总结（150-200字）"
}

要求：
1. 内容要专业、详实，符合烟草行业特点
2. 分析要有深度，提供可操作的建议
3. 语言要规范，逻辑要清晰
4. 数据和观点要有说服力
5. 严格按照JSON格式返回，不要包含其他文本`

  return prompt
}

// 解析生成的报告
function parseGeneratedReport(generatedText, reportType) {
  try {
    // 尝试解析JSON
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const reportData = JSON.parse(jsonMatch[0])
      return reportData
    }
  } catch (error) {
    console.error('JSON parsing failed, using fallback parsing:', error)
  }

  // 如果JSON解析失败，使用备用解析方法
  const fallbackReport = {
    title: `${getReportTypeName(reportType)} - ${new Date().toLocaleDateString()}`,
    summary: extractSection(generatedText, '摘要', '执行摘要', '概述') || '本报告基于当前市场环境和技术发展趋势，为烟草行业数字化研发设计提供专业分析和建议。',
    sections: parseSections(generatedText),
    recommendations: extractRecommendations(generatedText),
    conclusion: extractSection(generatedText, '结论', '总结', '结语') || '通过综合分析，建议企业加强数字化转型，提升产品创新能力，以适应市场发展需求。'
  }

  return fallbackReport
}

// 获取报告类型名称
function getReportTypeName(reportType) {
  const typeMap = {
    market_analysis: '市场分析报告',
    design_strategy: '设计策略报告',
    product_planning: '产品策划报告',
    innovation_research: '创新研究报告',
    comprehensive: '综合策划报告'
  }
  return typeMap[reportType] || '策划报告'
}

// 提取章节内容
function extractSection(text, ...keywords) {
  for (const keyword of keywords) {
    const regex = new RegExp(`${keyword}[：:]?([\\s\\S]*?)(?=\\n\\n|\\n[一二三四五六七八九十]|\\n\\d+\\.|$)`, 'i')
    const match = text.match(regex)
    if (match && match[1]) {
      return match[1].trim()
    }
  }
  return null
}

// 解析章节
function parseSections(text) {
  const sections = []
  const sectionRegex = /([一二三四五六七八九十]+[、．.]|第[一二三四五六七八九十]+章|第[一二三四五六七八九十]+部分|\d+[、．.])\s*([^\n]+)\n([\s\S]*?)(?=\n[一二三四五六七八九十]+[、．.]|第[一二三四五六七八九十]+章|第[一二三四五六七八九十]+部分|\n\d+[、．.]|$)/g

  let match
  while ((match = sectionRegex.exec(text)) !== null) {
    const title = match[2].trim()
    const content = match[3].trim()

    if (title && content && content.length > 50) {
      sections.push({
        title,
        content,
        subsections: []
      })
    }
  }

  // 如果没有找到结构化章节，创建默认章节
  if (sections.length === 0) {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 100)
    paragraphs.forEach((paragraph, index) => {
      if (index < 5) { // 最多5个章节
        sections.push({
          title: `分析要点 ${index + 1}`,
          content: paragraph.trim(),
          subsections: []
        })
      }
    })
  }

  return sections
}

// 提取建议
function extractRecommendations(text) {
  const recommendations = []
  const recRegex = /(?:建议|推荐|应该|需要|可以)[：:]?([^\n]+)/g

  let match
  while ((match = recRegex.exec(text)) !== null) {
    const rec = match[1].trim()
    if (rec.length > 10 && rec.length < 200) {
      recommendations.push(rec)
    }
  }

  // 如果没有找到建议，提供默认建议
  if (recommendations.length === 0) {
    recommendations.push(
      '加强数字化技术在产品设计中的应用',
      '建立完善的市场反馈机制',
      '提升团队的创新能力和技术水平',
      '优化产品开发流程，提高效率'
    )
  }

  return recommendations.slice(0, 6) // 最多6条建议
}

app.listen(PORT, () => {
  console.log(`🚀 代理服务器启动成功！`)
  console.log(`📡 服务地址: http://localhost:${PORT}`)
  console.log(`🔑 火山引擎API密钥状态: ${VOLCENGINE_CONFIG.accessKeyId ? '已配置' : '未配置'}`)
  console.log(`🤖 Google Gemini API密钥状态: ${GEMINI_CONFIG.apiKey ? '已配置' : '未配置'}`)
})
