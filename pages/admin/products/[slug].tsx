import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';

import {
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

import { AdminLayout } from '../../../components/layouts';
import { IProduct } from '../../../interfaces';
import { dbProducts } from '../../../database';
import { rexbuyApi } from '@/api';
import { Product } from '@/models';

const validTypes = [
  'celulares',
  'computadores',
  'videojuegos',
  'accesorios',
  'tabletas',
  'smartwatch',
  'monitores',
];
const validCapacity = ['64GB', '128GB', '256GB', '512GB', '1TB', '2TB'];
const validRam = ['4GB', '8GB', '12GB', '16GB', '32GB', '64GB'];

interface FormData {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  slug: string;
  tags: string[];
  title: string;
  brand: string;
  model: string;
  capacity: string[];
  ram: string[];
  type: string;
}

interface Props {
  product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const router = useRouter();
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: product,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'title') {
        const newSlug =
          value.title
            ?.trim()
            .replaceAll(' ', '-')
            .replaceAll("'", '')
            .toLocaleLowerCase() || '';

        setValue('slug', newSlug);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onDeleteTag = (deleteTag: string) => {
    const currentTags = getValues('tags');
    setValue(
      'tags',
      currentTags.filter((tag) => tag !== deleteTag),
      { shouldValidate: true }
    );
  };

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

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 2) return alert('Minimo 2 imagenes');

    setIsSaving(true);

    try {
      const { data } = await rexbuyApi({
        url: '/admin/products',
        method: form._id ? 'PUT' : 'POST',
        data: form,
      });

      console.log({ data });

      if (!form._id) {
        router.replace(`/admin/products/${form.slug}`);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

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
    <AdminLayout
      title={'Producto'}
      subTitle={`Editando: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type="submit"
            disabled={isSaving}
          >
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
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
              fullWidth
              sx={{ mb: 1 }}
              {...register('price', {
                required: 'Este campo es requerido',
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/, // Expresión regular para validar números con hasta 2 decimales
                  message: 'Por favor, ingresa un número válido',
                },
                min: { value: 0, message: 'Mínimo valor es 0' },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup
                row
                value={getValues('type')}
                onChange={({ target }) =>
                  setValue('type', target.value, { shouldValidate: true })
                }
              >
                {validTypes.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup
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
                Capacidad
              </FormLabel>
              {validCapacity.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={getValues('capacity').includes(option)}
                    />
                  }
                  onChange={() => onChangeCheck(option)}
                  label={option}
                />
              ))}
              {/* <RadioGroup
                row
                // value={ status }
                // onChange={ onStatusChanged }
              >
               
              </RadioGroup> */}
            </FormGroup>

            <FormGroup
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
                Ram
              </FormLabel>
              {validRam.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox checked={getValues('ram').includes(option)} />
                  }
                  onChange={() => onChangeCheck(option, 'ram')}
                  label={option}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
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
              onKeyDown={({ code }) =>
                code === 'Space' ? onNewTag() : undefined
              }
            />

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

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3 }}
                className="circular-btn"
              >
                Cargar imagen
              </Button>

              <Chip
                label="Es necesario al 2 imagenes"
                color="error"
                variant="outlined"
              />

              <Grid container spacing={2}>
                {product.images.map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={`/products/${img}`}
                        alt={img}
                      />
                      <CardActions>
                        <Button fullWidth color="error">
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;

  let product: IProduct | null;

  if (slug === 'new') {
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    tempProduct.images = ['img1.jpg', 'img2.jpg'];
    product = tempProduct;
  } else {
    product = await dbProducts.getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
