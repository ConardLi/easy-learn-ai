# Antigravity Planning Mode 学习分析

## 一句话定位

这是 Google Antigravity 编码 Agent 的 AGENTIC（智能体）模式系统提示，核心是用一套「PLANNING → EXECUTION → VERIFICATION」模式机和「task.md / implementation_plan.md / walkthrough.md」三件套 artifact，把长程编码任务的进度可视化、可审批、可追溯。

## 为什么值得学习

- 它展示了一个**成熟产品级 Agent 如何把「过程」当成一等公民**：进度不是聊天里的零散文字，而是绑定到结构化 UI（task_boundary）和持久化文档（artifacts）的状态机。
- 它给出了**人机协作的明确卡点设计**：PLANNING 阶段必须产出 implementation_plan.md 并经用户批准才能进入 EXECUTION，这把「先对齐方案再写代码」的工程纪律编码进了提示词。
- 它演示了**「何时不用重型流程」的克制**：多处强调简单任务要跳过 task boundary，避免 Agent 用仪式感淹没简单交互——这是很多自研 Agent 容易忽略的反面经验。
- 它把**沟通通道、模式、文档格式三者解耦又互相引用**，是研究复杂提示词信息架构的好样本。

## 结构拆解

### 1. 身份定义

`<identity>` 段落简短直接：声明产品名（Antigravity）、出品方（Google Deepmind / Advanced Agentic Coding）、协作关系（与 USER 结对编程）、任务范围（建库 / 改库 / 调试 / 答疑）。

值得注意的是它紧接着引入了「USER 请求会附带状态元数据（打开的文件、光标位置）」，并明确「相关与否由你判断」——这是把 IDE 上下文注入与 Agent 自主判断权一次性交代清楚。

### 2. 安全边界

安全约束集中在 `<user_information>`，写法很克制但很硬：

- **workspace 白名单**：以 `[URI] -> [CorpusName]` 形式列出可访问区域，明确「绝不允许访问不在活跃 workspace 内的文件」。
- **特例目录**：`.gemini` 目录只能用于系统指令指定的用途（artifacts 存放），不能当成项目代码垃圾桶。
- **写入位置纪律**：禁止把项目代码写入 tmp、.gemini、桌面等位置，除非显式被要求。

这是一种「最小可写面」设计：不靠长篇大论讲安全，而是用路径白名单 + 负面清单收敛副作用范围。

### 3. 工具调用

工具相关规则被刻意拆成多块，各司其职：

- `<task_boundary_tool>`：进度可视化工具。规则核心有两条——**TaskStatus 必须描述「下一步」而非「已完成」**（因为要在并行调用其它工具前先 call）；以及**复杂度不足时禁止使用**（避免「调用 boundary + 一两个工具 + notify_user」的低价值套路）。
- `<notify_user_tool>`：任务模式下与用户沟通的唯一通道，强调任务模式中普通消息不可见，必须用 notify_user，并要求把独立问题批量合并、依赖性问题只问第一个。
- `<tool_calling>`：全局铁律——文件路径参数一律用绝对路径。

这种「一个工具一个 XML 块 + 明确的何时用/何时不用」是非常可复用的工具说明书写法。

### 4. 模式状态机（mode_descriptions）

这是整个提示的灵魂。三个模式构成一个带回退边的状态机：

- **PLANNING**：研究 + 设计，必须产出 implementation_plan.md，未获批准就反复改、反复 notify_user。
- **EXECUTION**：写代码；遇到意外复杂度 → 回退 PLANNING。
- **VERIFICATION**：测试 + 产出 walkthrough.md；发现小 bug → 同名 TaskName 切回 EXECUTION；发现根本性设计缺陷 → 新 TaskName + 回 PLANNING。

精彩之处在于它精确定义了「回退的粒度」：小问题不换 TaskName，大问题才换——把「什么时候算同一件事、什么时候算新任务」这种含糊判断写成了可执行规则。

### 5. Artifact 三件套

- `task.md`：动态清单，用 `[ ] / [/] / [x]` 三态跟踪，强调是「living document」。
- `implementation_plan.md`：技术方案模板，含 User Review Required / Proposed Changes / Verification Plan 等固定小节，用 GitHub alerts 突出风险，用 `[NEW]/[MODIFY]/[DELETE]` 标注文件级变更。
- `walkthrough.md`：交付证明，记录改动、测试、验证结果，可嵌图嵌视频。

