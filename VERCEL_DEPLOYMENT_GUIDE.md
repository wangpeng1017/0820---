# 🚀 Vercel部署指南 - AI功能修复

## 📋 部署步骤

### 1. 配置环境变量

在Vercel项目设置中添加以下环境变量：

1. 访问 https://vercel.com/wangpeng10170414-1653s-projects/0820jiaotianxiang/settings/environment-variables

2. 添加以下环境变量：

```bash
# 火山引擎API配置
VITE_VOLCENGINE_ACCESS_KEY_ID=your_volcengine_access_key_id
VITE_VOLCENGINE_SECRET_ACCESS_KEY=your_volcengine_secret_access_key

# Google Gemini API配置
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
```

**注意**: 请使用您项目中.env文件里的实际API密钥值。

**重要**: 确保所有环境变量都设置为 `Production`, `Preview`, 和 `Development` 环境。

### 2. 部署配置文件

项目已包含 `vercel.json` 配置文件，包含以下关键配置：

- **API路由**: `/api/*` 请求转发到serverless函数
- **静态文件**: SPA路由支持
- **CORS配置**: 解决跨域问题
- **函数超时**: 30秒超时设置

### 3. 部署方法

#### 方法A: 通过Git自动部署（推荐）
1. 确保所有代码已推送到GitHub
2. Vercel会自动检测到更改并重新部署
3. 等待部署完成

#### 方法B: 手动部署
```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel --prod
```

### 4. 验证部署

部署完成后，测试以下端点：

1. **健康检查**: https://rd.aifly.me/health
2. **API端点**: https://rd.aifly.me/api/text-to-image
3. **主页面**: https://rd.aifly.me/packaging-design

### 5. 测试AI功能

1. 访问 https://rd.aifly.me/packaging-design
2. 点击"创意设计"选项卡
3. 输入文本描述："一个简约的包装盒设计"
4. 点击"生成设计图"按钮
5. 检查是否成功生成图片

## 🔧 故障排除

### 问题1: 环境变量未生效
- 检查Vercel项目设置中的环境变量
- 确保变量名完全匹配
- 重新部署项目

### 问题2: API调用失败
- 检查Vercel函数日志
- 验证API密钥是否正确
- 检查网络连接

### 问题3: 404错误
- 确保 `vercel.json` 配置正确
- 检查路由配置
- 验证构建输出目录

## 📊 Vercel配置说明

### vercel.json关键配置

```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/proxy-server.js"
    },
    {
      "src": "/health", 
      "dest": "/server/proxy-server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ]
}
```

### 环境变量配置

Vercel会自动将环境变量注入到serverless函数中，无需额外配置。

### 函数限制

- **执行时间**: 最大30秒
- **内存**: 默认1024MB
- **并发**: 根据计划限制

## 🎯 部署后验证清单

- [ ] 环境变量已正确设置
- [ ] 健康检查端点返回200状态
- [ ] API端点可以正常访问
- [ ] 前端页面正常加载
- [ ] AI文生图功能正常工作
- [ ] 浏览器控制台无错误

## 📞 支持

如果遇到问题：

1. 检查Vercel部署日志
2. 查看函数执行日志
3. 验证环境变量配置
4. 测试API端点响应

## 🔗 相关链接

- [Vercel项目](https://vercel.com/wangpeng10170414-1653s-projects/0820jiaotianxiang)
- [部署日志](https://vercel.com/wangpeng10170414-1653s-projects/0820jiaotianxiang/deployments)
- [环境变量设置](https://vercel.com/wangpeng10170414-1653s-projects/0820jiaotianxiang/settings/environment-variables)
