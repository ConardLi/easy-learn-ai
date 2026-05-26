# Web Video Presentation · Theme Gallery Demo

> 把 [`skills/web-video-presentation`](../../skills/web-video-presentation) 的 **23 个内置主题**
> 各做成一个 **2 步签名 demo**，专为录屏截 GIF 而生。

```text
                ┌─────────────────────────────────┐
                │  click any card → enter a demo  │
                │  click stage    → next step     │
                │  esc            → back          │
                └─────────────────────────────────┘
```

---

## 这是什么

`skills/web-video-presentation` 主题方法论里有 23 套设计基因——但 README
里只能用一句话描述每一套，**截不出感觉**。这个 demo 库做的事：

- 把每个主题的 `tokens.css` **完整加载**进同一个 Vite + React 项目
- 给每个主题写一段 **2 步、独占整屏、内容贴合 `bestFor` 字段** 的小演示
- 同样的 16:9 舞台 / 一样的全局 step 推进 —— 跟脚手架产出 **100% 一致**

打开浏览器就是一个 23 张卡片的画廊，点任一张即进入对应主题的 2 步 demo。
**点击舞台**或按 `→` 切到下一步；按 `Esc` 回画廊。

---

## 跑起来

```bash
cd demo/web-video-presentation-demo
npm install
npm run dev
```

