import { FC } from 'react';

import { Send } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IconButton, TextField } from '@mui/material';

type Input = {
  message: string;
};

type Props = {
  searchChunks: Function;
  isLoading: boolean;
};

export const InputMessage: FC<Props> = ({ searchChunks, isLoading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    reset();
    await searchChunks(data.message);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="input-user"
          type="text"
          size="small"
          autoComplete="off"
          variant="outlined"
          {...register('message', { required: true })}
        />

        <IconButton type="submit" disabled={isLoading}>
          <Send />
        </IconButton>
      </form>
    </>
  );
};
