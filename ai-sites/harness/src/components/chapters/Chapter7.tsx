import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Settings2, 
  Code2, 
  Wrench, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  Database,
  ArrowRight
} from 'lucide-react';

const HEAVY_BLOCKS = [
  { id: 1, text: '公司内部文档', icon: FileText, delay: 0.1 },
  { id: 2, text: '产品最新配置', icon: Settings2, delay: 0.3 },
  { id: 3, text: '整套长规范代码', icon: Code2, delay: 0.5 },
  { id: 4, text: '多工具复杂任务', icon: Wrench, delay: 0.7 },
];

const PROS = [
  '澄清任务',
  '约束输出',
  '激发模型已有能力'
];

const CONS = [
  '凭空补齐缺失知识',
  '管理大量动态信息',
  '处理长链路状态变化'
];

export default function Chapter7({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Scene 1: The Ceiling & Heavy Blocks (Steps 0-3) */}
      <AnimatePresence>
        {step <= 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: step >= 2 ? -300 : -50 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="text-5xl font-bold text-[#43302B] text-center"
            >
              但 Prompt 很快就遇到了<span className="text-[#EF4444] mx-2">天花板</span>
            </motion.h2>

            <AnimatePresence>
              {step >= 1 && step <= 3 && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: step >= 2 ? -280 : -20 }}
                  exit={{ opacity: 0 }}
                  className="text-3xl text-gray-500 mt-6 font-medium"
                >
                  因为很多任务不是“你说清楚就行”，而是<span className="text-[#43302B] font-bold">“你得真的知道”</span>
                </motion.p>
              )}
            </AnimatePresence>

            {/* The Heavy Blocks Falling */}
            <AnimatePresence>
              {step >= 2 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6 mt-10">
                  {HEAVY_BLOCKS.map((block, i) => (
                    <motion.div
                      key={block.id}
                      initial={{ opacity: 0, y: -200, rotate: Math.random() * 20 - 10 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ duration: 0.6, delay: block.delay, type: 'spring', bounce: 0.5 }}
                      className="bg-white border-4 border-gray-800 p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(31,41,55,1)] flex flex-col items-center justify-center w-48 h-48"
                    >
                      <block.icon className="w-12 h-12 text-gray-800 mb-4" />
                      <span className="text-xl font-bold text-gray-800 text-center">{block.text}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* The Prompt Bubble Struggling */}
            <AnimatePresence>
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 200, scale: 0.5 }}
                  animate={{ opacity: 1, y: 180, scale: 1 }}
                  className="absolute flex flex-col items-center"
                >
                  <div className="bg-[#8B5CF6]/20 border-2 border-[#8B5CF6] text-[#8B5CF6] px-8 py-4 rounded-full text-2xl font-bold shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center gap-3">
                    <MessageSquare className="w-8 h-8" />
                    提示词写得再漂亮
                  </div>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 60 }}
                    className="w-2 bg-gradient-to-t from-[#8B5CF6] to-transparent mt-2"
                  />
                  <p className="text-2xl font-bold text-[#EF4444] mt-4 bg-white/80 px-6 py-2 rounded-full backdrop-blur-sm">
                    也替代不了事实本身！
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: Pros & Cons Cards (Steps 4-5) */}
      <AnimatePresence>
        {step >= 4 && step <= 6 && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center gap-16 z-0"
            animate={{ 
              filter: step === 6 ? 'blur(12px)' : 'blur(0px)',
              opacity: step === 6 ? 0.3 : 1,
              scale: step === 6 ? 0.95 : 1
            }}
            transition={{ duration: 0.6 }}
          >
            {/* Left Card: Pros */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: -30 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="bg-white p-10 rounded-[3rem] shadow-2xl border-t-8 border-[#10B981] w-[450px]"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-[#10B981]/10 rounded-full">
                  <CheckCircle2 className="w-10 h-10 text-[#10B981]" />
                </div>
                <h3 className="text-4xl font-bold text-[#43302B]">Prompt 擅长</h3>
              </div>
              <div className="space-y-6">
                {PROS.map((pro, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.2 }}
                    className="flex items-center gap-4 text-2xl text-gray-600 font-medium bg-gray-50 p-4 rounded-2xl"
                  >
                    <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                    {pro}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Card: Cons */}
            <AnimatePresence>
              {step >= 5 && (
                <motion.div
                  initial={{ opacity: 0, x: 100, rotateY: 30 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.8, type: 'spring' }}
                  className="bg-white p-10 rounded-[3rem] shadow-2xl border-t-8 border-[#EF4444] w-[450px]"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-[#EF4444]/10 rounded-full">
                      <XCircle className="w-10 h-10 text-[#EF4444]" />
                    </div>
                    <h3 className="text-4xl font-bold text-[#43302B]">它不擅长</h3>
                  </div>
                  <div className="space-y-6">
                    {CONS.map((con, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.2 }}
                        className="flex items-center gap-4 text-2xl text-gray-600 font-medium bg-gray-50 p-4 rounded-2xl"
                      >
                        <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                        {con}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: Conclusion Overlay (Step 6) */}
      <AnimatePresence>
        {step === 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="absolute z-20 text-center bg-white/95 backdrop-blur-2xl p-20 rounded-[4rem] shadow-2xl border border-gray-200 max-w-5xl"
          >
            <p className="text-4xl text-gray-500 font-medium mb-8 tracking-wide">
              说白了，Prompt 解决的是
            </p>
            <h2 className="text-6xl font-black text-[#43302B] leading-[1.4] tracking-tight flex items-center justify-center gap-6">
              <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] px-6 py-3 rounded-2xl border border-[#8B5CF6]/20">表达问题</span>
              <span className="text-gray-300">不是</span>
              <span className="bg-[#EF4444]/10 text-[#EF4444] px-6 py-3 rounded-2xl border border-[#EF4444]/20 line-through decoration-4">信息问题</span>
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Transition to Phase 2 (Step 7) */}
      <AnimatePresence>
        {step === 7 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#FDFBF7]"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
              className="text-5xl font-bold text-gray-500 mb-12"
            >
              于是，第二阶段开始了
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.6, type: 'spring', bounce: 0.4 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#F59E0B] blur-[100px] opacity-30 rounded-full"></div>
              <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] p-16 rounded-[4rem] shadow-2xl border border-white/20 flex flex-col items-center text-white relative z-10">
                <Database className="w-24 h-24 mb-8 text-white/90" />
                <h1 className="text-7xl font-black tracking-tight">
                  Context Engineering
                </h1>
                <p className="text-3xl font-medium mt-6 text-white/80 tracking-widest">
                  上下文工程
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
