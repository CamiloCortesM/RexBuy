import { NextPage } from 'next';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';
import { Banner } from '@/components/ui';
import { BANNER_IMAGES_CATEGORIES } from '@/constants';

const ComputersPage: NextPage = () => {
  const { computers } = BANNER_IMAGES_CATEGORIES;
  const { image1Url, image2Url, title, description } = computers;
  const { isLoading, products } = useProducts('products?type=computadores');
  return (
    <ShopLayout
      title={'RexBuy - Computadores'}
      pageDescription={'Encuentra los mejores computadores del mercado'}
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

export default ComputersPage;
