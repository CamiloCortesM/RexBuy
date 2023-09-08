import { FC, ReactNode } from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

type Props = {
  navigateTo: (link: string) => void;
  title     : string;
  link      : string;
  iconMenu  : ReactNode;
};

export const UserMenuItem: FC<Props> = ({
  iconMenu,
  navigateTo,
  title,
  link,
}) => {
  return (
    <ListItemButton onClick={() => navigateTo(link)}>
      <ListItemIcon>{iconMenu}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
};
