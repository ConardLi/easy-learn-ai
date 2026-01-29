import React, { useState, useEffect } from 'react';
import { ArrowDown, Cpu, Calculator, Code, BookText, FlaskConical, Search, Music, Palette } from 'lucide-react';
import { SimulationExpert } from '../types';

const expertsData: SimulationExpert[] = [
  { id: 1, name: "Math Expert", specialty: "math", color: "bg-red-500", active: false },
  { id: 2, name: "Code Expert", specialty: "code", color: "bg-blue-500", active: false },
  { id: 3, name: "History Expert", specialty: "history", color: "bg-amber-500", active: false },
  { id: 4, name: "Science Expert", specialty: "science", color: "bg-green-500", active: false },
  { id: 5, name: "Arts Expert", specialty: "art", color: "bg-purple-500", active: false },
  { id: 6, name: "Generalist A", specialty: "general", color: "bg-slate-500", active: false },
  { id: 7, name: "Generalist B", specialty: "general", color: "bg-slate-500", active: false },
  { id: 8, name: "Grammar Expert", specialty: "language", color: "bg-pink-500", active: false },
];

const Simulation: React.FC = () => {
  const [query, setQuery] = useState("");
  const [experts, setExperts] = useState(expertsData);
  const [isComputing, setIsComputing] = useState(false);
  const [activeIds, setActiveIds] = useState<number[]>([]);

  useEffect(() => {
    // Debounce the simulation
    const timer = setTimeout(() => {
      handleRouting(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleRouting = (input: string) => {
    setIsComputing(true);
    const lowerInput = input.toLowerCase();
    
    // Simple heuristic for demonstration
    let targetIds: number[] = [];
    
    if (lowerInput.includes("calc") || lowerInput.includes("math") || lowerInput.includes("add") || /\d/.test(lowerInput)) targetIds.push(1);
    if (lowerInput.includes("function") || lowerInput.includes("const") || lowerInput.includes("code") || lowerInput.includes("bug")) targetIds.push(2);
    if (lowerInput.includes("war") || lowerInput.includes("king") || lowerInput.includes("year") || lowerInput.includes("who")) targetIds.push(3);
    if (lowerInput.includes("atom") || lowerInput.includes("bio") || lowerInput.includes("physic")) targetIds.push(4);
    if (lowerInput.includes("paint") || lowerInput.includes("draw") || lowerInput.includes("style")) targetIds.push(5);
    if (lowerInput.includes("write") || lowerInput.includes("essay") || lowerInput.includes("text")) targetIds.push(8);

    // If no specific keyword, select generalists or random
    if (targetIds.length === 0 && input.length > 0) {
      targetIds = [6, 7]; // Default fallbacks
    } else if (targetIds.length === 1) {
       // Always ensure at least 2 for MoE usually
       targetIds.push(6);
    }

    if (input.length === 0) targetIds = [];

    // Update Visualization
    setActiveIds(targetIds);
    setExperts(prev => prev.map(exp => ({
      ...exp,
      active: targetIds.includes(exp.id)
    })));
    setIsComputing(false);
  };

  const getIcon = (specialty: string) => {
    switch(specialty) {
      case 'math': return <Calculator size={18} />;
      case 'code': return <Code size={18} />;
      case 'history': return <BookText size={18} />;
      case 'science': return <FlaskConical size={18} />;
      case 'art': return <Palette size={18} />;
      case 'language': return <Search size={18} />;
      default: return <Cpu size={18} />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-slate-800/30 rounded-2xl border border-slate-700 my-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">MoE 路由模拟器 (Router Simulator)</h3>
        <p className="text-slate-400">试着在下方输入不同的任务，观察 Router 如何唤醒不同的专家。</p>
      </div>

      {/* Input Section */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入任务：例如 'calculate 2+2', 'fix python code', 'who was Napoleon'..."
          className="w-full max-w-lg px-6 py-3 bg-slate-900 border border-blue-500/30 rounded-full text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center"
        />
        <div className={`transition-opacity duration-300 ${isComputing ? 'opacity-100' : 'opacity-0'} text-blue-400 text-sm font-mono`}>
          Routing...
        </div>
      </div>

      {/* Visualization */}
      <div className="relative flex flex-col items-center">
        {/* Router Node */}
        <div className="z-10 w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex flex-col items-center justify-center shadow-lg shadow-blue-900/50 border-4 border-slate-800 mb-16">
          <Search className="text-white mb-1" />
          <span className="text-xs font-bold text-white">Router</span>
        </div>

        {/* Connections Layer */}
        <svg className="absolute top-12 left-0 w-full h-full pointer-events-none" style={{ height: '200px' }}>
          {experts.map((exp, index) => {
             // Calculate positions (simplified)
             const total = experts.length;
             const x = (index / (total - 1)) * 100;
             const strokeColor = exp.active ? '#60a5fa' : '#334155';
             const opacity = exp.active ? 1 : 0.2;
             const width = exp.active ? 3 : 1;
             
             return (
               <path 
                 key={exp.id}
                 d={`M 50% 10 C 50% 80, ${x}% 20, ${x}% 100`} 
                 stroke={strokeColor} 
                 strokeWidth={width}
                 fill="none"
                 opacity={opacity}
                 className="transition-all duration-500"
               />
             );
          })}
        </svg>

        {/* Experts Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 w-full">
          {experts.map((exp) => (
            <div key={exp.id} className="flex flex-col items-center gap-2 group">
              <div 
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 
                  ${exp.active ? `${exp.color} scale-110 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]` : 'bg-slate-800 border-slate-700 opacity-60 grayscale'}`}
              >
                <div className="text-white">{getIcon(exp.specialty)}</div>
              </div>
              <span className={`text-xs font-medium transition-colors duration-300 ${exp.active ? 'text-white' : 'text-slate-600'}`}>
                {exp.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-900/20 rounded-lg text-center border border-blue-900/50">
        <p className="text-sm text-blue-200">
          <span className="font-bold">状态:</span> 
          {activeIds.length > 0 
            ? ` 激活了 ${activeIds.length} 个专家 (${activeIds.map(id => experts.find(e => e.id === id)?.name).join(', ')})` 
            : " 等待输入..."}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          注意：这只是一个简化的模拟。实际模型中，Router 使用复杂的向量计算来决定概率。
        </p>
      </div>
    </div>
  );
};

export default Simulation;