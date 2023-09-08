import {
  PhoneAndroidOutlined,
  ComputerOutlined,
  GamesOutlined,
  HeadphonesBatteryOutlined,
  TabletAndroidOutlined,
  DesktopWindowsOutlined,
  WatchSharp,
  AccountCircleOutlined,
  ConfirmationNumberOutlined,
  DashboardOutlined,
  CategoryOutlined,
  AdminPanelSettings,
} from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export const CategoriesMenu = [
  {
    text: 'celulares',
    icon: PhoneAndroidOutlined,
    link: '/category/cellphones',
  },
  {
    text: 'computadores',
    icon: ComputerOutlined,
    link: '/category/computers',
  },
  {
    text: 'videojuegos',
    icon: GamesOutlined,
    link: '/category/videogames',
  },
  {
    text: 'accesorios',
    icon: HeadphonesBatteryOutlined,
    link: '/category/accessories',
  },
  {
    text: 'tabletas',
    icon: TabletAndroidOutlined,
    link: '/category/tablets',
  },
  {
    text: 'monitores',
    icon: DesktopWindowsOutlined,
    link: '/category/monitors',
  },
  { text: 'smartwatch', icon: WatchSharp, link: '/category/smartwatch' },
];

export const UserMenuItems: {
  title: string;
  link: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
}[] = [
  { title: 'Perfil', link: '/profile', icon: AccountCircleOutlined },
  {
    title: 'Mis ordenes',
    link: '/orders/history',
    icon: ConfirmationNumberOutlined,
  },
];

export const AdminMenuItems: {
  text: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  link: string;
}[] = [
  {
    text: 'Dashboard',
    icon: DashboardOutlined,
    link: '/admin',
  },
  {
    text: 'Productos',
    icon: CategoryOutlined,
    link: '/admin/products',
  },
  {
    text: 'Ordenes',
    icon: ConfirmationNumberOutlined,
    link: '/admin/orders',
  },
  {
    text: 'Usuarios',
    icon: AdminPanelSettings,
    link: '/admin/users',
  },
];
