/**
 * Header · Mailchimp-Freddie 风
 * 顶部黄色 metadata 细条 + 白底导航 + stamp 风按钮
 */

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Youtube, MessageCircle } from "lucide-react";
import { NavigationItem, SocialLink } from "../types";

const navigationItems: NavigationItem[] = [
  { name: "知视", path: "/ai-knowledge" },
  { name: "应用", path: "/ai-application" },
  { name: "模型", path: "/ai-model" },
  { name: "评估", path: "/ai-benchmark" },
  { name: "日报", path: "/ai-daily" },
  { name: "教程", path: "/ai-tutorial" },
  { name: "星球", path: "/knowledge-planet" },
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Github":
        return <Github className="w-[18px] h-[18px]" strokeWidth={2} />;
      case "Youtube":
        return <Youtube className="w-[18px] h-[18px]" strokeWidth={2} />;
      case "MessageCircle":
        return (
          <MessageCircle className="w-[18px] h-[18px]" strokeWidth={2} />
        );
      default:
        return null;
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-all duration-400 ease-editorial ${
        scrolled
          ? "border-b-2 border-ink shadow-soft"
          : "border-b-2 border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="relative w-10 h-10 flex items-center justify-center bg-butter border-2 border-ink rounded-2xl shadow-stamp transition-transform duration-250 ease-spring group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:[box-shadow:6px_6px_0_0_#241C15]">
              <span className="font-sans font-extrabold text-[18px] text-ink leading-none">
                E
              </span>
            </div>
            <span className="font-sans font-extrabold text-[22px] text-ink tracking-tight">
              Easy AI
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-2 rounded-full font-sans font-semibold text-[14px] transition-all duration-250 ease-spring ${
                    active
                      ? "bg-ink text-white"
                      : "text-ink hover:bg-butter"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <div key={link.name} className="relative">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full text-ink hover:bg-butter transition-colors duration-250 ease-spring"
                  onMouseEnter={() =>
                    link.name === "微信" && setShowWeChatQR(true)
                  }
                  onMouseLeave={() =>
                    link.name === "微信" && setShowWeChatQR(false)
                  }
                  onClick={(e) => link.name === "微信" && e.preventDefault()}
                  aria-label={link.name}
                >
                  {getIcon(link.icon)}
                </a>

                {link.name === "微信" && showWeChatQR && (
                  <div className="absolute top-full right-0 mt-3 bg-white border-2 border-ink rounded-2xl shadow-stamp-lg z-50 min-w-max">
                    <div className="flex flex-col items-center p-4">
                      <img
                        src="/imgs/gzh.jpg"
                        alt="微信公众号二维码"
                        className="w-40 h-40 object-cover rounded-xl"
                      />
                      <p className="font-sans text-[12px] font-semibold text-ink mt-3 text-center whitespace-nowrap">
                        扫码关注公众号 →
                      </p>
                    </div>
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
