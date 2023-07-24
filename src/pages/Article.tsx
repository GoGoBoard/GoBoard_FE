import { useMemo } from 'react';

import { Container, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function Article() {
  const params = useParams();
  const articleIdx = useMemo(() => +(params.articleIdx ?? '0'), [params]);

  return (
    <Container maxWidth="md">
      <Stack spacing={2} alignItems={'center'} my={4}>
        <Typography variant="h4">Article {articleIdx}</Typography>
      </Stack>
    </Container>
  );
}
