import Image from 'next/image';
import NextLink from 'next/link';
import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

const EmptyPage = () => {
  return (
    <ShopLayout
      title="Carrito vació"
      pageDescription="No hay artículos en el carrito de compras"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Image
          width={100}
          height={100}
          src={'/emptycart.png'}
          alt="empty cart"
          style={{
            width: '100%',
            height:'auto',
            maxWidth: 400,
            opacity: 0.6,
          }}
        />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>Su carrito está vació</Typography>
          <NextLink href="/" passHref legacyBehavior>
            <Link typography="h4" color="secondary">
              Regresar
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
