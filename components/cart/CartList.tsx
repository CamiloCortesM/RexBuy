import { FC, useContext } from 'react';
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

import { ItemCounter } from '../ui';
import { CartContext } from '@/context';

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart } = useContext(CartContext);

  console.log(cart);

  return (
    <>
      {cart.map((product) => (
        <Grid container spacing={2} key={product.slug} sx={{ mb: 2 }}>
          <Grid item xs={3} md={2}>
            {/* TODO: llevar a la página del producto */}
            <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
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
              {product.capacity && (
                <Typography variant="caption">
                  Capacidad: {product.capacity}
                </Typography>
              )}

              {product.ram && (
                <Typography variant="caption">Ram: {product.ram}</Typography>
              )}
              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  onUpdateValue={() => {}}
                  maxValue={10}
                />
              ) : (
                <Typography variant="h5">
                  {product.quantity}{' '}
                  {product.quantity > 1 ? 'productos' : 'producto'}
                </Typography>
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
