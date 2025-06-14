/**
 * 格式工具函数，提供不同数值格式的详细信息和二进制表示
 */
export function getFormatDetails(format: string) {
  switch (format) {
    case 'FP32':
      return {
        explanation: `
          <p><strong>FP32（32位单精度浮点数）</strong>用1位符号位、8位指数和23位尾数来表示π值。</p>
          <ol>
            <li><strong>符号位</strong>：0（正数）</li>
            <li><strong>转换为二进制科学计数法</strong>：
              <ul>
                <li>整数部分3 → 二进制11</li>
                <li>小数部分0.1415926转为二进制约为0.0010010000111111011010101</li>
                <li>合并后为11.00100100001111110110101</li>
                <li>规格化为1.100100100001111110110101 × 2<sup>1</sup></li>
              </ul>
            </li>
            <li><strong>指数计算</strong>：实际指数1，加上偏置值127，得到128 → 二进制10000000</li>
            <li><strong>尾数</strong>：去掉最高位的1，取后23位：10010010000111111011010</li>
          </ol>
        `,
        actualValue: '3.1415925414',
        error: '≈0.0000001',
        keyPoints: [
          'FP32能存储7~8位十进制精度，几乎可以精确表示π值',
          '指数范围大(-126到127)，可表示非常大或非常小的数',
          '在深度学习中被视为"完整精度"标准',
          '占用存储空间最大(32位)'
        ]
      };
    
    case 'FP16':
      return {
        explanation: `
          <p><strong>FP16（16位半精度浮点数）</strong>只有1位符号位、5位指数和10位尾数。</p>
          <ol>
            <li><strong>符号位</strong>：0（正数）</li>
            <li><strong>指数</strong>：偏置为15，实际指数1 + 15 = 16 → 二进制10000</li>
            <li><strong>尾数</strong>：截取FP32尾数的前10位：1001001000</li>
          </ol>
          <p><strong>精度损失</strong>：尾数从23位减少到10位，相当于把"1.100100100001111110110101"近似为"1.1001001000"，丢失了精度。</p>
        `,
        actualValue: '3.140625',
        error: '≈0.0009676',
        keyPoints: [
          'FP16只能精确表示3~4位十进制数字',
          '尾数位数从23位剧减到10位，精度明显下降',
          '占用空间只有FP32的一半',
          '适合对精度要求不高但需要节省内存的场景'
        ]
      };
    
    case 'BF16':
      return {
        explanation: `
          <p><strong>BF16（16位脑浮点）</strong>是Google开发的特殊16位格式，保留了FP32的指数结构（8位），但尾数只有7位。</p>
          <ol>
            <li><strong>符号位</strong>：0（正数）</li>
            <li><strong>指数</strong>：与FP32相同，8位，值为10000000</li>
            <li><strong>尾数</strong>：仅取FP32尾数的前7位：1001001</li>
          </ol>
          <p><strong>特点</strong>：BF16保留了FP32的指数范围，但尾数精度比FP16还低（只有7位），因此在表示小数时误差更大。</p>
        `,
        actualValue: '3.125',
        error: '≈0.0165926',
        keyPoints: [
          'BF16与FP32有相同的指数范围，因此能表示相同范围的数值',
          '尾数极短（仅7位），精度比FP16更低',
          '特别适合训练过程中的梯度计算，因为梯度范围变化大',
          '在TPU等AI加速器中广泛使用'
        ]
      };
    
    case 'INT8':
      return {
        explanation: `
          <p><strong>INT8（8位整数）</strong>无法直接存储小数，必须通过量化过程。</p>
          <ol>
            <li><strong>确定Scale</strong>：假设我们的数据范围是[0, 4]，使用无符号INT8（范围0~255），那么Scale = 4/255 ≈ 0.0157</li>
            <li><strong>量化</strong>：3.1415926 ÷ 0.0157 ≈ 200</li>
            <li><strong>存储整数</strong>：200的二进制表示为11001000</li>
          </ol>
          <p><strong>推理时</strong>：读取到整数值200，乘以Scale(0.0157)还原为3.14</p>
        `,
        actualValue: '3.14（使用Scale=0.0157）',
        error: '≈0.0016（精心设计Scale的情况下）',
        keyPoints: [
          'INT8必须依赖量化Scale将浮点数映射到整数范围',
          '量化通常会造成信息损失，但可通过调整Scale将误差控制在可接受范围内',
          '模型整体使用INT8可减少内存占用至FP32的1/4',
          '当前大模型量化多用INT8，在速度和精度间取得平衡'
        ]
      };
    
    case 'INT4':
      return {
        explanation: `
          <p><strong>INT4（4位整数）</strong>精度极低，范围极小（有符号：-8到7，无符号：0到15）。</p>
          <ol>
            <li><strong>选择Scale</strong>：以有符号INT4为例，范围[-8, 7]，假设Scale = 8/7 ≈ 1.142</li>
            <li><strong>量化</strong>：3.1415926 ÷ 1.142 ≈ 2.75，取整为3</li>
            <li><strong>存储整数</strong>：3的二进制为0011（4位）</li>
          </ol>
          <p><strong>精度损失爆炸</strong>：π值被粗暴地近似为3，推理时只能还原为3 × 1.142 ≈ 3.426，误差高达8.9%</p>
        `,
        actualValue: '3.426（使用Scale=1.142）',
        error: '≈+8.9%（严重失真）',
        keyPoints: [
          'INT4精度极低，几乎无法准确表示小数',
          '范围极小，有符号INT4仅能表示-8到7的16个数',
          '最适合表示本身就接近整数的数值',
          '需要结合特殊量化算法（如GPTQ）才能应用于大语言模型'
        ]
      };
    
    default:
      return {
        explanation: '',
        actualValue: '',
        error: '',
        keyPoints: []
      };
  }
}

