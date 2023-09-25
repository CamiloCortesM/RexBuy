import { FC } from 'react';
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { Grid } from '@mui/material';
import { SummaryTile } from './SummaryTile';

type Props = {
  data: {
    numberOfOrders         : number;
    paidOrders             : number;
    notPaidOrders          : number;
    numberOfClients        : number;
    numberOfProducts       : number;
    productsWithNoInventory: number;
    lowInventory           : number;
  };
  refreshIn: number;
};

export const DashboardSummary: FC<Props> = ({ data, refreshIn }) => {
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
  );
};
