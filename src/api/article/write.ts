import { ArticleWriteDto } from '../../types/article';
import { PostApi } from '../fetch';

type WriteArticleRequest = { title: string; content: string };

export const writeArticle = ({ title, content }: WriteArticleRequest) =>
  PostApi<ArticleWriteDto, WriteArticleRequest>(`/api/article`, {
    title,
    content,
  });
