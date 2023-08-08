import { ArticleDTO } from '../../types/article';
import { GetApi } from '../fetch';

type ReadArticleRequest = { articleIdx: number };

export const readArticle = ({ articleIdx }: ReadArticleRequest) =>
  GetApi<ArticleDTO>(`/api/article/${articleIdx}`);
