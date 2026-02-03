import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

declare global {
  interface Window {
    voiceflow?: {
      chat: {
        open: () => void;
        close: () => void;
        load: (config: any) => void;
      };
    };
  }
}

interface VoiceflowChatButtonProps {
  variant?: 'desktop' | 'mobile' | 'hero-desktop';
  className?: string;
}

export const VoiceflowChatButton: React.FC<VoiceflowChatButtonProps> = ({
  variant = 'desktop',
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const checkVoiceflowLoaded = setInterval(() => {
      if (window.voiceflow?.chat) {
        setIsLoaded(true);
        clearInterval(checkVoiceflowLoaded);
        setTimeout(() => setIsAnimating(true), 500);
      }
    }, 100);

    return () => clearInterval(checkVoiceflowLoaded);
  }, []);

  const handleClick = () => {
    if (window.voiceflow?.chat) {
      window.voiceflow.chat.open();
    }
  };

  if (!isLoaded) return null;

  if (variant === 'hero-desktop') {
    return (
      <button
        onClick={handleClick}
        className={`absolute bottom-8 right-8 z-20 group ${
          isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        } transition-all duration-500 ease-out ${className}`}
        aria-label="Chat mit uns"
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 animate-ping opacity-20"></div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
        </div>
      </button>
    );
  }

  if (variant === 'desktop') {
    return (
      <button
        onClick={handleClick}
        className={`fixed bottom-6 right-6 z-50 group ${
          isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        } transition-all duration-500 ease-out ${className}`}
        aria-label="Chat mit uns"
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 animate-ping opacity-20"></div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`text-center group ${className}`}
      aria-label="Chat mit uns"
    >
      <div className="relative inline-flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 border border-white rounded-full"></div>
      </div>
      <div className="text-sm text-muted-foreground mt-1 group-hover:text-blue-600 transition-colors">Chat starten</div>
    </button>
  );
};
