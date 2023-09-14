import { FC, useState } from 'react';
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
import { BrandModelInput, TagListDisplay, ImageManagement } from './';

type Props = {
  register : UseFormRegister<ProductManagementData>;
  errors   : FieldErrors<ProductManagementData>;
  getValues: UseFormGetValues<ProductManagementData>;
  setValue : UseFormSetValue<ProductManagementData>;
};

export const ProductConfiguration: FC<Props> = ({
  register,
  errors,
  getValues,
  setValue,
}) => {
  const [newTag, setNewTag] = useState('');

  const onNewTag = () => {
    const newTagValue = newTag.trim().toLocaleLowerCase();
    if (newTagValue.length < 1) return;
    const currentTags = getValues('tags');
    if (currentTags.includes(newTagValue)) return;
    else {
      setValue('tags', [...currentTags, newTagValue], { shouldValidate: true });
      setNewTag('');
    }
  };

  return (
    <Grid item xs={12} sm={6}>
      <BrandModelInput errors={errors} register={register} />
      <TextField
        label="Slug - URL"
        variant="filled"
        fullWidth
        sx={{ mb: 1 }}
        {...register('slug', {
          required: 'Este campo es requerido',
          validate: (val) =>
            val.trim().includes(' ')
              ? 'No puede tener espacios en blanco'
              : undefined,
        })}
        error={!!errors.slug}
        helperText={errors.slug?.message}
      />

      <TextField
        label="Etiquetas"
        variant="filled"
        fullWidth
        sx={{ mb: 1 }}
        helperText="Presiona [spacebar] para agregar"
        value={newTag}
        onChange={({ target }) => setNewTag(target.value)}
        onKeyDown={({ code }) => (code === 'Space' ? onNewTag() : undefined)}
      />

      <TagListDisplay getValues={getValues} setValue={setValue} />
      <Divider sx={{ my: 2 }} />
      <ImageManagement getValues={getValues} setValue={setValue} />
    </Grid>
  );
};
