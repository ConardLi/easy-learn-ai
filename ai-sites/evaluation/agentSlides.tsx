import React from "react";
import { SlideData, SlideType } from "./types";
import {
  Bot,
  Briefcase,
  Wrench,
  Link,
  Users,
  MessageSquare,
  Database,
  ShieldAlert,
  Phone,
  ShoppingBag,
  Plane,
  Server,
  Map,
  Search,
  Calculator,
  Gavel,
  CheckCircle2,
  XCircle,
  Percent,
  ArrowRight,
  Workflow,
} from "lucide-react";

export const AGENT_SLIDES: SlideData[] = [
  // --- PART 6: Agents Intro ---
  {
    id: "agent-intro",
    type: SlideType.CONTENT_TEXT,
    title: "智能体 (Agent)",
    subtitle: "从“能聊天”到“能干活”",
    content: (
      <div className="flex flex-col gap-10 h-full justify-center items-center">
        <div className="flex items-center gap-8 md:gap-16">
          {/* Old Era */}
          <div className="flex flex-col items-center group opacity-60 hover:opacity-100 transition-opacity duration-500">
            <div className="w-32 h-32 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center mb-4">
              <MessageSquare size={50} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-400">Chatbot</h3>
            <p className="text-gray-500 text-sm mt-1">2023: 闲聊、问答</p>
          </div>

          <div className="flex flex-col items-center">
            <ArrowRight size={40} className="text-blue-500 animate-pulse" />
          </div>

          {/* New Era */}
          <div className="flex flex-col items-center group transform scale-110">
            <div className="w-40 h-40 rounded-full bg-blue-600/20 border-2 border-blue-400 flex items-center justify-center mb-4 shadow-[0_0_50px_rgba(59,130,246,0.4)] relative">
              <Bot size={70} className="text-blue-400 z-10" />
              <div className="absolute inset-0 rounded-full animate-ping bg-blue-500/10"></div>
              {/* Floating Tools */}
              <Wrench
                size={20}
                className="absolute top-4 right-6 text-white animate-bounce"
              />
              <Database
                size={20}
                className="absolute bottom-6 left-6 text-white animate-pulse"
              />
            </div>
            <h3 className="text-2xl font-bold text-white">Agent</h3>
            <p className="text-blue-300 text-sm mt-1">Now: 任务执行、工作流</p>
          </div>
        </div>

        <div className="max-w-3xl text-center bg-white/5 p-6 rounded-xl border-l-4 border-blue-500">
          <p className="text-lg text-gray-300 leading-relaxed">
            在实际业务场景中，仅靠一个 LLM 是不够的。
            <br />
            我们需要 <span className="text-white font-bold">
              Workflow
            </span> 和 <span className="text-white font-bold">Tools</span>{" "}
            来解决真实世界的复杂需求。
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "agent-metrics",
    type: SlideType.GRID_CARDS,
    title: "智能体评估的核心维度",
    subtitle: "不仅仅是回答问题，更是解决问题",
    items: [
      {
        title: "目标导向 (Goal Oriented)",
        description:
          "给定模糊目标（如“修网络”），能否自主拆解子步骤并持续推进？",
        icon: <Briefcase className="w-8 h-8 text-blue-400" />,
      },
      {
        title: "工具使用 (Tool Use)",
        description: "参数是否正确？格式是否合规？权限是否搞错？",
        icon: <Wrench className="w-8 h-8 text-orange-400" />,
      },
      {
        title: "长链路 (Long Context)",
        description: "多步流程不能半途而废，中间结果要能正确传递到最后。",
        icon: <Link className="w-8 h-8 text-purple-400" />,
      },
      {
        title: "人机协作 (Human-in-the-loop)",
        description: "能不能指导“小白用户”完成物理世界的关键操作？",
        icon: <Users className="w-8 h-8 text-green-400" />,
      },
    ],
  },

  // --- Tau-bench ---
  {
    id: "tau-bench-intro",
    type: SlideType.CONTENT_TEXT,
    title: "τ²-bench: 逼真的“客服模拟战”",
    subtitle: "High-Fidelity Agent Evaluation",
    content: (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* The Setup */}
          <div className="flex-1 bg-slate-900 border border-slate-700 p-6 rounded-xl relative overflow-hidden group hover:border-blue-500 transition-colors">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
              <Bot size={60} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">场景设定</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <Users className="text-blue-400 shrink-0 mt-1" size={20} />
                <div>
                  <span className="text-white font-bold">用户模拟器</span>
                  <p className="text-sm text-gray-500">
                    模拟刁钻、不耐烦的真实客户
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Database className="text-purple-400 shrink-0 mt-1" size={20} />
                <div>
                  <span className="text-white font-bold">环境数据库</span>
                  <p className="text-sm text-gray-500">
                    保存用户状态（欠费、信号强度等）
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ShieldAlert className="text-red-400 shrink-0 mt-1" size={20} />
                <div>
                  <span className="text-white font-bold">Policy (天条)</span>
                  <p className="text-sm text-gray-500">
                    必须严格遵守的公司规定与流程
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* The Challenge */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-500/30 p-6 rounded-xl text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                0 Tolerance
              </h3>
              <p className="text-red-200 mb-4">极其严苛的评分标准</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-left">
                <div className="flex items-center gap-2 text-gray-300">
                  <XCircle size={16} className="text-red-500" /> 违背流程
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <XCircle size={16} className="text-red-500" /> 查错数据
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <XCircle size={16} className="text-red-500" /> 忘记更新
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <XCircle size={16} className="text-red-500" /> 乱答应
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-red-500/20 text-xs text-gray-400">
                只要犯错一个，本题直接 0 分
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "tau-bench-flow",
    type: SlideType.CONTENT_TEXT,
    title: "Task: 手机没信号怎么办？",
    subtitle: "一个典型的 Policy-Following 任务",
    content: (
      <div className="relative w-full max-w-4xl mx-auto bg-slate-900/50 rounded-xl border border-white/5 p-6 h-[500px] overflow-y-auto custom-scrollbar">
        {/* Timeline Line */}
        <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-gray-700"></div>

        <div className="space-y-6 pl-16 relative">
          {/* Step 1: User Complaint */}
          <div className="relative group">
            <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold shadow-lg z-10">
              U
            </div>
            <div className="bg-slate-800 p-4 rounded-tl-none rounded-2xl border border-gray-600 inline-block max-w-[80%]">
              <p className="text-white">我手机怎么没信号了？急死我了！</p>
            </div>
          </div>

          {/* Step 2: Agent Tool Check */}
          <div className="relative group">
            <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg z-10 border border-blue-400">
              A
            </div>
            <div className="bg-blue-900/30 p-4 rounded-tr-none rounded-2xl border border-blue-500/30 w-full">
              <div className="flex items-center gap-2 text-blue-300 text-xs font-mono mb-2">
                <Wrench size={12} /> tool_call: check_network_status(user_id)
              </div>
              <p className="text-gray-300 text-sm">
                先查状态，不能瞎猜。发现 Airplane Mode: ON
              </p>
            </div>
          </div>

          {/* Step 3: Agent Instruction */}
          <div className="relative group">
            <div className="bg-blue-600/20 p-4 rounded-tr-none rounded-2xl border border-blue-500/50 inline-block w-full text-right self-end">
              <p className="text-blue-100">
                亲，系统显示您开了飞行模式。请您尝试关闭飞行模式看看？
              </p>
            </div>
          </div>

          {/* Step 4: Logic Loop (Simulation) */}
          <div className="relative p-4 border-2 border-dashed border-gray-600 rounded-xl bg-black/20">
            <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs text-gray-500 font-mono">
              Policy Logic
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <ArrowRight size={14} /> 若 SIM Missing → 指引重插 SIM
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight size={14} /> 若仍不行 → 指引重置 APN
              </div>
              <div className="flex items-center gap-2 text-yellow-400">
                <ArrowRight size={14} /> 若欠费 →{" "}
                <span className="underline">必须</span>先发起支付请求
              </div>
            </div>
          </div>

          {/* Step 5: Final Action */}
          <div className="relative group">
            <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg z-10">
              ✓
            </div>
            <div className="bg-green-900/20 p-4 rounded-2xl border border-green-500/30 w-full">
              <div className="flex items-center gap-2 text-green-300 text-xs font-mono mb-2">
                <Database size={12} /> update_ticket_status(solved)
              </div>
              <p className="text-white text-sm">
                引导用户复机成功，并提醒重启手机。
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "tau-bench-variants",
    type: SlideType.GRID_CARDS,
    title: "τ²-bench 的多重宇宙",
    subtitle: "隔行如隔山，不同业务不同规则",
    items: [
      {
        title: "Telecom (电信)",
        description: "处理欠费、停机、套餐变更、网络排障。最考验流程的严谨性。",
        icon: <Phone className="w-8 h-8 text-blue-400" />,
      },
      {
        title: "Retail (零售)",
        description: "订单取消、退换货、改地址。涉及物流状态查询与退款策略。",
        icon: <ShoppingBag className="w-8 h-8 text-pink-400" />,
      },
      {
        title: "Airline (航空)",
        description:
          "改签、退票、升舱。规则最复杂（起飞前2小时/票价差额计算）。",
        icon: <Plane className="w-8 h-8 text-sky-400" />,
      },
      {
        title: "局限性",
        description:
          "虽然逼真，但工具数量较少，无法覆盖大规模 API 调用的场景。",
        icon: <Workflow className="w-8 h-8 text-gray-400" />,
      },
    ],
  },

  // --- MCP-Atlas ---
  {
    id: "mcp-atlas-intro",
    type: SlideType.CONTENT_TEXT,
    title: "MCP-Atlas: 通用工具地图",
    subtitle: "Scaling Agent Evaluation to 300+ Tools",
    content: (
      <div className="flex flex-col md:flex-row gap-8 items-center h-full">
        <div className="flex-1 space-y-6">
          <p className="text-xl text-gray-300">
            Anthropic 推出的{" "}
            <span className="text-white font-bold">
              MCP (Model Context Protocol)
            </span>{" "}
            已成为 AI 连接外部世界的标准。
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-white/10 text-center">
              <Server className="w-8 h-8 mx-auto text-indigo-400 mb-2" />
              <div className="text-2xl font-bold text-white">40+</div>
              <div className="text-xs text-gray-500">Servers</div>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-white/10 text-center">
              <Wrench className="w-8 h-8 mx-auto text-cyan-400 mb-2" />
              <div className="text-2xl font-bold text-white">300+</div>
              <div className="text-xs text-gray-500">Tools</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-gray-600 pl-4">
            相比 τ²-bench 的专精，MCP-Atlas
            给模型一张巨大的“工具地图”。模型必须自己发现工具、阅读文档、组合调用。
          </p>
        </div>

        {/* Visual: Tool Map Network */}
        <div className="flex-1 relative h-[300px] w-full bg-slate-900/50 rounded-2xl border border-indigo-500/20 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>

          {/* Center Node */}
          <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)] animate-pulse">
            <Bot size={40} className="text-indigo-600" />
          </div>

          {/* Orbiting Nodes */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-12 h-12 bg-slate-800 border border-indigo-500/50 rounded-full flex items-center justify-center text-indigo-300"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${i * 60}deg) translate(100px) rotate(-${
                  i * 60
                }deg)`,
              }}
            >
              <Wrench size={18} />
            </div>
          ))}

          {/* Connection Lines (Simulated with SVG if needed, or just layout) */}
          <div className="absolute text-xs text-indigo-500/50 font-mono bottom-2 right-4">
            Map: Full Environment
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "mcp-atlas-example",
    type: SlideType.PROCESS,
    title: "Example: 历史股价大比拼",
    subtitle: "流程不能乱，结果必须准",
    items: [
      {
        title: "Step 1: 查数据",
        step: "Search",
        description:
          "调用 Financial_Search。分别查询微软、苹果、亚马逊、谷歌 1986+ 的 IPO 价格。",
        icon: <Search className="w-10 h-10 text-white" />,
        color: "bg-blue-600",
      },
      {
        title: "Step 2: 找极值",
        step: "Compare",
        description: "对比 4 个数字。必须精准识别哪家是最低，哪家是最高。",
        icon: <Map className="w-10 h-10 text-white" />,
        color: "bg-purple-600",
      },
      {
        title: "Step 3: 做计算",
        step: "Calculate",
        description: "计算百分比差异：（最高 - 最低）/ 最高。不能有计算幻觉。",
        icon: <Calculator className="w-10 h-10 text-white" />,
        color: "bg-emerald-600",
      },
    ],
  },
  {
    id: "mcp-atlas-grading",
    type: SlideType.CONTENT_TEXT,
    title: "拆解式判卷法",
    subtitle: "Gemini 2.5 Pro 当裁判，不留情面",
    content: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* The Claims Card */}
          <div className="w-full md:w-1/3 bg-white/5 border border-white/10 p-6 rounded-xl">
            <h4 className="text-gray-400 uppercase text-xs font-bold mb-4 tracking-wider">
              Decomposed Claims
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-green-500/10 rounded border border-green-500/30">
                <CheckCircle2 size={18} className="text-green-400" />
                <span className="text-sm">微软股价查对</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-green-500/10 rounded border border-green-500/30">
                <CheckCircle2 size={18} className="text-green-400" />
                <span className="text-sm">其他三家查对</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-red-500/10 rounded border border-red-500/30 opacity-60">
                <XCircle size={18} className="text-red-400" />
                <span className="text-sm">最低公司找对</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-red-500/10 rounded border border-red-500/30 opacity-60">
                <XCircle size={18} className="text-red-400" />
                <span className="text-sm">百分比算对</span>
              </div>
            </div>
          </div>

          {/* The Logic Arrow */}
          <div className="text-gray-500 flex flex-col items-center">
            <Gavel size={32} className="mb-2 text-yellow-500" />
            <div className="h-12 w-0.5 bg-gray-700"></div>
          </div>

          {/* The Score Card */}
          <div className="w-full md:w-1/3 bg-slate-900 border border-white/10 p-6 rounded-xl text-center relative overflow-hidden">
            <h4 className="text-gray-400 uppercase text-xs font-bold mb-2 tracking-wider">
              Final Verdict
            </h4>
            <div className="text-5xl font-bold text-white mb-2 flex items-center justify-center">
              50 <Percent size={30} className="mt-2" />
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-4">
              <div className="w-1/2 h-full bg-yellow-500"></div>
            </div>

            {/* Stamp */}
            <div className="border-4 border-red-500 text-red-500 font-black text-2xl uppercase inline-block px-4 py-1 transform -rotate-12 mask-image">
              FAIL
            </div>
            <p className="text-xs text-red-400 mt-2 font-mono">
              Threshold: {">"} 75% required
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-lg border border-blue-500/20 text-center">
          <h4 className="text-blue-300 font-bold mb-1">Leaderboard</h4>
          <p className="text-sm text-gray-300">
            Claude Opus 4.5 暂居榜首，通过率仅{" "}
            <span className="text-white font-bold text-lg">62%</span>。
            <br />
            真实场景的复杂性远超想象。
          </p>
        </div>
      </div>
    ),
  },
];
