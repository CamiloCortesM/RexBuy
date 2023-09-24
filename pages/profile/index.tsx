import { useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { getSession } from 'next-auth/react';
import { ShopLayout } from '@/components/layouts';
import { Grid, Typography } from '@mui/material';

import { AuthContext } from '@/context';
import { InformationProfile, ProfileSkeleton } from '@/components/profile';

const ProfilePage: NextPage = () => {
  const { isLoggedIn, updateUser, user } = useContext(AuthContext);

  return (
    <ShopLayout
      title="Perfil"
      pageDescription={'Configuración de perfil de usuario'}
    >
      <Grid
        container
        mt={3}
        padding="10px 30px"
        minHeight="calc(100vh - 200px)"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={3}
      >
        <Typography variant="h1" component="h1" marginY="20px">
          Administra tu perfil
        </Typography>
        {isLoggedIn ? (
          <InformationProfile user={user} updateUser={updateUser} />
        ) : (
          <ProfileSkeleton />
        )}
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/profile`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default ProfilePage;
