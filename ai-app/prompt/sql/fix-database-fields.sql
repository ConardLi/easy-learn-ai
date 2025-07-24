-- 修复数据库字段问题的迁移脚本
-- 在Supabase SQL编辑器中执行此脚本

-- 1. 确保所有必要字段存在
ALTER TABLE public.prompts 
ADD COLUMN IF NOT EXISTS interpretation TEXT,
ADD COLUMN IF NOT EXISTS ai_description TEXT,
ADD COLUMN IF NOT EXISTS ai_tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS translations JSONB DEFAULT '{}'::jsonb;

-- 2. 如果存在重复的translations字段，删除多余的
-- 注意：这个操作需要根据实际情况调整

-- 3. 更新现有数据，将description字段的数据迁移到ai_description字段
-- 如果存在description字段且ai_description为空
DO $$
BEGIN
    -- 检查是否存在description列
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'prompts' AND column_name = 'description') THEN
        -- 将description的数据复制到ai_description
        UPDATE public.prompts 
        SET ai_description = description 
        WHERE ai_description IS NULL OR ai_description = '';
        
        -- 删除description列
        ALTER TABLE public.prompts DROP COLUMN IF EXISTS description;
    END IF;
END $$;

-- 4. 确保索引存在
CREATE INDEX IF NOT EXISTS idx_prompts_ai_description ON public.prompts(ai_description);
CREATE INDEX IF NOT EXISTS idx_prompts_interpretation ON public.prompts(interpretation);

-- 5. 验证表结构
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'prompts' 
ORDER BY ordinal_position;