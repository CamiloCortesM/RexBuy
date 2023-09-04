import { useContext, useState } from 'react';
import { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, ItemSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { IProduct } from '../../interfaces/products';
import { dbProducts } from '@/database';
import { ICartProduct } from '@/interfaces/cart';
import { CartContext } from '@/context';

type Props = {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);

  const router = useRouter();
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    slug: product.slug,
    title: product.title,
    brand: product.brand,
    model: product.model,
    capacity: undefined,
    ram: undefined,
    quantity: 1,
  });

  const onSelectedSize = (value: string, name: string = 'capacity') => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      [`${name}`]: value,
    }));
  };

  const onAddProduct = () => {
    if (product.capacity!.length > 0 && !tempCartProduct.capacity) return;
    if (product.ram!.length > 0 && !tempCartProduct.ram) return;
    addProductToCart(tempCartProduct);
    router.push('/cart');
  };

  const onUpdateValue = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

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
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                onUpdateValue={onUpdateValue}
                maxValue={product.inStock}
              />
              {product.capacity && product.capacity.length > 0 && (
                <>
                  <Typography mt={1} variant="subtitle2">
                    Capacidad
                  </Typography>
                  <ItemSelector
                    itemName={'capacity'}
                    onSelectedSize={onSelectedSize}
                    selecteditem={tempCartProduct.capacity}
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
                    itemName={'ram'}
                    onSelectedSize={onSelectedSize}
                    selecteditem={tempCartProduct.ram}
                    items={product.ram}
                  />
                </>
              )}
            </Box>

            {/* Agregar al carrito */}
            {product.inStock > 0 ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={onAddProduct}
              >
                {product.ram?.length! > 0
                  ? product.capacity?.length! > 0
                    ? tempCartProduct.ram && tempCartProduct.capacity
                      ? 'Agregar al carrito'
                      : 'Seleccione las especificaciones'
                    : tempCartProduct.ram
                    ? 'Agregar al carrito'
                    : 'Seleccione las especificaciones'
                  : product.capacity?.length! > 0
                  ? tempCartProduct.capacity
                    ? 'Agregar al carrito'
                    : 'Seleccione las especificaciones'
                  : 'Agregar al carrito'}
              </Button>
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            )}

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
              src={image}
              alt={product.title}
              style={{
                width: '25%',
                maxWidth: 150,
                height: 160,
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

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
