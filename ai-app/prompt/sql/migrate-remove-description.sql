-- 移除description字段，只保留ai_description字段
-- 在Supabase SQL编辑器中执行此脚本

-- 1. 如果ai_description字段不存在，先添加它
ALTER TABLE public.prompts 
ADD COLUMN IF NOT EXISTS ai_description TEXT;

-- 2. 将现有的description数据迁移到ai_description（如果ai_description为空）
UPDATE public.prompts 
SET ai_description = description 
WHERE ai_description IS NULL OR ai_description = '';

-- 3. 删除description字段
ALTER TABLE public.prompts 
DROP COLUMN IF EXISTS description;

-- 4. 确保ai_description字段不为空的约束（可选）
-- ALTER TABLE public.prompts 
-- ALTER COLUMN ai_description SET NOT NULL;

SELECT 'Migration completed: description field removed, ai_description field retained' as status;