import { create } from 'zustand'

export interface User {
  id: string
  username: string
  name: string
  role: string
  department: string
  avatar?: string
  permissions: string[]
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  logout: () => void
  setUser: (user: User) => void
}

// 模拟用户数据（已禁用，保留用于参考）
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin': {
    password: '123456',
    user: {
      id: '1',
      username: 'admin',
      name: '系统管理员',
      role: 'admin',
      department: '技术中心',
      avatar: '',
      permissions: ['*']
    }
  },
  'product_manager': {
    password: '123456',
    user: {
      id: '2',
      username: 'product_manager',
      name: '张产品',
      role: 'product_manager',
      department: '产品研发部',
      avatar: '',
      permissions: ['market_insight', 'design_planning', 'project_management']
    }
  },
  'formula_engineer': {
    password: '123456',
    user: {
      id: '3',
      username: 'formula_engineer',
      name: '李配方',
      role: 'formula_engineer',
      department: '配方研发部',
      avatar: '',
      permissions: ['formula_design', 'material_management', 'quality_control']
    }
  },
  'lab_technician': {
    password: '123456',
    user: {
      id: '4',
      username: 'lab_technician',
      name: '王实验',
      role: 'lab_technician',
      department: '检测中心',
      avatar: '',
      permissions: ['lims', 'quality_testing', 'data_analysis']
    }
  },
  'process_engineer': {
    password: '123456',
    user: {
      id: '5',
      username: 'process_engineer',
      name: '赵工艺',
      role: 'process_engineer',
      department: '工艺技术部',
      avatar: '',
      permissions: ['process_design', 'material_management', 'quality_control']
    }
  }
}

// 默认管理员用户
const defaultUser: User = {
  id: '1',
  username: 'admin',
  name: '系统管理员',
  role: 'admin',
  department: '技术中心',
  avatar: '',
  permissions: ['*']
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true, // 默认已认证
  user: defaultUser, // 设置默认用户

  logout: () => {
    // 登出功能设为无效操作，保持当前状态
    console.log('登出功能已禁用')
  },

  setUser: (user: User) => {
    set({
      isAuthenticated: true,
      user
    })
  }
}))

// 应用启动时自动设置默认用户（无需localStorage检查）
// 默认用户已在store初始化时设置
