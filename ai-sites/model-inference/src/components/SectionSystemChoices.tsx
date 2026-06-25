import React, { useMemo, useState } from "react";
import { Check, ServerCog } from "lucide-react";
import { Shell, StampLink } from "./Shared";

const options = [
  { id: "long", label: "输入很长" },
  { id: "crowd", label: "很多人同时用" },
  { id: "small", label: "机器空间紧" },
  { id: "repeat", label: "开头经常重复" },
];

const SectionSystemChoices: React.FC = () => {
  const [selected, setSelected] = useState<string[]>(["long"]);
  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const advice = useMemo(() => {
    const result: { title: string; body: string; href: string }[] = [];
    if (selected.includes("long")) result.push({ title: "长输入与 KV Cache", body: "输入越长，Prefill 花的时间越多，KV Cache 占的显存也越大。缓存会保存已经算过的内容，避免每生成一个新 Token 都重新计算前文。", href: "../kv-cache/index.html" });
    if (selected.includes("crowd")) result.push({ title: "连续批处理", body: "每轮生成后重新安排队伍，谁完成就立刻补进新请求。", href: "../continuous-batching/index.html" });
    if (selected.includes("small")) result.push({ title: "量化", body: "用更省空间的数字保存模型，让它更容易放进有限显存。", href: "../quantization/index.html" });
    if (selected.includes("repeat")) result.push({ title: "Prompt Cache", body: "多个请求拥有相同开头时，复用这段开头的计算。", href: "../prompt-cache/index.html" });
    return result;
  }, [selected]);

  return (
    <Shell
      num="08"
      label="接进系统"
      title="一次推理怎样接到真实产品里？"
      intro={<p>产品会在模型外面加几种办法：减少重复计算、缩小模型占用、安排多人请求。勾选你遇到的情况，看该往哪个概念继续。</p>}
      tone="cream"
    >
      <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-7 items-start">
        <div className="bg-ink text-white border-2 border-ink rounded-[2rem] shadow-stamp-lg p-6">
          <ServerCog className="w-9 h-9 text-butter" />
          <h3 className="mt-5 font-display text-2xl font-bold">你的场景</h3>
          <div className="mt-5 space-y-3">
            {options.map((option) => {
              const active = selected.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => toggle(option.id)}
                  className={`w-full flex items-center gap-3 text-left rounded-xl border-2 px-4 py-3 transition-all duration-250 ${active ? "bg-butter text-ink border-ink shadow-stamp" : "bg-white/5 text-white border-white/30"}`}
                >
                  <span className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${active ? "bg-ink border-ink text-white" : "border-white/45"}`}>
                    {active && <Check className="w-4 h-4" strokeWidth={3} />}
                  </span>
                  <span className="font-bold">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          {advice.length === 0 ? (
            <div className="card-stamp p-8 min-h-[260px] flex items-center justify-center text-center text-ink/55">
              勾选一个情况，这里会给出对应办法。
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {advice.map((item) => (
                <StampLink key={item.title} href={item.href} title={item.title}>{item.body}</StampLink>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 border-2 border-ink rounded-[2rem] bg-coral shadow-stamp-lg p-6 sm:p-8">
        <span className="font-mono text-[11px] tracking-widest text-ink/60">把整件事串起来</span>
        <p className="mt-3 font-display text-2xl sm:text-3xl font-bold leading-snug max-w-[920px]">
          你发出文字 → 文字切成 Token → 模型先读完输入 → 每轮选一个新 Token → 循环结束 → 产品把回答交给你。
        </p>
        <p className="mt-5 text-[15px] leading-relaxed text-ink/75 max-w-[780px]">
          这条从输入到回答的运行过程，就是模型推理。KV Cache 减少重复计算，量化降低模型占用，推理服务负责安排多个请求。
        </p>
      </div>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <StampLink href="../speculative-decoding/index.html" title="一轮能不能确认多块内容？">
          推测解码让更快的助手先写草稿，再由主模型成批验证。
        </StampLink>
        <StampLink href="../structured-output/index.html" title="生成时怎样锁住 JSON 格式？">
          结构化输出会在逐块生成时限制下一步能写哪些内容。
        </StampLink>
      </div>
    </Shell>
  );
};

export default SectionSystemChoices;
