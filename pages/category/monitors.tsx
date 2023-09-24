import { NextPage } from 'next';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';
import { Banner } from '@/components/ui';
import { BANNER_IMAGES_CATEGORIES } from '@/constants';

const MonitorsPage: NextPage = () => {
  const { monitors } = BANNER_IMAGES_CATEGORIES;
  const { image1Url, image2Url, title, description } = monitors;
  const { isLoading, products } = useProducts('products?type=monitores');
  return (
    <ShopLayout
      title={'RexBuy - Monitores'}
      pageDescription={
        'Encuentra los mejores Monitores con mejores resoluciones'
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

export default MonitorsPage;
