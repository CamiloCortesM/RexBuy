import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import {
  ProductReviewCard,
  ProductSlideshow,
  RatingSummaryGrid,
} from '../../components/products';
import { dbProducts, dbReviews } from '@/database';
import { IProduct, IReview } from '@/interfaces';
import { ProductDetail } from '@/components/products/ProductDetail';

type Props = {
  product: IProduct;
  reviews: IReview[];
};

const ProductPage: NextPage<Props> = ({ product, reviews }) => {
  const ratingCounts: { [key: number]: number } = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  for (const review of reviews) {
    ratingCounts[review.rating]++;
  }

  const ratingPercentages: { [key: number]: number } = {};
  for (const rating in ratingCounts) {
    const count = ratingCounts[parseInt(rating)];
    ratingPercentages[parseInt(rating)] = count / product.numReviewers;
  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid
        container
        spacing={4}
        sx={{
          padding: { xs: '10px 20px', md: '25px 100px' },
        }}
      >
        <Grid item xs={12} md={5}>
          <ProductSlideshow images={product.images} />
          {product.images.map((image, i) => (
            <Image
              key={i}
              src={image}
              height={120}
              width={200}
              alt={product.title}
              style={{
                width: '25%',
                maxWidth: 210,
                objectFit: 'contain',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: 15,
                margin: '10px',
              }}
            />
          ))}
        </Grid>

        <Grid item xs={12} md={7}>
          <ProductDetail product={product} />
          <Divider
            sx={{
              margin: '30px 0',
            }}
          />
          <Grid
            container
            sx={{
              margin: { xs: '0px', lg: '20px 60px' },
            }}
          >
            <Grid item xs={12} mb={3}>
              <Typography variant="h2" fontWeight={500}>
                Opiniones del producto
              </Typography>
            </Grid>
            <RatingSummaryGrid
              rating={product.rating}
              numReviewers={product.numReviewers}
              ratingPercentages={ratingPercentages}
            />
            <Grid
              item
              xs={12}
              lg={8}
              px={{ xs: 0, lg: 2 }}
              py={{ xs: 2, lg: 0 }}
            >
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <ProductReviewCard
                    key={review._id}
                    comment={review.comment}
                    dateReview={review.updatedAt!}
                    rating={review.rating}
                    images={review.images}
                  />
                ))
              ) : (
                <Box
                  width="100%"
                  height={200}
                  sx={{
                    backgroundColor: '#ececec',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography textAlign="center" variant="body2" width={300}>
                    ¡Adquiere este increíble producto y sé el primero en dejar
                    tu opinión!
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
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

  const reviews: IReview[] = await dbReviews.getReviewsByProduct(product._id);

  return {
    props: {
      product,
      reviews,
    },
    // revalidate: 60 * 60 * 24, for better seo
    revalidate: 60,
  };
};

export default ProductPage;
