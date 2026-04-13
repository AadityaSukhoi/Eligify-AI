import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { csrfTokenManager } from "@/lib/security";

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  csrfToken: string | null;
  setAuthenticated: (authenticated: boolean, email?: string) => void;
  logout: () => void;
  initializeCSRFToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [csrfToken, setCSRFToken] = useState<string | null>(null);

  /**
   * Initialize CSRF token on mount
   */
  useEffect(() => {
    initializeCSRFToken();
    // Check if user is already logged in (from session/localStorage)
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setIsAuthenticated(true);
      setUserEmail(savedEmail);
    }
  }, []);

  const initializeCSRFToken = async () => {
    try {
      const token = await csrfTokenManager.fetchCSRFToken();
      setCSRFToken(token);
    } catch (error) {
      console.error("Failed to initialize CSRF token:", error);
    }
  };

  const setAuthenticated = (authenticated: boolean, email?: string) => {
    setIsAuthenticated(authenticated);
    if (authenticated && email) {
      setUserEmail(email);
      localStorage.setItem("userEmail", email);
    } else if (!authenticated) {
      setUserEmail(null);
      localStorage.removeItem("userEmail");
      csrfTokenManager.clearToken();
      setCSRFToken(null);
    }
  };

  const logout = () => {
    setAuthenticated(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    userEmail,
    csrfToken,
    setAuthenticated,
    logout,
    initializeCSRFToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
