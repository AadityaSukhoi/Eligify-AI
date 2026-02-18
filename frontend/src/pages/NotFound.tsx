import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-secondary/40 via-background to-secondary/20">
      <div className="luxe-card px-8 py-10 text-center max-w-lg">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Page not found</p>
        <h1 className="font-editorial text-5xl md:text-6xl font-semibold text-foreground mb-3">404</h1>
        <p className="mb-6 text-base text-muted-foreground">
          The page you are looking for does not exist. Let us take you back to a verified path.
        </p>
        <a href="/" className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
