import { useMemo, Suspense } from 'react';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { useMatches } from 'react-router-dom';

import { AuthGuard } from './components/AuthGuard';
import ErrorMessage from './components/ErrorMessage';
import Loading from './components/Loading';
import { SafeOutlet } from './components/SafeOutlet';

type RouteAuthHandle = {
  authRequired: boolean;
  redirectTo: string;
};

export default function Base() {
  const routeMatches = useMatches();
  const nearestAuthOpts = useMemo(() => {
    let lastOpts: RouteAuthHandle | undefined = undefined;

    for (const route of routeMatches) {
      const handle = route.handle as RouteAuthHandle | undefined;
      if (handle !== undefined) {
        lastOpts = handle;
      }
    }

    return lastOpts;
  }, [routeMatches]);

  return nearestAuthOpts !== undefined ? (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorMessage resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <Suspense fallback={<Loading />}>
            <AuthGuard {...nearestAuthOpts} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  ) : (
    <SafeOutlet />
  );
}
