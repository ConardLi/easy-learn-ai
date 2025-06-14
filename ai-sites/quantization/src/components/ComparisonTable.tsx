/**
 * 比较表格组件，展示不同格式的对比信息
 */
import React from 'react';

const ComparisonTable: React.FC = () => {
  const tableData = [
    {
      format: 'FP32',
      structure: '1位符号 + 8位指数 + 23位尾数',
      binaryExample: '0 10000000 10010010000111111011010',
      actualValue: '3.1415925414',
      error: '≈0.0000001',
      notes: '完整浮点数表示，精度极高'
    },
    {
      format: 'FP16',
      structure: '1位符号 + 5位指数 + 10位尾数',
      binaryExample: '0 10000 1001001000',
      actualValue: '3.140625',
      error: '≈0.0009676',
      notes: '半精度浮点数，尾数减少到10位，精度降低'
    },
    {
      format: 'BF16',
      structure: '1位符号 + 8位指数 + 7位尾数',
      binaryExample: '0 10000000 1001001',
      actualValue: '3.125',
      error: '≈0.0165926',
      notes: '保留FP32的指数范围，但尾数精度大幅降低'
    },
    {
      format: 'INT8',
      structure: '8位整数(无符号)',
      binaryExample: '11001000 (200)',
      actualValue: '3.14 (使用Scale=0.0157)',
      error: '理想情况下可控制在1%内',
      notes: '需通过量化并使用Scale还原，范围有限'
    },
    {
      format: 'INT4',
      structure: '4位整数(有符号)',
      binaryExample: '0011 (3)',
      actualValue: '3.426 (使用Scale=1.142)',
      error: '≈+8.9%',
      notes: '极低精度，误差极大，仅适用于粗略表示'
    }
  ];

  return (
    <div className="mt-12 transition-opacity duration-500 opacity-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">不同精度格式的对比</h2>
      
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">格式</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">结构</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">二进制示例</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">实际存储值</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">误差</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">备注</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{row.format}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.structure}</td>
                <td className="px-6 py-4 whitespace-nowrap font-mono text-xs">{row.binaryExample}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.actualValue}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.error}</td>
                <td className="px-6 py-4">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 bg-blue-50 p-5 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-800 mb-3">模型量化的关键结论</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li><strong>浮点数靠尾数长度决定精度</strong>：FP32尾数23位，能精确表示π值的前7位；FP16尾数10位，精度明显下降；BF16尾数仅7位，丢失大量小数细节。</li>
          <li><strong>整数必须依赖量化Scale</strong>：INT8通过合理Scale可还原小数，但有范围限制；INT4因范围太小(-8~7)，几乎无法准确表示小数。</li>
          <li><strong>大模型量化常用INT8</strong>：在精度和速度间取得平衡，体积比FP32小4倍，通过精心设计的Scale和校正算法，能将误差控制在可接受范围内。</li>
        </ul>
      </div>
    </div>
  );
};

export default ComparisonTable;