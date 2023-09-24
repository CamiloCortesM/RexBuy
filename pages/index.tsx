import { NextPage } from 'next';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts/ShopLayout';
import { ProductList } from '../components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';
import { Banner } from '@/components/ui/';
import { AdsSlideShow } from '@/components/ui/AdsSlideShow';

const Home: NextPage = () => {
  const { isLoading, products } = useProducts('products');
  return (
    <ShopLayout
      title={'RexBuy - Home'}
      pageDescription={'Encuentra los mejores productos de tecnologia aquí'}
    >
      <Banner />
      <AdsSlideShow />

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default Home;
