-- 创建提示词网站所需的数据库表
-- 在Supabase SQL编辑器中执行此脚本

-- 1. 创建prompts表
CREATE TABLE IF NOT EXISTS public.prompts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    source VARCHAR(100),
    content TEXT NOT NULL,

    translations JSONB DEFAULT '{}'::jsonb,
    interpretation TEXT,
    ai_description TEXT,
    ai_tags TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    category VARCHAR(100),
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建admins表
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. 为prompts表添加更新时间触发器
CREATE TRIGGER update_prompts_updated_at
    BEFORE UPDATE ON public.prompts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 5. 为admins表添加更新时间触发器
CREATE TRIGGER update_admins_updated_at
    BEFORE UPDATE ON public.admins
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 6. 插入初始管理员账户（密码：admin123）
INSERT INTO public.admins (username, password, email, role) VALUES
('admin', 'admin123', 'admin@example.com', 'admin')
ON CONFLICT (username) DO NOTHING;

-- 7. 插入示例提示词数据
INSERT INTO public.prompts (name, source, content, ai_description, tags, category, views, likes, shares) VALUES
('写作助手', 'ChatGPT', '你是一个专业的写作助手，请帮助用户改进文章的结构、语法和表达。', '帮助用户提升写作质量的AI助手', ARRAY['写作', '助手', '文章'], '写作', 150, 25, 8),
('代码审查', 'GitHub Copilot', '请仔细审查以下代码，指出潜在的问题、改进建议和最佳实践。', '专业的代码审查助手，提供详细的代码分析', ARRAY['编程', '代码审查', '开发'], '编程', 320, 45, 12),
('英语翻译', 'DeepL', '请将以下文本翻译成地道的英语，保持原意的同时使表达更加自然。', '高质量的中英文翻译助手', ARRAY['翻译', '英语', '语言'], '翻译', 280, 38, 15),
('数据分析', 'Claude', '作为数据分析专家，请分析以下数据并提供洞察和建议。', '专业的数据分析和可视化助手', ARRAY['数据分析', '统计', '可视化'], '分析', 195, 32, 6),
('创意写作', 'GPT-4', '发挥你的创造力，根据给定的主题或关键词创作一个引人入胜的故事。', '激发创意灵感的写作助手', ARRAY['创意', '故事', '写作'], '创作', 420, 67, 23)
ON CONFLICT (id) DO NOTHING;

-- 8. 启用行级安全策略（RLS）
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- 9. 创建RLS策略
-- prompts表的策略：所有人可以读取活跃的提示词
CREATE POLICY "Allow public read access to active prompts" ON public.prompts
    FOR SELECT USING (is_active = true);

-- prompts表的策略：认证用户可以进行所有操作
CREATE POLICY "Allow authenticated users full access to prompts" ON public.prompts
    FOR ALL USING (auth.role() = 'authenticated');

-- admins表的策略：允许匿名用户查询（用于登录验证）
CREATE POLICY "Allow anonymous read access to admins" ON public.admins
    FOR SELECT USING (true);

-- admins表的策略：只有认证用户可以进行修改操作
CREATE POLICY "Allow authenticated users modify access to admins" ON public.admins
    FOR INSERT, UPDATE, DELETE USING (auth.role() = 'authenticated');

-- 10. 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_prompts_is_active ON public.prompts(is_active);
CREATE INDEX IF NOT EXISTS idx_prompts_category ON public.prompts(category);
CREATE INDEX IF NOT EXISTS idx_prompts_tags ON public.prompts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_prompts_created_at ON public.prompts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admins_username ON public.admins(username);
CREATE INDEX IF NOT EXISTS idx_admins_email ON public.admins(email);