import { ArticleRequestDto, ArticleResponseDto } from '../../types/article';
import { GetApi } from '../fetch';

export const readArticle = ({ articleIdx }: ArticleRequestDto) =>
  GetApi<ArticleResponseDto>(`/api/article/${articleIdx}`);
