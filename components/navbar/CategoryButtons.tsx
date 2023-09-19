import { FC } from 'react';

import { Box } from '@mui/material';

import { CategoryItem } from './';
import { CATEGORIES } from '@/constants/navbarConstants';

type Props = {
  isSearchVisible: boolean;
};

export const CategoryButtons: FC<Props> = ({ isSearchVisible }) => {
  return (
    <Box
      sx={{
        display: isSearchVisible ? 'none' : { xs: 'none', lg: 'block' },
      }}
      className="fadeIn"
    >
      {CATEGORIES.map(({ link, title }) => (
        <CategoryItem key={link} link={link} title={title} />
      ))}
    </Box>
  );
};
