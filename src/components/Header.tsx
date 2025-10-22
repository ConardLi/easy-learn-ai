/**
 * 网站顶部导航栏组件
 * 包含项目logo、导航菜单和社交媒体链接
 */

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Youtube, MessageCircle, Sparkles } from "lucide-react";
import { NavigationItem, SocialLink } from "../types";

const navigationItems: NavigationItem[] = [
  { name: "首页", path: "/" },
  { name: "AI 知视", path: "/ai-knowledge" },
  { name: "AI 应用", path: "/ai-application" },
  { name: "AI 发展", path: "/ai-timeline" },
  { name: "AI 日报", path: "/ai-daily" },
  { name: "AI 教程", path: "/ai-tutorial" },
  { name: "AI 导航", path: "/ai-navigation" },
  { name: "AI 提示词", path: "/ai-prompts" },
  { name: "知识星球", path: "/knowledge-planet" },
];

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: "Github",
    url: "https://github.com/ConardLi/easy-learn-ai",
  },
  { name: "B站", icon: "Youtube", url: "https://space.bilibili.com/474921808" },
  { name: "微信", icon: "MessageCircle", url: "#" },
];

const Header: React.FC = () => {
  const location = useLocation();
  const [showWeChatQR, setShowWeChatQR] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Github":
        return <Github className="w-5 h-5" />;
      case "Youtube":
        return <Youtube className="w-5 h-5" />;
      case "MessageCircle":
        return <MessageCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <img src="/imgs/icon.png" alt="Easy AI" className="w-10 h-10" />
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
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <div key={link.name} className="relative">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
                  onMouseEnter={() =>
                    link.name === "微信" && setShowWeChatQR(true)
                  }
                  onMouseLeave={() =>
                    link.name === "微信" && setShowWeChatQR(false)
                  }
                  onClick={(e) => link.name === "微信" && e.preventDefault()}
                >
                  {getIcon(link.icon)}
                </a>

                {/* 微信二维码悬浮显示 */}
                {link.name === "微信" && showWeChatQR && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-max">
                    <div className="flex flex-col items-center p-4">
                      <img
                        src="/imgs/gzh.jpg"
                        alt="微信公众号二维码"
                        className="w-40 h-40 object-cover rounded-lg shadow-sm"
                      />
                      <p className="text-sm text-gray-600 mt-3 text-center whitespace-nowrap">
                        扫码关注微信公众号
                      </p>
                    </div>
                    {/* 小箭头 */}
                    <div className="absolute -top-1 right-6 w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
