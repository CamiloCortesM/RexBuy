import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
} from '@mui/material';

import {
  SearchOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  ClearOutlined,
} from '@mui/icons-material';
import { UiContext } from '@/context';

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

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

        <Box
          sx={{
            display: isSearchVisible ? 'none' : { xs: 'none', md: 'block' },
          }}
          className="fadeIn"
        >
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

        {/* large desk */}
        {isSearchVisible ? (
          <Input
            className="fadeIn"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
            type="text"
            placeholder="Buscar..."
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setIsSearchVisible(false)}
                >
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
            className="fadeIn"
            onClick={() => setIsSearchVisible(true)}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* short desk */}
        <IconButton
          sx={{
            display: { xs: 'flex', md: 'none' },
          }}
          onClick={toggleSideMenu}
        >
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

        <IconButton onClick={() => toggleSideMenu()}>
          <MenuOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
