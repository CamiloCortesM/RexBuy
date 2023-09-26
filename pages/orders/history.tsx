import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';

import { Typography, Grid, Chip, Link, Box } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';

import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';
import { ShopLayout } from '../../components/layouts';
import { date } from '@/utils';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'fullName',
    headerName: 'Nombre Completo',
    width: 250,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'numberOfItems',
    headerName: 'N. Productos',
    width: 250,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'createdAt',
    headerName: 'Fecha',
    width: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'total',
    headerName: 'Total',
    width: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la orden o no',
    width: 200,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      );
    },
  },
  {
    field: 'orden',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink
          href={`/orders/${params.row.orderId}`}
          passHref
          legacyBehavior
        >
          <Link underline="always">Ver orden</Link>
        </NextLink>
      );
    },
  },
];
type Props = {
  orders: IOrder[];
};

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, index) => {
    return {
      id: index + 1,
      paid: order.isPaid,
      fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
      orderId: order._id,
      createdAt: date.formatDateShort(order.createdAt!),
      numberOfItems: order.numberOfItems,
      total: `$ ${order.total}`,
    };
  });

  return (
    <ShopLayout
      title={'Historial de ordenes'}
      pageDescription={'Historial de ordenes del cliente'}
    >
      <Box padding="30px 40px">
        <Typography variant="h1" component="h1">
          Historial de ordenes
        </Typography>

        <Grid container className="fadeIn">
          <Grid item xs={12} sx={{ height: 420, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              localeText={{
                toolbarDensity: 'Size',
                toolbarDensityLabel: 'Size',
                toolbarDensityCompact: 'Small',
                toolbarDensityStandard: 'Medium',
                toolbarDensityComfortable: 'Large',
              }}
              slots={{
                toolbar: GridToolbar,
              }}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Grid>
        </Grid>
      </Box>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: { orders },
  };
};

export default HistoryPage;
