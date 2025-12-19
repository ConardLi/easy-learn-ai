import React from 'react';
import { SlideData, SlideType } from './types';
import { 
  Target, 
  TrendingUp, 
  Brain, 
  Zap, 
  Hammer, 
  ShieldCheck, 
  HeartHandshake, 
  AlertTriangle,
  CheckCircle2,
  Quote
} from 'lucide-react';

export const SUMMARY_SLIDES: SlideData[] = [
  // --- PART 11: Summary Title ---
  {
    id: 'summary-title',
    type: SlideType.TITLE,
    title: '第四部分：最终总结',
    subtitle: '不仅仅是分数的竞赛，更是人类认知边界的探索',
  },

  // --- Reflection Intro ---
  {
    id: 'summary-reflection',
    type: SlideType.CONTENT_TEXT,
    title: 'AI 届的“军备竞赛”？',
    subtitle: 'Looking beyond the scores',
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-8">
         <div className="p-8 bg-white/5 border border-white/10 rounded-xl max-w-4xl relative">
            <Quote className="absolute -top-6 -left-6 text-blue-500/20 w-16 h-16 transform rotate-180" />
            <p className="text-2xl text-gray-300 leading-relaxed text-center font-light italic">
               “当我们看完这琳琅满目的榜单、复杂的缩写和不断飙升的分数，你可能会有一种感觉：<br/>
               <span className="text-white font-bold not-italic mt-2 block">这不就是 AI 届的军备竞赛吗？</span>”
            </p>
            <Quote className="absolute -bottom-6 -right-6 text-blue-500/20 w-16 h-16" />
         </div>
         <p className="text-lg text-gray-400 text-center max-w-3xl border-t border-gray-700 pt-6">
            没错，但这不仅是分数的竞赛，更是人类认知边界的竞赛。<br/>
            在结束之际，有三点思考想分享给大家，希望能帮你在这个“刷榜”的时代保持清醒。
         </p>
      </div>
    )
  },

  // --- Point 1: Goodhart's Law ---
  {
    id: 'goodharts-law',
    type: SlideType.CONTENT_TEXT,
    title: '1. 警惕“古德哈特定律”',
    subtitle: "When a measure becomes a target, it ceases to be a good measure.",
    content: (
      <div className="flex flex-col gap-8 h-full justify-center items-center">
         <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Visual: Target being destroyed */}
            <div className="relative group">
               <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse"></div>
               {/* The Target */}
               <Target size={140} className="text-gray-600 relative z-10 opacity-50" />
               
               {/* The Arrow (Metric) missing the point but hitting the score */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <TrendingUp size={80} className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] transform -rotate-12" />
               </div>
               
               <div className="absolute -bottom-8 w-full text-center text-red-400 font-mono text-xs">Target Fixation</div>
            </div>

            <div className="max-w-xl space-y-6">
               <div className="bg-slate-900/50 p-6 rounded-xl border-l-4 border-red-500 shadow-lg backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                     <AlertTriangle size={20} className="text-red-400" /> 指标异化
                  </h3>
                  <p className="text-gray-300">
                     当 MMLU 成为所有厂商追逐的唯一目标时，<span className="text-red-300 font-bold">刷题、污染数据</span>就不可避免。指标不再代表真实能力。
                  </p>
               </div>

               <div className="bg-slate-900/50 p-6 rounded-xl border-l-4 border-green-500 shadow-lg backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                     <CheckCircle2 size={20} className="text-green-400" /> 对分数“祛魅”
                  </h3>
                  <p className="text-gray-300">
                     90 分 vs 85 分的差距在体感上往往微乎其微。<br/>
                     <span className="text-green-300 font-bold">适合业务场景</span>（更便宜、更稳、更专）才是最好的。
                  </p>
               </div>
            </div>
         </div>
      </div>
    )
  },

  // --- Point 2: Evolution ---
  {
    id: 'evolution-doer',
    type: SlideType.PROCESS,
    title: '2. 从“做题家”到“实干家”',
    subtitle: '评估范式的彻底转变',
    items: [
      {
        title: '过去：考记忆',
        step: "Past",
        description: '“贝叶斯定理是什么？”\n考察知识储备 (Knowledge)。',
        icon: <Brain className="w-10 h-10 text-white" />,
        color: "bg-gray-700"
      },
      {
        title: '后来：考推理',
        step: "Recent",
        description: '“这道概率题怎么算？”\n考察逻辑推导 (Reasoning)。',
        icon: <Zap className="w-10 h-10 text-white" />,
        color: "bg-blue-600"
      },
      {
        title: '现在：考实战',
        step: "Future",
        description: '“分析数据、修好代码、发邮件。”\n考察 Agent 综合解决问题能力。',
        icon: <Hammer className="w-10 h-10 text-white" />,
        color: "bg-purple-600"
      }
    ]
  },

  // --- Point 3: Trust ---
  {
    id: 'trust-currency',
    type: SlideType.CONTENT_TEXT,
    title: '3. 信任：唯一的硬通货',
    subtitle: 'Competence (能力) vs Character (品格)',
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-10">
         <div className="relative w-full max-w-4xl mt-8">
            {/* Ceiling & Floor Metaphor */}
            <div className="flex justify-between items-end h-64 border-b-2 border-gray-600 px-10 relative">
               
               {/* Ceiling */}
               <div className="absolute top-0 w-full border-t-2 border-dashed border-gray-600 flex justify-center">
                  <span className="bg-slate-950 px-3 -mt-3 text-gray-400 text-sm tracking-wider uppercase">HLE: 智商上限 (Ceiling)</span>
               </div>

               {/* Floor */}
               <div className="absolute bottom-0 w-full flex justify-center">
                  <span className="bg-slate-950 px-3 -mb-8 text-blue-400 font-bold tracking-wider uppercase">Safety: 信任底线 (Floor)</span>
               </div>

               {/* Bar: Genius but Toxic */}
               <div className="w-1/3 mx-4 flex flex-col items-center group">
                  <div className="w-full bg-gradient-to-t from-red-900 to-red-600 h-[95%] rounded-t-xl relative opacity-60 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                      <div className="text-center text-red-100 font-bold text-xs opacity-0 group-hover:opacity-100">Score: 99.9</div>
                      <div className="text-center text-red-200 text-2xl font-black mb-2"><AlertTriangle className="inline mb-1"/></div>
                  </div>
                  <div className="mt-6 text-center">
                     <h4 className="text-red-500 font-bold text-xl">“有才无德”</h4>
                     <p className="text-gray-500 text-sm">Disaster</p>
                  </div>
               </div>

               {/* Bar: Trusted Partner */}
               <div className="w-1/3 mx-4 flex flex-col items-center group">
                  <div className="w-full bg-gradient-to-t from-green-900 to-green-500 h-[85%] rounded-t-xl relative shadow-[0_0_40px_rgba(34,197,94,0.3)] flex flex-col justify-between p-2">
                      <div className="absolute -top-12 w-full flex justify-center">
                         <ShieldCheck size={48} className="text-green-400 animate-bounce" />
                      </div>
                      <div className="text-center text-green-100 font-bold text-xs opacity-0 group-hover:opacity-100">Score: 90.0</div>
                      <div className="flex justify-center mb-2"><HeartHandshake className="text-white"/></div>
                  </div>
                  <div className="mt-6 text-center">
                     <h4 className="text-green-500 font-bold text-xl">“值得托付”</h4>
                     <p className="text-gray-500 text-sm">Partner</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="text-center max-w-3xl mt-4 bg-white/5 p-6 rounded-xl border border-white/5">
             <p className="text-lg text-gray-300 leading-relaxed">
                只有当我们确信一个模型既<span className="text-white font-bold">聪明</span>（高分）、又<span className="text-blue-400 font-bold">靠谱</span>（安全）、还<span className="text-purple-400 font-bold">懂人话</span>（对齐），<br/>
                我们才敢真正把方向盘交给它。
             </p>
         </div>
      </div>
    )
  }
];
