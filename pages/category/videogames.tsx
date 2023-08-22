import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';

const VideoGamesPage: NextPage = () => {
  const { isError, isLoading, products } = useProducts(
    'products?type=videojuegos'
  );
  return (
    <ShopLayout
      title={'RexBuy - Videojuegos'}
      pageDescription={
        'Encuentra las mejores consolas y todo lo relacionado a los videojuegos'
      }
    >
      <Typography variant="h1" component="h1" color="primary">
        Videojuegos
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Selección de Videojuegos
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default VideoGamesPage;
