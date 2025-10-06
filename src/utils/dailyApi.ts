/**
 * AI 日报 API 请求工具模块
 * 负责与 CDN 服务器的数据交互，包括获取日报列表和具体日报内容
 */

import { DailyListResponse } from "../types/daily";

const BASE_URL = "https://codemmhy-1257917459.cos.ap-guangzhou.myqcloud.com";

export const dailyApiUtils = {
  // 获取日报列表
  async fetchDailyList(): Promise<DailyListResponse> {
    try {
      const response = await fetch(
        "https://cdn.jsdelivr.net/gh/ConardLi/easy-learn-ai@main/data/daily/home.json",
        {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Successfully fetched daily list:", data);
      return data;
    } catch (error) {
      console.error("Error fetching daily list:", error);

      // 提供更详细的错误信息
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("网络连接失败，请检查网络状态或稍后重试");
      } else if (error instanceof Error && error.message.includes("CORS")) {
        throw new Error("跨域访问被阻止，请联系管理员配置服务器");
      } else if (
        error instanceof Error &&
        error.message.includes("HTTP error")
      ) {
        throw new Error(`服务器响应错误: ${error.message}`);
      } else {
        throw new Error("获取日报列表失败，请稍后重试");
      }
    }
  },

  // 获取具体日报内容
  async fetchDailyContent(date: string): Promise<string> {
    try {
      const response = await fetch(`${BASE_URL}/${date}.md`, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "text/plain",
        },
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} - ${response.statusText}`
        );
      }

      const content = await response.text();
      console.log(
        `Successfully fetched content for ${date}:`,
        content.substring(0, 100) + "..."
      );
      return content;
    } catch (error) {
      console.error(`Error fetching daily content for ${date}:`, error);

      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("网络连接失败，请检查网络状态或稍后重试");
      } else if (
        error instanceof Error &&
        error.message.includes("HTTP error")
      ) {
        throw new Error(`服务器响应错误: ${error.message}`);
      } else {
        throw new Error("获取日报内容失败，请稍后重试");
      }
    }
  },
};
