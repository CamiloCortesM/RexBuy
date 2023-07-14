import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';

const AccessoriesPage: NextPage = () => {
  const { isError, isLoading, protucts } = useProducts(
    'products?type=accessories'
  );
  return (
    <ShopLayout
      title={'RexBuy - Accesorios'}
      pageDescription={'Encuentra los mejores accesorios de tecnologia'}
    >
      <Typography variant="h1" component="h1" color="primary">
        Accesorios
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Selección de Accesorios
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={protucts} />}
    </ShopLayout>
  );
};

export default AccessoriesPage;
