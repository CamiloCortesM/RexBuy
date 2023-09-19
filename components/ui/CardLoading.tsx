import { Grid } from '@mui/material';
import style from './CardLoading.module.css';

export const CardLoading = () => {
  return (
    <Grid item xs={6} sm={4} md={3} lg={2} height={400}>
      <div className={style.background}>
        <div className={style.animation}></div>
      </div>
    </Grid>
  );
};
