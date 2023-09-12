import { FC, useContext } from 'react';
import { useRouter } from 'next/router';

import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
  AccountCircleOutlined,
  ComputerOutlined,
  ConfirmationNumberOutlined,
  DesktopWindowsOutlined,
  GamesOutlined,
  HeadphonesBatteryOutlined,
  LoginOutlined,
  PhoneAndroidOutlined,
  TabletAndroidOutlined,
  VpnKeyOutlined,
  WatchSharp,
} from '@mui/icons-material';

import { AuthContext, UiContext } from '@/context';

type Props = {
  isLoggedIn: boolean;
};

export const UserNavigationMenu: FC<Props> = ({ isLoggedIn }) => {
  const { toggleSideMenu } = useContext(UiContext);
  const { logout } = useContext(AuthContext);

  const { push, asPath } = useRouter();

  const navigateTo = (url: string) => {
    toggleSideMenu();
    push(url);
  };

  return (
    <>
      {isLoggedIn && (
        <>
          <ListItemButton onClick={() => navigateTo('/profile')}>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Perfil'} />
          </ListItemButton>
          <ListItemButton onClick={() => navigateTo('/orders/history')}>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'Mis ordenes'} />
          </ListItemButton>
        </>
      )}
      <ListItemButton
        sx={{ display: { xs: '', lg: 'none' } }}
        onClick={() => navigateTo('/category/cellphones')}
      >
        <ListItemIcon>{<PhoneAndroidOutlined />}</ListItemIcon>
        <ListItemText primary={'celulares'} />
      </ListItemButton>

      <ListItemButton
        sx={{ display: { xs: '', lg: 'none' } }}
        onClick={() => navigateTo('/category/computers')}
      >
        <ListItemIcon>{<ComputerOutlined />}</ListItemIcon>
        <ListItemText primary={'computadores'} />
      </ListItemButton>

      <ListItemButton
        sx={{ display: { xs: '', lg: 'none' } }}
        onClick={() => navigateTo('/category/videogames')}
      >
        <ListItemIcon>{<GamesOutlined />}</ListItemIcon>
        <ListItemText primary={'videojuegos'} />
      </ListItemButton>

      <ListItemButton
        sx={{ display: { xs: '', lg: 'none' } }}
        onClick={() => navigateTo('/category/accessories')}
      >
        <ListItemIcon>{<HeadphonesBatteryOutlined />}</ListItemIcon>
        <ListItemText primary={'accesorios'} />
      </ListItemButton>

      <ListItemButton
        sx={{ display: { xs: '', lg: 'none' } }}
        onClick={() => navigateTo('/category/tablets')}
      >
        <ListItemIcon>{<TabletAndroidOutlined />}</ListItemIcon>
        <ListItemText primary={'tabletas'} />
      </ListItemButton>

      <ListItemButton
        sx={{ display: { xs: '', lg: 'none' } }}
        onClick={() => navigateTo('/category/monitors')}
      >
        <ListItemIcon>{<DesktopWindowsOutlined />}</ListItemIcon>
        <ListItemText primary={'monitores'} />
      </ListItemButton>

      <ListItemButton
        sx={{ display: { xs: '', lg: 'none' } }}
        onClick={() => navigateTo('/category/smartwatch')}
      >
        <ListItemIcon>{<WatchSharp />}</ListItemIcon>
        <ListItemText primary={'smartwatch'} />
      </ListItemButton>

      {isLoggedIn ? (
        <ListItemButton onClick={logout}>
          <ListItemIcon>
            <LoginOutlined />
          </ListItemIcon>
          <ListItemText primary={'Salir'} />
        </ListItemButton>
      ) : (
        <ListItemButton onClick={() => navigateTo(`/auth/login?p=${asPath}`)}>
          <ListItemIcon>
            <VpnKeyOutlined />
          </ListItemIcon>
          <ListItemText primary={'Ingresar'} />
        </ListItemButton>
      )}
    </>
  );
};
