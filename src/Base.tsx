import { useMemo } from 'react';

import { Outlet, useMatches } from 'react-router-dom';

import { AuthGuard } from './components/AuthGuard';

type RouteAuthHandle = {
  authRequired: boolean;
};

export default function Base() {
  const routeMatches = useMatches();
  const isAuthRequired = useMemo(() => {
    return routeMatches.some((match) => {
      const handle = match.handle as RouteAuthHandle | undefined;
      return handle?.authRequired;
    });
  }, [routeMatches]);

  return isAuthRequired ? <AuthGuard /> : <Outlet />;
}
