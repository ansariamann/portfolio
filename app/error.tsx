"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("App route error", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border border-ink/10 bg-surface p-8 text-center shadow-sm">
        <p className="section-label mb-4">Something went wrong</p>
        <h1 className="text-3xl font-bold tracking-tight">This page failed to load</h1>
        <p className="mt-4 text-muted-foreground">
          {error.message || "An unexpected error occurred while rendering this route."}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button type="button" onClick={reset} className="btn-primary">
            Try again
          </button>
          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="btn-secondary"
          >
            Go home
          </button>
        </div>

        {process.env.NODE_ENV === "development" && error.digest ? (
          <p className="mt-6 text-sm text-muted-foreground">Digest: {error.digest}</p>
        ) : null}
      </div>
    </div>
  );
}
