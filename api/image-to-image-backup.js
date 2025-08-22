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

// 解码base64编码的密钥（如果需要）
function decodeBase64IfNeeded(str) {
  if (!str) return str

  try {
    // 检查是否是base64编码
    if (str.length > 20 && /^[A-Za-z0-9+/]+=*$/.test(str)) {
      const decoded = Buffer.from(str, 'base64').toString('utf-8')

      // 验证解码后的内容是否包含有效字符
      if (decoded.length > 10 && !decoded.includes('\u0000') && decoded.trim().length > 0) {
        console.log(`🔑 解码密钥: ${str.substring(0, 10)}... -> ${decoded.substring(0, 10)}...`)
        return decoded
      }
    }

    // 如果不是base64或解码失败，直接返回原值
    console.log(`🔑 使用原始密钥: ${str.substring(0, 10)}...`)
    return str
  } catch (error) {
    console.error('🔑 密钥解码失败:', error.message)
    return str
  }
}

// 更新配置以使用解码后的密钥
VOLCENGINE_CONFIG.accessKeyId = decodeBase64IfNeeded(VOLCENGINE_CONFIG.accessKeyId)
VOLCENGINE_CONFIG.secretAccessKey = decodeBase64IfNeeded(VOLCENGINE_CONFIG.secretAccessKey)

// 验证API密钥配置
function validateApiKeys() {
  const issues = []

  if (!VOLCENGINE_CONFIG.accessKeyId) {
    issues.push('VITE_VOLCENGINE_ACCESS_KEY_ID 未配置')
  } else if (VOLCENGINE_CONFIG.accessKeyId.length < 10) {
    issues.push('VITE_VOLCENGINE_ACCESS_KEY_ID 长度不足')
  }

  if (!VOLCENGINE_CONFIG.secretAccessKey) {
    issues.push('VITE_VOLCENGINE_SECRET_ACCESS_KEY 未配置')
  } else if (VOLCENGINE_CONFIG.secretAccessKey.length < 10) {
    issues.push('VITE_VOLCENGINE_SECRET_ACCESS_KEY 长度不足')
  }

  if (issues.length > 0) {
    throw new Error(`API密钥配置错误: ${issues.join(', ')}`)
  }

  console.log('✅ API密钥验证通过')
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
    // 验证API密钥配置
    try {
      validateApiKeys()
    } catch (keyError) {
      console.error('❌ API密钥验证失败:', keyError.message)
      return res.status(500).json({
        success: false,
        error: `API密钥配置错误: ${keyError.message}`
      })
    }

    // 解析JSON body（Vercel serverless函数需要手动解析）
    let body
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    } catch (parseError) {
      console.error('❌ JSON解析错误:', parseError)
      return res.status(400).json({
        success: false,
        error: 'Invalid JSON format'
      })
    }

    const {
      image,
      prompt,
      style,
      model_version = 'general_v1.4',
      width = 512,
      height = 512,
      scale = 7.5,
      seed = Math.floor(Math.random() * 1000000),
      ddim_steps = 25,
      strength = 0.8,
      style_term = ''
    } = body

    // 验证必需参数
    if (!image || typeof image !== 'string' || image.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: '缺少有效的image参数'
      })
    }

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: '缺少有效的prompt参数'
      })
    }

    console.log('🖼️ 收到图生图请求:', {
      image: image.substring(0, 50) + '...',
      prompt,
      style,
      width,
      height,
      scale,
      ddim_steps,
      strength
    })

    // 图生图功能实现
    const payload = JSON.stringify({
      req_key: 'jimeng_high_aes_img2img_v21_L',
      prompt: prompt + (style_term ? `, ${style_term}` : ''),
      image_url: image, // 前端传来的是base64或URL
      width: width,
      height: height,
      scale: scale,
      seed: seed,
      ddim_steps: ddim_steps,
      strength: strength,
      return_url: true
    })
    
    const headers = createVolcengineHeaders(payload)
    const url = `https://${VOLCENGINE_CONFIG.host}/?Action=CVProcess&Version=${VOLCENGINE_CONFIG.version}`
    
    console.log('🚀 调用火山引擎图生图API...')

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

    // 检查响应数据结构
    if (result && result.data && result.data.image_urls && result.data.image_urls.length > 0) {
      res.json({
        success: true,
        data: {
          data: {
            image_urls: result.data.image_urls
          }
        }
      })
    } else {
      console.error('❌ API响应格式错误:', result)
      throw new Error('API响应中没有生成的图片')
    }
  } catch (error) {
    console.error('图生图处理失败:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
