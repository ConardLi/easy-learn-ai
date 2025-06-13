/**
 * 网站顶部导航栏组件
 * 包含项目logo、导航菜单和社交媒体链接
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Youtube, MessageCircle, Sparkles } from 'lucide-react';
import { NavigationItem, SocialLink } from '../types';

const navigationItems: NavigationItem[] = [
  { name: '首页', path: '/' },
  { name: 'AI 知视', path: '/ai-knowledge' },
  { name: 'AI 日报', path: '/ai-daily' },
  { name: 'AI 教程', path: '/ai-tutorial' },
  { name: 'AI 导航', path: '/ai-navigation' },
  { name: '知识星球', path: '/knowledge-planet' }
];

const socialLinks: SocialLink[] = [
  { name: 'GitHub', icon: 'Github', url: 'https://github.com' },
  { name: 'B站', icon: 'Youtube', url: 'https://bilibili.com' },
  { name: '微信', icon: 'MessageCircle', url: '#' }
];

const Header: React.FC = () => {
  const location = useLocation();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github': return <Github className="w-5 h-5" />;
      case 'Youtube': return <Youtube className="w-5 h-5" />;
      case 'MessageCircle': return <MessageCircle className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Easy AI
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
              >
                {getIcon(link.icon)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
