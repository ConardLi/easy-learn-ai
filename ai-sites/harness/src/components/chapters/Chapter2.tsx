import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Sparkles, 
  FileText, 
  Sliders, 
  TrendingDown, 
  GitBranch, 
  Layers, 
  CheckCircle, 
  RotateCcw, 
  TrendingUp 
} from 'lucide-react';

export default function Chapter2({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      
      {/* Step 0: Greeting */}
      <AnimatePresence>
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="absolute text-center flex flex-col items-center"
          >
            <motion.div 
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 1, type: 'spring' }}
              className="bg-[#43302B] p-6 rounded-3xl mb-8 shadow-2xl"
            >
              <Code2 className="w-20 h-20 text-[#FDFBF7]" />
            </motion.div>
            <h2 className="text-5xl font-medium text-gray-500 mb-6 tracking-wide">
              大家好，欢迎来到
            </h2>
            <h1 className="text-8xl font-black text-[#43302B] tracking-tight mb-8">
              code<span className="text-[#14B8A6]">秘密花园</span>
            </h1>
            <div className="text-4xl font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-8 py-4 rounded-full border border-[#F59E0B]/20">
              我是花园老师
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 1: The Context */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100, filter: 'blur(5px)' }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
            className="absolute text-center"
          >
            <h2 className="text-6xl font-bold text-[#43302B] leading-[1.6]">
              我为什么想聊这个话题？<br/>
              <span className="text-[#14B8A6] mt-8 inline-block text-5xl font-medium">
                年初的一个真实案例：帮朋友调优 Agent 系统
              </span>
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2: The Efforts */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(5px)' }}
            className="absolute w-full max-w-6xl flex flex-col items-center"
          >
            <h3 className="text-5xl font-bold text-[#43302B] mb-16">他们团队已经做了很多努力：</h3>
            <div className="flex gap-8 w-full justify-center">
              <EffortCard delay={0.1} icon={<Sparkles className="w-12 h-12 text-[#F59E0B]" />} text="换了最好的旗舰模型" />
              <EffortCard delay={0.3} icon={<FileText className="w-12 h-12 text-[#14B8A6]" />} text="提示词改了上百版" />
              <EffortCard delay={0.5} icon={<Sliders className="w-12 h-12 text-[#EF4444]" />} text="各种参数调了又调" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 3: The Unstable Result */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="absolute text-center flex flex-col items-center"
          >
            <h3 className="text-6xl font-bold text-[#43302B] mb-12 leading-tight">
              但一进真实场景，效果还是<span className="text-[#EF4444] border-b-8 border-[#EF4444] pb-2 mx-2">不稳定</span>
            </h3>
            <p className="text-4xl text-gray-500 mb-16">有时候特别聪明，有时候又莫名其妙跑偏</p>
            
            <motion.div 
              initial={{ rotate: -5 }}
              animate={{ rotate: 5 }}
              transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse", ease: "easeInOut" }}
              className="bg-[#EF4444]/10 border-4 border-[#EF4444] rounded-[3rem] p-16 flex items-center gap-8 shadow-2xl shadow-[#EF4444]/20"
            >
              <TrendingDown className="w-24 h-24 text-[#EF4444]" />
              <div className="text-left">
                <div className="text-3xl text-[#EF4444] font-bold mb-2">任务成功率</div>
                <div className="text-8xl font-black text-[#EF4444] tracking-tighter">&lt; 70%</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 4: The Revelation */}
      <AnimatePresence>
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="absolute text-center bg-white p-16 rounded-[3rem] shadow-2xl border border-gray-100"
          >
            <h3 className="text-5xl font-medium text-gray-500 mb-12">后来我去帮他们看了一下...</h3>
            <h2 className="text-6xl font-bold text-[#43302B] leading-[1.6]">
              最后改动最大的地方，<br/>
              反而不是 <span className="line-through decoration-8 decoration-[#EF4444]/60 text-gray-400 mx-2">模型</span>，
              也不是 <span className="line-through decoration-8 decoration-[#EF4444]/60 text-gray-400 mx-2">提示词</span>。
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 5: The 4 Actions */}
      <AnimatePresence>
        {step === 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute w-full max-w-6xl flex flex-col items-center"
          >
            <h3 className="text-5xl font-bold text-[#43302B] mb-16 bg-white px-12 py-6 rounded-full shadow-lg border border-gray-100">
              我主要动了<span className="text-[#14B8A6] mx-2 text-6xl">四件事</span>：
            </h3>
            <div className="grid grid-cols-2 gap-8 w-full">
              <ActionCard delay={0.1} icon={<GitBranch className="w-12 h-12 text-white" />} title="任务怎么拆" color="bg-[#14B8A6]" />
              <ActionCard delay={0.3} icon={<Layers className="w-12 h-12 text-white" />} title="状态怎么管" color="bg-[#F59E0B]" />
              <ActionCard delay={0.5} icon={<CheckCircle className="w-12 h-12 text-white" />} title="关键步骤怎么校验" color="bg-[#8B5CF6]" />
              <ActionCard delay={0.7} icon={<RotateCcw className="w-12 h-12 text-white" />} title="失败以后怎么恢复" color="bg-[#EF4444]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 6: The Success */}
      <AnimatePresence>
        {step === 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
            className="absolute text-center flex flex-col items-center"
          >
            <h3 className="text-5xl font-bold text-gray-500 mb-12 leading-tight">
              结果新版上线以后，<br/>
              还是同样的模型，还是同样的提示词
            </h3>
            
            <motion.div 
              initial={{ boxShadow: "0 0 0 rgba(20, 184, 166, 0)" }}
              animate={{ boxShadow: "0 0 100px rgba(20, 184, 166, 0.4)" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="bg-[#14B8A6] rounded-[4rem] p-20 flex flex-col items-center gap-6 text-white relative overflow-hidden"
            >
              {/* Shine effect */}
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
              
              <TrendingUp className="w-32 h-32 text-white mb-4" />
              <div className="text-4xl font-medium opacity-90">成功率直接拉到</div>
              <div className="text-[120px] font-black tracking-tighter leading-none">
                &gt; 95%
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function EffortCard({ icon, text, delay }: { icon: React.ReactNode, text: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, type: 'spring' }}
      className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex-1 flex flex-col items-center text-center gap-6"
    >
      <div className="p-6 bg-gray-50 rounded-full">
        {icon}
      </div>
      <p className="text-3xl font-bold text-[#43302B]">{text}</p>
    </motion.div>
  );
}

function ActionCard({ icon, title, color, delay }: { icon: React.ReactNode, title: string, color: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: -50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.6, delay, type: 'spring', bounce: 0.4 }}
      className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-8"
    >
      <div className={`${color} p-6 rounded-2xl shadow-inner`}>
        {icon}
      </div>
      <p className="text-4xl font-bold text-[#43302B]">{title}</p>
    </motion.div>
  );
}
