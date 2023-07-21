import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { Box, Button, Chip, Grid, Link, TextField } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
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
    }

    router.replace('/');
  };

  return (
    <AuthLayout title={'Ingresar'} headerTitle={'Iniciar Sesión'}>
      <Chip
        label="No se reconoce el usuario o la contraseña"
        color="error"
        icon={<ErrorOutline />}
        className="fadeIn"
        sx={{ display: showError ? 'flex' : 'none', marginBottom: '10px' }}
      />

      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        {/*Check login style */}
        <Box sx={{ width: 350 }} display="flex" flexDirection="column" gap={2}>
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
