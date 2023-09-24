import { NextPage } from 'next';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';
import { BANNER_IMAGES_CATEGORIES } from '@/constants';
import { Banner } from '@/components/ui';

const TabletsPage: NextPage = () => {
  const { tablets } = BANNER_IMAGES_CATEGORIES;
  const { image1Url, image2Url, title, description } = tablets;
  const { isLoading, products } = useProducts('products?type=tabletas');
  return (
    <ShopLayout
      title={'RexBuy - Tablets'}
      pageDescription={
        'Encuentra las tabletas del mercado de ultima generación'
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

export default TabletsPage;
