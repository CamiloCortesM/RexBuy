import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { ShopLayout } from '@/components/layouts';
import { Box, Grid, Link, Typography } from '@mui/material';
import { ReviewsCompleted, ReviewsPending } from '@/components/reviews';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbReviews } from '@/database';
import { IReview } from '@/interfaces';

type Props = {
  reviews: IReview[];
};

const ReviewPage: NextPage<Props> = ({ reviews }) => {
  const router = useRouter();
  const { tab } = router.query;

  return (
    <ShopLayout
      title="Mis Opiniones"
      pageDescription="Visualiza y gestiona tus reseñas de los productos que has comprado. En esta página, puedes ver todas tus reseñas, incluyendo las pendientes y las completadas."
    >
      <Box
        sx={{
          display:'flex',
          flexDirection:'column',
          width: '100%',
          minHeight: 'calc(100vh - 200px)',
          backgroundColor: '#ededed',
          borderBottom: '1px solid #e5e5e5',
          padding: { xs: '30px 10px', lg: '60px 200px' },
        }}
      >
        <Typography variant="h1" component="h1" mb={4} fontSize="1.4rem">
          Reseñas
        </Typography>
        <Grid container gap={3}>
          <Grid
            item
            xs={12}
            borderBottom="1px solid #d5d5d5"
            height="37px"
            display="flex"
            alignItems="center"
            mb={1}
          >
            <NextLink href="/reviews?tab=PENDING" passHref legacyBehavior>
              <Link
                underline="none"
                mr={3}
                sx={{
                  color: tab !== 'COMPLETED' ? '#3484ff' : 'black',
                  height: '100%',
                  textAlign: 'center',
                  borderBottom: tab !== 'COMPLETED' ? '3px solid #3484ff' : '',
                  fontWeight: '500',
                  '&:hover': {
                    color: '#2968c8',
                  },
                }}
              >
                Pendientes
              </Link>
            </NextLink>
            <NextLink href="/reviews?tab=COMPLETED" passHref legacyBehavior>
              <Link
                underline="none"
                sx={{
                  color: tab === 'COMPLETED' ? '#3484ff' : 'black',
                  height: '100%',
                  textAlign: 'center',
                  borderBottom: tab === 'COMPLETED' ? '3px solid #3484ff' : '',
                  fontWeight: '500',
                  '&:hover': {
                    color: '#2968c8',
                  },
                }}
              >
                Realizadas
              </Link>
            </NextLink>
          </Grid>
          {tab === 'COMPLETED' ? (
            <ReviewsCompleted reviews={reviews} />
          ) : (
            <ReviewsPending reviews={reviews} />
          )}
        </Grid>
      </Box>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { tab = 'PENDING' } = query;
  const session: any = await getSession({ req });
  const idUser = session.user._id;

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/reviews`,
        permanent: false,
      },
    };
  }

  const reviewsInDB = await dbReviews.getReviewsByUserId(
    idUser,
    tab.toString()
  );
  const reviews = JSON.parse(JSON.stringify(reviewsInDB));
  return {
    props: {
      reviews,
    },
  };
};

export default ReviewPage;
