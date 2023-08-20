import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  LoginOutlined,
  SearchOutlined,
  VpnKeyOutlined,
  PhoneAndroidOutlined,
  ComputerOutlined,
  GamesOutlined,
  HeadphonesBatteryOutlined,
  TabletAndroidOutlined,
  DesktopWindowsOutlined,
  WatchSharp,
  DashboardOutlined,
} from '@mui/icons-material';
import { useContext, useState } from 'react';
import { AuthContext, UiContext } from '@/context';
import { useRouter } from 'next/router';

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    toggleSideMenu();
    router.push(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      onClose={() => toggleSideMenu()}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onSearchTerm}
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {isLoggedIn && (
            <>
              <ListItemButton>
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
            </>
          )}

          <ListItemButton
            sx={{ display: { xs: '', md: 'none' } }}
            onClick={() => navigateTo('/category/cellphones')}
          >
            <ListItemIcon>
              <PhoneAndroidOutlined />
            </ListItemIcon>
            <ListItemText primary={'celulares'} />
          </ListItemButton>

          <ListItemButton
            sx={{ display: { xs: '', md: 'none' } }}
            onClick={() => navigateTo('/category/computers')}
          >
            <ListItemIcon>
              <ComputerOutlined />
            </ListItemIcon>
            <ListItemText primary={'computadores'} />
          </ListItemButton>

          <ListItemButton
            sx={{ display: { xs: '', md: 'none' } }}
            onClick={() => navigateTo('/category/videogames')}
          >
            <ListItemIcon>
              <GamesOutlined />
            </ListItemIcon>
            <ListItemText primary={'videojuegos'} />
          </ListItemButton>
          <ListItemButton
            sx={{ display: { xs: '', md: 'none' } }}
            onClick={() => navigateTo('/category/accessories')}
          >
            <ListItemIcon>
              <HeadphonesBatteryOutlined />
            </ListItemIcon>
            <ListItemText primary={'accesorios'} />
          </ListItemButton>
          <ListItemButton
            sx={{ display: { xs: '', md: 'none' } }}
            onClick={() => navigateTo('/category/tablets')}
          >
            <ListItemIcon>
              <TabletAndroidOutlined />
            </ListItemIcon>
            <ListItemText primary={'tabletas'} />
          </ListItemButton>
          <ListItemButton
            sx={{ display: { xs: '', md: 'none' } }}
            onClick={() => navigateTo('/category/monitors')}
          >
            <ListItemIcon>
              <DesktopWindowsOutlined />
            </ListItemIcon>
            <ListItemText primary={'monitores'} />
          </ListItemButton>
          <ListItemButton
            sx={{ display: { xs: '', md: 'none' } }}
            onClick={() => navigateTo('/category/smartwatch')}
          >
            <ListItemIcon>
              <WatchSharp />
            </ListItemIcon>
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
            <ListItemButton
              onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
            >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={'Ingresar'} />
            </ListItemButton>
          )}

          {/* Admin */}
          {(user?.role === 'admin' || user?.role === 'employee') &&
            isLoggedIn && (
              <>
                <Divider />
                <ListSubheader>Admin Panel</ListSubheader>
                <ListItemButton onClick={() => navigateTo('/admin')}>
                  <ListItemIcon>
                    <DashboardOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Dashboard'} />
                </ListItemButton>
                <ListItemButton onClick={() => navigateTo('/admin')}>
                  <ListItemIcon>
                    <CategoryOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Productos'} />
                </ListItemButton>
                <ListItemButton>
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
            )}
        </List>
      </Box>
    </Drawer>
  );
};
