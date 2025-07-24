-- 修复RLS策略以允许管理员操作
-- 在Supabase SQL编辑器中执行此脚本

-- 1. 删除现有的策略
DROP POLICY IF EXISTS "Allow public read access to active prompts" ON public.prompts;
DROP POLICY IF EXISTS "Allow authenticated users full access to prompts" ON public.prompts;
DROP POLICY IF EXISTS "Allow anonymous read access to admins" ON public.admins;
DROP POLICY IF EXISTS "Allow authenticated users modify access to admins" ON public.admins;

-- 2. 创建新的策略
-- prompts表的策略：所有人可以读取活跃的提示词
CREATE POLICY "Allow public read access to active prompts" ON public.prompts
    FOR SELECT USING (is_active = true);

-- prompts表的策略：允许所有操作（临时解决方案）
CREATE POLICY "Allow all operations on prompts" ON public.prompts
    FOR ALL USING (true);

-- admins表的策略：允许所有操作
CREATE POLICY "Allow all operations on admins" ON public.admins
    FOR ALL USING (true);

-- 3. 验证策略是否生效
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('prompts', 'admins')
ORDER BY tablename, policyname;