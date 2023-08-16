import { ArticleDTO } from '../../types/article';
import { PostApi } from '../fetch';

type WriteArticleRequest = { title: string; content: string };

export const writeArticle = ({ title, content }: WriteArticleRequest) =>
  PostApi<ArticleDTO, WriteArticleRequest>(`/api/article`, { title, content });
