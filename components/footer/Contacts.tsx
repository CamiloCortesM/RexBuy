import { FC, useState } from 'react';

import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import { DEVELOPER_DATA } from '@/constants';

export const Contacts: FC = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box width="100%">
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
          {DEVELOPER_DATA.map((developer, i) => (
            <List key={i} component="div" disablePadding>
              <ListItemButton href={developer.github}>
                <ListItemText
                  primary={developer.name}
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
    </Box>
  );
};
