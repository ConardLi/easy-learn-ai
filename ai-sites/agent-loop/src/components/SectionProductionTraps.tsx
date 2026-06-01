/**
 * Section 07 · 上生产前要想清楚的三件事
 *
 * 三件事：成本 / 可观测 / 停止条件
 * 前两件 mini cards 简述，第三件做成可交互的「停止条件模拟器」：
 *   场景固定 = 爬虫调用工具持续返回空数据
 *   用户翻 4 个 toggle 开关（最大迭代 / Token 预算 / 无进展 / 目标达成）
 *   下方仪表盘实时显示：会转多少轮 · 烧多少 token · 多久停下
 */
import React, { useState } from "react";
import {
  DollarSign,
  Eye,
  ShieldAlert,
  AlertTriangle,
  Coins,
  Activity,
  Clock,
  Repeat,
} from "lucide-react";

type CondId = "maxiter" | "budget" | "noprogress" | "goalcheck";

interface Cond {
  id: CondId;
  label: string;
  hint: string;
  stopAtRound: number;
}

const CONDS: Cond[] = [
  {
    id: "maxiter",
    label: "最大迭代次数",
    hint: "设个上限，比如 10 轮就停。哪怕没完成。",
    stopAtRound: 10,
  },
  {
    id: "budget",
    label: "Token / 成本预算",
    hint: "超过 5000 token 强制终止。",
    stopAtRound: 12,
  },
  {
    id: "noprogress",
    label: "无进展检测",
    hint: "连续 3 轮没产生新信息就退出。",
    stopAtRound: 3,
  },
  {
    id: "goalcheck",
    label: "目标达成检查",
    hint: "每轮结束都问一句：任务完成了吗？",
    stopAtRound: 5,
  },
];

const CRASH_ROUNDS = 400;
const COST_PER_ROUND = 0.012;
const TOKENS_PER_ROUND = 500;

const INITIAL_SWITCHES = {
  maxiter: false,
  budget: false,
  noprogress: false,
  goalcheck: false,
};

const ALL_IDS: CondId[] = ["maxiter", "budget", "noprogress", "goalcheck"];

function getActiveIds(s) {
  return ALL_IDS.filter((id) => s[id]);
}

function calcResult(s) {
  const activeIds = getActiveIds(s);
  if (activeIds.length === 0) {
    return {
      rounds: CRASH_ROUNDS,
      tokens: CRASH_ROUNDS * TOKENS_PER_ROUND,
      cost: CRASH_ROUNDS * COST_PER_ROUND,
      crashed: true,
      triggeredBy: "平台 rate limit",
    };
  }
  let minRounds = Infinity;
  let triggerLabel = "";
  activeIds.forEach((id) => {
    const cond = CONDS.find((c) => c.id === id);
    if (cond && cond.stopAtRound < minRounds) {
      minRounds = cond.stopAtRound;
      triggerLabel = cond.label;
    }
  });
  return {
    rounds: minRounds,
    tokens: minRounds * TOKENS_PER_ROUND,
    cost: minRounds * COST_PER_ROUND,
    crashed: false,
    triggeredBy: triggerLabel,
  };
}

