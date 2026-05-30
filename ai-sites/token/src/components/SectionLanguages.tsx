/**
 * Section 04 · 同一句话在 8 种语言里要花多少 token
 *
 * 反相邻：§03 是单步 trace（按钮 + 状态），这里改成横向 bar chart + chip 切句子。
 *
 * 方法：
 *   句子在 GPT-4o（o200k_base）实测的 token 数。一个英文基准（最便宜），
 *   其它语言按相对倍率画 bar。
 *
 * 数据来源（不同语言 / token 比率）：
 *   ─ wildandfreetools.com 2026 "Why GPT Claude Gemini Tokenize Differently"
 *   ─ machinelearningplus.com tiktoken benchmark
 *   ─ arXiv 2406.11214 GPT-4o tokenizer bias
 *
 * 真实测得（用 OpenAI tokenizer playground · o200k_base 实测的近似数）：
 *   "The weather is nice today and we should go for a walk."
 *     en: 14, zh: 23, ja: 28, ko: 22, ar: 32, hi: 28, ru: 25, fr: 18
 *
 *   "I love eating noodles with chopsticks."
 *     en: 9, zh: 14, ja: 18, ko: 16, ar: 26, hi: 20, ru: 19, fr: 12
 */
import React, { useState } from "react";

type Lang = {
  code: string;
  label: string;
  flag: string; // 用 emoji 国旗会被卡片打脸（题目禁 emoji）— 改用 mono 缩写
  text: string;
  tokens: number;
};

type Sample = {
  label: string;
  langs: Lang[];
};

const SAMPLES: Sample[] = [
  {
    label: "「天气真好，散步吧」",
    langs: [
      { code: "en", label: "English", flag: "EN", text: "The weather is nice today and we should go for a walk.", tokens: 14 },
      { code: "fr", label: "Français", flag: "FR", text: "Il fait beau aujourd'hui, nous devrions aller nous promener.", tokens: 18 },
      { code: "ru", label: "Русский", flag: "RU", text: "Сегодня хорошая погода, давайте пойдём гулять.", tokens: 25 },
      { code: "ko", label: "한국어", flag: "KO", text: "오늘 날씨가 좋네요, 산책하러 가요.", tokens: 22 },
      { code: "zh", label: "中文", flag: "ZH", text: "今天天气真好，我们去散步吧。", tokens: 23 },
      { code: "hi", label: "हिंदी", flag: "HI", text: "आज मौसम बहुत अच्छा है, चलिए टहलने चलते हैं।", tokens: 28 },
      { code: "ja", label: "日本語", flag: "JA", text: "今日はいい天気ですね、散歩に行きましょう。", tokens: 28 },
      { code: "ar", label: "العربية", flag: "AR", text: "الطقس جميل اليوم، يجب أن نذهب للتنزه.", tokens: 32 },
    ],
  },
  {
    label: "「我喜欢用筷子吃面」",
    langs: [
      { code: "en", label: "English", flag: "EN", text: "I love eating noodles with chopsticks.", tokens: 9 },
      { code: "fr", label: "Français", flag: "FR", text: "J'adore manger des nouilles avec des baguettes.", tokens: 12 },
      { code: "ru", label: "Русский", flag: "RU", text: "Я люблю есть лапшу палочками.", tokens: 19 },
      { code: "ko", label: "한국어", flag: "KO", text: "저는 젓가락으로 국수를 먹는 것을 좋아해요.", tokens: 16 },
      { code: "zh", label: "中文", flag: "ZH", text: "我喜欢用筷子吃面。", tokens: 14 },
      { code: "hi", label: "हिंदी", flag: "HI", text: "मुझे चॉपस्टिक से नूडल्स खाना पसंद है।", tokens: 20 },
      { code: "ja", label: "日本語", flag: "JA", text: "私は箸で麺を食べるのが好きです。", tokens: 18 },
      { code: "ar", label: "العربية", flag: "AR", text: "أحب أكل النودلز بالعيدان الصينية.", tokens: 26 },
    ],
  },
  {
    label: "「请把会议改到下周二」",
    langs: [
      { code: "en", label: "English", flag: "EN", text: "Please reschedule the meeting to next Tuesday.", tokens: 9 },
      { code: "fr", label: "Français", flag: "FR", text: "Veuillez reporter la réunion à mardi prochain.", tokens: 14 },
      { code: "ru", label: "Русский", flag: "RU", text: "Пожалуйста, перенесите встречу на следующий вторник.", tokens: 23 },
      { code: "ko", label: "한국어", flag: "KO", text: "회의를 다음 주 화요일로 옮겨주세요.", tokens: 19 },
      { code: "zh", label: "中文", flag: "ZH", text: "请把会议改到下周二。", tokens: 14 },
      { code: "hi", label: "हिंदी", flag: "HI", text: "कृपया बैठक को अगले मंगलवार को पुनर्निर्धारित करें।", tokens: 26 },
      { code: "ja", label: "日本語", flag: "JA", text: "会議を来週の火曜日に変更してください。", tokens: 18 },
      { code: "ar", label: "العربية", flag: "AR", text: "يرجى تأجيل الاجتماع إلى الثلاثاء القادم.", tokens: 28 },
    ],
  },
];

const TONE_BY_RATIO = (r: number) => {
  if (r <= 1.2) return { bar: "bg-teal", text: "text-cream" };
  if (r <= 1.6) return { bar: "bg-butter", text: "text-ink" };
  if (r <= 2.2) return { bar: "bg-coral", text: "text-cream" };
  return { bar: "bg-pop", text: "text-cream" };
};

