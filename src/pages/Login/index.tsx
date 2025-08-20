// 此登录组件已被禁用
// 应用现在直接显示主布局，无需登录验证

import React from 'react'
import { Card, Typography } from 'antd'

const { Title, Text } = Typography

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <Card className="login-form" style={{ width: 450 }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2} style={{ color: '#1890ff', marginBottom: 8 }}>
            登录功能已禁用
          </Title>
          <Text type="secondary">
            应用现在直接显示主界面，无需登录验证
          </Text>
        </div>
      </Card>
    </div>
  )
}

export default Login
