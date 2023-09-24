import { NextPage } from 'next';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';
import { BANNER_IMAGES_CATEGORIES } from '@/constants';
import { Banner } from '@/components/ui';

const VideoGamesPage: NextPage = () => {
  const { videogames } = BANNER_IMAGES_CATEGORIES;
  const { image1Url, image2Url, title, description } = videogames;
  const { isLoading, products } = useProducts('products?type=videojuegos');
  return (
    <ShopLayout
      title={'RexBuy - Videojuegos'}
      pageDescription={
        'Encuentra las mejores consolas y todo lo relacionado a los videojuegos'
      }
    >
      <Banner
        image1Url={image1Url}
        image2Url={image2Url}
        title={title}
        description={description}
      />
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default VideoGamesPage;
