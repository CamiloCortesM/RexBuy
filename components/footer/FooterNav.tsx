import { FC } from 'react';

import { AppBar, Grid, useMediaQuery } from '@mui/material';
import { PrincipalPage, Company, Contacts } from './';
import Image from 'next/image';

export const FooterNav: FC = () => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <AppBar position="static">
      <Grid
        container
        height={{ sm: '180px', xs: '400px' }}
        display="flex"
        margin="0 auto"
        justifyContent="space-between"
        alignItems="center"
        gridAutoFlow={{ sm: 'column', xs: 'row' }}
        sx={{
          width: '90%',
          backgroundImage:
            'linear-gradient(to right, rgb(34, 34, 34) 0 10%, rgba(255, 255, 255, 0) 10%)',
          backgroundPosition: 'top',
          backgroundSize: '8px 1px',
          backgroundRepeat: 'repeat-x',
        }}
      >
        <Grid
          item
          sm={4}
          xs={12}
          padding={{ md: '1px', sm: '20px', xs: '20px' }}
          display="flex"
          flexDirection={{ sm: 'column', xs: 'row' }}
          alignItems={{ sm: 'flex-start', xs: 'center' }}
          justifyContent="center"
        >
          <Image
            alt="footer-Icon"
            src="/logoFooter.png"
            style={{ height: '15px' }}
          />
        </Grid>

        <Grid
          item
          sm={7}
          xs={12}
          display="flex"
          width="100%"
          flexDirection={{ sm: 'row', xs: 'column' }}
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
          alignItems={{ sm: 'center', xs: 'flex-start' }}
          gap={1}
        >
          <PrincipalPage isSmallScreen={isSmallScreen} />
          <Company isSmallScreen={isSmallScreen} />
          {isSmallScreen && <Contacts />}
        </Grid>
      </Grid>
    </AppBar>
  );
};
