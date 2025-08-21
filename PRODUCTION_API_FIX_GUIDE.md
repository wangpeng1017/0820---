# 🚀 生产环境AI API修复指南

## 🔍 问题诊断

根据浏览器控制台错误分析，生产环境AI功能失败的原因是：

### ❌ 当前问题
- 前端正确使用相对路径 `/api/text-to-image`
- 但生产环境缺少代理服务器或反向代理配置
- 导致404错误：API端点无法访问

### ✅ 已修复部分
- 前端代码环境自适应配置 ✅
- 开发环境功能正常 ✅

## 🛠️ 立即修复方案

### 步骤1：部署代理服务器

**Linux/Mac用户：**
```bash
# 给脚本执行权限
chmod +x fix-production-api.sh

# 运行修复脚本
./fix-production-api.sh
```

**Windows用户：**
```bash
# 运行修复脚本
fix-production-api.bat
```

### 步骤2：配置环境变量

确保项目根目录有 `.env` 文件，包含：
```bash
VITE_VOLCENGINE_ACCESS_KEY_ID=your_access_key_id
VITE_VOLCENGINE_SECRET_ACCESS_KEY=your_secret_access_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 步骤3：配置Web服务器反向代理

#### Nginx配置
在Nginx配置文件中添加：
```nginx
location /api/ {
    proxy_pass http://localhost:3002;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    
    # CORS配置
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
}
```

然后重启Nginx：
```bash
sudo systemctl restart nginx
```

#### Apache配置
在Apache配置文件中添加：
```apache
ProxyPreserveHost On
ProxyPass /api/ http://localhost:3002/api/
ProxyPassReverse /api/ http://localhost:3002/api/

# 启用CORS
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header always set Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization"
```

#### IIS配置
在web.config中添加：
```xml
<system.webServer>
    <rewrite>
        <rules>
            <rule name="API Proxy" stopProcessing="true">
                <match url="^api/(.*)" />
                <action type="Rewrite" url="http://localhost:3002/api/{R:1}" />
            </rule>
        </rules>
    </rewrite>
</system.webServer>
```

### 步骤4：验证修复

运行测试脚本：
```bash
node test-production-api.js
```

或手动测试：
1. 检查代理服务器：`curl http://localhost:3002/health`
2. 检查生产API：`curl https://rd.aifly.me/api/text-to-image`

## 🔧 故障排除

### 问题1：代理服务器启动失败
```bash
# 检查端口占用
netstat -tulpn | grep 3002

# 查看PM2日志
pm2 logs proxy-server

# 重启代理服务器
pm2 restart proxy-server
```

### 问题2：API密钥错误
```bash
# 检查环境变量
cat .env

# 验证API密钥格式
# 火山引擎密钥应该是Base64格式
# Gemini密钥应该以AIza开头
```

### 问题3：CORS错误
确保Web服务器配置包含CORS头，或在代理服务器中处理CORS。

### 问题4：防火墙阻止
```bash
# 检查防火墙规则
sudo ufw status

# 允许3002端口
sudo ufw allow 3002
```

## 📊 验证清单

完成修复后，请验证以下项目：

- [ ] 代理服务器在端口3002运行
- [ ] 环境变量正确配置
- [ ] Web服务器反向代理配置正确
- [ ] 防火墙允许必要端口
- [ ] 浏览器控制台无API错误
- [ ] AI文生图功能正常工作

## 🎯 测试步骤

1. 访问 https://rd.aifly.me/packaging-design
2. 点击"创意设计"选项卡
3. 输入文本描述："一个简约的包装盒设计"
4. 点击"生成设计图"按钮
5. 检查浏览器控制台是否有错误
6. 验证是否成功生成图片

## 📞 技术支持

如果问题仍然存在：
1. 运行 `test-production-api.js` 获取详细诊断
2. 检查 `pm2 logs proxy-server` 查看服务器日志
3. 提供错误日志和配置信息以获得进一步支持

## 🚀 快速命令参考

```bash
# 检查服务状态
pm2 status

# 查看日志
pm2 logs proxy-server

# 重启服务
pm2 restart proxy-server

# 测试API
curl http://localhost:3002/health
curl https://rd.aifly.me/api/text-to-image

# 重启Web服务器
sudo systemctl restart nginx  # Nginx
sudo systemctl restart apache2  # Apache
```
