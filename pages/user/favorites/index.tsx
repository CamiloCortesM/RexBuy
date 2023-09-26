import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { rexbuyApi } from '@/axios';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { FavoriteBorderSharp } from '@mui/icons-material';

import { CardFavorite } from '@/components/favorites/CardFavorite';
import { SvgFavoriteEmpty } from '@/components/favorites/SvgFavoriteEmpty';
import { ShopLayout } from '@/components/layouts';
import { EmptyReviewsSection } from '@/components/reviews';
import { dbFavorites } from '@/database';
import { IFavorite } from '@/interfaces';
import { DISPLAY_EMPTY_FAVORITE } from '@/constants';

type Props = {
  favorites: IFavorite[];
};
const FavoritesPage: NextPage<Props> = ({ favorites = [] }) => {
  const [favoritesProducts, setFavoritesProducts] = useState<IFavorite[] | []>(
    favorites
  );

  const deleteFavoriteProduct = async (id: string) => {
    try {
      await rexbuyApi.delete(`/user/favorite/${id}`);
      setFavoritesProducts((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ShopLayout
      title="Lista de Favoritos"
      pageDescription="Lista de favoritos del usuario autenticado"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minHeight: 'calc(100vh - 200px)',
          borderBottom: '1px solid #e5e5e5',
          padding: { xs: '30px 30px', lg: '60px 200px' },
        }}
      >
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Typography variant="h1">Lista de Favoritos</Typography>
          <FavoriteBorderSharp />
        </Box>
        <Divider sx={{ marginBottom: 3 }} />
        <Grid container display="flex" justifyContent="center">
          {favoritesProducts.map(({ createdAt, product, _id }) => {
            return (
              <CardFavorite
                id={_id}
                createdAt={createdAt}
                key={product._id}
                title={product.title}
                image={product.images[0]}
                price={product.price}
                deleteFavoriteProduct={deleteFavoriteProduct}
                slug={product.slug}
              />
            );
          })}
          {favoritesProducts.length === 0 && (
            <EmptyReviewsSection
              title={DISPLAY_EMPTY_FAVORITE.title}
              description={DISPLAY_EMPTY_FAVORITE.description}
              svgImage={<SvgFavoriteEmpty />}
            />
          )}
        </Grid>
      </Box>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/user/favorites`,
        permanent: false,
      },
    };
  }

  const idUser = session.user._id;
  const favorites = await dbFavorites.getFavoritesByUser(idUser);
  return {
    props: {
      favorites,
    },
  };
};

export default FavoritesPage;
