import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const inputLanguages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "te", label: "తెలుగు" },
  { code: "ta", label: "தமிழ்" },
  { code: "kn", label: "ಕನ್ನಡ" },
];

interface ChatInputProps {
  onSend: (message: string, language: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, isLoading = false, placeholder }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("en");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSend(message.trim(), language);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording implementation would go here
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  return (
    <div className="bg-card border-t border-border p-4">
      {/* Language selector row */}
      <div className="flex items-center gap-2 mb-3">
        <Globe className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Input in:</span>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-28 h-7 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {inputLanguages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code} className="text-sm">
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Input area */}
      <div className="flex items-end gap-2">
        {/* Voice button */}
        <Button
          variant={isRecording ? "destructive" : "outline"}
          size="icon"
          onClick={toggleRecording}
          className={`shrink-0 ${isRecording ? "voice-pulse" : ""}`}
          aria-label={isRecording ? "Stop recording" : "Start voice input"}
        >
          {isRecording ? <MicOff className="w-4 h-4 text-destructive-foreground" /> : <Mic className="w-4 h-4 text-foreground" />}
        </Button>

        {/* Text input */}
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "Describe your situation or ask about schemes..."}
            className="min-h-[44px] max-h-[150px] resize-none pr-12"
            rows={1}
            disabled={isLoading}
          />
        </div>

        {/* Send button */}
        <Button
  onClick={handleSubmit}
  disabled={!message.trim() || isLoading}
  variant="secondary"
  className="shrink-0"
>
  <Send className="w-4 h-4 text-black" />
</Button>
      </div>

      {/* Helper text */}
      <p className="text-2xs text-muted-foreground mt-2 text-center">
        Press Enter to send • Shift+Enter for new line • Use voice for hands-free input
      </p>
    </div>
  );
}