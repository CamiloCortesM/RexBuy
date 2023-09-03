import { FC } from 'react';

import { IconButton, Input, InputAdornment } from '@mui/material';
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';

import { SearchableComponents } from '@/constants/navbarConstants';

type props = {
  handleSearchTerm: () => void;
  setSearchTerm: (arg: string) => void;
  searchTerm: string;
  toggleSearch: () => void;
  component?: string;
};
export const SearchButton: FC<props> = ({
  handleSearchTerm,
  searchTerm,
  setSearchTerm,
  toggleSearch,
  component = SearchableComponents.Navbar,
}) => {
  return (
    <Input
      autoFocus
      className="fadeIn"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyUp={(e) => (e.key === 'Enter' ? handleSearchTerm() : null)}
      type="text"
      placeholder="Buscar..."
      sx={{
        display:
          component === SearchableComponents.Navbar
            ? { xs: 'none', md: 'flex' }
            : 'flex',
      }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={toggleSearch}
          >
            {component === SearchableComponents.Navbar ? (
              <ClearOutlined />
            ) : (
              <SearchOutlined />
            )}
          </IconButton>
        </InputAdornment>
      }
    />
  );
};
