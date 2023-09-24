import { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
  title      : string;
  description: string;
  svgImage   : ReactNode;
};

export const EmptyReviewsSection: FC<Props> = ({
  title,
  description,
  svgImage,
}) => {
  return (
    <Box
      width="100%"
      height="400px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{
        backgroundColor: '#e4e4e4',
        padding: '20px',
      }}
    >
      {svgImage}
      <Typography variant="h2" fontWeight={400} mb={2} textAlign="center">
        {title}
      </Typography>
      <Typography
        variant="body2"
        maxWidth={420}
        textAlign="center"
        fontWeight={100}
      >
        {description}
      </Typography>
    </Box>
  );
};
