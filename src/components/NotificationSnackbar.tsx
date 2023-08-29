import { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar } from '@mui/material';

type NotificationSnackbarProps = {
  snackbarText: string | null;
};

export default function NotificationSnackbar({
  snackbarText,
}: NotificationSnackbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(snackbarText !== null && snackbarText.length > 0);
  }, [snackbarText]);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={() => setIsOpen(false)}
      message={snackbarText ?? ''}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      }
    />
  );
}