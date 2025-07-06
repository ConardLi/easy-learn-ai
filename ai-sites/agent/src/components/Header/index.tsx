/**
 * 网站导航头部组件
 * 提供页面导航功能，包含平滑滚动到各个学习模块
 */
import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import { Brain, Zap, BookOpen } from 'lucide-react';
import KnowledgeCard from '../KnowledgeCard';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [showKnowledgeCard, setShowKnowledgeCard] = useState(false);

  const navItems = [
    { key: 'hero', label: '概念介绍' },
    { key: 'comparison', label: 'AI对比' },
    { key: 'capabilities', label: '核心能力' },
    { key: 'types', label: 'Agent类型' },
    { key: 'architecture', label: '系统架构' }
  ];

  return (
    <>
      <Navbar className="bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-md border-b border-gray-200" isBordered>
        <NavbarBrand>
          <div className="flex items-center gap-2">
            <Brain className="text-blue-600" size={28} />
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Agent 学习中心
            </span>
          </div>
        </NavbarBrand>
        
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {navItems.map((item) => (
            <NavbarItem key={item.key}>
              <Button
                variant="light"
                onPress={() => onNavigate(item.key)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Button>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              variant="bordered"
              startContent={<BookOpen size={16} />}
              onPress={() => setShowKnowledgeCard(true)}
              className="text-purple-600 border-purple-200 hover:bg-purple-50 mr-2"
            >
              知识卡片
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button 
              color="primary" 
              variant="shadow"
              startContent={<Zap size={16} />}
              className="bg-gradient-to-r from-blue-500 to-purple-500"
            >
              开始学习
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <KnowledgeCard 
        isOpen={showKnowledgeCard}
        onClose={() => setShowKnowledgeCard(false)}
      />
    </>
  );
}