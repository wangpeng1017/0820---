import React from 'react'
import { Result, Button } from 'antd'
import { useAuthStore } from '../../stores/authStore'

interface PermissionGuardProps {
  permissions: string[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permissions,
  children,
  fallback
}) => {
  const { user } = useAuthStore()

  // 检查用户是否有权限
  const hasPermission = () => {
    if (!user) return false
    
    // 管理员拥有所有权限
    if (user.permissions.includes('*')) return true
    
    // 检查是否有任一所需权限
    return permissions.some(permission => 
      user.permissions.includes(permission)
    )
  }

  if (!hasPermission()) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，您没有权限访问此页面。"
        extra={
          <Button type="primary" onClick={() => window.history.back()}>
            返回
          </Button>
        }
      />
    )
  }

  return <>{children}</>
}

export default PermissionGuard
