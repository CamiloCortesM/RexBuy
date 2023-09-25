import { Grid, Skeleton } from '@mui/material';

export const TableSkeleton = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ height: 440, width: '100%' }}>
        <Skeleton
          sx={{ bgcolor: 'grey.300' }}
          variant="rectangular"
          width="100%"
          height={400}
        />
      </Grid>
    </Grid>
  );
};
