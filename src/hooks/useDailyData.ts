/**
 * 日报数据管理的自定义 Hook
 * 封装日报列表和详情的数据获取逻辑，处理加载状态和错误处理
 */

import { useState, useEffect } from 'react';
import { DailyReport } from '../types/daily';
import { dailyApiUtils } from '../utils/dailyApi';
import toast from 'react-hot-toast';

export const useDailyList = () => {
  const [dailyList, setDailyList] = useState<DailyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDailyList = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('开始获取日报列表...');
        
        const data = await dailyApiUtils.fetchDailyList();
        console.log('获取到日报数据:', data);
        
        setDailyList(data);
        toast.success('日报列表加载成功！');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '未知错误';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Failed to load daily list:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDailyList();
  }, []);

  return { dailyList, loading, error };
};

export const useDailyContent = (date: string) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date) return;

    const loadDailyContent = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`开始获取日报内容: ${date}...`);
        
        const content = await dailyApiUtils.fetchDailyContent(date);
        console.log(`获取到日报内容 ${date}:`, content.substring(0, 100) + '...');
        
        setContent(content);
        toast.success('日报内容加载成功！');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '未知错误';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error(`Failed to load daily content for ${date}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadDailyContent();
  }, [date]);

  return { content, loading, error };
};
