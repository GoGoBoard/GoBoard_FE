import { useCallback, useState } from 'react';

import { Button, Paper, Stack, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import NotificationSnackbar from './NotificationSnackbar';
import { writeComment } from '../api/article/writeComment';

export function CommentWrite({ articleIdx }: { articleIdx: number }) {
  const [comment, setComment] = useState('');
  const [snackbarText, setSnackbarText] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const writeMutation = useMutation({
    mutationFn: (writeCommentOpts: { content: string }) =>
      writeComment({ articleIdx, ...writeCommentOpts }),
  });

  const writeCallback = useCallback(() => {
    writeMutation.mutate(
      { content: comment },
      {
        onSuccess: () => {
          setSnackbarText('댓글이 작성되었습니다');

          queryClient.invalidateQueries({
            queryKey: ['getComments', articleIdx],
          });
        },
        onError: () => {
          setSnackbarText('댓글 작성에 실패했습니다');
        },
      },
    );
  }, [articleIdx, comment, queryClient, writeMutation]);

  return (
    <Paper elevation={1} sx={{ padding: 2 }}>
      <Stack spacing={1} direction="row">
        <TextField
          label="NEW COMMENT"
          placeholder="Write a comment..."
          multiline
          sx={{ flexGrow: 1 }}
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant="contained" onClick={writeCallback}>
          WRITE
        </Button>
      </Stack>
      <NotificationSnackbar snackbarText={snackbarText} />
    </Paper>
  );
}
