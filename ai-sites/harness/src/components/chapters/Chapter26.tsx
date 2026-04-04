import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  FileWarning, 
  ListTree, 
  Layers, 
  Shield, 
  CheckSquare, 
  PenTool,
  Network,
  Eye,
  ArrowRight,
  Minimize2
} from 'lucide-react';

export default function Chapter26({ step }: { step: number }) {
  const subDocs = [
    { icon: Network, title: '架构文档', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    { icon: PenTool, title: '设计文档', color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
    { icon: Layers, title: '执行计划', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
    { icon: CheckSquare, title: '质量评分', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { icon: Shield, title: '安全规则', color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Scene 1: Intro (Step 0) */}
      <AnimatePresence>
        {step === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <div className="w-24 h-24 bg-cyan-100 rounded-2xl flex items-center justify-center mb-8 border-4 border-cyan-300">
              <Eye className="w-12 h-12 text-cyan-600" />
            </div>
            <h2 className="text-6xl font-black text-[#43302B] mb-6">OpenAI 的典型实践</h2>
            <p className="text-4xl text-cyan-600 font-bold tracking-widest">
              渐进式披露
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: The Giant File Problem (Step 1) */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-12 text-center">
              早期错误：<span className="text-red-500 font-black mx-2">巨大的 AGENTS.md</span>
            </h3>

            <div className="flex items-center gap-16">
              {/* Giant File Visual */}
              <motion.div 
                animate={{ x: [-2, 2, -2, 2, 0], y: [-1, 1, -1, 1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="relative w-72 h-96 bg-white border-8 border-red-200 rounded-3xl shadow-2xl flex flex-col items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-red-50 opacity-50" />
                <FileWarning className="w-24 h-24 text-red-400 mb-4 relative z-10" />
                <div className="text-2xl font-black text-red-600 relative z-10">AGENTS.md</div>
                
                {/* Messy content lines */}
                <div className="absolute top-0 left-0 w-full h-full p-6 flex flex-col gap-2 opacity-30 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="h-3 bg-red-800 rounded-full w-full" style={{ width: `${Math.random() * 60 + 40}%` }} />
                  ))}
                </div>
              </motion.div>

              <div className="flex flex-col gap-6 max-w-md">
                <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-red-400 text-xl font-bold text-gray-700">
                  把所有规范、架构、约定<br/><span className="text-red-500 text-2xl">全部塞进去</span>
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-red-50 p-6 rounded-2xl shadow-md border-2 border-red-200"
                >
                  <p className="text-xl font-bold text-red-700">
                    结果 Agent 更糊涂了。<br/>
                    <span className="text-gray-600 text-lg mt-2 block font-medium">上下文窗口是稀缺资源，塞太满，等于什么都没说。</span>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: The Index Solution (Step 2) */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-16 text-center">
              后来怎么改？<span className="text-blue-600 font-black mx-2">变成目录页</span>
            </h3>

            <div className="flex items-center gap-12">
              <motion.div 
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="bg-white p-10 rounded-3xl shadow-xl border-4 border-blue-200 flex flex-col items-center w-80 relative"
              >
                <Minimize2 className="absolute -top-6 -right-6 w-12 h-12 text-blue-400 bg-white rounded-full p-2 shadow-md" />
                <ListTree className="w-20 h-20 text-blue-500 mb-6" />
                <h4 className="text-3xl font-black text-gray-800 mb-2">AGENTS.md</h4>
                <p className="text-blue-600 font-bold text-xl">只保留最核心的索引</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Drill Down (Step 3) */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <h2 className="text-4xl font-bold text-[#43302B] mb-12 text-center">
              更详细的内容，拆到<span className="text-indigo-600 font-black mx-2">子文档</span>里
            </h2>
            
            <div className="relative w-[800px] h-[400px] flex items-center justify-center">
              {/* Center Index */}
              <div className="absolute z-20 bg-white p-6 rounded-2xl shadow-xl border-4 border-blue-400 flex flex-col items-center">
                <ListTree className="w-12 h-12 text-blue-500 mb-2" />
                <span className="font-black text-gray-800">目录索引</span>
              </div>

              {/* Sub Documents */}
              {subDocs.map((doc, index) => {
                const angle = (index * (360 / subDocs.length)) * (Math.PI / 180);
                const radius = 220;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, x, y }}
                    transition={{ delay: index * 0.2, type: 'spring', bounce: 0.4 }}
                    className={`absolute z-10 flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg border-2 ${doc.bg} ${doc.border} w-32 h-32`}
                  >
                    <doc.icon className={`w-10 h-10 mb-2 ${doc.color}`} />
                    <span className="font-bold text-gray-700 text-sm text-center">{doc.title}</span>
                  </motion.div>
                );
              })}

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full -z-10" style={{ pointerEvents: 'none' }}>
                {subDocs.map((_, index) => {
                  const angle = (index * (360 / subDocs.length)) * (Math.PI / 180);
                  const radius = 220;
                  const x = 400 + Math.cos(angle) * radius;
                  const y = 200 + Math.sin(angle) * radius;
                  
                  return (
                    <motion.line
                      key={`line-${index}`}
                      x1="400" y1="200"
                      x2={x} y2={y}
                      stroke="#CBD5E1"
                      strokeWidth="3"
                      strokeDasharray="6 6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                    />
                  );
                })}
              </svg>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-8 bg-indigo-50 px-8 py-4 rounded-full border-2 border-indigo-200"
            >
              <p className="text-2xl font-bold text-indigo-700 flex items-center gap-3">
                <Eye className="w-6 h-6" /> Agent 先看目录，需要的时候再钻进去
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 5: Conclusion (Step 4) */}
      <AnimatePresence>
        {step === 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="bg-white p-16 rounded-[3rem] shadow-2xl border-4 border-cyan-100 flex flex-col items-center text-center max-w-4xl"
            >
              <h3 className="text-4xl font-bold text-gray-600 mb-8">
                这和前面说的 Skills，本质上是一个思路：
              </h3>
              
              <div className="flex items-center gap-6 text-5xl font-black">
                <span className="text-gray-400 line-through decoration-red-400 decoration-8">一次性全给</span>
                <ArrowRight className="w-12 h-12 text-gray-300" />
                <span className="text-cyan-600 bg-cyan-50 px-6 py-3 rounded-2xl border-2 border-cyan-200">
                  按需暴露
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
