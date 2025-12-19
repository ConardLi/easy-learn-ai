import React from 'react';
import { SlideData, SlideType } from './types';
import { 
  Eye, 
  Image, 
  Video, 
  LineChart, 
  Music, 
  Stethoscope, 
  Zap, 
  Shapes, 
  BookOpen, 
  Film, 
  Play, 
  Pause, 
  MonitorPlay,
  Lightbulb,
  GraduationCap,
  ScanEye,
  Activity
} from 'lucide-react';

export const VISION_SLIDES: SlideData[] = [
  // --- PART 8: Vision Intro ---
  {
    id: 'vision-intro',
    type: SlideType.CONTENT_TEXT,
    title: '视觉理解 (Vision)',
    subtitle: '多模态融合：AI 的“眼睛”',
    content: (
      <div className="flex flex-col h-full justify-center items-center gap-10">
         <div className="relative group cursor-pointer">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-[80px] group-hover:bg-indigo-500/40 transition-all duration-700"></div>
            
            {/* Eye Graphic */}
            <div className="relative w-48 h-48 rounded-full bg-slate-900 border-2 border-indigo-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.3)] overflow-hidden">
                {/* Iris */}
                <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-black"></div>
                </div>
                
                {/* Scanning Line */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-400/20 to-transparent h-[20%] w-full animate-[scan_2s_ease-in-out_infinite]"></div>
            </div>

            {/* Orbiting Modalities */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-indigo-300 font-bold animate-bounce flex flex-col items-center">
               <Image size={24} className="mb-1"/> Image
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full text-purple-300 font-bold animate-bounce delay-75 flex flex-col items-center">
               <Video size={24} className="mb-1"/> Video
            </div>
            <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 text-pink-300 font-bold animate-pulse flex flex-col items-center pr-4">
               <LineChart size={24} className="mb-1"/> Charts
            </div>
            <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 text-cyan-300 font-bold animate-pulse delay-100 flex flex-col items-center pl-4">
               <BookOpen size={24} className="mb-1"/> Knowledge
            </div>
         </div>

         <div className="text-center max-w-2xl bg-white/5 p-6 rounded-xl border-l-4 border-indigo-500">
             <p className="text-gray-300 text-lg">
                我们已经测试了记忆力、逻辑、代码。现在轮到<span className="text-white font-bold">视觉</span>了。
                <br/>
                核心不在于“识别物体”，而在于<span className="text-indigo-400 font-bold">结合专业知识进行推理</span>。
             </p>
         </div>
      </div>
    )
  },

  // --- MMMU ---
  {
    id: 'mmmu-card',
    type: SlideType.GRID_CARDS,
    title: 'MMMU: 给 AI 考的“看图高考”',
    subtitle: 'Massive Multi-discipline Multimodal Understanding',
    items: [
      {
        title: '艺术 (Arts)',
        description: '给你几段五线谱，找出不符合乐理规则的音符组合。不懂音乐理论根本做不了。',
        icon: <Music className="w-8 h-8 text-pink-400" />
      },
      {
        title: '医学 (Medicine)',
        description: '看着黑乎乎的扫描片子，分析病变阴影，推断病人得了什么病。需要医学常识。',
        icon: <Stethoscope className="w-8 h-8 text-green-400" />
      },
      {
        title: '工程 (Engineering)',
        description: '给一张复杂的电路图，算出两点间的电压。先认全符号，再用物理公式计算。',
        icon: <Zap className="w-8 h-8 text-yellow-400" />
      },
      {
        title: '科学 (Science)',
        description: '看几何坐标图，算出阴影面积。把图形语言“翻译”成数学公式。',
        icon: <Shapes className="w-8 h-8 text-blue-400" />
      }
    ]
  },

  // --- CharXiv ---
  {
    id: 'charxiv-detail',
    type: SlideType.CONTENT_TEXT,
    title: 'CharXiv: 图表里的“福尔摩斯”',
    subtitle: '基于真实 ArXiv 论文的图表推理',
    content: (
      <div className="flex flex-col gap-8 h-full">
         <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* The Chart Visual */}
            <div className="flex-1 w-full bg-slate-900 border border-slate-700 p-6 rounded-xl relative overflow-hidden group">
               <div className="absolute top-2 right-2 flex items-center gap-2 text-xs text-gray-400">
                   <Activity size={14} /> Training Log
               </div>
               
               {/* Mock Loss Curve */}
               <div className="h-48 w-full border-l border-b border-gray-600 relative mt-4">
                  {/* Grid Lines */}
                  <div className="absolute top-1/4 w-full h-px bg-gray-800"></div>
                  <div className="absolute top-2/4 w-full h-px bg-gray-800"></div>
                  <div className="absolute top-3/4 w-full h-px bg-gray-800"></div>

                  {/* Train Loss (Blue) - Goes down smoothly */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible">
                     <path d="M0,20 Q50,150 250,180" fill="none" stroke="#3b82f6" strokeWidth="3" />
                  </svg>
                  
                  {/* Val Loss (Red) - Goes down then up (Overfitting) */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible">
                     <path d="M0,30 Q50,140 150,140 T250,100" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" />
                  </svg>

                  <div className="absolute bottom-2 right-2 text-red-400 text-xs font-bold animate-pulse">Overfitting?</div>
               </div>
               
               <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                  <span>Epoch 0</span>
                  <span>Epoch 100</span>
               </div>
            </div>

            {/* The Question */}
            <div className="flex-1 space-y-6">
               <div className="bg-white/5 p-4 rounded-lg border-l-4 border-indigo-500">
                  <h4 className="text-indigo-300 font-bold mb-2 flex items-center gap-2">
                     <ScanEye size={18} /> Question:
                  </h4>
                  <p className="text-gray-200">
                     "分析训练损失和验证损失的趋势。模型在第 50 个 Epoch 之后发生了什么？"
                  </p>
               </div>
               
               <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                     <div className="w-2 h-2 rounded-full bg-red-500"></div>
                     <span>必须识别线条颜色与图例对应</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                     <div className="w-2 h-2 rounded-full bg-red-500"></div>
                     <span>必须理解 ML 概念：Loss, Epoch, Divergence</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                     <div className="w-2 h-2 rounded-full bg-red-500"></div>
                     <span>结论：出现过拟合 (Overfitting)</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="flex items-center justify-between bg-slate-800 p-4 rounded-lg border border-white/10">
             <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">GPT 5.2 / Gemini 3.0 Score:</span>
             </div>
             <div className="text-2xl font-bold text-green-400">~ 82%</div>
         </div>
      </div>
    )
  },

  // --- Video-MMMU ---
  {
    id: 'video-mmmu-process',
    type: SlideType.PROCESS,
    title: 'Video-MMMU: 看着视频学解题',
    subtitle: '时间记忆 + 因果推理 + 学习能力',
    items: [
      {
        title: 'Step 1: 遇难题',
        step: "Problem",
        description: '看到一张画着圈圈和箭头的怪图。完全不知道公式，无法下手。',
        icon: <Shapes className="w-10 h-10 text-white" />,
        color: "bg-gray-600"
      },
      {
        title: 'Step 2: 看视频',
        step: "Learn",
        description: '观看一段 10 分钟的教学视频（如吴恩达课程）。找到关键公式，理解符号含义。',
        icon: <MonitorPlay className="w-10 h-10 text-white" />,
        color: "bg-indigo-600"
      },
      {
        title: 'Step 3: 解题目',
        step: "Solve",
        description: '带着从视频里“现学”的知识，回到题目，代入数字，算出答案。',
        icon: <Lightbulb className="w-10 h-10 text-white" />,
        color: "bg-green-600"
      }
    ]
  },
  {
    id: 'vision-summary',
    type: SlideType.CONTENT_TEXT,
    title: '视觉基准战况',
    subtitle: 'Top Models are "Visionaries"',
    content: (
      <div className="flex flex-col items-center justify-center h-full">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {/* MMMU Score */}
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl flex flex-col items-center text-center hover:border-blue-500 hover:shadow-lg transition-all">
               <div className="w-16 h-16 rounded-full bg-blue-900/30 flex items-center justify-center mb-4 text-blue-400">
                  <Image size={32} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">MMMU</h3>
               <p className="text-sm text-gray-400 mb-4">综合百科视觉</p>
               <div className="text-4xl font-black text-blue-400">90<span className="text-xl">%</span></div>
            </div>

            {/* CharXiv Score */}
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl flex flex-col items-center text-center hover:border-purple-500 hover:shadow-lg transition-all">
               <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4 text-purple-400">
                  <LineChart size={32} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">CharXiv</h3>
               <p className="text-sm text-gray-400 mb-4">科学图表推理</p>
               <div className="text-4xl font-black text-purple-400">82<span className="text-xl">%</span></div>
            </div>

            {/* Video-MMMU Score */}
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl flex flex-col items-center text-center hover:border-pink-500 hover:shadow-lg transition-all">
               <div className="w-16 h-16 rounded-full bg-pink-900/30 flex items-center justify-center mb-4 text-pink-400">
                  <Film size={32} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Video-MMMU</h3>
               <p className="text-sm text-gray-400 mb-4">视频动态理解</p>
               <div className="text-4xl font-black text-pink-400">87<span className="text-xl">%</span></div>
            </div>
         </div>
         
         <div className="mt-8 text-gray-500 text-sm">
            * Scores based on Gemini 3.0 / GPT 5.2 public reports
         </div>
      </div>
    )
  }
];
