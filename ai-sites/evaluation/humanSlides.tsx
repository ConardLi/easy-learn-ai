import React from 'react';
import { SlideData, SlideType } from './types';
import { 
  Users, 
  ThumbsUp, 
  ThumbsDown, 
  Swords, 
  Trophy, 
  Crown, 
  Ghost, 
  Lock, 
  Zap, 
  MessageSquare,
  Scale,
  TrendingUp,
  UserCheck,
  RefreshCw,
  Gamepad2,
  AlertOctagon,
  HelpCircle
} from 'lucide-react';

export const HUMAN_SLIDES: SlideData[] = [
  // --- PART 9: Human Preference Intro ---
  {
    id: 'human-intro',
    type: SlideType.CONTENT_TEXT,
    title: '人类偏好评估 (Human Preference)',
    subtitle: '考试没输过，实战没赢过？',
    content: (
      <div className="flex flex-col h-full justify-center items-center gap-10">
         <div className="flex flex-col md:flex-row gap-12 items-center">
            
            {/* Exam Master */}
            <div className="flex flex-col items-center group">
               <div className="w-40 h-40 rounded-full bg-slate-800 border-2 border-green-500 flex items-center justify-center mb-6 relative grayscale opacity-70">
                   <div className="absolute top-0 right-0 bg-green-500 text-black font-bold px-3 py-1 rounded-full text-lg">A+</div>
                   <MessageSquare size={60} className="text-gray-400" />
               </div>
               <h3 className="text-2xl font-bold text-gray-400">“做题家”模型</h3>
               <p className="text-gray-500 mt-2 text-center max-w-xs">
                  MMLU 满分，HumanEval 满分。<br/>但在实际聊天时，说话像机器人，死板且啰嗦。
               </p>
            </div>

            <div className="text-4xl font-black text-gray-600">VS</div>

            {/* Real User Experience */}
            <div className="flex flex-col items-center group">
               <div className="w-48 h-48 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-600/20 border-2 border-pink-500 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(236,72,153,0.3)]">
                   <Users size={80} className="text-pink-400" />
               </div>
               <h3 className="text-2xl font-bold text-pink-200">人类真实体验</h3>
               <p className="text-pink-300/80 mt-2 text-center max-w-xs">
                  大模型是拿来用的，不是拿来考试的。<br/>到底好不好用，<span className="text-white font-bold">人说了算</span>。
               </p>
            </div>
         </div>
      </div>
    )
  },

  // --- LMSYS Intro ---
  {
    id: 'lmsys-arena',
    type: SlideType.CONTENT_TEXT,
    title: 'Chatbot Arena: 大模型界的“角斗场”',
    subtitle: 'LMSYS - 目前最具公信力的评估平台',
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-8">
         <div className="relative">
             {/* Arena Graphic */}
             <div className="w-full max-w-4xl h-64 bg-slate-900 rounded-t-full border-t-2 border-x-2 border-orange-500/50 flex flex-col justify-end items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-orange-900/40 via-transparent to-transparent"></div>
                
                {/* Spotlights */}
                <div className="absolute -top-20 left-1/4 w-20 h-96 bg-white/5 rotate-[15deg] blur-xl"></div>
                <div className="absolute -top-20 right-1/4 w-20 h-96 bg-white/5 rotate-[-15deg] blur-xl"></div>

                <div className="z-10 flex gap-20 mb-10 items-end">
                   <div className="text-center animate-bounce duration-[2000ms]">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-blue-500/50 text-white font-bold text-xl">A</div>
                      <div className="w-8 h-2 bg-black/50 rounded-full blur-sm mx-auto"></div>
                   </div>
                   
                   <Swords size={64} className="text-orange-500 mb-4 animate-pulse" />
                   
                   <div className="text-center animate-bounce duration-[2000ms] delay-500">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-red-500/50 text-white font-bold text-xl">B</div>
                      <div className="w-8 h-2 bg-black/50 rounded-full blur-sm mx-auto"></div>
                   </div>
                </div>
             </div>
             
             {/* Crowd */}
             <div className="w-full h-12 bg-gradient-to-b from-slate-800 to-slate-900 flex justify-center items-center gap-1 opacity-50">
                {[...Array(20)].map((_, i) => (
                   <div key={i} className="w-3 h-3 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: `${Math.random()}s` }}></div>
                ))}
             </div>
         </div>

         <div className="bg-white/5 p-6 rounded-xl border border-white/10 max-w-3xl text-center">
            <h3 className="text-xl font-bold text-white mb-2">Crowdsourced Battle Platform</h3>
            <p className="text-gray-300">
               全球网友随机出题，随机派两个匿名模型对战。<br/>
               没有题库，没有标准答案，纯靠<span className="text-orange-400 font-bold">人类直觉</span>投票。
            </p>
         </div>
      </div>
    )
  },

  // --- The Mechanism (Interactive Simulation) ---
  {
    id: 'arena-mechanism',
    type: SlideType.CONTENT_TEXT,
    title: '盲测机制 (Blind Test)',
    subtitle: 'Example: 写个贪吃蛇游戏',
    content: (
      <div className="flex flex-col gap-4 h-full max-w-5xl mx-auto">
         {/* User Prompt */}
         <div className="bg-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-600 self-start max-w-[80%] flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center shrink-0">
               <Gamepad2 size={16} />
            </div>
            <p className="text-white">请帮我用 Python 写一个简单的贪吃蛇游戏。</p>
         </div>

         {/* Models Container */}
         <div className="flex flex-1 gap-4 min-h-0">
            {/* Model A */}
            <div className="flex-1 bg-slate-900 border border-blue-500/30 rounded-xl p-4 flex flex-col relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
               <h4 className="text-blue-400 font-bold mb-2 flex justify-between">
                  Model A 
                  <span className="bg-blue-900/50 text-xs px-2 py-0.5 rounded border border-blue-500/30 hidden group-hover:block animate-fade-in">deepseek-v3.2</span>
               </h4>
               <div className="flex-1 bg-black/30 rounded p-2 font-mono text-xs text-green-400 overflow-hidden opacity-80">
                  import pygame<br/>
                  import time<br/>
                  import random<br/><br/>
                  pygame.init()<br/>
                  white = (255, 255, 255)<br/>
                  ...<br/>
                  <span className="text-gray-500"># 完整可运行的代码结构...</span>
               </div>
               <div className="absolute inset-0 bg-blue-500/5 pointer-events-none"></div>
            </div>

            {/* Model B */}
            <div className="flex-1 bg-slate-900 border border-red-500/30 rounded-xl p-4 flex flex-col relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
               <h4 className="text-red-400 font-bold mb-2 flex justify-between">
                  Model B
                  <span className="bg-red-900/50 text-xs px-2 py-0.5 rounded border border-red-500/30 hidden group-hover:block animate-fade-in">ghostfalcon-2025</span>
               </h4>
               <div className="flex-1 bg-black/30 rounded p-2 font-mono text-xs text-gray-400 overflow-hidden opacity-80">
                  Certainly! Here is a snake.<br/><br/>
                  <span className="text-red-300">Error: I cannot generate code for games as it might induce addiction.</span><br/>
                  <br/>
                  (Or generates broken code...)
               </div>
               <div className="absolute inset-0 bg-red-500/5 pointer-events-none"></div>
            </div>
         </div>

         {/* Voting Buttons */}
         <div className="grid grid-cols-4 gap-4 mt-2">
            <button className="bg-blue-600 hover:bg-blue-500 p-3 rounded-lg text-white font-bold flex flex-col items-center gap-1 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20">
               <ThumbsUp size={20} />
               👈 A is Better
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 p-3 rounded-lg text-gray-300 font-bold flex flex-col items-center gap-1 transition-transform hover:scale-105">
               <ThumbsUp size={20} />
               👉 B is Better
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg text-gray-400 font-bold flex flex-col items-center gap-1 transition-transform hover:scale-105">
               <Scale size={20} />
               Tie (平局)
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg text-red-400 font-bold flex flex-col items-center gap-1 transition-transform hover:scale-105">
               <ThumbsDown size={20} />
               Both Bad
            </button>
         </div>
         
         <div className="text-center text-xs text-gray-500 mt-1">
            * 只有投完票后，系统才会揭晓模型名字（如上图鼠标悬停所示）
         </div>
      </div>
    )
  },

  // --- Elo Rating ---
  {
    id: 'elo-rating',
    type: SlideType.CONTENT_TEXT,
    title: 'Elo 等级分系统',
    subtitle: '像电竞、围棋一样的天梯排位',
    content: (
      <div className="flex flex-col gap-8 items-center justify-center h-full">
         <div className="flex items-end gap-2 h-64 w-full max-w-3xl border-b-2 border-gray-600 px-4 pb-2 relative">
            {/* Y Axis Label */}
            <div className="absolute -left-12 top-0 bottom-0 flex items-center -rotate-90 text-gray-500 text-sm">Elo Score</div>

            {/* Bars */}
            <div className="flex-1 bg-slate-800 rounded-t-lg mx-2 h-[40%] flex items-end justify-center pb-2 text-gray-400 group relative hover:bg-slate-700 transition-all">
               <span className="mb-2 font-bold">Llama-2</span>
               <div className="absolute -top-8 bg-slate-700 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">1050</div>
            </div>
            <div className="flex-1 bg-indigo-900 rounded-t-lg mx-2 h-[60%] flex items-end justify-center pb-2 text-indigo-300 group relative hover:bg-indigo-800 transition-all">
               <span className="mb-2 font-bold">GPT-4</span>
               <div className="absolute -top-8 bg-indigo-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">1250</div>
            </div>
            <div className="flex-1 bg-purple-900 rounded-t-lg mx-2 h-[80%] flex items-end justify-center pb-2 text-purple-300 group relative hover:bg-purple-800 transition-all">
               <span className="mb-2 font-bold">Gemini 3</span>
               <div className="absolute -top-8 bg-purple-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">1310</div>
            </div>
            <div className="flex-1 bg-emerald-600 rounded-t-lg mx-2 h-[85%] flex items-end justify-center pb-2 text-white group relative hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]">
               <span className="mb-2 font-bold">Claude 4.5</span>
               <div className="absolute -top-10 bg-emerald-500 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity font-bold text-black">1325 (King)</div>
               <Crown size={24} className="absolute -top-6 text-yellow-400 animate-bounce" />
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
             <div className="bg-green-900/20 p-4 rounded-xl border border-green-500/20 flex items-center gap-4">
                <TrendingUp className="text-green-400 w-8 h-8" />
                <div>
                   <h4 className="font-bold text-white">战胜强手 = 暴涨</h4>
                   <p className="text-sm text-gray-400">不知名小模型如果赢了 Gemini 3，分数会大幅提升。</p>
                </div>
             </div>
             <div className="bg-red-900/20 p-4 rounded-xl border border-red-500/20 flex items-center gap-4">
                <Ghost className="text-red-400 w-8 h-8" />
                <div>
                   <h4 className="font-bold text-white">输给弱鸡 = 暴跌</h4>
                   <p className="text-sm text-gray-400">顶级模型如果经常在简单题上翻车，排名会迅速下滑。</p>
                </div>
             </div>
         </div>
      </div>
    )
  },

  // --- Why Authoritative? ---
  {
    id: 'why-arena',
    type: SlideType.GRID_CARDS,
    title: '为什么它是“公信力天花板”？',
    subtitle: '厂商最怕，用户最爱',
    items: [
      {
        title: '无法作弊 (No Cheating)',
        description: '题目是用户实时输入的。模型无法提前把题库背下来（Data Contamination Impossible）。',
        icon: <Lock className="w-8 h-8 text-red-400" />
      },
      {
        title: '反映真实 (Real UX)',
        description: 'MMLU 考的是知识，Arena 考的是“好不好聊”。啰嗦、格式乱都会被扣分。',
        icon: <UserCheck className="w-8 h-8 text-green-400" />
      },
      {
        title: '动态更新 (Live)',
        description: '只要有新模型（如 GhostFalcon）发布，马上进场 PK。榜单每天都在变。',
        icon: <RefreshCw className="w-8 h-8 text-blue-400" />
      },
      {
        title: '多维榜单',
        description: '不只看总分。还有编程榜、中文榜、长文本榜。专才也能发光。',
        icon: <Zap className="w-8 h-8 text-yellow-400" />
      }
    ]
  },

  // --- Current Leaderboard ---
  {
    id: 'leaderboard-status',
    type: SlideType.CONTENT_TEXT,
    title: '当前战况 (Live Leaderboard)',
    subtitle: '谁是现在的世界第一？',
    content: (
      <div className="flex flex-col items-center justify-center h-full">
         <div className="w-full max-w-4xl bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-slate-800 p-4 grid grid-cols-12 gap-4 font-bold text-gray-400 text-sm uppercase tracking-wider border-b border-slate-700">
               <div className="col-span-2 text-center">Rank</div>
               <div className="col-span-6">Model</div>
               <div className="col-span-4 text-right">Arena Elo</div>
            </div>

            {/* Row 1: Coding King */}
            <div className="p-4 grid grid-cols-12 gap-4 items-center border-b border-slate-800 bg-slate-800/30 hover:bg-slate-800/80 transition-colors group">
               <div className="col-span-2 text-center flex justify-center">
                  <Trophy size={24} className="text-yellow-400" />
               </div>
               <div className="col-span-6 flex items-center gap-3">
                  <div className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors">Claude Opus 4.5</div>
                  <span className="bg-purple-900 text-purple-200 text-xs px-2 py-0.5 rounded border border-purple-500/50">Coding #1</span>
               </div>
               <div className="col-span-4 text-right font-mono text-xl text-yellow-400 font-bold">1325</div>
            </div>

            {/* Row 2: Text King */}
            <div className="p-4 grid grid-cols-12 gap-4 items-center border-b border-slate-800 hover:bg-slate-800/50 transition-colors group">
               <div className="col-span-2 text-center font-bold text-gray-300 text-lg">2</div>
               <div className="col-span-6 flex items-center gap-3">
                  <div className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors">Gemini 3.0</div>
                  <span className="bg-blue-900 text-blue-200 text-xs px-2 py-0.5 rounded border border-blue-500/50">Overall #1</span>
               </div>
               <div className="col-span-4 text-right font-mono text-xl text-gray-300">1310</div>
            </div>

            {/* Row 3 */}
            <div className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-800/50 transition-colors">
               <div className="col-span-2 text-center font-bold text-gray-500">3</div>
               <div className="col-span-6 font-bold text-gray-300">GPT 5.2</div>
               <div className="col-span-4 text-right font-mono text-xl text-gray-500">1302</div>
            </div>
            
             {/* Row 4 */}
             <div className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-800/50 transition-colors">
               <div className="col-span-2 text-center font-bold text-gray-600">4</div>
               <div className="col-span-6 font-bold text-gray-400">DeepSeek-v3.2</div>
               <div className="col-span-4 text-right font-mono text-xl text-gray-600">1295</div>
            </div>
         </div>
         
         <div className="mt-6 flex gap-4 text-sm text-gray-400">
             <div className="flex items-center gap-2">
                <HelpCircle size={16} /> 榜单每天更新
             </div>
             <div className="flex items-center gap-2">
                <AlertOctagon size={16} /> 仅供参考，不代表绝对真理
             </div>
         </div>
      </div>
    )
  }
];
