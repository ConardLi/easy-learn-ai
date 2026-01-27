import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { Usb, Database, Globe, FileText, Server, Cable, CheckCircle } from 'lucide-react';

export const SceneMCPAnalogy: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Title & Recall "In previous tutorials..."
  // 1: The USB Metaphor (Central Hub)
  // 2: Connecting Resources (DB, API, Files plugging in)
  // 3: Conclusion (Standardized & Reusable)

  const peripherals = [
    { id: 'db', label: 'Database', icon: Database, color: 'blue', x: -150, y: -80 },
    { id: 'api', label: '3rd Party API', icon: Globe, color: 'green', x: 0, y: -120 },
    { id: 'file', label: 'Local Files', icon: FileText, color: 'yellow', x: 150, y: -80 },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-6xl px-4 relative">
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center z-10"
        >
             <div className="inline-block bg-purple-500/10 px-4 py-1 rounded-full text-purple-300 text-sm font-mono mb-2 border border-purple-500/30">
                Review
             </div>
             <ChalkText as="h2" size="2xl" color="white">
                MCP: 通用的 “USB 接口”
             </ChalkText>
        </motion.div>

        {/* Main Diagram */}
        <div className="relative flex items-center justify-center w-full h-[400px]">
            
            {/* The Central MCP Hub (USB) */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={step >= 1 ? { scale: 1, opacity: 1 } : {}}
                className="z-20 flex flex-col items-center"
            >
                <div className="w-32 h-32 bg-[#1e1e24] border-4 border-purple-500 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.4)] relative">
                    <Usb size={64} className="text-purple-400" />
                    
                    {/* Ports */}
                    <div className="absolute -top-1 flex gap-4">
                        <div className="w-4 h-2 bg-black rounded-b border border-purple-500/50" />
                        <div className="w-4 h-2 bg-black rounded-b border border-purple-500/50" />
                        <div className="w-4 h-2 bg-black rounded-b border border-purple-500/50" />
                    </div>
                </div>
                <ChalkText size="xl" className="mt-4 font-bold text-purple-300">MCP Standard</ChalkText>
            </motion.div>

            {/* Connecting Peripherals */}
            {peripherals.map((p, index) => {
                const isConnected = step >= 2;
                return (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, x: p.x * 2, y: p.y * 2 }} // Start further away
                        animate={
                            isConnected 
                            ? { opacity: 1, x: p.x, y: p.y, scale: 1 } 
                            : step >= 1 
                                ? { opacity: 0.5, x: p.x * 1.5, y: p.y * 1.5, scale: 0.8 } 
                                : { opacity: 0 }
                        }
                        transition={{ duration: 0.8, type: "spring" }}
                        className="absolute z-10 flex flex-col items-center"
                    >
                        {/* The Cable Line (Visible when connected) */}
                        {isConnected && (
                            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] -z-10 pointer-events-none overflow-visible">
                                <motion.line
                                    x1="50%" y1="50%"
                                    x2={150 - p.x} // Calculate inverse direction towards center roughly
                                    y2={150 - p.y}
                                    stroke={p.color === 'blue' ? '#3b82f6' : p.color === 'green' ? '#22c55e' : '#eab308'}
                                    strokeWidth="4"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5 }}
                                    // Note: Simple SVG line for visual effect, coordinates are approximate relative to parent center
                                    // Actually, let's use a simpler CSS approach for the cable below
                                />
                            </svg>
                        )}

                        {/* Device Icon */}
                        <div className={`w-20 h-20 bg-[#1e1e24] border-2 border-${p.color}-500 rounded-xl flex items-center justify-center shadow-lg relative`}>
                            <p.icon size={32} className={`text-${p.color}-400`} />
                            
                            {/* Connection Status Light */}
                            <div className={`absolute -bottom-2 w-4 h-4 rounded-full border-2 border-[#1e1e24] ${isConnected ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500'}`} />
                        </div>
                        <div className={`mt-2 font-bold text-${p.color}-300 text-sm bg-black/50 px-2 rounded`}>
                            {p.label}
                        </div>

                        {/* Cable Visualization (Simplified) */}
                        {isConnected && (
                             <motion.div 
                                className={`absolute top-full left-1/2 w-1 h-[60px] bg-${p.color}-500/50 origin-top`}
                                style={{ 
                                    height: Math.sqrt(p.x*p.x + p.y*p.y) - 40, // Distance to center minus half box size
                                    transform: `rotate(${Math.atan2(-p.y, -p.x) * 180 / Math.PI - 90}deg)`
                                }}
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                             />
                        )}
                    </motion.div>
                );
            })}
        </div>

        {/* Footer Text */}
        {step >= 3 && (
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-8 bg-purple-900/30 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm max-w-3xl flex items-center justify-center gap-8"
            >
                <div className="flex items-center gap-3">
                    <Server size={32} className="text-purple-300" />
                    <div className="text-left">
                        <div className="text-purple-200 font-bold text-lg">统一规范</div>
                        <div className="text-gray-400 text-sm">Unified Spec</div>
                    </div>
                </div>
                <div className="w-px h-10 bg-purple-500/30" />
                <div className="flex items-center gap-3">
                     <CheckCircle size={32} className="text-green-300" />
                     <div className="text-left">
                        <div className="text-green-200 font-bold text-lg">标准化交互</div>
                        <div className="text-gray-400 text-sm">Standardized</div>
                    </div>
                </div>
            </motion.div>
        )}

    </div>
  );
};