默认在 [http://localhost:5180/](http://localhost:5180/) 跑起来。

```bash
npm run build       # 生产构建，dist/
npm run preview     # 预览构建产物
npm run typecheck   # tsc -b --noEmit
```

> 每次跑 `dev` / `build` 都会先跑 `npm run build:themes` —— 把 23 个
> `themes/<id>/tokens.css` 转成 **scope 到 `[data-theme="…"]`** 的
> `src/styles/themes.gen.css`，再把每个 `theme.json` 元信息合成
> `src/themes.manifest.gen.json`。所以主题源里改了什么，重跑一次就同步.

---

## 操作

| 键 / 鼠标 | 行为 |
|---|---|
| **画廊** 鼠标悬停卡片 | 卡片轻浮起 + accent 高亮 |
| **画廊** 点击卡片 | 进入该主题的 demo |
| **demo** 点击舞台 | 推进到下一步（循环） |
| **demo** `→` / `Space` / `Enter` | 推进 |
| **demo** `←` | 退回上一步 |
| **demo** `1` … `9` | 跳到指定步 |
| **demo** `0` / `Home` | 回到第 0 步 |
| **demo** `Esc` / `Backspace` | 返回画廊 |
| **demo** 鼠标移动 | 顶部胶囊 HUD 浮出（指明当前主题、步进） |

录屏时**鼠标只要静止在舞台中央**，HUD 就会淡出 —— 干净的截屏。

---

## 23 个 demo 各做了什么

每个 demo 用的口播题材都尽量"配得上"该主题的 `bestFor`，
**让单张截图就能让观众猜到适用场景**。

### Dark · 8 套

| id | 题材 | 步 0 | 步 1 |
|---|---|---|---|
| `midnight-press` | 编辑器 dev 教程 | 编辑部封面 + 主标题 "把补全延迟干到 80 ms" | hero 数字 80 + body |
| `chalk-garden` | 三年级课堂 | 黑板 + 手写"为什么会有四季？" | 公式 + 倾斜便签 |
| `terminal-green` | CLI 演示 | macOS 终端窗口 + 命令一条条出 | 80 ms 大字 + 指标块 |
| `blueprint` | 系统架构 | "BLUEPRINT v 2.4" + 1:200 总览 SVG | 延迟预算表 |
| `dark-botanical` | 高级香水 campaign | 暗底 + Cormorant italic 大字 | 三调 / IX 印章 |
| `neon-cyber` | 操作系统发布 | 霓虹大字 + 终端状态 panel | 0 ms / 2 ms 双 KPI 卡 |
| `bold-signal` | 投资人路演 | 大橙色焦点卡 + "now or never." | "$42 M / 18 个月 / 关门" |
| `creative-voltage` | 设计周开幕 | halftone + 大字 + "SHOUT BACK" 海报 | 4 个 talk 节目单 |

### Light · 15 套

| id | 题材 | 步 0 | 步 1 |
|---|---|---|---|
| `paper-press` | 编辑寄语 | 杂志封面 "为什么我们决定重写编辑器内核" | "3 years" hero + pull-quote |
| `newsroom` | NYT 长报道 | 大报头 + headline + deck | 2.4 billion lines + 双栏正文 |
| `bauhaus-bold` | 设计宣言 | 黑底标题 "DESIGN IS NOT DECORATION." | 4 + 9 + 4 大数字宣言表 |
| `sunset-zine` | 独立 zine 创刊 | 虚线裁剪线 + Riso 封面 | 6 格内页索引 |
| `monochrome-print` | 长读杂志 | "Monochrome" 期刊封面 + No. 24 | 拉满版面 pull-quote |
| `vintage-editorial` | 文化专栏 | 圆 + 线 + 点几何 + "没人再做的手艺" | 4 张分类卡 |
| `pastel-dream` | 产品 onboarding | 多色 ribbon + 大字 "欢迎，慢慢来就好" | 3 步进度（done / now / next） |
| `split-canvas` | 设计师 vs 工程师 | 双拼底色 + "vs" 圆章 | 同一张表，两边写法 |
| `electric-studio` | B2B SaaS Series B | "Investors" nav + ARR / 座位 / NRR 卡 | 141% NRR KPI + 增长条 |
| `indigo-porcelain` | 学术评论 | 双线方框 "XII / 注意力" 印章 | II 章节正文 + blockquote |
| `forest-ink` | 自然报道 | "FOREST INK" + 茶林封面 + 卡片图版 | 792 棵树 + figure 03 |
| `kraft-paper` | 创始人信 | 牛皮米 + 火漆章 + "给三年后的人" | 致谢信 + 手写签名 |
| `dune` | 建筑作品集 | "DUNE / STUDIO" + Atelier No. 4 立面图 | "28 个月" + spec 表 |
| `swiss-ikb` | 瑞士设计课 | 1px 网格 + 200wt "Less, but more specifically." | 8 格规则表（含 IKB 单元格） |
| `warm-keynote` | 编辑器 keynote | 暖网格 + 工作流 mockup | "$ 2.4 B" KPI + chips |

---

## 录 GIF 的推荐流程

1. `npm run dev` → 在浏览器开
2. 选好要录的主题，点开 demo
3. **鼠标移到舞台中央并保持不动** → 顶部 HUD 淡出
4. 用 [Kap](https://getkap.co/) / Cleanshot / LICEcap / GifBrewery
   定向到 stage 区域（16:9 比例）
5. 按 `→` 触发动画 → 截录 2-3 秒（每步动画大约 1.5-2s）
6. 点一下舞台进入第二步 → 再录一段
7. 把两段拼到一起就是这个主题的"签名 GIF"

> 想录得更稳定可以打开 **DevTools 的 Device Toolbar**，把分辨率手动设到
> `1920×1080`，截出来的 GIF 像素跟脚手架真实产出 1:1.

---

## 文件结构

```text
demo/web-video-presentation-demo/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── scripts/
│   └── build-themes.mjs         # 扫 skills/.../themes/*/tokens.css → themes.gen.css
└── src/
    ├── main.tsx                 # 挂 fonts / base / animations / themes.gen / demos / gallery
    ├── App.tsx                  # hash-router · keyboard nav · HUD
    ├── themes.manifest.gen.json # 由 build-themes 产出
    ├── components/
    │   ├── Stage.tsx            # 16:9 fitter (与 skill template 等价)
    │   ├── Gallery.tsx          # 画廊：dark 8 + light 15 + footer
    │   └── MaskReveal.tsx       # 文字 clip-path 揭示
    ├── hooks/
    │   └── useStageScale.ts
    ├── styles/
    │   ├── fonts.css            # 22 个 Google Fonts (覆盖所有主题用到的字体)
    │   ├── base.css             # design system 默认值
    │   ├── animations.css       # 通用动效词汇
    │   ├── gallery.css          # 画廊 + HUD chrome
    │   └── themes.gen.css       # 自动生成（来自 build-themes.mjs）
    └── demos/
        ├── index.ts             # DemoEntry / DemoStepProps 类型
        ├── registry.ts          # 23 个 demo 注册表
        ├── demos.css            # 23 段 per-theme 布局 + 动效（前缀分组）
        ├── midnight-press.tsx
        ├── paper-press.tsx
        └── ... 共 23 个 .tsx 文件
```

---

## 为什么是 "2 步"

- **GIF 友好**：2 步 = 1 个 hook 屏 + 1 个 payoff 屏，正好录成 ~3 秒动图
- **看完整理念**：第一步给"气质"，第二步给"信息密度"——一张图就够
- **跟 SKILL 兼容**：脚手架要求 `narrations.length === step 数`，
  这里 2 步就是 2 个 narration（每个 demo 里没接 narrations.ts，
  因为不需要 audio，但接口是兼容的）

如果想给某个主题做 3 / 4 / 5 步的"延展版"，去 `src/demos/<id>.tsx`
里改 step branch 即可。注意同步 `registry.ts` 的 `steps`.

---

## 怎么再加一个新主题的 demo

1. 在 `skills/web-video-presentation/themes/<id>/` 下加好新主题的
   `theme.json` + `tokens.css`（按 [`THEMES.md`](../../skills/web-video-presentation/references/THEMES.md) 的契约）
2. `npm run build:themes` —— 自动会把它放进 `themes.gen.css` + manifest
3. 在 `src/demos/<id>.tsx` 写一个 default-export 的 `(step: {0|1}) => JSX`
4. 在 `src/demos/demos.css` 里加一段 prefix 为 `xx-` 的 layout 规则
5. 在 `src/demos/registry.ts` 里 import + 注册
6. `npm run dev` —— 画廊会自动多出来一张卡

---

## 一句话总结

> **每张卡片 = 该主题的"片头预告片"。**
> 看完这 23 段，能秒选你下次视频应该用哪个 base.

愿你录的每段 GIF 都不踩 AI 味。
