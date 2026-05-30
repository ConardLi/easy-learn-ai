# Pitfalls

按"工程坑 / 内容设计坑 / 设计纪律"三档。**动手前先扫一遍**。

---

## 🔴 工程坑 · build 不过

- **中文里嵌套未转义 ASCII 双引号** → SWC 报 `Expected ',', got '...'`。**铁律**：中文文案需要嵌套引号时，内层一律用 `「」`。自查：`rg '"[^"\n]*"[^"\n]*"' src/components/Section*.tsx`
- **`entry.css` 用 `@apply` 调自定义颜色** → 报 `bg-cream class does not exist`。component 类里**直接写 CSS**（`background-color: #fbefe3;`），不用 `@apply`。JSX 里 `className="bg-cream"` 没问题
- **`pnpm build` 跑错脚本** → 报 `rsbuild: command not found`。永远 `node_modules/.bin/rsbuild build`
- **rsbuild 把产物倒进根目录 `dist/`** → 项目根有同名 `rsbuild.config.ts`（主站的），rsbuild 部分版本会向上找到它，无视本子站的 distPath。修法：build 命令显式 `--config ./rsbuild.config.ts`。完整命令：`cd ai-sites/<topic> && rm -rf ../../public/<topic> && ./node_modules/.bin/rsbuild build --config ./rsbuild.config.ts`
- **JSX 数组引用未声明的 `const` 组件** → 把组件放数组之前，或用 `function Foo() {}`（会 hoist）
- **旧 dist 残留** → 每次 build 前 `rm -rf ../../public/<topic>`
- **旧组件文件没删 + App.tsx 残留 import** → 清完用 `rg "from \"./components/" src/App.tsx`

---

## 🟠 内容设计坑 · 编译过了但白做

> 比工程坑隐蔽：编译能过、看起来不错，但用户看完什么都没记住。

### 1 · 整站结构跟前站雷同

容易踩，但**要分情况**：

- **如果本概念的最佳教学路径就跟旧站近**（都是讲微调参数 / 都是协议演进），结构相近**允许**
- **但视觉锚 + 命名 + Hero 配色不能跟着抄** —— 用本概念的语言起 section 名（`SectionWhyChunk` 不是 `SectionOpening`），Hero 主图换不同元素

**自查**：开 `ai-sites/<相邻已建站>/src/App.tsx` 扫一眼，把 Hero 配色 / 主图元素 / section 命名风格记下来 → 这次至少换 2 处。

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

### 7 · Hero 没给定义，直接放钩子

「老师只说『是金毛』」「模型从不调用任何函数」「671B 参数只用 5.5%」「它知道很多，但只知道昨天的事」 = 都是好钩子，但**不是 Hero 第一句**。

进站第一秒，用户必须看见「XXX 是什么？」的直白答案。先有最基本的理解，才轮到反直觉钩子拉兴趣。

**修法**：
- Hero H1 改成「XXX 是什么？」3-5 字 + 问号
- 紧接一句话定义（15-35 字，完整陈述句，零比喻、零否定式、零"不是 X 而是 Y"）
- 反直觉钩子降到 Hero 的过渡句、或 Section 02 开头

详见 `SKILL.md`「Hero 开场纪律」段。

### 8 · 把比喻当定义

新概念第一次出现，必须是「主语 = 谓宾」陈述句。所有「想象一下 / 其实只是 / 不是…而是 / 它只是 / 让我们一起」开头的句子都**不算定义**。

**反例**：
- 「想象一个 671B 模型，里面 257 个专长子网络...」 → 没说 MoE = 什么
- 「模型从不调用任何函数」 → 没说 Function Calling = 什么，只说了"不"是什么
- 「老师其实在算『85% 金毛 / 8% 狼』，这堆答案的答案才值钱」 → 在打比方，没说蒸馏 = 什么

**修法**：每个站 Hero 应有一句话能直接补全「啊，原来 XXX = ___」。读完用户没法补全 → 重写定义。

### 9 · 数据不查证就写

「Gemini Embedding 大概是市面最强吧」「Pinecone p99 一般几十毫秒」 → 触发 `WebSearch` 的红线：任何模型版本号 / benchmark 分数 / 产品发布状态 / 协议标准。查到的数据后立刻补一句来源。

### 10 · 假设读者已知前置概念

讲 LoRA 突然甩出「这里把 W 分解成 BA 两个低秩矩阵」 —— 读者要是不知道矩阵分解 / 秩 是什么，从这一段开始全部读不下去。

**修法**：

- 用到 Token / Embedding / Transformer / 矩阵 / 梯度 / 损失 / 反向传播 / RLHF / Attention / KV Cache 等术语前，**先一句话说清这个术语在本上下文里指啥**（不需要完整定义，一句话能让读者跟上即可）
- 完全无法用一句话铺垫清楚的前置概念（如讲 Diffusion 必须懂噪声调度），在 Hero 后面加一个「读前 30 秒补课」mini section，把 2-3 个必备前置打包

**自查**：随手挑站内任意一段，圈出所有专业名词，往前翻找定义/解释。找不到 = 这一段对初学者是黑盒。

### 11 · 反直觉钩子放太前

「LoRA 只动 0.1% 的参数」「MoE 671B 只用 5.5%」 —— 是漂亮的钩子，但**初学者还不知道 LoRA / MoE 是什么**，看到这种数字只会一脸懵。

**修法**：所有反直觉钩子降到 Section 02 及之后，让 Hero 先把"是什么"讲清。详见 SKILL.md「Hero 开场纪律」。

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
# 中文嵌套 ASCII 双引号（编译会挂）
rg '"[^"\n]*"[^"\n]*"' src/components/Section*.tsx

# AI 味词
rg "赋能|重塑|颠覆|范式|探索|旅程|全面|深度|一站式|旨在|致力于|智能化" src/

# Hero 开场犯禁 · 假定义句型 / 把钩子当 H1
rg "想象一下|让我们|其实只是|不是.*而是|它只是|从不|根本不" src/components/Section{Hero,Opening}*.tsx

# Hero H1 是否是「XXX 是什么？」格式（应能匹配到）
rg "是什么？" src/components/Section{Hero,Opening}*.tsx

# 自我介绍残留（"本站 / 本网站 / 学习路线 / 章节" 之类自指话术）
rg "本站|本网站|学习路线|为什么选|让我们一起|本文将" src/

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
