import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';

import {
  Link,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
} from '@mui/material';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const {
    _id,
    shippingAddress,
    orderItems,
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
      <Grid container className='fadeIn'>
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
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({numberOfItems}{' '}
                {numberOfItems > 1 ? 'Productos' : 'Producto'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
              </Box>

              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address}{' '}
                {shippingAddress.address2
                  ? `, ${shippingAddress.address2}`
                  : ''}
              </Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.zip}
              </Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary orderSummary={orderSummary} />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                {!isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label="Orden ya fue pagada"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <h1>Pagar</h1>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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
