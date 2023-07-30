import { Avatar, Skeleton, Stack, Typography } from '@mui/material';

type UserAvatarProps = {
  author?: string;
};

export function UserAvatarFallback() {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Skeleton variant="circular">
        <Avatar />
      </Skeleton>
      <Typography variant="subtitle1">
        <Skeleton variant="text" width="8ch" />
      </Typography>
    </Stack>
  );
}

export function UserAvatar({ author }: UserAvatarProps) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Avatar />
      <Typography variant="subtitle1">{author ?? 'unknown'}</Typography>
    </Stack>
  );
}
