import React from 'react';
import { X, BookOpen, Cpu, Network, Zap, AlertTriangle, Layers } from 'lucide-react';
import { MOE_CARD_CONTENT } from '../constants';

interface KnowledgeCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const icons = [BookOpen, Network, Cpu, Zap, AlertTriangle, Layers];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-400" />
            {MOE_CARD_CONTENT.title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid gap-6">
            {MOE_CARD_CONTENT.sections.map((section, index) => {
              const Icon = icons[index % icons.length];
              return (
                <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                  <h3 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {section.heading}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-slate-800/50 text-center">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-full transition-colors"
          >
            我明白了
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCard;