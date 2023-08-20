import { AdminLayout } from '@/components/layouts';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import React from 'react';

const OrdersPage = () => {
  return (
    <AdminLayout
      title={'Ordenes'}
      subTitle={'Mantenimiento de ordenes'}
      icon={<ConfirmationNumberOutlined />}
    >

        
    </AdminLayout>
  );
};

export default OrdersPage;
