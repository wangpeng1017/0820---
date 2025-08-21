#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 验证生产环境修复...\n');

// 检查修复的文件
const filesToCheck = [
  'src/services/volcengineApi.ts',
  'src/services/geminiApi.ts',
  'nginx.conf',
  'docker-compose.prod.yml',
  'Dockerfile.frontend',
  'server/Dockerfile',
  'PRODUCTION_DEPLOYMENT.md'
];

let allFilesExist = true;

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - 存在`);
  } else {
    console.log(`❌ ${file} - 不存在`);
    allFilesExist = false;
  }
});

console.log('\n📋 修复内容验证：');

// 检查volcengineApi.ts中的修复
try {
  const volcengineContent = fs.readFileSync('src/services/volcengineApi.ts', 'utf8');
  if (volcengineContent.includes('getApiBaseUrl') && volcengineContent.includes('import.meta.env.PROD')) {
    console.log('✅ volcengineApi.ts - API地址修复完成');
  } else {
    console.log('❌ volcengineApi.ts - API地址修复未完成');
    allFilesExist = false;
  }
} catch (error) {
  console.log('❌ volcengineApi.ts - 读取失败');
  allFilesExist = false;
}

// 检查geminiApi.ts中的修复
try {
  const geminiContent = fs.readFileSync('src/services/geminiApi.ts', 'utf8');
  if (geminiContent.includes('getApiBaseUrl') && geminiContent.includes('import.meta.env.PROD')) {
    console.log('✅ geminiApi.ts - API地址修复完成');
  } else {
    console.log('❌ geminiApi.ts - API地址修复未完成');
    allFilesExist = false;
  }
} catch (error) {
  console.log('❌ geminiApi.ts - 读取失败');
  allFilesExist = false;
}

// 检查nginx配置
try {
  const nginxContent = fs.readFileSync('nginx.conf', 'utf8');
  if (nginxContent.includes('location /api/') && nginxContent.includes('proxy_pass http://localhost:3002')) {
    console.log('✅ nginx.conf - 反向代理配置完成');
  } else {
    console.log('❌ nginx.conf - 反向代理配置未完成');
    allFilesExist = false;
  }
} catch (error) {
  console.log('❌ nginx.conf - 读取失败');
  allFilesExist = false;
}

console.log('\n📊 修复总结：');
if (allFilesExist) {
  console.log('🎉 所有修复文件已创建并配置正确！');
  console.log('\n📋 下一步操作：');
  console.log('1. 配置环境变量（.env文件）');
  console.log('2. 构建前端应用：npm run build');
  console.log('3. 部署到生产环境');
  console.log('4. 配置Web服务器（Nginx）');
  console.log('5. 启动代理服务器');
  console.log('\n🐳 或使用Docker部署：');
  console.log('bash deploy-production.sh');
} else {
  console.log('❌ 部分修复文件缺失或配置不正确');
  console.log('请检查上述错误并重新运行修复脚本');
}

console.log('\n📖 详细部署指南请参考：PRODUCTION_DEPLOYMENT.md');
