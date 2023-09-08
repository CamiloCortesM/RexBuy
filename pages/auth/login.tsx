import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { AuthLayout } from '../../components/layouts';
import { FormLogin, AlertErrorMessage } from '@/components/auth/';

const LoginPage = () => {
  const [showError, setShowError] = useState(false);

  return (
    <AuthLayout title={'Ingresar'} headerTitle={'Iniciar Sesión'}>
      <AlertErrorMessage
        showError={showError}
        errorMessage="Usuario o contraseña no coinciden"
        setOpen={setShowError}
      />
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
