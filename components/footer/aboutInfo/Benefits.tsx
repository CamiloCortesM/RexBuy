import { FC } from 'react';

import { Box, Grid, Typography } from '@mui/material';

export const Benefits: FC = () => {
  return (
    <Grid
      item
      marginY="80px"
      display="flex"
      width="80%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography variant="h4" textAlign='center'>Nuestros Compromisos</Typography>
      <Grid
        container
        display="flex"
        width="100%"
        justifyContent="center"
        alignItems="center"
        marginY="20px "
      >
        <Grid
          item
          xs={12}
          md={5}
          margin="20px 40px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography fontSize="1.3rem" textAlign="center">
            Compras Seguras con PayPal
          </Typography>
          <Box height="100px">
            <img
              src="/paypalIcon.svg"
              alt="Paypal"
              style={{ height: '100%' }}
            />
          </Box>
          <Box width="80%">
            <Typography textAlign="center">
              Garantizamos la protección de tus transacciones con PayPal, Compra
              con tranquilidad y confianza en nuestra tienda en línea.
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          margin="20px 40px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography fontSize="1.3rem" textAlign="center">
            Atención al Cliente Personalizada
          </Typography>
          <Box height="100px">
            <img src="/chatbot.svg" alt="chatbot" style={{ height: '85%' }} />
          </Box>
          <Box width="80%">
            <Typography textAlign="center">
              Ofrecemos atención excepcional, con un equipo y un bot impulsado
              por GPT-4 para ayudarte en cada paso de tu experiencia de compra.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
