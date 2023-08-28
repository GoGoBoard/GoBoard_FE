import { LogoutRequestDto, LogoutResponseDto } from '../../types/auth';
import { PostApi } from '../fetch';

export const logout = (req: LogoutRequestDto) =>
  PostApi<LogoutResponseDto, unknown>(`/api/member/login`, req);
