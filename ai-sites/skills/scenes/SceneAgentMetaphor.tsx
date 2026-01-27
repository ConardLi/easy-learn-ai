import React from "react";
import { motion } from "framer-motion";
import { SceneProps } from "../types";
import { ChalkText } from "../components/ChalkText";
import { Brain, Briefcase, BookOpen, Check, Zap } from "lucide-react";

export const SceneAgentMetaphor: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Super Brain (Claude)
  // 1: Toolbox (Skills)
  // 2: Manual (The key differentiator)
  // 3: The Workflow (Don't memorize, just use)

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-6xl px-4">
      {/* Main Diagram Area */}
      <div className="relative w-full flex items-center justify-center gap-8 md:gap-16 min-h-[400px]">
        {/* 1. The Super Brain */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="flex flex-col items-center z-10"
        >
          <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-4 border-white/20 flex items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.3)]">
            <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]" />
            <Brain
              size={80}
              className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            />

            {/* Label */}
            <div className="absolute -bottom-16 text-center w-64">
              <ChalkText size="xl" className="font-bold text-purple-200">
                Claude
              </ChalkText>
              <ChalkText size="lg" className="text-white/60">
                Super Brain
              </ChalkText>
            </div>
          </div>
        </motion.div>

        {/* Connection Line */}
        {step >= 1 && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 100, opacity: 1 }}
            className="h-2 bg-dashed border-t-2 border-dashed border-white/30 hidden md:block"
          />
        )}

        {/* 2. The Toolbox */}
        {step >= 1 && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col items-center z-10"
          >
            <div className="relative group">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-yellow-600/20 border-4 border-yellow-500/40 flex items-center justify-center shadow-lg">
                <Briefcase
                  size={70}
                  className="text-yellow-400 group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Floating Tools particles */}
              <div className="absolute -top-4 -right-4 text-blue-300 animate-bounce delay-100">
                <Zap size={24} />
              </div>
              <div className="absolute -bottom-4 -left-4 text-green-300 animate-bounce delay-300">
                <Check size={24} />
              </div>

              {/* Label */}
              <div className="absolute -bottom-16 text-center w-64 left-1/2 -translate-x-1/2">
                <ChalkText size="xl" className="font-bold text-yellow-200">
                  Agent Skills
                </ChalkText>
                <ChalkText size="lg" className="text-white/60">
                  External Toolbox
                </ChalkText>
              </div>

              {/* 3. The Manual (Pop out) */}
              {step >= 2 && (
                <motion.div
                  initial={{ y: 20, opacity: 0, scale: 0.5 }}
                  animate={{ y: -60, opacity: 1, scale: 1 }}
                  transition={{ type: "spring" }}
                  className="absolute top-0 right-0 bg-white text-black p-4 rounded-lg shadow-2xl rotate-12 border-2 border-gray-300 origin-bottom-left w-48"
                >
                  <div className="flex items-center gap-2 border-b-2 border-gray-200 pb-2 mb-2">
                    <BookOpen size={20} className="text-blue-600" />
                    <span className="font-bold font-sans text-sm">
                      MANUAL.md
                    </span>
                  </div>
                  <div className="space-y-1 opacity-50">
                    <div className="h-1 bg-black rounded w-full" />
                    <div className="h-1 bg-black rounded w-3/4" />
                    <div className="h-1 bg-black rounded w-1/2" />
                  </div>
                  <div className="mt-2 text-xs font-bold text-red-600">
                    官方使用说明书
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* 4. Workflow Explanation */}
      {step >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-24 max-w-4xl bg-gradient-to-r from-green-900/30 to-blue-900/30 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="bg-green-500/20 p-4 rounded-full">
              <Check size={32} className="text-green-300" />
            </div>
            <div>
              <ChalkText size="lg" className="mb-1 text-white">
                大脑不需要理解具体有哪些工具以及工具的用法
              </ChalkText>
              <ChalkText size="xl" className="font-bold text-green-300">
                查阅说明书 -&gt; 拿出工具 -&gt; 直接使用
              </ChalkText>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
