import { useState, useContext, useEffect } from 'react';
import { getProviders } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context';

type FormData = {
  name?: string;
  email: string;
  password: string;
};

export const useAuthForm = () => {
  const [providers, setProviders] = useState<any>({});

  const { loginUser } = useContext(AuthContext);

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return { providers, loginUser, register, handleSubmit, errors };
};
