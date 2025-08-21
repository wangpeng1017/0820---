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

// Google Gemini API配置
const GEMINI_CONFIG = {
  apiKey: process.env.GOOGLE_GEMINI_API_KEY || '',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
}

console.log('🔑 API配置状态:')
console.log('火山引擎 Access Key:', VOLCENGINE_CONFIG.accessKeyId ? '已配置' : '未配置')
console.log('火山引擎 Secret Key:', VOLCENGINE_CONFIG.secretAccessKey ? '已配置' : '未配置')
console.log('Google Gemini API Key:', GEMINI_CONFIG.apiKey ? '已配置' : '未配置')

// 火山引擎API v4签名算法
function createVolcengineSignature(method, uri, query, headers, payload, timestamp) {
  const algorithm = 'HMAC-SHA256'
  const date = timestamp.substr(0, 8)
  const credentialScope = `${date}/${VOLCENGINE_CONFIG.region}/${VOLCENGINE_CONFIG.service}/request`
  
  // 1. 创建规范请求
  const canonicalHeaders = Object.keys(headers)
    .sort()
    .map(key => `${key.toLowerCase()}:${headers[key].toString().trim()}`)
    .join('\n') + '\n'
  
  const signedHeaders = Object.keys(headers)
    .sort()
    .map(key => key.toLowerCase())
    .join(';')
  
  const hashedPayload = crypto.createHash('sha256').update(payload || '').digest('hex')
  
  const canonicalRequest = [
    method.toUpperCase(),
    uri,
    query || '',
    canonicalHeaders,
    signedHeaders,
    hashedPayload
  ].join('\n')
  
  // 2. 创建待签名字符串
  const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex')
  const stringToSign = [
    algorithm,
    timestamp,
    credentialScope,
    hashedCanonicalRequest
  ].join('\n')
  
  // 3. 计算签名
  const kDate = crypto.createHmac('sha256', VOLCENGINE_CONFIG.secretAccessKey).update(date).digest()
  const kRegion = crypto.createHmac('sha256', kDate).update(VOLCENGINE_CONFIG.region).digest()
  const kService = crypto.createHmac('sha256', kRegion).update(VOLCENGINE_CONFIG.service).digest()
  const kSigning = crypto.createHmac('sha256', kService).update('request').digest()
  const signature = crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex')
  
  return signature
}

// 创建火山引擎API请求头
function createVolcengineHeaders(payload) {
  const timestamp = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, '')
  const date = timestamp.substr(0, 8)
  const hashedPayload = crypto.createHash('sha256').update(payload).digest('hex')
  
  const headers = {
    'Content-Type': 'application/json',
    'Host': VOLCENGINE_CONFIG.host,
    'X-Date': timestamp,
    'X-Content-Sha256': hashedPayload
  }
  
  const signature = createVolcengineSignature('POST', '/', `Action=CVProcess&Version=${VOLCENGINE_CONFIG.version}`, headers, payload, timestamp)
  
  const credentialScope = `${date}/${VOLCENGINE_CONFIG.region}/${VOLCENGINE_CONFIG.service}/request`
  const authorization = `HMAC-SHA256 Credential=${VOLCENGINE_CONFIG.accessKeyId}/${credentialScope}, SignedHeaders=content-type;host;x-content-sha256;x-date, Signature=${signature}`
  
  headers['Authorization'] = authorization
  
  return headers
}

// 火山引擎文生图API调用
async function callVolcengineTextToImage(prompt, style = 'general') {
  const payload = JSON.stringify({
    req_key: 'jimeng_high_aes_general_v21_L',
    prompt: prompt,
    return_url: true
  })
  
  const headers = createVolcengineHeaders(payload)
  const url = `https://${VOLCENGINE_CONFIG.host}/?Action=CVProcess&Version=${VOLCENGINE_CONFIG.version}`
  
  console.log('🚀 调用火山引擎文生图API:')
  console.log('URL:', url)
  console.log('Headers:', JSON.stringify(headers, null, 2))
  console.log('Payload:', payload)
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: payload
    })
    
    console.log('📡 API响应状态:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ API错误响应:', errorText)
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
    }
    
    const result = await response.json()
    console.log('✅ API响应成功:', JSON.stringify(result, null, 2))
    
    return result
  } catch (error) {
    console.error('❌ 火山引擎API调用失败:', error)
    throw error
  }
}

// Google Gemini API调用
async function callGeminiAPI(prompt) {
  const url = `${GEMINI_CONFIG.baseUrl}?key=${GEMINI_CONFIG.apiKey}`
  
  const payload = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }]
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

// API路由
app.post('/api/text-to-image', async (req, res) => {
  try {
    const { prompt, style } = req.body
    
    if (!prompt) {
      return res.status(400).json({ error: '缺少prompt参数' })
    }
    
    console.log('📝 收到文生图请求:', { prompt, style })
    
    const result = await callVolcengineTextToImage(prompt, style)
    
    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('文生图处理失败:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

app.post('/api/image-to-image', async (req, res) => {
  try {
    const { image, prompt, style } = req.body

    if (!image || !prompt) {
      return res.status(400).json({ error: '缺少image或prompt参数' })
    }

    console.log('🖼️ 收到图生图请求:', { image: image.substring(0, 50) + '...', prompt, style })

    // 图生图功能实现
    const payload = JSON.stringify({
      req_key: 'jimeng_high_aes_img2img_v21_L',
      prompt: prompt,
      image_url: image, // 前端传来的是base64或URL
      return_url: true
    })
    
    const headers = createVolcengineHeaders(payload)
    const url = `https://${VOLCENGINE_CONFIG.host}/?Action=CVProcess&Version=${VOLCENGINE_CONFIG.version}`
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: payload
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
    }
    
    const result = await response.json()
    
    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('图生图处理失败:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body
    
    if (!prompt) {
      return res.status(400).json({ error: '缺少prompt参数' })
    }
    
    const result = await callGeminiAPI(prompt)
    
    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Gemini API处理失败:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    config: {
      volcengine: {
        accessKey: VOLCENGINE_CONFIG.accessKeyId ? '已配置' : '未配置',
        secretKey: VOLCENGINE_CONFIG.secretAccessKey ? '已配置' : '未配置'
      },
      gemini: {
        apiKey: GEMINI_CONFIG.apiKey ? '已配置' : '未配置'
      }
    }
  })
})

// Vercel serverless函数导出
module.exports = app

// 本地开发时启动服务器
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('🚀 代理服务器启动成功！')
    console.log(`📡 服务地址: http://localhost:${PORT}`)
    console.log(`🔑 火山引擎API密钥状态: ${VOLCENGINE_CONFIG.accessKeyId && VOLCENGINE_CONFIG.secretAccessKey ? '已配置' : '未配置'}`)
    console.log(`🤖 Google Gemini API密钥状态: ${GEMINI_CONFIG.apiKey ? '已配置' : '未配置'}`)
  })
}
