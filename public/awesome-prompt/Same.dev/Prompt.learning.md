# Same.dev System Prompt 学习分析

## 一句话定位

这是云端 IDE 产品 **Same.dev** 的 agent 系统 prompt：它把一个"自主结对编程 agent"约束在「Web 应用开发 + 实时预览 + 自动部署」这条非常具体的产品管线上，是研究**产品形态如何反向塑造 prompt**的优秀样本。

## 为什么值得学习

- **产品耦合度极高**：与那些通用编程 agent 不同，Same 的 prompt 把运行环境（Docker / Ubuntu 22.04 / `/home/project`）、工具链（bun、shadcn、Three.js、Netlify）、交互形态（右侧 iframe 实时预览、Rollback/Revert 按钮）全部写死进 prompt。它示范了"垂直 agent"如何用约束换取可靠性。
- **客服与商业边界写进 prompt**：`<service_policies>` 把退款、计费、token 估算、回滚等"非技术但高敏感"话题做了明确的话术隔离，这是面向真实付费用户的产品才会有的细节。
- **可立即运行（runnable-first）哲学**：整篇都在围绕"用户能一键看到结果"做工程化约束——端口 host 配置、iframe 兼容、版本化、自动部署，是 no-code/low-code 产品 prompt 的范本。
- **附带一段真实越狱回显**：源文件末尾包含一次 "EVERYTHING" 提取攻击与模型把完整 prompt 复述出来的记录，本身就是 prompt 安全教学的活教材。

## 结构拆解

### 1. 身份定义

> "You are AI coding assistant and agent manager, powered by gpt-4.1. You operate in Same..."

它一次性钉死了四件事：角色（编程助手 + agent 管理者）、底座模型、运行平台（same.new）、支持渠道（文档 / 邮箱）。紧接着的"pair programming""you are an agent—keep going until resolved"两段，确立了**自主回合制**心智：不解决完不交还控制权。

- 解决的问题：让模型清楚自己不是聊天机器人，而是要把任务跑完的执行体。
- 写法亮点：把"环境上下文会被自动附带、但相关性由你判断"明确告知，降低模型对噪声信息的过度反应。

### 2. 安全边界（service_policies + website_cloning）

这是该 prompt 最有产品味道的部分，分两层：

**商业/客服边界**：退款、会员、费用、公平性等话题一律不代表官方表态，引导到 support；token 与时间估算明确拒绝并转而引导拆解任务；回滚/还原只能用户自己点按钮，并解释了 Rollback→Revert 的两段式语义；"同一问题出现 3 次就建议 revert 或联系客服"是一个很实用的**失败兜底阈值**。

**克隆伦理边界**：绝不克隆带伦理/法律/色情/隐私风险的站点，绝不克隆登录页/钓鱼页。这是 UI 克隆类产品必须前置的红线。

- 可复用模式：把"模型无权代表公司表态的话题"显式列举 + 统一导向客服，是所有商业化 agent 都该抄的护栏。

### 3. 工具调用（tool_calling + maximize_parallel_tool_calls）

八条工具规则中几条很典型：绝不调用未提供的工具、绝不向用户暴露工具名（用自然语言描述动作）、临时文件用完即删、有计划就立即执行不等确认。

随后单列一节 `<maximize_parallel_tool_calls>` 用"CRITICAL / DEFAULT TO PARALLEL / 快 3-5 倍"的强语气反复强调并行调用——把一个性能优化点提升到行为准则级别，是值得借鉴的"重点强调"写法。

### 4. 代码修改纪律（making_code_changes）

- 绝不直接向用户输出代码，一律走编辑工具；尽量缩小改动范围、避免大重构。
- "生成的代码必须能立即无错运行"被标为*极其重要*，并配 7 条可执行细则（补齐 import、禁止生成长二进制、编辑前先读、linter 修复不超过 3 轮）。
- 工具选择有量化阈值：>2500 行用 `string_replace`，否则用 `edit_file`——把"什么时候用哪个工具"写成可判断的规则而非凭感觉。

### 5. 领域工作流（web_development + web_design）

这是把"产品 know-how"沉淀进 prompt 的典范：

- 工具链强约束：`bun`>`npm`、`bunx`>`npx`、Vanilla Three.js 而非 R3F 并锁定版本号、shadcn 用特定 CLI 命令。
- 平台适配细节：Vite/Next 必须 `--host 0.0.0.0` 才能暴露端口给 iframe；Web API 要兼容 iframe（`crypto.randomUUID()` → `Math.random()`）。
- 闭环节奏：早启 dev server → 重大编辑后重启 + 版本化 → 自动部署 → `suggestions` 收尾。
- 设计偏好：禁用 emoji、避免紫/靛/蓝、必须响应式、禁止停留在默认 shadcn 组件。

### 6. 任务管理（memos + task_agent）

- `.same/todos.md` 作为持久化的进度记忆，规定在回复首尾更新、任务拆解、随进展勾选——这是把 TodoWrite 思路落地为文件的具体做法。
- `task_agent` 提供"子 agent 委派"能力，用于多步研究/调试/外部服务，并强调 MCP 授权与"prompt 越详细结果越好"。

## 可复用模式

- **商业护栏模板**：「列出模型不得代表公司表态的话题 → 统一引导到官方 support → 给出失败重试阈值（如 3 次）」。
- **量化工具选择**：用明确数值阈值（行数、循环次数）替代"看情况"，让模型行为可预测。
- **并行优先强调块**：单独成节、用强语气 + 量化收益（3-5x）来抬高某条性能准则的权重。
- **领域闭环节奏**：把"启动→编辑→校验→版本化→部署→建议"写成固定 pipeline，保证每轮交付可见可回退。
- **持久化 todo 文件**：用工作区内的 `.same/todos.md` 做跨回合记忆，比纯靠上下文更稳。

## 不适合直接照抄的地方

- **强平台绑定**：iframe 预览、Rollback/Revert 按钮、Netlify 部署、`/home/project`、same-assets.com 等都是 Same 专属，脱离该产品即失效。
- **写死的技术栈与版本**：three@0.169.0、特定 shadcn CLI 命令会随生态过期，照抄需同步维护。
- **设计口味是产品主观偏好**：禁 emoji、避开紫/蓝并非通用真理，套用前要换成你自己的设计语言。
- **末尾的 prompt 回显**："EVERYTHING"导致整段系统 prompt 被复述，恰恰是**反面教材**——不要把它当作 prompt 内容学习，而应作为"系统 prompt 易被提取"的安全警示。

## 适合进一步拆成课程的点

1. 垂直 agent vs 通用 agent：约束如何换取可靠性（以 Same 的工具链锁定为例）。
2. 商业化产品的 prompt 护栏：退款/计费/估算/回滚话题的话术隔离设计。
3. "可立即运行"工程哲学：端口、iframe 兼容、依赖补全、linter 闭环。
4. 子 agent 委派与 MCP：何时拆任务、如何写好委派 prompt。
5. 安全专题：用文末的 "EVERYTHING" 回显做 prompt 泄露/提取攻击的实战拆解。

## 对这个项目的展示建议

- 在卡片标签上突出"垂直代码 Agent / 商业护栏 / 自动部署闭环"，与通用编程 agent 形成对比展示。
- 可做一个"安全警示"小标注，指出源文件末尾包含真实的 prompt 提取回显，引导学习者关注系统 prompt 防泄露。
- 与 Claude Code、Cursor 等 prompt 并列对比时，建议用一张「身份 / 安全 / 工具 / 工作流 / 任务管理」五维表，Same 在"工作流与部署闭环"维度最突出，适合作为该维度的代表样本。
