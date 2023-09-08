import { useContext } from 'react';

import { IconButton } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import { UiContext } from '@/context';

export const MenuButton = () => {
  const { toggleSideMenu } = useContext(UiContext);
  return (
    <IconButton onClick={toggleSideMenu}>
      <MenuOutlined />
    </IconButton>
  );
};
