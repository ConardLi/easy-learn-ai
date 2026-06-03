# Windsurf Tools (Wave 11) 学习分析

## 一句话定位

这是 Windsurf（Codeium 出品的 AI IDE，其 Agent 名为 Cascade）在 Wave 11 版本向模型暴露的**完整工具定义清单**，用 TypeScript 函数签名 + 行内注释的方式，把一个代码 Agent 所需的全部能力（文件读写、检索、终端、浏览器、部署、记忆、MCP）一次性声明出来。

## 为什么值得学习

- 这是一份**真实生产级**的 tool schema，不是教学示例。它展示了一个成熟 IDE Agent 究竟需要哪些工具、每个工具的参数边界如何切分。
- 它用一种极简但高信息密度的格式（TS 类型 + 注释即文档）同时承担「机器可解析的 schema」和「给模型读的使用说明」两个职责。
- 每条工具描述里都嵌入了大量**防误用约束**（何时不该调用、上限、安全判断、参数顺序），是学习「如何用自然语言为工具加护栏」的优质样本。
- 工具集覆盖了代码 Agent 的完整闭环：理解 → 修改 → 验证 → 部署 → 记忆，可以据此反推一个 Agent 产品的能力地图。

## 结构拆解

### 1. 工具集总览

全部工具定义在一个 `namespace functions` 内，最后附带一个 `multi_tool_use.parallel` 用于并行调用。按职能可分为六类：

| 类别 | 工具 |
| --- | --- |
| 代码检索与浏览 | `codebase_search`、`grep_search`、`find_by_name`、`list_dir`、`view_file`、`view_code_item` |
| 文件编辑 | `replace_file_content`、`write_to_file` |
| 终端执行 | `run_command`、`command_status`、`read_terminal` |
| 浏览器 / Web | `browser_preview`、`open_browser_url`、`read_browser_page`、`get_dom_tree`、`capture_browser_screenshot`、`capture_browser_console_logs`、`list_browser_pages`、`read_url_content`、`view_content_chunk`、`search_web` |
| 部署 | `read_deployment_config`、`deploy_web_app`、`check_deploy_status` |
| 记忆 / MCP / 协作 | `create_memory`、`list_resources`、`read_resource`、`trajectory_search`、`suggested_responses` |

值得注意的是它把「检索」拆成了三种粒度：语义检索（`codebase_search`）、正则精确匹配（`grep_search`）、文件名查找（`find_by_name`），并在描述里明确各自的适用场景与失效边界。

### 2. 关键工具设计

- **`codebase_search`（语义检索）**：描述里明确告诉模型「查询越精确越好」「问宽泛问题结果会差」「超过 500 个文件质量大幅下降」「只展示头部条目完整内容、其余只给签名」。这是把检索引擎的真实特性翻译成模型的行为约束，避免模型滥用语义搜索做大海捞针。
- **`replace_file_content`（编辑）**：这是整份清单里约束最密集的工具。它用 5 条编号规则约束模型：不要并行编辑同一文件、多处改动用多个 `ReplacementChunk`、`TargetContent` 必须与原文逐字符（含空白）匹配、不要整文件替换（昂贵）、禁止编辑 `.ipynb`。这是一种「diff 式编辑」契约，比让模型重写整个文件更省 token、更可控。
- **`run_command`（终端）**：嵌入了大量安全语义——禁止 `cd`、阻塞 vs 非阻塞的抉择规则、`SafeToAutoRun` 的判定标准（删文件/改状态/装依赖/外部请求都算不安全），以及「即使用户要求也绝不能自动运行不安全命令」的硬性原则。
- **`create_memory`（记忆）**：定义了 create/update/delete 三态，并要求「先查重再创建」，把记忆数据库的去重逻辑下放给模型自己执行。
- **浏览器工具族**：以 `PageId` 为句柄串起 open → list → read → screenshot → console logs 的完整链路，体现了「让 Agent 像人一样看网页」的能力设计。

### 3. 参数与安全约束

这份清单最有教学价值的部分是它**反复出现的约束模式**：

