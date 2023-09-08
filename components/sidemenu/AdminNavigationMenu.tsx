import { useContext } from 'react';
import { useRouter } from 'next/router';
import { AdminMenuItems } from '@/constants';
import { UiContext } from '@/context';
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';

export const AdminNavigationMenu = () => {
  const { toggleSideMenu } = useContext(UiContext);
  const { push } = useRouter();

  const navigateTo = (url: string) => {
    toggleSideMenu();
    push(url);
  };

  return (
    <>
      <Divider />
      <ListSubheader>Admin Panel</ListSubheader>
      {AdminMenuItems.map((item) => (
        <ListItemButton key={item.link} onClick={() => navigateTo(item.link)}>
          <ListItemIcon>
            <item.icon />
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
    </>
  );
};
