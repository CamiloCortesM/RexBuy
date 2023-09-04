import { FC, ReactNode } from 'react';

import Head from 'next/head';
import { Box, Grid, Typography } from '@mui/material';
import { AuthLogo } from '../auth/AuthLogo';

type Props = {
  children   : ReactNode;
  title      : string;
  headerTitle: string;
}

export const AuthLayout: FC<Props> = ({ children, title, headerTitle }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <AuthLogo />
          <Box
            sx={{ width: 500, padding: '50px 60px', backgroundColor: 'white' }}
          >
            <Grid container justifyContent="center">
              <Grid
                item
                xs={12}
                display="grid"
                justifyContent="center"
                sx={{ marginBottom: '20px' }}
              >
                <Typography variant="h1" component="h1">
                  {headerTitle}
                </Typography>
              </Grid>
              {children}
            </Grid>
          </Box>
          <Box
            height={'50%'}
            width={'100%'}
            position="absolute"
            sx={{
              bottom: 0,
              backgroundColor: '#f6bf8c',
              zIndex: -2,
            }}
          />
        </Box>
      </main>
    </>
  );
};
