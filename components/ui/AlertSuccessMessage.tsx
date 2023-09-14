import { FC, SyntheticEvent } from 'react';
import { Alert, Snackbar } from '@mui/material';

type Props = {
  setOpen     : (arg0: boolean)=>void;
  showAlert   : boolean;
  message     : string;
};

export const AlertSuccessMessage: FC<Props> = ({ message, showAlert, setOpen}) => {

  const handleClose = (
    event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={showAlert}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      onClose={handleClose}
    >
      <Alert  onClose={handleClose} severity="success" sx={{ width: '100%' }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
