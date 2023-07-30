import { MockApi } from '../fetch';

export type ArticleComment = {
  index: number;
  content: string;
  author: string;
  timestamp: number;
};
export type CommentsResponse = { data: ArticleComment[] };

export const getComments = MockApi<CommentsResponse, { articleIdx: number }>({
  data: [
    {
      index: 123,
      author: 'admin',
      content: `Test comment text.`,
      timestamp: Date.now() - 3600 * 1000,
    },
  ],
});
