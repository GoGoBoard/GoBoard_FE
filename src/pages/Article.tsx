import { Suspense, useMemo } from 'react';

import { Container, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';

import {
  ArticleContent,
  ArticleContentFallback,
} from '../components/ArticleContent';
import ArticleMenu from '../components/ArticleMenu';
import { CommentList, CommentListFallback } from '../components/CommentList';

export default function Article() {
  const params = useParams();
  const articleIdx = useMemo(() => +(params.articleIdx ?? '0'), [params]);

  return (
    <Container maxWidth="md">
      <Suspense
        fallback={
          <>
            <ArticleContentFallback />
            <Divider sx={{ my: 4 }} />
            <CommentListFallback />
          </>
        }
      >
        <ArticleContent articleIdx={articleIdx} />
        <Divider sx={{ my: 4 }} />
        <ArticleMenu articleIdx={articleIdx} />
        <CommentList articleIdx={articleIdx} />
      </Suspense>
    </Container>
  );
}
