import React, { useState } from 'react'
import { Layout, Menu, Avatar, Dropdown, Button, Badge, Space } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  BarChartOutlined,
  FileTextOutlined,
  ToolOutlined,
  SafetyOutlined,
  BulbOutlined,
  DatabaseOutlined,
  RobotOutlined
} from '@ant-design/icons'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { MODULES, MODULE_NAMES } from '../../constants'

// 导入页面组件
import Dashboard from '../../pages/Dashboard'
import MarketInsight from '../../pages/MarketInsight'
import FormulaManagement from '../../pages/FormulaManagement'
import QualityManagement from '../../pages/QualityManagement'
import ResearchAssistant from '../../pages/ResearchAssistant'
import MaterialManagement from '../../pages/MaterialManagement'
import FlavorManagement from '../../pages/FlavorManagement'
import ProcessManagement from '../../pages/ProcessManagement'
import LIMS from '../../pages/LIMS'
import DesignDashboard from '../../pages/DesignDashboard'
import DesignPlanning from '../../pages/DesignPlanning'
import AuxiliaryMaterialDesign from '../../pages/AuxiliaryMaterialDesign'
import PackagingDesign from '../../pages/PackagingDesign'
import ReportGeneration from '../../pages/ReportGeneration'
import AuxiliaryMaterialManagement from '../../pages/AuxiliaryMaterialManagement'
import OnlineExperiment from '../../pages/OnlineExperiment'
import ComprehensiveManagement from '../../pages/ComprehensiveManagement'
import CigarDesign from '../../pages/CigarDesign'
import NewProductDesign from '../../pages/NewProductDesign'

