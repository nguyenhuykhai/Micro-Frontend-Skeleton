import { Suspense } from "react";

export const withLazyLoading = (Component: React.ComponentType) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <Component />
    </Suspense>
  );
};
