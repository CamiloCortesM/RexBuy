import { Grid } from '@mui/material';

export const CardLoading = () => {
  return (
    <Grid item xs={6} sm={4} md={3} lg={2} height={400}>
      <div className='background' >
        <div className='animation'></div>
      </div>
    </Grid>
  );
};
