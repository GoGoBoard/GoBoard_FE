import { useCallback, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Snackbar,
  TextField,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { writeComment } from '../api/article/writeComment';

export function CommentWrite({ articleIdx }: { articleIdx: number }) {
  const [comment, setComment] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const queryClient = useQueryClient();
  const writeMutation = useMutation({
    mutationFn: (writeCommentOpts: { content: string }) =>
      writeComment({ articleIdx, ...writeCommentOpts }),
  });

  const writeCallback = useCallback(() => {
    writeMutation.mutate(
      { content: comment },
      {
        onSuccess: (data) => {
          setSnackbarOpen(true);
          setIsSuccess(data.success);

          if (data.success) {
            queryClient.invalidateQueries({
              queryKey: ['getComments', articleIdx],
            });
          }
        },
        onError: () => {
          setSnackbarOpen(true);
          setIsSuccess(false);
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={isSuccess ? 'Wrote successfully' : 'Write failed'}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </Paper>
  );
}
