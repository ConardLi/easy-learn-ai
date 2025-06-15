/**
 * 聊天界面组件
 * 展示AI对话案例，模拟真实的聊天体验
 * 包含消息展示、幻觉标识和分析触发功能
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Button, Avatar } from '@nextui-org/react';
import { 
  User, 
  Bot, 
  AlertTriangle, 
  CheckCircle, 
  Search,
  Clock
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isHallucination?: boolean;
  issues?: string[];
}

interface Case {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  messages: Message[];
}

interface ChatInterfaceProps {
  case_: Case;
  onAnalyze: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ case_, onAnalyze }) => {
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    // Reset when case changes
    setDisplayedMessages([]);
    setCurrentMessageIndex(0);
    setIsTyping(false);

    // Start displaying messages
    const timer = setTimeout(() => {
      showNextMessage();
    }, 500);

    return () => clearTimeout(timer);
  }, [case_.id]);

  const showNextMessage = () => {
    if (currentMessageIndex < case_.messages.length) {
      const message = case_.messages[currentMessageIndex];
      
      if (message.role === 'assistant') {
        setIsTyping(true);
        setTimeout(() => {
          setDisplayedMessages(prev => [...prev, message]);
          setIsTyping(false);
          setCurrentMessageIndex(prev => prev + 1);
        }, 1500);
      } else {
        setDisplayedMessages(prev => [...prev, message]);
        setCurrentMessageIndex(prev => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (currentMessageIndex < case_.messages.length && !isTyping) {
      const timer = setTimeout(() => {
        showNextMessage();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, isTyping]);

  const resetConversation = () => {
    setDisplayedMessages([]);
    setCurrentMessageIndex(0);
    setIsTyping(false);
    setTimeout(showNextMessage, 500);
  };

  return (
    <Card className="h-[600px] bg-white shadow-xl border-0">
      <CardBody className="p-0 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar
                  icon={<Bot className="w-5 h-5" />}
                  className="bg-gradient-to-r from-purple-500 to-blue-500"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">AI助手</h3>
                <p className="text-xs text-gray-500">在线</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="light"
              onPress={resetConversation}
              startContent={<Search className="w-4 h-4" />}
            >
              重新演示
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {displayedMessages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <Avatar
                    icon={message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    size="sm"
                    className={message.role === 'user' 
                      ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                      : "bg-gradient-to-r from-purple-500 to-blue-500"
                    }
                  />
                  <div className={`relative ${message.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        : message.isHallucination
                          ? 'bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200'
                          : 'bg-gray-100'
                    }`}>
                      <p className={`text-sm whitespace-pre-wrap ${
                        message.role === 'user' ? 'text-white' : 'text-gray-800'
                      }`}>
                        {message.content}
                      </p>
                      
                      {message.isHallucination && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="flex items-center space-x-2 mt-2 p-2 bg-red-200 rounded-lg"
                        >
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="text-xs font-medium text-red-700">
                            检测到幻觉现象
                          </span>
                        </motion.div>
                      )}

                      {message.isHallucination === false && message.role === 'assistant' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="flex items-center space-x-2 mt-2 p-2 bg-green-200 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-medium text-green-700">
                            准确回答
                          </span>
                        </motion.div>
                      )}
                    </div>
                    
                    <div className={`flex items-center space-x-1 mt-1 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{message.timestamp}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <Avatar
                    icon={<Bot className="w-4 h-4" />}
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-blue-500"
                  />
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Analysis Button */}
        {currentMessageIndex >= case_.messages.length && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 border-t bg-gray-50"
          >
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white"
              size="lg"
              onPress={onAnalyze}
              startContent={<AlertTriangle className="w-5 h-5" />}
            >
              分析这段对话中的幻觉
            </Button>
          </motion.div>
        )}
      </CardBody>
    </Card>
  );
};

export default ChatInterface;
