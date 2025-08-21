@echo off
echo 🚀 启动火山引擎API代理服务器...
echo.

REM 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误：未检测到Node.js
    echo 请先安装Node.js: https://nodejs.org/
    pause
    exit /b 1
)

REM 进入server目录
cd /d "%~dp0server"

REM 检查package.json是否存在
if not exist "package.json" (
    echo ❌ 错误：未找到package.json文件
    echo 请确保在正确的目录中运行此脚本
    pause
    exit /b 1
)

REM 检查.env文件是否存在
if not exist "../.env" (
    echo ⚠️  警告：未找到.env文件
    echo 请确保在项目根目录创建.env文件并配置API密钥
    echo.
)

REM 安装依赖
echo 📦 安装依赖包...
npm install

REM 启动服务器
echo.
echo 🎯 启动代理服务器...
echo 📡 服务地址: http://localhost:3002
echo 🔑 请确保.env文件中已配置火山引擎API密钥
echo.
echo 按 Ctrl+C 停止服务器
echo.

npm start
