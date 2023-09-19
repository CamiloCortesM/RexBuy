import { Box, Typography } from '@mui/material';

import { BannerImage } from './BannerImage';
import { BANNER_IMAGES } from '@/constants';

export const Banner = () => {
  return (
    <Box
      display="flex"
      position="relative"
      flexDirection="column"
      justifyContent={{ xs: 'flex-start', sm: 'center' }}
      alignItems="center"
      width="100%"
      height="300px"
      sx={{
        borderBottom: '1px solid #e9eaec',
        backgroundColor: '#fafafa',
        padding: '65px 10px',
      }}
    >
      <BannerImage src={BANNER_IMAGES.image1Url} />
      <BannerImage src={BANNER_IMAGES.image2Url} direction="right" />
      <Typography
        variant="h1"
        component="h1"
        color="#00008B"
        sx={{
          mb: { xs: 2, lg: 4 },
          fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem', lg: '2rem' },
          width: { xs: '75%', sm: '100%' },
          textAlign: 'center',
        }}
      >
        RexBuy: Descubre la Mejor Tecnología al Mejor Precio
      </Typography>
      <Typography
        variant="body1"
        sx={{
          width: { xs: '100%', md: '60%', lg: '50%' },
          fontSize: { xs: '.75rem', sm: '.9rem', md: '.95rem', lg: '1rem' },
          opacity: '.8',
          textAlign: 'center',
        }}
      >
        Explora nuestra variedad de tecnología en RexBuy: smartphones, laptops,
        accesorios y más. ¡Ofertas exclusivas para actualizar tu estilo de vida
        digital!
      </Typography>
    </Box>
  );
};
