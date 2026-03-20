import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Route-level Error Boundary.
 * Catches runtime errors in child components and shows a recovery UI
 * instead of a white screen.
 */
export class RouteErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[RouteErrorBoundary] Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
          <h1 className="font-groovy text-3xl font-bold">Something went wrong</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            An unexpected error occurred. Try refreshing the page or head back home.
          </p>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <pre className="mt-2 max-w-lg overflow-auto rounded-lg bg-muted p-4 text-left text-xs text-destructive">
              {this.state.error.message}
            </pre>
          )}
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="rounded-full border-2 border-foreground bg-card px-6 py-2.5 font-groovy text-[10px] font-bold uppercase tracking-wider transition-shadow hover:shadow-retro"
            >
              Refresh Page
            </button>
            <Link
              to={ROUTES.HOME}
              className="rounded-full border-2 border-foreground bg-primary px-6 py-2.5 font-groovy text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-retro transition-shadow hover:shadow-retro-lg"
            >
              Go Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
