/**
 * iframe 同步 hook
 * 处理路由变化时的父页面同步逻辑
 */

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { iframeSyncManager } from '../utils/iframeSync';

export const useIframeSync = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isInIframe = iframeSyncManager.getIsInIframe();

  // 监听路由变化，同步到父页面
  useEffect(() => {
    if (!isInIframe) return;

    const currentPath = location.pathname + location.search + location.hash;
    const { route, params } = iframeSyncManager.parsePathParams(currentPath);
    
    // 向父页面同步当前路由
    iframeSyncManager.syncRouteToParent(currentPath, params);
  }, [location, isInIframe]);

  // 初始化时从父页面获取路由参数
  useEffect(() => {
    if (!isInIframe) return;

    const initializeFromParent = async () => {
      try {
        const initialPath = await iframeSyncManager.requestInitialRoute();
        if (initialPath && initialPath !== location.pathname + location.search + location.hash) {
          // 解析并导航到初始路径
          const cleanPath = initialPath.replace(/^#/, ''); // 移除可能的 hash 前缀
          navigate(cleanPath, { replace: true });
        }
      } catch (error) {
        console.warn('初始化路由失败:', error);
      }
    };

    // 延迟初始化，确保组件完全挂载
    const timer = setTimeout(initializeFromParent, 100);
    return () => clearTimeout(timer);
  }, [navigate, location, isInIframe]);

  return {
    isInIframe,
    syncToParent: (path: string, params?: Record<string, string>) => {
      iframeSyncManager.syncRouteToParent(path, params);
    }
  };
};
