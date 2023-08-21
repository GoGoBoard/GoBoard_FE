import { ArticleListDTO } from '../../types/article';
import { GetApi } from '../fetch';

type ListBoardRequest = { page: number };

export const listBoard = ({ page }: ListBoardRequest) =>
  GetApi<ArticleListDTO>(`/api/article/paging?p=${page}`);
