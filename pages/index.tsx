import { NextPage } from 'next';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts/ShopLayout';
import { ProductList } from '../components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';
import { Banner } from '@/components/ui/';
import { AdsSlideShow } from '@/components/ui/AdsSlideShow';
import { BANNER_IMAGES } from '@/constants';

const Home: NextPage = () => {
  const { isLoading, products } = useProducts('products');
  const { image1Url, image2Url, title, description } = BANNER_IMAGES;
  return (
    <ShopLayout
      title={'RexBuy - Home'}
      pageDescription={'Encuentra los mejores productos de tecnologia aquí'}
    >
      <Banner
        image1Url={image1Url}
        image2Url={image2Url}
        title={title}
        description={description}
      />
      <AdsSlideShow />

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default Home;
