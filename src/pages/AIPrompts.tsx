/**
 * AI 提示词页面组件
 * 通过 iframe 嵌入 AI 提示词网站，支持 URL 参数同步
 */

import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AIPrompts: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeSrc, setIframeSrc] = useState(() => {
    // 初始化时从 URL 参数构建 iframe src
    const params = new URLSearchParams(location.search);
    const baseSrc =
      "https://traepromptblx7-bhhmtap32-conardlis-projects.vercel.app/";

    console.log("初始化 - location.search:", location.search);
    console.log("初始化 - params.toString():", params.toString());

    // 如果有参数，构建完整的 URL
    if (params.toString()) {
      const fullSrc = `${baseSrc}?${params.toString()}`;
      console.log("初始化 - iframe src:", fullSrc);
      return fullSrc;
    }
    console.log("初始化 - 无参数，使用基础 src:", baseSrc);
    return baseSrc;
  });

  // 监听主页面 URL 参数变化，同步到 iframe
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const baseSrc =
      "https://traepromptblx7-bhhmtap32-conardlis-projects.vercel.app/";

    console.log("useEffect - location.search:", location.search);
    console.log("useEffect - params.toString():", params.toString());

    const newSrc = params.toString()
      ? `${baseSrc}?${params.toString()}`
      : baseSrc;

    console.log("useEffect - newSrc:", newSrc);
    console.log("useEffect - current iframeSrc:", iframeSrc);

    if (newSrc !== iframeSrc) {
      console.log("更新 iframe src 从", iframeSrc, "到", newSrc);
      setIframeSrc(newSrc);
    }
  }, [location.search, iframeSrc]);

  // 监听 iframe 内部 URL 变化
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // 确保消息来自我们的 iframe 域
      if (
        event.origin !==
        "https://traepromptblx7-ncd3ns4as-conardlis-projects.vercel.app"
      ) {
        return;
      }

      // 处理 URL 变化消息
      if (event.data && event.data.type === "urlChange") {
        const iframeUrl = new URL(event.data.url);
        const iframeParams = iframeUrl.searchParams;

        // 更新主页面的 URL 参数
        const currentParams = new URLSearchParams(location.search);
        let hasChanges = false;

        // 比较参数是否有变化
        const iframeParamsString = iframeParams.toString();
        const currentParamsString = currentParams.toString();

        if (iframeParamsString !== currentParamsString) {
          hasChanges = true;
        }

        if (hasChanges) {
          // 使用 replace 避免在浏览器历史中创建过多条目
          const newSearch = iframeParamsString ? `?${iframeParamsString}` : "";
          navigate(`${location.pathname}${newSearch}`, { replace: true });
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [location, navigate]);

  // iframe 加载完成后，注入监听脚本
  const handleIframeLoad = () => {
    if (iframeRef.current?.contentWindow) {
      try {
        // 向 iframe 发送初始化消息，请求开始监听 URL 变化
        iframeRef.current.contentWindow.postMessage(
          {
            type: "initUrlSync",
            parentOrigin: window.location.origin,
          },
          "https://traepromptblx7-ncd3ns4as-conardlis-projects.vercel.app"
        );
      } catch (error) {
        console.log("无法与 iframe 通信，可能是跨域限制");
      }
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* iframe 全屏容器 */}
      <div className="flex-1">
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          className="w-full h-full border-0"
          title="AI 提示词"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          onLoad={handleIframeLoad}
        />
      </div>
    </div>
  );
};

export default AIPrompts;
