import ErrorIcon from '@mui/icons-material/Error';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ErrorMessage({
  resetErrorBoundary,
}: {
  resetErrorBoundary?: () => void;
}) {
  const navigate = useNavigate();

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
    </Stack>
  );
}
