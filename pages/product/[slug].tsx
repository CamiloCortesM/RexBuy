import { NextPage } from 'next';
import { GetServerSideProps } from 'next';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, ItemSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { IProduct } from '../../interfaces/products';
import { dbProducts } from '@/database';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  console.log(product);
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* titulos */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
            >{`$${product.price}`}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter />
              {product.capacity && product.capacity.length > 0 && (
                <>
                  <Typography mt={1} variant="subtitle2">
                    Capacidad
                  </Typography>
                  <ItemSelector
                    selecteditem={product.capacity[0]}
                    items={product.capacity}
                  />
                </>
              )}
              {product.ram && product.ram!.length > 0 && (
                <>
                  <Typography mt={1} variant="subtitle2">
                    Ram
                  </Typography>
                  <ItemSelector
                    selecteditem={product.ram[0]}
                    items={product.ram}
                  />
                </>
              )}
            </Box>

            {/* Agregar al carrito */}
            <Button color="secondary" className="circular-btn">
              Agregar al carrito
            </Button>

            {/* <Chip label="No hay disponibles" color="error" variant='outlined' /> */}

            {/* Descripción */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          sm={7}
          container
          spacing={3}
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {product.images.map((image, i) => (
            <img
              key={i}
              src={`/products/${image}`}
              alt={product.title}
              style={{
                width: '25%',
                maxWidth: 150,
                minHeight: 120,
                objectFit: 'contain',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: 15,
                margin: '10px',
              }}
            />
          ))}
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

//getServerSideProps
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
