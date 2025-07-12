/**
 * 翻译策略常量定义
 * 包含所有可用的翻译策略及其详细信息
 */
import { TranslationStrategy } from '../store/atoms';

export interface ExtendedTranslationStrategy extends TranslationStrategy {
  applicableScenes: string;
  features: string[];
}

export const TRANSLATION_STRATEGIES: ExtendedTranslationStrategy[] = [
  {
    id: 'general',
    name: '通用翻译',
    description: '基础翻译方法，保持原文格式，考虑目标语言的文化背景和语言习惯，平衡准确性和流畅度，解决95%以上的提示注入问题',
    applicableScenes: '一般性内容翻译，适用于大多数日常翻译需求，并且可解决大部分提示注入问题',
    features: [
      '保持原文格式',
      '遵循翻译规则',
      '可使用术语表',
      '可适应目标语言的地区特点'
    ]
  },
  {
    id: 'paraphrase',
    name: '转述翻译',
    description: '尊重原意但重写内容，以目标语言的表达方式传达源文本的含义',
    applicableScenes: '需要更自然地适应目标语言文化的内容，非严格对应翻译场景',
    features: [
      '更注重表达原意而非原文形式',
      '更自然地适应目标语言习惯',
      '允许更大的重构自由度'
    ]
  },
  {
    id: 'two_step',
    name: '两步翻译',
    description: '分为直译和意译两个步骤，先做逐字对应翻译，再基于直译进行自由翻译',
    applicableScenes: '文学作品、需要兼顾准确性和表达性的内容',
    features: [
      '结合字面和意义翻译的优点',
      '更全面地理解文本',
      '分步处理提高准确性和表达流畅度'
    ]
  },
  {
    id: 'three_step',
    name: '三关翻译',
    description: '基于中国传统翻译理论"信、达、雅"三个标准进行翻译，依次确保内容准确（信）、表达流畅（达）、风格优美（雅），可指定翻译风格（目前只支持古风文言文），适合对翻译质量有较高要求的文学、文化类内容',
    applicableScenes: '高质量需求的文学、诗歌或需要追求艺术性的文本翻译',
    features: [
      '遵循中国传统"信达雅"翻译理念',
      '追求文化和哲学层面的传达',
      '最终追求简洁且具古韵的表达'
    ]
  },
  {
    id: 'reflection',
    name: '反思翻译',
    description: '先直译，在让大模型扮演专家对直译的结果按指定维度进行反思，最后根据反思的结果对直译的结果进行优化，该策略对翻译结果进行自我评估和改进，提高翻译准确性',
    applicableScenes: '专业出版物、正式文件、对准确性和质量要求高的翻译',
    features: [
      '通过反馈迭代提高翻译质量',
      '专注于纠正错误和提升风格',
      '适合复杂或专业内容'
    ]
  },
  {
    id: 'cot',
    name: 'COT翻译',
    description: '通过思考链(Chain of Thought)过程，先用特定语言推理分析原文，再给出目标语言翻译',
    applicableScenes: '概念复杂或需要深入理解的内容，专业领域文本',
    features: [
      '翻译前先进行明确的推理过程',
      '提高对复杂内容的理解准确性',
      '使翻译过程更透明',
      '可用于处理需要专业知识背景的内容'
    ]
  }
];