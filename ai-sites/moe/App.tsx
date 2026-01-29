import React, { useState } from 'react';
import { BookOpen, ChevronRight, Brain, Zap, Layers, Server } from 'lucide-react';
import Simulation from './components/Simulation';
import Comparison from './components/Comparison';
import KnowledgeCard from './components/KnowledgeCard';
import CoreConcept from './components/CoreConcept';
import TechnicalArchitecture from './components/TechnicalArchitecture';
import Challenges from './components/Challenges';
import Summary from './components/Summary';
import { MODEL_EXAMPLES } from './constants';

const App: React.FC = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                MoE Explorer
              </span>
            </div>
            <button
              onClick={() => setIsCardOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full border border-slate-700 transition-all hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] text-sm font-medium group"
            >
              <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
              知识卡片
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-32">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-in slide-in-from-bottom-10 fade-in duration-700 pt-10">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-2">
            AI Architecture Decoded
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Mixture of <span className="gradient-text">Experts</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed">
            让大模型“参数总量巨大，但推理速度飞快”的秘密武器。<br/>
            GPT-4、DeepSeek、Mixtral 背后的核心架构。
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <a href="#simulation" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2">
              试玩模拟器 <ChevronRight size={18} />
            </a>
            <a href="#core-concept" className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-full border border-slate-700 transition-all">
              了解原理
            </a>
          </div>
        </section>

        {/* 1. Core Concept */}
        <section id="core-concept" className="scroll-mt-24">
           <CoreConcept />
        </section>

        {/* 2. Metaphor (Hospital) */}
        <section id="metaphor" className="scroll-mt-24">
          <Comparison />
        </section>

        {/* 3. Technical Architecture */}
        <section id="tech" className="scroll-mt-24">
          <TechnicalArchitecture />
        </section>

        {/* 4. Why MoE (Pros) */}
        <section className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "训练成本更低",
              desc: "用同样的算力训练出更大容量的模型，打破 Scaling Law 瓶颈。",
              icon: Layers,
              color: "text-blue-400",
              bg: "bg-blue-900/20"
            },
            {
              title: "推理速度极快",
              desc: "1000亿参数的模型，每次只激活100亿，响应速度如闪电。",
              icon: Zap,
              color: "text-yellow-400",
              bg: "bg-yellow-900/20"
            },
            {
              title: "支持长上下文",
              desc: "计算效率高，使得 MoE 架构更容易扩展到超长上下文的处理。",
              icon: Server,
              color: "text-green-400",
              bg: "bg-green-900/20"
            }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-600 transition-colors group">
              <div className={`w-12 h-12 ${item.bg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`${item.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* 5. Simulation */}
        <section id="simulation" className="scroll-mt-24">
          <Simulation />
        </section>

        {/* 6. Challenges (Cons) */}
        <section id="challenges">
          <Challenges />
        </section>

        {/* 7. Examples Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-4">
             <h2 className="text-3xl font-bold text-white">代表模型</h2>
             <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full border border-purple-500/20">Industry Leaders</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {MODEL_EXAMPLES.map((model, idx) => (
              <div key={idx} className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 group hover:border-blue-500/50 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/20 transition-all"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{model.name}</h3>
                      <p className="text-blue-400 text-sm font-medium">{model.creator}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-6 min-h-[3rem] text-sm leading-relaxed">{model.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {model.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300 border border-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Summary */}
        <section>
          <Summary />
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 pt-8 pb-12 text-center">
          <p className="text-slate-500">
            MoE Explainer &copy; {new Date().getFullYear()}
          </p>
          <p className="text-slate-600 text-sm mt-2">
            Designed for learning the future of AI.
          </p>
        </footer>
      </main>

      {/* Knowledge Card Modal */}
      <KnowledgeCard 
        isOpen={isCardOpen} 
        onClose={() => setIsCardOpen(false)} 
      />
    </div>
  );
};

export default App;