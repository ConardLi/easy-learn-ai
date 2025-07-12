/**
 * 翻译服务
 * 处理翻译API调用、文件上传等核心业务逻辑
 */

export interface TranslationRequest {
  text?: string;
  fileId?: string;  // 添加文件ID支持
  sourceLang: string;
  targetLang: string;
  strategy: string;
  apiKey: string;
}

export interface FileUploadResponse {
  id: string;  // 修正：API返回的是 id，不是 file_id
  object: string;
  bytes: number;
  filename: string;
  purpose: string;
  created_at: number;
}

// 专业文档翻译任务创建响应
export interface DocTranslationTaskResponse {
  agent_id: string;
  async_id?: string;
  asyncId?: string;
  id?: string;
  task_id?: string;
  status: string;
}

// 专业文档翻译结果查询响应
export interface DocTranslationResultResponse {
  agent_id: string;
  async_id: string;
  status: 'success' | 'failed' | 'pending';
  choices?: Array<{
    messages: Array<{
      role: string;
      content: Array<{
        type: string;
        file_url: string;
        tag_cn: string;
        tag_en: string;
      }>;
    }>;
  }>;
  usage?: {
    total_tokens: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

// 定义API错误响应结构
export interface ApiErrorResponse {
  code: number;
  msg: string;
  success: false;
}

// 自定义错误类，包含结构化错误信息
export class ApiError extends Error {
  public code: number;
  public success: boolean;
  
  constructor(errorResponse: ApiErrorResponse) {
    super(errorResponse.msg);
    this.name = 'ApiError';
    this.code = errorResponse.code;
    this.success = errorResponse.success;
  }
  
  // 根据错误代码返回用户友好的错误类型
  getErrorType(): string {
    switch (this.code) {
      case 401:
        return '身份验证失败';
      case 403:
        return '访问被拒绝';
      case 429:
        return '请求过于频繁';
      case 500:
        return '服务器内部错误';
      default:
        return '请求失败';
    }
  }
}

export class TranslationService {
  private static readonly BASE_URL = 'https://open.bigmodel.cn/api';
  private static readonly DOC_TRANSLATION_BASE_URL = 'https://bigmodel.cn/api'; // 专业翻译使用不同的基础URL
  
  // 统一的错误处理方法
  private static async handleApiResponse(response: Response): Promise<any> {
    const responseText = await response.text();
    
    try {
      const data = JSON.parse(responseText);
      
      // 检查是否为结构化错误响应
      if (!response.ok || (data.success === false)) {
        const errorResponse: ApiErrorResponse = {
          code: data.code || response.status,
          msg: data.msg || data.message || response.statusText || '未知错误',
          success: false
        };
        throw new ApiError(errorResponse);
      }
      
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // 如果不是JSON格式，创建通用错误
      const errorResponse: ApiErrorResponse = {
        code: response.status,
        msg: response.statusText || '网络请求失败',
        success: false
      };
      throw new ApiError(errorResponse);
    }
  }
  
  // 文件上传
  static async uploadFile(file: File, apiKey: string): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('purpose', 'agent');
    
    const response = await fetch(`${this.BASE_URL}/paas/v4/files`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData
    });
    
    return this.handleApiResponse(response);
  }
  
