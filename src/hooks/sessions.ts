import { useSetRecoilState } from 'recoil';

import { sessionState } from '../stores/session';

export function useSessionLogin() {
  const setSession = useSetRecoilState(sessionState);

  return () => {
    sessionStorage.setItem('session.login', 'true');
    setSession({
      login: true,
    });
  };
}

export function useSessionLogout() {
  const setSession = useSetRecoilState(sessionState);

  return () => {
    sessionStorage.removeItem('session.login');
    setSession({
      login: false,
    });
  };
}
