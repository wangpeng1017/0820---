#!/bin/bash

echo "🚀 启动火山引擎API代理服务器..."
echo

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未检测到Node.js"
    echo "请先安装Node.js: https://nodejs.org/"
    exit 1
fi

# 进入server目录
cd "$(dirname "$0")/server"

# 检查package.json是否存在
if [ ! -f "package.json" ]; then
    echo "❌ 错误：未找到package.json文件"
    echo "请确保在正确的目录中运行此脚本"
    exit 1
fi

# 检查.env文件是否存在
if [ ! -f "../.env" ]; then
    echo "⚠️  警告：未找到.env文件"
    echo "请确保在项目根目录创建.env文件并配置API密钥"
    echo
fi

# 安装依赖
echo "📦 安装依赖包..."
npm install

# 启动服务器
echo
echo "🎯 启动代理服务器..."
echo "📡 服务地址: http://localhost:3002"
echo "🔑 请确保.env文件中已配置火山引擎API密钥"
echo
echo "按 Ctrl+C 停止服务器"
echo

npm start
