# Interaction Patterns

「什么概念用什么交互 + 一个 section 怎么让多处都动起来」的决策框架。

---

## 交互密度分级

每个 section 的可动元素落在某层。**整站 ≥ 3 个 section 到 L3+**。

| L | 名字 | 用户做什么 | 例 |
|---|---|---|---|
| L0 | 静态 | 看 | SVG / 段落 |
| L1 | hover | 移鼠标 | tooltip / 联动高亮（**不算 section 的 2 个可动元素之一**） |
| L2 | 切换 | 点 | pill / tab / 单步 / 折叠 |
| L3 | 拖拽编辑 | 改输入 | slider / 输入框 / 勾选组合 / 拖节点 |
| L4 | 实时反映 | 持续改 + 看结果 | 拼装编辑器 / 任务模拟器 |

合格 section 的可动元素配比：2 个 L2 / 1×L2 + 1×L3 / 1×L3 或 L4。

---

## 16 种范式

按层级分组。每条「**适合什么**」一句话即够。

### L2 切换

- **pill 切换对比**：两种事物本质差异（A vs B），同 prompt 投两边
- **单步 trace**：流程 / 算法 / 循环 ≤ 6 步，next / prev / reset
- **tab 视图模式**：同一数据多种展示（图 / 表 / 时间线 / JSON）
- **before/after 二元切换**：旧标准 vs 新标准
- **accordion 折叠**：N 个并列细节（5+），用户只关心一两个
- **chip 阵列筛选**：分类 / 标签 / 任务类型

### L3 拖拽编辑

- **slider + 实时曲线**：数学直觉（衰减 / 概率 / 学习率 / temperature）
- **slider 调切片**：chunking / 窗口 / batch / 上下文长度
- **输入框 + live preview**：用户拿自己内容看 demo（tokenizer / embedding / 改写）
- **勾选组合 + 条件结论**：N 个开关解锁不同场景
- **拖拽节点重排**：流程编排 / 优先级
- **数字 stepper（+/-）**：参数微调（top-K / top-p）

### L4 实时反映

- **拼装式编辑器**：prompt 拼装 / pipeline 装配 / 架构搭建
- **任务模拟器**：让用户当一回主角（如让用户当 Agent 决定下一步）

---

## 概念 → 范式 选型表

| 想表达的事 | 首选 | 反例 |
|---|---|---|
| 两种事物本质差异 | pill 对比 | 单独长篇分别介绍 |
| 一个流程 / 算法 | 单步 trace | autoplay 动画 |
| 数学直觉 | slider + 曲线 | 静态柱状图 + 公式 |
| 切片 / 分段 | slider 调切片 | 三张图分别展示 |
| 让用户用自己内容 | 输入框 + preview | 一段固定示例 |
| 功能组合解锁场景 | 勾选组合 | 单纯列功能特性 |
| 架构 / 流程图 | 手写 SVG + hover 注释 | screenshot / mermaid |
| 排行 / 评测 | SVG 横向 bar + hover 联动 | recharts 圆环 / 雷达图 |
| 协议演进 旧 vs 新 | before/after | 两段分别叙述 |
| N 个并列细节 | accordion | 一坨长列表 |
| 让用户当主角 | 任务模拟器 | 看不动的 demo |

---

## section 内多处可动 · 组合套路

单一交互组件 = 体验单薄。两两组合：

- 主交互 + hover 注释（trace 节点 hover 看细节）
- 筛选器 + 主展示（chip 阵列 → 卡片列表）
- slider + tab 视图切换（参数调 + 三种结果可视化）
- 输入框 + 单步 trace（用户输 query → trace 展开处理过程）
- 拼装 + 实时输出（拼 prompt → mock 实时回应）
- before/after + accordion（顶部开关 + 展开看差异点）

---

## 反相邻重复

写完一个 section，下一个开工前先看上一个用了什么主范式。

**红线组合**：pill→pill / trace→trace / slider→slider / 静态图→静态图。

整站 6-8 个 section 应出现 **5+ 种不同范式**。出现 3+ 个 pill 或 3+ 个 trace → 停下重排。

---

## 通用纪律

- **状态可视化截然不同**：选中 `bg-ink text-cream + shadow-stamp`，未选中白底浅描边。不要色差弱区分
- **反馈延迟 ≤ 300ms**，缓动 `ease-spring` 或 `ease-editorial`，超 600ms 拖沓
- **切换型 section 用 `key={active.id}` 强制重渲染**子组件
- **图形手写 SVG**：节点 `<rect rx="8" stroke="#241C15" strokeWidth="1.75">` + 5 种 tone；箭头直线 + `<polygon>` 三角头；流动 `strokeDasharray + animate-dash-flow`
- **数据条目少 ≠ 抽象**：4-6 条就 4-6 条，留白说话。每条都要有信息密度

---

## 反模式

- ❌ `useEffect + setInterval` autoplay → 用户单步控制
- ❌ framer-motion / recharts / NextUI → 用 CSS keyframes + 手写 SVG + `.card-stamp / .btn-stamp`
- ❌ 渐变背景 / 渐变文字 → 单色 + stamp 阴影 + butter underlay 高亮
- ❌ 旋转 / 闪烁的 Brain / Sparkles / Cpu icon（静态 OK）
- ❌ 弹窗 / toast / modal → inline 展开

---

## 易忽略的细节

- slider 加 `accent-coral`，比默认蓝配色
- SVG `<text>` 必须写 `fontFamily="Geist Mono, monospace"` 否则系统默认丑
- 衰减曲线用 `Math.pow(p, n)` 比线性贴近真实
- trace 渲染用 `steps.slice(0, cursor + 1)`，不要"全渲染 + opacity 控制"避免布局抖
- 输入框给默认值（如「员工年假怎么算？」），别留空让用户面对空白
