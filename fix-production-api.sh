#!/bin/bash

echo "🔧 修复生产环境AI API问题..."
echo

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未检测到Node.js"
    echo "请先安装Node.js: https://nodejs.org/"
    exit 1
fi

# 检查PM2
if ! command -v pm2 &> /dev/null; then
    echo "📦 安装PM2进程管理器..."
    npm install -g pm2
fi

# 进入server目录
cd server

# 检查环境变量
if [ ! -f "../.env" ]; then
    echo "⚠️  警告：未找到.env文件"
    echo "请创建.env文件并配置以下环境变量："
    echo "VITE_VOLCENGINE_ACCESS_KEY_ID=your_access_key_id"
    echo "VITE_VOLCENGINE_SECRET_ACCESS_KEY=your_secret_access_key"
    echo "VITE_GEMINI_API_KEY=your_gemini_api_key"
    echo
    read -p "是否继续部署？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 安装依赖
echo "📦 安装代理服务器依赖..."
npm install

# 停止现有的代理服务器进程
echo "🛑 停止现有代理服务器..."
pm2 stop proxy-server 2>/dev/null || true
pm2 delete proxy-server 2>/dev/null || true

# 启动代理服务器
echo "🚀 启动代理服务器..."
pm2 start proxy-server.js --name "proxy-server"

# 设置开机自启
pm2 startup
pm2 save

echo "✅ 代理服务器部署完成！"
echo "📡 服务地址: http://localhost:3002"
echo "🔍 检查状态: pm2 status"
echo "📊 查看日志: pm2 logs proxy-server"

# 检查服务状态
sleep 3
echo
echo "🏥 健康检查..."
if curl -f http://localhost:3002/health > /dev/null 2>&1; then
    echo "✅ 代理服务器运行正常"
else
    echo "❌ 代理服务器健康检查失败"
    echo "查看日志: pm2 logs proxy-server"
    exit 1
fi

echo
echo "🌐 下一步：配置Nginx反向代理"
echo "请将以下配置添加到Nginx配置文件中："
echo
echo "location /api/ {"
echo "    proxy_pass http://localhost:3002;"
echo "    proxy_http_version 1.1;"
echo "    proxy_set_header Upgrade \$http_upgrade;"
echo "    proxy_set_header Connection 'upgrade';"
echo "    proxy_set_header Host \$host;"
echo "    proxy_set_header X-Real-IP \$remote_addr;"
echo "    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;"
echo "    proxy_set_header X-Forwarded-Proto \$scheme;"
echo "    proxy_cache_bypass \$http_upgrade;"
echo "}"
echo
echo "然后重启Nginx: sudo systemctl restart nginx"
