import { FC } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import { initialData } from '../../database/products';
import { ItemCounter } from '../ui';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <>
      {productsInCart.map((product) => (
        <Grid container spacing={2} key={product.slug} sx={{ mb: 2 }}>
          <Grid item xs={3} md={2}>
            {/* TODO: llevar a la página del producto */}
            <NextLink href="/product/slug" passHref legacyBehavior>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
                    component="img"
                    sx={{
                      borderRadius: '5px',
                      border: '1px solid rgba(0,0,0,0.05)',
                    }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7} md={6}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1" fontWeight={500}>
                {product.title}
              </Typography>
              {product.capacity && product.capacity.length > 0 && (
                <Typography variant="caption">
                  Capacidad: {product.capacity[0]}
                </Typography>
              )}

              {product.ram && product.ram.length > 0 && (
                <Typography variant="caption">Ram: {product.ram[0]}</Typography>
              )}
              {editable ? (
                <ItemCounter />
              ) : (
                <Typography variant="h5">3 items</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>

            {editable && (
              <Button variant="text" color="error">
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
