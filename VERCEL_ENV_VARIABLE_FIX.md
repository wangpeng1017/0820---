# 🔧 Vercel环境变量引用错误修复

## 🚨 问题描述

**错误信息**: `Environment Variable "VITE_VOLCENGINE_ACCESS_KEY_ID" references Secret "volcengine-access-key-id", which does not exist.`

**原因**: vercel.json中使用了不存在的Secret引用格式 `@secret-name`

## ✅ 解决方案

### 1. 移除vercel.json中的环境变量引用

**修复前**:
```json
{
  "env": {
    "VITE_VOLCENGINE_ACCESS_KEY_ID": "@volcengine-access-key-id",
    "VITE_VOLCENGINE_SECRET_ACCESS_KEY": "@volcengine-secret-access-key", 
    "GOOGLE_GEMINI_API_KEY": "@google-gemini-api-key"
  }
}
```

**修复后**:
```json
{
  // 移除了env配置，环境变量直接在Vercel控制台设置
}
```

### 2. 在Vercel控制台直接设置环境变量

访问: https://vercel.com/wangpeng10170414-1653s-projects/0820jiaotianxiang/settings/environment-variables

添加以下环境变量：

| 变量名 | 值 | 环境 |
|--------|----|----- |
| `VITE_VOLCENGINE_ACCESS_KEY_ID` | 从项目.env文件复制 | Production, Preview, Development |
| `VITE_VOLCENGINE_SECRET_ACCESS_KEY` | 从项目.env文件复制 | Production, Preview, Development |
| `GOOGLE_GEMINI_API_KEY` | 从项目.env文件复制 | Production, Preview, Development |

## 🔍 修复原理

### Vercel环境变量的正确使用方式

1. **直接设置**: 在Vercel控制台直接设置环境变量
2. **自动注入**: Vercel会自动将环境变量注入到serverless函数中
3. **无需配置文件**: 不需要在vercel.json中引用环境变量

### Secret引用的正确用法

如果要使用Secret引用，需要：
1. 先在Vercel控制台创建Secret
2. 然后在vercel.json中使用 `@secret-name` 格式引用

但对于我们的用例，直接设置环境变量更简单有效。

## 📊 修复后的配置结构

```json
{
  "functions": {
    "server/proxy-server.js": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, PUT, DELETE, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type, Authorization, X-Requested-With" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/server/proxy-server.js" },
    { "source": "/health", "destination": "/server/proxy-server.js" },
    { "source": "/packaging-design", "destination": "/index.html" },
    { "source": "/packaging-design/(.*)", "destination": "/index.html" }
  ]
}
```

## 🎯 验证步骤

### 1. 配置验证
运行: `node test-vercel-config.js`

预期结果:
- ✅ 现代vercel.json配置验证通过
- ✅ 函数配置正确
- ✅ 重写规则完整
- ✅ CORS头配置正确

### 2. 部署验证
1. 推送代码到GitHub
2. 在Vercel控制台设置环境变量
3. 等待自动部署完成
4. 测试API端点

### 3. 功能验证
- 访问: https://rd.aifly.me/health (健康检查)
- 访问: https://rd.aifly.me/packaging-design (前端页面)
- 测试: AI文生图功能

## 🚀 部署状态

**修复完成后**:
- ✅ 无环境变量引用错误
- ✅ 无配置冲突
- ✅ 现代Vercel配置标准
- ✅ 完整的API功能支持

## 📞 故障排除

### 如果仍有环境变量问题:
1. 检查Vercel控制台中的环境变量名是否完全匹配
2. 确认所有环境(Production, Preview, Development)都已设置
3. 重新部署项目以应用新的环境变量
4. 查看Vercel函数日志确认环境变量是否正确注入

### 如果API调用失败:
1. 检查server/proxy-server.js中的环境变量读取
2. 验证API密钥格式是否正确
3. 查看Vercel函数执行日志
4. 测试本地环境是否正常工作

## 🔗 相关链接

- [Vercel环境变量文档](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel配置文档](https://vercel.com/docs/project-configuration)
- [项目环境变量设置](https://vercel.com/wangpeng10170414-1653s-projects/0820jiaotianxiang/settings/environment-variables)
