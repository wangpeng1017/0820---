#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 完整生产环境AI功能修复...\n');

// 执行命令的辅助函数
function execCommand(command, cwd = process.cwd()) {
    return new Promise((resolve, reject) => {
        exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stdout, stderr });
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}

// 检查环境变量
function checkEnvironmentVariables() {
    console.log('🔍 检查环境变量配置...');
    
    const envPath = path.join(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) {
        console.log('❌ 未找到.env文件');
        return false;
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    const hasVolcengineKey = envContent.includes('VITE_VOLCENGINE_ACCESS_KEY_ID');
    const hasVolcengineSecret = envContent.includes('VITE_VOLCENGINE_SECRET_ACCESS_KEY');
    const hasGeminiKey = envContent.includes('GOOGLE_GEMINI_API_KEY');
    
    if (hasVolcengineKey && hasVolcengineSecret && hasGeminiKey) {
        console.log('✅ 环境变量配置完整');
        return true;
    } else {
        console.log('❌ 环境变量配置不完整');
        console.log(`火山引擎AccessKey: ${hasVolcengineKey ? '✅' : '❌'}`);
        console.log(`火山引擎SecretKey: ${hasVolcengineSecret ? '✅' : '❌'}`);
        console.log(`Gemini API Key: ${hasGeminiKey ? '✅' : '❌'}`);
        return false;
    }
}

// 检查代理服务器状态
async function checkProxyServer() {
    console.log('🔍 检查代理服务器状态...');
    
    try {
        const { stdout } = await execCommand('pm2 status');
        if (stdout.includes('proxy-server') && stdout.includes('online')) {
            console.log('✅ 代理服务器运行正常');
            return true;
        } else {
            console.log('❌ 代理服务器未运行');
            return false;
        }
    } catch (error) {
        console.log('❌ 无法检查代理服务器状态');
        console.log('错误:', error.stderr || error.error.message);
        return false;
    }
}

// 测试本地API
function testLocalAPI() {
    return new Promise((resolve) => {
        console.log('🔍 测试本地API端点...');
        
        const http = require('http');
        const req = http.get('http://localhost:3002/health', (res) => {
            if (res.statusCode === 200) {
                console.log('✅ 本地API端点正常');
                resolve(true);
            } else {
                console.log(`❌ 本地API响应异常: ${res.statusCode}`);
                resolve(false);
            }
        });
        
        req.on('error', (err) => {
            console.log(`❌ 本地API连接失败: ${err.message}`);
            resolve(false);
        });
        
        req.setTimeout(5000, () => {
            console.log('❌ 本地API连接超时');
            req.destroy();
            resolve(false);
        });
    });
}

// 主修复流程
async function runCompleteFix() {
    console.log('🎯 开始完整修复流程...\n');
    
    // 1. 检查环境变量
    const envOK = checkEnvironmentVariables();
    console.log();
    
    // 2. 检查代理服务器
    const proxyOK = await checkProxyServer();
    console.log();
    
    // 3. 测试本地API
    const localAPIK = await testLocalAPI();
    console.log();
    
    // 4. 生成修复报告
    console.log('📊 修复状态报告:');
    console.log(`环境变量配置: ${envOK ? '✅ 正常' : '❌ 需要修复'}`);
    console.log(`代理服务器: ${proxyOK ? '✅ 正常' : '❌ 需要启动'}`);
    console.log(`本地API端点: ${localAPIK ? '✅ 正常' : '❌ 需要修复'}`);
    console.log();
    
    // 5. 提供修复建议
    if (!envOK) {
        console.log('🔧 环境变量修复建议:');
        console.log('请确保.env文件包含所有必要的API密钥');
        console.log();
    }
    
    if (!proxyOK) {
        console.log('🔧 代理服务器修复建议:');
        console.log('运行: pm2 start server/proxy-server.js --name "proxy-server"');
        console.log();
    }
    
    if (!localAPIK) {
        console.log('🔧 本地API修复建议:');
        console.log('检查代理服务器日志: pm2 logs proxy-server');
        console.log();
    }
    
    // 6. Web服务器配置提醒
    console.log('🌐 Web服务器配置提醒:');
    console.log('请确保您的Web服务器(Nginx/Apache/IIS)配置了反向代理');
    console.log('将 /api/* 请求转发到 http://localhost:3002');
    console.log();
    console.log('📁 配置文件已准备:');
    console.log('- nginx-production.conf (Nginx配置)');
    console.log('- deploy-nginx-config.sh (Linux部署脚本)');
    console.log('- deploy-nginx-config.bat (Windows部署脚本)');
    console.log();
    
    // 7. 最终状态
    const allOK = envOK && proxyOK && localAPIK;
    if (allOK) {
        console.log('🎉 本地环境修复完成！');
        console.log('下一步: 配置生产Web服务器反向代理');
    } else {
        console.log('⚠️  仍有问题需要解决，请按照上述建议操作');
    }
    
    return allOK;
}

// 运行修复
runCompleteFix().catch(console.error);
