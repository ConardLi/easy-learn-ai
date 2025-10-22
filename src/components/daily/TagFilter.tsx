/**
 * 标签筛选组件
 * 支持搜索、多选、美观的下拉框设计
 */
import React, { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { Tag, ChevronDown, X, Search, Check } from "lucide-react";

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearTags: () => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({
  allTags,
  selectedTags,
  onTagToggle,
  onClearTags,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [buttonPosition, setButtonPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 过滤标签
  const filteredTags = useMemo(() => {
    if (!searchTerm) return allTags;
    return allTags.filter((tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allTags, searchTerm]);

  // 计算按钮位置
  const updateButtonPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: rect.bottom + window.scrollY + 8, // 8px gap
        left: rect.right - 300, // 右对齐，300px是下拉框宽度
        width: rect.width,
      });
    }
  };

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 打开下拉框时聚焦搜索框
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // 监听窗口大小变化，重新计算位置
  useEffect(() => {
    if (isOpen) {
      const handleResize = () => updateButtonPosition();
      const handleScroll = () => updateButtonPosition();

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isOpen]);

  if (allTags.length === 0) {
    return null;
  }

  const handleToggle = () => {
    if (!isOpen) {
      updateButtonPosition();
      setSearchTerm("");
    }
    setIsOpen(!isOpen);
  };

  const handleTagSelect = (tag: string) => {
    onTagToggle(tag);
    // 不关闭下拉框，允许继续选择
  };

  const displayText =
    selectedTags.length === 0
      ? "选择标签"
      : selectedTags.length === 1
      ? selectedTags[0]
      : `已选 ${selectedTags.length} 个标签`;

  return (
    <div className="relative" ref={dropdownRef} style={{ zIndex: 1000 }}>
      {/* 触发按钮 */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 min-w-[140px] justify-center ${
          selectedTags.length > 0
            ? "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            : ""
        }`}
      >
        <Tag className="w-4 h-4" />
        <span className="text-sm font-medium">
          {selectedTags.length === 0
            ? "选择标签"
            : `已选 ${selectedTags.length} 个`}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* 下拉框 - 使用Portal */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="bg-white border border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-hidden w-[300px]"
            style={{
              position: "fixed",
              top: buttonPosition.top,
              left: buttonPosition.left,
              zIndex: 999999,
            }}
          >
            {/* 搜索框 */}
            <div className="p-4 border-b border-gray-200/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="搜索标签..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* 标签列表 */}
            <div className="max-h-48 overflow-y-auto">
              {filteredTags.length === 0 ? (
                <div className="p-6 text-center text-gray-500 text-sm">
                  {searchTerm ? "未找到匹配的标签" : "暂无标签"}
                </div>
              ) : (
                <div className="p-2">
                  {filteredTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => handleTagSelect(tag)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          isSelected
                            ? "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 hover:from-indigo-200 hover:to-purple-200 shadow-sm"
                            : "hover:bg-gray-50 text-gray-700 hover:shadow-sm"
                        }`}
                      >
                        <span className="text-sm font-medium">{tag}</span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-indigo-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 底部操作栏 */}
            <div className="p-4 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-gray-100/50 flex items-center justify-between">
              <span className="text-xs text-gray-600 font-medium">
                {filteredTags.length} 个标签可选
              </span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearchTerm("");
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
              >
                完成
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
