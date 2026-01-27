import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { HelpCircle, Server, ShieldCheck, TrendingDown, AlertTriangle } from 'lucide-react';

export const SceneMCPConclusion: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: The Question
  // 1: The Answer Part 1 (Won't be eliminated)
  // 2: The Answer Part 2 (Demand reduced)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-5xl px-4 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
         <div className="absolute top-1/4 left-1/4 animate-pulse">
             <HelpCircle size={100} />
         </div>
         <div className="absolute bottom-1/4 right-1/4 animate-pulse" style={{ animationDelay: '1s' }}>
             <HelpCircle size={150} />
         </div>
      </div>

      {/* Step 0: The Question */}
      <motion.div 
        className="flex flex-col items-center text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
            opacity: step === 0 ? 1 : 0.5, 
            y: step === 0 ? 0 : -50,
            scale: step === 0 ? 1 : 0.8,
            filter: step === 0 ? 'blur(0px)' : 'blur(2px)'
        }}
        transition={{ duration: 0.5 }}
      >
         <div className="bg-white/10 p-4 rounded-full border border-white/20 mb-6">
             <HelpCircle size={48} className="text-white" />
         </div>
         
         <ChalkText size="xl" className="text-gray-400 mb-4 max-w-2xl">
             Skills 看起来更智能、更节省资源...
         </ChalkText>
         <ChalkText as="h2" size="4xl" color="white" className="font-bold mb-8">
             那 MCP 会被淘汰吗？
         </ChalkText>
      </motion.div>

      {/* Step 1 & 2: The Conclusion */}
      {(step >= 1) && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center z-20 mt-12">
              
              {/* Part 1: Won't be eliminated */}
              <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#1e1e24] border-4 border-green-500 p-8 rounded-3xl shadow-[0_0_60px_rgba(34,197,94,0.4)] text-center mb-8 relative z-20"
              >
                  <div className="flex items-center justify-center gap-4 mb-2">
                      <ShieldCheck size={40} className="text-green-400" />
                      <ChalkText size="2xl" className="font-bold text-white">
                          结论是：不会！
                      </ChalkText>
                  </div>
                  <ChalkText size="lg" className="text-green-200">
                      MCP 不会被完全淘汰
                  </ChalkText>
              </motion.div>

              {/* Part 2: Demand Reduced */}
              {step >= 2 && (
                  <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative w-full max-w-2xl"
                  >
                      <div className="bg-red-900/30 border border-red-500/50 p-6 rounded-2xl backdrop-blur-md flex items-center justify-between gap-6">
                          
                          <div className="flex-1 text-left">
                              <ChalkText size="xl" className="font-bold text-white mb-1">
                                  但对它的需求会
                              </ChalkText>
                              <ChalkText size="4xl" color="yellow" className="font-bold tracking-wider">
                                  大幅减少！
                              </ChalkText>
                          </div>

                          {/* Visual: Shrinking Bar/Arrow */}
                          <div className="flex flex-col items-center gap-2 bg-black/40 p-4 rounded-xl border border-white/10">
                              <div className="flex items-end gap-2 h-24">
                                  {/* Before */}
                                  <div className="w-8 h-full bg-gray-600 rounded-t opacity-50 relative">
                                      <div className="absolute -bottom-6 text-xs text-gray-500 w-full text-center">Past</div>
                                  </div>
                                  {/* Arrow */}
                                  <TrendingDown size={24} className="text-yellow-400 mb-8" />
                                  {/* After */}
                                  <motion.div 
                                      initial={{ height: '100%' }}
                                      animate={{ height: '20%' }}
                                      transition={{ duration: 1.5, type: "spring" }}
                                      className="w-8 bg-yellow-500 rounded-t relative"
                                  >
                                      <div className="absolute -bottom-6 text-xs text-yellow-500 w-full text-center font-bold">Now</div>
                                  </motion.div>
                              </div>
                          </div>

                      </div>
                  </motion.div>
              )}

          </div>
      )}

    </div>
  );
};