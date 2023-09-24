import { ChangeEvent, FC, useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { rexbuyApi } from '@/api';

import { ShopLayout } from '@/components/layouts';
import { IReview, ReviewData } from '@/interfaces';
import { dbReviews } from '@/database';
import {
  RatingSection,
  ReviewImageSection,
  UserCommentSection,
} from '@/components/reviews';

type Props = {
  review: IReview;
};

const NewReview: FC<Props> = ({ review }) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const { rating = '' } = router.query;

  const { register, handleSubmit, getValues, setValue, watch } =
    useForm<ReviewData>({
      defaultValues: review,
    });

  useEffect(() => {
    const newLocal = rating !== '';
    if (newLocal && Number(rating) > 0 && Number(rating) < 6)
      setValue('rating', Number(rating) * 1, { shouldValidate: true });
  }, [rating, setValue]);

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

  const onNewReview = (newValue: number | null) => {
    if (newValue) setValue('rating', newValue);
  };

  const handleCancel = () => {
    router.replace(`/reviews?tab=COMPLETED`);
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
            <Image
              src={
                review.product.images[0].startsWith('https')
                  ? review.product.images[0]
                  : `http://localhost:3000/products/${review.product.images[0]}`
              }
              alt={review.product.title}
              height={100}
              width={100}
              style={{
                objectFit: 'contain',
                borderRadius: '50%',
                border: '1px solid #ededed',
                margin: '20px 0',
              }}
            />
            <RatingSection
              title={review.product.title}
              onNewReview={onNewReview}
              watch={watch}
            />
          </Box>
          <UserCommentSection register={register} />

          <ReviewImageSection
            isUpload={isUpload}
            handleFileChange={handleFileChange}
            onDeleteImage={onDeleteImage}
            title={review.product.title}
            watch={watch}
          />

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            my={4}
            gap={2}
          >
            <Button color="error" variant="outlined" onClick={handleCancel}>
              Cancelar
            </Button>
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
