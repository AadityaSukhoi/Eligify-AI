import { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Accessibility, User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "gu", name: "Gujarati", native: "ગુજরાતી" },
];

interface GovHeaderProps {
  onAccessibilityToggle?: () => void;
  currentLang?: string;
  onLanguageChange?: (lang: string) => void;
}

export function GovHeader({
  onAccessibilityToggle,
  currentLang = "en",
  onLanguageChange,
}: GovHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const selectedLang = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <header className="sticky top-0 z-50">
      {/* Tricolor bar */}
      <div className="tricolor-bar" aria-hidden="true" />

      {/* Main header */}
      <div className="bg-header-main text-primary">
        <div className="container flex items-center justify-between h-14 md:h-16">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-tricolor-saffron/20 border border-tricolor-saffron/30">
              <span className="text-lg font-bold text-tricolor-saffron">E</span>
            </div>
            <div>
              <h1 className="text-base md:text-lg font-bold leading-tight">
                Eligify<span className="text-tricolor-saffron">AI</span>
              </h1>
              <p className="text-2xs text-primary/60 hidden sm:block">
                सरकारी योजना पात्रता
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>{selectedLang.native}</span>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => onLanguageChange?.(lang.code)}
                    className={currentLang === lang.code ? "bg-secondary" : ""}
                  >
                    <span className="flex-1">{lang.native}</span>
                    <span className="text-muted-foreground text-xs">{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Accessibility */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onAccessibilityToggle}
              className="text-primary hover:bg-primary/10"
              aria-label="Accessibility options"
            >
              <Accessibility className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">Accessibility</span>
            </Button>

            {/* Login */}
            <Button variant="secondary" size="sm" className="ml-2">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary hover:bg-primary/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-primary/20 animate-fade-in">
            <div className="container py-4 space-y-3">
              {/* Language Selection */}
              <div className="space-y-2">
                <p className="text-xs text-primary/70 uppercase tracking-wide">
                  Select Language
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.slice(0, 6).map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange?.(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-3 py-2 text-sm rounded text-left transition-colors ${
                        currentLang === lang.code
                          ? "bg-primary/20"
                          : "bg-primary/5 hover:bg-primary/10"
                      }`}
                    >
                      {lang.native}
                    </button>
                  ))}
                </div>
              </div>

              {/* Other options */}
              <div className="flex gap-2 pt-2 border-t border-primary/20">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onAccessibilityToggle}
                  className="flex-1 text-primary hover:bg-primary/10"
                >
                  <Accessibility className="w-4 h-4 mr-2" />
                  Accessibility
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}