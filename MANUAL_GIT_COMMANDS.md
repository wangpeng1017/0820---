# 手动执行Git提交命令

由于无法自动定位项目目录，请您手动执行以下步骤：

## 🔍 步骤1：打开项目目录
1. 打开文件资源管理器
2. 导航到包含 `package.json` 文件的项目根目录
3. 在该目录中右键点击，选择"在终端中打开"或"Open PowerShell window here"

## 📋 步骤2：执行Git命令
在打开的终端中，依次执行以下命令：

### 检查Git状态
```bash
git status
```

### 添加所有变更文件
```bash
git add .
```

### 提交变更
```bash
git commit -m "fix: 修复生产环境AI功能问题

- 修复前端API调用硬编码localhost:3002的问题
- 添加环境自适应API地址配置
- 文生图功能现在可以在生产环境正常工作
- 智能报告生成功能现在可以在生产环境正常工作
- 添加生产环境部署配置和Docker支持
- 更新部署文档和故障排除指南"
```

### 推送到GitHub
```bash
git push origin main
```

### 验证提交（可选）
```bash
git log --oneline -3
```

## 🚀 或者使用批处理文件
您也可以直接双击运行项目根目录中的以下文件之一：
- `git-commit.cmd` - Windows命令行版本
- `commit-changes.bat` - Windows批处理版本
- `commit-changes.ps1` - PowerShell版本

## 📊 本次提交包含的变更
- ✅ 修复了2个核心文件的API调用问题
- ✅ 新增了5个部署配置文件
- ✅ 新增了3个主要文档文件
- ✅ 新增了6个工具脚本文件

## 🎯 提交后的效果
提交完成后，您的GitHub仓库将包含完整的生产环境AI功能修复方案，包括：
1. 修复的前端代码
2. 完整的Docker部署配置
3. 详细的部署文档
4. 一键部署脚本

如果遇到任何问题，请告诉我！
