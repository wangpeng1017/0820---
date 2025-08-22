// API密钥测试工具
const crypto = require('crypto')

// 从环境变量读取密钥
const accessKeyId = process.env.VITE_VOLCENGINE_ACCESS_KEY_ID || ''
const secretAccessKey = process.env.VITE_VOLCENGINE_SECRET_ACCESS_KEY || ''

console.log('=== 火山引擎API密钥测试 ===')
console.log('环境变量检查:')
console.log('- VITE_VOLCENGINE_ACCESS_KEY_ID:', accessKeyId ? `${accessKeyId.substring(0, 10)}... (长度: ${accessKeyId.length})` : '未设置')
console.log('- VITE_VOLCENGINE_SECRET_ACCESS_KEY:', secretAccessKey ? `${secretAccessKey.substring(0, 10)}... (长度: ${secretAccessKey.length})` : '未设置')

// 解码base64编码的密钥（如果需要）
function decodeBase64IfNeeded(str) {
  if (!str) return str
  
  try {
    // 检查是否是base64编码
    if (str.length > 20 && /^[A-Za-z0-9+/]+=*$/.test(str)) {
      const decoded = Buffer.from(str, 'base64').toString('utf-8')
      
      // 验证解码后的内容是否包含有效字符
      if (decoded.length > 10 && !decoded.includes('\u0000') && decoded.trim().length > 0) {
        console.log(`🔑 解码成功: ${str.substring(0, 10)}... -> ${decoded.substring(0, 10)}...`)
        return decoded
      } else {
        console.log(`⚠️ 解码后内容无效: ${decoded}`)
      }
    }
    
    // 如果不是base64或解码失败，直接返回原值
    console.log(`🔑 使用原始值: ${str.substring(0, 10)}...`)
    return str
  } catch (error) {
    console.error('🔑 解码失败:', error.message)
    return str
  }
}

console.log('\n密钥解码测试:')
const decodedAccessKey = decodeBase64IfNeeded(accessKeyId)
const decodedSecretKey = decodeBase64IfNeeded(secretAccessKey)

console.log('\n最终密钥:')
console.log('- Access Key ID:', decodedAccessKey ? `${decodedAccessKey.substring(0, 10)}... (长度: ${decodedAccessKey.length})` : '无')
console.log('- Secret Access Key:', decodedSecretKey ? `${decodedSecretKey.substring(0, 10)}... (长度: ${decodedSecretKey.length})` : '无')

// 验证密钥格式
console.log('\n密钥格式验证:')
if (decodedAccessKey) {
  console.log('- Access Key ID 格式:', /^[A-Za-z0-9]+$/.test(decodedAccessKey) ? '✅ 有效' : '❌ 包含无效字符')
} else {
  console.log('- Access Key ID: ❌ 未配置')
}

if (decodedSecretKey) {
  console.log('- Secret Access Key 格式:', /^[A-Za-z0-9+/=]+$/.test(decodedSecretKey) ? '✅ 有效' : '❌ 包含无效字符')
} else {
  console.log('- Secret Access Key: ❌ 未配置')
}

// 测试签名生成
console.log('\n签名生成测试:')
if (decodedAccessKey && decodedSecretKey) {
  try {
    const timestamp = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, '')
    const testPayload = JSON.stringify({ test: 'payload' })
    const hashedPayload = crypto.createHash('sha256').update(testPayload).digest('hex')
    
    console.log('- 时间戳:', timestamp)
    console.log('- 测试载荷哈希:', hashedPayload)
    console.log('- 签名生成: ✅ 基础组件正常')
  } catch (error) {
    console.error('- 签名生成: ❌', error.message)
  }
} else {
  console.log('- 签名生成: ❌ 密钥不完整，无法测试')
}

console.log('\n=== 测试完成 ===')

// 导出处理器用于Vercel
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  
  const result = {
    timestamp: new Date().toISOString(),
    environment: {
      accessKeyConfigured: !!accessKeyId,
      secretKeyConfigured: !!secretAccessKey,
      accessKeyLength: accessKeyId.length,
      secretKeyLength: secretAccessKey.length
    },
    decoded: {
      accessKey: decodedAccessKey ? `${decodedAccessKey.substring(0, 10)}...` : null,
      secretKey: decodedSecretKey ? `${decodedSecretKey.substring(0, 10)}...` : null,
      accessKeyLength: decodedAccessKey.length,
      secretKeyLength: decodedSecretKey.length
    },
    validation: {
      accessKeyValid: !!(decodedAccessKey && decodedAccessKey.length > 10),
      secretKeyValid: !!(decodedSecretKey && decodedSecretKey.length > 10),
      bothConfigured: !!(decodedAccessKey && decodedSecretKey)
    }
  }
  
  res.json(result)
}
