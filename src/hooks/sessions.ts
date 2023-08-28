import { useSetRecoilState } from 'recoil';

import { sessionState } from '../stores/session';

export function useSessionLogin() {
  const setSession = useSetRecoilState(sessionState);
  return () =>
    setSession({
      login: true,
    });
}

export function useSessionLogout() {
  const setSession = useSetRecoilState(sessionState);

  return () =>
    setSession({
      login: false,
    });
}
