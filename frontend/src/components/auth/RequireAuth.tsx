import { ReactNode, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AuthGateModal } from "./AuthGateModal";

interface RequireAuthProps {
  children: ReactNode;
}

/**
 * Route guard that shows the auth gate modal if user is not authenticated or guest.
 * If authenticated, renders children directly.
 */
export function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated, isGuest } = useAuth();
  const [modalOpen, setModalOpen] = useState(true);

  // If user is authenticated or guest, allow access
  if (isAuthenticated || isGuest) {
    return <>{children}</>;
  }

  // Otherwise show the auth gate modal
  return (
    <>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center animate-pulse">
            <span className="text-2xl font-bold text-accent">E</span>
          </div>
          <p className="text-muted-foreground">Loading Eligify AI...</p>
        </div>
      </div>
      <AuthGateModal open={modalOpen} onOpenChange={setModalOpen} redirectPath="/app" />
    </>
  );
}

