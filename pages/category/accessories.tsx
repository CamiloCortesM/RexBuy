import { NextPage } from 'next';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';
import { Banner } from '@/components/ui';
import { BANNER_IMAGES_CATEGORIES } from '@/constants';

const AccessoriesPage: NextPage = () => {
  const { accessories } = BANNER_IMAGES_CATEGORIES;
  const { image1Url, image2Url, title, description } = accessories;
  const { isLoading, products } = useProducts('products?type=accesorios');
  return (
    <ShopLayout
      title={'RexBuy - Accesorios'}
      pageDescription={'Encuentra los mejores accesorios de tecnología'}
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

export default AccessoriesPage;
