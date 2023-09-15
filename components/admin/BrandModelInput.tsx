import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Box, TextField } from '@mui/material';

import { ProductManagementData } from '@/interfaces';

type Props = {
  register: UseFormRegister<ProductManagementData>;
  errors  : FieldErrors<ProductManagementData>;
};
export const BrandModelInput: FC<Props> = ({register,errors}) => {
  return (
    <Box sx={{ display: 'flex', mb: 1 }}>
      <TextField
        label="Marca"
        variant="filled"
        sx={{ flex: 1, marginRight: '1rem' }}
        size="medium"
        {...register('brand', {
          required: 'Este campo es requerido',
          minLength: { value: 2, message: 'Mínimo 2 caracteres' },
        })}
        error={!!errors.brand}
        helperText={errors.brand?.message}
      />
      <TextField
        label="Modelo"
        variant="filled"
        sx={{ flex: 1 }}
        size="medium"
        {...register('model', {
          required: 'Este campo es requerido',
          minLength: { value: 2, message: 'Mínimo 2 caracteres' },
        })}
        error={!!errors.model}
        helperText={errors.model?.message}
      />
    </Box>
  );
};
