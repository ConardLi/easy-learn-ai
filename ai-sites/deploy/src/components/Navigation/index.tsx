/**
 * 导航组件
 * 提供网站的主要导航功能，包含所有页面的链接
 * 采用响应式设计，支持移动端显示
 */
import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from '@nextui-org/react';
import { useLocation } from 'react-router-dom';
import { Cpu, Zap } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: '首页', path: '/' },
    { name: 'Ollama', path: '/ollama' },
    { name: 'VLLM', path: '/vllm' },
    { name: '对比分析', path: '/comparison' },
    { name: '选择建议', path: '/recommendation' },
  ];

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white/80 backdrop-blur-md border-b border-gray-200/50"
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Cpu className="h-6 w-6 text-blue-600" />
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI 本地部署指南
            </span>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.path} isActive={location.pathname === item.path}>
            <Link
              href={`#${item.path}`}
              className={`${
                location.pathname === item.path
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors`}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.path}>
            <Link
              href={`#${item.path}`}
              className={`w-full ${
                location.pathname === item.path
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600'
              }`}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Navigation;
