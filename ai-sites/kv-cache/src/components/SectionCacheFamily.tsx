import React, { useState } from "react";
import { ArrowRight, Check, Copy, FileText } from "lucide-react";
import { LinkCard, SectionHead } from "./SectionBits";

type Scene = "same" | "next";

const SectionCacheFamily: React.FC = () => {
  const [scene, setScene] = useState<Scene>("same");

  return (
    <section className="bg-butter-tint px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1140px]">
        <SectionHead
          number="08"
          label="两个 Cache 怎么分"
          title="KV Cache 复用当前生成，Prompt Cache 可以跨请求复用"
          intro={
            <>
              <p>
                两个名字经常一起出现，因为它们都在复用已经算过的内容。
                区别落在复用范围：当前回答，还是之后发来的另一个请求。
              </p>
              <p className="mt-3">切换场景，看同一段开场文字会怎样被使用。</p>
            </>
          }
        />

        <div className="rounded-[2rem] border-2 border-ink bg-white p-5 shadow-stamp-lg lg:p-8">
          <div className="inline-flex rounded-full border-2 border-ink bg-cream p-1 shadow-stamp">
            <button
              onClick={() => setScene("same")}
              className={`rounded-full px-4 py-2 text-sm font-bold ${scene === "same" ? "bg-ink text-cream" : "text-ink/55"}`}
            >
              同一个回答还在写
            </button>
            <button
              onClick={() => setScene("next")}
              className={`rounded-full px-4 py-2 text-sm font-bold ${scene === "next" ? "bg-ink text-cream" : "text-ink/55"}`}
            >
              新请求又来了
            </button>
          </div>

          <div key={scene} className="mt-8 animate-enter-fade">
            {scene === "same" ? <SameRequest /> : <NextRequest />}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <LinkCard
            href="../model-inference/index.html"
            title="一次回答怎样生成"
            desc="模型推理站串起输入、逐步生成、速度和成本。KV Cache 是这条流程里的加速环节。"
          />
          <LinkCard
            href="../prompt-cache/index.html"
            title="Prompt Cache 怎样跨请求复用"
            desc="那一站主讲多个请求共享相同开头时，服务怎样少做重复的输入计算。"
          />
          <LinkCard
            href="../continuous-batching/index.html"
            title="多人请求怎样动态补位"
            desc="连续批处理负责每轮让谁运行；每个人自己的 KV Cache 让暂停和继续都能接上进度。"
          />
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <LinkCard
            href="../multi-query-attention/index.html"
            title="为什么有些模型只存一组 K/V"
            desc="MQA 让多个查询头共享同一组 K、V，直接缩小每个 token 留下的缓存。"
            compact
          />
          <LinkCard
            href="../transformer/index.html"
            title="继续看注意力和 Q/K/V"
            desc="想知道 K、V 的完整计算过程，从 Transformer 站继续。"
            compact
          />
          <LinkCard
            href="../deploy/index.html"
            title="继续看 PagedAttention"
            desc="想知道服务程序怎样管理许多人的缓存，从模型部署站继续。"
            compact
          />
        </div>

        <div className="mt-10 grid gap-4 rounded-3xl border-2 border-ink bg-teal p-5 text-cream shadow-stamp md:grid-cols-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-butter-soft">记住这一句</div>
            <p className="mt-2 font-display text-xl font-bold">
              KV Cache 让模型接着写时少重读前文。
            </p>
          </div>
          <SourceLink href="https://arxiv.org/abs/1706.03762" label="Transformer 论文" />
          <SourceLink href="https://arxiv.org/abs/2309.06180" label="PagedAttention 论文" />
        </div>
      </div>
    </section>
  );
};

const SameRequest: React.FC = () => (
  <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
    <SceneCard
      icon={<FileText className="h-6 w-6" />}
      eyebrow="已有内容"
      title="用户问题 + 已生成回答"
      lines={["请写一段春游通知", "各位同学，本周五……"]}
    />
    <ArrowRight className="mx-auto h-6 w-6 rotate-90 md:rotate-0" />
    <SceneCard
      icon={<Check className="h-6 w-6" />}
      eyebrow="KV Cache"
      title="沿用当前请求的计算"
      lines={["前文 K/V 留在显存", "只为新 token 追加一格"]}
      tone="bg-coral"
    />
  </div>
);

const NextRequest: React.FC = () => (
  <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
    <SceneCard
      icon={<Copy className="h-6 w-6" />}
      eyebrow="两个独立请求"
      title="都带着相同的长开头"
      lines={["同一份产品说明书", "后面各问一个新问题"]}
    />
    <ArrowRight className="mx-auto h-6 w-6 rotate-90 md:rotate-0" />
    <SceneCard
      icon={<Check className="h-6 w-6" />}
      eyebrow="Prompt Cache"
      title="复用共同开头的计算"
      lines={["第二个请求少算一次开头", "各自的回答仍有自己的 KV Cache"]}
      tone="bg-butter"
    />
  </div>
);

const SceneCard: React.FC<{
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  lines: string[];
  tone?: string;
}> = ({ icon, eyebrow, title, lines, tone = "bg-cream" }) => (
  <div className={`rounded-3xl border-2 border-ink p-5 ${tone}`}>
    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-white">
      {icon}
    </div>
    <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">{eyebrow}</div>
    <h3 className="mt-1 font-display text-xl font-bold">{title}</h3>
    <div className="mt-4 space-y-2">
      {lines.map((line) => (
        <div key={line} className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm">
          {line}
        </div>
      ))}
    </div>
  </div>
);

const SourceLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-between gap-3 rounded-2xl border-2 border-cream/70 px-4 py-3 text-sm font-bold transition-colors hover:bg-cream hover:text-ink"
  >
    {label}
    <ArrowRight className="h-4 w-4" />
  </a>
);

export default SectionCacheFamily;
