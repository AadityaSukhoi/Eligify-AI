import { useState, useRef, useEffect } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import { ChatInput } from "./ChatInput";
import { ChatMessage, MessageRole } from "./ChatMessage";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

const welcomeMessage: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Namaste! 🙏 I'm here to help you discover government schemes you may be eligible for. Tell me about yourself — your age, occupation, income, location, and any specific needs — and I'll analyze which schemes apply to you with full reasoning and source links.",
  timestamp: new Date(),
};

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollToBottom();
  }, [messages]);

  const handleSend = (content: string, language: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI streaming response
    setTimeout(() => {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isStreaming: true,
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Simulate streaming text
      const fullResponse = `Based on the information you provided, I've analyzed your eligibility across 847 government schemes. Here are the most relevant ones:

I found **3 schemes** where you appear to be **eligible**, **2 schemes** where you are **possibly eligible** (pending verification), and identified relevant schemes in Education, Health, and Financial Aid categories.

Please check the eligibility cards on the right panel for detailed reasoning and official policy sources for each scheme.`;

      let currentIndex = 0;
      const streamInterval = setInterval(() => {
        if (currentIndex < fullResponse.length) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessage.id
                ? { ...msg, content: fullResponse.slice(0, currentIndex + 1) }
                : msg
            )
          );
          currentIndex++;
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessage.id ? { ...msg, isStreaming: false } : msg
            )
          );
          setIsLoading(false);
          clearInterval(streamInterval);
        }
      }, 15);
    }, 500);
  };

  const clearChat = () => {
    setMessages([welcomeMessage]);
  };

  return (
    <div className="flex flex-col h-full bg-chat-bg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">AI Eligibility Assistant</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearChat}
          className="text-muted-foreground hover:text-foreground"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
            isStreaming={msg.isStreaming}
            onPlayAudio={msg.role === "assistant" ? () => {} : undefined}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}