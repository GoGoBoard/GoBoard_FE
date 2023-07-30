import { Suspense } from 'react';

import { Container } from '@mui/material';

import { ArticleList, ArticleListFallback } from '../components/ArticleList';

export default function Board() {
  return (
    <Container maxWidth="md">
      <Suspense fallback={<ArticleListFallback />}>
        <ArticleList />
      </Suspense>
    </Container>
  );
}
