# Infrastructure

工程约束（严格）。具体写法 agent 自由发挥。

> 子站现成样板：直接 `cp ai-sites/agent/{package.json,tailwind.config.js,rsbuild.config.ts,src/entry.css,src/entry.tsx} ai-sites/<topic>/` 开始改。

---

## `package.json`

**只允许**：`react / react-dom / lucide-react`。

**必删**：`@nextui-org/*` `framer-motion` `recharts` `jotai` `react-hot-toast` `@radix-ui/*` 及任何 UI 组件库。

devDependencies：`@rsbuild/core` `@rsbuild/plugin-react` `tailwindcss` `postcss` `autoprefixer` `@types/node` `@types/react` `@types/react-dom`。

> 目标体积 ~80-100 KB gzipped。

---

## `tailwind.config.js`

**完整复用主站 design token**（直接抄 `ai-sites/agent/tailwind.config.js`），含：

- 色板：butter (DEFAULT/deep/soft/tint) + cream + ink (DEFAULT/secondary/tertiary) + coral + teal + pop
- 字体：`sans` Plus Jakarta Sans + Noto Sans SC / `display` Smiley Sans / `mono` Geist Mono / `serif` Newsreader
- fontSize：`display-2xl / display-xl / display-lg / eyebrow` 必备，clamp() 响应式
- 阴影：`stamp (4px) / stamp-lg (6px) / stamp-xl (8px) / stamp-hover (10px) / soft / soft-lg`，全是右下偏移 hard shadow
- 缓动：`spring (cubic-bezier(0.34,1.56,0.64,1)) / editorial (cubic-bezier(0.22,1,0.36,1))`
- animation：`float-y / float-y-sm / wiggle / enter-pop / enter-up / enter-fade / pulse-dot / dash-flow`

**不自创新颜色 / 新字体 / 新阴影**。

---

## `src/entry.css`

三件事：

1. `@font-face` 引 Smiley Sans（cdn.jsdelivr.net/npm/font-smiley-sans/SmileySans-Oblique.ttf.woff2），unicode-range 限中文
2. 全局排版：`html scroll-behavior:smooth` + `body bg=#FBEFE3` + `h1/h2/h3 text-wrap:balance + word-break:keep-all` + `p text-wrap:pretty` + `::selection bg=butter`
3. component 类：`.eyebrow .btn-stamp .card-stamp .section-anchor .section-anchor-num .section-anchor-label`

**禁令**：component 类里不要 `@apply bg-cream` 这种自定义颜色（rsbuild 默认 postcss 链路不识别）。**直接写 CSS** `background-color: #fbefe3;`。

---

## `rsbuild.config.ts`

**必须显式注入 tailwind 到 postcss**，且必须用 `path.resolve(__dirname, "tailwind.config.js")` 指定 config 路径。否则自定义 token 全失效。

其他：
- `output.distPath.root` 指 `../../public/<topic>`
- `output.assetPrefix` 设 `./`（iframe 嵌入相对路径）
- `html.title` 给有意义名字

---

## `src/entry.tsx` + `src/App.tsx`

`entry.tsx` 最小：`ReactDOM.createRoot(...).render(<App />)`。**无** `NextUIProvider / ThemeProvider`。

`App.tsx` 只堆 sections：
- 外层 `<div className="min-h-screen bg-cream text-ink">`
- 内部依次渲染 `<SectionXX />`
- **无** Navigation / Header / Footer / Toaster / Provider
- **无** ref + scrollIntoView 模块跳转逻辑

> **section 命名和顺序由 agent 根据本概念自定**，不要照抄其他子站。详见 SKILL.md「反模板纪律」。

---

## 旧文件清理

`ls src/components/` 列旧目录，一次性删干净。常见旧目录：`Header / Hero / Comparison / CoreCapabilities / AgentTypes / Architecture / KnowledgeCard / Overview / WorkflowDemo / InteractiveSimulation / Summary / Footer`。

旧入口 `src/index.tsx` 也删，统一改 `src/entry.tsx`。

清完扫残留 import：`rg "from \"./components/" src/App.tsx src/entry.tsx`。

---

## 编译验证

```bash
cd ai-sites/<topic>
rm -rf node_modules pnpm-lock.yaml package-lock.json
pnpm install
rm -rf ../../public/<topic>
node_modules/.bin/rsbuild build
```

build 后验证自定义类都生成：

```bash
grep -o "card-stamp\|btn-stamp\|bg-cream\|shadow-stamp\|section-anchor" \
  ../../public/<topic>/static/css/*.css | sort -u
```

任何一项缺失 → tailwind config 未生效，回 `rsbuild.config.ts` 检查 postcss 注入。
