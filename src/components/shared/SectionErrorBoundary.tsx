import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Section } from "./Section";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
  className?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SectionErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("SectionErrorBoundary caught an error:", error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Section className={cn("py-12", this.props.className)}>
          <div className="flex flex-col items-center justify-center rounded-3xl border-4 border-foreground bg-card p-8 text-center shadow-retro-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h3 className="font-groovy text-xl font-bold text-foreground md:text-2xl">
              Oops, something broke here.
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground md:text-base">
              {this.props.fallbackMessage ||
                "This section failed to load. Don't worry, the rest of NASO is still working."}
            </p>
            <button
              onClick={this.handleReset}
              className="mt-6 flex items-center gap-2 rounded-full border-2 border-foreground bg-primary px-6 py-2.5 font-groovy text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-[2px_2px_0_hsl(var(--foreground))] transition-all hover:bg-primary/90 active:translate-y-0.5 active:shadow-none"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        </Section>
      );
    }

    return this.props.children;
  }
}
