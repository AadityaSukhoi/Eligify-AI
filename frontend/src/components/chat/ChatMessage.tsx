import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export type MessageRole = "user" | "assistant";

interface ChatMessageProps {
  role: MessageRole;
  content: string;
  isStreaming?: boolean;
  timestamp?: Date;
  onPlayAudio?: () => void;
}

export function ChatMessage({
  role,
  content,
  isStreaming = false,
  timestamp,
  onPlayAudio,
}: ChatMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    onPlayAudio?.();
  };

  const isUser = role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}
    >
      <div
        className={`max-w-[85%] md:max-w-[75%] ${
          isUser
            ? "bg-chat-user text-primary-foreground rounded-t-lg rounded-bl-lg"
            : "bg-chat-ai border border-border rounded-t-lg rounded-br-lg"
        } px-4 py-3`}
      >
        {/* Message content */}
        <div className={`text-sm leading-relaxed ${isStreaming ? "streaming-cursor" : ""}`}>
          {content}
        </div>

        {/* Footer */}
        <div
          className={`flex items-center gap-2 mt-2 pt-2 border-t ${
            isUser ? "border-primary-foreground/20" : "border-border"
          }`}
        >
          {timestamp && (
            <span
              className={`text-2xs ${
                isUser ? "text-primary-foreground/60" : "text-muted-foreground"
              }`}
            >
              {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}

          {/* Audio playback for AI messages */}
          {!isUser && onPlayAudio && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 ml-auto"
              onClick={handlePlayAudio}
              aria-label={isPlaying ? "Stop audio" : "Play audio"}
            >
              {isPlaying ? (
                <VolumeX className="w-3 h-3 mr-1" />
              ) : (
                <Volume2 className="w-3 h-3 mr-1" />
              )}
              <span className="text-xs">{isPlaying ? "Stop" : "Listen"}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}