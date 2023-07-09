import NextLink from 'next/link';

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
} from '@mui/material';

import {
  SearchOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from '@mui/icons-material';

export const Navbar = () => {
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

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <NextLink href="/category/cellphones" passHref legacyBehavior>
            <Link>
              <Button>celulares</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/computers" passHref legacyBehavior>
            <Link>
              <Button>computadores</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/games" passHref legacyBehavior>
            <Link>
              <Button>videojuegos</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/accessories" passHref legacyBehavior>
            <Link>
              <Button>accesorios</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/tablets" passHref legacyBehavior>
            <Link>
              <Button>tabletas</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/monitors" passHref legacyBehavior>
            <Link>
              <Button>monitores</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/smartwatch" passHref legacyBehavior>
            <Link>
              <Button>smartwatch</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref legacyBehavior>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <IconButton>
          <MenuOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
