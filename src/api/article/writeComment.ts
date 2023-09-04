import {
  CommentWriteRequestDto,
  CommentWriteResponseDto,
} from '../../types/comment';
import { PostApi } from '../fetch';

export type CommentsResponse = { success: boolean };

export const writeComment = ({
  articleIdx,
  content,
}: CommentWriteRequestDto & { articleIdx: number }) =>
  PostApi<CommentWriteResponseDto, CommentWriteRequestDto>(
    `/api/comment/${articleIdx}`,
    {
      content,
    },
  );
