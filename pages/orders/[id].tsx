import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Grid, Typography, Chip } from '@mui/material';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList } from '../../components/cart';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';
import { OrderDetail } from '@/components/orders/OrderDetail';
import { AlertErrorMessage } from '@/components/auth';

type Props = {
  order: IOrder;
};

const OrderPage: NextPage<Props> = ({ order }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const {
    _id,
    orderItems,
    shippingAddress,
    numberOfItems,
    subTotal,
    tax,
    total,
    isPaid,
  } = order;

  const orderSummary = { numberOfItems, subTotal, tax, total };

  return (
    <ShopLayout
      title="Resumen de la orden"
      pageDescription={'Resumen de la orden'}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sm={7}>
          <Typography variant="h1" component="h1">
            Orden: {_id}
          </Typography>

          {isPaid ? (
            <Chip
              sx={{ my: 2 }}
              label="Orden ya fue pagada"
              variant="outlined"
              color="success"
              icon={<CreditScoreOutlined />}
            />
          ) : (
            <Chip
              sx={{ my: 2 }}
              label="Orden Pendiente"
              variant="outlined"
              color="error"
              icon={<CreditCardOffOutlined />}
            />
          )}

          <CartList products={orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <OrderDetail
            _id={_id}
            isPaid={isPaid}
            orderSummary={orderSummary}
            setIsCompleted={setIsCompleted}
            shippingAddress={shippingAddress}
          />
        </Grid>
      </Grid>

      <AlertErrorMessage
        errorMessage="No hay Pago en Paypal"
        showError={isCompleted}
        setOpen={setIsCompleted}
      />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query;
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
