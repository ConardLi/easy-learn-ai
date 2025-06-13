/**
 * 日报详情页面组件
 * 展示具体日报的 Markdown 内容，包含返回按钮和美化的内容展示
 * 使用 react-markdown 和 GitHub 风格的样式渲染
 * 新增 iframe 环境下的分享功能
 */

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Loader2, Share2, ExternalLink } from 'lucide-react';
import { useDailyContent } from '../hooks/useDailyData';
import { useIframeSync } from '../hooks/useIframeSync';
import toast from 'react-hot-toast';

export const DailyDetail: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { content, loading } = useDailyContent(date || '');
  const { isInIframe, syncToParent } = useIframeSync();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleShare = async () => {
    let shareUrl: string;
    
    if (isInIframe) {
      // iframe 环境下，分享父页面的 URL
      shareUrl = window.top?.location.href || window.location.href;
      toast.success('父页面链接已复制到剪贴板！');
    } else {
      // 独立页面环境
      shareUrl = window.location.href;
      toast.success('链接已复制到剪贴板！');
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch (error) {
      toast.error('复制链接失败');
    }
  };

  // 在 iframe 环境下，当进入详情页时同步路由到父页面
  useEffect(() => {
    if (isInIframe && date) {
      const params = { 
        page: 'daily',
        date: date,
        title: `AI日报-${formatDate(date)}`
      };
      syncToParent(`/daily/${date}`, params);
    }
  }, [date, isInIframe, syncToParent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-blue-600" size={40} />
          <p className="text-gray-600">正在加载日报内容...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 导航栏 */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            返回日报列表
          </button>
          
          <div className="flex items-center gap-2">
            {/* 分享按钮 */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Share2 size={16} />
              分享链接
            </button>
            
            {/* iframe 环境下显示在新窗口打开按钮 */}
            {isInIframe && (
              <button
                onClick={() => {
                  const url = window.location.href;
                  window.open(url, '_blank');
                }}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                title="在新窗口中打开"
              >
                <ExternalLink size={16} />
                新窗口
              </button>
            )}
          </div>
        </div>

        {/* 日期标题 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
              <Calendar className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {date && formatDate(date)}
              </h1>
              <p className="text-gray-600">AI 日报</p>
            </div>
          </div>
        </div>

        {/* Markdown 内容 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-200">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-100">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="text-gray-700 leading-relaxed mb-4 text-base">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-outside text-gray-700 mb-4 space-y-2 ml-6">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-outside text-gray-700 mb-4 space-y-2 ml-6">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-700 leading-relaxed">
                    {children}
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-4 bg-blue-50 rounded-r-lg">
                    <div className="text-gray-700 italic">
                      {children}
                    </div>
                  </blockquote>
                ),
                code: ({ inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="relative mb-4">
                      <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-t-lg text-sm font-medium">
                        {match[1]}
                      </div>
                      <SyntaxHighlighter
                        style={tomorrow}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-b-lg !mt-0"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono border" {...props}>
                      {children}
                    </code>
                  );
                },
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 hover:decoration-blue-800 transition-colors"
                  >
                    {children}
                  </a>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-gray-50">
                    {children}
                  </thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {children}
                  </tbody>
                ),
                tr: ({ children }) => (
                  <tr className="hover:bg-gray-50 transition-colors">
                    {children}
                  </tr>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 text-gray-700 border-r border-gray-200 last:border-r-0">
                    {children}
                  </td>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3 text-left text-gray-900 font-semibold border-r border-gray-200 last:border-r-0">
                    {children}
                  </th>
                ),
                hr: () => (
                  <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-gray-700">
                    {children}
                  </em>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};