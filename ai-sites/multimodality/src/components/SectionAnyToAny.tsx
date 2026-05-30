/**
 * Section 05 · 自己挑：要啥进、要啥出？
 *
 * 用户选 输入模态 + 输出模态 → 看 2026 年哪些产品干这事 + 实际能力。
 * 16 种组合都有数据，没成熟的也明说「2026 还罕见」。
 *
 * 跟 03 tab 切架构、04 矩阵 cell 不一样：这边是「双 chip 组合 → 解锁产品列表」。
 * 对应 patterns.md「勾选组合 + 条件结论」。
 */
import React, { useState } from "react";
import { Type, Image as ImageIcon, Film, Mic, ArrowRight } from "lucide-react";

type Modality = "text" | "image" | "video" | "audio";

const MODALITY_META: Record<Modality, { name: string; short: string; icon: React.ReactNode; color: string }> = {
  text: { name: "文字", short: "字", icon: <Type className="w-4 h-4" strokeWidth={2.4} />, color: "#F4D35E" },
  image: { name: "图像", short: "图", icon: <ImageIcon className="w-4 h-4" strokeWidth={2.4} />, color: "#1B4B5A" },
  video: { name: "视频", short: "视频", icon: <Film className="w-4 h-4" strokeWidth={2.4} />, color: "#E07A5F" },
  audio: { name: "音频", short: "声音", icon: <Mic className="w-4 h-4" strokeWidth={2.4} />, color: "#FF4D74" },
};

type Tool = { name: string; vendor: string; note: string };

type Combo = {
  status: "mature" | "growing" | "rare";
  headline: string;
  tools: Tool[];
};

