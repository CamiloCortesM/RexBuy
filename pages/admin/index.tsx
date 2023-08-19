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
import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

const DashboardPage = () => {
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
          title="150"
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
          title="50"
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
          title="100"
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
          title="5"
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
          title="500"
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
          title="5"
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
          title="2"
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
          title="10"
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
