/**
 * 知识星球页面组件
 * 介绍付费知识星球的相关信息
 */

import React from "react";
import {
  Star,
  Users,
  MessageSquare,
  FileText,
  TrendingUp,
  BookOpen,
} from "lucide-react";

const KnowledgePlanet: React.FC = () => {
  const contentFeatures = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "AI 教程完整版",
      description: "视频中的原始课件内容，部分非公开的代码、数据等",
      detail: "更系统性的整理后的知识库，目前已更新 78 个章节",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "最新学习资料",
      description: "从第一手渠道收集的最新 AI 相关学习资料",
      detail: "持续更新，已更新 200+ 份资料",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "行业报告",
      description: "业界最新 AI 技术调研报告和最佳实践案例",
      detail: "包含各行业 AI 赋能案例和研究机构报告",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "专业答疑",
      description: "经过花园老师整理的第一手 AI 信息",
      detail: "更多的一对一答疑机会",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 pt-8">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Star className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            code秘密花园 知识星球
          </h1>

          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            专注 AI 技术的付费学习社群，提供最新的 AI
            学习资料、系统化教程和专业答疑服务
          </p>

          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>100+ 教程章节</span>
            </div>
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              <span>300+ 学习资料</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2" />
              <span>持续更新</span>
            </div>
          </div>
        </div>

        {/* Content Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contentFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-white mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-3 leading-relaxed">
                {feature.description}
              </p>
              <p className="text-sm text-pink-600 font-medium">
                {feature.detail}
              </p>
            </div>
          ))}
        </div>

        {/* 优惠券和加入星球图片 - 左右并排 */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row gap-8">
              {/* 限时优惠图片 */}
              <div className="flex-1 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  限时优惠
                </h3>
                <img
                  style={{ marginLeft: 50 }}
                  width={400}
                  src="../../public/imgs/yh.png"
                ></img>
              </div>

              {/* 加入星球图片 */}
              <div className="flex-1 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  加入星球
                </h3>
                <img
                  style={{ marginLeft: 50 }}
                  width={400}
                  src="../../public/imgs/qr.png"
                ></img>
              </div>
            </div>
          </div>
        </div>

        {/* Teacher Introduction */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl flex items-center justify-center text-white text-2xl font-bold mb-6 md:mb-0 md:mr-8">
              CL
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                花园老师（ConardLi）
              </h3>
              <p className="text-gray-600 mb-4">
                专注 AI
                领域技术分享，致力于为学习者提供最新、最实用、最通俗易懂的的 AI
                教程。
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                  AI 技术专家
                </span>
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                  技术导师
                </span>
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                  内容创作者
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgePlanet;
