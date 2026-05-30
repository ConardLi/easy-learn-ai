/**
 * Section 04 · 「Llama 真的开源吗？」· license 法务模拟器
 *
 * 用户当一回 Meta 的法务对接：勾选公司大小 / 用途 / 是否拿来训别家模型，
 * 模拟器实时告诉你"能不能直接拿 Llama 4 用"。
 *
 * 形式跟 quantization Section 03（chip + 推荐）相似但 prompt 完全不同 —— 这里是
 * 多个布尔条件叠加的 L4 任务模拟器，不是 chip 选择 + 数值计算。
 *
 * 数据来源：
 *   - Llama 2/3/4 Community License Agreement Section 1-2（700M MAU 红线）
 *     ai.meta.com/llama/license/ · llama.com/license
 *   - Llama 3 Acceptable Use Policy（不许训别家模型）
 *     wcr.legal/llama-3-license-700m-mau-limit/
 *   - 「open-weight ≠ open-source」shujisado.org/2025/01/27 · OSI 标准比对
 */
import React, { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, XCircle, Shield } from "lucide-react";

type Scenario = {
  size: "small" | "midbig" | "giant"; // 公司规模 by MAU
  use: "research" | "internal" | "saas" | "compete"; // 用途
  trainOther: boolean; // 是否拿 Llama 输出去训别家 LLM
  derivativeName: boolean; // 衍生模型是否带 "Llama" 前缀
};

const DEFAULT: Scenario = {
  size: "small",
  use: "saas",
  trainOther: false,
  derivativeName: true,
};

const SIZES = [
  { id: "small", label: "< 7 亿 MAU", caption: "绝大多数公司" },
  { id: "midbig", label: "1 亿到 7 亿 MAU", caption: "字节 / 腾讯量级" },
  { id: "giant", label: "≥ 7 亿 MAU", caption: "Google / Apple / Meta 同体量" },
] as const;

const USES = [
  { id: "research", label: "学术研究 / 个人玩", caption: "发论文 · 自己学" },
  { id: "internal", label: "公司内部用", caption: "员工助手 · 内部知识库" },
  { id: "saas", label: "对外卖 SaaS", caption: "做对话产品给用户用" },
  { id: "compete", label: "训自家 LLM 当竞品", caption: "拿 Llama 输出当训练数据" },
] as const;

type Verdict = {
  ok: boolean;
  level: "green" | "yellow" | "red";
  title: string;
  rules: { hit: boolean; text: string; cite: string }[];
  advice: string;
};

