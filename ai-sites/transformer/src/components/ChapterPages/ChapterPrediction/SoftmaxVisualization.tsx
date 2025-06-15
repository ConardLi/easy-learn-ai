/**
 * Softmax 可视化组件
 * 展示 Softmax 函数如何将得分转换为概率
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button, Slider } from '@nextui-org/react';
import { Play, RotateCcw, BarChart3 } from 'lucide-react';

const SoftmaxVisualization: React.FC = () => {
  const [scores, setScores] = useState([3.2, 1.8, 0.5, -0.3, -1.1]);
  const [showProbabilities, setShowProbabilities] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const words = ['晴朗', '寒冷', '不错', '炎热', '潮湿'];

  // 计算 softmax
  const calculateSoftmax = (scores: number[]) => {
    const maxScore = Math.max(...scores);
    const expScores = scores.map(score => Math.exp(score - maxScore));
    const sumExp = expScores.reduce((sum, exp) => sum + exp, 0);
    return expScores.map(exp => exp / sumExp);
  };

  const probabilities = calculateSoftmax(scores);

  const runAnimation = async () => {
    setIsAnimating(true);
    setShowProbabilities(false);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowProbabilities(true);
    setIsAnimating(false);
  };

  const resetVisualization = () => {
    setScores([3.2, 1.8, 0.5, -0.3, -1.1]);
    setShowProbabilities(false);
    setIsAnimating(false);
  };

  const updateScore = (index: number, value: number) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
    if (showProbabilities) {
      // 如果已经显示概率，立即更新
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardBody className="p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <h3 className="text-2xl font-bold text-gray-800">
              Softmax 函数可视化
            </h3>
          </div>
          <p className="text-gray-600">
            观察原始得分如何通过 Softmax 函数转换为概率分布
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <Button
            color="primary"
            startContent={<Play className="w-4 h-4" />}
            onPress={runAnimation}
            isDisabled={isAnimating}
            className="bg-gradient-to-r from-purple-500 to-pink-500"
          >
            演示转换
          </Button>
          <Button
            variant="bordered"
            startContent={<RotateCcw className="w-4 h-4" />}
            onPress={resetVisualization}
          >
            重置
          </Button>
        </div>

        {/* Score Adjusters */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 text-center">
            调整原始得分
          </h4>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {words.map((word, index) => (
              <div key={word} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{word}</span>
                  <span className="text-sm text-gray-600 font-mono">
                    {scores[index].toFixed(1)}
                  </span>
                </div>
                <Slider
                  value={scores[index]}
                  onChange={(value) => updateScore(index, value as number)}
                  min={-3}
                  max={5}
                  step={0.1}
                  color="secondary"
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Visualization */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Raw Scores */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 text-center">
              原始得分
            </h4>
            <div className="space-y-3">
              {words.map((word, index) => (
                <motion.div
                  key={`score-${word}`}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="w-12 text-sm font-medium text-gray-700">
                    {word}
                  </span>
                  <div className="flex-1 h-8 bg-gray-200 rounded-lg relative overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-end pr-2"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${Math.max(0, (scores[index] + 3) / 8 * 100)}%` 
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-xs text-white font-bold">
                        {scores[index].toFixed(1)}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Probabilities */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 text-center">
              Softmax 概率
            </h4>
            {!showProbabilities && !isAnimating && (
              <div className="text-center text-gray-500 py-8">
                点击"演示转换"查看概率分布
              </div>
            )}
            
            {isAnimating && (
              <div className="text-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto"
                />
                <p className="text-gray-600 mt-2">计算中...</p>
              </div>
            )}

            {showProbabilities && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                {words.map((word, index) => (
                  <motion.div
                    key={`prob-${word}`}
                    className="flex items-center space-x-3"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="w-12 text-sm font-medium text-gray-700">
                      {word}
                    </span>
                    <div className="flex-1 h-8 bg-gray-200 rounded-lg relative overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-end pr-2"
                        initial={{ width: 0 }}
                        animate={{ width: `${probabilities[index] * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      >
                        <span className="text-xs text-white font-bold">
                          {(probabilities[index] * 100).toFixed(1)}%
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
                
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-700 text-center">
                    ✓ 所有概率之和 = {probabilities.reduce((sum, p) => sum + p, 0).toFixed(3)}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Formula */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h5 className="font-semibold text-gray-800 mb-2 text-center">
            Softmax 公式
          </h5>
          <div className="text-center font-mono text-sm text-gray-700">
            P(i) = exp(x_i) / Σ exp(x_j)
          </div>
          <p className="text-xs text-gray-600 text-center mt-2">
            其中 x_i 是原始得分，P(i) 是对应的概率
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default SoftmaxVisualization;
