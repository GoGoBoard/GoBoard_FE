import { Suspense, useMemo } from 'react';

import {
  Avatar,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { readArticle } from '../api/article/read';
import { DateTime } from '../components/DateTime';

function ArticleFallbackContainer() {
  return (
    <Container maxWidth="md">
      <Stack spacing={2} sx={{ mt: 4 }}>
        <Typography variant="h3">
          <Skeleton variant="text" />
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
          <Typography variant="subtitle1">
            <Skeleton variant="text" width="8ch" />
          </Typography>
        </Stack>
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
    </Container>
  );
}

function ArticleContainer() {
  const params = useParams();
  const articleIdx = useMemo(() => +(params.articleIdx ?? '0'), [params]);

  const article = useQuery({
    queryKey: ['readArticle', articleIdx],
    queryFn: () => readArticle({ articleIdx }),
    suspense: true,
  });

  return (
    <Container maxWidth="md">
      <Stack spacing={2} sx={{ mt: 4 }}>
        <Typography variant="h3">{article.data?.data.title}</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar />
          <Typography variant="subtitle1">
            {article.data?.data.author}
          </Typography>
        </Stack>
        <DateTime timestamp={article.data?.data.timestamp} />
      </Stack>
      <Divider sx={{ my: 4 }} />
      <Stack>
        <Typography>{article.data?.data.content}</Typography>
      </Stack>
    </Container>
  );
}

export default function Article() {
  return (
    <Suspense fallback={<ArticleFallbackContainer />}>
      <ArticleContainer />
    </Suspense>
  );
}
