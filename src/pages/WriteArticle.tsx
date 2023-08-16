import { useCallback, useRef, useState } from 'react';

import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { filterXSS } from 'xss';

import { writeArticle } from '../api/article/write';
import ArticleWriter from '../components/ArticleWriter';
import NotificationSnackbar from '../components/NotificationSnackbar';

import type { RichTextEditorRef } from 'mui-tiptap';

export default function WriteArticle() {
  const navigate = useNavigate();

  const rteRef = useRef<RichTextEditorRef>(null);

  const [title, setTitle] = useState('');
  const [snackbarText, setSnackbarText] = useState<string | null>(null);

  const postMutation = useMutation({
    mutationKey: ['post', Date.now()],
    mutationFn: (writeArticleOpts: { title: string; content: string }) =>
      writeArticle(writeArticleOpts),
  });

  const validateAndPost = useCallback(() => {
    if (title.length < 1) {
      setSnackbarText('제목을 입력해주세요');
      return;
    }

    const unsafeHTML = rteRef.current?.editor?.getHTML();

    if (unsafeHTML === undefined) {
      setSnackbarText('알 수 없는 오류가 발생하였습니다');
      return;
    }

    const safeHTML = filterXSS(unsafeHTML);
    // post with this safeHTML
    postMutation.mutate(
      {
        title,
        content: safeHTML,
      },
      {
        onSuccess: (data) => {
          if (data.postId) {
            navigate(`/board/article/${data.postId}`);
          } else {
            setSnackbarText('서버에서 알 수 없는 오류가 발생하였습니다');
          }
        },
        onError: () => {
          setSnackbarText('서버에서 알 수 없는 오류가 발생하였습니다');
        },
      },
    );
  }, [navigate, postMutation, title]);

  return (
    <Container maxWidth="md">
      <Stack spacing={2} alignItems={'stretch'} my={4}>
        <Typography variant="h4" textAlign="center">
          Write a new article
        </Typography>
        <TextField
          label="ARTICLE TITLE"
          placeholder="TITLE"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <ArticleWriter rteRef={rteRef} />
        <Button
          variant="contained"
          onClick={validateAndPost}
          sx={{ alignSelf: 'end' }}
        >
          WRITE
        </Button>
      </Stack>
      <NotificationSnackbar snackbarText={snackbarText} />
    </Container>
  );
}
