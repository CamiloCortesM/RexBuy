import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SaveOutlined, UploadOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
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
  Radio,
  RadioGroup,
  TextField,
  Typography,
  capitalize,
} from '@mui/material';

import { rexbuyApi } from '@/api';
import { SHOP_CONSTANTS } from '@/constants';
import { IProduct, PriceAndStockVariations } from '@/interfaces';

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

  priceAndStockVariations: PriceAndStockVariations[] | [];
}

type Props = {
  product: IProduct;
};

export const FormProduct: FC<Props> = ({ product }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
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
      const currentCapacity = value.capacity;
      const currentRam = value.ram;

      const handleTitleChange = () => {
        const newSlug =
          value.title
            ?.trim()
            .replaceAll(' ', '-')
            .replaceAll("'", '')
            .toLocaleLowerCase() || '';
        setValue('slug', newSlug);
      };

      const handleFieldChange = (
        fieldName: 'ram' | 'capacity',
        currentValue: string[],
        otherValue: string[],
        propertyName: 'ram' | 'capacity'
      ) => {
        if (currentValue?.length === 0) {
          if (otherValue?.length === 0) {
            setValue('priceAndStockVariations', []);
            return;
          }
          const newPriceAndStockVariations = value.priceAndStockVariations!.map(
            (item) => {
              item![propertyName] = '';
              return item as PriceAndStockVariations;
            }
          );
          setValue('priceAndStockVariations', newPriceAndStockVariations!);
          return;
        }
        if (otherValue!.length > 0) {
          if (
            currentValue!.length * otherValue!.length >=
            value.priceAndStockVariations!.length
          ) {
            //add field
            if (currentValue?.length === 1) {
              const newValues = value.priceAndStockVariations!.map((item) => {
                item![propertyName] = currentValue[0];
                item!.price = 0;
                item!.stock = 0;
                return item as PriceAndStockVariations;
              });
              setValue('priceAndStockVariations', newValues);
              return;
            }
            const previousValues: PriceAndStockVariations[] = getValues(
              'priceAndStockVariations'
            );
            const filteredCurrentValue = currentValue!.filter((value) => {
              return !previousValues.some(
                (item) => item[propertyName] === value
              );
            })[0];

            const newValues: PriceAndStockVariations[] = otherValue!.map(
              (value) => {
                return {
                  stock: 0,
                  price: 0,
                  capacity: '',
                  ram: '',
                  [propertyName]: filteredCurrentValue,
                  [fieldName]: value,
                };
              }
            );

            setValue('priceAndStockVariations', [
              ...previousValues,
              ...newValues,
            ]);

            return;
          } else {
            //delete field
            const previousValues: PriceAndStockVariations[] = getValues(
              'priceAndStockVariations'
            );
            const currentValues: PriceAndStockVariations[] =
              previousValues!.filter((item) => {
                return currentValue!.some(
                  (value) => value === item[propertyName]
                );
              });
            setValue('priceAndStockVariations', currentValues);
            return;
          }
        } else {
          if (currentValue!.length > value.priceAndStockVariations!.length) {
            //add field
            const previousValues: PriceAndStockVariations[] = getValues(
              'priceAndStockVariations'
            );
            const filteredCurrentValue = currentValue!.filter((value) => {
              return !previousValues.some(
                (item) => item[propertyName] === value
              );
            })[0];

            setValue('priceAndStockVariations', [
              ...previousValues,
              {
                capacity: '',
                ram: '',
                price: 0,
                stock: 0,
                [propertyName]: filteredCurrentValue!,
              },
            ]);
            return;
          } else {
            //delete field
            const previousValues: PriceAndStockVariations[] = getValues(
              'priceAndStockVariations'
            );
            const currentValues: PriceAndStockVariations[] =
              previousValues!.filter((item) => {
                return currentValue!.some(
                  (value) => value === item[propertyName]
                );
              });
            setValue('priceAndStockVariations', currentValues);
            return;
          }
        }
      };

      const handleCapacityChange = () => {
        handleFieldChange(
          'ram',
          currentCapacity as string[],
          currentRam as string[],
          'capacity'
        );
      };

      const handleRamChange = () => {
        handleFieldChange(
          'capacity',
          currentRam as string[],
          currentCapacity as string[],
          'ram'
        );
      };
      switch (name) {
        case 'title':
          handleTitleChange();
          break;
        case 'capacity':
          handleCapacityChange();
          break;
        case 'ram':
          handleRamChange();
          break;
        default:
        //management of other cases
      }

      const priceAndStockVariations: PriceAndStockVariations[] = getValues(
        'priceAndStockVariations'
      );

      if (
        name?.startsWith('priceAndStockVariations') &&
        name.endsWith('price')
      ) {
        const currentPrice = priceAndStockVariations.reduce<number>(
          (prev, current) => {
            const PriceValue = 1 * current.price;
            if (PriceValue < prev) return PriceValue;
            return prev;
          },
          Infinity
        );
        setValue('price', currentPrice);
      } else if (
        name?.startsWith('priceAndStockVariations') &&
        name.endsWith('stock')
      ) {
        const currentStock = priceAndStockVariations.reduce<number>(
          (prev, current) => {
            const stockValue = 1 * current.stock;
            return prev + stockValue;
          },
          0
        );
        setValue('inStock', currentStock);
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
    console.log({ form });
    if (form.images.length < 2) return alert('Minimo 2 imagenes');

    setIsSaving(true);

    try {
      await rexbuyApi({
        url: '/admin/products',
        method: form._id ? 'PUT' : 'POST',
        data: form,
      });

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

  const onDeleteImage = (image: string) => {
    setValue(
      'images',
      getValues('images').filter((img) => img !== image),
      { shouldValidate: true }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
        <Button
          color="secondary"
          startIcon={<SaveOutlined />}
          sx={{ width: '150px' }}
          type="submit"
          className="circular-btn"
          disabled={isSaving}
        >
          Guardar
        </Button>
      </Box>

      <Grid container spacing={2}>
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
            {SHOP_CONSTANTS.validCapacity.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox checked={getValues('capacity').includes(option)} />
                }
                onChange={() => onChangeCheck(option)}
                label={option}
              />
            ))}
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
            {SHOP_CONSTANTS.validRam.map((option) => (
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
        </Grid>
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
              label="Es necesario al 2 imagenes"
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
        </Grid>
      </Grid>
    </form>
  );
};
