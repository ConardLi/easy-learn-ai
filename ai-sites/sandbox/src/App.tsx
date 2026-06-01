/**
 * Agent 沙箱 · 一份手册（单页向下滚）
 *
 * 8 节循序渐进：
 *   01 Hero              Agent 沙箱 = 给 AI Agent 划的一块安全围栏
 *   02 ApprovalFatigue   一条 slider 摸到审批疲劳，引出为什么权限弹窗扛不住
 *   03 TwoLines          文件 + 网络两条隔离线，缺一条就有漏洞（勾选组合 → 演示漏洞）
 *   04 Filesystem        文件系统隔离的判定树（trace + OS 强制的洞察）
 *   05 Network           让你当 Agent 发请求，代理拦不拦（任务模拟器）
 *   06 OSImpl            macOS Seatbelt / Linux bwrap / WSL2 三套实现（pill 切换）
 *   07 Levels            Docker / bwrap / gVisor / Firecracker 四级隔离对比（横向 SVG）
 *   08 Pitfalls          5 个常见坑（accordion）+ 一条硬规则收尾
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionApprovalFatigue from "./components/SectionApprovalFatigue";
import SectionTwoLines from "./components/SectionTwoLines";
import SectionFilesystem from "./components/SectionFilesystem";
import SectionNetwork from "./components/SectionNetwork";
import SectionOSImpl from "./components/SectionOSImpl";
import SectionLevels from "./components/SectionLevels";
import SectionPitfalls from "./components/SectionPitfalls";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionApprovalFatigue />
      <SectionTwoLines />
      <SectionFilesystem />
      <SectionNetwork />
      <SectionOSImpl />
      <SectionLevels />
      <SectionPitfalls />
    </div>
  );
};

export default App;
