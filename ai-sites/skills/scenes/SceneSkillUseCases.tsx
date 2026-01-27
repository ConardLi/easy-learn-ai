import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { Repeat, FileCode, PenTool, Archive, ArrowRight, Box, Hammer, Image as ImageIcon } from 'lucide-react';

export const SceneSkillUseCases: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Title "When to use Skill?"
  // 1: Use Cases Cards (Fixed Workflows)
  // 2: The Evolution (Scattered MCPs -> Packaged Skill)

  const workflows = [
    { id: 'file', label: '读写本地文件', sub: 'Fixed SOP', icon: Archive, color: 'blue' },
    { id: 'code', label: 'Review 代码', sub: 'Standard Pattern', icon: FileCode, color: 'green' },
    { id: 'art', label: '编写文章', sub: 'Fixed Style', icon: PenTool, color: 'yellow' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-7xl px-4 relative">
      
      {/* Header */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="mb-12 text-center z-10"
      >
        <ChalkText as="h2" size="2xl" color="white">什么场景推荐用 Skill？</ChalkText>
        <div className="flex items-center justify-center gap-2 mt-4 text-gray-400">
            <Repeat size={20} className="text-yellow-400" />
            <span>重复性工作流 (Repetitive Workflows)</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="w-full flex flex-col gap-12">
          
          {/* Step 1: Workflow Examples */}
          {step >= 1 && (
              <div className="flex flex-wrap justify-center gap-6">
                  {workflows.map((w, i) => (
                      <motion.div
                          key={w.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`w-48 h-40 bg-[#1e1e24] border-2 border-${w.color}-500/30 rounded-2xl flex flex-col items-center justify-center p-4 shadow-lg hover:border-${w.color}-500 transition-colors`}
                      >
                          <div className={`p-3 bg-${w.color}-500/20 rounded-full mb-3`}>
                              <w.icon size={28} className={`text-${w.color}-400`} />
                          </div>
                          <div className={`text-${w.color}-200 font-bold text-center`}>{w.label}</div>
                          <div className="text-gray-500 text-xs mt-1">{w.sub}</div>
                      </motion.div>
                  ))}
              </div>
          )}

          {/* Step 2: The Evolution / Packaging */}
          {step >= 2 && (
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="relative mt-8 bg-gray-800/30 rounded-3xl p-8 border border-white/10"
              >
                  <div className="absolute -top-4 left-8 bg-white text-black px-3 py-1 text-xs font-bold rounded uppercase">
                      Evolution
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                      
                      {/* Before: Scattered */}
                      <div className="flex flex-col items-center gap-4 opacity-50 grayscale">
                          <div className="flex gap-2">
                             <div className="w-12 h-12 border border-dashed border-white rounded flex items-center justify-center"><Archive size={20}/></div>
                             <div className="w-12 h-12 border border-dashed border-white rounded flex items-center justify-center"><Hammer size={20}/></div>
                             <div className="w-12 h-12 border border-dashed border-white rounded flex items-center justify-center"><ImageIcon size={20}/></div>
                          </div>
                          <div className="text-sm text-gray-400">Past: Multiple MCPs</div>
                      </div>

                      {/* Arrow */}
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="text-white/30"
                      >
                          <ArrowRight size={32} />
                      </motion.div>

                      {/* After: Packaged Skill */}
                      <motion.div 
                         initial={{ scale: 0.8, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         transition={{ type: "spring" }}
                         className="flex flex-col items-center"
                      >
                          <div className="w-48 h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500 rounded-xl flex items-center justify-center relative shadow-[0_0_40px_rgba(234,179,8,0.2)]">
                              <Box size={48} className="text-yellow-400" />
                              
                              {/* Particles inside */}
                              <div className="absolute top-2 left-2 text-yellow-500/50"><Archive size={16}/></div>
                              <div className="absolute bottom-2 right-2 text-yellow-500/50"><ImageIcon size={16}/></div>
                              
                              <div className="absolute -bottom-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                  All-in-One Skill
                              </div>
                          </div>
                          <div className="text-sm text-yellow-200 mt-4 font-bold">
                              打包成一个 Skill
                          </div>
                      </motion.div>

                  </div>
                  
                  <div className="text-center mt-6 text-gray-400 text-sm max-w-lg mx-auto">
                      现在，你可以把<span className="text-white font-bold mx-1">链接外部世界的能力</span>直接打包进 Skill，<br/>无需单独配置复杂的 MCP。
                  </div>

              </motion.div>
          )}

      </div>
    </div>
  );
};