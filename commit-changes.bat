@echo off
cd /d "%~dp0"
echo 🔍 检查Git状态...
git status

echo.
echo 📋 添加所有变更文件...
git add .

echo.
echo 📝 提交变更...
git commit -m "fix: 修复生产环境AI功能问题 - 修复API调用硬编码localhost问题 - 添加环境自适应配置 - 添加生产环境部署配置 - 添加Docker部署支持 - 更新部署文档"

echo.
echo 🚀 推送到GitHub...
git push origin main

echo.
echo ✅ 提交完成！
echo 📊 查看提交历史: git log --oneline -5
echo 🌐 GitHub仓库:
git remote get-url origin

pause
