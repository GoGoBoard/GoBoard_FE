export type LoginRequestDto = {
  loginId: string;
  password: string;
};

export type LoginResponseDto = {
  nickname: string;
};

export type SignupRequestDto = {
  loginId: string;
  password: string;
  nickname: string;
};

export type SignupResponseDto = {
  nickname: string;
};

export type LogoutRequestDto = Record<string, never>;
export type LogoutResponseDto = Record<string, never>;
