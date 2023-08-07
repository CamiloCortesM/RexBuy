import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { getProviders, getSession, signIn } from 'next-auth/react';

import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Snackbar,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts';
import { validations } from '@/utils';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    await signIn('credentials', { email, password });
  };

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

      <form
        style={{
          width: '100%',
        }}
        onSubmit={handleSubmit(onLoginUser)}
        noValidate
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Grid item xs={12}>
            <TextField
              type="email"
              label="Correo"
              variant="filled"
              fullWidth
              {...register('email', {
                required: 'El correo es requerido',
                validate: validations.isEmail,
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              variant="filled"
              fullWidth
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Ingresar
            </Button>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink
              href={
                router.query.p
                  ? `/auth/register?p=${router.query.p}`
                  : '/auth/register'
              }
              passHref
              legacyBehavior
            >
              <Link underline="always">¿No tienes cuenta?</Link>
            </NextLink>
          </Grid>

          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            justifyContent="end"
          >
            <Divider sx={{ width: '100%', mb: 2 }} />
            {Object.values(providers).map((provider: any) => {
              if (provider.id === 'credentials') {
                return <div key="credentials"></div>;
              }

              return (
                <Button
                  key={provider.id}
                  variant="outlined"
                  fullWidth
                  color="primary"
                  sx={{ mb: 2 }}
                  onClick={() => signIn(provider.id)}
                >
                  {provider.name}
                </Button>
              );
            })}
          </Grid>
        </Box>
      </form>
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
