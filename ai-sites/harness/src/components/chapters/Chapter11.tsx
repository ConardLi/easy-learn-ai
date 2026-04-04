import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Wrench, 
  FileText, 
  Settings, 
  AlertCircle,
  Zap,
  Layers,
  Clock,
  Target,
  Box
} from 'lucide-react';

const OVERLOAD_ITEMS = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  icon: i % 3 === 0 ? Wrench : i % 3 === 1 ? FileText : Settings,
  angle: (i * 360) / 15,
  delay: Math.random() * 0.5
}));

export default function Chapter11({ step }: { step: number }) {
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
              包括最近很火的 <span className="text-[#8B5CF6] font-black mx-2">Agent Skills</span><br/>
              本质上也是 Context Engineering 的高级实践
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: The Overload Problem (Steps 1-2) */}
      <AnimatePresence>
        {step >= 1 && step <= 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: step === 2 ? -250 : -200 }}
              className="text-center z-30"
            >
              <h2 className="text-4xl font-bold text-[#43302B] leading-relaxed">
                如果把所有工具、说明、参数<br/>
                <span className="text-[#EF4444]">全部一上来塞给模型</span>
              </h2>
              <AnimatePresence>
                {step === 2 && (
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl text-gray-500 font-medium mt-4 bg-white/80 px-6 py-2 rounded-full backdrop-blur-sm inline-block shadow-sm border border-gray-100"
                  >
                    上下文窗口是稀缺资源，信息一多，注意力就散了
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-10">
              {/* Brain */}
              <motion.div 
                animate={step === 2 ? { 
                  x: [-5, 5, -5, 5, 0], 
                  filter: ['hue-rotate(0deg)', 'hue-rotate(-50deg)', 'hue-rotate(0deg)'] 
                } : {}}
                transition={{ duration: 0.5, repeat: step === 2 ? Infinity : 0 }}
                className={`w-32 h-32 rounded-3xl flex items-center justify-center border-4 relative z-20 transition-colors duration-500 ${step === 2 ? 'bg-red-100 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.6)]' : 'bg-purple-100 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.3)]'}`}
              >
                <Brain className={`w-16 h-16 ${step === 2 ? 'text-red-600' : 'text-purple-600'}`} />
                
                <AnimatePresence>
                  {step === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-12 bg-red-500 text-white px-4 py-1 rounded-full font-bold flex items-center gap-2 whitespace-nowrap shadow-lg"
                    >
                      <AlertCircle className="w-5 h-5" />
                      注意力涣散
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Overload Items */}
              {OVERLOAD_ITEMS.map((item) => {
                const radius = 250;
                const rad = (item.angle * Math.PI) / 180;
                const startX = Math.cos(rad) * radius;
                const startY = Math.sin(rad) * radius;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: startX, y: startY }}
                    animate={{ 
                      opacity: 1, 
                      x: step === 2 ? Math.cos(rad) * 80 : startX, 
                      y: step === 2 ? Math.sin(rad) * 80 : startY,
                      scale: step === 2 ? 0.5 : 1
                    }}
                    transition={{ 
                      duration: step === 2 ? 0.5 : 0.8, 
                      delay: step === 2 ? item.delay * 0.2 : item.delay,
                      type: 'spring'
                    }}
                    className="absolute w-12 h-12 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-center z-10"
                    style={{ marginLeft: -24, marginTop: -24 }}
                  >
                    <item.icon className="w-6 h-6 text-gray-400" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: Progressive Disclosure Concept (Step 3) */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="absolute z-50 text-center bg-white/95 backdrop-blur-2xl p-20 rounded-[4rem] shadow-2xl border border-[#10B981]/30 max-w-5xl"
          >
            <p className="text-3xl text-gray-500 font-medium mb-8 tracking-wide">
              所以 Skills 采用的是一种特别典型的思路：
            </p>
            <h2 className="text-7xl font-black text-[#10B981] tracking-tight">
              渐进式披露
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Progressive Disclosure Animation (Steps 4-5) */}
      <AnimatePresence>
        {step >= 4 && step <= 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: -250 }}
              className="text-4xl font-bold text-[#43302B] text-center"
            >
              {step === 4 ? (
                <span>先只给它<span className="text-[#10B981] mx-2">最少量的元信息</span></span>
              ) : (
                <span>等触发了能力，再<span className="text-[#3B82F6] mx-2">动态加载</span>详细内容</span>
              )}
            </motion.h2>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-10 w-full max-w-5xl flex items-center justify-between px-10">
              
              {/* Skills List (Meta Info) */}
              <div className="flex flex-col gap-6">
                {['Skill A: 搜索', 'Skill B: 数据分析', 'Skill C: 绘图'].map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ 
                      opacity: step === 5 && i !== 1 ? 0.3 : 1, 
                      x: 0,
                      scale: step === 5 && i === 1 ? 1.05 : 1,
                      borderColor: step === 5 && i === 1 ? '#3B82F6' : '#E5E7EB'
                    }}
                    className={`bg-white px-6 py-4 rounded-2xl shadow-md border-2 flex items-center gap-4 ${step === 5 && i === 1 ? 'ring-4 ring-blue-100' : ''}`}
                  >
                    <Box className={`w-6 h-6 ${step === 5 && i === 1 ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span className={`text-xl font-bold ${step === 5 && i === 1 ? 'text-blue-600' : 'text-gray-700'}`}>{skill}</span>
                  </motion.div>
                ))}
              </div>

              {/* Dynamic Loading Flow */}
              <div className="flex-1 h-32 relative mx-10">
                <AnimatePresence>
                  {step === 5 && (
                    <>
                      {/* Connecting Line */}
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-blue-100 origin-left rounded-full"
                      />
                      
                      {/* Flowing Data Packets */}
                      {[
                        { text: 'SOP', delay: 0 },
                        { text: '资源', delay: 0.4 },
                        { text: '模板', delay: 0.8 }
                      ].map((packet, i) => (
                        <motion.div
                          key={packet.text}
                          initial={{ x: 0, opacity: 0, scale: 0.5 }}
                          animate={{ x: '100%', opacity: [0, 1, 1, 0], scale: 1 }}
                          transition={{ duration: 2, delay: packet.delay, repeat: Infinity, ease: "linear" }}
                          className="absolute top-1/2 -translate-y-1/2 left-0 bg-blue-500 text-white px-4 py-1 rounded-full font-bold text-sm shadow-lg whitespace-nowrap z-10"
                        >
                          {packet.text}
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Brain */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-40 h-40 bg-purple-50 rounded-3xl flex items-center justify-center border-4 border-purple-200 relative shrink-0"
              >
                <Brain className="w-20 h-20 text-purple-500" />
                <AnimatePresence>
                  {step === 5 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
                    >
                      <Zap className="w-6 h-6 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 5: The Core Takeaway (Step 6) */}
      <AnimatePresence>
        {step === 6 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <h2 className="text-4xl font-bold text-gray-500 mb-16 text-center">
              上下文优化，不只是“给更多”，而是：
            </h2>

            <div className="flex items-center gap-8">
              {[
                { icon: Target, title: '按需给', color: '#3B82F6', desc: '只提供当前任务必需的信息' },
                { icon: Layers, title: '分层给', color: '#8B5CF6', desc: '从元信息到详细内容的渐进展开' },
                { icon: Clock, title: '在正确时机给', color: '#10B981', desc: '在触发特定能力时动态加载' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, type: 'spring', bounce: 0.4 }}
                  className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center w-72 hover:-translate-y-2 transition-transform"
                >
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <item.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-800 mb-4">{item.title}</h3>
                  <p className="text-gray-500 font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
