import { ArticleCommentDTO } from '../../types/comment';
import { GetApi } from '../fetch';

export const getComments = ({ articleIdx }: { articleIdx: number }) =>
  GetApi<ArticleCommentDTO>(`/api/comment/${articleIdx}`);
