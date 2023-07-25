import { Typography } from '@mui/material';

interface DateTimeProps {
  timestamp?: number;
}

export function DateTime({ timestamp }: DateTimeProps) {
  return <Typography>{new Date(timestamp ?? 0).toString()}</Typography>;
}
