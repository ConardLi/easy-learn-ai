import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  FileText, 
  History, 
  BookOpen, 
  Target, 
  Lightbulb, 
  Users, 
  Mic,
  Search,
  Wrench,
  Activity,
  Box,
  Shield,
  Network,
  Cpu
} from 'lucide-react';

const REQUIREMENTS = [
  { id: 1, text: '当前需求文档', icon: FileText, angle: -120 },
  { id: 2, text: '历史评审记录', icon: History, angle: -60 },
  { id: 3, text: '相关规范', icon: BookOpen, angle: 0 },
  { id: 4, text: '当前目标', icon: Target, angle: 60 },
  { id: 5, text: '已分析的中间结论', icon: Lightbulb, angle: 120 },
  { id: 6, text: '输出对象是谁', icon: Users, angle: 180 },
  { id: 7, text: '语气应该怎么调', icon: Mic, angle: 240 },
];

const CONTEXT_ELEMENTS = [
  { id: 1, text: '用户输入', icon: MessageSquare },
  { id: 2, text: '历史对话', icon: History },
  { id: 3, text: '检索结果', icon: Search },
  { id: 4, text: '工具返回', icon: Wrench },
  { id: 5, text: '当前任务状态', icon: Activity },
  { id: 6, text: '中间产物', icon: Box },
  { id: 7, text: '系统规则', icon: BookOpen },
  { id: 8, text: '安全约束', icon: Shield },
  { id: 9, text: '其他 Agent 结果', icon: Network },
];

