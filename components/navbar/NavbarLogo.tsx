import Image from 'next/image';
import NextLink from 'next/link';
import { Link } from '@mui/material';

export const NavbarLogo = () => {
  return (
    <NextLink href="/" passHref legacyBehavior>
      <Link height={'90%'}>
        <Image
          width={80}
          height={70}
          src="/logo.png"
          alt="logo-rexbuy"
          style={{
            width: 'auto',
            height: '90%',
          }}
        />
      </Link>
    </NextLink>
  );
};
