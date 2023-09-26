import useSWR from 'swr';
import { Avatar, Chip, Grid } from '@mui/material';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { AdminLayout } from '@/components/layouts';
import { IOrder, IUser } from '@/interfaces';
import { formatDate } from '@/utils/date';
import { TableSkeleton } from '@/components/admin';

const defaultImage = '/profile/default-profile.svg';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Orden ID',
    width: 250,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    headerAlign: 'center',
    align: 'center',
    width: 60,
    renderCell: ({ row }: GridRenderCellParams) => {
      const userImage = row.avatar || defaultImage;
      return <Avatar src={userImage} alt="user-image" />;
    },
  },
  {
    field: 'name',
    headerName: 'Cliente',
    width: 250,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'email',
    headerName: 'Correo',
    width: 250,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'total',
    headerName: 'Monto total',
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'isPaid',
    headerName: 'Pagada',
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid ? (
        <Chip variant="outlined" label="Pagada" color="success" />
      ) : (
        <Chip variant="outlined" label="Pendiente" color="error" />
      );
    },
    minWidth: 120,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'noProducts',
    headerName: 'No.Productos',
    align: 'center',
    minWidth: 180,
    headerAlign: 'center',
  },
  {
    field: 'check',
    headerName: 'Ver orden',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
          Ver orden
        </a>
      );
    },
    minWidth: 160,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'createdAt',
    headerName: 'Creada en',
    width: 250,
    headerAlign: 'center',
    align: 'center',
  },
];

const OrdersPage = () => {
  const { data, isLoading } = useSWR<IOrder[]>('/api/admin/orders');

  if (isLoading)
    return (
      <AdminLayout
        title={'Ordenes'}
        subTitle={'Mantenimiento de ordenes'}
        icon={<ConfirmationNumberOutlined />}
      >
        <TableSkeleton />
      </AdminLayout>
    );

  const rows = data!.map((order) => ({
    id        : order._id,
    email     : (order.user as IUser).email,
    avatar    : (order.user as IUser).userImage,
    name      : (order.user as IUser).name,
    total     : order.total,
    isPaid    : order.isPaid,
    noProducts: order.numberOfItems,
    createdAt : formatDate(order.createdAt!),
  }));
  return (
    <AdminLayout
      title={'Ordenes'}
      subTitle={'Mantenimiento de ordenes'}
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 440, width: '100%' }}>
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
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPage;
