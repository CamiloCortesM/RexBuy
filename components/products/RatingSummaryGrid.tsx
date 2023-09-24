import { FC } from 'react';
import { Box, Grid, Rating, Typography } from '@mui/material';
import { LinearProgressWithLabel } from './LinearProgressWithLabel';

type Props = {
  rating: number;
  numReviewers: number;
  ratingPercentages: { [key: number]: number };
};
export const RatingSummaryGrid: FC<Props> = ({
  rating,
  numReviewers,
  ratingPercentages,
}) => {
  return (
    <Grid item xs={12} lg={4}>
      <Box display="flex">
        <Typography variant="h3">{rating}</Typography>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          px={3}
        >
          <Rating name="read-only" value={rating} readOnly />
          <Typography variant="caption">
            {numReviewers > 0 && numReviewers}{' '}
            {numReviewers > 0
              ? numReviewers === 1
                ? 'opinion'
                : 'opiniones'
              : 'No hay opiniones'}
          </Typography>
        </Box>
      </Box>
      <Box mt={1}>
        {Object.entries(ratingPercentages).map(([number, value]) => (
          <LinearProgressWithLabel
            key={number}
            value={value * 100}
            number={parseInt(number)}
          />
        ))}
      </Box>
    </Grid>
  );
};
