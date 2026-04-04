import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircleQuestion, 
  Lightbulb, 
  History, 
  Layers, 
  Building2,
  Target
} from 'lucide-react';

export default function Chapter3({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      
      {/* Step 0 & 1: The Question */}
      <AnimatePresence>
        {step >= 0 && step <= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="absolute flex flex-col items-center w-full max-w-5xl"
          >
            <div className="flex items-center gap-8 bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 w-full justify-center">
              <MessageCircleQuestion className="w-24 h-24 text-[#F59E0B]" />
              <h2 className="text-6xl font-bold text-[#43302B] tracking-wide">
                "你到底改了什么？"
              </h2>
            </div>
            
            <AnimatePresence>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mt-16 bg-[#43302B]/5 px-10 py-6 rounded-full border border-[#43302B]/10"
                >
                  <p className="text-4xl text-gray-500 font-medium">
                    说实话，那时候我没有一个特别准确的词。
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2: The Realization */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
            className="absolute text-center flex flex-col items-center w-full max-w-6xl"
          >
            <motion.div
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.6 }}
            >
              <Lightbulb className="w-24 h-24 text-[#F59E0B] mb-10 drop-shadow-lg" />
            </motion.div>
            
            <p className="text-4xl text-gray-500 mb-10 font-medium">
              直到最近 Harness Engineering 这个概念越来越火，我才意识到：
            </p>
            
            <div className="bg-white p-16 rounded-[3rem] shadow-2xl border-2 border-[#14B8A6]/20 w-full">
              <h2 className="text-5xl font-bold text-[#43302B] leading-[1.6]">
                我当时改的那些东西，<br/>
                本质上就是
              </h2>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-[120px] text-[#14B8A6] font-black tracking-tighter mt-4 leading-none"
              >
                Harness
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 3 to 6: The Agenda */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute w-full max-w-6xl flex flex-col items-center"
          >
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center gap-4 bg-[#EF4444]/10 text-[#EF4444] px-8 py-3 rounded-full mb-8 border border-[#EF4444]/20">
                <Target className="w-8 h-8" />
                <span className="text-2xl font-bold tracking-wider">本期核心</span>
              </div>
              <h2 className="text-6xl font-bold text-[#43302B] mb-6">
                今天这期视频，我想把这件事<span className="text-[#EF4444] mx-2 border-b-8 border-[#EF4444] pb-2">彻底讲清楚</span>
              </h2>
              <p className="text-4xl text-gray-500 mt-8">我们主要讲三部分：</p>
            </motion.div>

            <div className="flex flex-col gap-6 w-full max-w-5xl">
              <AnimatePresence>
                {step >= 4 && (
                  <AgendaCard 
                    num="1" 
                    icon={<History className="w-12 h-12 text-white" />} 
                    text="Harness 是怎么一步步演进出来的" 
                    color="bg-[#14B8A6]"
                    delay={0.1} 
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {step >= 5 && (
                  <AgendaCard 
                    num="2" 
                    icon={<Layers className="w-12 h-12 text-white" />} 
                    text="一个成熟的 Harness，到底包含哪些部分" 
                    color="bg-[#F59E0B]"
                    delay={0.1} 
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {step >= 6 && (
                  <AgendaCard 
                    num="3" 
                    icon={<Building2 className="w-12 h-12 text-white" />} 
                    text="OpenAI、Anthropic 这些公司，真实是怎么做的" 
                    color="bg-[#8B5CF6]"
                    delay={0.1} 
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function AgendaCard({ num, icon, text, color, delay }: { num: string, icon: React.ReactNode, text: string, color: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      transition={{ duration: 0.6, delay, type: 'spring', bounce: 0.4 }}
      className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-8 relative overflow-hidden group"
    >
      {/* Background Number Watermark */}
      <div className="absolute -left-4 -top-10 text-[180px] font-black text-gray-50 opacity-50 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:text-gray-100">
        {num}
      </div>
      
      <div className={`${color} p-6 rounded-2xl shadow-inner relative z-10`}>
        {icon}
      </div>
      <p className="text-4xl font-bold text-[#43302B] relative z-10">{text}</p>
    </motion.div>
  );
}