export default function Chapter9({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Scene 1: Overwhelmed Prompt (Steps 0-1) */}
      <AnimatePresence>
        {step <= 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: step === 1 ? -250 : 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="text-4xl font-bold text-[#43302B] text-center"
            >
              你会发现，这已经完全不是<span className="text-[#8B5CF6] mx-2">一句 prompt</span>能解决的事了
            </motion.h2>

            <AnimatePresence>
              {step === 1 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center mt-10">
                  {/* Central Weak Prompt */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-[#8B5CF6]/10 border-2 border-[#8B5CF6] rounded-full flex items-center justify-center z-20"
                  >
                    <MessageSquare className="w-10 h-10 text-[#8B5CF6]" />
                  </motion.div>

                  {/* Orbiting Requirements */}
                  {REQUIREMENTS.map((req, i) => {
                    const radius = 220;
                    const rad = (req.angle * Math.PI) / 180;
                    const x = Math.cos(rad) * radius;
                    const y = Math.sin(rad) * radius;

                    return (
                      <motion.div
                        key={req.id}
                        initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                        animate={{ opacity: 1, x, y, scale: 1 }}
                        transition={{ duration: 0.6, delay: i * 0.1, type: 'spring' }}
                        className="absolute flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-lg border border-gray-100"
                      >
                        <req.icon className="w-6 h-6 text-gray-600" />
                        <span className="text-lg font-bold text-gray-800 whitespace-nowrap">{req.text}</span>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: Core Concept Overlay (Step 2) */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="absolute z-50 text-center bg-white/95 backdrop-blur-2xl p-20 rounded-[4rem] shadow-2xl border border-[#F59E0B]/30 max-w-5xl"
          >
            <p className="text-3xl text-gray-500 font-medium mb-8 tracking-wide">
              Context Engineering 的核心：
            </p>
            <h2 className="text-5xl font-black text-[#43302B] leading-[1.6] tracking-tight">
              模型未必知道，所以系统必须在调用时<br/>
              <span className="text-[#F59E0B] text-6xl mt-6 inline-block bg-[#F59E0B]/10 px-8 py-4 rounded-3xl border border-[#F59E0B]/20">
                把正确的信息送进去
              </span>
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: The Context Vortex (Steps 3-4) */}
      <AnimatePresence>
        {step >= 3 && step <= 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: step === 4 ? -280 : 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="text-center"
            >
              <p className="text-3xl text-gray-500 font-medium mb-4 line-through decoration-gray-400 decoration-2">
                Context 不只是几段背景资料
              </p>
              <h2 className="text-5xl font-bold text-[#43302B]">
                它是所有会影响模型当前决策的<span className="text-[#F59E0B] mx-2">信息总和</span>
              </h2>
            </motion.div>

            <AnimatePresence>
              {step === 4 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center mt-16">
                  {/* Central Context Core */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, type: 'spring' }}
                    className="w-64 h-64 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(245,158,11,0.5)] z-30 relative"
                  >
                    <span className="text-4xl font-black text-white tracking-wider">CONTEXT</span>
                    {/* Pulsing rings */}
                    <motion.div 
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-0 border-4 border-[#F59E0B] rounded-full"
                    />
                  </motion.div>

                  {/* Elements flying into the core */}
                  {CONTEXT_ELEMENTS.map((el, i) => {
                    const angle = (i * 360) / CONTEXT_ELEMENTS.length;
                    const rad = (angle * Math.PI) / 180;
                    const startRadius = 400;
                    const endRadius = 160;
                    
                    const startX = Math.cos(rad) * startRadius;
                    const startY = Math.sin(rad) * startRadius;
                    const endX = Math.cos(rad) * endRadius;
                    const endY = Math.sin(rad) * endRadius;

                    return (
                      <motion.div
                        key={el.id}
                        initial={{ opacity: 0, x: startX, y: startY, scale: 0.5 }}
                        animate={{ opacity: 1, x: endX, y: endY, scale: 1 }}
                        transition={{ duration: 0.8, delay: i * 0.1, type: 'spring', bounce: 0.3 }}
                        className="absolute flex flex-col items-center gap-2 z-20"
                      >
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center border-2 border-[#F59E0B]/30">
                          <el.icon className="w-7 h-7 text-[#F59E0B]" />
                        </div>
                        <span className="text-sm font-bold text-gray-700 bg-white/80 px-2 py-1 rounded-md backdrop-blur-sm whitespace-nowrap">
                          {el.text}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Prompt is a subset (Step 5) */}
      <AnimatePresence>
        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <div className="relative w-[500px] h-[500px] flex items-center justify-center">
              {/* Big Context Circle */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="absolute inset-0 bg-[#F59E0B]/10 border-4 border-[#F59E0B] rounded-full flex flex-col items-center justify-start pt-16 shadow-[0_0_100px_rgba(245,158,11,0.2)]"
              >
                <span className="text-4xl font-black text-[#F59E0B] tracking-widest">CONTEXT</span>
              </motion.div>

              {/* Small Prompt Circle Inside */}
              <motion.div 
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 60 }}
                transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
                className="w-64 h-64 bg-[#8B5CF6]/20 border-4 border-[#8B5CF6] rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]"
              >
                <MessageSquare className="w-12 h-12 text-[#8B5CF6] mb-2" />
                <span className="text-2xl font-bold text-[#8B5CF6]">Prompt</span>
              </motion.div>
            </div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-5xl font-bold text-[#43302B] mt-16 bg-white/80 px-10 py-5 rounded-full backdrop-blur-sm border border-gray-100 shadow-xl"
            >
              所以你会看到，Prompt 其实只是 Context 的<span className="text-[#F59E0B] mx-2">一部分</span>
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 5: The Supply Mechanism (Step 6) */}
      <AnimatePresence>
        {step === 6 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <h2 className="text-4xl font-bold text-gray-500 mb-16 text-center leading-relaxed">
              也正因为如此，同样的模型、同样的 Prompt<br/>
              放进不同系统里，效果可能差得非常大。
            </h2>

            <div className="flex items-center gap-12">
              {/* System A */}
              <div className="flex flex-col items-center gap-6 opacity-50 grayscale">
                <div className="w-32 h-32 bg-gray-100 rounded-3xl border-4 border-gray-300 flex items-center justify-center">
                  <Cpu className="w-12 h-12 text-gray-400" />
                </div>
                <div className="h-20 w-2 bg-gray-300 rounded-full" />
                <div className="bg-gray-100 px-6 py-3 rounded-xl font-bold text-gray-500">
                  弱供给机制
                </div>
              </div>

              <div className="text-5xl font-black text-gray-300">VS</div>

              {/* System B */}
              <div className="flex flex-col items-center gap-6">
                <div className="w-40 h-40 bg-gradient-to-br from-[#14B8A6] to-[#0D9488] rounded-3xl border-4 border-[#14B8A6] flex items-center justify-center shadow-[0_0_50px_rgba(20,184,166,0.4)]">
                  <Cpu className="w-16 h-16 text-white" />
                </div>
                {/* Flowing data animation */}
                <div className="relative h-20 w-4 bg-[#14B8A6]/20 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ y: [-40, 80] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-10 bg-[#14B8A6] rounded-full blur-sm"
                  />
                </div>
                <div className="bg-[#14B8A6]/10 border border-[#14B8A6]/30 px-8 py-4 rounded-xl font-bold text-[#14B8A6] text-2xl shadow-lg">
                  强大的上下文供给机制
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="mt-20 text-5xl font-black text-[#43302B] bg-white/60 backdrop-blur-md px-12 py-6 rounded-full shadow-2xl border-2 border-[#14B8A6]"
            >
              差别往往不在模型，而在<span className="text-[#14B8A6] ml-4">上下文供给机制</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
