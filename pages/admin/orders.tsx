import { AdminLayout } from '@/components/layouts';
import { IOrder, IUser } from '@/interfaces';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Orden ID', width: 250 },
  { field: 'email', headerName: 'Correo', width: 250 },
  { field: 'name', headerName: 'Nombre Completo', width: 250 },
  { field: 'total', headerName: 'Monto total', minWidth: 150 },
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
  },
  {
    field: 'noProducts',
    headerName: 'No.Productos',
    align: 'center',
    minWidth: 180,
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
  },
  { field: 'createdAt', headerName: 'Creada en', width: 250 },
];

const OrdersPage = () => {
  const { data, error, isLoading } = useSWR<IOrder[]>('/api/admin/orders');

  if ((!data && !error) || isLoading) return <></>;

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }));
  return (
    <AdminLayout
      title={'Ordenes'}
      subTitle={'Mantenimiento de ordenes'}
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 440, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} autoPageSize />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPage;
