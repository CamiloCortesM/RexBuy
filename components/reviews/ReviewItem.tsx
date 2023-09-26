import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Button, Grid, Rating, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { date } from '@/utils';

type Props = {
  review: {
    _id: string;
    comment: string;
    product: {
      _id: string;
      title: string;
      images: string[];
      slug: string;
    };
    rating: number;
    createdAt?: string;
    updatedAt?: string;
  };
  isCompleted?: boolean;
};

export const ReviewItem: FC<Props> = ({ review, isCompleted = true }) => {
  const router = useRouter();

  const OnNewReview = (newValue: number | null) => {
    router.push(
      `/reviews/new/${review._id}?rating=${newValue}`
    );
  };

  return (
    <Grid item xs={12}>
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        sx={{
          backgroundColor: 'white',
          border: '1px solid #d5d5d5',
          borderRadius: '10px',
          height: '100px',
        }}
      >
        <Image
          src={
            review.product.images[0].startsWith('http')
              ? review.product.images[0]
              : `http://localhost:3000/products/${review.product.images[0]}`
          }
          width={55}
          height={55}
          alt={review.product.title}
          className='image_product'
        />
        <Box
          display="flex"
          alignItems="center"
          width={{
            xs: isCompleted ? '35%' : '68%',
            sm: '60%',
            md: isCompleted ? '40%' : '50%',
          }}
          justifyContent={{
            xs: isCompleted ? 'center' : 'space-evenly',
            sm: 'flex-start',
          }}
          flexDirection={{
            xs: isCompleted ? 'column' : 'row',
            sm: 'row',
          }}
          ml={1}
        >
          <Typography
            variant="h2"
            component="h2"
            fontSize={{ xs: '.9rem', sm: '1rem' }}
            fontWeight="500"
            ml={{ xs: 0, sm: 2 }}
            mr={{ xs: isCompleted ? 0 : 1, sm: 0 }}
            width={{ sm: '60%' }}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {review.product.title}
          </Typography>
          <Rating
            name={isCompleted ? 'read-only' : 'simple-controlled'}
            sx={{ fontSize: { xs: isCompleted ? 15 : 24, sm: 30, lg: 40 } }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
            value={review.rating}
            readOnly={isCompleted}
            onChange={(e, newValue) => OnNewReview(newValue)}
          />
        </Box>
        <Typography
          variant="body2"
          display={{ xs: 'none', md: 'flex' }}
          fontSize={{ xs: '.7rem', lg: '.9rem' }}
          sx={{
            opacity: '.5',
            marginLeft: '50px',
          }}
        >
          {isCompleted
            ? `Realizada el ${date.formatDate(review.updatedAt!)}`
            : `Comprado el ${date.formatDate(review.createdAt!)}`}
        </Typography>

        {isCompleted && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              marginLeft: 'auto',
              fontSize: { xs: '.6rem', sm: '.8rem' },
              marginRight: { xs: '10px', sm: '30px' },
              '&:hover': {
                backgroundColor: '#0d2243',
              },
            }}
            onClick={() =>
              router.push(`reviews/new/${review._id}`)
            }
          >
            Editar reseña
          </Button>
        )}
      </Box>
    </Grid>
  );
};
