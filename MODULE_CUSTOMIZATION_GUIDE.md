# 模块定制化修改指南

## 已完成模块（可作为参考）
- ✅ src/pages/MarketInsight/index.tsx - 市场洞察（包含图表）
- ✅ src/pages/OnlineExperiment/index.tsx - 在线试验管理
- ✅ src/pages/QualityManagement/index.tsx - 质量管理（最佳参考模板）

## 待完成模块

### 1. LIMS系统 (src/pages/LIMS/index.tsx)

**4个Tab需要定制：**

#### Tab 1: 样品管理 (sample)
- 列名：样品编号、样品名称、样品类型、接收时间、样品状态
- 统计：在库样品、待检测、检测中、已完成
- 数据示例：SP001, 烟叶样品A, 原料样品, 2024-03-20, 待检测

#### Tab 2: 检测任务 (task)
- 列名：任务编号、检测项目、样品数量、任务进度、任务状态、预计完成时间
- 统计：总任务数、进行中、已完成、平均进度
- 数据示例：TSK001, 焦油含量检测, 5, 60%, 进行中, 2024-03-21
- 特殊：需要 Progress 组件显示进度条

#### Tab 3: 仪器管理 (instrument)
- 列名：仪器编号、仪器名称、仪器型号、使用状态、下次校准日期
- 统计：仪器总数、使用中、空闲、维护中
- 数据示例：INS001, 气相色谱仪, GC-2030, 使用中, 2024-04-15

#### Tab 4: 数据分析 (analysis)
- 列名：分析编号、分析类型、数据来源、分析结果、分析人、分析日期
- 统计：分析报告、本月��增、数据源、分析准确率
- 数据示例：DA001, 趋势分析, 焦油含量数据, 平均值10.5mg/支, 张三, 2024-03-20

### 2. 综合管理 (src/pages/ComprehensiveManagement/index.tsx)

**3个Tab需要定制：**

#### Tab 1: 项目管理 (project)
- 列名：项目编号、项目名称、项目阶段、负责人、完成进度
- 统计：项目总数、进行中、已完成、平均进度
- 数据示例：PRJ001, 新产品开发项目, 设计阶段, 张三, 65%
- 特殊：需要 Progress 组件显示进度

#### Tab 2: 知识管理 (knowledge)
- 列名：文档编号、文��标题、文档类型、上传人、上传时间
- 统计：文档总数、本月新增、文档类型数、访问总量
- 数据示例：DOC001, 配方设计规范, 技术文档, 李四, 2024-03-15

#### Tab 3: 协同工作 (collaboration)
- 列名：任务编号、任务名称、参与人员、任务状态、截止日期
- 统计：任务总数、进行中、已完成、逾期任务
- 数据示例：TASK001, 市场调研, 张三,李四, 进行中, 2024-03-25

## 快速修改步骤

### 步骤1：复制模板
```bash
# 以 QualityManagement 为模板
cp src/pages/QualityManagement/index.tsx src/pages/LIMS/index.tsx.new
```

### 步骤2：全局替换
1. 组件名：`QualityManagement` → `LIMS`
2. 路径前缀：`/quality-management/` → `/lims/`
3. 页面标题：`质量管理` → `LIMS系统`

### 步骤3：修改Tab配置
```typescript
// 修改 TAB_PATH_MAP 和 PATH_TAB_MAP
const TAB_PATH_MAP: Record<string, string> = {
  'sample': 'sample',
  'task': 'task',
  'instrument': 'instrument',
  'analysis': 'analysis',
}
```

### 步骤4：修改数据数组
为每个Tab创建独立的数据数组（参考上面的数据示例）

### 步骤5：修改表格列定义
根据每个Tab的列名修改 columns 配置

### 步骤6：修改统计指标
修改每个Tab的 Statistic 组件内容

## 关键代码模式

### 数据数组模式
```typescript
const sampleData = [
  { key: '1', code: 'SP001', name: '样品A', type: '原料', receiveTime: '2024-03-20', status: '待检测' },
  // ... 15条数据
]
```

### 表格列定义模式
```typescript
columns={[
  { title: '样品编号', dataIndex: 'code', key: 'code', width: 100 },
  { title: '样品名称', dataIndex: 'name', key: 'name' },
  // ...
]}
```

### 统计指标模式
```typescript
<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
  <Col span={6}>
    <Statistic title="在库样品" value={45} suffix="个" />
  </Col>
  // ...
</Row>
```

## 注意事项

1. **保持数据一致性**：每个数据数组必须有15条记录
2. **状态颜色映射**：使用 Tag 组件时要定义颜色映射
3. **进度条**：需要进度的Tab要导入 Progress 组件
4. **图标**：确保导入所需的 antd icons

## 验证清单

- [ ] 每个Tab有不同的数据数组
- [ ] 每个Tab有不同的列定义
- [ ] 每个Tab有不同的统计指标
- [ ] 所有Tab可以正常切换
- [ ] URL路径与Tab同步
- [ ] 数据至少15条

## 参考文件位置

- 最佳参考：`src/pages/QualityManagement/index.tsx`
- 图表参考：`src/pages/MarketInsight/index.tsx`
- 进度条参考：`src/pages/OnlineExperiment/index.tsx`
