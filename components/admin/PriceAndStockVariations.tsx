import { FC } from 'react';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import { Box, Grid, TextField, Typography } from '@mui/material';

import { ProductManagementData } from '@/interfaces';

type Props = {
  register : UseFormRegister<ProductManagementData>;
  errors   : FieldErrors<ProductManagementData>;
  getValues: UseFormGetValues<ProductManagementData>;
};

export const PriceAndStockVariations: FC<Props> = ({
  getValues,
  errors,
  register,
}) => {
  return (
    <Grid mt={2} container spacing={1}>
      {getValues('priceAndStockVariations').map((item, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              border: 'solid 1px gray',
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: { sm: '.75rem', md: '.7rem', lg: '.8rem' },
              }}
            >
              {item.capacity !== '' ? `${item.capacity} SSD` : ''}
              {item.capacity !== '' && item.ram !== '' && ' + '}
              {item.ram !== '' ? `${item.ram} RAM` : ''}
            </Typography>
            <TextField
              label="Precio"
              type="text"
              variant="filled"
              fullWidth
              {...register(`priceAndStockVariations.${i}.price`, {
                required: 'Este campo es requerido',
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: 'Por favor, ingresa un precio válido',
                },
                min: { value: 1, message: 'Mínimo valor es 1' },
              })}
              error={!!errors.priceAndStockVariations?.[i]?.price}
            />
            <TextField
              label="Stock"
              variant="filled"
              fullWidth
              {...register(`priceAndStockVariations.${i}.stock`, {
                required: 'Este campo es requerido',
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: 'Por favor, ingresa un stock válido',
                },
                min: { value: 0, message: 'Mínimo valor es 0' },
              })}
              error={!!errors.priceAndStockVariations?.[i]?.stock}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
