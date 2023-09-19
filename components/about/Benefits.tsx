import { FC } from 'react';

import { Grid, Typography } from '@mui/material';
import { BENEFITS } from '@/constants';
import { BenefitCard } from './BenefitCard';

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
      <Typography variant="h4" textAlign="center">
        Nuestros Compromisos
      </Typography>
      <Grid
        container
        display="flex"
        width="100%"
        justifyContent="center"
        alignItems="center"
        marginY="20px "
      >
        {BENEFITS.map((benefit, index) => (
          <BenefitCard key={index} {...benefit} />
        ))}
      </Grid>
    </Grid>
  );
};