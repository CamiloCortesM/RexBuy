import { FC, useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { rexbuyApi } from '@/api';

type Props = {
  currentValue: number;
  idProduct: string;
  onUpdateValue: (newValue: number) => void;
};

export const ItemCounter: FC<Props> = ({
  currentValue,
  onUpdateValue,
  idProduct,
}) => {
  const [maxValue, setMaxValue] = useState(currentValue);

  useEffect(() => {
    getMaxStock();
  }, []);

  const getMaxStock = async () => {
    try {
      const { data } = await rexbuyApi.get(`/products/stock/${idProduct}`);

      const { inStockValue } = data;
      setMaxValue(inStockValue);
    } catch (error) {
      console.error('Error obtaining API data', error);
    }
  };

  const addOrRemove = (value: number) => {
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
      <IconButton onClick={() => addOrRemove(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>
      <IconButton onClick={() => addOrRemove(+1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
