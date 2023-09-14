import { FC } from 'react';
import { FEATURE_OPTIONS, SHOP_CONSTANTS } from '@/constants';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';

import { ProductManagementData } from '@/interfaces';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

type Props = {
  getValues: UseFormGetValues<ProductManagementData>;
  setValue : UseFormSetValue<ProductManagementData>;
};

export const FeatureSelection: FC<Props> = ({ getValues, setValue }) => {
  const onChangeCheck = (option: string, type: string = 'capacity') => {
    if (!['ram', 'capacity'].includes(type)) return;
    const currentValues = getValues(type as 'ram' | 'capacity');
    const setValueForType = (values: string[]) => {
      setValue(type as 'ram' | 'capacity', values, {
        shouldValidate: true,
      });
    };

    if (currentValues.includes(option)) {
      setValueForType(currentValues.filter((value) => value !== option));
      return;
    }
    setValueForType([...currentValues, option]);
  };

  return (
    <>
      {FEATURE_OPTIONS.map((item, i) => {
        return (
          <FormGroup
            key={i}
            sx={{
              mb: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <FormLabel
              sx={{
                mr: 2,
              }}
            >
              {item.name}
            </FormLabel>
            {SHOP_CONSTANTS.validCapacity.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={getValues(
                      item.type as 'capacity' | 'ram'
                    ).includes(option)}
                  />
                }
                onChange={() => onChangeCheck(option, item.type)}
                label={option}
              />
            ))}
          </FormGroup>
        );
      })}
    </>
  );
};
