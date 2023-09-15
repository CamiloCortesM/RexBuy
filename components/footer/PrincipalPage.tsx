import { FC } from 'react';

import NextLink from 'next/link';
import Link from 'next/link';

import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';

export const PrincipalPage: FC = () => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  return (
    <Box width={{ xs: '100%', sm: 'auto' }}>
      {isSmallScreen ? (
        <>
          <Box>
            <List sx={{ width: '100%', maxWidth: 360 }} component="nav">
              <ListItemButton href="/" sx={{ padding: '1px' }}>
                <ListItemText
                  primary="Inicio"
                  primaryTypographyProps={{
                    fontSize: '.8rem',
                    color: '#714a3a ',
                    margin: '0 10px',
                  }}
                ></ListItemText>
              </ListItemButton>
            </List>
            <Divider />
          </Box>
        </>
      ) : (
        <>
          <Box>
            <List sx={{ display: 'flex', flexDirection: 'row' }}>
              <ListItem disablePadding>
                <Link
                  href="/"
                  style={{
                    textDecoration: 'none',
                    color: '#000',
                    fontSize: '.8rem',
                    width: 'auto',
                  }}
                >
                  Inicio
                </Link>
              </ListItem>
            </List>
          </Box>
        </>
      )}
    </Box>
  );
};
