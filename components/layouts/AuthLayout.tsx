import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Box, Grid, Typography } from '@mui/material';

interface Props {
  children: ReactNode;
  title: string;
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
          <Box
            height={'50%'}
            width={'100%'}
            position="absolute"
            sx={{
              top: 0,
              backgroundColor: '#f6f1e9',
              boxShadow: '0px 3px 5px rgba(0,0,0,0.3)',
              zIndex: -1,
            }}
          >
            <img
              src="/logo.png"
              alt="logo"
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translatex(-50%)',
                width: '8%',
                minWidth: 120,
              }}
            />
          </Box>
          <Box
            sx={{ width: 500, padding: '45px 60px', backgroundColor: 'white' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} display="grid" justifyContent="center">
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
