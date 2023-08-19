import { FC, ReactNode } from 'react';

import { SideMenu } from '../ui';
import { AdminNavbar } from '../admin';
import { Box, Typography } from '@mui/material';

interface Props {
  children: ReactNode;
  title: string;
  subTitle: string;
  icon?: JSX.Element;
}

export const AdminLayout: FC<Props> = ({ children, title, subTitle, icon }) => {
  return (
    <>
      <nav>
        <AdminNavbar />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: '70px auto',
          maxWidth: '1440px',
          padding: '20px 10px',
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {icon}
            {title}
          </Typography>
          <Typography variant="h2" sx={{ mb: 1 }}>
            {subTitle}
          </Typography>
        </Box>

        <Box className="fadeIn">{children}</Box>
      </main>
    </>
  );
};
