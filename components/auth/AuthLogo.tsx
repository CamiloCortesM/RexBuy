import Image from 'next/image';
import { Box, autocompleteClasses } from '@mui/material';

export const AuthLogo = () => {
  return (
    <Box
      height={'50%'}
      width={'100%'}
      position="absolute"
      sx={{
        top: 0,
        backgroundColor: '#00306d',
        boxShadow: '0px 3px 5px rgba(0,0,0,0.3)',
        zIndex: -1,
      }}
    >
      <Image
        src={
          'https://res.cloudinary.com/dnba3kkh6/image/upload/v1695597555/logofinal_1_lgth6z.webp'
        }
        width={100}
        height={100}
        alt="logo"
        style={{
          width: 200,
          height: 'auto',
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translatex(-50%)',
        }}
      />
    </Box>
  );
};
