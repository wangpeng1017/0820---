const fetch = require('node-fetch')
const crypto = require('crypto')

// 火山引擎API配置
const VOLCENGINE_CONFIG = {
  accessKeyId: process.env.VITE_VOLCENGINE_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.VITE_VOLCENGINE_SECRET_ACCESS_KEY || '',
  region: 'cn-north-1',
  service: 'cv',
  host: 'visual.volcengineapi.com',
  version: '2022-08-31'
}

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
  
  console.log('🚀 调用火山引擎文生图API:', { prompt, style })
  
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
    console.log('✅ API响应成功')
    
    return result
  } catch (error) {
    console.error('❌ 火山引擎API调用失败:', error)
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

    const { prompt, style } = body

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
}
