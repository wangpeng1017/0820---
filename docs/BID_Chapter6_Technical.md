# 第六章 技术架构方案

## 6.1 总体技术路线
![技术路线图](docs/ppt/06_Technical_Route.png)
本项目坚持“平台化、服务化、智能化”的技术路线，采用业界成熟且先进的前后端分离微服务架构。

### 6.1.1 前端技术栈
*   **框架**：React 18 + TypeScript 5
*   **UI库**：Ant Design Pro 6.0 (Enterprise-level design system)
*   **状态管理**：Zustand / React Query
*   **可视化**：ECharts 5.0 (图表), AntV X6 (流程图), Three.js (3D模型)
*   **移动端**：Uni-app (一次开发，多端发布)

### 6.1.2 后端技术栈
*   **微服务框架**：Spring Cloud Alibaba 2023 (Nacos, Sentinel, Seata, RocketMQ)
*   **开发语言**：Java 17 (LTS)
*   **ORM框架**：MyBatis-Plus 3.5
*   **工作流引擎**：Camunda 7.0 / Flowable

## 6.2 数据库设计方案

### 6.2.1 设计原则
*   **范式与反范式结合**：核心业务遵循3NF，高频查询表适当冗余字段。
*   **读写分离**：主库负责增删改，从库负责报表查询。
*   **分库分表**：对LIMS检测记录、日志表进行ShardingSphere分片。

### 6.2.2 核心数据模型 (ER图逻辑描述)

#### 1. 配方域数据模型
*   **Formula (配方头表)**
    *   `id`: LONG (PK)
    *   `code`: VARCHAR(32) (UK, 业务编码)
    *   `status`: TINYINT (0:草稿, 1:审核中, 2:已发布)
    *   `version`: VARCHAR(10) (V1.0)
*   **FormulaItem (配方明细)**
    *   `formula_id`: LONG (FK)
    *   `material_id`: LONG (FK)
    *   `ratio`: DECIMAL(5,2) (使用比例)
    *   `cost`: DECIMAL(10,4) (快照成本)

#### 2. LIMS域数据模型
*   **Entrustment (委托单)**
    *   `id`: LONG
    *   `sample_code`: VARCHAR(64) (条码)
    *   `requester_id`: LONG
*   **TestResult (检测结果)**
    *   `entrust_id`: LONG
    *   `indicator_code`: VARCHAR(32) (指标代码: Tar, Nicotine)
    *   `value`: VARCHAR(32) (测定值)
    *   `raw_file_url`: VARCHAR(255) (原始数据路径)

## 6.3 接口设计方案

### 6.3.1 内部微服务接口
遵循RESTful风格，统一使用Swagger/Knife4j管理文档。
*   **用户服务**：`GET /api/user/{id}`
*   **配方服务**：`POST /api/formula/calculate` (计算配方指标)
*   **流程服务**：`POST /api/process/start` (发起流程)

### 6.3.2 外部系统集成接口
采用ESB企业服务总线进行统一调度。
1.  **ERP接口 (SAP/NC)**
    *   `SYNC_MATERIAL`: 同步原料库存 (每天凌晨全量，实时增量)。
    *   `PUSH_VOUCHER`: 推送采购/领料凭证。
2.  **MES接口 (生产系统)**
    *   `PUSH_PROCESS_STD`: 下发工艺标准。
    *   `PULL_PRODUCTION_DATA`: 拉取生产实绩数据。
3.  **OA接口**
    *   `SYNC_ORG`: 同步组织架构。
    *   `PUSH_TODO`: 推送待办任务。

## 6.4 安全设计方案 (等保三级)

### 6.4.1 网络安全
*   **区域划分**：DMZ区、应用区、数据区严格隔离。
*   **访问控制**：防火墙只开放必要端口 (80/443)，禁止数据库端口对外。

### 6.4.2 数据安全
*   **传输加密**：全站HTTPS (TLS 1.2+)，关键数据（密码、配方比例）采用国密SM2/SM4算法加密传输。
*   **存储加密**：敏感字段（身份证、手机号、配方核心参数）库内加密存储。
*   **数据脱敏**：开发/测试环境必须使用脱敏后的生产数据。

### 6.4.3 应用安全
*   **身份认证**：集成LDAP/CAS统一认证，启用MFA多因素认证（用户名+手机验证码）。
*   **权限控制**：基于RBAC模型，按钮级权限控制。
*   **日志审计**：记录所有敏感操作（查看配方、导出数据）日志，保留6个月以上。

## 6.5 部署架构方案
![部署架构图](docs/ppt/05_Deployment_Architecture.png)
建议采用“两地三中心”的高可用容灾部署架构。
*   **生产中心**: 承载核心业务流量，采用双机房双活部署。
*   **同城灾备**: 实时同步数据，当生产中心故障时可快速切换。
*   **异地灾备**: 定期冷备数据，防范区域性灾难。
