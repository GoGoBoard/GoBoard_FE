import { CircularProgress, Stack, Typography } from '@mui/material';

export default function Loading() {
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
      <CircularProgress />
      <Typography variant="h4">Loading...</Typography>
    </Stack>
  );
}
