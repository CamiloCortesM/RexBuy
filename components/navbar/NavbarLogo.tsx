import NextLink from 'next/link';
import { Link } from '@mui/material';

export const NavbarLogo = () => {
  return (
    <NextLink href="/" passHref legacyBehavior>
      <Link height={'90%'}>
        <img
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