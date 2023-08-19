import { AdminLayout } from '@/components/layouts';
import { DashboardOutlined } from '@mui/icons-material';
import React from 'react';

const DashboardPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <h2>Hello world</h2>
    </AdminLayout>
  );
};

export default DashboardPage;