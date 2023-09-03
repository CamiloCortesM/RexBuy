import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Drawer, List, ListItem } from '@mui/material';
import { AuthContext, UiContext } from '@/context';
import { SearchButton } from '../navbar';
import { AdminNavigationMenu, UserNavigationMenu } from '../sidemenu';

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { isLoggedIn, user } = useContext(AuthContext);

  const { push } = useRouter();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    toggleSideMenu();
    push(`/search/${searchTerm}`);
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      onClose={() => toggleSideMenu()}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <SearchButton
              handleSearchTerm={handleSearchTerm}
              searchTerm={searchTerm}
              component="sidemenu"
              setSearchTerm={setSearchTerm}
              toggleSearch={handleSearchTerm}
            />
          </ListItem>
          <UserNavigationMenu isLoggedIn={isLoggedIn} />

          {/* Admin */}
          {(user?.role === 'admin' || user?.role === 'employee') &&
            isLoggedIn && <AdminNavigationMenu />}
        </List>
      </Box>
    </Drawer>
  );
};
