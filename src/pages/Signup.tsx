import { useCallback, useState } from 'react';

import {
  Button,
  Container,
  Stack,
  Switch,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { signup } from '../api/auth/signup';

export default function Signup() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [idErr, setIdErr] = useState(false);
  const [password, setPassword] = useState('');
  const [pwErr, setPwErr] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const signupMutation = useMutation({
    mutationFn: (signupInfo: { id: string; password: string }) =>
      signup(signupInfo),
  });

  const validateAndSignup = useCallback(() => {
    setIdErr(id.length === 0);
    setPwErr(password.length === 0);

    if (id.length > 0 && password.length > 0) {
      signupMutation.mutate(
        { id, password },
        {
          onSuccess: (data) => {
            if (data.success) {
              // navigate to welcome page
              setShowSuccessDialog(true);
            } else {
              setIdErr(data.idErr);
              setPwErr(data.pwErr);
            }
          },
          onError: () => {
            setIdErr(true);
            setPassword('');
          },
        },
      );
    }
  }, [id, password, signupMutation]);

  return (
    <Container maxWidth="sm">
      <Stack spacing={4}>
        <Typography variant="h1" align="center" mt={12}>
          Nice to meet you!
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
              type={showPassword ? 'text' : 'password'}
              value={password}
              error={pwErr}
              onChange={({ target }) => setPassword(target.value)}
            />

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <Typography>Hide</Typography>
              <Switch
                value={showPassword}
                onChange={({ target }) => setShowPassword(target.checked)}
              />
              <Typography>Show</Typography>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              onClick={validateAndSignup}
            >
              SIGNUP
            </Button>
          </Stack>
        </form>
        <Dialog open={showSuccessDialog}>
          <DialogTitle>Signup Success</DialogTitle>
          <DialogContent>
            Welcome to the GoBoard! You can now login with this account.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => navigate('/login')}>
              GO TO THE LOGIN PAGE
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
}
