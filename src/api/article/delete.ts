import { DeleteApi } from '../fetch';

type ReadArticleRequest = { articleIdx: number };

export const deleteArticle = ({ articleIdx }: ReadArticleRequest) =>
  DeleteApi<unknown>(`/api/article/${articleIdx}`);
