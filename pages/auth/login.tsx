import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField } from '@mui/material';
import { AuthLayout } from '../../components/layouts';

const LoginPage = () => {
  return (
    <AuthLayout title={'Ingresar'} headerTitle={'Iniciar Sesión'}>
      <Grid item xs={12}>
        <TextField label="Correo" variant="filled" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contraseña"
          type="password"
          variant="filled"
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <Button
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
    </AuthLayout>
  );
};

export default LoginPage;
