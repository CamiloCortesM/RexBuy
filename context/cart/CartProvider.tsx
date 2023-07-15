import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces/cart';

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieCart = JSON.parse(Cookie.get('cart') || '[]');
      dispatch({
        type: 'Cart - LoadCart from cookies | storage',
        payload: cookieCart,
      });
    } catch (error) {
      dispatch({
        type: 'Cart - LoadCart from cookies | storage',
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length === 0) return;
    Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart)
      return dispatch({
        type: 'Cart - Update products in cart',
        payload: [...state.cart, product],
      });

    const productInCartButDifferentEspecification = state.cart.some(
      (p) =>
        p._id === product._id &&
        p.capacity === product.capacity &&
        p.ram === product.ram
    );

    if (!productInCartButDifferentEspecification)
      return dispatch({
        type: 'Cart - Update products in cart',
        payload: [...state.cart, product],
      });

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.capacity !== product.capacity) return p;
      if (p.ram !== product.ram) return p;
      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: 'Cart - Update products in cart',
      payload: updatedProducts,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        //Methods
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