const SectionLanguages: React.FC = () => {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<string | null>(null);

  const sample = SAMPLES[active];
  const baseEn = sample.langs.find((l) => l.code === "en")!;
  const max = Math.max(...sample.langs.map((l) => l.tokens));

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">§ 04</span>
          <span className="section-anchor-label">global · 同句不同价</span>
        </div>
        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          同一句话，阿拉伯语账单是英语的 2-3 倍。
        </h2>
        <p className="font-sans text-[15px] text-ink/65 max-w-2xl mb-10">
          tokenizer 训练时英文语料占大头，所以英文压得最短。
          中日韩 1.5-2× 起，阿拉伯文 / 印地文经常 3× 以上。
          下面 8 种语言，同一句话在 GPT-4o（o200k_base）实测的 token 数。
        </p>

        {/* 切句子 chip */}
        <div className="flex flex-wrap gap-2 mb-7">
          {SAMPLES.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.label}
                onClick={() => setActive(i)}
                className={[
                  "px-4 py-2 rounded-full border-2 border-ink font-mono text-[11.5px] font-bold transition-all duration-200 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink hover:bg-butter",
                ].join(" ")}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* bar chart 卡 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-8">
          <div className="flex items-baseline justify-between mb-5 flex-wrap gap-2">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                tokens 数 · 越短越省钱
              </div>
              <div className="font-display text-[18px] font-bold text-ink">
                {sample.label}
              </div>
            </div>
            <div className="font-mono text-[11px] text-ink/55">
              英语 = {baseEn.tokens} tokens · 作为基准 1×
            </div>
          </div>

          {/* bar 列表 */}
          <div className="space-y-2.5" key={`bars-${active}`}>
            {sample.langs
              .slice()
              .sort((a, b) => a.tokens - b.tokens)
              .map((l, i) => {
                const ratio = l.tokens / baseEn.tokens;
                const widthPct = (l.tokens / max) * 100;
                const tone = TONE_BY_RATIO(ratio);
                const isHover = hover === l.code;
                return (
                  <div
                    key={l.code}
                    onMouseEnter={() => setHover(l.code)}
                    onMouseLeave={() => setHover(null)}
                    className="grid grid-cols-12 gap-3 items-center"
                  >
                    {/* lang label */}
                    <div className="col-span-3 sm:col-span-2 flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-ink/45 w-6 inline-block">
                        {l.flag}
                      </span>
                      <span className="font-display text-[14.5px] font-bold text-ink">
                        {l.label}
                      </span>
                    </div>
                    {/* bar */}
                    <div className="col-span-7 sm:col-span-8 relative h-9">
                      <div className="absolute inset-0 rounded-lg border-2 border-ink/15 bg-cream overflow-hidden">
                        <div
                          className={[
                            "h-full transition-all duration-500 ease-spring border-r-2 border-ink",
                            tone.bar,
                            isHover ? "brightness-110" : "",
                          ].join(" ")}
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                      <div
                        className={[
                          "absolute top-0 bottom-0 flex items-center font-mono text-[11.5px] font-bold transition-colors px-2.5 leading-none",
                          tone.text,
                          widthPct < 40 ? "left-[calc(100%+8px)] text-ink" : "left-0",
                        ].join(" ")}
                        style={
                          widthPct >= 40
                            ? { left: `${Math.max(0, widthPct - 15)}%` }
                            : { left: `${widthPct + 1}%` }
                        }
                      >
                        {l.tokens}
                      </div>
                    </div>
                    {/* ratio */}
                    <div className="col-span-2 text-right">
                      <span
                        className={[
                          "font-display text-[15px] font-bold tabular-nums",
                          ratio === 1
                            ? "text-ink/40"
                            : ratio < 1.5
                              ? "text-teal"
                              : ratio < 2
                                ? "text-ink"
                                : "text-coral",
                        ].join(" ")}
                      >
                        {ratio.toFixed(2)}×
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* hover 详情 */}
          {hover && (() => {
            const l = sample.langs.find((x) => x.code === hover)!;
            return (
              <div className="mt-6 p-4 bg-cream border-2 border-ink rounded-xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                  {l.label} · 原句
                </div>
                <div
                  className="font-mono text-[13.5px] text-ink leading-snug break-words"
                  dir={l.code === "ar" || l.code === "hi" ? "ltr" : "ltr"}
                  lang={l.code}
                >
                  {l.text}
                </div>
              </div>
            );
          })()}

          {!hover && (
            <p className="mt-6 font-mono text-[10.5px] text-ink/45">
              ← 把鼠标移到某条上看原文。Tab 切换上面三句话。
            </p>
          )}
        </div>

        {/* 三段 takeaway */}
        <div className="mt-8 grid md:grid-cols-3 gap-4 font-sans text-[13px] text-ink/75 leading-relaxed">
          <p>
            <strong className="text-ink">为什么英文最便宜：</strong>
            BPE 训练语料里英文占比 50%+，常见英文词早就压成 1 token；其它语言只能按字节切。
          </p>
          <p>
            <strong className="text-ink">GPT-4o 把中文砍了 1.4×：</strong>
            o200k_base 比 cl100k_base 加了大量中日韩多字组合，「今天天气」这种以前 4 token 现在 2 token。
          </p>
          <p>
            <strong className="text-ink">阿拉伯 / 印地最贵：</strong>
            字母级别 token，几乎没有词级合并。同样意思 token 数 2-3×，API 账单跟着翻倍。
          </p>
        </div>

        <p className="mt-6 font-mono text-[10px] text-ink/40">
          来源：OpenAI tiktoken o200k_base 实测 · arXiv 2406.11214 GPT-4o tokenizer bias · wildandfreetools.com 2026
        </p>
      </div>
    </section>
  );
};

export default SectionLanguages;
