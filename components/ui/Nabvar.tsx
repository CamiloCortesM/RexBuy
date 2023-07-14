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
import { useRouter } from 'next/router';

export const Navbar = () => {
  const { asPath } = useRouter();

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
              <Button
                color={asPath === '/category/cellphones' ? 'primary' : 'info'}
                sx={{
                  ...(asPath === '/category/cellphones' && {
                    ':hover': {
                      backgroundColor: 'rgb(98, 45, 24)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }),
                }}
              >
                celulares
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/computers" passHref legacyBehavior>
            <Link>
              <Button
                color={asPath === '/category/computers' ? 'primary' : 'info'}
                sx={{
                  ...(asPath === '/category/computers' && {
                    ':hover': {
                      backgroundColor: 'rgb(98, 45, 24)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }),
                }}
              >
                computadores
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/videogames" passHref legacyBehavior>
            <Link>
              <Button
                color={asPath === '/category/videogames' ? 'primary' : 'info'}
                sx={{
                  ...(asPath === '/category/videogames' && {
                    ':hover': {
                      backgroundColor: 'rgb(98, 45, 24)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }),
                }}
              >
                videojuegos
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/accessories" passHref legacyBehavior>
            <Link>
              <Button
                color={asPath === '/category/accessories' ? 'primary' : 'info'}
                sx={{
                  ...(asPath === '/category/accessories' && {
                    ':hover': {
                      backgroundColor: 'rgb(98, 45, 24)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }),
                }}
              >
                accesorios
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/tablets" passHref legacyBehavior>
            <Link>
              <Button
                color={asPath === '/category/tablets' ? 'primary' : 'info'}
                sx={{
                  ...(asPath === '/category/tablets' && {
                    ':hover': {
                      backgroundColor: 'rgb(98, 45, 24)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }),
                }}
              >
                tabletas
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/monitors" passHref legacyBehavior>
            <Link>
              <Button
                color={asPath === '/category/monitors' ? 'primary' : 'info'}
                sx={{
                  ...(asPath === '/category/monitors' && {
                    ':hover': {
                      backgroundColor: 'rgb(98, 45, 24)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }),
                }}
              >
                monitores
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/smartwatch" passHref legacyBehavior>
            <Link>
              <Button
                color={asPath === '/category/smartwatch' ? 'primary' : 'info'}
                sx={{
                  ...(asPath === '/category/smartwatch' && {
                    ':hover': {
                      backgroundColor: 'rgb(98, 45, 24)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }),
                }}
              >
                smartwatch
              </Button>
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
