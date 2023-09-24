import { useState, FC } from 'react';

import { Avatar, Box, Button, Stack, Typography } from '@mui/material';

import { UserInformation } from './UserInformation';
import { ModalUserDataEdit } from './ModalUserDataEdit';
import { IUser } from '@/interfaces';

type Props = {
  user: IUser;
  updateUser: Function;
};

export const PersonalInformation: FC<Props> = ({ user, updateUser }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Box
        display="flex"
        width={{ sm: '70%', xs: '80%' }}
        justifyContent={{ md: 'space-around', xs: 'space-between' }}
        alignItems="center"
      >
        <Stack
          direction="row"
          height="65px"
          width={{ xs: '90px', md: '65px' }}
          sx={{
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '50%',
            backgroundColor: '#fff',
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Avatar
            src="/profile/personal-information.svg"
            alt="icon-personal-information"
            sx={{
              sm: { width: 50, height: 50 },
              xs: { width: 40, height: 40 },
            }}
          />
        </Stack>

        <Box flexDirection="column">
          <Typography
            variant="body1"
            margin="0 20px "
            fontSize={{ md: '1.2rem', xs: '.9rem' }}
            fontWeight="600"
          >
            Información Personal
          </Typography>
          <Typography
            variant="body1"
            margin="0 20px"
            fontSize={{ md: '1rem', xs: '.7rem' }}
            color="#000"
            sx={{ opacity: '.5' }}
          >
            Datos que representan a la cuenta en RexBuy
          </Typography>
        </Box>
      </Box>
      <Box flexDirection="row" display="flex" width="70%">
        <UserInformation user={user} />
        <Button
          style={{ height: '30px', margin: '25px 0' }}
          size="small"
          sx={{ ':hover': { backgroundColor: '#092448' } }}
          color="primary"
          onClick={handleOpen}
        >
          Editar
        </Button>
      </Box>

      <ModalUserDataEdit
        handleClose={handleClose}
        open={open}
        updateUser={updateUser}
        user={user}
      />
    </>
  );
};
