import { Paper, Skeleton, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { CommentWrite } from './CommentWrite';
import { DateTime } from './DateTime';
import { UserAvatar, UserAvatarFallback } from './UserAvatar';
import { getComments } from '../api/article/comment';
import { ArticleComment } from '../types/comment';

type CommentListProps = {
  articleIdx: number;
};

function CommentFallback() {
  return (
    <Paper elevation={1} sx={{ padding: 2 }}>
      <Stack spacing={1}>
        <UserAvatarFallback />
        <Typography variant="body2">
          <Skeleton />
        </Typography>
        <Typography variant="body2">
          <Skeleton />
        </Typography>
      </Stack>
    </Paper>
  );
}

function Comment({ comment }: { comment: ArticleComment }) {
  return (
    <Paper elevation={1} sx={{ padding: 2 }}>
      <Stack spacing={1}>
        <UserAvatar author={comment.nickname} />
        <Typography variant="body2">{comment.content}</Typography>
        <DateTime variant="body2" timestamp={comment.writeTime} />
      </Stack>
    </Paper>
  );
}

export function CommentListFallback() {
  return (
    <>
      <Typography variant="h6">댓글 0개</Typography>

      <Stack spacing={4} padding={2}>
        <CommentFallback />
        <CommentFallback />
      </Stack>
    </>
  );
}

export function CommentList({ articleIdx }: CommentListProps) {
  const comments = useQuery({
    queryKey: ['getComments', articleIdx],
    queryFn: () => getComments({ articleIdx }),
  });

  comments.data;

  return (
    <>
      <Typography variant="h6">댓글 {comments.data?.length ?? 0}개</Typography>

      <Stack spacing={4} padding={2}>
        {comments?.data?.map((comment) => (
          <Comment key={comment.writeTime} comment={comment} />
        ))}

        <CommentWrite articleIdx={articleIdx} />
      </Stack>
    </>
  );
}
