import {
  ArticleWriteRequestDto,
  ArticleWriteResponseDto,
} from '../../types/article';
import { PostFormApi } from '../fetch';

export const writeArticle = ({
  title,
  content,
  files,
}: ArticleWriteRequestDto) =>
  PostFormApi<ArticleWriteResponseDto>(`/api/article`, {
    title,
    content,
    files,
  });