function SectionProductionTraps() {
  const [switches, setSwitches] = useState(INITIAL_SWITCHES);

  function toggle(id: CondId) {
    setSwitches((s) => ({ ...s, [id]: !s[id] }));
  }

  const result = calcResult(switches);

  return (
    <section className="relative bg-ink text-cream border-b-2 border-ink overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-coral/8 blur-[80px] pointer-events-none" />

      <div className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
        <div className="section-anchor">
          <span className="section-anchor-num !bg-coral !text-cream !border-cream">
            07
          </span>
          <span className="section-anchor-label !text-cream/55">
            Production · 上生产前的三件事
          </span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-cream max-w-[860px] leading-tight">
          本地跑个 demo 很简单。{" "}
          <span className="inline-block bg-coral text-white px-2 -mx-2 -mb-1 pb-1">
            上生产，有 3 个问题
          </span>{" "}
          躲不掉。
        </h2>

        {/* 三件事 mini cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <TrapCard
            num="01"
            icon={DollarSign}
            title="成本会失控"
            body="Agent 每转一轮就是一次 LLM 调用。Anthropic 数据：Agent token 消耗约普通聊天 4 倍，Multi-Agent 飙到 15 倍。"
            stat="单任务 5-8 美元"
            statLabel="不受约束时"
            highlight={false}
          />
          <TrapCard
            num="02"
            icon={Eye}
            title="过程是黑盒"
            body="跑了 15 轮、调了 8 个工具、有分支判断。结果不对时你得知道是第几轮跑偏的、哪个工具返回了错数据。"
            stat="结构化日志 + 回放"
            statLabel="必备能力"
            highlight={false}
          />
          <TrapCard
            num="03"
            icon={ShieldAlert}
            title="不停就是炸弹"
            body="Oracle 案例：某网页爬虫 Agent 因目标网站改版，工具持续返空。Agent prompt 写「重试直到拿到数据」，结果……"
            stat="400 轮 / 5 分钟"
            statLabel="撞 rate limit 才停"
            highlight={true}
          />
        </div>

        {/* 停止条件模拟器 */}
        <div className="mt-14">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-coral mb-3">
            ── 停止条件模拟器 ──
          </div>
          <h3 className="font-display font-extrabold text-[26px] md:text-[30px] text-cream leading-tight max-w-[760px]">
            把上面 Oracle 那个爬虫场景搬出来 ——{" "}
            <span className="text-butter">
              翻几个开关，看 Agent 还能撞墙多久。
            </span>
          </h3>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* 左：开关组 */}
            <div className="bg-cream text-ink border-2 border-cream rounded-3xl p-5 lg:p-6">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink/55 mb-1">
                场景固定
              </div>
              <p className="font-sans text-[14px] text-ink leading-relaxed mb-5 pb-5 border-b-2 border-ink/15">
                爬虫工具持续返回空数据。Agent 的 prompt 写「重试直到拿到」。
                <br />
                <span className="text-ink/55 font-mono text-[12px]">
                  默认 0 个停止条件 → 没有停止条件，Agent 可能一直重试，直到撞 rate limit 或账单爆掉
                </span>
              </p>

              <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink/55 mb-3">
                启用哪些停止条件？
              </div>
              <div className="space-y-2.5">
                {CONDS.map((c) => (
                  <ToggleRow
                    key={c.id}
                    on={switches[c.id]}
                    onToggle={() => toggle(c.id)}
                    label={c.label}
                    hint={c.hint}
                    stopAt={c.stopAtRound}
                  />
                ))}
              </div>

              <p className="font-serif italic text-[12.5px] text-ink/55 mt-5 pt-4 border-t-2 border-ink/15 leading-relaxed">
                生产环境推荐：这几个叠着用，互为保底。一条不启用 = 把 Agent
                当无限循环放出去。
              </p>
            </div>

            {/* 右：仪表盘 */}
            <div
              className={`bg-white border-2 border-cream rounded-3xl p-5 lg:p-6 transition-colors duration-400 ${result.crashed ? "ring-4 ring-pop/50" : ""}`}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink/55">
                    模拟结果
                  </div>
                  <div className="font-display font-extrabold text-[18px] text-ink mt-0.5">
                    {result.crashed ? "💥 失控撞墙" : "✅ 正常停下"}
                  </div>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] font-bold ${result.crashed ? "bg-pop text-white" : "bg-teal text-white"}`}
                >
                  {result.crashed ? "CRASH" : "STOP"}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Metric
                  icon={Repeat}
                  label="循环轮数"
                  value={result.rounds.toLocaleString()}
                  unit="轮"
                  red={result.crashed}
                />
                <Metric
                  icon={Coins}
                  label="Token 消耗"
                  value={(result.tokens / 1000).toFixed(1)}
                  unit="K"
                  red={result.crashed}
                />
                <Metric
                  icon={Clock}
                  label="预估时长"
                  value={
                    result.crashed
                      ? "≈5"
                      : `${Math.max(1, Math.round(result.rounds * 0.8))}`
                  }
                  unit={result.crashed ? "min" : "s"}
                  red={result.crashed}
                />
              </div>

              <div
                className={`mt-5 px-4 py-3 rounded-2xl border-2 ${result.crashed ? "bg-pop/8 border-pop text-pop" : "bg-teal/8 border-teal/50 text-teal"} flex items-start gap-2.5`}
              >
                {result.crashed ? (
                  <AlertTriangle
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    strokeWidth={2.5}
                  />
                ) : (
                  <Activity
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    strokeWidth={2.5}
                  />
                )}
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-wider font-bold">
                    触发停止
                  </div>
                  <div className="font-sans text-[13px] mt-0.5">
                    {result.triggeredBy}
                    {result.crashed
                      ? " · 平台速率限制把它撞下来了"
                      : ` · 在第 ${result.rounds} 轮主动退出`}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between px-4 py-3 bg-cream rounded-2xl border-2 border-ink/15">
                <div className="font-mono text-[11px] text-ink/65">
                  按 Claude Sonnet 估算成本
                </div>
                <div
                  className={`font-display font-extrabold text-[22px] ${result.crashed ? "text-pop" : "text-ink"}`}
                >
                  ${result.cost.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────── 子件（避免 React.FC<{...}> inline generic）────── */

function TrapCard(props) {
  const { num, icon: Icon, title, body, stat, statLabel, highlight } = props;
  return (
    <div
      className={`relative bg-cream text-ink border-2 border-cream rounded-3xl p-5 lg:p-6 shadow-[4px_4px_0_0_#F4D35E] ${highlight ? "ring-4 ring-coral/30" : ""}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-coral font-bold">
          Trap {num}
        </span>
        <Icon
          className={`w-5 h-5 ${highlight ? "text-coral" : "text-ink/50"}`}
          strokeWidth={2}
        />
      </div>
      <h4 className="font-display font-extrabold text-[20px] text-ink leading-tight mb-2.5">
        {title}
      </h4>
      <p className="font-sans text-[13.5px] text-ink/75 leading-[1.7] mb-4">
        {body}
      </p>
      <div className="pt-3 border-t-2 border-dashed border-ink/15">
        <div className="font-mono text-[9.5px] uppercase tracking-wider text-ink/55 mb-0.5">
          {statLabel}
        </div>
        <div
          className={`font-display font-extrabold text-[18px] leading-tight ${highlight ? "text-coral" : "text-ink"}`}
        >
          {stat}
        </div>
      </div>
    </div>
  );
}

