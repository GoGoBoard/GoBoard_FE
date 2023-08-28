import { useCallback } from 'react';

import ErrorIcon from '@mui/icons-material/Error';
import { Button, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { logout } from '../api/auth/logout';
import { useSessionLogout } from '../hooks/sessions';

export default function ErrorMessage({
  resetErrorBoundary,
}: {
  resetErrorBoundary?: () => void;
}) {
  const navigate = useNavigate();
  const sessionLogout = useSessionLogout();
  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
  });

  const logoutCallback = useCallback(() => {
    logoutMutation.mutate(
      {},
      {
        onSuccess: () => {
          sessionLogout();
          navigate('/');
        },
        onError: () => {
          sessionLogout();
          navigate('/');
        },
      },
    );
  }, [logoutMutation, navigate, sessionLogout]);

  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2">
        <ErrorIcon fontSize="inherit" />
      </Typography>
      <Typography variant="h4" color="error">
        Error!
      </Typography>
      <Typography variant="body1">Sorry for your inconvinience.</Typography>
      <Button
        color="secondary"
        onClick={resetErrorBoundary || (() => navigate(0))}
      >
        Try again
      </Button>
      <Button color="secondary" onClick={logoutCallback}>
        Back to the home
      </Button>
    </Stack>
  );
}
