import { X, Type, Sun, Moon, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AccessibilityPanelProps {
  onClose: () => void;
}

export function AccessibilityPanel({ onClose }: AccessibilityPanelProps) {
  const [fontSize, setFontSize] = useState<"normal" | "large" | "larger">("normal");
  const [highContrast, setHighContrast] = useState(false);

  const handleFontSize = (size: "normal" | "large" | "larger") => {
    setFontSize(size);
    document.documentElement.classList.remove("text-large", "text-larger");
    if (size !== "normal") {
      document.documentElement.classList.add(`text-${size}`);
    }
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle("high-contrast");
  };

  return (
    <div className="bg-secondary border-b border-border animate-fade-in">
      <div className="container py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Accessibility Options
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          {/* Font Size */}
          <div className="flex items-center gap-3">
            <Type className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Text Size:</span>
            <div className="flex gap-1">
              <Button
                variant={fontSize === "normal" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFontSize("normal")}
                className="text-xs h-7 px-3"
              >
                A
              </Button>
              <Button
                variant={fontSize === "large" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFontSize("large")}
                className="text-sm h-7 px-3"
              >
                A
              </Button>
              <Button
                variant={fontSize === "larger" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFontSize("larger")}
                className="text-base h-7 px-3"
              >
                A
              </Button>
            </div>
          </div>

          {/* High Contrast */}
          <div className="flex items-center gap-3">
            {highContrast ? (
              <Moon className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Sun className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="text-sm text-muted-foreground">High Contrast:</span>
            <Button
              variant={highContrast ? "default" : "outline"}
              size="sm"
              onClick={toggleHighContrast}
              className="text-xs h-7"
            >
              {highContrast ? "On" : "Off"}
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          This portal supports screen readers and keyboard navigation. Press Tab to navigate.
        </p>
      </div>
    </div>
  );
}