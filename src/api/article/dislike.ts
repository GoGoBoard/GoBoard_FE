import {
  ArticleDislikeRequestDto,
  ArticleDislikeResponseDto,
} from '../../types/article';
import { PostApi } from '../fetch';

export const dislikeArticle = ({ articleIdx }: { articleIdx: number }) =>
  PostApi<ArticleDislikeResponseDto, ArticleDislikeRequestDto>(
    `/api/article/${articleIdx}/dislike`,
    {},
  );
