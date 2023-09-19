import { FC } from 'react';

import { Grid, Typography } from '@mui/material';

export const About: FC = () => {
  return (
    <>
      <Grid item width="70%" marginY="20px">
        <Typography textAlign="center">
          RexBuy es una plataforma de comercio electrónico diseñada por un
          <strong> grupo de estudiantes</strong>. Nuestra plataforma está
          dedicada a brindarte la mejor experiencia de compra en línea de
          productos tecnológicos.
        </Typography>
      </Grid>
    </>
  );
};
