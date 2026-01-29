import React, { useState } from 'react';
import { User, Users, Activity, Brain, Clock, AlertCircle } from 'lucide-react';

const Comparison: React.FC = () => {
  const [mode, setMode] = useState<'dense' | 'moe'>('dense');

  return (
    <div className="w-full bg-slate-900 py-12 px-6 rounded-3xl border border-slate-800">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-4">生动比喻：综合医院</h2>
        <div className="inline-flex bg-slate-800 p-1 rounded-full border border-slate-700">
          <button
            onClick={() => setMode('dense')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              mode === 'dense' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dense (传统模型)
          </button>
          <button
            onClick={() => setMode('moe')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              mode === 'moe' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            MoE (混合专家)
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center min-h-[400px]">
        {mode === 'dense' ? (
          // Dense Visualization
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="relative">
              <div className="w-40 h-40 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.4)] animate-pulse">
                <User size={80} className="text-white" />
              </div>
              <div className="absolute -top-4 -right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                Overloaded!
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mt-6">全能医生 (Dense)</h3>
            <p className="text-slate-400 max-w-sm text-center mt-2">
              一个人掌握所有科室知识。遇到病人（Prompt），无论简单复杂，都要调动大脑所有知识。
            </p>
            <div className="flex gap-4 mt-6">
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <Clock size={16} /> 速度慢
              </div>
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <Brain size={16} /> 记忆负担重
              </div>
            </div>
          </div>
        ) : (
          // MoE Visualization
          <div className="flex flex-col items-center w-full animate-in fade-in zoom-in duration-500">
             <div className="relative w-full max-w-2xl flex flex-col items-center">
                {/* Router */}
                <div className="w-20 h-20 bg-slate-700 rounded-lg flex flex-col items-center justify-center border-2 border-purple-500 mb-12 z-10">
                  <Activity className="text-purple-400 mb-1" />
                  <span className="text-[10px] text-purple-200">导诊台</span>
                </div>

                {/* Lines */}
                <div className="absolute top-16 w-full flex justify-center h-20 overflow-hidden">
                    <div className="w-[80%] border-t-2 border-dashed border-slate-600 h-full rounded-t-full"></div>
                </div>

                {/* Experts */}
                <div className="grid grid-cols-4 gap-4 w-full">
                  {[
                    {name: "心脏科", icon: Activity, active: true},
                    {name: "骨科", icon: User, active: false},
                    {name: "神经科", icon: Brain, active: true},
                    {name: "皮肤科", icon: User, active: false},
                  ].map((doc, idx) => (
                    <div key={idx} className={`flex flex-col items-center transition-all duration-500 ${doc.active ? 'opacity-100 scale-105' : 'opacity-40 scale-95'}`}>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${doc.active ? 'bg-purple-600 shadow-[0_0_30px_rgba(147,51,234,0.5)]' : 'bg-slate-800'}`}>
                        <doc.icon className="text-white" size={24} />
                      </div>
                      <span className="text-sm text-slate-300">{doc.name}</span>
                      {doc.active && <span className="text-[10px] text-green-400 mt-1">Working</span>}
                    </div>
                  ))}
                </div>
             </div>

             <div className="mt-8 text-center max-w-md">
               <h3 className="text-xl font-bold text-white">专家团队 (MoE)</h3>
               <p className="text-slate-400 text-sm mt-2">
                 病人来了，导诊台只指派最相关的 2 位专家会诊。其他专家休息。
               </p>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <Clock size={16} /> 响应快
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <Users size={16} /> 容量大
                  </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comparison;