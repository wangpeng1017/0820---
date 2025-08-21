# 火山引擎API代理服务器

## 🎯 功能说明

这是一个代理服务器，用于解决前端直接调用火山引擎API时遇到的CORS（跨域资源共享）问题。

## 🚀 快速启动

### 方法一：使用启动脚本（推荐）

**Windows用户：**
```bash
# 在项目根目录运行
start-proxy.bat
```

**Linux/Mac用户：**
```bash
# 在项目根目录运行
./start-proxy.sh
```

### 方法二：手动启动

```bash
# 1. 进入server目录
cd server

# 2. 安装依赖
npm install

# 3. 启动服务器
npm start
```

## 📡 API接口

代理服务器提供以下接口：

### 文生图接口
- **URL**: `POST http://localhost:3002/api/text-to-image`
- **请求体**:
```json
{
  "prompt": "现代简约风格的咖啡包装设计",
  "width": 512,
  "height": 512,
  "scale": 7.5,
  "ddim_steps": 25,
  "style_term": "packaging design"
}
```

### 图生图接口
- **URL**: `POST http://localhost:3002/api/image-to-image`
- **请求体**:
```json
{
  "prompt": "转换为蓝色主题的包装设计",
  "image": "base64编码的图片数据",
  "width": 512,
  "height": 512,
  "scale": 7.5,
  "strength": 0.8,
  "style_term": "packaging design"
}
```

### 健康检查接口
- **URL**: `GET http://localhost:3002/health`

## 🔑 配置要求

1. **环境变量配置**：
   - 在项目根目录创建 `.env` 文件
   - 配置火山引擎API密钥：
   ```
   VITE_VOLCENGINE_ACCESS_KEY_ID=您的AccessKeyId
   VITE_VOLCENGINE_SECRET_ACCESS_KEY=您的SecretAccessKey
   ```

2. **端口配置**：
   - 代理服务器默认运行在端口 `3002`
   - 前端应用运行在端口 `3001`

## 🛠️ 技术栈

- **Node.js**: 运行环境
- **Express**: Web框架
- **CORS**: 跨域支持
- **node-fetch**: HTTP请求库
- **crypto**: 签名生成

## 🔧 故障排除

### 1. API密钥未配置
```
🔑 API密钥状态: 未配置
```
**解决方案**：检查项目根目录的 `.env` 文件是否存在且配置正确

### 2. 端口被占用
```
Error: listen EADDRINUSE: address already in use :::3002
```
**解决方案**：
- 关闭占用端口3002的其他程序
- 或修改 `proxy-server.js` 中的 `PORT` 变量

### 3. 依赖安装失败
**解决方案**：
- 确保Node.js版本 >= 14
- 清除npm缓存：`npm cache clean --force`
- 删除 `node_modules` 文件夹后重新安装

## 📝 日志说明

启动成功后会显示：
```
🚀 代理服务器启动成功！
📡 服务地址: http://localhost:3002
🔑 API密钥状态: 已配置
```

## 🔒 安全注意事项

- ⚠️ 此代理服务器仅用于开发环境
- ⚠️ 生产环境请使用专业的API网关服务
- ⚠️ 不要将API密钥提交到代码仓库
- ⚠️ 定期轮换API密钥以确保安全
