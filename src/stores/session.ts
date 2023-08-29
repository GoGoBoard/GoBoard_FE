import { atom } from 'recoil';

type SessionState = {
  login: boolean;
};

export const sessionState = atom<SessionState>({
  key: 'sessionState',
  default: {
    login: sessionStorage.getItem('session.login') === 'true',
  },
});
