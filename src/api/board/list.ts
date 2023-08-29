import {
  ArticleListRequestDto,
  ArticleListResponseDto,
} from '../../types/article';
import { GetApi } from '../fetch';

export const listBoard = ({ p }: ArticleListRequestDto) =>
  GetApi<ArticleListResponseDto>(`/api/article/paging?p=${p}`);
