/**
 * WorkFilter · "作品索引"快速跳转下拉
 *
 * 设计：抄日报 TagFilter 的 portal 下拉结构，但语义不同：
 *   ─ 不是"筛选 grid"，而是"导航到作品"
 *   ─ 单击作品名 → 滚动到对应卡 + 短暂 coral 高亮闪烁
 *   ─ 内置搜索框，作品多时可快速定位
 *
 * 解决的问题：作品卡很大、单屏看不完，用户没法 get 到一共有哪些作品。
 * 这个下拉就是给用户一个"全局速览"+"快速跳转"的入口。
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ListChecks, Search } from "lucide-react";
import { AIApplicationItem } from "../../types";

interface WorkFilterProps {
  works: AIApplicationItem[];
  /** 给每件作品的稳定 № 编号映射（按 data 原顺序） */
  numberMap: Map<string, number>;
  /** 触发跳转。父层负责 scroll + highlight 逻辑 */
  onJump: (id: string) => void;
}

export const WorkFilter: React.FC<WorkFilterProps> = ({
  works,
  numberMap,
  onJump,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredWorks = useMemo(() => {
    if (!searchTerm) return works;
    const q = searchTerm.toLowerCase();
    return works.filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        (w.tags || []).some((t) => t.toLowerCase().includes(q)),
    );
  }, [works, searchTerm]);

  /** 计算面板坐标 —— 注意：position:fixed 时 top 不能加 scrollY */
  const updatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const panelWidth = 340;
    const left = Math.max(
      8,
      Math.min(rect.right - panelWidth, window.innerWidth - panelWidth - 8),
    );
    setPos({ top: rect.bottom + 10, left });
  };

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      )
        return;
      setIsOpen(false);
      setSearchTerm("");
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setTimeout(() => searchInputRef.current?.focus(), 60);
  }, [isOpen]);

  if (works.length === 0) return null;

  const handleToggle = () => {
    if (!isOpen) {
      updatePosition();
      setSearchTerm("");
    }
    setIsOpen(!isOpen);
  };

  const handlePick = (id: string) => {
    setIsOpen(false);
    setSearchTerm("");
    onJump(id);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="inline-flex items-center gap-2 pl-4 pr-3 py-2 rounded-full border-2 border-ink bg-white text-ink shadow-[2px_2px_0_0_#241C15] font-sans font-bold text-[13px] transition-all duration-250 ease-spring hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:4px_4px_0_0_#241C15]"
      >
        <ListChecks className="w-4 h-4" strokeWidth={2.5} />
        <span>作品索引</span>
        <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-cream text-ink-secondary rounded-full font-mono font-bold text-[10px] tabular-nums">
          {works.length}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={2.5}
        />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={panelRef}
            className="fixed bg-white border-2 border-ink rounded-2xl shadow-stamp-xl overflow-hidden w-[340px] flex flex-col"
            style={{
              top: pos.top,
              left: pos.left,
              zIndex: 999999,
              maxHeight: "min(480px, calc(100vh - 100px))",
            }}
          >
            {/* 头部 cream 底 + 搜索 */}
            <div className="px-4 py-3 border-b-2 border-ink/10 bg-cream">
              <div className="flex items-center justify-between mb-2.5">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/65">
                  § 跳到作品
                </div>
                <span className="font-mono text-[10px] text-ink/45 tabular-nums">
                  {filteredWorks.length} / {works.length}
                </span>
              </div>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-ink/55"
                  strokeWidth={2.5}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="搜索作品名 / 描述 / 分类…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border-2 border-ink/15 rounded-full font-sans text-[13px] text-ink placeholder:text-ink/40 outline-none focus:border-ink transition-colors"
                />
              </div>
            </div>

            {/* 作品列表 */}
            <div className="flex-1 overflow-y-auto py-2">
              {filteredWorks.length === 0 ? (
                <div className="px-4 py-8 text-center font-sans text-[13px] text-ink/55">
                  没匹配到作品
                </div>
              ) : (
                filteredWorks.map((work) => {
                  const num = numberMap.get(work.id);
                  return (
                    <button
                      key={work.id}
                      onClick={() => handlePick(work.id)}
                      className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors hover:bg-cream"
                    >
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 bg-cream border border-ink/15 rounded-md font-mono font-bold text-[11px] text-ink-secondary group-hover:bg-butter group-hover:border-ink group-hover:text-ink transition-colors tabular-nums">
                        {num != null ? `№${String(num).padStart(2, "0")}` : "—"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-extrabold text-[14px] text-ink truncate group-hover:text-coral transition-colors">
                          {work.title}
                        </div>
                        <div className="font-mono text-[10px] text-ink/45 mt-0.5 truncate">
                          {work.category}
                          {work.tags && work.tags.length > 0 && (
                            <>
                              {" · "}
                              {work.tags.slice(0, 3).join(" · ")}
                            </>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            <div className="px-4 py-2.5 border-t-2 border-ink/10 bg-cream font-mono text-[10px] text-ink/55 text-center">
              点击作品名 → 滚动到该卡
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
