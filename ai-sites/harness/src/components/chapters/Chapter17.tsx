import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  Brain, 
  Globe, 
  Search, 
  FileText, 
  Code, 
  Terminal, 
  Send, 
  Scale, 
  Clock, 
  Filter,
  Link2
} from 'lucide-react';

const TOOLS = [
  { icon: Search, label: '搜网页' },
  { icon: FileText, label: '读文档' },
  { icon: Code, label: '写代码并执行' },
  { icon: Terminal, label: '调 API' },
  { icon: Globe, label: '操作浏览器' },
  { icon: Wrench, label: '编辑文件' },
  { icon: Send, label: '发消息' },
];

export default function Chapter17({ step }: { step: number }) {
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
            <div className="w-24 h-24 bg-teal-100 rounded-2xl flex items-center justify-center mb-8 border-4 border-teal-300">
              <Wrench className="w-12 h-12 text-teal-600" />
            </div>
            <h2 className="text-6xl font-black text-[#43302B] mb-6">第二层：工具系统</h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: Text Predictor vs Real World (Step 1) */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-16">没有工具，大模型本质上还是一个<span className="text-gray-400 mx-2">文本预测器</span></h3>
            
            <div className="flex items-center gap-16">
              {/* Brain in a box */}
              <div className="flex flex-col items-center gap-6">
                <div className="w-48 h-48 bg-gray-100 rounded-3xl border-4 border-gray-300 flex items-center justify-center relative overflow-hidden">
                  <Brain className="w-20 h-20 text-gray-400" />
                  <div className="absolute bottom-4 text-gray-400 font-mono text-sm">Generating text...</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-500">会解释、会总结、会推理</div>
                  <div className="text-2xl font-black text-red-500 mt-2">但接触不到真实世界</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: Empowered by Tools (Step 2) */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <motion.h3 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: -250 }}
              className="text-5xl font-black text-[#43302B] text-center"
            >
              一旦接上工具，模型才真正开始<span className="text-teal-500 mx-2">“做事”</span>
            </motion.h3>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-10">
              {/* Central Brain */}
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1, boxShadow: ['0 0 0px rgba(20,184,166,0)', '0 0 80px rgba(20,184,166,0.6)', '0 0 0px rgba(20,184,166,0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-32 h-32 bg-teal-50 rounded-full flex items-center justify-center border-4 border-teal-400 relative z-20"
              >
                <Brain className="w-16 h-16 text-teal-600" />
              </motion.div>

              {/* Orbiting Tools */}
              {TOOLS.map((tool, i) => {
                const angle = (i * 360) / TOOLS.length;
                const rad = (angle * Math.PI) / 180;
                const radius = 220;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;

                return (
                  <motion.div
                    key={tool.label}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, x, y }}
                    transition={{ duration: 0.8, delay: i * 0.1, type: 'spring' }}
                    className="absolute flex flex-col items-center gap-2 z-10"
                    style={{ marginLeft: -40, marginTop: -40 }}
                  >
                    {/* Connection Line */}
                    <svg className="absolute top-1/2 left-1/2 -z-10 overflow-visible" style={{ width: 0, height: 0 }}>
                      <line x1="0" y1="0" x2={-x} y2={-y} stroke="#99F6E4" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>

                    <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border-2 border-teal-100 flex items-center justify-center hover:scale-110 transition-transform">
                      <tool.icon className="w-8 h-8 text-teal-500" />
                    </div>
                    <span className="text-sm font-bold text-gray-700 bg-white/80 px-2 py-1 rounded-md whitespace-nowrap">
                      {tool.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: The 3 Problems (Steps 3-5) */}
      <AnimatePresence>
        {step >= 3 && step <= 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <h2 className="text-4xl font-bold text-[#43302B] mb-16 text-center leading-relaxed">
              但 Harness 在这里做的，不是简单把工具挂上去<br/>
              而是要解决<span className="text-teal-600 mx-2 font-black text-5xl">三个问题</span>
            </h2>

            <div className="flex gap-8 max-w-6xl w-full px-8">
              {/* Problem 1 */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-blue-400 flex flex-col items-center text-center"
                  >
                    <Scale className="w-16 h-16 text-blue-500 mb-6" />
                    <h3 className="text-2xl font-black text-gray-800 mb-4">1. 给它什么工具</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      工具太少，能力不够；<br/>
                      <span className="text-red-500 font-bold">工具太多，模型会乱用。</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Problem 2 */}
              <AnimatePresence>
                {step >= 4 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-amber-400 flex flex-col items-center text-center"
                  >
                    <Clock className="w-16 h-16 text-amber-500 mb-6" />
                    <h3 className="text-2xl font-black text-gray-800 mb-4">2. 什么时候该调工具</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      本来不需要查的时候别乱查，<br/>
                      <span className="text-amber-600 font-bold">该查证的时候也别硬答。</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Problem 3 */}
              <AnimatePresence>
                {step >= 5 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-teal-400 flex flex-col items-center text-center"
                  >
                    <Filter className="w-16 h-16 text-teal-500 mb-6" />
                    <h3 className="text-2xl font-black text-gray-800 mb-4">3. 结果怎么重新喂回</h3>
                    <p className="text-gray-500 font-medium leading-relaxed text-sm">
                      搜索回来的十条结果，不应该原封不动塞回去，而是要<span className="text-teal-600 font-bold">提炼、筛选、保持和任务的相关性</span>。
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
