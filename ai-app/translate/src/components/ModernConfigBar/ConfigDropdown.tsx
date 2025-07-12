/**
 * 配置下拉组件
 * 处理各种配置选项的下拉界面
 */
import React, { useRef, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { userConfigAtom } from '../../store/atoms';
import { ApiKeyConfig } from './ApiKeyConfig';
import { LanguageConfig } from './LanguageConfig';
import { StrategyModal } from './StrategyModal';

interface ConfigDropdownProps {
  type: 'apikey' | 'language' | 'strategy';
  icon: React.ReactNode;
  label: string;
  status?: 'success' | 'warning' | 'error';
  active: boolean;
  onToggle: () => void;
  fullWidth?: boolean;
}

export const ConfigDropdown: React.FC<ConfigDropdownProps> = ({
  type,
  icon,
  label,
  status,
  active,
  onToggle,
  fullWidth = false
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (active) {
          onToggle();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [active, onToggle]);

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleClick = () => {
    if (type === 'strategy') {
      // 策略类型直接打开弹框
      setIsStrategyModalOpen(true);
    } else {
      // 其他类型使用下拉框
      onToggle();
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'apikey': return <ApiKeyConfig onClose={() => onToggle()} />;
      case 'language': return <LanguageConfig onClose={() => onToggle()} />;
      default: return null;
    }
  };

  return (
    <div className={`relative ${fullWidth ? 'w-full' : ''}`} ref={dropdownRef}>
      <button
        onClick={handleClick}
        className={`
          flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all
          ${fullWidth ? 'w-full justify-start' : ''}
          ${active 
            ? 'bg-blue-50 border-blue-200 text-blue-700' 
            : `hover:bg-gray-50 ${getStatusColor()}`
          }
        `}
      >
        {icon}
        <span className="text-sm font-medium truncate">{label}</span>
        {status && (
          <div className={`w-2 h-2 rounded-full ml-auto ${
            status === 'success' ? 'bg-green-500' :
            status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
          }`} />
        )}
      </button>

      {/* 非策略类型的下拉内容 */}
      {active && type !== 'strategy' && (
        <div className={`
          absolute top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50
          ${fullWidth ? 'left-0 right-0' : 'left-0 w-80'}
        `}>
          {renderContent()}
        </div>
      )}

      {/* 策略选择模态框 */}
      {type === 'strategy' && (
        <StrategyModal
          isOpen={isStrategyModalOpen}
          onClose={() => setIsStrategyModalOpen(false)}
        />
      )}
    </div>
  );
};