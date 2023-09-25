import Image from 'next/image';
import NextLink from 'next/link';
import { Link } from '@mui/material';

export const NavbarLogo = () => {
  return (
    <NextLink href="/" passHref legacyBehavior>
      <Link
        height={'100%'}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          width={80}
          height={70}
          src="https://res.cloudinary.com/dnba3kkh6/image/upload/v1695598349/logofinal2_feapfb.webp"
          alt="logo-rexbuy"
          style={{
            width: 'auto',
            height: '55%',
          }}
        />
      </Link>
    </NextLink>
  );
};
