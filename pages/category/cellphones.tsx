import { NextPage } from 'next';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';
import { Banner } from '@/components/ui';
import { BANNER_IMAGES_CATEGORIES } from '@/constants/categoryConstants';

const CellPhonesPage: NextPage = () => {
  const { cellphone } = BANNER_IMAGES_CATEGORIES;
  const { image1Url, image2Url, title, description } = cellphone;

  const { isLoading, products } = useProducts('products?type=celulares');
  return (
    <ShopLayout
      title={'RexBuy - Celulares'}
      pageDescription={'Encuentra los mejores celulares de marca'}
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

export default CellPhonesPage;
