# 需求文档

## 简介

价格数据集成系统用于实现 Price X（全球价格管理系统）、China Beacon（中国区业务数据中枢）和 ODP（订单数据平台）之间的价格与产品数据互通。系统覆盖中国大陆、中国香港、中国台湾三个法律实体，确保全球标准价格、转移定价、公司间价值及产品相关字段信息在各系统间准确、完整地传输。

## 术语表

- **Price_X**：全球价格管理系统，负责管理和维护所有产品的全球标准价格（Global List Price）
- **China_Beacon**：中国区业务数据中枢，作为中国区各系统间数据集成的核心平台
- **ODP**：订单数据平台（Order Data Platform），负责管理和提供订单级别的数据
- **Global_List_Price**：全球标准价格，由 Price X 统一管理的产品基准售价
- **TP**：Transfer Price，转移定价，指公司间内部交易的定价
- **ICV**：Inter-Company Value，公司间价值，指关联公司之间交易的价值金额
- **MWS**：与 Price X 传输产品相关的字段信息集合
- **Item**：产品条目，指系统中管理的具体产品单元
- **Legal_Entity**：法律实体，包括 China Mainland（中国大陆）、China HK（中国香港）、China Taiwan（中国台湾）

## 需求

### 需求 1：Price X 推送全球标准价格到 China Beacon

**用户故事：** 作为中国区业务人员，我需要获取 China 区域所有产品的全球标准价格，以便在本地业务中使用统一的定价基准。

#### 验收条件

1. WHEN Price_X 发起价格数据推送, THE Price_X SHALL 将 China Mainland、China HK、China Taiwan 三个法律实体使用的所有 Item 的 Global_List_Price 信息传输至 China_Beacon
2. THE Price_X SHALL 在推送数据中包含每个 Item 的唯一标识符和对应的 Global_List_Price 值
3. WHEN Price_X 推送的 Item 在 China_Beacon 中已存在对应记录, THE China_Beacon SHALL 更新该 Item 的 Global_List_Price 为最新推送值
4. WHEN Price_X 推送的 Item 在 China_Beacon 中不存在对应记录, THE China_Beacon SHALL 创建该 Item 的新记录并存储 Global_List_Price
5. IF Price_X 与 China_Beacon 之间的数据传输失败, THEN THE Price_X SHALL 记录传输错误日志并触发重试机制
6. THE Price_X SHALL 覆盖三个法律实体（China Mainland、China HK、China Taiwan）下所有正在使用的 Item

### 需求 2：China Beacon 通过 ODP 获取法律实体的价格与产品字段信息

**用户故事：** 作为中国区定价分析人员，我需要获取三个法律实体的转移定价、公司间价值以及所有 MWS 产品相关字段信息，以便进行跨实体的价格分析和合规管理。

#### 验收条件

1. WHEN China_Beacon 发起数据获取请求, THE ODP SHALL 返回 China Mainland 法律实体下所有使用中 Item 的 TP、ICV 以及 MWS 产品相关字段信息
2. WHEN China_Beacon 发起数据获取请求, THE ODP SHALL 返回 China HK 法律实体下所有使用中 Item 的 TP、ICV 以及 MWS 产品相关字段信息
3. WHEN China_Beacon 发起数据获取请求, THE ODP SHALL 返回 China Taiwan 法律实体下所有使用中 Item 的 TP、ICV 以及 MWS 产品相关字段信息
4. THE ODP SHALL 在返回数据中包含每个 Item 的唯一标识符、所属法律实体标识、TP 值、ICV 值以及完整的 MWS 产品相关字段
5. WHEN ODP 返回的数据包含已存在于 China_Beacon 中的 Item 记录, THE China_Beacon SHALL 更新该记录的 TP、ICV 和 MWS 字段为最新值
6. IF ODP 返回的数据中某个 Item 缺少必填字段（TP 或 ICV）, THEN THE China_Beacon SHALL 标记该数据记录为异常并记录错误详情
7. IF China_Beacon 与 ODP 之间的数据获取失败, THEN THE China_Beacon SHALL 记录错误日志并触发告警通知

### 需求 3：ODP 通过 China Beacon 获取中国订单的产品级别信息

**用户故事：** 作为订单数据平台管理员，我需要通过 China Beacon 获取中国区订单的产品级别信息，以便完善订单数据并支持下游业务分析。

#### 验收条件

1. WHEN ODP 发起订单产品数据查询请求, THE China_Beacon SHALL 返回对应中国区订单中每个产品（Product）级别的详细信息
2. THE China_Beacon SHALL 在返回数据中包含订单标识符、产品标识符以及产品级别的相关业务字段
3. WHILE ODP 持续查询中国区订单产品数据, THE China_Beacon SHALL 确保返回的数据与最新订单状态保持一致
4. IF ODP 请求的订单在 China_Beacon 中不存在, THEN THE China_Beacon SHALL 返回明确的"订单不存在"错误信息
5. IF ODP 请求的订单存在但缺少产品级别信息, THEN THE China_Beacon SHALL 返回订单基本信息并标注产品数据缺失状态
6. WHEN ODP 的查询请求包含无效的订单标识符格式, THE China_Beacon SHALL 返回参数校验失败的错误信息
