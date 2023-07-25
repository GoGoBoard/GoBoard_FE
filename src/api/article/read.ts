import { MockApi } from '../fetch';

export type ArticleDetails = {
  index: number;
  title: string;
  content: string;
  author: string;
  timestamp: number;
  likes: number;
};
export type ReadArticleResponse = { data: ArticleDetails };

export const readArticle = MockApi<ReadArticleResponse, { articleIdx: number }>(
  {
    data: {
      index: 1,
      title: 'Test',
      author: 'admin',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      timestamp: Date.now() - 3600 * 1000,
      likes: 123,
    },
  },
);
