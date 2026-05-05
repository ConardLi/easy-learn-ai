# 轻松理解 Prompt Cache

> 本子站属于 [Easy AI](../../README.md) 的 **AI 知视** 系列，以「演讲动画」的形式讲解 **Prompt Cache（提示词缓存）** —— 它为什么是 AI Agent 时代的关键基建，以及如何在实践中写出「缓存友好」的 Prompt。

灵感来自 Anthropic 工程师关于 Claude Code 提示词缓存设计的最佳实践分享。

## 📖 项目简介

Prompt Cache 是在大语言模型推理侧广泛使用的加速技术：对高频、重复的提示词前缀（如 System Prompt、工具定义、长文档上下文）在首次计算后缓存 KV 状态，后续请求直接复用 —— 从而显著降低推理成本与响应延迟。

本站把该主题拆成 15 个章节，每一章用一组受限节拍（steps）的舞台动画 + 旁白语音逐步讲清楚：

| 章节 | 主题 | 目录 |
|------|------|------|
| 01 | 引子 / 钩子 | `01-opening` |
| 02 | 什么是提示词缓存 | `02-what-is-caching` |
| 03 | 关键数字 + 真实账 | `03-cost-numbers` |
| 04 | 缓存即基建 | `04-cache-as-infra` |
| 05 | 排好队形（前缀顺序） | `05-order` |
| 06 | 三个坑（总览） | `06-pitfalls` |
| 07 | 坑 ①：别动 Prompt | `07-dont-edit-prompt` |
| 08 | 坑 ②：别换模型 | `08-dont-switch-model` |
| 09 | Sub-Agent 的缓存策略 | `09-sub-agent` |
| 10 | 坑 ③：别动工具定义 | `10-dont-touch-tools` |
| 11 | Plan Mode | `11-plan-mode` |
| 12 | Lazy Loading | `12-lazy-loading` |
| 13 | Compaction 带来的问题 | `13-compaction-problem` |
| 14 | Cache-Safe Forking | `14-cache-safe-forking` |
| 15 | 总结：缓存就是前缀匹配 | `15-summary` |

## 🗂️ 目录结构

```
ai-sites/prompt-cache
├── public/
│   ├── audio/<chapter-id>/<step>.mp3   # 每个章节每一步对应的旁白音频
│   ├── favicon.svg
│   └── icons.svg
├── scripts/
│   ├── extract-narrations.ts           # 从 narrations.ts 提取文本
│   └── synthesize-audio.sh             # 批量合成 TTS 音频
├── src/
│   ├── chapters/01-opening … 15-summary/
│   │   ├── <Chapter>.tsx               # 章节的分 step 视觉演示
│   │   ├── <Chapter>.css               # 该章节专属样式（按前缀隔离）
│   │   └── narrations.ts               # 每个 step 的旁白文案
│   ├── components/                      # Stage / ProgressBar / AutoToggle ...
│   ├── hooks/                           # useStepper / useAudioPlayer / useAutoMode / useStageScale
│   ├── registry/                        # CHAPTERS 注册表 + 类型
│   ├── styles/                          # tokens / base / fonts / animations
│   ├── App.tsx
│   └── main.tsx
├── audio-segments.json
├── index.html
├── vite.config.ts
└── package.json
```

## 🚀 本地开发

```bash
cd ai-sites/prompt-cache
npm install
npm run dev         # 默认端口 5174
```

访问：http://localhost:5174

## 📦 构建产物

```bash
npm run build
```

产物会输出到 **主站 public 目录** 下：

```
../../public/prompt-cache
```

构建完成后，主站即可通过 `/#/ai-knowledge/prompt-cache` 路由访问（内部 iframe 加载 `public/prompt-cache/index.html`）。

> ⚠️ `vite.config.ts` 中 `base: "./"` 非常关键：它让编译后的资源使用相对路径（如 `./assets/xxx.js`），避免部署到 `/prompt-cache/` 子路径时出现 404。

## 🔗 在主站中注册

本子站已登记在 [`src/data/aiKnowledgeData.ts`](../../src/data/aiKnowledgeData.ts)：

```ts
{
  id: "prompt-cache",
  title: "轻松理解Prompt Cache",
  description: "通过缓存高频提示词的中间计算结果，显著降低大模型推理成本与响应延迟。",
  category: "提示词",
  imageUrl: "/imgs/prompt-cache.png",
  htmlUrl: "/prompt-cache/index.html",
}
```

## 🎙️ 旁白与音频

- 每章的旁白文案写在 `chapters/<章节>/narrations.ts`，数组长度 = 该章节的 step 数，这是**步数的唯一事实来源**；
- `npm run extract-narrations` 会根据所有章节的 `narrations.ts` 重建 `audio-segments.json`；
- `npm run synthesize-audio` 可基于该 json 批量合成 TTS，写入 `public/audio/<chapter-id>/<step+1>.mp3`；
- 运行时音频路径约定：

```
${import.meta.env.BASE_URL}audio/<chapter-id>/<step+1>.mp3
```

## 🎛️ 播放机制

- **手动模式**：点击舞台任意空白区域（避开 button / a / [data-no-advance]）→ `next()`；
- **Auto 模式**：音频 `ended` 触发 `onAutoAdvance`；若该 step 没有配音频（空串 narration），用估算时长（中文约 4 字/秒）作为 fallback；
- **光标持久化**：`useStepper` 将 `cursor` 写入 `localStorage`，下次打开回到上次位置；结构升级时通过 `STORAGE_KEY` 的版本号（如 `presentation-cursor-prompt-cache-v3`）让旧光标失效。

## 🧩 技术栈

- React 19 + TypeScript
- Vite 8
- 纯 CSS（tokens / base / animations，无 UI 框架，不使用 emoji，颜色全部来自 `--xxx` 主题变量）

## 📝 许可

随主仓库 [Easy AI](../../README.md) 一同发布。
