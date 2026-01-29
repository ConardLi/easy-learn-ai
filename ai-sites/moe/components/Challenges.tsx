import React from 'react';
import { Database, Scale, AlertTriangle } from 'lucide-react';

const Challenges: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-red-500/10 rounded-lg">
          <AlertTriangle className="text-red-500 w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-white">MoE 的挑战与缺点</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Challenge 1 */}
        <div className="bg-[#161b22] border border-red-900/30 rounded-2xl p-8 hover:border-red-500/30 transition-colors">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <Database className="text-red-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">显存需求极大 (VRAM Hungry)</h3>
          <p className="text-slate-400 leading-relaxed mb-4">
            虽然每次计算只用一小部分参数，但<b>所有参数必须都加载在显存里</b>（或在内存中极速切换）。
          </p>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 text-sm text-slate-300">
            <span className="text-red-400 font-bold">例子：</span> 运行 Mixtral 8x7B (47B参数) 对显存容量的要求远高于同等计算量的 LLaMA-7B。这对消费级显卡极不友好。
          </div>
        </div>

        {/* Challenge 2 */}
        <div className="bg-[#161b22] border border-orange-900/30 rounded-2xl p-8 hover:border-orange-500/30 transition-colors">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <Scale className="text-orange-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">训练负载均衡 (Load Balancing)</h3>
          <p className="text-slate-400 leading-relaxed mb-4">
            训练初期，Router 容易产生偏好，把所有任务都扔给某一个“最强”的专家，导致该专家<b>累死</b>，其他专家<b>没事干</b>（称为 <b>Collapse/坍塌问题</b>）。
          </p>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 text-sm text-slate-300">
            <span className="text-orange-400 font-bold">解决：</span> 需要设计复杂的辅助 Loss 函数（Auxiliary Loss）来强制 Router “雨露均沾”，确保所有专家都能得到训练。
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;