import { FC, useState } from 'react';

import Link from 'next/link';

import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { repository } from '@/constants';

interface initialProps {
  isSmallScreen: boolean;
}

export const Company: FC<initialProps> = ({ isSmallScreen }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box width={{ xs: '100%', sm: 'auto' }}>
      {isSmallScreen ? (
        <>
          <Box>
            <List sx={{ width: '100%', maxWidth: 360 }} component="nav">
              <ListItemButton onClick={handleClick} sx={{ padding: '1px' }}>
                <ListItemText
                  primary="Compañía"
                  primaryTypographyProps={{
                    fontSize: '.9rem',
                    color: '#714a3a',
                    margin: '0 10px',
                  }}
                />
              </ListItemButton>

              <Divider />

              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton href="/about">
                    <ListItemText
                      primary="Acerca de"
                      primaryTypographyProps={{
                        fontSize: '.8rem',
                        color: '#000',
                        margin: '0 10px',
                      }}
                    />
                  </ListItemButton>
                  <ListItemButton href={repository}>
                    <ListItemText
                      primary="Github"
                      primaryTypographyProps={{
                        fontSize: '.8rem',
                        color: '#000',
                        margin: '0 10px',
                      }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </Box>
        </>
      ) : (
        <>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <List sx={{ display: 'flex', flexDirection: 'row' }}>
              <ListItem disablePadding>
                <Link
                  href="/about"
                  style={{
                    textDecoration: 'none',
                    color: '#000',
                    fontSize: '.8rem',
                    width: '60px',
                    marginLeft: '35px',
                  }}
                >
                  Acerca de
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link
                  href={repository}
                  style={{
                    textDecoration: 'none',
                    color: '#000',
                    fontSize: '.8rem',
                    marginLeft: '40px',
                  }}
                >
                  Github
                </Link>
              </ListItem>
            </List>
          </Box>
        </>
      )}
    </Box>
  );
};
