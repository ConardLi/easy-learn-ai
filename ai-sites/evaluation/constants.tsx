import React from 'react';
import { SlideData, SlideType } from './types';
import { 
  Cpu, 
  Code, 
  BrainCircuit, 
  Zap, 
  ShieldCheck, 
  Scale, 
  Trophy, 
  Search, 
  Users, 
  Bot,
  FileText,
  HelpCircle,
  BarChart3,
  BookOpen,
  Calculator,
  Terminal,
  GraduationCap,
  Github,
  Compass,
  RefreshCw,
  Target,
  FileCheck,
  ListOrdered,
  Globe,
  Languages,
  Library,
  ScrollText,
  AlertTriangle,
  TrendingUp,
  Check,
  X,
  Puzzle,
  SearchX,
  FlaskConical,
  MountainSnow,
  Skull,
  Lightbulb,
  Footprints,
  Ban,
  Grid,
  Box,
  LayoutGrid,
  Eye,
  Binary,
  ArrowDownToLine,
  Layers,
  Sparkles,
  ArrowRight,
  XCircle,
  CheckCircle2
} from 'lucide-react';
import { AGENT_SLIDES } from './agentSlides';
import { CODING_SLIDES } from './codingSlides';
import { VISION_SLIDES } from './visionSlides';
import { HUMAN_SLIDES } from './humanSlides';
import { SAFETY_SLIDES } from './safetySlides';
import { SUMMARY_SLIDES } from './summarySlides';

