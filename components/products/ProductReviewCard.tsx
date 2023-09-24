import { FC } from 'react';
import Image from 'next/image';
import { Box, Divider, Grid, Rating, Typography } from '@mui/material';
import { date } from '@/utils';

type Props = {
  rating    : number;
  dateReview: string;
  images    : string[];
  comment   : string;
};

export const ProductReviewCard: FC<Props> = ({
  rating,
  dateReview,
  images,
  comment,
}) => {
  return (
    <Box>
      <Box mb={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Rating
            name="read-only"
            sx={{
              fontSize: '1.2rem',
            }}
            value={rating}
            readOnly
          />
          <Typography variant="caption" fontSize=".7rem">
            {date.formatDateShort(dateReview!)}
          </Typography>
        </Box>
      </Box>
      <Grid container mb={1}>
        {images.map((img, i) => (
          <Grid xs={4} sm={2} md={3} key={i} item>
            <Image
              height={100}
              width={100}
              src={img}
              alt={`review ${i}`}
              style={{
                width: '100%',
                height:'auto',
                borderRadius: '10px',
                objectFit: 'contain',
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="body1" mb={2} ml={1}>
        {comment}
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
    </Box>
  );
};
