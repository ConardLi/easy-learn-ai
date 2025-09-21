/**
 * 时间轴数据获取 Hook
 * 负责初始化数据获取和状态管理
 * 结合 jotai 状态管理提供数据获取逻辑
 */
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { timelineDataAtom, isLoadingAtom, errorAtom } from '../store/timelineStore';
import { TimelineService } from '../services/timelineService';

export const useTimelineData = () => {
  const [timelineData, setTimelineData] = useAtom(timelineDataAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);

  useEffect(() => {
    const fetchData = async () => {
      if (timelineData.length > 0) return; // 避免重复请求
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await TimelineService.fetchTimelineData();
        setTimelineData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load timeline data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timelineData.length, setTimelineData, setIsLoading, setError]);

  return {
    timelineData,
    isLoading,
    error,
    refetch: () => {
      setTimelineData([]);
    }
  };
};
