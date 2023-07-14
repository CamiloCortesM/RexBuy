import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';
import { ProductList } from '@/components/products';

const SearchPage: NextPage = () => {
  const { isError, isLoading, protucts } = useProducts('products');
  return (
    <ShopLayout
      title={'RexBuy - Search'}
      pageDescription={'Encuentra los mejores productos de tecnologia aquí'}
    >
      <Typography variant="h1" component="h1" color="primary">
        Buscar Producto
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        ABC --- 123
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={protucts} />}
    </ShopLayout>
  );
};

export default SearchPage;
