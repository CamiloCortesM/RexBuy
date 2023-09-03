import { FC } from 'react';

import { IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

type props = {
  onClick: () => void;
  style: {
    display: {
      xs: string;
      md: string;
    };
  };
};

export const IconSearchButton: FC<props> = ({ onClick, style }) => {
  return (
    <IconButton sx={style} className="fadeIn" onClick={onClick}>
      <SearchOutlined />
    </IconButton>
  );
};
