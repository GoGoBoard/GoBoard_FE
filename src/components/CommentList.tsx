import { Paper, Skeleton, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { DateTime } from './DateTime';
import { UserAvatar, UserAvatarFallback } from './UserAvatar';
import { ArticleComment, getComments } from '../api/article/comment';

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
        <UserAvatar author={comment.author} />
        <Typography variant="body2">{comment.content}</Typography>
        <DateTime variant="body2" timestamp={comment.timestamp} />
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
    queryKey: ['getCOmments', articleIdx],
    queryFn: () => getComments({ articleIdx }),
    suspense: true,
  });

  return (
    <>
      <Typography variant="h6">
        댓글 {comments.data?.data.length ?? 0}개
      </Typography>

      <Stack spacing={4} padding={2}>
        {comments.data?.data.map((comment) => (
          <Comment key={comment.index} comment={comment} />
        ))}
      </Stack>
    </>
  );
}
