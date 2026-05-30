# Web Design Engineer Skill

**一个让 AI 生成网页从"能用"进阶到"惊艳"的 Agent 技能。**

[English](./README.md) · [返回集合首页](../../README.zh-CN.md)

![Web Design Skill](../../dist/imgs/web-design-skill.png)

---

## 这是什么？

这是一个面向 AI 编程代理（如 [Claude Code](https://docs.anthropic.com/en/docs/claude-code)、[Cursor](https://cursor.com) 以及其他支持 `SKILL.md` 格式的工具）的可复用 **Skill**（结构化系统提示词），能显著提升 AI 生成的 HTML/CSS/JavaScript 产物的设计品质。

它将 [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs) 系统提示词中的核心设计理念提炼为一个开放、可移植、可自定义的技能文件，可以直接放进任何项目中使用。

### 问题

现代大语言模型已经能根据简单的提示词生成功能完整的网页。但它们的输出总是趋向同一种审美：Inter 字体、蓝色主按钮、紫粉渐变、大圆角卡片、emoji 充当图标、编造的好评数据。技术上没问题，视觉上千篇一律。

### 解决方案

这个 Skill 通过以下方式将**设计品位**注入 AI 的决策过程：

- **反俗套规则** —— 一份明确的 AI 设计雷区清单
- **设计系统宣告** —— 强制 AI 在写代码之前，先用自然语言说清配色、字体、间距和动效选择
- **oklch 色彩理论** —— 基于感知均匀色彩空间的配色派生，取代随机 hex 值
- **精选字体 × 配色组合** —— 高品质起点，替代默认的 Inter + #3b82f6
- **占位符哲学** —— 用诚实的 `[icon]` 标记代替拙劣的 SVG 假图
- **结构化工作流** —— 从需求理解 → 上下文获取 → 设计系统宣告 → v0 草稿 → 完整构建 → 验证的六步流程

---

## 快速上手

### 用于 Claude Code / Cursor / AI Agent

将本 Skill 目录复制到你的项目中：

```
your-project/
├── .agents/skills/web-design-engineer/   # 或 .claude/skills/web-design-engineer/
│   ├── SKILL.md                          # 主技能文件
│   └── references/
│       ├── advanced-patterns.md          # 代码模板库（slide engine / 设备框架 / 动效时间线 / 数据可视化）
│       ├── design-directions.md          # 设计方向顾问（6 学派，差异化 3 选 1 推荐）
│       ├── style-recipes/                # 25 套有 anchor 的风格配方（按需读单文件，每个 anchor 一个 .md）
│       │   ├── INDEX.md                   #   目录索引 + 3 张索引表 + 跨配方反模式
│       │   ├── linear.md / aesop.md / pentagram.md / ...    #   25 个独立 recipe 文件
│       └── critique-guide.md             # 5 维评分细则 + 常见问题清单
└── ...
```

也可以从集合首页通过 Claude Code 插件市场一键安装 —— 参见[根目录 README](../../README.zh-CN.md#%E5%AE%89%E8%A3%85)。

当你的请求涉及可视化/交互式前端工作时，Agent 会自动启用此技能。

### 覆盖范围

| 输出类型 | 示例 |
|---|---|
| 网页 & 落地页 | 营销页面、产品页、作品集 |
| 交互式原型 | 带设备框架的可点击 App 模型 |
| 幻灯片 | HTML 演示文稿（1920×1080，键盘导航） |
| 数据可视化 | 基于 Chart.js 或 D3.js 的仪表盘 |
| 动画 | CSS/JS 动效设计，时间线驱动的演示 |
| 设计系统 | Token 探索、组件变体 |

---

## 工作原理

### 六步工作流

```
1. 理解需求          →  信息充足就干活，信息不足才提问
2. 获取设计上下文    →  代码 > 截图；不要从空气中开始
3. 宣告设计系统      →  配色、字体、间距、动效 —— 用 Markdown 说明，写代码之前
4. 尽早展示 v0       →  占位符 + 布局 + token；让用户提前纠偏
5. 完整构建          →  组件、状态、动效；在关键决策点暂停确认
6. 验证              →  交付前清单；无控制台错误，无私自新增色相
```

### 核心设计原则

**反 AI 俗套清单。** Skill 明确禁止以下模式：
- 紫粉蓝渐变背景
- 带左侧彩色边框的卡片
- Inter / Roboto / Arial / Fraunces / system-ui 字体
- 用 emoji 充当图标
- 编造的数据、假 logo 墙、虚假好评

**oklch 色彩系统。** 在感知均匀的 oklch 色彩空间中派生颜色。相同的亮度值在人眼中看起来确实一样亮——HSL 做不到这一点，HSL 中亮度 50% 的黄色看起来比亮度 50% 的蓝色亮得多。

**精选起点。** 六套经过验证的配色 × 字体组合，覆盖常见场景：

| 风格 | 主色 | 字体组合 | 适用场景 |
|---|---|---|---|
| 现代科技感 | 蓝紫 | Space Grotesk + Inter | SaaS、开发者工具 |
| 优雅杂志风 | 暖棕 | Newsreader + Outfit | 内容平台、博客 |
| 高端品牌 | 近黑 | Sora + Plus Jakarta Sans | 奢侈品、金融 |
| 活泼消费 | 珊瑚 | Plus Jakarta Sans + Outfit | 电商、社交 |
| 极简专业 | 青蓝 | Outfit + Space Grotesk | 仪表盘、B2B |
| 手作温度 | 焦糖 | Caveat + Newsreader | 餐饮、教育 |

**风格配方库（25 套有 anchor，渐进式加载）。** 当用户点名"Linear 风" / "Aesop 风" / "Pentagram 级排版"时，Agent 只需读 `references/style-recipes/<anchor>.md` 单个文件（约 50 行）；目录索引、3 张索引表、跨配方反模式都在 `references/style-recipes/INDEX.md`（约 150 行）。整个目录从不一次性加载。25 套配方分布在 7 个学派（Direction Advisor 的 6 学派 + 一个只能通过直接点名 anchor 触达的 *Specialty / Genre* 学派）：

| 学派 | 配方 |
|---|---|
| Editorial / 极简 | `apple-hig` · `muji-kenya-hara` · `aesop` · `dieter-rams-braun` · `monocle-magazine` |
| 信息架构 | `pentagram` · `vignelli-swiss-helvetica` · `bloomberg-terminal` · `tufte-dataink` · `nyt-the-daily` |
| 现代工具 / Builder SaaS | `linear` · `vercel-mesh` · `raycast` · `notion-pre-ai` |
| 动效 / 实验 | `field-io` · `active-theory` · `resn-storytelling` |
| 粗粝 / Brutalist | `are-na` · `bloomberg-businessweek-turley` · `balenciaga-post-2017` |
| 温暖人文 | `mailchimp-freddie` · `stripe-press` · `headspace-meditation` |
| 特定风格 / 年代 | `y2k-retrofuturism` · `mid-century-modern` |

---

## 风格配方画廊 —— 25 个配方，25 个完整作品

> **现场体验：** [`demo/web-design-engineer-demo/`](../../demo/web-design-engineer-demo) —— `npm run dev` 浏览。

读 25 个 spec 文件是一回事。**看**到 Linear 和 Vercel 的差别、Aesop 和 MUJI 的差别、Bloomberg Terminal 和 Tufte 的差别 —— 是另一回事。所以目录里的每个配方都有一个独立的、用 React + Vite 实现的整页 demo，**完全提交于该配方的 DNA** —— 没有共用模板、没有 16:9 视频舞台，每个配方都做成它本来就该做成的那种作品。

| 学派 | 选一张卡片打开 demo |
|---|---|
| **Editorial / 极简** | `apple-hig` → 高端硬件页 · `muji-kenya-hara` → 器物目录 · `aesop` → 药剂师产品页 · `dieter-rams-braun` → 工业设计档案 · `monocle-magazine` → 杂志目录 |
| **信息架构** | `pentagram` → 标识样本 · `vignelli-swiss-helvetica` → 交通指示 · `bloomberg-terminal` → 交易终端 · `tufte-dataink` → 数据叙事 · `nyt-the-daily` → 新闻 + 播客中枢 |
| **现代工具 / Builder SaaS** | `linear` → 任务管理落地页 · `vercel-mesh` → 部署落地页 · `raycast` → 命令启动器 · `notion-pre-ai` → 工作区文档 |
| **动效 / 实验** | `field-io` → 生成式案例研究 · `active-theory` → 沉浸式发布 · `resn-storytelling` → 叙事滚动 |
| **粗粝 / Brutalist** | `are-na` → 研究型频道 · `bloomberg-businessweek-turley` → 封面式编辑 · `balenciaga-post-2017` → 时装系列 |
| **温暖人文** | `mailchimp-freddie` → 小生意引导 · `stripe-press` → 书籍详情 · `headspace-meditation` → 冥想课程卡 |
| **特定风格 / 年代** | `y2k-retrofuturism` → Y2K 门户 · `mid-century-modern` → Saul Bass 海报 |

每个 demo：

- 使用配方指定的真实字体（或最接近的公开替代）
- 严格遵守配方的克制配色 —— 没有走样的 Inter + `#3b82f6`
- 展示配方 spec 里列出的**签名手法**（如 Bloomberg 在深海军蓝底上的琥珀色多窗格工作站、Aesop 的小型大写标签和衬线正文、Linear 的发丝边框 + 键盘芯片、Tufte 的段内 sparkline + 小型多重图 + 零图表杂质）
- 位于 `demo/web-design-engineer-demo/src/recipes/<recipe-id>.tsx`（每个约 150–300 行）

```bash
cd demo/web-design-engineer-demo
npm install
npm run dev    # 画廊在 http://localhost:5181/
```

`Esc` 返回画廊；`H` 切换屏幕上的配方 HUD。Hash 路由 URL（`#/linear`、`#/aesop`、…），可以直接深链到任意配方。完整映射和录制 GIF 的方法见 demo 自己的 [README](../../demo/web-design-engineer-demo/README.md)。

> **为什么这有用。** 当你在配方目录里挑选时，**同时打开 3–4 个 demo 对比**，比读 3 个 spec 文件快得多 —— 你能一眼看到每个学派的*形状*。把画廊当作配方目录的可视化索引来用。

---

## 启用前后对比：Skill 开 / 关

仓库的 [`demo/web-design-demo/`](../../demo/web-design-demo) 目录包含使用相同提示词、分别在有 Skill 和无 Skill 条件下生成的页面对比。打开 [`demo/web-design-demo/demo2/index.html`](../../demo/web-design-demo/demo2/index.html) 查看对比展示页。

### Demo 1：太空探索博物馆

**提示词：** *"帮我做一个'太空探索博物馆'的线上展览首页——全屏 Hero、4 个核心展览介绍、一个至少 6 个节点的时间线、参观预约 CTA、页脚。整体风格要沉浸感强、有宇宙的深邃感。"*

| | 无 Skill | 有 Skill |
|---|---|---|
| **文件** | `demo/web-design-demo/demo2/demo1.html` | `demo/web-design-demo/demo2/demo1-with-skill.html` |
| **色彩系统** | 硬编码 hex 值（#7cf0ff, #b388ff） | 基于 oklch 的 token 系统，使用 CSS 自定义属性 |
| **字体** | Orbitron + Noto Serif SC | Instrument Serif + Space Grotesk + JetBrains Mono |
| **布局** | 标准落地页结构 | 杂志编辑式布局，grid 组合排版 |
| **细节** | 大量发光效果、霓虹渐变 | 克制的色彩方案、字体层级、装饰性数据元素 |
| **整体感受** | 热情的初级设计师 | 有经验的设计总监 |

### Demo 2：摄影师作品集

**提示词：** *"帮我做一个独立摄影师的个人作品集网站首页。"*

| | 有 Skill |
|---|---|
| **文件** | `demo/web-design-demo/demo2/demo2-with-skill.html` |
| **角色塑造** | 虚构了北欧摄影师 "Mira Høst"，设计了一整套视觉身份 |
| **配色** | 暖纸色浅底（#f2efe8）+ 墨色深文（#161513）—— 极度克制的双色调 |
| **字体** | Instrument Serif（展示标题）+ Space Grotesk（界面）, 大量使用斜体 |
| **布局** | 杂志编排式结构，编号分节、不对称网格、侧边竖排文字 |
| **动效** | Hero 图片的慢速 Ken Burns 动画（24秒周期），胶片噪点纹理叠加 |
| **导航** | `mix-blend-mode: difference` 顶栏 —— 在深浅背景间无缝过渡 |

> 启发本 Skill 的 Claude Design 原始系统提示词保留在 [`dist/prompt/claude-design-system-prompt.md`](../../dist/prompt/claude-design-system-prompt.md)。

---

## 背景

此 Skill 的灵感来自 [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs) 的系统提示词。Claude Design 是 Anthropic 于 2026 年 4 月推出的视觉设计产品。其系统提示词（约 420 行）编码了一套精密的设计原则、反模式和工作流约束，使其输出保持稳定的高品质。

本项目将这些核心理念提取并精炼为一个可移植的 Skill，适用于任何 AI 编程代理——让你获得 Claude Design 级别的设计品位，同时摆脱产品锁定和用量限制。

相比 Claude Design 原始提示词的主要新增内容：
- **设计系统宣告步骤** —— 强制 AI 在编码前用自然语言说明设计 token
- **v0 草稿策略** —— 一套具体的方法论，确保尽早展示半成品
- **扩展的反俗套清单** —— 从真实 AI 输出中识别出的额外模式
- **占位符哲学** —— 一套完整的框架，专业地处理缺失素材
- **配色 × 字体配对表** —— 六套经过验证的视觉系统起点
- **设计方向顾问** —— 模糊需求场景的 6 学派差异化 3 选 1 推荐机制，且显式接入到 recipe 库做落地
- **25 套有 anchor 的风格配方库** —— 每套绑定一个真实品牌 / studio / 设计师，含可粘贴的具体值；用来抵御 AI 默认味
- **高级模式库** —— 常见 UI 模式的即用代码模板

---

## 许可证

MIT
