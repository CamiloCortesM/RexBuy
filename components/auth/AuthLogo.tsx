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
        backgroundColor: '#f6f1e9',
        boxShadow: '0px 3px 5px rgba(0,0,0,0.3)',
        zIndex: -1,
      }}
    >
      <Image
        src="/logo.png"
        width={100}
        height={100}
        alt="logo"
        style={{
          width: 100,
          height: 'auto',
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
