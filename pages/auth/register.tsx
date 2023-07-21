import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { Box, Button, Chip, Grid, Link, TextField } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthContext } from '@/context';
import { AuthLayout } from '../../components/layouts';
import { validations } from '@/utils';
import { rexbuyApi } from '@/api';

type formData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const [showErrorMessage, setShowErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  const onRegisterForm = async ({ email, name, password }: formData) => {

    setShowError(true);
    const { hasError, message } = await registerUser(email, name, password);

    if (!hasError) {
      setShowError(true);
      setShowErrorMessage(message!);
      setTimeout(() => setShowError(false), 4000);
      return;
    }

    router.replace('/');
  };

  return (
    <AuthLayout title={'Ingresar'} headerTitle={'Crear Cuenta'}>
      <Chip
        label="No se reconoce el usuario o la contraseña"
        color="error"
        icon={<ErrorOutline />}
        className="fadeIn"
        sx={{ display: showError ? 'flex' : 'none', marginBottom: '10px' }}
      />
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350 }} display="flex" flexDirection="column" gap={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre completo"
              variant="filled"
              fullWidth
              {...register('name', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 3,
                  message: 'Nombre debe tener al menos 3 caracteres',
                },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
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
                minLength: {
                  value: 6,
                  message: 'Contraseña debe tener al menos 6 caracteres',
                },
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
            <NextLink href="/auth/login" passHref legacyBehavior>
              <Link underline="always">¿Ya tienes cuenta?</Link>
            </NextLink>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
