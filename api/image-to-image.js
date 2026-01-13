const fetch = require('node-fetch')
const crypto = require('crypto')

// 火山引擎视觉AI服务配置 - 基于官方Python SDK
const VOLCENGINE_CONFIG = {
  accessKeyId: process.env.VITE_VOLCENGINE_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.VITE_VOLCENGINE_SECRET_ACCESS_KEY || '',
  region: 'cn-north-1',
  service: 'cv',
  host: 'visual.volcengineapi.com',
  version: '2022-08-31',
  endpoint: 'https://visual.volcengineapi.com'
}

// 解码base64编码的密钥（支持二次解码）
function decodeBase64IfNeeded(str) {
  if (!str) return str

  try {
    // 检查是否是base64编码
    if (str.length > 20 && /^[A-Za-z0-9+/]+=*$/.test(str)) {
      const decoded = Buffer.from(str, 'base64').toString('utf-8')

      // 检查解码结果是否还是base64格式（需要二次解码）
      if (decoded.length > 20 && /^[A-Za-z0-9+/]+=*$/.test(decoded)) {
        try {
          const doubleDecoded = Buffer.from(decoded, 'base64').toString('utf-8')
          console.log(`🔑 二次解码密钥: ${str.substring(0, 10)}... -> ${decoded.substring(0, 10)}... -> ${doubleDecoded.substring(0, 10)}...`)
          return doubleDecoded
        } catch (error) {
          console.log(`🔑 二次解码失败，使用一次解码结果: ${decoded.substring(0, 10)}...`)
          return decoded
        }
      }

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

// 火山引擎API v4签名算法 - 基于官方Python SDK
function createVolcengineSignature(method, uri, query, headers, payload, timestamp) {
  const algorithm = 'HMAC-SHA256'
  const date = timestamp.substr(0, 8)
  const credentialScope = `${date}/${VOLCENGINE_CONFIG.region}/${VOLCENGINE_CONFIG.service}/request`

  // 1. 创建规范请求 - 按照官方SDK的顺序
  const canonicalHeaders = 'content-type:' + headers['Content-Type'] + '\n' +
                          'host:' + headers['Host'] + '\n' +
                          'x-content-sha256:' + headers['X-Content-Sha256'] + '\n' +
                          'x-date:' + headers['X-Date'] + '\n'

  const signedHeaders = 'content-type;host;x-content-sha256;x-date'

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

  // 3. 计算签名 - 按照官方SDK的方式
  const kDate = crypto.createHmac('sha256', VOLCENGINE_CONFIG.secretAccessKey).update(date).digest()
  const kRegion = crypto.createHmac('sha256', kDate).update(VOLCENGINE_CONFIG.region).digest()
  const kService = crypto.createHmac('sha256', kRegion).update(VOLCENGINE_CONFIG.service).digest()
  const kSigning = crypto.createHmac('sha256', kService).update('request').digest()
  const signature = crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex')

  return `HMAC-SHA256 Credential=${VOLCENGINE_CONFIG.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`
}

// 调用火山引擎视觉AI服务图生图API - 基于官方Python SDK
async function callVolcengineImageToImage(image, prompt, style = 'general', options = {}) {
  const timestamp = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, '')

  // 构建Query参数 - 基于官方SDK
  const queryParams = {
    'Action': 'CVProcess',
    'Version': VOLCENGINE_CONFIG.version
  }

  const queryString = Object.keys(queryParams)
    .sort()
    .map(key => `${key}=${queryParams[key]}`)
    .join('&')

  // 构建请求参数 - 基于官方视觉AI服务规范
  const requestBody = {
    req_key: `img2img_${Date.now()}`,
    prompt: prompt,
    binary_data_base64: [image], // 输入图片的base64数据
    model_version: options.model_version || 'general_v1.4',
    width: options.width || 512,
    height: options.height || 512,
    scale: options.scale || 7.5,
    seed: options.seed || Math.floor(Math.random() * 1000000),
    ddim_steps: options.ddim_steps || 25,
    strength: options.strength || 0.8, // 图生图特有参数，控制变化程度
    style_term: style || '',
    return_url: false,
    logo_info: {
      add_logo: false,
      position: 0,
      language: 0,
      opacity: 0.3
    }
  }

  const payload = JSON.stringify(requestBody)

  // 构建请求头 - 按照官方SDK的格式
  const headers = {
    'Content-Type': 'application/json',
    'Host': VOLCENGINE_CONFIG.host,
    'X-Date': timestamp,
    'X-Content-Sha256': crypto.createHash('sha256').update(payload).digest('hex')
  }

  // 生成签名
  const signature = createVolcengineSignature(
    'POST',
    '/',
    queryString,
    headers,
    payload,
    timestamp
  )

  headers['Authorization'] = signature

  const requestUrl = `${VOLCENGINE_CONFIG.endpoint}?${queryString}`

  console.log('🚀 发送图生图请求到火山引擎视觉AI服务')
  console.log('📍 请求URL:', requestUrl)
  console.log('📝 Query参数:', queryParams)
  console.log('📝 请求参数:', {
    ...requestBody,
    binary_data_base64: ['[图片数据已隐藏]'] // 隐藏图片数据以减少日志
  })

  try {
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: headers,
      body: payload,
      timeout: 60000 // 60秒超时
    })

    console.log('📡 API响应状态:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ API响应错误:', errorText)
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const result = await response.json()
    console.log('✅ API响应成功')

    // 处理响应数据 - 基于视觉AI服务响应格式
    if (result.data && result.data.binary_data_base64) {
      return {
        image: result.data.binary_data_base64[0],
        seed: result.data.seed || requestBody.seed,
        model_version: result.data.model_version || requestBody.model_version
      }
    } else if (result.binary_data_base64) {
      return {
        image: result.binary_data_base64[0],
        seed: result.seed || requestBody.seed,
        model_version: result.model_version || requestBody.model_version
      }
    } else {
      console.error('❌ 响应数据格式异常:', result)
      throw new Error('响应数据中未找到图片数据')
    }
  } catch (error) {
    console.error('❌ 火山引擎视觉AI 图生图API调用失败:', error)
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
    
    console.log('📝 收到图生图请求:', { 
      prompt: prompt.substring(0, 100) + (prompt.length > 100 ? '...' : ''),
      style,
      model_version,
      width,
      height,
      scale,
      ddim_steps,
      strength,
      imageSize: `${image.length} characters`
    })
    
    const result = await callVolcengineImageToImage(image, prompt, style, {
      model_version,
      width,
      height,
      scale,
      seed,
      ddim_steps,
      strength
    })
    
    console.log('✅ 图生图请求处理成功')
    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('❌ 图生图处理失败:', error)
    
    // 提供更详细的错误信息
    let errorMessage = error.message || '未知错误'
    let statusCode = 500
    
    if (error.message.includes('API密钥')) {
      statusCode = 500
      errorMessage = 'API密钥配置错误，请检查环境变量'
    } else if (error.message.includes('HTTP error')) {
      statusCode = 502
      errorMessage = '火山引擎API服务错误，请稍后重试'
    } else if (error.message.includes('timeout')) {
      statusCode = 504
      errorMessage = 'API调用超时，请稍后重试'
    }
    
    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}
