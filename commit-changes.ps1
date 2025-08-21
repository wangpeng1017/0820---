# PowerShell脚本用于提交Git变更
Write-Host "🔍 检查Git状态..." -ForegroundColor Green
git status

Write-Host "`n📋 添加所有变更文件..." -ForegroundColor Green
git add .

Write-Host "`n📝 提交变更..." -ForegroundColor Green
git commit -m "fix: 修复生产环境AI功能问题

- 修复前端API调用硬编码localhost:3002的问题
- 添加环境自适应API地址配置
- 文生图功能现在可以在生产环境正常工作
- 智能报告生成功能现在可以在生产环境正常工作
- 添加生产环境部署配置和Docker支持
- 更新部署文档和故障排除指南"

Write-Host "`n🚀 推送到GitHub..." -ForegroundColor Green
git push origin main

Write-Host "`n✅ 提交完成！" -ForegroundColor Green
Write-Host "📊 查看提交历史:" -ForegroundColor Yellow
git log --oneline -3

Write-Host "`n🌐 GitHub仓库:" -ForegroundColor Yellow
git remote get-url origin
