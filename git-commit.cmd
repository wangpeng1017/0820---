@echo off
cd /d "%~dp0"
echo 🔍 当前目录: %CD%
echo 📋 检查Git状态...
git status
if %errorlevel% neq 0 (
    echo ❌ Git状态检查失败，请确保在Git仓库中
    pause
    exit /b 1
)

echo 📝 添加所有文件...
git add .

echo 🚀 提交变更...
git commit -m "fix: 修复生产环境AI功能问题

- 修复前端API调用硬编码localhost:3002的问题
- 添加环境自适应API地址配置
- 文生图功能现在可以在生产环境正常工作
- 智能报告生成功能现在可以在生产环境正常工作
- 添加生产环境部署配置和Docker支持
- 更新部署文档和故障排除指南"

echo 🌐 推送到GitHub...
git push origin main

echo ✅ Git操作完成！
pause
