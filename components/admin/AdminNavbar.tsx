import { AppBar, Box, Toolbar } from '@mui/material';
import { MenuButton, NavbarLogo } from '../navbar';

export const AdminNavbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <NavbarLogo />
        <Box flex={1} />
        <MenuButton />
      </Toolbar>
    </AppBar>
  );
};
