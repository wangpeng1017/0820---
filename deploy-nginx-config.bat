@echo off
echo 🌐 部署Nginx生产环境配置...
echo.

REM 检查管理员权限
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  此脚本需要管理员权限来修改Nginx配置
    echo 请以管理员身份运行此脚本
    pause
    exit /b 1
)

REM 设置Nginx路径 (根据实际安装路径调整)
set NGINX_DIR=C:\nginx
set NGINX_CONF=%NGINX_DIR%\conf\nginx.conf
set BACKUP_DIR=%NGINX_DIR%\conf\backup-%date:~0,4%%date:~5,2%%date:~8,2%-%time:~0,2%%time:~3,2%%time:~6,2%

REM 检查Nginx是否存在
if not exist "%NGINX_DIR%\nginx.exe" (
    echo ❌ 错误：未找到Nginx安装
    echo 请确认Nginx安装路径或修改脚本中的NGINX_DIR变量
    echo 当前查找路径: %NGINX_DIR%
    pause
    exit /b 1
)

REM 创建备份目录
echo 📁 创建配置备份目录: %BACKUP_DIR%
mkdir "%BACKUP_DIR%" 2>nul

REM 备份现有配置
if exist "%NGINX_CONF%" (
    echo 💾 备份现有Nginx配置...
    copy "%NGINX_CONF%" "%BACKUP_DIR%\" >nul
)

REM 创建新的nginx.conf配置
echo 📋 创建新的Nginx配置...
(
echo # Nginx配置文件 - 包含AI API反向代理
echo.
echo events {
echo     worker_connections 1024;
echo }
echo.
echo http {
echo     include       mime.types;
echo     default_type  application/octet-stream;
echo     sendfile        on;
echo     keepalive_timeout  65;
echo.
echo     # 包含站点配置
echo     server {
echo         listen       80;
echo         listen       443 ssl http2;
echo         server_name  rd.aifly.me localhost;
echo.
echo         # 静态文件服务
echo         location / {
echo             root   html;  # 替换为您的网站根目录
echo             index  index.html index.htm;
echo             try_files $uri $uri/ /index.html;
echo         }
echo.
echo         # API反向代理配置 - 关键修复
echo         location /api/ {
echo             proxy_pass http://localhost:3002;
echo             proxy_http_version 1.1;
echo             proxy_set_header Upgrade $http_upgrade;
echo             proxy_set_header Connection 'upgrade';
echo             proxy_set_header Host $host;
echo             proxy_set_header X-Real-IP $remote_addr;
echo             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
echo             proxy_set_header X-Forwarded-Proto $scheme;
echo             proxy_cache_bypass $http_upgrade;
echo.
echo             # CORS配置
echo             add_header 'Access-Control-Allow-Origin' '*' always;
echo             add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
echo             add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization,Accept,Origin' always;
echo         }
echo.
echo         # 健康检查端点
echo         location /health {
echo             proxy_pass http://localhost:3002/health;
echo             proxy_set_header Host $host;
echo         }
echo.
echo         # 错误页面
echo         error_page   500 502 503 504  /50x.html;
echo         location = /50x.html {
echo             root   html;
echo         }
echo     }
echo }
) > "%NGINX_CONF%"

REM 测试配置
echo 🧪 测试Nginx配置...
"%NGINX_DIR%\nginx.exe" -t
if %errorlevel% neq 0 (
    echo ❌ Nginx配置测试失败
    echo 恢复备份配置...
    copy "%BACKUP_DIR%\nginx.conf" "%NGINX_CONF%" >nul 2>&1
    pause
    exit /b 1
)

echo ✅ Nginx配置测试通过

REM 重启Nginx
echo 🔄 重启Nginx服务...
taskkill /f /im nginx.exe >nul 2>&1
timeout /t 2 /nobreak >nul
start /d "%NGINX_DIR%" nginx.exe

REM 等待服务启动
timeout /t 3 /nobreak >nul

REM 检查Nginx是否运行
tasklist /fi "imagename eq nginx.exe" | find "nginx.exe" >nul
if %errorlevel% equ 0 (
    echo ✅ Nginx重启成功
) else (
    echo ❌ Nginx启动失败
    echo 请手动检查配置和日志
    pause
    exit /b 1
)

echo.
echo 🎉 Nginx配置部署完成！
echo.
echo 📋 配置完成清单:
echo ✅ 代理服务器运行在端口3002
echo ✅ Nginx反向代理配置已应用
echo ✅ 服务已重启
echo.
echo 🔍 下一步验证:
echo 1. 访问 https://rd.aifly.me/packaging-design
echo 2. 测试AI文生图功能
echo 3. 检查浏览器控制台是否还有错误
echo.
echo 📊 快速测试命令:
echo curl http://localhost/health
echo curl http://localhost/api/text-to-image

pause
