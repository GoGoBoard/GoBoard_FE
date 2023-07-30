import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { UserAvatar, UserAvatarFallback } from './UserAvatar';
import { readArticle } from '../api/article/read';
import { DateTime } from '../components/DateTime';

type ArticleContentProps = {
  articleIdx: number;
};

export function ArticleContentFallback() {
  return (
    <>
      <Stack spacing={2} sx={{ mt: 4 }}>
        <Typography variant="h3">
          <Skeleton variant="text" />
        </Typography>
        <UserAvatarFallback />
        <Skeleton variant="text" />
      </Stack>
      <Divider sx={{ my: 4 }} />
      <Stack>
        <Typography>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Typography>
      </Stack>
    </>
  );
}

export function ArticleContent({ articleIdx }: ArticleContentProps) {
  const article = useQuery({
    queryKey: ['readArticle', articleIdx],
    queryFn: () => readArticle({ articleIdx }),
    suspense: true,
  });

  return (
    <>
      <Stack spacing={2} sx={{ mt: 4 }}>
        <Typography variant="h3">{article.data?.data.title}</Typography>
        <UserAvatar author={article.data?.data.author} />
        <DateTime timestamp={article.data?.data.timestamp} />
      </Stack>
      <Divider sx={{ my: 4 }} />
      <Stack>
        <Typography>{article.data?.data.content}</Typography>
      </Stack>
    </>
  );
}
