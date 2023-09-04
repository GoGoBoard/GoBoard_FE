import { useCallback, useState } from 'react';

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Button, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import NotificationSnackbar from './NotificationSnackbar';
import { deleteArticle } from '../api/article/delete';
import { dislikeArticle } from '../api/article/dislike';
import { likeArticle } from '../api/article/like';
import { readArticle } from '../api/article/read';

type ArticleMenuProps = {
  articleIdx: number;
};
export default function ArticleMenu({ articleIdx }: ArticleMenuProps) {
  const navigate = useNavigate();
  const [snackbarText, setSnackbarText] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['readArticle', articleIdx],
    queryFn: () => readArticle({ articleIdx }),
  });

  const deleteMutation = useMutation({
    mutationKey: ['delete', articleIdx],
    mutationFn: () => deleteArticle({ articleIdx }),
  });

  const likeMutation = useMutation({
    mutationKey: ['like', articleIdx],
    mutationFn: () => likeArticle({ articleIdx }),
  });

  const dislikeMutation = useMutation({
    mutationKey: ['dislike', articleIdx],
    mutationFn: () => dislikeArticle({ articleIdx }),
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

  const likeCallback = useCallback(() => {
    likeMutation.mutate(undefined, {
      onSuccess: () => {
        setSnackbarText('게시글에 공감했습니다');
        queryClient.invalidateQueries(['readArticle', articleIdx]);
      },
      onError: () => {
        setSnackbarText('게시글에 공감하는 데 오류가 발생했습니다');
      },
    });
  }, [articleIdx, queryClient, likeMutation]);

  const dislikeCallback = useCallback(() => {
    dislikeMutation.mutate(undefined, {
      onSuccess: () => {
        setSnackbarText('게시글에 비공감했습니다');
        queryClient.invalidateQueries(['readArticle', articleIdx]);
      },
      onError: () => {
        setSnackbarText('게시글에 비공감하는 데 오류가 발생했습니다');
      },
    });
  }, [articleIdx, queryClient, dislikeMutation]);

  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction="row" justifyContent="center">
        <Button variant="outlined" onClick={likeCallback}>
          <ThumbUpIcon />
          <Typography>LIKE {data?.like ?? 0}</Typography>
        </Button>

        <Button variant="outlined" onClick={dislikeCallback}>
          <ThumbDownIcon />
          <Typography>DISLIKE {data?.dislike ?? 0}</Typography>
        </Button>
      </Stack>
      <Stack spacing={2} direction="row" justifyContent="flex-end">
        <Button variant="contained" onClick={backToListCallback}>
          LIST
        </Button>
        <Button variant="contained" color="secondary" onClick={deleteCallback}>
          DELETE
        </Button>
        <NotificationSnackbar
          snackbarText={snackbarText}
          onClose={() => setSnackbarText(null)}
        />
      </Stack>
    </Stack>
  );
}
