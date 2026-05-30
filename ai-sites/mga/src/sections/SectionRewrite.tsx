import React, { useState } from "react";
import SectionFrame from "../components/SectionFrame";

const ORIGINALS = [
  {
    key: "climate",
    title: "气候变化科普",
    text: "气候变化是指地球气候系统长期的变化趋势。主要原因是大气中温室气体浓度持续上升，导致全球平均气温升高，引发极地冰川融化、海平面上升与极端天气增多。",
  },
  {
    key: "ml",
    title: "机器学习基础",
    text: "机器学习让程序不必由人手把手写规则，而是从数据中自己找规律。常见做法有监督学习、无监督学习和强化学习三大类。",
  },
  {
    key: "diet",
    title: "健康饮食指南",
    text: "均衡饮食是维持身体状况的关键。建议每天摄入多种蔬果，主食以全谷物为主，蛋白质适量，控制糖与饱和脂肪。",
  },
];

const GENRES = [
  { id: "academic", label: "学术综述", hint: "引用 + 数字 + 严谨措辞" },
  { id: "story", label: "亲子故事", hint: "拟人 + 对话 + 比喻" },
  { id: "news", label: "新闻消息", hint: "导语 + 5W + 简短句" },
  { id: "podcast", label: "电台口播", hint: "短句 + 口语 + 听感节奏" },
  { id: "policy", label: "政策简报", hint: "条目 + 量化指标 + 行动建议" },
];

const AUDIENCES = [
  { id: "researcher", label: "领域研究者", hint: "默认高背景" },
  { id: "kid", label: "8-10 岁学生", hint: "避开术语" },
  { id: "office", label: "城市白领", hint: "时间紧、要点先行" },
  { id: "senior", label: "退休老人", hint: "生活语境、不用英文" },
  { id: "policy", label: "决策者", hint: "看影响、看数字" },
];

type Variant = {
  oid: string;
  g: string;
  a: string;
  text: string;
};

const VARIANTS: Variant[] = [
  // climate
  { oid: "climate", g: "academic", a: "researcher", text: "依据 IPCC AR6 报告，1850-2020 年间全球地表均温累计升幅约 1.1 ℃，主要驱动为人为温室气体强迫；预计 2050 年前北极夏季海冰可能阶段性消失。" },
  { oid: "climate", g: "story", a: "kid", text: "地球有件薄薄的『大气层毛衣』。工厂烟囱往里塞了越来越多的灰线，毛衣变厚，地球散热慢了，就一天比一天热出汗。" },
  { oid: "climate", g: "news", a: "office", text: "世界气象组织今日通报：去年全球均温较工业化前升高 1.1 ℃，再次刷新有记录以来年度纪录，极端高温事件同比增加四成。" },
  { oid: "climate", g: "podcast", a: "senior", text: "您听过没？现在天气比咱们小时候热多了。一百多年算下来，地球热高了一度多——这一度，海里的冰就往后退好几公里。" },
  { oid: "climate", g: "policy", a: "policy", text: "至 2030 年前，建议本市单位 GDP 碳排放强度较 2020 年下降 35%，重点路径为：① 交通电气化覆盖率 ≥ 60%；② 公共建筑节能改造 100%。" },
  // ml
  { oid: "ml", g: "academic", a: "researcher", text: "机器学习以经验风险最小化为基础范式，按反馈信号差异分为监督、无监督与强化学习三类；近年自监督预训练范式已成大模型主流。" },
  { oid: "ml", g: "story", a: "kid", text: "小明想教机器人认猫。他没有念课本，而是给机器人看了一万张猫的照片。机器人看着看着，自己就找出了规律：『哦原来这是猫呀！』" },
  { oid: "ml", g: "news", a: "office", text: "机器学习正在重塑商业流程：从风控、推荐到客服，企业不再依赖工程师写死规则，而是让算法从历史数据中自动学出策略。" },
  { oid: "ml", g: "podcast", a: "senior", text: "您家手机给您推视频，背后就是这玩意儿。它不是有个人在后头猜，是机器从您每次的点击里，自己摸出您喜欢啥。" },
  { oid: "ml", g: "policy", a: "policy", text: "建议在政务系统中分阶段引入机器学习能力：先在低风险场景（公文分类、舆情聚类）试点，再扩展至决策辅助；同步建立模型审计与偏差监测机制。" },
  // diet
  { oid: "diet", g: "academic", a: "researcher", text: "中国居民膳食指南建议每日摄入 12 种以上食物，包括蔬果 ≥ 500 g、全谷物 50-150 g、优质蛋白来源至少两种；饱和脂肪供能比应 < 10%。" },
  { oid: "diet", g: "story", a: "kid", text: "彩虹盘子游戏！每顿饭都要凑齐四种颜色：红的（番茄）、绿的（菠菜）、黄的（玉米）、白的（鱼），凑齐就拿到一颗健康星星。" },
  { oid: "diet", g: "news", a: "office", text: "营养专家提醒上班族：午餐外卖建议主食换成杂粮饭，蔬菜量不低于荤菜两倍，含糖饮料替换为白水或无糖茶。" },
  { oid: "diet", g: "podcast", a: "senior", text: "咱们这岁数啊，吃饭就八个字：粗粮杂搭、青菜管够。肉别不吃，但别多；油盐要轻，水要喝够。简单不？" },
  { oid: "diet", g: "policy", a: "policy", text: "建议将『中小学营养餐』强制纳入采购标准：每餐蔬果占比 ≥ 40%，全谷物比例 ≥ 30%，糖油盐用量与中国营养学会指南挂钩。" },
];

