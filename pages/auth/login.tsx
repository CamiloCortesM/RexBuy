import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  Snackbar,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { AuthContext } from '@/context';
import { AuthLayout } from '../../components/layouts';
import { validations } from '@/utils';

type formData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [showError, setShowError] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  const onLoginUser = async ({ email, password }: formData) => {
    setShowError(false);

    const isValidUser = await loginUser(email, password);
    if (!isValidUser) {
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
      return;
    }

    const destination = router.query.p?.toString() || '/';
    router.replace(destination);
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
        {/*Check login style */}
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
            <NextLink href="/auth/register" passHref legacyBehavior>
              <Link underline="always">¿No tienes cuenta?</Link>
            </NextLink>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
