import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { rexbuyApi } from '@/axios';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data, status } = useSession();

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    if (status === 'authenticated') {
      const user = data?.user as IUser;
      dispatch({ type: '[Auth] - Login', payload: user });
      Cookies.set('firstName', Cookies.get('firstName') || user?.name || '');
      Cookies.set('address', Cookies.get('address') || user?.address || '');
      Cookies.set('city', Cookies.get('city') || user?.city || '');
      Cookies.set('phone', Cookies.get('phone') || user?.cellphone || '');
    }
  }, [status, data]);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      await rexbuyApi.post('/user/login', { email, password });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const registerUser = async (
    email: string,
    name: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      await rexbuyApi.post('/user/register', {
        name,
        email,
        password,
      });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: 'No se pudo crear el usuario - intente de nuevo',
      };
    }
  };

  const updateUser = (user: IUser) => {
    if (!user) return;
    dispatch({ type: '[User] - Update', payload: user as IUser });
  };

  const logout = () => {
    Cookies.remove('cart');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zip');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');

    signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //Methods
        loginUser,
        registerUser,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
