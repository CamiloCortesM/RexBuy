import { FC, useState } from 'react';
import { useSession } from 'next-auth/react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import { Box, Divider, Modal, TextField, Typography } from '@mui/material';
import { rexbuyApi } from '@/api';
import { IUser } from '@/interfaces';

type Input = {
  name: string;
};

type Props = {
  handleClose: Function;
  open: boolean;
  updateUser: Function;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export const ModalNameEdit: FC<Props> = ({ handleClose, open, updateUser }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Input>();

  const handleCloseModal = () => {
    handleClose();
  };
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Input> = async (info) => {
    setIsLoading(true);

    try {
      const { data } = await rexbuyApi.put<{ updatedUser: IUser }>(
        '/user',
        info
      );
      const user: IUser = data.updatedUser;

      const { email } = user;
      await updateUser(user);
      await update({ email });
    } catch (error) {
      console.log(error);
    }

    handleClose();
    setIsLoading(false);
    reset();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} width={{ sm: '500px', xs: '250px' }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            fontWeight="600"
          >
            Edita tu nombre
          </Typography>
          <Divider />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Los cambios realizados a tu nombre de perfil aquí, se mostrarán en
            cualquier lugar donde se utilice tu perfil.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              marginTop="15px"
              display="flex"
              flexDirection="column"
              gap={2}
              alignItems="flex-end"
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                sx={{ width: '100%' }}
                {...register('name', {
                  required: true,
                  minLength: 3,
                })}
                error={!!errors.name}
                helperText={errors.name && 'Ingrese un nombre válido'}
              />

              <LoadingButton
                sx={{ ':hover': { backgroundColor: '#092448' } }}
                variant="contained"
                color="primary"
                loading={isLoading}
                type="submit"
                size="small"
              >
                Guardar Cambios
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
