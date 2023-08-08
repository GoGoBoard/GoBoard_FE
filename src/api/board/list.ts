import { ArticleDTO } from '../../types/article';
import { GetApi } from '../fetch';

type ListBoardRequest = { page: number };

export const listBoard = ({ page }: ListBoardRequest) =>
  GetApi<ArticleDTO[]>(`/api/article?p=${page}`);
