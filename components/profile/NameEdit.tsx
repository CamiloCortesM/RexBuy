import { FC, useState } from 'react';

import { CreateOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

import { ModalNameEdit } from './';

type Props = {
  name: string;
  updateUser: Function;
};

export const NameEdit: FC<Props> = ({ name, updateUser }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Typography variant="body1" fontWeight="600" fontSize="1.3rem">
        {name}
      </Typography>
      <IconButton
        aria-label="edit"
        size="small"
        style={{ height: '30px' }}
        onClick={handleOpen}
      >
        <CreateOutlined fontSize="small" />
      </IconButton>

      <ModalNameEdit
        handleClose={handleClose}
        open={open}
        updateUser={updateUser}
      />
    </Box>
  );
};
