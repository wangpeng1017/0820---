#!/bin/bash

echo "🚀 开始生产环境部署..."
echo

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ 错误：未检测到Docker"
    echo "请先安装Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ 错误：未检测到Docker Compose"
    echo "请先安装Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi

# 检查.env文件
if [ ! -f ".env" ]; then
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

# 停止现有容器
echo "🛑 停止现有容器..."
docker-compose -f docker-compose.prod.yml down

# 构建镜像
echo "🔨 构建Docker镜像..."
docker-compose -f docker-compose.prod.yml build --no-cache

# 启动服务
echo "🚀 启动服务..."
docker-compose -f docker-compose.prod.yml up -d

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo "🔍 检查服务状态..."
docker-compose -f docker-compose.prod.yml ps

# 健康检查
echo "🏥 执行健康检查..."
sleep 5

# 检查代理服务器
if curl -f http://localhost:3002/health > /dev/null 2>&1; then
    echo "✅ 代理服务器运行正常"
else
    echo "❌ 代理服务器健康检查失败"
    echo "查看日志："
    docker-compose -f docker-compose.prod.yml logs proxy-server
    exit 1
fi

# 检查前端服务
if curl -f http://localhost > /dev/null 2>&1; then
    echo "✅ 前端服务运行正常"
else
    echo "❌ 前端服务健康检查失败"
    echo "查看日志："
    docker-compose -f docker-compose.prod.yml logs frontend
    exit 1
fi

echo
echo "🎉 部署完成！"
echo "📡 应用地址: http://localhost"
echo "🔧 代理服务器: http://localhost:3002"
echo
echo "📊 查看日志: docker-compose -f docker-compose.prod.yml logs -f"
echo "🛑 停止服务: docker-compose -f docker-compose.prod.yml down"
echo "🔄 重启服务: docker-compose -f docker-compose.prod.yml restart"
echo

# 显示容器状态
echo "📋 当前容器状态："
docker-compose -f docker-compose.prod.yml ps