function ToggleRow(props) {
  const { on, onToggle, label, hint, stopAt } = props;
  return (
    <button
      onClick={onToggle}
      className={`group w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border-2 border-ink text-left transition-all duration-250 ease-spring ${on ? "bg-butter shadow-stamp" : "bg-white hover:bg-cream"}`}
    >
      <span
        className={`flex-shrink-0 w-11 h-6 rounded-full border-2 border-ink relative transition-colors duration-200 ${on ? "bg-coral" : "bg-ink/10"}`}
      >
        <span
          className={`absolute top-[1px] w-[18px] h-[18px] rounded-full bg-white border-2 border-ink transition-all duration-300 ease-spring ${on ? "left-[20px]" : "left-[1px]"}`}
        />
      </span>
      <div className="flex-1 min-w-0">
        <div className="font-sans font-bold text-[13.5px] text-ink leading-tight">
          {label}
        </div>
        <div className="font-mono text-[10.5px] text-ink/55 mt-0.5 truncate">
          {hint}
        </div>
      </div>
      <span
        className={`flex-shrink-0 font-mono text-[10.5px] font-bold transition-opacity ${on ? "opacity-100 text-ink" : "opacity-0"}`}
      >
        → {stopAt} 轮停
      </span>
    </button>
  );
}

function Metric(props) {
  const { icon: Icon, label, value, unit, red } = props;
  return (
    <div
      className={`p-3 rounded-2xl border-2 ${red ? "bg-pop/8 border-pop/50" : "bg-cream border-ink/15"}`}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <Icon
          className={`w-3 h-3 ${red ? "text-pop" : "text-ink/55"}`}
          strokeWidth={2.5}
        />
        <span
          className={`font-mono text-[9.5px] uppercase tracking-wider ${red ? "text-pop" : "text-ink/55"}`}
        >
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={`font-display font-extrabold leading-none ${red ? "text-pop text-[28px]" : "text-ink text-[26px]"}`}
        >
          {value}
        </span>
        <span className="font-mono text-[11px] text-ink/55">{unit}</span>
      </div>
    </div>
  );
}

export default SectionProductionTraps;
