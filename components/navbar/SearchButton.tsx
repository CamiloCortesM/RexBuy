import { FC } from 'react';

import { IconButton, Input, InputAdornment } from '@mui/material';
import { ClearOutlined } from '@mui/icons-material';

type props = {
  handleSearchTerm: () => void;
  setSearchTerm: (arg: string) => void;
  searchTerm: string;
  toggleSearch: () => void;
};
export const SearchButton: FC<props> = ({
  handleSearchTerm,
  searchTerm,
  setSearchTerm,
  toggleSearch,
}) => {
  return (
    <Input
      className="fadeIn"
      autoFocus
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyUp={(e) => (e.key === 'Enter' ? handleSearchTerm() : null)}
      type="text"
      placeholder="Buscar..."
      sx={{
        display: { xs: 'none', md: 'flex' },
      }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={toggleSearch}
          >
            <ClearOutlined />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};
