import { LoginRequestDto, LoginResponseDto } from '../../types/auth';
import { PostApi } from '../fetch';

export const login = (request: LoginRequestDto) =>
  PostApi<LoginResponseDto, LoginRequestDto>(`/api/member/login`, request);
