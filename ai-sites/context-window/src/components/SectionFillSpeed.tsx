/**
 * SectionFillSpeed · 实际开发里消耗有多快
 *
 * 主交互（L3 slider）：
 *   - 调「已经跑了几轮工具调用」（不是对话轮，跟 memory 站 SectionAmnesia 视觉换角度）
 *   - 可视化用 200 格的网格，每格代表 1K tokens（演示用，按 200K 窗口算）
 *     —— memory 站是横向 progress bar + 对话气泡堆积，这里是格子热力图
 *   - 警戒线：50% / 75% / 100%
 *
 * 关键洞察：context window 看上去 200K 大，但 10 轮工具调用 ≈ 2 万；30 轮就摸 6 万。
 */
import React, { useMemo, useState } from "react";
import { AlertTriangle, Cpu } from "lucide-react";

const CONTEXT_LIMIT = 200_000; // 假设用 Claude 200K 那档（演示更直观）
const GRID_COLS = 25;
const GRID_ROWS = 8; // 25 × 8 = 200 cells，每 cell = 1K tokens
const CELL_TOKENS = CONTEXT_LIMIT / (GRID_COLS * GRID_ROWS); // 1000

const SYSTEM_TOKENS = 600;
const TOOL_SCHEMAS_TOKENS = 5_400; // 工具定义（5-6 个工具的 schema 通常这个量）
const PER_TURN = {
  user: 80,
  assistant: 400,
  toolResult: 1200, // cat 一个文件 / ls 一个目录 / 一段日志，常态
};
const PER_TURN_TOKENS = PER_TURN.user + PER_TURN.assistant + PER_TURN.toolResult;

type Zone = {
  label: string;
  tokens: number;
  fill: string;
  text: string;
};

