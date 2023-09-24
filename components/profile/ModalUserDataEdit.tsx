import { FC, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from '@mui/material';

import { rexbuyApi } from '@/api';
import { IUser } from '@/interfaces';

type Inputs = {
  department: string;
  city: string;
  address: string;
  cellphone: string;
};

type Props = {
  handleClose: Function;
  open: boolean;
  updateUser: Function;
  user: IUser;
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

export const ModalUserDataEdit: FC<Props> = ({
  handleClose,
  open,
  updateUser,
  user,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValue('department', user.department || '');
    setValue('city', user.city || '');
    setValue('address', user.address || '');
    setValue('cellphone', user.cellphone || '');
  }, [user, setValue]);

  const handleCloseModal = () => {
    handleClose();
  };

  const onSubmit: SubmitHandler<Inputs> = async (info) => {
    setIsLoading(true);
    try {
      const { data } = await rexbuyApi.post<{ updatedUser: IUser }>(
        '/profile/edit-personal-information',
        info
      );
      const user: IUser = data.updatedUser;
      const { email } = user;

      updateUser(user);
      update({ email });
    } catch (error) {
      console.log(error);
    }

    handleClose();
    setIsLoading(false);
    reset();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} width={{ sm: '500px', xs: '320px' }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            fontWeight="600"
          >
            Edita Información personal
          </Typography>
          <Divider />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Información personal de tu domicilio y contacto.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              marginTop="15px"
              display="flex"
              flexDirection="column"
              gap={2}
              alignItems="flex-end"
            >
              <Box display="flex" flexDirection="row" width="100%" gap={2}>
                <Box display="flex" flexDirection="column" width="100%">
                  <Typography variant="body1" fontWeight={600}>
                    Departamento
                  </Typography>

                  <TextField
                    id="outlined-basic"
                    size="small"
                    sx={{ width: '100%' }}
                    {...register('department', {
                      minLength: 3,
                    })}
                    error={!!errors.department}
                    helperText={errors.department && 'Departamento no válido'}
                  />
                </Box>

                <Box display="flex" flexDirection="column" width="100%">
                  <Typography variant="body1" fontWeight={600}>
                    Ciudad
                  </Typography>
                  <TextField
                    id="outlined-basic-city "
                    size="small"
                    sx={{ width: '100%' }}
                    {...register('city', {
                      minLength: 3,
                    })}
                    error={!!errors.city}
                    helperText={errors.city && 'Ciudad no válida'}
                  />
                </Box>
              </Box>

              <Box display="flex" flexDirection="column" width="100%">
                <Typography variant="body1" fontWeight={600}>
                  Dirección
                </Typography>
                <TextField
                  id="outlined-basic-address "
                  size="small"
                  sx={{ width: '100%' }}
                  {...register('address', {
                    minLength: 3,
                  })}
                  error={!!errors.address}
                  helperText={errors.address && 'Dirección no válida'}
                />
              </Box>

              <Box display="flex" flexDirection="column" width="100%">
                <Typography variant="body1" fontWeight={600}>
                  Teléfono
                </Typography>
                <TextField
                  id="outlined-basic-cellphone"
                  size="small"
                  sx={{ width: '48%' }}
                  {...register('cellphone', {
                    minLength: 3,
                  })}
                  error={!!errors.cellphone}
                  helperText={errors.cellphone && 'Ciudad no válido'}
                />
              </Box>
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
    </>
  );
};
