import { FC } from 'react';
import { Alert, Snackbar } from '@mui/material';

type props = {
  showError   : boolean;
  errorMessage: string;
};

export const AlertErrorMessage:FC<props> = ({errorMessage,showError}) => {
  return (
    <Snackbar
      open={showError}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity="error" sx={{ width: '100%' }} variant="filled">
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};
