import { ICartProduct } from '@/interfaces/cart';
import { CartState } from './';

type CartActionType =
  | { type: 'Cart - LoadCart from cookies | storage'; payload: ICartProduct[] }
  | { type: 'Cart - Update products in cart'; payload: ICartProduct[] }
  | { type: 'Cart - Change cart quantity'; payload: ICartProduct }
  | { type: 'Cart - Remove product in cart'; payload: ICartProduct }
  | {
      type: 'Cart - Update order sumary';
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
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
        cart: state.cart.map((product) => {
          if (product._id != action.payload._id) return product;
          if (product.capacity != action.payload.capacity) return product;
          if (product.ram != action.payload.ram) return product;

          return action.payload;
        }),
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

    case 'Cart - Update order sumary':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
