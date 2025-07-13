# 🌍 智能翻译助手

请基于以下技术规范和功能要求，开发一个现代化的智能翻译助手Web应用。

## 🎯 项目概述

**应用名称**: 智能翻译助手  
**技术栈**: React + TypeScript + Tailwind CSS + Jotai  
**核心功能**: 支持文本翻译和专业文档翻译的智能助手  

## 🏗️ 技术架构

### **基础技术栈**
- **前端框架**: React 18+ with TypeScript
- **状态管理**: Jotai (atom-based状态管理)
- **样式方案**: Tailwind CSS
- **图标库**: @heroicons/react
- **构建工具**: 现代化构建工具支持

### **项目结构**
```
/
├── App.tsx                              # 应用入口
├── store/
│   └── atoms.ts                         # 全局状态管理
├── services/
│   └── translationService.ts            # 翻译API服务
├── components/
│   ├── ModernConfigBar/                 # 现代化配置栏
│   │   ├── index.tsx
│   │   ├── ConfigDropdown.tsx
│   │   ├── ApiKeyConfig.tsx
│   │   ├── LanguageConfig.tsx
│   │   └── StrategyModal.tsx
│   ├── ChatInterface/                   # 聊天界面
│   │   ├── index.tsx
│   │   ├── ChatInput.tsx
│   │   ├── MessageList.tsx
│   │   ├── ModernMessageBubble.tsx
│   │   └── WelcomeScreen.tsx
│   └── common/
│       └── ErrorToast.tsx
├── constants/
│   ├── languages.ts                     # 语言配置
│   └── strategies.ts                    # 翻译策略
└── depInfo.json                         # 依赖声明
```

## 🎨 UI设计要求

### **整体设计风格**
- **现代化**: 采用渐变背景 `bg-gradient-to-br from-slate-50 to-blue-50`
- **毛玻璃效果**: 配置栏使用 `backdrop-blur-lg`
- **圆角设计**: 统一使用 `rounded-xl` 和 `rounded-2xl`
- **阴影层次**: 适当的 `shadow-sm` 和 `shadow-lg`

### **配色方案**
- **主色调**: 蓝色 (`blue-500`, `blue-600`)
- **成功状态**: 绿色 (`green-500`, `green-600`)  
- **警告状态**: 黄色 (`amber-500`, `amber-600`)
- **错误状态**: 红色 (`red-500`, `red-600`)
- **文本颜色**: 灰色系 (`gray-600`, `gray-700`, `gray-800`)

### **响应式布局**
- **移动端优先**: 使用 Tailwind 的响应式前缀
- **最大宽度**: 主内容区域 `max-w-4xl mx-auto`
- **灵活适配**: 配置栏在移动端可折叠展开

## ⚙️ 核心功能模块

### **1. 全局状态管理 (store/atoms.ts)**

**必须实现的状态atoms:**
```typescript
// 用户配置 (持久化存储)
userConfigAtom: {
  apiKey: string;           // API密钥
  sourceLang: string;       // 源语言
  targetLang: string;       // 目标语言  
  strategy: string;         // 翻译策略
}

// 翻译相关状态
messagesAtom              // 翻译历史消息
isTranslatingAtom         // 翻译状态
uploadedFileAtom         // 当前上传文件
streamingMessageIdAtom   // 流式响应消息ID
docTranslationTasksAtom  // 文档翻译任务列表
```

**消息接口定义:**
```typescript
interface TranslationMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
  isDocTranslation?: boolean;
  translationStatus?: 'pending' | 'processing' | 'success' | 'failed';
  downloadLinks?: Array<{
    url: string;
    type: 'original' | 'translated' | 'bilingual';
    label: string;
  }>;
}
```

### **2. 翻译服务 (services/translationService.ts)**

**API集成要求:**
- **基础URL**: `https://open.bigmodel.cn/api`
- **文档翻译URL**: `https://bigmodel.cn/api`

**必须实现的方法:**
```typescript
class TranslationService {
  // 流式文本翻译
  static streamTranslation()
  
  // 文件上传
  static uploadFile()
  
  // 创建文档翻译任务  
  static createDocTranslationTask()
  
  // 查询翻译结果
  static queryDocTranslationResult()
  
  // 轮询翻译结果
  static pollDocTranslationResult()
}
```

