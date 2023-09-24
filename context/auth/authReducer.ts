import { IUser } from '@/interfaces';
import { AuthState } from './';

type AuthActionType =
  | { type: '[Auth] - Login'; payload: IUser }
  | { type: '[Auth] - Logout'; payload: IUser }
  | { type: '[User] - Update'; payload: IUser };

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case '[Auth] - Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case '[Auth] - Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };

    case '[User] - Update':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
