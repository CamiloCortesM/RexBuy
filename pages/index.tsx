import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts/ShopLayout';
import { ProductList } from '../components/products';
import { useProducts } from '@/hooks';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';

const Home: NextPage = () => {
  const { isLoading, products } = useProducts('products');
  return (
    <ShopLayout
      title={'RexBuy - Home'}
      pageDescription={'Encuentra los mejores productos de tecnologia aquí'}
    >
      {/* TODO: header section,announcements */}
      <Typography variant="h1" component="h1" color="primary">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default Home;
