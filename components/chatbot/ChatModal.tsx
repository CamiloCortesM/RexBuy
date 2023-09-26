import { FC, forwardRef, useContext } from 'react';

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { styled } from '@mui/material/styles';
import { DeleteForever } from '@mui/icons-material';

import { InputMessage, Conversation } from './';
import { BotContext } from '@/context';

type Props = {
  open: boolean;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    height: '70%',
    position: 'fixed',
    bottom: '9%',
    right: '2%',
    margin: '0px',
  },
  '& .MuiDialog-paper': {
    margin: '0',
    height: '100%',
    maxWidth: '400px',
    borderRadius: '20px',
  },
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const ChatModal: FC<Props> = ({ open }) => {
  const { searchChunks, isLoading, clearMessages, messages } =
    useContext(BotContext);

  return (
    <>
      <BootstrapDialog
        sx={{ height: '1px', zIndex: '997' }}
        hideBackdrop={true}
        disableScrollLock
        open={open}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          width="100%"
          justifyContent="space-between"
          display="flex"
          paddingX="10px"
        >
          <DialogTitle textAlign="start" style={{ padding: '10px' }}>
            {'DinoBot'}{' '}
          </DialogTitle>
          <IconButton onClick={clearMessages}>
            <DeleteForever />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent>
          <Grid
            container
            display="flex"
            flexDirection="column"
            height="100%"
            margin="0px"
          >
            <Conversation messages={messages} isLoading={isLoading}/>

            <Grid item display="flex" padding='10px 0' height="10%">
              <InputMessage searchChunks={searchChunks} isLoading={isLoading} />
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};
