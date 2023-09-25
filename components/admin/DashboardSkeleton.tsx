import { Grid, Skeleton } from '@mui/material';
import { FC } from 'react';

type Props = {
  numCycles: number;
};
export const DashboardSkeleton: FC<Props> = ({numCycles}) => {
  return (
    <Grid container spacing={2}>
      {[...Array(numCycles)].map((_, index) => (
        <Grid item xs={12} sm={4} md={3} key={index}>
          <Skeleton
            sx={{ bgcolor: 'grey.300' }}
            variant="rectangular"
            width="100%"
            height={120}
          />
        </Grid>
      ))}
    </Grid>
  );
};