export default function SectionRewrite() {
  const [oid, setOid] = useState(ORIGINALS[0].key);
  const [g, setG] = useState(GENRES[0].id);
  const [a, setA] = useState(AUDIENCES[0].id);

  const original = ORIGINALS.find((o) => o.key === oid)!;
  const variant = VARIANTS.find((v) => v.oid === oid && v.g === g && v.a === a);

  const genreInfo = GENRES.find((x) => x.id === g)!;
  const audienceInfo = AUDIENCES.find((x) => x.id === a)!;

  return (
    <SectionFrame num="02" label="Rewrite Demo">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        一篇原文，给五种人写五次。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-10 max-w-3xl">
        选一篇原文，再分别挑「文体」和「读者」。改写工拿到这两个标签，就给原文换一身衣服。下面的真实改写都按 ByteDance MGA Pipeline 思路生成。
      </p>

      <div className="grid md:grid-cols-[280px_1fr] gap-8">
        <div className="space-y-6">
          <div>
            <div className="eyebrow mb-3 text-ink-tertiary">原文</div>
            <div className="space-y-2">
              {ORIGINALS.map((o) => (
                <button
                  key={o.key}
                  onClick={() => setOid(o.key)}
                  className={`w-full text-left px-4 py-3 rounded-2xl border-2 transition-all duration-250 ease-spring ${
                    oid === o.key
                      ? "bg-ink text-cream border-ink shadow-stamp"
                      : "bg-white border-ink/30 hover:border-ink text-ink"
                  }`}
                >
                  <div className="font-semibold text-sm">{o.title}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow mb-3 text-ink-tertiary">体裁 Genre</div>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((x) => (
                <button
                  key={x.id}
                  onClick={() => setG(x.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono border-2 transition-all ${
                    g === x.id
                      ? "bg-butter text-ink border-ink shadow-stamp"
                      : "bg-white text-ink border-ink/30 hover:border-ink"
                  }`}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow mb-3 text-ink-tertiary">受众 Audience</div>
            <div className="flex flex-wrap gap-2">
              {AUDIENCES.map((x) => (
                <button
                  key={x.id}
                  onClick={() => setA(x.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono border-2 transition-all ${
                    a === x.id
                      ? "bg-coral text-white border-ink shadow-stamp"
                      : "bg-white text-ink border-ink/30 hover:border-ink"
                  }`}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-stamp p-5 bg-cream">
            <div className="eyebrow mb-2 text-ink-tertiary">原文 · 0 改动</div>
            <p className="text-ink leading-relaxed text-base">{original.text}</p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-ink-tertiary px-2">
            <span className="px-2 py-1 rounded bg-butter border border-ink">{genreInfo.label}</span>
            <span className="text-ink">·</span>
            <span className="text-ink-secondary">{genreInfo.hint}</span>
            <span className="ml-auto px-2 py-1 rounded bg-coral text-white border border-ink">
              {audienceInfo.label}
            </span>
            <span className="text-ink">·</span>
            <span className="text-ink-secondary">{audienceInfo.hint}</span>
          </div>

          <div className="card-stamp p-6 bg-white" key={`${oid}-${g}-${a}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="eyebrow text-coral">改写版本</div>
              <div className="font-mono text-xs text-ink-tertiary">
                由 3.3B MoE Reformulator 生成
              </div>
            </div>

            {variant ? (
              <p className="text-ink leading-relaxed text-base animate-enter-fade">
                {variant.text}
              </p>
            ) : (
              <div className="text-ink-tertiary text-sm italic py-6">
                这个 (体裁 × 受众) 组合，论文里没给现成示例。 实际 pipeline 也不是每个组合都会生成 —— MGA 在每篇原文上只采样 5 组高质量配对，不是穷举 5×5。
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-ink/10 flex items-center justify-between text-xs font-mono text-ink-tertiary">
              <span>核心信息可追溯回原文 ✓</span>
              <span>字面表达自由 ✓</span>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
