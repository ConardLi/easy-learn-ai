import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, FileText, Eye, Heart, Share2, TrendingUp, Calendar, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { adminApi } from '../services/api';

interface DashboardStats {
  totalPrompts: number;
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  recentPrompts: Array<{
    id: string;
    name: string;
    views: number;
    created_at: string;
  }>;
  categoryStats: Array<{
    name: string;
    count: number;
    color: string;
  }>;
  dailyStats: Array<{
    date: string;
    prompts: number;
    views: number;
  }>;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // 获取提示词列表用于统计
      const prompts = await adminApi.getPromptsForAdmin();
      
      // 计算统计数据
      const totalPrompts = prompts.length;
      const totalViews = prompts.reduce((sum, p) => sum + (p.views || 0), 0);
      const totalLikes = prompts.reduce((sum, p) => sum + (p.likes || 0), 0);
      const totalShares = prompts.reduce((sum, p) => sum + (p.shares || 0), 0);
      
      // 最近的提示词（按创建时间排序，取前5个）
      const recentPrompts = prompts
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)
        .map(p => ({
          id: p.id,
          name: p.name,
          views: p.views || 0,
          created_at: p.created_at.split('T')[0]
        }));
      
      // 分类统计
      const categoryCount: { [key: string]: number } = {};
      prompts.forEach(p => {
        const category = p.category || '其他';
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });
      
      const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];
      const categoryStats = Object.entries(categoryCount).map(([name, count], index) => ({
        name,
        count,
        color: colors[index % colors.length]
      }));
      
      // 每日统计（模拟数据，实际应该从数据库统计）
       const dailyStats = [
         { date: '2024-01-08', prompts: 12, views: 450, likes: 89 },
         { date: '2024-01-09', prompts: 15, views: 520, likes: 102 },
         { date: '2024-01-10', prompts: 18, views: 680, likes: 134 },
         { date: '2024-01-11', prompts: 22, views: 750, likes: 156 },
         { date: '2024-01-12', prompts: 19, views: 690, likes: 145 },
         { date: '2024-01-13', prompts: 25, views: 820, likes: 178 },
         { date: '2024-01-14', prompts: 28, views: 950, likes: 201 },
       ];
      
      const dashboardStats: DashboardStats = {
        totalPrompts,
        totalViews,
        totalLikes,
        totalShares,
        recentPrompts,
        categoryStats,
        dailyStats,
      };
      
      setStats(dashboardStats);
    } catch (err) {
      toast.error('加载仪表板数据失败');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">暂无数据</p>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, change, color }: {
    icon: any;
    title: string;
    value: string | number;
    change?: string;
    color: string;
  }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1">
              <TrendingUp className="inline h-4 w-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">仪表板</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>最后更新: {new Date().toLocaleString('zh-CN')}</span>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={BookOpen}
          title="总提示词数"
          value={stats.totalPrompts}
          change="+12%"
          color="bg-blue-500"
        />
        <StatCard
          icon={Eye}
          title="总浏览量"
          value={stats.totalViews.toLocaleString()}
          change="+8%"
          color="bg-green-500"
        />
        <StatCard
          icon={Heart}
          title="总点赞数"
          value={stats.totalLikes.toLocaleString()}
          change="+15%"
          color="bg-red-500"
        />
        <StatCard
          icon={Share2}
          title="总分享数"
          value={stats.totalShares}
          change="+6%"
          color="bg-purple-500"
        />
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 每日统计 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">每日统计</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="prompts" fill="#3B82F6" name="新增提示词" />
              <Bar dataKey="views" fill="#10B981" name="浏览量" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 分类统计 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">分类统计</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.categoryStats}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {stats.categoryStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 最近提示词 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">最近提示词</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  名称
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  浏览量
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  创建时间
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentPrompts.map((prompt) => (
                <tr key={prompt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{prompt.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{prompt.views}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{prompt.created_at}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;