// Vercel健康检查端点
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
  
  // 检查环境变量
  const volcengineAccessKey = process.env.VITE_VOLCENGINE_ACCESS_KEY_ID
  const volcengineSecretKey = process.env.VITE_VOLCENGINE_SECRET_ACCESS_KEY
  const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    config: {
      volcengine: {
        accessKey: volcengineAccessKey ? '已配置' : '未配置',
        secretKey: volcengineSecretKey ? '已配置' : '未配置'
      },
      gemini: {
        apiKey: geminiApiKey ? '已配置' : '未配置'
      }
    },
    environment: process.env.VERCEL_ENV || 'development'
  })
}
