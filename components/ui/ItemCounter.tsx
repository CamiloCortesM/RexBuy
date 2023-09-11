import { FC, useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { rexbuyApi } from '@/api';

type Props = {
  currentValue: number;
  idProduct   : string;
  capacity    : string | undefined;
  ram         : string | undefined;
  onUpdateValue: (newValue: number) => void;
  isValidProductSelection: () => boolean;
};

export const ItemCounter: FC<Props> = ({
  currentValue,
  onUpdateValue,
  idProduct,
  isValidProductSelection,
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

  useEffect(() => {
    getMaxStock();
  }, [capacity, ram]);

  const getMaxStock = async () => {
    try {
      const { data } = await rexbuyApi.get(url);

      const { inStockValue } = data;
      setMaxValue(inStockValue);
      if (currentValue > inStockValue && inStockValue !== 0)
        onUpdateValue(inStockValue);
    } catch (error) {
      console.error('Error obtaining API data', error);
    }
  };

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
        disabled={!isValidProductSelection()}
        onClick={() => addOrRemove(-1)}
      >
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>
      <IconButton
        disabled={!isValidProductSelection()}
        onClick={() => addOrRemove(+1)}
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
