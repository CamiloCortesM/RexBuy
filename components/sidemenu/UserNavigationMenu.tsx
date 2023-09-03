import { FC, useContext } from 'react';
import { useRouter } from 'next/router';

import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { LoginOutlined, VpnKeyOutlined } from '@mui/icons-material';

import { AuthContext, UiContext } from '@/context';
import { UserMenuItem } from './UserMenuItem';
import { CategoriesMenu, UserMenuItems } from '@/constants/sidebarConstants';

type props = {
  isLoggedIn: boolean;
};

export const UserNavigationMenu: FC<props> = ({ isLoggedIn }) => {

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
          {UserMenuItems.map((itemMenu, index) => (
            <UserMenuItem
              key={index}
              iconMenu={<itemMenu.icon />}
              link={itemMenu.link}
              title={itemMenu.title}
              navigateTo={navigateTo}
            />
          ))}
        </>
      )}

      {CategoriesMenu.map((category, index) => (
        <ListItemButton
          key={index}
          sx={{ display: { xs: '', lg: 'none' } }}
          onClick={() => navigateTo(category.link)}
        >
          <ListItemIcon>{<category.icon />}</ListItemIcon>
          <ListItemText primary={category.text} />
        </ListItemButton>
      ))}

      {isLoggedIn ? (
        <ListItemButton onClick={logout}>
          <ListItemIcon>
            <LoginOutlined />
          </ListItemIcon>
          <ListItemText primary={'Salir'} />
        </ListItemButton>
      ) : (
        <UserMenuItem
          iconMenu={<VpnKeyOutlined />}
          link={`/auth/login?p=${asPath}`}
          title="Ingresar"
          navigateTo={navigateTo}
        />
      )}
    </>
  );
};
