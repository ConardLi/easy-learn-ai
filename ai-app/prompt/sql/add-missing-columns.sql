-- 为现有的prompts表添加缺失的列
-- 在Supabase SQL编辑器中执行此脚本

-- 添加AI生成相关的字段
ALTER TABLE public.prompts 
ADD COLUMN IF NOT EXISTS content_en TEXT,
ADD COLUMN IF NOT EXISTS interpretation TEXT,
ADD COLUMN IF NOT EXISTS ai_description TEXT,
ADD COLUMN IF NOT EXISTS ai_tags TEXT[] DEFAULT '{}';

-- 验证列是否添加成功
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'prompts' 
AND table_schema = 'public'
ORDER BY ordinal_position;