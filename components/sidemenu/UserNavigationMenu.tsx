import { FC, useContext } from 'react';
import { useRouter } from 'next/router';

import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
  AccountCircleOutlined,
  ComputerOutlined,
  ConfirmationNumberOutlined,
  DesktopWindowsOutlined,
  Favorite,
  GamesOutlined,
  HeadphonesBatteryOutlined,
  LoginOutlined,
  PhoneAndroidOutlined,
  ReviewsOutlined,
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
            <ListItemText primary={'Mis Ordenes'} />
          </ListItemButton>
          <ListItemButton onClick={() => navigateTo('/reviews')}>
            <ListItemIcon>
              <ReviewsOutlined />
            </ListItemIcon>
            <ListItemText primary={'Reseñas'} />
          </ListItemButton>
          <ListItemButton onClick={() => navigateTo('/user/favorites')}>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary={'Favoritos'} />
          </ListItemButton>
        </>
      )}
      <ListItemButton
        sx={{ display: { xs: '', lg: 'none' } }}
        onClick={() => navigateTo('/category/cellphones')}
      >
        <ListItemIcon>{<PhoneAndroidOutlined />}</ListItemIcon>
        <ListItemText primary={'Celulares'} />
      </ListItemButton>

      <ListItemButton
        sx={{ display: { xs: '', lg: 'none' } }}
        onClick={() => navigateTo('/category/computers')}
      >
        <ListItemIcon>{<ComputerOutlined />}</ListItemIcon>
        <ListItemText primary={'Computadores'} />
      </ListItemButton>

      <ListItemButton
        sx={{ display: { xs: '', lg: 'none' } }}
        onClick={() => navigateTo('/category/videogames')}
      >
        <ListItemIcon>{<GamesOutlined />}</ListItemIcon>
        <ListItemText primary={'Videojuegos'} />
      </ListItemButton>

      <ListItemButton
        sx={{ display: { xs: '', lg: 'none' } }}
        onClick={() => navigateTo('/category/accessories')}
      >
        <ListItemIcon>{<HeadphonesBatteryOutlined />}</ListItemIcon>
        <ListItemText primary={'Accesorios'} />
      </ListItemButton>

      <ListItemButton
        sx={{ display: { xs: '', lg: 'none' } }}
        onClick={() => navigateTo('/category/tablets')}
      >
        <ListItemIcon>{<TabletAndroidOutlined />}</ListItemIcon>
        <ListItemText primary={'Tabletas'} />
      </ListItemButton>

      <ListItemButton
        sx={{ display: { xs: '', lg: 'none' } }}
        onClick={() => navigateTo('/category/monitors')}
      >
        <ListItemIcon>{<DesktopWindowsOutlined />}</ListItemIcon>
        <ListItemText primary={'Monitores'} />
      </ListItemButton>

      <ListItemButton
        sx={{ display: { xs: '', lg: 'none' } }}
        onClick={() => navigateTo('/category/smartwatch')}
      >
        <ListItemIcon>{<WatchSharp />}</ListItemIcon>
        <ListItemText primary={'Smartwatch'} />
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
