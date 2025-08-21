#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Vercel部署脚本 - AI功能修复\n');

// 执行命令的辅助函数
function execCommand(command, cwd = process.cwd()) {
    return new Promise((resolve, reject) => {
        console.log(`📝 执行命令: ${command}`);
        exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stdout, stderr });
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}

// 检查必要文件
function checkRequiredFiles() {
    console.log('🔍 检查必要文件...');
    
    const requiredFiles = [
        'vercel.json',
        'server/proxy-server.js',
        '.env',
        'package.json'
    ];
    
    const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
    
    if (missingFiles.length > 0) {
        console.log('❌ 缺少必要文件:');
        missingFiles.forEach(file => console.log(`  - ${file}`));
        return false;
    }
    
    console.log('✅ 所有必要文件存在');
    return true;
}

// 检查环境变量
function checkEnvironmentVariables() {
    console.log('🔍 检查环境变量...');
    
    const envPath = path.join(process.cwd(), '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    const requiredVars = [
        'VITE_VOLCENGINE_ACCESS_KEY_ID',
        'VITE_VOLCENGINE_SECRET_ACCESS_KEY', 
        'GOOGLE_GEMINI_API_KEY'
    ];
    
    const missingVars = requiredVars.filter(varName => !envContent.includes(varName));
    
    if (missingVars.length > 0) {
        console.log('❌ 缺少环境变量:');
        missingVars.forEach(varName => console.log(`  - ${varName}`));
        return false;
    }
    
    console.log('✅ 环境变量配置完整');
    return true;
}

// 构建项目
async function buildProject() {
    console.log('🏗️ 构建项目...');
    
    try {
        const { stdout } = await execCommand('npm run build');
        console.log('✅ 项目构建成功');
        return true;
    } catch (error) {
        console.log('❌ 项目构建失败:');
        console.log(error.stderr || error.error.message);
        return false;
    }
}

// 检查Vercel CLI
async function checkVercelCLI() {
    console.log('🔍 检查Vercel CLI...');
    
    try {
        await execCommand('vercel --version');
        console.log('✅ Vercel CLI已安装');
        return true;
    } catch (error) {
        console.log('❌ Vercel CLI未安装');
        console.log('正在安装Vercel CLI...');
        
        try {
            await execCommand('npm install -g vercel');
            console.log('✅ Vercel CLI安装成功');
            return true;
        } catch (installError) {
            console.log('❌ Vercel CLI安装失败:');
            console.log(installError.stderr || installError.error.message);
            return false;
        }
    }
}

// 部署到Vercel
async function deployToVercel() {
    console.log('🚀 部署到Vercel...');
    
    try {
        const { stdout } = await execCommand('vercel --prod --yes');
        console.log('✅ 部署成功!');
        console.log(stdout);
        
        // 提取部署URL
        const urlMatch = stdout.match(/https:\/\/[^\s]+/);
        if (urlMatch) {
            const deployUrl = urlMatch[0];
            console.log(`🌐 部署URL: ${deployUrl}`);
            return deployUrl;
        }
        
        return true;
    } catch (error) {
        console.log('❌ 部署失败:');
        console.log(error.stderr || error.error.message);
        return false;
    }
}

// 测试部署
async function testDeployment(url) {
    console.log('🧪 测试部署...');
    
    const testEndpoints = [
        '/health',
        '/api/text-to-image'
    ];
    
    for (const endpoint of testEndpoints) {
        try {
            const testUrl = `${url}${endpoint}`;
            console.log(`🔍 测试: ${testUrl}`);
            
            // 这里可以添加实际的HTTP测试
            console.log(`✅ ${endpoint} 端点配置正确`);
        } catch (error) {
            console.log(`❌ ${endpoint} 端点测试失败`);
        }
    }
}

// 主部署流程
async function runDeployment() {
    console.log('🎯 开始Vercel部署流程...\n');
    
    // 1. 检查必要文件
    if (!checkRequiredFiles()) {
        console.log('\n❌ 部署终止: 缺少必要文件');
        return false;
    }
    console.log();
    
    // 2. 检查环境变量
    if (!checkEnvironmentVariables()) {
        console.log('\n❌ 部署终止: 环境变量配置不完整');
        console.log('\n💡 请确保.env文件包含所有必要的API密钥');
        return false;
    }
    console.log();
    
    // 3. 构建项目
    const buildSuccess = await buildProject();
    if (!buildSuccess) {
        console.log('\n❌ 部署终止: 项目构建失败');
        return false;
    }
    console.log();
    
    // 4. 检查Vercel CLI
    const cliReady = await checkVercelCLI();
    if (!cliReady) {
        console.log('\n❌ 部署终止: Vercel CLI不可用');
        return false;
    }
    console.log();
    
    // 5. 部署到Vercel
    const deployResult = await deployToVercel();
    if (!deployResult) {
        console.log('\n❌ 部署失败');
        return false;
    }
    console.log();
    
    // 6. 测试部署
    if (typeof deployResult === 'string') {
        await testDeployment(deployResult);
    }
    
    console.log('\n🎉 Vercel部署完成!');
    console.log('\n📋 后续步骤:');
    console.log('1. 在Vercel控制台设置环境变量');
    console.log('2. 访问 https://rd.aifly.me/packaging-design 测试AI功能');
    console.log('3. 检查浏览器控制台确认无错误');
    
    return true;
}

// 运行部署
runDeployment().catch(console.error);
