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

  // 数字化研发业务管理平台菜单项 (Epic 1.0-11.0)
  const businessPlatformItems = [
    {
      key: MODULES.MARKET_INSIGHT,
      icon: <BarChartOutlined />,
      label: MODULE_NAMES[MODULES.MARKET_INSIGHT],
      path: '/market-insight'
    },
    {
      key: MODULES.MATERIAL_MANAGEMENT,
      icon: <DatabaseOutlined />,
      label: MODULE_NAMES[MODULES.MATERIAL_MANAGEMENT],
      path: '/material-management'
    },
    {
      key: MODULES.FORMULA_MANAGEMENT,
      icon: <ExperimentOutlined />,
      label: MODULE_NAMES[MODULES.FORMULA_MANAGEMENT],
      path: '/formula-management'
    },
    {
      key: MODULES.FLAVOR_MANAGEMENT,
      icon: <BulbOutlined />,
      label: MODULE_NAMES[MODULES.FLAVOR_MANAGEMENT],
      path: '/flavor-management'
    },
    {
      key: 'auxiliary-material-management',
      icon: <SettingOutlined />,
      label: '材料管理(烟用辅材)',
      path: '/auxiliary-material-management'
    },
    {
      key: MODULES.PROCESS_MANAGEMENT,
      icon: <ToolOutlined />,
      label: MODULE_NAMES[MODULES.PROCESS_MANAGEMENT],
      path: '/process-management'
    },
    {
      key: 'online-experiment',
      icon: <ExperimentOutlined />,
      label: '在线试验管理',
      path: '/online-experiment'
    },
    {
      key: MODULES.QUALITY_MANAGEMENT,
      icon: <SafetyOutlined />,
      label: MODULE_NAMES[MODULES.QUALITY_MANAGEMENT],
      path: '/quality-management'
    },
    {
      key: MODULES.LIMS,
      icon: <FileTextOutlined />,
      label: MODULE_NAMES[MODULES.LIMS],
      path: '/lims'
    },
    {
      key: 'comprehensive-management',
      icon: <SettingOutlined />,
      label: '综合管理',
      path: '/comprehensive-management'
    },
    {
      key: MODULES.RESEARCH_ASSISTANT,
      icon: <RobotOutlined />,
      label: MODULE_NAMES[MODULES.RESEARCH_ASSISTANT],
      path: '/research-assistant'
    }
  ]

  // 数字化研发设计平台菜单项 (Epic 12.0-19.0)
  const designPlatformItems = [
    {
      key: 'design-dashboard',
      icon: <DashboardOutlined />,
      label: '数字化研发设计看板',
      path: '/design-dashboard'
    },
    {
      key: 'design-planning',
      icon: <BulbOutlined />,
      label: '设计策划数字化',
      path: '/design-planning'
    },
    {
      key: 'formula-design',
      icon: <ExperimentOutlined />,
      label: '叶组配方数字化设计',
      path: '/formula-management'
    },
    {
      key: 'flavor-design',
      icon: <BulbOutlined />,
      label: '香精香料数字化设计',
      path: '/flavor-management'
    },
    {
      key: 'auxiliary-material-design',
      icon: <ToolOutlined />,
      label: '三纸一棒数字化设计',
      path: '/auxiliary-material-design'
    },
    {
      key: 'packaging-design',
      icon: <FileTextOutlined />,
      label: '包装材料数字化设计',
      path: '/packaging-design'
    },
    {
      key: 'process-design',
      icon: <ToolOutlined />,
      label: '加工工艺数字化设计',
      path: '/process-management'
    },
    {
      key: 'report-generation',
      icon: <FileTextOutlined />,
      label: '定型与输出数字化',
      path: '/report-generation'
    },
    {
      key: 'cigar-design',
      icon: <ExperimentOutlined />,
      label: '雪茄烟数字化设计',
      path: '/cigar-design'
    },
    {
      key: 'new-product-design',
      icon: <BulbOutlined />,
      label: '新型烟草数字化设计',
      path: '/new-product-design'
    }
  ]

  // 合并所有菜单项用于路由匹配
  const allMenuItems = [...menuItems, ...businessPlatformItems, ...designPlatformItems]

  // 用户下拉菜单（移除登出功能）
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置'
    }
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    const item = allMenuItems.find(item => item.key === key)
    if (item) {
      navigate(item.path)
    }
  }

  // 获取当前选中的菜单项
  const selectedKey = allMenuItems.find(item =>
    location.pathname === item.path ||
    (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
  )?.key

  // 获取当前打开的子菜单
  const getOpenKeys = () => {
    const currentPath = location.pathname
    if (businessPlatformItems.some(item => currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path)))) {
      return ['business-platform']
    }
    if (designPlatformItems.some(item => currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path)))) {
      return ['design-platform']
    }
    return []
  }

  return (
    <Layout className="main-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="layout-sider"
        width={240}
        style={{ background: '#ffffff' }}
      >
        <div style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333333',
          fontSize: collapsed ? 16 : 18,
          fontWeight: 'bold',
          borderBottom: '1px solid #e8e8e8',
          background: '#ffffff'
        }}>
          {collapsed ? '数研' : '数字化研发平台'}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
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
            <Route path="/market-insight/*" element={<MarketInsight />} />
            <Route path="/material-management/*" element={<MaterialManagement />} />
            <Route path="/formula-management/*" element={<FormulaManagement />} />
            <Route path="/flavor-management/*" element={<FlavorManagement />} />
            <Route path="/process-management/*" element={<ProcessManagement />} />
            <Route path="/quality-management/*" element={<QualityManagement />} />
            <Route path="/lims/*" element={<LIMS />} />
            <Route path="/research-assistant/*" element={<ResearchAssistant />} />
            <Route path="/design-dashboard/*" element={<DesignDashboard />} />
            <Route path="/design-planning/*" element={<DesignPlanning />} />
            <Route path="/auxiliary-material-design/*" element={<AuxiliaryMaterialDesign />} />
            <Route path="/packaging-design/*" element={<PackagingDesign />} />
            <Route path="/report-generation/*" element={<ReportGeneration />} />
            <Route path="/auxiliary-material-management/*" element={<AuxiliaryMaterialManagement />} />
            <Route path="/online-experiment/*" element={<OnlineExperiment />} />
            <Route path="/comprehensive-management/*" element={<ComprehensiveManagement />} />
            <Route path="/cigar-design/*" element={<CigarDesign />} />
            <Route path="/new-product-design/*" element={<NewProductDesign />} />
            {/* 所有其他路径都重定向到dashboard */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
