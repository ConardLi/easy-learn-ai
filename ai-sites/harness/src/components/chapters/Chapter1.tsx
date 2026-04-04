import { motion, AnimatePresence } from 'motion/react';
import { Brain, MessageSquare, Database, Settings, Rocket, Bug, ArrowRight } from 'lucide-react';

export default function Chapter1({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {/* Step 0: Title */}
      <AnimatePresence>
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="absolute text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-block px-6 py-2 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] font-semibold text-2xl mb-8 border border-[#F59E0B]/20"
            >
              AI 圈新热词
            </motion.div>
            <h1 className="text-[120px] font-black text-[#43302B] tracking-tighter leading-none">
              Harness <br/>
              <span className="text-[#14B8A6]">Engineering</span>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 1: The Question */}
      <AnimatePresence>
        {step >= 1 && step <= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: step === 1 ? 0 : -200,
              scale: step === 1 ? 1 : 0.85,
              filter: step === 1 ? 'blur(0px)' : 'blur(2px)'
            }}
            exit={{ opacity: 0, y: -300 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
            className="absolute w-full max-w-6xl text-center z-0"
          >
            <div className="bg-white/90 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-white/60 flex flex-col items-center gap-10">
              <h3 className="text-5xl font-bold text-[#43302B]">
                为什么同样是一个模型？
              </h3>
              
              <div className="flex items-center gap-8 w-full justify-center px-8">
                {/* 别人的 Agent */}
                <div className="flex-1 bg-teal-50/50 p-8 rounded-3xl border-2 border-teal-100 flex flex-col items-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-teal-100/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-2xl font-bold text-gray-500 mb-6 relative z-10">别人的 Agent</span>
                  <div className="w-28 h-28 bg-teal-100 rounded-full flex items-center justify-center mb-6 relative z-10">
                    <motion.div 
                      animate={{ y: [-5, 5, -5] }} 
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Rocket className="w-14 h-14 text-teal-600" />
                    </motion.div>
                    {/* Smooth rings */}
                    <motion.div 
                      className="absolute inset-0 border-4 border-teal-400 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div 
                      className="absolute inset-0 border-4 border-teal-300 rounded-full"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  <span className="text-4xl font-black text-teal-600 relative z-10 tracking-widest">稳定高效</span>
                </div>

                {/* VS */}
                <div className="text-4xl font-black text-gray-300 italic px-4">VS</div>

                {/* 自己的 Agent */}
                <div className="flex-1 bg-rose-50/50 p-8 rounded-3xl border-2 border-rose-100 flex flex-col items-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-100/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-2xl font-bold text-gray-500 mb-6 relative z-10">到了自己手里</span>
                  <div className="w-28 h-28 bg-rose-100 rounded-full flex items-center justify-center mb-6 relative z-10">
                    <motion.div 
                      animate={{ 
                        rotate: [0, -15, 15, -15, 15, 0],
                        x: [0, -4, 4, -4, 4, 0],
                        y: [0, 4, -4, 4, -4, 0]
                      }} 
                      transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 1.5 }}
                    >
                      <Bug className="w-14 h-14 text-rose-600" />
                    </motion.div>
                    {/* Broken/Jittery rings */}
                    <motion.div 
                      className="absolute inset-0 border-4 border-rose-400 rounded-full border-dashed"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Error sparks */}
                    <motion.div
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], x: [0, 20], y: [0, -20] }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.2 }}
                      className="absolute top-2 right-2 text-rose-500 font-black text-2xl"
                    >
                      !?
                    </motion.div>
                    <motion.div
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], x: [0, -15], y: [0, -15] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1.8 }}
                      className="absolute top-4 left-2 text-rose-500 font-black text-xl"
                    >
                      ✗
                    </motion.div>
                  </div>
                  <span className="text-4xl font-black text-rose-600 relative z-10 tracking-widest">差强人意</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2: The Doubts */}
      <AnimatePresence>
        {step >= 2 && step <= 3 && (
          <div className="absolute top-[55%] w-full max-w-7xl flex justify-center gap-10 z-10">
            <DoubtCard delay={0.1} icon={<Brain className="w-16 h-16 text-[#F59E0B]" />} text="模型不够强？" />
            <DoubtCard delay={0.3} icon={<MessageSquare className="w-16 h-16 text-[#14B8A6]" />} text="Prompt 不够好？" />
            <DoubtCard delay={0.5} icon={<Database className="w-16 h-16 text-[#EF4444]" />} text="RAG 没调明白？" />
          </div>
        )}
      </AnimatePresence>

      {/* Step 3: The Transition */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -5 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            transition={{ type: 'spring', bounce: 0.6 }}
            className="absolute z-20"
          >
            <div className="bg-[#43302B] text-[#FDFBF7] px-16 py-8 rounded-full text-5xl font-bold shadow-2xl border-4 border-[#FDFBF7]">
              这些都有影响，但是...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 4 & 5: The Answer */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: step === 4 ? 0 : -180 }}
            className="absolute w-full max-w-6xl flex flex-col items-center gap-12"
          >
            <h3 className="text-5xl font-bold text-center text-[#43302B]">
              真正决定系统能不能稳定跑起来的
            </h3>

            <div className="flex items-center justify-center gap-12 w-full bg-white/90 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-white/60">
              {/* Not the model */}
              <div className="flex flex-col items-center gap-8 relative flex-1">
                <div className="w-40 h-40 bg-gray-50 rounded-3xl border-2 border-gray-200 flex items-center justify-center relative shadow-inner">
                  <Brain className="w-20 h-20 text-gray-400" />
                  {/* Red Cross */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-red-500 drop-shadow-md">
                      <motion.line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" 
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.4 }} />
                      <motion.line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" 
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.4 }} />
                    </svg>
                  </motion.div>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-gray-400">往往<span className="text-red-500 mx-2">不是</span>模型本身</span>
                </div>
              </div>

              {/* Arrow */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="flex-shrink-0"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center shadow-inner">
                  <ArrowRight className="w-8 h-8 text-gray-400" />
                </div>
              </motion.div>

              {/* But the system */}
              <div className="flex flex-col items-center gap-8 flex-1">
                <div className="w-40 h-40 flex items-center justify-center relative">
                  {/* Core Model */}
                  <Brain className="w-16 h-16 text-[#14B8A6] relative z-10" />
                  
                  {/* Outer System Rings */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-dashed border-[#14B8A6] rounded-full opacity-60"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-8 border-2 border-[#14B8A6]/30 rounded-full flex items-center justify-center"
                  >
                    <Settings className="absolute -top-4 w-8 h-8 text-[#14B8A6] bg-white rounded-full shadow-sm" />
                    <Database className="absolute -bottom-4 w-8 h-8 text-[#14B8A6] bg-white rounded-full shadow-sm" />
                    <div className="absolute -left-3 w-6 h-6 bg-[#14B8A6] border-2 border-white rounded-full shadow-sm" />
                    <div className="absolute -right-3 w-6 h-6 bg-[#14B8A6] border-2 border-white rounded-full shadow-sm" />
                  </motion.div>
                  
                  {/* Glow */}
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-[#14B8A6] rounded-full blur-2xl -z-10"
                  />
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-gray-600">而是模型外面的<br/><span className="text-5xl font-black text-[#14B8A6] mt-3 inline-block tracking-widest">运行系统</span></span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 5: Harness Reveal */}
      <AnimatePresence>
        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 150 }}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
            className="absolute bg-white p-16 rounded-[3rem] shadow-2xl border-2 border-[#14B8A6]/30 flex items-center gap-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="bg-[#14B8A6]/10 p-8 rounded-full"
            >
              <Settings className="w-32 h-32 text-[#14B8A6]" />
            </motion.div>
            <div>
              <p className="text-3xl text-gray-500 mb-4 font-medium">这套系统，现在有了一个统一的名字</p>
              <h1 className="text-[100px] font-black text-[#43302B] tracking-tight leading-none">
                Harness
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DoubtCard({ icon, text, delay }: { icon: React.ReactNode, text: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotate: -5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, y: 50, scale: 0.8, filter: 'blur(5px)' }}
      transition={{ duration: 0.7, delay, type: 'spring', bounce: 0.4 }}
      className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center gap-8 w-96"
    >
      <div className="p-8 bg-gray-50 rounded-full shadow-inner">
        {icon}
      </div>
      <p className="text-4xl font-bold text-[#43302B]">{text}</p>
    </motion.div>
  );
}
