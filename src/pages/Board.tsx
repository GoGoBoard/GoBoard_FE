import { useState } from 'react';

import {
  Box,
  Container,
  Pagination,
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

import { listBoard } from '../api/board/list';

export default function Board() {
  const [page, setPage] = useState(0);
  const { data } = useQuery({
    queryKey: ['boardList', page],
    queryFn: () => listBoard({ page }),
  });

  return (
    <Container maxWidth="sm">
      <Stack spacing={2} alignItems={'center'} my={4}>
        <Typography variant="h4">Board Page</Typography>
        <TableContainer component={Box}>
          <Table sx={{ minWidth: 'sm' }}>
            <TableHead>
              <TableCell align="center">Index</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Author</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Likes</TableCell>
            </TableHead>
            <TableBody>
              {data?.data.map((article) => (
                <TableRow key={article.index}>
                  <TableCell align="center">{article.index}</TableCell>
                  <TableCell align="center">{article.title}</TableCell>
                  <TableCell align="center">{article.author}</TableCell>
                  <TableCell align="center">{article.timestamp}</TableCell>
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
    </Container>
  );
}
