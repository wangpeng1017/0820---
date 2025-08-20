import React from 'react'
import { Card, Button } from 'antd'

const ProcessManagement: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">工艺管理</h1>
        <p className="page-description">
          管理工艺标准、首批生产跟踪和工艺-质量映射关系
        </p>
      </div>

      <Card>
        <p>工艺管理模块功能开发中...</p>
        <Button type="primary" disabled>
          功能开发中
        </Button>
      </Card>
    </div>
  )
}

export default ProcessManagement
