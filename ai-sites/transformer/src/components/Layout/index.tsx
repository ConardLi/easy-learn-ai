/**
 * 布局组件
 * 提供全局导航和页面结构
 */
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Brain, 
  Target, 
  Zap, 
  TrendingUp, 
  Play,
  Home,
  Menu
} from 'lucide-react';
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button
} from '@nextui-org/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/introduction', label: 'Transformer 诞生', icon: BookOpen },
    { path: '/prediction', label: '预测机制', icon: Target },
    { path: '/components', label: '核心组件', icon: Brain },
    { path: '/advantages', label: '优缺点', icon: Zap },
    { path: '/to-llm', label: '到大语言模型', icon: TrendingUp },
    { path: '/demo', label: '交互演示', icon: Play },
  ];

  return (
    <div className="min-h-screen">
      <Navbar 
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="bg-white/80 backdrop-blur-lg border-b border-gray-200"
        maxWidth="xl"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Transformer 学习平台
              </span>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {navItems.slice(1).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavbarItem key={item.path}>
                <Link to={item.path}>
                  <Button
                    variant={isActive ? "flat" : "light"}
                    color={isActive ? "primary" : "default"}
                    startContent={<Icon className="w-4 h-4" />}
                    className="transition-all duration-200"
                  >
                    {item.label}
                  </Button>
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        <NavbarMenu>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavbarMenuItem key={item.path}>
                <Link
                  to={item.path}
                  className="w-full flex items-center space-x-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </NavbarMenuItem>
            );
          })}
        </NavbarMenu>
      </Navbar>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 max-w-6xl"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
