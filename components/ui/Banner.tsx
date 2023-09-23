import { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { BannerImage } from './BannerImage';

interface InitialProps {
  image1Url: string;
  image2Url: string;
  title: string;
  description: string;
}

export const Banner: FC<InitialProps> = (props) => {
  const { image1Url, image2Url, title, description } = props;
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
      <BannerImage src={image1Url} />
      <BannerImage src={image2Url} direction="right" />
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
        {title}
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
        {description}
      </Typography>
    </Box>
  );
};
