#!/usr/bin/env node

const https = require('https');
const http = require('http');

console.log('🧪 测试生产环境API配置...\n');

// 测试本地代理服务器
function testLocalProxy() {
    return new Promise((resolve) => {
        console.log('🔍 测试本地代理服务器 (http://localhost:3002)...');
        
        const req = http.get('http://localhost:3002/health', (res) => {
            if (res.statusCode === 200) {
                console.log('✅ 本地代理服务器运行正常');
                resolve(true);
            } else {
                console.log(`❌ 本地代理服务器响应异常: ${res.statusCode}`);
                resolve(false);
            }
        });
        
        req.on('error', (err) => {
            console.log(`❌ 本地代理服务器连接失败: ${err.message}`);
            resolve(false);
        });
        
        req.setTimeout(5000, () => {
            console.log('❌ 本地代理服务器连接超时');
            req.destroy();
            resolve(false);
        });
    });
}

// 测试生产环境API端点
function testProductionAPI() {
    return new Promise((resolve) => {
        console.log('🔍 测试生产环境API端点 (https://rd.aifly.me/api/text-to-image)...');
        
        const postData = JSON.stringify({
            prompt: "test",
            model_version: "general_v1.4",
            width: 512,
            height: 512
        });
        
        const options = {
            hostname: 'rd.aifly.me',
            port: 443,
            path: '/api/text-to-image',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        
        const req = https.request(options, (res) => {
            console.log(`📊 生产环境API响应状态: ${res.statusCode}`);
            
            if (res.statusCode === 200) {
                console.log('✅ 生产环境API端点正常');
                resolve(true);
            } else if (res.statusCode === 404) {
                console.log('❌ 生产环境API端点不存在 (404)');
                console.log('💡 需要配置Web服务器反向代理');
                resolve(false);
            } else {
                console.log(`⚠️  生产环境API端点响应异常: ${res.statusCode}`);
                resolve(false);
            }
        });
        
        req.on('error', (err) => {
            console.log(`❌ 生产环境API连接失败: ${err.message}`);
            resolve(false);
        });
        
        req.setTimeout(10000, () => {
            console.log('❌ 生产环境API连接超时');
            req.destroy();
            resolve(false);
        });
        
        req.write(postData);
        req.end();
    });
}

// 主测试函数
async function runTests() {
    console.log('🚀 开始API配置测试...\n');
    
    const localProxyOK = await testLocalProxy();
    console.log();
    
    const productionAPIK = await testProductionAPI();
    console.log();
    
    console.log('📋 测试结果总结:');
    console.log(`本地代理服务器: ${localProxyOK ? '✅ 正常' : '❌ 异常'}`);
    console.log(`生产环境API: ${productionAPIK ? '✅ 正常' : '❌ 异常'}`);
    console.log();
    
    if (!localProxyOK) {
        console.log('🔧 修复建议:');
        console.log('1. 运行 fix-production-api.sh (Linux/Mac) 或 fix-production-api.bat (Windows)');
        console.log('2. 检查环境变量配置 (.env文件)');
        console.log('3. 确保端口3002未被占用');
    }
    
    if (!productionAPIK) {
        console.log('🌐 Web服务器配置建议:');
        console.log('1. 配置反向代理将 /api/* 请求转发到 http://localhost:3002');
        console.log('2. 重启Web服务器 (Nginx/Apache/IIS)');
        console.log('3. 检查防火墙设置');
    }
    
    if (localProxyOK && productionAPIK) {
        console.log('🎉 所有测试通过！AI功能应该可以正常工作了。');
    }
}

// 运行测试
runTests().catch(console.error);
