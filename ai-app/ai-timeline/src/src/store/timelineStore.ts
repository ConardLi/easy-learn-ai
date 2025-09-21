/**
 * 时间轴全局状态管理模块
 * 使用 jotai 管理时间轴数据、筛选条件和搜索状态
 * 提供数据获取、筛选和搜索的统一状态管理
 */
import { atom } from 'jotai';

export interface TimelineEvent {
  time: string;
  title: string;
  desc: string;
  domain: string;
  ref?: string; // 新增：参考链接字段，可选
}

// 排序类型定义
export type SortOrder = 'desc' | 'asc'; // desc: 倒序（新到旧），asc: 正序（旧到新）

// 原始时间轴数据
export const timelineDataAtom = atom<TimelineEvent[]>([]);

// 筛选条件
export const domainFilterAtom = atom<string>('');
export const yearFilterAtom = atom<string>('');
export const searchQueryAtom = atom<string>('');

// 排序状态（默认倒序）
export const sortOrderAtom = atom<SortOrder>('desc');

// 加载状态
export const isLoadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);

// 解析时间字符串并转换为可比较的时间戳
const parseTimeString = (timeString: string): number => {
  // 尝试匹配各种时间格式
  const patterns = [
    // 2025年7月 -> 2025/07
    /(\d{4})年(\d{1,2})月/,
    // 2025年7月15日 -> 2025/07/15
    /(\d{4})年(\d{1,2})月(\d{1,2})日/,
    // 2025-07 -> 2025/07
    /(\d{4})-(\d{1,2})/,
    // 2025-07-15 -> 2025/07/15
    /(\d{4})-(\d{1,2})-(\d{1,2})/,
    // 2025/07 -> 2025/07
    /(\d{4})\/(\d{1,2})/,
    // 2025/07/15 -> 2025/07/15
    /(\d{4})\/(\d{1,2})\/(\d{1,2})/,
    // 仅年份 2025 -> 2025/01/01
    /^(\d{4})$/
  ];

  for (const pattern of patterns) {
    const match = timeString.match(pattern);
    if (match) {
      const year = parseInt(match[1]);
      const month = match[2] ? parseInt(match[2]) : 1;
      const day = match[3] ? parseInt(match[3]) : 1;
      
      // 创建Date对象并返回时间戳
      const date = new Date(year, month - 1, day); // month - 1 因为JS的月份从0开始
      return date.getTime();
    }
  }
  
  // 如果都没匹配到，尝试直接解析
  const fallbackDate = new Date(timeString);
  if (!isNaN(fallbackDate.getTime())) {
    return fallbackDate.getTime();
  }
  
  // 最后兜底，返回很早的时间
  return new Date(1970, 0, 1).getTime();
};

// 计算过滤后的数据
export const filteredTimelineAtom = atom((get) => {
  const data = get(timelineDataAtom);
  const domainFilter = get(domainFilterAtom);
  const yearFilter = get(yearFilterAtom);
  const searchQuery = get(searchQueryAtom);
  const sortOrder = get(sortOrderAtom);

  // 先进行筛选
  let filteredData = data.filter((event) => {
    const matchesDomain = !domainFilter || event.domain.includes(domainFilter);
    const matchesYear = !yearFilter || event.time.includes(yearFilter);
    const matchesSearch = !searchQuery || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.domain.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDomain && matchesYear && matchesSearch;
  });

  // 然后进行排序
  filteredData.sort((a, b) => {
    const timeA = parseTimeString(a.time);
    const timeB = parseTimeString(b.time);
    
    if (sortOrder === 'desc') {
      return timeB - timeA; // 倒序：新到旧
    } else {
      return timeA - timeB; // 正序：旧到新
    }
  });

  return filteredData;
});

// 获取所有唯一的领域
export const uniqueDomainsAtom = atom((get) => {
  const data = get(timelineDataAtom);
  return [...new Set(data.map(event => event.domain))];
});

// 获取所有唯一的年份
export const uniqueYearsAtom = atom((get) => {
  const data = get(timelineDataAtom);
  const years = new Set<string>();
  
  data.forEach(event => {
    const yearMatch = event.time.match(/(\d{4})/);
    if (yearMatch) {
      years.add(yearMatch[1]);
    }
  });
  
  return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
});