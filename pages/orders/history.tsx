import NextLink from 'next/link';

import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },

  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la orden o no',
    width: 200,
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
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline="always">Ver orden</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: 'Camilo Cortes' },
  { id: 2, paid: false, fullname: 'Daniel Santiago' },
  { id: 3, paid: true, fullname: 'Sofia Vallejo' },
  { id: 4, paid: false, fullname: 'Astrid Reyes' },
  { id: 5, paid: false, fullname: 'Sonia Rios' },
  { id: 6, paid: true, fullname: 'Santiago Salamanca' },
  { id: 7, paid: true, fullname: 'Santiago Salamanca' },
  { id: 8, paid: true, fullname: 'Santiago Salamanca' },
  { id: 9, paid: true, fullname: 'Santiago Salamanca' },
  { id: 10, paid: true, fullname: 'Santiago Salamanca' },
  { id: 11, paid: true, fullname: 'Santiago Salamanca' },
  { id: 12, paid: true, fullname: 'Santiago Salamanca' },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title={'Historial de ordenes'}
      pageDescription={'Historial de ordenes del cliente'}
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 440, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} autoPageSize />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
