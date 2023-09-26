import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';

import { CartContext, cartReducer } from './';
import { rexbuyApi } from '@/axios';
import { ICartProduct, IOrder, ShippingAddress } from '@/interfaces';

export interface CartState {
  isLoaded     : boolean;
  cart         : ICartProduct[];
  numberOfItems: number;
  subTotal     : number;
  tax          : number;
  total        : number;

  shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded       : false,
  cart           : [],
  numberOfItems  : 0,
  subTotal       : 0,
  tax            : 0,
  total          : 0,
  shippingAddress: undefined,
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    const cookieCart: ICartProduct[] = JSON.parse(Cookie.get('cart') || '[]');
    dispatch({
      type: 'Cart - LoadCart from cookies | storage',
      payload: cookieCart,
    });
  }, []);

  useEffect(() => {
    if (state.cart.length === 0) return;
    Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    if (Cookie.get('firstName')) {
      const shippingAddress: ShippingAddress = {
        firstName: Cookie.get('firstName') || '',
        lastName : Cookie.get('lastName') || '',
        address  : Cookie.get('address') || '',
        address2 : Cookie.get('address2') || '',
        zip      : Cookie.get('zip') || '',
        city     : Cookie.get('city') || '',
        country  : Cookie.get('country') || 'COL',
        phone    : Cookie.get('phone') || '',
      };

      dispatch({
        type: 'Cart - LoadAddress from cookie',
        payload: shippingAddress,
      });
    }
  }, []);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.quantity * current.price + prev,
      0
    );

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({ type: 'Cart - Update order summary', payload: orderSummary });
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart)
      return dispatch({
        type: 'Cart - Update products in cart',
        payload: [...state.cart, product],
      });

    const productInCartButDifferentSpecification = state.cart.some(
      (p) =>
        p._id === product._id &&
        p.capacity === product.capacity &&
        p.ram === product.ram
    );

    if (!productInCartButDifferentSpecification)
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

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Change cart quantity', payload: product });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Remove product in cart', payload: product });
  };

  const updateAddress = (address: ShippingAddress) => {
    Cookie.set('firstName', address.firstName);
    Cookie.set('lastName', address.lastName);
    Cookie.set('address', address.address);
    Cookie.set('address2', address.address2 || '');
    Cookie.set('zip', address.zip);
    Cookie.set('city', address.city);
    Cookie.set('country', address.country);
    Cookie.set('phone', address.phone);
    dispatch({ type: 'Cart - Update Address', payload: address });
  };

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    if (!state.shippingAddress) {
      throw new Error('Address is Empty!');
    }

    const body: IOrder = {
      orderItems     : state.cart,
      shippingAddress: state.shippingAddress,
      numberOfItems  : state.numberOfItems,
      subTotal       : state.subTotal,
      tax            : state.tax,
      total          : state.total,
      isPaid         : false,
    };

    try {
      const { data } = await rexbuyApi.post<IOrder>('/orders', body);
      dispatch({ type: 'Cart - Order complete' });

      return {
        hasError: false,
        message: data._id!,
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
        message: 'Talk to the administrator',
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        //Methods
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,

        // Orders
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
