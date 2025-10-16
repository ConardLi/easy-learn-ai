const axios = require('axios');
const env = require('dotenv').config();



/**
 * 调用 LLM API 生成内容
 * @param {string} prompt - 提示词内容
 * @param {string} modelId - 模型 ID (可选)
 * @returns {Promise<string>} LLM 生成的内容
 */
async function llmCall(prompt, modelId = null) {
    try {
        // 从环境变量获取配置
        const apiKey = process.env.LLM_API_KEY;
        const apiUrl = process.env.LLM_API_URL;
        const model = modelId || process.env.LLM_MODEL_ID;

        // 验证必需的环境变量
        if (!apiKey) {
            throw new Error('缺少环境变量 LLM_API_KEY，请在 .env 文件中配置');
        }

        // 构建请求配置
        const config = {
            method: 'post',
            url: apiUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            data: {
                model: model,
                messages: [
                    {
                        role: 'user',
                        content: [
                            { type: 'text', text: prompt }
                        ]
                    }
                ],
                max_tokens: 8192
            },
            timeout: 1200000 // 2分钟超时
        };

        // 发送请求并返回结果
        const response = await axios(config);

        if (!response.data?.choices?.[0]?.message?.content) {
            throw new Error('API 返回数据格式异常');
        }

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error('\n❌ LLM API 调用失败:', error.message);

        if (error.response) {
            console.error('   状态码:', error.response.status);
            console.error('   错误详情:', JSON.stringify(error.response.data, null, 2));
        } else if (error.code === 'ECONNABORTED') {
            console.error('   请求超时，请检查网络连接或增加超时时间');
        }

        throw error;
    }
}

// 导出函数供其他模块使用
module.exports = llmCall;