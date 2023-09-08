import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { Grid } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow } from '../../components/products';
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';
import { ProductDetail } from '@/components/products/ProductDetail';

type Props = {
  product: IProduct;
};

const ProductPage: NextPage<Props> = ({ product }) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <ProductDetail product={product} />
        </Grid>
        <Grid
          item
          sm={6}
          spacing={2}
          sx={{
            display: { xs: 'none', sm: 'block' },
            margin: '10px',
            padding: 0,
          }}
        >
          {product.images.map((image, i) => (
            <img
              key={i}
              src={image}
              alt={product.title}
              style={{
                width: '24%',
                maxWidth: 210,
                maxHeight: 300,
                objectFit: 'contain',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: 15,
                margin: '10px',
              }}
            />
          ))}
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
