"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[projects]", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
      <h1 className="text-heading text-foreground">Unable to load projects</h1>
      <p className="mt-4 text-body text-muted-foreground">
        Content is temporarily unavailable. Please try again in a moment.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button type="button" onClick={() => reset()}>
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
