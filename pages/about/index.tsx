import { NextPage } from 'next';

import { ShopLayout } from '@/components/layouts';
import { Grid, Typography } from '@mui/material';

import { About, Benefits, ListItemBenefits } from '@/components/about';

const AboutPage: NextPage = () => {
  return (
    <ShopLayout
      title={'RexBuy - Acerca de Nosotros'}
      pageDescription={'Información sobre RexBuy'}
    >
      <Grid
        container
        padding="30px"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h1" textAlign="center">
          Somos líderes en la venta de productos electrónicos de alta calidad y
          precios competitivos
        </Typography>

        <About />
        <ListItemBenefits />
        <Benefits />

        <Typography fontSize="1.1rem" textAlign="center">
          <strong>¡Bienvenido a RexBuy!</strong> ¡Esperamos que disfrutes de tu
          experiencia de compra en línea con nosotros y que encuentres los
          productos tecnológicos que se adapten a tus necesidades!
        </Typography>
      </Grid>
    </ShopLayout>
  );
};

export default AboutPage;
