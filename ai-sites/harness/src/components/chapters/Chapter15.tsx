import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Brain, 
  Settings, 
  Equal, 
  Plus, 
  Minus,
  Layers
} from 'lucide-react';

export default function Chapter15({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Scene 1: Intro (Step 0) */}
      <AnimatePresence>
        {step === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <h2 className="text-5xl font-bold text-[#43302B] text-center leading-relaxed">
              LangChain 的工程师给 Harness<br/>
              下了一个很典型的案例：
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: The Equation (Steps 1-2) */}
      <AnimatePresence>
        {step >= 1 && step <= 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <div className="flex items-center justify-center gap-6 w-full max-w-5xl">
              
              {/* Agent */}
              <motion.div 
                layout
                className={`flex flex-col items-center gap-4 ${step === 1 ? 'order-1' : 'order-3'}`}
              >
                <div className="w-32 h-32 bg-blue-100 rounded-3xl flex items-center justify-center border-4 border-blue-500 shadow-xl">
                  <Bot className="w-16 h-16 text-blue-600" />
                </div>
                <span className="text-3xl font-black text-blue-600">Agent</span>
              </motion.div>

              {/* Equal Sign */}
              <motion.div layout className="order-2 flex items-center justify-center px-4">
                <Equal className="w-12 h-12 text-gray-400" />
              </motion.div>

              {/* Model */}
              <motion.div 
                layout
                className={`flex flex-col items-center gap-4 ${step === 1 ? 'order-3' : 'order-5'}`}
              >
                <div className="w-32 h-32 bg-purple-100 rounded-3xl flex items-center justify-center border-4 border-purple-500 shadow-xl">
                  <Brain className="w-16 h-16 text-purple-600" />
                </div>
                <span className="text-3xl font-black text-purple-600">Model</span>
              </motion.div>

              {/* Operator (+ / -) */}
              <motion.div layout className="order-4 flex items-center justify-center px-4">
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div key="plus" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                      <Plus className="w-12 h-12 text-gray-400" />
                    </motion.div>
                  ) : (
                    <motion.div key="minus" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                      <Minus className="w-12 h-12 text-gray-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Harness */}
              <motion.div 
                layout
                className={`flex flex-col items-center gap-4 ${step === 1 ? 'order-5' : 'order-1'}`}
              >
                <motion.div 
                  animate={step === 2 ? { boxShadow: ['0 0 0px rgba(16,185,129,0)', '0 0 60px rgba(16,185,129,0.6)', '0 0 0px rgba(16,185,129,0)'] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-32 h-32 bg-green-100 rounded-3xl flex items-center justify-center border-4 border-green-500 shadow-xl"
                >
                  <Settings className="w-16 h-16 text-green-600" />
                </motion.div>
                <span className="text-3xl font-black text-green-600">Harness</span>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: Human Translation (Step 3) */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h3 className="text-3xl text-gray-500 font-bold mb-12">翻译成人话就是：</h3>
            
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 max-w-5xl flex flex-col items-center text-center relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50" />
              
              <p className="text-4xl font-bold text-[#43302B] leading-relaxed relative z-10">
                在一个 Agent 系统里，<br/>
                除了<span className="text-purple-600 mx-2">模型本身</span>以外，<br/>
                几乎所有决定它能不能<span className="text-blue-600 mx-2">稳定交付</span>的东西，<br/>
                都可以算进 <span className="text-green-600 font-black text-5xl mx-2 bg-green-50 px-4 py-2 rounded-xl border border-green-200">Harness</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: The 6 Layers (Step 4) */}
      <AnimatePresence>
        {step === 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <motion.h2 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: -250 }}
              className="text-4xl font-bold text-[#43302B] text-center"
            >
              如果把它拆开来看，<br/>
              我自己会把一个成熟的 Harness 分成<span className="text-[#8B5CF6] text-6xl font-black mx-2">六层</span>
            </motion.h2>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-16 flex flex-col items-center justify-end h-[400px]">
              {[
                { id: 6, name: '约束与恢复' },
                { id: 5, name: '评估与观测' },
                { id: 4, name: '状态与记忆' },
                { id: 3, name: '执行编排' },
                { id: 2, name: '工具系统' },
                { id: 1, name: '上下文管理' }
              ].map((layer, index) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, y: -50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.15, 
                    type: 'spring', 
                    bounce: 0.4 
                  }}
                  className="w-[500px] h-16 rounded-xl border-2 flex items-center justify-center shadow-lg relative"
                  style={{
                    backgroundColor: `hsla(${260 - layer.id * 15}, 70%, 95%, 0.9)`,
                    borderColor: `hsla(${260 - layer.id * 15}, 70%, 60%, 1)`,
                    marginTop: '-10px',
                    zIndex: 10 - layer.id,
                    transform: `perspective(1000px) rotateX(20deg) scale(${1 - layer.id * 0.02})`,
                  }}
                >
                  <span 
                    className="text-2xl font-black tracking-widest flex items-center gap-4"
                    style={{ color: `hsla(${260 - layer.id * 15}, 70%, 40%, 1)` }}
                  >
                    <span className="opacity-50 text-lg">LAYER {layer.id}</span>
                    {layer.name}
                  </span>
                  
                  {/* Glowing edge effect */}
                  <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_10px_rgba(255,255,255,0.8)]" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
