import { useState } from 'react';

import {
  Box,
  Pagination,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { DateTime } from './DateTime';
import { listBoard } from '../api/board/list';

function ArticleListHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">Index</TableCell>
        <TableCell align="center">Title</TableCell>
        <TableCell align="center">Author</TableCell>
        <TableCell align="center">Date</TableCell>
        <TableCell align="center">Likes</TableCell>
      </TableRow>
    </TableHead>
  );
}

function SkeletonCell() {
  return (
    <TableCell align="center">
      <Skeleton />
    </TableCell>
  );
}

export function ArticleListFallback() {
  return (
    <Stack spacing={2} alignItems={'center'} my={4}>
      <Typography variant="h4">Board Page</Typography>
      <TableContainer component={Box}>
        <Table sx={{ minWidth: 'sm' }}>
          <ArticleListHead />
          <TableBody>
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <TableRow hover key={idx}>
                  <SkeletonCell />
                  <SkeletonCell />
                  <SkeletonCell />
                  <SkeletonCell />
                  <SkeletonCell />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export function ArticleList() {
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['boardList', page],
    queryFn: () => listBoard({ page }),
  });

  return (
    <Stack spacing={2} alignItems={'center'} my={4}>
      <Typography variant="h4">Board Page</Typography>
      <TableContainer component={Box}>
        <Table sx={{ minWidth: 'sm' }}>
          <ArticleListHead />
          <TableBody>
            {data?.data.map((article) => (
              <TableRow
                hover
                key={article.index}
                onClick={() => navigate(`./article/${article.index}`)}
              >
                <TableCell align="center">{article.index}</TableCell>
                <TableCell align="center">{article.title}</TableCell>
                <TableCell align="center">{article.author}</TableCell>
                <TableCell align="center">
                  <DateTime timestamp={article.timestamp} />
                </TableCell>
                <TableCell align="center">{article.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={2}
        page={page}
        onChange={(_, newPage) => setPage(newPage)}
      />
    </Stack>
  );
}
