import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, AlertTriangle, Shield, Send } from 'lucide-react';
import clsx from 'clsx';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
  type: 'system' | 'user' | 'warning';
}

interface ChatRules {
  title: string;
  description: string;
}

const chatRules: ChatRules[] = [
  {
    title: 'Be Respectful',
    description: 'Treat all participants with respect'
  },
  {
    title: 'No Spam',
    description: 'Avoid excessive messages'
  },
  {
    title: 'Keep it Clean',
    description: 'No inappropriate content'
  },
  {
    title: 'Stay on Topic',
    description: 'Keep discussions relevant'
  }
];

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'VLTRN',
      content: 'Type "join" to enter chat',
      timestamp: new Date(),
      type: 'system'
    }
  ]);
  const [participants, setParticipants] = useState<Set<string>>(new Set());
  const [inputMessage, setInputMessage] = useState('');
  const [showRules, setShowRules] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const lowerMessage = inputMessage.toLowerCase();

    if (lowerMessage === 'join') {
      if (!participants.has('User')) {
        setParticipants(prev => new Set(prev).add('User'));
        addMessage({
          id: Date.now().toString(),
          user: 'VLTRN',
          content: '✨ Welcome! Click the shield to view rules',
          timestamp: new Date(),
          type: 'system'
        });
      }
    } else if (lowerMessage === 'exit') {
      if (participants.has('User')) {
        setParticipants(prev => {
          const newSet = new Set(prev);
          newSet.delete('User');
          return newSet;
        });
        addMessage({
          id: Date.now().toString(),
          user: 'VLTRN',
          content: '👋 See you soon!',
          timestamp: new Date(),
          type: 'system'
        });
      }
    } else if (participants.has('User')) {
      const inappropriateWords = ['bad', 'spam', 'offensive'];
      const hasInappropriateContent = inappropriateWords.some(word => 
        lowerMessage.includes(word)
      );

      if (hasInappropriateContent) {
        addMessage({
          id: Date.now().toString(),
          user: 'VLTRN',
          content: '⚠️ Please keep it appropriate',
          timestamp: new Date(),
          type: 'warning'
        });
      } else {
        addMessage({
          id: Date.now().toString(),
          user: 'User',
          content: inputMessage,
          timestamp: new Date(),
          type: 'user'
        });
      }
    } else {
      addMessage({
        id: Date.now().toString(),
        user: 'VLTRN',
        content: 'Type "join" to participate',
        timestamp: new Date(),
        type: 'system'
      });
    }

    setInputMessage('');
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[rgba(254,2,161,0.2)]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#FE02A1]" />
                <h2 className="text-lg font-['Exo_2'] font-bold text-white">Live Chat</h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowRules(!showRules)}
                  className="text-white/60 hover:text-[#FE02A1] transition-colors duration-300"
                  title="Chat Rules"
                >
                  <Shield className="w-5 h-5" />
                </button>
                <span className="text-sm text-white/60 bg-[rgba(255,255,255,0.1)] px-2 py-1 rounded-full">
                  {participants.size} Online
                </span>
              </div>
            </div>

            {/* Rules Panel */}
            {showRules && (
              <div className="p-3 bg-[rgba(255,255,255,0.05)] border-b border-[rgba(254,2,161,0.2)]">
                <div className="grid grid-cols-2 gap-3">
                  {chatRules.map((rule, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1 h-1 mt-2 rounded-full bg-[#FE02A1]" />
                      <div>
                        <h4 className="text-sm font-semibold text-white">{rule.title}</h4>
                        <p className="text-xs text-white/60">{rule.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="h-[240px] overflow-y-auto p-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={clsx(
                      'px-3 py-2 rounded-lg text-sm',
                      message.type === 'system' && 'bg-[rgba(255,255,255,0.05)]',
                      message.type === 'warning' && 'bg-[rgba(254,2,161,0.1)]',
                      message.type === 'user' && 'bg-[rgba(255,255,255,0.1)]'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {message.type === 'warning' && (
                        <AlertTriangle className="w-3 h-3 text-[#FE02A1]" />
                      )}
                      <span className="font-semibold text-white">{message.user}</span>
                      <span className="text-xs text-white/40">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-white/80 mt-1">{message.content}</p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-[rgba(254,2,161,0.2)]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={participants.has('User') ? "Message" : 'Type "join" to start'}
                  className="flex-1 px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-white placeholder-white/50 focus:border-[#FE02A1] transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="p-2 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;