/**
 * 时间轴数据服务模块
 * 负责从 CDN 获取时间轴数据
 * 提供数据获取和错误处理功能
 */
import { TimelineEvent } from '../store/timelineStore';

const TIMELINE_API_URL = 'https://codemmhy-1257917459.cos.ap-guangzhou.myqcloud.com/timeline.json';

export class TimelineService {
  static async fetchTimelineData(): Promise<TimelineEvent[]> {
    try {
      const response = await fetch(TIMELINE_API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: expected array');
      }
      
      // 验证数据格式
      return data.map((item, index) => {
        if (!item.time || !item.title || !item.desc || !item.domain) {
          throw new Error(`Invalid event format at index ${index}`);
        }
        return {
          time: item.time,
          title: item.title,
          desc: item.desc,
          domain: item.domain,
          ref: item.ref // 包含 ref 字段，如果存在的话
        };
      });
    } catch (error) {
      console.error('Failed to fetch timeline data:', error);
      throw error;
    }
  }
}