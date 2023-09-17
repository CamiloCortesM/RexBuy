import { Grid } from '@mui/material';
import { CardLoading } from './CardLoading';

export const FullScreenLoading = () => {
  const numberOfCards = 12;
  const cardLoadings = [];

  for (let i = 0; i < numberOfCards; i++) {
    cardLoadings.push(<CardLoading key={i} />);
  }

  return (
    <Grid
      container
      sx={{
        backgroundColor: '#fafafa',
        border: 'solid 1px #e9eaec',
        padding: { xs: 0, sm: 2, md: 4 },
      }}
      spacing={0.5}
    >
      {cardLoadings}
    </Grid>
  );
};