function judge(s: Scenario): Verdict {
  const rules: Verdict["rules"] = [];
  let blocked = false;

  // Rule 1: 700M MAU
  if (s.size === "giant") {
    rules.push({
      hit: true,
      text: "你超过 7 亿月活，必须先单独跟 Meta 谈授权，Meta 可以拒。",
      cite: "Llama 4 Community License § 2",
    });
    blocked = true;
  } else {
    rules.push({
      hit: false,
      text: "MAU < 7 亿 · 不触发额外授权",
      cite: "Llama 4 Community License § 2",
    });
  }

  // Rule 2: 拿来训别家模型
  if (s.use === "compete" || s.trainOther) {
    rules.push({
      hit: true,
      text: "你拿 Llama 输出去训别家 LLM —— Acceptable Use Policy 明确禁止。",
      cite: "Llama 3 / 4 AUP · 「improve any other LLM」条款",
    });
    blocked = true;
  } else {
    rules.push({
      hit: false,
      text: "未将 Llama 输出用于训练其他大模型",
      cite: "Llama 4 AUP",
    });
  }

  // Rule 3: 衍生模型命名
  if (!s.derivativeName && (s.use === "saas" || s.use === "internal")) {
    rules.push({
      hit: true,
      text: "你公开发布的衍生模型没带 Llama 前缀，违反「AI built with Llama」标识要求。",
      cite: "Llama 4 Community License § 1.b.i",
    });
    blocked = true;
  } else if (s.use === "research") {
    rules.push({
      hit: false,
      text: "学术研究场景，命名约束相对宽松（仍建议标注）",
      cite: "Llama 4 Community License § 1.b.i",
    });
  } else {
    rules.push({
      hit: false,
      text: "衍生模型已带 Llama 前缀 / 标识合规",
      cite: "Llama 4 Community License § 1.b.i",
    });
  }

  // Rule 4: AUP 通用红线（误导用途、军事、儿童相关、非法等）
  rules.push({
    hit: false,
    text: "Acceptable Use Policy 通用红线（军事 / 误导 / 儿童相关 / 非法）",
    cite: "Llama 4 AUP",
  });

  if (blocked) {
    return {
      ok: false,
      level: "red",
      title: "不能直接用 · 要找 Meta 谈或者改方案",
      rules,
      advice:
        s.size === "giant"
          ? "你这个体量，先发邮件给 Meta legal@ 申请额外许可，等 Meta 回信再说。"
          : "把「训别家模型」这条去掉，或者改产品形态绕开。",
    };
  }
  if (s.use === "research") {
    return {
      ok: true,
      level: "green",
      title: "可以用 · 学术场景最自由",
      rules,
      advice: "默认可以下载、跑、改、发论文。引用论文带上 arXiv:2407.21783 即可。",
    };
  }
  if (s.use === "saas" || s.use === "internal") {
    return {
      ok: true,
      level: "yellow",
      title: "可以商用 · 但要遵守 6 条小字",
      rules,
      advice:
        "把 LICENSE.txt + Acceptable Use Policy 一起放到产品仓库根。衍生模型名带「Llama-」前缀。把模型 fine-tune 后给别家做 SaaS，对方仍然要遵守这套 AUP。",
    };
  }
  return {
    ok: true,
    level: "green",
    title: "可以用",
    rules,
    advice: "保留 LICENSE 文件、附上「AI built with Llama」声明即可。",
  };
}

