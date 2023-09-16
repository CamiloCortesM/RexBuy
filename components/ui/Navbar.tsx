import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { AppBar, Box, Toolbar } from '@mui/material';
import { UiContext } from '@/context';

import {
  MenuButton,
  CartButton,
  IconSearchButton,
  SearchButton,
  CategoryButtons,
  NavbarLogo,
} from '../navbar';

export const Navbar = () => {
  const { push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <AppBar sx={{
      borderBottom:'solid 1px #e9eaec'
    }}>
      <Toolbar>
        <NavbarLogo />
        <Box flex={1} />
        <CategoryButtons isSearchVisible={isSearchVisible} />
        <Box flex={1} />

        {isSearchVisible ? (
          <SearchButton
            handleSearchTerm={handleSearchTerm}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            toggleSearch={toggleSearch}
          />
        ) : (
          <IconSearchButton
            style={{
              display: { xs: 'none', md: 'flex' },
            }}
            onClick={toggleSearch}
          />
        )}
        <IconSearchButton
          style={{
            display: { xs: 'flex', md: 'none' },
          }}
          onClick={toggleSideMenu}
        />
        <CartButton />
        <MenuButton />
      </Toolbar>
    </AppBar>
  );
};
