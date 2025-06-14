/**
 * 导航组件，提供网站各部分的链接
 * 包含主页和三种微调方法的专题页面导航
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBrain, FaHome, FaChartBar } from 'react-icons/fa';

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <motion.div 
            className="flex items-center gap-2 text-xl font-bold text-indigo-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaBrain className="text-2xl" />
            <span>微调方法演示</span>
          </motion.div>
          
          <ul className="flex space-x-1 md:space-x-6">
            <NavItem to="/" icon={<FaHome />} label="首页" />
            <NavItem to="/enhanced-visualization" icon={<FaChartBar />} label="增强可视化" />
            <NavItem to="/full-parameter" label="全参数微调" />
            <NavItem to="/freeze" label="参数冻结" />
            <NavItem to="/lora" label="LoRA" />
          </ul>
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon }) => {
  return (
    <li>
      <NavLink 
        to={to} 
        className={({ isActive }) => 
          `flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
            isActive 
              ? 'bg-indigo-100 text-indigo-700 font-medium'
              : 'text-gray-600 hover:bg-gray-100'
          }`
        }
      >
        {icon && <span className="mr-1">{icon}</span>}
        <span>{label}</span>
      </NavLink>
    </li>
  );
};