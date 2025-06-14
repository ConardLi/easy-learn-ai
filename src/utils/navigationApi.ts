import { NavigationData } from '../types/navigation';

const API_URL = 'https://codemmhy-1257917459.cos.ap-guangzhou.myqcloud.com/sites.json';

export const navigationApiUtils = {
  async fetchNavigationData(): Promise<NavigationData> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch navigation data:', error);
      // 返回空数据作为降级处理
      return {};
    }
  }
};
