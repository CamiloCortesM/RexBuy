import { FC } from 'react';

import { IconButton, Input, InputAdornment } from '@mui/material';
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';

import { SEARCHABLE_COMPONENTS } from '@/constants/navbarConstants';

type Props = {
  handleSearchTerm: () => void;
  setSearchTerm: (arg: string) => void;
  toggleSearch: () => void;
  searchTerm: string;
  component?: string;
};
export const SearchButton: FC<Props> = ({
  handleSearchTerm,
  searchTerm,
  setSearchTerm,
  toggleSearch,
  component = SEARCHABLE_COMPONENTS.Navbar,
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
          component === SEARCHABLE_COMPONENTS.Navbar
            ? { xs: 'none', md: 'flex' }
            : 'flex',
      }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={toggleSearch}
          >
            {component === SEARCHABLE_COMPONENTS.Navbar ? (
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
