# 🔑 Vercel环境变量设置指南

## 📋 快速设置步骤

### 1. 访问Vercel项目设置
打开链接：https://vercel.com/wangpeng10170414-1653s-projects/0820jiaotianxiang/settings/environment-variables

### 2. 添加环境变量

点击"Add New"按钮，依次添加以下3个环境变量：

#### 变量1: 火山引擎Access Key
- **Name**: `VITE_VOLCENGINE_ACCESS_KEY_ID`
- **Value**: 从项目.env文件复制对应值
- **Environments**: 选择 Production, Preview, Development

#### 变量2: 火山引擎Secret Key
- **Name**: `VITE_VOLCENGINE_SECRET_ACCESS_KEY`
- **Value**: 从项目.env文件复制对应值
- **Environments**: 选择 Production, Preview, Development

#### 变量3: Google Gemini API Key
- **Name**: `GOOGLE_GEMINI_API_KEY`
- **Value**: 从项目.env文件复制对应值
- **Environments**: 选择 Production, Preview, Development

### 3. 触发重新部署

环境变量设置完成后：
1. 访问 https://vercel.com/wangpeng10170414-1653s-projects/0820jiaotianxiang/deployments
2. 点击最新部署右侧的"..."菜单
3. 选择"Redeploy"重新部署

### 4. 验证部署

重新部署完成后，测试以下链接：
- 健康检查: https://rd.aifly.me/health
- 主页面: https://rd.aifly.me/packaging-design

## 🎯 预期结果

设置完成后，AI文生图功能应该可以正常工作：
1. 访问 https://rd.aifly.me/packaging-design
2. 点击"创意设计"选项卡
3. 输入文本描述并点击"生成设计图"
4. 应该能成功生成AI图片

## 🔧 故障排除

如果仍有问题：
1. 检查环境变量名是否完全匹配
2. 确认所有3个环境都已选择
3. 重新部署项目
4. 查看Vercel函数日志

## 📞 技术支持

如需帮助，请提供：
- Vercel部署日志截图
- 浏览器控制台错误信息
- 环境变量设置截图
