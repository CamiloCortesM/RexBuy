import { ChangeEvent, FC, useRef } from 'react';
import { UploadOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Chip,
  FormLabel,
  Grid,
} from '@mui/material';
import { rexbuyApi } from '@/api';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { ProductManagementData } from '@/interfaces';

type Props = {
  getValues: UseFormGetValues<ProductManagementData>;
  setValue : UseFormSetValue<ProductManagementData>;
};

export const ImageManagement: FC<Props> = ({ getValues, setValue }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }
    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await rexbuyApi.post<{ message: string }>(
          '/admin/upload',
          formData
        );
        setValue('images', [...getValues('images'), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const onDeleteImage = (image: string) => {
    setValue(
      'images',
      getValues('images').filter((img) => img !== image),
      { shouldValidate: true }
    );
  };

  return (
    <Box display="flex" flexDirection="column">
      <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
      <Button
        color="secondary"
        fullWidth
        startIcon={<UploadOutlined />}
        sx={{ mb: 3 }}
        className="circular-btn"
        onClick={() => fileInputRef.current?.click()}
      >
        Cargar imagen
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png, image/gif, image/jpeg"
        style={{ display: 'none' }}
        onChange={onFilesSelected}
      />

      <Chip
        label="Es necesario almenos 2 imagenes"
        color="error"
        variant="outlined"
        sx={{
          display: getValues('images').length < 2 ? 'flex' : 'none',
        }}
      />

      <Grid container spacing={2}>
        {getValues('images').map((img) => (
          <Grid item xs={4} sm={3} key={img}>
            <Card>
              <CardMedia
                component="img"
                className="fadeIn"
                image={img}
                alt={img}
              />
              <CardActions>
                <Button
                  fullWidth
                  color="error"
                  onClick={() => onDeleteImage(img)}
                >
                  Borrar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
