import { FC } from 'react';
import { Box, Chip } from '@mui/material';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import { ProductManagementData } from '@/interfaces';

type Props = {
  getValues: UseFormGetValues<ProductManagementData>;
  setValue : UseFormSetValue<ProductManagementData>;
};

export const TagListDisplay: FC<Props> = ({ setValue, getValues }) => {

  const onDeleteTag = (deleteTag: string) => {
    const currentTags = getValues('tags');
    setValue(
      'tags',
      currentTags.filter((tag) => tag !== deleteTag),
      { shouldValidate: true }
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0,
        m: 0,
      }}
      component="ul"
    >
      {getValues('tags').map((tag) => {
        return (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => onDeleteTag(tag)}
            color="primary"
            size="small"
            sx={{ ml: 1, mt: 1 }}
          />
        );
      })}
    </Box>
  );
};
