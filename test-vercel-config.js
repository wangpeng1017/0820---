#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 现代Vercel配置测试工具\n');

// 验证现代vercel.json配置
function validateModernVercelConfig() {
    console.log('📋 验证现代vercel.json配置...');
    
    const vercelConfigPath = path.join(process.cwd(), 'vercel.json');
    
    if (!fs.existsSync(vercelConfigPath)) {
        console.log('❌ 未找到vercel.json文件');
        return false;
    }
    
    try {
        const configContent = fs.readFileSync(vercelConfigPath, 'utf8');
        const config = JSON.parse(configContent);
        
        // 检查冲突的属性组合
        const hasBuilds = config.builds && Array.isArray(config.builds);
        const hasFunctions = config.functions && typeof config.functions === 'object';
        const hasRoutes = config.routes && Array.isArray(config.routes);
        const hasRewrites = config.rewrites && Array.isArray(config.rewrites);
        const hasHeaders = config.headers && Array.isArray(config.headers);
        
        console.log('🔍 配置属性检查:');
        console.log(`builds: ${hasBuilds ? '✅ 存在' : '❌ 不存在'}`);
        console.log(`functions: ${hasFunctions ? '✅ 存在' : '❌ 不存在'}`);
        console.log(`routes: ${hasRoutes ? '⚠️ 存在（可能冲突）' : '✅ 不存在'}`);
        console.log(`rewrites: ${hasRewrites ? '✅ 存在' : '❌ 不存在'}`);
        console.log(`headers: ${hasHeaders ? '✅ 存在' : '❌ 不存在'}`);
        
        // 检查冲突
        if (hasRoutes && (hasRewrites || hasHeaders)) {
            console.log('❌ 配置冲突: routes不能与rewrites/headers同时使用');
            return false;
        }
        
        if (hasBuilds && hasFunctions) {
            console.log('❌ 配置冲突: builds和functions不能同时使用');
            return false;
        }
        
        // 现代配置验证
        if (!hasBuilds && !hasFunctions) {
            console.log('⚠️ 警告: 既没有builds也没有functions配置');
        }
        
        // 检查函数配置
        if (hasFunctions) {
            console.log('\n🔧 函数配置检查:');
            const proxyServerConfig = config.functions['server/proxy-server.js'];
            if (proxyServerConfig) {
                console.log('✅ server/proxy-server.js 函数已配置');
                if (proxyServerConfig.maxDuration) {
                    console.log(`✅ 函数超时: ${proxyServerConfig.maxDuration}秒`);
                } else {
                    console.log('⚠️ 函数超时: 使用默认值');
                }
            } else {
                console.log('❌ server/proxy-server.js 函数未配置');
            }
        }
        
        // 检查重写规则
        if (hasRewrites) {
            console.log('\n🛣️ 重写规则检查:');
            const apiRewrite = config.rewrites.find(r => r.source.includes('/api/'));
            const healthRewrite = config.rewrites.find(r => r.source.includes('/health'));
            const spaRewrite = config.rewrites.find(r => r.destination === '/index.html');
            
            console.log(`API重写: ${apiRewrite ? '✅ 已配置' : '❌ 缺失'}`);
            console.log(`健康检查重写: ${healthRewrite ? '✅ 已配置' : '⚠️ 缺失'}`);
            console.log(`SPA重写: ${spaRewrite ? '✅ 已配置' : '⚠️ 缺失'}`);
        }
        
        // 检查CORS头
        if (hasHeaders) {
            console.log('\n🌐 CORS头检查:');
            const corsHeaders = config.headers.find(h => h.source.includes('/api/'));
            if (corsHeaders) {
                console.log('✅ API CORS头已配置');
                const allowOrigin = corsHeaders.headers.find(h => h.key === 'Access-Control-Allow-Origin');
                const allowMethods = corsHeaders.headers.find(h => h.key === 'Access-Control-Allow-Methods');
                console.log(`允许来源: ${allowOrigin ? '✅' : '❌'}`);
                console.log(`允许方法: ${allowMethods ? '✅' : '❌'}`);
            } else {
                console.log('❌ API CORS头未配置');
            }
        }
        
        console.log('\n✅ 现代vercel.json配置验证通过');
        return true;
        
    } catch (error) {
        console.log('❌ vercel.json解析失败:', error.message);
        return false;
    }
}

// 检查package.json构建脚本
function checkBuildScript() {
    console.log('\n📦 构建脚本检查...');
    
    const packagePath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(packagePath)) {
        console.log('❌ package.json不存在');
        return false;
    }
    
    try {
        const packageContent = fs.readFileSync(packagePath, 'utf8');
        const packageJson = JSON.parse(packageContent);
        
        const hasBuildScript = packageJson.scripts && packageJson.scripts.build;
        console.log(`构建脚本: ${hasBuildScript ? '✅ 已配置' : '❌ 缺失'}`);
        
        if (hasBuildScript) {
            console.log(`构建命令: ${packageJson.scripts.build}`);
        }
        
        return hasBuildScript;
    } catch (error) {
        console.log('❌ package.json解析失败:', error.message);
        return false;
    }
}

// 生成部署建议
function generateDeploymentAdvice(configValid, buildScriptValid) {
    console.log('\n💡 部署建议:');
    
    if (configValid && buildScriptValid) {
        console.log('🎉 配置完整，可以部署！');
        console.log('\n📋 部署步骤:');
        console.log('1. 在Vercel控制台设置环境变量');
        console.log('2. 推送代码到GitHub触发自动部署');
        console.log('3. 测试API端点: /api/text-to-image');
        console.log('4. 验证前端页面: /packaging-design');
    } else {
        console.log('⚠️ 配置需要完善');
        
        if (!configValid) {
            console.log('- 修复vercel.json配置问题');
        }
        
        if (!buildScriptValid) {
            console.log('- 添加package.json构建脚本');
        }
    }
}

// 主测试函数
async function runTest() {
    console.log('🎯 开始现代Vercel配置测试...\n');
    
    const configValid = validateModernVercelConfig();
    const buildScriptValid = checkBuildScript();
    
    console.log('\n📊 测试结果总结:');
    console.log(`Vercel配置: ${configValid ? '✅ 有效' : '❌ 无效'}`);
    console.log(`构建脚本: ${buildScriptValid ? '✅ 存在' : '❌ 缺失'}`);
    
    generateDeploymentAdvice(configValid, buildScriptValid);
    
    return configValid && buildScriptValid;
}

// 运行测试
runTest().catch(console.error);
