# v0 System Prompt 学习分析

## 一句话定位

这是 Vercel v0 这款「AI 生成 UI / 全栈 Web 应用」产品的系统提示，核心价值在于：用极其密集的「领域护栏 + 技术栈默认值 + 设计审美约束」把一个通用代码 Agent 收敛成一个稳定产出高质量前端的垂直生成器。

## 为什么值得学习

- **它是「带强意见的 Agent」的范本**：和通用 coding agent（如 Claude Code）不同，v0 不追求中立，而是在配色、字体、布局、数据库选型、认证方式上都给出强制默认值。学习它如何用 prompt 把「品牌审美」和「商业生态」编码进模型行为。
- **安全 / 商业 / 设计三类约束混编但不冲突**：它把「防 SQL 注入」「优先 Supabase」「最多 5 种颜色」放在同一份文档里，却各自界限清晰。这是大型生产级 prompt 的结构组织样本。
- **few-shot 示例质量极高**：Alignment 一节用 13 个真实对话片段把抽象规则「具象化」，演示了 plan mode、TodoManager、并行工具调用、集成检查等流程的触发时机，是「用例子教模型而非用规则教模型」的典型。
- **上下文工程细节丰富**：压缩恢复、记忆分层、node_modules 调试、stale log 识别等，都是真实长会话 Agent 才会遇到的工程问题。

## 结构拆解

### 1. 身份定义

> "You are v0, Vercel's highly skilled AI-powered assistant that always follows best practices."

- **解决的问题**：一句话锚定身份与「always follows best practices」的价值取向，后续所有强约束都是这句话的展开。
- **写得好在哪**：极短，把品牌（Vercel）、能力定位（highly skilled）、行为基调（best practices）压进一行，不浪费 token。
- **可复用**：`你是 {产品名}，{母公司} 出品的 {领域} 助手，始终 {核心价值取向}。`
- **不要照抄**：「best practices」过于宽泛，真正约束它的是后面几百行细则，单独这句对自建 Agent 几乎无效。

### 2. 安全边界

涉及三个层面：

- **Refusals**：用常量 `REFUSAL_MESSAGE` 固定拒绝话术，且明确「拒绝时绝不道歉、绝不解释」——避免模型在拒绝时被诱导出解释从而暴露策略。
- **数据安全最佳实践**：bcrypt 密码哈希、HTTP-only cookie、RLS、参数化查询、输入校验，以及「绝不实现 mock 认证或仅客户端 auth」——把安全从「建议」升级为「必须」。
- **记忆安全**：明确「绝不把密钥 / API key / 凭据写入记忆」，是持久记忆系统必备的红线。
- **可复用模板**：
  ```
  REFUSAL_MESSAGE = "固定话术"
  - 命中 {敏感类别} 时直接返回 REFUSAL_MESSAGE
  - 拒绝时绝不道歉、绝不解释原因
  ```
- **不要照抄**：v0 的拒绝面很窄（只列仇恨 / 不当 / 性 / 不道德），通用产品需要按自身合规要求扩展。

### 3. 工具调用

- **解决的问题**：v0 工具众多（Move、Write、Edit、Bash、Glob、Grep、Read、GenerateImage、GenerateDesignInspiration、EnterPlanMode、AskUserQuestions、GetOrRequestIntegration、TodoManager、WebSearch、WebFetch、ToolSearch…），需要明确每个工具的边界与互斥关系。
- **几个高价值规则**：
  - **专用工具优先于 Bash**：Edit/Write/Move/Delete 提供「流式可见性 + 乐观并发检查 + 自动格式化」，Bash 仅用于跑命令 / 安装依赖 / git。这是「同一能力多通道」时如何排优先级的好例子。
  - **依赖先装后写**：强制「先 `pnpm add` 再写 import」，从根因上消灭 missing-module 报错——这是把「工具时序」写进 prompt 的典范。
  - **AskUserQuestions 禁止并行**：因为后续调用依赖用户答案，明确禁止与其他工具并行；而其他无依赖工具则鼓励并行。把「并行 / 串行」的判断标准讲清楚。
  - **MCP 动态发现**：通过 ToolSearch 按需加载 MCP 工具，避免一次性把所有工具塞进上下文。
- **可复用**：「为每个工具写明：什么时候用、什么时候不用、与谁互斥、调用时序」，而非只罗列工具签名。
- **不要照抄**：工具名（Move/GenerateDesignInspiration 等）是 v0 私有的，迁移时要替换为自己的工具集。

### 4. 技术栈默认值与领域知识

- **解决的问题**：让模型在没有用户指定时也能做出「Vercel 生态最优」的技术决策——默认 Next.js App Router、pnpm、shadcn/ui、SWR、AI SDK、Supabase、Vercel Blob。
- **写得好在哪**：把「默认值」和「例外条件」成对书写（如「默认 Supabase，除非用户已连 Clerk 或明确要求」），既给确定性又留逃生通道；还内置了 Next.js 16 / React 19.2 的最新 API 变更，相当于把版本迁移知识固化进 prompt。
- **可复用模式**：`默认用 {技术 A}；仅当 {明确条件} 时才用 {技术 B}。` —— 用「默认 + 例外」对消除模型选择困难。
- **不要照抄**：这部分时效性极强（版本号、模型名、API 形态会过时），是 prompt 中最需要定期维护的部分，照抄等于继承过期知识。

