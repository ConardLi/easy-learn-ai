/**
 * 欢迎屏幕组件
 * 无对话时的欢迎界面
 */
import React from "react";
import { useAtom } from "jotai";
import {
  SparklesIcon,
  GlobeAltIcon,
  BoltIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import { userConfigAtom } from "../../store/atoms";

export const WelcomeScreen: React.FC = () => {
  const [config] = useAtom(userConfigAtom);

  const features = [
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      title: "智能翻译",
      description: "基于AI的高质量翻译服务",
    },
    {
      icon: <GlobeAltIcon className="w-6 h-6" />,
      title: "多语言支持",
      description: "支持数十种语言互译",
    },
    {
      icon: <BoltIcon className="w-6 h-6" />,
      title: "实时流式",
      description: "流式输出，即时查看翻译进度",
    },
  ];

  return (
    <div className="text-center max-w-2xl mx-auto px-4">
      {/* 主标题 */}
      <div className="mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <LanguageIcon className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">AI 智能翻译</h1>
        <p className="text-lg text-gray-600">专业、高效、智能的翻译体验</p>
      </div>

      {/* 功能特色 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-white/50 border border-gray-200"
          >
            <div className="text-blue-500 mb-3 flex justify-center">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* 开始提示 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        {config.apiKey ? (
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">
              🎉 配置完成，开始翻译吧！
            </h3>
            <p className="text-blue-700">
              在下方输入文本或上传文件，即可开始您的翻译之旅
            </p>
          </div>
        ) : (
          <div>
            <h3 className="font-semibold text-amber-800 mb-2">
              ⚙️ 请先配置 API 密钥
            </h3>
            <p className="text-amber-700">
              点击顶部的配置按钮，输入您的 API 密钥即可开始使用
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
