import { FC } from 'react';
import { Star } from '@mui/icons-material';
import { Box, LinearProgress, Typography } from '@mui/material';

type Props = {
  value : number;
  number: number;
};
export const LinearProgressWithLabel: FC<Props> = ({ value, number }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Star
          sx={{
            fontSize: '1rem',
          }}
          color="secondary"
        />
        <Typography variant="body2" color="text.secondary">
          {number}
        </Typography>
      </Box>
    </Box>
  );
};
