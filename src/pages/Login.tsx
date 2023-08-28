import { useCallback, useState } from 'react';

import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { login } from '../api/auth/login';
import { useSessionLogin } from '../hooks/sessions';

export default function Login() {
  const [id, setId] = useState('');
  const [idErr, setIdErr] = useState(false);
  const [password, setPassword] = useState('');
  const [pwErr, setPwErr] = useState(false);

  const navigate = useNavigate();

  const loginQuery = useMutation({
    mutationFn: login,
  });
  const sessionLogin = useSessionLogin();

  const validateAndLogin = useCallback(() => {
    setIdErr(id.length === 0);
    setPwErr(password.length === 0);

    if (id.length > 0 && password.length > 0) {
      loginQuery.mutate(
        { loginId: id, password },
        {
          onSuccess: () => {
            sessionLogin();
            navigate('/board');
          },
          onError: () => {
            setIdErr(true);
            setPassword('');
          },
        },
      );
    }
  }, [id, password, loginQuery, navigate, sessionLogin]);

  return (
    <Container maxWidth="sm">
      <Stack spacing={8}>
        <Typography variant="h1" align="center" mt={12}>
          Welcome
        </Typography>

        <form onSubmit={(e) => e.preventDefault()}>
          <Stack spacing={2}>
            <TextField
              variant="outlined"
              label="ID"
              value={id}
              error={idErr}
              onChange={({ target }) => setId(target.value)}
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              value={password}
              error={pwErr}
              onChange={({ target }) => setPassword(target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              onClick={validateAndLogin}
            >
              LOGIN
            </Button>
            <Button variant="contained" onClick={() => navigate('/signup')}>
              SIGNUP
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}
