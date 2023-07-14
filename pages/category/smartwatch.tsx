import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';

const SmartWatchPage: NextPage = () => {
  const { isError, isLoading, protucts } = useProducts(
    'products?type=smartwatch'
  );
  return (
    <ShopLayout
      title={'RexBuy - Smartwatch'}
      pageDescription={'Encuentra los mejores relojes inteligentes'}
    >
      <Typography variant="h1" component="h1" color="primary">
        SmartWatch
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Selección de SmartWatch
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={protucts} />}
    </ShopLayout>
  );
};

export default SmartWatchPage;
