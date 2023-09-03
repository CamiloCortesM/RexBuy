import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { Alert, Snackbar } from '@mui/material';

import { AuthLayout } from '../../components/layouts';
import { FormLogin } from '@/components/auth/FormLogin';

const LoginPage = () => {
  const [showError, setShowError] = useState(false);

  return (
    <AuthLayout title={'Ingresar'} headerTitle={'Iniciar Sesión'}>
      <Snackbar
        open={showError}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" sx={{ width: '100%' }} variant="filled">
          Usuario o contraseña no coinciden
        </Alert>
      </Snackbar>
      <FormLogin setShowError={setShowError} />
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { p = '/' } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
