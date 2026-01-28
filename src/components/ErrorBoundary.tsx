"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-[200px] flex flex-col items-center justify-center p-8 bg-zinc-50 rounded-2xl">
          <p className="text-[#2a1c2f]/50 font-black uppercase tracking-widest text-[11px] text-center">
            Something went wrong. Please refresh the page.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
