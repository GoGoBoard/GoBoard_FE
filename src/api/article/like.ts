import {
  ArticleLikeRequestDto,
  ArticleLikeResponseDto,
} from '../../types/article';
import { PostApi } from '../fetch';

export const likeArticle = ({ articleIdx }: { articleIdx: number }) =>
  PostApi<ArticleLikeResponseDto, ArticleLikeRequestDto>(
    `/api/article/${articleIdx}/like`,
    {},
  );
