import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';

const TabletsPage: NextPage = () => {
  const { isLoading, products } = useProducts('products?type=tabletas');
  return (
    <ShopLayout
      title={'RexBuy - Tablets'}
      pageDescription={
        'Encuentra las tabletas del mercado de ultima generacion'
      }
    >
      <Typography variant="h1" component="h1" color="primary">
        Tabletas
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Selección de Tabletas
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default TabletsPage;
