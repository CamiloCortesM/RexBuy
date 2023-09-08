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
import { ICartProduct } from '@/interfaces/cart';
import { IOrderItem } from '@/interfaces';

type Props = {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  const onDeleteProduct = (product: ICartProduct) => {
    removeCartProduct(product);
  };

  const showProducts = products ? products : cart;

  return (
    <>
      {showProducts.map((product, i) => (
        <Grid container spacing={2} key={product.slug + i} sx={{ mb: 2 }}>
          <Grid item xs={3} md={2}>
            <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={product.image}
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
                  onUpdateValue={(value) =>
                    onNewCartQuantityValue(product, value)
                  }
                  maxValue={1000}
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
              <Button
                variant="text"
                color="error"
                onClick={() => onDeleteProduct(product)}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
