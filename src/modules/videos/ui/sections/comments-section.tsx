import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const CommentsSection = () => {
  return (
    <Suspense fallback={<Skeleton className="h-1/2 w-full" />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <CommentsSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

export const CommentsSectionSuspense = () => {
  return <div>.</div>;
};
