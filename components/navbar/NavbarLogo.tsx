import NextLink from 'next/link';
import { Link } from '@mui/material';
import Image from 'next/image';

export const NavbarLogo = () => {
  return (
    <NextLink href="/" passHref legacyBehavior>
      <Link height={'90%'}>
        <Image
          src="/logo.png"
          alt="logo-rexbuy"
          style={{
            height: '90%',
          }}
        />
      </Link>
    </NextLink>
  );
};
