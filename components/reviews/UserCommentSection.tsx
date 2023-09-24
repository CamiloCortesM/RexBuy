import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Box, TextField, Typography } from '@mui/material';
import { ReviewData } from '@/interfaces';

type Props = {
  register: UseFormRegister<ReviewData>;
};

export const UserCommentSection: FC<Props> = ({ register }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width={{ sm: '100%', md: 700 }}
      sx={{
        backgroundColor: 'white',
        margin: '0 auto 30px',
        boxShadow: '0px 3px 4px #0000001c',
        padding: '20px 20px 30px',
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        mt={3}
        mb={1}
        fontSize="1.5rem"
        fontWeight="600"
        textAlign="center"
      >
        Cuéntanos más acerca de tu producto
      </Typography>
      <Typography variant="caption" color="#737373" mb={5}>
        (Opcional)
      </Typography>
      <TextField
        variant="outlined"
        placeholder="El producto es muy..."
        fullWidth
        {...register('comment')}
        id="outlined-multiline-static"
        multiline
        rows={5}
      />
    </Box>
  );
};
