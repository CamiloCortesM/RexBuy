import { FC, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { Box, Button, Divider, Grid, Link, TextField } from '@mui/material';
import { getProviders, signIn } from 'next-auth/react';

import { validations } from '@/utils';
import { useAuthForm } from '@/hooks';
import { ButtonProvider } from './ButtonProvider';

type FormData = {
  email   : string;
  password: string;
};

type Props = {
  setShowError: (arg0: boolean) => void;
};

export const FormLogin: FC<Props> = ({ setShowError }) => {
  const router = useRouter();

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const {
    formState: { errors },
    handleSubmit,
    loginUser,
    register,
  } = useAuthForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    const isValidUser = await loginUser(email, password);
    if (!isValidUser) {
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
      return;
    }
    await signIn('credentials', { email, password });
  };

  return (
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
            color="primary"
            className="circular-btn-blue"
            size="large"
            fullWidth
          >
            Ingresar
          </Button>
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

            return <ButtonProvider key={provider.id} provider={provider} />;
          })}
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
      </Box>
    </form>
  );
};
