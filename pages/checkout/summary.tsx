import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { Box, Grid, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList } from '../../components/cart';
import { AlertErrorMessage } from '@/components/auth';
import { SummaryInfo } from '@/components/checkout/SummaryInfo';

const SummaryPage = () => {
  const router = useRouter();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!Cookies.get('firstName')) {
      router.push('/checkout/address');
    }
  }, [router]);

  return (
    <ShopLayout
      title="Resumen de orden"
      pageDescription={'Resumen de la orden'}
    >
      <Box padding='20px 30px'>
      <Typography mb={1} variant="h1" component="h1">
        Resumen de la orden
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <SummaryInfo
          setErrorMessage={setErrorMessage}
          setShowError={setShowError}
        />
      </Grid>
      <AlertErrorMessage errorMessage={errorMessage} showError={showError} setOpen={setShowError} />
      </Box>
    </ShopLayout>
  );
};

export default SummaryPage;
