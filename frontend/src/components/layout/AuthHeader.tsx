import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface AuthHeaderProps {
  className?: string;
}

export function AuthHeader({ className }: AuthHeaderProps) {
  const { isAuthenticated, userEmail, logout } = useAuth();

  if (isAuthenticated && userEmail) {
    return (
      <div className={`flex items-center gap-2 ${className ?? ""}`}>
        <span className="text-sm text-primary/80 hidden sm:inline">
          Hi, {userEmail.split('@')[0]}
        </span>
        <Button variant="outline" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Link to="/login" className={className}>
      <Button variant="secondary" size="sm">
        Login
      </Button>
    </Link>
  );
}
