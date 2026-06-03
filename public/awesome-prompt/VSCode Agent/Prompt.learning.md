# VSCode Agent System Prompt 学习分析

## 一句话定位

这是 GitHub Copilot 在 VS Code 中作为「自动化编码 Agent」运行的系统提示词，核心价值在于展示了一个**深度绑定 IDE 工具集**的代码 Agent 如何用结构化标签把身份、工具纪律、编辑规范与上下文注入清晰隔离。

## 为什么值得学习

- **IDE 原生工具体系最完整的范例之一**：它不是泛泛的「会写代码」，而是把语义搜索、读文件、改文件、跑终端、查错误、查引用、建工作区等一整套 VS Code 能力以 JSON Schema 形式列全，是研究「Agent 如何驱动 IDE」的高质量参考。
- **强约束写法密集**：用大量 NEVER / MUST / DO NOT 把容易出错的行为（如打印代码块代替调用工具、并行调用 semantic_search）逐条钉死，便于学习「如何用提示词约束模型行为」。
- **分区清晰**：用 `<identity>`、`<instructions>`、`<toolUseInstructions>`、`<editFileInstructions>`、`<functions>`、`<context>` 等 XML 标签把职责切片，是可直接套用的提示词组织骨架。

## 结构拆解

### 1. 身份定义（`<identity>`）

- **解决的问题**：固定品牌身份（必须回答 "GitHub Copilot"）、绑定 Microsoft 内容政策、设定语气（简短、不带个人色彩）。
- **写法为何有效**：把"拒答模板"写成唯一固定句 `"Sorry, I can't assist with that."`，避免模型在边界场景自由发挥，输出可预测。
- **可复用**：「身份 + 内容政策 + 固定拒答语 + 语气」四件套是商业助手身份段的标准模板。
- **不要照抄**：品牌名、内容政策归属是 Copilot 专属，换产品必须替换。

### 2. 行为指令与安全边界（`<instructions>` + `<toolUseInstructions>`）

- **解决的问题**：让模型在不确定时**先收集上下文再动手**，并强制把动作落到工具上而非口头描述。
- **关键约束**：
  - 「这是你的责任（YOUR RESPONSIBILITY）去收集上下文」——把主动性写成义务。
  - 「绝不要打印含文件改动/终端命令的代码块」——杜绝模型"假装执行"。
  - 「绝不要向用户说出工具名称」——把内部实现对用户隐藏，改用自然语言（"I'll run the command in a terminal"）。
  - 「不要并行调用 semantic_search」「不要并行多次调用 run_in_terminal」——针对具体工具的并发纪律。
- **写法为何有效**：每条规则都对应一个真实的高频失败模式，针对性强、可执行。
- **可复用**：「先探索后执行 + 工具优先 + 隐藏工具名」是任何 IDE/CLI Agent 都通用的纪律模板。

### 3. 工具调用（`<functions>`）

- **解决的问题**：以严格 JSON Schema 暴露 16 个工具，覆盖检索（semantic_search/grep_search/file_search/list_code_usages）、读写（read_file/insert_edit_into_file）、执行（run_in_terminal/get_terminal_output）、诊断（get_errors）、脚手架（create_new_workspace/get_project_setup_info/install_extension）、网络（fetch_webpage）等全链路。
- **写法为何有效**：每个工具的 description 里直接写明"何时用 / 何时不用"（如 grep 用于已知确切字符串、semantic_search 用于自然语言），把工具选择逻辑前置到 schema，减少误用。
- **可复用**：「在工具描述里写清适用与不适用场景」是降低工具误调用率的高性价比技巧。

### 4. 文件编辑规范（`<editFileInstructions>`）

- **解决的问题**：规范"如何安全地改代码"——先读后改、按文件分组、改完必须查错（get_errors）、用 `// ...existing code...` 表示未改动区域以避免重复整文件。
- **写法为何有效**：用 Person 类的具体示例演示省略写法，把抽象规则变成可模仿的样板；并形成「编辑→验证→修复→再验证」的闭环。
- **可复用**：「最小 diff + 省略标记 + 编辑后强制校验」是代码 Agent 编辑环节的黄金模式。

### 5. 上下文注入（`<context>` + `<reminder>` + `<tool_format>`）

- **解决的问题**：把运行时环境（日期、OS、工作区路径与结构）动态拼进提示词，让模型基于真实环境决策；`<reminder>` 在长提示尾部重申最易忘的编辑规则。
- **写法为何有效**：尾部重申利用了模型对首尾内容更敏感的特性，强化关键约束。
- **可复用**：「运行时上下文区 + 尾部 reminder 复读关键规则」对长系统提示很实用。

## 可复用模式

- **XML 标签分区骨架**：`identity / instructions / toolUseInstructions / editFileInstructions / functions / context`，职责单一、便于增删。
- **工具描述自带选择指南**：在每个工具 description 内写"何时用/何时不用"。
- **行为约束三段式**：动机（为什么）+ 强模态词（MUST/NEVER）+ 反例（不要打印代码块）。
- **编辑闭环**：读→改（最小 diff）→get_errors→修复→再校验。
- **固定拒答语**：把内容安全收敛成单一定句。

## 不适合直接照抄的地方

- **品牌与政策绑定**：身份段、Microsoft 内容政策、Copilot 名称属于专有内容。
- **VS Code 专用工具**：get_vscode_api、install_extension、create_new_jupyter_notebook 等强依赖 VS Code 宿主，迁移到别的环境无意义。
- **示例中的真实路径**：`c:\Users\Lucas\...` 是采集时的运行态数据，并非提示词模板内容，照抄会误导。
- **并发纪律的绝对化**：如"绝不并行 semantic_search"是为特定实现服务的，换底座未必适用。

## 适合进一步拆成课程的点

1. **如何为 IDE Agent 设计工具集**：以这 16 个工具为案例，讲检索/读写/执行/诊断的分层。
2. **工具描述即路由**：对比 grep_search 与 semantic_search 的描述，讲"用描述引导模型选对工具"。
3. **代码编辑安全闭环**：拆解"先读后改 + 省略标记 + get_errors 校验"。
4. **强约束提示词写法**：归纳 NEVER/MUST 的使用时机与反例配套技巧。
5. **运行时上下文注入**：讲 `<context>` 动态拼装与尾部 reminder 复读策略。

## 对这个项目的展示建议

- 在站点中作为「代码 Agent / IDE 助手」类的代表条目，与 Claude Code、Cursor 等并列对比工具集差异。
- 重点高亮三块：**完整 IDE 工具 Schema**、**编辑安全闭环**、**隐藏工具名的用户协作策略**。
- 可做一个「工具描述 → 适用场景」的对照小表，直观呈现"工具描述即路由"的设计思想。
- 标注来源为社区采集、未注明官方出处（sourceStatus 待核验），避免误导为官方权威版本。
