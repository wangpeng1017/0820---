import React from 'react'
import { Card, Button } from 'antd'

const FlavorManagement: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">香精管理</h1>
        <p className="page-description">
          管理香精配方、调配工单、原料库存和供应商评价
        </p>
      </div>

      <Card>
        <p>香精管理模块功能开发中...</p>
        <Button type="primary" disabled>
          功能开发中
        </Button>
      </Card>
    </div>
  )
}

export default FlavorManagement
