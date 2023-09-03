import { FC } from 'react';

import { Box } from '@mui/material';

import { CategoryItem } from './';
import { Categories } from '@/constants/navbarConstants';

type props = {
  isSearchVisible: boolean;
};

export const CategoryButtons: FC<props> = ({ isSearchVisible }) => {
  return (
    <Box
      sx={{
        display: isSearchVisible ? 'none' : { xs: 'none', lg: 'block' },
      }}
      className="fadeIn"
    >
      {Categories.map(({ link, title }) => (
        <CategoryItem key={link} link={link} title={title} />
      ))}
    </Box>
  );
};
