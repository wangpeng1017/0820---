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
*   **微服务框架**：Spring Cloud Alibaba 2023 (Nacos, Sentinel, Seata, RocketMQ)。
    *   **Nacos**：作为注册中心与配置中心，实现服务的自动发现与配置的动态变更。
    *   **Sentinel**：负责微服务的流量控制、熔断降级，保障系统在高并发下的稳定性。
    *   **Seata**：解决跨服务分布式事务问题（如配方下发与MES确认）。
    *   **RocketMQ**：用于异步解耦，如检测任务完成后异步通知推送。
*   **开发语言**：Java 17 (LTS)，采用现代语法特性提升代码可读性与执行效率。
*   **ORM框架**：MyBatis-Plus 3.5，提供强大的 CRUD 自动注入功能及分页插件。
*   **工作流引擎**：Camunda 7.0 / Flowable，支持 BPMN 2.0 标准，实现复杂研发流程的可视化配置。

### 6.1.3 微服务拆分架构

我们根据“高内聚、低耦合”原则，将系统划分为以下微服务集群：

| 服务名称 | 核心权责 | 数据存储建议 | 备注 |
| :--- | :--- | :--- | :--- |
| **Auth-Service** | 统一认证、RBAC权限、SSO登录。 | Redis + MySQL | 安全核心 |
| **Project-Service** | 课题立项、WBS计划、经费执行。 | MySQL | 流程驱动 |
| **Formula-Service** | 叶组/香精/辅材配方设计与版本。 | MySQL + MongoDB | 核心算法密集 |
| **Lab-Service (LIMS)** | 检测委托、任务调度、仪器直连、报告生成。 | MySQL + Minio | 文件存储量大 |
| **Quality-Service** | IQC/IPQC/OQC质检任务、SPC分析。 | PostgreSQL (时序支持) | 统计计算密集 |
| **Inventory-Service** | 原料/辅材资产库、库存流水。 | MySQL | 强数据一致性 |
| **AI-Service** | 语义搜索引擎、RAG大模型推理、配方寻优。 | Milvus (向量库) | 算力密集 |
| **Gateway-Service** | 统一API网关、流量削峰、日志聚合。 | Redis (限流) | 唯一入口 |

## 6.2 数据库设计方案

### 6.2.1 设计原则
*   **范式与反范式结合**：核心业务遵循3NF，高频查询表适当冗余字段。
*   **读写分离**：主库负责增删改，从库负责报表查询。
*   **分库分表**：对LIMS检测记录、日志表进行ShardingSphere分片。

### 6.2.2 核心数据模型 (ER图逻辑描述)

#### 1. 配方域数据模型深度设计

**【表名：FORMULA_VERSION (配方版本主表)】**
| 字段名 | 含义 | 类型 | 长度 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| FORMULA_ID | 配方唯一ID | BIGINT | 20 | 分布式ID (Snowflake) |
| VERSION_NAME | 版本名称 | VARCHAR | 64 | 手动输入，如：2026春季改进版 |
| BRAND_ID | 关联产品ID | BIGINT | 20 | 外键 |
| CREATOR_ID | 创建人ID | BIGINT | 20 | |
| SIGN_HASH | 数字签名 | VARCHAR | 256 | 用于防篡改验证 |

**【表名：FORMULA_DETAIL (配方行表)】**
| 字段名 | 含义 | 类型 | 长度 | 示例 |
| :--- | :--- | :--- | :--- | :--- |
| DETAIL_ID | 行ID | BIGINT | 20 | |
| FORMULA_ID | 所属配方ID | BIGINT | 20 | |
| MATERIAL_ID | 物料ID | BIGINT | 20 | |
| RATIO_VALUE | 使用比例 | DECIMAL | 10,4 | 12.5000 |
| SEQUENCE_NO | 投料顺序 | INT | 4 | |

#### 2. LIMS域数据模型深度设计

**【表名：SAMPLE_ARCHIVE (样品全生命周期表)】**
| 字段名 | 含义 | 类型 | 长度 | 状态机 |
| :--- | :--- | :--- | :--- | :--- |
| SAMPLE_UUID | 样品全局唯一码 | VARCHAR | 64 | 条码扫描主键 |
| BATCH_NO | 批次号 | VARCHAR | 32 | 关联生产批次 |
| STORAGE_LOC | 存放库位 | VARCHAR | 128 | 关联仓库管理 |
| EXPIRE_DATE | 留样期限 | DATETIME | - | 自动提醒销毁 |

**【表名：TEST_RESULT_RAW (检测原始数据表)】**
| 字段名 | 含义 | 类型 | 长度 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| RESULT_ID | 结果ID | BIGINT | 20 | |
| TASK_ID | 任务ID | BIGINT | 20 | |
| RAW_CONTENT | 原始数据片段 | JSON | - | 存储所有采集参数 |
| CALC_LOG | 计算算法日志 | TEXT | - | 记录修约过程 |

#### 3. 统计分析域模型 (PostgreSQL Hybrid)

**【表名：QUALITY_SPC_REALTIME (时序质量数据)】**
| 字段名 | 含义 | 类型 | 长度 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| POINT_TIME | 采集时间戳 | TIMESTAMP | 6 | 分区键 |
| TAG_NAME | 采集点名称 | VARCHAR | 128 | 如：1#烘丝机出口水分 |
| TAG_VALUE | 采集值 | FLOAT | 8 | |
| ALARM_STATUS | 是否触发预警 | BOOLEAN | 1 | 存储SPC判定结果 |

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

## 6.5 部署架构与运维方案

### 6.5.1 容器化与协同运维
系统全面采用容器化部署（Docker），并通过 Kubernetes (K8s) 进行集群调度管理。
*   **容器引擎**：Docker 24.0+，实现环境强一致性。
*   **编排工具**：Kubernetes 1.28+，提供自动扩缩容、滚动更新及自愈能力。
*   **私有仓库**：Harbor，存储受控的应用镜像。

### 6.5.2 CI/CD 自动化流水线
我们建议构建基于 GitLab CI/CD 的自动化发布体系：
1.  **代码提交**：开发者提交代码触发扫描（SonarQube）。
2.  **自动构建**：Maven 编译打包，生成 Docker 镜像。
3.  **环境推送**：自动推送到测试环境（UAT）进行回归测试。
4.  **线上发布**：审核通过后，通过蓝绿部署或金丝雀发布上线。

### 6.5.3 监控与预警体系
*   **链路追踪**：SkyWalking实现微服务间的全链路调用监控。
*   **日志中心**：ELK (Elasticsearch, Logstash, Kibana) 集中收集并分析全量日志。
*   **指标监控**：Prometheus + Grafana，监控 CPU、物理机打样率等核心指标。