// Define the base slides first (Part 1 - Part 5)
const BASE_SLIDES: SlideData[] = [
  // --- PART 1 ---
  {
    id: 'intro-1',
    type: SlideType.TITLE,
    title: '大模型评估：解密黑盒',
    subtitle: 'Evaluation / Benchmark',
  },
  {
    id: 'intro-2',
    type: SlideType.CONTENT_TEXT,
    title: '年底的“神仙打架”',
    subtitle: 'Gemini 3.0 · Claude Opus 4.5 · GPT 5.2',
    content: (
      <div className="flex flex-col gap-8">
        <div className="text-lg text-gray-300 leading-relaxed">
           <p className="mb-2">
             AI 圈子热闹非凡，几大顶级模型几乎同时甩出“王炸”。大家都在发布会上晒出复杂的图表，异口同声地喊着自己是<span className="text-yellow-400 font-bold">世界第一</span>。
           </p>
        </div>
        
        {/* The 3 Models Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Model 1: Code */}
          <div className="relative group cursor-pointer perspective-1000">
            <div className="absolute inset-0 bg-blue-600 rounded-xl blur-lg opacity-20 group-hover:opacity-60 transition duration-500 group-hover:blur-2xl"></div>
            <div className="relative p-6 bg-slate-900 border border-blue-500/30 rounded-xl flex flex-col items-center text-center transition-all duration-300 ease-out transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:border-blue-400 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] group-hover:z-20 h-full">
               <div className="w-12 h-12 mb-4 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                 <Code size={24} />
               </div>
               <h3 className="font-bold text-xl text-white mb-2">Gemini 3.0</h3>
               <div className="w-full bg-slate-800 rounded h-1.5 mt-2 mb-3 overflow-hidden">
                  <div className="bg-blue-500 h-full w-[95%] shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
               </div>
               <p className="text-xs text-blue-200 mt-auto opacity-80 group-hover:opacity-100">"代码能力碾压对手"</p>
            </div>
          </div>

          {/* Model 2: Logic */}
          <div className="relative group cursor-pointer perspective-1000">
            <div className="absolute inset-0 bg-purple-600 rounded-xl blur-lg opacity-20 group-hover:opacity-60 transition duration-500 group-hover:blur-2xl"></div>
            <div className="relative p-6 bg-slate-900 border border-purple-500/30 rounded-xl flex flex-col items-center text-center transition-all duration-300 ease-out transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:border-purple-400 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] group-hover:z-20 h-full">
               <div className="w-12 h-12 mb-4 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                 <BrainCircuit size={24} />
               </div>
               <h3 className="font-bold text-xl text-white mb-2">Claude Opus 4.5</h3>
               <div className="w-full bg-slate-800 rounded h-1.5 mt-2 mb-3 overflow-hidden">
                  <div className="bg-purple-500 h-full w-[98%] shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
               </div>
               <p className="text-xs text-purple-200 mt-auto opacity-80 group-hover:opacity-100">"逻辑推理遥遥领先"</p>
            </div>
          </div>

          {/* Model 3: Overall */}
          <div className="relative group cursor-pointer perspective-1000">
             <div className="absolute inset-0 bg-emerald-600 rounded-xl blur-lg opacity-20 group-hover:opacity-60 transition duration-500 group-hover:blur-2xl"></div>
             <div className="relative p-6 bg-slate-900 border border-emerald-500/30 rounded-xl flex flex-col items-center text-center transition-all duration-300 ease-out transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:border-emerald-400 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] group-hover:z-20 h-full">
               <div className="w-12 h-12 mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                 <Zap size={24} />
               </div>
               <h3 className="font-bold text-xl text-white mb-2">GPT 5.2</h3>
               <div className="w-full bg-slate-800 rounded h-1.5 mt-2 mb-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[96%] shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
               </div>
               <p className="text-xs text-emerald-200 mt-auto opacity-80 group-hover:opacity-100">"综合实力世界第一"</p>
            </div>
          </div>

        </div>

        {/* The Problem / Confusion */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-start gap-4 hover:bg-white/10 hover:border-red-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]">
           <div className="p-3 bg-red-500/20 rounded-full text-red-400 shrink-0 animate-pulse">
             <HelpCircle size={24} />
           </div>
           <div>
             <h4 className="text-lg font-bold text-white mb-1">开发者的困惑</h4>
             <p className="text-gray-300 text-base italic mb-2">
               “你们到底是怎么比出来的？谁才是真强，谁是在吹牛？”
             </p>
             <div className="pt-2 border-t border-white/10 text-sm text-gray-400 flex items-center gap-2">
                <BarChart3 size={16} />
                <span>如果不搞清楚<span className="text-white font-semibold">大模型评估</span>，它们就是看不透的黑盒。</span>
             </div>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'why-1',
    type: SlideType.GRID_CARDS,
    title: 'Why: 为什么要做评估？',
    subtitle: '如果没有度量，就没有进步',
    items: [
      {
        title: '对比核心能力',
        description: '了解不同模型在知识、推理、编程等维度的相对强弱。',
        icon: <Trophy className="w-8 h-8 text-yellow-400" />
      },
      {
        title: '指导用户选择',
        description: '市面上几百个模型，量化的分数决定把钱付给谁。',
        icon: <Search className="w-8 h-8 text-blue-400" />
      },
      {
        title: '评估训练成果',
        description: '参数修改或新数据输入后，是变聪明了还是变笨了？防止盲人摸象。',
        icon: <Cpu className="w-8 h-8 text-emerald-400" />
      },
      {
        title: '指引技术迭代',
        description: '发现逻辑推理或代码能力的短板，明确下一步优化的方向。',
        icon: <BrainCircuit className="w-8 h-8 text-purple-400" />
      }
    ]
  },
  {
    id: 'what-1',
    type: SlideType.LIST_FEATURES,
    title: 'What: 该评估什么？',
    subtitle: '以前觉得能聊天就行，现在的维度非常细',
    items: [
      {
        title: '基础能力',
        desc: '语言理解、知识储备、翻译',
        icon: <FileText className="w-6 h-6 text-gray-300" />
      },
      {
        title: '推理能力',
        desc: '数学题能不能做对，逻辑陷阱能不能识破',
        icon: <BrainCircuit className="w-6 h-6 text-pink-400" />
      },
      {
        title: '垂直能力',
        desc: '写代码、看医疗报告、写法律文书',
        icon: <Code className="w-6 h-6 text-blue-400" />
      },
      {
        title: '应用与对齐',
        desc: '遵循指令、工具调用，关系到真实场景实用性',
        icon: <Zap className="w-6 h-6 text-yellow-400" />
      },
      {
        title: '安全性与对齐',
        desc: '拒绝有害信息、避免幻觉、防止偏见',
        icon: <ShieldCheck className="w-6 h-6 text-red-400" />
      }
    ]
  },
  {
    id: 'how-1',
    type: SlideType.COMPARISON,
    title: 'How: 怎么评估？',
    subtitle: '从标准化考试到“AI 裁判”',
    items: [
      {
        title: '固定答案评估',
        badge: '最常见',
        content: '模型在固定考题作答（选择/填空），程序自动判分。',
        pros: ['速度快', '成本低'],
        cons: ['灵活性差', '无法评判开放问题'],
        icon: <FileText className="w-10 h-10 mb-4 mx-auto text-blue-400" />
      },
      {
        title: '基于模型 (LLM-as-Judge)',
        badge: '最高效',
        content: '请更强的模型（如 GPT-4）当“老师”，给小模型的作文打分。',
        pros: ['适合长文本', '自动化程度高'],
        cons: ['存在偏见', '裁判本身可能有瓶颈'],
        icon: <Bot className="w-10 h-10 mb-4 mx-auto text-purple-400" />
      },
      {
        title: '人类偏好 (Human Eval)',
        badge: '最真实',
        content: '收集真实用户反馈或专家打分（RLHF 数据来源）。',
        pros: ['贴近用户体验', '质量最高'],
        cons: ['极慢', '极其昂贵', '主观性强'],
        icon: <Users className="w-10 h-10 mb-4 mx-auto text-green-400" />
      }
    ]
  },

  // --- PART 2 ---
  {
    id: 'benchmark-intro',
    type: SlideType.TITLE,
    title: '第二部分：Benchmark',
    subtitle: '大模型领域的“标准化试卷”',
  },
  {
    id: 'benchmark-concept',
    type: SlideType.CONTENT_TEXT,
    title: '基准测试 (Benchmark) 是什么？',
    subtitle: '一套标准化的“考题集” + 一套严格的“判卷标准”',
    content: (
      <div className="flex flex-col gap-8">
        <p className="text-xl text-gray-300">
           由于大模型能力包罗万象，我们很难用一道题衡量好坏。Benchmark 将模糊的能力具象化为成千上万道题目。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="group bg-purple-900/30 border border-purple-500/30 p-6 rounded-xl backdrop-blur-sm cursor-pointer hover:bg-purple-900/50 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              <div className="flex items-center gap-3 mb-3 text-purple-400 group-hover:text-purple-300">
                 <Calculator size={24} className="group-hover:scale-110 transition-transform"/>
                 <h3 className="font-bold text-lg">GSM8K</h3>
              </div>
              <p className="text-sm text-gray-300 group-hover:text-white">专门考<span className="text-white font-bold">数学逻辑</span>。就像让 AI 做小学奥数题，看它算得准不准。</p>
           </div>
           
           <div className="group bg-blue-900/30 border border-blue-500/30 p-6 rounded-xl backdrop-blur-sm cursor-pointer hover:bg-blue-900/50 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <div className="flex items-center gap-3 mb-3 text-blue-400 group-hover:text-blue-300">
                 <Terminal size={24} className="group-hover:scale-110 transition-transform"/>
                 <h3 className="font-bold text-lg">HumanEval</h3>
              </div>
              <p className="text-sm text-gray-300 group-hover:text-white">专门考<span className="text-white font-bold">写代码</span>。给一个函数名，让 AI 补全剩下的代码逻辑。</p>
           </div>

           <div className="group bg-emerald-900/30 border border-emerald-500/30 p-6 rounded-xl backdrop-blur-sm cursor-pointer hover:bg-emerald-900/50 hover:border-emerald-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <div className="flex items-center gap-3 mb-3 text-emerald-400 group-hover:text-emerald-300">
                 <GraduationCap size={24} className="group-hover:scale-110 transition-transform"/>
                 <h3 className="font-bold text-lg">MMLU</h3>
              </div>
              <p className="text-sm text-gray-300 group-hover:text-white">综合<span className="text-white font-bold">大联考</span>。涵盖历史、物理、法律等几十个学科的知识面。</p>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'benchmark-resource',
    type: SlideType.CONTENT_TEXT,
    title: '去哪里找 Benchmark？',
    subtitle: 'Easy AI - AI 评估模块',
    content: (
      <div className="group flex flex-col md:flex-row items-center gap-8 bg-slate-900/50 p-8 rounded-2xl border border-white/10 hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)] hover:scale-[1.02] transition-all duration-500 cursor-pointer">
         <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-40 h-40 bg-white text-slate-900 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500">
               <Github size={80} />
            </div>
         </div>
         <div className="w-full md:w-2/3">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
               Easy AI <span className="text-sm font-normal text-gray-400 bg-white/10 px-2 py-1 rounded group-hover:bg-blue-500 group-hover:text-white transition-colors">Open Source</span>
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-white">
               Github 上的 Easy AI 项目收集了当下最主流的大模型测试基准。
               包含描述、样本量、论文地址、数据集地址等信息，方便开发者快速检索。
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg group-hover:bg-blue-500 group-hover:scale-105 transition-all text-white font-semibold cursor-pointer shadow-lg group-hover:shadow-blue-500/50">
               <BookOpen size={18} />
               <span>github.com/ConardLi/easy-learn-ai</span>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 'benchmark-why',
    type: SlideType.GRID_CARDS,
    title: 'Why: 为什么必须用 Benchmark？',
    subtitle: '拒绝“自卖自夸”，回归公平竞争',
    items: [
      {
        title: '公平的“度量衡”',
        description: 'Apples-to-apples comparison. 大家做同一套题，都不许看答案，分数才可比。',
        icon: <Scale className="w-8 h-8 text-yellow-400" />
      },
      {
        title: '复现与验证',
        description: '防止厂商“自吹”。公开的题库意味着任何人都可以去验证模型是不是在“裸泳”。',
        icon: <RefreshCw className="w-8 h-8 text-emerald-400" />
      },
      {
        title: '指引选型',
        description: '客服机器人看对话榜，代码助手看编程分。Benchmark 是最好的选购指南。',
        icon: <Compass className="w-8 h-8 text-blue-400" />
      },
      {
        title: '明确差距',
        description: '量化模型之间的差距，是 90 分还是 60 分，一眼便知。',
        icon: <Target className="w-8 h-8 text-red-400" />
      }
    ]
  },
  {
    id: 'benchmark-how',
    type: SlideType.PROCESS,
    title: 'How: Benchmark 是如何工作的？',
    subtitle: '三步走：从输入到排名',
    items: [
      {
        title: '第一步：做题 (Input)',
        step: "01",
        description: 'MMLU 考选择题，HumanEval 考写代码。在这个过程中，模型是看不到标准答案的。',
        icon: <FileText className="w-10 h-10 text-white" />,
        color: "bg-blue-500"
      },
      {
        title: '第二步：判卷 (Grading)',
        step: "02",
        description: '选择题对答案（精确匹配）；代码题跑测试用例（Unit Test）；作文题请 GPT-4 当裁判。',
        icon: <FileCheck className="w-10 h-10 text-white" />,
        color: "bg-purple-500"
      },
      {
        title: '第三步：排座次 (Ranking)',
        step: "03",
        description: '汇总分数，制作 Leaderboard。Chatbot Arena 或 HuggingFace 榜单就是这样来的。',
        icon: <ListOrdered className="w-10 h-10 text-white" />,
        color: "bg-emerald-500"
      }
    ]
  },

  // --- PART 3: Knowledge Benchmarks ---
  {
    id: 'knowledge-intro',
    type: SlideType.CONTENT_TEXT,
    title: '分类一：通用学科知识 (Knowledge)',
    subtitle: '大模型的基本功底座',
    content: (
      <div className="flex flex-col gap-8">
        <p className="text-xl text-gray-300">
           学科知识解答是模型最简单的任务。如果连基本的历史常识或物理定律都搞错，那它的底座能力肯定是不行的。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
           {['历史常识', '物理定律', '基础逻辑'].map((item, idx) => (
              <div key={idx} className="group relative bg-white/5 border border-white/10 p-6 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-400 transition-colors">
                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <Library className="w-8 h-8 text-gray-400 mr-3 group-hover:text-white transition-colors" />
                 <span className="text-xl font-bold text-gray-300 group-hover:text-white z-10">{item}</span>
              </div>
           ))}
        </div>
      </div>
    )
  },
  {
    id: 'mmlu-classic',
    type: SlideType.CONTENT_TEXT,
    title: 'MMLU: 大模型界的“经典试卷”',
    subtitle: 'Massive Multitask Language Understanding',
    content: (
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
         <div className="flex-1 space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
               目前最流行、最权威的学科知识类测试基准。可以理解为大模型的<span className="text-yellow-400 font-bold">“综合百科全书考试”</span>。
            </p>
            <div className="space-y-4">
               <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                     <BookOpen size={20} />
                  </div>
                  <div>
                     <h4 className="font-bold text-white">57 个学科</h4>
                     <p className="text-sm text-gray-400">从初等数学到美国历史、法律、医学。</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
                   <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                     <ScrollText size={20} />
                  </div>
                  <div>
                     <h4 className="font-bold text-white">单项选择题</h4>
                     <p className="text-sm text-gray-400">4 选 1 (A, B, C, D)，答对得一分。</p>
                  </div>
               </div>
            </div>
         </div>
         
         <div className="flex-1 bg-slate-900 border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <div className="absolute top-0 right-0 p-3 bg-white/10 rounded-bl-xl text-xs font-mono text-gray-400">EXAM-101</div>
            <h3 className="text-xl font-bold mb-4 text-center text-blue-300">Question Example</h3>
            <div className="space-y-3 font-mono text-sm">
               <div className="p-3 bg-white/5 rounded border border-white/5">
                  <p className="text-gray-300 mb-2">Q: 《红楼梦》的作者是谁？</p>
                  <div className="space-y-1 pl-2 text-gray-500">
                     <p>A. 李白</p>
                     <p className="text-green-400 font-bold">B. 曹雪芹 <Check size={14} className="inline"/></p>
                     <p>C. 鲁迅</p>
                     <p>D. 金庸</p>
                  </div>
               </div>
               <div className="text-center text-xs text-gray-500 pt-2">
                  (Early GPT-4 Era Benchmark)
               </div>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 'mmlu-pro',
    type: SlideType.CONTENT_TEXT,
    title: 'MMLU-Pro: 难度升级',
    subtitle: '当顶级模型都拿满分时，试卷也得进化',
    content: (
      <div className="flex flex-col gap-8">
         <p className="text-lg text-gray-300">
            现在的顶级模型在原版 MMLU 上基本都是满分了。为了拉开差距，MMLU-Pro 带来了三大升级：
         </p>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group p-6 rounded-xl bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all cursor-pointer hover:-translate-y-2">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl text-white">选项变多</h3>
                  <ListOrdered className="text-purple-400 group-hover:scale-110 transition-transform" />
               </div>
               <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <span className="line-through">4 选 1</span> 
                  <ArrowRight size={14} />
                  <span className="text-purple-300 font-bold">10 选 1</span>
               </div>
               <p className="text-sm text-gray-500">蒙对概率极低，拒绝瞎蒙。</p>
            </div>

            <div className="group p-6 rounded-xl bg-gradient-to-br from-red-900/40 to-slate-900 border border-red-500/30 hover:border-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all cursor-pointer hover:-translate-y-2">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl text-white">难度加大</h3>
                  <TrendingUp className="text-red-400 group-hover:scale-110 transition-transform" />
               </div>
               <p className="text-sm text-gray-300 mb-2">删掉送分题，增加复杂推理。</p>
               <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-red-500 w-[85%] h-full"></div>
               </div>
            </div>

            <div className="group p-6 rounded-xl bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/30 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all cursor-pointer hover:-translate-y-2">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl text-white">思维链 (CoT)</h3>
                  <BrainCircuit className="text-blue-400 group-hover:scale-110 transition-transform" />
               </div>
               <p className="text-sm text-gray-300">不仅要答案，还要<span className="text-white font-bold">写出推理过程</span>。</p>
               <div className="mt-2 text-xs font-mono bg-black/30 p-2 rounded text-gray-400">
                  Step 1... Step 2... Therefore...
               </div>
            </div>
         </div>
         <div className="text-center text-sm text-gray-400 bg-white/5 py-2 rounded-lg">
            目前顶级模型 (GPT-4o, Gemini 1.5 Pro) 在 MMLU-Pro 的跑分约在 80-90 分。
         </div>
      </div>
    )
  },
  {
    id: 'mmmlu-multilingual',
    type: SlideType.CONTENT_TEXT,
    title: 'MMMLU: 不仅要懂，还要“多语言”',
    subtitle: 'GPT 5.2 / Gemini 3.0 / Claude 4.5 的新战场',
    content: (
      <div className="flex flex-col h-full items-center justify-center">
         <div className="relative mb-10 group cursor-pointer">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/40 transition-colors duration-500"></div>
            <Globe size={120} className="text-blue-400 relative z-10 group-hover:scale-110 transition-transform duration-700 group-hover:rotate-180" />
            
            {/* Orbiting Languages */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-white font-bold animate-bounce">中文</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full text-white font-bold animate-bounce delay-75">Français</div>
            <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 text-white font-bold animate-pulse">العربية</div>
            <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 text-white font-bold animate-pulse delay-100">Español</div>
         </div>
         
         <h3 className="text-2xl font-bold text-center mb-6">MMLU 的“国际版” (Multilingual)</h3>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="bg-red-900/20 border border-red-500/20 p-5 rounded-xl text-center group hover:bg-red-900/40 transition-colors">
               <div className="flex justify-center mb-2 text-red-400"><XCircle size={32} /></div>
               <h4 className="font-bold text-red-200 mb-2">死记硬背 (Rote Learning)</h4>
               <p className="text-sm text-gray-400">只背英文语料，换种语言就露馅。内功不足。</p>
            </div>
            
            <div className="bg-green-900/20 border border-green-500/20 p-5 rounded-xl text-center group hover:bg-green-900/40 transition-colors">
               <div className="flex justify-center mb-2 text-green-400"><CheckCircle2 size={32} /></div>
               <h4 className="font-bold text-green-200 mb-2">逻辑贯通 (True Understanding)</h4>
               <p className="text-sm text-gray-400">理解知识背后的逻辑，打通语言隔阂。真正的智能。</p>
            </div>
         </div>
      </div>
    )
  },

  // --- PART 4: Reasoning Benchmarks ---
  {
    id: 'reasoning-intro',
    type: SlideType.CONTENT_TEXT,
    title: '分类二：推理能力 (Reasoning)',
    subtitle: '记忆力 vs 脑力',
    content: (
      <div className="flex flex-col gap-10 items-center justify-center h-full">
         <div className="flex items-center gap-8 w-full max-w-4xl justify-center">
            
            {/* Memory / Knowledge */}
            <div className="flex-1 flex flex-col items-center group opacity-50 hover:opacity-100 transition-opacity">
               <div className="w-32 h-32 rounded-full bg-blue-900/30 flex items-center justify-center mb-4 border border-blue-500/30 group-hover:scale-110 transition-transform">
                  <Library size={64} className="text-blue-400" />
               </div>
               <h3 className="text-2xl font-bold text-blue-200">通用学科知识</h3>
               <p className="text-gray-400 mt-2 text-center">背了多少书 (Memory)</p>
            </div>

            {/* VS Divider */}
            <div className="text-4xl font-black italic text-gray-600">VS</div>

            {/* Reasoning / Brain */}
            <div className="flex-1 flex flex-col items-center group">
               <div className="w-40 h-40 rounded-full bg-purple-600/20 flex items-center justify-center mb-4 border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.4)] animate-pulse">
                  <BrainCircuit size={80} className="text-purple-400" />
               </div>
               <h3 className="text-3xl font-bold text-purple-200">推理能力</h3>
               <p className="text-gray-300 mt-2 text-center text-lg">脑子转不转得过来 (Intelligence)</p>
            </div>

         </div>
         <p className="text-xl text-center max-w-2xl text-gray-300 leading-relaxed bg-white/5 p-6 rounded-xl">
            现在的模型光靠“背书”不够了。我们看重它能不能<span className="text-purple-400 font-bold">解决从未见过的难题</span>，把线索串起来得到正确结论。
         </p>
      </div>
    )
  },
  {
    id: 'reasoning-scope',
    type: SlideType.LIST_FEATURES,
    title: '推理能力考什么？',
    subtitle: '不是检索，是推导',
    items: [
      {
        title: '常识与情境推断',
        desc: '大象装进冰箱分几步？A 在 B 左边，B 在 C 左边，A 在 C 哪边？',
        icon: <Footprints className="w-6 h-6 text-orange-400" />
      },
      {
        title: '逻辑一致性',
        desc: '前言不搭后语？违背物理常识？需要跨段落的逻辑连贯。',
        icon: <Scale className="w-6 h-6 text-blue-400" />
      },
      {
        title: '高阶学术推理',
        desc: '多步推导、排除干扰项。即使允许上网也搜不到直接答案。',
        icon: <FlaskConical className="w-6 h-6 text-purple-400" />
      },
      {
        title: '校准 (Calibration)',
        desc: '“知道自己不知道”。不仅要答对，还要在答错时降低自信，不瞎编。',
        icon: <HelpCircle className="w-6 h-6 text-green-400" />
      }
    ]
  },
  {
    id: 'hella-swag',
    type: SlideType.CONTENT_TEXT,
    title: 'HellaSwag: 能听懂“人话”吗？',
    subtitle: '入门级常识推理测试',
    content: (
      <div className="flex flex-col gap-6">
         <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
               <h3 className="text-xl font-bold text-orange-400 mb-2 flex items-center gap-2">
                  <Puzzle /> 任务：补全结局
               </h3>
               <p className="text-gray-300 mb-4">
                  给模型描述一个生活场景，让它从 4 个选项中选出<span className="text-white font-bold">符合常识</span>的结局。
               </p>
               <div className="bg-black/30 p-4 rounded text-sm font-mono text-gray-400 border-l-4 border-orange-500">
                  <p className="mb-2 italic">Scenario: A woman is sitting in a car...</p>
                  <p>Option A: ...she flies into space. (Absurd)</p>
                  <p className="text-green-400">Option B: ...she starts the engine. (Correct)</p>
               </div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4 bg-green-900/20 rounded-xl border border-green-500/30">
               <div className="text-4xl font-bold text-green-400 mb-2">95%+</div>
               <p className="text-center text-sm text-gray-400">顶级模型通过率</p>
               <p className="text-center text-xs text-gray-500 mt-2">对于 GPT-4 级别模型已是“送分题”</p>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 'gpqa-diamond',
    type: SlideType.CONTENT_TEXT,
    title: 'GPQA Diamond: 研究生的“噩梦”',
    subtitle: 'Graduate-Level Google-Proof Q&A',
    content: (
      <div className="flex flex-col gap-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 p-6 rounded-xl border border-indigo-500/30 hover:scale-105 transition-transform">
               <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="text-indigo-400 w-8 h-8" />
                  <h3 className="text-xl font-bold text-white">研究生水平</h3>
               </div>
               <p className="text-gray-400 text-sm">由生物、物理、化学领域的<span className="text-indigo-300">博士专家</span>编写。普通人根本看不懂题目。</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-900/40 to-slate-900 p-6 rounded-xl border border-red-500/30 hover:scale-105 transition-transform">
               <div className="flex items-center gap-3 mb-4">
                  <SearchX className="text-red-400 w-8 h-8" />
                  <h3 className="text-xl font-bold text-white">Google-Proof (防搜索)</h3>
               </div>
               <p className="text-gray-400 text-sm">即使把题目复制到 Google，也<span className="text-red-300">搜不到直接答案</span>。必须真正理解原理并推导。</p>
            </div>
         </div>

         <div className="bg-white/5 rounded-xl p-6 flex items-center justify-between border border-white/10">
            <div>
               <h4 className="font-bold text-lg text-white mb-1">当前战况</h4>
               <p className="text-sm text-gray-400">Gemini 3.0 & GPT 5.2</p>
            </div>
            <div className="text-right">
               <span className="text-4xl font-bold text-green-400"> 90分</span>
               <p className="text-xs text-gray-500">已超过普通人类专家水平</p>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 'hle-exam',
    type: SlideType.CONTENT_TEXT,
    title: 'HLE: 人类最后的防线',
    subtitle: "Humanity's Last Exam",
    content: (
      <div className="flex flex-col h-full justify-center gap-8">
         <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-red-500 flex items-center justify-center gap-2 mb-2">
               <Skull className="w-8 h-8" /> 最后的考试
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
               "如果 AI 能在这套题上拿满分，那我们基本可以说人类已经阻挡不住 AI 了。"
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-lg border border-red-900/50 flex flex-col items-center text-center">
               <Globe className="text-gray-400 mb-2" />
               <div className="text-sm font-bold text-white">全球协作</div>
               <div className="text-xs text-gray-500">1000+ 顶尖专家，50+ 国家</div>
            </div>
            <div className="p-4 bg-slate-900 rounded-lg border border-red-900/50 flex flex-col items-center text-center">
               <MountainSnow className="text-gray-400 mb-2" />
               <div className="text-sm font-bold text-white">难度极高</div>
               <div className="text-xs text-gray-500">复杂的工程图纸、模糊医学影像、古文字破译</div>
            </div>
            <div className="p-4 bg-slate-900 rounded-lg border border-red-900/50 flex flex-col items-center text-center">
               <Ban className="text-red-500 mb-2" />
               <div className="text-sm font-bold text-white">惨不忍睹</div>
               <div className="text-xs text-gray-500">当前顶级模型表现极差，找回“谦虚”</div>
            </div>
         </div>
         
         <div className="bg-red-950/30 border border-red-500/20 p-4 rounded-lg text-center mt-2 animate-pulse">
             <p className="text-red-300 font-mono text-sm">Status: AI has NOT passed this yet.</p>
         </div>
      </div>
    )
  },

  // --- PART 5: Abstract Reasoning ---
  {
    id: 'abstract-intro',
    type: SlideType.CONTENT_TEXT,
    title: '分类三：抽象推理 (Abstract Reasoning)',
    subtitle: '不考知识，只考智商',
    content: (
      <div className="flex flex-col gap-8 items-center justify-center h-full">
         <div className="flex gap-12 text-center items-center">
            {/* Knowledge Bound */}
            <div className="flex flex-col items-center opacity-40 grayscale scale-90">
               <div className="w-32 h-32 rounded-lg bg-slate-800 flex items-center justify-center mb-4 border border-gray-600">
                  <Library size={60} className="text-gray-400" />
               </div>
               <h3 className="text-xl font-bold text-gray-400">学科知识</h3>
               <p className="text-gray-500 text-sm mt-1">需要大量阅读积累</p>
            </div>

            <div className="text-4xl text-gray-600 font-mono">VS</div>

            {/* Abstract Intelligence */}
            <div className="flex flex-col items-center transform scale-110">
               <div className="w-40 h-40 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4 border-2 border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.4)] animate-pulse">
                  <Grid size={70} className="text-cyan-400" />
               </div>
               <h3 className="text-2xl font-bold text-cyan-200">抽象智力</h3>
               <p className="text-gray-400 text-sm mt-1">3岁小孩也能做的看图找规律</p>
            </div>
         </div>
         <div className="max-w-3xl text-center bg-white/5 p-6 rounded-xl mt-4">
            <p className="text-lg text-gray-300 leading-relaxed">
               有的测试，不需要你懂物理化学，也不需要你懂历史法律。
               <br/>它剥离了所有后天习得的知识，只考察<span className="text-cyan-400 font-bold">先天的逻辑推演与泛化能力</span>。
            </p>
         </div>
      </div>
    )
  },
  {
    id: 'arc-agi-1',
    type: SlideType.CONTENT_TEXT,
    title: 'ARC-AGI: 这里的考试不考“语文”',
    subtitle: '输入网格 → 输出网格',
    content: (
      <div className="flex flex-col gap-6">
         <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-slate-900 border border-cyan-500/30 p-6 rounded-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-2 bg-cyan-900/50 rounded-bl-lg text-xs font-mono text-cyan-300">Format</div>
               <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <LayoutGrid className="text-cyan-400" /> 形式：色彩网格
               </h3>
               <ul className="space-y-3 text-gray-300 text-sm">
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2"></div> 最小 1x1, 最大 30x30 的方格画板</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2"></div> 0-9 代表 10 种颜色 (0 是背景黑)</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2"></div> 3 组示例 (Input-Output) + 1 组测试</li>
               </ul>
            </div>
            
            <div className="flex-1 bg-slate-900 border border-purple-500/30 p-6 rounded-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-2 bg-purple-900/50 rounded-bl-lg text-xs font-mono text-purple-300">Goal</div>
               <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="text-purple-400" /> 核心：规则迁移
               </h3>
               <ul className="space-y-3 text-gray-300 text-sm">
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2"></div> 从少量例子中<b>快速学会</b>新规则</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2"></div> 对象识别：什么是“物体”</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2"></div> 关系推理：对齐、填充、移动、组合</li>
               </ul>
            </div>
         </div>
         <div className="text-center text-sm text-gray-500 font-mono mt-2">
            Gemini 3 和 GPT 5.2 在此项得分均不理想
         </div>
      </div>
    )
  },
  {
    id: 'arc-human-vs-ai',
    type: SlideType.CONTENT_TEXT,
    title: '为什么对 AI 这么难？',
    subtitle: '人类的“脑补” vs 机器的数组',
    content: (
      <div className="flex flex-col gap-6 h-full justify-center">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Human View (Gestalt) */}
            <div className="flex flex-col items-center">
               <div className="mb-4 flex items-center gap-2 text-green-400 font-bold uppercase tracking-widest">
                  <Eye size={20} /> Human View
               </div>
               <div className="relative p-6 bg-slate-800 rounded-xl border border-gray-600 shadow-2xl">
                   {/* The Grid Visual */}
                   <div className="grid grid-cols-7 gap-1 w-48 h-48">
                      {/* Generates a 7x7 grid with a "missing corner" square pattern */}
                      {Array.from({ length: 49 }).map((_, i) => {
                         const row = Math.floor(i / 7);
                         const col = i % 7;
                         // Outline of a 5x5 square starting at (1,1)
                         const isBorder = (row === 1 || row === 5) && (col >= 1 && col <= 5) || (col === 1 || col === 5) && (row >= 1 && row <= 5);
                         // Missing top-right corner visual
                         const isMissingCorner = row === 1 && col === 5;
                         const isFilled = row > 1 && row < 5 && col > 1 && col < 5;
                         
                         let bgClass = 'bg-gray-900';
                         if (isBorder && !isMissingCorner) bgClass = 'bg-blue-500'; // The shape outline
                         if (isMissingCorner) bgClass = 'bg-gray-800 animate-pulse border border-dashed border-gray-500'; // The missing part
                         if (isFilled) bgClass = 'bg-blue-900/50'; // Inner
                         
                         return <div key={i} className={`rounded-sm ${bgClass}`}></div>
                      })}
                   </div>
                   {/* Annotation */}
                   <div className="absolute -right-4 -top-4 bg-white text-black text-xs font-bold px-2 py-1 rounded shadow-lg transform rotate-12">
                      “缺了一角！”
                   </div>
               </div>
               <p className="mt-4 text-center text-sm text-gray-400 max-w-xs">
                  人类大脑自带几百万年进化的<b>完形心理学</b>。我们一眼就能看出整体形状和缺失部分。
               </p>
            </div>

            {/* AI View (Array) */}
            <div className="flex flex-col items-center">
               <div className="mb-4 flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest">
                  <Binary size={20} /> AI View
               </div>
               <div className="p-6 bg-black rounded-xl border border-blue-900/50 font-mono text-xs leading-none text-blue-500 shadow-inner w-48 h-48 overflow-hidden flex flex-col justify-center select-none relative">
                   <div className="opacity-50 blur-[1px]">
                     [[0,0,0,0,0,0,0],<br/>
                     [0,1,1,1,1,0,0],<br/>
                     [0,1,0,0,1,0,0],<br/>
                     [0,1,0,0,1,0,0],<br/>
                     [0,1,1,1,1,0,0],<br/>
                     [0,0,0,0,0,0,0]]
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
               </div>
               <p className="mt-4 text-center text-sm text-gray-400 max-w-xs">
                  模型看到的是冷冰冰的<b>二维数组</b>。它必须从零推导出“物体”、“完整性”和“填补”的概念。
               </p>
            </div>

         </div>
      </div>
    )
  },
  {
    id: 'arc-agi-2-gravity',
    type: SlideType.CONTENT_TEXT,
    title: 'ARC-AGI-2: 难度进阶',
    subtitle: '不仅要有逻辑，还要懂“物理”',
    content: (
      <div className="flex flex-col gap-6">
         <p className="text-gray-300 text-center mb-4">
            ARC-AGI-2 引入了更复杂的交互，例如需要模型自己推断出类似<b>重力、堆叠、挤压</b>的物理规则。
         </p>
         
         <div className="flex items-center justify-center gap-8 bg-white/5 p-8 rounded-xl border border-white/10">
            {/* Before State */}
            <div className="flex flex-col items-center gap-2">
               <div className="text-xs text-gray-400 uppercase tracking-widest font-mono">Input</div>
               <div className="w-32 h-40 border-2 border-gray-600 bg-gray-900 relative rounded p-2">
                  {/* Floating Red Blocks */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-sm"></div>
                  <div className="absolute top-8 right-8 w-6 h-6 bg-red-500 rounded-sm"></div>
                  {/* Floating Blue Blocks */}
                  <div className="absolute top-4 left-2 w-6 h-6 bg-blue-500 rounded-sm"></div>
                  <div className="absolute top-12 left-4 w-6 h-6 bg-blue-500 rounded-sm"></div>
               </div>
            </div>

            {/* Action Arrow */}
            <div className="flex flex-col items-center text-gray-500">
               <ArrowDownToLine size={32} className="animate-bounce" />
               <span className="text-xs font-mono mt-1">Gravity?</span>
            </div>

            {/* After State */}
            <div className="flex flex-col items-center gap-2">
               <div className="text-xs text-green-400 uppercase tracking-widest font-mono">Output</div>
               <div className="w-32 h-40 border-2 border-green-500/50 bg-gray-900 relative rounded p-2 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                  {/* Stacked Blocks */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-red-500 rounded-sm"></div>
                  <div className="absolute bottom-8 right-2 w-6 h-6 bg-red-500 rounded-sm"></div>
                  
                  <div className="absolute bottom-2 left-2 w-6 h-6 bg-blue-500 rounded-sm"></div>
                  <div className="absolute bottom-8 left-2 w-6 h-6 bg-blue-500 rounded-sm"></div>
               </div>
            </div>
         </div>

         <div className="text-center max-w-2xl mx-auto text-sm text-gray-400 italic">
            “模型没有眼睛，没有生活经验。它只能通过观察数组的变化，去‘猜’出这个世界上存在一种叫重力的东西。”
         </div>
      </div>
    )
  }
];

export const SLIDES: SlideData[] = [
  ...BASE_SLIDES,
  ...AGENT_SLIDES,
  ...CODING_SLIDES,
  ...VISION_SLIDES,
  ...HUMAN_SLIDES,
  ...SAFETY_SLIDES,
  ...SUMMARY_SLIDES,
  {
    id: 'end',
    type: SlideType.CONCLUSION,
    title: '谢谢观看',
    subtitle: 'Evaluation is the key to unlocking the AI black box.',
  }
];
