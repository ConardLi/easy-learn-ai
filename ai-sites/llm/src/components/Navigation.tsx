/**
 * 顶部导航 · Mailchimp-Freddie 风
 *
 * 设计要点：
 *   ─ butter "L" stamp logo（与主站 "E" logo 同款语言）
 *   ─ ink 文字 + butter active 下划线（不再用蓝紫渐变）
 *   ─ 桌面端 hover 时下方出现 butter 横条；移动端用 stamp 菜单卡
 *   ─ 56-64px 高度，与主站 chrome 互补不冲突
 */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { path: "/", label: "首页" },
  { path: "/definition", label: "定义" },
  { path: "/abilities", label: "核心能力" },
  { path: "/features", label: "特点" },
  { path: "/timeline", label: "发展历程" },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  /* 路由切换关闭移动菜单 */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 bg-butter border-2 border-ink rounded-lg shadow-[2px_2px_0_0_#241C15] transition-transform duration-250 ease-spring group-hover:-translate-y-[1px] group-hover:-translate-x-[1px]">
              <span className="font-sans font-extrabold text-[18px] text-ink leading-none">
                L
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-[15px] text-ink">
                LLM 学习手册
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 mt-0.5">
                Large Language Models
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group relative px-3 py-2 font-sans font-semibold text-[13px] text-ink/70 hover:text-ink transition-colors"
                >
                  <span className={isActive ? "text-ink" : ""}>
                    {item.label}
                  </span>
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-[3px] bg-butter rounded-full transition-transform duration-300 ease-spring origin-center ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "关闭菜单" : "打开菜单"}
            className="md:hidden flex items-center justify-center w-9 h-9 bg-white border-2 border-ink rounded-lg shadow-[2px_2px_0_0_#241C15] transition-all duration-200 ease-spring hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:3px_3px_0_0_#241C15] hover:bg-butter"
          >
            {isOpen ? (
              <X className="w-4 h-4 text-ink" strokeWidth={2.5} />
            ) : (
              <Menu className="w-4 h-4 text-ink" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav drawer */}
      {isOpen && (
        <div className="md:hidden border-t-2 border-ink bg-cream animate-enter-fade">
          <div className="px-4 py-3 space-y-1.5">
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 border-ink font-sans font-semibold text-[14px] transition-all duration-200 ease-spring ${
                    isActive
                      ? "bg-butter text-ink shadow-[2px_2px_0_0_#241C15]"
                      : "bg-white text-ink hover:bg-butter/40"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-ink animate-pulse-dot" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
