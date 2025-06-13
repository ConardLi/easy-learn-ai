/**
 * iframe 与父页面的通信工具
 * 负责同步路由状态到父页面 URL，实现跨框架的分享功能
 */

export interface IframeSyncMessage {
  type: 'route-change' | 'init-request';
  path: string;
  params?: Record<string, string>;
}

class IframeSyncManager {
  private isInIframe: boolean;
  private initialized: boolean = false;

  constructor() {
    this.isInIframe = window.self !== window.top;
    this.setupMessageListener();
  }

  /**
   * 检查是否在 iframe 中
   */
  public getIsInIframe(): boolean {
    return this.isInIframe;
  }

  /**
   * 向父页面发送路由变化消息
   */
  public syncRouteToParent(path: string, params?: Record<string, string>) {
    if (!this.isInIframe) return;

    const message: IframeSyncMessage = {
      type: 'route-change',
      path,
      params
    };

    try {
      window.parent.postMessage(message, '*');
    } catch (error) {
      console.warn('无法向父页面发送消息:', error);
    }
  }

  /**
   * 请求父页面的初始路由参数
   */
  public requestInitialRoute(): Promise<string | null> {
    if (!this.isInIframe) return Promise.resolve(null);

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve(null);
      }, 1000); // 1秒超时

      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'init-response') {
          clearTimeout(timeout);
          window.removeEventListener('message', handleMessage);
          resolve(event.data.path || null);
        }
      };

      window.addEventListener('message', handleMessage);

      // 发送初始化请求
      const message: IframeSyncMessage = {
        type: 'init-request',
        path: ''
      };

      try {
        window.parent.postMessage(message, '*');
      } catch (error) {
        clearTimeout(timeout);
        window.removeEventListener('message', handleMessage);
        resolve(null);
      }
    });
  }

  /**
   * 设置消息监听器
   */
  private setupMessageListener() {
    window.addEventListener('message', (event) => {
      // 这里可以处理从父页面接收的消息
      if (event.data?.type === 'parent-route-change') {
        // 可以在这里处理父页面路由变化的响应
        console.log('父页面路由变化:', event.data.path);
      }
    });
  }

  /**
   * 解析路径中的参数
   */
  public parsePathParams(path: string): { route: string; params: Record<string, string> } {
    const [route, queryString] = path.split('?');
    const params: Record<string, string> = {};

    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      urlParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return { route, params };
  }

  /**
   * 构建带参数的路径
   */
  public buildPathWithParams(route: string, params?: Record<string, string>): string {
    if (!params || Object.keys(params).length === 0) {
      return route;
    }

    const queryString = new URLSearchParams(params).toString();
    return `${route}?${queryString}`;
  }
}

export const iframeSyncManager = new IframeSyncManager();
