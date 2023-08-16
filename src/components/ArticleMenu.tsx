import { useCallback, useState } from 'react';

import { Button, Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import CloseableSnackbar from './ClosableSnackbar';
import { deleteArticle } from '../api/article/delete';

type ArticleMenuProps = {
  articleIdx: number;
};
export default function ArticleMenu({ articleIdx }: ArticleMenuProps) {
  const navigate = useNavigate();
  const [snackbarText, setSnackbarText] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationKey: ['delete', articleIdx],
    mutationFn: () => deleteArticle({ articleIdx }),
  });

  const backToListCallback = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const deleteCallback = useCallback(() => {
    deleteMutation.mutate(undefined, {
      onSuccess: backToListCallback,
      onError: () => {
        setSnackbarText('게시글 삭제에 실패했습니다');
      },
    });
  }, [deleteMutation, backToListCallback]);

  return (
    <Stack spacing={2} direction="row" justifyContent="flex-end">
      <Button variant="contained" onClick={backToListCallback}>
        LIST
      </Button>
      <Button variant="contained" color="secondary" onClick={deleteCallback}>
        DELETE
      </Button>
      <CloseableSnackbar snackbarText={snackbarText} />
    </Stack>
  );
}