const COMBOS: Record<string, Combo> = {
  /* ─── from TEXT ─── */
  "text→text": {
    status: "mature",
    headline: "所有 LLM 的本职工作 · 文进文出已经红海",
    tools: [
      { name: "GPT-5.5", vendor: "OpenAI", note: "Terminal-Bench 82.7%" },
      { name: "Gemini 2.5 Pro", vendor: "Google", note: "2M token 上下文" },
      { name: "Claude Opus 4.7", vendor: "Anthropic", note: "SWE-bench 高分" },
      { name: "DeepSeek V3.1", vendor: "DeepSeek", note: "开源 · 跟旗舰一档" },
    ],
  },
  "text→image": {
    status: "mature",
    headline: "文生图 2022 起就成熟，2026 是出图工具大乱斗",
    tools: [
      { name: "Imagen 4", vendor: "Google", note: "Gemini 原生集成" },
      { name: "FLUX Pro 1.1", vendor: "Black Forest Labs", note: "开源 · 物理质感最好" },
      { name: "Midjourney v7", vendor: "Midjourney", note: "审美最佳" },
      { name: "DALL-E 4", vendor: "OpenAI", note: "ChatGPT 内集成" },
      { name: "Chameleon 34B", vendor: "Meta", note: "唯一开源 early-fusion 出图" },
    ],
  },
  "text→video": {
    status: "growing",
    headline: "文生视频是 2026 最卷的赛道",
    tools: [
      { name: "Veo 3.1", vendor: "Google", note: "4K 原生 · 音视频同步" },
      { name: "Kling 3.0", vendor: "快手", note: "原生 4K/60fps · 多镜头" },
      { name: "Runway Gen-4.5", vendor: "Runway", note: "GWM-1 世界模型基座" },
      { name: "Seedance 2.0", vendor: "字节", note: "音视频联合生成 · 8+ 语言对口型" },
      { name: "Sora 2", vendor: "OpenAI", note: "2026/09 关停 API · 撤场中" },
    ],
  },
  "text→audio": {
    status: "mature",
    headline: "文生音频分两条线：人声 / 音乐",
    tools: [
      { name: "GPT-4o voice", vendor: "OpenAI", note: "原生语音 token · 320ms 延迟" },
      { name: "ElevenLabs v3", vendor: "ElevenLabs", note: "克隆人声最强" },
      { name: "Suno v5", vendor: "Suno", note: "出整首歌带乐器" },
      { name: "Gemini Live", vendor: "Google", note: "原生实时对话" },
    ],
  },

  /* ─── from IMAGE ─── */
  "image→text": {
    status: "mature",
    headline: "看图说话 / OCR / 图问答 —— VLM 标配能力",
    tools: [
      { name: "Gemini 2.5 Pro", vendor: "Google", note: "native 图 in · MMMU 高分" },
      { name: "GPT-5.5 Vision", vendor: "OpenAI", note: "图问答主力" },
      { name: "Claude Opus 4.7", vendor: "Anthropic", note: "文档/截图理解强" },
      { name: "Qwen3-VL 235B", vendor: "Alibaba", note: "开源 · 2D/3D grounding" },
      { name: "Pixtral 12B", vendor: "Mistral", note: "Apache 2.0 · 多图 in" },
    ],
  },
  "image→image": {
    status: "growing",
    headline: "图改图：编辑、修复、风格迁移、抠图",
    tools: [
      { name: "Imagen 4 Edit", vendor: "Google", note: "Gemini 原生对话改图" },
      { name: "FLUX Kontext", vendor: "BFL", note: "保人物一致的编辑" },
      { name: "Gemini Omni", vendor: "Google", note: "多模态世界模型 · 出图带编辑" },
      { name: "SAM 3", vendor: "Meta", note: "270K 概念 · 文字+exemplar 抠图" },
    ],
  },
  "image→video": {
    status: "growing",
    headline: "用一张图当首帧，AI 接着拍下去",
    tools: [
      { name: "Runway Gen-4.5", vendor: "Runway", note: "image-to-video 业界标杆" },
      { name: "Veo 3.1", vendor: "Google", note: "首帧+提示 · 4K 输出" },
      { name: "Kling 3.0", vendor: "快手", note: "图+提示 · 多镜头叙事" },
      { name: "Wan 2.7", vendor: "阿里", note: "开源可自托管" },
    ],
  },
  "image→audio": {
    status: "rare",
    headline: "2026 还罕见 · 直接「看图发声」基本只在研究 demo",
    tools: [
      { name: "Gemini 2.5 Pro", vendor: "Google", note: "可看图描述 → 再 TTS，没原生通道" },
      { name: "ImageBind", vendor: "Meta · 2023", note: "学术 · 跨 6 模态绑定空间" },
    ],
  },

  /* ─── from VIDEO ─── */
  "video→text": {
    status: "mature",
    headline: "看视频做总结 / 找镜头 / 答题",
    tools: [
      { name: "Gemini 2.5 Pro", vendor: "Google", note: "1 小时视频 · 原生秒级 indexing" },
      { name: "Gemini 3.5 Flash", vendor: "Google", note: "Video-MME-v2 SOTA" },
      { name: "Qwen3-VL 235B", vendor: "Alibaba", note: "原生 256K · 跨片段推理" },
      { name: "GPT-5.5 (走帧)", vendor: "OpenAI", note: "靠 Whisper + 帧抽取拼接" },
    ],
  },
  "video→image": {
    status: "growing",
    headline: "提关键帧 / 剪静态海报 / 改单帧",
    tools: [
      { name: "Runway Gen-4.5", vendor: "Runway", note: "时间线编辑 · 抓帧改图" },
      { name: "Veo 3.1", vendor: "Google", note: "关键帧编辑流程" },
      { name: "SAM 3.1", vendor: "Meta", note: "视频里抠出物体面 · 多物体并行" },
    ],
  },
  "video→video": {
    status: "growing",
    headline: "视频改视频：风格转、运镜重做、续拍",
    tools: [
      { name: "Runway Gen-4.5", vendor: "Runway", note: "motion brush · 参考视频续拍" },
      { name: "Veo 3.1", vendor: "Google", note: "视频续生成 · 镜头一致" },
      { name: "Kling 3.0 Omni", vendor: "快手", note: "多镜头改 + 共享音轨" },
    ],
  },
  "video→audio": {
    status: "rare",
    headline: "2026 还罕见 · 多走「视频 → 描述 → 配音」两段式",
    tools: [
      { name: "Veo 3.1", vendor: "Google", note: "生成时同步出 audio，但不是改既有视频" },
      { name: "Seedance 2.0", vendor: "字节", note: "音视频联合 · 适合新生成不适合改" },
    ],
  },

  /* ─── from AUDIO ─── */
  "audio→text": {
    status: "mature",
    headline: "ASR · 转写 · 翻译，行业最成熟那一档",
    tools: [
      { name: "GPT-4o Audio", vendor: "OpenAI", note: "原生音频 token · 跨模态推理" },
      { name: "Gemini 2.5 Pro", vendor: "Google", note: "原生音频 in · 含说话人/情绪" },
      { name: "Whisper v3", vendor: "OpenAI", note: "开源 · 99 种语言" },
    ],
  },
  "audio→image": {
    status: "rare",
    headline: "2026 还罕见 · 没主流商用模型",
    tools: [
      { name: "ImageBind", vendor: "Meta · 2023", note: "学术 demo · 6 模态共享空间" },
      { name: "Gemini Omni", vendor: "Google", note: "理论支持，但产品没暴露这条路径" },
    ],
  },
  "audio→video": {
    status: "rare",
    headline: "2026 还罕见 · 实务里走「音 → 字幕 → 视频」三段",
    tools: [
      { name: "Sora 2", vendor: "OpenAI", note: "音频引导生成研究 demo · 已 deprecated" },
    ],
  },
  "audio→audio": {
    status: "mature",
    headline: "实时语音对话 · 风格转换 · 翻译",
    tools: [
      { name: "GPT-4o realtime", vendor: "OpenAI", note: "320ms 延迟 · 听情绪/出情绪" },
      { name: "Gemini Live", vendor: "Google", note: "原生实时 · 含视觉" },
      { name: "ElevenLabs Turbo", vendor: "ElevenLabs", note: "声音克隆 + 语种转" },
    ],
  },
};

