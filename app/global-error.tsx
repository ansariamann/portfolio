"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="w-full max-w-xl rounded-2xl border border-ink/10 bg-surface p-8 text-center shadow-sm">
            <p className="section-label mb-4">Application error</p>
            <h1 className="text-3xl font-bold tracking-tight">
              The app hit a critical error
            </h1>
            <p className="mt-4 text-muted-foreground">
              {error.message || "A fatal rendering error occurred."}
            </p>
            <div className="mt-8 flex justify-center">
              <button type="button" onClick={reset} className="btn-primary">
                Reload app
              </button>
            </div>
            {process.env.NODE_ENV === "development" && error.digest ? (
              <p className="mt-6 text-sm text-muted-foreground">
                Digest: {error.digest}
              </p>
            ) : null}
          </div>
        </div>
      </body>
    </html>
  );
}
