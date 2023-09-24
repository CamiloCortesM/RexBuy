import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Chip, IconButton, Typography } from '@mui/material';
import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';
import { ICartProduct, IProduct } from '@/interfaces';
import { ItemCounter } from '../ui';
import { ItemSelector } from './ItemSelector';
import { AuthContext, CartContext } from '@/context';
import { AlertErrorMessage } from '../auth';
import { rexbuyApi } from '@/api';

type Props = {
  product: IProduct;
};

export const ProductDetail: FC<Props> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);

  const { user, isLoggedIn } = useContext(AuthContext);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [canAddToCart, setCanAddToCart] = useState(false);

  const [isProductFavorite, setIsProductFavorite] = useState(false);

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

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!user) return;
    const checkIsProductFavorite = async () => {
      try {
        const { data } = await rexbuyApi.get(`/user/favorite/${product._id}`);
        setIsProductFavorite(!!data);
      } catch (error) {
        console.log(error);
      }
    };

    checkIsProductFavorite();
  }, [product._id, isLoggedIn]);

  const handleFavoriteToggle = async () => {
    if (!user) {
      return printErrorMessage(
        'Acceso restringido: Inicia sesión para continuar'
      );
    }
    try {
      if (isProductFavorite) {
        setIsProductFavorite(false);
        await rexbuyApi.delete(`/user/favorite/${product._id}`);
      } else {
        setIsProductFavorite(true);
        await rexbuyApi.post('/user/favorite/', { product: product._id });
      }
    } catch (error) {
      console.error('Error toggling favorite product:', error);
      setIsProductFavorite(!isProductFavorite);
    }
  };

  const isValidProductSelection = useMemo(() => {
    return () => {
      if (product.capacity!.length > 0 && !tempCartProduct.capacity)
        return false;
      if (product.ram!.length > 0 && !tempCartProduct.ram) return false;
      return true;
    };
  }, [
    product.capacity,
    tempCartProduct.capacity,
    product.ram,
    tempCartProduct.ram,
  ]);

  useEffect(() => {
    if (
      product.priceAndStockVariations?.length === 0 ||
      !isValidProductSelection()
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
  }, [
    tempCartProduct.capacity,
    tempCartProduct.ram,
    product.priceAndStockVariations,
    isValidProductSelection,
  ]);

  const onSelectedSize = (value: string, name: string = 'capacity') => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      [`${name}`]: value,
    }));
  };

  const printErrorMessage = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setShowError(true);
  };

  const onAddProduct = () => {
    if (!isValidProductSelection()) {
      printErrorMessage('Especificaciones incorrectas');
      return;
    }
    if (!canAddToCart) {
      printErrorMessage('Producto sin stock');
      return;
    }
    addProductToCart(tempCartProduct);
    router.push('/cart');
  };

  const onUpdateValue = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

  const setOpen = (isOpen: boolean) => {
    setShowError(isOpen);
  };

  return (
    <Box display="flex" flexDirection="column" px={{ xs: 0, lg: 10 }}>
      <AlertErrorMessage
        setOpen={setOpen}
        showError={showError}
        errorMessage={errorMessage}
      />
      <Box display="flex" alignItems="center">
        <Typography mr={2} variant="h1" component="h1">
          {product.title}
        </Typography>
        <IconButton aria-label="settings" onClick={handleFavoriteToggle}>
          {isProductFavorite ? (
            <FavoriteOutlined
              sx={{
                color: 'red',
              }}
            />
          ) : (
            <FavoriteBorderOutlined
              sx={{
                color: 'red',
              }}
            />
          )}
        </IconButton>
      </Box>
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
          setCanAddToCart={setCanAddToCart}
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
