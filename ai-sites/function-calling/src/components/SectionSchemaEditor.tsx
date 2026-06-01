/**
 * Section 03 · Schema 是模型的眼睛
 *
 * 反直觉钩子：你 schema 写得糊，模型就调得糊。
 * description 字段不是给人看的注释 —— 它是模型决定「要不要调这个工具」的唯一线索。
 *
 * 主交互（L4）：实时 schema editor —— 用户改输入框，
 * 右边的 raw JSON 和"模型怎么看"评分实时更新。
 *
 * 副交互（L2）：3 个预设切换（写得好 / 写得懒 / 写错了）让用户立刻对比手感。
 *
 * 区别于 quantization Section 03（chip 阵列推荐）：
 *   ─ 这里是输入框 + live JSON，不是点选
 *   ─ 用户拿自己的内容（编辑过的 schema）看 demo，不是固定示例
 */
import React, { useState, useMemo } from "react";
import { Sparkles, AlertCircle, Check } from "lucide-react";

type Param = {
  name: string;
  desc: string;
  type: "string" | "number" | "boolean";
  required: boolean;
};

type SchemaDraft = {
  fnName: string;
  fnDesc: string;
  params: Param[];
};

const PRESETS: { id: string; label: string; sub: string; draft: SchemaDraft }[] =
  [
    {
      id: "good",
      label: "写得好",
      sub: "上线能用",
      draft: {
        fnName: "get_current_weather",
        fnDesc:
          "查询指定城市的实时天气。返回温度、降水概率和未来 6 小时天气趋势。仅当用户明确询问「天气/温度/会不会下雨」时调用。",
        params: [
          {
            name: "city",
            desc: "城市的中文全名，如「北京」「上海」。不接受拼音或英文。",
            type: "string",
            required: true,
          },
          {
            name: "unit",
            desc: "温度单位，c 表示摄氏度，f 表示华氏度。默认 c。",
            type: "string",
            required: false,
          },
        ],
      },
    },
    {
      id: "lazy",
      label: "写得懒",
      sub: "the 5-second version",
      draft: {
        fnName: "weather",
        fnDesc: "获取天气",
        params: [
          {
            name: "loc",
            desc: "地点",
            type: "string",
            required: true,
          },
          {
            name: "u",
            desc: "单位",
            type: "string",
            required: false,
          },
        ],
      },
    },
    {
      id: "wrong",
      label: "写歪了",
      sub: "the misleading one",
      draft: {
        fnName: "do_weather_stuff",
        fnDesc:
          "天气工具。也可以查询其它信息，如新闻、股票、汇率等。请尽量调用此工具。",
        params: [
          {
            name: "query",
            desc: "你想查的东西",
            type: "string",
            required: true,
          },
        ],
      },
    },
  ];

