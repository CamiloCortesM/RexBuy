import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';

const ComputersPage: NextPage = () => {
  const { isLoading, products } = useProducts(
    'products?type=computadores'
  );
  return (
    <ShopLayout
      title={'RexBuy - Computadores'}
      pageDescription={'Encuentra los mejores computadores del mercado'}
    >
      <Typography variant="h1" component="h1" color="primary">
        Computadores
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Selección de Computadoras
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default ComputersPage;
