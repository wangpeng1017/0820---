#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Vercel配置验证工具\n');

// 验证vercel.json配置
function validateVercelConfig() {
    console.log('📋 验证vercel.json配置...');
    
    const vercelConfigPath = path.join(process.cwd(), 'vercel.json');
    
    if (!fs.existsSync(vercelConfigPath)) {
        console.log('❌ 未找到vercel.json文件');
        return false;
    }
    
    try {
        const configContent = fs.readFileSync(vercelConfigPath, 'utf8');
        const config = JSON.parse(configContent);
        
        // 检查冲突的属性
        const hasBuilds = config.builds && Array.isArray(config.builds);
        const hasFunctions = config.functions && typeof config.functions === 'object';
        
        console.log(`builds属性: ${hasBuilds ? '✅ 存在' : '❌ 缺失'}`);
        console.log(`functions属性: ${hasFunctions ? '❌ 存在（冲突）' : '✅ 不存在'}`);
        
        if (hasBuilds && hasFunctions) {
            console.log('❌ 配置错误: builds和functions属性不能同时存在');
            return false;
        }
        
        if (!hasBuilds && !hasFunctions) {
            console.log('❌ 配置错误: 必须有builds或functions属性之一');
            return false;
        }
        
        // 检查必要的配置
        const checks = [
            { name: 'version', exists: config.version === 2, required: true },
            { name: 'builds', exists: hasBuilds, required: true },
            { name: 'routes', exists: config.routes && Array.isArray(config.routes), required: true },
            { name: 'env', exists: config.env && typeof config.env === 'object', required: false },
            { name: 'headers', exists: config.headers && Array.isArray(config.headers), required: false },
            { name: 'rewrites', exists: config.rewrites && Array.isArray(config.rewrites), required: false }
        ];
        
        console.log('\n📊 配置项检查:');
        let allRequired = true;
        
        checks.forEach(check => {
            const status = check.exists ? '✅' : (check.required ? '❌' : '⚠️');
            const label = check.required ? '必需' : '可选';
            console.log(`${status} ${check.name} (${label}): ${check.exists ? '已配置' : '未配置'}`);
            
            if (check.required && !check.exists) {
                allRequired = false;
            }
        });
        
        if (!allRequired) {
            console.log('\n❌ 配置验证失败: 缺少必需的配置项');
            return false;
        }
        
        // 检查builds配置
        if (hasBuilds) {
            console.log('\n🏗️ 构建配置检查:');
            const staticBuild = config.builds.find(build => build.use === '@vercel/static-build');
            const nodeBuild = config.builds.find(build => build.use === '@vercel/node');
            
            console.log(`静态构建: ${staticBuild ? '✅ 已配置' : '❌ 缺失'}`);
            console.log(`Node.js函数: ${nodeBuild ? '✅ 已配置' : '❌ 缺失'}`);
            
            if (nodeBuild && nodeBuild.config && nodeBuild.config.maxDuration) {
                console.log(`函数超时: ✅ ${nodeBuild.config.maxDuration}秒`);
            } else {
                console.log('函数超时: ⚠️ 使用默认值');
            }
        }
        
        // 检查路由配置
        if (config.routes) {
            console.log('\n🛣️ 路由配置检查:');
            const apiRoute = config.routes.find(route => route.src.includes('/api/'));
            const healthRoute = config.routes.find(route => route.src.includes('/health'));
            const staticRoute = config.routes.find(route => route.dest && route.dest.includes('/dist/'));
            
            console.log(`API路由: ${apiRoute ? '✅ 已配置' : '❌ 缺失'}`);
            console.log(`健康检查路由: ${healthRoute ? '✅ 已配置' : '⚠️ 缺失'}`);
            console.log(`静态文件路由: ${staticRoute ? '✅ 已配置' : '❌ 缺失'}`);
        }
        
        console.log('\n✅ vercel.json配置验证通过');
        return true;
        
    } catch (error) {
        console.log('❌ vercel.json解析失败:', error.message);
        return false;
    }
}

// 检查必要文件
function checkRequiredFiles() {
    console.log('\n📁 必要文件检查...');
    
    const requiredFiles = [
        { path: 'vercel.json', name: 'Vercel配置文件' },
        { path: 'server/proxy-server.js', name: 'API代理服务器' },
        { path: 'package.json', name: '项目配置文件' },
        { path: '.env', name: '环境变量文件' }
    ];
    
    let allExists = true;
    
    requiredFiles.forEach(file => {
        const exists = fs.existsSync(file.path);
        console.log(`${exists ? '✅' : '❌'} ${file.name}: ${file.path}`);
        if (!exists) allExists = false;
    });
    
    return allExists;
}

// 验证环境变量
function validateEnvironmentVariables() {
    console.log('\n🔑 环境变量检查...');
    
    const envPath = path.join(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) {
        console.log('❌ .env文件不存在');
        return false;
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    const requiredVars = [
        'VITE_VOLCENGINE_ACCESS_KEY_ID',
        'VITE_VOLCENGINE_SECRET_ACCESS_KEY',
        'GOOGLE_GEMINI_API_KEY'
    ];
    
    let allConfigured = true;
    
    requiredVars.forEach(varName => {
        const exists = envContent.includes(varName);
        console.log(`${exists ? '✅' : '❌'} ${varName}`);
        if (!exists) allConfigured = false;
    });
    
    return allConfigured;
}

// 主验证函数
async function runValidation() {
    console.log('🎯 开始Vercel配置验证...\n');
    
    const configValid = validateVercelConfig();
    const filesExist = checkRequiredFiles();
    const envValid = validateEnvironmentVariables();
    
    console.log('\n📊 验证结果总结:');
    console.log(`Vercel配置: ${configValid ? '✅ 通过' : '❌ 失败'}`);
    console.log(`必要文件: ${filesExist ? '✅ 完整' : '❌ 缺失'}`);
    console.log(`环境变量: ${envValid ? '✅ 配置' : '❌ 缺失'}`);
    
    const allValid = configValid && filesExist && envValid;
    
    console.log(`\n${allValid ? '🎉' : '❌'} 总体状态: ${allValid ? '准备就绪' : '需要修复'}`);
    
    if (allValid) {
        console.log('\n🚀 配置验证通过！可以部署到Vercel。');
        console.log('\n📋 下一步:');
        console.log('1. 在Vercel控制台设置环境变量');
        console.log('2. 推送代码触发自动部署');
        console.log('3. 测试API端点功能');
    } else {
        console.log('\n🔧 请修复上述问题后重新验证。');
    }
    
    return allValid;
}

// 运行验证
runValidation().catch(console.error);
