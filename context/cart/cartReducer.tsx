import Cookies from 'js-cookie';
import { ICartProduct } from '@/interfaces/cart';
import { ShippingAddress } from '@/interfaces';
import { CartState } from './';

type CartActionType =
  | { type: 'Cart - LoadCart from cookies | storage'; payload: ICartProduct[] }
  | { type: 'Cart - Update products in cart'; payload: ICartProduct[] }
  | { type: 'Cart - Change cart quantity'; payload: ICartProduct }
  | { type: 'Cart - Remove product in cart'; payload: ICartProduct }
  | { type: 'Cart - LoadAddress from cookie'; payload: ShippingAddress }
  | { type: 'Cart - Update Address'; payload: ShippingAddress }
  | { type: 'Cart - Order complete' }
  | {
      type: 'Cart - Update order summary';
      payload: {
        numberOfItems: number;
        subTotal     : number;
        tax          : number;
        total        : number;
      };
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case 'Cart - LoadCart from cookies | storage':
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };
    case 'Cart - Update products in cart':
      return {
        ...state,
        cart: [...action.payload],
      };
    case 'Cart - Change cart quantity':
      return {
        ...state,
        cart: state.cart.map((product) =>
          product._id === action.payload._id &&
          product.capacity === action.payload.capacity &&
          product.ram === action.payload.ram
            ? action.payload
            : product
        ),
      };
    case 'Cart - Remove product in cart':
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.capacity === action.payload.capacity &&
              product.ram === action.payload.ram
            )
        ),
      };

    case 'Cart - Update order summary':
      return {
        ...state,
        ...action.payload,
      };

    case 'Cart - Update Address':
    case 'Cart - LoadAddress from cookie':
      return {
        ...state,
        shippingAddress: { ...action.payload },
      };

    case 'Cart - Order complete':
      Cookies.set('cart', JSON.stringify([]));
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        subTotal: 0,
        tax: 0,
        total: 0,
      };

    default:
      return state;
  }
};
