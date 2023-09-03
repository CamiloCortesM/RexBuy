import { Grid } from '@mui/material';
import { CardLoading } from './CardLoading';

export const FullScreenLoading = () => {
  const numberOfCards = 8;
  const cardLoadings = [];

  for (let i = 0; i < numberOfCards; i++) {
    cardLoadings.push(<CardLoading key={i} />);
  }

  return (
    <Grid container spacing={0.5}>
      {cardLoadings}
    </Grid>
  );
};
