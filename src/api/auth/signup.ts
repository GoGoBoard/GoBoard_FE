import { MockApi } from '../fetch';

type SignupResponse =
  | {
      success: true;
    }
  | {
      success: false;
      idErr: boolean;
      pwErr: boolean;
    };

export const signup = MockApi<SignupResponse, { id: string; password: string }>(
  { success: true },
);
