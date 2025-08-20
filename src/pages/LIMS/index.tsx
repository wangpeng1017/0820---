import React from 'react'
import { Card, Button } from 'antd'

const LIMS: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">实验管理 (LIMS)</h1>
        <p className="page-description">
          实验室信息管理系统，包含检测业务流程、仪器数据采集和体系文件管理
        </p>
      </div>

      <Card>
        <p>LIMS模块功能开发中...</p>
        <Button type="primary" disabled>
          功能开发中
        </Button>
      </Card>
    </div>
  )
}

export default LIMS
