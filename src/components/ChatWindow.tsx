import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { SendHorizonal, Loader, User, Bot } from 'lucide-react';
import { sendToChairman } from "../lib/chairmanApi";

interface ChatWindowProps {
  pageContext: string;
}

interface Message {
  from: 'user' | 'chairman';
  text: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ pageContext }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      from: 'chairman', 
      text: `Welcome to the ${pageContext} assistant. How can I help you today?` 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message locally
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    const userText = input;
    setInput("");
    setIsLoading(true);

    try {
      // Call the "Chairman" API
      const chairmanResponse = await sendToChairman(pageContext, userText);
      setMessages((prev) => [
        ...prev,
        { from: "chairman", text: chairmanResponse },
      ]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages((prev) => [
        ...prev,
        { from: "chairman", text: "I apologize, but I encountered an error processing your request. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto resize textarea as content changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    // Reset height to auto to allow shrinking
    e.target.style.height = 'auto';
    // Set height based on scrollHeight (with min height)
    e.target.style.height = `${Math.max(40, e.target.scrollHeight)}px`;
  };

  return (
    <div className="chat-window-container bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl overflow-hidden">
      {/* Message List */}
      <div className="message-list h-[500px] overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 flex items-start gap-2 ${
                msg.from === "user"
                  ? "bg-[#FE02A1] text-white ml-auto"
                  : "bg-[rgba(255,255,255,0.1)] text-white"
              }`}
            >
              {msg.from === "chairman" && (
                <Bot className="w-5 h-5 mt-1 flex-shrink-0" />
              )}
              <div className="break-words">{msg.text}</div>
              {msg.from === "user" && (
                <User className="w-5 h-5 mt-1 flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[rgba(255,255,255,0.1)] text-white max-w-[80%] rounded-lg p-3 flex items-center gap-2">
              <Bot className="w-5 h-5 flex-shrink-0" />
              <Loader className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-container p-4 border-t border-[rgba(254,2,161,0.3)]">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            className="flex-1 px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-white/50 focus:border-[#FE02A1] transition-colors duration-300 resize-none min-h-[40px] max-h-[120px]"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className="p-3 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;