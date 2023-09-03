import { useContext } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { AuthContext } from '@/context';

export const useAuthForm = <T extends {}>(): UseFormReturn<T> & {
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (
    email: string,
    name: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;
} => {
  const { loginUser, registerUser } = useContext(AuthContext);

  const formMethods = useForm<T>();

  return {
    ...formMethods,
    loginUser,
    registerUser,
  };
};
