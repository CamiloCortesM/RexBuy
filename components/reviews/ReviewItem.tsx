import { Box, Button, Grid, Rating, Typography } from '@mui/material';
import { FC } from 'react';

import styles from './ReviewItem.module.css';

type Props = {
  review: {
    _id: string;
    comment: string;
    user: string;
    product: {
      _id: string;
      title: string;
      images: string[];
      slug: string;
    };
    rating: number;
  };
  isCompleted?: boolean;
};

export const ReviewItem: FC<Props> = ({ review, isCompleted = true }) => {
  const OnNewReview = (newValue: number | null) => {
    //TODO: change de page /review/new?value=newValue
    console.log({ newValue });
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
        <img
          src={`http://localhost:3000/products/${review.product.images[0]}`}
          width={55}
          height={55}
          className={styles.image_product}
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
            name="read-only"
            sx={{ fontSize: { xs: isCompleted ? 15 : 24, sm: 30, lg: 40 } }}
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
          {isCompleted ? 'Realizada' : 'Comparado'} el 11 de junio, 2023
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
          >
            Editar reseña
          </Button>
        )}
      </Box>
    </Grid>
  );
};
