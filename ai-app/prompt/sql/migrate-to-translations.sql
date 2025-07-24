-- 迁移脚本：将content_en字段迁移到translations JSONB字段
-- 执行前请备份数据库

-- 1. 添加新的translations字段
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS translations JSONB DEFAULT '{}'::jsonb;

-- 2. 将现有的content_en数据迁移到translations字段中
UPDATE prompts 
SET translations = CASE 
    WHEN content_en IS NOT NULL AND content_en != '' 
    THEN jsonb_build_object('en', content_en)
    ELSE '{}'::jsonb
END
WHERE content_en IS NOT NULL;

-- 3. 删除旧的content_en字段（可选，建议先测试后再执行）
-- ALTER TABLE prompts DROP COLUMN IF EXISTS content_en;

-- 验证迁移结果
SELECT id, name, 
       content_en as old_content_en, 
       translations as new_translations 
FROM prompts 
WHERE content_en IS NOT NULL 
LIMIT 5;