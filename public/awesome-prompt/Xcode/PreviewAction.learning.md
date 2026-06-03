# Xcode Preview Action Prompt 学习分析

## 一句话定位

这是 Xcode 内置 AI 的一个「单一动作型」工具 prompt：给定用户当前文件与选中的 SwiftUI View，自动生成对应的 `#Preview` 宏代码，且只输出代码本身。

## 为什么值得学习

它是一个非常克制、目标极其单一的 prompt，和那种动辄上千行的通用 Agent prompt 形成鲜明对比。它的价值在于演示了「窄任务工具」该怎么写：

- 输入用模板占位符（`{{filename}}`、`{{filecontent}}`、`{{selected}}`）注入，结构清晰。
- 输出格式被严格约束（只返回 `#Preview`、必须包代码块、不要解释）。
- 业务规则用「条件 → 动作」的决策表表达，几乎可以被模型当成可执行的 if/else。

对于学习如何把一段领域知识（SwiftUI Preview 的最佳实践）编码进 prompt，这是一个非常浓缩的范例。

## 结构拆解

### 1. 身份定义

这个 prompt 没有显式的「You are ...」身份段落，而是用上下文 + 任务直接定义角色：先告诉模型用户在哪个文件、文件内容是什么、选中了什么，再用一句「Your task is to create a Preview for a SwiftUI View」把模型钉死在单一职责上。这是工具型 prompt 的典型做法——身份隐含在任务里，不浪费 token 做人设。

### 2. 安全边界

它的「安全边界」体现为输出边界而非权限边界：

- 「only return the code for the #Preview macro with no additional explanation」——禁止跑题、禁止解释。
- 结尾再次强调「Return the #Preview and no additional explanation」并要求「ALWAYS wrap the preview in triple-tick markdown code snippet marks」。

同一约束在开头和结尾各说一次，是利用「首因 + 近因」效应来对抗模型爱解释的倾向。这种「输出契约」是把生成结果接入 IDE 自动插入流程的前提：宿主程序需要稳定、可解析的格式。

### 3. 工具调用

严格说它本身就是一个被调用的工具（Xcode 的某个 AI action），prompt 内部并不再调用其它工具。值得注意的是它把 `#Preview` 的初始化器签名直接贴给模型：

```
init(_ name: String? = nil, body: @escaping @MainActor () -> any View)
```

并配一个最小示例。这相当于把 API 文档塞进 prompt，降低模型记忆错误 API 的概率。

### 4. 领域规则的决策表

prompt 的核心是一张「触发条件 → 包裹动作」的规则表：

- 命中 `.navigation*` / `NavigationLink` / `.toolbar*` 等 → 用 `NavigationStack` 包裹。
- 命中 `.listRow*` / `.listItem*` 等 modifier 或带 `Row` 后缀 → 用 `List` 包裹。
- 接收类型列表 → 造 5 条假数据。
- 接收 `@Binding` → 在 `#Preview` 里就地定义。
- 优先复用已有的 static / global 变量，尤其是图片类型。
- 非必要不加 `@availability`。

这是把人类工程师「写 Preview 时的隐性经验」显式化的精彩示范。

## 可复用模式

- **上下文三件套**：当前文件名 + 全文件内容 + 选中片段，是「编辑器内代码动作」prompt 的标准注入结构，可直接套用到补全、重构、解释等动作。
- **首尾双重输出约束**：在开头声明输出格式、在结尾再强调一次，能显著提升格式稳定性。
- **贴 API 签名 + 最小示例**：让模型生成框架代码时，直接给目标 API 的签名和一个 hello-world 示例，比纯文字描述更可靠。
- **条件-动作决策表**：把领域最佳实践写成「若命中 X 模式则做 Y」的列表，模型执行确定性更高。
- **缺省优先复用已有资源**（static/global 变量）：减少模型凭空捏造测试数据。

## 不适合直接照抄的地方

- 规则里大量使用通配符式描述（如 `.navigation.*`），依赖模型做模糊匹配，换到对正则有歧义的场景容易误判，需要明确匹配语义。
- 强约束「只输出代码、不解释」在调试阶段不利于排查；如果你的产品需要可解释性，应保留解释通道。
- 它高度绑定 SwiftUI / Xcode 生态，规则表本身不可迁移，只有「写决策表」的方法论可迁移。

## 适合进一步拆成课程的点

- 如何为「窄任务工具型 prompt」设计输入注入结构与输出契约。
- 如何把领域专家经验转写成「条件 → 动作」决策表。
- 首因/近因效应在 prompt 输出约束上的应用。
- 把 API 签名与最小示例放进 prompt 的「文档内联」技巧。

## 对这个项目的展示建议

- 把它作为「工具型 prompt」的代表案例，和通用 Agent prompt 做长度与设计哲学对比，凸显「少即是多」。
- 在 UI 上高亮那张决策表，并标注每条规则解决的实际 SwiftUI 痛点，帮助读者理解领域知识如何被编码。
- 可配一个交互演示：给定一段 View 代码，让读者预测应该被包进 `NavigationStack` 还是 `List`，再对照规则验证。
