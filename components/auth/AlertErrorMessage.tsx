import { FC, SyntheticEvent } from 'react';
import { Alert, Snackbar } from '@mui/material';

type Props = {
  setOpen: (arg0: boolean) => void;
  showError   : boolean;
  errorMessage: string;
};

export const AlertErrorMessage: FC<Props> = ({
  errorMessage,
  showError,
  setOpen,
}) => {
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={showError}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        sx={{ width: '100%' }}
        variant="filled"
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};