const SectionLicense: React.FC = () => {
  const [scn, setScn] = useState<Scenario>(DEFAULT);
  const verdict = useMemo(() => judge(scn), [scn]);

  const tone =
    verdict.level === "green"
      ? { bar: "bg-teal", text: "text-teal", tag: "bg-teal text-cream" }
      : verdict.level === "yellow"
        ? { bar: "bg-butter-deep", text: "text-ink", tag: "bg-butter text-ink" }
        : { bar: "bg-coral", text: "text-coral", tag: "bg-coral text-cream" };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">the small print</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          它叫
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">「开源」</span>
          </span>
          ，但其实有 6 条小字。
        </h2>

        <p className="max-w-2xl text-[15.5px] text-ink/75 leading-relaxed mb-8">
          Llama 用的不是 Apache-2.0 / MIT 这种 OSI 认证许可证，是 Meta 自己写的「Community License」。
          OSI 因此一直拒绝把 Llama 当 open source —— 业内只能叫它 open-weight。
          下面你当一次法务，看你的场景能不能直接用。
        </p>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* 左：勾选场景 */}
          <div className="lg:col-span-5 space-y-5">
            <Block title="① 你公司多大？">
              <div className="space-y-2">
                {SIZES.map((s) => {
                  const on = scn.size === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setScn((p) => ({ ...p, size: s.id }))}
                      className={[
                        "w-full text-left px-3 py-2.5 rounded-xl border-2 border-ink transition-all duration-200 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-white text-ink hover:bg-butter/30",
                      ].join(" ")}
                    >
                      <div className="font-display text-[14px] font-bold leading-tight">
                        {s.label}
                      </div>
                      <div
                        className={[
                          "font-mono text-[10.5px] mt-0.5",
                          on ? "text-butter" : "text-ink/55",
                        ].join(" ")}
                      >
                        {s.caption}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Block>

            <Block title="② 拿来干啥？">
              <div className="grid grid-cols-2 gap-2">
                {USES.map((u) => {
                  const on = scn.use === u.id;
                  return (
                    <button
                      key={u.id}
                      onClick={() =>
                        setScn((p) => ({
                          ...p,
                          use: u.id,
                          trainOther: u.id === "compete" ? true : p.trainOther,
                        }))
                      }
                      className={[
                        "text-left px-3 py-2.5 rounded-xl border-2 border-ink transition-all duration-200 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-white text-ink hover:bg-butter/30",
                      ].join(" ")}
                    >
                      <div className="font-display text-[13px] font-bold leading-tight">
                        {u.label}
                      </div>
                      <div
                        className={[
                          "font-mono text-[10px] mt-0.5",
                          on ? "text-butter" : "text-ink/55",
                        ].join(" ")}
                      >
                        {u.caption}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Block>

            <Block title="③ 两个细节">
              <label className="flex items-start gap-2.5 cursor-pointer mb-2 px-3 py-2.5 rounded-xl border-2 border-ink bg-white hover:bg-butter/20">
                <input
                  type="checkbox"
                  className="mt-1 accent-coral w-4 h-4"
                  checked={scn.trainOther}
                  onChange={(e) =>
                    setScn((p) => ({ ...p, trainOther: e.target.checked }))
                  }
                />
                <span className="text-[13px] leading-snug">
                  我会把 Llama 输出当训练数据，去训自家其他 LLM
                </span>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer px-3 py-2.5 rounded-xl border-2 border-ink bg-white hover:bg-butter/20">
                <input
                  type="checkbox"
                  className="mt-1 accent-coral w-4 h-4"
                  checked={scn.derivativeName}
                  onChange={(e) =>
                    setScn((p) => ({ ...p, derivativeName: e.target.checked }))
                  }
                />
                <span className="text-[13px] leading-snug">
                  公开衍生模型时，名字带 "Llama-" 前缀（比如 Llama-3-Chinese）
                </span>
              </label>
            </Block>
          </div>

          {/* 右：判决卡 */}
          <div className="lg:col-span-7">
            <div
              key={`${scn.size}-${scn.use}-${scn.trainOther}-${scn.derivativeName}`}
              className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-8 animate-enter-fade"
            >
              <div className="flex items-center gap-3 mb-2">
                {verdict.level === "green" ? (
                  <CheckCircle2 className={`w-7 h-7 ${tone.text}`} strokeWidth={2.4} />
                ) : verdict.level === "yellow" ? (
                  <AlertTriangle className={`w-7 h-7 ${tone.text}`} strokeWidth={2.4} />
                ) : (
                  <XCircle className={`w-7 h-7 ${tone.text}`} strokeWidth={2.4} />
                )}
                <span
                  className={[
                    "font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border-2 border-ink font-bold",
                    tone.tag,
                  ].join(" ")}
                >
                  legal verdict
                </span>
              </div>

              <h3
                className={[
                  "font-display text-[24px] lg:text-[28px] font-bold leading-tight mb-4",
                  tone.text,
                ].join(" ")}
              >
                {verdict.title}
              </h3>

              <div className="space-y-2 mb-5">
                {verdict.rules.map((r, i) => (
                  <div
                    key={i}
                    className={[
                      "flex items-start gap-2 px-3 py-2 rounded-lg border",
                      r.hit
                        ? "bg-coral/8 border-coral"
                        : "bg-cream border-ink/10",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "mt-0.5 w-4 h-4 rounded border-2 border-ink flex-none flex items-center justify-center",
                        r.hit ? "bg-coral" : "bg-white",
                      ].join(" ")}
                    >
                      {r.hit && (
                        <span className="text-cream font-bold text-[11px] leading-none">!</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] text-ink leading-snug">{r.text}</p>
                      <p className="font-mono text-[10px] text-ink/45 mt-0.5">{r.cite}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-ink text-cream rounded-2xl p-4 flex gap-3">
                <Shield className="w-5 h-5 text-butter flex-none mt-0.5" strokeWidth={2.2} />
                <p className="text-[13.5px] leading-relaxed">{verdict.advice}</p>
              </div>
            </div>

            <p className="mt-4 font-mono text-[10.5px] text-ink/50 leading-relaxed max-w-xl">
              这只是把已公开的 Llama Community License + Acceptable Use Policy 翻译成对话语言，不是法律建议。真要上线先找律师看。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp p-4 lg:p-5">
    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
      {title}
    </div>
    {children}
  </div>
);

export default SectionLicense;
