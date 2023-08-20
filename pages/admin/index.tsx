import useSWR from 'swr';
import { SummaryTile } from '@/components/admin';
import { AdminLayout } from '@/components/layouts';
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { DashboardSummaryResponse } from '@/interfaces';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
  const { data, error, isLoading } = useSWR<DashboardSummaryResponse>(
    '/api/admin/dashboard',
    {
      refreshInterval: 30 * 1000, // 30 seconds
    }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <Typography>Error al cargar la informacion</Typography>;
  }

  if (isLoading) return <div>loading...</div>;

  const {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  } = data!;

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          icon={
            <CreditCardOutlined
              color="secondary"
              sx={{
                fontSize: 40,
              }}
            />
          }
          subTitle="Ordenes totales"
          title={numberOfOrders}
        />
        <SummaryTile
          icon={
            <AttachMoneyOutlined
              color="success"
              sx={{
                fontSize: 40,
              }}
            />
          }
          subTitle="Ordenes pagadas"
          title={paidOrders}
        />
        <SummaryTile
          icon={
            <CreditCardOffOutlined
              color="error"
              sx={{
                fontSize: 40,
              }}
            />
          }
          subTitle="Ordenes pendientes"
          title={notPaidOrders}
        />
        <SummaryTile
          icon={
            <GroupOutlined
              color="primary"
              sx={{
                fontSize: 40,
              }}
            />
          }
          subTitle="Clientes"
          title={numberOfClients}
        />

        <SummaryTile
          icon={
            <CategoryOutlined
              color="warning"
              sx={{
                fontSize: 40,
              }}
            />
          }
          subTitle="Productos"
          title={numberOfProducts}
        />

        <SummaryTile
          icon={
            <GroupOutlined
              color="error"
              sx={{
                fontSize: 40,
              }}
            />
          }
          subTitle="Sin Existencias"
          title={productsWithNoInventory}
        />

        <SummaryTile
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{
                fontSize: 40,
              }}
            />
          }
          subTitle="Bajo inventario"
          title={lowInventory}
        />

        <SummaryTile
          icon={
            <AccessTimeOutlined
              color="warning"
              sx={{
                fontSize: 40,
              }}
            />
          }
          subTitle="Actualizacion en:"
          title={refreshIn}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
