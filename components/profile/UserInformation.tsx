import { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { IUser } from '@/interfaces';

type Props = {
  user: IUser;
};

export const UserInformation: FC<Props> = ({ user }) => {
  return (
    <Box width="100%">
      <Box
        display="flex"
        width="70%"
        flexDirection="column"
        justifyContent="center"
        alignItems="space-between"
        margin="20px 0 10px"
      >
        <Typography
          variant="body1"
          margin="0 10px"
          fontSize={{ md: '1.1rem', xs: '.9rem' }}
          fontWeight="600"
        >
          Ubicación
        </Typography>
        <Typography
          variant="body1"
          margin="0px 10px"
          fontSize={{ md: '1rem', xs: '.7rem' }}
          color="#000"
          sx={{ opacity: '.5' }}
        >
          {user.department && user.city
            ? `${user.department}, ${user.city}`
            : 'Ejemplo: Bogota, Colombia'}
        </Typography>
      </Box>

      <Box
        display="flex"
        width="70%"
        flexDirection="column"
        justifyContent="center"
        alignItems="space-between"
        margin="10px 0"
      >
        <Typography
          variant="body1"
          margin="0 10px"
          fontSize={{ md: '1.1rem', xs: '.9rem' }}
          fontWeight="600"
        >
          Dirección
        </Typography>
        <Typography
          variant="body1"
          margin="0px 10px"
          fontSize={{ md: '1rem', xs: '.7rem' }}
          color="#000"
          sx={{ opacity: '.5' }}
        >
          {user.address ? user.address : 'Ejemplo: Carrera 24 4B 32'}
        </Typography>
      </Box>

      <Box
        display="flex"
        width="70%"
        flexDirection="column"
        justifyContent="center"
        alignItems="space-between"
        margin="10px 0"
      >
        <Typography
          variant="body1"
          margin="0 10px"
          fontSize={{ md: '1.1rem', xs: '.9rem' }}
          fontWeight="600"
        >
          Teléfono
        </Typography>
        <Typography
          variant="body1"
          margin="0px 10px"
          fontSize={{ md: '1rem', xs: '.7rem' }}
          color="#000"
          sx={{ opacity: '.5' }}
        >
          {user.cellphone ? user.cellphone : 'Número de contacto'}
        </Typography>
      </Box>
    </Box>
  );
};
