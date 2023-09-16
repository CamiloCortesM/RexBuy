import { NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts/ShopLayout';
import { ProductList } from '../components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';

const Home: NextPage = () => {
  const { isLoading, products } = useProducts('products');
  return (
    <ShopLayout
      title={'RexBuy - Home'}
      pageDescription={'Encuentra los mejores productos de tecnologia aquí'}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="300px"
        sx={{
          borderBottom:'1px solid #e9eaec',
          backgroundColor:'#fafafa'
        }}
      >
        <Typography variant="h1" component="h1" color="primary">
          Tienda
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Todos los productos
        </Typography>
      </Box>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default Home;
