import { FC, useState } from 'react';

// import Link from 'next/link';

import {
  Box,
  Button,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';

const developerNames = ['Daniel Silva', 'Santiago Salamanca', 'Camilo Cortes'];

const githubs = [
  'https://github.com/DANIELSSF',
  'https://github.com/SantiagoSalamancaa',
  'https://github.com/CamiloCortesM',
];

export const Contacts: FC = () => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box width="100%">
      {isSmallScreen ? (
        <>
          <List sx={{ width: '100%', maxWidth: 360 }} component="nav">
            <ListItemButton onClick={handleClick} sx={{ padding: '1px' }}>
              <ListItemText
                primary="Contactos"
                primaryTypographyProps={{
                  fontSize: '.9rem',
                  color: '#714a3a',
                  margin: '0 10px',
                }}
              />
            </ListItemButton>

            <Divider />

            <Collapse in={open} timeout="auto" unmountOnExit>
              {developerNames.map((names, i) => (
                <List key={i} component="div" disablePadding>
                  <ListItemButton href={githubs[i]}>
                    <ListItemText
                      primary={names}
                      primaryTypographyProps={{
                        fontSize: '.8rem',
                        color: '#000',
                        margin: '0 10px',
                      }}
                    />
                  </ListItemButton>
                </List>
              ))}
            </Collapse>
          </List>
        </>
      ) : (
        <>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap={5}
          >
            {developerNames.map((names, i) => (
              <Button
                key={i}
                sx={{
                  padding: '0px 2px',
                  borderRadius: '10px',
                  backgroundColor: 'transparent',
                  ':hover': { color: '#714a3a' },
                  fontSize: '.8rem',
                  color: '#000',
                  opacity: '.8',
                  textAlign: 'start',
                }}
              >
                {names}
              </Button>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};
