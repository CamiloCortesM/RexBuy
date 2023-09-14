import { FC } from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, capitalize } from '@mui/material';

import { ProductManagementData } from '@/interfaces';
import { SHOP_CONSTANTS } from '@/constants';

type Props = {
  getValues: UseFormGetValues<ProductManagementData>;
  setValue : UseFormSetValue<ProductManagementData>;
};

export const TypeSelection:FC<Props> = ({getValues,setValue}) => {
  return (
    <FormControl sx={{ mb: 1 }}>
      <FormLabel>Tipo</FormLabel>
      <RadioGroup
        row
        value={getValues('type')}
        onChange={({ target }) =>
          setValue('type', target.value, { shouldValidate: true })
        }
      >
        {SHOP_CONSTANTS.validTypes.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio color="secondary" />}
            label={capitalize(option)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
