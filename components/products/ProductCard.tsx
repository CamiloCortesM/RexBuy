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
  IconButton,
  Chip,
  Rating,
  Box,
} from '@mui/material';

import { IProduct } from '../../interfaces';

import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';

type Props = {
  product: IProduct;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(() => {
    return isHovered && product.images.length > 1
      ? product.images[1]
      : product.images[0];
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      md={3}
      lg={2}
      height={400}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        sx={{
          height: 400,
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          zIndex: 1,
          ':hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 2,
          },
        }}
      >
        {isHovered && (
          <IconButton
            aria-label="settings"
            sx={{
              position: 'absolute',
              padding: 1,
              zIndex: 1,
              top: 5,
              right: 5,
            }}
          >
            <FavoriteOutlined
              sx={{
                color: 'red',
              }}
            />
          </IconButton>
        )}
        <NextLink
          href={`/product/${product.slug}`}
          passHref
          prefetch={false}
          legacyBehavior
        >
          <Link>
            <CardActionArea
              sx={{
                height: { md: 280, sm: 270, xs: 260 },
              }}
            >
              {product.inStock === 0 && (
                <Chip
                  color="primary"
                  label="no hay disponibles"
                  sx={{
                    position: 'absolute',
                    zIndex: 99,
                    top: '10px',
                    left: '10px',
                  }}
                />
              )}
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
            <CardContent className="fadeIn">
              <Box
                display="flex"
                gap={0.5}
                justifyContent="flex-start"
                alignItems="center"
                marginBottom={0.5}
              >
                <Rating
                  name="read-only"
                  size="small"
                  value={3.6}
                  precision={0.5}
                  readOnly
                />
                <Typography color={'gray'} variant="caption">
                  3.6
                </Typography>
              </Box>
              <Typography fontWeight={700} variant="h2">
                {product.title}
              </Typography>
              <Box
                display="flex"
                gap={1}
                justifyContent="flex-start"
                alignItems="center"
              >
                <Typography
                  sx={{
                    color: '#f8596b',
                  }}
                  fontWeight={500}
                >{`$${product.price}`}</Typography>
                <Typography
                  sx={{
                    opacity: '.7',
                    fontSize:'.8rem'
                  }}
                  variant="subtitle2"
                  fontWeight={400}
                >{`36x $ 10.99`}</Typography>
              </Box>
            </CardContent>
          </Link>
        </NextLink>
      </Card>
    </Grid>
  );
};
