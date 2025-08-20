// 用户角色常量
export const USER_ROLES = {
  ADMIN: 'admin',
  PRODUCT_MANAGER: 'product_manager',
  FORMULA_ENGINEER: 'formula_engineer',
  LAB_TECHNICIAN: 'lab_technician',
  PROCESS_ENGINEER: 'process_engineer',
  QUALITY_MANAGER: 'quality_manager',
  MATERIAL_ENGINEER: 'material_engineer',
  RESEARCH_SCIENTIST: 'research_scientist'
} as const

// 用户角色显示名称
export const USER_ROLE_NAMES = {
  [USER_ROLES.ADMIN]: '系统管理员',
  [USER_ROLES.PRODUCT_MANAGER]: '产品经理',
  [USER_ROLES.FORMULA_ENGINEER]: '配方工程师',
  [USER_ROLES.LAB_TECHNICIAN]: '实验室技术员',
  [USER_ROLES.PROCESS_ENGINEER]: '工艺工程师',
  [USER_ROLES.QUALITY_MANAGER]: '质量管理员',
  [USER_ROLES.MATERIAL_ENGINEER]: '材料工程师',
  [USER_ROLES.RESEARCH_SCIENTIST]: '科研人员'
} as const

// 项目状态常量
export const PROJECT_STATUS = {
  PLANNING: 'planning',
  DESIGN: 'design',
  TESTING: 'testing',
  PRODUCTION: 'production',
  COMPLETED: 'completed'
} as const

export const PROJECT_STATUS_NAMES = {
  [PROJECT_STATUS.PLANNING]: '规划中',
  [PROJECT_STATUS.DESIGN]: '设计中',
  [PROJECT_STATUS.TESTING]: '测试中',
  [PROJECT_STATUS.PRODUCTION]: '生产中',
  [PROJECT_STATUS.COMPLETED]: '已完成'
} as const

export const PROJECT_STATUS_COLORS = {
  [PROJECT_STATUS.PLANNING]: '#faad14',
  [PROJECT_STATUS.DESIGN]: '#1890ff',
  [PROJECT_STATUS.TESTING]: '#722ed1',
  [PROJECT_STATUS.PRODUCTION]: '#13c2c2',
  [PROJECT_STATUS.COMPLETED]: '#52c41a'
} as const

// 配方状态常量
export const FORMULA_STATUS = {
  DRAFT: 'draft',
  TESTING: 'testing',
  APPROVED: 'approved',
  ARCHIVED: 'archived'
} as const

export const FORMULA_STATUS_NAMES = {
  [FORMULA_STATUS.DRAFT]: '草稿',
  [FORMULA_STATUS.TESTING]: '测试中',
  [FORMULA_STATUS.APPROVED]: '已批准',
  [FORMULA_STATUS.ARCHIVED]: '已归档'
} as const

// 质量测试状态
export const TEST_STATUS = {
  PENDING: 'pending',
  TESTING: 'testing',
  COMPLETED: 'completed',
  FAILED: 'failed'
} as const

export const TEST_STATUS_NAMES = {
  [TEST_STATUS.PENDING]: '待测试',
  [TEST_STATUS.TESTING]: '测试中',
  [TEST_STATUS.COMPLETED]: '已完成',
  [TEST_STATUS.FAILED]: '测试失败'
} as const

// 测试结果状态
export const TEST_RESULT = {
  PASS: 'pass',
  FAIL: 'fail',
  WARNING: 'warning'
} as const

export const TEST_RESULT_NAMES = {
  [TEST_RESULT.PASS]: '合格',
  [TEST_RESULT.FAIL]: '不合格',
  [TEST_RESULT.WARNING]: '警告'
} as const

export const TEST_RESULT_COLORS = {
  [TEST_RESULT.PASS]: '#52c41a',
  [TEST_RESULT.FAIL]: '#f5222d',
  [TEST_RESULT.WARNING]: '#faad14'
} as const

// 优先级常量
export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const

export const PRIORITY_NAMES = {
  [PRIORITY.LOW]: '低',
  [PRIORITY.MEDIUM]: '中',
  [PRIORITY.HIGH]: '高'
} as const

export const PRIORITY_COLORS = {
  [PRIORITY.LOW]: '#52c41a',
  [PRIORITY.MEDIUM]: '#faad14',
  [PRIORITY.HIGH]: '#f5222d'
} as const

// 业务模块常量
export const MODULES = {
  DASHBOARD: 'dashboard',
  MARKET_INSIGHT: 'market_insight',
  MATERIAL_MANAGEMENT: 'material_management',
  FORMULA_MANAGEMENT: 'formula_management',
  FLAVOR_MANAGEMENT: 'flavor_management',
  AUXILIARY_MATERIAL: 'auxiliary_material',
  PROCESS_MANAGEMENT: 'process_management',
  ONLINE_TESTING: 'online_testing',
  QUALITY_MANAGEMENT: 'quality_management',
  LIMS: 'lims',
  COMPREHENSIVE_MANAGEMENT: 'comprehensive_management',
  RESEARCH_ASSISTANT: 'research_assistant'
} as const

export const MODULE_NAMES = {
  [MODULES.DASHBOARD]: '数字化研发设计看板',
  [MODULES.MARKET_INSIGHT]: '市场洞察',
  [MODULES.MATERIAL_MANAGEMENT]: '原料管理',
  [MODULES.FORMULA_MANAGEMENT]: '叶组管理',
  [MODULES.FLAVOR_MANAGEMENT]: '香精管理',
  [MODULES.AUXILIARY_MATERIAL]: '材料管理',
  [MODULES.PROCESS_MANAGEMENT]: '工艺管理',
  [MODULES.ONLINE_TESTING]: '在线试验',
  [MODULES.QUALITY_MANAGEMENT]: '质量管理',
  [MODULES.LIMS]: '实验管理',
  [MODULES.COMPREHENSIVE_MANAGEMENT]: '综合管理',
  [MODULES.RESEARCH_ASSISTANT]: '科研助手'
} as const

// API 端点常量
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh'
  },
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE: '/api/user/update'
  },
  PROJECT: {
    LIST: '/api/projects',
    DETAIL: '/api/projects/:id',
    CREATE: '/api/projects',
    UPDATE: '/api/projects/:id',
    DELETE: '/api/projects/:id'
  },
  FORMULA: {
    LIST: '/api/formulas',
    DETAIL: '/api/formulas/:id',
    CREATE: '/api/formulas',
    UPDATE: '/api/formulas/:id',
    DELETE: '/api/formulas/:id',
    VERSIONS: '/api/formulas/:id/versions'
  }
} as const

// 本地存储键名
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  AUTH_USER: 'auth_user',
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed'
} as const

// 分页默认配置
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'],
  SHOW_SIZE_CHANGER: true,
  SHOW_QUICK_JUMPER: true,
  SHOW_TOTAL: (total: number, range: [number, number]) => 
    `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
} as const

// 文件上传配置
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
} as const
