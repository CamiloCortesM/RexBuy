import { FC } from 'react';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import {
  Divider,
  Grid,
  TextField,
} from '@mui/material';

import { ProductManagementData } from '@/interfaces';
import { FeatureSelection, PriceAndStockVariations, TypeSelection } from './';


type Props = {
  register : UseFormRegister<ProductManagementData>;
  errors   : FieldErrors<ProductManagementData>;
  getValues: UseFormGetValues<ProductManagementData>;
  setValue : UseFormSetValue<ProductManagementData>;
};

export const ProductInfo: FC<Props> = ({
  errors,
  register,
  getValues,
  setValue,
}) => {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        label="Título"
        variant="filled"
        fullWidth
        sx={{ mb: 1 }}
        {...register('title', {
          required: 'Este campo es requerido',
          minLength: { value: 2, message: 'Mínimo 2 caracteres' },
        })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      <TextField
        label="Descripción"
        variant="filled"
        fullWidth
        multiline
        sx={{ mb: 1 }}
        {...register('description', {
          required: 'Este campo es requerido',
          minLength: { value: 2, message: 'Mínimo 2 caracteres' },
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      <TextField
        label="Inventario"
        type="number"
        variant="filled"
        disabled={getValues('priceAndStockVariations').length > 0}
        fullWidth
        sx={{ mb: 1 }}
        {...register('inStock', {
          required: 'Este campo es requerido',
          min: { value: 0, message: 'Mínimo valor es 0' },
        })}
        error={!!errors.inStock}
        helperText={errors.inStock?.message}
      />

      <TextField
        label="Precio"
        type="text"
        variant="filled"
        disabled={getValues('priceAndStockVariations').length > 0}
        fullWidth
        sx={{ mb: 1 }}
        {...register('price', {
          required: 'Este campo es requerido',
          pattern: {
            value: /^\d+(\.\d{1,2})?$/,
            message: 'Por favor, ingresa un número válido',
          },
          min: { value: 0, message: 'Mínimo valor es 0' },
        })}
        error={!!errors.price}
        helperText={errors.price?.message}
      />

      <Divider sx={{ my: 1 }} />

      <TypeSelection getValues={getValues} setValue={setValue} />

      <FeatureSelection getValues={getValues} setValue={setValue} />

      <PriceAndStockVariations errors={errors} getValues={getValues} register={register} />
    </Grid>
  );
};
