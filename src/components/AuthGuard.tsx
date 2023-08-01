import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { SafeOutlet } from './SafeOutlet';
import { getSession } from '../api/auth/session';

type AuthGuardProps = {
  authRequired: boolean;
  redirectTo: string;
};

export function AuthGuard({ authRequired, redirectTo }: AuthGuardProps) {
  const { data } = useQuery({
    queryKey: ['sessionCheck'],
    queryFn: () => getSession({}),
    staleTime: Infinity,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // This page requires auth and failed to validate session
    if (authRequired && !data?.success) {
      navigate(redirectTo);
    }

    // This page requires non-auth and success to validate session
    if (!authRequired && data?.success) {
      navigate(redirectTo);
    }
  }, [authRequired, redirectTo, data, navigate]);

  return <SafeOutlet />;
}
