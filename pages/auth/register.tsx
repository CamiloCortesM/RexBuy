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

type FormData = {
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
  } = useForm<FormData>();

  const onRegisterForm = async ({ email, name, password }: FormData) => {
    const { hasError, message } = await registerUser(email, name, password);

    if (hasError) {
      setShowError(true);
      setShowErrorMessage(message!);
      setTimeout(() => setShowError(false), 4000);
      return;
    }

    const destination = router.query.p?.toString() || '/';
    router.replace(destination);
  };

  return (
    <AuthLayout title={'Ingresar'} headerTitle={'Crear Cuenta'}>
      <Snackbar
        open={showError}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" sx={{ width: '100%' }} variant="filled">
          {showErrorMessage}
        </Alert>
      </Snackbar>

      <form
        style={{
          width: '100%',
        }}
        onSubmit={handleSubmit(onRegisterForm)}
        noValidate
      >
        <Box display="flex" flexDirection="column" gap={2}>
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
            <NextLink
              href={
                router.query.p
                  ? `/auth/login?p=${router.query.p}`
                  : '/auth/login'
              }
              passHref
              legacyBehavior
            >
              <Link underline="always">¿Ya tienes cuenta?</Link>
            </NextLink>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
