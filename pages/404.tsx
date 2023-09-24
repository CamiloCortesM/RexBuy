import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';

const Custom404 = () => {
  return (
    <ShopLayout
      title="Page not found"
      pageDescription="No hay nada que mostrar aquí"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: 'column' }}
      >
        <Image
          src={'/404.png'}
          alt="404 Error"
          style={{
            width: '100%',
            maxWidth: 400,
            opacity: 0.6,
          }}
        />

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Typography
            variant="h1"
            component="h1"
            fontSize={80}
            fontWeight={200}
          >
            404 |
          </Typography>
          <Typography marginLeft={2}>Page not Found</Typography>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default Custom404;
