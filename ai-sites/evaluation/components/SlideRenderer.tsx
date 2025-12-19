import React from 'react';
import { motion, Variants } from 'framer-motion';
import { SlideData, SlideType } from '../types';
import { CheckCircle2, AlertCircle, Scale, ArrowRight } from 'lucide-react';

interface SlideRendererProps {
  data: SlideData;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      staggerChildren: 0.15 
    } 
  },
  exit: { opacity: 0, x: -50, transition: { duration: 0.4 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const SlideRenderer: React.FC<SlideRendererProps> = ({ data }) => {
  
  const renderContent = () => {
    switch (data.type) {
      case SlideType.TITLE:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 blur-2xl absolute opacity-30 animate-pulse"
            />
            <motion.h1 
              className="text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200 relative z-10 cursor-default"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, textShadow: "0 0 30px rgba(255,255,255,0.3)" }}
            >
              {data.title}
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl text-gray-400 font-light"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {data.subtitle}
            </motion.p>
          </div>
        );

      case SlideType.CONTENT_TEXT:
        return (
          <div className="flex flex-col h-full justify-center max-w-5xl mx-auto">
            <motion.div variants={itemVariants} className="mb-8">
               <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{data.title}</h2>
               {data.subtitle && <h3 className="text-2xl text-blue-400">{data.subtitle}</h3>}
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
              {data.content}
            </motion.div>
          </div>
        );

      case SlideType.GRID_CARDS:
        return (
          <div className="flex flex-col h-full justify-center">
             <div className="mb-8 text-center md:text-left">
                <h2 className="text-4xl font-bold mb-2">{data.title}</h2>
                <p className="text-xl text-gray-400">{data.subtitle}</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {data.items?.map((item, idx) => (
                 <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 cursor-pointer transition-colors group hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:bg-gray-800"
                 >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-white/5 rounded-lg group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">{item.description}</p>
                      </div>
                    </div>
                 </motion.div>
               ))}
             </div>
          </div>
        );

      case SlideType.LIST_FEATURES:
        return (
          <div className="flex flex-col h-full justify-center items-center">
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-bold mb-2">{data.title}</h2>
                <p className="text-xl text-gray-400">{data.subtitle}</p>
            </div>
            <div className="w-full max-w-4xl space-y-4">
              {data.items?.map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 10, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  className="flex items-center p-4 bg-white/5 rounded-lg border-l-4 border-transparent hover:border-purple-500 cursor-pointer shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  <div className="mr-6 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  </div>
                  <div className="text-gray-400 text-right text-sm md:text-base">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case SlideType.COMPARISON:
        return (
          <div className="flex flex-col h-full justify-center">
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold mb-2">{data.title}</h2>
                <p className="text-xl text-gray-400">{data.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.items?.map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative p-6 rounded-2xl bg-gray-900 border border-gray-700 flex flex-col items-center text-center group transition-colors hover:border-gray-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:bg-gray-800 cursor-default"
                >
                  <div className="absolute top-0 right-0 m-4 px-2 py-1 bg-white/10 rounded text-xs font-mono text-gray-300 uppercase tracking-wider group-hover:bg-white/20 transition-colors">
                    {item.badge}
                  </div>
                  <div className="transform group-hover:scale-110 transition-transform duration-300 mb-2">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 flex-grow">{item.content}</p>
                  
                  <div className="w-full text-left space-y-2 text-xs">
                    <div className="text-green-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={12}/> 优势
                    </div>
                    <ul className="list-disc list-inside text-gray-500 pl-1 mb-2 group-hover:text-gray-400">
                      {item.pros.map((p: string, i: number) => <li key={i}>{p}</li>)}
                    </ul>
                    <div className="text-red-400 font-semibold flex items-center gap-1">
                      <AlertCircle size={12}/> 劣势
                    </div>
                    <ul className="list-disc list-inside text-gray-500 pl-1 group-hover:text-gray-400">
                      {item.cons.map((c: string, i: number) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case SlideType.PROCESS:
        return (
          <div className="flex flex-col h-full justify-center">
             <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold mb-2">{data.title}</h2>
                <p className="text-xl text-gray-400">{data.subtitle}</p>
             </div>
             
             <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-800 -translate-y-1/2 z-0"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                   {data.items?.map((item, idx) => (
                     <motion.div
                        key={idx}
                        variants={itemVariants}
                        className="flex flex-col items-center text-center group"
                        whileHover={{ scale: 1.05 }}
                     >
                        <div className={`w-20 h-20 rounded-2xl ${item.color} flex items-center justify-center shadow-lg shadow-${item.color}/20 mb-6 relative transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_currentColor] group-hover:rotate-3`}>
                          <div className="absolute -top-3 -right-3 w-8 h-8 bg-white text-black font-bold rounded-full flex items-center justify-center text-sm shadow-sm">
                             {item.step}
                          </div>
                          {item.icon}
                        </div>
                        
                        <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-white/10 w-full transition-all duration-300 group-hover:border-white/30 group-hover:bg-gray-800 group-hover:shadow-2xl">
                           <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                           <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                        </div>

                        {idx < (data.items?.length || 0) - 1 && (
                          <div className="md:hidden mt-4 text-gray-600">
                             <ArrowRight size={24} className="rotate-90" />
                          </div>
                        )}
                     </motion.div>
                   ))}
                </div>
             </div>
          </div>
        );

      case SlideType.CONCLUSION:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <motion.div 
               initial={{ scale: 0, rotate: -180 }}
               animate={{ scale: 1, rotate: 0 }}
               transition={{ duration: 1, type: "spring" }}
               whileHover={{ scale: 1.2, rotate: 15 }}
               className="mb-8"
            >
              <Scale className="w-24 h-24 text-blue-500" />
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              {data.title}
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-2xl text-gray-400 max-w-2xl"
            >
              {data.subtitle}
            </motion.p>
          </div>
        );

      default:
        return <div>Unknown Slide Type</div>;
    }
  };

  return (
    <motion.div
      key={data.id}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full h-full max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col relative z-10"
    >
      {renderContent()}
    </motion.div>
  );
};