import React from 'react';
import { Database, Zap } from 'lucide-react';

const CoreConcept: React.FC = () => {
  return (
    <div className="w-full bg-slate-900/50 py-16 px-6 rounded-3xl border border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">核心概念：参数的“解绑”</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            MoE 的核心魔法在于将<b>“参数总量”</b>与<b>“激活参数量”</b>分离。这是它与传统稠密 (Dense) 模型最大的区别。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Dense Model Visualization */}
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 flex flex-col items-center text-center group hover:border-slate-600 transition-all">
            <h3 className="text-xl font-bold text-slate-300 mb-6">传统 Dense 模型</h3>
            <div className="relative w-48 h-48 mb-6">
              {/* Big Circle representing Total Params */}
              <div className="absolute inset-0 bg-slate-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-0 border-2 border-slate-500 rounded-full flex items-center justify-center">
                 <div className="text-center">
                   <div className="text-2xl font-bold text-white">100%</div>
                   <div className="text-xs text-slate-400">激活</div>
                 </div>
              </div>
              {/* Inner active circle - same size */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-full scale-100 transition-transform duration-1000"></div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between w-full max-w-[200px] text-sm">
                <span className="text-slate-400">总量 (Total):</span>
                <span className="text-white font-mono">70B</span>
              </div>
              <div className="flex justify-between w-full max-w-[200px] text-sm">
                <span className="text-slate-400">激活 (Active):</span>
                <span className="text-red-400 font-mono">70B</span>
              </div>
            </div>
          </div>

          {/* MoE Model Visualization */}
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-blue-500/30 flex flex-col items-center text-center group hover:border-blue-500/60 transition-all relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                MoE 架构
             </div>
            <h3 className="text-xl font-bold text-white mb-6">MoE 稀疏模型</h3>
            <div className="relative w-48 h-48 mb-6">
              {/* Big Circle representing Total Params */}
              <div className="absolute inset-0 bg-blue-900 rounded-full opacity-20"></div>
              <div className="absolute inset-0 border-2 border-blue-800 rounded-full border-dashed"></div>
              
              {/* Small Active Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)] animate-pulse flex items-center justify-center z-10">
                <Zap size={24} className="text-white" />
              </div>
              
              {/* Orbiting particles implying inactive experts */}
              <div className="absolute top-4 left-1/2 w-2 h-2 bg-slate-600 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-3 h-3 bg-slate-600 rounded-full"></div>
              <div className="absolute top-10 left-10 w-2 h-2 bg-slate-600 rounded-full"></div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between w-full max-w-[200px] text-sm">
                <span className="text-slate-400">总量 (Total):</span>
                <span className="text-white font-mono">1800B</span>
              </div>
              <div className="flex justify-between w-full max-w-[200px] text-sm">
                <span className="text-slate-400">激活 (Active):</span>
                <span className="text-green-400 font-mono">30B</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CoreConcept;