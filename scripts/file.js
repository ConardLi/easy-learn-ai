const fs = require('fs');
const path = require('path');
const llmCall = require('./llm');
const { formatToMarkdown, validateData } = require('./formatter');

// 从环境变量获取配置
const OUTPUT_DIR = path.join(__dirname, '../data/daily/md');


/**
 * 从命令行参数获取日期
 * @returns {string} 格式化的日期字符串 (YYYY-MM-DD)
 */
function getDateFromArgs() {
    // 优先从命令行参数获取
    const args = process.argv.slice(2);
    if (args.length > 0) {
        return args[0];
    }
    
    // 其次从环境变量获取
    if (process.env.DATE) {
        return process.env.DATE;
    }
    
    // 最后使用当前日期
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * 获取当前日期的文件名
 * @returns {string} 格式化的日期字符串 (YYYY-MM-DD)
 */
function getDateFileName() {
    return `${getDateFromArgs()}.md`;
}

/**
 * 确保目录存在
 * @param {string} dirPath - 目录路径
 */
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`✓ 创建目录: ${dirPath}`);
    }
}

/**
 * 从 LLM 返回的内容中提取 JSON
 * @param {string} content - LLM 返回的内容
 * @returns {Object|null} 解析后的 JSON 对象
 */
function extractJSON(content) {
    try {
        // 尝试直接解析
        return JSON.parse(content);
    } catch (e) {
        // 尝试提取 JSON 代码块
        const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) ||
            content.match(/```\s*([\s\S]*?)\s*```/) ||
            content.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
            try {
                return JSON.parse(jsonMatch[1] || jsonMatch[0]);
            } catch (e2) {
                console.error('JSON 解析失败:', e2.message);
                return null;
            }
        }
        return null;
    }
}

/**
 * 更新 home.json 文件
 * @param {Object} newEntry - 新的日报条目
 */
function updateHomeJson(newEntry) {
    const homeJsonPath = path.join(__dirname, '../src/utils/dailyData.json');

    let homeData = [];

    // 读取现有数据
    if (fs.existsSync(homeJsonPath)) {
        const content = fs.readFileSync(homeJsonPath, 'utf-8');
        homeData = JSON.parse(content);
    }

    // 检查是否已存在相同日期的条目
    const existingIndex = homeData.findIndex(item => item.date === newEntry.date);

    if (existingIndex !== -1) {
        // 更新现有条目
        homeData[existingIndex] = newEntry;
        console.log(`✓ 更新已存在的日期条目: ${newEntry.date}`);
    } else {
        // 添加新条目到数组开头
        homeData.unshift(newEntry);
        console.log(`✓ 添加新条目: ${newEntry.date}`);
    }

    // 写入文件
    fs.writeFileSync(homeJsonPath, JSON.stringify(homeData, null, 4), 'utf-8');
}

/**
 * 主函数
 */
async function main() {
    try {
        console.log('========================================');
        console.log('🚀 开始生成 AI 日报...');
        console.log('========================================\n');

        // 获取日期
        const date = getDateFromArgs();
        console.log(`📅 使用日期: ${date}\n`);

        // 根据日期读取对应的 news 文件
        const newsFilePath = path.join(__dirname, 'news', `${date}.json`);
        
        if (!fs.existsSync(newsFilePath)) {
            throw new Error(`找不到文件: ${newsFilePath}`);
        }
        
        console.log(`📄 读取文件: ${newsFilePath}\n`);
        const json = fs.readFileSync(newsFilePath, 'utf-8');
        const html = JSON.parse(json).text;

        // 3. 读取提示词
        console.log('📝 正在读取提示词...');
        const promptPath = path.join(__dirname, 'prompt.md');
        const prompt = fs.readFileSync(promptPath, 'utf-8');
        console.log(`✓ 提示词读取成功\n`);

        // 4. 调用 LLM 生成结构化数据
        console.log('🤖 正在调用 LLM 生成结构化数据...');
        console.log('   (这可能需要一些时间，请耐心等待...)');
        const llmResponse = await llmCall(prompt + html);
        console.log(`✓ LLM 响应成功，长度: ${llmResponse.length} 字符\n`);

        // 5. 解析 JSON 数据
        console.log('📊 正在解析 JSON 数据...');
        const jsonData = extractJSON(llmResponse);

        if (!jsonData) {
            console.log(llmResponse);
            throw new Error('无法解析 LLM 返回的 JSON 数据');
        }

        // 验证数据结构
        if (!validateData(jsonData)) {
            throw new Error('JSON 数据结构验证失败');
        }

        console.log(`✓ JSON 数据解析成功，包含 ${jsonData.length} 个分类\n`);

        // 6. 格式化为 Markdown
        console.log('📝 正在格式化为 Markdown...');
        const markdown = formatToMarkdown(jsonData);
        console.log(`✓ Markdown 格式化成功，长度: ${markdown.length} 字符\n`);

        // 7. 保存日报到文件
        console.log('💾 正在保存日报文件...');
        ensureDirectoryExists(OUTPUT_DIR);

        const fileName = getDateFileName();
        const outputPath = path.join(OUTPUT_DIR, fileName);
        fs.writeFileSync(outputPath, markdown, 'utf-8');
        console.log(`✓ 日报文件已保存: ${outputPath}\n`);

        // 8. 生成标题和标签
        console.log('🏷️  正在生成标题和标签...');
        const prompt2Path = path.join(__dirname, 'prompt2.md');
        const prompt2 = fs.readFileSync(prompt2Path, 'utf-8');
        const titleAndTagsResponse = await llmCall(markdown + '\n\n' + prompt2);
        console.log(`✓ 标题和标签生成成功\n`);

        // 9. 解析并更新 home.json
        console.log('📋 正在更新 home.json...');
        const titleAndTags = extractJSON(titleAndTagsResponse);

        if (titleAndTags && titleAndTags.title && titleAndTags.tags) {
            // 确保日期格式正确
            titleAndTags.date = fileName.replace('.md', '');

            updateHomeJson(titleAndTags);
            console.log(`✓ home.json 更新成功`);
            console.log(`   标题: ${titleAndTags.title}`);
            console.log(`   标签: ${titleAndTags.tags.join(', ')}\n`);
        } else {
            console.warn('⚠ 无法解析标题和标签，跳过 home.json 更新\n');
        }

        console.log('========================================');
        console.log('✅ AI 日报生成完成！');
        console.log('========================================');

    } catch (error) {
        console.error('\n❌ 错误:', error.message);
        if (error.stack) {
            console.error('\n堆栈信息:', error.stack);
        }
        process.exit(1);
    }
}

// 执行主函数
main();