三者分别对应「我要做什么清单」「我打算怎么做（待批）」「我做完了什么（证据）」，覆盖任务全生命周期。

### 6. 输出与格式规范（artifact_formatting_guidelines）

非常细致的 Markdown 规范库：alerts、代码/diff 块、mermaid、表格、文件链接（强制绝对路径、basename 作链接文本、链接文本不可加反引号）、carousel 轮播、render_diffs 简写。这部分本质是一套「给人看的交付物风格指南」。

### 7. 领域专项规则（web_application_development）

针对 Web 开发的强意见栈：默认 HTML+JS+Vanilla CSS、慎用 Tailwind、用 `npx -y ... ./` 非交互建项目、`npm run dev` 本地跑。设计美学部分语气极强（"WOW"、"UNACCEPTABLE"、"FAILED"），还规定用 generate_image 替代占位图、自动做 SEO。这是把产品差异化卖点（出活即惊艳）直接写进系统提示。

### 8. 沟通风格与协作（communication_style）

四条：GitHub markdown 格式化、有边界的主动性（问「怎么做」时先答不要直接改代码）、像同事一样解释工作并承认回退、不确定就先澄清。

## 可复用模式

- **模式状态机 + 回退边**：用少数几个显式模式 + 明确的切换/回退条件，替代模糊的「自己看着办」，可直接迁移到任何长程任务 Agent。
- **三件套 artifact 生命周期**：清单（task）/ 待批方案（plan）/ 交付证明（walkthrough）的分工模板。
- **「下一步」语义的状态字段**：要求进度字段描述将要做的事而非已完成的事，配合「调用顺序在并行工具之前」，解决进度 UI 与实际执行错位。
- **重型流程的熔断条件**：显式写「复杂度不足禁止使用此工具」，防止 Agent 过度仪式化。
- **路径白名单 + 负面清单**安全模板，几行就把写入副作用收敛干净。
- **每工具一个 XML 块 + 何时用/何时不用**的工具说明书结构。

## 不适合直接照抄的地方

- **强绑定 Antigravity 自有运行时**：task_boundary / notify_user / 任务视图 UI / `.gemini/antigravity/brain/<uuid>` 路径都是产品私有设施，离开该宿主无法工作。
- **硬编码环境细节**：windows、`e:\mcp`、具体用户名 `4regab`、具体 UUID 都是某次会话快照，不可作为通用模板。
- **Web 美学部分语气过激**："UNACCEPTABLE / FAILED" 这类措辞在通用 Agent 上容易导致过度设计、过度自信，需按场景弱化。
- **源码中残留的格式噪声**：原文多处出现行尾 `，` 和被转义的 `\n`，是抓取/拼接残留，复用时应清理。

## 适合进一步拆成课程的点

1. 「PLANNING/EXECUTION/VERIFICATION 状态机」如何设计回退边与 TaskName 粒度。
2. 三件套 artifact 模板精读：implementation_plan.md 的小节结构为什么这样切。
3. 进度可视化设计：为什么 TaskStatus 要描述「下一步」、为什么要在并行工具前调用。
4. Agent 安全边界最小实现：workspace 白名单 + 写入负面清单。
5. 「何时不启用重型流程」的熔断式 Prompt 写法。
6. 交付物 Markdown 风格指南（alerts/diff/mermaid/carousel/文件链接）的工程价值。

## 对这个项目的展示建议

- 作为「**编码 Agent 的过程管理范式**」典型案例展出，与纯执行型 Agent 提示词对比，突出「计划-执行-验证」三段式与 artifact 持久化的差异。
- 在详情页并列展示中译与原文，重点高亮模式状态机段落与三件套模板段落。
- 用 tags 关联到「任务管理」「工作流程」「人机协作」等学习模块，方便与 Kiro spec、Manus loop 等同类提示横向比较。
- 标注 sourceStatus 为「待核验」，并提示其中的 windows 路径、用户名、UUID 属会话快照、非通用配置，引导学习者关注模式设计而非环境细节。
