# 生产环境部署指南

## 🚀 问题解决方案

通过测试发现，生产环境中AI功能无法正常工作的原因是前端代码尝试连接本地开发环境的代理服务器(`localhost:3002`)。

## 🔧 修复内容

### 1. 前端代码修复
已修复以下文件中的硬编码API地址：
- `src/services/volcengineApi.ts` - 文生图和图生图API调用
- `src/services/geminiApi.ts` - 智能报告生成API调用

修复方案：
```typescript
// 获取API基础URL
const getApiBaseUrl = () => {
  // 在生产环境中使用相对路径，在开发环境中使用localhost
  return import.meta.env.PROD ? '' : 'http://localhost:3002'
}
```

### 2. Nginx配置
创建了`nginx.conf`文件，配置反向代理将`/api/*`请求转发到代理服务器。

## 📋 部署步骤

### 步骤1：构建前端应用
```bash
# 安装依赖
npm install

# 构建生产版本
npm run build
```

### 步骤2：部署代理服务器
```bash
# 进入server目录
cd server

# 安装依赖
npm install

# 配置环境变量
cp ../.env.example .env
# 编辑.env文件，配置API密钥

# 启动代理服务器
npm start
```

### 步骤3：配置Web服务器
使用提供的`nginx.conf`配置文件：

```bash
# 复制构建文件到Nginx目录
cp -r dist/* /usr/share/nginx/html/

# 使用提供的Nginx配置
cp nginx.conf /etc/nginx/sites-available/default

# 重启Nginx
sudo systemctl restart nginx
```

### 步骤4：验证部署
1. 访问应用主页：`http://your-domain.com`
2. 测试AI功能：
   - 包装材料数字化设计 → 创意设计 → 文生图设计
   - 设计策划数字化 → 智能生成报告

## 🔑 环境变量配置

在生产环境中需要配置以下环境变量：

```bash
# 火山引擎API配置
VITE_VOLCENGINE_ACCESS_KEY_ID=your_access_key_id
VITE_VOLCENGINE_SECRET_ACCESS_KEY=your_secret_access_key

# Google Gemini API配置
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 🛠️ 故障排除

### 1. API调用失败
- 检查代理服务器是否正常运行：`curl http://localhost:3002/health`
- 检查环境变量是否正确配置
- 查看代理服务器日志：`pm2 logs` 或 `journalctl -u your-service`

### 2. CORS错误
- 确保Nginx配置正确
- 检查代理服务器的CORS设置

### 3. 404错误
- 确保Nginx配置中的`try_files`设置正确
- 检查静态文件路径

## 🔒 安全建议

1. **API密钥安全**：
   - 不要将API密钥提交到代码仓库
   - 使用环境变量或密钥管理服务
   - 定期轮换API密钥

2. **网络安全**：
   - 使用HTTPS（配置SSL证书）
   - 配置防火墙规则
   - 限制API访问频率

3. **服务监控**：
   - 配置日志监控
   - 设置健康检查
   - 配置告警机制

## 📊 性能优化

1. **缓存策略**：
   - 静态资源缓存（已在Nginx配置中设置）
   - API响应缓存（根据需要配置）

2. **负载均衡**：
   - 如果需要，可以配置多个代理服务器实例
   - 使用PM2或Docker进行进程管理

3. **CDN配置**：
   - 将静态资源部署到CDN
   - 配置图片压缩和优化

## 🚀 自动化部署

建议使用CI/CD流水线自动化部署：

```yaml
# .github/workflows/deploy.yml 示例
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install and Build
        run: |
          npm install
          npm run build
      - name: Deploy
        run: |
          # 部署脚本
```

## 📞 技术支持

如果在部署过程中遇到问题，请：
1. 检查日志文件
2. 验证配置文件
3. 测试网络连接
4. 联系技术支持团队
