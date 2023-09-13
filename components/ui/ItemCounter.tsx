import { FC, useEffect, useState } from 'react';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { rexbuyApi } from '@/api';

type Props = {
  currentValue: number;
  idProduct   : string;
  capacity    : string | undefined;
  ram         : string | undefined;
  onUpdateValue: (newValue: number) => void;
  isValidProductSelection: () => boolean;
  setCanAddToCart?: (canAdd: boolean) => void;
};

export const ItemCounter: FC<Props> = ({
  currentValue,
  onUpdateValue,
  idProduct,
  isValidProductSelection,
  setCanAddToCart = function (boolean) {
    return;
  },
  capacity,
  ram,
}) => {
  const [maxValue, setMaxValue] = useState(currentValue);

  const url =
    capacity && ram
      ? `/products/stock/${idProduct}?capacity=${capacity}&ram=${ram}`
      : capacity
      ? `/products/stock/${idProduct}?capacity=${capacity}`
      : ram
      ? `/products/stock/${idProduct}?ram=${ram}`
      : `/products/stock/${idProduct}`;

  const getMaxStock = async () => {
    try {
      const { data } = await rexbuyApi.get(url);
      const { inStockValue } = data;
      setMaxValue(inStockValue);
      if (currentValue > inStockValue && inStockValue !== 0)
        onUpdateValue(inStockValue);
      if (isValidProductSelection() && inStockValue === 0) {
        setCanAddToCart(false);
        setMaxValue(-1);
        return;
      }
      if (isValidProductSelection()) setCanAddToCart(true);
    } catch (error) {
      console.error('Error obtaining API data itemCounter', error);
    }
  };

  useEffect(() => {
    getMaxStock();
  }, [ram, capacity]);

  const addOrRemove = (value: number) => {
    if (!isValidProductSelection()) return;
    if (value === -1) {
      if (currentValue === 1) return;
      onUpdateValue(currentValue - 1);
      return;
    }

    if (currentValue === maxValue) return;
    onUpdateValue(currentValue + 1);
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        disabled={!isValidProductSelection() || maxValue === -1}
        onClick={() => addOrRemove(-1)}
      >
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>
      <IconButton
        disabled={!isValidProductSelection() || maxValue === -1}
        onClick={() => addOrRemove(+1)}
      >
        <AddCircleOutline />
      </IconButton>
      {isValidProductSelection() && maxValue > 0 ? (
        <Typography ml={2} variant="caption">
          ({maxValue} Disponibles)
        </Typography>
      ) : (
        maxValue === -1 && (
          <Chip
            sx={{ marginLeft: 1 }}
            label="sin stock"
            color="error"
            size="small"
          />
        )
      )}
    </Box>
  );
};
