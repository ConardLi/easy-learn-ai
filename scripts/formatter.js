/**
 * Markdown 格式化工具
 * 将 JSON 数据格式化为美观的 Markdown 文档
 */

/**
 * 格式化单个链接
 * @param {Object} link - 链接对象 {text, url}
 * @returns {string} Markdown 链接
 */
function formatLink(link) {
    return `[${link.text}](${link.url})`;
}

/**
 * 格式化链接列表
 * @param {Array} links - 链接数组
 * @returns {string} 格式化后的链接字符串
 */
function formatLinks(links) {
    if (!links || links.length === 0) {
        return '';
    }

    const linkStrings = links.map(formatLink);
    return `  \n > 相关链接：${linkStrings.join('｜')}`;
}

/**
 * 格式化单个新闻条目
 * @param {Object} item - 新闻条目对象
 * @returns {string} 格式化后的 Markdown
 */
function formatItem(item) {
    const title = `##### ${item.title}  \n`;
    const content = item.content;
    const links = formatLinks(item.links);

    return `${title}${content}${links}  \n\n`;
}

/**
 * 格式化单个分类
 * @param {Object} category - 分类对象
 * @returns {string} 格式化后的 Markdown
 */
function formatCategory(category) {
    const categoryTitle = `#### **${category.category}**  \n`;
    const items = category.items.map(formatItem).join('');

    return `${categoryTitle}${items} \n\n ---  \n\n`;
}

/**
 * 将 JSON 数据格式化为 Markdown
 * @param {Array} data - 日报数据数组
 * @returns {string} 格式化后的 Markdown 内容
 */
function formatToMarkdown(data) {
    if (!Array.isArray(data)) {
        throw new Error('数据格式错误：期望一个数组');
    }

    // 格式化所有分类
    const categories = data.map(formatCategory);

    // 在分类之间添加空行
    const content = categories.join('\n');

    // 添加结尾分隔符
    return `${content}---  \n`;
}

/**
 * 验证单个链接
 * @param {Object} link - 链接对象
 * @param {string} categoryName - 分类名称
 * @param {string} itemTitle - 条目标题
 * @param {number} linkIndex - 链接索引
 * @returns {boolean} 是否有效
 */
function validateLink(link, categoryName, itemTitle, linkIndex) {
    if (!link.text || !link.url) {
        console.error(`❌ 分类 "${categoryName}" 的条目 "${itemTitle}" 的链接 ${linkIndex} 缺少 text 或 url`);
        return false;
    }
    return true;
}

/**
 * 验证单个新闻条目
 * @param {Object} item - 新闻条目对象
 * @param {string} categoryName - 分类名称
 * @param {number} itemIndex - 条目索引
 * @returns {boolean} 是否有效
 */
function validateItem(item, categoryName, itemIndex) {
    // 验证标题
    if (!item.title || typeof item.title !== 'string') {
        console.error(`❌ 分类 "${categoryName}" 的条目 ${itemIndex} 缺少有效的 title`);
        return false;
    }

    // 验证内容
    if (!item.content || typeof item.content !== 'string') {
        console.error(`❌ 分类 "${categoryName}" 的条目 "${item.title}" 缺少有效的 content`);
        return false;
    }

    // 验证链接（可选）
    if (item.links) {
        if (!Array.isArray(item.links)) {
            console.error(`❌ 分类 "${categoryName}" 的条目 "${item.title}" 的 links 不是数组`);
            return false;
        }

        for (let k = 0; k < item.links.length; k++) {
            if (!validateLink(item.links[k], categoryName, item.title, k)) {
                return false;
            }
        }
    }

    return true;
}

/**
 * 验证单个分类
 * @param {Object} category - 分类对象
 * @param {number} categoryIndex - 分类索引
 * @returns {boolean} 是否有效
 */
function validateCategory(category, categoryIndex) {
    // 验证分类名称
    if (!category.category || typeof category.category !== 'string') {
        console.error(`❌ 分类 ${categoryIndex} 缺少有效的 category 字段`);
        return false;
    }

    // 验证 items 数组
    if (!Array.isArray(category.items)) {
        console.error(`❌ 分类 "${category.category}" 的 items 不是数组`);
        return false;
    }

    // 验证每个条目
    for (let j = 0; j < category.items.length; j++) {
        if (!validateItem(category.items[j], category.category, j)) {
            return false;
        }
    }

    return true;
}

/**
 * 验证 JSON 数据结构
 * @param {Array} data - 待验证的数据
 * @returns {boolean} 是否有效
 */
function validateData(data) {
    // 验证是否为数组
    if (!Array.isArray(data)) {
        console.error('❌ 数据格式错误：不是数组');
        return false;
    }

    // 验证每个分类
    for (let i = 0; i < data.length; i++) {
        if (!validateCategory(data[i], i)) {
            return false;
        }
    }

    return true;
}

module.exports = {
    formatToMarkdown,
    validateData
};
