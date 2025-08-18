import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, X, Minimize2, Maximize2, Sparkles, Lightbulb, Zap } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  context?: string;
  suggestions?: string[];
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onClose, onMinimize }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI assistant. I can help you with project management, form completion, technical questions, and more. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "Help me with the client intake form",
        "Explain project management features",
        "Technical support questions",
        "Platform navigation help"
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // AI Response Generator
  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Context-aware responses
    if (lowerMessage.includes('form') || lowerMessage.includes('intake') || lowerMessage.includes('client')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: "I can help you with the client intake form! The form has 8 steps covering everything from personal information to project goals. Would you like me to walk you through a specific step, or do you have questions about any particular section?",
        timestamp: new Date(),
        suggestions: [
          "Walk me through step 1",
          "What's required for company details?",
          "Help with financial information",
          "Explain project goals section"
        ]
      };
    }
    
    if (lowerMessage.includes('project') || lowerMessage.includes('management')) {
      return {
        id: Date.now().toString(),
        content: "Great question about project management! Our platform offers comprehensive project tracking, task management, resource allocation, and real-time analytics. You can create new projects, assign tasks, track progress, and collaborate with your team. What specific aspect would you like to know more about?",
        type: 'ai',
        timestamp: new Date(),
        suggestions: [
          "How to create a new project",
          "Task management features",
          "Resource allocation",
          "Progress tracking"
        ]
      };
    }
    
    if (lowerMessage.includes('technical') || lowerMessage.includes('support') || lowerMessage.includes('help')) {
      return {
        id: Date.now().toString(),
        content: "I'm here to help with technical support! I can assist with platform navigation, feature explanations, troubleshooting, and best practices. What specific issue are you experiencing, or what would you like to learn more about?",
        type: 'ai',
        timestamp: new Date(),
        suggestions: [
          "Platform navigation help",
          "Feature explanations",
          "Troubleshooting",
          "Best practices"
        ]
      };
    }
    
    if (lowerMessage.includes('dashboard') || lowerMessage.includes('analytics')) {
      return {
        id: Date.now().toString(),
        content: "The dashboard provides real-time insights into your projects, tasks, and team performance. You can view KPI metrics, project progress charts, recent activity, and manage resources. Would you like me to explain any specific dashboard feature?",
        type: 'ai',
        timestamp: new Date(),
        suggestions: [
          "KPI metrics explanation",
          "Project progress tracking",
          "Resource management",
          "Activity monitoring"
        ]
      };
    }
    
    // Default intelligent response
    return {
      id: Date.now().toString(),
      content: "That's an interesting question! I'm designed to help you get the most out of the VLTRN platform. I can assist with project management, form completion, technical guidance, and platform navigation. Could you please provide more specific details about what you need help with?",
      type: 'ai',
      timestamp: new Date(),
      suggestions: [
        "Project management help",
        "Form assistance",
        "Technical guidance",
        "Platform navigation"
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      const aiResponse = await generateAIResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('AI response error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: "I apologize, but I'm experiencing some technical difficulties right now. Please try again in a moment, or contact our support team for immediate assistance.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-[#FE02A1] hover:bg-[#FE02A1]/80 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all duration-200"
        >
          <MessageSquare size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 h-[500px] bg-[rgba(0,0,0,0.95)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-2xl shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[rgba(254,2,161,0.3)]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#FE02A1] rounded-full flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Assistant</h3>
            <p className="text-[#FE02A1] text-xs">Powered by VLTRN AI</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onMinimize}
            className="text-white/60 hover:text-white transition-colors"
          >
            <Minimize2 size={16} />
          </button>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-[#FE02A1] text-white'
                  : 'bg-[rgba(255,255,255,0.1)] text-white'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'ai' && (
                  <Bot size={16} className="text-[#FE02A1] mt-1 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.suggestions && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left p-2 bg-[rgba(254,2,161,0.1)] hover:bg-[rgba(254,2,161,0.2)] border border-[rgba(254,2,161,0.3)] rounded-lg text-xs text-[#FE02A1] hover:text-white transition-all duration-200"
                        >
                          💡 {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-xs opacity-60 mt-2">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[rgba(255,255,255,0.1)] text-white p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bot size={16} className="text-[#FE02A1]" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#FE02A1] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#FE02A1] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-[#FE02A1] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[rgba(254,2,161,0.3)]">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about VLTRN..."
            className="flex-1 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#FE02A1] transition-colors"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-[#FE02A1] hover:bg-[#FE02A1]/80 disabled:bg-[#FE02A1]/50 text-white p-2 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-3 flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center space-x-1">
            <Sparkles size={12} />
            <span>AI Powered</span>
          </div>
          <div className="flex items-center space-x-1">
            <Lightbulb size={12} />
            <span>Smart Suggestions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
