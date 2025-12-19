import React from "react";
import { SlideData, SlideType } from "./types";
import {
  Terminal,
  Code2,
  GitPullRequest,
  GitMerge,
  Bug,
  FileCode,
  CheckCircle,
  XCircle,
  Shield,
  Globe,
  Coffee,
  Layers,
  AlertTriangle,
  FileJson,
  FolderTree,
  Search,
  TrendingUp,
  ArrowRight,
  Github,
} from "lucide-react";

export const CODING_SLIDES: SlideData[] = [
  // --- PART 7: Coding Intro ---
  {
    id: "coding-intro",
    type: SlideType.CONTENT_TEXT,
    title: "编程能力 (Coding)",
    subtitle: "大模型最“卷”的赛道之一",
    content: (
      <div className="flex flex-col h-full justify-center items-center gap-10">
        <div className="relative w-full max-w-4xl h-64 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col group hover:border-blue-500/50 transition-colors">
          {/* Mock Window Header */}
          <div className="h-8 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-xs text-slate-400 font-mono">
              ai_benchmark.py
            </div>
          </div>

          {/* Code Content */}
          <div className="flex-1 p-6 font-mono text-sm md:text-base relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <p className="text-purple-400">
              def <span className="text-blue-400">assess_coding_skill</span>
              (model):
            </p>
            <p className="text-slate-300 ml-4">
              level = <span className="text-green-400">"Junior"</span>
            </p>
            <p className="text-slate-300 ml-4">
              if model.can_fix_repo_issues():
            </p>
            <p className="text-slate-300 ml-8">
              level = <span className="text-yellow-400">"Senior Engineer"</span>
            </p>
            <p className="text-slate-300 ml-4">return level</p>

            <div className="mt-6 text-slate-500">
              # Output: GPT-5.2 -{">"} Senior Engineer
            </div>

            {/* Cursor Animation */}
            <div className="w-2 h-5 bg-blue-400 absolute bottom-6 left-6 animate-pulse"></div>
          </div>
        </div>

        <div className="text-center max-w-2xl bg-white/5 p-4 rounded-lg border border-white/5">
          <p className="text-gray-300">
            我们从简单的<span className="text-green-400 font-bold">算法题</span>
            ，一路进化到复杂的
            <span className="text-yellow-400 font-bold">真实工程修复</span>。
          </p>
        </div>
      </div>
    ),
  },

  // --- HumanEval ---
  {
    id: "humaneval-card",
    type: SlideType.CONTENT_TEXT,
    title: "HumanEval: 代码界的“算法面试”",
    subtitle: "OpenAI 发布的入门级函数补全测试",
    content: (
      <div className="flex flex-col md:flex-row gap-8 items-center h-full">
        {/* Left: The "Exam Question" */}
        <div className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg group hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
            <Code2 className="text-green-400" size={20} />
            <span className="text-white font-bold">Question: 164 道手写题</span>
          </div>
          <div className="font-mono text-xs md:text-sm text-gray-300 space-y-1">
            <p>
              <span className="text-purple-400">def</span>{" "}
              <span className="text-blue-400">fibonacci</span>(n):
            </p>
            <p className="text-gray-500 ml-4">"""</p>
            <p className="text-gray-500 ml-4">Return the n-th number</p>
            <p className="text-gray-500 ml-4">in the fibonacci sequence.</p>
            <p className="text-gray-500 ml-4">"""</p>
            <div className="bg-blue-900/20 border border-blue-500/30 p-2 ml-4 rounded mt-2 animate-pulse">
              <span className="text-blue-300"># AI completes code here...</span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden md:block">
          <ArrowRight size={32} className="text-gray-600" />
        </div>

        {/* Right: The Evaluation */}
        <div className="flex-1 w-full flex flex-col gap-4">
          <div className="bg-slate-800 p-4 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="text-white font-bold mb-1">Pass@1</h4>
              <p className="text-xs text-gray-400">只给一次机会，写对了吗？</p>
            </div>
            <div className="text-3xl font-bold text-green-400">90%+</div>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl border border-white/10">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <Terminal size={16} /> Unit Tests
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-green-400 font-mono">
                <CheckCircle size={12} /> assert fib(0) == 0
              </div>
              <div className="flex items-center gap-2 text-xs text-green-400 font-mono">
                <CheckCircle size={12} /> assert fib(1) == 1
              </div>
              <div className="flex items-center gap-2 text-xs text-green-400 font-mono">
                <CheckCircle size={12} /> assert fib(10) == 55
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 mt-2">
            *对于顶级模型来说，这已是“送分题”
          </div>
        </div>
      </div>
    ),
  },

  // --- SWE-bench ---
  {
    id: "swe-bench-intro",
    type: SlideType.CONTENT_TEXT,
    title: "SWE-bench: 真实仓库修 Issue",
    subtitle: "从“做题家”到“工程师”的分水岭",
    content: (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* The "GitHub" Card */}
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl relative overflow-hidden group hover:border-purple-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Github className="text-white" size={24} />
                <span className="font-bold text-lg">django/django</span>
              </div>
              <span className="bg-green-900/50 text-green-400 text-xs px-2 py-1 rounded-full border border-green-700">
                Open Source
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-red-400 mb-1">
                <Bug size={16} />
                <span className="font-bold text-sm">Issue #14302</span>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2">
                Data leakage in specific version when handling middleware
                exceptions...
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <FileCode size={14} /> 450k+ lines
              </div>
              <div className="flex items-center gap-1">
                <GitMerge size={14} /> 200+ files
              </div>
            </div>
          </div>

          {/* The Challenge Card */}
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl flex flex-col justify-center group hover:border-yellow-500 transition-colors">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="text-yellow-500" /> 任务复杂度
            </h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <Search className="text-blue-400 shrink-0 mt-0.5" size={16} />
                <span>
                  <b>自主定位：</b>{" "}
                  在几十万行代码中，找到是哪个文件的哪一行出了问题。
                </span>
              </li>
              <li className="flex items-start gap-3">
                <GitPullRequest
                  className="text-purple-400 shrink-0 mt-0.5"
                  size={16}
                />
                <span>
                  <b>编写补丁：</b> 提交 Pull Request，不仅要修好 Bug。
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="text-green-400 shrink-0 mt-0.5" size={16} />
                <span>
                  <b>回归测试：</b>{" "}
                  <span className="text-red-400 font-bold">不能破坏</span>
                  原有的成百上千个测试用例。
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center bg-white/5 p-4 rounded-xl border border-white/5">
          <div className="flex justify-between items-center px-8">
            <span className="text-gray-400 text-sm">
              Current SOTA (GPT 5.2 / Gemini 3.0)
            </span>
            <span className="text-2xl font-bold text-yellow-400">~ 70%</span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-yellow-400 h-full w-[70%]"></div>
          </div>
        </div>
      </div>
    ),
  },

  // --- SWE-bench Pro ---
  {
    id: "swe-bench-pro",
    type: SlideType.GRID_CARDS,
    title: "SWE-bench Pro: 真实工程进阶",
    subtitle: "当模型开始“背题”，试卷必须更接近现实",
    items: [
      {
        title: "反污染 (Anti-Contamination)",
        description:
          "引入私有或商业代码库，防止模型在训练数据中见过答案（Cheat）。",
        icon: <Shield className="w-8 h-8 text-red-400" />,
      },
      {
        title: "多语言 (Polyglot)",
        description:
          "不再只有 Python。新增 Java, JavaScript, Go 等。全栈工程师考核。",
        icon: <Globe className="w-8 h-8 text-blue-400" />,
      },
      {
        title: "模糊需求 (Ambiguity)",
        description:
          "真实需求往往是不清晰的。模型需要处理“烂尾”的 Issue 描述。",
        icon: <AlertTriangle className="w-8 h-8 text-yellow-400" />,
      },
      {
        title: "现实冲击",
        description:
          "在这些更真实的约束下，顶级模型的通过率大幅下降，回归理性。",
        icon: <TrendingUp className="w-8 h-8 text-purple-400 rotate-180" />,
      },
    ],
  },
];