**错误处理:**
- 实现 `ApiError` 类统一错误处理
- 支持结构化错误响应解析
- 用户友好的错误提示

### **3. 现代化配置栏 (ModernConfigBar)**

**功能要求:**
- **三个主要配置**: API密钥、语言选择、翻译策略
- **状态指示**: 配置完成状态用不同颜色显示
- **响应式**: 桌面端横向布局，移动端可折叠
- **下拉组件**: API和语言使用下拉框，策略使用模态框

**组件结构:**
- `index.tsx` - 主配置栏
- `ConfigDropdown.tsx` - 通用下拉组件
- `ApiKeyConfig.tsx` - API密钥配置
- `LanguageConfig.tsx` - 语言选择配置  
- `StrategyModal.tsx` - 策略选择模态框

### **4. 聊天界面 (ChatInterface)**

**核心组件:**
- **ChatInput**: 底部输入区域，支持文本输入和文件上传
- **MessageList**: 消息列表展示
- **ModernMessageBubble**: 现代化消息气泡
- **WelcomeScreen**: 欢迎界面

**ChatInput功能要求:**
- **文本输入**: 支持多行输入，Enter发送，Shift+Enter换行
- **文件上传**: 支持多格式文档 (PDF, DOC, DOCX等)
- **智能提示**: 根据配置状态显示相应提示
- **发送按钮**: 动态状态显示，翻译中显示加载动画

**消息气泡特性:**
- **双端布局**: 用户消息右对齐蓝色，助手消息左对齐白色
- **流式显示**: 支持逐字显示翻译结果
- **状态指示**: 文档翻译进度指示器
- **下载链接**: 翻译完成后显示文件下载选项

## 🌐 多语言支持

### **语言配置 (constants/languages.ts)**
**源语言**: 包含"自动检测"选项，支持20+语言
**目标语言**: 不包含自动检测，支持细分地区 (如英语美国/英国)

**主要语言:**
- 中文 (简体/繁体/文言文/粤语)
- 英语 (通用/美国/英国)  
- 日语、韩语、法语、德语、西班牙语、俄语
- 阿拉伯语、印地语、泰语、越南语等

### **翻译策略 (constants/strategies.ts)**
实现6种翻译策略:
1. **通用翻译** - 基础翻译，平衡准确性和流畅度
2. **转述翻译** - 重写内容以适应目标语言文化
3. **两步翻译** - 直译+意译两步骤
4. **三关翻译** - 基于"信达雅"理念的高质量翻译
5. **反思翻译** - 通过反馈迭代提高质量
6. **COT翻译** - 思考链推理过程翻译

## 🔧 核心交互流程

### **文本翻译流程:**
1. 用户输入文本 → 2. 创建用户消息 → 3. 调用流式翻译API → 4. 实时显示翻译结果 → 5. 完成状态更新

### **文档翻译流程:**
1. 文件上传 → 2. 文件上传到服务器 → 3. 创建翻译任务 → 4. 轮询任务状态 → 5. 显示下载链接

### **配置管理流程:**
1. 持久化存储用户配置 → 2. 实时配置状态检查 → 3. 配置变更立即生效

## 📱 用户体验要求

### **交互细节:**
- **平滑动画**: 所有状态变化使用 `transition-all`
- **加载状态**: 翻译中显示动画和进度
- **错误处理**: Toast提示用户友好的错误信息
- **键盘快捷键**: Enter发送，Shift+Enter换行
- **自动滚动**: 新消息自动滚动到可视区域

### **性能要求:**
- **流式响应**: 文本翻译结果逐字显示
- **异步处理**: 文档翻译不阻塞UI
- **状态同步**: 所有组件状态实时同步

## 🔐 安全和稳定性

### **错误处理机制:**
- API错误统一处理和展示
- 文件上传大小限制 (100MB)
- 网络异常重试机制
- 用户输入验证

### **数据持久化:**
- 用户配置本地存储
- 翻译历史会话级存储
- 任务状态实时同步


## 接口格式

参考：https://bigmodel.cn/dev/api/agent/general_translation