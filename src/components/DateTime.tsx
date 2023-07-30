import { Typography, TypographyProps } from '@mui/material';

interface DateTimeProps extends TypographyProps {
  timestamp?: number;
}

export function DateTime(props: DateTimeProps) {
  return (
    <Typography {...props}>
      {new Date(props.timestamp ?? 0).toString()}
    </Typography>
  );
}
