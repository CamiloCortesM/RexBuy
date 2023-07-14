import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';

const MonitorsPage: NextPage = () => {
  const { isError, isLoading, protucts } = useProducts(
    'products?type=monitors'
  );
  return (
    <ShopLayout
      title={'RexBuy - Monitores'}
      pageDescription={
        'Encuentra los mejores Monitores con mejores resoluciones'
      }
    >
      <Typography variant="h1" component="h1" color="primary">
        Monitores
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Selección de Monitores
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={protucts} />}
    </ShopLayout>
  );
};

export default MonitorsPage;
