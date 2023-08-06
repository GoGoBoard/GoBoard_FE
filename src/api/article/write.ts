import { MockApi } from '../fetch';

export type ReadArticleResponse = { success: boolean };

export const writeArticle = MockApi<
  ReadArticleResponse,
  { title: string; content: string }
>({ success: true }, 1);
