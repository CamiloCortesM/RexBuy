import { useState } from 'react';
import { GetServerSideProps } from 'next';

import { getSession } from 'next-auth/react';
import { AuthLayout } from '../../components/layouts';
import { AlertErrorMessage } from '@/components/auth';
import { FormRegister } from '@/components/auth/FormRegister';

const RegisterPage = () => {
  const [showError, setShowError] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState('');

  return (
    <AuthLayout title={'Ingresar'} headerTitle={'Crear Cuenta'}>
      <AlertErrorMessage
        errorMessage={showErrorMessage}
        showError={showError}
      />
      <FormRegister
        setShowError={setShowError}
        setShowErrorMessage={setShowErrorMessage}
      />
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

export default RegisterPage;
