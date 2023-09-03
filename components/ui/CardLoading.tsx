import { Grid } from '@mui/material';
import style from './CardLoading.module.css';

export const CardLoading = () => {
  return (
    <Grid item xs={6} sm={4} md={3} height={400} sx={{ mb: '4px' }}>
      <div className={style.background}>
        <div className={style.animation}></div>
      </div>
    </Grid>
  );
};