const STATUS_META: Record<Combo["status"], { label: string; bg: string; fg: string }> = {
  mature: { label: "成熟商用", bg: "bg-teal", fg: "text-cream" },
  growing: { label: "正在卷", bg: "bg-coral", fg: "text-cream" },
  rare: { label: "2026 还罕见", bg: "bg-ink/15", fg: "text-ink/65" },
};

const SectionAnyToAny: React.FC = () => {
  const [input, setInput] = useState<Modality>("text");
  const [output, setOutput] = useState<Modality>("video");

  const key = `${input}→${output}`;
  const combo = COMBOS[key];
  const inputMeta = MODALITY_META[input];
  const outputMeta = MODALITY_META[output];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-butter-tint border-y-2 border-ink/15">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">any to any</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-8">
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-lg text-ink mb-5">
              自己挑：
              <br />
              要啥进、要啥出？
            </h2>
            <div className="space-y-3 text-[15px] text-ink/75 leading-relaxed max-w-md">
              <p>
                4 种模态进 × 4 种模态出 = 16 种组合。2026 年差不多一半成熟、一半还在卷、剩下几格还罕见。
              </p>
              <p>
                左边挑「输入模态」，右边挑「输出模态」，下面就是当前能干这事的真实产品。
              </p>
              <p>
                没产品的格子也明说 —— 比如「听一段声音直接画图」这条路径，2026 还基本只在研究里。
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* 输入 / 输出 双 chip 组 */}
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                    ① 输入是
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(Object.keys(MODALITY_META) as Modality[]).map((m) => {
                      const meta = MODALITY_META[m];
                      const on = m === input;
                      return (
                        <button
                          key={m}
                          onClick={() => setInput(m)}
                          className={[
                            "flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-ink transition-all duration-250 ease-spring",
                            on ? "shadow-[3px_3px_0_0_#241C15] scale-[1.02]" : "hover:bg-cream",
                          ].join(" ")}
                          style={{
                            backgroundColor: on ? meta.color : "#FFFFFF",
                            color: on && m !== "text" ? "#FBEFE3" : "#241C15",
                          }}
                        >
                          {meta.icon}
                          <span className="font-display text-[14px] font-bold">{meta.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                    ② 输出要
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(Object.keys(MODALITY_META) as Modality[]).map((m) => {
                      const meta = MODALITY_META[m];
                      const on = m === output;
                      return (
                        <button
                          key={m}
                          onClick={() => setOutput(m)}
                          className={[
                            "flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-ink transition-all duration-250 ease-spring",
                            on ? "shadow-[3px_3px_0_0_#241C15] scale-[1.02]" : "hover:bg-cream",
                          ].join(" ")}
                          style={{
                            backgroundColor: on ? meta.color : "#FFFFFF",
                            color: on && m !== "text" ? "#FBEFE3" : "#241C15",
                          }}
                        >
                          {meta.icon}
                          <span className="font-display text-[14px] font-bold">{meta.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 选择回显 */}
              <div
                key={key}
                className="flex items-center gap-3 mb-4 px-4 py-3 bg-cream border-2 border-ink rounded-xl animate-enter-fade"
              >
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-ink"
                  style={{ backgroundColor: inputMeta.color, color: input !== "text" ? "#FBEFE3" : "#241C15" }}
                >
                  {inputMeta.icon}
                  <span className="font-display text-[13px] font-bold">{inputMeta.name}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-ink/60" strokeWidth={2.4} />
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-ink"
                  style={{ backgroundColor: outputMeta.color, color: output !== "text" ? "#FBEFE3" : "#241C15" }}
                >
                  {outputMeta.icon}
                  <span className="font-display text-[13px] font-bold">{outputMeta.name}</span>
                </div>
                <div className="flex-1" />
                <span
                  className={[
                    "px-2.5 py-1 rounded-full border-2 border-ink font-mono text-[10px] uppercase tracking-[0.15em] font-bold",
                    STATUS_META[combo.status].bg,
                    STATUS_META[combo.status].fg,
                  ].join(" ")}
                >
                  {STATUS_META[combo.status].label}
                </span>
              </div>

              {/* headline */}
              <p
                key={`headline-${key}`}
                className="font-display text-[18px] font-bold text-ink mb-4 animate-enter-fade"
              >
                {combo.headline}
              </p>

              {/* 产品卡 */}
              <div className="grid sm:grid-cols-2 gap-2.5">
                {combo.tools.map((t, i) => (
                  <div
                    key={`${key}-${i}`}
                    className="px-3.5 py-3 bg-cream border-2 border-ink rounded-xl animate-enter-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-display text-[14px] font-bold text-ink">{t.name}</span>
                      <span className="font-mono text-[10px] text-ink/55">{t.vendor}</span>
                    </div>
                    <p className="font-sans text-[12.5px] text-ink/70 leading-snug">{t.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAnyToAny;
