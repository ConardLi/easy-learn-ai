/**
 * T5学习网站主页面
 * 整合所有模块，提供完整的学习体验
 */
import React from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import EncoderDecoder from './components/EncoderDecoder';
import PretrainTask from './components/PretrainTask';
import UnifiedThought from './components/UnifiedThought';
import InteractiveDemo from './components/InteractiveDemo';
import Footer from './components/Footer';

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Introduction />
      <EncoderDecoder />
      <PretrainTask />
      <UnifiedThought />
      <InteractiveDemo />
      <Footer />
    </div>
  );
};

export default MainPage;
