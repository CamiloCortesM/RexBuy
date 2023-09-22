import { ChangeEvent, FC, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { rexbuyApi } from '@/api';
import { useForm } from 'react-hook-form';
import {
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { CameraAltOutlined, CloseRounded, Star } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';

import { ShopLayout } from '@/components/layouts';
import { IReview, ReviewData } from '@/interfaces';
import { dbReviews } from '@/database';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type Props = {
  review: IReview;
};

const NewReview: FC<Props> = ({ review }) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const { register, handleSubmit, getValues, setValue, watch } =
    useForm<ReviewData>({
      defaultValues: review,
    });

  const handleFileChange = async ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }
    try {
      setIsUpload(true);
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await rexbuyApi.post<{ message: string }>(
          '/upload',
          formData
        );
        setValue('images', [...getValues('images'), data.message], {
          shouldValidate: true,
        });
      }
      setIsUpload(false);
    } catch (error) {
      setIsUpload(false);
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

  const onSubmit = async (form: ReviewData) => {
    if (form.rating < 1) return;
    console.log({ form });
    setIsSaving(true);

    try {
      await rexbuyApi({
        url: '/reviews',
        method: 'PUT',
        data: form,
      });

      router.replace(`/reviews?tab=COMPLETED`);
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  const OnNewReview = (newValue: number | null) => {
    if (newValue) setValue('rating', newValue);
  };
  return (
    <ShopLayout
      title="Crear Reseña"
      pageDescription="Crea una nueva reseña de un producto."
    >
      <Box
        gap={10}
        sx={{
          width: '100%',
          minHeight: 'calc(100vh - 200px)',
          backgroundColor: '#ededed',
          borderBottom: '1px solid #e5e5e5',
          padding: { xs: '30px 10px 0px', lg: '60px 180px 0px' },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width={{ sm: '100%', md: 700 }}
            sx={{
              backgroundColor: 'white',
              margin: '0 auto 30px',
              borderTop: '20px solid #0051b9',
              boxShadow: '0px 3px 4px #0000001c',
              padding: '10px',
            }}
          >
            <img
              src={
                review.product.images[0].startsWith('https')
                  ? review.product.images[0]
                  : `http://localhost:3000/products/${review.product.images[0]}`
              }
              width={120}
              height={120}
              style={{
                objectFit: 'contain',
                borderRadius: '50%',
                border: '1px solid #ededed',
                margin: '20px 0',
              }}
            />
            <Typography
              variant="h2"
              component="h2"
              mb={2}
              fontSize="1.5rem"
              fontWeight="600"
              textAlign="center"
            >
              ¿Qué te pareció tu producto?
            </Typography>
            <Typography
              variant="h3"
              component="h3"
              mb={3}
              fontSize="1rem"
              color='"#737373'
              textAlign="center"
            >
              {review.product.title}
            </Typography>

            <Rating
              name="simple-controlled"
              emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
              sx={{
                fontSize: 50,
              }}
              value={watch('rating')}
              onChange={(e, newValue) => OnNewReview(newValue)}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={5}
              width={{ xs: '92%', sm: '50%', md: '40%' }}
            >
              <Typography variant="caption" color="#737373">
                Muy malo
              </Typography>
              <Typography variant="caption" color="#737373">
                Excelente
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width={{ sm: '100%', md: 700 }}
            sx={{
              backgroundColor: 'white',
              margin: '0 auto 30px',
              boxShadow: '0px 3px 4px #0000001c',
              padding: '20px 20px 30px',
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              mt={3}
              mb={1}
              fontSize="1.5rem"
              fontWeight="600"
              textAlign="center"
            >
              Cuéntanos más acerca de tu producto
            </Typography>
            <Typography variant="caption" color="#737373" mb={5}>
              (Opcional)
            </Typography>
            <TextField
              variant="outlined"
              placeholder="El producto es muy..."
              fullWidth
              {...register('comment')}
              id="outlined-multiline-static"
              multiline
              rows={5}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width={{ sm: '100%', md: 700 }}
            sx={{
              backgroundColor: 'white',
              margin: '0 auto 30px',
              boxShadow: '0px 3px 4px #0000001c',
              padding: { xs: '20px 10px 30px', sm: '20px 50px 30px' },
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              mt={3}
              mb={1}
              fontSize="1.5rem"
              fontWeight="600"
              textAlign="center"
            >
              Comparte fotos de tu producto
            </Typography>
            <Typography variant="caption" color="#737373" mb={4}>
              (Opcional)
            </Typography>

            <Grid container spacing={2} mb={2}>
              {watch('images').map((img, i) => (
                <Grid item xs={4} sm={2} key={img}>
                  <Card
                    sx={{
                      position: 'relative',
                    }}
                  >
                    <IconButton
                      onClick={() => onDeleteImage(img)}
                      aria-label="delete"
                      size="small"
                      sx={{
                        position: 'absolute',
                        zIndex: 1,
                      }}
                    >
                      <CloseRounded fontSize="inherit" />
                    </IconButton>
                    <CardMedia
                      component="img"
                      className="fadeIn"
                      image={img}
                      alt={`review ${review.product.title} #${i}`}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>

            <LoadingButton
              loading={isUpload}
              loadingPosition="start"
              component="label"
              variant="outlined"
              color="primary"
              startIcon={<CameraAltOutlined />}
            >
              {isUpload ? 'Subiendo Imagenes' : 'Subir Imagenes'}
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                multiple
                accept="image/png, image/gif, image/jpeg"
              />
            </LoadingButton>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            my={4}
          >
            <LoadingButton
              loading={isSaving}
              variant="contained"
              type="submit"
              color="success"
              sx={{
                '&:hover': {
                  backgroundColor: 'darkgreen',
                },
              }}
            >
              Guardar Cambios
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query;
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/reviews/new/${id}`,
        permanent: false,
      },
    };
  }

  const reviewInDB = await dbReviews.getReviewById(id.toString());

  if (!reviewInDB) {
    return {
      redirect: {
        destination: '/reviews',
        permanent: false,
      },
    };
  }

  if (reviewInDB.user.toString() !== session.user._id.toString()) {
    return {
      redirect: {
        destination: `/reviews`,
        permanent: false,
      },
    };
  }

  const review = JSON.parse(JSON.stringify(reviewInDB));
  return {
    props: {
      review,
    },
  };
};

export default NewReview;
