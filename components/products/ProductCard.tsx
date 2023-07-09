import { FC, useMemo, useState } from 'react';

import NextLink from 'next/link';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Link,
  CardContent,
  CardHeader,
  IconButton,
} from '@mui/material';

import { IProduct } from '../../interfaces';

import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(() => {
    return isHovered && product.images.length > 1
      ? `products/${product.images[1]}`
      : `products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      md={3}
      height={400}
      sx={{ mt: 1, mb: 2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        sx={{
          height: 400,
          position: 'relative',
        }}
      >
        <CardHeader
          action={
            isHovered && (
              <IconButton aria-label="settings">
                <FavoriteOutlined
                  sx={{
                    color: 'red',
                  }}
                />
              </IconButton>
            )
          }
          sx={{
            position: 'absolute',
            padding: 0,
            zIndex: 1,
            top: 5,
            left: 5,
          }}
        />
        <NextLink href="/product/slug" passHref prefetch={false} legacyBehavior>
          <Link>
            <CardActionArea
              sx={{
                height: { md: 270, xs: 230 },
              }}
            >
              <CardMedia
                component="img"
                className="fadeIn"
                sx={{
                  objectFit: 'contain',
                  maxHeight: '100%',
                }}
                image={productImage}
                alt={product.title}
              />
            </CardActionArea>
          </Link>
        </NextLink>

        <CardContent sx={{ mt: 0.5 }} className="fadeIn">
          <Typography variant="h2" fontWeight={500}>
            {`$${product.price}`}{' '}
            <Typography variant="caption" fontWeight={500} color="secondary">
              Envío gratis
            </Typography>
          </Typography>
          <Typography
            variant="subtitle2"
            fontWeight={200}
          >{`36x $ 10.99`}</Typography>
          <Typography fontWeight={700}>{product.title}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};