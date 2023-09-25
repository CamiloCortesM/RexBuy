import NextLink from 'next/link';
import useSWR from 'swr';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { AdminLayout } from '@/components/layouts';
import { ButtonSkeleton, TableSkeleton } from '@/components/admin';
import { IProduct } from '@/interfaces';

const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Foto',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a
          href={`/product/${row.slug}`}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <CardMedia
            component="img"
            className="fadeIn"
            alt={row.title}
            image={row.img}
            sx={{
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </a>
      );
    },
    headerAlign: 'center',
  },
  {
    field: 'title',
    headerName: 'Titulo',
    width: 250,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref legacyBehavior>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  {
    field: 'brand',
    headerName: 'Marca',
    headerAlign: 'center',
    align: 'center',
    width: 120,
  },
  {
    field: 'type',
    headerName: 'Tipo',
    headerAlign: 'center',
    align: 'center',
    width: 120,
  },
  {
    field: 'inStock',
    headerName: 'Inventario',
    headerAlign: 'center',
    align: 'center',
    width: 120,
  },
  {
    field: 'price',
    headerName: 'Precio',
    headerAlign: 'center',
    align: 'center',
    width: 120,
  },
  {
    field: 'capacity',
    headerName: 'Capacidad',
    width: 250,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'ram',
    headerName: 'Memoria ram',
    width: 250,
    headerAlign: 'center',
    align: 'center',
  },
];

const ProductsPage = () => {
  const { data, isLoading } = useSWR<IProduct[]>('/api/admin/products');

  if (isLoading)
    return (
      <AdminLayout
        title={`Productos (...)`}
        subTitle={'Mantenimiento de Productos'}
        icon={<CategoryOutlined />}
      >
        <ButtonSkeleton />
        <TableSkeleton />
      </AdminLayout>
    );

  const rows = data!.map((product) => ({
    id      : product._id,
    img     : product.images[0],
    title   : product.title,
    brand   : product.brand,
    type    : product.type,
    inStock : product.inStock,
    price   : product.price,
    model   : product.model,
    slug    : product.slug,
    capacity:
      product.capacity!.length > 0 ? product.capacity!.join(', ') : 'No aplica',
    ram: product.ram!.length > 0 ? product.ram!.join(', ') : 'No aplica',
  }));
  return (
    <AdminLayout
      title={`Productos (${data?.length})`}
      subTitle={'Mantenimiento de Productos'}
      icon={<CategoryOutlined />}
    >
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          className="circular-btn"
          href="/admin/products/new"
        >
          Crear Producto
        </Button>
      </Box>
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 440 }}>
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
    </AdminLayout>
  );
};

export default ProductsPage;
