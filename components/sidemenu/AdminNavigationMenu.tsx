import { useContext } from 'react';
import { useRouter } from 'next/router';
import { UiContext } from '@/context';
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import {
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  DashboardOutlined,
} from '@mui/icons-material';

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

      <ListItemButton onClick={() => navigateTo('/admin')}>
        <ListItemIcon>
          <DashboardOutlined />
        </ListItemIcon>
        <ListItemText primary={'Dashboard'} />
      </ListItemButton>

      <ListItemButton onClick={() => navigateTo('/admin/products')}>
        <ListItemIcon>
          <CategoryOutlined />
        </ListItemIcon>
        <ListItemText primary={'Productos'} />
      </ListItemButton>

      <ListItemButton onClick={() => navigateTo('/admin/orders')}>
        <ListItemIcon>
          <ConfirmationNumberOutlined />
        </ListItemIcon>
        <ListItemText primary={'Ordenes'} />
      </ListItemButton>

      <ListItemButton onClick={() => navigateTo('/admin/users')}>
        <ListItemIcon>
          <AdminPanelSettings />
        </ListItemIcon>
        <ListItemText primary={'Usuarios'} />
      </ListItemButton>
    </>
  );
};
