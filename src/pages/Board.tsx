import { Suspense, useMemo } from 'react';

import { Container, Pagination, Stack } from '@mui/material';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';

import { ArticleList, ArticleListFallback } from '../components/ArticleList';

export default function Board() {
  const navigate = useNavigate();
  const loc = useLocation();

  const page = useMemo(() => {
    const { p } = qs.parse(loc.search, { ignoreQueryPrefix: true });
    return parseInt((p ?? '1') as string);
  }, [loc.search]);

  return (
    <Container maxWidth="md">
      <Suspense fallback={<ArticleListFallback />}>
        <Stack spacing={2} alignItems={'center'} my={4}>
          <ArticleList page={page} />

          <Pagination
            count={5}
            page={page}
            onChange={(_, newPage) => navigate(`?p=${newPage}`)}
          />
        </Stack>
      </Suspense>
    </Container>
  );
}
