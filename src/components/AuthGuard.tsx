import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { SafeOutlet } from './SafeOutlet';
import { sessionState } from '../stores/session';

type AuthGuardProps = {
  authRequired: boolean;
  redirectTo: string;
};

export function AuthGuard({ authRequired, redirectTo }: AuthGuardProps) {
  const session = useRecoilValue(sessionState);
  const navigate = useNavigate();

  useEffect(() => {
    // This page requires auth and failed to validate session
    if (authRequired && !session.login) {
      navigate(redirectTo);
    }

    // This page requires non-auth and success to validate session
    if (!authRequired && session.login) {
      navigate(redirectTo);
    }
  }, [authRequired, redirectTo, session.login, navigate]);

  return <SafeOutlet />;
}
