import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/useAuth";

interface AuthHeaderProps {
  className?: string;
}

export function AuthHeader({ className }: AuthHeaderProps) {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className={`flex items-center gap-2 ${className ?? ""}`}>
        <span className="text-sm text-primary/80 hidden sm:inline">
          Hi, {user.name}
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
