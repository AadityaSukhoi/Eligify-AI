import React, { ReactNode, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight, UserPlus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProtectedFeatureProps {
  featureName: string;
  children: ReactNode;
  className?: string;
}

export function ProtectedFeature({ featureName, children, className = "" }: ProtectedFeatureProps) {
  const { isAuthenticated, isGuest, setGuest } = useAuth() ;
  const navigate = useNavigate();

  if (isAuthenticated || isGuest) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`flex items-center justify-center min-h-[400px] p-6 ${className}`}>
      <Card className="w-full max-w-md mx-auto luxe-card">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-xl font-semibold">Login to use {featureName}</CardTitle>
          <CardDescription>
            Sign in for personalized recommendations and full access.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          <Alert>
            <AlertDescription className="text-sm">
              Your login unlocks tailored eligibility checks across 800+ schemes, saved conversations, 
              and priority access to new programs.
            </AlertDescription>
          </Alert>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              onClick={() => navigate("/login")} 
              className="flex-1 font-semibold"
            >
              Login
              <ArrowRight className="w-4 h-4 ml-1 text-primary-foreground" />
            </Button>
            <Button 
              onClick={() => navigate("/register")} 
              variant="outline"
              className="flex-1 text-foreground"
            >
              <UserPlus className="w-4 h-4 mr-1 text-foreground" />
              Sign Up
            </Button>
            <Button 
              onClick={() => setGuest(true)}
              variant="ghost"
              className="flex-1 text-muted-foreground hover:text-foreground border border-border"
            >
              <Eye className="w-4 h-4 mr-1 text-muted-foreground" />
              Continue as Guest
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

