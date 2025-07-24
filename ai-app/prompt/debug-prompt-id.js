// 调试脚本：检查特定ID的提示词是否存在
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 从环境变量或配置文件中获取Supabase配置
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-key';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugPromptId() {
  const targetId = '67e2ba6b-1bd2-4efc-95ed-f5ba1ff752cd';
  
  console.log('=== 调试提示词ID存在性 ===');
  console.log('目标ID:', targetId);
  
  try {
    // 1. 检查所有提示词的ID
    console.log('\n1. 获取所有提示词ID...');
    const { data: allPrompts, error: allError } = await supabase
      .from('prompts')
      .select('id, name, is_active')
      .order('created_at', { ascending: false });
    
    if (allError) {
      console.error('查询所有提示词失败:', allError);
      return;
    }
    
    console.log(`数据库中共有 ${allPrompts?.length || 0} 个提示词`);
    
    if (allPrompts && allPrompts.length > 0) {
      console.log('前5个提示词:');
      allPrompts.slice(0, 5).forEach((prompt, index) => {
        console.log(`  ${index + 1}. ID: ${prompt.id}, 名称: ${prompt.name}, 激活: ${prompt.is_active}`);
      });
    }
    
    // 2. 检查目标ID是否存在（不考虑is_active）
    console.log('\n2. 查找目标ID（忽略is_active状态）...');
    const { data: targetPrompt, error: targetError } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', targetId);
    
    if (targetError) {
      console.error('查询目标ID失败:', targetError);
      return;
    }
    
    if (!targetPrompt || targetPrompt.length === 0) {
      console.log('❌ 目标ID不存在于数据库中');
    } else {
      console.log('✅ 找到目标ID:');
      console.log('  名称:', targetPrompt[0].name);
      console.log('  激活状态:', targetPrompt[0].is_active);
      console.log('  创建时间:', targetPrompt[0].created_at);
      console.log('  更新时间:', targetPrompt[0].updated_at);
    }
    
    // 3. 检查目标ID是否存在且激活
    console.log('\n3. 查找目标ID（仅激活状态）...');
    const { data: activePrompt, error: activeError } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', targetId)
      .eq('is_active', true);
    
    if (activeError) {
      console.error('查询激活状态的目标ID失败:', activeError);
      return;
    }
    
    if (!activePrompt || activePrompt.length === 0) {
      console.log('❌ 目标ID不存在或未激活');
    } else {
      console.log('✅ 目标ID存在且已激活');
    }
    
    // 4. 模拟更新操作（不使用.single()）
    console.log('\n4. 模拟更新操作（不使用.single()）...');
    const testUpdate = {
      name: '测试更新',
      updated_at: new Date().toISOString()
    };
    
    const { data: updateResult, error: updateError } = await supabase
      .from('prompts')
      .update(testUpdate)
      .eq('id', targetId)
      .select();
    
    if (updateError) {
      console.error('❌ 更新操作失败:', updateError);
    } else if (!updateResult || updateResult.length === 0) {
      console.log('❌ 更新操作返回0行，ID可能不存在');
    } else {
      console.log('✅ 更新操作成功，影响行数:', updateResult.length);
      
      // 回滚更新
      await supabase
        .from('prompts')
        .update({ name: targetPrompt[0]?.name || '原名称' })
        .eq('id', targetId);
      console.log('已回滚测试更新');
    }
    
    // 5. 模拟更新操作（使用.single()）
    console.log('\n5. 模拟更新操作（使用.single()）...');
    try {
      const { data: singleUpdateResult, error: singleUpdateError } = await supabase
        .from('prompts')
        .update({ name: '测试更新2' })
        .eq('id', targetId)
        .select()
        .single();
      
      if (singleUpdateError) {
        console.error('❌ 使用.single()的更新操作失败:', singleUpdateError);
      } else {
        console.log('✅ 使用.single()的更新操作成功');
        
        // 回滚更新
        await supabase
          .from('prompts')
          .update({ name: targetPrompt[0]?.name || '原名称' })
          .eq('id', targetId);
        console.log('已回滚测试更新');
      }
    } catch (error) {
      console.error('❌ 使用.single()时发生异常:', error);
    }
    
    // 6. 测试用户提供的完整数据
    console.log('\n6. 测试用户提供的完整数据...');
    const userProvidedData = {
      "name": "写作助手",
      "source": "Anthropic",
      "content": "你是一个专业的写作助手，请帮助用户改进文章的结构、语法和表达。",
      "ai_description": "这是一个专业的AI提示词，旨在帮助用户生成高质量、结构化的内容输出，适用于多种创作场景。",
      "tags": [
        "AI助手",
        "内容生成",
        "创意写作",
        "文本处理",
        "智能工具"
      ],
      "translations": {
        "en": "You are a professional AI assistant. Please help me generate high-quality content based on the following requirements..."
      },
      "category": "写作",
      "views": 150,
      "likes": 25,
      "shares": 8,
      "is_active": true,
      "interpretation": "This prompt is designed with a structured approach to guide AI in generating high-quality outputs. Key design elements include: 1. Clear task description 2. Specific format requirements 3. Relevant contextual information. The prompt effectively balances specificity with flexibility."
    };
    
    try {
      const { data: fullUpdateResult, error: fullUpdateError } = await supabase
        .from('prompts')
        .update({
          ...userProvidedData,
          updated_at: new Date().toISOString()
        })
        .eq('id', targetId)
        .select()
        .single();
      
      if (fullUpdateError) {
        console.error('❌ 使用完整用户数据的更新失败:', fullUpdateError);
      } else {
        console.log('✅ 使用完整用户数据的更新成功');
      }
    } catch (error) {
      console.error('❌ 使用完整用户数据时发生异常:', error);
    }
    
  } catch (error) {
    console.error('调试过程中发生错误:', error);
  }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  debugPromptId().then(() => {
    console.log('\n=== 调试完成 ===');
    process.exit(0);
  }).catch(error => {
    console.error('调试脚本执行失败:', error);
    process.exit(1);
  });
}

export { debugPromptId };