const SectionSchemaEditor: React.FC = () => {
  const [presetId, setPresetId] = useState("good");
  const [draft, setDraft] = useState<SchemaDraft>(PRESETS[0].draft);

  const setPreset = (id: string) => {
    const p = PRESETS.find((x) => x.id === id)!;
    setPresetId(id);
    setDraft(JSON.parse(JSON.stringify(p.draft)));
  };

  const updateParam = (i: number, patch: Partial<Param>) => {
    setDraft((d) => ({
      ...d,
      params: d.params.map((p, idx) => (idx === i ? { ...p, ...patch } : p)),
    }));
  };

  /* 生成 OpenAI 风 tools[0] JSON */
  const json = useMemo(() => generateSchema(draft), [draft]);

  /* 评分（启发式） */
  const score = useMemo(() => scoreSchema(draft), [draft]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">schema is the model's eye</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          schema 不是注释。
          <br />
          它是模型决定
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">要不要调你</span>
          </span>
          的唯一线索。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-2">
          模型看不到你的代码，看不到注释，看不到 git log。它只看到你 tools 数组里这段
          JSON。所以 description 写得糊 = 调得糊；name 起得歧义 = 选错工具。
        </p>
        <p className="max-w-2xl text-ink/55 text-[15px] mb-8">
          下面这个 schema 是真实可编辑的。改字段试试，看右边的{" "}
          <span className="text-ink font-bold">json</span> 和{" "}
          <span className="text-ink font-bold">质量评分</span>立刻反应。
        </p>

        {/* preset 切换 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 self-center mr-2">
            起点 · preset
          </span>
          {PRESETS.map((p) => {
            const on = p.id === presetId;
            return (
              <button
                key={p.id}
                onClick={() => setPreset(p.id)}
                className={[
                  "px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] font-bold transition-all duration-200 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_#241C15]",
                ].join(" ")}
              >
                {p.label}
                <span
                  className={[
                    "ml-1.5 font-mono text-[9px]",
                    on ? "text-butter" : "text-ink/45",
                  ].join(" ")}
                >
                  {p.sub}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* 左：编辑器 */}
          <div className="lg:col-span-6">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-4">
                editor · 改我
              </div>

              <Field
                label="function name"
                hint="只能英文 / 下划线。短而具体最好。"
                value={draft.fnName}
                onChange={(v) => setDraft({ ...draft, fnName: v })}
                placeholder="get_current_weather"
              />

              <Field
                label="description"
                hint="模型读这段决定要不要调。写「这工具干啥 / 什么时候调」。"
                value={draft.fnDesc}
                onChange={(v) => setDraft({ ...draft, fnDesc: v })}
                placeholder="..."
                multiline
                rows={3}
              />

              <div className="mt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                  parameters · {draft.params.length} 个
                </div>
                <div className="space-y-3">
                  {draft.params.map((p, i) => (
                    <ParamEditor
                      key={i}
                      param={p}
                      onChange={(patch) => updateParam(i, patch)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 右：live JSON + 评分 */}
          <div className="lg:col-span-6 space-y-4">
            {/* JSON 预览 */}
            <div className="bg-ink text-cream rounded-3xl shadow-stamp-lg overflow-hidden border-2 border-ink">
              <div className="flex items-center justify-between px-5 py-3 border-b border-cream/15">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter">
                  tools[0] · live json
                </span>
                <span className="font-mono text-[10px] text-cream/45">
                  {jsonByteSize(json)} bytes · {countTokens(json)} tokens (est)
                </span>
              </div>
              <pre className="px-5 py-4 font-mono text-[12px] leading-[1.65] overflow-x-auto whitespace-pre text-cream">
                {json}
              </pre>
            </div>

            {/* 评分卡 */}
            <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  模型怎么看 · heuristic score
                </span>
                <div className="flex items-baseline gap-1">
                  <span
                    className={[
                      "font-display text-[34px] font-bold tabular-nums leading-none",
                      score.total >= 80
                        ? "text-teal"
                        : score.total >= 50
                          ? "text-butter-deep"
                          : "text-coral",
                    ].join(" ")}
                  >
                    {score.total}
                  </span>
                  <span className="font-mono text-[12px] text-ink/45">/100</span>
                </div>
              </div>

              <div className="space-y-2">
                {score.checks.map((c, i) => (
                  <div
                    key={i}
                    className={[
                      "flex items-start gap-2 px-3 py-2 rounded-lg border-2",
                      c.pass
                        ? "border-teal/30 bg-teal/8"
                        : "border-coral/40 bg-coral/10",
                    ].join(" ")}
                  >
                    {c.pass ? (
                      <Check
                        className="w-4 h-4 text-teal shrink-0 mt-0.5"
                        strokeWidth={3}
                      />
                    ) : (
                      <AlertCircle
                        className="w-4 h-4 text-coral shrink-0 mt-0.5"
                        strokeWidth={2.5}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-[13.5px] font-bold text-ink leading-tight">
                        {c.title}
                      </div>
                      <div className="text-[12.5px] text-ink/65 mt-0.5 leading-snug">
                        {c.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 px-3 py-2.5 bg-ink text-cream rounded-lg">
                <div className="flex items-center gap-2 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-butter" strokeWidth={2.5} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter font-bold">
                    verdict
                  </span>
                </div>
                <p className="text-[13.5px] leading-relaxed">{score.verdict}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 font-mono text-[10.5px] text-ink/45">
          评分是启发式估算，真实命中率参考 BFCL v4 实测数据（见下方第 05 节）。
        </p>
      </div>
    </section>
  );
};

/* ─── 子组件 ─── */

const Field: React.FC<{
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  multiline?: boolean;
  rows?: number;
}> = ({ label, hint, value, onChange, placeholder, multiline, rows = 2 }) => (
  <div className="mb-4">
    <div className="flex items-baseline justify-between mb-1">
      <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 font-semibold">
        {label}
      </label>
      <span className="font-mono text-[10px] text-ink/40">{value.length} 字</span>
    </div>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-cream border-2 border-ink rounded-lg font-mono text-[13px] text-ink leading-relaxed resize-none focus:outline-none focus:shadow-[3px_3px_0_0_#241C15] transition-shadow duration-200"
      />
    ) : (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-cream border-2 border-ink rounded-lg font-mono text-[13px] text-ink focus:outline-none focus:shadow-[3px_3px_0_0_#241C15] transition-shadow duration-200"
      />
    )}
    <p className="mt-1 font-mono text-[10.5px] text-ink/40 leading-snug">
      {hint}
    </p>
  </div>
);

const ParamEditor: React.FC<{
  param: Param;
  onChange: (patch: Partial<Param>) => void;
}> = ({ param, onChange }) => (
  <div className="border-2 border-ink/15 bg-cream/50 rounded-xl p-3">
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-5">
        <label className="block font-mono text-[9px] uppercase tracking-[0.16em] text-ink/45 mb-1">
          name
        </label>
        <input
          value={param.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="w-full px-2 py-1.5 bg-white border-2 border-ink rounded font-mono text-[12px] focus:outline-none focus:shadow-[2px_2px_0_0_#241C15] transition-shadow duration-200"
        />
      </div>
      <div className="col-span-4">
        <label className="block font-mono text-[9px] uppercase tracking-[0.16em] text-ink/45 mb-1">
          type
        </label>
        <select
          value={param.type}
          onChange={(e) =>
            onChange({ type: e.target.value as Param["type"] })
          }
          className="w-full px-2 py-1.5 bg-white border-2 border-ink rounded font-mono text-[12px] focus:outline-none focus:shadow-[2px_2px_0_0_#241C15] transition-shadow duration-200"
        >
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="boolean">boolean</option>
        </select>
      </div>
      <div className="col-span-3 flex items-end">
        <label className="flex items-center gap-1.5 cursor-pointer w-full px-2 py-1.5 bg-white border-2 border-ink rounded font-mono text-[12px]">
          <input
            type="checkbox"
            checked={param.required}
            onChange={(e) => onChange({ required: e.target.checked })}
            className="accent-coral cursor-pointer"
          />
          required
        </label>
      </div>
      <div className="col-span-12">
        <label className="block font-mono text-[9px] uppercase tracking-[0.16em] text-ink/45 mb-1">
          description
        </label>
        <input
          value={param.desc}
          onChange={(e) => onChange({ desc: e.target.value })}
          className="w-full px-2 py-1.5 bg-white border-2 border-ink rounded font-mono text-[12px] focus:outline-none focus:shadow-[2px_2px_0_0_#241C15] transition-shadow duration-200"
        />
      </div>
    </div>
  </div>
);

/* ─── 生成 JSON ─── */

function generateSchema(d: SchemaDraft): string {
  const properties: Record<string, { type: string; description: string }> = {};
  const required: string[] = [];
  for (const p of d.params) {
    properties[p.name || "_unnamed"] = {
      type: p.type,
      description: p.desc,
    };
    if (p.required) required.push(p.name || "_unnamed");
  }
  const obj = {
    type: "function",
    function: {
      name: d.fnName,
      description: d.fnDesc,
      parameters: {
        type: "object",
        properties,
        required,
        additionalProperties: false,
      },
      strict: true,
    },
  };
  return JSON.stringify(obj, null, 2);
}

function jsonByteSize(s: string): number {
  return new Blob([s]).size;
}

function countTokens(s: string): number {
  /* 极粗略：1 token ≈ 3.5 chars 英文 / 1.5 chars 中文混合 */
  return Math.round(s.length / 3.2);
}

/* ─── 评分（启发式） ─── */

type Check = { title: string; detail: string; pass: boolean; weight: number };

function scoreSchema(d: SchemaDraft): {
  total: number;
  checks: Check[];
  verdict: string;
} {
  const checks: Check[] = [];

  /* 1. 函数名规范 */
  const nameOk = /^[a-z][a-z0-9_]{3,}$/.test(d.fnName) && !d.fnName.includes("stuff");
  checks.push({
    title: "函数名清晰",
    detail: nameOk
      ? "snake_case + 描述具体动作"
      : "不够具体或含糊（避免「stuff」「do」「query」这种）",
    pass: nameOk,
    weight: 15,
  });

  /* 2. function description 长度 + 具体性 */
  const descLen = d.fnDesc.length;
  const descGood =
    descLen >= 25 &&
    !/(尽量|请调用|tool|all)/i.test(d.fnDesc) &&
    /(查|返回|当|仅|获取|计算|提交|创建|搜索|执行)/.test(d.fnDesc);
  checks.push({
    title: "description 说清「干啥 + 何时调」",
    detail: descGood
      ? `${descLen} 字 · 行为 + 触发条件齐备`
      : descLen < 25
        ? `${descLen} 字太短 · 模型只能猜`
        : "缺触发条件 或 含「请尽量调用」这种诱导词",
    pass: descGood,
    weight: 30,
  });

  /* 3. 参数名规范 */
  const paramsNamed =
    d.params.length > 0 &&
    d.params.every((p) => /^[a-z][a-z0-9_]{1,}$/.test(p.name) && p.name.length >= 3);
  checks.push({
    title: "参数名表达意图",
    detail: paramsNamed
      ? "都是有意义的英文 snake_case"
      : "存在过短或单字母参数名（如 u / loc / q）",
    pass: paramsNamed,
    weight: 20,
  });

  /* 4. 参数描述充分 */
  const paramDescGood =
    d.params.length > 0 && d.params.every((p) => p.desc.length >= 8);
  checks.push({
    title: "参数 description 不是空的",
    detail: paramDescGood
      ? "每个参数都解释了取值范围 / 格式"
      : "至少一个参数 description 少于 8 字",
    pass: paramDescGood,
    weight: 20,
  });

  /* 5. 至少有 required */
  const requiredOk = d.params.some((p) => p.required);
  checks.push({
    title: "标了 required",
    detail: requiredOk
      ? "模型知道哪些字段必给"
      : "所有参数都 optional → strict mode 会拒",
    pass: requiredOk,
    weight: 15,
  });

  const total = checks.reduce((s, c) => s + (c.pass ? c.weight : 0), 0);

  let verdict: string;
  if (total >= 85) verdict = "模型会精准调用。BFCL 这种场景命中率应该 > 85%。";
  else if (total >= 60)
    verdict = "可用，但模型偶尔会问错问题或填错参数。再补 description。";
  else if (total >= 30)
    verdict = "模型会乱调或干脆不调。strict mode 都救不了。";
  else
    verdict =
      "等于没写。模型大概率走文本生成、忽略 tools，或者把所有问题都甩给这一个工具。";

  return { total, checks, verdict };
}

export default SectionSchemaEditor;