const { Header, Sider, Content } = Layout

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  // 菜单配置 - 重新组织为两大平台
  const menuItems = [
    {
      key: MODULES.DASHBOARD,
      icon: <DashboardOutlined />,
      label: MODULE_NAMES[MODULES.DASHBOARD],
      path: '/dashboard'
    }
  ]

  // ========================================
  // 数字化研发业务管理平台菜单项 (Epic 1.0-11.0) - 带二级子菜单
  // ========================================
  const businessPlatformItems = [
    // Epic 1.0: 市场洞察
    {
      key: MODULES.MARKET_INSIGHT,
      icon: <BarChartOutlined />,
      label: MODULE_NAMES[MODULES.MARKET_INSIGHT],
      children: [
        { key: 'market-insight/sales', label: '产品销售态势分析' },
        { key: 'market-insight/competitor', label: '竞品分析管理' },
        { key: 'market-insight/brand', label: '品牌发展管理' },
        { key: 'market-insight/voice', label: '消费者需求语音分析' },
        { key: 'market-insight/profile', label: '消费群体画像' },
        { key: 'market-insight/questionnaire', label: '调研问卷智能生成' },
        { key: 'market-insight/report', label: '消费者洞察报告' }
      ]
    },
    // Epic 2.0: 原料管理
    {
      key: MODULES.MATERIAL_MANAGEMENT,
      icon: <DatabaseOutlined />,
      label: MODULE_NAMES[MODULES.MATERIAL_MANAGEMENT],
      children: [
        { key: 'material-management/base', label: '烟叶基地单元化管理' },
        { key: 'material-management/purchase', label: '智能采购计划' },
        { key: 'material-management/storage', label: '仓储醇化关联研究' },
        { key: 'material-management/sample', label: '样品库智能化管理' },
        { key: 'material-management/warning', label: '样品库存智能预警' }
      ]
    },
    // Epic 3.0: 叶组管理
    {
      key: MODULES.FORMULA_MANAGEMENT,
      icon: <ExperimentOutlined />,
      label: MODULE_NAMES[MODULES.FORMULA_MANAGEMENT],
      children: [
        { key: 'formula-management/history', label: '配方历史数据库' },
        { key: 'formula-management/standard', label: '叶组配方标准管理' },
        { key: 'formula-management/resource', label: '配方资源运行分析' },
        { key: 'formula-management/balance', label: '配方维护及平衡测算' },
        { key: 'formula-management/warning', label: '关键原料库存预警' }
      ]
    },
    // Epic 4.0: 香精管理
    {
      key: MODULES.FLAVOR_MANAGEMENT,
      icon: <BulbOutlined />,
      label: MODULE_NAMES[MODULES.FLAVOR_MANAGEMENT],
      children: [
        { key: 'flavor-management/database', label: '香精香料数据库' },
        { key: 'flavor-management/formula', label: '配方加密与版本控制' },
        { key: 'flavor-management/workorder', label: '电子化调配工单' },
        { key: 'flavor-management/quality', label: '香精质量管理' },
        { key: 'flavor-management/inventory', label: '香原料库存管理' },
        { key: 'flavor-management/supplier', label: '供应商评价与预警' }
      ]
    },
    // Epic 5.0: 烟用材料管理
    {
      key: 'auxiliary-material-management',
      icon: <SettingOutlined />,
      label: '材料管理(烟用辅材)',
      children: [
        { key: 'auxiliary-material-management/master', label: '辅材主数据标准化' },
        { key: 'auxiliary-material-management/identity', label: '标识性材料数据库' },
        { key: 'auxiliary-material-management/trace', label: '辅材全流程追溯' },
        { key: 'auxiliary-material-management/statistics', label: '材料应用统计分析' }
      ]
    },
    // Epic 6.0: 工艺管理
    {
      key: MODULES.PROCESS_MANAGEMENT,
      icon: <ToolOutlined />,
      label: MODULE_NAMES[MODULES.PROCESS_MANAGEMENT],
      children: [
        { key: 'process-management/standard', label: '工艺标准协同与下发' },
        { key: 'process-management/first-batch', label: '首批生产数据跟踪' },
        { key: 'process-management/mapping', label: '工艺-质量映射分析' },
        { key: 'process-management/version', label: '工艺标准版本管理' }
      ]
    },
    // Epic 7.0: 在线试验
    {
      key: 'online-experiment',
      icon: <ExperimentOutlined />,
      label: '在线试验管理',
      children: [
        { key: 'online-experiment/manage', label: '在线实验管理' },
        { key: 'online-experiment/material', label: '试验原辅料管理' },
        { key: 'online-experiment/sample', label: '样品烟闭环管理' }
      ]
    },
    // Epic 8.0: 质量管理
    {
      key: MODULES.QUALITY_MANAGEMENT,
      icon: <SafetyOutlined />,
      label: MODULE_NAMES[MODULES.QUALITY_MANAGEMENT],
      children: [
        { key: 'quality-management/material-warning', label: '材料质量自动预警' },
        { key: 'quality-management/report', label: '产品质量报告' },
        { key: 'quality-management/special', label: '特种烟草质量管理' },
        { key: 'quality-management/sensory', label: '感官评吸数字化' },
        { key: 'quality-management/comprehensive', label: '综合质量评价' }
      ]
    },
    // Epic 9.0: 实验室管理(LIMS)
    {
      key: MODULES.LIMS,
      icon: <FileTextOutlined />,
      label: MODULE_NAMES[MODULES.LIMS],
      children: [
        { key: 'lims/workflow', label: '检测业务全流程' },
        { key: 'lims/instrument', label: '仪器数据智能采集' },
        { key: 'lims/compliance', label: '体系文件与合规' },
        { key: 'lims/resources', label: '八大资源管理' }
      ]
    },
    // Epic 10.0: 综合管理
    {
      key: 'comprehensive-management',
      icon: <SettingOutlined />,
      label: '综合管理',
      children: [
        { key: 'comprehensive-management/performance', label: '目标与绩效管理' },
        { key: 'comprehensive-management/achievement', label: '个人科研成果档案' },
        { key: 'comprehensive-management/asset', label: '固定资产管理' },
        { key: 'comprehensive-management/safety', label: '安全工作闭环管理' },
        { key: 'comprehensive-management/archive', label: '科研档案智能归档' },
        { key: 'comprehensive-management/admin', label: '行政事务线上化' }
      ]
    },
    // Epic 11.0: 科研助手
    {
      key: MODULES.RESEARCH_ASSISTANT,
      icon: <RobotOutlined />,
      label: MODULE_NAMES[MODULES.RESEARCH_ASSISTANT],
      children: [
        { key: 'research-assistant/knowledge', label: '领域知识库' },
        { key: 'research-assistant/ai-decision', label: 'AI产品开发决策' },
        { key: 'research-assistant/ai-quality', label: 'AI质量优化分析' },
        { key: 'research-assistant/ai-workspace', label: 'AI人机协同工作台' },
        { key: 'research-assistant/ai-warning', label: 'AI安全预警' },
        { key: 'research-assistant/database', label: '专项数据库管理' },
        { key: 'research-assistant/engine', label: '智能处理引擎' },
        { key: 'research-assistant/meeting', label: '会议实时转写' },
        { key: 'research-assistant/qa', label: '上下文智能问答' },
        { key: 'research-assistant/subscribe', label: '科研信息订阅' },
        { key: 'research-assistant/ip', label: '知识产权风险检索' },
        { key: 'research-assistant/custom-kb', label: '自定义知识库' }
      ]
    }
  ]

  // ========================================
  // 数字化研发设计平台菜单项 (Epic 12.0-19.0) - 带二级子菜单
  // ========================================
  const designPlatformItems = [
    // Epic 12.0: 研发设计看板
    {
      key: 'design-dashboard',
      icon: <DashboardOutlined />,
      label: '数字化研发设计看板',
      children: [
        { key: 'design-dashboard/overview', label: '设计任务全局视图' }
      ]
    },
    // Epic 13.0: 设计策划数字化
    {
      key: 'design-planning',
      icon: <BulbOutlined />,
      label: '设计策划数字化',
      children: [
        { key: 'design-planning/market-report', label: '市场分析报告生成' },
        { key: 'design-planning/target', label: '设计目标智能分解' }
      ]
    },
    // Epic 14.0: 叶组配方数字化设计
    {
      key: 'formula-design',
      icon: <ExperimentOutlined />,
      label: '叶组配方数字化设计',
      children: [
        { key: 'formula-design/intelligent', label: '配方智能设计与验证' },
        { key: 'formula-design/model', label: '配方模型库' }
      ]
    },
    // Epic 15.0: 香精香料数字化设计
    {
      key: 'flavor-design',
      icon: <BulbOutlined />,
      label: '香精香料数字化设计',
      children: [
        { key: 'flavor-design/ai-assist', label: 'AI辨香/仿香/创香' }
      ]
    },
    // Epic 16.0: 三纸一棒数字化设计
    {
      key: 'auxiliary-material-design',
      icon: <ToolOutlined />,
      label: '三纸一棒数字化设计',
      children: [
        { key: 'auxiliary-material-design/recommend', label: '辅材组合智能推荐' }
      ]
    },
    // Epic 17.0: 包装材料数字化设计
    {
      key: 'packaging-design',
      icon: <FileTextOutlined />,
      label: '包装材料数字化设计',
      children: [
        { key: 'packaging-design/creative', label: '包装创意与合规审查' }
      ]
    },
    // Epic 18.0: 加工工艺数字化设计
    {
      key: 'process-design',
      icon: <ToolOutlined />,
      label: '加工工艺数字化设计',
      children: [
        { key: 'process-design/simulation', label: '工艺参数仿真与设计' }
      ]
    },
    // Epic 19.0: 定型与输出数字化
    {
      key: 'report-generation',
      icon: <FileTextOutlined />,
      label: '定型与输出数字化',
      children: [
        { key: 'report-generation/auto', label: '研发报告一键生成' }
      ]
    },
    // 雪茄烟数字化设计
    {
      key: 'cigar-design',
      icon: <ExperimentOutlined />,
      label: '雪茄烟数字化设计',
      children: [
        { key: 'cigar-design/formula', label: '雪茄配方设计' },
        { key: 'cigar-design/process', label: '雪茄工艺设计' }
      ]
    },
    // 新型烟草数字化设计
    {
      key: 'new-product-design',
      icon: <BulbOutlined />,
      label: '新型烟草数字化设计',
      children: [
        { key: 'new-product-design/heat-not-burn', label: '加热不燃烧产品设计' },
        { key: 'new-product-design/electronic', label: '电子烟产品设计' }
      ]
    }
  ]

  // 用户下拉菜单
  const userMenuItems = [
    { key: 'profile', icon: <UserOutlined />, label: '个人资料' },
    { key: 'settings', icon: <SettingOutlined />, label: '系统设置' }
  ]

  // 处理菜单点击 - 支持二级子菜单导航
  const handleMenuClick = ({ key }: { key: string }) => {
    // 直接使用key作为路径导航
    navigate('/' + key)
  }

  // 获取当前选中的菜单项
  const getSelectedKey = () => {
    const path = location.pathname.substring(1) // 移除开头的 /
    return path || 'dashboard'
  }

  // 获取当前打开的子菜单
  const getOpenKeys = () => {
    const path = location.pathname.substring(1)
    const parts = path.split('/')
    const keys: string[] = []

    // 检查所属平台和模块
    const businessModules = ['market-insight', 'material-management', 'formula-management',
      'flavor-management', 'auxiliary-material-management', 'process-management',
      'online-experiment', 'quality-management', 'lims', 'comprehensive-management', 'research-assistant']

    const designModules = ['design-dashboard', 'design-planning', 'formula-design',
      'flavor-design', 'auxiliary-material-design', 'packaging-design', 'process-design',
      'report-generation', 'cigar-design', 'new-product-design']

    if (businessModules.includes(parts[0])) {
      keys.push('business-platform', parts[0])
    } else if (designModules.includes(parts[0])) {
      keys.push('design-platform', parts[0])
    }

    return keys
  }

  return (
    <Layout className="main-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="layout-sider"
        width={260}
        style={{ background: '#ffffff' }}
      >
        <div style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333333',
          fontSize: collapsed ? 16 : 16,
          fontWeight: 'bold',
          borderBottom: '1px solid #e8e8e8',
          background: '#ffffff'
        }}>
          {collapsed ? '数研' : '数字化研发平台'}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          defaultOpenKeys={getOpenKeys()}
          onClick={handleMenuClick}
          style={{
            borderRight: '1px solid #e8e8e8',
            background: '#ffffff'
          }}
          items={[
            // Dashboard (standalone)
            ...menuItems,
            // Business Management Platform
            {
              key: 'business-platform',
              icon: <SettingOutlined />,
              label: '数字化研发业务平台',
              children: businessPlatformItems
            },
            // Design Platform
            {
              key: 'design-platform',
              icon: <BulbOutlined />,
              label: '数字化研发设计平台',
              children: designPlatformItems
            }
          ]}
        />
      </Sider>

      <Layout>
        <Header className="layout-header" style={{
          padding: '0 16px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16, width: 64, height: 64 }}
          />

          <Space size="middle">
            <Badge count={5} size="small">
              <Button type="text" icon={<BellOutlined />} size="large" />
            </Badge>

            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span>{user?.name}</span>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content className="layout-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* 业务管理平台路由 */}
            <Route path="/market-insight/*" element={<MarketInsight />} />
            <Route path="/material-management/*" element={<MaterialManagement />} />
            <Route path="/formula-management/*" element={<FormulaManagement />} />
            <Route path="/flavor-management/*" element={<FlavorManagement />} />
            <Route path="/auxiliary-material-management/*" element={<AuxiliaryMaterialManagement />} />
            <Route path="/process-management/*" element={<ProcessManagement />} />
            <Route path="/online-experiment/*" element={<OnlineExperiment />} />
            <Route path="/quality-management/*" element={<QualityManagement />} />
            <Route path="/lims/*" element={<LIMS />} />
            <Route path="/comprehensive-management/*" element={<ComprehensiveManagement />} />
            <Route path="/research-assistant/*" element={<ResearchAssistant />} />
            {/* 设计平台路由 */}
            <Route path="/design-dashboard/*" element={<DesignDashboard />} />
            <Route path="/design-planning/*" element={<DesignPlanning />} />
            <Route path="/formula-design/*" element={<FormulaManagement />} />
            <Route path="/flavor-design/*" element={<FlavorManagement />} />
            <Route path="/auxiliary-material-design/*" element={<AuxiliaryMaterialDesign />} />
            <Route path="/packaging-design/*" element={<PackagingDesign />} />
            <Route path="/process-design/*" element={<ProcessManagement />} />
            <Route path="/report-generation/*" element={<ReportGeneration />} />
            <Route path="/cigar-design/*" element={<CigarDesign />} />
            <Route path="/new-product-design/*" element={<NewProductDesign />} />
            {/* 默认路由 */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
