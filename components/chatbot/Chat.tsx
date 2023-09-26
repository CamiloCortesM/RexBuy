import { useState } from 'react';

import { Avatar, Button, Grid } from '@mui/material';
import { BOT_BUTTON_IMAGE } from '@/constants';
import { ChatModal } from './ChatModal';


export const Chat = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Grid
      container
      sx={{
        position: 'fixed',
        bottom: 36,
        right: 16,
        zIndex: '998',
        width: '50px',
        height: '50px',
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Button
        onClick={handleOpenModal}
        style={{
          borderRadius: '50%',
          boxShadow: '0px 0px 2px 1px #8b8b8b',
        }}
        size="medium"
      >
        <Avatar
          alt="ChatBot Image"
          src={BOT_BUTTON_IMAGE}
          sx={{ width: 50, height: 50 }}
        />
      </Button>
      <ChatModal open={openModal} />
    </Grid>
  );
};
