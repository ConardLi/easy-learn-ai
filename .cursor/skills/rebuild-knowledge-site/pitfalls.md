# Pitfalls

按"工程坑 / 内容设计坑 / 设计纪律"三档。**动手前先扫一遍**。

---

## 🔴 工程坑 · build 不过

- **中文里嵌套未转义 ASCII 双引号** → SWC 报 `Expected ',', got '...'`。**铁律**：中文文案需要嵌套引号时，内层一律用 `「」`。自查：`rg '"[^"\n]*"[^"\n]*"' src/components/Section*.tsx`
- **`entry.css` 用 `@apply` 调自定义颜色** → 报 `bg-cream class does not exist`。component 类里**直接写 CSS**（`background-color: #fbefe3;`），不用 `@apply`。JSX 里 `className="bg-cream"` 没问题
- **`pnpm build` 跑错脚本** → 报 `rsbuild: command not found`。永远 `node_modules/.bin/rsbuild build`
- **JSX 数组引用未声明的 `const` 组件** → 把组件放数组之前，或用 `function Foo() {}`（会 hoist）
- **旧 dist 残留** → 每次 build 前 `rm -rf ../../public/<topic>`
- **旧组件文件没删 + App.tsx 残留 import** → 清完用 `rg "from \"./components/" src/App.tsx`

---

## 🟠 内容设计坑 · 编译过了但白做

> 比工程坑隐蔽：编译能过、看起来不错，但用户看完什么都没记住。

### 1 · 整站结构跟前站雷同

最容易踩。开 `ai-sites/<topic>/src/App.tsx`，section 顺序眼熟 = 红线。

**修法**：开工前列上一个站的 section 结构，写下「这次至少换掉的 2 处」（开场切入点 / 中段叙事顺序 / 结尾形式）。任何概念都有自己的"核心动作"，找到它，整站围绕它长。

### 2 · 写产品白皮书腔

**红线词**（出现即改）：智能化 / 赋能 / 重塑 / 颠覆 / 范式 / 探索 / 旅程 / 全面 / 深度 / 一站式 / 旨在 / 致力于 / 构建（"构建 X 体系"语境下也禁）/ 打造。

**自查**：`rg "赋能|重塑|颠覆|范式|探索|旅程|全面|深度|一站式|旨在|致力于|智能化" src/components/`

**句式**：短句 > 长句，20 字内最好；一段 ≤ 4 句；多用具体动词（找 / 翻 / 切 / 拼）；3 个抽象名词连用（「智能决策引擎」「场景化落地方案」）立刻改。

### 3 · 「看图说话」型 section

一张静态图 + 一段说明 = 不合格。每个 section ≥ 2 个可动元素（hover 不算）。

**修法**：停下来问 ——「这张图能不能 hover 看细节？能不能让用户输东西看它变？能不能拆成 3 个状态用按钮切？」

### 4 · 相邻 section 同种交互

连续 3 个 pill 切换 → 用户审美疲劳。整站 6-8 个 section，至少 5 种不同范式。详见 `patterns.md`「反相邻重复」。

### 5 · 自我介绍残留

「本站包含 X 个章节」「学习路线如下」「为什么选择 Easy AI」「我们将分 N 步介绍」 → **全砍**。

唯一允许的"导览"：开场段末尾的一行 mono caption「往下滚 · 7 个章节 · ~10 分钟」。

### 6 · 结尾鸡汤式 callout

「所以 RAG 是大模型应用的必备技术」「掌握 Agent 是未来必备能力」→ **禁**。

callout 必须是三选一：反直觉数字事实 / 可执行操作建议 / 不容妥协硬规则。

### 7 · 没有「核心动作」的 hero

「让我们一起理解 RAG」「探索 LLM 的奇妙世界」= 不合格。

hero H1 必须是**反直觉命题 / 最锋利的事实** —— 让用户愣 2 秒、产生「啊？」、想往下看。

### 8 · 数据不查证就写

「Gemini Embedding 大概是市面最强吧」「Pinecone p99 一般几十毫秒」 → 触发 `WebSearch` 的红线：任何模型版本号 / benchmark 分数 / 产品发布状态 / 协议标准。查到的数据后立刻补一句来源。

---

## 🟢 设计纪律 · 不修就丑

- **渐变标题** `bg-clip-text text-transparent` → 用 butter underlay 高亮单词
- **AI icon 加 `animate-spin / animate-pulse`** → Brain / Sparkles / Cpu 静态即可
- **emoji 装饰** `✨🚀💡🔥` → 全禁；语义符号（如 `Agent` 回答的 ✓）保留
- **卡片用渐变背景 / 柔阴影** → 必须 `border-2 border-ink rounded-3xl shadow-stamp`，hover 整体左上偏移 + 阴影变深
- **5 句以上没图没动** → 停下想"怎么变视觉"

---

## 速查命令

```bash
# 中文嵌套引号
rg '"[^"\n]*"[^"\n]*"' src/components/Section*.tsx

# 残留旧 import
rg "from \"./components/(Header|Hero|Comparison|Overview|WorkflowDemo|Summary)" src/

# AI 味词
rg "赋能|重塑|颠覆|范式|探索|旅程|全面|深度|一站式|旨在|致力于|智能化" src/components/

# 自定义类是否生成
grep -o "card-stamp\|btn-stamp\|bg-cream\|shadow-stamp\|section-anchor" \
  ../../public/<topic>/static/css/*.css | sort -u

# build 全流程
cd ai-sites/<topic>
rm -rf node_modules pnpm-lock.yaml
pnpm install
rm -rf ../../public/<topic>
node_modules/.bin/rsbuild build
```
