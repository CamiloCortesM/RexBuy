import { Box } from '@mui/material';
import Image from 'next/image';

export const AuthLogo = () => {
  return (
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
      <Image
        src="/logo.png"
        alt="logo"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translatex(-50%)',
          maxWidth: 110,
        }}
      />
    </Box>
  );
};
