import { supabase } from "../lib/supabase";
import {
  Prompt,
  Admin,
  SearchFilters,
  LoginRequest,
  GenerateRequest,
  PaginatedResponse,
} from "../types";
import OpenAI from "openai";

// C端API - 提示词相关
export const promptsApi = {
  // 获取提示词列表
  getPrompts: async (
    filters: SearchFilters
  ): Promise<PaginatedResponse<Prompt>> => {
    let query = supabase
      .from("prompts")
      .select("*", { count: "exact" })
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    // 应用搜索过滤器
    if (filters.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,ai_description.ilike.%${filters.search}%,content.ilike.%${filters.search}%`
      );
    }

    if (filters.source) {
      query = query.eq("source", filters.source);
    }

    if (filters.tags && filters.tags.length > 0) {
      query = query.contains("tags", filters.tags);
    }

    // 分页
    const from = (filters.page - 1) * filters.pageSize;
    const to = from + filters.pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return {
      data: data || [],
      total: count || 0,
      page: filters.page,
      pageSize: filters.pageSize,
      totalPages: Math.ceil((count || 0) / filters.pageSize),
    };
  },

  // 获取提示词详情
  getPromptById: async (id: string): Promise<Prompt> => {
    const { data, error } = await supabase
      .from("prompts")
      .select("*")
      .eq("id", id)
      .eq("is_active", true)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("提示词不存在");
    }

    return data;
  },

  // 获取所有标签
  getTags: async (): Promise<string[]> => {
    const { data, error } = await supabase
      .from("prompts")
      .select("tags")
      .eq("is_active", true);

    if (error) {
      throw new Error(error.message);
    }

    // 提取所有唯一标签
    const allTags = data?.flatMap((item) => item.tags || []) || [];
    return [...new Set(allTags)];
  },

  // 获取所有来源
  getSources: async (): Promise<string[]> => {
    const { data, error } = await supabase
      .from("prompts")
      .select("source")
      .eq("is_active", true);

    if (error) {
      throw new Error(error.message);
    }

    // 提取所有唯一来源
    const allSources = data?.map((item) => item.source).filter(Boolean) || [];
    return [...new Set(allSources)];
  },
};

// B端API - 管理员相关
export const adminApi = {
  // 管理员登录
  async login(
    credentials: LoginRequest
  ): Promise<{ token: string; admin: Admin }> {
    console.log("登录尝试:", credentials.username);

    // 首先测试数据库连接和表结构
    console.log("测试数据库连接...");
    try {
      const { data: allAdmins, error: allError } = await supabase
        .from("admins")
        .select("*");

      console.log("所有管理员数据:", allAdmins);
      console.log("查询错误:", allError);

      if (allError) {
        console.error("数据库查询错误:", allError);
        throw new Error("数据库连接失败: " + allError.message);
      }

      if (!allAdmins || allAdmins.length === 0) {
        console.log("admins表为空，没有任何管理员数据");
        throw new Error("系统未初始化，请联系管理员");
      }

      console.log(`找到 ${allAdmins.length} 个管理员记录`);
    } catch (error) {
      console.error("数据库测试失败:", error);
      throw error;
    }

    // 查询特定用户名
    const { data: adminDataArray, error: adminError } = await supabase
      .from("admins")
      .select("*")
      .eq("username", credentials.username);

    console.log("查询结果:", { adminDataArray, adminError });

    if (adminError) {
      console.error("查询用户失败:", adminError);
      throw new Error("查询失败: " + adminError.message);
    }

    if (!adminDataArray || adminDataArray.length === 0) {
      console.log("用户名不存在");
      throw new Error("用户名或密码错误");
    }

    const adminData = adminDataArray[0];

    // 验证密码（明文比较）
    if (adminData.password !== credentials.password) {
      console.log("密码不匹配:", {
        stored: adminData.password,
        input: credentials.password,
      });
      throw new Error("用户名或密码错误");
    }

    console.log("登录成功");

    // 更新最后登录时间
    await supabase
      .from("admins")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", adminData.id);

    // 生成简单的token（实际项目中应该使用JWT）
    const token = btoa(
      JSON.stringify({
        id: adminData.id,
        username: adminData.username,
        timestamp: Date.now(),
      })
    );

    return {
      token,
      admin: adminData,
    };
  },

  // 验证token
  async verifyToken(token: string): Promise<Admin> {
    try {
      // 解析简单的token
      const decoded = JSON.parse(atob(token));

      // 检查token是否过期（24小时）
      if (Date.now() - decoded.timestamp > 24 * 60 * 60 * 1000) {
        throw new Error("Token已过期");
      }

      const { data: adminData, error: adminError } = await supabase
        .from("admins")
        .select("*")
        .eq("id", decoded.id)
        .single();

      if (adminError || !adminData) {
        throw new Error("无管理员权限");
      }

      return adminData;
    } catch (error) {
      throw new Error("无效的token");
    }
  },

  // 管理端获取提示词列表
  async getPromptsForAdmin(): Promise<Prompt[]> {
    const { data, error } = await supabase
      .from("prompts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  },

  // 创建提示词
  async createPrompt(
    prompt: Omit<Prompt, "id" | "created_at" | "updated_at">
  ): Promise<Prompt> {
    const { data, error } = await supabase
      .from("prompts")
      .insert({
        ...prompt,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  // 更新提示词
  async updatePrompt(id: string, updates: Partial<Prompt>): Promise<Prompt> {
    console.log("updatePrompt 调用:", { id, updates });

    // 首先检查ID是否存在
    const { data: existingPrompt, error: checkError } = await supabase
      .from("prompts")
      .select("*")
      .eq("id", id)
      .single();

    if (checkError) {
      console.error("检查提示词存在性失败:", checkError);
      throw new Error(`提示词不存在: ${checkError.message}`);
    }

    if (!existingPrompt) {
      console.error("提示词不存在:", id);
      throw new Error("提示词不存在");
    }

    console.log("找到现有提示词:", existingPrompt.name);

    // 过滤掉不属于数据库字段的属性
    const { targetLanguage, ...validUpdates } = updates as any;

    console.log("有效的更新数据:", validUpdates);

    const { data, error } = await supabase
      .from("prompts")
      .update({
        ...validUpdates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    console.log("更新结果:", { data, error });

    if (error) {
      console.error("更新操作失败:", error);
      throw new Error(`更新失败: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.error("更新操作返回0行");
      throw new Error("更新失败：可能是权限问题或数据冲突");
    }

    return data[0];
  },

  // 删除提示词
  async deletePrompt(id: string): Promise<void> {
    const { error } = await supabase.from("prompts").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  },

  // AI生成功能
  async generateContent(
    request: GenerateRequest
  ): Promise<{ result: string | string[] }> {
    try {
      // 获取模型配置
      const modelConfigStorage = localStorage.getItem("model-config-storage");
      if (!modelConfigStorage) {
        throw new Error("请先配置AI模型");
      }

      const parsedStorage = JSON.parse(modelConfigStorage);
      const activeConfig = parsedStorage.state?.activeConfig;

      if (!activeConfig || !activeConfig.apiKey || !activeConfig.baseUrl) {
        throw new Error("请先配置AI模型");
      }

      // 初始化OpenAI客户端
      const openai = new OpenAI({
        apiKey: activeConfig.apiKey,
        baseURL: activeConfig.baseUrl,
        dangerouslyAllowBrowser: true,
      });

      // 根据生成类型执行不同的任务
      switch (request.type) {
        case "description":
          return await this.generateDescription(openai, request, activeConfig);
        case "tags":
          return await this.generateTags(openai, request, activeConfig);
        case "translation":
          return await this.generateTranslation(openai, request, activeConfig);
        case "analysis":
          return await this.generateAnalysis(openai, request, activeConfig);
        case "all":
          return await this.generateAll(openai, request, activeConfig);
        case "structured":
          return await this.generateStructuredContent(openai, request, activeConfig);
        default:
          throw new Error("不支持的生成类型");
      }
    } catch (error) {
      throw new Error(
        `AI生成失败: ${error instanceof Error ? error.message : "未知错误"}`
      );
    }
  },

  // 生成描述
  async generateDescription(
    openai: OpenAI,
    request: GenerateRequest,
    config: any
  ): Promise<{ result: string }> {
    const response = await openai.chat.completions.create({
      model: config.model || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "你是一个专业的提示词分析师，擅长为AI提示词生成简洁、准确的描述。",
        },
        {
          role: "user",
          content: `请为以下提示词生成一个简洁的描述（50-100字）：\n\n${request.content}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return {
      result: response.choices[0]?.message?.content || "生成失败",
    };
  },

  // 生成标签
  async generateTags(
    openai: OpenAI,
    request: GenerateRequest,
    config: any
  ): Promise<{ result: string[] }> {
    const response = await openai.chat.completions.create({
      model: config.model || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "你是一个专业的提示词分析师，擅长为AI提示词生成相关标签。请返回3-5个最相关的标签，用逗号分隔。",
        },
        {
          role: "user",
          content: `请为以下提示词生成3-5个相关标签：\n\n${request.content}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 100,
    });

    const tagsText = response.choices[0]?.message?.content || "";
    const tags = tagsText
      .split(/[,，、]/)
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    return {
      result: tags.slice(0, 5), // 最多返回5个标签
    };
  },

  // 生成翻译
  async generateTranslation(
    openai: OpenAI,
    request: GenerateRequest,
    config: any
  ): Promise<{ result: string }> {
    const languageMap: { [key: string]: string } = {
      zh: "中文",
      en: "English",
      ja: "Japanese",
      ko: "Korean",
      fr: "French",
      de: "German",
      es: "Spanish",
      ru: "Russian",
      ar: "Arabic",
    };

    const targetLanguage =
      languageMap[request.targetLanguage || "en"] || "English";

    const response = await openai.chat.completions.create({
      model: config.model || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a professional translator specializing in AI prompts. Translate the given prompt to ${targetLanguage} while maintaining its effectiveness and intent.`,
        },
        {
          role: "user",
          content: `Please translate the following AI prompt to ${targetLanguage}:\n\n${request.content}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 8000,
    });

    return {
      result: response.choices[0]?.message?.content || "翻译失败",
    };
  },

  // 生成分析
  async generateAnalysis(
    openai: OpenAI,
    request: GenerateRequest,
    config: any
  ): Promise<{ result: string }> {
    const response = await openai.chat.completions.create({
      model: config.model || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
你是一个专业的提示词分析专家

请从以下维度进行全面剖析，重点挖掘其设计亮点、有效策略及可迁移经验，助力学习和复用优质提示词的设计逻辑。

#### 核心亮点拆解
1. **核心意图的精准传递**
   - 提示词如何清晰表达核心任务？（如：是否用一句话直接点明“生成XX内容”“解决XX问题”）
   - 它通过哪些表述避免了意图模糊？（如：使用具体动词“列举”“分析”“设计”，而非笼统的“写一篇”“说一下”）
   - 目标的细化程度：是否将核心任务拆解为可执行的子目标？（如：“写一篇旅行攻略”细化为“包含交通、住宿、景点3部分，每部分附2个推荐”）

2. **关键信息的高效整合**
   - 提示词包含哪些必要的关键信息？（如：背景前提、受众特征、输出用途等）
   - 这些信息如何服务于核心任务？（如：明确“受众是中学生”，引导AI用通俗语言解释知识）
   - 信息的“度”：是否做到“不冗余、不缺漏”？（如：不多余描述无关细节，也不遗漏影响输出的关键前提）

3. **结构设计的逻辑性**
   - 提示词采用了怎样的结构？（如：“背景→任务→要求”的递进式、“总指令+分点细化”的清晰式、“问题引导+示例参考”的启发式等）
   - 结构如何增强AI的理解效率？（如：分点列项让指令更易拆解，先背景后任务让AI循序渐进接收信息）
   - 各部分内容（如任务、要求、补充说明）的衔接是否自然？是否有过渡性表述让逻辑更流畅？

4. **约束与引导的平衡技巧**
   - 设定了哪些有效的约束条件？（如：字数范围、风格限定“幽默/专业”、格式要求“分点/表格”等）
   - 这些约束如何避免AI输出偏离方向？（如：限定“100字以内”防止内容冗长，指定“给职场新人看”确保语言接地气）
   - 约束是否“灵活而非僵化”？（如：既限定范围，又给AI留创意空间，避免过度限制导致输出生硬）

5. **语言表达的精准性**
   - 用词如何做到“准确无歧义”？（如：用“议论文”而非模糊的“文章”，用“3个论点”而非“几个论点”）
   - 是否使用了增强指令性的词汇？（如：“必须包含”“重点突出”“优先考虑”等，强化AI对关键要求的关注）
   - 表述是否简洁有力？是否用最少的文字传递最关键的信息？

6. **引导AI的“隐性技巧”**
   - 是否包含“示例引导”？（如：给出1个小例子，让AI明确输出方向，如“类似这样的风格：‘春天像个调皮的孩子，把花儿叫醒了’”）
   - 是否用“结果预判”降低AI理解成本？（如：“输出后，读者会清楚XX步骤”，引导AI从结果倒推输出）
   - 是否有“场景代入”设计？（如：“假设你是XX岗位的人，面对XX问题，你会如何解决”，让AI更快进入角色）

7. **应对“潜在偏差”的预设方案**
   - 提示词是否提前规避了可能的理解偏差？（如：通过“注意：此处的XX指XX，而非XX”消除歧义）
   - 是否包含“兜底要求”？（如：“若有不确定的信息，优先以XX为标准”“输出前检查是否符合XX条件”）


#### 可复用经验总结
1. 该提示词最值得借鉴的3个设计技巧：
   - 技巧1：[如：用“分点细化任务+示例参考”让AI明确输出框架]
   - 技巧2：[如：通过“受众特征+输出用途”精准定位内容风格]
   - 技巧3：[如：用“具体动词+量化指标”让任务从“模糊”变“可执行”]

2. 这些技巧可迁移到哪些场景？（如：适用于所有需要明确输出格式的提示词设计，尤其适合知识科普、方案撰写类场景）

3. 一句话总结该提示词的“优秀核心”：[如：用清晰的结构、精准的约束和场景化引导，让AI高效理解并完成任务]

通过以上维度，可系统提炼优秀提示词的设计逻辑和实用技巧，快速掌握“如何让提示词更有效的关键方法”。
            `,
        },
        {
          role: "user",
          content: `请分析以下提示词：\n\n${request.content}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 8000,
    });

    return {
      result: response.choices[0]?.message?.content || "分析失败",
    };
  },

  // 并行生成所有内容
  async generateAll(
    openai: OpenAI,
    request: GenerateRequest,
    config: any
  ): Promise<{ result: { description: string; tags: string[]; translation: string; analysis: string } }> {
    // 并行执行三个任务
    const [descriptionResult, translationResult, analysisResult] =
      await Promise.all([
        this.generateStructuredContent(openai, request, config),
        request.targetLanguage
          ? this.generateTranslation(openai, request, config)
          : Promise.resolve({ result: "" }),
        this.generateAnalysis(openai, request, config),
      ]);

    return {
      result: {
        description: descriptionResult.result.description,
        tags: descriptionResult.result.tags,
        translation: translationResult.result,
        analysis: analysisResult.result,
      },
    };
  },

  // 生成结构化内容（标签+描述）
  async generateStructuredContent(
    openai: OpenAI,
    request: GenerateRequest,
    config: any
  ): Promise<{ result: { description: string; tags: string[] } }> {
    const response = await openai.chat.completions.create({
      model: config.model || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `你是一个专业的提示词分析师。 请分析给定的提示词并返回JSON格式的结果，包含：
1. description: 简洁的描述（50-100字，使用中文）
2. tags: 3-5个相关标签的数组

请确保返回有效的JSON格式。`,
        },
        {
          role: "user",
          content: `请分析以下提示词：\n\n${request.content}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    try {
      const content = response.choices[0]?.message?.content || "{}";
      const parsed = JSON.parse(content);

      return {
        result: {
          description: parsed.description || "生成失败",
          tags: Array.isArray(parsed.tags) ? parsed.tags : [],
        },
      };
    } catch (error) {
      // 如果JSON解析失败，返回默认值
      return {
        result: {
          description: "生成失败",
          tags: [],
        },
      };
    }
  },

  // 测试模型连接
  async testModelConnection(apiKey: string, baseUrl: string): Promise<boolean> {
    try {
      // 这里应该调用实际的AI API进行连接测试
      // 例如发送一个简单的请求来验证API密钥和连接

      // 模拟API测试
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 简单的验证逻辑
      if (!apiKey || apiKey.length < 10) {
        return false;
      }

      if (!baseUrl || !baseUrl.startsWith("http")) {
        return false;
      }

      return true;
    } catch (error) {
      console.error("模型连接测试失败:", error);
      return false;
    }
  },
};
