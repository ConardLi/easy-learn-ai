import React, { useEffect, useState } from 'react';
import { ArrowDown, GitMerge, Calculator } from 'lucide-react';

const TechnicalArchitecture: React.FC = () => {
  const [step, setStep] = useState(0);

  // Simple animation loop for the diagram
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-900 py-16 px-6 rounded-3xl border border-slate-800">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">技术原理：工作机制拆解</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          在 Transformer 架构中，MoE 替换了原本的前馈神经网络 (FFN) 层。
          它由 <b>门控网络 (Router)</b> 和 <b>专家网络 (Experts)</b> 组成。
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
        
        {/* Diagram */}
        <div className="relative w-full max-w-md bg-slate-800 rounded-xl p-8 border border-slate-700 min-h-[400px] flex flex-col items-center">
           <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">Transformer Layer</div>
           
           {/* Input Token */}
           <div className={`transition-all duration-500 ${step === 0 ? 'scale-110 text-white' : 'text-slate-400'} flex flex-col items-center mb-8`}>
             <div className="px-4 py-2 bg-slate-700 rounded border border-slate-600 mb-2">Input Token (x)</div>
             <ArrowDown size={20} className="text-slate-500" />
           </div>

           {/* Router */}
           <div className={`relative z-10 w-full flex flex-col items-center transition-all duration-500 ${step === 1 ? 'opacity-100' : 'opacity-70'}`}>
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-900/50 mb-2">
                <GitMerge className="text-white" />
              </div>
              <span className="text-sm font-bold text-purple-300">Router (Gate)</span>
              <span className="text-xs text-purple-200/60 mb-8">Top-k Selection</span>
           </div>

           {/* Experts Layer */}
           <div className="grid grid-cols-4 gap-2 w-full mb-8 relative">
              {/* Lines from Router */}
              <div className="absolute -top-6 left-0 w-full flex justify-center">
                 <div className={`w-[45%] h-6 border-t border-l border-r border-slate-600 rounded-t-xl transition-colors duration-300 ${step === 2 ? 'border-green-400' : ''}`}></div>
              </div>

              {[1, 2, 3, 4].map((i) => {
                 // Simulate Expert 1 and 3 being selected
                 const isActive = (i === 1 || i === 3) && step >= 2;
                 return (
                   <div key={i} className={`h-24 rounded flex items-center justify-center text-xs font-mono border transition-all duration-500 
                     ${isActive 
                        ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] transform -translate-y-1' 
                        : 'bg-slate-700/30 border-slate-700 text-slate-600'}`}>
                     E{i}
                   </div>
                 )
              })}
           </div>

           {/* Output */}
           <div className={`flex flex-col items-center transition-all duration-500 ${step === 3 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2'}`}>
              <div className="w-full h-[1px] bg-slate-600 w-32 mb-2 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 px-2 text-xs text-slate-400">Weighted Sum</div>
              </div>
              <div className="px-4 py-2 bg-green-900/30 border border-green-500/30 text-green-400 rounded">Output (y)</div>
           </div>
        </div>

        {/* Math & Explanation */}
        <div className="w-full max-w-lg space-y-8">
           <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
             <h3 className="text-lg font-semibold text-blue-300 mb-4 flex items-center gap-2">
               <Calculator size={20} /> 核心公式
             </h3>
             <div className="font-mono text-lg text-center bg-slate-950 p-6 rounded-lg border border-slate-800 shadow-inner text-slate-200 overflow-x-auto">
                y = <span className="text-purple-400">∑</span> <span className="text-yellow-400">G(x)<i>i</i></span> · <span className="text-blue-400">E<i>i</i>(x)</span>
             </div>
             <div className="mt-4 space-y-2 text-sm text-slate-400">
                <p><span className="text-yellow-400 font-mono font-bold">G(x)</span> : 门控网络输出的权重（概率）。如果是 0，该专家不参与计算。</p>
                <p><span className="text-blue-400 font-mono font-bold">E(x)</span> : 第 i 个专家网络的输出。</p>
             </div>
           </div>

           <div className="space-y-4">
             <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-500 shrink-0">A</div>
               <div>
                 <h4 className="font-bold text-white">专家网络 (The Experts)</h4>
                 <p className="text-sm text-slate-400">一组平行的前馈神经网络 (FFN)。它们在训练中自动分化，分别擅长语法、代码、逻辑等不同领域。</p>
               </div>
             </div>
             <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-500 shrink-0">B</div>
               <div>
                 <h4 className="font-bold text-white">门控网络 (Router)</h4>
                 <p className="text-sm text-slate-400">MoE 的“大脑”。使用 Top-k 策略 (通常 k=2)，对于每个 Token 只激活概率最高的几个专家。</p>
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default TechnicalArchitecture;