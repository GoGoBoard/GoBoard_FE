import { SignupRequestDto, SignupResponseDto } from '../../types/auth';
import { PostApi } from '../fetch';

export const signup = (req: SignupRequestDto) =>
  PostApi<SignupResponseDto, SignupRequestDto>(`/api/member/join`, req);
