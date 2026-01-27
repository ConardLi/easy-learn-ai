import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { Calendar, TrendingUp, Users, CheckCircle, Flame } from 'lucide-react';

export const SceneTimeline: React.FC<SceneProps> = ({ step }) => {
  // Step 0: Intro text ("Recently very hot...")
  // Step 1: Oct 2025 Anthropic
  // Step 2: Cursor/Codex
  // Step 3: Community/Market
  // Step 4: Standard Practice

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-6xl px-4">
        {/* Header - Always Visible */}
        <div className="absolute top-12 left-12">
             <div className="flex items-center gap-4">
                <Flame size={40} className="text-orange-400 animate-pulse" />
                <ChalkText size="2xl">Agent Skills 的崛起</ChalkText>
             </div>
        </div>

        {/* Intro Text */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 0 ? 1 : 0 }}
            className="mb-12 text-center"
        >
            <ChalkText size="xl" className="text-gray-300">
                它的成长路线和 <span className="text-blue-300 font-bold">MCP</span> 非常像...
            </ChalkText>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative flex justify-between items-start mt-8">
            {/* Connecting Line */}
            <motion.div 
                className="absolute top-8 left-0 h-1 bg-white/20 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: step >= 4 ? '100%' : step >= 3 ? '75%' : step >= 2 ? '50%' : step >= 1 ? '25%' : '0%' }}
                transition={{ duration: 1, ease: "easeInOut" }}
            />

            {/* Node 1: Anthropic */}
            <TimelineNode 
                visible={step >= 1} 
                delay={0}
                icon={Calendar}
                date="2025年 10月"
                title="起源"
                color="red"
            >
                发布时只有 <strong className="text-red-300">Anthropic</strong><br/>自家产品支持
            </TimelineNode>

            {/* Node 2: IDE Integrations */}
            <TimelineNode 
                visible={step >= 2} 
                delay={0.2}
                icon={TrendingUp}
                date="随后"
                title="爆发"
                color="yellow"
            >
                Cursor, Codex, Opencode<br/>纷纷开始支持
            </TimelineNode>

            {/* Node 3: Community */}
            <TimelineNode 
                visible={step >= 3} 
                delay={0.2}
                icon={Users}
                date="再后来"
                title="生态"
                color="blue"
            >
                社区涌现大量开源 Skills<br/>及 <strong className="text-blue-300">Skills 开放市场</strong>
            </TimelineNode>

             {/* Node 4: Standard */}
             <TimelineNode 
                visible={step >= 4} 
                delay={0.2}
                icon={CheckCircle}
                date="当下"
                title="标准"
                color="green"
            >
                大家已默认 Skills 成为<br/>Agent 领域的<strong className="text-green-300">标准实践</strong>
            </TimelineNode>
        </div>
    </div>
  );
};

// Helper sub-component for timeline nodes
const TimelineNode = ({ visible, delay, icon: Icon, date, title, children, color }: any) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay, duration: 0.5 }}
            className="flex flex-col items-center w-1/4 px-2"
        >
            <div className={`w-16 h-16 rounded-full bg-[#1e1e24] border-4 border-${color}-400 flex items-center justify-center z-10 shadow-lg mb-4`}>
                <Icon size={32} className={`text-${color}-400`} />
            </div>
            
            <div className="text-center space-y-2">
                <div className={`inline-block px-3 py-1 rounded bg-${color}-900/30 border border-${color}-500/30`}>
                    <ChalkText size="sm" color={color} className="font-bold">{date}</ChalkText>
                </div>
                <ChalkText size="lg" className="font-bold">{title}</ChalkText>
                <ChalkText size="base" className="text-gray-400 leading-tight">
                    {children}
                </ChalkText>
            </div>
        </motion.div>
    )
}