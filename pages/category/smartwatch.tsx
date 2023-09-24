import { NextPage } from 'next';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';
import { BANNER_IMAGES_CATEGORIES } from '@/constants';
import { Banner } from '@/components/ui';

const SmartWatchPage: NextPage = () => {
  const { smartwatch } = BANNER_IMAGES_CATEGORIES;
  const { image1Url, image2Url, title, description } = smartwatch;
  const { isLoading, products } = useProducts('products?type=smartwatch');
  return (
    <ShopLayout
      title={'RexBuy - Smartwatch'}
      pageDescription={'Encuentra los mejores relojes inteligentes'}
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

export default SmartWatchPage;
