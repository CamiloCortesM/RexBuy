import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts/ShopLayout';
import { ProductList } from '../components/products';
import { useProducts } from '@/hooks';

const Home: NextPage = () => {
  const { isError, isLoading, protucts } = useProducts('products');

  console.log(protucts);
  return (
    <ShopLayout
      title={'RexBuy - Home'}
      pageDescription={'Encuentra los mejores productos de tecnologia aquí'}
    >
      <Typography variant="h1" component="h1" color="primary">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>

      {isLoading ? <h3>Cargando..</h3> : <ProductList products={protucts} />}
    </ShopLayout>
  );
};

export default Home;
