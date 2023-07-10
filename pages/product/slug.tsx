import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, ItemSelector } from '../../components/products';
import { initialData } from '../../database/products';
import { ItemCounter } from '../../components/ui/ItemCounter';

const product = initialData.products[0];

const ProductPage = () => {
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
              {product.capacidad && (
                <>
                  <Typography mt={1} variant="subtitle2">
                    Capacidad
                  </Typography>
                  <ItemSelector
                    selecteditem={product.capacidad[0]}
                    items={product.capacidad}
                  />
                </>
              )}
              {product.ram && (
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
          {product.images.map((image) => (
            <img
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

export default ProductPage;