const SectionFillSpeed: React.FC = () => {
  const [turns, setTurns] = useState(8);

  const data = useMemo(() => {
    const used = SYSTEM_TOKENS + TOOL_SCHEMAS_TOKENS + turns * PER_TURN_TOKENS;
    const overflow = Math.max(0, used - CONTEXT_LIMIT);
    const usedClamped = Math.min(used, CONTEXT_LIMIT);
    const pct = (used / CONTEXT_LIMIT) * 100;

    // 五段：system / tools / history-user / history-asst / history-tool / free
    const sysCells = SYSTEM_TOKENS / CELL_TOKENS;
    const toolSchemaCells = TOOL_SCHEMAS_TOKENS / CELL_TOKENS;
    const userCells = (turns * PER_TURN.user) / CELL_TOKENS;
    const asstCells = (turns * PER_TURN.assistant) / CELL_TOKENS;
    const toolResultCells = (turns * PER_TURN.toolResult) / CELL_TOKENS;

    const zones: Zone[] = [
      { label: "SYSTEM", tokens: SYSTEM_TOKENS, fill: "#1B4B5A", text: "#FBEFE3" },
      { label: "TOOLS", tokens: TOOL_SCHEMAS_TOKENS, fill: "#E07A5F", text: "#FBEFE3" },
      { label: "USER 轮", tokens: turns * PER_TURN.user, fill: "#FF4D74", text: "#FBEFE3" },
      { label: "ASSISTANT", tokens: turns * PER_TURN.assistant, fill: "#F4D35E", text: "#241C15" },
      { label: "TOOL 回声", tokens: turns * PER_TURN.toolResult, fill: "#7A28CB", text: "#FBEFE3" },
    ];

    // 网格：每个 cell 按 token 累计映射到一种颜色
    const totalCells = GRID_COLS * GRID_ROWS;
    const zoneCellCounts = [sysCells, toolSchemaCells, userCells, asstCells, toolResultCells];
    const cells: Array<{ fill: string; intensity: number }> = [];
    let absorbedTokens = 0;
    let zoneIdx = 0;
    let zoneRemaining = zoneCellCounts[0];

    for (let i = 0; i < totalCells; i++) {
      if (absorbedTokens >= usedClamped) {
        cells.push({ fill: "transparent", intensity: 0 });
        continue;
      }
      // 找当前 cell 落在哪个 zone
      while (zoneRemaining <= 0 && zoneIdx < zoneCellCounts.length - 1) {
        zoneIdx++;
        zoneRemaining = zoneCellCounts[zoneIdx];
      }
      const zone = zones[zoneIdx];
      // 这格被填满还是部分？
      let intensity = 1;
      if (zoneRemaining < 1 && zoneRemaining > 0) {
        intensity = zoneRemaining;
        zoneRemaining = 0;
        absorbedTokens += intensity * CELL_TOKENS;
      } else {
        zoneRemaining -= 1;
        absorbedTokens += CELL_TOKENS;
      }
      cells.push({ fill: zone.fill, intensity });
    }

    return { used, overflow, usedClamped, pct, zones, cells };
  }, [turns]);

  const crowded = data.pct > 75 && data.pct < 100;
  const overflowing = data.used > CONTEXT_LIMIT;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24 bg-cream border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">Fill speed · 烧得多快</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          200K 听上去很大，
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">10 轮工具调用就吃 2 万</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[800px]">
          假设你在跑一个编程 Agent，每轮里包含一次工具调用（cat 一个文件、ls 一个目录、跑一遍测试）。
          每轮新增 ≈ {PER_TURN_TOKENS.toLocaleString()} tokens：user 提问 {PER_TURN.user}、模型回 {PER_TURN.assistant}、工具结果 {PER_TURN.toolResult}。
          再加上 system + 工具 schema 一开始就常驻的{(SYSTEM_TOKENS + TOOL_SCHEMAS_TOKENS).toLocaleString()} tokens。
          <span className="font-bold text-ink"> 拖一下下面这条，看格子怎么涨。</span>
        </p>

        {/* 主控制 */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左：slider + 数字 */}
          <div className="lg:col-span-4 space-y-5">
            <div className="card-stamp p-6">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-3">
                工具调用轮数
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-display font-extrabold text-[40px] text-ink leading-none">
                  {turns}
                </span>
                <span className="font-mono text-[11px] text-ink/55">/ 60 轮</span>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                value={turns}
                onChange={(e) => setTurns(Number(e.target.value))}
                className="w-full accent-coral cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-ink/45 mt-1">
                <span>0</span>
                <span>15</span>
                <span>30</span>
                <span>45</span>
                <span>60</span>
              </div>
            </div>

            {/* 累计数字 */}
            <div className="card-stamp p-6">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-2">
                CONTEXT 占用
              </div>
              <div className="font-display font-extrabold text-[28px] text-ink leading-none">
                {Math.round(data.pct)}
                <span className="font-mono text-[16px] font-bold text-ink/55">%</span>
              </div>
              <div className="font-mono text-[12px] text-ink/65 mt-1">
                {data.used.toLocaleString()} / {CONTEXT_LIMIT.toLocaleString()} tokens
              </div>

              {/* 警戒状态 */}
              <div className="mt-4 pt-4 border-t-2 border-dashed border-ink/20">
                {overflowing ? (
                  <div className="flex items-center gap-2 font-mono text-[12px] font-bold text-pop">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    撑爆 · 多出 {(data.used - CONTEXT_LIMIT).toLocaleString()}t
                  </div>
                ) : crowded ? (
                  <div className="flex items-center gap-2 font-mono text-[12px] font-bold text-coral">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    挤了 · 模型开始忘前面
                  </div>
                ) : data.pct > 50 ? (
                  <div className="flex items-center gap-2 font-mono text-[12px] font-bold text-ink">
                    <Cpu className="w-3.5 h-3.5" />
                    过半 · 该考虑清理工具回声了
                  </div>
                ) : (
                  <div className="font-mono text-[12px] text-ink/55">
                    还有空 · 正常进行
                  </div>
                )}
              </div>
            </div>

            {/* 分项明细 */}
            <div className="card-stamp p-5">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-2.5">
                占用拆解
              </div>
              <div className="space-y-1.5">
                {data.zones.map((z) => (
                  <div key={z.label} className="flex items-center gap-2 font-mono text-[11px]">
                    <span
                      className="w-3 h-3 rounded-sm border border-ink"
                      style={{ backgroundColor: z.fill }}
                    />
                    <span className="text-ink/75 flex-1">{z.label}</span>
                    <span className="text-ink font-bold">{z.tokens.toLocaleString()}t</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右：格子热图 */}
          <div className="lg:col-span-8">
            <div className="card-stamp p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
                  CONTEXT 网格 · 1 格 = 1K tokens · 共 200 格
                </span>
                <span className="font-mono text-[11px] text-ink/55">
                  Claude 200K · 演示用
                </span>
              </div>

              <div
                className="grid gap-[3px] p-3 bg-cream border-2 border-ink rounded-xl"
                style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
              >
                {data.cells.map((cell, i) => {
                  // 警戒线：50% / 75% 处加一道分隔
                  const isFiftyEdge = i === GRID_COLS * 4 - 1; // 100 cell
                  const isSeventyFiveEdge = i === GRID_COLS * 6 - 1; // 150 cell
                  return (
                    <div
                      key={i}
                      className="relative aspect-square rounded-[3px] transition-all duration-300 ease-spring"
                      style={{
                        backgroundColor: cell.fill === "transparent" ? "#FBEFE3" : cell.fill,
                        opacity: cell.fill === "transparent" ? 1 : 0.25 + cell.intensity * 0.75,
                        boxShadow: cell.fill === "transparent" ? "inset 0 0 0 1px rgba(36,28,21,0.12)" : "none",
                      }}
                    >
                      {(isFiftyEdge || isSeventyFiveEdge) && (
                        <span
                          className="absolute right-[-2px] top-[-3px] bottom-[-3px] w-[2px] pointer-events-none"
                          style={{
                            backgroundColor: "#241C15",
                            opacity: 0.5,
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 标尺 / 警戒线提示 */}
              <div className="relative mt-2 grid grid-cols-4 font-mono text-[10px] text-ink/55">
                <span>0</span>
                <span className="text-center">50K · 半</span>
                <span className="text-center">100K · 50%</span>
                <span className="text-right">200K · 满</span>
              </div>

              {/* 关键观察卡片 */}
              <div className="mt-5 pt-4 border-t-2 border-dashed border-ink/20 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Observation
                  label="10 轮"
                  value={`${(10 * PER_TURN_TOKENS + SYSTEM_TOKENS + TOOL_SCHEMAS_TOKENS).toLocaleString()}t`}
                  hint="< 10% · 还轻松"
                  hot={turns >= 10}
                />
                <Observation
                  label="30 轮"
                  value={`${(30 * PER_TURN_TOKENS + SYSTEM_TOKENS + TOOL_SCHEMAS_TOKENS).toLocaleString()}t`}
                  hint="过 25% · 该想想了"
                  hot={turns >= 30}
                />
                <Observation
                  label="60 轮"
                  value={`${(60 * PER_TURN_TOKENS + SYSTEM_TOKENS + TOOL_SCHEMAS_TOKENS).toLocaleString()}t`}
                  hint="逼近 / 撑爆"
                  hot={turns >= 60}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 收尾洞察 */}
        <div className="mt-12 max-w-[820px] bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg px-7 py-6">
          <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-butter mb-1.5">
            真正吃掉 context 的是它
          </div>
          <p className="font-sans text-[15px] leading-[1.7]">
            不是 user / assistant 的对话本身 —— 单轮两段加起来才 500 tokens。
            <span className="font-bold text-butter"> 真正烧 context 的是工具结果回声</span>
            （cat 一个文件、grep 一段日志、ls 整个目录），单次就 1K 起步。
            十几轮过去，工具回声占 60% 是常态。第 06 节会讲怎么压它。
          </p>
        </div>
      </div>
    </section>
  );
};

const Observation: React.FC<{ label: string; value: string; hint: string; hot: boolean }> = ({
  label,
  value,
  hint,
  hot,
}) => (
  <div
    className={`border-2 border-ink rounded-xl px-3.5 py-3 transition-all duration-300 ${
      hot ? "bg-butter shadow-stamp" : "bg-white"
    }`}
  >
    <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/55">{label}</div>
    <div className="font-display font-extrabold text-[20px] text-ink leading-tight mt-0.5">
      {value}
    </div>
    <div className="font-mono text-[10.5px] text-ink/65 mt-0.5">{hint}</div>
  </div>
);

export default SectionFillSpeed;
