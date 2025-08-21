import CryptoJS from 'crypto-js'

// 火山引擎即梦API配置
const VOLCENGINE_CONFIG = {
  accessKeyId: import.meta.env.VITE_VOLCENGINE_ACCESS_KEY_ID || '',
  secretAccessKey: import.meta.env.VITE_VOLCENGINE_SECRET_ACCESS_KEY || '',
  region: 'cn-north-1',
  service: 'visual',
  host: 'visual.volcengineapi.com',
  version: '2022-08-31'
}

// API接口类型定义
export interface TextToImageRequest {
  prompt: string
  model_version?: string
  width?: number
  height?: number
  scale?: number
  seed?: number
  ddim_steps?: number
  style_term?: string
}

export interface ImageToImageRequest {
  prompt: string
  image: string // base64编码的图片
  model_version?: string
  width?: number
  height?: number
  scale?: number
  seed?: number
  ddim_steps?: number
  strength?: number
  style_term?: string
}

export interface ApiResponse {
  ResponseMetadata: {
    RequestId: string
    Action: string
    Version: string
    Service: string
    Region: string
  }
  Result: {
    data: Array<{
      image: string // base64编码的生成图片
    }>
  }
}

// 生成签名
function generateSignature(
  method: string,
  uri: string,
  query: string,
  headers: Record<string, string>,
  payload: string,
  timestamp: string
): string {
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
  
  const hashedPayload = CryptoJS.SHA256(payload).toString()
  
  const canonicalRequest = [
    method,
    uri,
    query,
    canonicalHeaders,
    signedHeaders,
    hashedPayload
  ].join('\n')
  
  // 创建待签名字符串
  const hashedCanonicalRequest = CryptoJS.SHA256(canonicalRequest).toString()
  const stringToSign = [
    algorithm,
    timestamp,
    credentialScope,
    hashedCanonicalRequest
  ].join('\n')
  
  // 计算签名
  const kDate = CryptoJS.HmacSHA256(timestamp.substr(0, 8), VOLCENGINE_CONFIG.secretAccessKey)
  const kRegion = CryptoJS.HmacSHA256(VOLCENGINE_CONFIG.region, kDate)
  const kService = CryptoJS.HmacSHA256(VOLCENGINE_CONFIG.service, kRegion)
  const kSigning = CryptoJS.HmacSHA256('request', kService)
  const signature = CryptoJS.HmacSHA256(stringToSign, kSigning).toString()
  
  return signature
}

// 创建请求头
function createHeaders(payload: string): Record<string, string> {
  const timestamp = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, '')
  const date = timestamp.substr(0, 8)
  
  const headers = {
    'Content-Type': 'application/json',
    'Host': VOLCENGINE_CONFIG.host,
    'X-Date': timestamp,
    'X-Content-Sha256': CryptoJS.SHA256(payload).toString()
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
    throw new Error('🔑 火山引擎API密钥未配置\n\n请按以下步骤配置：\n1. 复制.env.example为.env文件\n2. 在.env文件中设置您的API密钥：\n   VITE_VOLCENGINE_ACCESS_KEY_ID=您的AccessKeyId\n   VITE_VOLCENGINE_SECRET_ACCESS_KEY=您的SecretAccessKey\n3. 重启开发服务器')
  }

  if (VOLCENGINE_CONFIG.accessKeyId === 'your_access_key_id_here' ||
      VOLCENGINE_CONFIG.secretAccessKey === 'your_secret_access_key_here') {
    throw new Error('🔑 请使用真实的火山引擎API密钥\n\n当前使用的是示例密钥，请：\n1. 登录火山引擎控制台\n2. 获取您的真实AccessKeyId和SecretAccessKey\n3. 在.env文件中替换示例值')
  }
}

// 文生图API调用（通过代理服务器）
export async function generateImageFromText(request: TextToImageRequest): Promise<string> {
  try {
    const response = await fetch('http://localhost:3002/api/text-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: request.prompt,
        model_version: request.model_version || 'general_v1.4',
        width: request.width || 512,
        height: request.height || 512,
        scale: request.scale || 7.5,
        seed: request.seed || Math.floor(Math.random() * 1000000),
        ddim_steps: request.ddim_steps || 25,
        style_term: request.style_term || ''
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (result.success && result.image) {
      return result.image
    } else {
      throw new Error(result.error || 'No image generated')
    }
  } catch (error) {
    console.error('Error generating image from text:', error)

    // 提供更友好的错误信息
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('ECONNREFUSED')) {
        throw new Error('🔌 代理服务器连接失败\n\n请确保：\n1. 代理服务器已启动（端口3002）\n2. 运行命令：cd server && npm install && npm start\n3. 检查控制台是否有错误信息')
      } else if (error.message.includes('HTTP error')) {
        throw new Error(`🌐 API调用失败：${error.message}\n\n可能的原因：\n1. API密钥配置错误\n2. 网络连接问题\n3. 服务暂时不可用\n\n请检查.env文件中的API密钥配置`)
      } else if (error.message.includes('No image generated')) {
        throw new Error('🎨 图像生成失败\n\n可能的原因：\n1. 文本描述不够清晰\n2. 服务器处理超时\n3. 内容不符合生成要求\n\n请尝试：\n1. 简化或重新描述您的需求\n2. 稍后重试')
      }
    }

    throw new Error(`🚫 未知错误：${error}\n\n请联系技术支持或稍后重试`)
  }
}

// 图生图API调用（通过代理服务器）
export async function generateImageFromImage(request: ImageToImageRequest): Promise<string> {
  try {
    const response = await fetch('http://localhost:3002/api/image-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: request.prompt,
        image: request.image,
        model_version: request.model_version || 'general_v1.4',
        width: request.width || 512,
        height: request.height || 512,
        scale: request.scale || 7.5,
        seed: request.seed || Math.floor(Math.random() * 1000000),
        ddim_steps: request.ddim_steps || 25,
        strength: request.strength || 0.8,
        style_term: request.style_term || ''
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (result.success && result.image) {
      return result.image
    } else {
      throw new Error(result.error || 'No image generated')
    }
  } catch (error) {
    console.error('Error generating image from image:', error)

    // 提供更友好的错误信息
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('ECONNREFUSED')) {
        throw new Error('🔌 代理服务器连接失败\n\n请确保：\n1. 代理服务器已启动（端口3002）\n2. 运行命令：cd server && npm install && npm start\n3. 检查控制台是否有错误信息')
      } else if (error.message.includes('HTTP error')) {
        throw new Error(`🌐 图生图API调用失败：${error.message}\n\n可能的原因：\n1. API密钥配置错误\n2. 网络连接问题\n3. 上传的图片格式不支持\n\n请检查.env文件中的API密钥配置和图片格式`)
      } else if (error.message.includes('No image generated')) {
        throw new Error('🎨 图生图失败\n\n可能的原因：\n1. 上传的图片不清晰或格式不支持\n2. 文本描述与图片不匹配\n3. 服务器处理超时\n\n请尝试：\n1. 使用清晰的JPG或PNG图片\n2. 调整文本描述\n3. 稍后重试')
      }
    }

    throw new Error(`🚫 图生图未知错误：${error}\n\n请联系技术支持或稍后重试`)
  }
}

// 将文件转换为base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // 移除data:image/...;base64,前缀
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = error => reject(error)
  })
}

// 下载base64图片
export function downloadBase64Image(base64: string, filename: string = 'generated-image.png') {
  const link = document.createElement('a')
  link.href = `data:image/png;base64,${base64}`
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
