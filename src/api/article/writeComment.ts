import { MockApi } from '../fetch';

export type CommentsResponse = { success: boolean };

export const writeComment = MockApi<
  CommentsResponse,
  { articleIdx: number; content: string }
>({ success: true });
