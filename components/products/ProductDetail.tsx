import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Chip, Typography } from '@mui/material';
import { ICartProduct, IProduct } from '@/interfaces';
import { ItemCounter } from '../ui';
import { ItemSelector } from './ItemSelector';
import { CartContext } from '@/context';

type Props = {
  product: IProduct;
};

export const ProductDetail: FC<Props> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);

  const router = useRouter();
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id     : product._id,
    image   : product.images[0],
    price   : product.price,
    slug    : product.slug,
    title   : product.title,
    brand   : product.brand,
    model   : product.model,
    capacity: undefined,
    ram     : undefined,
    quantity: 1,
  });

  useEffect(() => {
    if (
      product.priceAndStockVariations?.length === 0 ||
      !isValidProductSelection
    )
      return;

    const matchingVariation = product.priceAndStockVariations?.find(
      (PriceAndStock) => {
        return (
          (PriceAndStock.capacity === tempCartProduct.capacity ||
            (PriceAndStock.capacity === '' &&
              tempCartProduct.capacity === undefined)) &&
          (PriceAndStock.ram === tempCartProduct.ram ||
            (PriceAndStock.ram === '' && tempCartProduct.ram === undefined))
        );
      }
    );

    if (matchingVariation) {
      setTempCartProduct((currentProduct) => ({
        ...currentProduct,
        price: matchingVariation.price,
      }));
    }
  }, [tempCartProduct.capacity, tempCartProduct.ram]);

  const isValidProductSelection = () => {
    if (product.capacity!.length > 0 && !tempCartProduct.capacity) return false;
    if (product.ram!.length > 0 && !tempCartProduct.ram) return false;
    return true;
  };

  const onSelectedSize = (value: string, name: string = 'capacity') => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      [`${name}`]: value,
    }));
  };

  const onAddProduct = () => {
    if (!isValidProductSelection) return;
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
    <Box display="flex" flexDirection="column">
      <Typography variant="h1" component="h1">
        {product.title}
      </Typography>
      <Typography
        variant="subtitle1"
        component="h2"
      >{`$${tempCartProduct.price}`}</Typography>
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle2">Cantidad</Typography>
        <ItemCounter
          currentValue={tempCartProduct.quantity}
          onUpdateValue={onUpdateValue}
          idProduct={product._id}
          isValidProductSelection={isValidProductSelection}
          capacity={tempCartProduct.capacity}
          ram={tempCartProduct.ram}
        />
        {product.capacity && product.capacity.length > 0 && (
          <>
            <Typography mt={1} variant="subtitle2">
              Capacidad
            </Typography>
            <ItemSelector
              itemName={'capacity'}
              onSelectedSize={onSelectedSize}
              selectedItem={tempCartProduct.capacity}
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
              selectedItem={tempCartProduct.ram}
              items={product.ram}
            />
          </>
        )}
      </Box>

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
        <Chip label="No hay disponibles" color="error" variant="outlined" />
      )}

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2">Descripción</Typography>
        <Typography variant="body2">{product.description}</Typography>
      </Box>
    </Box>
  );
};
