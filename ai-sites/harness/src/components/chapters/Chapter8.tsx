import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Bot, 
  Search, 
  Code, 
  Database, 
  RefreshCw, 
  GitMerge, 
  ArrowRight, 
  FileText, 
  AlertTriangle, 
  History, 
  Send
} from 'lucide-react';

const AGENT_TOOLS = [
  { id: 'chat', icon: MessageSquare, label: '多轮对话', color: '#3B82F6', x: -200, y: -120 },
  { id: 'tools', icon: Search, label: '调用外部工具', color: '#10B981', x: 200, y: -120 },
  { id: 'state', icon: GitMerge, label: '传递中间结果', color: '#8B5CF6', x: -200, y: 120 },
  { id: 'plan', icon: RefreshCw, label: '根据反馈修计划', color: '#F59E0B', x: 200, y: 120 },
];

const COMPLEX_PIPELINE = [
  { id: 1, icon: FileText, text: '分析需求文档', color: '#3B82F6' },
  { id: 2, icon: AlertTriangle, text: '找出潜在风险', color: '#EF4444' },
  { id: 3, icon: History, text: '结合历史意见', color: '#F59E0B' },
  { id: 4, icon: Send, text: '生成反馈稿', color: '#10B981' },
];

export default function Chapter8({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Scene 1: Chatbot Era (Steps 0-1) */}
      <AnimatePresence>
        {step <= 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(59,130,246,0.3)]"
            >
              <MessageSquare className="w-16 h-16 text-blue-500" />
            </motion.div>
            
            <h2 className="text-4xl font-bold text-[#43302B] mb-6">聊天机器人时代</h2>
            
            <AnimatePresence>
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="flex gap-4 text-xl font-medium text-gray-500">
                    <span className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">任务短</span>
                    <span className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">链路短</span>
                    <span className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">状态少</span>
                  </div>
                  <div className="mt-4 text-2xl font-bold text-blue-600 bg-blue-50 px-6 py-3 rounded-full">
                    靠“把话说清楚”就能解决
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: Agent Era & Tools (Steps 2-3) */}
      <AnimatePresence>
        {step >= 2 && step <= 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            {step === 2 && (
              <motion.h2 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: -200 }}
                exit={{ opacity: 0 }}
                className="text-5xl font-bold text-[#43302B] absolute"
              >
                但后来 <span className="text-[#F59E0B]">Agent</span> 开始火了...
              </motion.h2>
            )}

            {/* Central Agent Core */}
            <motion.div
              layoutId="agent-core"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: step >= 4 ? 0.6 : 1, 
                y: step >= 4 ? -250 : 0 
              }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="absolute w-40 h-40 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-3xl rotate-12 flex items-center justify-center shadow-[0_0_60px_rgba(245,158,11,0.4)] z-30"
            >
              <Bot className="w-20 h-20 text-white -rotate-12" />
            </motion.div>

            {/* Orbiting Tools */}
            <AnimatePresence>
              {step >= 3 && step <= 4 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {AGENT_TOOLS.map((tool, i) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        x: tool.x, 
                        y: tool.y, 
                        scale: 1 
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1, type: 'spring' }}
                      className="absolute flex flex-col items-center gap-3"
                    >
                      {/* Connecting Line (SVG) */}
                      <svg className="absolute inset-0 w-full h-full -z-10 overflow-visible">
                        <motion.line 
                          x1="0" y1="0" x2={-tool.x} y2={-tool.y} 
                          stroke={tool.color} strokeWidth="2" strokeDasharray="6 6"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.3 }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </svg>
                      
                      <div 
                        className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-xl border-2"
                        style={{ borderColor: tool.color }}
                      >
                        <tool.icon className="w-8 h-8" style={{ color: tool.color }} />
                      </div>
                      <span className="text-lg font-bold text-gray-700 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
                        {tool.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* The Paradigm Shift Text */}
            <AnimatePresence>
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 100, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bg-white/95 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-gray-100 text-center max-w-4xl z-40"
                >
                  <p className="text-3xl text-gray-500 font-medium mb-6">这时候，问题就变了</p>
                  <div className="text-4xl font-bold text-[#43302B] leading-relaxed flex flex-col gap-4">
                    <span className="opacity-50 line-through decoration-4 decoration-gray-400">一次回答对不对</span>
                    <span className="text-5xl text-[#14B8A6] flex items-center justify-center gap-4">
                      <ArrowRight className="w-10 h-10" />
                      整条任务链路能不能跑通
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: Simple vs Complex Task (Steps 5-6) */}
      <AnimatePresence>
        {step >= 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            {/* Simple Task */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ 
                opacity: step === 5 ? 1 : 0.4, 
                y: step === 5 ? 0 : -200,
                scale: step === 5 ? 1 : 0.8
              }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="flex flex-col items-center gap-4"
            >
              <span className="text-2xl text-gray-500 font-medium">比如你不是简单问一句：</span>
              <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 text-2xl font-bold text-gray-700 flex items-center gap-4">
                <MessageSquare className="w-8 h-8 text-blue-500" />
                “帮我总结这篇文章。”
              </div>
            </motion.div>

            {/* Complex Task Pipeline */}
            <AnimatePresence>
              {step === 6 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-1/2 -translate-y-1/3 flex flex-col items-center w-full max-w-6xl px-10"
                >
                  <span className="text-3xl text-[#F59E0B] font-bold mb-12">而是让它做一个更真实的任务：</span>
                  
                  <div className="flex items-center justify-between w-full relative">
                    {/* Connecting Background Line */}
                    <div className="absolute left-10 right-10 h-2 bg-gray-200 top-1/2 -translate-y-1/2 rounded-full -z-10" />
                    
                    {/* Animated Progress Line */}
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      className="absolute left-10 h-2 bg-gradient-to-r from-[#3B82F6] via-[#EF4444] to-[#10B981] top-1/2 -translate-y-1/2 rounded-full -z-10"
                    />

                    {COMPLEX_PIPELINE.map((node, i) => (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.5, type: 'spring', bounce: 0.4 }}
                        className="flex flex-col items-center gap-6 relative group"
                      >
                        {/* Node Icon */}
                        <div 
                          className="w-24 h-24 rounded-full bg-white shadow-2xl border-4 flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110"
                          style={{ borderColor: node.color }}
                        >
                          <node.icon className="w-10 h-10" style={{ color: node.color }} />
                          
                          {/* Ping animation behind icon */}
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: [0, 0.5, 0], scale: [1, 1.5, 2] }}
                            transition={{ duration: 2, delay: i * 0.5 + 0.5, repeat: Infinity }}
                            className="absolute inset-0 rounded-full -z-10"
                            style={{ backgroundColor: node.color }}
                          />
                        </div>
                        
                        {/* Node Text */}
                        <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-gray-100 text-xl font-bold text-gray-800 text-center w-48">
                          {node.text}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
