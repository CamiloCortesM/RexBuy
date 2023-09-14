import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SaveOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
} from '@mui/material';

import { rexbuyApi } from '@/api';
import { IProduct, PriceAndStockVariations, ProductManagementData } from '@/interfaces';
import { ProductInfo,ProductConfiguration } from './';

type Props = {
  product     : IProduct;
  setShowAlert:(arg0: boolean) => void
};

export const FormProduct: FC<Props> = ({ product,setShowAlert }) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<ProductManagementData>({
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

  const onSubmit = async (form: ProductManagementData) => {
    console.log({ form });
    if (form.images.length < 2) return alert('Minimo 2 imagenes');

    setShowAlert(false);
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
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 4000);
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
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
          <ProductInfo errors={errors} getValues={getValues} register={register} setValue={setValue} />
          <ProductConfiguration errors={errors} getValues={getValues} register={register} setValue={setValue} />
        </Grid>
      </form>
  );
};
