import { useCallback, useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar } from '@mui/material';

type NotificationSnackbarProps = {
  snackbarText: string | null;
  onClose: () => void;
};

export default function NotificationSnackbar({
  snackbarText,
  onClose,
}: NotificationSnackbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(snackbarText !== null && snackbarText.length > 0);
  }, [snackbarText]);

  const closeCallback = useCallback(() => {
    onClose();
    setIsOpen(false);
  }, [onClose, setIsOpen]);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={closeCallback}
      message={snackbarText ?? ''}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={closeCallback}
        >
          <CloseIcon />
        </IconButton>
      }
    />
  );
}
