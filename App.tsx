import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import ChatBot from './components/ai/ChatBot';
import ImageAnalyzer from './components/ai/ImageAnalyzer';
import ImageGenerator from './components/ai/ImageGenerator';
import VideoGenerator from './components/ai/VideoGenerator';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);

  const renderView = () => {
    switch (currentView) {
      case AppView.LANDING:
        return <LandingPage />;
      case AppView.AI_CHAT:
        return <ChatBot />;
      case AppView.AI_ANALYZE:
        return <ImageAnalyzer />;
      case AppView.AI_GENERATE:
        return <ImageGenerator />;
      case AppView.AI_VIDEO:
        return <VideoGenerator />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar currentView={currentView} onChangeView={setCurrentView} />
      <main className="transition-opacity duration-300 ease-in-out">
        {renderView()}
      </main>
    </div>
  );
};

export default App;