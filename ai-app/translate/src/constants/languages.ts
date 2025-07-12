/**
 * 语言常量定义
 * 包含源语言和目标语言的完整列表
 */

export interface Language {
  code: string;
  name: string;
}

export const SOURCE_LANGUAGES: Language[] = [
  { code: 'auto', name: '自动检测' },
  { code: 'zh-CN', name: '简体中文' },
  { code: 'zh-TW', name: '繁体中文' },
  { code: 'wyw', name: '文言文' },
  { code: 'yue', name: '粤语' },
  { code: 'en', name: '英语' },
  { code: 'ja', name: '日语' },
  { code: 'ko', name: '韩语' },
  { code: 'fr', name: '法语' },
  { code: 'de', name: '德语' },
  { code: 'es', name: '西班牙语' },
  { code: 'ru', name: '俄语' },
  { code: 'pt', name: '葡萄牙语' },
  { code: 'it', name: '意大利语' },
  { code: 'ar', name: '阿拉伯语' },
  { code: 'hi', name: '印地语' },
  { code: 'th', name: '泰语' },
  { code: 'vi', name: '越南语' },
  { code: 'my', name: '缅甸语' },
  { code: 'ms', name: '马来语' }
];

export const TARGET_LANGUAGES: Language[] = [
  { code: 'zh-CN', name: '简体中文' },
  { code: 'zh-TW', name: '繁体中文' },
  { code: 'wyw', name: '文言文' },
  { code: 'yue', name: '粤语' },
  { code: 'en', name: '英语' },
  { code: 'en-GB', name: '英语（英国）' },
  { code: 'en-US', name: '英语（美国）' },
  { code: 'ja', name: '日语' },
  { code: 'ko', name: '韩语' },
  { code: 'fr', name: '法语' },
  { code: 'de', name: '德语' },
  { code: 'es', name: '西班牙语' },
  { code: 'ru', name: '俄语' },
  { code: 'pt', name: '葡萄牙语' },
  { code: 'it', name: '意大利语' },
  { code: 'ar', name: '阿拉伯语' },
  { code: 'hi', name: '印地语' },
  { code: 'th', name: '泰语' },
  { code: 'vi', name: '越南语' },
  { code: 'my', name: '缅甸语' },
  { code: 'ms', name: '马来语' }
];
