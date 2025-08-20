import Mock from 'mockjs'
import type { Project, Formula, QualityTest, MarketInsight } from '../types'

// 配置Mock
Mock.setup({
  timeout: '200-600'
})

// 生成模拟项目数据
export const generateMockProjects = (count: number = 20): Project[] => {
  return Mock.mock({
    [`data|${count}`]: [{
      'id|+1': 1,
      'name': '@ctitle(8, 20)',
      'description': '@csentence(20, 50)',
      'status|1': ['planning', 'design', 'testing', 'production', 'completed'],
      'progress|1-100': 1,
      'startDate': '@date("yyyy-MM-dd")',
      'endDate': '@date("yyyy-MM-dd")',
      'manager': '@cname',
      'team': ['@cname', '@cname', '@cname'],
      'priority|1': ['low', 'medium', 'high'],
      'category|1': ['产品开发', '配方优化', '工艺改进', '质量提升', '材料研发']
    }]
  }).data
}

// 生成模拟配方数据
export const generateMockFormulas = (count: number = 50): Formula[] => {
  return Mock.mock({
    [`data|${count}`]: [{
      'id': '@string("upper", 1)@string("number", 3)',
      'name': '@ctitle(6, 15)',
      'version': 'V@natural(1, 5).@natural(0, 9)',
      'category|1': ['tobacco', 'flavor', 'material'],
      'status|1': ['draft', 'testing', 'approved', 'archived'],
      'creator': '@cname',
      'createTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
      'updateTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
      'description': '@csentence(15, 30)',
      'ingredients': [{
        'id|+1': 1,
        'name': '@ctitle(4, 8)',
        'type|1': ['主料', '辅料', '调节料'],
        'ratio|1-50': 1,
        'unit': '%',
        'supplier': '@ctitle(4, 8)公司',
        'grade|1': ['A级', 'B级', 'C级']
      }],
      'cost|8-25.2': 1,
      'properties': {
        'tar|5-12.2': 1,
        'nicotine|0.3-1.2': 1,
        'co|6-15.2': 1,
        'moisture|10-15.2': 1
      }
    }]
  }).data
}

// 生成模拟质量检测数据
export const generateMockQualityTests = (count: number = 30): QualityTest[] => {
  return Mock.mock({
    [`data|${count}`]: [{
      'id': 'QT@string("number", 3)',
      'sampleId': 'S@date("yyyyMMdd")@string("number", 2)',
      'testType|1': ['成品检验', '原料检验', '半成品检验', '包装检验'],
      'testDate': '@date("yyyy-MM-dd")',
      'tester': '@cname',
      'status|1': ['pending', 'testing', 'completed', 'failed'],
      'results': [{
        'parameter|1': ['焦油量', '烟碱量', '一氧化碳', '含水率', '外观质量'],
        'value|1-20.2': 1,
        'unit|1': ['mg', '%', ''],
        'standard': '@string',
        'result|1': ['pass', 'fail', 'warning']
      }],
      'conclusion': '@csentence(20, 50)',
      'notes': '@csentence(10, 30)'
    }]
  }).data
}

// 生成模拟市场洞察数据
export const generateMockMarketInsights = (count: number = 15): MarketInsight[] => {
  return Mock.mock({
    [`data|${count}`]: [{
      'id|+1': 1,
      'title': '@ctitle(8, 20)',
      'type|1': ['consumer_research', 'market_analysis', 'competitor_analysis'],
      'date': '@date("yyyy-MM-dd")',
      'analyst': '@cname',
      'summary': '@csentence(30, 80)',
      'data': {},
      'recommendations': ['@csentence(15, 30)', '@csentence(15, 30)', '@csentence(15, 30)']
    }]
  }).data
}

// API模拟
Mock.mock('/api/projects', 'get', () => {
  return {
    success: true,
    data: generateMockProjects(),
    message: '获取项目列表成功'
  }
})

Mock.mock('/api/formulas', 'get', () => {
  return {
    success: true,
    data: generateMockFormulas(),
    message: '获取配方列表成功'
  }
})

Mock.mock('/api/quality-tests', 'get', () => {
  return {
    success: true,
    data: generateMockQualityTests(),
    message: '获取质量检测列表成功'
  }
})

Mock.mock('/api/market-insights', 'get', () => {
  return {
    success: true,
    data: generateMockMarketInsights(),
    message: '获取市场洞察列表成功'
  }
})

// 用户权限检查
Mock.mock('/api/auth/check-permission', 'post', () => {
  // 模拟权限检查逻辑
  const hasPermission = Math.random() > 0.2 // 80%概率有权限

  return {
    success: true,
    data: { hasPermission },
    message: hasPermission ? '有权限' : '无权限'
  }
})

export default Mock
