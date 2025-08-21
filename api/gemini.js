const fetch = require('node-fetch')

// Google Gemini API配置
const GEMINI_CONFIG = {
  apiKey: process.env.GOOGLE_GEMINI_API_KEY || '',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
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
}
