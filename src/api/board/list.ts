import { MockApi } from '../fetch';

type BoardListItem = {
  index: number;
  title: string;
  author: string;
  timestamp: number;
  likes: number;
};
type ListBoardResponse = { data: BoardListItem[] };

export const listBoard = MockApi<ListBoardResponse, { page: number }>({
  data: [
    {
      index: 1,
      title: 'Test',
      author: 'admin',
      timestamp: Date.now(),
      likes: 123,
    },
    {
      index: 2,
      title: 'Test Second',
      author: 'tester',
      timestamp: Date.now() - 3600 * 1000,
      likes: 123,
    },
  ],
});
