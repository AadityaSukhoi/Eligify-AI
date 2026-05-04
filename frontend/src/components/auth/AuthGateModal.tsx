



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, Eye, ArrowRight, Sparkles } from "lucide-react";

interface AuthGateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectPath?: string;
}

export function AuthGateModal({
  open,
  onOpenChange,
  redirectPath = "/app",
}: AuthGateModalProps) {
  const navigate = useNavigate();
  const { setGuest } = useAuth();

  const handleLogin = () => {
    onOpenChange(false);
    navigate("/login", { state: { from: redirectPath } });
  };

  const handleRegister = () => {
    onOpenChange(false);
    navigate("/register", { state: { from: redirectPath } });
  };

  const handleGuest = () => {
    setGuest(true);
    onOpenChange(false);
    navigate(redirectPath);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          <DialogTitle className="text-xl font-semibold">
            Get Started with Eligify AI
          </DialogTitle>
          <DialogDescription>
            Sign in for personalized recommendations, or continue as a guest to explore schemes.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 pt-4">
          <Button
            onClick={handleLogin}
            className="w-full h-11 font-semibold bg-accent text-background hover:bg-accent/90"
          >
            <LogIn className="w-4 h-4 mr-2 text-background" />
            Sign In
            <ArrowRight className="w-4 h-4 ml-auto text-background" />
          </Button>

          <Button
            onClick={handleRegister}
            variant="outline"
            className="w-full h-11 font-semibold border-border text-foreground"
          >
            <UserPlus className="w-4 h-4 mr-2 text-foreground" />
            Create Account
            <ArrowRight className="w-4 h-4 ml-auto text-foreground" />
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-background text-muted-foreground">or</span>
            </div>
          </div>

          <Button
            onClick={handleGuest}
            variant="ghost"
            className="w-full h-11 text-muted-foreground hover:text-foreground border border-dashed border-border"
          >
            <Eye className="w-4 h-4 mr-2" />
            Continue as Guest
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground pt-2">
          Guest mode lets you explore without creating an account.
          <br />
          Sign in later to save your progress.
        </p>
      </DialogContent>
    </Dialog>
  );
}

