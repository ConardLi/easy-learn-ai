import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Brain, 
  Search, 
  ArrowRight, 
  Scissors, 
  ListOrdered, 
  Minimize2, 
  History, 
  Wrench, 
  Network,
  FileText,
  Sparkles
} from 'lucide-react';

const PIPELINE_NODES = [
  { id: 1, title: '文档怎么切块', icon: Scissors, step: 4, top: true },
  { id: 2, title: '结果怎么排序', icon: ListOrdered, step: 4, top: false },
  { id: 3, title: '长文怎么压缩', icon: Minimize2, step: 5, top: true },
  { id: 4, title: '历史对话：原文 vs 摘要', icon: History, step: 5, top: false },
  { id: 5, title: '工具返回：要不要全部暴露？', icon: Wrench, step: 6, top: true },
  { id: 6, title: 'Agent 间：传原文/摘要/结构化', icon: Network, step: 6, top: false },
];

export default function Chapter10({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Scene 1: Introduction to RAG (Step 0) */}
      <AnimatePresence>
        {step === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <h2 className="text-5xl font-bold text-[#43302B] text-center leading-relaxed">
              说到 Context Engineering<br/>
              我觉得 <span className="text-[#3B82F6] text-6xl mx-2 font-black">RAG</span> 也算是一个比较典型的实践了
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: The Value of RAG (Step 1) */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <p className="text-3xl text-gray-500 font-medium mb-12">RAG 的价值很直接：</p>
            <h2 className="text-5xl font-bold text-[#43302B] mb-20 text-center">
              模型参数里<span className="text-[#EF4444] mx-2">没有的知识</span><br/>
              怎么在运行时补进去？
            </h2>

            <div className="flex items-center gap-16">
              {/* Database (Runtime Knowledge) */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-32 h-32 bg-blue-100 rounded-3xl flex items-center justify-center border-4 border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.3)] relative">
                  <Database className="w-16 h-16 text-blue-600" />
                  {/* Glowing orb flying out */}
                  <motion.div 
                    animate={{ x: [0, 200], opacity: [1, 0], scale: [1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-400 rounded-full shadow-[0_0_20px_rgba(96,165,250,1)]"
                  />
                </div>
                <span className="text-xl font-bold text-blue-600">外部知识库</span>
              </motion.div>

              {/* Brain (Model) */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-32 h-32 bg-purple-100 rounded-3xl flex items-center justify-center border-4 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.3)] relative overflow-hidden">
                  <Brain className="w-16 h-16 text-purple-600" />
                  {/* Missing piece indicator */}
                  <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 right-4 w-8 h-8 border-4 border-dashed border-purple-400 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-purple-400 font-bold">?</span>
                  </motion.div>
                </div>
                <span className="text-xl font-bold text-purple-600">模型参数</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: Basic RAG Flow (Step 2) */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <p className="text-3xl text-gray-500 font-medium mb-16">做法大家都知道：</p>
            
            <div className="flex items-center justify-center gap-6 w-full max-w-6xl">
              {/* Step 1: Retrieve */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col items-center gap-4 flex-1">
                <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center border-2 border-blue-200">
                  <Database className="w-10 h-10 text-blue-500" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">1. 检索</div>
                  <div className="text-sm text-gray-500 mt-1">从外部知识库获取</div>
                </div>
              </motion.div>

              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }} className="w-20 h-1 bg-gray-300 origin-left relative">
                <motion.div animate={{ x: [0, 80] }} transition={{ duration: 1, repeat: Infinity }} className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full" />
              </motion.div>

              {/* Step 2: Inject */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col items-center gap-4 flex-1">
                <div className="w-24 h-24 bg-amber-50 rounded-2xl flex items-center justify-center border-2 border-amber-200">
                  <FileText className="w-10 h-10 text-amber-500" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">2. 注入</div>
                  <div className="text-sm text-gray-500 mt-1">放入当前上下文</div>
                </div>
              </motion.div>

              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7 }} className="w-20 h-1 bg-gray-300 origin-left relative">
                <motion.div animate={{ x: [0, 80] }} transition={{ duration: 1, repeat: Infinity }} className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-500 rounded-full" />
              </motion.div>

              {/* Step 3: Generate */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-col items-center gap-4 flex-1">
                <div className="w-24 h-24 bg-purple-50 rounded-2xl flex items-center justify-center border-2 border-purple-200">
                  <Brain className="w-10 h-10 text-purple-500" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">3. 生成</div>
                  <div className="text-sm text-gray-500 mt-1">模型基于信息回答</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: The Real Pipeline (Steps 3-6) */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: step >= 4 ? -250 : 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold text-[#43302B] leading-relaxed">
                但真正成熟的 Context Engineering<br/>
                关注的远不止“检索一下”
              </h2>
              <AnimatePresence>
                {step >= 4 && (
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl text-[#14B8A6] font-bold mt-6"
                  >
                    它关心的是<span className="text-5xl ml-2 bg-[#14B8A6]/10 px-6 py-2 rounded-xl border border-[#14B8A6]/30">整条链路</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* The Pipeline Track */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div 
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute top-1/2 -translate-y-1/2 w-[80%] h-3 bg-gray-200 rounded-full mt-10"
                >
                  {/* Glowing progress line */}
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: step === 4 ? '33%' : step === 5 ? '66%' : '100%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#3B82F6] via-[#14B8A6] to-[#8B5CF6] rounded-full shadow-[0_0_20px_rgba(20,184,166,0.5)]"
                  />

                  {/* Pipeline Nodes */}
                  {PIPELINE_NODES.map((node, i) => (
                    <AnimatePresence key={node.id}>
                      {step >= node.step && (
                        <motion.div
                          initial={{ opacity: 0, y: node.top ? 30 : -30, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
                          className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                          style={{ left: `${(i / (PIPELINE_NODES.length - 1)) * 100}%` }}
                        >
                          {/* Node Card */}
                          <div className={`absolute ${node.top ? 'bottom-full mb-6' : 'top-full mt-6'} flex flex-col items-center`}>
                            <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center gap-3 w-56 hover:scale-105 transition-transform cursor-default">
                              <div className="p-3 bg-teal-50 rounded-xl border border-teal-100">
                                <node.icon className="w-8 h-8 text-teal-600" />
                              </div>
                              <span className="text-lg font-bold text-gray-800 text-center leading-snug">
                                {node.title}
                              </span>
                            </div>
                            {/* Connecting Line */}
                            <div className={`absolute ${node.top ? 'top-full' : 'bottom-full'} w-1 h-6 bg-teal-400`} />
                          </div>

                          {/* Track Dot */}
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-5 h-5 bg-white border-4 border-teal-500 rounded-full shadow-md relative z-10"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}

                  {/* Final Output Indicator */}
                  <AnimatePresence>
                    {step === 6 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="absolute -right-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                      >
                        <Sparkles className="w-10 h-10 text-[#8B5CF6] animate-pulse" />
                        <span className="text-sm font-bold text-[#8B5CF6] whitespace-nowrap">高质量 Context</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
