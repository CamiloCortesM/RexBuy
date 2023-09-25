import { Box, Skeleton } from '@mui/material';

export const ButtonSkeleton = () => {
  return (
    <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
      <Skeleton
        sx={{ bgcolor: 'grey.300' }}
        variant="rounded"
        width={200}
        height={45}
      />
    </Box>
  );
};