### 5. 设计审美约束

- **解决的问题**：UI 生成最大的痛点是「能跑但难看 / 不一致」。v0 用量化规则把审美变成可执行约束：最多 3-5 色、最多 2 字体、移动优先、Flexbox 优先、间距用 Tailwind scale、禁用紫色 / emoji 图标 / 手搓 SVG 地图 / 渐变滥用。
- **写得好在哪**：把主观审美翻译成「可被模型机械执行的硬规则」（数字上限、禁用清单、优先级排序），并用 `text-balance`、设计 token 等具体类名落地。最后一条「Ship something interesting rather than boring, but never ugly」给出审美北极星。
- **可复用模式**：把模糊品质目标拆成「数量上限 + 禁用清单 + 优先级顺序 + 一句审美北极星」四件套。
- **不要照抄**：「绝不用紫色」「最多 5 色」是 v0 的品牌偏好，不是普适设计真理，迁移时应替换成自身设计语言。

### 6. 工作流程与任务管理

- 通过 few-shot 示例演示了清晰的分级流程：小改动直接做 → 大项目 `EnterPlanMode` 规划并 `AskUserQuestions` → 方案批准后用 `TodoManager` 拆解 → 逐步实现 → 写 2-4 句 postamble 总结。
- **可复用**：用「任务规模 → 是否进入 plan mode → 是否建 todo」的决策树控制 Agent 的「郑重程度」，避免对小任务过度规划、对大任务草率开工。

### 7. 上下文与记忆管理

- **上下文压缩恢复**：旧工具结果被压缩为摘要后，「有路径用 Read 取回，无路径重跑工具」——给出明确的恢复协议。
- **分层记忆**：`user` / `team` 两个 scope，`MEMORY.md` 作索引（200 行截断）+ 主题文件按需 Read 加载，避免记忆膨胀挤占上下文。
- **stale 日志识别**：用 `vm:files_synced` 等标记区分新旧日志，避免「重复修复已修问题」——这是长会话 Agent 极易踩的坑。
- **可复用**：「索引文件常驻 + 详情文件按需加载」是控制持久记忆 token 成本的通用范式。

## 可复用模式

- **默认值 + 例外条件成对书写**：消除模型选择困难，同时保留用户覆盖能力。
- **品质目标量化四件套**：数量上限 + 禁用清单 + 优先级顺序 + 一句北极星，把主观审美变成可执行规则。
- **工具优先级而非工具罗列**：同一能力多通道时，明确「首选 / 备选 / 时序 / 互斥」。
- **few-shot 教流程**：用真实对话片段演示「何时进入 plan mode / 何时建 todo / 何时并行」，比抽象规则更可靠。
- **恢复协议**：为上下文压缩、沙箱失败、stale 日志等异常态各写一条明确的恢复 / 止损规则（如「连续失败 2 次即停止重试」）。
- **拒绝话术常量化**：固定 REFUSAL_MESSAGE 并禁止解释，防止策略被套话。

## 不适合直接照抄的地方

- **强时效内容**：Next.js 16 / React 19.2 API、AI SDK 版本号、模型名（gpt-5-mini、claude-opus-4.6 等）、`Current Date 5/10/2026` 都会过时，照抄会让模型基于错误前提工作。
- **私有工具与环境假设**：Move/GenerateDesignInspiration/Vercel Sandbox/`/vercel/share/v0-project` 等深度绑定 v0 运行时，脱离该环境无意义。
- **商业倾向性**：「默认 Supabase、不推荐 Clerk、推荐 Aurora」是 Vercel 生态商业选择，自建产品照抄等于替别人打广告。
- **品牌审美**：禁紫色、限色数等是 v0 的设计身份，不是设计通则。

## 适合进一步拆成课程的点

1. **如何把主观审美写成可执行规则**——以 Design Guidelines 为案例，讲「量化四件套」。
2. **默认值工程**——讲「默认 + 例外」对如何降低 Agent 的决策熵。
3. **工具时序与互斥设计**——以「依赖先装后写」「AskUserQuestions 禁并行」为例。
4. **few-shot 教流程**——拆解 Alignment 的 13 个示例如何覆盖 plan mode / todo / 并行 / 集成检查。
5. **长会话上下文工程**——上下文压缩恢复、分层记忆、stale 日志识别三件套。
6. **垂直 Agent vs 通用 Agent**——对比 v0 与通用 coding agent 在「中立 vs 强意见」上的取舍。

## 对这个项目的展示建议

- 归类为「设计生成 / 代码 Agent」，作为「强意见垂直 Agent」的代表，与通用 coding agent（如 Claude Code）做对照展示，突出「意见密度」差异。
- 重点高亮三块给学习者：**Design Guidelines 的审美量化**、**Data Persistence 的安全 / 商业默认值**、**Alignment 的 few-shot 教学**。
- 用「易过时」标签提示读者：技术栈与版本部分仅作历史快照参考，学习重点应放在「结构与方法」而非「具体技术结论」。
- 可做一个交互对照：把「同一能力多通道（Bash vs 专用工具）」的优先级规则单独抽出，作为「工具设计」小课的引子。
