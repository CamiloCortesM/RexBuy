import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';

const CellPhonesPage: NextPage = () => {
  const { isError, isLoading, protucts } = useProducts(
    'products?type=cellphones'
  );
  return (
    <ShopLayout
      title={'RexBuy - Celulares'}
      pageDescription={'Encuentra los mejores celulares de marca'}
    >
      <Typography variant="h1" component="h1" color="primary">
        Celulares
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Selección de Celulares
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={protucts} />}
    </ShopLayout>
  );
};

export default CellPhonesPage;