  // 创建专业文档翻译任务 (修复API路径和headers)
  static async createDocTranslationTask(
    fileId: string,
    fromLang: string,
    toLang: string,
    apiKey: string,
    shouldTranslateImage: boolean = true
  ): Promise<DocTranslationTaskResponse> {
    const requestBody = {
      agent_id: 'doc_translation_agent',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'file_id',
              file_id: fileId
            }
          ]
        }
      ],
      custom_variables: {
        from_lang: fromLang,
        to_lang: toLang,
        should_translate_image: shouldTranslateImage
      }
    };
    
    console.log('创建翻译任务请求:', {
      url: `${this.DOC_TRANSLATION_BASE_URL}/v1/agents`,
      body: requestBody
    });
    
    const response = await fetch(`${this.DOC_TRANSLATION_BASE_URL}/v1/agents`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh',
        'Authorization': apiKey, // 直接使用apiKey，不加Bearer前缀
        'Content-Type': 'application/json;charset=UTF-8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      credentials: 'include',
      body: JSON.stringify(requestBody)
    });
    
    const result = await this.handleApiResponse(response);
    console.log('创建翻译任务响应:', result);
    
    // 如果响应中包含data字段，则使用data中的内容
    const actualResult = result.data || result;
    console.log('实际任务数据:', actualResult);
    
    return actualResult;
  }
  
  // 查询专业文档翻译结果 (修复为POST请求)
  static async queryDocTranslationResult(
    asyncId: string,
    apiKey: string
  ): Promise<DocTranslationResultResponse> {
    const response = await fetch(
      `${this.DOC_TRANSLATION_BASE_URL}/v1/agents/async-result`,
      {
        method: 'POST', // 修正：使用POST方法
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'zh',
          'Authorization': apiKey, // 直接使用apiKey，不加Bearer前缀
          'Content-Type': 'application/json;charset=UTF-8',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        credentials: 'include',
        body: JSON.stringify({
          async_id: asyncId,
          agent_id: 'doc_translation_agent'
        })
      }
    );
    
    return this.handleApiResponse(response);
  }
  
  // 轮询专业文档翻译结果 (添加参数检查)
  static async pollDocTranslationResult(
    asyncId: string,
    apiKey: string,
    onStatusUpdate: (status: string, result?: DocTranslationResultResponse) => void,
    maxAttempts: number = 60, // 最多轮询60次，每次间隔5秒，总计5分钟
    interval: number = 5000 // 5秒间隔
  ): Promise<DocTranslationResultResponse> {
    // 参数验证
    if (!asyncId || asyncId === 'undefined') {
      throw new ApiError({
        code: 400,
        msg: '异步任务ID无效，无法查询翻译结果',
        success: false
      });
    }
    
    if (!apiKey) {
      throw new ApiError({
        code: 400,
        msg: 'API密钥不能为空',
        success: false
      });
    }
    
    console.log('开始轮询翻译结果:', { asyncId, maxAttempts, interval });
    
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      try {
        console.log(`第 ${attempts + 1} 次查询翻译结果:`, asyncId);
        
        const result = await this.queryDocTranslationResult(asyncId, apiKey);
        
        console.log('查询结果:', { status: result.status, asyncId: result.async_id });
        
        onStatusUpdate(result.status, result);
        
        if (result.status === 'success') {
          console.log('翻译完成:', result);
          return result;
        } else if (result.status === 'failed') {
          throw new ApiError({
            code: 500,
            msg: result.error?.message || '文档翻译任务失败',
            success: false
          });
        }
        
        // 状态为 pending，继续轮询
        attempts++;
        if (attempts < maxAttempts) {
          console.log(`等待 ${interval/1000} 秒后进行下次查询...`);
          await new Promise(resolve => setTimeout(resolve, interval));
        }
      } catch (error) {
        console.error('查询翻译结果出错:', error);
        if (error instanceof ApiError) {
          throw error;
        }
        throw new ApiError({
          code: 0,
          msg: `查询翻译结果失败: ${(error as Error).message}`,
          success: false
        });
      }
    }
    
    throw new ApiError({
      code: 408,
      msg: '翻译任务超时，请稍后手动查询结果',
      success: false
    });
  }
  
  // 流式翻译 - 支持文件ID（保持原有逻辑不变）
  static async streamTranslation(
    request: TranslationRequest,
    onChunk: (chunk: string) => void,
    onComplete: () => void,
    onError: (error: ApiError) => void
  ): Promise<void> {
    try {
      // 构建消息内容
      const messageContent: any[] = [];
      
      if (request.text) {
        messageContent.push({
          type: 'text',
          text: request.text
        });
      }
      
      if (request.fileId) {
        messageContent.push({
          type: 'file',
          file_id: request.fileId
        });
      }
      
      const response = await fetch(`${this.BASE_URL}/v1/agents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${request.apiKey}`
        },
        body: JSON.stringify({
          agent_id: 'general_translation',
          stream: true,
          messages: [
            {
              role: 'user',
              content: messageContent
            }
          ],
          custom_variables: {
            source_lang: request.sourceLang,
            target_lang: request.targetLang,
            strategy: request.strategy
          }
        })
      });
      
      // 检查初始响应状态
      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          const errorResponse: ApiErrorResponse = {
            code: errorData.code || response.status,
            msg: errorData.msg || errorData.message || response.statusText || '翻译请求失败',
            success: false
          };
          throw new ApiError(errorResponse);
        } catch (parseError) {
          const errorResponse: ApiErrorResponse = {
            code: response.status,
            msg: response.statusText || '翻译请求失败',
            success: false
          };
          throw new ApiError(errorResponse);
        }
      }
      
      const reader = response.body?.getReader();
      if (!reader) {
        const errorResponse: ApiErrorResponse = {
          code: 500,
          msg: '无法读取响应流',
          success: false
        };
        throw new ApiError(errorResponse);
      }
      
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          onComplete();
          break;
        }
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              onComplete();
              return;
            }
            
            try {
              const parsed = JSON.parse(data);
              
              // 检查流式响应中的错误
              if (parsed.error) {
                const errorResponse: ApiErrorResponse = {
                  code: parsed.error.code || 500,
                  msg: parsed.error.message || '流式传输中发生错误',
                  success: false
                };
                throw new ApiError(errorResponse);
              }
              
              const content = parsed.choices?.[0]?.messages?.[0]?.content?.text;
              if (content) {
                onChunk(content);
              }
            } catch (parseError) {
              if (parseError instanceof ApiError) {
                throw parseError;
              }
              // 忽略JSON解析错误，继续处理其他数据
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof ApiError) {
        onError(error);
      } else {
        // 处理网络错误等其他类型的错误
        const errorResponse: ApiErrorResponse = {
          code: 0,
          msg: `网络连接失败: ${(error as Error).message}`,
          success: false
        };
        onError(new ApiError(errorResponse));
      }
    }
  }
}