import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField } from '@mui/material';
import { AuthLayout } from '../../components/layouts';

const RegisterPage = () => {
  return (
    <AuthLayout title={'Ingresar'} headerTitle={'Crear Cuenta'}>
      <Grid item xs={12}>
        <TextField label="Nombre completo" variant="filled" fullWidth />
      </Grid>
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
        <NextLink href="/auth/login" passHref legacyBehavior>
          <Link underline="always">¿Ya tienes cuenta?</Link>
        </NextLink>
      </Grid>
    </AuthLayout>
  );
};

export default RegisterPage;
