import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, Tag, Space, Row, Col, Statistic, Progress } from 'antd'
import {
  EditOutlined,
  ExperimentOutlined,
  EyeOutlined,
  PlusOutlined,
  SafetyOutlined,
  SettingOutlined,
  ToolOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

// Tab 路径映射
const TAB_PATH_MAP: Record<string, string> = {
  'formula': 'formula',
  'process': 'process',
  'wrapper': 'wrapper',
  'aging': 'aging',
}

const PATH_TAB_MAP: Record<string, string> = {
  'formula': 'formula',
  'process': 'process',
  'wrapper': 'wrapper',
  'aging': 'aging',
}

// ==================== Tab 1: 雪茄配方设计 ====================
const formulaData = [
  { key: '1', formulaCode: 'CG-F001', productName: '王冠雪茄-经典款', cigarType: '长雪茄', fillerOrigin: '古巴/多米尼加', binderOrigin: '尼加拉瓜', wrapperOrigin: '喀麦隆', strength: '中等', flavorProfile: '泥土/皮革/坚果', progress: 100, status: '已定型' },
  { key: '2', formulaCode: 'CG-F002', productName: '皇家雪茄-醇香款', cigarType: '中型雪茄', fillerOrigin: '洪都拉斯', binderOrigin: '印尼', wrapperOrigin: '厄瓜多尔', strength: '中浓', flavorProfile: '咖啡/可可/辛香', progress: 85, status: '试制中' },
  { key: '3', formulaCode: 'CG-F003', productName: '王冠雪茄-浓郁款', cigarType: '长雪茄', fillerOrigin: '尼加拉瓜', binderOrigin: '尼加拉瓜', wrapperOrigin: '墨西哥', strength: '浓郁', flavorProfile: '胡椒/黑巧克力/烘烤', progress: 100, status: '已定型' },
  { key: '4', formulaCode: 'CG-F004', productName: '皇家雪茄-淡雅款', cigarType: '小雪茄', fillerOrigin: '多米尼加', binderOrigin: '康涅狄格', wrapperOrigin: '康涅狄格', strength: '淡雅', flavorProfile: '奶油/坚果/青草', progress: 60, status: '研发中' },
  { key: '5', formulaCode: 'CG-F005', productName: '王冠雪茄-尊享款', cigarType: '特长雪茄', fillerOrigin: '古巴混合', binderOrigin: '喀麦隆', wrapperOrigin: '古巴', strength: '中浓', flavorProfile: '蜂蜜/雪松/皮革', progress: 100, status: '已定型' },
  { key: '6', formulaCode: 'CG-F006', productName: '皇家雪茄-果香款', cigarType: '中型雪茄', fillerOrigin: '印尼/多米尼加', binderOrigin: '厄瓜多尔', wrapperOrigin: '康涅狄格', strength: '淡中', flavorProfile: '柑橘/杏仁/奶油', progress: 70, status: '试制中' },
  { key: '7', formulaCode: 'CG-F007', productName: '王冠雪茄-原味款', cigarType: '长雪茄', fillerOrigin: '尼加拉瓜', binderOrigin: '洪都拉斯', wrapperOrigin: '尼加拉瓜', strength: '中等', flavorProfile: '泥土/木质/咖啡', progress: 100, status: '已定型' },
  { key: '8', formulaCode: 'CG-F008', productName: '皇家雪茄-限量款', cigarType: '特长雪茄', fillerOrigin: '古巴珍藏', binderOrigin: '古巴', wrapperOrigin: '古巴', strength: '浓郁', flavorProfile: '复杂/陈年/稀有', progress: 45, status: '研发中' },
  { key: '9', formulaCode: 'CG-F009', productName: '王冠雪茄-迷你款', cigarType: '迷你雪茄', fillerOrigin: '多米尼加', binderOrigin: '印尼', wrapperOrigin: '巴西', strength: '淡雅', flavorProfile: '甜味/坚果/轻微', progress: 100, status: '已定型' },
  { key: '10', formulaCode: 'CG-F010', productName: '皇家雪茄-辛香款', cigarType: '中型雪茄', fillerOrigin: '尼加拉瓜/洪都拉斯', binderOrigin: '尼加拉瓜', wrapperOrigin: '墨西哥', strength: '中浓', flavorProfile: '辛香/胡椒/烟熏', progress: 55, status: '研发中' },
  { key: '11', formulaCode: 'CG-F011', productName: '王冠雪茄-女士款', cigarType: '小雪茄', fillerOrigin: '多米尼加', binderOrigin: '康涅狄格', wrapperOrigin: '厄瓜多尔', strength: '淡雅', flavorProfile: '花香/奶油/清甜', progress: 90, status: '试制中' },
  { key: '12', formulaCode: 'CG-F012', productName: '皇家雪茄-陈年款', cigarType: '长雪茄', fillerOrigin: '陈年5年混合', binderOrigin: '尼加拉瓜', wrapperOrigin: '喀麦隆', strength: '中等', flavorProfile: '复杂/圆润/陈香', progress: 40, status: '研发中' },
  { key: '13', formulaCode: 'CG-F013', productName: '王冠雪茄-入门款', cigarType: '中型雪茄', fillerOrigin: '多米尼加', binderOrigin: '印尼', wrapperOrigin: '康涅狄格', strength: '淡雅', flavorProfile: '温和/奶油/坚果', progress: 100, status: '已定型' },
  { key: '14', formulaCode: 'CG-F014', productName: '皇家雪茄-派对款', cigarType: '迷你雪茄', fillerOrigin: '洪都拉斯', binderOrigin: '印尼', wrapperOrigin: '巴西', strength: '淡中', flavorProfile: '甜味/轻盈/易燃', progress: 75, status: '试制中' },
  { key: '15', formulaCode: 'CG-F015', productName: '王冠雪茄-旗舰款', cigarType: '特长雪茄', fillerOrigin: '古巴/尼加拉瓜精选', binderOrigin: '古巴', wrapperOrigin: '古巴', strength: '浓郁', flavorProfile: '极致/复杂/珍藏', progress: 30, status: '研发中' },
]

// ==================== Tab 2: 雪茄工艺设计 ====================
const processData = [
  { key: '1', processCode: 'CG-P001', productName: '王冠雪茄-经典款', rollingMethod: '全手工', fermentTime: '18个月', cureMethod: '自然干燥', humidityControl: '68-72%', pressMethod: '盒压', qualityGrade: '特级', progress: 100, status: '已定型' },
  { key: '2', processCode: 'CG-P002', productName: '皇家雪茄-醇香款', rollingMethod: '半手工', fermentTime: '12个月', cureMethod: '烘房干燥', humidityControl: '65-70%', pressMethod: '束压', qualityGrade: '一级', progress: 85, status: '试制中' },
  { key: '3', processCode: 'CG-P003', productName: '王冠雪茄-浓郁款', rollingMethod: '全手工', fermentTime: '24个月', cureMethod: '自然干燥', humidityControl: '70-74%', pressMethod: '盒压', qualityGrade: '特级', progress: 100, status: '已定型' },
  { key: '4', processCode: 'CG-P004', productName: '皇家雪茄-淡雅款', rollingMethod: '机器辅助', fermentTime: '8个月', cureMethod: '快速干燥', humidityControl: '65-68%', pressMethod: '无压', qualityGrade: '二级', progress: 60, status: '研发中' },
  { key: '5', processCode: 'CG-P005', productName: '王冠雪茄-尊享款', rollingMethod: '大师手工', fermentTime: '36个月', cureMethod: '传统自然', humidityControl: '68-72%', pressMethod: '特级盒压', qualityGrade: '顶级', progress: 100, status: '已定型' },
  { key: '6', processCode: 'CG-P006', productName: '皇家雪茄-果香款', rollingMethod: '半手工', fermentTime: '10个月', cureMethod: '烘房干燥', humidityControl: '66-70%', pressMethod: '束压', qualityGrade: '一级', progress: 70, status: '试制中' },
  { key: '7', processCode: 'CG-P007', productName: '王冠雪茄-原味款', rollingMethod: '全手工', fermentTime: '15个月', cureMethod: '自然干燥', humidityControl: '68-72%', pressMethod: '盒压', qualityGrade: '特级', progress: 100, status: '已定型' },
  { key: '8', processCode: 'CG-P008', productName: '皇家雪茄-限量款', rollingMethod: '大师手工', fermentTime: '48个月', cureMethod: '古法自然', humidityControl: '70-75%', pressMethod: '传统盒压', qualityGrade: '顶级', progress: 45, status: '研发中' },
  { key: '9', processCode: 'CG-P009', productName: '王冠雪茄-迷你款', rollingMethod: '机器辅助', fermentTime: '6个月', cureMethod: '快速干燥', humidityControl: '65-68%', pressMethod: '无压', qualityGrade: '二级', progress: 100, status: '已定型' },
  { key: '10', processCode: 'CG-P010', productName: '皇家雪茄-辛香款', rollingMethod: '全手工', fermentTime: '20个月', cureMethod: '自然干燥', humidityControl: '68-72%', pressMethod: '盒压', qualityGrade: '特级', progress: 55, status: '研发中' },
  { key: '11', processCode: 'CG-P011', productName: '王冠雪茄-女士款', rollingMethod: '半手工', fermentTime: '10个月', cureMethod: '烘房干燥', humidityControl: '66-70%', pressMethod: '轻压', qualityGrade: '一级', progress: 90, status: '试制中' },
  { key: '12', processCode: 'CG-P012', productName: '皇家雪茄-陈年款', rollingMethod: '全手工', fermentTime: '60个月', cureMethod: '特殊窖藏', humidityControl: '70-74%', pressMethod: '陈年盒压', qualityGrade: '收藏级', progress: 40, status: '研发中' },
  { key: '13', processCode: 'CG-P013', productName: '王冠雪茄-入门款', rollingMethod: '机器辅助', fermentTime: '8个月', cureMethod: '标准干燥', humidityControl: '65-70%', pressMethod: '束压', qualityGrade: '二级', progress: 100, status: '已定型' },
  { key: '14', processCode: 'CG-P014', productName: '皇家雪茄-派对款', rollingMethod: '机器生产', fermentTime: '4个月', cureMethod: '快速干燥', humidityControl: '62-68%', pressMethod: '无压', qualityGrade: '标准', progress: 75, status: '试制中' },
  { key: '15', processCode: 'CG-P015', productName: '王冠雪茄-旗舰款', rollingMethod: '大师手工', fermentTime: '72个月', cureMethod: '传统窖藏', humidityControl: '68-72%', pressMethod: '大师盒压', qualityGrade: '至尊', progress: 30, status: '研发中' },
]

// ==================== Tab 3: 茄衣材料管理 ====================
const wrapperData = [
  { key: '1', wrapperCode: 'CW-001', wrapperName: '喀麦隆茄衣', origin: '喀麦隆', color: '深棕', texture: '油润细腻', thickness: '中等', strength: '高', flavorNote: '泥土/咖啡', price: 850, status: '在库', stock: 5000 },
  { key: '2', wrapperCode: 'CW-002', wrapperName: '康涅狄格遮阴茄衣', origin: '美国康涅狄格', color: '浅棕', texture: '丝滑柔软', thickness: '薄', strength: '中', flavorNote: '奶油/坚果', price: 720, status: '在库', stock: 8000 },
  { key: '3', wrapperCode: 'CW-003', wrapperName: '古巴茄衣', origin: '古巴', color: '棕红', texture: '油亮厚实', thickness: '中厚', strength: '高', flavorNote: '复杂/陈香', price: 1200, status: '紧缺', stock: 1500 },
  { key: '4', wrapperCode: 'CW-004', wrapperName: '厄瓜多尔遮阴茄衣', origin: '厄瓜多尔', color: '中棕', texture: '柔软均匀', thickness: '中', strength: '中', flavorNote: '甜味/坚果', price: 680, status: '在库', stock: 6500 },
  { key: '5', wrapperCode: 'CW-005', wrapperName: '墨西哥San Andres茄衣', origin: '墨西哥', color: '深黑', texture: '粗糙油润', thickness: '厚', strength: '高', flavorNote: '胡椒/烟熏', price: 580, status: '在库', stock: 7200 },
  { key: '6', wrapperCode: 'CW-006', wrapperName: '尼加拉瓜Habano茄衣', origin: '尼加拉瓜', color: '棕红', texture: '油润适中', thickness: '中', strength: '中高', flavorNote: '辛香/皮革', price: 620, status: '在库', stock: 5800 },
  { key: '7', wrapperCode: 'CW-007', wrapperName: '巴西Mata Fina茄衣', origin: '巴西', color: '深棕', texture: '厚实有弹性', thickness: '厚', strength: '中', flavorNote: '甜味/可可', price: 480, status: '在库', stock: 9500 },
  { key: '8', wrapperCode: 'CW-008', wrapperName: '印尼苏门答腊茄衣', origin: '印尼', color: '深黑', texture: '粗糙厚实', thickness: '厚', strength: '高', flavorNote: '泥土/烟熏', price: 420, status: '在库', stock: 12000 },
  { key: '9', wrapperCode: 'CW-009', wrapperName: '洪都拉斯茄衣', origin: '洪都拉斯', color: '中棕', texture: '适中均匀', thickness: '中', strength: '中', flavorNote: '木质/坚果', price: 520, status: '在库', stock: 6800 },
  { key: '10', wrapperCode: 'CW-010', wrapperName: '多米尼加茄衣', origin: '多米尼加', color: '浅棕', texture: '柔软细腻', thickness: '薄中', strength: '中', flavorNote: '奶油/轻甜', price: 560, status: '在库', stock: 7500 },
  { key: '11', wrapperCode: 'CW-011', wrapperName: '厄瓜多尔Sumatra茄衣', origin: '厄瓜多尔', color: '深棕', texture: '油润柔软', thickness: '中', strength: '中高', flavorNote: '咖啡/可可', price: 750, status: '在库', stock: 4200 },
  { key: '12', wrapperCode: 'CW-012', wrapperName: '宾州阔叶茄衣', origin: '美国宾州', color: '中棕', texture: '厚实粗糙', thickness: '厚', strength: '高', flavorNote: '泥土/胡椒', price: 650, status: '紧缺', stock: 2800 },
  { key: '13', wrapperCode: 'CW-013', wrapperName: '古巴陈年茄衣', origin: '古巴', color: '红棕', texture: '油亮陈香', thickness: '中', strength: '中高', flavorNote: '复杂/蜂蜜', price: 1800, status: '稀缺', stock: 800 },
  { key: '14', wrapperCode: 'CW-014', wrapperName: '康涅狄格阔叶茄衣', origin: '美国康涅狄格', color: '深棕', texture: '厚实油润', thickness: '中厚', strength: '高', flavorNote: '胡椒/皮革', price: 880, status: '在库', stock: 3500 },
  { key: '15', wrapperCode: 'CW-015', wrapperName: '尼加拉瓜Corojo茄衣', origin: '尼加拉瓜', color: '红棕', texture: '油润厚实', thickness: '中厚', strength: '高', flavorNote: '辛香/红椒', price: 720, status: '在库', stock: 4800 },
]

// ==================== Tab 4: 雪茄陈化管理 ====================
const agingData = [
  { key: '1', agingCode: 'CA-001', productName: '王冠雪茄-经典款', batchNo: 'WG-2023-001', startDate: '2023-01-15', targetMonths: 18, currentMonths: 14, humidity: '70%', temperature: '18°C', progress: 78, status: '陈化中', roomNo: 'A-01' },
  { key: '2', agingCode: 'CA-002', productName: '皇家雪茄-醇香款', batchNo: 'HJ-2023-002', startDate: '2023-03-20', targetMonths: 12, currentMonths: 11, humidity: '68%', temperature: '17°C', progress: 92, status: '即将完成', roomNo: 'A-02' },
  { key: '3', agingCode: 'CA-003', productName: '王冠雪茄-浓郁款', batchNo: 'WG-2022-003', startDate: '2022-06-10', targetMonths: 24, currentMonths: 20, humidity: '72%', temperature: '19°C', progress: 83, status: '陈化中', roomNo: 'B-01' },
  { key: '4', agingCode: 'CA-004', productName: '王冠雪茄-尊享款', batchNo: 'WG-2021-004', startDate: '2021-08-05', targetMonths: 36, currentMonths: 30, humidity: '70%', temperature: '18°C', progress: 83, status: '陈化中', roomNo: 'C-01' },
  { key: '5', agingCode: 'CA-005', productName: '皇家雪茄-果香款', batchNo: 'HJ-2023-005', startDate: '2023-05-12', targetMonths: 10, currentMonths: 9, humidity: '68%', temperature: '17°C', progress: 90, status: '即将完成', roomNo: 'A-03' },
  { key: '6', agingCode: 'CA-006', productName: '王冠雪茄-原味款', batchNo: 'WG-2023-006', startDate: '2023-02-28', targetMonths: 15, currentMonths: 12, humidity: '70%', temperature: '18°C', progress: 80, status: '陈化中', roomNo: 'B-02' },
  { key: '7', agingCode: 'CA-007', productName: '皇家雪茄-限量款', batchNo: 'HJ-2020-007', startDate: '2020-01-10', targetMonths: 48, currentMonths: 48, humidity: '72%', temperature: '16°C', progress: 100, status: '已完成', roomNo: 'D-01' },
  { key: '8', agingCode: 'CA-008', productName: '王冠雪茄-迷你款', batchNo: 'WG-2023-008', startDate: '2023-08-15', targetMonths: 6, currentMonths: 6, humidity: '66%', temperature: '18°C', progress: 100, status: '已完成', roomNo: 'A-04' },
  { key: '9', agingCode: 'CA-009', productName: '王冠雪茄-女士款', batchNo: 'WG-2023-009', startDate: '2023-04-20', targetMonths: 10, currentMonths: 10, humidity: '68%', temperature: '17°C', progress: 100, status: '已完成', roomNo: 'A-05' },
  { key: '10', agingCode: 'CA-010', productName: '皇家雪茄-陈年款', batchNo: 'HJ-2019-010', startDate: '2019-06-01', targetMonths: 60, currentMonths: 56, humidity: '72%', temperature: '16°C', progress: 93, status: '陈化中', roomNo: 'E-01' },
  { key: '11', agingCode: 'CA-011', productName: '王冠雪茄-入门款', batchNo: 'WG-2023-011', startDate: '2023-06-10', targetMonths: 8, currentMonths: 8, humidity: '66%', temperature: '18°C', progress: 100, status: '已完成', roomNo: 'A-06' },
  { key: '12', agingCode: 'CA-012', productName: '皇家雪茄-派对款', batchNo: 'HJ-2023-012', startDate: '2023-10-01', targetMonths: 4, currentMonths: 4, humidity: '64%', temperature: '18°C', progress: 100, status: '已完成', roomNo: 'A-07' },
  { key: '13', agingCode: 'CA-013', productName: '王冠雪茄-旗舰款', batchNo: 'WG-2018-013', startDate: '2018-03-15', targetMonths: 72, currentMonths: 70, humidity: '70%', temperature: '16°C', progress: 97, status: '即将完成', roomNo: 'F-01' },
  { key: '14', agingCode: 'CA-014', productName: '皇家雪茄-辛香款', batchNo: 'HJ-2022-014', startDate: '2022-09-20', targetMonths: 20, currentMonths: 17, humidity: '70%', temperature: '18°C', progress: 85, status: '陈化中', roomNo: 'B-03' },
  { key: '15', agingCode: 'CA-015', productName: '王冠雪茄-浓郁款', batchNo: 'WG-2024-015', startDate: '2024-01-05', targetMonths: 24, currentMonths: 3, humidity: '72%', temperature: '19°C', progress: 12, status: '陈化中', roomNo: 'B-04' },
]

// 状态颜色映射
const statusColorMap: Record<string, string> = {
  '已定型': 'green',
  '试制中': 'blue',
  '研发中': 'purple',
  '在库': 'green',
  '紧缺': 'orange',
  '稀缺': 'red',
  '陈化中': 'processing',
  '即将完成': 'blue',
  '已完成': 'green',
}

const strengthColorMap: Record<string, string> = {
  '淡雅': 'green',
  '淡中': 'cyan',
  '中等': 'blue',
  '中浓': 'orange',
  '浓郁': 'red',
}

const gradeColorMap: Record<string, string> = {
  '标准': 'default',
  '二级': 'blue',
  '一级': 'cyan',
  '特级': 'green',
  '顶级': 'gold',
  '收藏级': 'orange',
  '至尊': 'red',
}

const CigarDesign: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getTabFromPath = () => {
    const pathParts = location.pathname.split('/')
    const subPath = pathParts[pathParts.length - 1]
    return PATH_TAB_MAP[subPath] || 'formula'
  }

  const [activeTab, setActiveTab] = useState(getTabFromPath())

  useEffect(() => {
    setActiveTab(getTabFromPath())
  }, [location.pathname])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    const path = TAB_PATH_MAP[key] || key
    navigate(`/cigar-design/${path}`)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">雪茄烟数字化设计</h1>
        <p className="page-description">
          雪茄配方设计、工艺设计、茄衣材料管理、陈化管理
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>

        {/* Tab 1: 雪茄配方设计 */}
        <TabPane tab="雪茄配方设计" key="formula" icon={<ExperimentOutlined />}>
          <Card title="雪茄配方设计" extra={<Button type="primary" icon={<PlusOutlined />}>新建配方</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="配方数量" value={38} suffix="款" /></Col>
              <Col span={6}><Statistic title="已定型" value={18} valueStyle={{ color: '#3f8600' }} suffix="款" /></Col>
              <Col span={6}><Statistic title="雪茄类型" value={5} suffix="种" /></Col>
              <Col span={6}><Statistic title="定型率" value={47.4} suffix="%" /></Col>
            </Row>
            <Table columns={[
              { title: '配方编号', dataIndex: 'formulaCode', key: 'formulaCode', width: 90 },
              { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 140 },
              { title: '雪茄类型', dataIndex: 'cigarType', key: 'cigarType', width: 90 },
              { title: '茄芯产地', dataIndex: 'fillerOrigin', key: 'fillerOrigin', width: 120 },
              { title: '茄套产地', dataIndex: 'binderOrigin', key: 'binderOrigin', width: 90 },
              { title: '茄衣产地', dataIndex: 'wrapperOrigin', key: 'wrapperOrigin', width: 80 },
              { title: '浓度', dataIndex: 'strength', key: 'strength', width: 70, render: (s: string) => <Tag color={strengthColorMap[s]}>{s}</Tag> },
              { title: '风味特征', dataIndex: 'flavorProfile', key: 'flavorProfile', width: 140, ellipsis: true },
              { title: '进度', dataIndex: 'progress', key: 'progress', width: 100, render: (p: number) => <Progress percent={p} size="small" status={p === 100 ? 'success' : 'active'} /> },
              { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>查看</Button><Button type="link" size="small" icon={<EditOutlined />}>编辑</Button></Space>) }
            ]} dataSource={formulaData} pagination={{ pageSize: 10 }} scroll={{ x: 1350 }} />
          </Card>
        </TabPane>

        {/* Tab 2: 雪茄工艺设计 */}
        <TabPane tab="雪茄工艺设计" key="process" icon={<ToolOutlined />}>
          <Card title="雪茄工艺设计" extra={<Button type="primary" icon={<PlusOutlined />}>新建工艺</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="工艺数量" value={38} suffix="款" /></Col>
              <Col span={6}><Statistic title="已定型" value={18} valueStyle={{ color: '#3f8600' }} suffix="款" /></Col>
              <Col span={6}><Statistic title="卷制方式" value={4} suffix="种" /></Col>
              <Col span={6}><Statistic title="定型率" value={47.4} suffix="%" /></Col>
            </Row>
            <Table columns={[
              { title: '工艺编号', dataIndex: 'processCode', key: 'processCode', width: 90 },
              { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 140 },
              { title: '卷制方式', dataIndex: 'rollingMethod', key: 'rollingMethod', width: 90 },
              { title: '发酵时间', dataIndex: 'fermentTime', key: 'fermentTime', width: 80 },
              { title: '干燥方式', dataIndex: 'cureMethod', key: 'cureMethod', width: 90 },
              { title: '湿度控制', dataIndex: 'humidityControl', key: 'humidityControl', width: 85 },
              { title: '压制方式', dataIndex: 'pressMethod', key: 'pressMethod', width: 85 },
              { title: '品质等级', dataIndex: 'qualityGrade', key: 'qualityGrade', width: 80, render: (s: string) => <Tag color={gradeColorMap[s]}>{s}</Tag> },
              { title: '进度', dataIndex: 'progress', key: 'progress', width: 100, render: (p: number) => <Progress percent={p} size="small" status={p === 100 ? 'success' : 'active'} /> },
              { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>查看</Button><Button type="link" size="small" icon={<EditOutlined />}>编辑</Button></Space>) }
            ]} dataSource={processData} pagination={{ pageSize: 10 }} scroll={{ x: 1250 }} />
          </Card>
        </TabPane>

        {/* Tab 3: 茄衣材料管理 */}
        <TabPane tab="茄衣材料管理" key="wrapper" icon={<SettingOutlined />}>
          <Card title="茄衣材料管理" extra={<Button type="primary" icon={<PlusOutlined />}>新增茄衣</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="茄衣种类" value={28} suffix="种" /></Col>
              <Col span={6}><Statistic title="在库种类" value={22} valueStyle={{ color: '#3f8600' }} suffix="种" /></Col>
              <Col span={6}><Statistic title="产地数" value={12} suffix="个" /></Col>
              <Col span={6}><Statistic title="库存总量" value={86.5} suffix="千片" /></Col>
            </Row>
            <Table columns={[
              { title: '茄衣编码', dataIndex: 'wrapperCode', key: 'wrapperCode', width: 90 },
              { title: '茄衣名称', dataIndex: 'wrapperName', key: 'wrapperName', width: 150 },
              { title: '产地', dataIndex: 'origin', key: 'origin', width: 110 },
              { title: '颜色', dataIndex: 'color', key: 'color', width: 60 },
              { title: '质地', dataIndex: 'texture', key: 'texture', width: 90 },
              { title: '厚度', dataIndex: 'thickness', key: 'thickness', width: 60 },
              { title: '强度', dataIndex: 'strength', key: 'strength', width: 50 },
              { title: '风味特点', dataIndex: 'flavorNote', key: 'flavorNote', width: 100 },
              { title: '单价(元/片)', dataIndex: 'price', key: 'price', width: 95 },
              { title: '库存', dataIndex: 'stock', key: 'stock', width: 70 },
              { title: '状态', dataIndex: 'status', key: 'status', width: 70, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>查看</Button><Button type="link" size="small" icon={<EditOutlined />}>编辑</Button></Space>) }
            ]} dataSource={wrapperData} pagination={{ pageSize: 10 }} scroll={{ x: 1250 }} />
          </Card>
        </TabPane>

        {/* Tab 4: 雪茄陈化管理 */}
        <TabPane tab="雪茄陈化管理" key="aging" icon={<SafetyOutlined />}>
          <Card title="雪茄陈化管理" extra={<Button type="primary" icon={<PlusOutlined />}>新建陈化</Button>}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}><Statistic title="陈化批次" value={45} suffix="批" /></Col>
              <Col span={6}><Statistic title="陈化中" value={28} valueStyle={{ color: '#1890ff' }} suffix="批" /></Col>
              <Col span={6}><Statistic title="已完成" value={12} valueStyle={{ color: '#3f8600' }} suffix="批" /></Col>
              <Col span={6}><Statistic title="陈化室数" value={8} suffix="间" /></Col>
            </Row>
            <Table columns={[
              { title: '陈化编号', dataIndex: 'agingCode', key: 'agingCode', width: 90 },
              { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 140 },
              { title: '批次号', dataIndex: 'batchNo', key: 'batchNo', width: 120 },
              { title: '开始日期', dataIndex: 'startDate', key: 'startDate', width: 100 },
              { title: '目标月数', dataIndex: 'targetMonths', key: 'targetMonths', width: 80 },
              { title: '已陈化', dataIndex: 'currentMonths', key: 'currentMonths', width: 70, render: (v: number) => `${v}月` },
              { title: '湿度', dataIndex: 'humidity', key: 'humidity', width: 60 },
              { title: '温度', dataIndex: 'temperature', key: 'temperature', width: 60 },
              { title: '进度', dataIndex: 'progress', key: 'progress', width: 100, render: (p: number) => <Progress percent={p} size="small" status={p === 100 ? 'success' : 'active'} /> },
              { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag> },
              { title: '陈化室', dataIndex: 'roomNo', key: 'roomNo', width: 70 },
              { title: '操作', key: 'action', width: 120, render: () => (<Space><Button type="link" size="small" icon={<EyeOutlined />}>监控</Button><Button type="link" size="small" icon={<EditOutlined />}>调整</Button></Space>) }
            ]} dataSource={agingData} pagination={{ pageSize: 10 }} scroll={{ x: 1350 }} />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default CigarDesign
