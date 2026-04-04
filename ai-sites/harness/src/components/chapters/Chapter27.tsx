import { motion, AnimatePresence } from 'motion/react';
import { 
  AppWindow, 
  PenTool, 
  Search, 
  Globe, 
  Activity, 
  Box, 
  Play,
  Bug,
  Wrench,
  RefreshCw,
  Wrench as ToolIcon,
  GitMerge,
  Eye,
  ShieldAlert,
  MousePointer2
} from 'lucide-react';

export default function Chapter27({ step }: { step: number }) {
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
              <AppWindow className="w-12 h-12 text-teal-600" />
            </div>
            <h2 className="text-6xl font-black text-[#43302B] mb-6">OpenAI 的进阶实践</h2>
            <p className="text-4xl text-teal-600 font-bold tracking-widest">
              让 Agent 看见整个应用
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: The Bottleneck (Step 1) */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-16 text-center">
              代码产出速度一上来，瓶颈就不再是<span className="text-blue-500 font-black mx-2">“写”</span>，而是<span className="text-rose-500 font-black mx-2">“验”</span>。
            </h3>

            <div className="flex items-center gap-12">
              {/* Write - Fast */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-blue-50 p-8 rounded-3xl border-4 border-blue-200 flex flex-col items-center w-64"
              >
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <PenTool className="w-20 h-20 text-blue-500 mb-4" />
                </motion.div>
                <h4 className="text-3xl font-black text-blue-700">写代码</h4>
                <p className="text-blue-500 font-bold mt-2">速度极快</p>
              </motion.div>

              {/* Arrow */}
              <div className="flex flex-col items-center">
                <div className="h-2 w-24 bg-gray-300 rounded-full relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-rose-400"
                    animate={{ width: ["0%", "100%"] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Verify - Bottleneck */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-rose-50 p-8 rounded-3xl border-4 border-rose-300 shadow-2xl flex flex-col items-center w-72 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-rose-100/50" />
                <Search className="w-20 h-20 text-rose-600 mb-4 relative z-10" />
                <h4 className="text-3xl font-black text-rose-700 relative z-10">验代码</h4>
                <p className="text-rose-600 font-bold mt-2 relative z-10 bg-white px-3 py-1 rounded-lg">人类根本验不过来</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: How to verify (Steps 2-4) */}
      <AnimatePresence>
        {step >= 2 && step <= 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <h2 className="text-5xl font-bold text-[#43302B] mb-16 text-center">
              所以他们让 Agent <span className="text-indigo-600 font-black">自己去验</span>。怎么验？
            </h2>
            
            <div className="flex gap-8 max-w-6xl w-full px-8">
              {/* Method 1: Browser */}
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-blue-400 flex flex-col items-center text-center"
                  >
                    <div className="w-24 h-24 bg-blue-50 rounded-2xl flex flex-col items-center justify-center mb-6 relative overflow-hidden shadow-inner border-2 border-blue-100">
                      <div className="absolute top-0 left-0 w-full h-5 bg-blue-200 flex items-center px-2 gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-rose-400" />
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <div className="mt-4 relative w-14 h-10 border-2 border-blue-200 rounded bg-white flex items-center justify-center">
                        <motion.div
                          animate={{ backgroundColor: ['#eff6ff', '#bfdbfe', '#eff6ff'], scale: [1, 0.9, 1] }}
                          transition={{ duration: 2, repeat: Infinity, times: [0, 0.2, 1] }}
                          className="w-8 h-4 rounded bg-blue-100"
                        />
                        <motion.div
                          animate={{ x: [15, 0, 15], y: [15, 0, 15] }}
                          transition={{ duration: 2, repeat: Infinity, times: [0, 0.2, 1] }}
                          className="absolute z-10 text-gray-700 right-0 bottom-0"
                        >
                          <MousePointer2 className="w-5 h-5 fill-white" />
                        </motion.div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">接浏览器</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      能截图、点页面、<br/>
                      <span className="text-blue-600 font-bold">模拟用户操作</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Method 2: Logs */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-purple-400 flex flex-col items-center text-center"
                  >
                    <div className="w-24 h-24 bg-gray-900 rounded-2xl flex flex-col items-start justify-end p-3 mb-6 relative overflow-hidden shadow-inner border-2 border-purple-200">
                      <motion.div
                        animate={{ y: [0, -60] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="flex flex-col gap-2 w-full"
                      >
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-purple-400 text-[8px] font-mono">{`>`}</span>
                            <div className={`h-1.5 rounded-full ${i % 3 === 0 ? 'bg-rose-400 w-1/2' : i % 2 === 0 ? 'bg-emerald-400 w-3/4' : 'bg-purple-400 w-full'}`} />
                          </div>
                        ))}
                      </motion.div>
                      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-gray-900 to-transparent" />
                      <div className="absolute bottom-2 right-2">
                        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                          <Activity className="w-6 h-6 text-purple-400" />
                        </motion.div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">接日志指标</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      让它查 Log、<br/>
                      <span className="text-purple-600 font-bold">查监控</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Method 3: Isolation */}
              <AnimatePresence>
                {step >= 4 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-amber-400 flex flex-col items-center text-center"
                  >
                    <div className="w-24 h-24 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden shadow-inner border-2 border-amber-100">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-3 border-2 border-dashed border-amber-400 rounded-xl"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center z-10 shadow-lg"
                      >
                        <Box className="w-6 h-6 text-white" />
                      </motion.div>
                      <motion.div
                        animate={{ y: [-5, 5, -5], x: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute top-4 left-4 w-2 h-2 bg-amber-300 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [5, -5, 5], x: [5, -5, 5], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-amber-500 rounded-full"
                      />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-4">隔离环境</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      每个任务独立跑、<br/>
                      <span className="text-amber-600 font-bold">互不影响</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: The Result Loop (Step 5) */}
      <AnimatePresence>
        {step === 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-16 text-center leading-relaxed">
              结果就是，Agent 不再是“写完代码就说做完了”，<br/>
              而是真的可以：
            </h3>

            <div className="flex items-center gap-4 bg-white p-8 rounded-full shadow-2xl border-4 border-emerald-100">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"><Play className="w-8 h-8" /></div>
                <span className="font-bold text-gray-700">跑起来</span>
              </div>
              <div className="w-12 h-1 bg-gray-200 rounded-full" />
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><Eye className="w-8 h-8" /></div>
                <span className="font-bold text-gray-700">看结果</span>
              </div>
              <div className="w-12 h-1 bg-gray-200 rounded-full" />
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-600"><Bug className="w-8 h-8" /></div>
                <span className="font-bold text-gray-700">发现 bug</span>
              </div>
              <div className="w-12 h-1 bg-gray-200 rounded-full" />
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600"><Wrench className="w-8 h-8" /></div>
                <span className="font-bold text-gray-700">修 bug</span>
              </div>
              <div className="w-12 h-1 bg-gray-200 rounded-full" />
              <div className="flex flex-col items-center gap-2 relative">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600"><RefreshCw className="w-8 h-8" /></div>
                <span className="font-bold text-gray-700">再验证</span>
                
                {/* Loop back arrow */}
                <svg className="absolute -bottom-12 left-1/2 w-96 h-12 -translate-x-1/2" style={{ overflow: 'visible' }}>
                  <motion.path 
                    d="M 0 0 Q -150 50 -350 0" 
                    fill="transparent" 
                    stroke="#10B981" 
                    strokeWidth="4" 
                    strokeDasharray="8 8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <polygon points="-350,-5 -360,0 -350,5" fill="#10B981" />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 5: Conclusion - Harness Mapping (Step 6) */}
      <AnimatePresence>
        {step === 6 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
          >
            <h3 className="text-4xl font-bold text-[#43302B] mb-12 text-center">
              这其实就是 Harness 里<span className="text-indigo-600 font-black mx-2">非常完整的一套</span>：
            </h3>

            <div className="grid grid-cols-2 gap-6 max-w-3xl w-full">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="bg-white p-6 rounded-2xl shadow-lg border-l-8 border-blue-500 flex items-center gap-4"
              >
                <ToolIcon className="w-10 h-10 text-blue-500" />
                <span className="text-2xl font-black text-gray-800">工具系统</span>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="bg-white p-6 rounded-2xl shadow-lg border-l-8 border-purple-500 flex items-center gap-4"
              >
                <GitMerge className="w-10 h-10 text-purple-500" />
                <span className="text-2xl font-black text-gray-800">执行编排</span>
              </motion.div>

              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="bg-white p-6 rounded-2xl shadow-lg border-l-8 border-emerald-500 flex items-center gap-4"
              >
                <Eye className="w-10 h-10 text-emerald-500" />
                <span className="text-2xl font-black text-gray-800">评估与观测</span>
              </motion.div>

              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="bg-white p-6 rounded-2xl shadow-lg border-l-8 border-rose-500 flex items-center gap-4"
              >
                <ShieldAlert className="w-10 h-10 text-rose-500" />
                <span className="text-2xl font-black text-gray-800">约束与恢复</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
