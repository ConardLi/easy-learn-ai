import React from 'react';
import { Cpu, Server } from 'lucide-react';

const Summary: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl p-10 border border-slate-700/50 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">总结：MoE 核心奥义</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
        
        <div className="flex flex-col items-center gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
           <Cpu size={64} className="text-slate-400" />
           <h3 className="text-lg font-bold text-slate-300">Dense 模型</h3>
           <p className="text-sm text-slate-500 max-w-[200px]">
             = 单核高频 CPU<br/>
             一个人干所有的活，累且慢。
           </p>
        </div>

        <div className="hidden md:block w-px h-32 bg-slate-700"></div>
        <div className="md:hidden w-32 h-px bg-slate-700"></div>

        <div className="flex flex-col items-center gap-4">
           <Server size={64} className="text-blue-400" />
           <h3 className="text-lg font-bold text-white">MoE 模型</h3>
           <p className="text-sm text-blue-200 max-w-[200px]">
             = 多核并发系统<br/>
             平时待机，有任务时唤醒对应的核心。
           </p>
        </div>

      </div>

      <div className="mt-10 pt-8 border-t border-slate-800/50">
        <p className="text-lg text-slate-300 italic">
          "它是目前通往 AGI（通用人工智能）路上，平衡 <b>模型智能（参数规模）</b> 与 <b>落地成本（算力消耗）</b> 的最优解之一。"
        </p>
      </div>
    </div>
  );
};

export default Summary;