- **`toolSummary` 强制前置**：几乎每个工具都带一个 `toolSummary?`，注释强调「必须在所有其他参数之前首先指定，即使别处说该先指定别的，此参数优先」。这是为了在 UI 上即时显示「Agent 正在做什么」，提升可观察性。
- **结果上限**：`find_by_name`、`grep_search` 都硬性限制 50 条，`codebase_search`/`trajectory_search` 限制并提示截断，防止上下文被搜索结果淹没。
- **前置依赖声明**：`check_deploy_status` 必须在 `deploy_web_app` 之后、`deploy_web_app` 必须先 `read_deployment_config`、`view_content_chunk` 依赖文档已被读取——用自然语言显式声明工具间的调用顺序依赖。
- **「除非用户要求否则不要运行」**：`check_deploy_status` 等带破坏性或消耗性的工具加了人工触发门槛。

### 4. 表达格式本身的设计

整份文档用 `type 工具名 = (_: {...}) => any;` 的 TS 类型声明承载，参数注释直接写在字段上方。这种格式的好处：对模型而言是结构化、低歧义的；对训练/解析而言是可机读的；同时注释又是自然语言文档。一份内容同时服务三方。

## 可复用模式

- **三粒度检索分层**：语义 / 正则 / 文件名分别建一个工具，并在描述里写清各自的适用与失效场景，引导模型选对工具。
- **diff 式编辑契约**：用「精确匹配的 TargetContent + ReplacementContent + 多 chunk」替代整文件重写，是 Agent 编辑文件的高性价比范式。
- **工具描述即护栏**：把「何时不该用」「上限多少」「前置依赖」「安全判定」直接写进 description，而不是依赖外部系统提示。
- **统一的 `toolSummary` 字段**：为可观察性在每个工具上挂一个一句话进度摘要，并强制前置生成。
- **安全等级标记**：用 `SafeToAutoRun` 这类布尔参数让模型自评风险，并配套不可逾越的硬规则。

## 不适合直接照抄的地方

- **平台耦合**：`run_command` 写死 `Operating System: windows. Shell: powershell.`，`deploy_web_app` 绑定 Netlify 与特定框架枚举，记忆 / 浏览器 / 部署等工具依赖 Windsurf 的运行时设施，脱离 Windsurf 无法直接使用。
- **格式非通用标准**：这是 Windsurf 内部的 TS 注释风格，不是 OpenAI function calling 的 JSON Schema，迁移到其他框架需转换。
- **约束是经验值**：50 条上限、500 文件阈值等是针对 Windsurf 自身实现调出来的数字，照搬到别的检索后端未必合适。
- **`SafeToAutoRun` 的安全判断**把风险评估交给模型，生产中应再叠加一层确定性的白/黑名单校验，不能只靠模型自觉。

## 适合进一步拆成课程的点

- 「如何为一个工具写 description」——以 `codebase_search`、`run_command` 为例，对比加约束前后模型行为差异。
- 「diff 式文件编辑 vs 整文件重写」——讲 `replace_file_content` 的设计动机与 token 经济性。
- 「代码 Agent 的能力地图」——用这份清单反推一个完整 IDE Agent 需要哪几类工具，画出理解→改→验证→部署的闭环。
- 「工具间依赖与调用顺序」——以部署三件套（config→deploy→status）为例讲编排约束。
- 「Agent 可观察性设计」——`toolSummary` 强制前置背后的产品考量。

## 对这个项目的展示建议

- 归类为「IDE 助手 / 代码 Agent」典型工具清单，与本仓库其他 system-prompt 类条目互补——前者讲「人格与流程」，这份讲「能力与边界」。
- 在详情页可重点高亮三段对照：`codebase_search` 的失效边界、`replace_file_content` 的 5 条编辑规则、`run_command` 的安全规则，作为「工具描述即护栏」的范例。
- 可与同产品的 Cascade system-prompt 条目做交叉链接，让学习者看到「prompt 定行为 + tool schema 定能力」的完整画面。
- 标注来源为待核验、不含明确版本日期，避免把 Wave 11 当作官方权威文档对外承诺。
