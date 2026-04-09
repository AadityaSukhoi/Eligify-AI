import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AuthContext, type AuthContextValue, type AuthUser } from "./auth-context";

const AUTH_STORAGE_KEY = "eligify_ai_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const normalizedEmail = email.trim().toLowerCase();
    const updatedUser: AuthUser = {
      id: "1",
      name: normalizedEmail.split("@")[0] || "Citizen",
      email: normalizedEmail,
    };

    setUser(updatedUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
