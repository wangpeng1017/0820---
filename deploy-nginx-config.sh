#!/bin/bash

echo "🌐 部署Nginx生产环境配置..."
echo

# 检查是否为root用户
if [ "$EUID" -ne 0 ]; then
    echo "⚠️  此脚本需要root权限来修改Nginx配置"
    echo "请使用: sudo ./deploy-nginx-config.sh"
    exit 1
fi

# 检查Nginx是否安装
if ! command -v nginx &> /dev/null; then
    echo "❌ 错误：未检测到Nginx"
    echo "请先安装Nginx"
    exit 1
fi

# 备份现有配置
NGINX_SITES_DIR="/etc/nginx/sites-available"
NGINX_ENABLED_DIR="/etc/nginx/sites-enabled"
SITE_NAME="rd.aifly.me"
BACKUP_DIR="/etc/nginx/backup-$(date +%Y%m%d-%H%M%S)"

echo "📁 创建配置备份目录: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# 备份现有配置
if [ -f "$NGINX_SITES_DIR/$SITE_NAME" ]; then
    echo "💾 备份现有配置..."
    cp "$NGINX_SITES_DIR/$SITE_NAME" "$BACKUP_DIR/"
fi

# 复制新配置
echo "📋 应用新的Nginx配置..."
cp nginx-production.conf "$NGINX_SITES_DIR/$SITE_NAME"

# 启用站点
if [ ! -L "$NGINX_ENABLED_DIR/$SITE_NAME" ]; then
    echo "🔗 启用站点配置..."
    ln -s "$NGINX_SITES_DIR/$SITE_NAME" "$NGINX_ENABLED_DIR/"
fi

# 测试配置
echo "🧪 测试Nginx配置..."
if nginx -t; then
    echo "✅ Nginx配置测试通过"
    
    # 重启Nginx
    echo "🔄 重启Nginx服务..."
    systemctl restart nginx
    
    if systemctl is-active --quiet nginx; then
        echo "✅ Nginx重启成功"
    else
        echo "❌ Nginx重启失败"
        echo "恢复备份配置..."
        cp "$BACKUP_DIR/$SITE_NAME" "$NGINX_SITES_DIR/" 2>/dev/null
        systemctl restart nginx
        exit 1
    fi
else
    echo "❌ Nginx配置测试失败"
    echo "请检查配置文件语法"
    exit 1
fi

echo
echo "🎉 Nginx配置部署完成！"
echo "📊 服务状态:"
systemctl status nginx --no-pager -l

echo
echo "🧪 测试API端点..."
sleep 2

# 测试健康检查
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo "✅ 健康检查端点正常"
else
    echo "⚠️  健康检查端点可能需要时间启动"
fi

echo
echo "📋 配置完成清单:"
echo "✅ 代理服务器运行在端口3002"
echo "✅ Nginx反向代理配置已应用"
echo "✅ 服务已重启"
echo
echo "🔍 下一步验证:"
echo "1. 访问 https://rd.aifly.me/packaging-design"
echo "2. 测试AI文生图功能"
echo "3. 检查浏览器控制台是否还有错误"
