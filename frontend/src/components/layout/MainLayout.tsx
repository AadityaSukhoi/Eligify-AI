import React, { ReactNode, useState } from "react";
import { GovHeader } from "./GovHeader";
import { AuthHeader } from "./AuthHeader";
import { AccessibilityPanel } from "./AccessibilityPanel";
import { useSearchParams, useLocation } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isAssistantTab = location.pathname === '/app' && searchParams.get('tab') === 'assistant';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50">
        <GovHeader
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          onAccessibilityToggle={() => setShowAccessibility(!showAccessibility)}
        />
      </header>
      {showAccessibility && (
        <AccessibilityPanel onClose={() => setShowAccessibility(false)} />
      )}
      
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-header-main text-primary py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="font-bold text-lg mb-2">
                Eligify<span className="text-tricolor-saffron">AI</span>
              </h4>
              <p className="text-primary/70 text-sm leading-relaxed">
                AI-powered platform helping Indian citizens discover 
                government welfare schemes they're eligible for.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-2 text-sm text-primary/70">
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Accessibility Statement</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Official Resources</h4>
              <ul className="space-y-2 text-sm text-primary/70">
                <li><a href="https://www.india.gov.in" target="_blank" rel="noopener" className="hover:text-primary">National Portal of India</a></li>
                <li><a href="https://www.myscheme.gov.in" target="_blank" rel="noopener" className="hover:text-primary">MyScheme Portal</a></li>
                <li><a href="https://services.india.gov.in" target="_blank" rel="noopener" className="hover:text-primary">e-Services Portal</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-primary/20 text-center text-xs text-primary/60">
            <p>© 2024 Eligify AI. All rights reserved. Not an official government portal.</p>
            <p className="mt-1">Designed for accessibility and multilingual support across India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

