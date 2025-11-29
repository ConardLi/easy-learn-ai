/**
 * AI 模型 API 请求工具模块
 * 负责加载和处理模型数据
 */

import { AIModel } from "../types/model";
import modelData from "./model.json";
import imgModelData from "./model/img.json";
import videoModelData from "./model/video.json";

export const modelApiUtils = {
  /**
   * 获取模型列表
   */
  async fetchModelList(): Promise<any> {
    try {
      //   const response = await fetch(
      //     "https://cdn.jsdelivr.net/gh/ConardLi/easy-learn-ai@main/data/model/model.json",
      //     {
      //       method: "GET",
      //       headers: {
      //         Accept: "application/json",
      //       },
      //     }
      //   );

      //   if (!response.ok) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      //   }

      //   const data = await response.json();
      //   console.log("Successfully fetched model list:", data.length, "models");
      //   return data;
      return [...modelData, ...imgModelData, ...videoModelData];
    } catch (error) {
      console.error("Error fetching model list:", error);

      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("网络连接失败，请检查网络状态或稍后重试");
      } else if (
        error instanceof Error &&
        error.message.includes("HTTP error")
      ) {
        throw new Error(`服务器响应错误: ${error.message}`);
      } else {
        throw new Error("获取模型列表失败，请稍后重试");
      }
    }
  },
};