export function getBinaryRepresentation(format: string) {
  switch (format) {
    case 'FP32':
      return {
        binary: '010000000100100100001111110110101',
        sections: [
          { name: '符号位', start: 0, end: 1, bits: 1, colorClass: 'text-red-600' },
          { name: '指数', start: 1, end: 9, bits: 8, colorClass: 'text-blue-600' },
          { name: '尾数', start: 9, end: 32, bits: 23, colorClass: 'text-green-600' }
        ]
      };
    
    case 'FP16':
      return {
        binary: '0100001001001000',
        sections: [
          { name: '符号位', start: 0, end: 1, bits: 1, colorClass: 'text-red-600' },
          { name: '指数', start: 1, end: 6, bits: 5, colorClass: 'text-blue-600' },
          { name: '尾数', start: 6, end: 16, bits: 10, colorClass: 'text-green-600' }
        ]
      };
    
    case 'BF16':
      return {
        binary: '0100000001001001',
        sections: [
          { name: '符号位', start: 0, end: 1, bits: 1, colorClass: 'text-red-600' },
          { name: '指数', start: 1, end: 9, bits: 8, colorClass: 'text-blue-600' },
          { name: '尾数', start: 9, end: 16, bits: 7, colorClass: 'text-green-600' }
        ]
      };
    
    case 'INT8':
      return {
        binary: '11001000',
        sections: [
          { name: '整数值', start: 0, end: 8, bits: 8, colorClass: 'text-purple-600' },
          { name: '', start: 0, end: 0, bits: 0, colorClass: 'text-white' },
          { name: '', start: 0, end: 0, bits: 0, colorClass: 'text-white' }
        ]
      };
    
    case 'INT4':
      return {
        binary: '0011',
        sections: [
          { name: '整数值', start: 0, end: 4, bits: 4, colorClass: 'text-purple-600' },
          { name: '', start: 0, end: 0, bits: 0, colorClass: 'text-white' },
          { name: '', start: 0, end: 0, bits: 0, colorClass: 'text-white' }
        ]
      };
    
    default:
      return {
        binary: '',
        sections: []
      };
  }
}