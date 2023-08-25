import { Typography, TypographyProps } from '@mui/material';

interface DateTimeProps extends TypographyProps {
  timestamp?: number | string;
}

function padNumber(value: number, length: number = 2) {
  return value.toString().padStart(length, '0');
}

function RecentTime({ timeDiff }: { timeDiff: number }) {
  if (timeDiff > 60 * 1000) {
    return <>{Math.floor(timeDiff / (60 * 1000))}분 전</>;
  }

  return <>{Math.floor(timeDiff / 1000)}초 전</>;
}

export function DateTime(props: DateTimeProps) {
  const date = new Date(props.timestamp ?? 0);
  const timeDiff = Date.now() - date.getTime();

  return (
    <Typography {...props}>
      {timeDiff < 3600 * 1000 ? (
        <RecentTime timeDiff={timeDiff} />
      ) : (
        <>
          {padNumber(date.getFullYear())}-{padNumber(date.getMonth() + 1)}-
          {padNumber(date.getDate())} {date.getHours() < 12 ? '오전' : '오후'}{' '}
          {date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:
          {padNumber(date.getMinutes())}
        </>
      )}
    </Typography>
  );
}
