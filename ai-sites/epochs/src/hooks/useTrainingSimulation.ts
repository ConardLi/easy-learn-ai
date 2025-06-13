/**
 * 训练模拟Hook
 * 管理训练过程的状态和逻辑，包括LOSS值计算、训练进度等
 */
import { useState, useEffect, useCallback } from 'react';

export interface TrainingData {
  epoch: number;
  trainLoss: number;
  validationLoss: number;
  accuracy: number;
}

export function useTrainingSimulation() {
  const [epochs, setEpochs] = useState(3);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);
  const [speed, setSpeed] = useState(1000);

  // 模拟真实的训练曲线
  const generateLossValue = useCallback((epoch: number, maxEpochs: number) => {
    const progress = epoch / maxEpochs;
    
    // 训练损失：开始高，逐渐下降
    let trainLoss = 2.5 * Math.exp(-2 * progress) + 0.1;
    
    // 验证损失：先下降后上升（过拟合）
    let validationLoss;
    if (maxEpochs <= 3) {
      // 正常情况
      validationLoss = 2.0 * Math.exp(-1.5 * progress) + 0.3;
    } else if (maxEpochs <= 6) {
      // 轻微过拟合
      validationLoss = 2.0 * Math.exp(-1.5 * progress) + 0.3 + Math.max(0, (progress - 0.6) * 0.8);
    } else {
      // 严重过拟合
      validationLoss = 2.0 * Math.exp(-1.5 * progress) + 0.3 + Math.max(0, (progress - 0.4) * 1.5);
    }
    
    // 准确率：逐渐提升，但过拟合时验证准确率下降
    const accuracy = Math.min(95, 30 + 60 * (1 - Math.exp(-3 * progress)));
    
    // 添加一些随机噪声
    trainLoss += (Math.random() - 0.5) * 0.1;
    validationLoss += (Math.random() - 0.5) * 0.15;
    
    return {
      trainLoss: Math.max(0.05, trainLoss),
      validationLoss: Math.max(0.05, validationLoss),
      accuracy: Math.max(30, accuracy + (Math.random() - 0.5) * 5)
    };
  }, []);

  const startTraining = useCallback(() => {
    setIsTraining(true);
    setCurrentEpoch(0);
    setTrainingData([]);
  }, []);

  const stopTraining = useCallback(() => {
    setIsTraining(false);
  }, []);

  const resetTraining = useCallback(() => {
    setIsTraining(false);
    setCurrentEpoch(0);
    setTrainingData([]);
  }, []);

  useEffect(() => {
    if (!isTraining || currentEpoch >= epochs) {
      if (currentEpoch >= epochs) {
        setIsTraining(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      const { trainLoss, validationLoss, accuracy } = generateLossValue(currentEpoch + 1, epochs);
      
      const newData: TrainingData = {
        epoch: currentEpoch + 1,
        trainLoss,
        validationLoss,
        accuracy
      };
      
      setTrainingData(prev => [...prev, newData]);
      setCurrentEpoch(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isTraining, currentEpoch, epochs, speed, generateLossValue]);

  const getTrainingStatus = useCallback(() => {
    if (trainingData.length === 0) return 'ready';
    
    const lastData = trainingData[trainingData.length - 1];
    const validationLoss = lastData.validationLoss;
    
    if (epochs <= 2) return 'underfitting';
    if (epochs >= 8) return 'overfitting';
    if (validationLoss > 1.5) return 'overfitting';
    if (validationLoss < 0.8) return 'optimal';
    return 'training';
  }, [trainingData, epochs]);

  return {
    epochs,
    setEpochs,
    currentEpoch,
    isTraining,
    trainingData,
    speed,
    setSpeed,
    startTraining,
    stopTraining,
    resetTraining,
    trainingStatus: getTrainingStatus()
  };
}
