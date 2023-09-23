import { FC } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { Typography, Box, Rating } from '@mui/material';
import { Star } from '@mui/icons-material';

import { ReviewData } from '@/interfaces';

type Props = {
  title: string;
  watch: UseFormWatch<ReviewData>;
  onNewReview: (arg0: number | null) => void;
};
export const RatingSection: FC<Props> = ({ title, watch, onNewReview }) => {
  return (
    <>
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
        {title}
      </Typography>
      <Rating
        name="simple-controlled"
        emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
        sx={{
          fontSize: 50,
        }}
        value={watch('rating')}
        onChange={(e, newValue) => onNewReview(newValue)}
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
    </>
  );
};
