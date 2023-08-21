import { useContext } from 'react';
import NextLink from 'next/link';

import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
} from '@mui/material';

import {
  MenuOutlined,
} from '@mui/icons-material';
import { UiContext } from '@/context';

export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref legacyBehavior>
          <Link height={'100%'}>
            <img
              src="/logo.png"
              alt="logo-rexbuy"
              style={{
                height: '100%',
              }}
            />
          </Link>
        </NextLink>

        <Box flex={1} />

        <IconButton onClick={() => toggleSideMenu()}>
          <MenuOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
